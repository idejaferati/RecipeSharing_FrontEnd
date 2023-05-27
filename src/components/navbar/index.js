import React from "react";
import {
  StyledNav,
  StyledNavLink,
  StyledBars,
  StyledNavMenu,
  StyledNavBtn,
  StyledNavBtnLink,
  StyledNavBtnLink2,
} from "./navbarElements";
import useAuth from "../hooks/use-auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const role = auth?.role;

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    setAuth(null);
    navigate("/");
  };

  return (
    <>
      <StyledNav>
        <StyledBars />
        <StyledNavMenu>
          <StyledNavLink to="/" activestyle="true">
            Home
          </StyledNavLink>
          <StyledNavLink to="/cuisines" activestyle="true">
            Cuisines
          </StyledNavLink>
          {role == "user" ? (
            <>
              <StyledNavLink to="/recipes" activestyle="true">
                Recipes
              </StyledNavLink>
              <StyledNavLink to="/shopping" activestyle="true">
                Shopping
              </StyledNavLink>
              <StyledNavLink to="/cookbooks" activestyle="true">
                Cookbooks
              </StyledNavLink>
              <StyledNavLink to="/userRecipes" activestyle="true">
                My Recipes
              </StyledNavLink>
              <StyledNavLink to="/userCollections" activestyle="true">
                My collections
              </StyledNavLink>
              <StyledNavLink to="/userCookbooks" activestyle="true">
                My cookbooks
              </StyledNavLink>
            </>
          ) : null}
          {role == "admin" ? (
            <>
              <StyledNavLink to="/permissions" activestyle="true">
                Permissions
              </StyledNavLink>
              <StyledNavLink to="/manageuser" activestyle="true">
                Manage user
              </StyledNavLink>
              <StyledNavLink to="/managetags" activestyle="true">
                Manage tags
              </StyledNavLink>
              <StyledNavLink to="/managerecipes" activestyle="true">
                Manage recipes
              </StyledNavLink>
            </>
          ) : null}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </StyledNavMenu>
        {role == "admin" || role == "user" ? (
          <StyledNavBtn>
            <StyledNavBtnLink to="/profile">Profile</StyledNavBtnLink>
            <StyledNavBtnLink2 onClick={handleLogout}>
              Log out
            </StyledNavBtnLink2>
          </StyledNavBtn>
        ) : (
          <StyledNavBtn>
            <StyledNavBtnLink to="/signup">Sign Up</StyledNavBtnLink>
            <StyledNavBtnLink to="/login">Log In</StyledNavBtnLink>
          </StyledNavBtn>
        )}
      </StyledNav>
    </>
  );
};

export default Navbar;
