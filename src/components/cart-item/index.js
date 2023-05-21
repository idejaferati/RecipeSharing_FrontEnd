import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const StyledImg = styled.img`
  border-radius: 15px;
  width: 50px;
  height: 50px;
`;

const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem">
      <StyledImg src={productImage}/>
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Price: ${price}</p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '340px'
        }}>
          <Button
            onClick={() => removeFromCart(id)}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            -
          </Button>
          <TextField
            autoComplete="amount"
            id="amount"
            label="Amount"
            disabled
            value={cartItems[id]}
            size="small" 
            style = {{width: 100}} 
            onChange={(e) => updateCartItemCount(e.target.value ? Number(e.target.value) : 0, id)}
          />
          <Button
            onClick={() => addToCart(id)}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
