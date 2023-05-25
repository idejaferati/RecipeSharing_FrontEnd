import React, { useState } from "react";
import ShoppingList from "./shoppinglist-item";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const CartItem = (props) => {
  const { user } = props.data;
  console.log("PROSPPSL:", props);
  const [recipes, setRecipes] = useState(user?.recipes);
  const navigate = useNavigate();

  const deleteRecipe = async (id) => {
    const recipeIndex = props.data.user?.recipes?.findIndex(
      (el) => el.id === id
    );
    const currentRecipes = [...recipes];
    currentRecipes.splice(recipeIndex, 1);
    setRecipes(currentRecipes);

    try {
      await axios.delete(`https://localhost:7164/api/ShoppingList/${id}`);
    } catch (error) {
      console.error("Error deleting shopping list:", error);
    }
  };
  return (
    <div className="cartItem">
      {/* <StyledImg src={productImage}/> */}
      <div className="description">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "340px",
          }}>
          {recipes?.map((recipe) => (
            <ShoppingList
              recipe={recipe}
              data={props.data}
              onDelete={() => deleteRecipe(recipe.id)}
            />
          ))}
        </div>
        <Button
          onClick={() => navigate("/recipes")}
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
