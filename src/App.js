import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Blog from "./pages/blog";
import Cuisines from "./pages/cuisines";
import Profile from "./pages/profile";
import Recipes from "./pages/recipes";
import Shoping from "./pages/shoping";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cuisines" element={<Cuisines />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/shoping" element={<Shoping />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
