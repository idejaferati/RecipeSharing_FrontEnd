import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Formik, Form } from "formik";
import { StyledButton, StyledField } from "./../shared/shared-style";
import styled from "styled-components";
import { API_PATH } from "../constants";
import { StyledButtonsContainer } from "./../shared/shared-style";
import { ContentContainer } from "./../shared/shared-style";

const StyledCookbookContainer = styled.div`
  border: 1px solid blue;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
`;

const StyledRecipeContainer = styled.div`
  background: aliceblue;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
`;

function MyCookbooks() {
  const [cookbookData, setCookbookData] = useState([]);
  const [editCookbookId, setEditCookbookId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCookbookData();
  }, []);

  async function fetchCookbookData() {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.get(API_PATH + "cookbooks/all/user", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setCookbookData(response.data);
    } catch (error) {
      console.log("Error fetching cookbook data:", error);
      setError(error);
    }
  }
  async function deleteCookbook(cookbookId) {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios.delete(API_PATH + `cookbooks/${cookbookId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      // Optional: You can remove the deleted cookbook from the state to update the UI immediately.
      setCookbookData((prevData) =>
        prevData.filter((cookbook) => cookbook.id !== cookbookId)
      );
      console.log("Cookbook deleted successfully");
    } catch (error) {
      console.log("Error deleting cookbook:", error);
    }
  }
  async function deleteRecipe(cookbookId, recipeId) {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios.put(API_PATH + "cookbooks/removeRecipe", null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          cookbookId,
          recipeId,
        },
      });
      // Optional: You can update the cookbook data in the state to reflect the changes immediately.
      setCookbookData((prevData) =>
        prevData.map((cookbook) => {
          if (cookbook.id === cookbookId) {
            const updatedRecipes = cookbook.recipes.filter(
              (recipe) => recipe.id !== recipeId
            );
            return { ...cookbook, recipes: updatedRecipes };
          }
          return cookbook;
        })
      );
      console.log("Recipe deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error deleting recipe:", error);
    }
  }

  async function updateCookbook(cookbookId, newName, newDescription) {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const data = {
        id: cookbookId,
        name: newName,
        description: newDescription,
      };
      await axios.put(API_PATH + "cookbooks", JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });
      // Optional: You can update the cookbook data in the state to reflect the changes immediately.
      setCookbookData((prevData) =>
        prevData.map((cookbook) => {
          if (cookbook.id === cookbookId) {
            return { ...cookbook, name: newName, description: newDescription };
          }
          return cookbook;
        })
      );
      console.log("Cookbook updated successfully");
    } catch (error) {
      console.log("Error updating cookbook:", error);
    }
  }

  const handleEditCookbook = (cookbookId) => {
    setEditCookbookId(cookbookId);
  };

  const handleCancelEditCookbook = () => {
    setEditCookbookId(null);
  };

  if (error) {
    return (
      <>
        <p>{error.response.data}</p>
      </>
    );
  }

  return (
    <ContentContainer>
      <h1>User Cookbook</h1>
      {cookbookData.map((cookbook) => (
        <StyledCookbookContainer key={cookbook.id}>
          {editCookbookId === cookbook.id ? (
            <div>
              <h3>Update Cookbook</h3>
              <Formik
                initialValues={{
                  name: cookbook.name,
                  description: cookbook.description,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  updateCookbook(cookbook.id, values.name, values.description);
                  setSubmitting(false);
                  setEditCookbookId(null);
                }}>
                <Form style={{ display: "inline-grid", gap: "10px" }}>
                  <label htmlFor="name">Name:</label>
                  <StyledField type="text" id="name" name="name" />
                  <label htmlFor="description">Description:</label>
                  <StyledField
                    type="text"
                    id="description"
                    name="description"
                  />
                  <StyledButtonsContainer>
                    <StyledButton
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}>
                      Update Cookbook
                    </StyledButton>
                    <StyledButton
                      type="button"
                      variant="text"
                      onClick={handleCancelEditCookbook}
                      sx={{ mt: 3, mb: 2 }}>
                      Cancel
                    </StyledButton>
                  </StyledButtonsContainer>
                </Form>
              </Formik>
            </div>
          ) : (
            <div>
              <h2>{cookbook.name}</h2>
              <p>{cookbook.description}</p>

              <p>Number of Recipes: {cookbook.numberOfRecipes}</p>
              <StyledButtonsContainer>
                <StyledButton
                  type="button"
                  variant="contained"
                  onClick={() => handleEditCookbook(cookbook.id)}
                  sx={{ mt: 3, mb: 2 }}>
                  Edit Cookbook
                </StyledButton>
                <StyledButton
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={() => deleteCookbook(cookbook.id)}
                  sx={{ mt: 3, mb: 2 }}>
                  Delete Cookbook
                </StyledButton>
              </StyledButtonsContainer>
            </div>
          )}

          <h3>Recipes</h3>
          {cookbook.recipes.map((recipe) => (
            <StyledRecipeContainer key={recipe.id}>
              <h4>{recipe.name}</h4>
              <p>{recipe.description}</p>
              <p>Cuisine: {recipe.cuisine.name}</p>
              <p>Tags: {recipe.tags.map((tag) => tag.name).join(", ")}</p>
              <p>Prep Time: {recipe.prepTime} minutes</p>
              <p>Cook Time: {recipe.cookTime} minutes</p>
              <p>Total Time: {recipe.totalTime} minutes</p>
              <h5>Ingredients</h5>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
              <h5>Instructions</h5>
              <ol>
                {recipe.instructions.map((instruction) => (
                  <li key={instruction.id}>
                    {instruction.stepNumber}. {instruction.stepDescription}
                  </li>
                ))}
              </ol>
              <p>Servings: {recipe.servings}</p>
              <p>Yield: {recipe.yield}</p>
              <p>Calories: {recipe.calories}</p>
              <p>Audio Instructions: {recipe.audioInstructions}</p>
              <p>Video Instructions: {recipe.videoInstructions}</p>
              <StyledButton
                type="button"
                variant="contained"
                color="error"
                onClick={() => deleteRecipe(cookbook.id, recipe.id)}
                sx={{ mt: 3, mb: 2 }}>
                Delete Recipe
              </StyledButton>
            </StyledRecipeContainer>
          ))}
        </StyledCookbookContainer>
      ))}
    </ContentContainer>
  );
}

export default MyCookbooks;
