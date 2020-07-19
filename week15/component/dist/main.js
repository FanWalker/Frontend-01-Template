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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel.view":
/*!***********************!*\
  !*** ./carousel.view ***!
  \***********************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n\nclass Carousel {\n  setAttribute(name, value) {\n    this[name] = value;\n  }\n  render() {\n    return createElement(\"template\", {\"type\":\"startTag\",\"tagName\":\"template\"}, \"\\r\\n\\r\\n\");\n  }\n  mountTo(parent) {\n    this.render().mountTo(parent);\n  }\n}\n  \n\n//# sourceURL=webpack:///./carousel.view?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _carousel_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel.view */ \"./carousel.view\");\n\n/**\r\n * \r\n * @param {构造器函数} Cls \r\n * @param {属性对象} attributes \r\n */\n\n/*\r\nfunction createElement(Cls, attributes, ...children) {\r\n  // 从console可以看出父子组件的构建顺序是先子后父\r\n  // console.log(arguments);\r\n  // debugger;\r\n  let o\r\n  if (typeof Cls === \"string\") {\r\n    o = new Wrapper(Cls);\r\n  } else {\r\n    o = new Cls()\r\n  }\r\n  for (let name in attributes) {\r\n    // o[name] = attributes[name];\r\n    o.setAttribute(name, attributes[name])\r\n  }\r\n\r\n  let visit = (children) => {\r\n    for (let child of children) {\r\n      console.log('children');\r\n      if (typeof child === \"object\" && child instanceof Array) {\r\n        visit(child);\r\n        continue;\r\n      }\r\n      if (typeof child === \"string\") {\r\n        child = new Text(child);\r\n      }\r\n      o.appendChild(child);\r\n    }\r\n  }\r\n  visit(children);\r\n\r\n  return o;\r\n}\r\n\r\nclass Text {\r\n  constructor(text) {\r\n    this.root = document.createTextNode(text);\r\n    this.children = [];\r\n  }\r\n  mountTo(parent) {\r\n    parent.appendChild(this.root);\r\n  }\r\n}\r\n\r\nclass Wrapper {\r\n  constructor(type) {\r\n    this.root = document.createElement(type);\r\n    this.children = [];\r\n  }\r\n  setAttribute(name, value) {\r\n    this.root.setAttribute(name, value);\r\n  }\r\n  appendChild(child) {\r\n    console.log('Parent::appendChild', child);\r\n    // child.mountTo(this.root);\r\n    this.children.push(child);\r\n  }\r\n  mountTo(parent) {\r\n    console.log('Parent::mountTo', parent);\r\n    parent.appendChild(this.root);\r\n    for (let child of this.children) {\r\n      child.mountTo(this.root);\r\n    }\r\n  }\r\n  addEventListener(type, handler, config) {\r\n    this.root.addEventListener(...arguments);\r\n  }\r\n  get style() {\r\n    return this.root.style;\r\n  }\r\n\r\n}\r\nclass MyComponent {\r\n  constructor(config) {\r\n    // this.root = document.createElement('div');\r\n    this.children = [];\r\n  }\r\n  setAttribute(name, value) {\r\n    this.root.setAttribute(name, value);\r\n  }\r\n  appendChild(child) {\r\n    console.log('Parent::appendChild', child);\r\n    // child.mountTo(this.root);\r\n    this.children.push(child);\r\n  }\r\n  // mountTo(parent) {\r\n  //   console.log('Parent::mountTo', parent);\r\n  //   parent.appendChild(this.root);\r\n  //   for (let child of this.children) {\r\n  //     child.mountTo(this.root);\r\n  //   }\r\n  // }\r\n  mountTo(parent) {\r\n    this.slot = <div></div>\r\n    for (let child of this.children) {\r\n      this.slot.appendChild(child);\r\n    }\r\n    this.render().mountTo(parent);\r\n  }\r\n  render() {\r\n    return <article>\r\n      <header>i'm a header</header>\r\n      {this.slot}\r\n      <footer>i'm a footer</footer>\r\n    </article>\r\n  }\r\n}\r\nclass Carousel {\r\n  constructor(config) {\r\n    // this.root = document.createElement('div');\r\n    this.children = [];\r\n  }\r\n  setAttribute(name, value) {\r\n    this[name] = value;\r\n  }\r\n  appendChild(child) {\r\n    console.log('Parent::appendChild', child);\r\n    // child.mountTo(this.root);\r\n    this.children.push(child);\r\n  }\r\n  // mountTo(parent) {\r\n  //   console.log('Parent::mountTo', parent);\r\n  //   parent.appendChild(this.root);\r\n  //   for (let child of this.children) {\r\n  //     child.mountTo(this.root);\r\n  //   }\r\n  // }\r\n  mountTo(parent) {\r\n    this.render().mountTo(parent);\r\n  }\r\n  render() {\r\n    let children = this.data.map( url => {\r\n      let element = <img src={url} />;\r\n      element.addEventListener(\"dragstart\", event => event.preventDefault());\r\n      return element;\r\n    });\r\n\r\n    let root = <div class=\"carousel\">\r\n      { children }\r\n    </div>\r\n    \r\n    let position = 0;\r\n\r\n    let nextPic = () => {\r\n      let nextPosition = (position + 1) % this.data.length;\r\n\r\n      let current = children[position];\r\n      let next = children[nextPosition];\r\n\r\n      current.style.transition = \"ease 0s\";\r\n      next.style.transition = \"ease 0s\";\r\n\r\n      current.style.transform = `translateX(${- 100 * position}%)`;\r\n      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;\r\n\r\n\r\n      // requestAnimationFrame(function(){\r\n      //   requestAnimationFrame(function(){\r\n\r\n      //   })\r\n      // })\r\n\r\n      setTimeout(() => {\r\n        current.style.transition = \"ease 0.5s\";\r\n        next.style.transition = \"ease 0.5s\";\r\n\r\n        current.style.transform = `translateX(${- 100 - 100 * position}%)`;\r\n        next.style.transform = `translateX(${- 100 * nextPosition}%)`;\r\n\r\n        position = nextPosition;\r\n      }, 16);\r\n\r\n      setTimeout(nextPic, 3000); \r\n    }\r\n\r\n    setTimeout(nextPic, 3000); \r\n\r\n    return root;\r\n  }\r\n}\r\n*/\n// <cls id=\"a\" /> 小写cls会转为字符串\n// let component = <Cls id=\"a\" />\n// let component = <p id=\"a\" class=\"b\">\n//   <Div></Div>\n//   <Div></Div>\n//   <Div></Div>\n// </p>\n// let component = <div>text</div>\n// let component = <MyComponent>\n//   <div>{new Wrapper('span')}</div>\n// </MyComponent>Carousel\n\nvar component = createElement(Carousel, {\n  data: [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"]\n});\ncomponent.mountTo(document.body);\nconsole.log(component); // component.setAttribute(\"id\", a);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });