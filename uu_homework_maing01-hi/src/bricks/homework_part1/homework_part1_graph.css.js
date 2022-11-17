import Config from "../config/config";

const main = () => Config.Css.css`
height: 100%;
  display: flex;
flex-direction: column;
width: 100%;
float:left;
text-align: left;
display: flex;
`;

const heading = () => Config.Css.css`
margin: 5px 5px 10px 10px;
`;

export default {
  main,
  heading,
};
