import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: pink;
    }
`
export const CreatePost = styled.div` 
    display: flex;
    border-radius: 10px;
    width: 700px;
    min-width: 300px;
    background-color: #BC8F8F;
    height: auto;
    min-height: 100px;
    padding: 10px;
`

export const PostForm = styled.form` 
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    row-gap: 10px;
`

export const Input = styled.input` 
    display: flex;
    width: 100%;
    height: 40px;
    padding: 10px;
    font-family: monospace;
    font-size: xx-large;
    box-shadow: 1px 1px 1px #999;
    border: 1px solid magenta;
    border-radius: 5px;
`

export const Label = styled.label` 
    color: darkred;
    font-family: Roboto, sans-serif;
    font-weight: 700;
    text-align: center;
    font-size: 30px;
`
export const PostText = styled.textarea` 
    display: flex;
    width: 100%;
    resize: none;
    padding: 10px;
    font-family: monospace;
    font-size: x-large;
    box-shadow: 1px 1px 1px #999;
    border: 1px solid magenta;
    border-radius: 5px;
`

export const MessageBox = styled.div` 
    display: flex;
    width: 100%;
    min-height: 60px;
    align-items: center;
    justify-content: center;
    background-color: ${({success}) => success? "green" : "red"};
    color:white;
    font-weight: 900;
    font-size: x-large;
`

export const StyledSubmit = styled.button` 
    width: auto;
    height: auto;
    background-color: black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: x-large;
    :hover {
        background-color: purple;
    }
`
export const Waiting = styled.div` 
    width: auto;
    height: auto;
    background-color: black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: x-large;
`
export const PostLink = styled(Link)` 
    background-color: blue;
    color: white;
    display: flex;
    width: 100%;
    min-height: 60px;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: x-large;
`