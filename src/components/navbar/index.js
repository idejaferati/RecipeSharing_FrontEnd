import React from "react";
import {
  StyledNav,
  StyledNavLink,
  StyledBars,
  StyledNavMenu,
  StyledNavBtn,
  StyledNavBtnLink,
} from "./navbarElements";
import useAuth from "../hooks/use-auth";

const Navbar = () => {
  const { auth } = useAuth();
  const role = auth?.role;

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
              <StyledNavLink to="/profile" activestyle="true">
                Profile
              </StyledNavLink>
              <StyledNavLink to="/cookbook" activestyle="true">
                Cookbook
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
            </>
          ) : null}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </StyledNavMenu>
        <StyledNavBtn>
          <StyledNavBtnLink to="/signup">Sign Up</StyledNavBtnLink>
          <StyledNavBtnLink to="/login">Log In</StyledNavBtnLink>
        </StyledNavBtn>
      </StyledNav>
    </>
  );
};

export default Navbar;
