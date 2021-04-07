import styled from "styled-components";
import { Flex } from "../../Style";
import { useUser } from "./../../Context/userProvider";
import Game from "./Game";
import Team from "./Team";

const Dashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <StyledDashboard>
      <h1>Hello {user?.teamName}</h1>
      <div className="divider"></div>
      <Team />
      <Game />
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
  padding: 1rem;
  h1 {
    font-weight: 500;
    font-size: clamp(1.15rem, 3vw, 1.25rem);
    margin-bottom: 1rem;
  }
  .divider {
    width: 100%;
    height: 2px;
    background: #fff;
  }
`;

export default Dashboard;
