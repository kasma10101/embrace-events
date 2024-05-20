/* eslint-disable react/prop-types */
import poster from "../assets/images/poster.png";
import "../style/card.css";

export default function Card(props) {
  return (
    <div className="box">
      <div className="poster">
        {" "}
        <img src={poster} alt="poster" />
      </div>
      <div className="content">
        <p>{props.eventObj.name}</p>
        <p>{props.eventObj.date}</p>
        {/* <p>{props.eventObj.location}</p> */}
        {/* <p>{props.eventObj.price} birr</p> */}
      </div>
    </div>
  );
}
