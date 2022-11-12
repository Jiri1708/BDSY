import Config from "./config/config";

const main = () => Config.Css.css`
border: 1px solid black;
text-align: center;
padding: 10px;
width: 80%;
min-height: 100px;
font-weight: bold;
`;

const vertical = () => Config.Css.css`
display: flex;
justify-content: center;
align-items: center;
height: 200px;
`;

export default {
  main,
  vertical,
};
