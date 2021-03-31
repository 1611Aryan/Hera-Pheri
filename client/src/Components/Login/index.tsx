import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

import bg from "./../../Media/bokeh1.jpg";
import { Section, Flex } from "../../Style";
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
      <div className="column left">
        <svg
          width="401"
          height="299"
          viewBox="0 0 401 299"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M323.387 11.5516C363.05 27.7996 400.496 63.9885 400.989 101.408C401.728 139.074 365.514 177.971 336.444 214.16C307.374 250.595 285.448 284.322 255.392 294.908C225.337 305.74 187.152 293.185 150.198 279.152C113.245 264.874 77.2771 249.118 46.729 219.084C16.4272 189.049 -8.70115 144.983 2.87758 112.24C14.4563 79.498 62.7421 58.0801 101.666 41.5859C140.591 25.3378 169.907 13.7672 205.875 6.38173C241.597 -1.24993 283.723 -4.69649 323.387 11.5516Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="-9.5"
              y1="150"
              x2="551"
              y2="150"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#134E5E" />
              <stop offset="1" stop-color="#71B280" />
            </linearGradient>
          </defs>
        </svg>

        <h1>Login</h1>
      </div>
      <div className="column right">
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
      </div>
    </StyledLogin>
  );
};

const StyledLogin = styled.section`
  position: relative;
  ${Section()}
  font-family: var(--content);
  ${Flex()};
  background: linear-gradient(to right, #fff, #ddd);
  .column {
    flex: 0.5;
    position: relative;
  }
  .left {
    ${Flex()};
    width: 100%;
    height: 100%;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      path {
        fill: teal;
      }
    }
    h1 {
      position: relative;
      z-index: 2;
      font-size: 10em;
      letter-spacing: 15px;
      text-transform: uppercase;
      color: #cfcd3a;

      text-shadow: 1px 1px hsl(50, 50%, 45%), 2px 2px hsl(50, 50%, 40%),
        3px 3px hsl(50, 50%, 35%), 4px 4px hsl(50, 50%, 34%),
        5px 5px hsl(50, 50%, 33%), 6px 6px hsl(50, 50%, 32%),
        7px 7px hsl(50, 50%, 31%), 8px 8px hsl(50, 50%, 30%),
        9px 9px hsl(50, 50%, 29%), 10px 10px hsl(50, 50%, 28%),
        10px 10px 30px rgba(0, 0, 0, 0.7);
    }
  }
  .right {
    width: 100%;
    height: 100%;
    ${Flex()};
  }
  form {
    width: 40vw;
    height: 60vh;
    background: teal;
    background-blend-mode: multiply, multiply;
    background-size: cover;
    background-position: left center;
    border-radius: 20px;
    backdrop-filter: blur(5px);
    padding: 1rem 2rem;
    ${Flex(1, "space-evenly", "flex-start")};

    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3),
      5px -5px 10px rgba(0, 0, 0, 0.3);
    .err {
      color: red;
      font-size: 0.8rem;
    }
    label {
      color: white;
      font-size: 1.2rem;
    }
    input {
      width: 100%;
      padding: 0.6rem;
      border-radius: 10px;
      border: 0;
      border-bottom: 3px solid #f5f23d;
      background: linear-gradient(to left, #fff, #eee);
      &:focus {
        outline: 0;
      }
    }
    button {
      font-size: 1rem;
      padding: 0.7rem 1.2rem;
      border-radius: 10px;
      border: 2px solid #f5f23d;
    }
  }
`;

export default Login;
