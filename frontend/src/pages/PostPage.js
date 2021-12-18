import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { Wrapper } from "./styles/Wrapper.styled";
import Post from "../components/Post";
import axios from "axios";
import { CommentForm, CommentHeader, CommentSubmit, CommentsWrapper, CommentText, GlobalStyle, MoreComments, PostWrapper } from "./styles/PostPage.styled";
import Comment from "../components/Comment";

const PostPage = () => {
    const [post , setPost] = useState();
    const [commenttext, setCommenttext] = useState('');
    const [comments, setComments] = useState([]);
    const [more, setMore] = useState(true);
    const [cpage, setCPage] = useState(1);
    const { id } = useParams();

    const getComments = () => {
        axios.get(`/api/comments/post/${id}/${cpage}`, {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((res) => {
            const newcomments = res.data.comments;
            const morecomments = res.data.more;
            setMore(morecomments);
            setComments([...comments, ...newcomments]);
            setCPage(cpage+1);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() =>{
        axios.get(`/api/posts/post/${id}`, {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((res)=> {
            const post = res.data;
            setPost(post);
        })
        .catch((err)=> {
            console.log(err);
        })

        getComments();
    },[]);

    const submitComment = (e) => {
        e.preventDefault();
        console.log(commenttext);
        axios.post(`/api/comments/post/${id}`, {
            comment: commenttext
        }, {
            headers: {
                'Authorization': localStorage.Authorization
        }})
        .then((resp) =>{
            const newcomment = resp.data.comment;
            setComments([newcomment, ...comments]);
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    return (
        <>
        <GlobalStyle />
        <Wrapper>
            <PostWrapper >
                {post && <Post post={post} />}
                <CommentsWrapper>
                    <CommentHeader>Comments</CommentHeader>
                    <CommentForm onSubmit={submitComment}>
                        <CommentText name={"Comment"} placeholder="Write a Comment" rows={2} onChange={(e)=> { setCommenttext(e.target.value)}}></CommentText>
                        <CommentSubmit>Submit</CommentSubmit>
                    </CommentForm>
                    {comments.map((comment, index) => <Comment postid={id} comment={comment} key={index} />)}
                    {more && <MoreComments onClick={getComments}>Show More Comments</MoreComments>}
                </CommentsWrapper>
            </ PostWrapper >
        </Wrapper>
        </>
    )
}

export default PostPage;