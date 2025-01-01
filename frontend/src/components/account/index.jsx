import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./account.css";

export default function Account() {
    return(<div className="outer-cont">
        <div className="main-cont">
            <div className="inner-cont">
                <Link  to="/" className="heading">Insta<span>GO</span></Link>
                <Outlet />
            </div>
        </div>
    </div>);
}