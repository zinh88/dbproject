import react from "react";

const Posts = ()=> 
{
    let arr={name:'Basit',post: 'I am A good boy'};
    let pos=[arr];
    return (
        <>
           <b> {pos.at(0).name}:</b><br/>
           {pos.at(0).post}
        </>
    )
}
export default Posts;