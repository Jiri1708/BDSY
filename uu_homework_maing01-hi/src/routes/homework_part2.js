//@@viewOn:imports
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import RouteBar from "../core/route-bar";
import "uu5g04-bricks";
import ShopTileProvider from "../bricks/homework_part2/homework_part2_shopTile-provider";
import ShopTileList from "../bricks/homework_part2/homework_part2_shopTile-list";
import ShopTileCreate from "../bricks/homework_part2/homework_part2_shopTile-create";
//@@viewOff:imports


const Homework_part2 = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Homework_part2",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ShopTileProvider>
          {({ shopTiles, handleCreate, handleDelete, handleIncrease }) => {
            return (
              <>
                <ShopTileCreate onCreate={handleCreate} />
                <ShopTileList shopTiles={shopTiles} onDelete={handleDelete} onIncrease={handleIncrease} />
              </>
            );
          }}
        </ShopTileProvider>
      </>
    );
    //@@viewOff:render
  },
});

export default Homework_part2;
