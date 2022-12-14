import React, {createContext, useState} from 'react';

const FilterContext = createContext();
let initVehicles = [
  {
    id: 1,
    carMaker: "Audi",
    model: "A4",
    driveTrain: "diesel",
    price: 200000,
    mileage: 200000,
  },
  {
    id: 2,
    carMaker: "Audi",
    model: "A5",
    driveTrain: "petrol",
    price: 290000,
    mileage: 200000,
  },
  {
    id: 3,
    carMaker: "Audi",
    model: "A3",
    driveTrain: "electric",
    price: 100000,
    mileage: 1500000,
  },
  {
    id: 4,
    carMaker: "Audi",
    model: "A5",
    driveTrain: "electric",
    price: 120000,
    mileage: 100000,
  },
  {
    id: 5,
    carMaker: "BMW",
    model: "4",
    driveTrain: "electric",
    price: 200000,
    mileage: 90000,
  },
  {
    id: 6,
    carMaker: "BMW",
    model: "2",
    driveTrain: "electric",
    price: 20000,
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
    mileage: 200000,
  },
];
function FilterProvider(props){
  
    const [vehicles, setVehicles] = useState(initVehicles);

   
    return (
      <div>
        <FilterContext.Provider value={{ initVehicles, vehicles, setVehicles }}>
          {props.children}
        </FilterContext.Provider>
      </div>
    );
}

export {FilterContext, FilterProvider}