//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const Vehicle = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Vehicle",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    vehicle: UU5.PropTypes.shape({
      carMaker: UU5.PropTypes.string,
      model: UU5.PropTypes.string,
      price: UU5.PropTypes.number,
      driveTrain: UU5.PropTypes.string,
    }),
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    vehicle: null,
  },
  //@@viewOff:defaultProps

  render({ vehicle, colorSchema }) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return (
        <div>
          {vehicle.carMaker} {vehicle.model}
        </div>
      );
    }

    // if (!vehicle) {
    //   return;
    // }

    return (
      // <div className={CSS.main()}>
      <UU5.Bricks.Card
        header={renderHeader()}
        inline={true}
        borderRadius="8px"
        bgStyle="filled"
        width={300}
        colorSchema={colorSchema}
      >
        Cena: <div>{vehicle.price}</div>
        Pohon: <div>{vehicle.driveTrain}</div>
        Najezd: <div>{vehicle.mileage}</div>
      </UU5.Bricks.Card>
      // </div>
    );
    //@@viewOff:render
  },
});

export default Vehicle;
