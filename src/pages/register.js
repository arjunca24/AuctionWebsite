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
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css'


function Register() {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (Cookies.get('user') != undefined){
        navigate("/auctions")
      }
  }, []);


  const [usernameLabel,setUsernameLabel] = useState("")
  const [forenameLabel,setForenameLabel] = useState("")
  const [surnameLabel,setSurnameLabel] = useState("")
  const [passwordLabel,setPasswordlabel] = useState("")
  const [confirmPasswordLabel,setConfirmPasswordLabel] = useState("")

  const [username,setUsername] = useState("")
  const [forename,setForename] = useState("")
  const [surname,setSurname] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  //const phoneValidation = usePhoneValidation(phoneNumber)

  const [passwordValues, setPasswordValues] = useState({
    password: "",
    showPassword: false,
});
  const [confirmPasswordValues, setConfirmPasswordValues] = useState({
    password: "",
    showPassword: false,
  });


  const handleClickShowPassword = () => {
    setPasswordValues({
        ...passwordValues,
        showPassword: !passwordValues.showPassword,
    });
    setConfirmPasswordValues({
        ...confirmPasswordValues,
        showPassword: !confirmPasswordValues.showPassword,
    });
    //Show password is inverted using the NOT function
    //This is done for both the password and confirm password
    //input box regardless of which one was clicked as there
    //is no point in showing one entry and hiding the other

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
        [prop]: event.target.value,
        //Update the password variable to the new value
    });
};
const handleConfirmPasswordChange = (prop) => (event) => {
    if (event.target.value != passwordValues.password){
        setConfirmPasswordLabel("Passwords do not match")
    }
    else{
        setConfirmPasswordLabel("")
    }
    setConfirmPasswordValues({
        ...confirmPasswordValues,
        [prop]: event.target.value,
        //Update the confirm password variable to the new value
    });
}

 function usernameChanged(e){
    if (e.includes('.') && e.includes('@') && e.length >= 6){ //6 is the minimum length of an email address
        setUsernameLabel("")
    }
    else{
        setUsernameLabel("Invalid email address")
    }
    setUsername(e)
 }

 function forenameChanged(e){
    setForename(e)
    if (e.length == 0){
        setForenameLabel("This field cannot be empty")
    }
    else if (e.length >= 50){
        setForenameLabel("Forename must be less than 50 characters")
    }
    else{
        setForenameLabel("")
    }
 }
 function surnameChanged(e){
    setSurname(e)
    if (e.length == 0){
        setSurnameLabel("This field cannot be empty")
    }
    else if (e.length >= 50){
        setSurnameLabel("Surname must be less than 50 characters")
    }
    else {
        setSurnameLabel("")
    }
 }
  
 function signup(){
    const password = passwordValues.password //Get the entered password
    if (password != '' && confirmPasswordValues.password != '' && username != '' && forename != '' && surname != '')
    //Ensures these values are not empty because the validation above is only triggered once a value has been entered 
    //in them once. This is done because it doesn't make sense to give the user an error message as soon as they visit
    //the page.
     {   
       if (passwordLabel == '' && confirmPasswordLabel == '' && usernameLabel == '' && forenameLabel == '' && surnameLabel   == '')
       //Checks to see if all the validation has been met before continuing
         {
           var salt = bcrypt.genSaltSync(8) //Generate a salt with 8 rounds
           var hash = bcrypt.hashSync(password,salt) //Create a hash using the salt and password  
                                                     //saved in the form salt+hash  
                                                     
           async function registerUser(values){
            const Data = await fetch('/register', {
               method:'POST',
               mode: 'cors',
               headers:{
               'Content-Type': 'application/json',
               'Accept': 'application/json'
               },  
              body: JSON.stringify({values: values})
               }).then(res => res.json()).then(data => {
                if (data.error === 'DuplicatePrimaryKey')
                {
                    setUsernameLabel("An account with this email address has already been registered.")
                }
                else{
                    navigate("/login")
                    //Navigates the user to the log in page once they have been 
                    //successfully signed up.
                }
               })

             }
           registerUser(`'${username}','${forename}','${surname}','${phoneNumber}','${hash}'`)
           //Calls the above register user function with the given values
         }
     }
    else {
        setUsernameLabel("Please ensure all fields are filled in")
       }   
 }
  return (

    <div className={"mainContainer"}>
    
    <div className={"titleContainer"}>
        <div>Register</div>
    </div>
    <br />
    <div className={"inputContainer"}>
    <label className="errorLabel">{usernameLabel}</label>
        <input
            placeholder="Enter your email here"
            className={"inputBox"} 
            onChange = {(e) => usernameChanged(e.target.value)} />
        <br/>
        <label className="errorLabel">{forenameLabel}</label>
        <input
            placeholder="Enter your forename here"
            className={"inputBox"} 
            onChange = {(e) => forenameChanged(e.target.value)} />
        <br/>
        <label className="errorLabel">{surnameLabel}</label>
        <input
            placeholder="Enter your surname here"
            className={"inputBox"} 
            onChange = {(e) => surnameChanged(e.target.value)} />
        <br/>
        <PhoneInput
          inputStyle={{width: 300, fontSize: 20}}
          defaultCountry="gb"
          value={phoneNumber}
          onChange={(newPhoneNumber) => setPhoneNumber(newPhoneNumber)} />
        
       
        
    </div>
    <br/>
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
    <br/>
    <label className="errorLabel">{confirmPasswordLabel}</label>   
    <Input
                type={
                    confirmPasswordValues.showPassword
                        ? "text"
                        : "password"
                }
                onChange={handleConfirmPasswordChange("password")}
                value={confirmPasswordValues.password}
                className = {"inputBox"}
                placeholder='Confirm password'
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
                            {confirmPasswordValues.showPassword ? (
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
    <div className = {"inputContainer"} style = {{color: 'blue', cursor: 'pointer'}} onClick = {() => navigate("/login")}>Already have an account? Log in </div>
   
    <div className={"inputContainer"}>
        <input
            className={"inputButton"}
            type="button"
            onClick = {signup}
            value={"Sign Up"} />
    </div>
</div>
  )
  }


export default Register;
