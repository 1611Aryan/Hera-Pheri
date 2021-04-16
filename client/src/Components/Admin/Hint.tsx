import styled from "styled-components";
import { useState } from "react";
import { Flex } from "../../Style";

const Hint: React.FC<{
  teams:
    | {
        _id: string;
        teamName: string;
        score: number;
        hints: number;
        leader: {
          name: string;
          email: string;
          number: string;
        };
      }[]
    | null;
}> = ({ teams }) => {
  const [hints, setHints] = useState(0);

  const ChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let team = null;
    if (teams) {
      team = teams.filter(team => team.teamName === e.target.value);
      team.length === 1 ? setHints(team[0].hints) : setHints(0);
    }
  };

  return (
    <StyledHint>
      <h1>Hint</h1>
      <div className="formContainer">
        <form>
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
          <input type="text" value={hints} readOnly />
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
        border-radius: 10px;
        border: 2px solid #000;
        font-size: clamp(0.8rem, 1.5vw, 1.15rem);
        &:focus {
          outline: 0;
        }
      }
      select {
        width: 100%;
        padding: clamp(0.4rem, 1vw, 0.6rem);
        border-radius: 10px;
        border: 2px solid #000;
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
