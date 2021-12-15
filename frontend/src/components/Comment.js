import { CommentBody, CommentDate, CommenterDetails, CommenterEmail, CommenterName, CommentInfo, CommentTop, CommentWrapper, DelButton, DeletedComment, DisplayPic, RepliesWrapper, ReplyButton, ReplyForm, ReplySubmit, ReplyText, SeeReplies, SideButtons, StyledComment, TopWrapper } from "./styles/Comment.styled";
import { useState } from "react";
import axios from "axios";

import defaultpic from '../assets/Untitled.png'

const Comment = ({ postid, comment : { id, username, useremail, userpic, text ,numreplies, ismine , date: { day, month, time }}}) => {
    const [openreply, setOpenreply] = useState(false);
    const [replies , setReplies] = useState([]);
    const [reply, setReply] = useState('');
    const [loadedReplies, setLoadedReplies] = useState(0);
    const [isDeleted, setDeleted] = useState(false);

    const pic = userpic === 'NO IMAGE'? defaultpic: userpic;

    const getReplies = () => {
        axios.get(`/api/comments/comment/${id}/${loadedReplies}`,{
            headers: {
                'Authorization': localStorage.Authorization
        }})
        .then((resp)=> {
            const newreplies = resp.data.replies;
            setReplies([...replies, ...newreplies]);
            setLoadedReplies(loadedReplies+newreplies.length);
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    const postReply = (e) => {
        e.preventDefault();
        axios.post(`/api/comments/comment/${id}`, {
            comment: reply,
            postid: postid
        }, 
        {
            headers: {
                'Authorization': localStorage.Authorization
        }})
        .then((resp) => {
            const newreply = resp.data.comment;
            setReplies([newreply, ...replies]);
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    const deleteComment = () => {
        axios.delete(`/api/comments/delete/${id}`, {
            headers: {
                'Authorization': localStorage.Authorization
        }})
        .then(() => {
            setDeleted(true);
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
        <CommentWrapper>
        {
        isDeleted? 
        <DeletedComment> Comment Deleted </DeletedComment>
        : 
        <>
        <StyledComment>
            <TopWrapper>
            <CommentTop>
                <DisplayPic pic={pic} />
                <CommentInfo>
                    <CommenterDetails>
                        <CommenterName>{username}</CommenterName>
                        <CommenterEmail>({useremail})</CommenterEmail>
                    </CommenterDetails>
                    <CommentDate>{`${day} ${month} ${time}`}</CommentDate>
                </CommentInfo>
            </CommentTop>
            <SideButtons>
                {ismine && <DelButton onClick={deleteComment}>Delete</DelButton>}
                {!openreply && <ReplyButton onClick={()=> {setOpenreply(true)}}>Reply</ReplyButton>}
            </SideButtons>
                
            </TopWrapper>
            <CommentBody>{text}</CommentBody>
            { openreply &&
            <ReplyForm onSubmit={postReply}>
                <ReplyText placeholder="Post a Reply" rows={1} onChange={(e)=>setReply(e.target.value)}></ReplyText>
                <ReplySubmit type="submit">Reply</ReplySubmit>
            </ReplyForm>
            }
            {loadedReplies < numreplies && <SeeReplies onClick={getReplies}>Replies To See: {numreplies - loadedReplies}</SeeReplies>}
        </StyledComment>
        <RepliesWrapper>
            { replies.map((reply, index) => <Comment postid={postid} comment={reply} key={index} />)}
        </RepliesWrapper>
        </>
        }
        </CommentWrapper>
        </>
    )
}

export default Comment;