import { Outlet } from "react-router-dom";
import "./../../styles/account.css";

export default function Account() {
    return(<div className="outer-cont">
        <div className="main-cont">
            <div className="inner-cont">
                <h1 className="heading">Insta<span>GO</span></h1>
                <Outlet />
            </div>
        </div>
    </div>);
}