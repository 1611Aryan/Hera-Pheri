import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Flex } from "../../../Style";
import axios from "axios";
import { team } from "./../interface";

const Hint: React.FC = () => {
  const HintURL =
    process.env.NODE_ENV === "production"
      ? "/team/hint"
      : "http://localhost:5000/team/hint";

  const TeamURL =
    process.env.NODE_ENV === "production"
      ? "/team"
      : "http://localhost:5000/team";

  const [teams, setTeams] = useState<team[] | null>(null);
  const [hints, setHints] = useState<string | null>(null);
  const [selected, setSelected] = useState<team | null>(null);

  //Component did mount

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(TeamURL);
        setTeams(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [TeamURL]);

  const ChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let team = null;
    if (teams) {
      team = teams.filter(team => team.teamName === e.target.value);

      if (team.length === 1) {
        setSelected(team[0]);
      } else {
        setSelected(null);
      }
    }
  };

  const ClickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(HintURL, {
        id: selected?._id,
        hintType: hints,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const HintSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHints(e.target.value);
  };

  return (
    <StyledHint>
      <h1>Hint</h1>
      <div className="formContainer">
        <form onSubmit={ClickHandler}>
          <label htmlFor="team">Team</label>
          <select name="team" onChange={ChangeHandler}>
            <option value="default">...</option>
            {teams &&
              teams.map((team, index) => (
                <option key={index} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
          </select>
          <label htmlFor="hint">No. of Hints Left:</label>
          <select name="team" onChange={HintSelector}>
            <option value="default">...</option>
            {selected && (
              <>
                {selected.hints.type1 === 1 && (
                  <option value="type1">Type 1</option>
                )}
                {selected.hints.type2 === 1 && (
                  <option value="type2">Type 2</option>
                )}
                {selected.hints.type3 === 1 && (
                  <option value="type3">Type 3</option>
                )}
              </>
            )}
          </select>
          <button>Use a Hint</button>
        </form>
      </div>
    </StyledHint>
  );
};

const StyledHint = styled.div`
  width: 100%;
  height: 100%;
  background: #f7f3e9;
  color: #f05945;
  h1 {
    padding: 1rem;
    font-size: 2rem;
  }
  ${Flex(1, "flex-start", "flex-start")}
  .formContainer {
    width: 100%;
    flex: 1;
    ${Flex()};
    form {
      width: 60%;
      height: 40%;
      ${Flex(1, "space-between", "flex-start")};
      label {
        font-size: clamp(1rem, 2vw, 1.25rem);
      }
      input {
        width: 100%;
        padding: clamp(0.4rem, 1vw, 0.6rem);
        border-radius: 5px;
        border: 1px solid #474747;
        font-size: clamp(0.8rem, 1.5vw, 1.15rem);
        &:focus {
          outline: 0;
        }
      }
      select {
        width: 100%;
        padding: clamp(0.4rem, 1vw, 0.6rem);
        border-radius: 5px;
        border: 1px solid #474747;
        font-size: clamp(0.8rem, 1.5vw, 1.15rem);
        &:focus {
          outline: 0;
        }
      }
      button {
        align-self: center;
        background: #f05945;
        color: #f7f3e9;
        font-size: clamp(0.8rem, 2vw, 1rem);
        padding: 0.6rem clamp(0.6rem, 3vw, 1rem);
        border-radius: 5px;
        border: 0;
        &:focus {
          outline: 0;
        }
      }
    }
  }

  @media (max-width: 450px) {
    .formContainer {
      form {
        width: 80%;
      }
    }
  }
`;

export default Hint;
