//@@viewOn:imports
import {
  Utils,
  createVisualComponent,
  Environment,
  Lsi,
  DynamicLibraryComponent,
  useSession,
  useDynamicLibraryComponent,
} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import AboutCfg from "../config/about.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  content: () => Config.Css.css`
    margin: 0 auto;
    max-width: 920px;

    .plus4u5-app-about > .uu5-bricks-header,
    .plus4u5-app-licence > .uu5-bricks-header,
    .plus4u5-app-authors > .uu5-bricks-header,
    .plus4u5-app-technologies > .uu5-bricks-header {
      border-bottom: 0;
    }

    .plus4u5-app-authors > .uu5-bricks-header {
      margin: 20px 0 10px 0;
      text-align: center;
    }

    > *:last-child {
      padding-bottom: 56px;
    }
  `,
  technologies: () => Config.Css.css({ maxWidth: 480 }),
  logos: () => Config.Css.css({ textAlign: "center", marginTop: 56 }),
  common: () =>
    Config.Css.css({
      maxWidth: 480,
      margin: "12px auto 56px",

      "& > *": {
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        padding: "9px 0 12px",
        textAlign: "center",
        color: "#828282",
        "&:last-child": {
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        },
      },
    }),
  technologiesLicenseRow: () =>
    Config.Css.css({
      display: "grid",
      gridTemplateColumns: "minmax(0, 12fr)",
      marginTop: 40,
      padding: "0 8px",
      gap: "0 16px",
      borderTop: "1px solid rgba(0,0,0,.12)",
      ...Utils.Style.getMinMediaQueries("l", {
        gridTemplateColumns: "minmax(0, 8fr) minmax(0, 4fr)",
      }),
    }),
  license: () => Config.Css.css({ width: "auto" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let About = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "About",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { awid } = useSubApp();
    const { state: sessionState } = useSession();
    const { data: systemData } = useSystemData();
    const {
      uuAppUuFlsBaseUri,
      uuAppUuSlsBaseUri,
      uuAppBusinessModelUri,
      uuAppApplicationModelUri,
      uuAppBusinessRequestsUri,
      uuAppUserGuideUri,
      uuAppWebKitUri,
      uuAppProductPortalUri,
    } = systemData?.relatedObjectsMap || {};
    const products = [];
    if (uuAppBusinessModelUri) products.push({ baseUri: uuAppBusinessModelUri });
    if (uuAppApplicationModelUri) products.push({ baseUri: uuAppApplicationModelUri });
    if (uuAppBusinessRequestsUri) products.push({ baseUri: uuAppBusinessRequestsUri });
    if (uuAppUserGuideUri) products.push({ baseUri: uuAppUserGuideUri });
    if (uuAppWebKitUri) products.push({ baseUri: uuAppWebKitUri });

    const { leadingAuthors, otherAuthors, license, about, usedTechnologies } = AboutCfg;

    const { state } = useDynamicLibraryComponent("Plus4U5.App.About");
    const legacyComponentsReady = !state.startsWith("pending");
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return legacyComponentsReady ? (
      <div {...attrs}>
        <RouteBar />
        <div className={Css.content()}>
          <DynamicLibraryComponent
            uu5Tag="Plus4U5.App.About"
            header={<Lsi import={importLsi} path={["About", "header"]} />}
            content={about}
          />
          {sessionState === "authenticated" ? (
            <DynamicLibraryComponent
              uu5Tag="Plus4U5.App.Support"
              uuFlsUri={uuAppUuFlsBaseUri}
              uuSlsUri={uuAppUuSlsBaseUri}
              productCode="support/uuHomework"
              productPortalUri={uuAppProductPortalUri}
            />
          ) : null}
          {products.length > 0 ? (
            <DynamicLibraryComponent uu5Tag="UuProductCatalogue.Bricks.ProductList" type="16x9" products={products} />
          ) : null}
          <div className={Css.common()}>
            <div>{`uuHomework ${Environment.appVersion}`}</div>
            {license.termsOfUse && (
              <div>
                <Uu5Elements.Link href={license.termsOfUse} target="_blank">
                  <Lsi import={importLsi} path={["About", "termsOfUse"]} />
                </Uu5Elements.Link>
              </div>
            )}
          </div>
          <DynamicLibraryComponent
            uu5Tag="Plus4U5.App.Authors"
            header={<Lsi import={importLsi} path={["About", "creatorsHeader"]} />}
            leadingAuthors={leadingAuthors}
            otherAuthors={otherAuthors}
          />
          <div className={Css.technologiesLicenseRow()}>
            <div>
              <DynamicLibraryComponent
                uu5Tag="Plus4U5.App.Technologies"
                technologies={usedTechnologies.technologies}
                content={usedTechnologies.content}
                textAlign="left"
                className={Css.technologies()}
              />
            </div>
            <div>
              <DynamicLibraryComponent
                uu5Tag="Plus4U5.App.Licence"
                organisation={license.organisation}
                authorities={license.authorities}
                awid={<Uu5Elements.Link href={Environment.appBaseUri}>{awid}</Uu5Elements.Link>}
                textAlign="left"
                className={Css.license()}
              />
            </div>
          </div>
          <div className={Css.logos()}>
            <img height={80} src="assets/plus4u.svg" />
            <img height={80} src="assets/unicorn.svg" />
          </div>
        </div>
      </div>
    ) : (
      <Plus4U5App.SpaPending />
    );
  },
  //@@viewOff:render
});

About = withRoute(About);

//@@viewOn:exports
export { About };
export default About;
//@@viewOff:exports
