import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../style/about.css";
import client1 from "../../assets/images/client1.png"
import client2 from "../../assets/images/client2.png"

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: "Mesfin",
      quote:
        "Embrace Events now handle all operations functions at the Ethiopia Holi events. This includes coordination of accommodation, transport and vendor management in advance of the summits and venue management, logistics and operations throughout the delivery of the summits!",
      image: client1,
    },
    {
      id: 2,
      name: "Ahmed",
      quote:
        "We would like to express our thanks to the staff of Embrace Events for all their hard work and impressive professionalism in organizing our conference.",
      image: client2,
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