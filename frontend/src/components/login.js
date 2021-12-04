import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';
//This is the function that will be rendered.
const Login = () =>
{
    const url = 'http://10.130.17.38:5000';
    const [log,setlog]=useState({
        mail:'',
        pass:'',
    });
    const [err,seterr]=useState('')
    //This will handle any input
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

        axios.post(`${url}/api/auth/login`,log)
        .then((response)=>{
            console.log(response);
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
            seterr('Incorrect Email  Or Password');
            };
        }
        catch
            {
                
            }
    }
return(
<>

<link rel="stylesheet" href="./styles/sign.css"></link>
    <div style={{display: 'flex',  justifyContent:'center'}}>
        <b>Lums Discussion Forum</b><br/><br/>
        </div>
        <div style={{display: 'flex',  justifyContent:'center',  height: '100vh'}}>
        <form action="" onSubmit={HandleSubmit}>
        {/*EMAIL */}
        <b>LUMS Email:</b> 
        <input type="text" required autoComplete="OFF" placeholder="2xxxxxxx@lums.edu.pk"  
        value={log.mail}
        onChange ={Handleinput}
        name="mail" 
        />
        <br/>
         {/*Password */}
         <b>Password:      </b> 
        <input type="password" required autoComplete="OFF" placeholder="password" 
        value={log.pass}
        onChange ={Handleinput}
        name="pass"
        />
        <div style={{color:"red", fontSize:12}} fonts>
            {err}
         </div>
        <br/>
        <Link to='/signup'>
         <b>Create Account</b>
         </Link>
         <br/>
 <button type="button" className="cancelbtn">Cancel</button>
      <button type="submit" className="signupbtn">Log In</button>
      </form>
      </div>


</>
)
};
export default Login;