//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();

    const appActionList = [
      { children: <Lsi import={importLsi} path={["Menu", "home"]} />, onClick: () => setRoute("home") },
      {
        children: <Lsi import={importLsi} path={["Menu", "about"]} />,
        onClick: () => setRoute("about"),
        collapsed: true,
      },
      {
        children: <Lsi import={importLsi} path={["Menu", "homework_part1"]} />,
        onClick: () => setRoute("homework_part1"),
      },
      {
        children: <Lsi import={importLsi} path={["Menu", "homework_part2"]} />,
        onClick: () => setRoute("homework_part2"),
      },
      {
        children: <Lsi import={importLsi} path={["Menu", "homework_part3"]} />,
        onClick: () => setRoute("homework_part3"),
      }
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <Plus4U5App.RouteBar appActionList={appActionList} {...props} />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
