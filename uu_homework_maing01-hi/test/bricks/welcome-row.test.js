import { testProperties } from "uu5g05-test";
import WelcomeRow from "../../src/bricks/welcome-row.js";

const CONFIG = {
  props: {
    left: {
      values: ["Left content", <span key="l">Left</span>],
    },
  },
  requiredProps: {
    children: "Children content",
  },
};

describe("WelcomeRow", function () {
  testProperties(WelcomeRow, CONFIG);
});
