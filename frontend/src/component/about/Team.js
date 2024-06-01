import "../../style/about.css";

export default function Team() {
  const teamMember = [
    {
      id: 1,
      name: "Elias Wulle",
      title: "Founder",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Test",
      title: "Event Coordinator",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Test",
      title: "Lead Planner",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Test",
      title: "CEO",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Test",
      title: "Event Coordinator",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Test",
      title: "Lead Planner",
      image: "https://via.placeholder.com/150",
    },
  ];
  return (
    <div className="team">
      <h2>Meet Our Team</h2>
      <p>Happy is a team of highly qualified event planners.</p>
      <div className="team__page">
        {teamMember.map((member) => (
          <Member memberObj={member} key={member.id} />
        ))}
      </div>
    </div>
  );
}

function Member(props) {
  return (
    <div className="team__member">
      <img src={props.memberObj.image} alt={props.memberObj.name} />
      <h3>{props.memberObj.name}</h3>
      <p>{props.memberObj.title}</p>
    </div>
  );
}
