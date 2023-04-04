import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './navbarElements';

const Navbar = () => {
	return (
		<>
			<Nav>
				<Bars />

				<NavMenu>
					<NavLink to='/discover' activeStyle>
						Discover
					</NavLink>
					<NavLink to='/articles' activeStyle>
						Articles
					</NavLink>
					<NavLink to='/myrecipes' activeStyle>
						My Recipes
					</NavLink>
					<NavLink to='/about' activeStyle>
						About
					</NavLink>
					<NavLink to='/profile' activeStyle>
						Profile
					</NavLink>
					{/* Second Nav */}
					{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
					</NavMenu>
				<NavBtn>
					<NavBtnLink to='/signin'>Sign In</NavBtnLink>
					<NavBtnLink to='/login'>Log In</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
