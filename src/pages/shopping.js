import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-context";
import CartItem from "../components/cart-item/index";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";

const StyledOuterContainer = styled.div`
  display: flex;
  height: 88vh;
  overflow: scroll;
  flex-direction: column;
`;

const Shopping = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const navigate = useNavigate();

  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchShoppingList = async () => {
      const jwtToken = Cookies.get("jwtToken");
      try {
        const response = await axios.get(
          "https://localhost:7164/api/ShoppingList",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setShoppingList(response.data);
      } catch (error) {
        console.error("Error fetching shopping list:", error);
      }
    };

    fetchShoppingList();
  }, []);

  return (
    <StyledOuterContainer>
      {shoppingList?.length > 0 ? (
        <>
          <div>
            <h1>Your Cart Items</h1>
          </div>
          <div>
            {shoppingList.map((product) => {
              if (cartItems[product.id] !== 0) {
                return <CartItem key={product.id} data={product} />;
              }
              return null;
            })}
          </div>
        </>
      ) : (
        <h3>
          {" "}
          Your Shopping Cart is Empty. Proceed to Recipes to add items in the
          Cart.
        </h3>
      )}
    </StyledOuterContainer>
  );
};

export default Shopping;
