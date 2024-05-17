import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import home from "../assets/logo/home.png";
import "../style/home.css";

function Countdown() {
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
        <button>
          <a href="">
            Learn More{" "}
            <FaAngleRight style={{ position: "relative", top: "0.2rem" }} />
          </a>
        </button>
        <button>
          <a href="">Buy ticket</a>
        </button>
      </div>
    </div>
  );
}

export default Countdown;
