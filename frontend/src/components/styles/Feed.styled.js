import styled from "styled-components";


export const StyledFeed = styled.div` 
    width: 540px;
    min-width: 200px;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
`

export const OrderingSelect = styled.div` 
    width: 100%;
    height: 60px;
    border-radius: 10px;
    background-color: black;
    margin-top: 3px;
    display: flex;
    overflow: hidden;
    padding: 5px;
    column-gap: 5px;
`
export const OrderingOption = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    margin: 0px 0px 0px 0px;
    background-color: black;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: ${({selected}) => selected? '#ff1493': '#333333'};
    border: 5px solid ${({selected}) => selected? '#ff1493': '#333333'};
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
    :hover {
        color: ${({selected}) => selected? '#ff1493': '#ff1493'};
        border: 5px solid ${({selected}) => selected? '#ff1493': '#ff1493'};
    }
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
    font-size: small;
    color:white;
    margin-bottom: 10px;
    :hover {
        background-color: purple;
    }
`
