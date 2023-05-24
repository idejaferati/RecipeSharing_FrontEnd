import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Cookbook from "./pages/cookbook";
import Cuisines from "./pages/cuisines";
import Profile from "./pages/profile";
import Recipes from "./pages/recipes";
import Shopping from "./pages/shopping";
import UserPermissions from "./pages/user-permissions";
import ManageUser from "./pages/manage-user";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Footer from "./components/footer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ShopContextProvider } from "./context/shop-context";
import { AuthProvider } from "./context/auth-provider";
import RequireAuth from "./pages/require-auth";
import Unauthorized from "./pages/unauthorized";
import Missing from "./pages/missing";

export const ROLES = {
  User: "user",
  Admin: "admin",
  Editor: "editor",
};

function App() {
  return (
    <ShopContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/cuisines" element={<Cuisines />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="unauthorized" element={<Unauthorized />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/cookbook" element={<Cookbook />} />
                <Route path="/shopping" element={<Shopping />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/permissions" element={<UserPermissions />} />
                <Route path="/manageuser" element={<ManageUser />} />
              </Route>

              {/* catch all */}
              <Route path="*" element={<Missing />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </Router>
      </LocalizationProvider>
    </ShopContextProvider>
  );
}

export default App;
