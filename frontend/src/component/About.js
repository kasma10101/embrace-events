import Title from "./about/Title";
import Offer from "./about/Offer";
import Statistics from "./about/Statistics";
import Testimonial from "./about/Testimonial";
import VisionMission from "./about/VisionMission";
import Team from "./about/Team";
import Join from "./about/Join";
import "../style/about.css";

export default function About() {
  return (
    <div className="about__page">
      <Title />
      <Offer />
      <VisionMission />
      <Statistics />
      <Testimonial />
      <Team />
      <Join />
    </div>
  );
}