import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const Nav = styled.nav`
  font-family: 'Roboto', sans-serif;
  position:fixed;
  width: 100%;
  background: #000000;
  height: 40px;
  display: flex;
  padding: 0.5*calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavItem = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    &:first-child >span {
        margin-right:auto;
    }
    &:last-child > span {
        margin-left: auto;
    }
`

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  font-weight : 900;
  cursor: pointer;
`;


export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0px;
  float:right;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
`;

export const NavBtn = styled.nav`
  font-family: 'Roboto', sans-serif;
  font-weight : 900;
  display: flex;
  align-items: center;
  margin-right: 10px;
  @media screen and (max-width: 0px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  background: #fff;
  padding: 5px 22px;
  color: #000;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight : 900;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
`;

export const NavBtn2 = styled.div`
  background: #fff;
  padding: 5px 22px;
  color: #000;
  font-weight : 900;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
`;

export const DisplayPic = styled.div`
  height: 30px;
  width:30px;
  display: flex;
  border-radius: 50%;
  margin-right:10px;
  background-image: url(${({pic}) => pic});
  background-size: cover;
  background-position: center center; 
`

export const NavLogo = styled(Link)`
  height: 100%;
  font-family: "Fugaz One";
  font-size: 200%;
  color: #fff;
  display: inline-block;
  flex-shrink: 0;

  align-items:center;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;