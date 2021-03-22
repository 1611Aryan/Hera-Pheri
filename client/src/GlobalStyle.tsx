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
}
body{
    width:100vw;
    height:100%;
    overflow-x:hidden;
}
`;

export default GlobalStyle;
