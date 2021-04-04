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
        className={`footer ${
          location.pathname === "/"
            ? "login"
            : location.pathname === "/register" ||
              location.pathname === "/register/join" ||
              location.pathname === "/register/create"
            ? "register"
            : location.pathname === "/dashboard"
            ? "dashboard"
            : "hide"
        }`}
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
          <li>Anmol Ghai: 7589205575</li>
          <li>Parth Sood: 7986810284</li>
          <li>Anushka Khera: 6283729736</li>
          <li>Prachi Bhardwaj: 7814217576</li>
          <li>Aryan Gupta: 8146740057</li>
          <li>Pratham Thakur: 9760398187</li>
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
    display: none !important;
  }

  .footer {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem clamp(1rem, 3vw, 2rem);
    h1 {
      z-index: 2;
      font-size: clamp(2rem, 4vw, 3rem);
      span {
        display: inline-block;
        transition: transform ease-in-out 0.1s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .numbers {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      list-style-type: none;
      li {
        z-index: 2;
        width: 48%;
        padding: 1rem 0;
        font-size: clamp(0.8rem, 2vw, 1rem);
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
        font-size: clamp(1.2rem, 3vw, 1.5rem);
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

  .login {
    background: linear-gradient(to right, #fff, #ddd);

    h1 {
      color: teal;
      text-shadow: 1px 1px 3px yellow;
    }
    img {
      display: none;
    }
    .socials {
      li {
        color: teal;
      }
    }
  }

  .register {
    background: linear-gradient(to right, #fff, #ddd);
    h1 {
      color: #3d3d3d;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      transform: rotateX(180deg);
      z-index: 1;
      @media (max-width: 650px) {
        transform: scale(1.5, 5) rotateX(180deg);
      }
    }
    .numbers {
      li {
        color: #2d2d2d;
      }
    }
    .socials {
      li {
        color: #2d2d2d;
      }
    }
  }

  .dashboard {
    background: #d0dffc;
    h1 {
      color: black;
      z-index: 500;
    }
    img {
      display: none;
    }
    .socials {
      li {
        color: #2d2d2d;
      }
    }
  }
`;

export default Footer;
