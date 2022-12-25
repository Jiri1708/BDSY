//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useContext } from "uu5g04-hooks";
import Config from "../config/config";
import { FilterContext } from "../context/FilterContext";
//@@viewOff:imports


const VehicleProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "VehicleProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:private
   
    const { initVehicles, vehicles } = useContext(FilterContext);
    //@@viewOff:private
   
    //@@viewOn:render

    return children(
    {vehicles});
    //@@viewOff:render
  },
});

export default VehicleProvider;
