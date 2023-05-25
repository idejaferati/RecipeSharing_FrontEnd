import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "@mui/material/Button";
import NewRecipeDialog from "./../components/new-recipe-dialog";
import Cookies from "js-cookie";

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

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        const response = await axios.get(
          "https://localhost:7164/api/recipes/getAll"
        );
        setRecipes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to fetch recipes");
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        const response = await axios.get(
          "https://localhost:7164/api/collections/user",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const deleteRecipe = async (recipeId) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios.delete(`https://localhost:7164/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setRecipes((recipes) =>
        recipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const shopRecipe = async (values) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const response = await axios.post(
        "https://localhost:7164/api/ShoppingList",
        JSON.stringify([values]),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
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

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="recipes-container">
      <StyledNewRecipeButton
        onClick={() => {
          handleClickOpen();
        }}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}>
        {" "}
        Add new recipe{" "}
      </StyledNewRecipeButton>
      <NewRecipeDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <h2 className="recipes-title">All Recipes</h2>
      {recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li className="recipe-item" key={recipe.id}>
              <img
                src={recipe.audioInstructions}
                alt="Recipe"
                className="recipe-image"
              />{" "}
              Image tag
              <h3 className="recipe-name">{recipe.name}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-details">
                <p className="recipe-info">
                  <strong>Prep Time:</strong> {recipe.prepTime} minutes
                </p>
                <p className="recipe-info">
                  <strong>Servings:</strong> {recipe.servings}
                </p>
                <p className="recipe-info">
                  <strong>Yield:</strong> {recipe.yield}
                </p>
                <p className="recipe-info">
                  <strong>Calories:</strong> {recipe.calories}
                </p>
                <div className="tags">
                  <strong>Tags:</strong>
                  {recipe.tags.map((tag) => (
                    <span key={tag.id} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="user-details">
                  <strong>Posted by:</strong> {recipe.user.firstName}{" "}
                  {recipe.user.lastName}
                  <p className="user-email">
                    <strong>Email:</strong> {recipe.user.email}
                  </p>
                </div>
              </div>
              <p className="cuisine-name">
                {" "}
                <strong>Cuisines:</strong> {recipe.cuisineName}
              </p>{" "}
              {/* Display cuisine name */}
              <h4 className="recipe-subtitle">Ingredients:</h4>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ingredient) => (
                  <li className="ingredient-item" key={ingredient.id}>
                    {ingredient.name} - {ingredient.amount} {ingredient.unit}
                  </li>
                ))}
              </ul>
              <h4 className="recipe-subtitle">Instructions:</h4>
              <ol className="instruction-list">
                {recipe.instructions.map((instruction) => (
                  <li className="instruction-item" key={instruction.id}>
                    Step {instruction.stepNumber}: {instruction.stepDescription}
                  </li>
                ))}
              </ol>
              <button
                className="delete-button"
                onClick={() => deleteRecipe(recipe.id)}>
                Delete Recipe
              </button>
              <button
                className="green-button"
                onClick={() =>
                  shopRecipe({ id: recipe.id, quantity: recipe.amount })
                }>
                Shop Recipe
              </button>
              <button
                className="add-to-collection-button"
                onClick={() => handleAddToCollection(recipe.id)}>
                Add to Collection
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-recipes">No recipes found.</p>
      )}
      {showAddToCollection && (
        <div className="add-to-collection-modal">
          <h3>Add to Collection</h3>
          <div>
            <p>Create a new collection:</p>
            <input
              type="text"
              placeholder="Collection Name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Collection Description"
              value={newCollectionDescription}
              onChange={(e) => setNewCollectionDescription(e.target.value)}
            />
            <button onClick={handleAddToNewCollection}>
              Create New Collection
            </button>
          </div>
          <div>
            <p>Choose an existing collection:</p>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}>
              <option value="">Select a collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddToExistingCollection}>
              Add to Existing Collection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
