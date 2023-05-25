import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { StyledButton } from "./../shared/shared-style";

const Cookbooks = () => {
  const [cookbooks, setCookbooks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCookbook, setSelectedCookbook] = useState(null);

  useEffect(() => {
    fetchCookbooks();
  }, []);

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
      setError(error);
    }
  };

  const handleCookbookClick = (cookbook) => {
    setSelectedCookbook(cookbook);
  };

  const handleBackToCookbooks = () => {
    // Handle click on back button
    setSelectedCookbook(null);
  };

  if (error) {
    return (
      <>
        <p>{error.response.data}</p>
      </>
    );
  }

  return (
    <div>
      <h1>Cookbook List</h1>
      {!selectedCookbook &&
        cookbooks.map((cookbook) => (
          <div key={cookbook.id}>
            <h2>{cookbook.name}</h2>
            <p>{cookbook.description}</p>
            <StyledButton
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleCookbookClick(cookbook)}>
              View Recipes
            </StyledButton>
          </div>
        ))}

      {selectedCookbook && (
        <div>
          <h2>Selected Cookbook: {selectedCookbook.name}</h2>
          <StyledButton
            type="button"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBackToCookbooks}>
            Back to Cookbooks
          </StyledButton>
          <h3>Recipes:</h3>
          {selectedCookbook.recipes.map((recipe) => (
            <div key={recipe.id}>
              <h4>{recipe.name}</h4>
              <p>{recipe.description}</p>
              <p>Cuisine: {recipe.cuisine.name}</p>
              <p>Tags: {recipe.tags.map((tag) => tag.name).join(", ")}</p>
              <p>Prep Time: {recipe.prepTime} minutes</p>
              <p>Cook Time: {recipe.cookTime} minutes</p>
              <p>Total Time: {recipe.totalTime} minutes</p>
              <h5>Ingredients:</h5>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.name} - {ingredient.amount} {ingredient.unit}
                  </li>
                ))}
              </ul>
              <h5>Steps:</h5>
              <ol>
                {recipe.instructions.map((instruction) => (
                  <li key={instruction.id}>{instruction.stepDescription}</li>
                ))}
              </ol>
              {recipe.audioInstructions && (
                <p>Audio Instructions: {recipe.audioInstructions}</p>
              )}
              {recipe.videoInstructions && (
                <p>Video Instructions: {recipe.videoInstructions}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cookbooks;
