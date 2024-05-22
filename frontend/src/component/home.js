import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import home from "../assets/logo/home.png";
import "../style/home.css";
import Popup from "./Popup";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import poster from "../assets/images/poster.png";

const faqs = [
  {
    title: "How to buy tickets?",
    text: "To buy tickets, simply visit our website, select the event you're interested in, choose the number of tickets you want, and proceed to checkout.",
  },
  {
    title: "Can I get a refund?",
    text: "Refund policies vary depending on the event organizer. Please refer to the event details or contact our customer support for more information.",
  },
  {
    title: "What if the event is canceled?",
    text: "In the event of a cancellation, you will be notified via email and provided with options for a refund or rescheduling.",
  },
  {
    title: "How do I contact support?",
    text: "For any support or assistance, please visit our contact page or email us at support@example.com.",
  },
  {
    title: "Can I transfer my ticket?",
    text: "Ticket transfer policies vary depending on the event organizer. Please refer to the event details or contact our customer support for more information.",
  },
];
const event = [
    {
      id: 1,
      name: "Test",
      description: "description",
      date: "May 20 - 28",
      price: 650,
      location: "Meskel Square, A.A Bazar & Exhibition Center,",
    },
    {
      id: 2,
      name: "Focaccia",
      description: "Bread with italian olive oil and rosemary",
      date: "May 22 - 29",
      price: 800,
      location: "Meskel Square, A.A Bazar & Exhibition Center,",
    },
    {
      id: 3,
      name: "Focaccia",
      description: "Bread with italian olive oil and rosemary",
      date: "June 02 - 10",
      price: 500,
      location: "Meskel Square, A.A Bazar & Exhibition Center,",
    },
    {
      id: 4,
      name: "Focaccia",
      description: "Bread with italian olive oil and rosemary",
      date: "June 09 - 17",
      price: 1200,
      location: "Meskel Square, A.A Bazar & Exhibition Center,",
    },
    {
      id: 5,
      name: "Focaccia",
      description: "Bread with italian olive oil and rosemary",
      date: "June 14 - 22",
      price: 1500,
      location: "Meskel Square, A.A Bazar & Exhibition Center,",
    },
    {
      id: 6,
      name: "Focaccia",
      description: "Bread with italian olive oil and rosemary",
      date: "June 15 - 23",
      price: 250,
      location: "Meskel Square, A.A Bazar & Exhibition Center,",
    },
    {
      id: 7,
      name: "Focaccia",
      description: "Bread with italian olive oil and rosemary",
      date: "August 22 - 28",
      price: 600,
      location: "Meskel Square, A.A Bazar & Exhibition Center,",
    },
    {
      id: 8,
      name: "Focaccia",
      description: "Bread with italian olive oil and rosemary",
      price: 400,
      location: "Meskel Square, A.A Bazar & Exhibition Center,",
    },
  ];

function Home() {
  let targetDate = new Date("Sep 11, 2024 00:00:00").getTime();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const gap = target - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const d = Math.floor(gap / day);
      const h = Math.floor((gap % day) / hour);
      const m = Math.floor((gap % hour) / minute);
      const s = Math.floor((gap % minute) / second);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      setTimeout(updateCountdown, 1000);
    };

    updateCountdown();
  }, [targetDate]);

  //   //   let month = months[date.getMonth()];
  return (
    <>
    <div className="home">
      <div className="home__logo">
        <img src={home} alt="the ethiopia holi" className="home__img" />
      </div>
      <div className="countdown">
        <div className="time">
          <span> {days}</span>
          <p> days</p>
        </div>
        <div className="time">
          <span>{hours}</span>
          <p>hours</p>{" "}
        </div>
        <div className="time">
          <span> {minutes}</span> <p>minutes</p>{" "}
        </div>
        <div className="time">
          <span>{seconds}</span> <p>seconds</p>
        </div>
      </div>
      <p className="home__para">
        Join us for an unforgettable experience filled with excitement and
        entertainment.
      </p>
      <div className="btn">
        <button className="learnmore">
          <a href="">
            Learn More{" "}
            <FaAngleRight style={{ position: "relative", top: "0.2rem" }} />
          </a>
        </button>
        <Popup />
      </div>
    </div>
    <div className="create">
      <hr className="create__line" />
      <h2>Create memorable events with us.</h2>
      <p>
        Our personalized event planning service ensures that every detail is
        tailored to your unique vision. From start to finish, we work closely
        with you to create an unforgettable experience that exceeds your
        expectations.
      </p>
      <hr className="create__line" />
    </div>
    <div className="events">
      <h2>Upcoming Events</h2>
      <p className="event__para">
        Browse through our list of exciting upcoming events.
      </p>
      {/* <hr /> */}
      <div className="upcoming">
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
        {event.map((event) => (
          <div className="box">
      <div className="poster">
        {" "}
        <img src={poster} alt="poster" />
      </div>
      <div className="content">
        <p>{event.name}</p>
        <p>{event.date}</p>
        {/* <p>{props.eventObj.location}</p> */}
        {/* <p>{props.eventObj.price} birr</p> */}
      </div>
    </div>
        ))}
      </div>
      <button className="showall__btn">
        <a href="">
          Show All{" "}
          <FaAngleRight style={{ position: "relative", top: "0.2rem" }} />
        </a>
      </button>
    </div>
    <div className="faq">
      <h2 className="faq__title">FAQs</h2>
      <p className="faq__para">
        Find answers to common questions about event organization, ticket
        purchasing, and event attendance.
      </p>
      <div className="accordion">
        {faqs.map((el, i) => (
          <AccordionItem
            title={el.title}
            text={el.text}
            num={i}
            key={el.title}
          />
        ))}
      </div>
      <h2 className="faq__title__two">Still have questions?</h2>
      <p className="faq__par__two">Contact us for further assistance.</p>
      <div className="phone">
        <span>
          {" "}
          <FaPhoneAlt />
        </span>
        <p>+251 987 298989</p>
      </div>
      <div className="location">
        <span>
          {" "}
          <FaMapMarkerAlt />
        </span>
        <p>
          Meskel Square, A.A Bazar & Exhibition Center, Addis Ababa, Ethiopia{" "}
        </p>
      </div>
      <button className="contact__btn">
        <a href="">Contact</a>
      </button>
    </div>
    </>
  );
}


function AccordionItem({ num, title, text }) {
    const [isOpen, setIsOpen] = useState(false);
  
    function handleToggle() {
      setIsOpen((isOpen) => !isOpen);
    }
  
    return (
      <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
        <p className="number n">{num < 9 ? `0${num + 1}` : num + 1}</p>
        <p className="title2">{title}</p>
        <p className="icon2">{isOpen ? "-" : "+"}</p>
  
        {isOpen && <div className="content-box">{text}</div>}
      </div>
    );
  }

export default Home;