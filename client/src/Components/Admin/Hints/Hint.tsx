import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Flex } from "../../../Style";
import axios from "axios";
import { team } from "./../interface";
import Modal from "./Modal";

const Hint: React.FC<{
  activateHint: (team: { code: string; hintUsed: string }) => void;
}> = ({ activateHint }) => {
  //URL
  const TeamURL =
    process.env.NODE_ENV === "production"
      ? "/team"
      : "http://localhost:5000/team";

  //State
  const [teams, setTeams] = useState<team[] | null>(null);
  const [hints, setHints] = useState<string | null>(null);
  const [selected, setSelected] = useState<team | null>(null);
  const [modalStatus, setModalStatus] = useState(false);

  //Component did mount
  useEffect(() => {
    document.title = "Chem-i-Leon | Admin-Hints";
    (async () => {
      try {
        const res = await axios.get(TeamURL);
        setTeams(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [TeamURL]);

  //Handlers
  const ChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let team = null;
    if (teams) {
      team = teams.filter(team => team.teamName === e.target.value);

      if (team.length === 1) {
        setSelected(team[0]);
      } else {
        setSelected(null);
        setHints(null);
      }
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selected && hints) setModalStatus(true);
  };

  const HintSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "default") return setHints(null);
    return setHints(e.target.value);
  };

  return (
    <StyledHint>
      <h1>Hint</h1>
      <div className="formContainer">
        <form onSubmit={submitHandler}>
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
          <button className={selected && hints ? "" : "inactive"}>
            Use a Hint
          </button>
        </form>
      </div>
      {modalStatus && (
        <Modal
          hints={hints}
          selected={selected}
          setModalStatus={setModalStatus}
          activateHint={activateHint}
        />
      )}
    </StyledHint>
  );
};

const StyledHint = styled.div`
  width: 100%;
  height: 100%;
  background: #f7f3e9;
  color: #f05945;
  h1 {
    font-family: var(--heading);
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
        transition: all 0.2s;
        &:focus,
        &:hover {
          outline: 0;
          background: #ffffff;
          color: #f05945;
        }
      }
      .inactive {
        background: #f17f70;
        color: #ffffff;
        cursor: default;
        &:focus,
        &:hover {
          background: #f17f70;
          color: #ffffff;
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
