# CS340 Fall 21' Project
Deployed Link : https://lumsdiscussionforum.herokuapp.com

<img width="1348" alt="Screenshot 2022-01-06 at 2 28 46 PM" src="https://user-images.githubusercontent.com/89087139/148360890-aa3aeaff-3b11-4623-86d7-1fc9d8c56b6d.png">

## Members
* Muhammad Zain Khan
* Basit Rahim
* Arbaz Khan
* Muhammad Hamza

## Stack
* React.js
  * react-router-dom
  * axios
* Express.js
  * pg
  * bcrypt
  * jsonwebtoken
* PostgreSQL

## Info
LDF is a reddit-like forum where studens can discuss whatever. Features include:
* LUMS email only sign up (with email verification)
* Admin, Moderator, and Member roles
* Posts with both upvote and downvote option
* Comments to posts, comments to comments with infinite recursion
* View posts by popular or recent
* Profile settings: Display name, Display pic change
* Bookmarking posts and viewing them
* Admin/Mods can pin posts (so that they appear on top of feed)
* Site rules bar
* Members can see the delete button for their own posts/comments, and delete them
* Admin/Mods can delete other people's posts
* Posts with supported images and gifs.
* View own activity (posts)
* Visit a post by url to comment
* Administrators can set Moderators (add/delete)
* JWT login/logout sessions.

## Other
* Deployed on Heroku, with database on Heroku-Postgres
* Photos hosted on cloudinary 
