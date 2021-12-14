import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import react, { useEffect, useState } from "react";
import { Wrapper } from "./styles/Wrapper.styled";
import { GlobalStyle } from "./styles/CreatePost.styled";
import Post from "../components/Post";
import axios from "axios";



const PostPage = () => {
    const [post , setPost] = useState();
    const  { id } = useParams();
    useEffect(() =>{
        axios.get(`/api/posts/${id}`, {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((res)=> {
            console.log(res.data);
            setPost(res.data)
        })
        .catch((err)=> {
            console.log(err);
        })
    })

    return (
        <>
        <GlobalStyle />
        <Wrapper>
            {post && <Post post={post} />}
        </Wrapper>
        </>

    )
}

export default PostPage;