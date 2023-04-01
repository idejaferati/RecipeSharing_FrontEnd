import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Articles from './pages/articles';
import Discover from './pages/discover';
import Profile from './pages/profile';
import MyRecipes from './pages/myrecipes';

function App() {
return (
	<Router>
		<Navbar />
		<Routes>
			<Route path='/' exact element={<Home/>}  />
			<Route path='/about' element={<About/>} />
			<Route path='/discover' element={<Discover/>} />
			<Route path='/profile' element={<Profile/>} />
			<Route path='/myrecipes' element={<MyRecipes/>} />
			<Route path='/articles' element={<Articles/>} />
		</Routes>
	</Router>
);
}

export default App;
