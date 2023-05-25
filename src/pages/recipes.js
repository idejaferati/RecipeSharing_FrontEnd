import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "@mui/material/Button";
import NewRecipeDialog from "./../components/new-recipe-dialog";
import Cookies from "js-cookie";
import { StyledListItem, StyledButton } from "../shared/shared-style";

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

const StyledAddToCollectionSection = styled.div`
  border: 1px dashed green;
  padding: 15px;
`;

const StyledInput = styled.input`
  height: 30px;
`;

const StyledSelect = styled.select`
  height: 36px;
`;

const StyledCollectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledIngredientContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        await axios
          .get("https://localhost:7164/api/recipes/getAll")
          .then((res) => {
            setRecipes(res.data);
          });
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        await axios
          .get("https://localhost:7164/api/collections/user", {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((res) => {
            setCollections(res.data);
          });
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const deleteRecipe = async (recipeId) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios
        .delete(`https://localhost:7164/api/recipes/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then(() => {
          setRecipes((recipes) =>
            recipes.filter((recipe) => recipe.id !== recipeId)
          );
        });
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const shopIngredient = async (name, quantity) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios
        .post(
          "https://localhost:7164/api/ShoppingList",
          JSON.stringify([{ name, quantity }]),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((res) => {
          console.log("Ingredient is on shopping list", res);
        });
    } catch (error) {
      console.error("Error shopping recipe:", error);
    }
  };

  const handleAddToCollection = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowAddToCollection(true);
  };

  const handleAddToNewCollection = async () => {
    try {
      const collectionData = {
        name: newCollectionName,
        description: newCollectionDescription,
        recipes: [selectedRecipeId],
      };
      console.log(JSON.stringify(collectionData));
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.post(
        "https://localhost:7164/api/Collections",
        JSON.stringify(collectionData),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,

            "Content-Type": "application/json",
          },
        }
      );
      const newCollection = response.data;
      setCollections((collections) => [...collections, newCollection]);

      // Reset the form fields and selection
      setNewCollectionName("");
      setNewCollectionDescription("");
      setSelectedRecipeId("");
      setShowAddToCollection(false);
    } catch (error) {
      console.error("Error creating new collection:", error);
    }
  };

  const handleAddToExistingCollection = async () => {
    try {
      const collectionId = selectedCollection;
      const recipeId = selectedRecipeId;

      console.log(collectionId, recipeId);
      const jwtToken = Cookies.get("jwtToken");

      await axios.post(
        `https://localhost:7164/api/collections/${collectionId}/recipes/addrecipe`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            recipeId,
          },
        }
      );

      setSelectedRecipeId("");
      setShowAddToCollection(false);
    } catch (error) {
      console.error("Error adding recipe to existing collection:", error);
    }
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
        <p className="error">{error}</p>;
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
        open={open}
        onClose={handleClose}
      />
      <StyledRecipesTitle>All Recipes</StyledRecipesTitle>
      {recipes.length > 0 ? (
        <StyledRecipeList>
          {recipes.map((recipe) => (
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
                    <StyledButton
                      type="button"
                      variant="outlined"
                      sx={{ mt: 3, mb: 2 }}
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
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleAddToCollection(recipe.id)}>
                Add to Collection
              </StyledButton>
            </StyledListItem>
          ))}
        </StyledRecipeList>
      ) : (
        <StyledNoRecipes>No recipes found.</StyledNoRecipes>
      )}
      {showAddToCollection && (
        <StyledAddToCollectionSection>
          <h3>Add to Collection</h3>
          <StyledCollectionContainer>
            <p>Create a new collection:</p>
            <StyledInput
              type="text"
              placeholder="Collection Name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="Collection Description"
              value={newCollectionDescription}
              onChange={(e) => setNewCollectionDescription(e.target.value)}
            />
            <StyledButton
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAddToNewCollection}>
              Create New Collection
            </StyledButton>
          </StyledCollectionContainer>
          {!!collections?.length && (
            <StyledCollectionContainer>
              <p>Choose an existing collection:</p>
              <StyledSelect
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}>
                <option value="">Select a collection</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </StyledSelect>
              <StyledButton
                type="button"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAddToExistingCollection}>
                Add to Existing Collection
              </StyledButton>
            </StyledCollectionContainer>
          )}
        </StyledAddToCollectionSection>
      )}
    </StyledRecipesContainer>
  );
};

export default MyRecipes;
