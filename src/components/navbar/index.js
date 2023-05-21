import React from "react";
import {
  StyledNav,
  StyledNavLink,
  StyledBars,
  StyledNavMenu,
  StyledNavBtn,
  StyledNavBtnLink,
} from "./navbarElements";

const Navbar = () => {
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
          <StyledNavLink to="/recipes" activestyle="true">
            Recipes
          </StyledNavLink>
          <StyledNavLink to="/shopping" activestyle="true">
            Shopping
          </StyledNavLink>
          <StyledNavLink to="/blog" activestyle="true">
            Blog
          </StyledNavLink>
          <StyledNavLink to="/profile" activestyle="true">
            Profile
          </StyledNavLink>
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
