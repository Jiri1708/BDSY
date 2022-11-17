//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

let initialShopTiles = [
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
    const [shopTiles, setShopTiles] = useState(initialShopTiles);

     function handleCreate(shopTile) {
       shopTile.id = UU5.Common.Tools.generateUUID();
       setShopTiles((prevShopTiles) => prevShopTiles.concat([shopTile]));

        UU5.Environment.getPage()
          .getAlertBus()
          .addAlert({
            content: `
        Obchod ${shopTile.name} byl prdian`,
          });
     }

    function handleDelete(shopTile) {
      setShopTiles((prevShopTiles) => prevShopTiles.filter((item) => item.id !== shopTile.id));
      

      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content: `
        Obchod ${shopTile.name} byl vymazan`,
        });
    }
    

    function handleIncrease(shopTile) {
      shopTile.currentValue +=1;    
      setShopTiles((prevShopTiles) => prevShopTiles.filter((item) => item.id !== shopTile.id).concat([shopTile]));

      // UU5.Environment.getPage()
      //   .getAlertBus()
      //   .addAlert({
      //     content: `
      //   Prisel dalsi zakos do obchodu ${shopTile.name} - nyni je to ${shopTile.currentValue+1}`,
      //   });
    }
    //@@viewOff:private
console.log("Tesne pred retubr " + shopTiles)
    //@@viewOn:render
   
    return children({ shopTiles, handleDelete, handleCreate, handleIncrease });
    //@@viewOff:render
  },
});

export default ShopTileProvider;
