import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useToken } from "../../Context/tokenProvider";
import { useUser } from "../../Context/userProvider";
import logoPng from "./../../Media/Logo.png";
import logowebp from "./../../Media/Logo.webp";

const Nav: React.FC = () => {
  const history = useHistory();
  const { user, setUser } = useUser();
  const { setToken } = useToken();
  const location = useLocation();
  const [navParameter, setNavParameter] = useState("hide");

  //Handlers
  const logout = () => {
    setUser(null);
    setToken(null);
    history.push("/");
  };

  useEffect(() => {
    const pattern = new RegExp("/register");

    if (location.pathname === "/") setNavParameter("login");
    else if (pattern.test(location.pathname) || location.pathname === "/uh-oh")
      setNavParameter("register");
    else if (
      location.pathname === "/dashboard" ||
      location.pathname === "/admin/dashboard"
    )
      setNavParameter("dashboard");
    else if (location.pathname === "/admin/add") setNavParameter("admin-add");
    else setNavParameter("hide");
  }, [location]);

  return (
    <StyledHeader>
      <nav className={user ? "black" : "teal"}>
        <div className="logo">
          <picture>
            <source srcSet={logowebp} type="image/webp" />
            <source srcSet={logoPng} type="image/png" />
            <Link to="/">
              <img src={logoPng} alt="logo" />
            </Link>
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
          {navParameter === "dashboard" ? (
            <li onClick={logout}>
              <span>L</span>
              <span>o</span>
              <span>g</span>
              <span>o</span>
              <span>u</span>
              <span>t</span>
            </li>
          ) : navParameter === "login" ? (
            <li>
              <Link to="/register">Register</Link>
            </li>
          ) : navParameter === "register" ? (
            <li>
              <Link to="/">Login</Link>
            </li>
          ) : navParameter === "admin-add" ? (
            <li>
              <Link to="/admin">Login</Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100vw;
  background: linear-gradient(to right, #134e5e, #71b280);

  height: var(--navHeight);
  .teal {
    background: teal;
  }
  .black {
    background: #202020;
  }
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
        @media (hover: hover) {
          display: inline-block;
          transition: all ease-out 0.1s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
      h1 {
        font-size: clamp(1.45rem, 3vw, 1.95rem);

        span {
          transition: all ease-out 0.1s;
          display: inline-block;
          @media (hover: hover) {
            &:hover {
              transform: scale(1.2);
              color: rgba(255, 255, 0, 0.7);
              filter: brightness(200%) saturate(150%);
            }
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
      transition: color ease-out 0.1s;
      span {
        transition: all ease-out 0.1s;
        display: inline-block;
        @media (hover: hover) {
          &:hover {
            transform: scale(1.2);
            color: rgba(255, 255, 0, 0.7);
          }
        }
      }
    }
  }
`;

export default Nav;
