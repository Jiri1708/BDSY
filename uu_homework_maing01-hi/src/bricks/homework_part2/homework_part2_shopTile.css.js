import Config from "../config/config";

const main = () => Config.Css.css`
  margin: auto;
  width: 50%;
  padding: 10px;
  text-aling: center;
  
`;
const card = () => Config.Css.css`
   margin: 100px
`;
const btnGroup = () => Config.Css.css`
    margin: 0 auto; 
    text-align: center;
    width: inherit;
    display: inline-block;
  
`;
const btnGroupWrap = () => Config.Css.css`
   text-align: center;
  
`;
const h1 = () => Config.Css.css`
   text-align:center;
`;


export default {
  main,
  card,
  btnGroup,
  btnGroupWrap, h1
};
