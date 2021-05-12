import { useState } from "react";
import { team } from "./../../interface";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Member from "./Member";
import styled from "styled-components";

const Members: React.FC<{ team: team }> = ({ team }) => {
  const [members, setMembers] = useState(false);

  const toggleMembers = () => {
    setMembers(!members);
  };

  return (
    <StyledMembers>
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
            <Member key={ind} data={data} ind={ind} />
          ))}
      </ul>
    </StyledMembers>
  );
};

const StyledMembers = styled.div`
  .members {
    list-style-type: none;
    padding: 0 1rem;
  }
`;
export default Members;
