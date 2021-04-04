import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router-dom";
import bg from "./../../Media/svg.png";

const Footer: React.FC = () => {
  const location = useLocation();

  return (
    <StylledFooter>
      <div
        className={
          location.pathname === "/"
            ? "login"
            : location.pathname === "/register" ||
              location.pathname === "/register/join" ||
              location.pathname === "/register/create"
            ? "register"
            : location.pathname === "/dashboard"
            ? "dashboard"
            : "hide"
        }
      >
        <img className="img" src={bg} alt="waves " />
        <h1>
          <span>G</span>
          <span>e</span>
          <span>t</span>
          <span> &nbsp;</span>
          <span>i</span>
          <span>n</span>
          <span>&nbsp; </span>
          <span>T</span>
          <span>o</span>
          <span>u</span>
          <span>c</span>
          <span>h</span>
        </h1>
        <ul className="numbers">
          <li>Anmol Ghai: +91 75892 05575</li>
          <li>Parth Sood: +91 79868 10284</li>
          <li>Anushka Khera: +91 62837 29736</li>
          <li>Prachi Bhardwaj: +91 78142 17576</li>
          <li>Aryan Gupta: +91 81467 40057</li>
          <li>Pratham Thakur: +91 97603 98187</li>
        </ul>
        <div>
          <ul className="socials">
            <li>
              <a
                href="https://www.facebook.com/TUIIChE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/iiche.tiet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/indian-institute-of-chemical-engineers-iiche-tiet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </StylledFooter>
  );
};

const StylledFooter = styled.footer`
  width: 100%;
  height: 60vh;
  font-family: var(--content);
  overflow: hidden;
  //border-top: 1px solid red;
  .hide {
    display: none;
  }
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(to right, #fff, #ddd);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 2rem;
    h1 {
      color: teal;
      font-size: 3rem;
      text-shadow: 1px 1px 3px yellow;
      span {
        display: inline-block;
        transition: transform ease-in-out 0.1s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    img {
      display: none;
    }
    .numbers {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      li {
        width: 50%;
        padding: 1rem 0;
        height: auto;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .socials {
      width: 100%;
      display: flex;
      align-items: center;
      list-style-type: none;
      li {
        font-size: 1.5rem;
        padding: 1rem 2rem 1rem 0;
        color: teal;
        transition: all ease 0.3s;
        &:hover {
          transform: scale(1.5);
        }
      }
      li + li {
        padding: 1rem 2rem;
      }
    }
  }
  .register {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(to right, #fff, #ddd);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 2rem;
    h1 {
      color: #3d3d3d;
      z-index: 2;
      font-size: 3rem;
      span {
        display: inline-block;
        transition: transform ease-in-out 0.1s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      transform: rotateX(180deg);
      z-index: 1;
    }
    .numbers {
      z-index: 2;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      li {
        width: 50%;
        padding: 1rem 0;
        height: auto;
        color: #2d2d2d;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .socials {
      z-index: 2;
      width: 100%;
      display: flex;
      align-items: center;
      list-style-type: none;
      li {
        z-index: 2;
        font-size: 1.5rem;
        padding: 1rem 2rem 1rem 0;
        color: teal;
        color: #2d2d2d;
        transition: all ease 0.3s;
        cursor: pointer;
        &:hover {
          transform: scale(1.5);
        }
      }
      li + li {
        padding: 1rem 2rem;
      }
    }
  }
  .dashboard {
    width: 100%;
    height: 100%;
    position: relative;
    background: #d0dffc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 2rem;
    h1 {
      z-index: 2;
      color: black;
      font-size: 3rem;
      font-weight: 500;
      span {
        display: inline-block;
        transition: transform ease-in-out 0.1s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    img {
      display: none;
    }
    .numbers {
      z-index: 2;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      li {
        width: 50%;
        padding: 1rem 0;
        height: auto;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .socials {
      z-index: 2;
      width: 100%;
      display: flex;
      align-items: center;
      list-style-type: none;
      li {
        z-index: 2;
        font-size: 1.5rem;
        padding: 1rem 2rem 1rem 0;
        color: #2d2d2d;
        transition: all ease 0.3s;
        &:hover {
          transform: scale(1.5);
        }
      }
      li + li {
        padding: 1rem 2rem;
      }
    }
  }
`;

export default Footer;
