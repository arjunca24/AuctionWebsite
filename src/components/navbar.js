import React, {useEffect, useState} from "react"
import '../styles/navstyles.css'
import Cookies from "js-cookie"
import { useNavigate , useLocation} from "react-router-dom"


export default function NavBar () {

    const navigate = useNavigate()
    const location = useLocation() //Used to get URL of the webpage
    const [status,changeStatus] = useState("") //Status of logout button, either empty or 'Log out'
 
    //The Navigation bar will re-render everytime a new webpage is opened
    //The following function will ensure that all logged out users will be redirected to the login/registration page 
    //in case they try to access another page without signing in.
    useEffect(() => {
        if (location.pathname == '/login' || location.pathname == '/register'){
           
        }
        else if (Cookies.get('user') == undefined){
            navigate("/login")
            changeStatus("")
          }
        else {
            changeStatus(`Log Out`)
        }
      }); // Add ,[] if there are performance issues
    
    function logout(){
        Cookies.remove('user')
        changeStatus("")
        navigate("/login")


    }
    return (
        <div>
        <nav class="navbar background">
            <ul class="nav-list">
                <div class="logo">
                    <img src= ""                    />
                </div>
                {/* The following components are the tabs in the navigation bar along with their link*/}
                <li>
                    <a href="/auctions">Auctions</a> 
                </li>
                <li>
                    <a href="/bids">Bids</a>
                </li>
                <li>
                    <a href="/sales">Sales</a>
                </li>
                <li>
                    <a href="/create">Create</a>
                </li>
            </ul>
            <button onClick = {logout} class="btn-sm">
             {status}                  
            </button>
        </nav>    
    </div>
    ) 
}