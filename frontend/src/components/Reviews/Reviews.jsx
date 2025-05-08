import React from 'react';
import './Reviews.css';

// Sample review data - in a real app, this would likely come from a backend or state management
const reviewData = [
  {
    id: 1,
    text: "InstaGO has completely changed how I get around campus! The e-bikes are always available, affordable, and so much fun to ride. Highly recommend!",
    name: "Priya S.",
    rating: 5,
  },
  {
    id: 2,
    text: "Booking a ride is super easy with their app, and I love that it's an eco-friendly option. The customer support was also very helpful when I had a question.",
    name: "Rahul M.",
    rating: 5,
  },
  {
    id: 3,
    text: "Finally, a convenient way to zip between classes without breaking a sweat. The bikes are well-maintained, and I feel safe riding them. Great service!",
    name: "Aisha K.",
    rating: 4,
  },
];

const Reviews = ({ theme }) => {
  return (
    <div className={`rated ${theme || ''}`}>
      <h2 className="title">What Our Clients Say About Us</h2>
      <p className="subtitle">
        Hear from our satisfied riders who love the convenience and sustainability of InstaGO.
      </p>
      <div className="reviews">
        {reviewData.map((review) => (
          <div className="review" key={review.id}>
            {/* Optional: Add a rating display if you have one, e.g., stars */}
            {review.rating && (
              <div className="rating">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
            )}
            <p className="review-text">{review.text}</p>
            <p className="client-name">- {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
