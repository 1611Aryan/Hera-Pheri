import styled from "styled-components";
import SearchBar from "./SearchBar";

import { team } from "./../../interface";
import { useState } from "react";

const Header: React.FC<{
  setResult: React.Dispatch<React.SetStateAction<team[] | null>>;
}> = ({ setResult }) => {
  const [filter, setFilter] = useState<"name" | "set">("name");

  const changeFilter = (filter: "name" | "set") => {
    setFilter(filter);
  };

  return (
    <StyledHeader>
      <h1>Teams</h1>
      <SearchBar setResult={setResult} filter={filter} />
      <div className="buttons">
        <button
          className={filter === "name" ? "active" : ""}
          onClick={() => changeFilter("name")}
        >
          Team Name
        </button>
        <button
          className={filter === "set" ? "active" : ""}
          onClick={() => changeFilter("set")}
        >
          Set
        </button>
      </div>
      <div className="divider"></div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  h1 {
    font-family: var(--heading);
    font-size: clamp(1rem, 3vw, 2rem);
  }
  .buttons {
    width: 100%;
    padding: 0.5rem;
    & > * + * {
      margin-left: 1rem;
    }
    button {
      padding: 0.7rem 1.5rem;
      border: 0;
      border-radius: 20px;
      background: #ffffff;
      color: #111;
      font-weight: 300;
      &:focus {
        outline: 0;
      }
    }
    .active {
      background: var(--primary);
      color: #ffffff;
    }
  }
  .divider {
    width: 100%;
    height: 2px;
    background: var(--secondary);
    margin: clamp(0.5rem, 2vw, 1rem) 0;
  }
`;

export default Header;
