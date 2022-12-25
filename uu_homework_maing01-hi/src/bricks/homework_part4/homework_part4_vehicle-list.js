//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { useState, useContext } from "uu5g05";
import Config from "../config/config";
import Vehicle from "./homework_part4_vehicle";
import { ColorSchemaContext } from "../context/ColorSchemaContext";

//@@viewOff:imports
const VehicleList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "VehicleList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    vehicles: UU5.PropTypes.array.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    vehicles: [],
  },

  //@@viewOff:defaultProps

  render({ vehicles }) {
    const { colorSchema } = useContext(ColorSchemaContext);
    //@@viewOn:render
    if (vehicles.length === 0) {
      return <UU5.Common.Error content="No vehicles!" />;
    }

    return (
      <div>
        <UU5.Bricks.Card borderRadius="8px" bgStyle="filled"></UU5.Bricks.Card>
        {vehicles.map((vehicle) => (
          <Vehicle
            key={vehicle.id}
            vehicle={vehicle}
            colorSchema={colorSchema}
          />
        ))}
      </div>
    );
    //@@viewOff:render
  },
});

export default VehicleList;
