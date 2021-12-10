import { useState } from "react";
import { 
    StyledPost, 
    VoteBar, 
    PostData , 
    UpvoteButton, 
    DownvoteButton, 
    VoteCounter, 
    PostHeader,
    User,
    UserData,
    UserName,
    UserEmail,
    ProfilePic,
    Bookmark,
    PostBody,
    PostTitle,
    PostText,
    PostImage,
    PostFooter,
    FooterBtn,
    SideBar,
    DateDisplay,
    SideBarSection,
    Day,
    Month,
    Time,
    DataSection,
    Comments,
    PinDisplay,
    Pinned
} from "./styles/Post.styled";

import defaultpic from '../assets/Untitled.png'


const Post = ({ post: { id, title, body, pinned, postpic, upvotes, downvotes, username, useremail, userpic, uservote, comments, bookmarked, ismod, isop, date: { day, month, time } }}) => {

    const [vote, setVote] = useState(uservote);
    const [votes, setVotes] = useState(upvotes-downvotes);
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);

    const displaypic = userpic === 'NO IMAGE'? defaultpic: userpic;

    const clickUp = () => {
        if (vote === 1){ setVote(0); setVotes(votes-1); }
        else if (vote === -1) { setVote(1); setVotes(votes+2);}
        else { setVote(1); setVotes(votes+1); }
    }

    const clickDown = () => {
        if (vote === -1) { setVote(0); setVotes(votes+1); }
        else if (vote === 1) { setVote(-1); setVotes(votes-2); }
        else { setVote(-1); setVotes(votes-1); }
    }

    const bookmark = () => {
        setIsBookmarked(!isBookmarked);
    }

    return(
        <StyledPost pinned={pinned} >
            <SideBar>
                <SideBarSection>
                    <DateDisplay>
                        <Time>{time}</Time>
                        <Day>{day}</Day>
                        <Month>{month}</Month>
                    </DateDisplay>
                </SideBarSection>
                <SideBarSection>
                    <VoteBar>
                        <UpvoteButton onClick={clickUp} vote={vote} />
                        <VoteCounter> {votes} </VoteCounter>
                        <DownvoteButton onClick={clickDown} vote={vote} />
                    </VoteBar>
                </SideBarSection>
                <SideBarSection>
                    <PinDisplay>
                        <Pinned>{pinned? 'PINNED' : ''}</Pinned>
                    </PinDisplay>
                </SideBarSection>
            </SideBar>
            <PostData>
            <DataSection>
                <PostHeader>
                    <User> 
                        <ProfilePic pic={displaypic} />
                        <UserData>
                            <UserName >{username}</UserName>
                            <UserEmail >{useremail}</UserEmail>
                        </UserData>
                    </User>
                    <Bookmark bookmarked={isBookmarked} onClick={bookmark} />
                </PostHeader>
                <PostBody>
                    <PostTitle>{title}</PostTitle>
                    <PostText>{body === '' ? '(No Body)' : body}</PostText>
                    <PostImage pic={postpic} />
                </PostBody>
            </DataSection>
            <PostFooter>
                    <Comments to={`/posts/${id}`}>{comments} Comments</Comments>
                    <FooterBtn>Delete</FooterBtn>
                </PostFooter>
            </PostData>
        </StyledPost>
    )
}

export default Post;