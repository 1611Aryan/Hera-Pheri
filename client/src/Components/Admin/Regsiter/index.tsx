import axios from "axios";
import { useState } from "react";

import styled from "styled-components";

import { Flex, Section } from "../../../Style";

const Regsiter: React.FC = () => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/adminserver/"
      : "http://localhost:5000/adminserver/";

  //State
  const [input, setInput] = useState({
    code: "",
    name: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  //Handlers
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.code.length !== 8) return setMessage("Incorrect Code");
    try {
      const res = await axios.post(URL, input);
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response.data);
      console.log(err);
    }
  };

  return (
    <StyledRegister>
      <form onSubmit={submitHandler}>
        <h1>Admin Register</h1>
        {message && <p className="err">{message}</p>}
        <label htmlFor="code">Code: </label>
        <input type="text" name="code" onChange={changeHandler} />
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={changeHandler} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={changeHandler} />
        <button>Register</button>
      </form>
    </StyledRegister>
  );
};

const StyledRegister = styled.section`
  ${Section()}
  ${Flex()};
  background: linear-gradient(to right, #fff, #ddd);

  form {
    width: 40vw;
    height: 60vh;
    background: teal;
    border-radius: 20px;
    padding: 1rem clamp(0.5rem, 3vw, 2rem);
    ${Flex(1, "space-evenly", "flex-start")};
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3),
      5px -5px 10px rgba(0, 0, 0, 0.3);
    h1 {
      font-family: var(--heading);
      font-size: 2rem;
      color: white;
    }
    .err {
      color: red;
      font-size: clamp(0.6, 2vw, 0.8rem);
    }
    label {
      color: white;
      font-size: clamp(1rem, 3vw, 1.2rem);
    }
    input {
      width: 100%;
      padding: clamp(0.4rem, 2vw, 0.6rem);
      border-radius: 10px;
      border: 0;
      border-bottom: 3px solid #f5f23d;
      background: linear-gradient(to left, #fff, #eee);
      &:focus {
        outline: 0;
      }
    }
    button {
      font-size: clamp(0.8rem, 2vw, 1rem);
      padding: 0.6rem clamp(1.3rem, 3vw, 2rem);
      border-radius: 5px;
      background: linear-gradient(to left, #fff, #eee);
      border: 0;
      border-bottom: 3px solid #f5f23d;
      &:focus {
        outline: 0;
      }
    }
  }
  @media (max-width: 650px) {
    form {
      width: 60%;
    }
  }
  @media (max-width: 450px) {
    form {
      width: 80%;
    }
  }
`;

export default Regsiter;
