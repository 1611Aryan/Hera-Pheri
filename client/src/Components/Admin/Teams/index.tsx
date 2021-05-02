import { useState } from "react";
import styled from "styled-components";
import { Flex } from "../../../Style";
import { team } from "./../interface";
import SearchBar from "./SearchBar";

import Logs from "./Logs";
import Members from "./Members";
import Leader from "./Leader";

const Teams: React.FC = () => {
  const [result, setResult] = useState<team[] | null>(null);

  return (
    <StyledTeams>
      <h1>Teams</h1>
      <SearchBar setResult={setResult} />
      <div className="divider"></div>
      <StyledResult>
        {result ? (
          <ul className="details">
            {result &&
              result.map((team, index) => (
                <StyledTeam key={index}>
                  <div className="infoContainer">
                    <div>
                      <h4>Team Name: </h4>
                      {team.teamName}
                    </div>
                    <div>
                      <h4>Join Code: </h4>
                      {team.joinCode}
                    </div>
                  </div>
                  <div className="infoContainer">
                    <div>
                      <h4>Score: </h4>
                      {team.score}
                    </div>
                    <div>
                      <h4>Question Number: </h4>
                      {team.ques + 1}
                    </div>
                  </div>
                  <div className="infoContainer">
                    <div>
                      <h4>Set: </h4> {team.set}
                    </div>
                    <div>
                      <h4>Hints:</h4>{" "}
                      {team.hints.type1 + team.hints.type2 + team.hints.type3}
                    </div>
                  </div>
                  <Leader team={team} />
                  <Logs team={team} />
                  <Members team={team} />
                </StyledTeam>
              ))}
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
  h1 {
    font-family: var(--heading);
    width: 100%;
    font-size: clamp(1rem, 3vw, 2rem);
    margin-bottom: clamp(0.5rem, 2vw, 1rem);
  }

  .divider {
    width: 100%;
    height: 2px;
    background: var(--secondary);
    margin: clamp(0.5rem, 2vw, 1rem) 0;
  }

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

const StyledTeam = styled.li`
  padding: clamp(0.5rem, 2vw, 1rem);
  background: #fff;
  border-radius: 15px;
  border-top: 2px solid var(--secondary);
  border-bottom: 2px solid var(--secondary);
  margin-bottom: 2rem;
  font-size: clamp(0.75rem, 2vw, 1rem);
  div + div {
    margin: 1rem 0;
  }
  li {
    margin-top: 0.5rem;
  }
  .infoContainer {
    width: 100%;
    ${Flex(0, "space-between", "center")}
    margin: 0 !important;
    div {
      flex: 1;
      margin: 0.5rem 0 !important;
    }
  }
`;

export default Teams;
