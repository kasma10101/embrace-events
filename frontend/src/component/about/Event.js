import "../../style/about.css";

export default function Event() {
  return (
    <div className="event__package">
      <h2>Our Event Packages</h2>
      <div className="event__page">
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
      </div>
    </div>
  );
}
