//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const ShopTile = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ShopTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    shopTile: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      currentValue: UU5.PropTypes.number.isRequired,
      maxValue: UU5.PropTypes.number.isRequired,
    }),
    colorSchema: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shopTile: null,
    colorSchema: "blue",
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ shopTile, colorSchema, onDelete }) {
    //@@viewOn:private
    function handleDelete() {
      onDelete(shopTile);
    }
    //@@viewOff:private
console.log(shopTile)
    //@@viewOn:render
    function renderHeader() {
      return (
        <>
          {shopTile.name}
          <UU5.Bricks.Button onClick={handleDelete} colorSchema="red">
            <UU5.Bricks.Icon icon="mdi-delete" />
          </UU5.Bricks.Button>
        </>
      );
    }

    if (!shopTile) {
      return (<>
      {shopTile.name}</>);
    }

    return (
      <UU5.Bricks.Card header={renderHeader()} colorSchema={colorSchema}>
        <div>{shopTile.currentValue}</div>
        <div>{shopTile.maxValue}</div>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

export default ShopTile;
