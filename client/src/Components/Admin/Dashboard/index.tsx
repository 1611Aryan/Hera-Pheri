import styled from "styled-components";
import { useEffect, useState } from "react";
import { Flex, Section } from "../../../Style";
import Leaderboard from "../LeaderBoard/LeaderBoard";
import Hint from "../Hints/Hint";
import Teams from "../Teams";
import io from "socket.io-client";

let socket: SocketIOClient.Socket;
const ENDPOINT =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

const Dashboard = () => {
  const [selected, setSelected] = useState(0);

  const changeItem = (i: number) => {
    setSelected(i);
  };

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket"],
    });

    return () => {
      socket.disconnect();
    };
  });

  const activateHint = (team: { code: string; hintUsed: string }) => {
    socket.emit("hint", team);
  };

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
        </ul>
      </div>
      <div className="right">
        {selected === 0 ? (
          <Leaderboard />
        ) : selected === 1 ? (
          <Teams />
        ) : (
          <Hint activateHint={activateHint} />
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
