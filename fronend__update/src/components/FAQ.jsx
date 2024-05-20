/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../style/faq.css";

const faqs = [
  {
    title: "How to buy tickets?",
    text: "To buy tickets, simply visit our website, select the event you're interested in, choose the number of tickets you want, and proceed to checkout.",
  },
  {
    title: "Can I get a refund?",
    text: "Refund policies vary depending on the event organizer. Please refer to the event details or contact our customer support for more information.",
  },
  {
    title: "What if the event is canceled?",
    text: "In the event of a cancellation, you will be notified via email and provided with options for a refund or rescheduling.",
  },
  {
    title: "How do I contact support?",
    text: "For any support or assistance, please visit our contact page or email us at support@example.com.",
  },
  {
    title: "Can I transfer my ticket?",
    text: "Ticket transfer policies vary depending on the event organizer. Please refer to the event details or contact our customer support for more information.",
  },
];

export default function FAQ() {
  return (
    <div className="faq">
      <h2 className="faq__title">FAQs</h2>
      <p className="faq__para">
        Find answers to common questions about event organization, ticket
        purchasing, and event attendance.
      </p>
      <div className="accordion">
        {faqs.map((el, i) => (
          <AccordionItem
            title={el.title}
            text={el.text}
            num={i}
            key={el.title}
          />
        ))}
      </div>
      <h2 className="faq__title__two">Still have questions?</h2>
      <p className="faq__par__two">Contact us for further assistance.</p>
      <div className="phone">
        <span>
          {" "}
          <FaPhoneAlt />
        </span>
        <p>+251 987 298989</p>
      </div>
      <div className="location">
        <span>
          {" "}
          <FaMapMarkerAlt />
        </span>
        <p>
          Meskel Square, A.A Bazar & Exhibition Center, Addis Ababa, Ethiopia{" "}
        </p>
      </div>
      <button className="contact__btn">
        <a href="">Contact</a>
      </button>
    </div>
  );
}

function AccordionItem({ num, title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number n">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title2">{title}</p>
      <p className="icon2">{isOpen ? "-" : "+"}</p>

      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
