import React from "react";
import { PRODUCTS } from './../data/products';
import Product from './../components/product/index';
import styled from "styled-components";

const OuterContainer = styled.div`
	display: flex;
	justify-content: right;
	align-items: right;
	height: 100vh;
	flex-direction: column;
`;

const TitleDiv = styled.div`
	margin-top: 20px;
	text-align: center;
	font-size: 10px;
`;

const GridContainer = styled.div`
	width: 100%;
	height: auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	place-items: center;
`;

const MyRecipes = () => {
  return (
    <OuterContainer>
      <TitleDiv>
        <h1>Recipes</h1>
      </TitleDiv>

      <GridContainer>
        {PRODUCTS.map((product) => (
          <Product data={product} key={product.id}/>
        ))}
      </GridContainer>
    </OuterContainer>
  );
};

export default MyRecipes;