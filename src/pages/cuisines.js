import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import useAuth from "./../components/hooks/use-auth";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  padding-top: 60px;
  padding-bottom: 60px;
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
  margin-left: 100px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #5fd9c2;
  }
`;

const StyledCuisineCard = styled.div`
  flex: 0 0 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const StyledRecipeSection = styled.div`
  width: 100%;
  max-width: 1300px;
  overflow-y: auto;
  min-height: 400px; /* Adjust this value to make the div taller */
  padding: 0 20px; /* Add padding to create some spacing */
`;

const StyledRecipeCard = styled.li`
  padding: 15px;
  border-radius: 10px;
  margin: 15px auto;
  background: aliceblue;
  border: 1px solid dodgerblue;
  width: 70vw;
  max-width: auto;
  min-width: auto;
`;

const StyledRecipeImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const StyledRecipeTitle = styled.h3`
  margin-bottom: 5px;
`;

const StyledRecipeDescription = styled.p`
  margin-bottom: 10px;
`;

const StyledRecipeInfo = styled.p`
  margin-bottom: 5px;
`;

const StyledTags = styled.div`
  margin-bottom: 10px;
`;

const StyledTag = styled.span`
  background-color: #5fd9c2;
  color: black;
  padding: 3px 6px;
  border-radius: 4px;
  margin-right: 5px;
`;

const StyledUserDetails = styled.div`
  margin-top: 10px;
`;

const StyledUserEmail = styled.p`
  margin-bottom: 5px;
`;

const StyledSubtitle = styled.h4`
  margin-bottom: 5px;
`;

const StyledIngredientList = styled.ul`
  margin-bottom: 10px;
`;

const StyledInstructionList = styled.ol`
  margin-bottom: 10px;
`;

const StyledRecipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 20px;
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
            <StyledRecipeHeader>
              <h1>{selectedCuisine.name}</h1>
              <p>{selectedCuisine.description}</p>
            </StyledRecipeHeader>
            <StyledRecipeHeader>
              <h2>Recipes:</h2>
            </StyledRecipeHeader>
            {selectedCuisineRecipes && selectedCuisineRecipes.length > 0 ? (
              <div>
                <StyledRecipeSection>
                  <ul>
                    {selectedCuisineRecipes.map((recipe) => (
                      <StyledRecipeCard key={recipe.id}>
                        <StyledRecipeImage
                          src={recipe.audioInstructions}
                          alt="Recipe"
                        />
                        <StyledRecipeTitle>{recipe.name}</StyledRecipeTitle>
                        <StyledRecipeDescription>
                          {recipe.description}
                        </StyledRecipeDescription>
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
                        <p>
                          <strong>Cuisines:</strong> {recipe.cuisine.name}
                        </p>
                        <StyledSubtitle>Ingredients:</StyledSubtitle>
                        <StyledIngredientList>
                          {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient.id}>
                              {ingredient.name} - {ingredient.amount}{" "}
                              {ingredient.unit}
                            </li>
                          ))}
                        </StyledIngredientList>
                        <StyledSubtitle>Instructions:</StyledSubtitle>
                        <StyledInstructionList>
                          {recipe.instructions.map((instruction) => (
                            <li key={instruction.id}>
                              Step {instruction.stepNumber}:{" "}
                              {instruction.stepDescription}
                            </li>
                          ))}
                        </StyledInstructionList>
                      </StyledRecipeCard>
                    ))}
                  </ul>
                </StyledRecipeSection>
                <StyledButton onClick={handleGoBack}>Go Back</StyledButton>
              </div>
            ) : (
              <p>There are no recipes for this cuisine.</p>
            )}
          </div>
        ) : (
          <>
            {role === "admin" && (
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
                  Show Recipes
                </StyledButton>
                {role === "admin" && (
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

export default Cuisines;
