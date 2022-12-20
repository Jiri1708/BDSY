//@@viewOn:imports
import { createVisualComponent, useState, useContext } from "uu5g05";
import Config from "./config/config";
import RouteBar from "../core/route-bar";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-forms";
import { ColorSchemaContext } from "../bricks/context/ColorSchemaContext";
import { ColorSchemaChanger } from "../bricks/homework_part5/homework_part5_switch";

//@@viewOff:imports
//@@viewOn:constants

//@@viewOn:CSS

//@@viewOff:CSS

//@@viewOff:constants
const Homework_part4 = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Homework_part4",

  //@@viewOff:statics
  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const { colorSchema } = useContext(ColorSchemaContext);
    const [carMaker, setCarMaker] = useState();
    const audi = ["A1", "A3", "A4", "A5", "A8"];
    const bmw = ["1", "3", "4", "5", "7"];
    const vw = ["Polo", "Golf", "Arteon", "Passat", "Tiguan"];
    function handleClick(e) {
      
      switch (e) {
        case "Audi":
          setCarMaker(audi.map((audi) => <UU5.Forms.Select.Option value={audi}></UU5.Forms.Select.Option>));
          break;
        case "BMW":
         setCarMaker(bmw.map((bmw) => <UU5.Forms.Select.Option value={bmw}></UU5.Forms.Select.Option>));
          break;
        case "VW":
          setCarMaker(vw.map((vw) => <UU5.Forms.Select.Option value={vw}></UU5.Forms.Select.Option>));
          break;
        default:
          setCarMaker();
          break;
      }
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <>
        <RouteBar />
        <ColorSchemaChanger />
        <h1>Bazar</h1>
        <UU5.Bricks.Button colorSchema={colorSchema}>
          <UU5.Bricks.Icon></UU5.Bricks.Icon>
        </UU5.Bricks.Button>

        <UU5.Forms.Radios
          label="Palivo"
          colorSchema={colorSchema}
          size="m"
          value={[
            { label: "Benzin", name: "petrol" },
            { label: "Diesel", name: "diesel" },
            { label: "Elektro", name: "electric" },
          ]}
        />
        <UU5.Forms.Select label="Značka" onChange={(e) => handleClick(e.value)}>
          <UU5.Forms.Select.Option value="Audi" />
          <UU5.Forms.Select.Option value="BMW" />
          <UU5.Forms.Select.Option value="VW" />
        </UU5.Forms.Select>

        <UU5.Forms.Select label="Model">
          {carMaker}
        </UU5.Forms.Select>

        <UU5.Forms.Select label="Cena">
          <UU5.Forms.Select.Option value="0" content="do 100 tis. Kč" />
          <UU5.Forms.Select.Option value="1" content="100 tis. - 250 tis. Kč" />
          <UU5.Forms.Select.Option value="2" content="250 tis. Kč +" />
        </UU5.Forms.Select>
        <UU5.Forms.Select label="Nájezd">
          <UU5.Forms.Select.Option value="0" content="do 50 tis. km" />
          <UU5.Forms.Select.Option value="1" content="50 tis. - 100 tis. km" />
          <UU5.Forms.Select.Option value="2" content="100 tis. km +" />
        </UU5.Forms.Select>
      </>
    );

    //@@viewOff:render
  },
});

export default Homework_part4;
