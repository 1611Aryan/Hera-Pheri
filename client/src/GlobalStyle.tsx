import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box
}
:root{
    --heading:'Happy Monkey', cursive;
    --content: 'Lato', sans-serif;
    --navHeight:10vh;
}
body{
    width:100vw;
    height:100%;
    overflow-x:hidden;
  font-family: 'Lato', sans-serif;
}
a{
    text-decoration:none;
    color:inherit;
}
button{
    cursor:pointer;
}
`;

export default GlobalStyle;
