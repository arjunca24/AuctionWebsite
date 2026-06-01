import { useState, useEffect,Fragment} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import moment from 'moment/moment';
import dayjs,{Dayjs} from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import '../App.css'
import {formatTextIntoLines,SQLDatetoJsDate} from "../components/functions"

//Each individual Auction is created in this component
const AuctionItem = (data) => {
    const Auction = data.Auction
    const navigate = useNavigate()
    function goToAuction(){
        navigate(`/auction/${Auction.AuctionID}`)//Navigate to the specific auction on click
    }
 
    const [highestBid,setHighestBid] = useState(0)
    const [highestBidder, setHighestBidder] = useState("n/a")
    const [endDate,setEndDate] = useState(SQLDatetoJsDate(Auction.EndDate))
    
    //Fetch the highest bid details which is in the bids table 
    //(not the auctions table) so needs to be fetched separately
    useEffect(
        () => {async function fetchBids(values,table,conditions){
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
       if (Data.record[0] != undefined) {
       //console.log(Data.record[0].Amount)
       setHighestBid(Data.record[0].Amount)
       setHighestBidder(Data.record[0].Email)
        }
      else {
        setHighestBid(0)
        setHighestBidder('n/a')
      }
      
         } fetchBids("TOP 1 *","Bids",`AuctionID = ${Auction.AuctionID} ORDER BY Amount DESC`)},)
        
   //Break the description into multiple lines do it doesn't enlarge the container
   let description = Auction.ItemDescription
   if (description.length > 85){
          description = [<br/>,formatTextIntoLines(description,85)].flat(3)
          description = description.slice(0,6) //Only display the first 4 lines of
                                               //the description
         }

    function dateChanged(date){
      async function changeEndDate(table,values,conditions){
        const Data = await fetch('/update', {
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
            setEndDate(date)
            console.log(data)
          }
          )}
      changeEndDate('Auction',`EndDate = '${moment(date.$d).format('YYYY-MM-DD HH:mm:ss')}'`,`AuctionID = ${Auction.AuctionID}`)
      console.log(date.$d)
      

       
    }
    return (
       <div style = {{minHeight: 150}}> 
        <div style = {{width: 270, marginLeft: 750,marginTop: 35,position:'absolute'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker value = {dayjs(endDate)} onChange={(newDate) => dateChanged(newDate)} disablePast views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                 label="End Date" />
             </DemoContainer>
          </LocalizationProvider>
        </div>
        <ListItem style = {{marginTop: 0}} onClick = {goToAuction} alignItems="flex-start">
        <ListItemAvatar> 
          <Avatar alt={Auction.ItemName} src={Auction.ImageURL}/>
        </ListItemAvatar>
        <ListItemText
          primary={Auction.ItemName}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Top Bid: £{highestBid} Bidder: {highestBidder}
              </Typography>
               {" "}{description}...
            </Fragment>
          }
        />
      </ListItem>

      <Divider style = {{position: 'relative', minHeight: 50}} variant="inset" component="li" />
      </div> 
    )
}

//Auction list contains the code for the list of auctions to be displayed
//using the above AuctionItem component to generate it.
const AuctionList = () => {
        const SellerID = Cookies.get('user')
        const [Auctions,setAuctions] = useState([])
        //Fetch the list of auctions to display
        useEffect(
            () => {async function fetchAuctions(values,table,conditions){
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
           setAuctions(Data.record)
             } fetchAuctions("*","Auction",`Email = '${SellerID}'`)},)
        let list = []
        for (let i = 0;i<Auctions.length;i++){
        list.push(<AuctionItem Auction = {Auctions[i]} />)
        }
            
        return list
        
}

//This is the code for the webpage which uses the above 2 functions to get the auctions
export default function Sales(){
    
    return (

     <div className={"mainContainer"}>

     <List sx={{ width: '100%', maxWidth: 960, bgcolor: '', marginTop: 120, position: 'top'  }}>
     <AuctionList/>   
     </List>
     </div>
      )
}


