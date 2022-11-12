//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: ({ screenSize }) =>
    Config.Css.css({
      display: "flex",
      maxWidth: 624,
      padding: "24px 0",
      margin: "0 auto",
      flexWrap: "wrap",
      ...(screenSize === "xs" ? { justifyContent: "center", textAlign: "center" } : null),
    }),
  left: () =>
    Config.Css.css({
      padding: "0 24px",
    }),
  right: ({ screenSize }) =>
    Config.Css.css({
      flex: 1,
      minWidth: screenSize === "xs" ? "100%" : 0,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const WelcomeRow = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "WelcomeRow",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    left: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    left: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { left, children } = props;
    const [screenSize] = useScreenSize();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main({ screenSize }));
    return (
      <div {...attrs}>
        <div className={Css.left({ screenSize })}>{left}</div>
        <div className={Css.right({ screenSize })}>{children}</div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { WelcomeRow };
export default WelcomeRow;
//@@viewOff:exports
