import { useState, useEffect } from "react";
import axios from "axios";
import "./BookBike.css";
import LocationPin from "/images/location-pin.png";

export default function BookRide() {
  const [userToken, setUserToken] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [havebooked, setHaveBooked] = useState(false);
  const [bookedData, setBookedData] = useState({});
  const [bookingTime, setBookingTime] = useState({});
  const [available, setAvailable] = useState(0);
  
  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setUserToken(localStorage.getItem("user"));
      if(localStorage.getItem("bikeBooking") != null) {
        window.location.href = "/booking";
      }
    }else{
        window.location.href = "/account/login";
    }
  }, []);
//   console.log(available)

  useEffect(() => {
    if (userToken.length > 0) {
      axios
        .get("http://localhost:8080/book/available", {
          headers: {
            Authorization: userToken,
          }
        })
        .then((res) => {
          res = res.data;
          console.log(res);
          if (res.haveBooked) {
            setHaveBooked(res?.bike?.bikeNumber);
            setBookedData({
                bikeNumber: res.bike.bikeNumber,
                bookedAt: res.bike.bookings.bookedAt.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
            })
          } else if (res.count > 0) {
            setAvailable(res.count);
          }
        })
        .catch((err) => {
            if(err.status == 498) {
                localStorage.removeItem("user");
                window.location.href = "/account/login"
            }
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userToken]);

  useEffect(() => {
    const dateIST = new Date(bookedData?.bookedAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}).split(", ");
    setBookingTime({
        date: dateIST[0],
        time: dateIST[1]
    });

  }, [bookedData]);

  const bookBike = () => {
    axios.post("http://localhost:8080/book/reserve", {},{
        headers: {
            Authorization: userToken,
          }
    }).then(res => {
        res = res.data;
        if(res.bikeReserved) {
            localStorage.setItem("bikeBooking", JSON.stringify(res));
            window.location.href = "/booking";
        }
        else{
            alert("Error reserving the bike");
        }
    }).catch(err => {
        if(err.status == 498) {
            localStorage.removeItem("user");
            window.location.href = "/account/login"
        }
        console.log(err);
    })
  }

  const EndBooking = () =>{
    axios.post("http://localhost:8080/book/endBooking", {},{
        headers: {
            Authorization: userToken
        }
    }).then(res => {
        console.log(res);
        if(res.data.ok) {
            window.location.reload();
        }else{
            alert("Can't proceed yet");
        }
    }).catch(err => {
        console.log(err);
        window.location.reload();
    })
  }

  if (isLoading) {
    return (
      <div className="book-ride-outer-cont">
        <div className="loader-cont">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-ride-outer-cont">
      <div className="book-ride-inner-cont">
        {havebooked ? (
          <div className="already-booked">
            <h2 className="welcome-text">Safe travels</h2>
            <p className="thumb-nail-line">Your ride is booked!
            </p>
            <div className="booking-details-cont">
                <p className="title-booking">Bike Number: </p>
                <p className="label-booking">{bookedData.bikeNumber}</p>
                <p className="title-booking">Booking Date: </p>
                <p className="label-booking">{bookingTime.date}</p>
                <p className="title-booking">Booking Time: </p>
                <p className="label-booking">{bookingTime.time}</p>
                <p className="title-booking">Amount: </p>
                <p className="label-booking">Rs. 400</p>
            </div>
            <div className="end-trip-cont">
                <p>After completing your trip, </p>
                <button onClick={EndBooking}>Return Bike</button>
            </div>
          </div>
        ) : 
        (
          <div className="available-outer-cont">
            <h2 className="welcome-text">Welcome</h2>
            <p className="thumb-nail-line">Ride InstaGO – Your Smart, Eco-Friendly Travel Companion! 
            </p>
            {/* <p className="thumbnail-small">Book in seconds, ride in style, and explore effortlessly!</p> */}
            {available > 0? 
            (<div className="available-inner-cont">
                <div className="available-count">Available Bikes: {available}</div>
                <button className="book-bike-button" onClick={bookBike}>Book Bike</button>
            </div>)
            :
            (<div className="available-inner-cont"></div>)
            }
          </div>
        )}
        <div className="img-cont">
          <img src={LocationPin} className="location-pin" />
        </div>
      </div>
    </div>
  );
}
