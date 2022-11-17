//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

let shopTiles = [
  {
    id: 1,
    name: "Globus",
    currentValue: 4,
    maxValue: 21,
  },
  {
    id: 2,
    name: "Hornbach",
    currentValue: 1,
    maxValue: 10,
  },
  {
    id: 3,
    name: "Obi",
    currentValue: 0,
    maxValue: 57,
  },
  {
    id: 4,
    name: "Tesco",
    currentValue: 2,
    maxValue: 5,
  },
  {
    id: 5,
    name: "Penny",
    currentValue: 2,
    maxValue: 15,
  },
];

const ShopTileProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ShopTileProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:private
    function handleDelete(shopTile) {
      shopTiles = shopTile.filter((item) => item.id !== shopTile.id);

      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content: `
        Obchod ${shopTile.name} byl vymazan`,
        });
    }
    //@@viewOff:private

    //@@viewOn:render
    return children({ shopTiles, handleDelete });
    //@@viewOff:render
  },
});

export default ShopTileProvider;
