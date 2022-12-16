//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { useState, useContext } from "uu5g05";
import Config from "../config/config";
import ShopTile from "./homework_part2_shopTile";
import CSS from "./homework_part2_shopTile.css";
import { ColorSchemaContext } from "../context/ColorSchemaContext";

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
    onIncrease: () => {},
  },
  
  //@@viewOff:defaultProps

  render({ shopTiles, onDetail, onUpdate, onDelete, onIncrease }) {
    const { colorSchema } = useContext(ColorSchemaContext);
    //@@viewOn:render
    if (shopTiles.length === 0) {
      return <UU5.Common.Error content="No shopTiles!" />;
    }
    function renderHeader() {
      let totalAmount = 0
      shopTiles.forEach(element => {
        totalAmount = totalAmount + parseInt(element.currentValue);
        
      });
       return <div className={CSS.h1()}>
          <div>
          Celkem zakazniku: {totalAmount}
          </div>

          </div>;
    }

    return (
      <div>
        <UU5.Bricks.Card header={renderHeader()} 
        borderRadius="8px" 
        bgStyle="filled"></UU5.Bricks.Card>
        {shopTiles
          .map((shopTile) => (
            <ShopTile
              key={shopTile.id}
              shopTile={shopTile}
              colorSchema={colorSchema}
              onDetail={onDetail}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onIncrease={onIncrease}
            />
          ))
          }
      </div>
    );
    //@@viewOff:render
  },
});

export default ShopTileList;
