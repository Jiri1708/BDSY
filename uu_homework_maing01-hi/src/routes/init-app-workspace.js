//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useDataObject, Environment } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Calls from "calls";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const RELATIVE_URI_REGEXP = new RegExp(/^\/[^/]/);
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      maxWidth: 512,
      margin: "auto",
    }),
  formControls: () =>
    Config.Css.css({
      marginTop: 24,
      textAlign: "right",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
async function save(values) {
  let originalUrl = new URLSearchParams(window.location.search).get("originalUrl");
  let workspace = await Calls.initAndGetWorkspace(values);
  let redirectPath;
  if (workspace && workspace.artifactUri) {
    redirectPath = Environment.appBaseUri + "controlPanel";
  } else if (originalUrl && RELATIVE_URI_REGEXP.test(originalUrl)) {
    redirectPath = originalUrl;
  } else {
    redirectPath = Environment.appBaseUri;
  }
  window.location.replace(redirectPath);
  return new Promise(() => {}); // don't resolve - we'll keep form disabled until reload happens
}
//@@viewOff:helpers

let InitAppWorkspace = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InitAppWorkspace",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { state, data, errorData } = useDataObject({
      handlerMap: { load: Calls.loadIdentityProfiles },
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    let child;

    if (state === "error" || state === "errorNoData") {
      child = (
        <Plus4U5App.Error error={errorData?.error}>
          <Lsi import={importLsi} path={["InitAppWorkspace", "notAuthorized"]} />
        </Plus4U5App.Error>
      );
    } else if (state === "pending" || state === "pendingNoData") {
      child = <Plus4U5App.SpaPending />;
    } else {
      if (Array.isArray(data.authorizedProfileList) && data.authorizedProfileList.length > 0) {
        const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
        child = (
          <div {...attrs}>
            <Uu5Elements.Block
              header={
                <Uu5Elements.Text category="story" segment="heading" type="h2">
                  <Lsi import={importLsi} path={["InitAppWorkspace", "formHeader"]} />
                </Uu5Elements.Text>
              }
              info={<Lsi import={importLsi} path={["InitAppWorkspace", "formHeaderInfo"]} />}
              collapsible={false}
            >
              <Uu5Forms.Form onSubmit={async (e) => save(e.data.value)}>
                <Uu5Forms.FormText
                  required
                  name="uuBtLocationUri"
                  label={<Lsi import={importLsi} path={["InitAppWorkspace", "uuBtLocationUriLabel"]} />}
                  info={<Lsi import={importLsi} path={["InitAppWorkspace", "uuBtLocationUriInfo"]} />}
                />
                <Uu5Forms.FormText
                  name="name"
                  label={<Lsi import={importLsi} path={["InitAppWorkspace", "nameLabel"]} />}
                />

                <div className={Css.formControls()}>
                  <Uu5Forms.SubmitButton colorScheme="primary">
                    <Lsi import={importLsi} path={["InitAppWorkspace", "initialize"]} />
                  </Uu5Forms.SubmitButton>
                </div>
              </Uu5Forms.Form>
            </Uu5Elements.Block>
          </div>
        );
      } else {
        child = (
          <Plus4U5App.Error>
            <Lsi import={importLsi} path={["InitAppWorkspace", "notAuthorizedForInit"]} />
          </Plus4U5App.Error>
        );
      }
    }
    return (
      <>
        <RouteBar />
        {child}
      </>
    );
  },
  //@@viewOff:render
});

InitAppWorkspace = withRoute(InitAppWorkspace, { authenticated: true });

//@@viewOn:exports
export { InitAppWorkspace };
export default InitAppWorkspace;
//@@viewOff:exports
