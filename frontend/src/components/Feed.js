import { useState } from "react";
import Post from "./Post";
import { OrderingOption, OrderingSelect, StyledFeed } from "./styles/Feed.styled";

const samplepost = {
    id: 2,
    pinned: true,
    title:`Sneed's Feed And Seed`,
    body: `The joke is that the place is called "Sneed's Feed & Seed" which is clever in itself and quite funny to those with a mature sense of humour but what's really just hilarious about it is that if you look closely at the front of this store, Sneed's Feed & Seed, you can see a line that reads "Formerly Chuck's". Now, this might go over the average viewer's head as this, THIS, is peak comedy. I doubt anything will ever be as funny as the joke about Sneed's Feed & Seed. Are you ready for this one? So, like I said, the place is called "Sneed's Feed & Seed" and this sign says "Formerly Chuck's", which means that when Chuck owned the place, well, I don't have to tell you...`,
    postpic: `https://res.cloudinary.com/dni1yyfcc/image/upload/v1638831959/LDF/profile_pics/dkso80tie7381_hiyduk.png`,
    upvotes: 90,
    downvotes: 20,
    username: 'Zain',
    useremail: '23100008@lums.edu.pk',
    userpic: 'NO IMAGE',
    uservote: 1,
    comments: 29,
    bookmarked: false,
    ismod:false,
    isop:false,
    date: {
        day: 23,
        month: 'Dec',
        year: 2021,
        time: '12:30 PM'
    }
}

const Feed = () => {
    const [ordering, setOrdering] = useState(1);
    const [posts, setPosts] = useState([samplepost, samplepost, samplepost]);

    const changeOrdering = () => {
        setOrdering(ordering === 1? 2 : 1);
    }

    return (
        <StyledFeed>
            <OrderingSelect>
                <OrderingOption selected={ordering === 1} onClick={changeOrdering}>Popular</OrderingOption>
                <OrderingOption selected={ordering === 2} onClick={changeOrdering}>Recent</OrderingOption>
            </OrderingSelect>
            {
                posts.map((post, index) => 
                    <Post post={post} key={index}  />
                )
            }
        </StyledFeed>
        
    )
}

export default Feed;