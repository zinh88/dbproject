import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html,body {
        background-color: pink;
    }
`

export const Wrapper = styled.div` 
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    padding-top: 50px;
`

export const ProfileWrapper = styled.div` 
    width: 700px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    height: 100%;
`

export const ProfileInfo = styled.div` 
    display: flex;
    width: 100%;
    height: auto;
    min-height: 100px;
    background-color: black;
    border-radius: 5px;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    padding: 10px;
    color: white;
    font-weight:  900;
    font-size: xx-large;
`

export const ProfilePic = styled.div`
    display: flex;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    background-image: url(${({pic}) => pic});
    background-size: cover;
    background-position: center center; 
`

export const EditButton = styled.button` 
    display: flex;
    width: 150px;
    height: 50px;
    color: white;
    background-color: gray;
    border-radius: 5px;
    font-size: xx-large;
    font-weight: 900;
    align-items: center;
    justify-content: center;
    :hover {
        background-color: purple;
    }
`

export const EditBox = styled.div` 
    width : 400px;
    height: 100px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export const NameForm = styled.form` 
    display: flex;
    width: 100%;
    height: 50px;
    min-height: 10px;
    align-items: center;
    column-gap: 5px;
`

export const NameEnter = styled.textarea` 
    display: flex;
    width: 100%;
    resize: none;
    padding: 5px;
    font-family: monospace;
    font-size: large;
    height: auto;
    border-radius: 5px;

`

export const NameSubmit = styled.button` 
    width: auto;
    height: 30px;
    background-color: gray;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-weight: 900;
    font-size: medium;
    color:white;
    
    :hover {
        background-color: purple;
    }
`

export const PicForm = styled.form` 
    width: 100%;
    height: auto;
    display: flex;
    column-gap: 5px;
    border:  1px;
    align-items: center;
`

export const DeletePicButton = styled.button` 
    width: 100%;
    height: 30px;
    background-color: red;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-weight: 900;
    font-size: medium;
    color:white;
    margin-top: 10px;
    :hover {
        background-color: darkred;
    }
`

export const ErrorBox = styled.div` 
    width: 100%;
    min-height: 50px;
    height: auto;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: x-large;
    color: white;
    margin-top: 10px;
`

export const MoreButton = styled.button` 
    width: 100%;
    height: 30px;
    background-color: black;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-weight: 900;
    font-size: medium;
    color:white;
    :hover {
        background-color: purple;
    }
`

