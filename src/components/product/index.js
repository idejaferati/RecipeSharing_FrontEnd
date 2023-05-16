import React, { useContext } from "react";
import { ShopContext } from './../../context/shop-context';
import Button from "@mui/material/Button";

const Product = (props) => {
    const EMPTY_CART = { addToCart: ()=>{}, cartItems: [] }; // To ensure that default value is singleton and avoid useless re-renders
    const { id, productName, price, productImage } = props.data;
    const context = useContext(ShopContext) || EMPTY_CART;
    const { addToCart, cartItems } = context;
    
    const cartItemCount = cartItems[id];

    return (
      <div style={{
        borderRadius: '15px',
        width: '250px',
        height: '250px',
        margin: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img src={productImage} style={{
          borderRadius: '15px',
          width: '70px',
          height: '70px',
        }}/>
        <div className="description">
          <p>
            <b>{productName}</b>
          </p>
          <p> ${price}</p>
        </div>
        <Button
          onClick={() => addToCart(id)}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
        </Button>
      </div>
    );
  };

  export default Product;