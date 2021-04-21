import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex } from "../../../Style";
import { team } from "./../interface";

const Leaderboard: React.FC = () => {
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team"
      : "http://localhost:5000/team";

  const [teams, setTeams] = useState<team[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(URL);
        setTeams(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [URL]);

  return (
    <StyledLeaderBoard>
      <h1>LeaderBoard</h1>
      <ul>
        {teams &&
          teams.map((team, index) => (
            <li key={index}>
              <span> Team: {team.teamName}</span>
              <span> Score: {team.score}</span>
              <span>Leader: {team.leader.name}</span>
              <span>Question : {team.ques}</span>
            </li>
          ))}
      </ul>
    </StyledLeaderBoard>
  );
};

const StyledLeaderBoard = styled.div`
  width: 100%;
  height: 100%;
  background: #f7f3e9;

  padding: 1rem;
  h1 {
    font-family: var(--heading);
    font-size: clamp(1rem, 3vw, 2rem);
    color: #f05945;
    margin-bottom: clamp(0.5rem, 2vw, 1rem);
  }
  ul {
    border-top: 2px solid #5eaaa8;
    width: 100%;
    height: auto;
    overflow: hidden auto;
  }
  li {
    border-bottom: 2px solid #5eaaa8;
    padding: clamp(0.5rem, 2vw, 1rem);
    font-size: clamp(0.8rem, 2vw, 1rem);
    ${Flex()};
    flex-wrap: wrap;
    span {
      width: 50%;
      padding: 0.5rem 0;
    }
  }
`;

export default Leaderboard;
