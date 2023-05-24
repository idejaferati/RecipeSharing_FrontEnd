import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {
	const [recipes, setRecipes] = useState([]);
	const [editingRecipe, setEditingRecipe] = useState(null);
	const [showAddToCookbook, setShowAddToCookbook] = useState(false);
	const [cookbooks, setCookbooks] = useState([]);
	const [newCookbookName, setNewCookbookName] = useState('');
	const [newCookbookDescription, setNewCookbookDescription] = useState('');
	const [selectedCookbook, setSelectedCookbook] = useState('');
	const [selectedRecipeId, setSelectedRecipeId] = useState('');
  
	useEffect(() => {
	  const fetchData = async () => {
		try {
		  const jwtToken = Cookies.get('jwtToken');
		  const response = await axios.get('https://localhost:7164/api/recipes/user',{
			headers: {
	   'Authorization': `Bearer ${jwtToken}`
		  }
		});
		setRecipes(response.data);
		} catch (error) {
		  console.error('Error fetching recipe data:', error);
		}
	  };
  
	  fetchData();
	}, []);
  
	useEffect(() => {
	  const fetchCookbooks = async () => {
		try {
		  const jwtToken = Cookies.get('jwtToken');
		  const response = await axios.get('https://localhost:7164/api/cookbooks/all', {
			headers: {
			  Authorization: `Bearer ${jwtToken}`,
			},
		  });
		  setCookbooks(response.data);
		} catch (error) {
		  console.error('Error fetching cookbooks:', error);
		}
	  };
  
	  if (showAddToCookbook) {
		fetchCookbooks();
	  }
	}, [showAddToCookbook]);
  
	const handleUpdateRecipe = async () => {
	  try {
		const jwtToken = Cookies.get('jwtToken');
		const { id, name, description, ingredients, instructions, tags, cuisineId, prepTime, cookTime, servings, yield1, calories, audioInstructions, videoInstructions } = editingRecipe;
  
		const updatedRecipe = {
		  id,
		  name,
		  description,
		  ingredients: ingredients.map(ingredient => ingredient.name),
		  instructions: instructions.map(instruction => instruction.stepDescription),
		  tags: tags.map(tag => ({ id: tag.id, name: tag.name })),
		  cuisineId,
		  prepTime,
		  cookTime,
		  servings,
		  yield: yield1,
		  calories,
		  audioInstructions,
		  videoInstructions
		};
  
		console.log(JSON.stringify(updatedRecipe));
  
		await axios.put(`https://localhost:7164/api/recipes`,JSON.stringify( updatedRecipe),{ headers: {
					 'Content-Type': 'application/json',
					 'Authorization': `Bearer ${jwtToken}`
  
				  }});
		const response = await axios.get('https://localhost:7164/api/recipes/user',{
			headers: {
	   'Authorization': `Bearer ${jwtToken}`
		  }
		});
		setRecipes(response.data);
	  } catch (error) {
		console.error('Error updating recipe:', error);
	  }
	  setEditingRecipe(null);
	};
  
	const handleDeleteRecipe = async (id) => {
	  try {
		const jwtToken = Cookies.get('jwtToken');
		await axios.delete(`https://localhost:7164/api/recipes/${id}`);
		const response = await axios.get('https://localhost:7164/api/recipes/user', {
		  headers: {
			Authorization: `Bearer ${jwtToken}`,
		  },
		});
		setRecipes(response.data);
	  } catch (error) {
		console.error('Error deleting recipe:', error);
	  }
	};
  
	const handleInputChange = (e) => {
	  const { name, value } = e.target;
	  setEditingRecipe((prevRecipe) => ({
		...prevRecipe,
		[name]: value,
	  }));
	};
  
	const handleEditClick = (recipe) => {
	  setEditingRecipe({ ...recipe });
	};
  
	const handleCancelEdit = () => {
	  setEditingRecipe(null);
	};
	const handleAddInstruction = () => {
	setEditingRecipe((prevRecipe) => ({
	  ...prevRecipe,
	  instructions: [...prevRecipe.instructions, { stepDescription: '' }],
	}));
  };
  
  const handleDeleteInstruction = (index) => {
	setEditingRecipe((prevRecipe) => {
	  const updatedInstructions = [...prevRecipe.instructions];
	  updatedInstructions.splice(index, 1);
	  return {
		...prevRecipe,
		instructions: updatedInstructions,
	  };
	});
  };
  
  const handleAddIngredient = () => {
	setEditingRecipe((prevRecipe) => ({
	  ...prevRecipe,
	  ingredients: [...prevRecipe.ingredients, { name: '' }],
	}));
  };
  
  const handleDeleteIngredient = (index) => {
	setEditingRecipe((prevRecipe) => {
	  const updatedIngredients = [...prevRecipe.ingredients];
	  updatedIngredients.splice(index, 1);
	  return {
		...prevRecipe,
		ingredients: updatedIngredients,
	  };
	});
  };
  
  const handleAddTag = () => {
	setEditingRecipe((prevRecipe) => ({
	  ...prevRecipe,
	  tags: [...prevRecipe.tags, { id: '', name: '' }],
	}));
  };
  
  const handleDeleteTag = (index) => {
	setEditingRecipe((prevRecipe) => {
	  const updatedTags = [...prevRecipe.tags];
	  updatedTags.splice(index, 1);
	  return {
		...prevRecipe,
		tags: updatedTags,
	  };
	});
  };
  const handleIngredientChange = (e, index) => {
	const { value } = e.target;
	setEditingRecipe((prevRecipe) => {
	  const updatedIngredients = [...prevRecipe.ingredients];
	  updatedIngredients[index] = { ...updatedIngredients[index], name: value };
	  return {
		...prevRecipe,
		ingredients: updatedIngredients,
	  };
	});
  };
  
  const handleInstructionChange = (e, index) => {
	const { value } = e.target;
	setEditingRecipe((prevRecipe) => {
	  const updatedInstructions = [...prevRecipe.instructions];
	  updatedInstructions[index] = { ...updatedInstructions[index], stepDescription: value };
	  return {
		...prevRecipe,
		instructions: updatedInstructions,
	  };
	});
  };
  const handleTagChange = (e, index) => {
	const { value } = e.target;
	setEditingRecipe((prevRecipe) => {
	  const updatedTags = [...prevRecipe.tags];
	  updatedTags[index] = { ...updatedTags[index], name: value };
	  return {
		...prevRecipe,
		tags: updatedTags,
	  };
	});
  };
  
  
  const handleAddToCookbook = (recipeId) => {
	setSelectedRecipeId(recipeId);
	setShowAddToCookbook(true);
  };
  
  const handleAddToNewCookbook = async () => {
	try {
	  const jwtToken = Cookies.get('jwtToken');
	  const newCookbook = {
		name: newCookbookName,
		description: newCookbookDescription,
		recipes:[ selectedRecipeId] // Assuming the recipe ID is required for adding to a cookbook
	  };
  console.log(JSON.stringify(newCookbook));
	  await axios.post('https://localhost:7164/api/cookbooks', JSON.stringify(newCookbook), {
		  headers: {
			Authorization: `Bearer ${jwtToken}`,
			'Content-Type': 'application/json'
		  },
		});
  
	  // Fetch updated cookbooks list
	  const response = await axios.get('https://localhost:7164/api/cookbooks/all', {
		headers: {
		  'Authorization': `Bearer ${jwtToken}`
		}
	  });
	  setCookbooks(response.data);
  
	  // Reset the form
	  setNewCookbookName('');
	  setNewCookbookDescription('');
	  setSelectedCookbook('');
	  setSelectedRecipeId('');
	  setShowAddToCookbook(false);
	} catch (error) {
	  console.error('Error creating new cookbook:', error);
	}
  };
  
  const handleAddToExistingCookbook = async () => {
	try {
	  const jwtToken = Cookies.get('jwtToken');
	  const cookbookId = selectedCookbook;
	  const recipeId = selectedRecipeId;
	  //const recipeId = editingRecipe.id; // Assuming the recipe ID is required for adding to a cookbook
  
	  await axios.post(
		`https://localhost:7164/api/cookbooks/addRecipe`,
		null ,
		{
		  headers: {
			Authorization: `Bearer ${jwtToken}`,
		  },params: {
			cookbookId,
			recipeId
				}}
	  );
  
	  // Reset the form
	  setSelectedRecipeId('');
	  setSelectedCookbook('');
	  setShowAddToCookbook(false);
	} catch (error) {
	  console.error('Error adding recipe to existing cookbook:', error);
	}
  };
  
	return (
	  <div>
		Your Recipes
	  <ul className="recipe-list">
		{recipes.map((recipe) => (
		  <li className="recipe-item" key={recipe.id}>
			<h4 className="recipe-name">{recipe.name}</h4>
			<p className="recipe-description">{recipe.description}</p>
			<p className="recipe-cuisine">Cuisine: {recipe.cuisine.name}</p>
			<ul className="tag-list">
			  {recipe.tags.map((tag) => (
				<li className="tag-item" key={tag.id}>
				  {tag.name}
				</li>
			  ))}
			</ul>
			<p className="recipe-prep-time">
			  Prep Time: {recipe.prepTime} minutes
			</p>
			<p className="recipe-cook-time">
			  Cook Time: {recipe.cookTime} minutes
			</p>
			<p className="recipe-total-time">
			  Total Time: {recipe.totalTime} minutes
			</p>
			<p className="recipe-total-time">
			yield: {recipe.yield} minutes
			</p>
			<ul className="ingredient-list">
			  {recipe.ingredients.map((ingredient) => (
				<li className="ingredient-item" key={ingredient.id}>
				  {ingredient.name} - {ingredient.amount} {ingredient.unit}
				</li>
			  ))}
			</ul>
			<ol className="instruction-list">
			  {recipe.instructions.map((instruction) => (
				<li className="instruction-item" key={instruction.id}>
				  Step {instruction.stepNumber}: {instruction.stepDescription}
				</li>
			  ))}
			</ol>
			<button onClick={() => handleDeleteRecipe(recipe.id)}>Delete Recipe</button>
			{editingRecipe && editingRecipe.id === recipe.id ? (
			  <div>
				{/* Form to update the recipe */}
				<h4>Update Recipe</h4>
				<label>
				  Name:
				  <input
					type="text"
					name="name"
					value={editingRecipe.name}
					onChange={handleInputChange}
				  />
				</label>
				<label>
				  Description:
				  <input
					type="text"
					name="description"
					value={editingRecipe.description}
					onChange={handleInputChange}
				  />
				</label>
				<label>
	Instructions:
	{editingRecipe.instructions.map((instruction, index) => (
	  <div key={index}>
		<input
		  type="text"
		  value={instruction.stepDescription}
		  onChange={(e) => handleInstructionChange(e, index)}
		/>
		<button onClick={() => handleDeleteInstruction(index)}>Delete</button>
	  </div>
	))}
	<button onClick={handleAddInstruction}>Add Step</button>
  </label>
  <label>
	Ingredients:
	{editingRecipe.ingredients.map((ingredient, index) => (
	  <div key={index}>
		<input
		  type="text"
		  value={ingredient.name}
		  onChange={(e) => handleIngredientChange(e, index)}
		/>
		<button onClick={() => handleDeleteIngredient(index)}>Delete</button>
	  </div>
	))}
	<button onClick={handleAddIngredient}>Add Ingredient</button>
  </label>
  <label>
	Tags:
	{editingRecipe.tags.map((tag, index) => (
	  <div key={index}>
		<input
		  type="text"
		  value={tag.name}
		  onChange={(e) => handleTagChange(e, index)}
		/>
		<button onClick={() => handleDeleteTag(index)}>Delete</button>
	  </div>
	))}
	<button onClick={handleAddTag}>Add Tag</button>
  </label>
  <label>
		Prep Time:
		<input
		  type="number"
		  name="prepTime"
		  value={editingRecipe.prepTime}
		  onChange={handleInputChange}
		/>
	  </label>
	  <label>
		Cook Time:
		<input
		  type="number"
		  name="cookTime"
		  value={editingRecipe.cookTime}
		  onChange={handleInputChange}
		/>
	  </label>
	  <label>
		Servings:
		<input
		  type="number"
		  name="servings"
		  value={editingRecipe.servings}
		  onChange={handleInputChange}
		/>
	  </label>
	  <label>
		Yield:
		<input
		  type="text"
		  name="yield"
		  value={editingRecipe.yield}
		  onChange={handleInputChange}
		/>
	  </label>
	  <label>
		Calories:
		<input
		  type="number"
		  name="calories"
		  value={editingRecipe.calories}
		  onChange={handleInputChange}
		/>
	  </label>
	  <label>
		Audio Instructions:
		<textarea
		  name="audioInstructions"
		  value={editingRecipe.audioInstructions}
		  onChange={handleInputChange}
		></textarea>
	  </label>
	  <label>
		Video Instructions:
		<textarea
		  name="videoInstructions"
		  value={editingRecipe.videoInstructions}
		  onChange={handleInputChange}
		></textarea>
	  </label>
				{/* Add more input fields for other recipe properties */}
				<button onClick={handleUpdateRecipe}>Save</button>
				<button onClick={handleCancelEdit}>Cancel</button>
			  </div>
			) : (
			  <>
			  <button onClick={() => handleEditClick(recipe)}>Update Recipe</button>
			  <button className="add-to-collection-button" onClick={() => handleAddToCookbook(recipe.id)}>
				  Add to Collection
				</button>
			  
			  
			  </>
			)}
		  </li>
		))}
	  </ul>
	  {showAddToCookbook && (
		<div className="add-to-cookbook-modal">
		  <h3>Add to Cookbook</h3>
		  <div>
			<p>Create a new cookbook:</p>
			<input
			  type="text"
			  placeholder="Cookbook Name"
			  value={newCookbookName}
			  onChange={(e) => setNewCookbookName(e.target.value)}
			/>
			<input
			  type="text"
			  placeholder="Cookbook Description"
			  value={newCookbookDescription}
			  onChange={(e) => setNewCookbookDescription(e.target.value)}
			/>
			<button onClick={handleAddToNewCookbook}>Create New Cookbook</button>
		  </div>
		  <div>
			<p>Choose an existing cookbook:</p>
			<select value={selectedCookbook} onChange={(e) => setSelectedCookbook(e.target.value)}>
			  <option value="">Select a cookbook</option>
			  {cookbooks.map((cookbook) => (
				<option key={cookbook.id} value={cookbook.id}>
				  {cookbook.name}
				</option>
			  ))}
			</select>
			<button onClick={handleAddToExistingCookbook}>Add to Existing Cookbook</button>
		  </div>
		</div>
	  )}
	</div>
  );
	
  };

export default Profile;