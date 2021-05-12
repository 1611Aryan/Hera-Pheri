import { useState } from "react";
import styled from "styled-components";
import { Flex } from "../../../Style";
import { team } from "./../interface";
import Header from "./Header";

import Team from "./Team";

const Teams: React.FC = () => {
  const [result, setResult] = useState<team[] | null>(null);

  return (
    <StyledTeams>
      <Header setResult={setResult} />
      <StyledResult>
        {result ? (
          <ul className="details">
            {result &&
              result.map((team, index) => <Team team={team} key={index} />)}
          </ul>
        ) : (
          "No Team Found"
        )}
      </StyledResult>
    </StyledTeams>
  );
};

const StyledTeams = styled.div`
  --primary: #f05945;
  --secondary: #5eaaa8;
  --bg: #f7f3e9;
  width: 100%;
  height: 100%;
  background: #f7f3e9;
  color: var(--primary);
  padding: 1rem;
  ${Flex(1)}

  ul {
    list-style-position: inside;
  }

  .details {
    width: 100%;
    list-style-type: none;
  }

  .team {
  }

  h3 {
    width: 100%;
    height: auto;
    font-size: clamp(0.9rem, 2vw, 1.25rem);
    font-weight: 500;
    ${Flex(0, "space-between", "center")}
    span {
      ${Flex()}
      svg {
        margin-left: 0.5rem;
        cursor: pointer;
      }
    }
    .line {
      margin-left: 0.5rem;
      width: 100%;
      height: 1px;
      background: #727272;
    }
  }

  h4 {
    font-size: clamp(0.9rem, 2vw, 1.25rem);
    font-weight: 500;
    display: inline;
  }
`;

const StyledResult = styled.div`
  width: 100%;
  border-radius: 5px;
  flex: 1;
  overflow: hidden auto;
  ::-webkit-scrollbar {
    background: var(--bg);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 5px;
  }
  scrollbar-width: thin;
  scrollbar-color: var(--primary) var(--bg);
`;

export default Teams;
