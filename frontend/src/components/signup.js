import { useImperativeHandle, useState } from "react";
import {Link} from 'react-router-dom';
import './signup.css';
//This Function WIll be returned/rendered From the file whenever, it is routed
const Signup =() =>{

//This call will contain information of the users when they signup
const [reginfo,setreginfo]=useState({
mail:'',
name:'',
psd:'',
rpsd:'',
});

//This Class will contain eror message which will be desplayed when occured
const [err,seterr]=useState({
perr:'',
mailerr:'',
pres:''
});

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
    if(reginfo.psd!==reginfo.rpsd)
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
    <link rel="stylesheet" href="sign.css"></link>

{/* Making center box */}
    <div style={{display: 'flex',  justifyContent:'center'}}>
        <b>Lums Discussion Forum</b><br/><br/>
    </div>

    <div style={{display: 'flex',  justifyContent:'center',  height: '100vh'}}>
        <form action="" onSubmit={HandleSubmit}>
 
            {/*EMAIL */}
            <b>LUMSEmail:</b> 
            <input type="text" required autoComplete="OFF" placeholder="2xxxxxxx@lums.edu.pk"  
                value={reginfo.mail}
                onChange ={Handleinput}
                name="mail" 
            />

            <div style={{color:"red", fontSize:12}} fonts>
                {err.mailerr}
            </div>
            <br/>

            {/*NAME */}
            <b>EnterName: </b> 
            <input type="text" required autoComplete="OFF" placeholder=" Basit Rahim"  
                value={reginfo.name}
                onChange ={Handleinput}
                name="name"
            />
            <br/>

            {/*Password */}
            <b>Password :</b> 
            <input type="password" required autoComplete="OFF" placeholder="password" 
                value={reginfo.psd}
                onChange ={Handleinput}
                name="psd"
            />
            <br/>

            {/*RE-ENTER */}
            <b>Repeat :</b> 
            <input type="password" required autoComplete="OFF" placeholder="password" 
                value={reginfo.rpsd}
                onChange ={Handleinput}
                name="rpsd"
            />
            <div style={{color:"red", fontSize:12}} fonts>
                {err.perr}
            </div>

            <Link to='/'>
                <b>Have An Account</b>
            </Link>
            <br/>


            <button type="button" className="cancelbtn">Cancel</button>
            <button type="submit" className="signupbtn">Sign Up</button>
        </form>
    </div>
    </>
   
);
};
export default Signup;