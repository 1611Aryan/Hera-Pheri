import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Section } from "../../Style";

const CreateTeam: React.FC = () => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/create"
      : "http://localhost:5000/team/create";

  //State
  const [input, setInput] = useState({
    team: "",
    name: "",
    email: "",
    number: 0,
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  //Handlers
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL, input);
      console.log(res.data);
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  return (
    <StyledCreateTeam>
      <div className="column left">
        <h1>
          <span>C</span>
          <span>R</span>
          <span>E</span>
          <span>A</span>
          <span>T</span>
          <span>E</span>
        </h1>
      </div>
      <div className="column right">
        <form onSubmit={submitHandler}>
          {message && <p className="err">{message}</p>}
          <div className="row">
            <div>
              <label htmlFor="team">Team Name: </label>
              <input
                type="text"
                name="team"
                required
                autoFocus
                onChange={changeHandler}
              />
            </div>
            <div>
              {" "}
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                required
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="fieldContainer">
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" required onChange={changeHandler} />
          </div>
          <div className="fieldContainer">
            <label htmlFor="number">Phone Number: </label>
            <input
              type="text"
              name="number"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="fieldContainer">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              required
            />
          </div>
          <button>Create Team</button>
        </form>
      </div>
    </StyledCreateTeam>
  );
};

const StyledCreateTeam = styled.section`
  ${Section()}
  font-family: var(--content);
  background: transparent;
  color: white;
  position: relative;
  ${Flex()};
  .column {
    flex: 0.5;
    position: relative;
    z-index: 3;
  }

  .left {
    ${Flex()}
    h1 {
      ${Flex(1)};
      font-size: 5rem;
      line-height: 1;
      color: #2c2c2c;
    }
  }
  form {
    width: 40vw;
    height: 60vh;
    background: rgba(158, 158, 158, 0.4);
    border-radius: 20px;
    backdrop-filter: blur(5px);
    padding: 1rem 2rem;
    ${Flex(1, "space-evenly", "flex-start")};
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
    .err {
      color: red;
      font-size: 0.8rem;
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
      padding: 0.8rem;
      border-radius: 5px;
      border: 0;
    }
  }
`;

export default CreateTeam;
