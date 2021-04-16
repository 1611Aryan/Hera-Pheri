import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../Context/userProvider";
import { Flex } from "../../Style";
import RuleBook from "./RuleBook";
import axios from "axios";
import { useToken } from "../../Context/tokenProvider";

const Game: React.FC<{ UpdateData: () => Promise<void> }> = ({
  UpdateData,
}) => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/answer"
      : "http://localhost:5000/team/answer";

  //
  const { user } = useUser();
  const { token } = useToken();
  const progressRef = useRef<HTMLInputElement>(null);

  //Sttate
  const [rulebook, setRulebook] = useState(false);
  const [input, setInput] = useState<string | null>(null);
  const [message, setMessage] = useState<string>(" ");

  //Handlers
  const questionNumber = () => {
    if (user)
      for (let i = 0; i < 15; i++) {
        if (user?.answers[i] === false) return i;
      }
    return 14;
  };

  const ProgressHandler = () => {
    if (progressRef.current)
      progressRef.current.style.transform = `translateX(${
        (50 / 7) * (questionNumber() - 14)
      }%)`;
  };

  const RulebookHandler = () => {
    setRulebook(!rulebook);
  };

  const ChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const SubmitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput(null);
    try {
      const res = await axios.post(
        URL,
        { ques: questionNumber(), ans: input },
        { headers: { authToken: token } }
      );
      if (res.data === "Correct") UpdateData();
      else setMessage(res.data);
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.log(err);
    }
  };

  //Component did mount
  useEffect(() => {
    ProgressHandler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
      <form className="answer" onSubmit={SubmitAnswer}>
        <p>{message}</p>
        <textarea
          name=""
          id=""
          onChange={ChangeHandler}
          value={input || ""}
          required
        ></textarea>
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
  padding: 1rem;
  h1 {
    padding: 0;
    width: 100%;
    svg {
      font-size: clamp(4rem, 5vw, 5rem);
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
    p {
      height: 1.2rem;
    }
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

  @media (max-width: 650px) {
    .progress {
      .progressBar {
        width: 100%;
      }
    }
    form {
      width: 80%;
    }
  }
  @media (max-width: 450px) {
    form {
      width: 100%;
    }
  }
`;

export default Game;
