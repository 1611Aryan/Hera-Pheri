import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Flex, BgImg, Overlay, Section } from "../../Style";
import bg from "./../../Media/svg.png";

const Register: React.FC = () => {
  //
  const history = useHistory();

  //handlers
  const clickHandler = (location: string) => {
    history.push(location);
  };

  return (
    <StyledRegister>
      <StyledRegisterCard onClick={() => clickHandler("/join")}>
        <FontAwesomeIcon icon={faUsers} />
        <h3>Join a Team</h3>
      </StyledRegisterCard>
      <StyledRegisterCard onClick={() => clickHandler("/create")}>
        <FontAwesomeIcon icon={faPlus} />
        <h3>Create a Team</h3>
      </StyledRegisterCard>

      <img className="footer" src={bg} alt="waves " />
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
  ${Section()}
  background: linear-gradient(to right, #fff, #ddd);
  font-family: var(--content);
  position: relative;
  ${Flex(0, "space-evenly")};
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
`;

const StyledRegisterCard = styled.div`
  width: 25%;
  height: 60%;
  z-index: 2;

  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(1px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #4d4d4d;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  //transform: rotate(-5deg) skew(-7deg, 6.5deg);

  &:after {
    content: "";
    position: absolute;
    top: 11px;
    right: -9px;
    height: calc(100% - 1px);
    width: 10px;
    background: rgba(218, 217, 217, 0.5);
    backdrop-filter: blur(5px);
    transform-origin: right;
    transform: skew(0, 49deg);
  }
  &:before {
    content: "";
    position: absolute;
    bottom: -9px;
    left: 0;
    height: 10px;
    width: 100%;
    background: rgba(218, 217, 217, 0.5);
    backdrop-filter: blur(5px);
    transform: skew(41deg, 0);
    transform-origin: top;
  }
  svg {
    font-size: 5rem;
  }
  h3 {
    font-size: 2rem;
  }
`;

export default Register;
