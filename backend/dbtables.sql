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

CREATE TABLE votes (
    post_id BIGSERIAL NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    member_id SERIAL NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    vote BOOLEAN NOT NULL,
    PRIMARY KEY (post_id, member_id)
);