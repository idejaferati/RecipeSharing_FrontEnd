import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import CartItem from "../components/cart-item/index";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from './../data/products';
import Button from "@mui/material/Button";

const Shopping = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
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
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '340px'
          }}>
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}>
              Continue Shopping
            </Button>
            <Button
              onClick={() => {
                checkout();
                navigate("/checkout");
              }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {" "}
              Checkout{" "}
            </Button>
          </div>
        </div>
      ) : (
        <h3> Your Shopping Cart is Empty. Proceed to Recipes to add items in the Cart.</h3>
      )}
    </div>
  );
};

export default Shopping;
