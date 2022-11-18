//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
import CSS from "./homework_part2_shopTile.css";
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
    onIncrease: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shopTile: null,
    colorSchema: "red",
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onIncrease: () => {},
  },
  //@@viewOff:defaultProps

  render({ shopTile, colorSchema, onDelete, onIncrease }) {
    //@@viewOn:private
    function handleDelete() {
      onDelete(shopTile);
    }
     function handleIncrease() {
       onIncrease(shopTile);
     }
    //@@viewOff:private
    console.log(shopTile);
    //@@viewOn:render
    function renderHeader() {
      return <div className={CSS.h1()}>{shopTile.name}</div>;
    }

    if (!shopTile) {
      return ;
    }

    return (
      // <div className={CSS.main()}>
      <UU5.Bricks.Card
        header={renderHeader()}
        inline={true}
        borderRadius="8px"
        bgStyle="filled"
        width={300}
        className={CSS.main()}
      >
        Aktualní počet zákazníků: <div>{shopTile.currentValue}</div>
        Maximální počet zákazníků: <div>{shopTile.maxValue}</div>
        <div className={CSS.btnGroupWrap()}>

        <UU5.Bricks.ButtonGroup className={CSS.btnGroup()}>
          <UU5.Bricks.Button onClick={handleDelete} colorSchema="red">
            <UU5.Bricks.Icon icon="mdi-delete" />
          </UU5.Bricks.Button>
          <UU5.Bricks.Button  onClick={handleIncrease} colorSchema="green">
            +1
          </UU5.Bricks.Button>
        </UU5.Bricks.ButtonGroup>
        </div>
      </UU5.Bricks.Card>
      // </div>
    );
    //@@viewOff:render
  },
});

export default ShopTile;
