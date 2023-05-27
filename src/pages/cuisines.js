import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeImg from "../images/mainImg.jpg";
import styled from "styled-components";
import useAuth from "./../components/hooks/use-auth";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${HomeImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 300px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  padding: 8px 12px;
  background-color: #5fd9c2;
  color: black;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #5fd9c2;
  }
`;

const StyledCuisineCard = styled.div`
  flex: 0 0 300px;
  padding: 20px;
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }

  button {
    margin-top: 10px;
    margin-left: 3px;
    margin-right: 3px;
  }
`;

const Cuisines = () => {
  const [cuisines, setCuisines] = useState([]);
  const [newCuisineData, setNewCuisineData] = useState({
    name: "",
    description: "",
  });
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const { auth } = useAuth();
  const role = auth?.role;
  const [selectedCuisineRecipes, setSelectedCuisineRecipes] = useState([]);

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchCuisines = () => {
    axios
      .get("https://localhost:7164/api/cuisines")
      .then((response) => {
        setCuisines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cuisines:", error);
      });
  };

  const handleGetRecipesByCuisineId = (id) => {
    const selectedCuisine = cuisines.find((cuisine) => cuisine.id === id);
    if (selectedCuisine) {
      // Fetch recipes for the selected cuisine
      axios
        .get(`https://localhost:7164/api/recipes/cuisine/${id}`)
        .then((response) => {
          setSelectedCuisineRecipes(response.data);
          setSelectedCuisine(selectedCuisine);
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
        });
    }
  };

  const handleAddCuisine = (event) => {
    event.preventDefault();
    // Validate cuisine data
    if (!newCuisineData.name || !newCuisineData.description) {
      window.alert("Please enter both cuisine name and description.");
      return;
    }

    // Check if the cuisine already exists
    const isCuisineExist = cuisines.some(
      (cuisine) =>
        cuisine.name.toLowerCase() === newCuisineData.name.toLowerCase()
    );
    if (isCuisineExist) {
      window.alert(`The cuisine '${newCuisineData.name}' already exists.`);
      return;
    }

    // Add a new cuisine
    axios
      .post("https://localhost:7164/api/cuisines", newCuisineData)
      .then((response) => {
        console.log("New cuisine added:", response.data);
        // Refresh the cuisines list
        fetchCuisines();
        axios
          .get("https://localhost:7164/api/cuisines")
          .then((response) => {
            setCuisines(response.data);
          })
          .catch((error) => {
            console.error("Error fetching cuisines:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding new cuisine:", error);
      });

    // Clear the form input values
    setNewCuisineData({
      name: "",
      description: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCuisineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGoBack = () => {
    setSelectedCuisine(null);
    setSelectedCuisineRecipes([]);
  };

  const handleDeleteCuisine = (cuisineId) => {
    // Confirm the deletion
    if (window.confirm("Are you sure you want to delete this cuisine?")) {
      // Delete the cuisine
      axios
        .delete(`https://localhost:7164/api/cuisines/${cuisineId}`)
        .then((response) => {
          console.log("Cuisine deleted:", response.data);
          // Refresh the cuisines list
          fetchCuisines();
        })
        .catch((error) => {
          console.error("Error deleting cuisine:", error);
        });
    }
  };

  return (
    <StyledContainer>
      <div>
        {selectedCuisine ? (
          <div>
            <h1>{selectedCuisine.name}</h1>
            <p>{selectedCuisine.description}</p>
            {selectedCuisineRecipes && selectedCuisineRecipes.length > 0 ? (
              <div>
                <h2>Recipes:</h2>
                <ul>
                  {selectedCuisine.recipes.map((recipe) => (
                    <li className="recipe-item" key={recipe.id}>
                      {" "}
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
                        <strong>Cuisines:</strong> {recipe.cuisine.name}
                      </p>{" "}
                      {/* Display cuisine name */}
                      <h4 className="recipe-subtitle">Ingredients:</h4>
                      <ul className="ingredient-list">
                        {recipe.ingredients.map((ingredient) => (
                          <li className="ingredient-item" key={ingredient.id}>
                            {ingredient.name} - {ingredient.amount}{" "}
                            {ingredient.unit}
                          </li>
                        ))}
                      </ul>
                      <h4 className="recipe-subtitle">Instructions:</h4>
                      <ol className="instruction-list">
                        {recipe.instructions.map((instruction) => (
                          <li className="instruction-item" key={instruction.id}>
                            Step {instruction.stepNumber}:{" "}
                            {instruction.stepDescription}
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>There are no recipes for this cuisine.</p>
            )}

            <StyledButton onClick={handleGoBack}>Go Back</StyledButton>
          </div>
        ) : (
          <>
            {role == "admin" && (
              <StyledForm onSubmit={handleAddCuisine}>
                <h2>ADD A NEW CUISINE</h2>
                <StyledInput
                  type="text"
                  name="name"
                  value={newCuisineData.name}
                  placeholder="Cuisine Name"
                  onChange={handleInputChange}
                />
                <StyledInput
                  type="text"
                  name="description"
                  value={newCuisineData.description}
                  placeholder="Cuisine Description"
                  onChange={handleInputChange}
                />
                <StyledButton type="submit">Add Cuisine</StyledButton>
              </StyledForm>
            )}

            {cuisines.map((cuisine) => (
              <StyledCuisineCard key={cuisine.id}>
                <h2 style={{ textTransform: "uppercase", textAlign: "center" }}>
                  {cuisine.name}
                </h2>
                <StyledButton
                  onClick={() => handleGetRecipesByCuisineId(cuisine.id)}>
                  SHow Recipes
                </StyledButton>
                {role == "admin" && (
                  <StyledButton onClick={() => handleDeleteCuisine(cuisine.id)}>
                    Delete
                  </StyledButton>
                )}
              </StyledCuisineCard>
            ))}
          </>
        )}
      </div>
    </StyledContainer>
  );
};

export default Cuisines; // or export default [...];
