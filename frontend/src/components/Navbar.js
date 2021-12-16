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
    const [isAdmin, setIsAdmin] = useState(false);

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("Authorization");
        setAuth(false);
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
            const role = response.data.role;
            if (role === 2) setIsAdmin(true);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if(isAuthenticated)
            getInfo();
    });

    return (
        <>
        <Nav>
            <NavItem>
            {
            !isAuthenticated ?
            <NavLink to='/'>
              Not Logged In
            </NavLink> :
            <NavLink to='/'>
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
            isAuthenticated ? 
            <NavMenu>
            {isAdmin && <NavLink to='/administrator'>Admin</NavLink>}
            <NavLink to='/bookmarked'>
                Bookmarked
            </NavLink>
            <NavLink to='/profile'>
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