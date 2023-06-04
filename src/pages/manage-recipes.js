//admini getallerecipes

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "@mui/material/Button";
import NewRecipeDialog from "./../components/new-recipe-dialog";
import Cookies from "js-cookie";
import {
  StyledListItem,
  StyledButton,
  StyledInput,
} from "../shared/shared-style";
import { API_PATH } from "../constants";

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

const StyledNewRecipeButton = styled(Button)`
  width: 301px;
  align-self: center;
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

const StyledIngredientContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [reviewingRecipeId, setReviewingRecipeId] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [openNewRecipeModal, setOpenNewRecipeModal] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(1);
  const [selectedValue2, setSelectedValue2] = React.useState(1);
  const [reviewMessage, setReviewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [openAddToCollectionModal, setOpenAddToCollectionModal] =
    useState(false);

  const handleClickOpen = () => {
    setOpenNewRecipeModal(true);
  };

  const handleClose = (value) => {
    setOpenNewRecipeModal(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(API_PATH + "recipes/getAll");

        setRecipes(res.data);

        const filtered = res.data.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecipes(filtered);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error);
      }
    };

    fetchRecipes();
  }, []);

  const deleteRecipe = async (recipeId) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios.delete(API_PATH + `recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
      setFilteredRecipes((prevFilteredRecipes) =>
        prevFilteredRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const fetchReviews = async (selectedRecipeId) => {
    try {
      console.log(selectedRecipeId);
      const jwtToken = Cookies.get("jwtToken");
      const res = await axios.get(API_PATH + "reviews", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          id: selectedRecipeId,
        },
      });

      console.log(res.data);
      // reviews.find(e=>e.id == selectedRecipeId).reviews
      // setReviews(res.data);
      setReviews((prevReviews) => ({
        ...prevReviews,
        [selectedRecipeId]: res.data,
      }));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchClicked(false);
  };

  const handleSearch = () => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
    setSearchClicked(true);
  };

  const handleShowReviews = async (recipeId) => {
    await fetchReviews(recipeId);
  };

  if (error) {
    return (
      <StyledRecipesContainer>
        <StyledNewRecipeButton
          onClick={() => {
            handleClickOpen();
          }}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          Add new recipe
        </StyledNewRecipeButton>
        <p className="error">{error.response.data}</p>;
      </StyledRecipesContainer>
    );
  }

  return (
    <StyledRecipesContainer>
      <StyledNewRecipeButton
        onClick={() => {
          handleClickOpen();
        }}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}>
        Add new recipe
      </StyledNewRecipeButton>
      <NewRecipeDialog
        selectedValue={selectedValue}
        open={openNewRecipeModal}
        onClose={handleClose}
      />
      <StyledRecipesTitle>All Recipes</StyledRecipesTitle>
      <StyledSearchContainer>
        <StyledInput
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <StyledButton
          type="button"
          color="success"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ margin: "0px" }}
          onClick={handleSearch}>
          Search
        </StyledButton>
      </StyledSearchContainer>
      {filteredRecipes.length > 0 ? (
        <StyledRecipeList>
          {filteredRecipes.map((recipe) => (
            <StyledListItem key={recipe.id}>
              <StyledRecipeImage src={recipe.audioInstructions} alt="Recipe" />{" "}
              Image tag
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
              <p className="cuisine-name">
                {" "}
                <strong>Cuisines:</strong> {recipe.cuisineName}
              </p>{" "}
              {/* Display cuisine name */}
              <h4 className="recipe-subtitle">Ingredients:</h4>
              <StyledIngredientList>
                {recipe.ingredients.map((ingredient) => (
                  <StyledIngredientContainer key={ingredient.id}>
                    <StyledIngredientItem>
                      {ingredient.name} - {ingredient.amount} {ingredient.unit}
                    </StyledIngredientItem>
                  </StyledIngredientContainer>
                ))}
              </StyledIngredientList>
              <StyledRecipeSubtitle>Instructions:</StyledRecipeSubtitle>
              <StyledInstructionList>
                {recipe.instructions.map((instruction) => (
                  <StyledInstructionItem key={instruction.id}>
                    Step {instruction.stepNumber}: {instruction.stepDescription}
                  </StyledInstructionItem>
                ))}
              </StyledInstructionList>
              <StyledButton
                type="button"
                variant="outlined"
                color="error"
                style={{ marginRight: "10px" }}
                sx={{ mt: 3, mb: 2 }}
                onClick={() => deleteRecipe(recipe.id)}>
                Delete Recipe
              </StyledButton>
              <StyledButton
                type="button"
                color="success"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleShowReviews(recipe.id)}>
                Show Reviews
              </StyledButton>
              {reviews && reviews[recipe.id] && (
                <div key={recipe.id}>
                  <h4>Reviews:</h4>
                  <ul>
                    {reviews[recipe.id].map((review) => (
                      <li key={review.id}>
                        Rating: {review.rating} | Message: {review.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </StyledListItem>
          ))}
        </StyledRecipeList>
      ) : (
        <StyledNoRecipes>No recipes found.</StyledNoRecipes>
      )}
    </StyledRecipesContainer>
  );
};

export default ManageRecipes;
