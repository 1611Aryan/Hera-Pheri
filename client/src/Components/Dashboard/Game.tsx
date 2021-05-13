import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../Context/userProvider";
import { Flex } from "../../Style";
import RuleBook from "./RuleBook";
import axios from "axios";
import { useToken } from "../../Context/tokenProvider";
import { useLoader } from "../../Context/loaderProvider";
import Button from "../Button";

const Game: React.FC<{
  UpdateData: () => Promise<
    | {
        data: any;
        active: boolean;
      }
    | undefined
  >;
  correctAnswer: (status: boolean, src: string | null) => void;
  setSpecialQuestion: (
    value: React.SetStateAction<{
      status: boolean;
      src: string | null;
    }>
  ) => void;
  specialQuestion: {
    status: boolean;
    src: string | null;
  };
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  platformHintUsed: (message: string) => void;
}> = ({
  UpdateData,
  correctAnswer,
  setSpecialQuestion,
  specialQuestion,
  message,
  setMessage,
  platformHintUsed,
}) => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/answer"
      : "http://localhost:5000/team/answer";

  const platformHintURL =
    process.env.NODE_ENV === "production"
      ? "/team/platformHint"
      : "http://localhost:5000/team/platformHint";

  //
  const { user, setUser } = useUser();
  const { token } = useToken();
  const progressRef = useRef<HTMLInputElement>(null);
  const { setLoader } = useLoader();
  //Sttate
  const [rulebook, setRulebook] = useState(false);
  const [input, setInput] = useState<string | null>(null);

  const [hover, setHover] = useState(false);

  //Handlers
  const questionNumber = () => {
    if (user) return user?.ques;
    return 0;
  };

  const ProgressHandler = () => {
    if (progressRef.current)
      progressRef.current.style.transform = `translateX(${
        (100 / 15) * (questionNumber() - 15)
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
    setLoader(true);
    try {
      const res = await axios.post(
        URL,
        { ans: input },
        { headers: { authToken: token } }
      );
      if (res.data.message === "Correct") {
        await UpdateData().then(res => {
          if (res) setUser(res.data);
        });
        if (res.data.special.status === "now") {
          setSpecialQuestion({ status: true, src: res.data.special.src });
          correctAnswer(true, res.data.special.src);
        } else {
          setSpecialQuestion({ status: false, src: null });
          correctAnswer(false, null);
          console.log("🤷🏻‍♂️");
        }
        setMessage("");
      } else setMessage(res.data.message);

      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
      setInput(null);
    }
  };

  const platformHintHandler = async () => {
    try {
      const res = await axios.post(
        platformHintURL,
        {},
        { headers: { authToken: token } }
      );
      setMessage(res.data.message);
      platformHintUsed(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
      console.log({ err, message: err.response.data });
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
        <div className="scoreInfo">
          <svg
            className="border"
            height="60"
            width="320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect className="shape" height="60" width="320" />
          </svg>
          <div className="text">
            Score: {user?.score}
            <FontAwesomeIcon icon={faInfoCircle} onClick={RulebookHandler} />
          </div>
        </div>

        <div className="hints">
          <p
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={() => setHover(true)}
            onTouchEnd={() => setHover(true)}
          >
            Hints Available:{" "}
            {user?.hints &&
              user?.hints.type1 + user?.hints.type2 + user?.hints.type3}
          </p>
          {hover && (
            <ul className="hintInfo">
              <li>Type1: {user?.hints.type1}</li>
              <li>Type2: {user?.hints.type2}</li>
              <li>Type3: {user?.hints.type3}</li>
            </ul>
          )}
        </div>
      </div>
      <div className="progress">
        <div className="progressBar">
          <div ref={progressRef} className="slider"></div>
        </div>
        <p>
          {questionNumber() + 1 < 16
            ? `Currently on Question Number: ${questionNumber() + 1}`
            : "Completed✨✨"}
        </p>
      </div>
      {specialQuestion.status && specialQuestion.src && (
        <div className="special">
          <img src={specialQuestion.src} alt="" />
        </div>
      )}
      <form className="answer" onSubmit={SubmitAnswer}>
        <p>{message}</p>
        <textarea
          name=""
          id=""
          onChange={ChangeHandler}
          value={input || ""}
          required
        ></textarea>
        <div className="buttonContainer">
          <Button>
            <span>Submit</span>
          </Button>
          <Button
            type="button"
            className="platformHint"
            onClick={platformHintHandler}
          >
            <span>Platform Hint</span>
          </Button>
        </div>
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
  position: relative;
  h1 {
    padding: 0;
    width: 100%;
    svg {
      font-size: clamp(4rem, 5vw, 5rem);
      color: rgba(255, 255, 255, 0.8);
      transition: transform ease 0.5s, color ease-out 0.3s;
      &:hover {
        color: rgba(255, 255, 189, 0.8);
        transform: rotate(-360deg);
      }
    }
  }
  .score {
    ${Flex(0, "space-between")}
    font-size: clamp(1rem, 3vw, 1.5rem);
    .border {
      display: none;
    }

    .text {
      line-height: clamp(1.2rem, 3vw, 1.7rem);

      z-index: 4;
      svg {
        margin-left: 0.5rem;
        cursor: pointer;
        &:hover {
          color: #5c5c5c;
        }
      }
    }
    @media (min-width: 950px) {
      .scoreInfo {
        position: relative;
        width: 320px;
        .text {
          position: absolute;
          top: 50%;
          left: 5%;
          transform: translate(0%, -50%);
        }
        .border {
          display: block;
        }
        .shape {
          stroke-dasharray: 155 535;
          stroke-dashoffset: -530;
          stroke-width: 8px;
          fill: transparent;
          stroke: #ffffff;
          border-bottom: 5px solid black;
          transition: stroke-width 1s, stroke-dashoffset 1s, stroke-dasharray 1s;
          z-index: 2;
        }
        &:hover .shape {
          //stroke-width: 2px;
          stroke-dashoffset: 0;
          stroke-dasharray: 760;
        }
      }
    }
  }
  .hints {
    position: relative;
  }
  .hintInfo {
    position: absolute;
    top: 100%;
    right: 0%;
    margin-top: clamp(0.5rem, 1vw, 1rem);
    width: 80%;
    background: rgba(63, 63, 63, 0.4);
    list-style-type: none;
    border-radius: 10px;
    font-size: 0.7em;
    padding: 0.5rem clamp(0.5rem, 3vw, 1rem);
    backdrop-filter: blur(2px);
    &::before {
      content: "";
      position: absolute;
      top: -0.5rem;
      right: 1.5rem;
      width: 0;
      height: 0;
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
      border-bottom: 0.5rem solid rgba(63, 63, 63, 0.4);
      backdrop-filter: blur(2px);
    }
  }

  .progress {
    .progressBar {
      width: 50%;
      height: 20px;
      background: rgba(108, 108, 108, 0.6);
      border-radius: 10px;
      overflow: hidden;
      .slider {
        transition: transform ease-out 0.2s;
        transform: translateX(-100%);
        width: 100%;
        height: 100%;
        background: #ffd1f0;
      }
    }
    p {
      padding: 1.5rem 0 0 0;
    }
  }

  .special {
    z-index: -1;
    position: absolute;
    top: 30%;
    right: 5%;
    width: 30%;
    height: 30%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    @media (max-width: 450px) {
      width: 40%;
      height: 20%;
    }
  }

  form {
    width: 50%;
    height: 45%;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ${Flex(1)}
    p {
      height: 2rem;
      font-size: 1.5rem;
      color: red;
      font-weight: 900;
      width: 100%;
    }
    textarea {
      width: 100%;
      flex: 1;
      background: rgba(255, 255, 255, 0.8);
      border: 0;
      border-bottom: 2px solid teal;
      border-radius: 10px;
      font-size: 1rem;
      padding: 0.6rem;
      resize: none;
      transition: background ease-out 0.3s;
      &:focus,
      &:hover {
        outline: 0;

        background: rgba(255, 255, 189, 0.8);
      }
    }
    .buttonContainer {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .platformHint {
        .clip {
          background: coral;
        }
      }
    }
    button {
      margin-top: 2rem;
      background: #fff;
      border-radius: 10px;
      font-size: 1.25rem;
      padding: 0.8rem 1.5rem;
      align-self: center;
      span {
        z-index: 2;
        color: #efefef;
      }
      &:hover {
        span {
          color: black;
        }
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
