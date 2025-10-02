import React from 'react';
import { motion } from 'framer-motion';
import './Reviews.css';

// Sample review data
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const reviewVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Reviews = ({ theme }) => {
  return (
    <motion.div
      className={`rated ${theme || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="title">What Our Clients Say About Us</h2>
      <p className="subtitle">
        Hear from our satisfied riders who love the convenience and sustainability of InstaGO.
      </p>
      <div className="reviews">
        {reviewData.map((review) => (
          <motion.div
            className="review"
            key={review.id}
            variants={reviewVariants}
          >
            {review.rating && (
              <div className="rating">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
            )}
            <p className="review-text">{review.text}</p>
            <p className="client-name">- {review.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reviews;
