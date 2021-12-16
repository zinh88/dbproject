import axios from "axios";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import { BookmarkHeader, GlobalStyle , PostWrapper} from "./styles/Bookmarks.styled";
import { Wrapper } from "./styles/Wrapper.styled";


const Bookmarks = () => {
    const [bookmarkedposts, setBookmarkedposts] = useState([]);

    useEffect(() =>{
        axios.get('/api/posts/bookmarked', {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((res) => {
            setBookmarkedposts([...res.data.posts])
        })
    },[])

    return (
        <>
        <GlobalStyle /> 
        <Wrapper>
        <BookmarkHeader>You Have {bookmarkedposts.length} Bookmarks</BookmarkHeader>
        <PostWrapper>
            {
                bookmarkedposts.map((post, i) =>
                    <Post post={post} key={i} />
                )
            }
        </PostWrapper>
        </Wrapper>
        </>
    )
}

export default Bookmarks;