import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: pink;
    }
`

export const PostWrapper = styled.div` 
    width: 700px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export const CommentHeader = styled.div`
    color:white;
    display: flex;
    font-weight: 900;
    font-size: x-large;
    width:100%;
    height: auto;
    align-items: center;
    justify-content: center;
`

export const CommentsWrapper = styled.div` 
    display:flex;
    height: auto;
    width: 100%;
    height: auto;
    background-color: black;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
    flex-direction: column;
    row-gap: 5px;
`

export const CommentForm = styled.form` 
    display: flex;
    width: 100%;
    height: auto;
    min-height: 10px;
    align-items: center;
    column-gap: 5px;
`

export const CommentText = styled.textarea` 
    display: flex;
    width: 100%;
    resize: none;
    padding: 10px;
    font-family: monospace;
    font-size: x-large;
    height: auto;
    border-radius: 5px;
`

export const CommentSubmit = styled.button` 
    width: 100px;
    height: 100%;
    background-color: gray;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: x-large;
    :hover {
        background-color: purple;
    }
`

export const MoreComments = styled.button` 
    width:100%;
    height: 30px;
    display: flex;
    background-color: gray;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: medium;
    :hover {
        background-color: green;
    }
`