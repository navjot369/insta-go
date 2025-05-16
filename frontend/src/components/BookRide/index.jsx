import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Minus, Bike } from "lucide-react"; // Import Plus and Minus icons
import "./BookBike.css";
import LocationPin from "/images/location-pin.png"; // Assuming this is a relevant image

export default function BookRide() {
  const [userToken, setUserToken] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [hasBooked, setHasBooked] = useState(false); // Renamed for clarity
  const [bookedDetails, setBookedDetails] = useState({}); // Renamed for clarity
  const [bookingTimeInfo, setBookingTimeInfo] = useState({}); // Renamed for clarity
  const [availableBikesCount, setAvailableBikesCount] = useState(0); // Renamed for clarity
  const [helmetCount, setHelmetCount] = useState(0);
  // Let's assume the actual base price comes from the API. For UI, we can initialize or fetch.
  // For now, the `currentBasePrice` will be updated when bikeData.amount is available.
  const [currentBasePrice, setCurrentBasePrice] = useState(0); 

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setUserToken(token);
      if (localStorage.getItem("bikeBooking") != null) {
        // This implies user is on payment page, should redirect from here if they land on /book
        window.location.href = "/booking"; 
      }
    } else {
      window.location.href = "/account/login";
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/book/available`, {
          headers: { Authorization: userToken },
        })
        .then((res) => {
          const data = res.data;
          if (data.haveBooked && data.bike && data.bike.bookings) { // Ensure data.bike.bookings exists
            setHasBooked(true);
            setBookedDetails({
              bikeNumber: data.bike.bikeNumber,
              bookedAt: data.bike.bookings.bookedAt, // This is now from BookingModel via backend
              amount: data.bike.bookings.amount,   // This is now paidAmount from BookingModel via backend
              helmets: data.bike.bookings.helmets  // Helmets from BookingModel via backend
            });
            // For an active booking, currentBasePrice is not used for display of *this* ride's cost.
            // It's for calculating price for a *new* booking if the user ends this one.
            // So, we might still want to set a default base price for a potential next booking.
            // Or, if the user ends the ride, the /book/available call will be made again,
            // and then the 'else if (data.count > 0)' block will set currentBasePrice.
            // For clarity, let's not set currentBasePrice here for an active booking.
          } else if (data.count > 0) {
            setHasBooked(false);
            setAvailableBikesCount(data.count);
            // Potentially fetch a default/average base price here if not part of 'available' response
            // For now, let's assume a fixed base price if no active booking.
            // This should ideally come from backend config or bike type.
            setCurrentBasePrice(150); // Example default base price for a new booking
          } else {
            setHasBooked(false);
            setAvailableBikesCount(0);
            setCurrentBasePrice(150); // Still show a base price even if no bikes
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 498) { // Token expired
            localStorage.removeItem("user");
            window.location.href = "/account/login";
          }
          console.error("Error fetching available bikes:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userToken]);

  useEffect(() => {
    if (bookedDetails.bookedAt) {
      const date = new Date(bookedDetails.bookedAt);
      setBookingTimeInfo({
        date: date.toLocaleDateString(undefined, { timeZone: 'Asia/Kolkata' }),
        time: date.toLocaleTimeString(undefined, { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }),
      });
    }
  }, [bookedDetails.bookedAt]);

  const handleBookBike = () => {
    setLoading(true);
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/book/reserve`, {}, {
        headers: { Authorization: userToken },
    }).then(response => {
        const bikeData = response.data;
        if (bikeData.bikeReserved && bikeData.amount) {
            const bookingDetailsToStore = {
                ...bikeData, // Includes bikeData.amount as base price
                selectedHelmetCount: helmetCount,
                totalCalculatedPrice: bikeData.amount + (helmetCount * 50),
            };
            localStorage.setItem("bikeBooking", JSON.stringify(bookingDetailsToStore));
            window.location.href = "/booking"; // Navigate to payment page
        } else {
            alert("Error reserving the bike. Please try again.");
            console.error("Reservation response issue:", bikeData);
        }
    }).catch(err => {
        if (err.response && err.response.status === 498) {
            localStorage.removeItem("user");
            window.location.href = "/account/login";
        }
        console.error("Error reserving bike:", err);
        alert("Could not reserve bike. Please try again later.");
    }).finally(() => {
        setLoading(false);
    });
  };

  const handleEndBooking = () => {
    setLoading(true);
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/book/endBooking`, {}, {
        headers: { Authorization: userToken },
    }).then(res => {
        if (res.data.ok) {
            setHasBooked(false); // Update UI state
            setBookedDetails({});
            // Fetch available bikes again to update count and base price
             axios.get(`${import.meta.env.VITE_API_BASE_URL}/book/available`, {
                headers: { Authorization: userToken },
             }).then(availRes => {
                if (availRes.data.count > 0) {
                    setAvailableBikesCount(availRes.data.count);
                    setCurrentBasePrice(150); // Reset to default base price
                } else {
                    setAvailableBikesCount(0);
                    setCurrentBasePrice(150);
                }
             });
        } else {
            alert("Could not end booking. Please try again.");
        }
    }).catch(err => {
        console.error("Error ending booking:", err);
        alert("An error occurred while ending your trip.");
    }).finally(() => {
        setLoading(false);
    });
  };

  if (isLoading) {
    return (
      <div className="book-ride-page-loader"> {/* Centered loader */}
        <div className="loader"></div>
        <p>Loading your ride details...</p>
      </div>
    );
  }

  return (
    <div className="book-ride-page">
      <div className="booking-content-wrapper">
        <div className="booking-info-column">
          {hasBooked ? (
            <div className="booking-card active-booking-card">
              <h2 className="card-title">Your Active Ride</h2>
              <p className="card-subtitle">Enjoy your journey with InstaGO!</p>
              <div className="active-booking-details">
                <p><strong>Bike Number:</strong> {bookedDetails.bikeNumber}</p>
                <p><strong>Booked On:</strong> {bookingTimeInfo.date} at {bookingTimeInfo.time}</p>
                <p><strong>Ride Cost:</strong> Rs. {bookedDetails.amount}</p>
              </div>
              <button className="btn btn-primary btn-end-trip" onClick={handleEndBooking}>
                End Trip & Return Bike
              </button>
            </div>
          ) : (
            <div className="booking-card new-booking-card">
              <h2 className="card-title">Book Your InstaGO Ride</h2>
              <p className="card-subtitle">Quick, easy, and eco-friendly.</p>
              
              {availableBikesCount > 0 ? (
                <div className="new-booking-form">
                  <p className="available-bikes-text">
                    <span className="count">{availableBikesCount}</span> Bikes Available Now!
                  </p>
                  
                  <div className="helmet-selection-section">
                    <h3 className="section-title">
                      <Bike size={24} className="helmet-icon-img" /> Need Helmets? {/* Using Bike icon as placeholder for helmet */}
                    </h3>
                    <p className="section-subtitle">Add up to 2 helmets (Rs. 50 each).</p>
                    <div className="helmet-controls">
                      <button
                        className="helmet-button"
                        onClick={() => setHelmetCount(prev => Math.max(0, prev - 1))}
                        disabled={helmetCount === 0}
                        aria-label="Decrease helmet count"
                      ><Minus size={20} /></button> {/* Lucide Minus icon */}
                      <span className="helmet-count-value">{helmetCount}</span>
                      <button
                        className="helmet-button"
                        onClick={() => setHelmetCount(prev => Math.min(2, prev + 1))}
                        disabled={helmetCount === 2}
                        aria-label="Increase helmet count"
                      ><Plus size={20} /></button> {/* Lucide Plus icon */}
                    </div>
                  </div>

                  <div className="price-calculation-section">
                    <h3 className="section-title">Price Details</h3>
                    <div className="price-line">
                      <span>Base Ride Fare:</span>
                      <span>Rs. {currentBasePrice}</span>
                    </div>
                    {helmetCount > 0 && (
                      <div className="price-line">
                        <span>Helmets ({helmetCount}):</span>
                        <span>Rs. {helmetCount * 50}</span>
                      </div>
                    )}
                    <hr className="price-divider" />
                    <div className="price-line total">
                      <span>Total Estimated Price:</span>
                      <span>Rs. {currentBasePrice + (helmetCount * 50)}</span>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary btn-book-now" onClick={handleBookBike}>
                    Book Now & Proceed to Payment
                  </button>
                </div>
              ) : (
                <div className="no-bikes-message">
                  <p>Oh no! All bikes are currently in use.</p>
                  <p>Please check back shortly. We're working to make more rides available!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
