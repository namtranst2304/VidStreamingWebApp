import {
  __commonJS
} from "./chunk-V4OQ3NZ2.js";

// node_modules/load-script/index.js
var require_load_script = __commonJS({
  "node_modules/load-script/index.js"(exports, module) {
    module.exports = function load(src, opts, cb) {
      var head = document.head || document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      opts = opts || {};
      cb = cb || function() {
      };
      script.type = opts.type || "text/javascript";
      script.charset = opts.charset || "utf8";
      script.async = "async" in opts ? !!opts.async : true;
      script.src = src;
      if (opts.attrs) {
        setAttributes(script, opts.attrs);
      }
      if (opts.text) {
        script.text = "" + opts.text;
      }
      var onend = "onload" in script ? stdOnEnd : ieOnEnd;
      onend(script, cb);
      if (!script.onload) {
        stdOnEnd(script, cb);
      }
      head.appendChild(script);
    };
    function setAttributes(script, attrs) {
      for (var attr in attrs) {
        script.setAttribute(attr, attrs[attr]);
      }
    }
    function stdOnEnd(script, cb) {
      script.onload = function() {
        this.onerror = this.onload = null;
        cb(null, script);
      };
      script.onerror = function() {
        this.onerror = this.onload = null;
        cb(new Error("Failed to load " + this.src), script);
      };
    }
    function ieOnEnd(script, cb) {
      script.onreadystatechange = function() {
        if (this.readyState != "complete" && this.readyState != "loaded") return;
        this.onreadystatechange = null;
        cb(null, script);
      };
    }
  }
});

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});

export {
  require_load_script,
  require_cjs
};
//# sourceMappingURL=chunk-VJ56LFBU.js.map
