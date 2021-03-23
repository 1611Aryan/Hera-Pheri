export const Flex = (i = 0, j = "center", a = "center") =>
  i === 0
    ? `
display:flex;
justify-content:${j};
align-items:${a};
`
    : `
display:flex;
flex-direction:column;
justify-content:${j};
align-items:${a};
`;

export const BgImg = () => `
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
object-fit:cover;
`;

export const Overlay = (blur = 2, color = "rgba(0,0,0,0.3)") => `
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background:${color};
backdrop-filter:blur(${blur}px);
`;

export const Section = () => `
    width: 100vw;
    height: calc(100vh - var(--navHeight));
    overflow: hidden;
`;
