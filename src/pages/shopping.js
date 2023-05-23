import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-context";
import CartItem from "../components/cart-item/index";
import { useNavigate } from "react-router-dom";
import { SHOPPING_LIST } from "./../data/products";
import Button from "@mui/material/Button";
import { ContactDialog } from "./../components/contact-dialog";
import styled from "styled-components";
import axios from "axios";

const StyledOuterContainer = styled.div`
  display: flex;
  height: 88vh;
  overflow: scroll;
  flex-direction: column;
`;

const StyledShoppingItemsContainer = styled.div`
  display: "flex";
  justify-content: "space-between";
  width: "340px";
`;

const Shopping = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchShopingList = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7164/api/ShoppingList"
        );
        setShoppingList(response.data);
      } catch (error) {
        console.error("Error fetching shopping list:", error);
      }
    };

    fetchShopingList();
  }, []);

  return (
    <StyledOuterContainer>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div>
        {
          /*shoppingList.*/ SHOPPING_LIST.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem key={product.id} data={product} />;
            }
            return null;
          })
        }
      </div>

      {totalAmount > 0 ? (
        <div>
          {/* <hr></hr>
          <p> Subtotal: ${totalAmount} </p>
          <StyledShoppingItemsContainer>
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}>
              Continue Shopping
            </Button>
            <Button
              onClick={() => {
                //checkout();
                handleClickOpen();
                //navigate("/checkout");
              }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {" "}
              Checkout{" "}
            </Button>
            <ContactDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
          </StyledShoppingItemsContainer> */}
        </div>
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
