import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav: React.FC = () => {
  return (
    <StyledHeader>
      <nav>
        <h1>
          <Link to="/">
            <span>H</span>
            <span>e</span>
            <span>r</span>
            <span>a</span>
            <span> </span>
            <span>P</span>
            <span>h</span>
            <span>e</span>
            <span>r</span>
            <span>i</span>
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100vw;
  background: linear-gradient(to right, #134e5e, #71b280);

  height: var(--navHeight);

  nav {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-family: var(--heading);
    h1 {
      font-size: clamp(1.25rem, 3vw, 1.65rem);
      transition: color ease-out0.4s;
      span {
        &:hover {
          color: yellow;
        }
      }
    }
  }
  ul {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      margin-right: 1rem;
      font-size: clamp(0.9rem, 3vw, 1.25rem);
    }
  }
`;

export default Nav;
