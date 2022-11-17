//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
import "uu5g04-forms";
//@@viewOff:imports

const ShopTileCreateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ShopTileCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render({ onSave, onCancel }) {
    //@@viewOn:render
    return (
      <UU5.Forms.Form onSave={onSave} onCancel={onCancel}>
        <UU5.Forms.Text label="Nazev" name="name" />
        <UU5.Forms.Number label="Initial Value" name="currentValue" min={0}value={0} />
        <UU5.Forms.Number label="Max Value" name="maxValue"min={1} value={1} />
        <UU5.Forms.Controls />
      </UU5.Forms.Form>
    );
    //@@viewOff:render

    
  },
});

export default ShopTileCreateForm;
