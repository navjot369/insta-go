import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

export default function AdminUsers() {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [adminToken] = useOutletContext();

  console.log(usersData);
  useEffect(() => {
    if (adminToken?.length > 0) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/admin/allUsers`, {
          headers: {
            Authorization: adminToken,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            setUsersData(res.data);
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
        <th>Name</th>
        <th>Date of Birth</th>
        <th>Phone Number</th>
        <th>E-mail</th>
        <th>Address</th>
    </tr>
    {usersData.length > 0?
    usersData.map((ele, ind) => {
    const date = new Date(ele.dob);
    return(<tr className="admin-data-row" key={ind}>
        <td>{ele.firstName + " " + ele.lastName}</td>
        <td>{date.getDate() + "-" + (date.getMonth()+1) + "-" +date.getFullYear()}</td>
        <td>{ele.phone}</td>
        <td>{ele.email}</td>
        <td>{ele.address}</td>
    </tr>)}):
    <p>No user data found..!</p>}
  </table>;
}
