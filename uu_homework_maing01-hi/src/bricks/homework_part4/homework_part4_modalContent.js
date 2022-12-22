//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useRef, useContext } from "uu5g04-hooks";

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
    const mileageRef = useRef(null);
    const driveTrainRef = useRef(null);
    const priceRef = useRef(null);
    const makerRef = useRef(null);
    const modelRef = useRef(null);
    const [carMaker, setCarMaker] = useState();
    const [mileage, setMileage] = useState();
    const [price, setPrice] = useState();
    const [maker, setMaker] = useState();
    const [model, setModel] = useState();
    const audi = ["A1", "A3", "A4", "A5", "A8"];
    const bmw = ["1", "3", "4", "5", "7"];
    const vw = ["Polo", "Golf", "Arteon", "Passat", "Tiguan"];

    const handleClickPrice = (e) => setPrice(e.value);
    const handleClickMileage = (e) => setMileage(e.value);
    const handleClickModel = (e) => setModel(e.value);

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

    
    const { filter, setFilter } = useContext(FilterContext);
    const handleClick = () => {
      // alert(e.value)
      setFilter([{ carMaker, model, price, mileage }]);
    };
    //  return (
    //    <UU5.Forms.Select value={colorSchema} onChange={(e) => handleClick(e)}>
    //      <UU5.Forms.Select.Option value="blue" />
    //      <UU5.Forms.Select.Option value="red" />
    //      <UU5.Forms.Select.Option value="green" />
    //    </UU5.Forms.Select>
    //  );
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <UU5.Forms.Radios
          ref={driveTrainRef}
          label="Palivo"
          size="m"
          value={[
            { label: "Benzin", name: "petrol", value: true },
            { label: "Diesel", name: "diesel" },
            { label: "Elektro", name: "electric" },
          ]}
        />
        <UU5.Forms.Select ref={makerRef} label="Značka" value={maker} onChange={(e) => handleClickCarMaker(e)}>
          <UU5.Forms.Select.Option value="Audi" />
          <UU5.Forms.Select.Option value="BMW" />
          <UU5.Forms.Select.Option value="VW" />
        </UU5.Forms.Select>

        <UU5.Forms.Select ref={modelRef} label="Model" value={model} onChange={(e) => handleClickModel(e)}>
          {carMaker}
        </UU5.Forms.Select>

        <UU5.Forms.Select ref={priceRef} label="Cena" value={price} onChange={(e) => handleClickPrice(e)}>
          <UU5.Forms.Select.Option value="0" content="do 100 tis. Kč" />
          <UU5.Forms.Select.Option value="1" content="100 tis. - 250 tis. Kč" />
          <UU5.Forms.Select.Option value="2" content="250 tis. Kč +" />
        </UU5.Forms.Select>
        <UU5.Forms.Select ref={mileageRef} label="Nájezd" value={mileage} onChange={(e) => handleClickMileage(e)}>
          <UU5.Forms.Select.Option value="0" content="do 50 tis. km" />
          <UU5.Forms.Select.Option value="1" content="50 tis. - 100 tis. km" />
          <UU5.Forms.Select.Option value="2" content="100 tis. km +" />
        </UU5.Forms.Select>
        <UU5.Bricks.Button onClick={handleClick}>Test</UU5.Bricks.Button>
      </>
    );
    //@@viewOff:render
  },
});

export default ModalContent;
