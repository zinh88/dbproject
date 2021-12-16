CREATE DATABASE ldf;

CREATE USER ldfadmin;

GRANT ALL PRIVILEGES ON DATABASE ldf to ldfadmin;

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    hashedpassword VARCHAR(60) NOT NULL,
    displayname VARCHAR(30) NOT NULL,
    picture TEXT,
    bio TEXT
);

CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    member_id SERIAL NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT,
    picture TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGSERIAL NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    member_id SERIAL NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    parent_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

SELECT * FROM comments WHERE parent_id IS NULL;

CREATE TABLE votes (
    post_id BIGSERIAL NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    member_id SERIAL NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    vote BOOLEAN NOT NULL,
    PRIMARY KEY (post_id, member_id)
);

SELECT vote, COUNT(vote) FROM votes WHERE post_id = id GROUP BY vote;

CREATE TABLE roles (
    member_id SERIAL NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    member_role INT NOT NULL,
    PRIMARY KEY (member_id)
);

CREATE TABLE bookmarks (
    member_id SERIAL NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    post_id BIGSERIAL NOT NULL REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE pinned (
    post_id BIGSERIAL NOT NULL REFERENCES posts(id) ON DELETE CASCADE
);

SELECT * FROM posts WHERE id NOT IN (SELECT * FROM pinned);

CREATE VIEW popular AS 
    WITH votecount AS
        (SELECT post_id as id, count(post_id) FROM votes GROUP BY post_id)
    SELECT id, coalesce(count ,0) votes FROM posts NATURAL LEFT OUTER JOIN votecount;

SELECT id FROM popular ORDER BY votes DESC LIMIT 10 OFFSET 0;

CREATE INDEX post_id ON posts (id);
CREATE INDEX comment_post ON comments (post_id);
CREATE INDEX post_vote ON votes (post_id);
CREATE INDEX user_vote ON votes (member_id);
CREATE INDEX commenter ON comments (member_id);
CREATE INDEX bookmarker ON bookmarks (member_id);
CREATE INDEX comment_id ON comments (id);
CREATE INDEX post_time ON posts (created_at);
CREATE INDEX comment_parent ON comments (parent_id);