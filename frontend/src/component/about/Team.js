import "../../style/about.css";

export default function Team() {
  const teamMember = [
    {
      id: 1,
      name: "Elias Wulle",
      title: "Manager",
      image: '/Elias.png',
    },
    {
      id: 2,
      name: "Kalkidan Mulugeta",
      title: "Marketing Officer",
      image: "/kalkidan.jpg",
    },
    {
      id: 3,
      name: "Metsakal Moges",
      title: "Marketing Officer",
      image: "/IDMK.png",
    },
    {
      id: 4,
      name: "Eyob Yetmgeta",
      title: "Multimedia Designer",
      image: "/Eyob.png",
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
