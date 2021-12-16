import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: pink;
    }
`

export const FrontPage = styled.div` 
    padding-top: 50px;
    background-color: pink;
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    justify-content: center;
    column-gap: 10px;
    overflow: hidden;
`

export const Feed = styled.div` 
    width: 540px;
    min-width: 200px;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
`

export const OrderBy = styled.div` 
    width : 100%;
    height: auto;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    background-color: black;
    
`

export const LeftCol = styled.div` 
    height: 100%;
    width: 200px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-top: 5px;
    @media screen and (max-width: 910px) {
        display: none;
    }
`

export const CreateBox = styled.div` 
    width: 200px;
    height: 150px;
    background-color: black;
    display: flex;
    position: fixed;
    border-radius: 10px;
    padding: 10px;
    margin: 3px 0px 0px 0px;
`

export const CreateBtn = styled(Link)` 
    width: 100%;
    height: 100%;
    background-color: gray;
    border-radius: 10px;
    font-family: Roboto, sans-serif;
    justify-content: center;
    align-items: center;
    display: flex;
    color:white;
    font-weight: 900;
    font-size: 40px;
    text-align: center;
    text-decoration: none;
    :hover {
        background-color: #ff1493;
        color: #00ff00;
    }
`

export const RulesBox = styled.div` 
    width: 200px;
    padding: 10px;
    color: white;
    background-color: black;
    border-radius: 10px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
`
export const RulesHeading = styled.div` 
    display: flex;
    font-size: xx-large;
    font-weight: 900;
`
