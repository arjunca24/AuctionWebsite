import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";

import NavBar from "./components/navbar";
import Login_Page from './pages/login';
import Auctions_Page  from "./pages/auctions";
import './styles/navstyles.css'
import Auction from "./pages/auction";
import Sales from "./pages/sales";
import CreateAuction from "./pages/createAuction";
import Register from "./pages/register";
import {PageNotFound,AuctionNotFound} from "./pages/PageErrors";

function App() {
  
  return (
   <Router>
   <NavBar/>
    <Routes>
        {/*All the navigation routes and the components they display which have
         been imported at the top of the page*/}
        <Route exact path="/" element={<Navigate to = '/login'/>} />
        <Route path="/login" element={<Login_Page/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/auctions" element={<Auctions_Page/>} />
        <Route path="/auction/:id" element={<Auction/>} />
        <Route path="/sales" element={<Sales/>} />
        <Route path="/create" element={<CreateAuction/>} />
        <Route path="/notfound" element={<AuctionNotFound/>} />
        <Route path="*" element={<PageNotFound/>} />



        

    </Routes>
   </Router>
  )
  }


export default App;
