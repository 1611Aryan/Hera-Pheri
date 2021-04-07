import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../Context/userProvider";
import { Flex } from "../../Style";
import RuleBook from "./RuleBook";

const Game = () => {
  //
  const { user } = useUser();
  const progressRef = useRef<HTMLInputElement>(null);
  const [rulebook, setRulebook] = useState(false);
  //Handlers
  const questionNumber = () => {
    if (user)
      for (let i = 0; i < 15; i++) {
        if (user?.answers[i] === false) return i;
      }
    return 0;
  };

  const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const ProgressHandler = () => {
    console.log(1);
    if (progressRef.current)
      progressRef.current.style.transform = `translateX(${
        (50 / 7) * (questionNumber() - 14)
      }%)`;
  };

  const RulebookHandler = () => {
    setRulebook(!rulebook);
  };

  //Component did mount
  useEffect(() => {
    ProgressHandler();
  }, []);

  return (
    <StyledGame>
      <h1>
        <FontAwesomeIcon icon={faTrophy} />
      </h1>
      <div className="score">
        <div>
          Score: {user?.score}
          <FontAwesomeIcon icon={faInfoCircle} onClick={RulebookHandler} />
        </div>
        <div>Hints Available: {user?.hints}</div>
      </div>
      <div className="progress">
        <div className="progressBar">
          <div ref={progressRef} className="slider"></div>
        </div>
        <p> Currently on Question Number: {questionNumber() + 1}</p>
      </div>
      <form className="answer" onSubmit={SubmitHandler}>
        <textarea name="" id=""></textarea>
        <button>Submit Answer</button>
      </form>
      {rulebook && <RuleBook setRulebook={setRulebook} />}
    </StyledGame>
  );
};

const StyledGame = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h1 {
    svg {
      font-size: clamp(3rem, 5vw, 5rem);
      color: #ffffff;
      transition: transform ease 0.5s;
      &:hover {
        transform: rotate(-360deg);
      }
    }
  }
  .score {
    font-size: clamp(1rem, 3vw, 1.5rem);
    ${Flex(0, "space-between")}
    svg {
      margin-left: 0.5rem;
      cursor: pointer;
      &:hover {
        color: #5c5c5c;
      }
    }
  }
  .progress {
    .progressBar {
      width: 50%;
      height: 20px;
      background: #6c6c6c;
      border-radius: 10px;
      overflow: hidden;
      .slider {
        transition: transform ease-out 0.2s;
        transform: translateX(-100%);
        width: 100%;
        height: 100%;
        background: teal;
      }
    }
    p {
      padding: 1.5rem 0 0 0;
    }
  }

  form {
    width: 50%;
    height: 45%;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    textarea {
      width: 100%;
      flex: 1;
      background: #ffffff;
      border: 0;
      border-bottom: 2px solid teal;
      border-radius: 10px;
      font-size: 1rem;
      padding: 0.6rem;
      resize: none;
      &:focus,
      &:hover {
        outline: 0;
        background: #ffffbd;
      }
    }
    button {
      margin-top: 2rem;
      background: #ffffff;
      border-radius: 10px;
      font-size: 1rem;
      padding: 0.6rem;
      align-self: center;
      border: 0;
      border-bottom: 2px solid teal;

      &:focus,
      &:hover {
        outline: 0;
        background: #ffffbd;
      }
    }
  }
`;

export default Game;
