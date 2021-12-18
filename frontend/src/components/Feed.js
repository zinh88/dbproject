import { useEffect, useState } from "react";
import Post from "./Post";
import { MoreButton, OrderingOption, OrderingSelect, StyledFeed } from "./styles/Feed.styled";
import axios from "axios";

const Feed = () => {
    const [ordering, setOrdering] = useState(1);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);

    const requestPosts = () => {
        const order = ordering === 1 ? "popular": "recent";
        console.log(`/api/posts/${order}/${page}`);
        axios.get(`/api/posts/${order}/${page}`,{
            headers: {
                'Authorization': localStorage.Authorization
        }})
        .then((resp) => {
            const newposts = resp.data.posts;
            console.log(newposts)
            const more = resp.data.more;
            if( page === 1 )
                setPosts([...newposts]);
            else 
                setPosts([...posts, ...newposts]);
            setMore(more);
            setPage(page+1);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const changeOrdering = (o) => {
        if(o !== ordering) {
            setOrdering(o);
            setPage(1);
            setPosts([]);
            //requestPosts(1, o);
        }        
    }

    useEffect(requestPosts, [posts, page, ordering]);

    return (
        <StyledFeed>
            <OrderingSelect>
                <OrderingOption selected={ordering === 1} onClick={() => changeOrdering(1)}>Popular</OrderingOption>
                <OrderingOption selected={ordering === 2} onClick={() => changeOrdering(2)}>Recent</OrderingOption>
            </OrderingSelect>
            {
                posts.map((post, index) => 
                    <Post post={post} key={index} />
                )
            }
            {more && <MoreButton onClick={() => requestPosts(page,ordering)}>Show More</MoreButton>}
        </StyledFeed>
    )
}

export default Feed;