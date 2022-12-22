//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useState, useContext } from "uu5g04-hooks";
import Config from "../config/config";
import { FilterContext } from "../context/FilterContext";
//@@viewOff:imports

let initVehicles = [
  {
    id: 1,
    carMaker: "Audi",
    model: "A4",
    driveTrain: "diesel",
    price: 200000,
    mileage: 2000000,
  },
  {
    id: 2,
    carMaker: "Audi",
    model: "A5",
    driveTrain: "petrol",
    price: 290000,
    mileage: 2000000,
  },
  {
    id: 3,
    carMaker: "Audi",
    model: "A3",
    driveTrain: "electric",
    price: 100000,
    mileage: 2000000,
  },
  {
    id: 4,
    carMaker: "Audi",
    model: "A5",
    driveTrain: "electric",
    price: 300000,
    mileage: 2000000,
  },
  {
    id: 5,
    carMaker: "BMW",
    model: "4",
    driveTrain: "electric",
    price: 200000,
    mileage: 300000,
  },
  {
    id: 6,
    carMaker: "BMW",
    model: "2",
    driveTrain: "electric",
    price: 220000,
    mileage: 0,
  },
  {
    id: 7,
    carMaker: "BMW",
    model: "2",
    driveTrain: "petrol",
    price: 220000,
    mileage: 150000,
  },
  {
    id: 8,
    carMaker: "VW",
    model: "Arteon",
    driveTrain: "electric",
    price: 220000,
    mileage: 10000,
  },
  {
    id: 9,
    carMaker: "VW",
    model: "Golf",
    driveTrain: "petrol",
    price: 10000,
    mileage: 20000,
  },
  {
    id: 10,
    carMaker: "VW",
    model: "Passat",
    driveTrain: "diesel",
    price: 20000,
    mileage: 2000000,
  },
];

const VehicleProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "VehicleProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:private
    const [vehicles, setVehicles] = useState(initVehicles);
    const { filter } = useContext(FilterContext);
    //@@viewOff:private
   
    //@@viewOn:render

    return children(
    {vehicles});
    //@@viewOff:render
  },
});

export default VehicleProvider;
