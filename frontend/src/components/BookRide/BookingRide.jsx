import { useState, useEffect } from "react";
import QRImage from "/images/qrImage.jpg";
import axios from "axios";
import { User, Phone, Mail, Bike as BikeIcon, ShieldCheck, IndianRupee, CheckCircle2, XCircle } from "lucide-react"; // Added icons

export default function BookingRide() {
  const [userToken, setUserToken] = useState("");
  const [bookingData, setBookingData] = useState({
    username: "",
    phone: "",
    email: "",
    amount: 0, // This will store totalCalculatedPrice from localStorage
    bikeNumber: "",
    selectedHelmetCount: 0, // To store selected helmets from localStorage
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'error'

  useEffect(() => {
    const user = localStorage.getItem("user");
    const bikeBookingDetailsString = localStorage.getItem("bikeBooking");

    if (user) {
      setUserToken(user);
      if (!bikeBookingDetailsString) {
        console.error("No bike booking details found in localStorage. Redirecting to /book.");
        window.location.href = "/book"; // Redirect if no booking details
      } else {
        try {
          const parsedBookingData = JSON.parse(bikeBookingDetailsString);
          setBookingData({
            username: parsedBookingData.username || "",
            phone: parsedBookingData.phone || "",
            email: parsedBookingData.email || "",
            // Use totalCalculatedPrice if available, otherwise fallback to amount
            amount: parsedBookingData.totalCalculatedPrice !== undefined ? parsedBookingData.totalCalculatedPrice : (parsedBookingData.amount || 0),
            bikeNumber: parsedBookingData.bikeNumber || "",
            selectedHelmetCount: parsedBookingData.selectedHelmetCount || 0,
          });
        } catch (error) {
          console.error("Error parsing bike booking details from localStorage:", error);
          // Handle corrupted data, e.g., by redirecting or clearing
          localStorage.removeItem("bikeBooking");
          window.location.href = "/book";
        }
      }
    } else {
      window.location.href = "/account/login";
    }
  }, []);

  const handleDone = () => {
    setIsProcessingPayment(true);
    setPaymentStatus(null); 
    // localStorage.removeItem("bikeBooking"); 
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/book/confirmBook`, {
        amount: bookingData.amount, 
        helmets: bookingData.selectedHelmetCount 
    },{
        headers: {
            Authorization: userToken
        }
    }).then(res => {
        if(res.data.done) {
            setPaymentStatus('success');
            localStorage.removeItem("bikeBooking"); 
            setTimeout(() => {
                window.location.href="/book";
            }, 1500); // Delay redirect for success animation
        }else{
            setPaymentStatus('error');
            console.log("Error response from /book/confirmBook:", res);
            // alert("Error in booking bike. Please try again."); 
        }
    }).catch(err => {
        setPaymentStatus('error');
        console.error("Error during /book/confirmBook:", err);
        // alert("An error occurred while confirming your booking. Please try again.");
    }).finally(() => {
        // Keep spinner for a bit if success/error, then remove
        if (paymentStatus !== 'success') { // only set to false if not success, success handles its own timeout
             setTimeout(() => setIsProcessingPayment(false), 500); // Keep spinner a bit for error too
        }
    });
  };

  const renderPaymentButtonContent = () => {
    if (isProcessingPayment && !paymentStatus) {
      return ''; // Spinner will be shown via CSS
    }
    if (paymentStatus === 'success') {
      return <CheckCircle2 size={24} />;
    }
    if (paymentStatus === 'error') {
      return <XCircle size={24} />;
    }
    return 'Payment Done';
  };

  return (
    <div className="bike-booking-outer-cont payment-page-animation">
      <div className="bike-booking-inner-cont payment-card-animation">
        <div className="payment-header-section"> {/* New wrapper for header */}
          <h1 className="payment-heading">
            Secure Payment
          </h1>
          <div className="timer-container">
             <Timer />
             <p className="timer-label">Time Left</p>
          </div>
        </div>

        <div className="payment-details-grid"> {/* Changed class for clarity */}
          <div className="payment-info-section"> {/* Left side: details */}
            <h2 className="section-title-payment">Booking Summary</h2>
            <div className="payment-detail-item">
              <User size={18} className="detail-icon" />
              <span className="title-payment">Payer's Name : </span>
              <span className="label-paymenet">{bookingData.username}</span>
            </div>
            <div className="payment-detail-item">
              <Phone size={18} className="detail-icon" />
              <span className="title-payment">Phone number : </span>
              <span className="label-paymenet">{bookingData.phone}</span>
            </div>
            <div className="payment-detail-item">
              <Mail size={18} className="detail-icon" />
              <span className="title-payment">E-mail : </span>
              <span className="label-paymenet">{bookingData.email}</span>
            </div>
            <div className="payment-detail-item">
              <BikeIcon size={18} className="detail-icon" />
              <span className="title-payment">Bike Number : </span>
              <span className="label-paymenet">{bookingData.bikeNumber}</span>
            </div>
            <div className="payment-detail-item">
              <ShieldCheck size={18} className="detail-icon" />
              <span className="title-payment">Selected Helmets : </span>
              <span className="label-paymenet">{bookingData.selectedHelmetCount}</span>
            </div>
            <div className="payment-detail-item total-amount-item">
              <IndianRupee size={20} className="detail-icon" />
              <span className="title-payment total">Total Amount : </span>
              <span className="label-paymenet total">Rs. {bookingData.amount}</span>
            </div>
          </div>

          <div className="qr-payment-section"> {/* Right side: QR */}
            <h2 className="section-title-payment">Scan to Pay</h2>
            <div className="qr-image-wrapper">
              <img src={QRImage} alt="QR Code for Payment" className="qr-code-image" />
              <div className="qr-scan-pulse"></div>
            </div>
            <p className="qr-instructions">Use any UPI app to scan and complete your payment.</p>
          </div>
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
          <button
            className={`done-payment-button 
                        ${isProcessingPayment && !paymentStatus ? 'done-payment-button--processing' : ''}
                        ${paymentStatus === 'success' ? 'done-payment-button--success' : ''}
                        ${paymentStatus === 'error' ? 'done-payment-button--error' : ''}`}
            onClick={handleDone}
          >
            {renderPaymentButtonContent()}
          </button>
        </div>
      </div>
    </div>
  );
}

const Timer = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          // Avoid alert if component might unmount due to redirection
          if (localStorage.getItem("bikeBooking")) { // Check if booking still active
             alert("Payment Time Out");
             localStorage.removeItem("bikeBooking");
             window.location.href = "/";
          }
        } else {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds]); // Add minutes and seconds to dependency array

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <h1 className="time-header">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};
