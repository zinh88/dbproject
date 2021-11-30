CREATE DATABASE ldf;

CREATE USER ldfadmin;

GRANT ALL PRIVILEGES ON DATABASE ldf to ldfadmin;

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    hashedpassword VARCHAR(60) NOT NULL,
    displayname VARCHAR(20) NOT NULL
);

