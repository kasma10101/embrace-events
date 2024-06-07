import {
  FaGraduationCap,
  FaTheaterMasks,
  FaCalendarAlt,
  FaTools,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
import { BsMicrosoftTeams } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { GrWorkshop } from "react-icons/gr";
import { MdCelebration } from "react-icons/md";
import { IoGitNetworkSharp } from "react-icons/io5";
import { RiCommunityFill } from "react-icons/ri";
import "../../style/about.css";

export default function Offer() {
  return (
    <>
      <h2 className="offer__title">What we offer</h2>
      <div className="offer__content">
        <div className="offer__box">
          <div className="offer__icon">
            <FaCalendarAlt />
          </div>
          <div className="offer__text">
            <h2>Event planning and management</h2>
            <p>
              Expert services for seamless event execution, from
              conceptualization to post-event evaluation.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <MdCelebration />
          </div>
          <div className="offer__text">
            <h2>Cultural festivals and celebrations:</h2>
            <p>
              Curated experiences that showcase diverse traditions through
              vibrant performances, exhibits, and cultural showcases.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <IoGitNetworkSharp />
          </div>
          <div className="offer__text">
            <h2>Customized experiences</h2>
            <p>
              Tailored event solutions designed to meet the unique needs and
              preferences of clients, creating personalized and memorable
              experiences.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <BsMicrosoftTeams />
          </div>
          <div className="offer__text">
            <h2>Team building and corporate events</h2>
            <p>
              Engaging activities and events that foster collaboration,
              communication, and a positive work environment.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <AiFillEnvironment />
          </div>
          <div className="offer__text">
            <h2>Environmental initiatives</h2>
            <p>
              Eco-friendly event solutions that minimize waste, promote
              recycling, and reduce the ecological footprint.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <GrWorkshop />
          </div>
          <div className="offer__text">
            <h2>Cultural workshops and education</h2>
            <p>
              Interactive sessions that promote cross-cultural understanding and
              appreciation through learning about different cultures,
              traditions, and art forms.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <RiCommunityFill />
          </div>
          <div className="offer__text">
            <h2>Community engagement</h2>
            <p>
              Collaborative efforts with local communities, supporting social
              impact and involvement through partnerships and initiatives.{" "}
            </p>
          </div>
        </div>
        <div className="offer__box">
          <div className="offer__icon">
            <FaTheaterMasks />
          </div>
          <div className="offer__text">
            <h2>Entertainment and performances</h2>
            <p>
              Diverse entertainment options, including live music, dance acts,
              and interactive performances, adding excitement and engagement to
              events.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
