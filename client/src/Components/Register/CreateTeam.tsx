import styled from "styled-components";
import { Flex, BgImg, Overlay, Section } from "../../Style";
import bg from "./../../Media/registerBg.jpg";

const CreateTeam: React.FC = () => {
  return (
    <StyledCreateTeam>
      <picture>
        <source srcSet={bg} type="image/jpg" />
        <img src={bg} alt="colors" />
      </picture>
      <div className="overlay"></div>
      <form>
        <label htmlFor="teamName">Team Name: </label>
        <input type="text" name="teamName" required autoFocus />
        <label htmlFor="teamLeader">Name: </label>
        <input type="text" name="teamLeader" required />
        <label htmlFor="phone">Phone Number: </label>
        <input type="text" name="phone" required />
        <button>Create Team</button>
      </form>
    </StyledCreateTeam>
  );
};

const StyledCreateTeam = styled.section`
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
  form {
    width: 40vw;
    height: 60vh;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    backdrop-filter: blur(5px);
    padding: 1rem 2rem;
    ${Flex(1, "space-evenly", "flex-start")};
    input {
      width: 100%;
      padding: 0.5rem;
      border-radius: 5px;
      border: 0;
    }
    button {
      padding: 0.5rem;
      border-radius: 5px;
      border: 0;
    }
  }
`;

export default CreateTeam;
