import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { Section, Flex } from "../../Style";

const ForgotPassword: React.FC = () => {
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/forgot"
      : "http:///localhost:5000/team/forgot";

  //State
  const [input, setInput] = useState({
    team: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Chem-i-Leon | Forgot";
  }, []);

  //Handlers
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.password.toString().trim().length < 8)
      return setMessage(
        "Password should have a minimum length of 8 digits ಠ_ಠ"
      );

    try {
      const res = await axios.post(URL, {
        team: input.team,
        newPassword: input.password,
      });
      console.log(res.data);
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  return (
    <StyledForgotPassword>
      <form onSubmit={submitHandler}>
        {message && <p className="err">{message}</p>}
        <label htmlFor="team">Team Name: </label>
        <input type="text" name="team" required onChange={changeHandler} />
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          required
        />
        <button>Change Password</button>
      </form>
    </StyledForgotPassword>
  );
};

const StyledForgotPassword = styled.main`
  ${Section()}
  font-family: var(--content);
  ${Flex()};

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
    form {
      width: 45vw;
    }
  }
  @media (max-width: 650px) {
    form {
      width: 80%;
      height: 50vh;
    }
  }
`;

export default ForgotPassword;
