//@@viewOn:imports
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import RouteBar from "../core/route-bar";
import UU5 from "uu5g04";
import "uu5g04-bricks";
//@@viewOff:imports

const Homework_part3 = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Homework_part3",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <div>
        <RouteBar />
        <UU5.Bricks.Row>
          homework 3
        </UU5.Bricks.Row>
      </div>
    );
    //@@viewOff:render
  },
});

export default Homework_part3;