import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/card.css'
import  ReactDOM  from "react-dom";
import Countdown from "react-countdown";
//import {Select} from "../server"
import { SQLDatetoJsDate, formatTextIntoLines } from "./functions";

//This function generates the code used to display each auction
//in the auctions page given the AuctionID
export const Card = ({item}) => {
    const navigate = useNavigate()    
  
    const img = item.ImageURL
    let title = item.ItemName
    let description = item.ItemDescription
    const category = item.Category
    const price = item.StartingPrice
    const date = SQLDatetoJsDate(item.EndDate).getTime() - Date.now() //Time left until the Auction closes
                                                                      //Displayed as a countdown

    

   function handleClick(e){
        navigate(`/auction/${item.AuctionID}`,{state: {item: item}})     
        //Navigate to the relevant auction item page on click
   }

   //The title and description may be many lines long so will need
   //to be formatted into lines so they don't increase the width of 
   // the container.
   if (title.length > 20){
    title = formatTextIntoLines(title,20)
   }
   
   if (description.length > 37){
    //Description requires some additional formatting as the 5 stars mean that the length of the first line has to be less than the length
    //of all the other lines.
    description = [description.substring(0,27),<br/>,formatTextIntoLines(description.substring(27,description.length),37)].flat(3)
    description = description.slice(0,7)
   }

   //Only returns auctions that are open (the time remaining is greater than 0)
   if (date < 0){ 
    return (
      <>
        <section className="card" onClick={handleClick} id = {item[0]}>

          <img src={img} alt={title} className="card-img" />
          <div className="card-details">
          <h3 className="card-title" >{title}</h3>
            <section style = {{fontSize: 12}} className="card-reviews">
            ★★★★★ {description}...
            </section>
            <section className="card-price">
              <div className="price">       
              <h1 style = {{marginLeft: 0,fontSize: 30, fontWeight: 400}}> £{price}</h1>
              <h1 style = {{marginLeft: 55,marginTop: 20, fontSize: 20, fontWeight: 500}}> 
              <Countdown date={Date.now() + date} /> </h1>  
                  
              </div>
              <div className="bag">
               
              </div>
            </section>
          </div>
        </section>
      </>
    );}
  };


const Auctions =  (getAuctions) => {
  const [data,setData] = useState([])
  const category = getAuctions.category
  const searchValue = getAuctions.searchValue.toLowerCase()
  const min = getAuctions.range[0]
  const max = getAuctions.range[1]
  let order = getAuctions.order
  if (order == null){
    order = 'StartingPrice' //default orderby choice
  }
  
  useEffect(
    () => {async function fetchData(values,table,conditions){
    const Data = await fetch('/api', {
       method:'POST',
       mode: 'cors',
       headers:{
       'Content-Type': 'application/json',
       'Accept': 'application/json'
       },  
      body: JSON.stringify({values: values,
                            table: table,
                            conditions: conditions})
       }).then(res => res.json())
   setData(Data.record)
     //Fetch the data using the given conditions
     } fetchData("*","Auction",`StartingPrice >= ${min} AND StartingPrice <= ${max} ORDER BY ${order}`)},
     [JSON.stringify(getAuctions.range),order])//The range and order will trigger this function to run again if their value changes
                                               //category and search by doesn't trigger the useEffect but they don't need to as they
                                               //are handled by the client below.

  let items = []
  const n = data.length
    for (let i =0; i<n; i++){ 
        let item = data[i]
        let name = item.ItemName.toLowerCase()
        let price = item.startingPrice
        //console.log(item[1].includes(searchValue))
        if (category == '' || category == 'All' || category == item.Category) {
         if (name.includes(searchValue)){ 
         items.push(<Card item = {item} />) //Items is a list of elements containing the code to display 
                                            // each auction. Card is a custom function and can be found at 
                                            //the top of this file.
         }
        }
    }   
    return items
}


export default Auctions 
//The Card function is only called in this file so doesn't need
//to be exported so Auctions can be exported as the default function. 
 
  