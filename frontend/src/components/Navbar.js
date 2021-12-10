import {React, useState, useEffect } from 'react';
import axios from 'axios';
import {
    Nav,
    NavLink,
    NavBtn,
    NavBtnLink,
    DisplayPic,
    NavLogo,
    NavBtn2,
    NavMenu,
    NavItem
  } from './styles/Navbar.styled';

import defaultpic from '../assets/Untitled.png'

const Navbar = ({isAuthenticated , setAuth}) => {
    const [name, setName] = useState('');
    const [pic, setPic] = useState('NO IMAGE');
    const [loggedin, setLoggedin] = useState(isAuthenticated);

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("Authorization");
        setAuth(false);
        setLoggedin(false);
    }

    const getInfo = async () => {
        axios.get('/api/user/info', {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((response) => {
            console.log(response);
            setName(response.data.name);
            setPic(response.data.picture === 'NO IMAGE'? defaultpic : response.data.picture);
            setAuth(true);
            setLoggedin(true);
        })
        .catch((err) => {
            console.log(err)
            setAuth(false)
            setLoggedin(false);
        })
    }

    useEffect(() => {
        getInfo();
    });

    return (
        <>
        <Nav>
            <NavItem>
            {
            !loggedin ?
            <NavLink to='/' activeStyle>
              Not Logged In
            </NavLink> :
            <NavLink to='/' activeStyle>
                <DisplayPic pic={pic}/>
                {name}
            </NavLink>
            }
            </NavItem>
            <NavItem>
                <NavLogo to='/'>LDF</NavLogo>
            </NavItem>
            <NavItem>
            
            {
            loggedin ? 
            <NavMenu>
            <NavLink to='/'>
                Profile
            </NavLink>
            <NavBtn>
                <NavBtn2 onClick={logOut}>Logout</NavBtn2>
            </NavBtn> 
            </NavMenu> :
            <NavBtn>
                <NavBtnLink to='/login'>Log In</NavBtnLink>
            </NavBtn>
            }
            </NavItem>
        </Nav>
        </>
    );
};
  

export default Navbar;