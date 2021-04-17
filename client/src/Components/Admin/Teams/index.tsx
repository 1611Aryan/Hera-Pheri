import { useState } from "react";
import styled from "styled-components";
import { Flex } from "../../../Style";
import SearchBar from "./SearchBar";

const Teams = () => {
  const [result, setResult] = useState<{
    leader: { name: string; email: string; number: string };
    score: number;
    hints: number;
    members: { name: string; number: string; email: number }[];
    logs: [any];
    teamName: string;
    set: string;
    joinCode: string;
  } | null>(null);

  return (
    <StyledTeams>
      <h1>Teams</h1>
      <SearchBar setResult={setResult} />
      <div className="divider"></div>
      <div className="result">
        {result ? (
          <ul className="details">
            <li>Team: {result.teamName}</li>
            <li>
              Leader:
              <span>Name: {result.leader.name}</span>
              <br />
              <span>Email: {result.leader.email}</span>
              <br />
              <span>Number: {result.leader.number}</span>
            </li>
            <li>Score: {result.score}</li>
            <li>Set: {result.set}</li>
            <li>Hints: {result.hints}</li>
            <li>
              Logs
              {result.logs.map((data, index) => (
                <p key={index}>{data}</p>
              ))}
            </li>
            <li>Code: {result.joinCode}</li>
            <li>
              Members:{" "}
              {result.members.map((data, index) => (
                <p key={index}>
                  <span>Name: {data.name}</span>
                  <br />
                  <span>Number: {data.number}</span>
                  <br />
                  <span>Email: {data.email}</span>
                </p>
              ))}
            </li>
          </ul>
        ) : (
          "No Team Found"
        )}
      </div>
    </StyledTeams>
  );
};

const StyledTeams = styled.div`
  --primary: #f05945;
  --secondary: #5eaaa8;
  width: 100%;
  height: 100%;
  background: #f7f3e9;
  color: var(--primary);
  padding: 1rem;
  ${Flex(1)}
  h1 {
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
  .result {
    background: #fff;
    width: 100%;
    border-radius: 5px;
    flex: 1;
  }
  ul {
    list-style-position: inside !important;
  }
`;

export default Teams;
