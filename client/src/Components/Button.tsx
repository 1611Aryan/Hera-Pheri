import styled from "styled-components";
import { Flex } from "../Style";

const Button: React.FC<{
  children?: JSX.Element;
  type?: "submit" | "button";
  onClick?: () => {};
  className?: string;
}> = ({ children, type, onClick, className }) => {
  return (
    <StyledButton type={type} onClick={onClick} className={className}>
      <div className="clip"></div>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: 0;
  cursor: pointer;
  position: relative;
  ${Flex()};
  background: #fff;
  color: yellow;
  overflow: hidden;
  .clip {
    position: absolute;
    opacity: 1;
    top: 0;
    left: 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: scale(1.5);
    width: 100%;
    height: 100%;
    background: teal;
    transition: all ease 0.2s;
  }
  &:hover,
  &:focus {
    outline: 0;
  }
  @media (hover: hover) {
    &:hover {
      .clip {
        clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
        opacity: 0.5;
      }
    }
  }
`;

export default Button;
