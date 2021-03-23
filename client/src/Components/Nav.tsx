import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav: React.FC = () => {
  return (
    <StyledHeader>
      <nav>
        <h1>
          <Link to="/">Hera Pheri</Link>
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
  background: linear-gradient(to right, #141e30, #243b55);
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
  }
  ul {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      margin-right: 1rem;
    }
  }
`;

export default Nav;
