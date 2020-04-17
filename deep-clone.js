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

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          _map.set(item[0], clone(item[1]));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _map;
    } else if (type === tagSet) {
      var _set = new Set();

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = val[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _item = _step2.value;

          _set.add(clone(_item));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return _set;
    } else {
      var _obj = Object.create(Object.getPrototypeOf(val));

      for (var key in val) {
        _obj[key] = clone(val[key]);
      } // 处理使用Symbols作为属性的项目


      var _sybKeys = Object.getOwnPropertySymbols(val);

      if (_sybKeys.length > 0) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _sybKeys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _key = _step3.value;
            _obj[_key] = clone(val[_key]);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      return _obj;
    }
  }

  return clone;

})));
