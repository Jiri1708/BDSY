var mod=require("module");
var isDoc = typeof document !== "undefined";
var uri = ((mod ? mod.uri : isDoc && (document.currentScript || Array.prototype.slice.call(document.getElementsByTagName("script"), -1)[0] || {}).src) || "").toString();
uri = uri.split(/\//).slice(0, -1).join("/") + "/"; // runtime publicPath configuration required for proper linking of styles, background images, ...
var floatingVersion = "/0.0.0/";
if (uri.substr(-floatingVersion.length) === floatingVersion) uri = uri.substr(0, uri.length - floatingVersion.length) + "/0.1.0/";
__webpack_public_path__ = uri;
module.exports = require("__project__/index.js");
var ex = module.exports;
if (ex && typeof ex === "object") {
  if (!("version" in ex)) ex.version = process.env.VERSION;
  if (!("name" in ex)) ex.name = process.env.OUTPUT_NAME.split(/[\/\\]/).pop();
  if (!("namespace" in ex)) ex.namespace = process.env.NAMESPACE;
}
