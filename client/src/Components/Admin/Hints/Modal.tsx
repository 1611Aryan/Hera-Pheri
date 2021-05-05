import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Flex } from "../../../Style";
import Loading from "../../Loading/Loading";
import { team } from "./../interface";

const Modal: React.FC<{
  hints: string | null;
  selected: team | null;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  activateHint: (team: { code: string; hintUsed: string }) => void;
}> = ({ hints, selected, setModalStatus, activateHint }) => {
  //URL
  const HintURL =
    process.env.NODE_ENV === "production"
      ? "/team/hint"
      : "http://localhost:5000/team/hint";

  //State
  const [loading, setLoading] = useState(false);

  //Handlers
  const submit = async () => {
    setLoading(true);
    if (selected && hints)
      try {
        const res = await axios.post(HintURL, {
          id: selected._id,
          hintType: hints,
        });
        activateHint({ code: selected.joinCode, hintUsed: hints });
        console.log(res);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setModalStatus(false);
        }, 500);
      }
  };

  const cancel = () => {
    setModalStatus(false);
  };

  return (
    <StyledModal>
      <div className="modal">
        <h1>Are You Sure ?</h1>
        <div className="btnContainer">
          <button onClick={submit}>Yes</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </div>
      {loading && <Loading />}
    </StyledModal>
  );
};

const StyledModal = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  ${Flex()};
  backdrop-filter: blur(2px);
  .modal {
    width: 40%;
    height: 50%;
    background: rgba(247, 243, 233, 0.8);
    backdrop-filter: blur(2px);
    border-radius: 15px;
    ${Flex(1, "space-evenly")};
    .btnContainer {
      width: 100%;
      ${Flex(0, "space-evenly")}
      button {
        width: 20%;
        padding: 0.6rem 1rem;
        font-size: 1rem;
        background: #fff;
        border: 0;
        color: #f05945;
        transition: all 0.2s;
        @media (hover: hover) {
          &:hover {
            color: #fff;
            background: #f05945;
          }
        }
      }
    }
  }
`;

export default Modal;
