import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../style/about.css";

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: "Bullo",
      quote:
        "This product has been a game-changer for my business. Highly recommended!",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      quote:
        "I am amazed by the quality and performance of this tool. It has saved me so much time.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Bob Johnson",
      quote:
        "This service has exceeded all of my expectations. I couldn't be happier with the results.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevious() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }

  function handleNext() {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }
  return (
    <div className="testimonial">
      <h2>Client Testimonial</h2>
      <div className="testimonial__content">
        <button className="arrow__button arrow__left" onClick={handlePrevious}>
          <FaChevronLeft />
        </button>
        <div className="testimonial__item">
          <div className="testimonial__image">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
            />
          </div>
          <div className="testimonial__text">
            <h3>{testimonials[currentIndex].name}</h3>
            <p>"{testimonials[currentIndex].quote}"</p>
          </div>
        </div>
        <button className="arrow__button arrow__right" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>
      {/* <div className="testimonial__controls"></div> */}
    </div>
  );
}