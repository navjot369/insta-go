import {useState, useEffect} from "react"
import "./admin.css";
import {Outlet, NavLink} from "react-router-dom"

export default function AdminHome() {
    const [adminToken, setAdminToken] = useState("");

    useEffect(() => {
        if(localStorage.getItem("adminToken") == null) {
            window.location.href = "/admin/login";
        }else{
            setAdminToken(localStorage.getItem("adminToken"));
            // window.location.href = "/admin/users";
        }
    }, []);
    return(<div className="admin-body-cont">
        <div className="admin-navbar">
            <h1>InstaGO</h1>
            <h1 className="admin-panel-heading">Admin Panel</h1>
            <a href="/">Home</a>
        </div>
        <div className="navlink-admin-cont">
            <NavLink to="/admin/users" className="navlink-admin" style={({isActive}) => ({
                color: isActive? "rgb(47, 113, 13)" : "rgb(145, 147, 141)",
                borderBottom: isActive? "4px solid rgb(47, 113, 13)" : ""
            })}>Users</NavLink>
            <NavLink to="/admin/bikes" className="navlink-admin" style={({isActive}) => ({
                color: isActive? "rgb(47, 113, 13)" : "rgb(145, 147, 141)",
                borderBottom: isActive? "4px solid rgb(47, 113, 13)" : ""
            })}>Bikes</NavLink>
            <NavLink to="/admin/bookings" className="navlink-admin" style={({isActive}) => ({
                color: isActive? "rgb(47, 113, 13)" : "rgb(145, 147, 141)",
                borderBottom: isActive? "4px solid rgb(47, 113, 13)" : ""
            })}>Bookings</NavLink>
            <NavLink to="/admin/history" className="navlink-admin" style={({isActive}) => ({
                color: isActive? "rgb(47, 113, 13)" : "rgb(145, 147, 141)",
                borderBottom: isActive? "4px solid rgb(47, 113, 13)" : ""
            })}>History</NavLink>
        </div>
        <div className="admin-outlet-cont">
            <Outlet context={[adminToken]} />
        </div>
    </div>);
}