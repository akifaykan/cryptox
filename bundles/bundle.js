/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ \"./src/request.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\r\n\r\n\r\nconst req = new _request__WEBPACK_IMPORTED_MODULE_0__.Request(\"http://localhost:3000/cryptox\")\r\nconst ui = new _ui__WEBPACK_IMPORTED_MODULE_1__.UI\r\n\r\nclass App {\r\n    constructor(){\r\n        this.form   = document.getElementById(\"crypto__form\")\r\n        this.name   = document.getElementById(\"crypto-name\")\r\n        this.price  = document.getElementById(\"crypto-price\")\r\n        this.date   = document.getElementById(\"crypto-date\")\r\n        this.table   = document.querySelector(\"#table table\")\r\n\r\n        // Loaded\r\n        this.getLoaded()\r\n\r\n        // Events\r\n        this.form.addEventListener(\"submit\", e => this.formSubmit(e))\r\n        this.table.addEventListener('click', e => this.editOrDelete(e))\r\n    }\r\n\r\n    formSubmit(e){\r\n        const InputName     = this.name.value.trim()\r\n        const InputPrice    = this.price.value.trim()\r\n        const InputDate     = new Date(this.date.value).toLocaleDateString(\"tr-TR\")\r\n        \r\n        if ( InputName === \"\" || InputPrice === \"\"){\r\n            ui.message(\"Please fill the required areas\", \"warning\")\r\n        } else {\r\n            req.post({\r\n                name: InputName,\r\n                price: +InputPrice,\r\n                date: InputDate\r\n            })\r\n            .then(crypto => {\r\n                ui.addItemUI(crypto)\r\n            })\r\n            .catch(err => console.log(err))\r\n\r\n            ui.message('Added Crypto', 'success')\r\n        }\r\n\r\n        ui.clearInput()\r\n        e.preventDefault()\r\n    }\r\n\r\n    getLoaded(){\r\n        req.get()\r\n            .then(cryptos =>{\r\n                ui.getLoadedItem(cryptos)\r\n            })\r\n            .catch(err => console.log(err))\r\n    }\r\n\r\n    editOrDelete(e){\r\n        const item = e.target.closest(\"tr\")\r\n        const itemId = item.getAttribute('data-id')\r\n\r\n        console.log(item, itemId)\r\n    }\r\n}\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => new App)\r\n\n\n//# sourceURL=webpack://cryptox/./src/app.js?");

/***/ }),

/***/ "./src/request.js":
/*!************************!*\
  !*** ./src/request.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Request\": () => (/* binding */ Request)\n/* harmony export */ });\n/*-----------------------\r\n*\r\n*   REQUEST JS\r\n*\r\n-----------------------*/\r\n\r\nclass Request {\r\n    constructor(url){\r\n        this.url = url\r\n    }\r\n\r\n    async get(){\r\n        const res = await fetch(this.url)\r\n        const resData = await res.json()\r\n\r\n        return resData\r\n    }\r\n\r\n    async post(data){\r\n        const res = await fetch(this.url, {\r\n            method: \"POST\",\r\n            body: JSON.stringify(data),\r\n            headers: {\r\n                \"Content-type\": \"application/json; charset=UTF-8\"\r\n            }\r\n        })\r\n        const resData = await res.json()\r\n\r\n        return resData\r\n    }\r\n\r\n    async put(id, data){\r\n        const res = await fetch(this.url +\"/\"+ id, {\r\n            method: \"PUT\",\r\n            body: JSON.stringify(data),\r\n            headers: {\r\n                \"Content-type\": \"application/json; charset=UTF-8\"\r\n            }\r\n        })\r\n        const resData = await res.json()\r\n\r\n        return resData\r\n    }\r\n\r\n    async delete(id){\r\n        await fetch(this.url +\"/\"+ id, {\r\n            method: \"DELETE\"\r\n        })\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cryptox/./src/request.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UI\": () => (/* binding */ UI)\n/* harmony export */ });\n/*-----------------------\r\n*\r\n*   Ui JS\r\n*\r\n-----------------------*/\r\n\r\nclass UI {\r\n    constructor(){\r\n        this.messages   = document.getElementById(\"messages\")\r\n        this.tableBody  = document.getElementById(\"table__body\")\r\n        this.name       = document.getElementById(\"crypto-name\")\r\n        this.price      = document.getElementById(\"crypto-price\")\r\n        this.close      = document.getElementById('crypto-close')\r\n        this.update     = document.getElementById('crypto-update')\r\n    }\r\n\r\n    addItemUI(crypto){\r\n        this.tableBody.innerHTML += this.templateCrypto(crypto)\r\n    }\r\n\r\n    getLoadedItem(cryptos){\r\n        let results = \"\"\r\n\r\n        cryptos.forEach(crypto => {\r\n            results += this.templateCrypto(crypto)\r\n        })\r\n\r\n        this.tableBody.innerHTML += results\r\n    }\r\n\r\n    clearInput(){\r\n        this.name.value = \"\"\r\n        this.price.value = \"\"\r\n\r\n        if (this.close.getAttribute('data-view') === 'show'){\r\n            this.close.setAttribute('data-view', 'hide')\r\n            this.update.setAttribute('data-view', 'hide')\r\n\r\n            /*for (let item of this.table.children) {\r\n                item.classList.remove('edit')\r\n            }*/\r\n        }\r\n    }\r\n\r\n    templateCrypto(crypto){\r\n        return `\r\n            <tr data-id=\"${crypto.id}\">\r\n                <td>${crypto.id}</td>\r\n                <td>${crypto.name}</td>\r\n                <td>${crypto.price}$</td>\r\n                <td>${crypto.date}</td>\r\n                <td class=\"text-right flex-end\">\r\n                    <a id=\"crypto-edit\" class=\"crypto__button\">Edit</a>\r\n                    <a id=\"crypto-delete\" class=\"crypto__button\">Del</a>\r\n                </td>\r\n            </tr>\r\n        `\r\n    }\r\n\r\n    message(message, classes){\r\n        this.messages.innerHTML = `<div class=\"alert ${classes}\">${message}</div>`\r\n        setTimeout( () => {this.messages.innerHTML = \"\"}, 1300 )\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cryptox/./src/ui.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;