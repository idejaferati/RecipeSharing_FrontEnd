import React, { useEffect, useState } from "react";
import { PRODUCTS } from "./../data/products";
import Product from "./../components/product/index";
import styled from "styled-components";
import axios from "axios";

const StyledOuterContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  height: 100vh;
  flex-direction: column;
`;

const StyledTitleDiv = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 10px;
`;

const StyledGridContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
`;

const StyledRecipesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledRecipesTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledRecipeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledRecipeItem = styled.li`
  margin-bottom: 20px;
  border: 2px solid #ddd;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
`;

const StyledRecipeName = styled.h3`
  font-size: 20px;
  margin-bottom: 5px;
`;

const StyledRecipeDescription = styled.p`
  margin-bottom: 10px;
`;

const StyledRecipeDetails = styled.div`
  margin-bottom: 10px;
`;

const StyledRecipeInfo = styled.p`
  margin: 0;
`;

const StyledTags = styled.div`
  margin-top: 10px;
`;

const StyledTag = styled.span`
  display: inline-block;
  background-color: #ddd;
  color: #333;
  padding: 4px 8px;
  border-radius: 3px;
  margin-right: 5px;
`;

const StyledUserDetails = styled.div`
  margin-top: 10px;
`;

const StyledUserEmail = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const StyledRecipeSubtitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledIngredientList = styled.ul`
  list-style: disc;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const StyledIngredientItem = styled.li`
  margin-bottom: 5px;
`;

const StyledInstructionList = styled.ol`
  list-style: decimal;
  margin-left: 20px;
`;

const StyledInstructionItem = styled.li`
  margin-bottom: 5px;
`;

const StyledNoRecipes = styled.p`
  font-style: italic;
  color: #888;
`;

const StyledRecipeImage = styled.img`
  width: 200px;
`;

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7164/api/recipes/getAll"
        ); // Replace with your actual endpoint
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const fetchCuisineName = async (cuisineId) => {
    try {
      const response = await axios.get(
        `https://localhost:7164/api/cuisines/${cuisineId}`
      );
      return response.data.name;
    } catch (error) {
      console.error("Error fetching cuisine name:", error);
      return "";
    }
  };

  useEffect(() => {
    const fetchCuisineNames = async () => {
      const updatedRecipes = [];
      for (const recipe of recipes) {
        const cuisineName = await fetchCuisineName(recipe.cuisineId);
        const updatedRecipe = { ...recipe, cuisineName };
        updatedRecipes.push(updatedRecipe);
      }
      setRecipes(updatedRecipes);
    };

    fetchCuisineNames();
  }, [recipes]);

  return (
    <StyledOuterContainer>
      <StyledTitleDiv>
        <h1>Recipes</h1>
      </StyledTitleDiv>

      <StyledGridContainer>
        {PRODUCTS.map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </StyledGridContainer>

      <StyledRecipesContainer>
        <StyledRecipesTitle>All Recipes</StyledRecipesTitle>
        {recipes.length > 0 ? (
          <StyledRecipeList>
            {recipes.map((recipe) => (
              <StyledRecipeItem key={recipe.id}>
                <StyledRecipeImage
                  src={recipe.audioInstructions}
                  alt="Recipe"
                />
                <StyledRecipeName>{recipe.name}</StyledRecipeName>
                <StyledRecipeDescription>
                  {recipe.description}
                </StyledRecipeDescription>
                <StyledRecipeDetails>
                  <StyledRecipeInfo>
                    <strong>Prep Time:</strong> {recipe.prepTime} minutes
                  </StyledRecipeInfo>
                  <StyledRecipeInfo>
                    <strong>Servings:</strong> {recipe.servings}
                  </StyledRecipeInfo>
                  <StyledRecipeInfo>
                    <strong>Yield:</strong> {recipe.yield}
                  </StyledRecipeInfo>
                  <StyledRecipeInfo>
                    <strong>Calories:</strong> {recipe.calories}
                  </StyledRecipeInfo>
                  <StyledTags>
                    <strong>Tags:</strong>
                    {recipe.tags.map((tag) => (
                      <StyledTag key={tag.id}>{tag.name}</StyledTag>
                    ))}
                  </StyledTags>
                  <StyledUserDetails>
                    <strong>Posted by:</strong> {recipe.user.firstName}{" "}
                    {recipe.user.lastName}
                    <StyledUserEmail>
                      <strong>Email:</strong> {recipe.user.email}
                    </StyledUserEmail>
                  </StyledUserDetails>
                </StyledRecipeDetails>
                <StyledRecipeSubtitle>Ingredients:</StyledRecipeSubtitle>
                <StyledIngredientList>
                  {recipe.ingredients.map((ingredient) => (
                    <StyledIngredientItem key={ingredient.id}>
                      {ingredient.name} - {ingredient.amount} {ingredient.unit}
                    </StyledIngredientItem>
                  ))}
                </StyledIngredientList>
                <StyledRecipeSubtitle>Instructions:</StyledRecipeSubtitle>
                <StyledInstructionList>
                  {recipe.instructions.map((instruction) => (
                    <StyledInstructionItem key={instruction.id}>
                      Step {instruction.stepNumber}:{" "}
                      {instruction.stepDescription}
                    </StyledInstructionItem>
                  ))}
                </StyledInstructionList>
              </StyledRecipeItem>
            ))}
          </StyledRecipeList>
        ) : (
          <StyledNoRecipes>No recipes found.</StyledNoRecipes>
        )}
      </StyledRecipesContainer>
    </StyledOuterContainer>
  );
};

export default MyRecipes;
