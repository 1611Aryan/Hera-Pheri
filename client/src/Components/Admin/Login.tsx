import styled from "styled-components";
import { useState } from "react";
import { Flex, Section } from "../../Style";
import axios from "axios";
import { useAdmin } from "../../Context/adminProvider";
import { useHistory } from "react-router";

const Login = () => {
  //URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "/adminserver/login"
      : "http://localhost:5000/adminserver/login";

  //State
  const [input, setInput] = useState({
    name: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  //
  const { setAdmin } = useAdmin();
  const history = useHistory();

  //Handlers
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL, input);
      if (res.data.auth === "admin") {
        setAdmin(res.data.admin);
        history.push("/admin/dashboard");
      }
    } catch (err) {
      setAdmin(null);
      setMessage(err.response.data);
    }
  };
  return (
    <StyledLogin>
      <form onSubmit={submitHandler}>
        <h1>Admin Login</h1>
        {message && <p className="err">{message}</p>}
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={changeHandler} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={changeHandler} />
        <button>Login</button>
      </form>
    </StyledLogin>
  );
};

const StyledLogin = styled.section`
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
`;

export default Login;
