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
      <FontAwesomeIcon icon={faTimes} onClick={Close} />

      <h1>Rulebook</h1>
      <ol>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Nulla et justo et risus dictum vehicula.</li>
        <li>In sed nisl at tortor ullamcorper euismod bibendum vitae arcu.</li>
        <li>
          Aenean molestie sapien ut lectus interdum, ac accumsan nisl ornare.
        </li>
        <li>Etiam ultrices lectus ac egestas maximus.</li>
        <li>Fusce id nisl a leo interdum mollis.</li>
        <li>
          Nullam sit amet tellus tincidunt, ultricies urna dapibus, pretium
          libero.
        </li>
        <li>In eleifend odio pulvinar urna condimentum rutrum.</li>
        <li>
          Sed mollis nibh vitae lacus ultrices, et sollicitudin purus rutrum.
        </li>
        <li>Suspendisse quis nisi bibendum, pretium lectus in, eleifend mi.</li>
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
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  padding: 2rem;
  color: white;
  ${Flex(1, "flex-start", "flex-start")}
  svg {
    position: absolute;
    top: 1rem;
    right: 2rem;
    font-size: 2rem;
    cursor: pointer;
  }
  h1 {
    font-size: 3rem;
    font-weight: 900;
  }
  ol {
    flex: 1;
    list-style-position: inside;
    background: rgba(179, 204, 253, 0.6);
    color: black;
    width: 100%;
    height: auto;
    padding: 1rem 0;
    border-radius: 5px;
    overflow: hidden auto;
    li {
      font-size: 1rem;
    }
    li + li {
      margin-top: 1rem;
    }
  }
`;

export default RuleBook;
