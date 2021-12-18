import axios from "axios";
import React, { useState } from "react";
import { CreatePost, GlobalStyle, Input, Label, MessageBox, PostForm , PostLink, PostText, StyledSubmit } from "./styles/CreatePost.styled";
import { Wrapper } from "./styles/Wrapper.styled";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [preview, setPreview] = useState();
    const [fileInputState, setFileInputState] = useState('');
    const [posturl, setPosturl] = useState('');
    const [message, setMessage] = useState({
        display: false,
        success: false,
        text: "Post Successful"
    });
    const [waiting, setWaiting] = useState(false);
    

    const handleChoose = (e) => {
        const file = e.target.files[0];
        setMessage({...message, display: false});
        if (file) {
            if(file.size > 2097152) {
                setMessage({display: true, success: false, text: "Max file size is 2mb"});
            }
            previewFile(file);
            setFileInputState(e.target.value);
            
        } else {
            setFileInputState('');
            setPreview(null);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
        };
    };

    const submitPost = (e) => {
        setMessage({...message, display: false });
        e.preventDefault();
        const data = {
            title: title,
            body: body,
            hasPic: !!preview,
            pic: preview
        }
        console.log(  data  );
        if (title === '') setMessage({display:true, success:false, text: "Failed: Title Cannot Be Empty"});
        else {
            setWaiting(true);
            axios.post('/api/posts/create', data, {
                headers: {
                    'Authorization': localStorage.Authorization
                }
            })
            .then((resp) => {
                console.log(resp)
                setMessage({ display: true, success: true, text: `Post Successful` });
                setPosturl(resp.data.post_url);
            })
            .catch((err) => {
                console.log(err)
                setWaiting(false);
                setMessage({ display: true, success: false, text: `Post Failed`})
            })
        }
    }

    return (
        <>
        <GlobalStyle />
        <Wrapper>
            <CreatePost>
                <PostForm onSubmit={submitPost}>
                    <Label htmlFor="title">Subject</Label>
                    <Input placeholder="What?" onChange={(e)=> { setTitle(e.target.value) }}/>
                    <Label htmlFor="body">Body</Label>
                    <PostText name={"Body"} placeholder="Your spicy post goes here. All life is suffering." onChange={(e)=> { setBody(e.target.value) }} rows={9}/>
                    <Label htmlFor="image">Picture</Label>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChoose} value={fileInputState} style={{border: "solid 2px"}}/>
                    {preview && <img src={preview} alt="uploadimage" style={{width : "auto", maxHeight: "200px"}}/>}
                    {message.display && <MessageBox success={message.success}>{message.text}</MessageBox >}
                    {!message.success && !waiting && <StyledSubmit type="submit">Submit</StyledSubmit>}
                    {message.success && message.display && <PostLink to={posturl}>Link To Post</PostLink>}
                </PostForm>
            </CreatePost>
        </Wrapper>
        </>
    )


}

export default CreatePage;