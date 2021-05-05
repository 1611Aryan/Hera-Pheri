import axios from "axios";

import styled from "styled-components";
import io from "socket.io-client";

import { useToken } from "../../Context/tokenProvider";
import { Flex } from "../../Style";
import { useUser } from "./../../Context/userProvider";
import Countdown from "./Countdown";
import Game from "./Game";
import Team from "./Team";

import { useEffect, useState } from "react";

let socket: SocketIOClient.Socket;

const ENDPOINT =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

const Dashboard: React.FC = () => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/dashboard"
      : "http://localhost:5000/team/dashboard";

  const { user, setUser } = useUser();
  const { token } = useToken();
  const [start, setStart] = useState(false);
  const [specialQuestion, setSpecialQuestion] = useState<{
    status: boolean;
    src: string | null;
  }>({
    status: false,
    src: null,
  });

  const toBool = (s: string) => {
    return s === "true" ? true : false;
  };

  const UpdateData = async () => {
    try {
      const res = await axios.post(
        URL,
        {},
        {
          headers: {
            authToken: token,
          },
        }
      );

      return { data: res.data.team, active: toBool(res.data.active) };
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Updated");
    }
  };

  //Connection
  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket"],
      query: { room: user?.joinCode },
    });
    socket.emit("login", user?.joinCode);
    return () => {
      socket.disconnect();
    };
  }, [user?.joinCode]);

  //Join
  useEffect(() => {
    socket.on(
      "join",
      (joinedUser: { name: string; email: string; number: string }) =>
        setUser(user => {
          if (user) {
            console.log("Added");
            const mem = user.members;
            return { ...user, members: [...mem, joinedUser] };
          } else return null;
        })
    );
  }, [setUser]);

  useEffect(() => {
    socket.on("hint", (hintUsed: string) => {
      setUser(user => {
        if (user) {
          console.log("Hint Used");
          const hints = user.hints;
          return { ...user, hints: { ...hints, [hintUsed]: 0 } };
        } else return null;
      });
    });
  }, [setUser]);

  useEffect(() => {
    console.log("answered");
    socket.on("answer", async (payload: { status: boolean; src: string }) => {
      console.log({ a: 1 });
      await UpdateData().then(res => {
        if (res) setUser(res.data);
      });
      setSpecialQuestion({ status: payload.status, src: payload.src });
    });
  }, [setUser]);

  const correctAnswer = (status: boolean, src: string | null) => {
    console.log("asd");
    if (user) socket.emit("answer", { room: user.joinCode, status, src });
  };

  return (
    <StyledDashboard>
      <h1>Hello {user?.teamName}</h1>
      <div className="divider"></div>
      <Team UpdateData={UpdateData} setStart={setStart} />
      {start ? (
        <Game
          UpdateData={UpdateData}
          correctAnswer={correctAnswer}
          setSpecialQuestion={setSpecialQuestion}
          specialQuestion={specialQuestion}
        />
      ) : (
        <Countdown />
      )}
    </StyledDashboard>
  );
};

const StyledDashboard = styled.section`
  width: 100vw;
  height: calc(200vh - var(--navHeight));
  overflow: hidden;
  ${Flex(1, "flex-start", "flex-start")}
  font-family: var(--content);
  background: transparent;
  h1 {
    font-weight: 500;
    font-size: clamp(1.15rem, 3vw, 1.25rem);
    width: 100%;
    padding: 1rem 1rem 0 1rem;
  }
  .divider {
    width: 100%;
    height: 2px;
    background: #fff;
    margin: 1rem;
  }
`;

export default Dashboard;
