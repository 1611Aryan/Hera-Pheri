import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

import bg from "./../../Media/bokeh2.jpg";
import { Section, BgImg, Overlay, Flex } from "../../Style";
import { useUser } from "../../Context/userProvider";

const Login: React.FC = () => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/login"
      : "http://localhost:5000/team/login";

  //State
  const [input, setInput] = useState({
    team: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  //
  const history = useHistory();
  const { setUser } = useUser();

  //Handlers
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL, input);
      if (res.data.auth) {
        setUser(res.data.team);
        history.push("/dashboard");
      }
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  return (
    <StyledLogin>
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          required
        />
        <button>Login</button>
      </form>
    </StyledLogin>
  );
};

const StyledLogin = styled.section`
  position: relative;
  ${Section()}
  picture {
    ${BgImg()};
  }
  .overlay {
    ${Overlay(5)};
  }
  font-family: var(--content);
  ${Flex()};
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
      padding: 0.6rem 0.8rem;
      border-radius: 5px;
      border: 0;
    }
  }
`;

export default Login;
