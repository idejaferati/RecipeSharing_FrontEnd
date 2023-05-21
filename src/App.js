import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Blog from "./pages/blog";
import Cuisines from "./pages/cuisines";
import Profile from "./pages/profile";
import Recipes from "./pages/recipes";
import Shopping from "./pages/shopping";
import Admin from "./pages/admin";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Footer from "./components/footer";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/cuisines" element={<Cuisines />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
          </Routes>
          <Footer />
        </Router>
      </ShopContextProvider>
    </LocalizationProvider>
  );
}

export default App;
