import styled from "styled-components";
import { Flex } from "../../../../Style";
import { team } from "./../../interface";

import Logs from "./Logs";
import Members from "./Members";
import Leader from "./Leader";

const Team: React.FC<{
  team: team;
}> = ({ team }) => {
  return (
    <StyledTeam>
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
  );
};

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

export default Team;
