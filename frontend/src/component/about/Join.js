import { FaPencilAlt } from "react-icons/fa";
import "../../style/about.css";

export default function Join() {
  return (
    <div className="join">
      <h2>It’s Time</h2>
      <h3>For Your Celebration</h3>
      <p>Order any package from 8000 Birr</p>
      <div className="join__two">
        <button className="join__btn">
          {" "}
          <FaPencilAlt style={{ marginRight: 12 }} /> Send Request
        </button>
      </div>
    </div>
  );
}