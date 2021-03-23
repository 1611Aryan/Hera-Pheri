import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Flex, BgImg, Overlay, Section } from "../../Style";
import bg from "./../../Media/registerBg.jpg";

const Register: React.FC = () => {
  //
  const history = useHistory();

  //handlers
  const clickHandler = (location: string) => {
    history.push(location);
  };

  return (
    <StyledRegister>
      <picture>
        <source srcSet={bg} type="image/jpg" />
        <img src={bg} alt="colors" />
      </picture>
      <div className="overlay"></div>
      <StyledRegisterCard onClick={() => clickHandler("/join")}>
        <FontAwesomeIcon icon={faUsers} />
        <h3>Join a Team</h3>
      </StyledRegisterCard>
      <StyledRegisterCard onClick={() => clickHandler("/create")}>
        <FontAwesomeIcon icon={faPlus} />
        <h3>Create a Team</h3>
      </StyledRegisterCard>
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
  ${Section()}
  background: linear-gradient(
    109.6deg,
    rgb(223, 234, 247) 11.2%,
    rgb(244, 248, 252) 91.1%
  );
  font-family: var(--content);
  position: relative;
  ${Flex(0, "space-evenly")};
  picture {
    ${BgImg()};
  }
  .overlay {
    ${Overlay(5)};
  }
`;

const StyledRegisterCard = styled.div`
  width: 25%;
  height: 60%;
  z-index: 2;
  background: linear-gradient(
    109.6deg,
    rgb(255, 179, 71) 11.2%,
    rgb(255, 155, 57) 91.1%
  );
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  cursor: pointer;
  svg {
    font-size: 5rem;
  }
  h3 {
    font-size: 2rem;
  }
`;

export default Register;
