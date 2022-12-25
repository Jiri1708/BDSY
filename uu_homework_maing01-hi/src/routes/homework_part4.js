//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import Modal from "../bricks/homework_part4/homework_part4_modal";
import RouteBar from "../core/route-bar";
import { ColorSchemaChanger } from "../bricks/homework_part5/homework_part5_switch";
import { ColorSchemaContext } from "../bricks/context/ColorSchemaContext";
import VehicleProvider from "../bricks/homework_part4/homework_part4_vehicle-provider";
import VehicleList from "../bricks/homework_part4/homework_part4_vehicle-list";
import { FilterProvider } from "../bricks/context/FilterContext";
//@@viewOff:imports

const Bazar = createVisualComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "Bazar",
  //@@viewOff:statics

  render() {
    //@@viewOn:hooks
    const { colorSchema } = useContext(ColorSchemaContext);
    const modalRef = useRef();
    function openFilter() {
      modalRef.current.open();
    }
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ColorSchemaChanger />
        <h1>Bazar</h1>
        <FilterProvider>
          <UU5.Bricks.Button colorSchema={colorSchema} onClick={openFilter}>
            <UU5.Bricks.Icon icon="mdi-magnify" /> Filtr
          </UU5.Bricks.Button>
          <Modal ref={modalRef} />
          <VehicleProvider>
            {({ vehicles }) => {
              return (
                <>
                  <VehicleList vehicles={vehicles} />
                </>
              );
            }}
          </VehicleProvider>
        </FilterProvider>
      </>
      //@@viewOff:render
    );
  },
});

export default Bazar;
