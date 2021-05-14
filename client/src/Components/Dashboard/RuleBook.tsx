import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Flex } from "../../Style";

const RuleBook: React.FC<{
  setRulebook: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setRulebook }) => {
  const Close = () => {
    setRulebook(status => !status);
  };

  return (
    <StyledRulebook>
      <h1>
        <span>Rulebook</span>
        <FontAwesomeIcon icon={faTimes} onClick={Close} />
      </h1>
      <ol>
        <li>
          You all have to follow all IIChE social media handles to progress
          further into the game and log in to the site.
        </li>
        <li>
          The game involves puzzles and hints After solving each riddle you will
          be able to progress to the next riddle.
        </li>
        <li>
          Answers to all the riddles are scattered on the internet, you have to
          search for them by surfing different social medias
        </li>
        <li>There are only 5 social media to be used in this game</li>
        <li>Only official verified pages are used in these media.</li>
        <li>
          Your respective supervisors will provide you with all the questions
          and the Hints.
        </li>
        <li>
          After solving a question try reaching the answer to the riddle and
          type the date of that post in the format '13 May' on the site to see
          the score.
        </li>
        <li>
          The score is time-based. The faster you solve more points you'll
          Achieve
        </li>
      </ol>
    </StyledRulebook>
  );
};

const StyledRulebook = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  padding: clamp(1rem, 3vw, 2rem);
  color: white;
  ${Flex(1, "space-evenly", "space-between")}

  h1 {
    font-size: clamp(2rem, 5vw, 3rem) !important;
    font-weight: 900;
    ${Flex(0, "space-between", "align-items")}
    svg {
      font-size: clamp(2rem, 5vw, 3rem);
      cursor: pointer;
      &:hover {
        color: #ff5555;
      }
    }
  }
  ol {
    width: 100%;
    height: 80vh;
    list-style-position: inside;
    background: rgba(18, 28, 49, 0.8);
    backdrop-filter: blur(1px);
    padding: 1rem;
    border-radius: 10px;
    overflow: hidden auto;
    border: 5px solid white;
    ${Flex(1, "space-evenly", "flex-start")}
    li {
      font-size: clamp(0.9rem, 3vw, 1.2rem);

      font-weight: 200;
    }
    li + li {
      margin-top: 1rem;
    }
  }
`;

export default RuleBook;
