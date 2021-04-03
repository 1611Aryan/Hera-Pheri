import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <StylledFooter>
      <div className="login">
        <h1>Get in Touch</h1>
        <ul className="numbers">
          <li>Anmol Ghai: +91 75892 05575</li>
          <li>Parth Sood: +91 79868 10284</li>
          <li>Anushka Khera: +91 6283729736</li>
          <li>Prachi Bhardwaj: +91 78142 17576</li>
          <li>Aryan Gupta: +91 8146740057</li>
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
  border-top: 1px solid red;
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(to right, #fff, #ddd);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    .numbers {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      li {
        width: 50%;
        padding: 1rem 0;
        height: auto;
      }
    }
    .socials {
      width: 100%;
      display: flex;
      list-style-type: none;
    }
  }
`;

export default Footer;
