import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";


export const StyledNav = styled.nav`
	background: #ffffff;
	height: 40px;
	display: flex;
	justify-content: space-between;
	padding: 0.2rem calc((100vw - 1000px) / 2);
	z-index: 12;
	/* Third Nav */
	/* justify-content: flex-start; */
`;

export const StyledNavLink = styled(Link)`
	color: #02211b;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	height: 100%;
	cursor: pointer;
	&.active {
		color: #000000;
		border-bottom: 2px solid #5fd9c2;
	}
`;

export const StyledBars = styled(FaBars)`
	display: none;
	color: #808080;
	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 75%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`;

export const StyledNavMenu = styled.div`
	display: flex;
	align-items: center;
	margin-right: -24px;
	/* Second Nav */
	/* margin-right: 24px; */
	/* Third Nav */
	/* width: 100vw;
	white-space: nowrap; */
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const StyledNavBtn = styled.nav`
	display: flex;
	align-items: center;
	margin-right: 20px;
	/* Third Nav */
	/* justify-content: flex-end;
	width: 100vw; */
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const StyledNavBtnLink = styled(Link)`
	border-radius: 100px;
	background: #5fd9c2;
	padding: 6px 22px;
	color: #02211b;
	outline: none;
	min-width: 55px;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	/* Second Nav */
	margin-left: 24px;
	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #5fd9c2;
	}
`;
