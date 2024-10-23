import React from "react";
import { Link } from "react-router-dom";

const FooterNav = () => {
    return (
        <footer className="footer-nav">

        <nav>
            <ul>
            <li><Link to="/student/add">Add</Link></li>
            <li><Link to="/student/update">Update</Link></li>
            <li><Link to="/student/delete">Delete</Link></li>
            <li><Link to="/student/all">List All</Link></li>
            </ul>
        </nav>
    </footer>
    )
}


export default FooterNav;