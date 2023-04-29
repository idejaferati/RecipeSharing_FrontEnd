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
          <NavLink to="/" activestyle="true">
            Home
          </NavLink>
          <NavLink to="/cuisines" activestyle="true">
            Cuisines
          </NavLink>
          <NavLink to="/recipes" activestyle="true">
            Recipes
          </NavLink>
          <NavLink to="/shopping" activestyle="true">
            Shopping
          </NavLink>
          <NavLink to="/blog" activestyle="true">
            Blog
          </NavLink>
          <NavLink to="/profile" activestyle="true">
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
