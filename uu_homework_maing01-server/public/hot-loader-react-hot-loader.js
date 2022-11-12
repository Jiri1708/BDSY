(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("hot-loader-react-common"));
	else if(typeof define === 'function' && define.amd)
		define(["hot-loader-react-common"], factory);
	else if(typeof exports === 'object')
		exports["react-hot-loader"] = factory(require("hot-loader-react-common"));
	else
		root["ReactHotLoader"] = factory(root[undefined]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_hot_loader_react_common__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../target/webpack-tmp/hot-loader-react-hot-loader.js":
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__("hot-loader-react-common").ReactHotLoader;


/***/ }),

/***/ "hot-loader-react-common":
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_hot_loader_react_common__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("../target/webpack-tmp/hot-loader-react-hot-loader.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});