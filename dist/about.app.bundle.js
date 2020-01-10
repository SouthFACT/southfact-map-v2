/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/about.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/about.js":
/*!******************************!*\
  !*** ./src/scripts/about.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _nav_bar = __webpack_require__(/*! ./nav_bar */ \"./src/scripts/nav_bar.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ViewController = function () {\n\n  /** Initialize Application */\n  function ViewController() {\n    _classCallCheck(this, ViewController);\n\n    this.initializeComponents();\n  }\n\n  _createClass(ViewController, [{\n    key: 'initializeComponents',\n    value: function initializeComponents() {\n      // Initialize Nav Var\n      this.navComponent = new _nav_bar.nav_bar('nav-holder', { activeNav: 'about' });\n    }\n  }]);\n\n  return ViewController;\n}();\n\nwindow.ctrl = new ViewController();\n\n//# sourceURL=webpack:///./src/scripts/about.js?");

/***/ }),

/***/ "./src/scripts/components.js":
/*!***********************************!*\
  !*** ./src/scripts/components.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Base component class to provide view ref binding, template insertion, and event listener setup\n */\nvar Component = exports.Component = function () {\n  /**Component Constructor\n   * @param { String } placeholderId - Element ID to inflate the component into\n   * @param { Object } props - Component properties\n   * @param { Object } props.events - Component event listeners\n   * @param { Object } props.data - Component data properties\n   * @param { String } template - HTML template to inflate into placeholder id\n   */\n  function Component(placeholderId) {\n    var _this = this;\n\n    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    var template = arguments[2];\n\n    _classCallCheck(this, Component);\n\n    this.componentElem = document.getElementById(placeholderId);\n\n    if (template) {\n      // Load template into placeholder element\n      this.componentElem.innerHTML = template;\n\n      // Find all refs in component\n      this.refs = {};\n      var refElems = this.componentElem.querySelectorAll('[ref]');\n      refElems.forEach(function (elem) {\n        _this.refs[elem.getAttribute('ref')] = elem;\n      });\n    }\n\n    if (props.events) {\n      this.createEvents(props.events);\n    }\n  }\n\n  /** Read \"event\" component parameters, and attach event listeners for each */\n\n\n  _createClass(Component, [{\n    key: 'createEvents',\n    value: function createEvents(events) {\n      var _this2 = this;\n\n      Object.keys(events).forEach(function (eventName) {\n        _this2.componentElem.addEventListener(eventName, events[eventName], false);\n      });\n    }\n\n    /** Trigger a component event with the provided \"detail\" payload */\n\n  }, {\n    key: 'triggerEvent',\n    value: function triggerEvent(eventName, detail) {\n      var event = new window.CustomEvent(eventName, { detail: detail });\n      this.componentElem.dispatchEvent(event);\n    }\n  }]);\n\n  return Component;\n}();\n\n//# sourceURL=webpack:///./src/scripts/components.js?");

/***/ }),

/***/ "./src/scripts/nav_bar.js":
/*!********************************!*\
  !*** ./src/scripts/nav_bar.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.nav_bar = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _nav_bar = __webpack_require__(/*! ../templates/nav_bar.html */ \"./src/templates/nav_bar.html\");\n\nvar _nav_bar2 = _interopRequireDefault(_nav_bar);\n\nvar _components = __webpack_require__(/*! ./components */ \"./src/scripts/components.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //default map template\n\n\n/**\n * nav_bar Component\n * Render and control map layer control\n */\nvar nav_bar = exports.nav_bar = function (_Component) {\n  _inherits(nav_bar, _Component);\n\n  function nav_bar(placeholderId, props) {\n    _classCallCheck(this, nav_bar);\n\n    /*\n    * define valid nav headings\n    * Todo better way to handle this from structure of app maybe\n    */\n    var _this = _possibleConstructorReturn(this, (nav_bar.__proto__ || Object.getPrototypeOf(nav_bar)).call(this, placeholderId, props, _nav_bar2.default));\n\n    var navs = ['main_nav_index', 'main_nav_about', 'main_nav_download'];\n\n    /*\n    * change active div Find a\n    * Todo better way to handle this.\n    */\n    if (props) {\n      if (props.activeNav) {\n        _this.changeActive(navs, props.activeNav);\n      } else {\n        _this.changeActive(navs, \"\");\n      }\n    } else {\n      _this.changeActive(navs, \"\");\n    }\n    return _this;\n  }\n\n  //change active nav bar heading\n\n\n  _createClass(nav_bar, [{\n    key: 'changeActive',\n    value: function changeActive(navs, activeNav) {\n\n      //iterate all navs and make each not active\n      navs.map(function (nav) {\n\n        //make all navs not active if the html element exists\n        var el = document.querySelector('[ref=\"' + nav + '\"]');\n        if (el) {\n          el.className = el.className.replace(' active', '');\n        }\n      });\n\n      //make clicked nav active if html lement exists\n      var activeEl = document.querySelector('[ref=\"main_nav_' + activeNav + '\"]');\n      if (activeEl) {\n        activeEl.className = activeEl.className += ' active';\n      }\n    }\n  }]);\n\n  return nav_bar;\n}(_components.Component);\n\n//# sourceURL=webpack:///./src/scripts/nav_bar.js?");

/***/ }),

/***/ "./src/templates/nav_bar.html":
/*!************************************!*\
  !*** ./src/templates/nav_bar.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<nav class=\\\"nav\\\">\\n  <a ref=\\\"main_nav_index\\\" class=\\\"nav-link main-nav active\\\" href=\\\"./index.html\\\">Map</a>\\n  <a ref=\\\"main_nav_download\\\" class=\\\"nav-link main-nav\\\" href=\\\"./download.html\\\">Download Data</a>\\n  <a ref=\\\"main_nav_about\\\" class=\\\"nav-link main-nav\\\" href=\\\"./about.html\\\">About the Assessment</a>\\n</nav>\\n\";\n\n//# sourceURL=webpack:///./src/templates/nav_bar.html?");

/***/ })

/******/ });