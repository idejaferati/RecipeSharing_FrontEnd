import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { StyledListItem, StyledButton } from "../shared/shared-style";

const MyCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        await axios
          .get("https://localhost:7164/api/Collections/user", {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((res) => setCollections(res.data));
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const deleteCollection = async (collectionId) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios
        .delete(`https://localhost:7164/api/collections/${collectionId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then(() => {
          // Update the collections state by removing the deleted collection
          setCollections(
            collections.filter((collection) => collection.id !== collectionId)
          );
        });
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const handleUpdateCollection = (collectionId) => {
    const updatedName = prompt("Enter the updated name:");
    const updatedDescription = prompt("Enter the updated description:");
    const updatedCollection = {
      id: collectionId,
      name: updatedName,
      description: updatedDescription,
    };
    updateCollection(collectionId, updatedCollection);
  };

  const updateCollection = async (collectionId, updatedCollection) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      await axios
        .put(`https://localhost:7164/api/collections`, updatedCollection, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then(() => {
          // Update the collections state by replacing the old collection with the updated one
          setCollections(
            collections.map((collection) =>
              collection.id === collectionId
                ? { ...collection, ...updatedCollection }
                : collection
            )
          );
        });
    } catch (error) {
      console.error("Error updating collection:", error);
    }
  };

  return (
    <div className="collections-container">
      <h2 className="collections-title">Collections</h2>
      {collections.length > 0 ? (
        <ul className="collection-list">
          {collections.map((collection) => (
            <StyledListItem key={collection.id}>
              <h3 className="collection-name">{collection.name}</h3>
              <p className="collection-description">{collection.description}</p>
              <p className="collection-recipe-count">
                Number of Recipes: {collection.numberOfRecipes}
              </p>
              <StyledButton
                type="button"
                variant="outlined"
                color="error"
                style={{ marginRight: "10px" }}
                sx={{ mt: 3, mb: 2 }}
                onClick={() => deleteCollection(collection.id)}>
                Delete Collection
              </StyledButton>
              <StyledButton
                type="button"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleUpdateCollection(collection.id)}>
                Update Collection
              </StyledButton>
              <ul className="recipe-list">
                {collection.recipes.map((recipe) => (
                  <li className="recipe-item" key={recipe.id}>
                    <h4 className="recipe-name">{recipe.name}</h4>
                    <p className="recipe-description">{recipe.description}</p>
                    <p className="recipe-cuisine">
                      Cuisine: {recipe.cuisine.name}
                    </p>
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
                    <ul className="ingredient-list">
                      {recipe.ingredients.map((ingredient) => (
                        <li className="ingredient-item" key={ingredient.id}>
                          {ingredient.name} - {ingredient.amount}{" "}
                          {ingredient.unit}
                        </li>
                      ))}
                    </ul>
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
            </StyledListItem>
          ))}
        </ul>
      ) : (
        <p className="no-collections">No collections found.</p>
      )}
    </div>
  );
};

export default MyCollections;
