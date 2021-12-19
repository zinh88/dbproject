const pool = require('../config/db');
const { Router } = require('express');
const authorize = require('../middleware/authorize')
require('dotenv').config();

const router = Router();

router.get('/post/:id/:p', authorize, async (req, res) => {
    try {
        const userid = req.userid;
        const postid = req.params.id;
        const page = req.params.p;
        const result = await pool.query(
            `SELECT id FROM comments WHERE post_id = $1 AND parent_id IS NULL ORDER BY id DESC LIMIT $2 OFFSET $3`,
            [postid, page*5, (page-1)*5]
        )
        const commentids = result.rows;
        const more = !(result.rowCount < 5);
        const comments = await Promise.all(commentids.map(async ({ id }) => await generateCommentObject(userid, id)));
        res.json({
            comments: comments,
            more: more
        })

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/comment/:id/:n', authorize, async (req, res) => {
    try {
        const userid = req.userid;
        const commentid = req.params.id;
        const from = req.params.n;
        const result = await pool.query(
            `SELECT id FROM comments WHERE parent_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3`,
            [commentid, from+5, from]
        )
        const commentids = result.rows;
        const comments = await Promise.all(commentids.map(async ({ id }) => await generateCommentObject(userid, id)));
        res.json({
            replies: comments,
        })
    } catch(err) {
        console.log(err);
    }
});

router.post('/post/:id', authorize, async (req, res) => {
    try {
        const userid = req.userid;
        const postid = req.params.id;
        const text = req.body.comment;
        const result = await pool.query(
            `INSERT INTO comments VALUES (DEFAULT, $1, $2, $3, NULL) RETURNING id`,
            [postid, userid, text]
        )
        const id = result.rows[0].id
        const comment = await generateCommentObject(userid, id)
        res.json({ comment: comment })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})

router.post('/comment/:id', authorize, async (req, res) => {
    try {
        const userid = req.userid;
        const commentid = req.params.id;
        const postid = req.body.postid;
        const text = req.body.comment;
        const result = await pool.query(
            `INSERT INTO comments VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id`,
            [postid, userid, text, commentid]
        )
        const id = result.rows[0].id
        const comment = await generateCommentObject(userid, id)
        res.json({ comment: comment })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})

router.delete('/delete/:id', authorize, async (req, res)=> {
    try {
        const id = req.params.id;
        await pool.query(
            `DELETE FROM comments WHERE id = $1`,
            [id]
        )
        res.json({ message: "Comment Deleted" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})

const generateCommentObject = async ( userid , commentid ) => {
    const id = commentid;
    const result = await pool.query(
        `SELECT * FROM comments WHERE id = $1`,
        [id]
    )
    
    const comment = result.rows[0];
    const text = comment.comment;
    const posterid = comment.member_id;
    const ismine = userid === posterid;

    const { username , useremail, userpic } = await getUserInfo(posterid);

    const date = makeDate(comment.created_at);
    const replies = await pool.query(
        `SELECT count (id) FROM comments WHERE parent_id = $1`,
        [id]
    )
    const numreplies = replies.rows[0].count;
    return {
        id: id,
        username: username,
        useremail: useremail,
        userpic: userpic,
        text: text,
        ismine: ismine,
        date: date,
        numreplies: numreplies
    }
}

const getUserInfo = async (userid) => {
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