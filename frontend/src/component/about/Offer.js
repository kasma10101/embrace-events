import {
  FaGraduationCap,
  FaTheaterMasks,
  FaCalendarAlt,
  FaTools,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
import "../../style/about.css";

export default function Offer() {
  return (
    <>
      <h2 className="offer__title">What we offer</h2>
      <div className="offer__content">
        <div className="offer__box">
          <div className="offer__icon">
            <FaGraduationCap />
          </div>
          <div className="offer__text">
            <h2>Education</h2>
            <p>
              Comprehensive educational programs designed to enhance knowledge,
              skills, and personal growth.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <FaTheaterMasks />
          </div>
          <div className="offer__text">
            <h2>Entertainment</h2>
            <p>
              Captivating entertainment experiences that engage, inspire, and
              create unforgettable memories for audiences.t{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <FaCalendarAlt />
          </div>
          <div className="offer__text">
            <h2>Event Organization</h2>
            <p>
              Exceptional event organization providing seamless coordination,
              innovative solutions, and memorable experiences for attendees.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <FaTools />
          </div>
          <div className="offer__text">
            <h2>Workshop</h2>
            <p>
              Immersive workshops offering hands-on learning, collaborative
              problem-solving, and opportunities for skill development.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <FaHandshake />
          </div>
          <div className="offer__text">
            <h2>Sponsorship</h2>
            <p>
              Valuable sponsorship opportunities that increase visibility, brand
              recognition, and support meaningful initiatives.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <FaChartLine />
          </div>
          <div className="offer__text">
            <h2>Financial Investments</h2>
            <p>
              Tailored financial investments to diversify portfolios, optimize
              returns, and achieve long-term financial goals.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
