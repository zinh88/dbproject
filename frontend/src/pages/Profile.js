import { DeletePicButton, EditBox, EditButton, ErrorBox, GlobalStyle, MoreButton, NameEnter, NameForm, NameSubmit, PicForm, ProfileInfo, ProfilePic, ProfileWrapper, Wrapper } from "./styles/Profile.styled";
import { useState } from "react";
import axios from "axios";

import defaultpic from '../assets/Untitled.png'
import Post from "../components/Post";

const Profile = () => {
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');
    const [role, setRole] = useState('');
    const [editmode, setEditmode] = useState(false);
    const [preview, setPreview] = useState();
    const [fileInputState, setFileInputState] = useState('');
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false);
    const [nametext, setNametext] = useState('');
    const [seeposts, setSeeposts] = useState(false);
    const [posts, setPosts] = useState([]);
 
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

    const getInfo = async () => {
        axios.get('/api/user/info', {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((response) => {
            console.log(response);
            setName(response.data.name);
            setPic(response.data.picture === 'NO IMAGE'? defaultpic : response.data.picture);
            const role_n = response.data.role;
            setRole(role_n === 1? 'Moderator' : role_n === 2 ? 'Administrator' : 'Member');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useState(()=> {
        getInfo();
    },[])

    const changeName = (e) => {
        e.preventDefault();
        console.log(nametext);
        setError(false);
        axios.put('/api/user/name', { name: nametext }, {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((resp) => {
            console.log(resp);
            getInfo();
        })
        .catch((err) => {
            console.log(err);
            if(err.response.data) {
                setError(true);
                setMessage( err.response.data.message )
            }
        })
    }

    const changePic = (e) => {
        e.preventDefault();
        console.log(preview);
        setError(false);
        axios.put('/api/user/picture', { pic: preview }, {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((resp) => {
            console.log(resp);
            getInfo();
        })
        .catch((err) => {
            console.log(err);
            if(err.response.data) {
                setError(true);
                setMessage( err.response.data.message )
            }
        })
    }

    const deletePic = () => {
        setError(false);
        axios.delete('/api/user/picture', {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((resp) => {
            console.log(resp);
            getInfo();
        })
        .catch((err) => {
            console.log(err);
            if(err.response.body) {
                setError(true);
                setMessage( err.response.body.message )
            }
        })
    }

    const viewPosts = () => {
        setSeeposts(true);
        axios.get('/api/posts/own', {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((resp) => {
            console.log(resp);
            setPosts([...resp.data.posts]);
        })
        .catch((err) => {
            console.log(err);
            if(err.response.data) {
                setError(true);
                setMessage( err.response.data.message )
            }
        })
    }


    return(
        <>
        <GlobalStyle />
        <Wrapper>
            <ProfileWrapper>
                <ProfileInfo>
                    <ProfilePic pic={pic} />
                    <>{name}</>
                    <div style={{ color: "#00ff00", fontSize : "large " }}>[{role}]</div>
                    {(!editmode) && <EditButton onClick={() => setEditmode(true)}>Edit</EditButton>}
                    {
                    editmode && 
                    <div>
                    {error && <ErrorBox>Error: {message}</ErrorBox>}
                    <EditBox>
                        <NameForm onSubmit={changeName}>
                            <NameEnter placeholder="Enter New Name" rows={1} onChange={(e) => {setNametext(e.target.value)}}></NameEnter>
                            <NameSubmit type="submit">Change</NameSubmit>
                        </NameForm>
                        <PicForm onSubmit={changePic}>
                            <input type="file" accept="image/x-png,image/jpeg" onChange={handleChoose} value={fileInputState} style={{ width: "100%"}}/>
                            <NameSubmit type="submit">Change</NameSubmit>
                        </PicForm>
                    </EditBox>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} >
                    {preview && <img src={preview} alt="uploadimage" style={{width : "auto", maxHeight: "200px", display: "flex"}}/>}
                    </div>
                    <DeletePicButton onClick={deletePic}>Remove Picture</DeletePicButton>
                    </div>
                    }
                </ProfileInfo>
                {!seeposts && <MoreButton onClick={viewPosts}>View My Posts</MoreButton>}
                {seeposts && posts.map((post, i) => <Post post={post} key={i} />)}
            </ProfileWrapper>
        </Wrapper>
        </>
    )
}

export default Profile;