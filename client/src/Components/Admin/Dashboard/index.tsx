import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Section } from "../../../Style";
import Leaderboard from "../LeaderBoard/LeaderBoard";
import Hint from "../Hints/Hint";
import Teams from "../Teams";
import ChangeScore from "../ScoreChange";

const Dashboard = () => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team"
      : "http://localhost:5000/team";

  const [teams, setTeams] = useState<
    | {
        _id: string;
        teamName: string;
        score: number;
        hints: number;
        leader: {
          name: string;
          email: string;
          number: string;
        };
      }[]
    | null
  >(null);

  const [selected, setSelected] = useState(0);

  const changeItem = (i: number) => {
    setSelected(i);
  };

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
    <StyledDashboard>
      <div className="left">
        <ul>
          <li
            className={selected === 0 ? "selected" : ""}
            onClick={() => changeItem(0)}
          >
            Leaderboard
          </li>
          <li
            className={selected === 1 ? "selected" : ""}
            onClick={() => changeItem(1)}
          >
            Teams
          </li>
          <li
            className={selected === 2 ? "selected" : ""}
            onClick={() => changeItem(2)}
          >
            Use Hint
          </li>
          <li
            className={selected === 3 ? "selected" : ""}
            onClick={() => changeItem(3)}
          >
            Change Score Manually
          </li>
        </ul>
      </div>
      <div className="right">
        {selected === 0 ? (
          <Leaderboard teams={teams} />
        ) : selected === 1 ? (
          <Teams />
        ) : selected === 2 ? (
          <Hint teams={teams} />
        ) : (
          <ChangeScore />
        )}
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.section`
  ${Section()};
  ${Flex()}
  .left {
    width: 25%;
    height: 100%;
    background: #5eaaa8;
    color: #f7f3e9;
    overflow: hidden;
    ul {
      width: 100%;
      height: 100%;
      li {
        width: 100%;
        padding: clamp(1.5rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem);
        border-bottom: 2px solid #f7f3e9;

        cursor: pointer;
        transition: transform ease 0.3s, color ease 0.1s, background ease 0.1s;
        &:hover {
          transform: scale(1.1, 1.2);
        }
      }
      .selected {
        background: #f7f3e9;
        color: #5eaaa8;
        &:hover {
          transform: scale(1);
        }
      }
    }
  }
  .right {
    width: 75%;
    height: 100%;
  }

  @media (max-width: 450px) {
    .left {
      width: 30%;
    }
    .right {
      width: 70%;
    }
  }
`;

export default Dashboard;
