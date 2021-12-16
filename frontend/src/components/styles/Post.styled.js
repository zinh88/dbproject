import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledPost =styled.div`
    display:flex;
    height: auto;
    width: 100%;
    min-width: 100px;
    background-color: black;
    border-radius: 10px;
    padding: 0px;
    overflow: hidden;
    border: 3px ${({pinned}) => pinned? 'solid': 'transparent'} #ff1493;
    margin : 2px 0px 2px 0px;
`

export const SideBar = styled.div`
    width: 15%;
    height: auto;
    display: flex;
    min-width: 75px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #292929;
    padding : 10px;
    row-gap: 10px;
`
export const SideBarSection = styled.div` 
    width : 100%;
    height : 100%;
    display: flex;
`

export const VoteBar = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 2px;
    position: relative;
`

export const DateDisplay = styled.div` 
    font-family: Roboto, sans-serif;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #d2b48c;
`
export const PinDisplay = styled.div` 
    width: 100%;
    color:  #ff1493;
    display: flex;
    text-align: center;
    align-items: flex-end;
`

export const Pinned = styled.div` 
    width:100%;
    text-align: center;
    font-weight: 700;
`

export const Day = styled.div` 
    width: 100%;
    height:auto;
    text-align: center;
    font-size: 30px;
`

export const Month = styled.div` 
    width: 100%;
    height:auto;
    text-align: center;
    font-size: 17px;
`

export const Time = styled.div` 
    width: 100%;
    height:auto;
    text-align: center;
    font-size: 10px;
`



export const UpvoteButton = styled.div`
    width: 0; 
    height: 0; 
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid ${({vote})=> vote === 1? 'green': '#c9c9c9'};
    display:flex;

    :hover {
        border-bottom: 20px solid ${({vote})=> vote === 1? 'green': 'white'};
    }
`
export const DownvoteButton = styled.div`
    width: 0; 
    height: 0; 
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid ${({vote})=> vote === -1? 'red': '#c9c9c9'};
    display:flex;

    :hover {
        border-top: 20px solid ${({vote})=> vote === -1? 'red': 'white'};
    }
`

export const VoteCounter = styled.b`
    font-size: 20px;
    color: orange;
`

export const PostData = styled.div`
    width: 85%;
    height: auto;
    min-height: 150px;
    margin:10px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 10px;
`
export const DataSection = styled.div ` 
    width: 100%;
    height: auto;
    color: white;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

export const PostHeader = styled.div`
    width: 100%;
    height: 50px;
    display:flex;
    justify-content: space-between;
    align-items: center;
`
export const User = styled.div`
    height: 100%;
    width: auto;
    display:flex;
    align-items: center;
    justify-content: center;
`

export const ProfilePic = styled.div`
    display: flex;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-image: url(${({pic}) => pic});
    background-size: cover;
    background-position: center center; 
`

export const UserData = styled.div`
    display:flex;
    height:100%;
    width:auto;
    float:left;
    flex-direction: column;
    padding-left: 5px;
    justify-content: center;
`

export const UserName = styled.div`
    font-family: Roboto, sans-serif;
    color: white;
    display:flex;
    height:20px;
    font-size: 20px;
    column-gap: 5px;
    align-items: center;
`
export const UserRole = styled.div` 
    font-family: Roboto, sans-serif;
    color: #00ff00;
    display:flex;
    font-size: 15px;
    font-weight: 900;
`

export const UserEmail = styled.div`
    display:flex;
    height:40%;
    color: gray;
`
export const Bookmark = styled.div`
    width : 25px;
    height : 25px;
    border-radius: 50%;
    background-color: ${({bookmarked}) => bookmarked? 'magenta':'transparent'};
    vertical-align: middle;
    border: 2px solid magenta;
    cursor: pointer;
    :hover {
        background-color: ${({bookmarked}) => bookmarked? 'transparent':'magenta'};
    }
`
export const PostBody = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    
`
export const PostTitle = styled.div` 
    font-family: Roboto, sans-serif;
    color: white;
    display:flex;
    font-weight: 900;
    font-size: 30px;
`
export const PostText = styled.div` 
    font-family: Roboto, sans-serif;
    color: white;
    display:flex;
    font-size: 15px;
`

export const PostImage2 = styled.img` 
    display: flex;
    margin-bottom: 10px;
    width: 100%;
`

export const PostFooter = styled.div` 
    display: flex;
    height: auto;
    width:100%;
    column-gap: 00px;
`
export const FooterBtn = styled.div` 
    display: flex;
    padding: 3px;
    height: 100%;
    margin-left: 2px;
    margin-right: 2px;
    background-color: gray;
    width: 100%;
    border-radius: 5px;
    color:white;
    font-family: Roboto, sans-serif;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    text-align:center;
    cursor: pointer;
    :hover {
        background-color: #dcdcdc;
        color: black;
    }
`
export const Comments = styled(Link)` 
    display: flex;
    height: 100%;
    padding: 3px;
    margin-left: 2px;
    margin-right: 2px;
    text-align:center;
    background-color: gray;
    width: 100%;
    border-radius: 5px;
    color:white;
    font-family: Roboto, sans-serif;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    text-align: center;
    :hover {
        background-color: #dcdcdc;
        color: black;
    }
`

export const DeletedPost =styled.div`
    display:flex;
    height: 100px;
    width: 100%;
    min-width: 100px;
    background-color: black;
    border-radius: 10px;
    padding: 0px;
    overflow: hidden;
    margin : 2px 0px 2px 0px;
    font-size: xx-large;
    font-weight: 900;
    align-items: center;
    justify-content: center;
    color:white;
`
