const pool = require('../config/db');
const { Router } = require('express');
const validInfo = require('../middleware/authorize')
const { cloudinary } = require('../config/cloudinary')
require('dotenv').config();

const router = Router();

router.post('/create', validInfo, async (req, res)=> {
    try {
        const id = req.userid;

        const title = req.body.title;
        const text = req.body.body;
        const pic = 'NO IMAGE';

        if(req.body.hasPic) {
            const uploadResponse = await cloudinary.uploader.upload(
                req.body.pic,
            )
            pic = uploadResponse.url;
        }

        const post = await pool.query(
            `INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id`,
            [id, title, text, pic]
        );
        console.log(post);
        const post_id = post.rows[0].id;
        res.json({ 
            message: "Post Successful",
            post_url: `/posts/${post_id}`
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Post Failed' })
    }
});

router.get('/:id', validInfo, async (req, res)=> {
    const user_id = req.userid;
    const post_id = req.params.id;

    try {
        const response = await pool.query(
            `SELECT * FROM posts WHERE id=${post_id}`
        )
        if (response.rowCount === 0) {
            return res.status(404).json({ message: "Post Not Found" })
        }
        const post = response.rows[0];
        //const postObject = generatePost(user_id, post);
        //console.log(await getVotes(post.id));
        const date = new Date(post.created_at);
        console.log(date)
        console.log(makeDate(date))
        //res.json(postObject);
        
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error'});
    }
});

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
const test = {
    id: '20',
    member_id: 5,
    title: 'I Hate DB',
    body: 'i hate db',
    picture: 'NO IMAGE',
    created_at: '2021-12-14T09:05:43.506Z'
  }

const generatePost = async (userid, post) => {
    const isop = userid === post.member_id;
    const id = post.id;
    const pinned = await checkPinned(id);
    const title = post.title;
    const body = post.body;
    const postpic= post.picture;
    const { upvotes, downvotes } = await getVotes(id);
    const { username, useremail, userpic } = await getUserView(userid, id);
    const date = makeDate(post.created_at);

};

const checkPinned = async (postid) => {
    const response = await pool.query(
        `SELECT * FROM pinned WHERE post_id = $1`,
        [postid]
    )
    return response.rowCount === 0;
}

const getVotes = async (postid) => {
    const response = await pool.query(
        `SELECT vote, COUNT(vote) FROM votes WHERE post_id = $1 GROUP BY vote`,
        [postid]
    )
    let upvotes = 0;
    let downvotes = 0;
    for (const item of response.rows) {
        if (item.vote) upvotes = Number(item.count);
        else downvotes = Number(item.count);
    }
    return ({ upvotes: upvotes, downvotes: downvotes});
}

const getUserView = async (userid, postid) => {
    const result = await pool.query(
        `SELECT * FROM members WHERE id= $1`,
        [userid]
    );
    if(result.rowCount === 0) throw { message: 'Fatal Error' };
    const user = result.rows[0];

    return {
        username: user.displayname,
        useremail: user.email,
        userpic: user.picture
    };
}

const makeDate = (date) => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const time  = (date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear(),
        time: time
    }
}




module.exports = router;