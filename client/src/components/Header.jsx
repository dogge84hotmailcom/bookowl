import {Link} from "react-router-dom"
import OwlLogo from "../assets/images/owl-svgrepo-com.svg?react"

export default function Header (){



    return (
        <Link to="/">  
        <div className="logo-container">
            <OwlLogo />
        <span>BookOwl</span>
        </div>     
        
        </Link>
        
    )
}