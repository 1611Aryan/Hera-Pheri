import axios from "axios";

import styled from "styled-components";

import { useToken } from "../../Context/tokenProvider";
import { Flex } from "../../Style";
import { useUser } from "./../../Context/userProvider";
import Countdown from "./Countdown";
import Game from "./Game";
import Team from "./Team";
import bg from "./../../Media/sunset.jpg";

const Dashboard: React.FC = () => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/dashboard"
      : "http://localhost:5000/team/dashboard";

  const { user, setUser } = useUser();
  const { token } = useToken();

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
      setUser(res.data.team);
    } catch (err) {
      console.log(err);
    }
  };

  const start = process.env.REACT_APP_ACTIVE;
  console.log(start);

  return (
    <StyledDashboard>
      <h1>Hello {user?.teamName}</h1>
      <div className="divider"></div>
      <Team />
      {start ? <Game UpdateData={UpdateData} /> : <Countdown />}
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
  /* background-image: url(${bg});
  background-size: cover; */
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
