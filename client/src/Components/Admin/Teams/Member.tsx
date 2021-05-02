import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";

const Member: React.FC<{
  data: {
    name: string;
    number: string;
    email: number;
  };
  ind: number;
}> = ({ data, ind }) => {
  //State
  const [show, setShow] = useState(false);

  //Handlers
  const toggle = () => {
    setShow(!show);
  };

  return (
    <StyledMember>
      Member {ind + 1}:{" "}
      <FontAwesomeIcon icon={show ? faCaretUp : faCaretDown} onClick={toggle} />
      {show && (
        <ul>
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
      )}
    </StyledMember>
  );
};

const StyledMember = styled.li`
  svg {
    cursor: pointer;
  }
  ul {
    list-style-type: circle;
    li {
      margin-top: 0.25rem;
      font-size: clamp(0.7rem, 1vw, 0.9rem);
      font-weight: 300;
      h5 {
        font-size: clamp(0.8rem, 1vw, 1rem);
        font-weight: 400;
        display: inline;
      }
    }
  }
`;

export default Member;
