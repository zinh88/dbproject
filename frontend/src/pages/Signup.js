import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom';
import './styles/signup.css';
//This Function WIll be returned/rendered From the file whenever, it is routed
const Signup =() =>{
//This call will contain information of the users when they signup
const [reginfo,setreginfo]=useState({
mail:'',
name:'',
pass:'',
rpsd:'',
});

//This Class will contain eror message which will be desplayed when occured
const [err,seterr]=useState({
perr:'',
mailerr:'',
pres:''
});
  
const [message, setMessage] = useState('');

//Handle input This function dynamically capture any value entered
const Handleinput =(e) =>{
const name=e.target.name;
const value = e.target.value;
setreginfo({...reginfo,[name]:value});
};

//Isvalidate This Function will check weather the input is correct or Not
const isvalidate=(e)=>{
    let perr='';
    let mailerr='';
    let pres='';
    if(!reginfo.mail.includes("@lums.edu.pk"))
        {
            mailerr="The email is not valid";
        }
    if(reginfo.pass!==reginfo.rpsd)
        {
            perr="The password do not match";
        }
    if(mailerr || perr){
            seterr({perr,mailerr,pres});
            return false;
        }
        return true;
};
//Handle Submit is a function that will be called once a function is finished
const HandleSubmit = (e)=>{
    e.preventDefault();
    try{
        if(isvalidate(e))
        {
            //Forward IT
            let perr='CHECK EMAIL';
            let mailerr='';
            let pres='';
            axios.post(`/api/auth/signup`,reginfo ).then((response)=>{
                perr=response.data.message;
                seterr({perr,mailerr,pres});
            })
        };
    }
    catch
    {

    }
};
return (
    <>
    {/*This part is for Ouput of login*/}
 {/*External Cascading Is imported */}
    <link rel="stylesheet" href="./styles/sign.css"></link>

{/* Making center box */}
<div style={{  paddingTop: '50px',  display: 'flex',  justifyContent:'center', height:'100'}}>
        </div>
    <div style={{ display: 'flex',  justifyContent:'center', height:'100%'}}>
        <form action="" onSubmit={HandleSubmit}>
 
            {/*EMAIL */}
            <b>LUMS Email</b>
            <input type="text" required autoComplete="OFF" 
                value={reginfo.mail}
                onChange ={Handleinput}
                name="mail" 
                style={{height:'50px'}}
            />
            <br/>
            <br/>

            {/*NAME */}
            <b>Display Name</b> 
            <input type="text" required autoComplete="OFF"  
                value={reginfo.name}
                onChange ={Handleinput}
                name="name"
                style={{height:'50px'}}
            />
            <br/>
            <br/>
            {/*Password */}
            <b>Password</b> 
            <input type="password" required autoComplete="OFF"
                value={reginfo.pass}
                onChange ={Handleinput}
                name="pass"
                style={{height:'50px'}}
            />
            <br/>
            <br/>
            {/*RE-ENTER */}
            <b>Re-Type Password</b> 
            <input type="password" required autoComplete="OFF"
                value={reginfo.rpsd}
                onChange ={Handleinput}
                name="rpsd"
                style={{height:'50px'}}
            />
            <br/>
            <br/>
            <button type="submit" className="loginbtn">Sign Up</button>
            <Link to='/login' className="signuplink">Already Have An Account</Link>
        </form> 
        <h1>{message}</h1>
    </div>
    </>
   
);
};
export default Signup;