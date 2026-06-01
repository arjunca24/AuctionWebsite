import React from "react"
import { useState } from "react"
import {TextField} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { Slider } from "@mui/material"


import '../styles/navstyles.css'
import '../styles/category.css'
import '../styles/card.css'
import Auctions,{ Card } from "../components/card"
import Auction from "./auction"

//Radio buttons for selecting the category
const Input = ({ handleChange, value, title, name, color }) => {
    return (
      <label className="sidebar-label-container">
        <input onChange={handleChange} type="radio" value={value} name={name} />
        <span className="checkmark" style={{ backgroundColor: 'color' }}></span>
        {title}
      </label>
    );
  };


export default function Auctions_Page (){

    const orderby = ['StartingPrice', 'EndDate'] 
    const [val,setValue] = useState("") //Search Value
    const [range,setRange] = useState([0,10000]) //Minimum and maximum price filter
    const [order,setOrder] = useState('StartingPrice') //Order to display values
    const [pos, setPos] = useState("") //The position of the category chosen which can be 1,2,3 or 4
    const [category, setCategory] = useState("") //Category of item


    function searchFor(x){
        setValue(x) //Set the search value to the entered value 
                    //The items displayed will be automaically changed as the search item parameter has changed
    }

    function newPrice(e,price){
      setRange(price) //Update the price filter as it is changed
                         //The items displayed will be automaically filtered as the price parameter has changed
    }
    
    function handleChange(e){
       setCategory(e.target.value) //Change the category as it is changed
                                   //The items displayed will be automaically changed as the category parameter has changed
    }
    function orderChanged(e,x){
      setOrder(x) //The order in which the items are displayed will be changed
                  //The items displayed will be automaically reordered as the order parameter has changed
    }
    //More information regarding the automatic updates of the items displayed can be found at line 116
  
    return (
        <div>
            <div>
    <h2 className="sidebar-title1" >Price</h2>
     <Slider style = {{width: 200, marginLeft: 50 , marginTop: 20}} getAriaLabel={() => 'Temperature range'} min = {0} max={10000} value= {range} onChange = {newPrice}valueLabelDisplay="auto"/>
     <h1 style = {{marginLeft: 80,fontSize: 30, fontWeight: 300}}>£{range[0]}-{range[1]}</h1>
     
      <h2 className="sidebar-title1" style = {{marginTop: 50}} >Category</h2>
      <div>
        <label className="sidebar-label-container">
          <input onChange={(e,x) => setPos(x)} type="radio" value="" name="test" />
        </label>
        <Input
          handleChange={handleChange}
          value="All"
          title="All"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Cars"
          title="Cars"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Electronics"
          title="Electronics"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Antiques"
          title="Antiques"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Jewelerry"
          title="Jewelerry"
          name="test"
        />
      </div>
    </div>
       <div class="rightNav">
        <label style = {{position: 'absolute', top:100, left: 500 }}>
            <input
                type="text"
                name="search"
                id="search"
                onChange = {(e) => searchFor(e.target.value)}
                placeholder="Search"
            />

        </label>
        <label style = {{position: 'absolute', top:100, left: 900 }}>
        <Autocomplete disableClearable={true} options = {orderby} style = {{width: 200,}} onChange = {orderChanged} defaultValue={'StartingPrice'} renderInput={(params) => <TextField {...params} label = "Sort by" variant = "outlined"/>}/>
        </label> 
        </div>

       <section className = 'card-container' style = {{marginTop: -350}}>
         {/*The Auctions function below has parameters categroy, searchValue range and order. The function is automatically executed
         every time one of these values change so there is no need to manually call it*/}
         <Auctions category = {category} searchValue = {val} range = {range} order = {order}/>
        </section>
        <div class = 'vl' style = {{marginLeft: 300,marginTop: -1400,height:1500}} />       

    </div>
    
    )
  }
