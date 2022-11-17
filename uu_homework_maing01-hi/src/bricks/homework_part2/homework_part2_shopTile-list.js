//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
import ShopTile from "./homework_part2_shopTile";

//@@viewOff:imports

const ShopTileList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ShopTileList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    shopTiles: UU5.PropTypes.array.isRequired,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shopTiles: [],
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ shopTiles, onDetail, onUpdate, onDelete }) {
    //@@viewOn:render
    if (shopTiles.length === 0) {
      return <UU5.Common.Error content="No shopTiles!" />;
    }

    return (
      <div>
        {shopTiles.map((shopTile) => (
          <ShopTile
            key={shopTile.id}
            shopTile={shopTile}
            colorSchema="green"
            onDetail={onDetail}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
    //@@viewOff:render
  },
});

export default ShopTileList;
