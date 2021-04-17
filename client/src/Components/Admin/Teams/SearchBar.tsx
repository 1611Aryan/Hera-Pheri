import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import axios from "axios";

const SearchBar: React.FC<{
  setResult: React.Dispatch<
    React.SetStateAction<
      | {
          leader: { name: string; email: string; number: string };
          score: number;
          hints: number;
          ques: number;
          members: { name: string; number: string; email: number }[];
          logs: [any];
          teamName: string;
          set: string;
          joinCode: string;
        }[]
      | null
    >
  >;
}> = ({ setResult }) => {
  const URL =
    process.env.NODE_ENV === "production"
      ? "/team/"
      : "http://localhost:5000/team/";

  const [input, setInput] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${URL}/${input}`);
      if (res.data.message) {
        setResult(res.data.team);
      } else setResult(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledSearchBar onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search..."
        autoFocus
        required
        value={input}
        onChange={changeHandler}
      />
      <button>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </StyledSearchBar>
  );
};

const StyledSearchBar = styled.form`
  --primary: #f05945;
  --secondary: #5eaaa8;
  width: 100%;
  padding: 1rem 0.5rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    font-size: clamp(0.7rem, 2vw, 0.9rem);
    width: 100%;
    padding: 0.7rem;
    border: 0;
    border-radius: 20px 0 0 20px;
    background: #ffffff;
    color: #111;
    font-weight: 300;
    &:focus {
      outline: 0;
    }
  }
  button {
    font-size: clamp(0.7rem, 2vw, 0.9rem);
    padding: 0.7rem 1rem;
    background: #d3e0ea;
    border: 0;
    border-radius: 0 20px 20px 0;
  }
`;

export default SearchBar;
