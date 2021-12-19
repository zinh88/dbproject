const pool = require('../config/db');
const { Router } = require('express');
const authorize = require('../middleware/authorize')
const { cloudinary } = require('../config/cloudinary')
require('dotenv').config();

const router = Router();

router.post('/create', authorize, async (req, res)=> {
    try {
        const id = req.userid;

        const title = req.body.title;
        const text = req.body.body;
        let pic = 'NO IMAGE';

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

router.get('/post/:id', authorize, async (req, res)=> {
    const user_id = req.userid;
    const post_id = req.params.id;

    try {
        const response = await pool.query(
            `SELECT * FROM posts WHERE id=${post_id}`
        )
        if (response.rowCount === 0) {
            return res.status(404).json({ message: "Post Not Found" })
        }
        const postObject = await generatePost(user_id, post_id);
        res.json(postObject);
        
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error'});
    }
});

router.get('/popular/:page', authorize, async (req, res) => {
    try{
        const page = Number(req.params.page);
        const user_id = req.userid;
        const result = await pool.query(
            `SELECT id FROM popular WHERE id NOT IN (SELECT * FROM pinned) ORDER BY votes DESC LIMIT $1 OFFSET $2`,
            [10, (page-1)*10]
        )
        const more = !(result.rowCount < 10);
        const postids = result.rows;
        let posts = await Promise.all(postids.map( async ({ id }) => generatePost(user_id, id)));
        if(page === 1) {
            const pinnedposts = await getPinned(user_id);
            posts = [...pinnedposts, ...posts]
        }
        res.json({
            posts: posts,
            more: more
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
})

router.get('/recent/:page', authorize, async (req, res) => {
    try{
        const page = Number(req.params.page);
        const user_id = req.userid;
        const result = await pool.query(
            `SELECT id FROM posts WHERE id NOT IN (SELECT * FROM pinned) ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
            [10, (page-1)*10]
        )
        const more = !(result.rowCount < 10);
        const postids = result.rows;
        let posts = await Promise.all(postids.map( async ({ id }) => generatePost(user_id, id)));
        if(page === 1) {
            const pinnedposts = await getPinned(user_id);
            posts = [...pinnedposts, ...posts]
        }
        res.json({
            posts: posts,
            more: more
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
})

router.post('/pin/:id', authorize, async (req, res) => {
    try {
        const user_id = req.userid;
        const post_id = req.params.id;
        const role = await getRole(user_id);
        if (!(role > 0)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        if (!(await checkPinned(post_id))) {
            pool.query(
                `INSERT INTO pinned VALUES ($1)`,
                [post_id]
            );
            return res.status(200).json({ message: "Pinned" });
        } else {
            pool.query( 
                `DELETE FROM pinned WHERE post_id= $1`,
                [post_id]
            )
            return res.status(200).json({ message: "UnPinned" });
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
});

router.delete('/post/:id', authorize, async (req, res) => {
    try {
        const user_id = req.userid;
        const post_id = req.params.id;
        const role = await getRole(user_id);
        const isop = await checkOP(user_id, post_id);
        if ( isop || role > 0) {
            pool.query(
                `DELETE FROM posts WHERE id = $1`,
                [post_id]
            );
            res.status(200).json({message: "Post Deleted"});
        } else {
            return res.status(403).json({ message: "Unauthorized" });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
})

router.post('/bookmark/:id', authorize, async (req, res)=> {
    try {
        const user_id = req.userid;
        const post_id = req.params.id;
        const bookmark = req.body.bookmark;

        const result = await pool.query( 
            `SELECT * FROM bookmarks WHERE member_id= $1 AND post_id = $2`,
            [user_id, post_id]
        )
        if (bookmark && result.rowCount === 0) {
            await pool.query(
                `INSERT INTO bookmarks VALUES ($1, $2)`,
                [user_id, post_id]
            )
            return res.status(200).json({ message : 'Bookmarked' });
        } else if (!bookmark && result.rowCount !== 0) {
            await pool.query(
                `DELETE FROM bookmarks WHERE member_id = $1 AND post_id = $2`,
                [user_id, post_id]
            )
            return res.status(200).json({ message: 'Removed Bookmark' });
        } else {
            return res.status(200).json({ message: 'OK'});
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
});

router.get('/bookmarked', authorize, async (req, res) => {
    try{
        const user_id = req.userid;
        const result = await pool.query(
            `SELECT post_id as id FROM bookmarks WHERE member_id = $1`,
            [user_id]
        )
        const postids = result.rows;
        const posts = await Promise.all(postids.map( async ({ id }) => generatePost(user_id, id)));
        res.json({
            posts: posts
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
})

router.get('/own', authorize, async (req, res) => {
    try{
        const user_id = req.userid;
        const result = await pool.query(
            `SELECT id FROM posts WHERE member_id = $1`,
            [user_id]
        )
        const postids = result.rows;
        const posts = await Promise.all(postids.map( async ({ id }) => generatePost(user_id, id)));
        res.json({
            posts: posts
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
})

router.post('/vote/:id', authorize, async (req, res) => {
    try {
        const postid = req.params.id;
        const userid = req.userid;
        const vote = req.body.vote;
        const result = await pool.query(
            `SELECT * FROM votes WHERE member_id = $1 AND post_id = $2`,
            [userid, postid]
        )
        const voted = !(result.rowCount === 0);
        const votevalue = vote  === 1 ? "true" : "false";
        
        const querystring = 
        voted ? 
        `UPDATE votes SET vote = ${votevalue} WHERE member_id = ${userid} AND post_id = ${postid}`
        :
        `INSERT INTO votes VALUES (${postid}, ${userid}, ${votevalue})`;


        if (vote > 1 || vote < -1) return res.status(400).json({ message: "Bad Request" })
        if (vote === 1) {
            pool.query(
                querystring
            )
        } else if (vote === -1) {
            pool.query(
                querystring
            )
        } else if (vote === 0) {
            pool.query(
                `DELETE FROM votes WHERE member_id = $1 AND post_id = $2`,
                [userid, postid]
            )
        }
        return res.json({ message: "Voted" })
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Sever Error" })
    }
})

const checkOP = async (userid, postid) => {
    const result = await pool.query( 
        `SELECT * FROM posts WHERE id = $1 AND member_id = $2`,
        [postid, userid]
    )
    return result.rowCount !== 0;
}

const getPinned = async (userid) => {
    const result = await pool.query(
        `SELECT post_id AS id FROM pinned`
    )
    const postids = result.rows;
    const pinnedposts = await Promise.all(postids.map(async ({ id }) => generatePost(userid, id)));
    return pinnedposts;
}

const generatePost = async (userid, postid) => {
    const response = await pool.query(
        `SELECT * FROM posts WHERE id=${postid}`
    )
    if (response.rowCount === 0) {
        return res.status(404).json({ message: "Post Not Found" })
    }
    const post = response.rows[0];

    const isop = userid === post.member_id;
    const id = post.id;
    const pinned = await checkPinned(id);
    const title = post.title;
    const body = post.body;
    const postpic= post.picture;
    const { upvotes, downvotes } = await getVotes(id);
    const { uservote, bookmarked } = await getUserView(userid, id);
    const {  username, useremail, userpic } = await getOP(post.member_id);
    const { day, month, year, time } = makeDate(post.created_at);
    const oprole = await getRole(post.member_id);
    const ismod = (await getRole(userid)) > 0;
    const comments = await getNumComments(id);
    const haspic = postpic !== 'NO IMAGE';

    return {
        id: id,
        pinned: pinned,
        title: title,
        body: body,
        postpic: postpic,
        upvotes: upvotes,
        downvotes: downvotes,
        username: username,
        useremail: useremail,
        userpic: userpic,
        uservote: uservote,
        comments: comments,
        bookmarked: bookmarked,
        ismod:ismod,
        isop:isop,
        oprole: oprole,
        haspic: haspic,
        date: {
            day: day,
            month: month,
            year: year,
            time: time
        }
    }
};

const getOP = async (userid) => {
    const result = await pool.query(
        `SELECT * FROM members WHERE id = $1`,
        [userid]
    )
    const user = result.rows[0];

    return {
        username: user.displayname,
        useremail: user.email,
        userpic: user.picture,
    }
}

const checkPinned = async (postid) => {
    const response = await pool.query(
        `SELECT * FROM pinned WHERE post_id = $1`,
        [postid]
    )
    return response.rowCount !== 0;
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

const getRole = async (userid) => {
    const result = await pool.query(
        `SELECT member_role FROM roles WHERE member_id = $1`,
        [userid]
    );
    if (result.rowCount === 0) return 0;
    return result.rows[0].member_role;
}



const getNumComments = async (postid) => {
    const result = await pool.query(
        `SELECT count(id) FROM comments WHERE post_id = $1`,
        [postid]
    )
    return Number(result.rows[0].count);
}

const getUserView = async (userid, postid) => {
    const result = await pool.query(
        `SELECT * FROM members WHERE id= $1`,
        [userid]
    );
    if(result.rowCount === 0) throw { message: 'Fatal Error' };

    let vote = 0;
    const checkVote = await pool.query(
        `SELECT vote FROM votes WHERE member_id = $1 AND post_id = $2`,
        [userid, postid]
    )
    if(checkVote.rowCount !== 0) {
        vote = checkVote.rows[0].vote ? 1 : -1;
    }

    const checkBookmark = await pool.query(
        `SELECT * FROM bookmarks WHERE member_id = $1 AND post_id = $2`,
        [userid, postid]
    )

    return {
        uservote: vote,
        bookmarked: checkBookmark.rowCount !== 0
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