import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Autocomplete } from '@mui/material';
import { TextField } from '@material-ui/core';
import moment from 'moment/moment';

import '../App.css'
import '../styles/card.css'

//Defined globally since it won't change
const categories = ['All', 'Electronics', 'Cars','Antiques','Jewelerry']

export default function CreateAuction(){
  const navigate = useNavigate()
  const UserID = Cookies.get('user')
  
  const [nameErrorLabel,setNameErrorLabel] = useState("")
  const [descriptionErrorLabel ,setDescriptionErrorLabel] = useState("")
  //const [estimated,se] = useState("")
  //const [nameErrorLabel,setNameErrorLabel] = useState("")


  const [itemName,setItemName] = useState("")
  const [itemDescription,setItemDescription] = useState("")
  const [imageURL,setImageURL] = useState("")
  const [endDate,setEndDate] = useState("")
  const [category, setCategory] = useState("All")
  
  const [estimatedValue,setEstimatedValue] = useState(0)
  const [startingPrice,setStartingPrice] = useState(0)
  const [reservePrice,setReservePrice] = useState(0)



  
  function ItemNameChanged(newValue){
    setItemName(newValue)
    if (newValue.length == 0 ){
         setNameErrorLabel("This field cannot be empty")
    }
    else if (newValue.length >= 50 ){
         setNameErrorLabel("The item name must be less than 50 characters")
   }
    else {
         setNameErrorLabel('')        
    }

  }

  function ItemDescriptionChanged(newValue){
    setItemDescription(newValue)
    if (newValue.length == 0){
        setDescriptionErrorLabel("This field cannot be empty")
     }
    else if (newValue.length >= 1000){
        setDescriptionErrorLabel("The item description must be less than 1000 characters")
     }
    else {
        setDescriptionErrorLabel('')
        }
    }

  
 
  function ImageURLChanged(newImageURL){
    setImageURL(newImageURL)
  }

  function dateChanged(newDate){
    setEndDate(moment(newDate.$d).format('YYYY-MM-DD HH:mm:ss'))//Convert the date and time into 
                                                                //a format accepted by the database
  }
  function estimtatedValueChanged(newPrice){
    setEstimatedValue(newPrice)
  }
  function startingPriceChanged(newPrice){
    setStartingPrice(newPrice)
  }
  function reservePriceChanged(newPrice){
    setReservePrice(newPrice)
  }

  function categoryChanged(event,newCategory){
    setCategory(newCategory)    
  }

  function create (){
    //Ensures these values are not empty because the validation is only triggered once a value has been entered 
    //in them once. This is done because it doesn't make sense to give the user an error message as soon as they visit
    //the page.
    if (itemName != '' && itemDescription != '' && estimatedValue > 0 && startingPrice > 0 && reservePrice > 0 && endDate !=''){
     //Check to see if all error labels are empty before continuing
     if (nameErrorLabel == '' && descriptionErrorLabel == '' ){
      async function CreateAuction(values){
        const Data = await fetch('/create', {
           method:'POST',
           mode: 'cors',
           headers:{
           'Content-Type': 'application/json',
           'Accept': 'application/json'
           },  
          body: JSON.stringify({values: values})
           }).then(res => res.json())
       navigate("/sales")
       //Navigate to the sales page once successful
         }
      CreateAuction(`'${UserID}','${itemName}','${itemDescription}','${imageURL}','${estimatedValue}','${startingPrice}','${reservePrice}','${endDate}','${category}','[]'`)
    }
    }
   else{
   } 
  
  }
    return (

        <div className={"mainContainer"}>
        
        <div className={"titleContainer"} style = {{marginTop: 100, marginBottom: 30 , color: '#00308F'}}>      
            <div>Create your Auction</div>
        </div>
        <br />
        <div className={"inputContainer"}>
        <label className="errorLabel">{nameErrorLabel}</label>
            <input
                placeholder="Item Name"
                className={"inputBox"}
                onChange = {(e) => ItemNameChanged(e.target.value)} />   
            <br/>   
            <label className="errorLabel">{descriptionErrorLabel}</label>
            <input
                placeholder="Item Description"
                className={"inputBox"}
                onChange = {(e) => ItemDescriptionChanged(e.target.value)}
                 />  
            <br/>
            <input
                placeholder="Image URL"
                className={"inputBox"}
                onChange={(e) => ImageURLChanged(e.target.value)} /> 
            <br/>
            <input
                type = 'number'
                style = {{marginLeft: 270, width: 130}}
                placeholder="Est Value"
                className={"inputBox"}
                onChange={(e) => estimtatedValueChanged(e.target.value)} /> 
            <br/>
            <input
                type = 'number'
                style = {{marginLeft: 270, width: 130}}
                placeholder="Starting Price"
                className={"inputBox"}
                onChange={(e) => startingPriceChanged(e.target.value)} />
            <br/>
            <input
                type = 'number'
                style = {{marginLeft: 270, width: 130, marginBottom: -200}}
                placeholder="Reserve Price"
                className={"inputBox"}
                onChange={(e) => reservePriceChanged(e.target.value)} />

            <img alt = 'Image not loading' src = {imageURL||'https://t4.ftcdn.net/jpg/01/07/57/91/360_F_107579101_QVlTG43Fwg9Q6ggwF436MPIBTVpaKKtb.jpg'} className='card-img3' />
          
          
            <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker  onChange={(newDate) => dateChanged(newDate)} disablePast views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                 label="Select Auction End Date" />
            </DemoContainer>
            </LocalizationProvider>

            <label style = {{marginTop: 20}}>
               <Autocomplete disableClearable={true} options = {categories} style = {{width: 200,}} onChange = {categoryChanged} defaultValue={'All'} renderInput={(params) => <TextField {...params} label = "Category" variant = "outlined"/>}/>
            </label> 

        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                style = {{background:'violet'}}
                onClick = {create}
                value={"Create Auction"} />
        </div>
    </div>
      )
}

