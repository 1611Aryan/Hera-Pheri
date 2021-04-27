import { useState } from "react";
import { team } from "./../interface";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Members: React.FC<{ team: team }> = ({ team }) => {
  const [members, setMembers] = useState(false);

  const toggleMembers = () => {
    setMembers(!members);
  };

  return (
    <div>
      <h3>
        <span>
          Members:
          <FontAwesomeIcon
            icon={members ? faCaretUp : faCaretDown}
            onClick={toggleMembers}
          />
        </span>
        <div className="line"></div>
      </h3>
      <ul className="members">
        {members &&
          team.members.map((data, ind) => (
            <li key={ind}>
              Member {ind + 1}:
              <ul className="membersData">
                <li>
                  <h5>Name: </h5>
                  {data.name}
                </li>
                <li>
                  <h5>Number: </h5>
                  {data.number}
                </li>
                <li>
                  <h5>Email: </h5> {data.email}
                </li>
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Members;
