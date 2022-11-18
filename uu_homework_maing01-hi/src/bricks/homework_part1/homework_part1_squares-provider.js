//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

let squares = [
  {
    id: 1,
    text: "Počet dnů hatchery",
    amount: 45,
    measureUnit: "",
  },
  {
    id: 2,
    text: "Počet účastníků",
    amount: 45,
    measureUnit: "",
  },
  {
    id: 3,
    text: "Počet lektorů",
    amount: 45,
    measureUnit: "",
  },
  {
    id: 4,
    text: "Hodnocení",
    amount: 45,
    measureUnit: "%",
  },
];

const SquareProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SquareProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    return children({ squares });
    //@@viewOff:render
  },
});

export default SquareProvider;
