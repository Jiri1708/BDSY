//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useContext } from "uu5g05";
import Config from "../config/config.js";
import "uu5g04-bricks";
import "uu5chartg01";
import CSS from "./homework_part1_charts.css";
import { ColorSchemaContext } from "../context/ColorSchemaContext";
import { ColorSchemaChanger } from "../homework_part5/homework_part5_switch";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Charts = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Charts",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataDtoIn: PropTypes.dictionary,
    seriesDtoIn: PropTypes.dictionary,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { colorSchema } = useContext(ColorSchemaContext);
    return (
      <>
        <ColorSchemaChanger />

        <UU5.Bricks.Row className={CSS.main()}>
          <UU5.SimpleChart.BarChart data={props.dataDtoIn} series={props.seriesDtoIn} />
        </UU5.Bricks.Row>
        <UU5.Bricks.Row className={CSS.main()}>
          <UU5.SimpleChart.LineChart data={props.dataDtoIn} series={props.seriesDtoIn} />
        </UU5.Bricks.Row>
        <UU5.Bricks.Row className={CSS.main()}>
          <UU5.SimpleChart.RadialBarChart colorSchema={colorSchema} data={props.dataDtoIn} series={props.seriesDtoIn} />
        </UU5.Bricks.Row>
        <UU5.Bricks.Row className={CSS.main()}>
          <UU5.SimpleChart.AreaChart data={props.dataDtoIn} series={props.seriesDtoIn} />
        </UU5.Bricks.Row>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Charts };
export default Charts;
//@@viewOff:exports
