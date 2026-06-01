import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs'

import '../App.css'
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";


function Login_Page() {
  const navigate = useNavigate()
  useEffect(() => {
    if (Cookies.get('user') != undefined){
        //If the user is already logged in then they will be redirected to the auctions page
        navigate("/auctions")
      }
  }, []);

  //Username and Password error label
  const [loginLabel,setLoginlabel] = useState("") 
  const [passwordLabel,setPasswordlabel] = useState("")

  const [username,setUsername] = useState("")
  const [passwordValues, setPasswordValues] = useState({
    password: "",
    showPassword: false,
    //Password is stored as the password and whether it is to be shown or hidden
});

  const handleClickShowPassword = () => {
    setPasswordValues({
        ...passwordValues,
        showPassword: !passwordValues.showPassword,
        //Show password is inverted using the NOT function
    });
};
const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

const handlePasswordChange = (prop) => (event) => { 

  const newPassword = event.target.value
  if (newPassword.length < 8 || newPassword.length > 20){
      setPasswordlabel("Password must be between 8 and 20 characters long")
  }
  //Checks to see if the password contains digits, capital letters and special characters
  //using regular expression matching
  else if (newPassword.match(/[0-9]+/) == null){
      setPasswordlabel("Password must contain a digit")
  }
  else if (newPassword.match(/[A-Z]+/) == null){
      setPasswordlabel("Password must contain a capital letter")
  }
  else if (newPassword.match(/[!£$%&#@]+/) == null){
      setPasswordlabel("Password must contain a special character")
  }
  else{
      setPasswordlabel("")
  }
  setPasswordValues({
      ...passwordValues,
      [prop]: newPassword,
      //Update the password variable to the new value
  });
};
 function usernameChanged(e){
    if (e.includes('.') && e.includes('@') && e.length >=6 ){ //6 is the minimum length of an email address
        setLoginlabel("")
    }
    else{
        setLoginlabel("Username invalid")
    }
    setUsername(e)
 }
  function register (){
    console.log('hi')
    navigate("/register")
  }
  function login(x) {
    const password = passwordValues.password
    
    if (loginLabel== "" && username != '' && passwordLabel == '')
      { 
        async function getHashedPassword(values,table,conditions){
            const Data = await fetch('/api', {
               method:'POST',
               mode: 'cors',
               headers:{
               'Content-Type': 'application/json',
               'Accept': 'application/json'
               },  
              body: JSON.stringify({values: values,
                                    table:table,
                                    conditions: conditions})
               }).then(res => res.json())
               .then(data => {
                try{
                const passwordMatches = bcrypt.compareSync(password,data.record[0].Password) // The hash contains the salt and the hashed password 
                                                                                             // so the salt and entered password will be combined and
                                                                                             // then hashed to see if it matches the hashed password
                                                                                             // returns True or False   
                console.log(passwordMatches)
                if (passwordMatches)
                  {
                    setPasswordlabel("")
                    Cookies.set('user',username,{expires: 7})//This session will persist for 7 days unless the cookies
                                                             //are cleared.
                    navigate("/auctions")
                  }

                else {
                  setPasswordlabel("Incorrect password")
                  }
               }
            catch{
               setLoginlabel("Username not found") 
            }})
             }
        getHashedPassword('Password','Users',`Email = '${username}'`)
             
     }
    else {
      if (username == ''){
        setLoginlabel("This field cannot be empty")
      }
    }
    
}
  return (

    <div className={"mainContainer"}>
    
    <div className={"titleContainer"}>
        <div>Login</div>
    </div>
    <br />
    <div className={"inputContainer"}>
    <label className="errorLabel">{loginLabel}</label>
        <input
            placeholder="Enter your email here"
            className={"inputBox"} 
            onChange = {(e) => usernameChanged(e.target.value)} />
        
    </div>
    <br />
    <div className={"inputContainer"}>
    <label className="errorLabel">{passwordLabel}</label>   
    <Input
                type={
                    passwordValues.showPassword
                        ? "text"
                        : "password"
                }
                onChange={handlePasswordChange("password")}
                value={passwordValues.password}
                className = {"inputBox"}
                placeholder='Enter your password here'
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={
                                handleClickShowPassword
                            }
                            onMouseDown={
                                handleMouseDownPassword
                            }
                        >
                            {passwordValues.showPassword ? (
                                <Visibility />
                            ) : (
                                <VisibilityOff />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
            />
    </div>
    <br />
    <div className = {"inputContainer"} style = {{color: 'blue', cursor: 'pointer'}} onClick = {register}>No account? Sign Up </div>

    <div className={"inputContainer"}>
        <input
            className={"inputButton"}
            type="button"
            onClick = {(e) => login(e.target.value) }
            value={"Log in"} />
    </div>
</div>
  )
  }


export default Login_Page;
