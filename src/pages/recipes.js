import React from "react";
import { PRODUCTS } from './../data/products';
import Product from './../components/product/index';

const MyRecipes = () => {
  return (
    <div style={{
		display: 'flex',
		justifyContent: 'Right',
		alignItems: 'Right',
		height: '100vh'
	}}>
      <div style={{	
		marginTop: '100px',
		textAlign: 'center',
		fontSize: '40px'
	  }}>
        <h1>Recipes</h1>
      </div>

      <div style={{	
		width: '100%',
		height: 'auto',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		placeItems: 'center'
	  }}>
        {PRODUCTS.map((product) => (
          <Product data={product} key={product.id}/>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;