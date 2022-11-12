//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import CSS from "./homework_part1_squares.css";
//@@viewOff:imports

const TableRow = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Table Row",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      bio: UU5.PropTypes.string.isRequired,
      rating: UU5.PropTypes.number,
    }),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps

  //@@viewOff:defaultProps

  render({ data }) {
    return (
      <UU5.Bricks.Table.Tr>
        <UU5.Bricks.Table.Td content={data.name} />
        <UU5.Bricks.Table.Td content={data.bio} />
        <UU5.Bricks.Table.Td content={data.rating} />
      </UU5.Bricks.Table.Tr>
    );
    //@@viewOff:render
  },
});

export default TableRow;
