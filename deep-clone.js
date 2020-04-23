(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.clone = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var it,
        normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var tagMap = '[object Map]';
  var tagSet = '[object Set]';
  var tagRegExp = '[object RegExp]';
  var tagDate = '[object Date]';

  function isObj(input) {
    var type = _typeof(input);

    return input !== null && (type === 'object' || type === 'function');
  }

  function clone(val) {
    // 1类 基本数据类型  string, number, boolean, null, undefined, symbol
    if (!isObj(val)) return val; // 2类 Date, RegExp

    var type = Object.prototype.toString.call(val);

    if ([tagDate, tagRegExp].includes(type)) {
      return new val.constructor(val);
    } // 3类 引用数据类型


    if (Array.isArray(val)) {
      return val.map(function (v) {
        return clone(v);
      });
    } else if (typeof val === 'function') {
      return val;
    } else if (type === tagMap) {
      var _map = new Map();

      var _iterator = _createForOfIteratorHelper(val),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;

          _map.set(item[0], clone(item[1]));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return _map;
    } else if (type === tagSet) {
      var _set = new Set();

      var _iterator2 = _createForOfIteratorHelper(val),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _item = _step2.value;

          _set.add(clone(_item));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return _set;
    } else {
      var _obj = Object.create(Object.getPrototypeOf(val));

      for (var key in val) {
        _obj[key] = clone(val[key]);
      } // 处理使用Symbols作为属性的项目


      var _sybKeys = Object.getOwnPropertySymbols(val);

      if (_sybKeys.length > 0) {
        var _iterator3 = _createForOfIteratorHelper(_sybKeys),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _key = _step3.value;
            _obj[_key] = clone(val[_key]);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      return _obj;
    }
  }

  return clone;

})));
