import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, BgImg, Overlay, Section } from "../../Style";
import bg from "./../../Media/bokeh1.jpg";

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
      <picture>
        <source srcSet={bg} type="image/jpg" />
        <img src={bg} alt="colors" />
      </picture>
      <div className="overlay"></div>

      <form onSubmit={submitHandler}>
        {message && <p className="err">{message}</p>}
        <label htmlFor="code">Team Code: </label>
        <input
          type="text"
          name="code"
          required
          autoFocus
          onChange={changeHandler}
          value={input.code}
        />
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          required
          onChange={changeHandler}
          value={input.name}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          required
          onChange={changeHandler}
          value={input.email}
        />
        <label htmlFor="number">Phone Number: </label>
        <input
          type="text"
          name="number"
          required
          onChange={changeHandler}
          value={input.number}
        />
        <button>Join Team</button>
      </form>
    </StyledJoinTeam>
  );
};

const StyledJoinTeam = styled.section`
  ${Section()}
  font-family: var(--content);
  position: relative;
  ${Flex()}
  picture {
    ${BgImg()}
    z-index: -1;
  }
  .overlay {
    ${Overlay(5)}
    z-index: -1;
  }
  color: white;
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

export default JoinTeam;
