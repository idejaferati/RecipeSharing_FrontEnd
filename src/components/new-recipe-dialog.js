import React, { useState, useEffect } from 'react';
import { Formik, Field, FieldArray, ErrorMessage, useFormikContext } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  padding: 10px;
`;

const NewRecipeDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const [cuisines, setCuisines] = useState([]);
  const [tags, setTags] = useState([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    // Fetch cuisines from API endpoint
    axios.get('https://localhost:7164/api/cuisines')
      .then(response => {
        setCuisines(response.data);
      })
      .catch(error => {
        console.error('Error fetching cuisines:', error);
      });

    // Fetch tags from API endpoint
    axios.get('https://localhost:7164/api/tag')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  const handleSubmit = async (values) => {
    const jwtToken = Cookies.get('jwtToken');
    try {
      console.log(JSON.stringify(values));
	  const jwtToken = Cookies.get('jwtToken');
      const response = await axios.post('https://localhost:7164/api/recipes', JSON.stringify(values),{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      console.log('Recipe submitted successfully!', response.data);
      // Handle success or show a success message
    } catch (error) {
      console.error('Error submitting recipe:', error);
      // Handle error or show an error message
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Fill your data</DialogTitle>
      <Formik
        initialValues={{
          name: '',
          description: '',
          cuisineId: '',
          tags: [],
          prepTime: 0,
          cookTime: 0,
          ingredients: [{ name: '', amount: 0, unit: 'Teaspoon' }],
          instructions: [{ stepNumber: 1, stepDescription: '' }],
          servings: 0,
          yield: 0,
          calories: 0,
          audioInstructions: '',
          videoInstructions: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <StyledGrid item xs={12}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <ErrorMessage name="name" component="div" />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <label htmlFor="description">Description</label>
              <Field
                type="text"
                id="description"
                name="description"
              />
              <ErrorMessage name="description" component="div" />
            </StyledGrid>

            <StyledGrid item xs={12}>
              <label htmlFor="cuisineId">Cuisine</label>
              <select
                id="cuisineId"
                name="cuisineId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cuisineId}
              >
                <option value="">Select a cuisine</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine.id} value={cuisine.id}>
                    {cuisine.name}
                  </option>
                ))}
              </select>
              <ErrorMessage name="cuisineId" component="div" />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <label htmlFor="tags">Tags</label>
              <FieldArray name="tags">
                {arrayHelpers => (
                  <div>
                    {tags.map(tag => (
                      <label key={tag.id}>
                        <input
                          type="checkbox"
                          name="tags"
                          value={tag.name}
                          checked={values.tags.includes(tag.name)}
                          onChange={e => {
                            if (e.target.checked) {
                              arrayHelpers.push(tag.name);
                            } else {
                              const idx = values.tags.indexOf(tag.name);
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
              <ErrorMessage name="tags" component="div" />
            </StyledGrid>

            <br/>
            <br/>

            <StyledGrid item xs={12}>
              <label htmlFor="ingredients">Ingredients</label>
              <FieldArray name="ingredients">
                {arrayHelpers => (
                  <div>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index}>
                        <StyledGrid item xs={12}>
                          <label htmlFor={`ingredients.${index}.name`}>Name</label>
                          <input
                            type="text"
                            id={`ingredients.${index}.name`}
                            name={`ingredients.${index}.name`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={ingredient.name}
                          />
                          <ErrorMessage name={`ingredients.${index}.name`} component="div" />
                        </StyledGrid>

                        <StyledGrid item xs={12}>
                          <label htmlFor={`ingredients.${index}.amount`}>Amount</label>
                          <input
                            type="number"
                            id={`ingredients.${index}.amount`}
                            name={`ingredients.${index}.amount`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={ingredient.amount}
                          />
                          <ErrorMessage name={`ingredients.${index}.amount`} component="div" />
                        </StyledGrid>

                        <StyledGrid item xs={12}>
                          <label htmlFor={`ingredients.${index}.unit`}>Unit</label>
                          <select
                            id={`ingredients.${index}.unit`}
                            name={`ingredients.${index}.unit`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={ingredient.unit}
                          >
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
                          </select>
                          <ErrorMessage name={`ingredients.${index}.unit`} component="div" />
                        </StyledGrid>

                        <button type="button" onClick={() => arrayHelpers.remove(index)}>
                          Remove Ingredient
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push({ name: '', amount: 0, unit: 'Teaspoon' })}>
                      Add Ingredient
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="ingredients" component="div" />
            </StyledGrid>

            <br/><br/>
            {/* Instructions */}
            <label htmlFor="instructions">Instructions</label>
            <FieldArray name="instructions">
              {arrayHelpers => (
                <div>
                  {values.instructions.map((instruction, index) => (
                    <div key={index}>
                      <StyledGrid item xs={12}>
                        <label htmlFor={`instructions.${index}.stepNumber`}>Step {index + 1} :  </label>
                        {/* <input
                          type="text"
                          id={`instructions.${index}.stepNumber`}
                          name={`instructions.${index}.stepNumber`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={instruction.stepNumber}
                        /> */}
                        <ErrorMessage name={`instructions.${index}.stepNumber`} component="div" />
                      </StyledGrid>

                      <StyledGrid item xs={12}>
                        <label htmlFor={`instructions.${index}.stepDescription`}>Description</label>
                        <input
                          type="text"
                          id={`instructions.${index}.stepDescription`}
                          name={`instructions.${index}.stepDescription`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={instruction.stepDescription}
                        />
                        <ErrorMessage name={`instructions.${index}.stepDescription`} component="div" />
                      </StyledGrid>

                      <button type="button" onClick={() => arrayHelpers.remove(index)}>
                        Remove Step
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => arrayHelpers.push({ stepNumber: values.instructions.length + 1, stepDescription: '' })}>
                    Add Step
                  </button>
                </div>
              )}
            </FieldArray>
            <ErrorMessage name="instructions" component="div" />
            <br/><br/>
            {/* Prep Time */}
            <label htmlFor="prepTime">Prep Time (minutes)</label>
            <Field
              type="number"
              id="prepTime"
              name="prepTime"
            />
  <br/><br/>
            {/* Cook Time */}
            <label htmlFor="cookTime">Cook Time (minutes)</label>
            <Field
              type="number"
              id="cookTime"
              name="cookTime"
            />
            <br/><br/>
            {/* Tags */}
            <label htmlFor="tags">Tags</label>
            <FieldArray name="tags">
              {arrayHelpers => (
                <div>
                  {values.tags.map((tag, index) => (
                    <div key={index}>
                      <label htmlFor={`tags.${index}.name`}>Tag {index + 1}</label>
                      <Field
                        type="text"
                        id={`tags.${index}.name`}
                        name={`tags.${index}.name`}
                      />
                      <button type="button" onClick={() => arrayHelpers.remove(index)}>
                        Remove Tag
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => arrayHelpers.push({ name: '' })}>
                    Add Tag
                  </button>
                </div>
              )}
            </FieldArray>
            <ErrorMessage name="tags" component="div" />

            <br/><br/>
                {/* Servings */}
            <label htmlFor="servings">Servings</label>
            <Field
              type="number"
              id="servings"
              name="servings"
            />
  <br/><br/>
            {/* Yield */}
            {/* ... */}

            {/* Calories */}
            <label htmlFor="calories">Calories</label>
            <Field
              type="number"
              id="calories"
              name="calories"
            />
  <br/><br/>
            {/* Audio Instructions */}
            <label htmlFor="audioInstructions">Images address</label>
            <Field
              type="text"
              id="audioInstructions"
              name="audioInstructions"
            />
  <br/><br/>
            {/* Video Instructions */}
            <label htmlFor="videoInstructions">Video Instructions</label>
            <Field
              type="text"
              id="videoInstructions"
              name="videoInstructions"
            />
  <br/><br/>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default NewRecipeDialog;
