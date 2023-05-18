import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import CartItem from "../components/cart-item/index";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from './../data/products';
import Button from "@mui/material/Button";
import { ContactDialog } from './../components/contact-dialog';
import styled from "styled-components";

const OuterContainer = styled.div`
	display: flex;
	height: 88vh;
  overflow: scroll;
	flex-direction: column;
`;

const ShoppingItemsContainer = styled.div`
  display: 'flex';
  justify-content: 'space-between';
  width: '340px';
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

  return (
    <OuterContainer>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div>
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null;
        })}
      </div>

      {totalAmount > 0 ? (
        <div>
          <hr></hr>
          <p> Subtotal: ${totalAmount} </p>
          <ShoppingItemsContainer>
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
          </ShoppingItemsContainer>
        </div>
      ) : (
        <h3> Your Shopping Cart is Empty. Proceed to Recipes to add items in the Cart.</h3>
      )}
    </OuterContainer>
  );
};

export default Shopping;
