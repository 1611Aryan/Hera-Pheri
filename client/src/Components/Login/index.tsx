import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Section, Flex } from "../../Style";
import { useUser } from "../../Context/userProvider";
import { useToken } from "../../Context/tokenProvider";
import { useLoader } from "../../Context/loaderProvider";

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
  const { setToken } = useToken();
  const { setLoader } = useLoader();

  //

  useEffect(() => {
    document.title = "Chem-i-Leon";
    const html = document.querySelector("html");
    if (html) html.setAttribute("theme", "teal");
  }, []);

  //Handlers
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post(URL, input);
      if (res.data.auth) {
        setUser(res.data.team);
        setToken(res.headers.authtoken);
        history.push("/dashboard");
      }
    } catch (err) {
      setMessage(err.response.data);
    } finally {
      setTimeout(() => setLoader(false), 500);
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
              <stop stopColor="#134E5E" />
              <stop offset="1" stopColor="#71B280" />
            </linearGradient>
          </defs>
        </svg>
        <h1>Login</h1>
      </div>
      <div className="column right">
        <form onSubmit={submitHandler}>
          {message && <p className="err">{message}</p>}
          <label htmlFor="team">Team Name: </label>
          <input type="text" name="team" required onChange={changeHandler} />
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
  padding: 0;
  margin: 0;
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
      font-size: clamp(3rem, 12vw, 10rem);
      letter-spacing: 15px;
      text-transform: uppercase;
      color: #dddb49;
      filter: brightness(120%) contrast(90%);
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
    border-radius: 20px;
    padding: 1rem clamp(0.5rem, 3vw, 2rem);
    ${Flex(1, "space-evenly", "flex-start")};
    box-shadow: inset 5px 5px 10px rgba(255, 255, 255, 0.35),
      inset -5px -5px 10px rgba(255, 255, 255, 0.35);
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
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2),
        inset -1px -1px 3px rgba(0, 0, 0, 0.2);
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
      box-shadow: inset 1px 0.5px 2px rgba(0, 0, 0, 0.2),
        inset -1px -0.5px 2px rgba(0, 0, 0, 0.2);
      &:focus {
        outline: 0;
      }
      @media (hover: hover) {
        &:hover {
          animation: shake 0.5s ease infinite;
        }
        @keyframes shake {
          0% {
            transform: translate(1px, 1px) rotate(0deg);
          }
          10% {
            transform: translate(-1px, -1.5px) rotate(-1deg);
          }
          20% {
            transform: translate(-2px, 0px) rotate(2deg);
          }
          30% {
            transform: translate(0px, 1px) rotate(0deg);
          }
          40% {
            transform: translate(1px, -1px) rotate(1deg);
          }
          50% {
            -webkit-transform: translate(-1px, 1px) rotate(-1deg);
          }
          60% {
            transform: translate(-1px, 1px) rotate(0deg);
          }
          70% {
            transform: translate(1px, 1px) rotate(-1deg);
          }
          80% {
            transform: translate(-1px, -1px) rotate(3deg);
          }
          90% {
            transform: translate(1px, 1px) rotate(0deg);
          }
          100% {
            transform: translate(1px, -1px) rotate(-1deg);
          }
        }
      }
    }
  }

  @media (max-width: 850px) {
    .left {
      flex: 0.4;
      svg {
        transform: translate(-50%, -50%) scale(0.9);
      }
    }
    .right {
      flex: 0.6;
    }
    form {
      width: 45vw;
    }
  }
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    .left {
      flex: 0.2;
      svg {
        display: none;
      }
      h1 {
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        color: teal;
      }
    }
    .right {
      width: 100%;
      flex: 0.7;
      align-items: flex-start;
      form {
        width: 80%;
        height: 50vh;
      }
    }
  }
`;

export default Login;
