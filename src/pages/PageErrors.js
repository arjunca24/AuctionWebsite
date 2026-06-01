import { useNavigate } from 'react-router-dom';
import '../App.css'

export function PageNotFound(){

    return (
        <div style = {{color: 'red'}} className={"titleContainer"}>
            <div>404 Page not found</div>
        </div>
        )  
}

export function AuctionNotFound(){
    return (
        <div style = {{color: 'red'}} className={"titleContainer"}>
            <div>This auction does not exist</div>
        </div>
        )  
}

//This file can be updated in the future to include
//more navigations and other site errors as they 
//occur.