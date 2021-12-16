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

export const BookmarkHeader = styled.div`
    font-weight: 900;
    font-size: xx-large;
    display: flex;
    
`