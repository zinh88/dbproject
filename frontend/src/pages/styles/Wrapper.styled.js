import styled from "styled-components";

export const Wrapper = styled.div` 
    display: flex;
    padding-top : 50px;
    width : 100%;
    height: 100%;
    background-color: pink;
    align-items: center;
    justify-content: center;
    row-gap: 10px;
    flex-direction : column;
`

export const BigWrapper = styled.div` 
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    row-gap: 10px;
    justify-content: space-between;
    background-color: pink;
`

export const Footer = styled.div` 
    width: 100%;
    background-color: black;
    display: flex;
    height: 100px;
    position: relative;
    clear: both;
`