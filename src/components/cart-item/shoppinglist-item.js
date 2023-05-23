import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import axios from "axios";

const ShoppingList = (props) => {
  const { recipe, data } = props;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);
  const [link, setLink] = useState("");

  useEffect(() => {
    recipe.ingredients.forEach((ing) =>
      updateCartItemCount(ing.amount, ing.id)
    );

    const fetchBuyLink = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7164/api/ShoppingList/getlink/${recipe.id}`
        );
        setLink(response.data);
      } catch (error) {
        console.error("Error fetching shopping list:", error);
      }
    };

    fetchBuyLink();
  }, []);

  const updateShoppingList = async (e, id) => {
    updateCartItemCount(e.target.value ? Number(e.target.value) : 0, id);
    const currentData = { ...data };

    const recipeIndex = currentData.user.recipes.findIndex(
      (el) => el.id === recipe.id
    );
    const ingIndex = currentData.user.recipes[recipeIndex].findIndex(
      (el) => el.id === id
    );
    const ing = currentData.user.recipes[recipeIndex].ingredients[ingIndex];
    ing.amount = cartItems[id];
    currentData.user.recipes[recipeIndex].ingredients[ingIndex] = ing;

    try {
      await axios.get(
        `https://localhost:7164/api/ShoppingList/${currentData.id}`,
        {
          params: currentData,
        }
      );
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return "N/A";
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1) + "/5.0";
  };

  return (
    <div className="cartItem">
      <div>
        <div>
          <h2>{recipe.name}</h2>
          <Button color="primary" variant="contained" href={link}>
            Buy recipe here
          </Button>
          <Button color="error" variant="contained" onClick={props.onDelete}>
            Delete
          </Button>
        </div>

        <h4>{recipe.description}</h4>
        <h4>Review: {calculateAverageRating(recipe.reviews)}</h4>
      </div>
      <div>
        <br />
        The recipe contains the following ingredients:
        {recipe.ingredients.map((ing) => (
          <div>
            <h5>{ing.name}</h5>
            <Button
              onClick={() => removeFromCart(ing.id)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              -
            </Button>
            <TextField
              autoComplete="amount"
              id="amount"
              disabled
              value={cartItems[ing.id]}
              size="small"
              style={{ width: 100 }}
              onChange={(e) => updateShoppingList(e, ing.id)}
            />
            <Button
              onClick={() => addToCart(ing.id)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              +
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
