import { useState } from "react";
import { team } from "./../interface";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Leader: React.FC<{ team: team }> = ({ team }) => {
  const [leader, setLeader] = useState(false);

  const toggleLeader = () => {
    setLeader(!leader);
  };

  return (
    <div>
      <ul className="leader">
        <h3>
          <span>
            Leader{" "}
            <FontAwesomeIcon
              icon={leader ? faCaretUp : faCaretDown}
              onClick={toggleLeader}
            />
          </span>
          <div className="line"></div>
        </h3>
        {leader && (
          <>
            <li>Name: {team.leader.name}</li>
            <li>Email: {team.leader.email}</li>
            <li>Number: {team.leader.number}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Leader;
