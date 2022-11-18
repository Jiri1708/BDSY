//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState } from "uu5g04-hooks";
import Config from "../config/config";
import ShopTileCreateForm from "./homework_part2_shopTile-createForm";

//@@viewOff:imports

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

const ShopTileCreate = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ShopTileCreate",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onCreate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onCreate: () => {},
  },
  //@@viewOff:defaultProps

  render({ onCreate }) {
    //@viewOn:hooks
    const [mode, setMode] = useState(Mode.BUTTON);
    //@viewOff:hooks

    //@@viewOn:private
    function handleAddClick() {
      setMode(Mode.FORM);
    }

    function handleSave(opt) {
      onCreate(opt.values);
      setMode(Mode.BUTTON);
    }

    function handleCancel(shopTile) {
      setMode(Mode.BUTTON);
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderButton() {
      return <UU5.Bricks.Button onClick={handleAddClick} colorSchema="primary" content="Add shop tile" />;
    }

    function renderForm() {
      return <ShopTileCreateForm onSave={handleSave} onCancel={handleCancel} />;
    }

    switch (mode) {
      case Mode.BUTTON:
        return renderButton();
      default:
        return renderForm();
    }
    //@@viewOff:render
  },
});

export default ShopTileCreate;
