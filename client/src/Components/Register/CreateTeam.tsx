import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Flex, BgImg, Overlay, Section } from "../../Style";
import bg from "./../../Media/bokeh1.jpg";

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
      <picture>
        <source srcSet={bg} type="image/jpg" />
        <img src={bg} alt="colors" />
      </picture>
      <div className="overlay"></div>
      <form onSubmit={submitHandler}>
        {message && <p className="err">{message}</p>}
        <label htmlFor="team">Team Name: </label>
        <input
          type="text"
          name="team"
          required
          autoFocus
          onChange={changeHandler}
        />
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" required onChange={changeHandler} />
        <label htmlFor="email">Email: </label>
        <input type="text" name="email" required onChange={changeHandler} />
        <label htmlFor="number">Phone Number: </label>
        <input type="text" name="number" required onChange={changeHandler} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          required
        />
        <button>Create Team</button>
      </form>
    </StyledCreateTeam>
  );
};

const StyledCreateTeam = styled.section`
  ${Section()}
  font-family: var(--content);
  color: white;
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
    .err {
      color: red;
      font-size: 0.8rem;
    }
    label {
      font-size: 1.2rem;
    }
    input {
      width: 100%;
      padding: 0.6rem;
      border-radius: 5px;
      border: 0;
      &:focus {
        outline: 0;
      }
    }
    button {
      padding: 0.6rem;
      border-radius: 5px;
      border: 0;
    }
  }
`;

export default CreateTeam;
