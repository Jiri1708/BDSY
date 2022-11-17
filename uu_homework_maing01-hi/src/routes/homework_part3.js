//@@viewOn:imports
import { createVisualComponent,useState } from "uu5g05";
import Config from "./config/config";
import RouteBar from "../core/route-bar";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Chart from "../bricks/homework_part3/homework_part3_charts";
//import Charts from "../bricks/homework_part3/homework_part3_charts.js";
//@@viewOff:imports
 //@@viewOn:constants
const chartSeries = {
  series: [
    {
      valueKey: "pocet",
      name: "Populace (x 100)",
      colorSchema: "blue-rich"
    },
    {
      valueKey: "narozeni",
      name: "Živě narození",
      colorSchema: "green-rich"
    },
    {
      valueKey: "umrti",
      name: "Zemřelí",
      colorSchema: "red-rich"
    }
  ]
}
const years = {
  "2022": {label: "2022", pocet: 105257, narozeni: 50011, umrti: 59661},
  "2021": {label: "2021", pocet: 105157, narozeni: 111793, umrti: 139891},
  "2020": {label: "2020", pocet: 107018, narozeni: 110200, umrti: 129289},
  "2019": {label: "2019", pocet: 106939, narozeni: 112231, umrti: 112362},
  "2018": {label: "2018", pocet: 106498, narozeni: 114036, umrti: 112920}

}
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
  const [selectedYear, setYear] = useState(1)
  const [chartData, setChartData] = useState([years[2022]])
  //@@viewOff:private

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:render

  function yearTextFormatter(num) {
    const header_text = {
      1: "poslední 1 rok",
      2: "poslední 2 roky",
      3: "poslední 3 roky",
      4: "poslední 4 roky",
      5: "posledních 5 let"
    }
    return header_text[num]
  }

  function processChartData(_setYear, _setChartData) {
    setYear(_setYear);
    setChartData([years[2022], years[2021], years[2020], years[2019], years[2018]].slice(0, _setYear))
  }

  return (<div>
       <RouteBar />
      <h1 className={"text-align: center"}>Statistiky obyvatelstva v ČR za {yearTextFormatter(selectedYear)}</h1>

      <UU5.Bricks.Row>
        <UU5.Bricks.Column colWidth="xl-2">
          <h2 className={"text-align: right"}>Roky:</h2>
        </UU5.Bricks.Column>

        <UU5.Bricks.Column colWidth="xl-7">
          <UU5.Bricks.ButtonGroup elevation={2} borderRadius="8px" baseline={true} colorSchema="blue" size="l">
            <UU5.Bricks.Button content="1" onClick={() => processChartData(1)}/>
            <UU5.Bricks.Button content="2" onClick={() => processChartData(2)}/>
            <UU5.Bricks.Button content="3" onClick={() => processChartData(3)}/>
            <UU5.Bricks.Button content="4" onClick={() => processChartData(4)}/>
            <UU5.Bricks.Button content="5" onClick={() => processChartData(5)}/>
          </UU5.Bricks.ButtonGroup>
        </UU5.Bricks.Column>
      </UU5.Bricks.Row>

      <Chart dataDtoIn={chartData} seriesDtoIn={chartSeries["series"]}/>
    </div>

  );

  //@@viewOff:render
},
});

export default Homework_part3;
