import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

export default function AdminBikes() {
  const [bikesData, setBikesData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({show: false});
  const [adminToken] = useOutletContext();


  useEffect(() => {
    if (adminToken?.length > 0) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/admin/allBikes`, {
          headers: {
            Authorization: adminToken,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            setBikesData(res.data);
            setLoading(false);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          if (err.status == 498) {
            localStorage.removeItem("adminToken");
            alert("Admin Login Time out");
            window.location.href = "/admin/login";
          }
          console.log(err);
        });
    }
  }, [adminToken]);

  if (isLoading) {
    return (
      <div className="admin-loader-cont">
        <div className="loader"></div>
      </div>
    );
  }
  console.log(bikesData);
  return <table className="admin-inner-cont">
    <tr className="admin-heading-row">
        <th>Bike Number</th>
        <th>Model Year</th>
        <th>Condition</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>
    {bikesData.length > 0?
    bikesData.map((ele, ind) => {
    let status = ele.bookings.status;
    return(<tr className="admin-data-row" key={ind}>
        <td>{ele.bikeNumber}</td>
        <td>{ele.modelYear}</td>
        <td>{ele.bikeCondition}</td>
        <td className={status == "Available"? "green-status" : "red-status"}>{status}</td>
        {status == "Available"? <td></td>:
        <td><button className="user-details-button" onClick={() => {setUserDetails({show: true, bikeNumber: ele.bikeNumber, user: ele.bookings.user})}}>User Details</button></td>}
    </tr>)}):
    <p>No bikes data found..!</p>}
    {userDetails.show && <div className="booked-by-details" onClick={() => setUserDetails({show: false})}>
        <div className="booked-by-inner">
           <p className="title-booking">Bike Number: </p>
                <p className="label-booking">{userDetails.bikeNumber}</p>
                <h4 className="booked-by-userDetails">booked by</h4><h4></h4>
                <p className="title-booking">Name: </p>
                <p className="label-booking">{userDetails.user.firstName + " " + userDetails.user.lastName}</p>
                <p className="title-booking">Phone Number: </p>
                <p className="label-booking">{userDetails.user.phone}</p>
                <p className="title-booking">Email: </p>
                <p className="label-booking">{userDetails.user.email}</p>
                <p className="title-booking">Amount: </p>
                <p className="label-booking">Rs. 400</p>
        </div>
        </div>}
        {/* <tr className="free-all-button" >
            <td rowSpan="5" >
            <button>Mark all available</button>
            </td>
        </tr> */}
  </table>;
}
