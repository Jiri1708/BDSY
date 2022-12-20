//@@viewOn:imports
import { createVisualComponent, useState, useContext } from "uu5g05";
import Config from "./config/config";
import RouteBar from "../core/route-bar";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-forms";
import Chart from "../bricks/homework_part3/homework_part3_charts";
import { ColorSchemaContext } from "../bricks/context/ColorSchemaContext";

//@@viewOff:imports
//@@viewOn:constants

//@@viewOn:CSS
const h1 = () => Config.Css.css`
text-align: center
`;
const h2 = () => Config.Css.css`
text-align: right
`;
//@@viewOff:CSS
const chartSeries = {
  series: [
    {
      valueKey: "pocet",
      name: "Celková populace (x100)",
      colorSchema: "purple-rich",
    },
    {
      valueKey: "narozeni",
      name: "Narození",
      colorSchema: "black",
    },
    {
      valueKey: "umrti",
      name: "Zemřelí",
      colorSchema: "red-rich",
    },
  ],
};
const years = {
  22: { label: "2022", pocet: 105257, narozeni: 50011, umrti: 59661 },
  21: { label: "2021", pocet: 105157, narozeni: 111793, umrti: 139891 },
  20: { label: "2020", pocet: 107018, narozeni: 110200, umrti: 129289 },
  19: { label: "2019", pocet: 106939, narozeni: 112231, umrti: 112362 },
  18: { label: "2018", pocet: 106498, narozeni: 114036, umrti: 112920 },
};
//@@viewOff:constants
const Homework_part3 = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Homework_part3",

  //@@viewOff:statics
  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [inputYear, setYear] = useState(1);
    const [chartData, setChartData] = useState([years[22]]);
    const { colorSchema } = useContext(ColorSchemaContext);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    function yearTextFormatter(inputNum) {
      const header_text = {
        1: "poslední 1 rok",
        2: "poslední 2 roky",
        3: "poslední 3 roky",
        4: "poslední 4 roky",
        5: "posledních 5 let",
      };
      return header_text[inputNum];
    }

    function processChartData(_setYear, _setChartData) {
      setYear(_setYear);
      setChartData([years[22], years[21], years[20], years[19], years[18]].slice(0, _setYear));
    }

    return (
      <>
        <RouteBar />
        <h1 className={h1()}>Statistiky obyvatelstva v ČR za {yearTextFormatter(inputYear)}</h1>
        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="xl-5">
            <h2 className={h2()}>Roky:</h2>
          </UU5.Bricks.Column>
          <UU5.Bricks.Column colWidth="xl-7">
            <UU5.Bricks.ButtonGroup
              elevation={5}
              baseline={true}
              borderRadius="12px"
              colorSchema={colorSchema}
              size="xl"
            >
              <UU5.Bricks.Button content="1" onClick={() => processChartData(1)} />
              <UU5.Bricks.Button content="2" onClick={() => processChartData(2)} />
              <UU5.Bricks.Button content="3" onClick={() => processChartData(3)} />
              <UU5.Bricks.Button content="4" onClick={() => processChartData(4)} />
              <UU5.Bricks.Button content="5" onClick={() => processChartData(5)} />
            </UU5.Bricks.ButtonGroup>
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
        <Chart dataDtoIn={chartData} seriesDtoIn={chartSeries["series"]} />
      </>
    );

    //@@viewOff:render
  },
});

export default Homework_part3;
