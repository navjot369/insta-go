import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

export default function AdminBookings() {
  const [bookingsData, setBookingsData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [adminToken] = useOutletContext();

  console.log(bookingsData);
  useEffect(() => {
    if (adminToken?.length > 0) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/admin/allBookings`, {
          headers: {
            Authorization: adminToken,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            setBookingsData(res.data);
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
  return <table className="admin-inner-cont">
    <tr className="admin-heading-row">
        <th>Bike Number</th>
        <th>Booked By</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Booked At</th>
        <th>Amount</th>
    </tr>
    {bookingsData.length > 0?
    bookingsData.map((ele, ind) => {
    const date = new Date(ele.bookedAt);
    return(<tr className="admin-data-row" key={ind}>
        <td>{ele.bike.bikeNumber}</td>
        <td>{ele.user.firstName + " " + ele.user.lastName}</td>
        <td>{ele.user.phone}</td>
        <td>{ele.user.email}</td>
        <td>{date.getDate() + "-" + (date.getMonth()+1) + "-" +date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()}</td>
        <td>{ele.paidAmount}</td>
    </tr>)}):
    <p>No user data found..!</p>}
  </table>;
}
