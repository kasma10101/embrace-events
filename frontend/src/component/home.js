import { useState, useEffect, useRef } from "react";
import {
  FaAngleRight,
  FaBullseye,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoMdStopwatch } from "react-icons/io";
import Statistics from "./about/Statistics";
import Testimonial from "./about/Testimonial";
import "../style/home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import {
  getAvailableTicketsThunk,
  getTicketsThunk,
  getUpcomingTicketsThunk,
} from "../redux/ticketSlice";
import moment from "moment";
import LockIcon from "@mui/icons-material/Lock";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Blogs from "./blogs";
import axios from "axios";
import { Grid, Modal } from "@mui/material";
import defaultImage from '../assets/images/home_back.jpg'
import homeCard from '../assets/images/home.png'

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
    text: "For any support or assistance, please visit our contact page or email us at contact@embracevents.com.",
  },
  {
    title: "Can I transfer my ticket?",
    text: "Ticket transfer policies vary depending on the event organizer. Please refer to the event details or contact our customer support for more information.",
  },
];

function Home() {
  const [counterImage, setCounterImage] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [posterAnimationVariants, setPosterAnimationVariants] = useState({
    offScreen: { opacity: 0, x: "-50%" },
    onScreen: { opacity: 1, x: 0 },
  });
  const [contentAnimationVariants, setContentAnimationVariants] = useState({
    offScreen: { opacity: 0, x: "50%" },
    onScreen: { opacity: 1, x: 0 },
  });
  const [transitionValue, setTransitionValue] = useState({
    type: "twin",
    duration: 1.5,
  });

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/blogs`
      );
      const latestBlogs = response.data.reverse().slice(0, 3);
      setBlogs(latestBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const dispatch = useDispatch();
  const { tickets, loading, error, availableTickets, upComingTickets } =
    useSelector((state) => state.tickets);

  const [targetDate, setTargetDate] = useState(null);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    dispatch(getTicketsThunk());
    dispatch(getUpcomingTicketsThunk());
    dispatch(getAvailableTicketsThunk());
  }, [dispatch]);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const updateCountdown = () => {
    if (targetDate) {
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
    }
  };
  useEffect(() => {
    updateCountdown();
  }, [targetDate]);
  useEffect(() => {
    if (availableTickets.length > 0) {
      const nearestEvent = availableTickets.reduce((nearest, ticket) => {
        const ticketDate = new Date(ticket.eventStartedDate).getTime();
        if (ticketDate < nearest) {
          setCounterImage(ticket?.image?.filePath || defaultImage);
          return ticketDate;
        }
        return nearest;
      }, Infinity);
      setTargetDate(nearestEvent);
    }
  }, [availableTickets]);

  useEffect(() => {
    if (availableTickets.length > 0) {
      const nearestEvent = availableTickets.reduce((nearest, ticket) => {
        const ticketDate = new Date(ticket.eventStartedDate).getTime();
        if (ticketDate < nearest) {
          setCounterImage(ticket?.image?.filePath || defaultImage);
          return ticketDate;
        }
        return nearest;
      }, Infinity);
      setTargetDate(nearestEvent);
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth < 730) {
        setPosterAnimationVariants({
          offScreen: { opacity: 0, y: "-10%" },
          onScreen: { opacity: 1, y: 0 },
        });
        setContentAnimationVariants({
          offScreen: { opacity: 0, y: "10%" },
          onScreen: { opacity: 1, y: 0 },
        });
      } else if (window.innerWidth < 830) {
        setPosterAnimationVariants({
          offScreen: { opacity: 0, x: "-20%" },
          onScreen: { opacity: 1, x: 0 },
        });
        setContentAnimationVariants({
          offScreen: { opacity: 0, x: "20%" },
          onScreen: { opacity: 1, x: 0 },
        });
      } else {
        setPosterAnimationVariants({
          offScreen: { opacity: 0, x: "-50%" },
          onScreen: { opacity: 1, x: 0 },
        });
        setContentAnimationVariants({
          offScreen: { opacity: 0, x: "50%" },
          onScreen: { opacity: 1, x: 0 },
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function showDateDifference(startDate, endDate) {
    const dateDifference =
      new Date(endDate).getTime() - new Date(startDate).getTime();
    const daysDifference = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }
  const containerStyle = {
    backgroundImage: `url(${defaultImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    position: "relative",
    height: "max-content",
    backgroundColor: "#f1f8ff",
     fontFamily: `"Work Sans", "sans-serif"`
  };

  return (
    <>
      <div className="home" style={containerStyle}>
        <div className="top_home">
          <div className="home__logo">
            {/* <img src={home} alt="the ethiopia holi" className="home__img" /> */}
            <motion.div
              variants={{
                offScreen: { opacity: 0, y: "-20%" },
                onScreen: { opacity: 1, y: 0 },
              }}
              initial="offScreen"
              animate="onScreen"
              transition={{
                type: "spring",
                delay: 1.5,
                stiffness: 800,
              }}
            >
              <h2>
                Embrace <span>Events</span>
              </h2>
            </motion.div>
            <p>
              Join us for an unforgettable experience filled with excitement and
              entertainment.
            </p>
          </div>
          {targetDate && (
            <div className="counter_container">
              <div className="counter_title">
                <motion.div
                  variants={{
                    offScreen: { opacity: 0, y: "50%" },
                    onScreen: { opacity: 1, y: 0 },
                  }}
                  initial="offScreen"
                  animate="onScreen"
                  transition={{
                    type: "twin",
                    delay: 1.5,
                    duration: 0.5,
                    // stiffness: 8,
                  }}
                  className="counter_poster"
                >
                  {/* <h2>Countdown to Upcoming Event</h2> */}
                  <img src={homeCard} alt=""  onClick={() => scrollToSection("availableTickets")}/>
                </motion.div>
              </div>
              <div className="countdown">
                <div className="time" style={{ backgroundColor: "#00CC00",color: "#fff"}}>
                  <span>{days}</span>
                  <p>days</p>
                </div>
                <div className="time" style={{ backgroundColor: "#FF8C00",color: "#fff"}}>
                  <span>{hours}</span>
                  <p>hours</p>
                </div>
                <div className="time" style={{ backgroundColor: "#00CCCC",color: "#fff"}}>
                  <span>{minutes}</span>
                  <p>minutes</p>
                </div>
                <div className="time" style={{ backgroundColor: "#CC0000",color: "#fff"}}>
                  <span>{seconds}</span>
                  <p>seconds</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <div className="home__para">
          <p>
            Welcome to Embrace Events, where we bring the vibrant spirit of the
            Holi Festival to Ethiopia. We create unforgettable experiences that
            blend education with entertainment, fostering unity and joy. Join us
            in Addis Ababa for a celebration of color, music, dance, and
            community. Let Embrace Events transform your vision into memorable
            moments of happiness and togetherness.
          </p>
        </div> */}
        <div className="btn">
          {/* <button className="learnmore">
            <Link to="/about">
            Learn More{" "}
            <FaAngleRight style={{ position: "relative", top: "0.2rem" }} />
            </Link>
          </button> */}
          <button
            onClick={() => scrollToSection("availableTickets")}
            className="register"
          >
            Available Tickets
          </button>
        </div>
      </div>
      <div className="create">
        <hr className="create__line" />
        <motion.div
          variants={{
            offScreen: { opacity: 0, y: "10%" },
            onScreen: { opacity: 1, y: 0 },
          }}
          initial="offScreen"
          whileInView="onScreen"
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            type: "twin",
            // delay: 1.5,
            duration: 0.5,
            // stiffness: 8,
          }}
        >
          <p style={{ marginTop: "2%" }}>
            Welcome to Embrace Events, where we bring the vibrant spirit of the
            Holi Festival to Ethiopia. We create unforgettable experiences that
            blend education with entertainment, fostering unity and joy. Join us
            in Addis Ababa for a celebration of color, music, dance, and
            community. Let Embrace Events transform your vision into memorable
            moments of happiness and togetherness.
          </p>
        </motion.div>
        <hr className="create__line" />
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
      <>
        <Statistics />
        <Testimonial />
      </>
      <div className="events">
        <section id="availableTickets">
          <h1 style={{ textAlign: "center", marginTop: "3%" }}>
            Available Tickets
          </h1>
          {availableTickets.length !== 0 ? (
            <>
              <p className="event__para">
                Browse through our list of exciting available events.
              </p>
              <div className="upcoming">
                {availableTickets.map((ticket) => {
                  return (
                    <div className="event__container">
                      <Link
                        to={`/payment/${ticket._id}`}
                        style={{ color: "#789461", textDecoration: "none" }}
                        className="box"
                      >
                        <motion.div
                          className="poster"
                          variants={posterAnimationVariants}
                          initial="offScreen"
                          whileInView="onScreen"
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{
                            type: "twin",
                            duration: 1.5,
                          }}
                        >
                          <img src={ticket?.image?.filePath} />
                        </motion.div>
                        <motion.div
                          className="content"
                          variants={contentAnimationVariants}
                          initial="offScreen"
                          whileInView="onScreen"
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{
                            type: "twin",
                            duration: 1.5,
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: 25,
                                fontWeight: 500,
                                color: "#13A014",
                              }}
                            >
                              {ticket?.title}
                            </div>
                            <div
                              style={{ border: "2px solid #789461", width: 90 }}
                            ></div>
                          </div>

                          <div
                            style={{ display: "flex", gap: 5 }}
                            className="ticket_location"
                          >
                            <span>
                              <LocationOnIcon style={{ color: "red" }} />
                            </span>
                            <span>{ticket.location}</span>
                          </div>
                          <div
                            style={{ display: "flex", gap: 5 }}
                            className="ticket_time"
                          >
                            <IoMdStopwatch style={{ color: "13A014" }} /> Ticket
                            Sale Date
                            <span style={{ fontSize: "13px" }}>
                              {moment(ticket?.startDate).format("LL") +
                                " - " +
                                moment(ticket?.endDate).format("LL")}
                            </span>
                          </div>
                          <div
                            style={{ display: "flex", gap: 5 }}
                            className="ticket_time"
                          >
                            <IoMdStopwatch style={{ color: "13A014" }} /> Actual
                            Event
                            <span style={{ fontSize: "13px" }}>
                              {moment(ticket?.eventStartedDate).format("LL") +
                                " - " +
                                moment(ticket?.eventEndDate).format("LL")}
                               &nbsp;&nbsp; for{" "}
                              {showDateDifference(
                                ticket?.eventStartedDate,
                                ticket?.eventEndDate
                              )}{" "}
                              Days
                            </span>
                          </div>
                        </motion.div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div
              style={{ fontSize: "20px", textAlign: "center", margin: "10px" }}
            >
              No ticket available
            </div>
          )}
        </section>
        <hr className="create__line" />
        <h1 style={{ textAlign: "center", margin: 15 }}>Upcoming Tickets</h1>
        {upComingTickets.length !== 0 ? (
          <>
            <p className="event__para">
              Browse through our list of exciting upcoming events.
            </p>
            <div className="upcoming">
              {upComingTickets.map((ticket) => {
                return (
                  <div className="event__container">
                    <Box>
                      <div className="box" style={{ cursor: "default" }}>
                        <motion.div
                          className="poster"
                          variants={posterAnimationVariants}
                          initial="offScreen"
                          whileInView="onScreen"
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{
                            type: "twin",
                            duration: 1.5,
                          }}
                        >
                          <img src={ticket?.image?.filePath} />
                        </motion.div>
                        <motion.div
                          className="content"
                          variants={contentAnimationVariants}
                          initial="offScreen"
                          whileInView="onScreen"
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{
                            type: "twin",
                            duration: 1.5,
                          }}
                        >
                          <LockIcon className="lock_icon" />
                          <div>
                            <div
                              style={{
                                fontSize: 25,
                                fontWeight: 500,
                                color: "#789461",
                              }}
                            >
                              {ticket.title.length > 20
                                ? ticket.title.slice(0, 20) + "..."
                                : ticket.title}
                            </div>
                            <div
                              style={{ border: "2px solid #789461", width: 90 }}
                            ></div>
                          </div>

                          <div style={{ display: "flex", gap: 5 }}>
                            <span>
                              <LocationOnIcon style={{ color: "red" }} />
                            </span>
                            <span>{ticket?.location}</span>
                          </div>
                          <div style={{ display: "flex", gap: 5 }}>
                            <span style={{ fontSize: "13px" }}>
                              {moment(ticket?.startDate).format("LL") +
                                " - " +
                                moment(ticket?.endDate).format("LL")}
                            </span>
                          </div>
                          <div
                            style={{ display: "flex", gap: 5 }}
                            className="ticket_time"
                          >
                            <IoMdStopwatch style={{ color: "13A014" }} /> Actual
                            Event
                            <span style={{ fontSize: "13px" }}>
                              {moment(ticket?.eventStartedDate).format("LL") +
                                " - " +
                                moment(ticket?.eventEndDate).format("LL")}
                              &endp; &endp; for{" "}
                              {showDateDifference(
                                ticket?.eventStartedDate,
                                ticket?.eventEndDate
                              )}{" "}
                              Days
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </Box>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", fontSize: "20px", margin: 20 }}>
            No upcoming tickets here
          </div>
        )}
        <hr className="create__line" />
        <>
          <h2>Latest Blogs</h2>
          <div className="blogs-container">
            {blogs ? (
              blogs.map((eachBlog, index) => {
                return (
                  <Link
                    onClick={() => setShowModal(true)}
                    to={`/home/blogs/${eachBlog._id}`}
                    className="each-blog-container"
                    key={index}
                  >
                    <div>
                      <img
                        className="blog-image"
                        src={`${process.env.REACT_APP_BACKEND_API}/${eachBlog.blogImage}`}
                      />
                    </div>
                    <div className="each-blog-container-description">
                      <div className="each-blog-container-title">
                        {eachBlog.blogTitle.length > 10
                          ? eachBlog.blogTitle.slice(0, 10) + "..."
                          : eachBlog.blogTitle}
                        <div className="title-underline"></div>
                      </div>
                      <div>
                        {eachBlog.blogDescription.length > 55
                          ? eachBlog.blogDescription.slice(0, 55) + "..."
                          : eachBlog.blogDescription}
                      </div>
                    </div>
                    <div style={{ float: "right", fontSize: 13, padding: 10 }}>
                      {new Date(eachBlog?.createdAt).toLocaleString()}
                    </div>
                  </Link>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <Modal
            open={showModal}
            onClose={() => {
              setShowModal(false);
              navigate("/");
            }}
            className="blog-modal"
          >
            <Grid>
              <Outlet />
            </Grid>
          </Modal>
          <Link to="/blogs" className="read_more">
            Read More
          </Link>
        </>
        <hr className="create__line" />
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
            <FaPhoneAlt />
          </span>
          <p>+251 987 298989</p>
        </div>
        <div className="location">
          <span>
            <FaMapMarkerAlt />
          </span>
          <p>Mekanisa, Abo Mazorya Addis Ababa, Ethiopia </p>
        </div>
        <button className="contact__btn">
          <Link to="/contact">Contact</Link>
        </button>
      </div>
      {/* {tickets.map((ticket, index)=>{
          return(
            <div onClick={()=>handleClick(ticket)}>
            <div>{ticket.title}</div>
            <div>{ticket.location}</div>
            </div>
          )
        })} */}
    </>
  );
}

function AccordionItem({ num, title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <Accordion>
      <div className={`accordion_item ${isOpen ? "open" : ""}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          onClick={handleToggle}
        >
          <p className="accordion_number">
            {num < 9 ? `0${num + 1}` : num + 1}
          </p>
          <span className="title">{title}</span>
        </AccordionSummary>
      </div>
      <AccordionDetails>
        <div className="content-box">{text}</div>
      </AccordionDetails>
    </Accordion>
  );
}

export default Home;
