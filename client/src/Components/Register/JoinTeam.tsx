import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Section } from "../../Style";

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
    number: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  //
  const { code } = useParams<{ code: string }>();

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
    if (input.code.length !== 8) {
      setMessage("Incorrect Team Code");
      return;
    }
    try {
      const res = await axios.post(URL, input);
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response.data);
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
          {message && <p className="err">{message}</p>}
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
              type="text"
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
              value={input.number}
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
      font-size: clamp(2.5rem, 5vw, 5rem);
      color: #2c2c2c;
    }
  }
  form {
    width: 40vw;
    height: 60vh;
    background: rgba(158, 158, 158, 0.4);
    border-radius: 20px;
    backdrop-filter: blur(5px);
    padding: 1rem clamp(1rem, 3vw, 2rem);
    ${Flex(1, "space-evenly", "flex-start")};
    .err {
      color: red;
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
    }
    input {
      margin-top: 1rem;
      width: 100%;
      padding: 0.6rem;
      border-radius: 5px;
      border: 0;
      &:focus {
        outline: 0;
      }
    }
    button {
      font-size: 1rem;
      background: white;
      color: #2c2c2c;
      padding: 0.6rem;
      border-radius: 5px;
      border: 0;
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
      background: rgba(116, 116, 116, 0.4);
    }
  }
`;

export default JoinTeam;
