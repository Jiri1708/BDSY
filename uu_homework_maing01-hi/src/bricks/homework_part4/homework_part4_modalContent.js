//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useRef, useContext } from "uu5g04-hooks";
import { ColorSchemaContext } from "../context/ColorSchemaContext";
import Config from "../config/config";
import { FilterContext } from "../context/FilterContext";
//@@viewOff:imports

const ModalContent = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ModalContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},

  //@@viewOff:defaultProps

  render() {
    //@@viewOn:hooks

    //@@viewOff:hooks

    //@@viewOn:private
     const { colorSchema } = useContext(ColorSchemaContext);
    const [driveTrain, setDriveTrain] = useState();
    const [carMaker, setCarMaker] = useState();
    const [mileage, setMileage] = useState();
    const [price, setPrice] = useState();
    const [maker, setMaker] = useState();
    const [model, setModel] = useState();
    const [mileageFrom, setMileageFrom] = useState(0);
    const [mileageTo, setMileageTo] = useState(200000);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(500000);
    const audi = ["A1", "A3", "A4", "A5", "A8"];
    const bmw = ["1", "3", "4", "5", "7"];
    const vw = ["Polo", "Golf", "Arteon", "Passat", "Tiguan"];

    const handleClickPrice = (e) => setPrice(e.value);
    const handleClickMileage = (e) => setMileage(e.value);
    const handleClickModel = (e) => setModel(e.value);
    const handleClickMileageFrom = (e) => setMileageFrom(e.value);
    const handleClickMileageTo = (e) => setMileageTo(e.value);
    const handleClickPriceFrom = (e) => setPriceFrom(e.value);
    const handleClickPriceTo = (e) => setPriceTo(e.value);

    function handleClickCarMaker(e) {
      setMaker(e.value);
      switch (e.value) {
        case "Audi":
          setCarMaker(
            audi.map((audi) => <UU5.Forms.Select.Option value={audi} key={Math.random()}></UU5.Forms.Select.Option>)
          );
          break;
        case "BMW":
          setCarMaker(
            bmw.map((bmw) => <UU5.Forms.Select.Option value={bmw} key={Math.random()}></UU5.Forms.Select.Option>)
          );
          break;
        case "VW":
          setCarMaker(
            vw.map((vw) => <UU5.Forms.Select.Option value={vw} key={Math.random()}></UU5.Forms.Select.Option>)
          );
          break;
        default:
          setCarMaker();
          break;
      }
      setModel();
    }

    const { initVehicles, vehicles, setVehicles } = useContext(FilterContext);
    function handleClickFilter() {
      // alert(e.value)
      let filteredVehicles = initVehicles;
      console.log(maker);
      if (maker) filteredVehicles = filteredVehicles.filter((x) => x.carMaker == maker);
      if (model) filteredVehicles = filteredVehicles.filter((x) => x.model == model);
      if (driveTrain) filteredVehicles = filteredVehicles.filter((x) => x.driveTrain == driveTrain);
      switch (price) {
        case "0":
          filteredVehicles = filteredVehicles.filter((x) => x.price < 100000);
          break;
        case "1":
          filteredVehicles = filteredVehicles.filter((x) => x.price >= 100000 && x.price < 250000);
          break;
        case "2":
          filteredVehicles = filteredVehicles.filter((x) => x.price >= 250000);
          break;
        default:
          break;
      }
      if (mileageFrom) filteredVehicles = filteredVehicles.filter((x) => x.mileage >= mileageFrom);
      if (mileageTo) filteredVehicles = filteredVehicles.filter((x) => x.mileage <= mileageTo);
      if (priceFrom) filteredVehicles = filteredVehicles.filter((x) => x.price >= priceFrom);
      if (priceTo) filteredVehicles = filteredVehicles.filter((x) => x.price <= priceTo);

      switch (mileage) {
        case "0":
          filteredVehicles = filteredVehicles.filter((x) => x.mileage < 50000);
          break;
        case "1":
          filteredVehicles = filteredVehicles.filter((x) => x.mileage >= 50000 && x.mileage < 100000);
          break;
        case "2":
          filteredVehicles = filteredVehicles.filter((x) => x.mileage >= 100000);
          break;
        default:
          break;
      }

      setVehicles(filteredVehicles);
    }

    const handleClickReset = () => {
      setMaker();
      setModel();
      setMileage();
      setPrice();
      setDriveTrain();
      setMileageFrom(0);
      setMileageTo(200000);
      setPriceFrom(0);
      setPriceTo(500000);
      setVehicles(initVehicles);
    };

    const handleChangeRadio = (e) => setDriveTrain(e);

    function renderRadios() {
      let radios = [
        { label: "Benzin", name: "petrol", value: false },
        { label: "Diesel", name: "diesel", value: false },
        { label: "Elektro", name: "electric", value: false },
      ];
      for (let index = 0; index < radios.length; index++) {
        const element = radios[index];
        element.value = element.name == driveTrain ? true : false;
      }
      return radios;
    }

    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <UU5.Forms.Radios
          onChange={(e) => handleChangeRadio(e.value)}
          label="Palivo"
          colorSchema={colorSchema}
          size="m"
          value={renderRadios()}
        />
        <UU5.Forms.Select
          label="Značka"
          value={maker}
          colorSchema={colorSchema}
          onChange={(e) => handleClickCarMaker(e)}
        >
          <UU5.Forms.Select.Option value="Audi" />
          <UU5.Forms.Select.Option value="BMW" />
          <UU5.Forms.Select.Option value="VW" />
        </UU5.Forms.Select>

        <UU5.Forms.Select label="Model" value={model} colorSchema={colorSchema} onChange={(e) => handleClickModel(e)}>
          {carMaker}
        </UU5.Forms.Select>
        <UU5.Forms.Slider
          colorSchema={colorSchema}
          step={25000}
          min={0}
          max={mileageTo}
          value={mileageFrom}
          label="Nájezd od"
          onChange={(e) => handleClickMileageFrom(e)}
        ></UU5.Forms.Slider>
        <UU5.Forms.Slider
          colorSchema={colorSchema}
          step={25000}
          min={mileageFrom}
          max={200000}
          label="Nájezd do"
          value={mileageTo}
          onChange={(e) => handleClickMileageTo(e)}
        ></UU5.Forms.Slider>
        <UU5.Forms.Slider
          colorSchema={colorSchema}
          step={25000}
          min={0}
          max={priceTo}
          value={priceFrom}
          label="Cena od"
          onChange={(e) => handleClickPriceFrom(e)}
        ></UU5.Forms.Slider>
        <UU5.Forms.Slider
          colorSchema={colorSchema}
          step={25000}
          min={priceFrom}
          max={500000}
          label="Cena do"
          value={priceTo}
          onChange={(e) => handleClickPriceTo(e)}
        ></UU5.Forms.Slider>
        <UU5.Bricks.ButtonGroup>
          <UU5.Bricks.Button colorSchema={colorSchema} onClick={handleClickFilter}>
            <UU5.Bricks.Icon icon="mdi-magnify" /> Filtr
          </UU5.Bricks.Button>
          <UU5.Bricks.Button colorSchema={colorSchema} onClick={handleClickReset}>
            <UU5.Bricks.Icon icon="uu5-cross" />
            Reset Filtr
          </UU5.Bricks.Button>
        </UU5.Bricks.ButtonGroup>
      </>
    );
    //@@viewOff:render
  },
});

export default ModalContent;
