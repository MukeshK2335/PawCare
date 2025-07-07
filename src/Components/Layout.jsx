import React from "react";
import '../Style/Layout.css';
const Layout = ()=>{
    return (
        <div className="LayoutContainer">
            <h1 className="heading">PawCare</h1>
            <nav>
                <a href="">Dashboard</a>
                <a href="">Reports</a>
            </nav>
        </div>
    )
}
export default Layout