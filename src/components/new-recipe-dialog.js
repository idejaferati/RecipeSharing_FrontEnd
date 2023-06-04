import React, { useState, useEffect } from "react";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { API_PATH } from "../constants";
import { StyledErrorMessage } from "../shared/shared-style";

const StyledFormItem = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
`;

const StyledInput = styled.input`
  height: 30px;
`;

const StyledField = styled(Field)`
  height: 30px;
`;

const StyledSelect = styled.select`
  height: 36px;
`;

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  cuisineId: Yup.string().required("Cuisine is required"),
});

const NewRecipeDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const [cuisines, setCuisines] = useState([]);
  const [existingTags, setExistingTags] = useState([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    // Fetch cuisines from API endpoint
    const jwtToken = Cookies.get("jwtToken");
    axios
      .get(API_PATH + "cuisines")
      .then((response) => {
        setCuisines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cuisines:", error);
      });

    // Fetch tags from API endpoint
    axios
      .get(API_PATH + "tag", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setExistingTags(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);

  const handleSubmit = async (values) => {
    try {
      let copiedValues = JSON.parse(JSON.stringify(values));
      if (copiedValues.existingTags) {
        copiedValues.existingTags = copiedValues.existingTags.map((e) => {
          return { name: e };
        });
        copiedValues.tags.push(...copiedValues.existingTags);
      }

      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.post(
        API_PATH + "recipes",
        JSON.stringify(copiedValues),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("Recipe submitted successfully!", response.data);

      setTimeout(() => handleClose(), 2000);
      // Handle success or show a success message
    } catch (error) {
      console.error("Error submitting recipe:", error);
      // Handle error or show an error message
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Fill your data</DialogTitle>
      <Formik
        initialValues={{
          name: "",
          description: "",
          cuisineId: "",
          existingTags: [],
          tags: [],
          prepTime: 0,
          cookTime: 0,
          ingredients: [{ name: "", amount: 0, unit: "Teaspoon" }],
          instructions: [{ stepNumber: 1, stepDescription: "" }],
          servings: 0,
          yield: 0,
          calories: 0,
          audioInstructions: "",
          videoInstructions: "",
        }}
        validationSchema={validationSchema} // Apply the validation schema
        onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
          <form style={{ minWidth: "450px" }} onSubmit={handleSubmit}>
            <StyledFormItem>
              <label htmlFor="name">Name</label>
              <StyledInput
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <StyledErrorMessage name="name" component="div" />
            </StyledFormItem>
            <StyledFormItem>
              <label htmlFor="description">Description</label>
              <StyledField type="text" id="description" name="description" />
              <StyledErrorMessage name="description" component="div" />
            </StyledFormItem>

            <StyledFormItem>
              <label htmlFor="cuisineId">Cuisine</label>
              <StyledSelect
                id="cuisineId"
                name="cuisineId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cuisineId}>
                <option value="">Select a cuisine</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine.id} value={cuisine.id}>
                    {cuisine.name}
                  </option>
                ))}
              </StyledSelect>
              <StyledErrorMessage name="cuisineId" component="div" />
            </StyledFormItem>
            <StyledFormItem>
              <label htmlFor="existingTags">Tags</label>
              <FieldArray name="existingTags">
                {(arrayHelpers) => (
                  <div>
                    {existingTags.map((tag) => (
                      <label key={tag.id}>
                        <StyledInput
                          type="checkbox"
                          name="existingTags"
                          value={tag.name}
                          checked={values.existingTags.includes(tag.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              arrayHelpers.push(tag.name);
                            } else {
                              const idx = values.existingTags.indexOf(tag.name);
                              arrayHelpers.remove(idx);
                            }
                          }}
                        />
                        {tag.name}
                      </label>
                    ))}
                  </div>
                )}
              </FieldArray>
              <StyledErrorMessage name="existingTags" component="div" />
            </StyledFormItem>

            <br />
            <br />

            <StyledFormItem>
              <label htmlFor="ingredients">Ingredients</label>
              <FieldArray name="ingredients">
                {(arrayHelpers) => (
                  <div>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index}>
                        <StyledFormItem>
                          <label htmlFor={`ingredients.${index}.name`}>
                            Name
                          </label>
                          <StyledInput
                            type="text"
                            id={`ingredients.${index}.name`}
                            name={`ingredients.${index}.name`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={ingredient.name}
                          />
                          <StyledErrorMessage
                            name={`ingredients.${index}.name`}
                            component="div"
                          />
                        </StyledFormItem>

                        <StyledFormItem>
                          <label htmlFor={`ingredients.${index}.amount`}>
                            Amount
                          </label>
                          <StyledInput
                            type="number"
                            id={`ingredients.${index}.amount`}
                            name={`ingredients.${index}.amount`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={ingredient.amount}
                          />
                          <StyledErrorMessage
                            name={`ingredients.${index}.amount`}
                            component="div"
                          />
                        </StyledFormItem>

                        <StyledFormItem>
                          <label htmlFor={`ingredients.${index}.unit`}>
                            Unit
                          </label>
                          <StyledSelect
                            id={`ingredients.${index}.unit`}
                            name={`ingredients.${index}.unit`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={ingredient.unit}>
                            <option value="Tablespoon">Teaspoon</option>
                            <option value="Tablespoon">Tablespoon</option>
                            <option value="Tablespoon">Ounce</option>
                            <option value="Tablespoon">Cup</option>
                            <option value="Tablespoon">Pint</option>
                            <option value="Tablespoon">Quart</option>
                            <option value="Tablespoon">Gallon</option>
                            <option value="Tablespoon">Miligram</option>
                            <option value="Tablespoon">Gram</option>
                            <option value="Tablespoon">Kilogram</option>
                            <option value="Tablespoon">Mililiter</option>
                            <option value="Tablespoon">Liter</option>
                            <option value="Tablespoon">Pieces</option>
                            {/* Add more units as needed */}
                          </StyledSelect>
                          <StyledErrorMessage
                            name={`ingredients.${index}.unit`}
                            component="div"
                          />
                        </StyledFormItem>

                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ mt: 3, mb: 2 }}
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}>
                          Remove Ingredient
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          amount: 0,
                          unit: "Teaspoon",
                        })
                      }>
                      Add Ingredient
                    </Button>
                  </div>
                )}
              </FieldArray>
              <StyledErrorMessage name="ingredients" component="div" />
            </StyledFormItem>

            <br />
            <StyledFormItem>
              {/* Instructions */}
              <label htmlFor="instructions">Instructions</label>
              <FieldArray name="instructions">
                {(arrayHelpers) => (
                  <div>
                    {values.instructions.map((instruction, index) => (
                      <div key={index}>
                        <StyledFormItem>
                          <label htmlFor={`instructions.${index}.stepNumber`}>
                            Step {index + 1} :{" "}
                          </label>
                          {/* <StyledInput
                          type="text"
                          id={`instructions.${index}.stepNumber`}
                          name={`instructions.${index}.stepNumber`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={instruction.stepNumber}
                        /> */}
                          <StyledErrorMessage
                            name={`instructions.${index}.stepNumber`}
                            component="div"
                          />
                        </StyledFormItem>

                        <StyledFormItem>
                          <label
                            htmlFor={`instructions.${index}.stepDescription`}>
                            Description
                          </label>
                          <StyledInput
                            type="text"
                            id={`instructions.${index}.stepDescription`}
                            name={`instructions.${index}.stepDescription`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={instruction.stepDescription}
                          />
                          <StyledErrorMessage
                            name={`instructions.${index}.stepDescription`}
                            component="div"
                          />
                        </StyledFormItem>

                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ mt: 3, mb: 2 }}
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}>
                          Remove Step
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          stepNumber: values.instructions.length + 1,
                          stepDescription: "",
                        })
                      }>
                      Add Step
                    </Button>
                  </div>
                )}
              </FieldArray>
              <StyledErrorMessage name="instructions" component="div" />
            </StyledFormItem>
            <br />
            <StyledFormItem>
              {/* Prep Time */}
              <label htmlFor="prepTime">Prep Time (minutes)</label>
              <StyledField type="number" id="prepTime" name="prepTime" />
            </StyledFormItem>
            <br />
            <StyledFormItem>
              {/* Cook Time */}
              <label htmlFor="cookTime">Cook Time (minutes)</label>
              <StyledField type="number" id="cookTime" name="cookTime" />
            </StyledFormItem>
            <br />
            <StyledFormItem>
              {/* Tags */}
              <label htmlFor="tags">Tags</label>
              <FieldArray name="tags">
                {(arrayHelpers) => (
                  <div>
                    {values.tags.map((tag, index) => (
                      <div key={index}>
                        <label htmlFor={`tags.${index}.name`}>
                          Tag {index + 1}:
                        </label>
                        <StyledField
                          type="text"
                          id={`tags.${index}.name`}
                          name={`tags.${index}.name`}
                        />
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ mt: 3, mb: 2 }}
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}>
                          Remove Tag
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      type="button"
                      onClick={() => arrayHelpers.push({ name: "" })}>
                      Add Tag
                    </Button>
                  </div>
                )}
              </FieldArray>
              <StyledErrorMessage name="tags" component="div" />
            </StyledFormItem>

            <br />
            <StyledFormItem>
              {/* Servings */}
              <label htmlFor="servings">Servings</label>
              <StyledField type="number" id="servings" name="servings" />
            </StyledFormItem>
            <br />
            {/* Yield */}
            {/* ... */}

            <StyledFormItem>
              {/* Calories */}
              <label htmlFor="calories">Calories</label>
              <StyledField type="number" id="calories" name="calories" />
            </StyledFormItem>
            <br />
            <StyledFormItem>
              {/* Audio Instructions */}
              <label htmlFor="audioInstructions">Images address</label>
              <StyledField
                type="text"
                id="audioInstructions"
                name="audioInstructions"
              />
            </StyledFormItem>
            <br />
            <StyledFormItem>
              {/* Video Instructions */}
              <label htmlFor="videoInstructions">Video Instructions</label>
              <StyledField
                type="text"
                id="videoInstructions"
                name="videoInstructions"
              />
            </StyledFormItem>
            <br />
            <StyledFormItem>
              <Button variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
                Submit
              </Button>
            </StyledFormItem>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default NewRecipeDialog;
