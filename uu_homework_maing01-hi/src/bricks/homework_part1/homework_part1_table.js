//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useContext } from "uu5g04-hooks";
import Config from "../config/config";
import CSS from "./homework_part1_table.css";
import { ColorSchemaContext } from "../context/ColorSchemaContext";

//@@viewOff:imports

const Table = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Table",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.array.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    data: [],
  },
  //@@viewOff:defaultProps
  render({ data }) {
    //@@viewOn:render

    function renderHeading() {
      return <h2 className={CSS.heading()}>Studenti</h2>;
    }

    if (data.length === 0) {
      return <UU5.Common.Error content="No squares!" />;
    }
const { colorSchema } = useContext(ColorSchemaContext);
    return (
      <>
        {renderHeading()}
        <UU5.Bricks.Table bordered allowTags={["TableRow"]} colorSchema={colorSchema}>
          <UU5.Bricks.Table.THead>
            <UU5.Bricks.Table.Tr>
              <UU5.Bricks.Table.Th content="Jméno" />
              <UU5.Bricks.Table.Th content="Bio" />
              <UU5.Bricks.Table.Th content="Průběžné hodnocení" />
            </UU5.Bricks.Table.Tr>
          </UU5.Bricks.Table.THead>
          <UU5.Bricks.Table.TBody allowTags={["TableRow"]}>
            {data.map((singleData) => (
              <UU5.Bricks.Table.Tr key={singleData.id}>
                <UU5.Bricks.Table.Td content={singleData.name} />
                <UU5.Bricks.Table.Td content={singleData.bio} />
                <UU5.Bricks.Table.Td content={singleData.rating + "%"} />
              </UU5.Bricks.Table.Tr>
            ))}
          </UU5.Bricks.Table.TBody>
        </UU5.Bricks.Table>
      </>
    );
    //@@viewOff:render
  },
});

export default Table;
