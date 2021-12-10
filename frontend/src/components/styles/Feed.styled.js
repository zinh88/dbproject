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
    background-color: white;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: ${({selected}) => selected? '#ff1493': '#c0c0c0'};
    border: 5px solid ${({selected}) => selected? '#ff1493': '#c0c0c0'};
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
    :hover {
        color: ${({selected}) => selected? '#ff1493': 'red'};
        border: 5px solid ${({selected}) => selected? '#ff1493': 'red'};
    }
`
