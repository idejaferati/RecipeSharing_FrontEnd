import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import { StyledButton } from "./../shared/shared-style";
import { API_PATH } from "../constants";

const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const StyledAnchorContainer = styled.div`
  height: 36px;
  width: 88px;
  border: 1px solid green;
  background: lightgreen;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: darkseagreen;
    cursor: pointer;
  }
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  color: green;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
`;

const Shopping = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchShoppingList();
  }, []);

  const fetchShoppingList = () => {
    const jwtToken = Cookies.get("jwtToken");
    axios
      .get(API_PATH + "ShoppingList", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  const deleteProduct = (itemId) => {
    const jwtToken = Cookies.get("jwtToken");
    axios
      .delete(API_PATH + `ShoppingList/${itemId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then(() => fetchShoppingList())
      .catch((error) => console.log(error));
  };

  const buyProduct = (itemId) => {
    const jwtToken = Cookies.get("jwtToken");
    axios
      .get(API_PATH + `shoppinglist/getlink/${itemId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        // Handle the response, e.g., open the link in a new tab
        const link = response.data.link;
        console.log(response.data.link);
        window.open(link, "_blank");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              {product.name} - {product.quantity}
            </div>
            <StyledButtonsContainer>
              <StyledButton
                type="button"
                variant="outlined"
                color="error"
                style={{ margin: "0px" }}
                sx={{ mt: 3, mb: 2 }}
                onClick={() => deleteProduct(product.id)}>
                Delete
              </StyledButton>
              <StyledAnchorContainer>
                <StyledAnchor
                  href={`http://www.walmart.com/search?q=${encodeURIComponent(
                    product.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  Buy
                </StyledAnchor>
              </StyledAnchorContainer>
            </StyledButtonsContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shopping;
