import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { MessageBox } from "./styles/CreatePost.styled";

//This is the function that will be rendered.
const Login = ({setAuth}) =>
{
    const [log,setlog]=useState({
        mail:'',
        pass:'',
    });

    const [message, setMessage] = useState('');

    const Handleinput = (e) =>
    {
        const Name = e.target.name;
        const value = e.target.value;
        setlog({...log,[Name]:value});
    };

    //THIS FUNCTION check the user name and password
    const isvalidate=(e) =>
    {
        //CHECK Weather the user exist or not//BACKEND

        axios.post(`/api/auth/login`,log)
        .then((response)=>{
            const token = response.data.token;
            setAuth(true);
            localStorage.setItem("Authorization", `Bearer: ${token}`);
            console.log('login')
        }).catch((err) => {
            console.log(err);
            setMessage(err.response.data.message)
        });   
        return false ;
    }
    //This Will handle when the User enter credentials
    const HandleSubmit = (e) =>
    {
        e.preventDefault();
        try{
            let valid=isvalidate(e)
            if(valid)
            {
                    //Forward IT TO DB//posts
                    console.log.name("basit");
            };
            if(!valid)
            {
            //seterr('Incorrect Email  Or Password');
            };
        }
        catch
            {
                
            }
    }
return(
<>
<link rel="stylesheet" href="./styles/sign.css"></link>
    <div style={{  paddingTop: '50px',  display: 'flex',  justifyContent:'center', height:'100'}}>
        </div>
        <div style={{display: 'flex',  justifyContent:'center',  height: '100%'}}>
        <form action="" onSubmit={HandleSubmit}>
        <b>Email</b> 
        <input type="text" required autoComplete="OFF" 
        value={log.mail}
        onChange ={Handleinput}
        name="mail" 
        />
        <br/>
        <br/>
         <b>Password</b> 
        <input type="password" required autoComplete="OFF"
        value={log.pass}
        onChange ={Handleinput}
        name="pass"
        />
         <br/>
         <br/>
      <button type="submit" className="loginbtn">Login</button>
      <Link to='/signup' className="signuplink">Create Account</Link>
      {message !== '' && <MessageBox>{message}</MessageBox>}

      </form>
      
      </div>


</>
)};
export default Login;