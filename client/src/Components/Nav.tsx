import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useToken } from "../Context/tokenProvider";
import { useUser } from "../Context/userProvider";
import logoPng from "./../Media/Logo.png";
import logowebp from "./../Media/Logo.webp";

const Nav: React.FC = () => {
  const history = useHistory();
  const { user, setUser } = useUser();
  const { setToken } = useToken();

  //Handlers
  const logout = () => {
    setUser(null);
    setToken(null);
    history.push("/");
  };

  return (
    <StyledHeader>
      <nav>
        <div className="logo">
          <picture>
            <source srcSet={logowebp} type="image/webp" />
            <source srcSet={logoPng} type="image/png" />
            <img src={logoPng} alt="logo" />
          </picture>
          <h1>
            <Link to="/">
              <span>C</span>
              <span>h</span>
              <span>e</span>
              <span>m</span>
              <span>-</span>
              <span>i</span>
              <span>-</span>
              <span>l</span>
              <span>e</span>
              <span>o</span>
              <span>n</span>
            </Link>
          </h1>
        </div>

        <ul>
          {user ? (
            <li onClick={logout}>Logout</li>
          ) : (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100vw;
  background: linear-gradient(to right, #134e5e, #71b280);
  background: #353535;
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
    .logo {
      height: 100%;
      width: auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      picture {
        height: 80%;
        margin-right: 1rem;
      }
      img {
        height: 100%;
        object-fit: cover;
      }
      h1 {
        font-size: clamp(1.45rem, 3vw, 1.95rem);
        transition: color ease-out0.4s;
        span {
          &:hover {
            color: yellow;
          }
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
      cursor: pointer;
      margin-right: 1rem;
      font-size: clamp(0.9rem, 3vw, 1.25rem);
    }
  }
`;

export default Nav;
