//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import image from "../assets/graph.png";
import CSS from "./homework_part1_graph.css";
//@@viewOff:imports

const Graph = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Graph",
  //@@viewOff:statics

  render() {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render

    function renderHeading() {
      return <h2 className={CSS.heading()}>Průběžné hodnocení podle témat</h2>;
    }

    return (
      <>
        {renderHeading()}
        <UU5.Bricks.Card className={CSS.main()}>
          <UU5.Bricks.Image src={image} alt="logo" name="Image description" />
        </UU5.Bricks.Card>
      </>
    );
    //@@viewOff:render
  },
});

export default Graph;
