import { createGlobalStyle } from "styled-components";
import bg from "./Media/sunset.jpg";

const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box
}
:root{
    --heading:'Happy Monkey', cursive;
     
     --cursive:'AlexBrush',cursive;
    --content: 'Lato', sans-serif;
    --navHeight:10vh;
}


body{
    width:100vw;
    height:100%;
    overflow-x:hidden;
  font-family: 'Lato', sans-serif;
  background-image: url(${bg});
  background-size: cover;
}
a{
    text-decoration:none;
    color:inherit;
}
button{
    cursor:pointer;
}
.loading{
    opacity:1;
}
`;

export default GlobalStyle;
