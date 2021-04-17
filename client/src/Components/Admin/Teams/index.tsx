import { useState } from "react";
import styled from "styled-components";
import { Flex } from "../../../Style";
import SearchBar from "./SearchBar";

const Teams: React.FC = () => {
  const [result, setResult] = useState<
    | {
        leader: { name: string; email: string; number: string };
        score: number;
        hints: number;
        ques: number;
        members: { name: string; number: string; email: number }[];
        logs: [any];
        teamName: string;
        set: string;
        joinCode: string;
      }[]
    | null
  >(null);

  return (
    <StyledTeams>
      <h1>Teams</h1>
      <SearchBar setResult={setResult} />
      <div className="divider"></div>
      <div className="result">
        {result ? (
          <ul className="details">
            {result &&
              result.map((team, index) => (
                <li key={index} className="team">
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
                      <h4>Hints:</h4> {team.hints}
                    </div>
                  </div>
                  {
                    //?Leader
                  }
                  <div>
                    <ul className="leader">
                      <h3>
                        <span>Leader</span>
                        <div className="line"></div>
                      </h3>
                      <li>Name: {team.leader.name}</li>
                      <li>Email: {team.leader.email}</li>
                      <li>Number: {team.leader.number}</li>
                    </ul>
                  </div>
                  {
                    //?Logs
                  }
                  <div>
                    <ul className="logs">
                      <h3>
                        <span>Logs: </span>
                        <div className="line"></div>
                      </h3>
                      {team.logs.map((data, ind) => (
                        <li key={ind}>{data}</li>
                      ))}
                    </ul>
                  </div>
                  {
                    //?Members
                  }
                  <div>
                    <h3>
                      <span> Members:</span>
                      <div className="line"></div>
                    </h3>
                    <ul className="members">
                      {team.members.map((data, ind) => (
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
                </li>
              ))}
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
    width: 100%;
    border-radius: 5px;
    flex: 1;

    overflow: hidden auto;
  }
  ul {
    list-style-position: inside;
  }
  .details {
    width: 100%;
    list-style-type: none;
  }

  .team {
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
  }

  h3 {
    width: 100%;
    height: auto;
    font-size: clamp(0.9rem, 2vw, 1.25rem);
    font-weight: 500;
    ${Flex(0, "space-between", "center")}

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

  .infoContainer {
    width: 100%;
    ${Flex(0, "space-between", "center")}
    margin: 0 !important;
    div {
      flex: 1;
      margin: 0.5rem 0 !important;
    }
  }

  .members {
    list-style-type: none;
    padding: 0 1rem;
  }

  .membersData {
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

export default Teams;
