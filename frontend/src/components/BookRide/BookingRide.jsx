import { useState, useEffect } from "react";
import QRImage from "/images/qrImage.jpg";
import axios from "axios";

export default function BookingRide() {
  const [userToken, setUserToken] = useState("");
  const [bookingData, setBookingData] = useState({});
  const [timeLeft, setTimeLeft] = useState({ min: 5, sec: 0 });
  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setUserToken(localStorage.getItem("user"));
      if (localStorage.getItem("bikeBooking") == null) {
        window.location.href = "/book";
      } else {
        setBookingData(JSON.parse(localStorage.getItem("bikeBooking")));
      }
    } else {
      window.location.href = "/account/login";
    }

    setInterval(() => {
      if (timeLeft.sec == 0) {
        setTimeLeft({ min: timeLeft.min - 1, sec: 59 });
      } else {
        setTimeLeft({ min: timeLeft.min, sec: timeLeft.sec - 1 });
      }
    }, 1000);
  }, []);

  const handleDone = () => {
    localStorage.removeItem("bikeBooking");
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/book/confirmBook`, {
        amount: bookingData.amount
    },{
        headers: {
            Authorization: userToken
        }
    }).then(res => {
        if(res.data.done) {
            window.location.href="/book";
        }else{
            console.log(res);
            alert("Error in booking bike");
            window.location.href="/";
        }
    }).catch(err => {
        console.log(err);
        alert("Error in booking bike");
        window.location.href="/";
    })
  };

  return (
    <div className="bike-booking-outer-cont">
      <div className="bike-booking-inner-cont">
        <h1 className="payment-heading">
          Payment
          <Timer></Timer>
          <p>Time Left</p>
        </h1>
        <div className="payment-details-cont">
          <div className="payment-detail">
            <p className="title-payment">Payer&apos;s Name : </p>
            <p className="label-paymenet">{bookingData.username}</p>
            <p className="title-payment">Payer&apos;s Phone number : </p>
            <p className="label-paymenet">{bookingData.phone}</p>
            <p className="title-payment">Payer&apos;s E-mail : </p>
            <p className="label-paymenet">{bookingData.email}</p>
            <p className="title-payment">Amount : </p>
            <p className="label-paymenet">Rs. {bookingData.amount}</p>
            <p className="title-payment">Bike Number : </p>
            <p className="label-paymenet">{bookingData.bikeNumber}</p>
          </div>
          <div className="qr-image-cont">
            <img src={QRImage} />
          </div>
          <div className="button-cont-payment">
            <button
              className="cancel-button"
              onClick={() => {
                localStorage.removeItem("bikeBooking");
                window.location.href = "/";
              }}
            >
              Cancel
            </button>
            <button className="done-payment-button" onClick={handleDone}>
              Payment Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Timer = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          alert("Payment Time Out");
          localStorage.removeItem("bikeBooking");
          window.location.href = "/";
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <h1 className="time-header">
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};
