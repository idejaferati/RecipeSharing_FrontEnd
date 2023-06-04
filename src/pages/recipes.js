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
import { StarRating } from "../components/star-rating";
import TextField from "@mui/material/TextField";
import { AddToCollectionDialog } from "../components/add-to-collection-dialog";
import { API_PATH } from "../constants";

const StyledRecipesContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledRecipesTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const StyledRecipeList = styled.ul`
  list-style: none;
  padding: 0;
  display: block;
  align-items: flex-start;
`;

const StyledRecipeImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-self: flex-start;
  float: right;
  margin-right: 10px;
`;
const StyledNewRecipeButton = styled(Button)`
  width: 301px;
  align-self: center;
  margin: 2px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledSearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center; /* Added */
`;

const StyledRecipeName = styled.h3`
  font-size: 20px;
  margin-bottom: 5px;
  color: #333;
`;

const StyledRecipeDescription = styled.p`
  margin-bottom: 10px;
  color: #555;
`;

const StyledRecipeDetails = styled.div`
  flex-grow: 1;
`;

const StyledRecipeInfo = styled.p`
  margin: 0;
  color: #777;
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
  color: #333;
`;

const StyledIngredientList = styled.ul`
  list-style: disc;
  margin-left: 20px;
  margin-bottom: 10px;
  color: #555;
`;

const StyledIngredientItem = styled.li`
  margin-bottom: 5px;
`;

const StyledInstructionList = styled.ol`
  list-style: decimal;
  margin-left: 20px;
  color: #555;
`;

const StyledInstructionItem = styled.li`
  margin-bottom: 5px;
`;

const StyledNoRecipes = styled.p`
  font-style: italic;
  color: #888;
`;

const StyledIngredientContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: black;
`;

const StyledReviewContainer = styled.div`
  background: white;
  padding: 10px;
  margin: 10px 5px;
  border-radius: 10px;
`;

const MyRecipes = () => {
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
  const [showReviewedRecipe, setShowReviewedRecipe] = useState("");
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

  // const deleteRecipe = async (recipeId) => {
  //   try {
  //     const jwtToken = Cookies.get("jwtToken");
  //     await axios
  //       .delete(API_PATH + `recipes/${recipeId}`, {
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       });
  //       setRecipes((recipes) =>
  //         recipes.filter((recipe) => recipe.id !== recipeId)
  //       );
  //   } catch (error) {
  //     console.error("Error deleting recipe:", error);
  //   }
  // };

  const shopIngredient = async (name, quantity) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const res = await axios.post(
        API_PATH + "ShoppingList",
        JSON.stringify([{ name, quantity }]),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("Ingredient is on shopping list", res);
    } catch (error) {
      console.error("Error shopping recipe:", error);
    }
  };

  const handleOpenAddToCollectionModal = () => {
    setOpenAddToCollectionModal(true);
  };

  const handleCloseAddToCollectionModal = (value) => {
    setOpenAddToCollectionModal(false);
    setSelectedValue2(value);
  };

  const handleAddToCollection = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowAddToCollection(true);
    handleOpenAddToCollectionModal();
  };

  const handleReviewRecipe = async (recipeId, rating) => {
    try {
      const reviewData = {
        recipeId: recipeId,
        rating: rating,
        message: reviewMessage,
      };

      const jwtToken = Cookies.get("jwtToken");
      await axios.post(API_PATH + "reviews", JSON.stringify(reviewData), {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });

      // Optionally, you can fetch the updated recipe data after adding the review
      // const updatedRecipeResponse = await axios.get(API_PATH + `recipes/${recipeId}`);
      // const updatedRecipe = updatedRecipeResponse.data;
      // Update the recipe state with the updated data

      // Reset the review form
      setReviewingRecipeId("");
      setReviewRating(0);
      setReviewMessage(""); // Reset the review message
    } catch (error) {
      console.error("Error adding review:", error);
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
    setShowReviewedRecipe(recipeId);
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
          style={{ margin: "3px" }}
          onClick={handleSearch}>
          Search
        </StyledButton>
      </StyledSearchContainer>
      {filteredRecipes.length > 0 ? (
        <StyledRecipeList>
          {filteredRecipes.map((recipe) => (
            <StyledListItem key={recipe.id}>
              <StyledRecipeImage
                src={require("../images/no-img.png")}
                alt="Recipe"
              />{" "}
              <div>
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
                        {ingredient.name} - {ingredient.amount}{" "}
                        {ingredient.unit}
                      </StyledIngredientItem>
                      <StyledButton
                        type="button"
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ margin: "3px" }}
                        onClick={() =>
                          shopIngredient(ingredient.name, ingredient.amount)
                        }>
                        Shop ingredient
                      </StyledButton>
                    </StyledIngredientContainer>
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
                {/* <StyledButton
                type="button"
                variant="outlined"
                color="error"
                style={{ marginRight: "10px" }}
                sx={{ mt: 3, mb: 2 }}
                onClick={() => deleteRecipe(recipe.id)}>
                Delete Recipe
              </StyledButton> */}
                <StyledButton
                  type="button"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ margin: "3px" }}
                  onClick={() => handleAddToCollection(recipe.id)}>
                  Add to Collection
                </StyledButton>
                {recipe.id === reviewingRecipeId ? (
                  <StyledReviewContainer>
                    <p>Rate this recipe:</p>
                    <StarRating
                      rating={reviewRating}
                      onRatingChange={setReviewRating}
                    />
                    <TextField
                      label="Review Message"
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)} // Update the review message state
                      multiline
                      rows={4}
                      fullWidth
                      margin="normal"
                    />
                    <StyledButton
                      type="button"
                      color="secondary"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{ margin: "3px" }}
                      onClick={() =>
                        handleReviewRecipe(recipe.id, reviewRating)
                      }>
                      Submit Review
                    </StyledButton>
                    <StyledButton
                      type="button"
                      variant="outlined"
                      sx={{ mt: 3, mb: 2 }}
                      style={{ margin: "3px" }}
                      onClick={() => setReviewingRecipeId("")}>
                      Cancel
                    </StyledButton>
                  </StyledReviewContainer>
                ) : (
                  <StyledButton
                    type="button"
                    color="secondary"
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ margin: "3px" }}
                    onClick={() => {
                      setReviewingRecipeId(recipe.id);
                    }}>
                    Review Recipe
                  </StyledButton>
                )}
                <StyledButton
                  type="button"
                  color="success"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ margin: "3px", display: "block" }}
                  onClick={() => handleShowReviews(recipe.id)}>
                  Show Reviews
                </StyledButton>
                {!reviewingRecipeId &&
                  showReviewedRecipe === recipe.id &&
                  (reviews[recipe.id]?.length > 0 ? (
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
                  ) : (
                    <div>No reviews yet.</div>
                  ))}
              </div>
            </StyledListItem>
          ))}
        </StyledRecipeList>
      ) : (
        <StyledNoRecipes>No recipes found.</StyledNoRecipes>
      )}
      {showAddToCollection && (
        <AddToCollectionDialog
          selectedValue={selectedValue2}
          open={openAddToCollectionModal}
          onClose={handleCloseAddToCollectionModal}
          selectedRecipeId={selectedRecipeId}
          setSelectedRecipeId={setSelectedRecipeId}
          setShowAddToCollection={setShowAddToCollection}
        />
      )}
    </StyledRecipesContainer>
  );
};

export default MyRecipes;
