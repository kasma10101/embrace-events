import { FaPencilAlt } from "react-icons/fa";
import "../../style/about.css";
import { Link } from "@mui/material";

export default function Join() {
  return (
    <div className="join">
      <h2>It’s Time</h2>
      <h3>For Your Celebration</h3>
      <p>Buy tickets in the desired payment amount.</p>
      <div className="join__two">
        <Link href='/' style={{color:"inherit",textDecoration:"none"}}>
            <button className="join__btn">
              {" "}
              <FaPencilAlt style={{ marginRight: 12 }} /> Buy Tickets
            </button>
        
        </Link>
      </div>
    </div>
  );
}