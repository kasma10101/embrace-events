import Title from "./about/Title";
import Offer from "./about/Offer";
import Statistics from "./about/Statistics";
import Testimonial from "./about/Testimonial";
import Event from "./about/Event";
import Team from "./about/Team";
import Join from "./about/Join";
import "../style/about.css";

export default function About() {
  return (
    <div className="about__page">
      <Title />
      <Offer />
      <Statistics />
      <Testimonial />
      <Event />
      <Team />
      <Join />
    </div>
  );
}