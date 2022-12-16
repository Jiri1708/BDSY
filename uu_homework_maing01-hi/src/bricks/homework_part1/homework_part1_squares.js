//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useContext } from "uu5g04-hooks";
import Config from "../config/config";
import CSS from "./homework_part1_squares.css";
import { ColorSchemaContext } from "../context/ColorSchemaContext";
//@@viewOff:imports

const Square = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Square",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    square: UU5.PropTypes.shape({
      text: UU5.PropTypes.string.isRequired,
      amount: UU5.PropTypes.number.isRequired,
      measureUnit: UU5.PropTypes.text,
    }),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps

  //@@viewOff:defaultProps

  render({ square }) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
const { colorSchema } = useContext(ColorSchemaContext);
    return (
      <UU5.Bricks.Card className={CSS.main()} colorSchema={colorSchema}>
        <UU5.Bricks.Row>{square.text}</UU5.Bricks.Row>
        <UU5.Bricks.Row>
          {square.amount}
          {square.measureUnit}
        </UU5.Bricks.Row>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

export default Square;
