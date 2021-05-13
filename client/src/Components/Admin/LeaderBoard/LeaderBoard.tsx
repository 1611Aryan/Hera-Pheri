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
    document.title = "Chem-i-Leon | Admin-Leaderboard";
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
      <header>
        <h1>LeaderBoard</h1>
      </header>

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
  --primary: #f05945;
  --secondary: #5eaaa8;
  --bg: #f7f3e9;
  width: 100%;
  height: 100%;
  background: var(--bg);
  ${Flex(1)}
  padding: 1rem;

  header {
    width: 100%;
    h1 {
      font-family: var(--heading);
      font-size: clamp(1rem, 3vw, 2rem);
      color: var(--primary);
    }
    margin-bottom: clamp(0.5rem, 2vw, 1rem);
  }

  ul {
    border-top: 2px solid var(--secondary);
    width: 100%;

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
  }
  li {
    border-bottom: 2px solid var(--secondary);
    padding: clamp(0.5rem, 2vw, 1rem);
    font-size: clamp(0.8rem, 2vw, 1rem);
    ${Flex()};
    flex-wrap: wrap;
    span {
      width: 50%;
      padding: 0.5rem 0;
    }
    &:last-child {
      margin-bottom: 1rem;
    }
  }
`;

export default Leaderboard;
