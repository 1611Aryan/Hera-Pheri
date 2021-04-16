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
          You all are requested to follow all IIChE pages and login to the site.
        </li>
        <li>
          This game involves puzzles and hints After solving them you will be
          able to reach the other riddle.
        </li>
        <li>
          All the riddles are scattered in internet you have to reach it
          yourself.
        </li>
        <li>There are only 5 social media to be used in this game</li>
        <li>Only official pages are used in these media.</li>
        <li>
          First hint will be public and will be provided by your respective
          supervisor.
        </li>
        <li>
          After solving try reaching the second riddle and paste the link of
          that post to your leaderboard to see the score.
        </li>
        <li>Repeat for other riddles and reach the final page.</li>
        <li>
          Score is time based as fast as you solve you will be awarded maximum
          marks.
        </li>
        <li>First one to reach the final page will be announce as winner.</li>
        <li>
          If no team reaches the final page the team with maximum points will be
          announced winner.
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
  backdrop-filter: blur(3px);
  padding: clamp(1rem, 3vw, 2rem);
  color: white;
  ${Flex(1, "space-between", "space-between")}

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
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

  @media (max-width: 450px) {
  }
`;

export default RuleBook;
