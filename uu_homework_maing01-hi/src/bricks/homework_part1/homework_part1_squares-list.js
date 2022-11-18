//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
import Square from "./homework_part1_squares";
//@@viewOff:imports

const SquareList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SquareList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    squares: UU5.PropTypes.array.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    squares: [],
  },
  //@@viewOff:defaultProps

  render({ squares }) {
    //@@viewOn:render
    if (squares.length === 0) {
      return <UU5.Common.Error content="No squares!" />;
    }

    return (
      <>
        {squares.map((square) => (
          <UU5.Bricks.Column colWidth="xs-3 s-3" key={"col" + square.id}>
            <Square key={square.id} square={square} />
          </UU5.Bricks.Column>
        ))}
      </>
    );
    //@@viewOff:render
  },
});

export default SquareList;
