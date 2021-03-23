import styled from "styled-components";
import { Flex, BgImg, Overlay, Section } from "../../Style";
import bg from "./../../Media/registerBg.jpg";

const JoinTeam: React.FC = () => {
  return (
    <StyledJoinTeam>
      <picture>
        <source srcSet={bg} type="image/jpg" />
        <img src={bg} alt="colors" />
      </picture>
      <div className="overlay"></div>
      <h1>Join Team</h1>
    </StyledJoinTeam>
  );
};

const StyledJoinTeam = styled.section`
  ${Section()}
  font-family: var(--content);

  position: relative;
  ${Flex()};
  picture {
    ${BgImg()};
    z-index: -1;
  }
  .overlay {
    ${Overlay(5)};
    z-index: -1;
  }
`;

export default JoinTeam;
