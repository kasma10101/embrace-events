import { Opacity } from "@mui/icons-material";
import "../../style/about.css";
import { motion } from "framer-motion";

export default function Title() {
  return (
    <div className="about__title">
      <motion.div
        className="title_container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 2,
        }}
      >
        <h2>
          Welcome to <span>#1</span>
        </h2>
        <h2>Event organizer in Ethiopia.</h2>
      </motion.div>
    </div>
  );
}
