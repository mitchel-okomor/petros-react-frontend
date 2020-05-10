import React from 'react';
import {Link} from "react-router-dom";
import './header.css';
import logout from './helpers/Logout';


const Header = (props)=>{
    return(
<header>
    <div className="header-bar" >
        <div className = "logo">Admin Panel</div>
<ul>
<li>
    <Link to="/" >{props.user}</Link>
    </li>
    <li>
<Link to="/" onClick={() => { logout() }}>Logout</Link>
    </li>
</ul>
    </div>

</header>
    )
}

export default Header;