import "../../style/about.css";
import { FaGlobeAfrica } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
export default function VisionMission() {
  return (
    <div className="card__container">
      <h2>Our Vision and Mission</h2>
      <div className="cards">
        <div className="card_box">
          <h3>
            <FaGlobeAfrica />
          </h3>
          <p className="card_title">Vision</p>
          <div className="card_par">
            <p>
              Our vision is to inspire and entertain young audiences with
              diverse, high-quality music and arts. We aim to enrich our
              community with family-friendly events, support emerging artists,
              and grow through innovative promotions and digital marketing. Over
              the next five years, we plan to host vibrant festivals across
              Addis Ababa and Ethiopia, creating memorable experiences and
              lasting connections.
            </p>
          </div>
        </div>
        <div className="card_box">
          <h3>
            <FaBook />
          </h3>
          <p className="card_title">Mission</p>
          <div className="card_par">
            <p>
              Our mission is to enrich lives through exceptional community
              service and to introduce the vibrant Holi Festival to Ethiopia. By
              celebrating color, harmony, and love, we aim to unite diverse
              cultures in Addis Ababa and beyond. We strive to create an annual
              event that promotes joy and understanding among the younger
              generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
<div className="event__box">
          <h3>Birthday Parties</h3>
          <p className="event__price">8000 Birr</p>
          <div className="event__detail">
            <p>2 Hours</p>
            <p>Up to 10 Persons</p>
            <p>Decoration</p>
            <p>Catering</p>
          </div>
          <button className="event__btn">Order Now</button>
        </div>
        <div className="event__box">
          <h3>Family Celebrations</h3>
          <p className="event__price">16000 Birr</p>
          <div className="event__detail">
            <p>3 Hours</p>
            <p>Up to 15 Persons</p>
            <p>Videography</p>
            <p>Photography</p>
          </div>
          <button className="event__btn">Order Now</button>
        </div>
        <div className="event__box">
          <h3>Wedding Celebrations</h3>
          <p className="event__price">60000 Birr</p>
          <div className="event__detail">
            <p>5 Hours</p>
            <p>Up to 20 Persons</p>
            <p>Floral Services</p>
            <p>Venue Selection</p>
          </div>
          <button className="event__btn">Order Now</button>
        </div>
        <div className="event__box">
          <h3>Corporate Events</h3>
          <p className="event__price">25000 Birr</p>
          <div className="event__detail">
            <p>7 Hours</p>
            <p>Up to 50 Persons</p>
            <p>Entertainment</p>
            <p>Event Planning</p>
          </div>
          <button className="event__btn">Order Now</button>
        </div>

*/
