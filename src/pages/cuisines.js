import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import useAuth from "./../components/hooks/use-auth";

const StyledContainer = styled.div`
  display: initial;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  //border: 1px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
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

  useEffect(() => {
    // Fetch all cuisines
    axios
      .get("https://localhost:7164/api/cuisines")
      .then((response) => {
        setCuisines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cuisines:", error);
      });
  }, []);

  const handleGetRecipesByCuisineId = (id) => {
    const selectedCuisine = cuisines.find((cuisine) => cuisine.id === id);
    if (selectedCuisine) {
      // Redirect to the recipes page with the cuisine name as a URL parameter
      window.location.href = `http://localhost:3000/recipes?cuisine=${encodeURIComponent(
        selectedCuisine.name
      )}`;
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
  };

  return (
    <StyledContainer>
      <div>
        {selectedCuisine ? (
          <div>
            <h1>{selectedCuisine.name}</h1>
            <p>{selectedCuisine.description}</p>
            {selectedCuisine &&
            selectedCuisine.recipes &&
            selectedCuisine.recipes.length > 0 ? (
              <div>
                <h2>Recipes:</h2>
                <ul>
                  {selectedCuisine.recipes.map((recipe) => (
                    <li key={recipe.id}>{recipe.name}</li>
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
            {role == "user" && (
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
                <h2>{cuisine.name}</h2>
                <p>
                  <small>{cuisine.description}</small>
                </p>
                <StyledButton
                  onClick={() => handleGetRecipesByCuisineId(cuisine.id)}>
                  Get Recipes
                </StyledButton>
              </StyledCuisineCard>
            ))}
          </>
        )}
      </div>
    </StyledContainer>
  );
};

export default Cuisines;
