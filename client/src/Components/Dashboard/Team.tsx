import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Flex } from "../../Style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "./../../Context/userProvider";
import { useEffect, useRef, useState } from "react";

const Team = () => {
  const [copied, setCopied] = useState(false);
  const [teamStatus, setTeamStatus] = useState(false);
  const { user } = useUser();
  const history = useHistory();
  const linkRef = useRef<HTMLInputElement>(null);
  const link =
    process.env.NODE_ENV === "production"
      ? `https://hera-pheri.herokuapp.com/register/join/${user?.joinCode}`
      : `http://localhost:3000/register/join/${user?.joinCode}`;

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    } else
      user?.members.length < 3 ? setTeamStatus(false) : setTeamStatus(true);
  }, [user, history]);

  const copy = () => {
    if (linkRef) {
      linkRef.current?.select();
      linkRef.current?.setSelectionRange(0, 99999);
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const Share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Hera Pheri Invite",
          text: `Join My Team ${user?.teamName}`,
          url: link,
        });
        console.log("Successfully Shared");
      } else copy();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledTeam>
      <div className="team">
        <span className="myTeam">My Team</span>
        {!teamStatus && (
          <span className="teamMessage">
            You need a full team of four to participate!
          </span>
        )}
        <div className="members">
          <ol>
            <li>{user?.leader.name}</li>
            <li>{user?.members[0] ? user?.members[0].name : "Empty"}</li>
            <li>{user?.members[1] ? user?.members[1].name : "Empty"}</li>
            <li>{user?.members[2] ? user?.members[2].name : "Empty"}</li>
          </ol>
        </div>
      </div>
      <div className="share">
        <div className="code">
          <p>
            Team Code
            <br />
            <span>{user?.joinCode}</span>
          </p>
        </div>
        <div className="invite">
          <h1>Invite</h1>
          <div className="link-container">
            <div className="link">
              {link}
              <input type="text" value={link} ref={linkRef} readOnly />
            </div>
            <button onClick={Share}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
          {copied && <span className="message">Copied</span>}
        </div>
      </div>
    </StyledTeam>
  );
};

const StyledTeam = styled.section`
  width: 100%;
  height: calc(100vh - var(--navHeight));
  flex-grow: 1;
  ${Flex(0, "space-between")}
  padding: 1rem;
  .team {
    width: 40%;
    height: 100%;
    ${Flex(1, "space-between", "flex-start")}
    .myTeam {
      font-size: clamp(1.45rem, 3vw, 2rem);
      font-family: var(--heading);
      font-weight: 700;
    }
    .teamMessage {
      margin-top: clamp(0.5rem, 2vw, 1rem);
      font-size: clamp(0.7rem, 1vw, 0.8rem);
      color: red;
    }
    .members {
      margin-top: 2.2rem;
      width: 85%;
      flex-grow: 1;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(3px);
      border-radius: 0 25px 25px 0;

      ol {
        width: 100%;
        padding: 1.5rem;
        list-style-position: inside;
        font-size: clamp(1rem, 3vw, 1.2rem);
        li + li {
          margin-top: 2rem;
        }
      }
    }
  }
  .share {
    width: 40%;
    height: 100%;
    ${Flex(1, "flex-start", "flex-start")}

    .code {
      width: 100%;
      height: 40%;

      p {
        font-size: clamp(1rem, 3vw, 1.15rem);
      }
      span {
        font-size: clamp(1.45rem, 3vw, 2rem);
      }
    }
    .invite {
      width: 100%;

      h1 {
        padding: 0;
        font-size: clamp(1.15rem, 3vw, 1.5rem);
      }
      .link-container {
        margin-top: 1rem;
        width: 100%;
        ${Flex()};
        height: 2rem;
        overflow: hidden;
        .link {
          width: 100%;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(3px);
          padding: 0.5rem 0.5rem;
          font-size: clamp(0.8rem, 2vw, 1rem);
          border: 0;
          input {
            position: absolute;
            top: -9999px;
            left: -99999px;
          }
        }

        button {
          padding: 0.5rem;
          background: #424242;
          ${Flex()}
          border:0;
          border-radius: 0;
          svg {
            color: white;
            font-size: clamp(1rem, 2vw, 1.2rem);
          }
          &:focus {
            outline: 0;
          }
        }
      }
      .message {
        display: inline-block;
        padding: 0.5rem;

        font-size: 0.8rem;
      }
    }
  }
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between !important;
    .team {
      width: 100%;
      .members {
        width: 100%;
      }
      margin-bottom: 1rem;
    }
    .share {
      width: 100%;
      .code {
        padding-top: 1rem;
      }
    }
  }
`;

export default Team;
