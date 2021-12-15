import styled from "styled-components";

export const CommentWrapper = styled.div` 
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: column;
    row-gap: 5px;
`

export const StyledComment = styled.div` 
    display:flex;
    height: auto;
    width: 100%;
    min-height: 60px;
    border-radius: 10px;
    padding: 5px;
    flex-direction: column;
    row-gap: 5px;
    background-color: #333333;
`

export const DeletedComment = styled.div` 
    display:flex;
    height: auto;
    width: 100%;
    min-height: 60px;
    border-radius: 10px;
    padding: 5px;
    flex-direction: column;
    row-gap: 5px;
    background-color: #333333;
    font-weight: 900;
    font-size: xx-large;
    align-items: center;
    justify-content: center;
`

export const CommentTop = styled.div` 
    display: flex;
    height: 40px;
    width: 100%;
    column-gap: 5px;
`

export const SideButtons = styled.div` 
    display: flex;
    height: 100%;
    width: auto;
    column-gap: 5px;

`

export const TopWrapper = styled.div` 
    display: flex;
    height: 40px;
    width: 100%;
    justify-content: space-between;
    overflow: hidden;
`

export const ReplyButton = styled.div` 
    display: flex;
    background-color: gray;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 50px;
    text-align: center;
    font-weight: 900;
    font-size: small;
    color:white;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        background-color: purple;
    }
`

export const DelButton = styled.div` 
    display: flex;
    background-color: red;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 50px;
    text-align: center;
    font-weight: 900;
    font-size: small;
    color:white;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        background-color: darkred;
    }
`

export const DisplayPic = styled.div` 
    display: flex;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-image: url(${({pic}) => pic});
    background-size: cover;
    background-position: center center; 
`
export const CommentInfo = styled.div` 
    display: flex;
    height: 100%;
    width: auto;
    flex-direction: column;
    justify-content: center;
    font-weight: 900;
    flex-wrap: wrap;
`

export const CommenterDetails = styled.div` 
    display: flex;
    height: auto;
    width: auto;
    column-gap: 5px;
`

export const CommenterName = styled.div`
    display: flex;
    font-size: medium;
    color: white;
`
export const CommenterEmail = styled.div`
    display: flex;
    font-size: medium;
    color: gray;
`

export const CommentDate = styled.div` 
    display: flex;
    height: 15px;
    width:auto;
    font-size: x-small;
    color: #d2b48c;
`

export const CommentBody = styled.div` 
    display: flex;
    height: auto;
    width: 100%;
    font-size: small;
    color: white;
`
export const ReplyForm = styled.form` 
    display: flex;
    width: 100%;
    height: 30px;
    min-height: 10px;
    align-items: center;
    column-gap: 5px;
`

export const ReplyText = styled.textarea` 
    display: flex;
    width: 100%;
    resize: none;
    padding: 5px;
    font-family: monospace;
    font-size: medium;
    height: auto;
    border-radius: 5px;
`

export const ReplySubmit = styled.button` 
    width: auto;
    height: 27px;
    background-color: gray;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-weight: 900;
    font-size: small;
    color:white;
    
    :hover {
        background-color: purple;
    }
`

export const SeeReplies = styled.button` 
    width: 100%;
    height: 30px;
    color: white;
    font-size: small;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: gray;
    border-radius: 5px;
    :hover {
        background-color: purple;
    }
`

export const RepliesWrapper = styled.div` 
    display:flex;
    padding-left: 40px;
    width: 100%;
    height: auto;
    flex-direction: column;
    row-gap: 5px;
`