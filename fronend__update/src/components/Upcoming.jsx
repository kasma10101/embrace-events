import Card from "./Card";
import { FaAngleRight } from "react-icons/fa";
import "../style/upcoming.css";

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

export default function Upcoming() {
  return (
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
          <Card eventObj={event} key={event.id} />
        ))}
      </div>
      <button className="showall__btn">
        <a href="">
          Show All{" "}
          <FaAngleRight style={{ position: "relative", top: "0.2rem" }} />
        </a>
      </button>
    </div>
  );
}
