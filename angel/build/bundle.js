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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYUP = exports.KEYDOWN = exports.LVL = exports.CTX = exports.KEYS = undefined;

var _Lvl = __webpack_require__(2);

var _Lvl2 = _interopRequireDefault(_Lvl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEYS = {
  65: false, // left (a)
  68: false, // right (d)
  87: false, // up (w)
  83: false, // down (s)
  32: false, // fire (space)
  80: false // pause (p)
};

var CTX = document.getElementById('canvas').getContext('2d');

var LVL = new _Lvl2.default();

function KEYDOWN(e) {
  if (e.keyCode === 65) {
    KEYS[65] = true;
    KEYS[68] = false;
  } else if (e.keyCode === 68) {
    KEYS[68] = true;
    KEYS[65] = false;
  } else if (e.keyCode === 87) {
    KEYS[87] = true;
    KEYS[83] = false;
  } else if (e.keyCode === 83) {
    KEYS[83] = true;
    KEYS[87] = false;
  }
}

function KEYUP(e) {
  if (e.keyCode in KEYS) KEYS[e.keyCode] = false;
}

exports.KEYS = KEYS;
exports.CTX = CTX;
exports.LVL = LVL;
exports.KEYDOWN = KEYDOWN;
exports.KEYUP = KEYUP;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _g = __webpack_require__(0);

document.addEventListener('keydown', _g.KEYDOWN, false);
document.addEventListener('keyup', _g.KEYUP, false);

function main() {
  _g.LVL.load();
  _g.LVL.update();
  _g.LVL.draw();
  window.requestAnimationFrame(main);
}

_g.LVL.loadLvl('test1');
window.requestAnimationFrame(main);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _g = __webpack_require__(0);

var _test = __webpack_require__(3);

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lvls = {
  test1: _test2.default
};

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.stored_units;
    this.active_units;
    this.scroll;
  }

  _createClass(_class, [{
    key: 'loadLvl',
    value: function loadLvl(name) {
      this.stored_units = lvls[name].units;
      this.active_units = [];
      this.scroll = 0;
    }
  }, {
    key: 'load',
    value: function load() {
      var _this = this;

      var getNext = function getNext() {
        if (_this.stored_units[0] && _this.stored_units[0].x < _this.scroll + 750) {
          return _this.stored_units.shift();
        }
        return null;
      };
      var next = getNext();
      while (next) {
        this.active_units.push(next);
        next = getNext();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.active_units[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var u = _step.value;
          u.update();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      _g.CTX.clearRect(0, 0, 720, 360);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.active_units[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var u = _step2.value;
          u.draw();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Angel = __webpack_require__(4);

var _Angel2 = _interopRequireDefault(_Angel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  units: [new _Angel2.default(200, 200)]
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Obj = __webpack_require__(5);

var _Obj2 = _interopRequireDefault(_Obj);

var _g = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Unit) {
  _inherits(_class, _Unit);

  function _class(x, y) {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, x, y, 10, '#fff'));
  }

  _createClass(_class, [{
    key: 'update',
    value: function update() {
      var dx = _g.KEYS[68] - _g.KEYS[65];
      var dy = _g.KEYS[83] - _g.KEYS[87];
      if (dx || dy) {
        var k = 3 / Math.sqrt(Math.abs(dx) + Math.abs(dy));
        this.x = Math.max(Math.min(this.x + dx * k, 720), 0);
        this.y = Math.max(Math.min(this.y + dy * k, 360), 0);
      }
    }
  }]);

  return _class;
}(_Obj2.default);

exports.default = _class;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _g = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(x, y, r, color) {
    _classCallCheck(this, _class);

    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  _createClass(_class, [{
    key: 'draw',
    value: function draw() {
      _g.CTX.beginPath();
      _g.CTX.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      _g.CTX.fillStyle = this.color;
      _g.CTX.fill();
      _g.CTX.closePath();
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);