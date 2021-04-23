import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Section } from "../../Style";
import { useLoader } from "../../Context/loaderProvider";

const JoinTeam: React.FC = () => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/join"
      : "http://localhost:5000/team/join";

  //State
  const [input, setInput] = useState({
    code: "",
    name: "",
    email: "",
    number: 0,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState(false);

  //
  const { code } = useParams<{ code: string }>();
  const { setLoader } = useLoader();

  //
  useEffect(() => {
    if (code) {
      setInput({ ...input, code });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Handlers

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (input.code.length !== 8) {
        return setMessage("Incorrect Team Code");
      }
      if (input.number.toString().length < 10) {
        return setMessage("Enter a Valid Phone Number");
      }
      const res = await axios.post(URL, input);
      console.log(res.data);
      setResult(true);
      setMessage("Team Joined. Login to access the Dashboard");
    } catch (err) {
      setResult(false);
      setMessage(err.response.data);
    } finally {
      setLoader(false);
    }
  };

  return (
    <StyledJoinTeam>
      <div className="column left">
        <h1>
          <span>J</span>
          <span>O</span>
          <span>I</span>
          <span>N</span>
        </h1>
      </div>
      <div className="column right">
        <form onSubmit={submitHandler}>
          {message && <p className={result ? "success" : "err"}>{message}</p>}
          <div className="row">
            <div className="fieldContainer">
              <label htmlFor="code">Team Code: </label>
              <input
                type="text"
                name="code"
                required
                autoFocus
                onChange={changeHandler}
                value={input.code}
              />
            </div>
            <div className="fieldContainer">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                required
                onChange={changeHandler}
                value={input.name}
              />
            </div>
          </div>

          <div className="fieldContainer">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              required
              onChange={changeHandler}
              value={input.email}
            />
          </div>
          <div className="fieldContainer">
            <label htmlFor="number">Phone Number: </label>
            <input
              type="text"
              name="number"
              required
              onChange={changeHandler}
              value={input.number !== 0 ? input.number : ""}
            />
          </div>
          <button>Join Team</button>
        </form>
      </div>
    </StyledJoinTeam>
  );
};

const StyledJoinTeam = styled.section`
  ${Section()}
  background: transparent;
  font-family: var(--content);
  position: relative;
  ${Flex()}
  color: white;
  .column {
    flex: 0.5;
    position: relative;
    z-index: 3;
  }
  .left {
    ${Flex()}
    h1 {
      ${Flex(1)};
      font-family: var(--heading);
      font-size: clamp(2.5rem, 5vw, 5rem);
      color: #2c2c2c;
    }
  }
  form {
    width: 40vw;
    height: 60vh;
    background: rgba(74, 173, 157, 0.7);
    border-radius: 20px;
    backdrop-filter: blur(2px);
    padding: 1rem clamp(1rem, 3vw, 2rem);
    ${Flex(1, "space-evenly", "flex-start")};
    color: black;

    box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.1),
      inset -2px -2px 10px rgba(0, 0, 0, 0.1);
    .err {
      color: red;
      font-size: 0.8rem;
    }
    .success {
      color: green;
      font-size: 0.8rem;
    }
    .row {
      ${Flex(0, "space-between")};
      width: 100%;
      div {
        flex: 0.47;
      }
    }
    .fieldContainer {
      width: 100%;
    }
    label {
      font-size: 1.2rem;
      color: white;
    }
    input {
      margin-top: 1rem;
      width: 100%;
      padding: 0.6rem;
      border-radius: 5px;
      border: 0;
      background: rgba(255, 255, 255, 0.8);
      &:focus {
        outline: 0;
      }
    }
    button {
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.8);
      color: #4e4e4e;
      padding: 0.6rem;
      border-radius: 5px;
      border: 0;
      transition: all ease-out 0.1s;
      @media (hover: hover) {
        &:hover {
          background: rgba(255, 255, 255);
        }
      }
    }
  }
  @media (max-width: 650px) {
    flex-direction: column;
    justify-content: space-evenly;
    .left {
      width: 100%;
      flex: 0 !important;
      justify-content: flex-start;
      padding: 0 2rem;
      h1 {
        flex-direction: row;
        color: #494949;
      }
    }
    .right {
      flex: 0;
      width: 100%;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0 2rem;
    }
    form {
      width: 100%;
    }
  }
`;

export default JoinTeam;
