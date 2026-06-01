import React, {useState, useEffect} from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Line} from 'react-chartjs-2'
import Cookies from "js-cookie";

import { SQLDatetoJsDate } from "../components/functions";
import '../styles/card.css'
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

//Generate an containing all integers from 1 to n
//for the bidding history graph's x-axis
function buildArray(n){
    let nums = []
    for (let i=1;i<n+1;i++){
        nums.push(i)
    }
    return nums
}




export default function Auction (){
    const navigate = useNavigate()
    const UserID = Cookies.get('user')
    const location = useLocation()
    const AuctionID = useParams().id
    //const item = location.state.item
    
    const [pastBids, setPastBids] = useState([0])
    const [item,setItem] = useState("")
    const [bidStatus,setBidStatus] = useState("")
    const [bidPlaceHolder,setBidPlaceHolder] = useState("Enter your Bid")
    const [bid,setBid] = useState(0)
    const [bidColour,setBidColour] = useState('#ff3333')

    const [endDate,setEndDate] = useState("")
    
    //The data displayed on the graph
    const data = { 
        labels: buildArray(pastBids.length) ,
        datasets: [{
          label: "Bidding History",
          backgroundColor: "rgb(25, 99, 132)",
          borderColor: "rgb(25, 99, 132)",
          data: pastBids,},],
        }

    //Fetch the auction details
    useEffect(() => {async function fetchData(values,table,conditions){
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
           }).then(res => res.json()).then(data => {
                                      if (data.record.length === 0 ){
                                        navigate("/notfound")
                                      }
                                      else{
                                      setItem(data.record[0])
                                      setEndDate(SQLDatetoJsDate(data.record[0].EndDate))
                                      }
                                                           })
       //console.log(Data.record[0])

         } fetchData("*","Auction",`AuctionID = ${AuctionID}`)}
        ,
         [])
         //Fetch all bids made in the auction the first time 
         //the component is rendered
         useEffect(
            () => {      
                async function getBids(){   
                    const Data = await fetch('/api', {
                       method:'POST',
                       mode: 'cors',
                       headers:{
                       'Content-Type': 'application/json',
                       'Accept': 'application/json'
                       },  
                      body: JSON.stringify({values: "Amount",
                                            table: "Bids",
                                            conditions: `AuctionID = ${AuctionID}`})
                       }).then(res => res.json()).then(data => {
                   function toArray (record) {
                    let PASTBIDS = [0]
                    for (let i=0; i<record.length;i++) {
                       PASTBIDS.push(record[i].Amount)
                    } 
                    setPastBids(PASTBIDS)
                   
                     }
                  toArray(data.record) })
                }
                getBids()
            
            },[])
    //Fetch the bids placed in the auction at intervals of 2 seconds
    //This function doesn't render until after 2 seconds initially so
    //must be created and called once above for the initial render
    useEffect(
            () => {      
                async function getBids(){   
                    const Data = await fetch('/api', {
                       method:'POST',
                       mode: 'cors',
                       headers:{
                       'Content-Type': 'application/json',
                       'Accept': 'application/json'
                       },  
                      body: JSON.stringify({values: "Amount",
                                            table: "Bids",
                                            conditions: `AuctionID = ${AuctionID}`})
                       }).then(res => res.json()).then(data => {
                   function toArray (record) {
                    let PASTBIDS = [0]
                    for (let i=0; i<record.length;i++) {
                       PASTBIDS.push(record[i].Amount)
                    } 
                    setPastBids(PASTBIDS)                   
                     }
                  toArray(data.record) })
                }
            
            const interval = setInterval(getBids,2000)//Fetch the bids every 2000ms
            return () => clearInterval(interval)},
             []
             )

    function handleChange(e){
        
        let b = parseFloat(e)
        setBid(b)
        //The bid must be at most £100 less than the estimated value of the item           
        if (b>(item.EstimatedValue-100)){
           setBidColour('#5dbea3')
           }
        else{
          setBidColour('#ff3333')
        }

    }

    //Used for automatic bidding checkbox although
    //this feature hasn't been implemented yet
    function check (e){
        console.log(e.target.checked)
        if (e.target.checked == true){
            setBidPlaceHolder("Enter your Maximum Bid")
        }
        else{
            setBidPlaceHolder("Enter your Bid")
        }
    }
    function placeBid(){
       
       if (bidColour == '#5dbea3' && item.Email != UserID){//Check if bid button colour is green indicating
                                                           //the validation has been passed.
                                                           //Prevent seller from bidding in their own auction   
          async function Bid(values){
            const Data = await fetch('/bid', {
               method:'POST',
               mode: 'cors',
               headers:{
               'Content-Type': 'application/json',
               'Accept': 'application/json'
               },  
              body: JSON.stringify({values: values})
               }).then(res => res.json())   
           setBidStatus("Success")
             }
           Bid(`'${UserID}','${AuctionID}',${bid},GETDATE()`)//GETDATE() is an SQL function that will get the 
                                                             //current date and time to enter as the bid date
        }                   
       
       }   
       


    return (
        <div>
        <div style = {{marginTop: 50, marginLeft: 850}}>
        <h1 style = {{fontSize: 30, fontWeight: 400}}>{item.ItemName}</h1>
        <br/>
        <h1 style = {{fontSize: 15, fontWeight: 400}}> {item.ItemDescription} </h1>
        <br/>
        <h1 style = {{fontSize: 15, fontWeight: 300}}>Estimated £{item.EstimatedValue}       {endDate.toString().substring(3,33 )}</h1> 
        </div>
         
        <section className="card2" style = {{marginTop: -160,marginLeft: 200,width: 530, height: 550}}>

            <img src= {item.ImageURL} alt={item.ItemName} className="card-img2" />
        </section>
        <section className="card3" style = {{marginTop: -400,marginLeft: 850,width: 500, height: 280, backgroundColor:'#fffbe5'}}>
        <h1 style = {{fontSize: 15, fontWeight: 300, marginLeft: 30}}>Top bid ({pastBids.length} bids): </h1>
        <br/>
        <h1 style = {{marginTop: -20,fontSize: 40, fontWeight: 400, marginInlineStart: 30}}>£{Math.max(... pastBids)}</h1>  
        <div className={"inputContainer"}>
        <input
            type = 'number'
            placeholder={bidPlaceHolder}
            className={"inputBox"} 
            onChange={(e) => handleChange(e.target.value)}
            style = {{borderColor: {bidColour}, marginLeft:30, width: 250}}
            />     
        </div>
        <FormGroup>
       <FormControlLabel style = {{marginLeft: 20}} control={<Checkbox onChange = {check}  />} label="Enable Automatic Bidding" />
       </FormGroup>

        <button style = {{marginTop: 20,marginLeft: 30,width:400, height: 40, borderColor: '#00000000', backgroundColor: bidColour,fontSize: 15, color: "white", fontWeight: 100, cursor: 'pointer'}} onClick = {placeBid}> Place Bid </button>
        </section>
        <div style ={{marginTop: 0,marginLeft:825,width: 529,height: 300}}>
        <Line data = {data}/>
        </div>
        <br/>
        
        </div>
    )   
}      