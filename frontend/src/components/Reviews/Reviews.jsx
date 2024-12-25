import React from 'react'
import './Reviews.css'
const Reviews = () => {
  return (
        <div>
        <div className="rated">
                <h2 className="title">What Our Clients Say About Us</h2>
                <p className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis iure consectetur tempora amet.</p>
                <div className="reviews">
                    <div className="review">

                    <p className="review-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <p className="client-name">Dilshad</p>
                    </div>
                    <div className="review">

                    <p className="review-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <p className="client-name">Satya</p>
                    </div>
                    <div class="review">
                    <p class="review-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <p class="client-name">Sabir</p>
                    </div>
                </div>
                </div>
        </div>
  )
}

export default Reviews
