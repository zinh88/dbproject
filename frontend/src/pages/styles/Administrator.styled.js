import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: pink;
    }
`

export const ModeratorBox = styled.div` 
    width: 700px;
    display: flex;
    min-height: 300px;
    border-radius: 5px;
    background-color: black;
    font-size: xx-large;
    font-weight: 900;
    flex-direction: column;
    row-gap: 5px;
    padding: 10px;
    color:white;
    align-items: center;
`

export const ModForm = styled.form` 
    width: 100%;
    display: flex;
    column-gap: 5px;
    padding : 5px;
`
export const Input = styled.input` 
    display: flex;
    width: 100%;
    height: 40px;
    padding: 10px;
    font-family: monospace;
    font-size: xx-large;
    border-radius: 5px;
`

export const SetMod = styled.button` 
    width: 150px;
    height: 40px;
    background-color: gray;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-weight: 900;
    font-size: large;
    color:white;
    
    :hover {
        background-color: purple;
    }
`

export const ModeratorDisplay = styled.div` 
    display: flex;
    background-color: #292929;
    color: white;
    height: 60px;
    width: 100%;
    align-items: center;
    font-weight :900;
    font-size: large;
    border-radius: 5px;
    padding: 10px;
    justify-content: space-between;
`

export const DeleteMod = styled.button` 
    width: 150px;
    height: 40px;
    background-color: red;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-weight: 900;
    font-size: large;
    color:white;
    
    :hover {
        background-color: darkred;
    }
`