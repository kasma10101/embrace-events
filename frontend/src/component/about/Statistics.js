import "../../style/about.css";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";

function CountUp({ n }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { number } = useSpring({
    from: { number: 0 },
    number: inView ? n : 0,
    delay: 200,
    config: { mass: 1, tension: 10, friction: 10 },
  });

  return (
    <animated.div ref={ref}>
      {number.to((n) => n.toFixed(0))}
    </animated.div>
  );
}

export default function Statistics() {
  return (
    <div className="statistics">
      <div className="statistics__box">
        <p><CountUp n={10} />+</p>
        <h2>Events</h2>
      </div>
      <div className="statistics__box">
        <p><CountUp n={1500} />+</p>
        <h2>Participants</h2>
      </div>
      <div className="statistics__box">
        <p><CountUp n={10} />+</p>
        <h2>International Events</h2>
      </div>
    </div>
  );
}
