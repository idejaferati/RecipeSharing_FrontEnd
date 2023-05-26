import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Cookbooks from "./pages/cookbooks";
import Cuisines from "./pages/cuisines";
import MyRecipes from "./pages/my-recipes";
import Recipes from "./pages/recipes";
import Shopping from "./pages/shopping";
import UserPermissions from "./pages/user-permissions";
import ManageUser from "./pages/manage-user";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Footer from "./components/footer";
import { ShopContextProvider } from "./context/shop-context";
import { AuthProvider } from "./context/auth-provider";
import RequireAuth from "./pages/require-auth";
import Unauthorized from "./pages/unauthorized";
import Missing from "./pages/missing";
import MyCollections from "./pages/my-collections";
import MyCookbooks from "./pages/my-cookbooks";
import ChangePassword from "./pages/change-password";
import Profile from "./pages/profile";

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/cuisines" element={<Cuisines />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="/changePassword" element={<ChangePassword />} />

            <Route element={<RequireAuth allowedRole={"user"} />}>
              <Route path="/userRecipes" element={<MyRecipes />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/cookbooks" element={<Cookbooks />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="/userCollections" element={<MyCollections />} />
              <Route path="/userCookbooks" element={<MyCookbooks />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<RequireAuth allowedRole={"admin"} />}>
              <Route path="/permissions" element={<UserPermissions />} />
              <Route path="/manageuser" element={<ManageUser />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </ShopContextProvider>
  );
}

export default App;
