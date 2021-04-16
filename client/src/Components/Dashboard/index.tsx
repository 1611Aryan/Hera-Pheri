import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import { useToken } from "../../Context/tokenProvider";
import { Flex } from "../../Style";
import { useUser } from "./../../Context/userProvider";
import Game from "./Game";
import Team from "./Team";

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

  useEffect(() => {
    UpdateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledDashboard>
      <h1>Hello {user?.teamName}</h1>
      <div className="divider"></div>
      <Team />
      <Game UpdateData={UpdateData} />
    </StyledDashboard>
  );
};

const StyledDashboard = styled.section`
  width: 100vw;
  height: calc(200vh - var(--navHeight));
  overflow: hidden;
  ${Flex(1, "flex-start", "flex-start")}
  font-family: var(--content);
  background: #d0dffc;

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
