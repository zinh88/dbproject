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
    PostImage2,
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
    Pinned,
    UserRole,
    DeletedPost
} from "./styles/Post.styled";

import defaultpic from '../assets/Untitled.png'
import axios from "axios";


const Post = ({ post: { id, title, body, haspic , pinned, postpic, upvotes, downvotes, username, useremail, userpic, uservote, comments, bookmarked, ismod, isop, oprole, date: { day, month, time } }}) => {

    const [vote, setVote] = useState(uservote);
    const [votes, setVotes] = useState(upvotes-downvotes);
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);
    const [ispinned, setPinned] = useState(pinned);
    const [isdeleted, setDeleted] = useState(false);

    const displaypic = userpic === 'NO IMAGE'? defaultpic: userpic;

    const votePost = (v) => {
        axios.post(`/api/posts/vote/${id}`, {
            vote: v
        }, 
        {
            headers: {
                'Authorization': localStorage.Authorization
        }})
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err))
    }

    const clickUp = () => {
        const newvote = vote === 1 ? 0 : 1;
        if (vote === 1){ setVote(0); setVotes(votes-1); }
        else if (vote === -1) { setVote(1); setVotes(votes+2);}
        else { setVote(1); setVotes(votes+1); }
        votePost(newvote);
    }

    const clickDown = () => {
        const newvote = vote === -1 ? 0 : -1;
        if (vote === -1) { setVote(0); setVotes(votes+1); }
        else if (vote === 1) { setVote(-1); setVotes(votes-2); }
        else { setVote(-1); setVotes(votes-1); }
        votePost(newvote)
    }

    const bookmark = () => {
        const b = !isBookmarked
        setIsBookmarked(b);
        axios.post(`/api/posts/bookmark/${id}`, { bookmark: b} , {
            headers: {
                'Authorization': localStorage.Authorization
        }})
        .then((res)=> { console.log(res) })
        .catch((err)=> { console.log(err) })
    }

    const pinPost = () => {
        if (ispinned) {
            setPinned(false);
        } else {
            setPinned(true);
        }
        axios.post(`/api/posts/pin/${id}`, {}, {
            headers: {
                'Authorization': localStorage.Authorization
        }})
        .then((res)=> { console.log(res)} )
        .catch((err) => { console.log(err)} )
    }

    const deletePost = () => {
        setDeleted(true);
        axios.delete(`/api/posts/post/${id}`, {
            headers: {
                'Authorization': localStorage.Authorization
        }})
        .then((resp)=> { console.log(resp)})
        .catch((err)=> { console.log(err)})
    }



    return(
        isdeleted ?
        <DeletedPost>Post Deleted</DeletedPost> 
        :
        <StyledPost pinned={ispinned} >
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
                        <Pinned>{ispinned? 'PINNED' : ''}</Pinned>
                    </PinDisplay>
                </SideBarSection>
            </SideBar>
            <PostData>
            <DataSection>
                <PostHeader>
                    <User> 
                        <ProfilePic pic={displaypic} />
                        <UserData>
                            <UserName >
                                {username} 
                                {!(oprole === 0) && <UserRole>{oprole === 1? '[Mod]': '[Admin]'}</UserRole>}
                            </UserName>
                            <UserEmail >{useremail}</UserEmail>
                        </UserData>
                    </User>
                    <Bookmark bookmarked={isBookmarked} onClick={bookmark} />
                </PostHeader>
                <PostBody>
                    <PostTitle>{title}</PostTitle>
                    <PostText>{body === '' ? '(No Body)' : body}</PostText>
                    { haspic && <PostImage2 src={postpic} />}
                </PostBody>
            </DataSection>
            <PostFooter>
                    <Comments to={`/posts/${id}`}>{comments} Comments</Comments>
                    { (isop || ismod) && <FooterBtn onClick={deletePost}>Delete</FooterBtn> }
                    { ismod && <FooterBtn onClick={pinPost}>{ispinned ?  'Unpin Post': 'Pin Post'}</FooterBtn>}     
                </PostFooter>
            </PostData>
        </StyledPost>
    )
}

export default Post;