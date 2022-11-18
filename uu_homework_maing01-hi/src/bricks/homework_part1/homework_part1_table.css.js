import Config from "../config/config";

const main = () => Config.Css.css`
//   height: 100%;
  display: flex;
//   flex-direction: column;
//   border: 1px solid black;
width: 100%;
float:left;
text-align: left;
display: flex;
padding: 10px;
`;

const button = () => Config.Css.css`
float: right;
  border: 1px solid black;
`;

const heading = () => Config.Css.css`
margin: 5px 5px 10px 10px;
`;

export default {
  main,
  button,
  heading,
};
