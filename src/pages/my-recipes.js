import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledListItem = styled.li`
  border: 1px solid deepskyblue;
  background: aliceblue;
  padding: 15px;
  margin: 15px;
`;

const StyledInput = styled.input`
  height: 30px;
`;

const StyledSelect = styled.select`
  height: 36px;
`;

const StyledFormItem = styled.div`
  padding: 10px;
`;

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showAddToCookbook, setShowAddToCookbook] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const [newCookbookName, setNewCookbookName] = useState("");
  const [newCookbookDescription, setNewCookbookDescription] = useState("");
  const [selectedCookbook, setSelectedCookbook] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        const response = await axios.get(
          "https://localhost:7164/api/recipes/user",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCookbooks = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        const response = await axios.get(
          "https://localhost:7164/api/cookbooks/all",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setCookbooks(response.data);
      } catch (error) {
        console.error("Error fetching cookbooks:", error);
      }
    };

    if (showAddToCookbook) {
      fetchCookbooks();
    }
  }, [showAddToCookbook]);

  const handleUpdateRecipe = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const {
        id,
        name,
        description,
        ingredients,
        instructions,
        tags,
        cuisineId,
        prepTime,
        cookTime,
        servings,
        yield1,
        calories,
        audioInstructions,
        videoInstructions,
      } = editingRecipe;

      const updatedRecipe = {
        id,
        name,
        description,
        ingredients: ingredients.map((ingredient) => ingredient.name),
        instructions: instructions.map(
          (instruction) => instruction.stepDescription
        ),
        tags: tags.map((tag) => ({ id: tag.id, name: tag.name })),
        cuisineId,
        prepTime,
        cookTime,
        servings,
        yield: yield1,
        calories,
        audioInstructions,
        videoInstructions,
      };

      console.log(JSON.stringify(updatedRecipe));

      await axios.put(
        `https://localhost:7164/api/recipes`,
        JSON.stringify(updatedRecipe),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const response = await axios.get(
        "https://localhost:7164/api/recipes/user",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = async (id) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios.delete(`https://localhost:7164/api/recipes/${id}`);
      const response = await axios.get(
        "https://localhost:7164/api/recipes/user",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleEditClick = (recipe) => {
    setEditingRecipe({ ...recipe });
  };

  const handleCancelEdit = () => {
    setEditingRecipe(null);
  };
  const handleAddInstruction = () => {
    setEditingRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...prevRecipe.instructions, { stepDescription: "" }],
    }));
  };

  const handleDeleteInstruction = (index) => {
    setEditingRecipe((prevRecipe) => {
      const updatedInstructions = [...prevRecipe.instructions];
      updatedInstructions.splice(index, 1);
      return {
        ...prevRecipe,
        instructions: updatedInstructions,
      };
    });
  };

  const handleAddIngredient = () => {
    setEditingRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, { name: "" }],
    }));
  };

  const handleDeleteIngredient = (index) => {
    setEditingRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients.splice(index, 1);
      return {
        ...prevRecipe,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleAddTag = () => {
    setEditingRecipe((prevRecipe) => ({
      ...prevRecipe,
      tags: [...prevRecipe.tags, { id: "", name: "" }],
    }));
  };

  const handleDeleteTag = (index) => {
    setEditingRecipe((prevRecipe) => {
      const updatedTags = [...prevRecipe.tags];
      updatedTags.splice(index, 1);
      return {
        ...prevRecipe,
        tags: updatedTags,
      };
    });
  };
  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    setEditingRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], name: value };
      return {
        ...prevRecipe,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleInstructionChange = (e, index) => {
    const { value } = e.target;
    setEditingRecipe((prevRecipe) => {
      const updatedInstructions = [...prevRecipe.instructions];
      updatedInstructions[index] = {
        ...updatedInstructions[index],
        stepDescription: value,
      };
      return {
        ...prevRecipe,
        instructions: updatedInstructions,
      };
    });
  };
  const handleTagChange = (e, index) => {
    const { value } = e.target;
    setEditingRecipe((prevRecipe) => {
      const updatedTags = [...prevRecipe.tags];
      updatedTags[index] = { ...updatedTags[index], name: value };
      return {
        ...prevRecipe,
        tags: updatedTags,
      };
    });
  };

  const handleAddToCookbook = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowAddToCookbook(true);
  };

  const handleAddToNewCookbook = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const newCookbook = {
        name: newCookbookName,
        description: newCookbookDescription,
        recipes: [selectedRecipeId], // Assuming the recipe ID is required for adding to a cookbook
      };
      console.log(JSON.stringify(newCookbook));
      await axios.post(
        "https://localhost:7164/api/cookbooks",
        JSON.stringify(newCookbook),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Fetch updated cookbooks list
      const response = await axios.get(
        "https://localhost:7164/api/cookbooks/all",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setCookbooks(response.data);

      // Reset the form
      setNewCookbookName("");
      setNewCookbookDescription("");
      setSelectedCookbook("");
      setSelectedRecipeId("");
      setShowAddToCookbook(false);
    } catch (error) {
      console.error("Error creating new cookbook:", error);
    }
  };

  const handleAddToExistingCookbook = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      const cookBookId = selectedCookbook;
      const recipeId = selectedRecipeId;
      //const recipeId = editingRecipe.id; // Assuming the recipe ID is required for adding to a cookbook

      await axios.put(`https://localhost:7164/api/cookbooks/addRecipe`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          cookBookId,
          recipeId,
        },
      });

      // Reset the form
      setSelectedRecipeId("");
      setSelectedCookbook("");
      setShowAddToCookbook(false);
    } catch (error) {
      console.error("Error adding recipe to existing cookbook:", error);
    }
  };

  return (
    <div>
      <h3>Your Recipes</h3>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <StyledListItem key={recipe.id}>
            <h4 className="recipe-name">{recipe.name}</h4>
            <p className="recipe-description">{recipe.description}</p>
            <p className="recipe-cuisine">Cuisine: {recipe.cuisine.name}</p>
            <ul className="tag-list">
              {recipe.tags.map((tag) => (
                <li className="tag-item" key={tag.id}>
                  {tag.name}
                </li>
              ))}
            </ul>
            <p className="recipe-prep-time">
              Prep Time: {recipe.prepTime} minutes
            </p>
            <p className="recipe-cook-time">
              Cook Time: {recipe.cookTime} minutes
            </p>
            <p className="recipe-total-time">
              Total Time: {recipe.totalTime} minutes
            </p>
            <p className="recipe-total-time">yield: {recipe.yield} minutes</p>
            <ul className="ingredient-list">
              {recipe.ingredients.map((ingredient) => (
                <li className="ingredient-item" key={ingredient.id}>
                  {ingredient.name} - {ingredient.amount} {ingredient.unit}
                </li>
              ))}
            </ul>
            <ol className="instruction-list">
              {recipe.instructions.map((instruction) => (
                <li className="instruction-item" key={instruction.id}>
                  Step {instruction.stepNumber}: {instruction.stepDescription}
                </li>
              ))}
            </ol>
            <Button
              type="button"
              variant="outlined"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleDeleteRecipe(recipe.id)}>
              Delete Recipe
            </Button>
            {editingRecipe && editingRecipe.id === recipe.id ? (
              <div>
                {/* Form to update the recipe */}
                <h4>Update Recipe</h4>
                <StyledFormItem>
                  <label>Name:</label>
                  <StyledInput
                    type="text"
                    name="name"
                    value={editingRecipe.name}
                    onChange={handleInputChange}
                  />
                </StyledFormItem>
                <StyledFormItem>
                  <label>Description:</label>
                  <StyledInput
                    type="text"
                    name="description"
                    value={editingRecipe.description}
                    onChange={handleInputChange}
                  />
                </StyledFormItem>

                <StyledFormItem>
                  <label>Instructions:</label>
                  {editingRecipe.instructions.map((instruction, index) => (
                    <div key={index}>
                      <StyledInput
                        type="text"
                        value={instruction.stepDescription}
                        onChange={(e) => handleInstructionChange(e, index)}
                      />
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleDeleteInstruction(index)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                </StyledFormItem>

                <StyledFormItem>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleAddInstruction}>
                    Add Step
                  </Button>
                </StyledFormItem>

                <StyledFormItem>
                  <label>Ingredients:</label>
                  {editingRecipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <StyledInput
                        type="text"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(e, index)}
                      />
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleDeleteIngredient(index)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                </StyledFormItem>

                <StyledFormItem>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleAddIngredient}>
                    Add Ingredient
                  </Button>
                </StyledFormItem>

                <StyledFormItem>
                  <label>Tags:</label>
                  {editingRecipe.tags.map((tag, index) => (
                    <div key={index}>
                      <StyledInput
                        type="text"
                        value={tag.name}
                        onChange={(e) => handleTagChange(e, index)}
                      />
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleDeleteTag(index)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                </StyledFormItem>

                <StyledFormItem>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleAddTag}>
                    Add Tag
                  </Button>
                </StyledFormItem>

                <StyledFormItem>
                  <label>Prep Time:</label>

                  <StyledInput
                    type="number"
                    name="prepTime"
                    value={editingRecipe.prepTime}
                    onChange={handleInputChange}
                  />
                </StyledFormItem>

                <StyledFormItem>
                  <label>Cook Time:</label>

                  <StyledInput
                    type="number"
                    name="cookTime"
                    value={editingRecipe.cookTime}
                    onChange={handleInputChange}
                  />
                </StyledFormItem>

                <StyledFormItem>
                  <label>Servings:</label>

                  <StyledInput
                    type="number"
                    name="servings"
                    value={editingRecipe.servings}
                    onChange={handleInputChange}
                  />
                </StyledFormItem>

                <StyledFormItem>
                  <label>Yield:</label>

                  <StyledInput
                    type="text"
                    name="yield"
                    value={editingRecipe.yield}
                    onChange={handleInputChange}
                  />
                </StyledFormItem>

                <StyledFormItem>
                  <label>Calories:</label>

                  <StyledInput
                    type="number"
                    name="calories"
                    value={editingRecipe.calories}
                    onChange={handleInputChange}
                  />
                </StyledFormItem>

                <StyledFormItem>
                  <label>Audio Instructions:</label>

                  <textarea
                    name="audioInstructions"
                    value={editingRecipe.audioInstructions}
                    onChange={handleInputChange}></textarea>
                </StyledFormItem>

                <StyledFormItem>
                  <label>Video Instructions:</label>

                  <textarea
                    name="videoInstructions"
                    value={editingRecipe.videoInstructions}
                    onChange={handleInputChange}></textarea>
                </StyledFormItem>

                <StyledFormItem>
                  {/* Add more input fields for other recipe properties */}
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleUpdateRecipe}>
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </StyledFormItem>
              </div>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleEditClick(recipe)}>
                  Update Recipe
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleAddToCookbook(recipe.id)}>
                  Add to Cookbook
                </Button>
              </>
            )}
          </StyledListItem>
        ))}
      </ul>
      {showAddToCookbook && (
        <div className="add-to-cookbook-modal">
          <h3>Add to Cookbook</h3>
          <div>
            <p>Create a new cookbook:</p>
            <StyledInput
              type="text"
              placeholder="Cookbook Name"
              value={newCookbookName}
              onChange={(e) => setNewCookbookName(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="Cookbook Description"
              value={newCookbookDescription}
              onChange={(e) => setNewCookbookDescription(e.target.value)}
            />
            <Button
              type="button"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAddToNewCookbook}>
              Create New Cookbook
            </Button>
          </div>
          {!!cookbooks.length && (
            <div>
              <p>Choose an existing cookbook:</p>
              <StyledSelect
                value={selectedCookbook}
                onChange={(e) => setSelectedCookbook(e.target.value)}>
                <option value="">Select a cookbook</option>
                {cookbooks.map((cookbook) => (
                  <option key={cookbook.id} value={cookbook.id}>
                    {cookbook.name}
                  </option>
                ))}
              </StyledSelect>
              <Button
                type="button"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAddToExistingCookbook}>
                Add to Existing Cookbook
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
