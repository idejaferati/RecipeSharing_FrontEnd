import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/cuisines" activeStyle>
            Cuisines
          </NavLink>
          <NavLink to="/recipes" activeStyle>
            Recipes
          </NavLink>
          <NavLink to="/shoping" activeStyle>
            Shoping
          </NavLink>
          <NavLink to="/blog" activeStyle>
            Blog
          </NavLink>
          <NavLink to="/profile" activeStyle>
            Profile
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signup">Sign Up</NavBtnLink>
          <NavBtnLink to="/login">Log In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
