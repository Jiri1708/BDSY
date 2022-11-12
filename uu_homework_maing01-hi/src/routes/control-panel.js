//@@viewOn:imports
import { createVisualComponent, useDataObject, Lsi, LevelProvider, DynamicLibraryComponent } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Calls from "calls";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let ControlPanel = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ControlPanel",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { state, data, errorData } = useDataObject({ handlerMap: { load: Calls.getWorkspace } });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    let child;
    let territoryBaseUri;
    let artifactId;
    if (state === "error" || state === "errorNoData") {
      child = (
        <Plus4U5App.Error error={errorData?.error}>
          <Lsi import={importLsi} path={["ControlPanel", "rightsError"]} />
        </Plus4U5App.Error>
      );
    } else if (state === "pending" || state === "pendingNoData") {
      child = <Plus4U5App.SpaPending />;
    } else if (data.artifactUri) {
      const url = new URL(data.artifactUri);
      url.pathname = url.pathname.split("/", 3).join("/");
      territoryBaseUri = url.href.split("?")[0];
      artifactId = url.searchParams.get("id");
      child = (
        <LevelProvider level={0}>
          <DynamicLibraryComponent
            {...props}
            uu5Tag="UuTerritory.ArtifactIfc.Bricks.PermissionSettings"
            style={{ margin: 24, width: "auto" }} // TODO Use className when uu_territory gets fixed (it ignores it now)
            territoryBaseUri={territoryBaseUri}
            artifactId={artifactId}
          />
        </LevelProvider>
      );
    } else {
      child = (
        <Uu5Elements.HighlightedBox icon="mdi-alert-circle" colorScheme="negative">
          <Lsi import={importLsi} path={["ControlPanel", "btNotConnected"]} />
        </Uu5Elements.HighlightedBox>
      );
    }
    return (
      <>
        <RouteBar />
        {child}
      </>
    );
    //@@viewOff:render
  },
});

ControlPanel = withRoute(ControlPanel, { authenticated: true });

//@@viewOn:exports
export { ControlPanel };
export default ControlPanel;
//@@viewOff:exports
