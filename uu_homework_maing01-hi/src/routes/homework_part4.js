//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import Modal from "../bricks/homework_part4/homework_part4_modal";
import RouteBar from "../core/route-bar";
import { ColorSchemaChanger } from "../bricks/homework_part5/homework_part5_switch";
import { ColorSchemaContext } from "../bricks/context/ColorSchemaContext";
//@@viewOff:imports

const Bazar = createVisualComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "Bazar",
  //@@viewOff:statics

  render() {
    //@@viewOn:hooks
 const { colorSchema } = useContext(ColorSchemaContext);
    const detailRef = useRef();
    function openFilter() {
      detailRef.current.open();
    }
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return(

      <>
        <RouteBar />
        <ColorSchemaChanger />
        <h1>Bazar</h1>
        <UU5.Bricks.Button colorSchema={colorSchema} onClick={openFilter}>
          <UU5.Bricks.Icon></UU5.Bricks.Icon>
        </UU5.Bricks.Button>
        <Modal ref={detailRef} />
      </>
      //@@viewOff:render
    )
  },
});

export default Bazar;
