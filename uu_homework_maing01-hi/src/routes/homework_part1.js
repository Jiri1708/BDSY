//@@viewOn:imports
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import RouteBar from "../core/route-bar";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import LectorCard from "../bricks/homework_part1/homework_part1_lectorCard";
import Graph from "../bricks/homework_part1/homework_part1_graph";
import SquareList from "../bricks/homework_part1/homework_part1_squares-list";
import SquareProvider from "../bricks/homework_part1/homework_part1_squares-provider";
import Table from "../bricks/homework_part1/homework_part1_table";
import TableDataProvider from "../bricks/homework_part1/homework_part1_tableData-provider";
import { ColorSchemaChanger } from "../bricks/homework_part4/homework_part4_switch";
//@@viewOff:imports

const Homework_part1 = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Homework_part1",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <div>
        <RouteBar />
        <ColorSchemaChanger></ColorSchemaChanger>
        <UU5.Bricks.Row>
          <SquareProvider>
            {({ squares }) => {
              return <SquareList squares={squares} />;
            }}
          </SquareProvider>
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="xs-6 s-6 m-6">
            <LectorCard />
          </UU5.Bricks.Column>
          <UU5.Bricks.Column colWidth="xs-6 s-6 m-6">
            <Graph />
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
          <TableDataProvider>
            {({ data }) => {
              return <Table data={data} />;
            }}
          </TableDataProvider>
        </UU5.Bricks.Row>
      </div>
    );
    //@@viewOff:render
  },
});

export default Homework_part1;
