import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Flex, Section } from "../../Style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "./../../Context/userProvider";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    }
  }, [user, history]);

  return (
    <StyledDashboard>
      <h1>Hello {user?.teamName}</h1>
      <div className="divider"></div>
      <div className="content">
        <div className="team">
          <span>My Team</span>
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
                http://localhost:3000/join/{user?.joinCode}
              </div>
              <button>
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.section`
  ${Section()};
  ${Flex(1, "flex-start", "flex-start")}
  font-family: var(--content);
  background: #d0dffc;
  padding: 1rem;
  h1 {
    font-weight: 500;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  .divider {
    width: 100%;
    height: 2px;
    background: #fff;
  }
  .content {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    ${Flex(0, "space-between")}
  }
  .team {
    width: 40%;
    height: 100%;
    ${Flex(1, "space-between", "flex-start")}
    padding:1rem 0 2rem 0;
    span {
      font-size: 2rem;
    }
    .members {
      margin-top: 2.2rem;
      width: 85%;
      flex-grow: 1;
      background: #fff;
      border-radius: 0 25px 25px 0;
      ol {
        width: 100%;
        padding: 1.5rem;
        list-style-position: inside;
        font-size: 1.2rem;
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
    padding:1rem 0 2rem 0;
    .code {
      width: 100%;
      height: 40%;
      p {
        font-size: 1.15rem;
      }
      span {
        font-size: 2rem;
      }
    }
    .invite {
      width: 100%;
      padding: 0 2rem 0 0;
      h1 {
        font-size: 1.5rem;
      }
      .link-container {
        margin-top: 1rem;
        width: 100%;
        ${Flex()};
        height: 2rem;
        .link {
          width: 100%;
          background: #fff;
          padding: 0.5rem 1rem;
          font-size: 1rem;
        }
        button {
          padding: 0.5rem;
          background: #424242;
          ${Flex()}
          border:0;
          border-radius: 0;
          svg {
            color: white;
            font-size: 1.2rem;
          }
          &:focus {
            outline: 0;
          }
        }
      }
    }
  }
`;

export default Dashboard;
