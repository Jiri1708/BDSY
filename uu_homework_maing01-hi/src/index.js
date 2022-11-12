import { AppContainer } from "react-hot-loader";
import { Environment, Utils } from "uu5g05";
import "uu5g04"; // required for proper integration with uu5g05

import Spa from "./core/spa.js";

// propagate app version into environment
Environment["appVersion"] = process.env.VERSION;

// consider app as progressive web app, but not on iOS (OIDC login doesn't work there)
if (!navigator.userAgent.match(/iPhone|iPad|iPod/)) {
  let link = document.createElement("link");
  link.rel = "manifest";
  link.href = "assets/manifest.json";
  document.head.appendChild(link);
}

// store the target element selector to use it again during hot update
let _targetElementId;

function render(targetElementId) {
  _targetElementId = targetElementId;

  Utils.Dom.render(
    <AppContainer>
      <Spa />
    </AppContainer>,
    document.getElementById(targetElementId)
  );
}

if (module.hot) {
  module.hot.accept("./core/spa", () => {
    if (_targetElementId) render(_targetElementId);
  });
}

export { render };
