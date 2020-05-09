(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 100:
/*!****************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/icons/phonecon.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAApCAYAAADEZlLzAAABcUlEQVRYhe3Yv05UQRTH8c/uXgzYCI3CJjyBJsaEyoQCOwsKCwtIoNwXIJGC2NmYmBjtLYiFpTUtDY0hsTC+AE5MKKhYodgLxdx1F4plxuxic3/V3Jkz5zt/zknm3Ean04F3eIn76BmfmuhiH5sFtrE1RsB1zeAF9gqsV53v8QWNMYJK8bS+4mmBu9XAJ/zI9dZut2+0CSGc4EET5/15uaAMNYgXeKXjtmATVw2rYTWshtWwGlbDatj/hpW3Aes/4X5PkNODwqCQ+IgjtHK8hBBGDV+Im5nD2TBsJQfyDzopDHayh5HLrFTiD+5gKhG0hplh2JbJFRbPMd8UzxUWEny3sIND7GI2cU0tYoD0lZJzG3hTtZ9gEc8SgdlJPX/t+2HO5FzYZ4N7PRd3mqxCjCo4TrD/hUdYwk+cJnL+JnW36ljGdzcXhT18q9rNEMIo+1IMvHt92CEe4wPeJsByVIp/C6Bb4HVFXsX0GEHDOsCrS5qJQTS8LW2RAAAAAElFTkSuQmCC"

/***/ }),

/***/ 101:
/*!**************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/icons/d_code.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA4MzBBNDBCQzhBMTFFOEJGNzhFNjk0RENFODVDRUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA4MzBBNDFCQzhBMTFFOEJGNzhFNjk0RENFODVDRUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMDgzMEEzRUJDOEExMUU4QkY3OEU2OTREQ0U4NUNFRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMDgzMEEzRkJDOEExMUU4QkY3OEU2OTREQ0U4NUNFRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pix3GI0AAALkSURBVHja7FrtcZtAED1l9D90EFKBSQWgBhSlguAKrFQQuQKRCuwORNSAoQKjDuQKIipQdj3vJpvLHQgFicuEndlBBiTvu/16ezA5Ho+KZbvdKkhAGpNGyi+pSHfz+XwvT06NmxakDwDhoxxoob8QiEd94o24mJBuPDZeR8cDgUhsHljhWJOmpAUjvpZltKrOa2RwgAXmlX8LWxPTAzGOGWl+TeNPAHcgzWGbtPU3AP+kjABGAD0CeMFx77G9e1EprX1ghlLlpaCBzSRLmBro9r6HDIEoxiQeAYwA3HRaM74by/kanLxNYk20UBTKU4oDCNsN/j9zn/JcAFyiniznS2GYcnyP6XhoucYk7L6BIK5JlwYgvndFQL5dI4Q06FCALUXDWWJQsslGGM/370QkZAQk7QqA6+xE6Cmipzg24AM8lQBQKaa9xAJ8gc/f+X5a8Qi/UQvvXNQDkeiMmZEnBzEoKQcA7S0OlwOaVYWZ5NUTyI+Tc6CrhIb3bMO4Sx41dbFMZO90WGlglwKQt4RaYiFjbdXoTnwv61qF+h7C1yJB8wbDE0v14x2IbKhGFhiVKT1jzv5KwBZDANDG6+S+bVp9zTJJJ6z053uUU/6dTVMpvQQANvoZRw6bT11nDOy+JWLIWl8LgGxoNYzIG7wUQ0PbVoqoYFxKo0sDSLHyAVYuaSmhIcpuYfQKE2RjBesLwFpQhR080Ub8KhEin81kRdzrDazS1Qv6KKNLg4gxo/zhuPfeWO0luJBCslaoVIEoALVJ9Pr2wN9sBudI8heRQ4kw/jUUQS3ObmQzwWtcdKDouC1igshB6mSiFuYAb5OJ5QHHULsN40w8AhgaQCjqrrdCufqRNLQBeEI1ST02PkXFenZ5QDl2FXyR0Ow9YxKPAP53AJIL7cAk75DlpfLkWTF2KmLYptSvzbI/ntTrVw3yAYzscvvKFkI5hu/a44hh224lS506qHGk/HzdpjJft/kpwAAQXOPU/OtUgAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 110:
/*!*****************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/scheme/scheme-1.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/scheme/scheme-1.png";

/***/ }),

/***/ 119:
/*!*****************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/scheme/scheme-2.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/scheme/scheme-2.png";

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 19:
/*!*******************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/icons/search-icon.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAACF0lEQVRIia3W24tNYRjH8c92njBDGiQkk4wbo3a4mDAiNaXhggvulENuHcofQI00xZ2U3FFy4XCBTMbpwmGvC4OGmiuU0STHIqnt4n2XttXac9y/Wj3PWutdz3c9b+/zvG+hVCqpotnYjXasxLz4fAC9uIlL+FwtQLFYBJNy3tXhEI5gVs77xfHaihPoxBn8qgabkLlfiqc4HgHdOIAmTMU0LIvP7sUxnXiMJdUglZksxP1oX+NgDJRVf7zOYSPOogUP0Yq31TKpw9UK0JoqgKx6sBoP4rfXhGxzIYdRRB+24fsIAKm+oQNvsArH8iBzcBRl7MHXUQBSfcXeih9uyEJ2oR538GQMgFSPhIUyA9uzkPboXx4HINWVaDuykJbo360BJI1RzELSSn5XA8j7aOdmIakm1wAyJdrfWcjH6C+qAWRBtB+ykOfRX1cDyPpoX2Uht6K/swaQHdHeyEIuClW7BWvHAWjFZvwQWtR/kE84hQIuCIU5WjXgfPS7xK6RJIkkSf6tri5hHlfgOmaOAlAvdN7lMUZndkAK+Sm0ggFsEPaUthEA2uLYNPuJeT9YWSf9wry+RLPQxm9jX7yfLtRSE/YL1d0TM+gT9qBmoX81VkIKOXv8cNtvpb7gJE7HDLqF80CvsAgGq0FSZQ8S84XtYKiDRGMeaCjIWFUJeoFNhXK5PK6ISZIMByplTyu10qAwVc/w5y+CFHxGrYuGWgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*********************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/icons/classify-icon.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAXCAYAAAD3CERpAAAAwElEQVRIie2W0Q3CIBBAH4Qh7EjOoYGZ+GANnajRLeoHNiENlHqgTRNfwkeP0rsA91JlrT0DARjI8wAuwN17D4BzrvDqNnQlIe+5kIlP0mGShKqQdKoU9TGmYW2pyO8knc9Wim5a/U9awRD7cCDe0hLP9KFHn16XH10wEuXQDQPckPXh2s6sstuZSmmSw2bhz4EecpAKX8wuwj/OReohh5/T0jLHkoMm9iGU/2kg72YlHYYo/ACcCoWNgE0DrXJ4ARgZOPRcqNtFAAAAAElFTkSuQmCC"

/***/ }),

/***/ 21:
/*!*************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/home/banner.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/home/banner.png";

/***/ }),

/***/ 22:
/*!*************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/icons/arrow.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAVCAYAAACdbmSKAAABPUlEQVQ4jY3ToYtUURQH4M9xm9jEMH/ACBaLTYQVDcouNoNBcBV+4BaLYLEtW+y7+A6Ii9HsFBEWWYNgEQSTYNMgGw2mZ7kDw6hv5sCFe+49H+dw4eq67nvXdYd931t1jfAO61X1sapOWyFGSW5jBxfxtaomy9CJvu9BVW1jr51fTvL+v51mmyT72GzpUVXdWYoanOI8fuFlVe0OjjcfVXUWR5jgIMnWUtTgCFNcxxvcTPJ7EM3hF7iLb7iU5MdS1OAOnuAnNlZCDd7DcxZebwCcw/2W7q+tANZx2NLHSZ4Ooqq6hVct3UpyMDheVT2aA1dnAP7Zqar2sI1jXEnyef7+L1RVr7GBT7iW5HixZm2u+Aze4gKmSTYXi2cxamCCLw0cDAE4OR6Pb+ADTmE3ycMhMBtv9vEeJHm2DMAf95yY6v4kyN0AAAAASUVORK5CYII="

/***/ }),

/***/ 23:
/*!******************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/home/share-list1.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/home/share-list1.png";

/***/ }),

/***/ 24:
/*!*******************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/icons/video-arrow.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAA0UlEQVRIibXWsW3CUBSG0WsK2vTJBLBCWCJbJFF2gClgizAEWYFkgdC7TUEOBXoCWcJgfP1Lrz3F06dnBz7xiMg84bgarxhlw2UbTIaA4Q9zjLPhsi1mQ8CwxxIP2XDZL16GgMtuTrMrzCnNKhsua02zD0xLmn3hsi2eh4BppFlB5G4XER+jZDQiooqIKvsqVuUqsuBvjXclI7eF5Nw2mDbBPnCNN1e+Nl3hNZ7awK7wTvKz+e8soSz4R/Kn6WJCfeAvLQndA9d4l/zDcnNCXc4BceC7lYokw7QAAAAASUVORK5CYII="

/***/ }),

/***/ 248:
/*!*********************************************!*\
  !*** E:/wu3.23/杜高/dugao/common/cityname.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
[
{
  "initial": "A",
  "list": [
  {
    "code": "0997",
    "name": "阿克苏",
    "pinyin": "Akesu",
    "label": "Akesu0997" },

  {
    "code": "0837",
    "name": "阿坝",
    "pinyin": "Aba",
    "label": "Aba0837" },

  {
    "code": "0483",
    "name": "阿拉善盟",
    "pinyin": "Alashanmeng",
    "label": "Alashanmeng0483" },

  {
    "code": "0906",
    "name": "阿勒泰",
    "pinyin": "Aletai",
    "label": "Aletai0906" },

  {
    "code": "0897",
    "name": "阿里",
    "pinyin": "Ali",
    "label": "Ali0897" },

  {
    "code": "0915",
    "name": "安康",
    "pinyin": "Ankang",
    "label": "Ankang0915" },

  {
    "code": "0556",
    "name": "安庆",
    "pinyin": "Anqing",
    "label": "Anqing0556" },

  {
    "code": "0412",
    "name": "鞍山",
    "pinyin": "Anshan",
    "label": "Anshan0412" },

  {
    "code": "0853",
    "name": "安顺",
    "pinyin": "Anshun",
    "label": "Anshun0853" },

  {
    "code": "0372",
    "name": "安阳",
    "pinyin": "Anyang",
    "label": "Anyang0372" },

  {
    "code": "0451",
    "name": "阿城",
    "pinyin": "Acheng",
    "label": "Acheng0451" },

  {
    "code": "0796",
    "name": "安福",
    "pinyin": "Anfu",
    "label": "Anfu0796" },

  {
    "code": "0572",
    "name": "安吉",
    "pinyin": "Anji",
    "label": "Anji0572" },

  {
    "code": "0871",
    "name": "安宁",
    "pinyin": "Anning",
    "label": "Anning0871" },

  {
    "code": "0536",
    "name": "安丘",
    "pinyin": "Anqiu",
    "label": "Anqiu0536" },

  {
    "code": "0595",
    "name": "安溪",
    "pinyin": "Anxi",
    "label": "Anxi0595" },

  {
    "code": "0791",
    "name": "安义",
    "pinyin": "Anyi",
    "label": "Anyi0791" },

  {
    "code": "0797",
    "name": "安远",
    "pinyin": "Anyuan",
    "label": "Anyuan0797" }] },



{
  "initial": "B",
  "list": [
  {
    "code": "010",
    "name": "北京",
    "pinyin": "Beijing",
    "label": "Beijing010" },

  {
    "code": "0436",
    "name": "白城",
    "pinyin": "Baicheng",
    "label": "Baicheng0436" },

  {
    "code": "0776",
    "name": "百色",
    "pinyin": "Baise",
    "label": "Baise0776" },

  {
    "code": "0439",
    "name": "白山",
    "pinyin": "Baishan",
    "label": "Baishan0439" },

  {
    "code": "0943",
    "name": "白银",
    "pinyin": "Baiyin",
    "label": "Baiyin0943" },

  {
    "code": "0552",
    "name": "蚌埠",
    "pinyin": "Bangbu",
    "label": "Bangbu0552" },

  {
    "code": "0312",
    "name": "保定",
    "pinyin": "Baoding",
    "label": "Baoding0312" },

  {
    "code": "0917",
    "name": "宝鸡",
    "pinyin": "Baoji",
    "label": "Baoji0917" },

  {
    "code": "0875",
    "name": "保山",
    "pinyin": "Baoshan",
    "label": "Baoshan0875" },

  {
    "code": "0472",
    "name": "包头",
    "pinyin": "Baotou",
    "label": "Baotou0472" },

  {
    "code": "0478",
    "name": "巴彦淖尔",
    "pinyin": "Bayannaoer",
    "label": "Bayannaoer0478" },

  {
    "code": "0996",
    "name": "巴音郭楞",
    "pinyin": "Bayinguoleng",
    "label": "Bayinguoleng0996" },

  {
    "code": "0827",
    "name": "巴中",
    "pinyin": "Bazhong",
    "label": "Bazhong0827" },

  {
    "code": "0779",
    "name": "北海",
    "pinyin": "Beihai",
    "label": "Beihai0779" },

  {
    "code": "0414",
    "name": "本溪",
    "pinyin": "Benxi",
    "label": "Benxi0414" },

  {
    "code": "0857",
    "name": "毕节",
    "pinyin": "Bijie",
    "label": "Bijie0857" },

  {
    "code": "0543",
    "name": "滨州",
    "pinyin": "Binzhou",
    "label": "Binzhou0543" },

  {
    "code": "0909",
    "name": "博尔塔拉",
    "pinyin": "Boertala",
    "label": "Boertala0909" },

  {
    "code": "0558",
    "name": "亳州",
    "pinyin": "Bozhou",
    "label": "Bozhou0558" },

  {
    "code": "0514",
    "name": "宝应",
    "pinyin": "Baoying",
    "label": "Baoying0514" },

  {
    "code": "0451",
    "name": "巴彦",
    "pinyin": "Bayan",
    "label": "Bayan0451" },

  {
    "code": "0515",
    "name": "滨海",
    "pinyin": "Binhai",
    "label": "Binhai0515" },

  {
    "code": "0451",
    "name": "宾县",
    "pinyin": "Binxian",
    "label": "Binxian0451" },

  {
    "code": "0771",
    "name": "宾阳",
    "pinyin": "Binyang",
    "label": "Binyang0771" },

  {
    "code": "023",
    "name": "璧山",
    "pinyin": "Bishan",
    "label": "Bishan023" },

  {
    "code": "0391",
    "name": "博爱",
    "pinyin": "Boai",
    "label": "Boai0391" },

  {
    "code": "0752",
    "name": "博罗",
    "pinyin": "Boluo",
    "label": "Boluo0752" },

  {
    "code": "0543",
    "name": "博兴",
    "pinyin": "Boxing",
    "label": "Boxing0543" }] },



{
  "initial": "C",
  "list": [
  {
    "code": "023",
    "name": "重庆",
    "pinyin": "Chongqing",
    "label": "Chongqing023" },

  {
    "code": "0431",
    "name": "长春",
    "pinyin": "Changchun",
    "label": "Changchun0431" },

  {
    "code": "0731",
    "name": "长沙",
    "pinyin": "Changsha",
    "label": "Changsha0731" },

  {
    "code": "0519",
    "name": "常州",
    "pinyin": "Changzhou",
    "label": "Changzhou0519" },

  {
    "code": "028",
    "name": "成都",
    "pinyin": "Chengdu",
    "label": "Chengdu028" },

  {
    "code": "0317",
    "name": "沧州",
    "pinyin": "Cangzhou",
    "label": "Cangzhou0317" },

  {
    "code": "0736",
    "name": "常德",
    "pinyin": "Changde",
    "label": "Changde0736" },

  {
    "code": "0895",
    "name": "昌都",
    "pinyin": "Changdu",
    "label": "Changdu0895" },

  {
    "code": "0997",
    "name": "昌吉",
    "pinyin": "Changji",
    "label": "Changji0997" },

  {
    "code": "0355",
    "name": "长治",
    "pinyin": "Changzhi",
    "label": "Changzhi0355" },

  {
    "code": "0565",
    "name": "巢湖",
    "pinyin": "Chaohu",
    "label": "Chaohu0565" },

  {
    "code": "0421",
    "name": "朝阳",
    "pinyin": "Chaoyang",
    "label": "Chaoyang0421" },

  {
    "code": "0768",
    "name": "潮州",
    "pinyin": "Chaozhou",
    "label": "Chaozhou0768" },

  {
    "code": "0314",
    "name": "承德",
    "pinyin": "Chengde",
    "label": "Chengde0314" },

  {
    "code": "0735",
    "name": "郴州",
    "pinyin": "Chenzhou",
    "label": "Chenzhou0735" },

  {
    "code": "0476",
    "name": "赤峰",
    "pinyin": "Chifeng",
    "label": "Chifeng0476" },

  {
    "code": "0566",
    "name": "池州",
    "pinyin": "Chizhou",
    "label": "Chizhou0566" },

  {
    "code": "0771",
    "name": "崇左",
    "pinyin": "Chongzuo",
    "label": "Chongzuo0771" },

  {
    "code": "0875",
    "name": "楚雄",
    "pinyin": "Chuxiong",
    "label": "Chuxiong0875" },

  {
    "code": "0550",
    "name": "滁州",
    "pinyin": "Chuzhou",
    "label": "Chuzhou0550" },

  {
    "code": "0577",
    "name": "苍南",
    "pinyin": "Cangnan",
    "label": "Cangnan0577" },

  {
    "code": "0539",
    "name": "苍山",
    "pinyin": "Cangshan",
    "label": "Cangshan0539" },

  {
    "code": "0530",
    "name": "曹县",
    "pinyin": "Caoxian",
    "label": "Caoxian0530" },

  {
    "code": "0535",
    "name": "长岛",
    "pinyin": "Changdao",
    "label": "Changdao0535" },

  {
    "code": "0551",
    "name": "长丰",
    "pinyin": "Changfeng",
    "label": "Changfeng0551" },

  {
    "code": "0411",
    "name": "长海",
    "pinyin": "Changhai",
    "label": "Changhai0411" },

  {
    "code": "0591",
    "name": "长乐",
    "pinyin": "Changle",
    "label": "Changle0591" },

  {
    "code": "0536",
    "name": "昌乐",
    "pinyin": "Changle",
    "label": "Changle0536" },

  {
    "code": "0570",
    "name": "常山",
    "pinyin": "Changshan",
    "label": "Changshan0570" },

  {
    "code": "0512",
    "name": "常熟",
    "pinyin": "Changshu",
    "label": "Changshu0512" },

  {
    "code": "0596",
    "name": "长泰",
    "pinyin": "Changtai",
    "label": "Changtai0596" },

  {
    "code": "0597",
    "name": "长汀",
    "pinyin": "Changting",
    "label": "Changting0597" },

  {
    "code": "0572",
    "name": "长兴",
    "pinyin": "Changxing",
    "label": "Changxing0572" },

  {
    "code": "0536",
    "name": "昌邑",
    "pinyin": "Changyi",
    "label": "Changyi0536" },

  {
    "code": "0768",
    "name": "潮安",
    "pinyin": "Chaoan",
    "label": "Chaoan0768" },

  {
    "code": "0871",
    "name": "呈贡",
    "pinyin": "Chenggong",
    "label": "Chenggong0871" },

  {
    "code": "023",
    "name": "城口",
    "pinyin": "Chengkou",
    "label": "Chengkou023" },

  {
    "code": "0530",
    "name": "成武",
    "pinyin": "Chengwu",
    "label": "Chengwu0530" },

  {
    "code": "0635",
    "name": "茌平",
    "pinyin": "Chiping",
    "label": "Chiping0635" },

  {
    "code": "0794",
    "name": "崇仁",
    "pinyin": "Chongren",
    "label": "Chongren0794" },

  {
    "code": "0797",
    "name": "崇义",
    "pinyin": "Chongyi",
    "label": "Chongyi0797" },

  {
    "code": "028",
    "name": "崇州",
    "pinyin": "Chongzhou",
    "label": "Chongzhou028" },

  {
    "code": "0571",
    "name": "淳安",
    "pinyin": "Chunan",
    "label": "Chunan0571" },

  {
    "code": "0574",
    "name": "慈溪",
    "pinyin": "Cixi",
    "label": "Cixi0574" },

  {
    "code": "020",
    "name": "从化",
    "pinyin": "Conghua",
    "label": "Conghua020" },

  {
    "code": "0556",
    "name": "枞阳",
    "pinyin": "Congyang",
    "label": "Congyang0556" }] },



{
  "initial": "D",
  "list": [
  {
    "code": "0411",
    "name": "大连",
    "pinyin": "Dalian",
    "label": "Dalian0411" },

  {
    "code": "0769",
    "name": "东莞",
    "pinyin": "Dongguan",
    "label": "Dongguan0769" },

  {
    "code": "0872",
    "name": "大理",
    "pinyin": "Dali",
    "label": "Dali0872" },

  {
    "code": "0415",
    "name": "丹东",
    "pinyin": "Dandong",
    "label": "Dandong0415" },

  {
    "code": "0459",
    "name": "大庆",
    "pinyin": "Daqing",
    "label": "Daqing0459" },

  {
    "code": "0352",
    "name": "大同",
    "pinyin": "Datong",
    "label": "Datong0352" },

  {
    "code": "0457",
    "name": "大兴安岭",
    "pinyin": "Daxinganling",
    "label": "Daxinganling0457" },

  {
    "code": "0818",
    "name": "达州",
    "pinyin": "Dazhou",
    "label": "Dazhou0818" },

  {
    "code": "0692",
    "name": "德宏",
    "pinyin": "Dehong",
    "label": "Dehong0692" },

  {
    "code": "0838",
    "name": "德阳",
    "pinyin": "Deyang",
    "label": "Deyang0838" },

  {
    "code": "0534",
    "name": "德州",
    "pinyin": "Dezhou",
    "label": "Dezhou0534" },

  {
    "code": "0932",
    "name": "定西",
    "pinyin": "Dingxi",
    "label": "Dingxi0932" },

  {
    "code": "0887",
    "name": "迪庆",
    "pinyin": "Diqing",
    "label": "Diqing0887" },

  {
    "code": "0546",
    "name": "东营",
    "pinyin": "Dongying",
    "label": "Dongying0546" },

  {
    "code": "0515",
    "name": "大丰",
    "pinyin": "Dafeng",
    "label": "Dafeng0515" },

  {
    "code": "0580",
    "name": "岱山",
    "pinyin": "Daishan",
    "label": "Daishan0580" },

  {
    "code": "0557",
    "name": "砀山",
    "pinyin": "Dangshan",
    "label": "Dangshan0557" },

  {
    "code": "0555",
    "name": "当涂",
    "pinyin": "Dangtu",
    "label": "Dangtu0555" },

  {
    "code": "0530",
    "name": "单县",
    "pinyin": "Danxian",
    "label": "Danxian0530" },

  {
    "code": "0511",
    "name": "丹阳",
    "pinyin": "Danyang",
    "label": "Danyang0511" },

  {
    "code": "0753",
    "name": "大埔",
    "pinyin": "Dapu",
    "label": "Dapu0753" },

  {
    "code": "0598",
    "name": "大田",
    "pinyin": "Datian",
    "label": "Datian0598" },

  {
    "code": "028",
    "name": "大邑",
    "pinyin": "Dayi",
    "label": "Dayi028" },

  {
    "code": "0797",
    "name": "大余",
    "pinyin": "Dayu",
    "label": "Dayu0797" },

  {
    "code": "023",
    "name": "大足",
    "pinyin": "Dazu",
    "label": "Dazu023" },

  {
    "code": "0792",
    "name": "德安",
    "pinyin": "Dean",
    "label": "Dean0792" },

  {
    "code": "0595",
    "name": "德化",
    "pinyin": "Dehua",
    "label": "Dehua0595" },

  {
    "code": "0431",
    "name": "德惠",
    "pinyin": "Dehui",
    "label": "Dehui0431" },

  {
    "code": "0371",
    "name": "登封",
    "pinyin": "Dengfeng",
    "label": "Dengfeng0371" },

  {
    "code": "0572",
    "name": "德清",
    "pinyin": "Deqing",
    "label": "Deqing0572" },

  {
    "code": "0758",
    "name": "德庆",
    "pinyin": "Deqing",
    "label": "Deqing0758" },

  {
    "code": "0793",
    "name": "德兴",
    "pinyin": "Dexing",
    "label": "Dexing0793" },

  {
    "code": "0668",
    "name": "电白",
    "pinyin": "Dianbai",
    "label": "Dianbai0668" },

  {
    "code": "023",
    "name": "垫江",
    "pinyin": "Dianjiang",
    "label": "Dianjiang023" },

  {
    "code": "0797",
    "name": "定南",
    "pinyin": "Dingnan",
    "label": "Dingnan0797" },

  {
    "code": "0530",
    "name": "定陶",
    "pinyin": "Dingtao",
    "label": "Dingtao0530" },

  {
    "code": "0550",
    "name": "定远",
    "pinyin": "Dingyuan",
    "label": "Dingyuan0550" },

  {
    "code": "0635",
    "name": "东阿",
    "pinyin": "Donga",
    "label": "Donga0635" },

  {
    "code": "0518",
    "name": "东海",
    "pinyin": "Donghai",
    "label": "Donghai0518" },

  {
    "code": "0530",
    "name": "东明",
    "pinyin": "Dongming",
    "label": "Dongming0530" },

  {
    "code": "0538",
    "name": "东平",
    "pinyin": "Dongping",
    "label": "Dongping0538" },

  {
    "code": "0596",
    "name": "东山",
    "pinyin": "Dongshan",
    "label": "Dongshan0596" },

  {
    "code": "0515",
    "name": "东台",
    "pinyin": "Dongtai",
    "label": "Dongtai0515" },

  {
    "code": "0577",
    "name": "洞头",
    "pinyin": "Dongtou",
    "label": "Dongtou0577" },

  {
    "code": "0794",
    "name": "东乡",
    "pinyin": "Dongxiang",
    "label": "Dongxiang0794" },

  {
    "code": "0579",
    "name": "东阳",
    "pinyin": "Dongyang",
    "label": "Dongyang0579" },

  {
    "code": "0762",
    "name": "东源",
    "pinyin": "Dongyuan",
    "label": "Dongyuan0762" },

  {
    "code": "0566",
    "name": "东至",
    "pinyin": "Dongzhi",
    "label": "Dongzhi0566" },

  {
    "code": "0792",
    "name": "都昌",
    "pinyin": "Duchang",
    "label": "Duchang0792" },

  {
    "code": "028",
    "name": "都江堰",
    "pinyin": "Dujiangyan",
    "label": "Dujiangyan028" }] },



{
  "initial": "E",
  "list": [
  {
    "code": "0718",
    "name": "恩施",
    "pinyin": "Enshi",
    "label": "Enshi0718" },

  {
    "code": "0477",
    "name": "鄂尔多斯",
    "pinyin": "Eerduosi",
    "label": "Eerduosi0477" },

  {
    "code": "0711",
    "name": "鄂州",
    "pinyin": "Ezhou",
    "label": "Ezhou0711" },

  {
    "code": "0750",
    "name": "恩平",
    "pinyin": "Enping",
    "label": "Enping0750" }] },



{
  "initial": "F",
  "list": [
  {
    "code": "0413",
    "name": "抚顺",
    "pinyin": "Fushun",
    "label": "Fushun0413" },

  {
    "code": "0757",
    "name": "佛山",
    "pinyin": "Foshan",
    "label": "Foshan0757" },

  {
    "code": "0591",
    "name": "福州",
    "pinyin": "Fuzhou",
    "label": "Fuzhou0591" },

  {
    "code": "0770",
    "name": "防城港",
    "pinyin": "Fangchenggang",
    "label": "Fangchenggang0770" },

  {
    "code": "0418",
    "name": "阜新",
    "pinyin": "Fuxin",
    "label": "Fuxin0418" },

  {
    "code": "0558",
    "name": "阜阳",
    "pinyin": "Fuyang",
    "label": "Fuyang0558" },

  {
    "code": "0794",
    "name": "抚州",
    "pinyin": "Fuzhou",
    "label": "Fuzhou0794" },

  {
    "code": "024",
    "name": "法库",
    "pinyin": "Faku",
    "label": "Faku024" },

  {
    "code": "0553",
    "name": "繁昌",
    "pinyin": "Fanchang",
    "label": "Fanchang0553" },

  {
    "code": "0451",
    "name": "方正",
    "pinyin": "Fangzheng",
    "label": "Fangzheng0451" },

  {
    "code": "0538",
    "name": "肥城",
    "pinyin": "Feicheng",
    "label": "Feicheng0538" },

  {
    "code": "0551",
    "name": "肥东",
    "pinyin": "Feidong",
    "label": "Feidong0551" },

  {
    "code": "0551",
    "name": "肥西",
    "pinyin": "Feixi",
    "label": "Feixi0551" },

  {
    "code": "0539",
    "name": "费县",
    "pinyin": "Feixian",
    "label": "Feixian0539" },

  {
    "code": "0795",
    "name": "丰城",
    "pinyin": "Fengcheng",
    "label": "Fengcheng0795" },

  {
    "code": "023",
    "name": "丰都",
    "pinyin": "Fengdu",
    "label": "Fengdu023" },

  {
    "code": "0574",
    "name": "奉化",
    "pinyin": "Fenghua",
    "label": "Fenghua0574" },

  {
    "code": "023",
    "name": "奉节",
    "pinyin": "Fengjie",
    "label": "Fengjie023" },

  {
    "code": "0758",
    "name": "封开",
    "pinyin": "Fengkai",
    "label": "Fengkai0758" },

  {
    "code": "0753",
    "name": "丰顺",
    "pinyin": "Fengshun",
    "label": "Fengshun0753" },

  {
    "code": "0554",
    "name": "凤台",
    "pinyin": "Fengtai",
    "label": "Fengtai0554" },

  {
    "code": "0516",
    "name": "丰县",
    "pinyin": "Fengxian",
    "label": "Fengxian0516" },

  {
    "code": "0795",
    "name": "奉新",
    "pinyin": "Fengxin",
    "label": "Fengxin0795" },

  {
    "code": "0550",
    "name": "凤阳",
    "pinyin": "Fengyang",
    "label": "Fengyang0550" },

  {
    "code": "0790",
    "name": "分宜",
    "pinyin": "Fenyi",
    "label": "Fenyi0790" },

  {
    "code": "0763",
    "name": "佛冈",
    "pinyin": "Fogang",
    "label": "Fogang0763" },

  {
    "code": "0593",
    "name": "福安",
    "pinyin": "Fuan",
    "label": "Fuan0593" },

  {
    "code": "0593",
    "name": "福鼎",
    "pinyin": "Fuding",
    "label": "Fuding0593" },

  {
    "code": "0798",
    "name": "浮梁",
    "pinyin": "Fuliang",
    "label": "Fuliang0798" },

  {
    "code": "0871",
    "name": "富民",
    "pinyin": "Fumin",
    "label": "Fumin0871" },

  {
    "code": "0558",
    "name": "阜南",
    "pinyin": "Funan",
    "label": "Funan0558" },

  {
    "code": "0515",
    "name": "阜宁",
    "pinyin": "Funing",
    "label": "Funing0515" },

  {
    "code": "0591",
    "name": "福清",
    "pinyin": "Fuqing",
    "label": "Fuqing0591" },

  {
    "code": "0571",
    "name": "富阳",
    "pinyin": "Fuyang",
    "label": "Fuyang0571" }] },



{
  "initial": "G",
  "list": [
  {
    "code": "0941",
    "name": "甘南",
    "pinyin": "Gannan",
    "label": "Gannan0941" },

  {
    "code": "020",
    "name": "广州",
    "pinyin": "Guangzhou",
    "label": "Guangzhou020" },

  {
    "code": "0851",
    "name": "贵阳",
    "pinyin": "Guiyang",
    "label": "Guiyang0851" },

  {
    "code": "0797",
    "name": "赣州",
    "pinyin": "Ganzhou",
    "label": "Ganzhou0797" },

  {
    "code": "0836",
    "name": "甘孜",
    "pinyin": "Ganzi",
    "label": "Ganzi0836" },

  {
    "code": "0826",
    "name": "广安",
    "pinyin": "Guangan",
    "label": "Guangan0826" },

  {
    "code": "0839",
    "name": "广元",
    "pinyin": "Guangyuan",
    "label": "Guangyuan0839" },

  {
    "code": "0775",
    "name": "贵港",
    "pinyin": "Guigang",
    "label": "Guigang0775" },

  {
    "code": "0773",
    "name": "桂林",
    "pinyin": "Guilin",
    "label": "Guilin0773" },

  {
    "code": "0975",
    "name": "果洛",
    "pinyin": "Guoluo",
    "label": "Guoluo0975" },

  {
    "code": "0954",
    "name": "固原",
    "pinyin": "Guyuan",
    "label": "Guyuan0954" },

  {
    "code": "0797",
    "name": "赣县",
    "pinyin": "Ganxian",
    "label": "Ganxian0797" },

  {
    "code": "0518",
    "name": "赣榆",
    "pinyin": "Ganyu",
    "label": "Ganyu0518" },

  {
    "code": "0795",
    "name": "高安",
    "pinyin": "Gaoan",
    "label": "Gaoan0795" },

  {
    "code": "0311",
    "name": "藁城",
    "pinyin": "Gaocheng",
    "label": "Gaocheng0311" },

  {
    "code": "025",
    "name": "高淳",
    "pinyin": "Gaochun",
    "label": "Gaochun025" },

  {
    "code": "0931",
    "name": "皋兰",
    "pinyin": "Gaolan",
    "label": "Gaolan0931" },

  {
    "code": "029",
    "name": "高陵",
    "pinyin": "Gaoling",
    "label": "Gaoling029" },

  {
    "code": "0536",
    "name": "高密",
    "pinyin": "Gaomi",
    "label": "Gaomi0536" },

  {
    "code": "0533",
    "name": "高青",
    "pinyin": "Gaoqing",
    "label": "Gaoqing0533" },

  {
    "code": "0635",
    "name": "高唐",
    "pinyin": "Gaotang",
    "label": "Gaotang0635" },

  {
    "code": "0758",
    "name": "高要",
    "pinyin": "Gaoyao",
    "label": "Gaoyao0758" },

  {
    "code": "0311",
    "name": "高邑",
    "pinyin": "Gaoyi",
    "label": "Gaoyi0311" },

  {
    "code": "0514",
    "name": "高邮",
    "pinyin": "Gaoyou",
    "label": "Gaoyou0514" },

  {
    "code": "0668",
    "name": "高州",
    "pinyin": "Gaozhou",
    "label": "Gaozhou0668" },

  {
    "code": "0371",
    "name": "巩义",
    "pinyin": "Gongyi",
    "label": "Gongyi0371" },

  {
    "code": "0794",
    "name": "广昌",
    "pinyin": "Guangchang",
    "label": "Guangchang0794" },

  {
    "code": "0563",
    "name": "广德",
    "pinyin": "Guangde",
    "label": "Guangde0563" },

  {
    "code": "0793",
    "name": "广丰",
    "pinyin": "Guangfeng",
    "label": "Guangfeng0793" },

  {
    "code": "0758",
    "name": "广宁",
    "pinyin": "Guangning",
    "label": "Guangning0758" },

  {
    "code": "0546",
    "name": "广饶",
    "pinyin": "Guangrao",
    "label": "Guangrao0546" },

  {
    "code": "0599",
    "name": "光泽",
    "pinyin": "Guangze",
    "label": "Guangze0599" },

  {
    "code": "0518",
    "name": "灌南",
    "pinyin": "Guannan",
    "label": "Guannan0518" },

  {
    "code": "0635",
    "name": "冠县",
    "pinyin": "Guanxian",
    "label": "Guanxian0635" },

  {
    "code": "0518",
    "name": "灌云",
    "pinyin": "Guanyun",
    "label": "Guanyun0518" },

  {
    "code": "0701",
    "name": "贵溪",
    "pinyin": "Guixi",
    "label": "Guixi0701" },

  {
    "code": "0593",
    "name": "古田",
    "pinyin": "Gutian",
    "label": "Gutian0593" },

  {
    "code": "0552",
    "name": "固镇",
    "pinyin": "Guzhen",
    "label": "Guzhen0552" }] },



{
  "initial": "H",
  "list": [
  {
    "code": "0970",
    "name": "海北",
    "pinyin": "Haibei",
    "label": "Haibei0970" },

  {
    "code": "0451",
    "name": "哈尔滨",
    "pinyin": "Haerbin",
    "label": "Haerbin0451" },

  {
    "code": "0898",
    "name": "海口",
    "pinyin": "Haikou",
    "label": "Haikou0898" },

  {
    "code": "0310",
    "name": "邯郸",
    "pinyin": "Handan",
    "label": "Handan0310" },

  {
    "code": "0571",
    "name": "杭州",
    "pinyin": "Hangzhou",
    "label": "Hangzhou0571" },

  {
    "code": "0551",
    "name": "合肥",
    "pinyin": "Hefei",
    "label": "Hefei0551" },

  {
    "code": "0752",
    "name": "惠州",
    "pinyin": "Huizhou",
    "label": "Huizhou0752" },

  {
    "code": "0972",
    "name": "海东",
    "pinyin": "Haidong",
    "label": "Haidong0972" },

  {
    "code": "0974",
    "name": "海南",
    "pinyin": "Hainan",
    "label": "Hainan0974" },

  {
    "code": "0977",
    "name": "海西",
    "pinyin": "Haixi",
    "label": "Haixi0977" },

  {
    "code": "0902",
    "name": "哈密",
    "pinyin": "Hami",
    "label": "Hami0902" },

  {
    "code": "0916",
    "name": "汉中",
    "pinyin": "Hanzhong",
    "label": "Hanzhong0916" },

  {
    "code": "0392",
    "name": "鹤壁",
    "pinyin": "Hebi",
    "label": "Hebi0392" },

  {
    "code": "0778",
    "name": "河池",
    "pinyin": "Hechi",
    "label": "Hechi0778" },

  {
    "code": "0468",
    "name": "鹤岗",
    "pinyin": "Hegang",
    "label": "Hegang0468" },

  {
    "code": "0456",
    "name": "黑河",
    "pinyin": "Heihe",
    "label": "Heihe0456" },

  {
    "code": "0318",
    "name": "衡水",
    "pinyin": "Hengshui",
    "label": "Hengshui0318" },

  {
    "code": "0734",
    "name": "衡阳",
    "pinyin": "Hengyang",
    "label": "Hengyang0734" },

  {
    "code": "0903",
    "name": "和田地",
    "pinyin": "Hetiandi",
    "label": "Hetiandi0903" },

  {
    "code": "0762",
    "name": "河源",
    "pinyin": "Heyuan",
    "label": "Heyuan0762" },

  {
    "code": "0530",
    "name": "菏泽",
    "pinyin": "Heze",
    "label": "Heze0530" },

  {
    "code": "0774",
    "name": "贺州",
    "pinyin": "Hezhou",
    "label": "Hezhou0774" },

  {
    "code": "0873",
    "name": "红河",
    "pinyin": "Honghe",
    "label": "Honghe0873" },

  {
    "code": "0517",
    "name": "淮安",
    "pinyin": "Huaian",
    "label": "Huaian0517" },

  {
    "code": "0561",
    "name": "淮北",
    "pinyin": "Huaibei",
    "label": "Huaibei0561" },

  {
    "code": "0745",
    "name": "怀化",
    "pinyin": "Huaihua",
    "label": "Huaihua0745" },

  {
    "code": "0554",
    "name": "淮南",
    "pinyin": "Huainan",
    "label": "Huainan0554" },

  {
    "code": "0713",
    "name": "黄冈",
    "pinyin": "Huanggang",
    "label": "Huanggang0713" },

  {
    "code": "0973",
    "name": "黄南",
    "pinyin": "Huangnan",
    "label": "Huangnan0973" },

  {
    "code": "0559",
    "name": "黄山",
    "pinyin": "Huangshan",
    "label": "Huangshan0559" },

  {
    "code": "0714",
    "name": "黄石",
    "pinyin": "Huangshi",
    "label": "Huangshi0714" },

  {
    "code": "0471",
    "name": "呼和浩特",
    "pinyin": "Huhehaote",
    "label": "Huhehaote0471" },

  {
    "code": "0429",
    "name": "葫芦岛",
    "pinyin": "Huludao",
    "label": "Huludao0429" },

  {
    "code": "0470",
    "name": "呼伦贝尔",
    "pinyin": "Hulunbeier",
    "label": "Hulunbeier0470" },

  {
    "code": "0572",
    "name": "湖州",
    "pinyin": "Huzhou",
    "label": "Huzhou0572" },

  {
    "code": "0513",
    "name": "海安",
    "pinyin": "Haian",
    "label": "Haian0513" },

  {
    "code": "0660",
    "name": "海丰",
    "pinyin": "Haifeng",
    "label": "Haifeng0660" },

  {
    "code": "0513",
    "name": "海门",
    "pinyin": "Haimen",
    "label": "Haimen0513" },

  {
    "code": "0573",
    "name": "海宁",
    "pinyin": "Haining",
    "label": "Haining0573" },

  {
    "code": "0573",
    "name": "海盐",
    "pinyin": "Haiyan",
    "label": "Haiyan0573" },

  {
    "code": "0535",
    "name": "海阳",
    "pinyin": "Haiyang",
    "label": "Haiyang0535" },

  {
    "code": "0565",
    "name": "含山",
    "pinyin": "Hanshan",
    "label": "Hanshan0565" },

  {
    "code": "023",
    "name": "合川",
    "pinyin": "Hechuan",
    "label": "Hechuan023" },

  {
    "code": "0793",
    "name": "横峰",
    "pinyin": "Hengfeng",
    "label": "Hengfeng0793" },

  {
    "code": "0771",
    "name": "横县",
    "pinyin": "Hengxian",
    "label": "Hengxian0771" },

  {
    "code": "0762",
    "name": "和平",
    "pinyin": "Heping",
    "label": "Heping0762" },

  {
    "code": "0750",
    "name": "鹤山",
    "pinyin": "Heshan",
    "label": "Heshan0750" },

  {
    "code": "0565",
    "name": "和县",
    "pinyin": "Hexian",
    "label": "Hexian0565" },

  {
    "code": "0517",
    "name": "洪泽",
    "pinyin": "Hongze",
    "label": "Hongze0517" },

  {
    "code": "0596",
    "name": "华安",
    "pinyin": "Huaan",
    "label": "Huaan0596" },

  {
    "code": "0423",
    "name": "桦甸",
    "pinyin": "Huadian",
    "label": "Huadian0423" },

  {
    "code": "0758",
    "name": "怀集",
    "pinyin": "Huaiji",
    "label": "Huaiji0758" },

  {
    "code": "0556",
    "name": "怀宁",
    "pinyin": "Huaining",
    "label": "Huaining0556" },

  {
    "code": "0552",
    "name": "怀远",
    "pinyin": "Huaiyuan",
    "label": "Huaiyuan0552" },

  {
    "code": "0533",
    "name": "桓台",
    "pinyin": "Huantai",
    "label": "Huantai0533" },

  {
    "code": "0668",
    "name": "化州",
    "pinyin": "Huazhou",
    "label": "Huazhou0668" },

  {
    "code": "0595",
    "name": "惠安",
    "pinyin": "Huian",
    "label": "Huian0595" },

  {
    "code": "0797",
    "name": "会昌",
    "pinyin": "Huichang",
    "label": "Huichang0797" },

  {
    "code": "0752",
    "name": "惠东",
    "pinyin": "Huidong",
    "label": "Huidong0752" },

  {
    "code": "0663",
    "name": "惠来",
    "pinyin": "Huilai",
    "label": "Huilai0663" },

  {
    "code": "0543",
    "name": "惠民",
    "pinyin": "Huimin",
    "label": "Huimin0543" },

  {
    "code": "0792",
    "name": "湖口",
    "pinyin": "Hukou",
    "label": "Hukou0792" },

  {
    "code": "0451",
    "name": "呼兰",
    "pinyin": "Hulan",
    "label": "Hulan0451" },

  {
    "code": "0564",
    "name": "霍邱",
    "pinyin": "Huoqiu",
    "label": "Huoqiu0564" },

  {
    "code": "0564",
    "name": "霍山",
    "pinyin": "Huoshan",
    "label": "Huoshan0564" },

  {
    "code": "029",
    "name": "户县",
    "pinyin": "Huxian",
    "label": "Huxian029" }] },



{
  "initial": "J",
  "list": [
  {
    "code": "0454",
    "name": "佳木斯",
    "pinyin": "Jiamusi",
    "label": "Jiamusi0454" },

  {
    "code": "0391",
    "name": "焦作",
    "pinyin": "Jiaozuo",
    "label": "Jiaozuo0391" },

  {
    "code": "0573",
    "name": "嘉兴",
    "pinyin": "Jiaxing",
    "label": "Jiaxing0573" },

  {
    "code": "0423",
    "name": "吉林",
    "pinyin": "Jilin",
    "label": "Jilin0423" },

  {
    "code": "0531",
    "name": "济南",
    "pinyin": "Jinan",
    "label": "Jinan0531" },

  {
    "code": "0750",
    "name": "江门",
    "pinyin": "Jiangmen",
    "label": "Jiangmen0750" },

  {
    "code": "0796",
    "name": "吉安",
    "pinyin": "Jian",
    "label": "Jian0796" },

  {
    "code": "0937",
    "name": "嘉峪关",
    "pinyin": "Jiayuguan",
    "label": "Jiayuguan0937" },

  {
    "code": "0663",
    "name": "揭阳",
    "pinyin": "Jieyang",
    "label": "Jieyang0663" },

  {
    "code": "0935",
    "name": "金昌",
    "pinyin": "Jinchang",
    "label": "Jinchang0935" },

  {
    "code": "0356",
    "name": "晋城",
    "pinyin": "Jincheng",
    "label": "Jincheng0356" },

  {
    "code": "0798",
    "name": "景德镇",
    "pinyin": "Jingdezhen",
    "label": "Jingdezhen0798" },

  {
    "code": "0724",
    "name": "荆门",
    "pinyin": "Jingmen",
    "label": "Jingmen0724" },

  {
    "code": "0716",
    "name": "荆州",
    "pinyin": "Jingzhou",
    "label": "Jingzhou0716" },

  {
    "code": "0579",
    "name": "金华",
    "pinyin": "Jinhua",
    "label": "Jinhua0579" },

  {
    "code": "0537",
    "name": "济宁",
    "pinyin": "Jining",
    "label": "Jining0537" },

  {
    "code": "0354",
    "name": "晋中",
    "pinyin": "Jinzhong",
    "label": "Jinzhong0354" },

  {
    "code": "0416",
    "name": "锦州",
    "pinyin": "Jinzhou",
    "label": "Jinzhou0416" },

  {
    "code": "0792",
    "name": "九江",
    "pinyin": "Jiujiang",
    "label": "Jiujiang0792" },

  {
    "code": "0937",
    "name": "酒泉",
    "pinyin": "Jiuquan",
    "label": "Jiuquan0937" },

  {
    "code": "0467",
    "name": "鸡西",
    "pinyin": "Jixi",
    "label": "Jixi0467" },

  {
    "code": "0571",
    "name": "建德",
    "pinyin": "Jiande",
    "label": "Jiande0571" },

  {
    "code": "0514",
    "name": "江都",
    "pinyin": "Jiangdu",
    "label": "Jiangdu0514" },

  {
    "code": "023",
    "name": "江津",
    "pinyin": "Jiangjin",
    "label": "Jiangjin023" },

  {
    "code": "0598",
    "name": "将乐",
    "pinyin": "Jiangle",
    "label": "Jiangle0598" },

  {
    "code": "0570",
    "name": "江山",
    "pinyin": "Jiangshan",
    "label": "Jiangshan0570" },

  {
    "code": "0523",
    "name": "姜堰",
    "pinyin": "Jiangyan",
    "label": "Jiangyan0523" },

  {
    "code": "0510",
    "name": "江阴",
    "pinyin": "Jiangyin",
    "label": "Jiangyin0510" },

  {
    "code": "0515",
    "name": "建湖",
    "pinyin": "Jianhu",
    "label": "Jianhu0515" },

  {
    "code": "0598",
    "name": "建宁",
    "pinyin": "Jianning",
    "label": "Jianning0598" },

  {
    "code": "0599",
    "name": "建瓯",
    "pinyin": "Jianou",
    "label": "Jianou0599" },

  {
    "code": "0599",
    "name": "建阳",
    "pinyin": "Jianyang",
    "label": "Jianyang0599" },

  {
    "code": "0796",
    "name": "吉安",
    "pinyin": "Jian",
    "label": "Jian0796" },

  {
    "code": "0423",
    "name": "蛟河",
    "pinyin": "Jiaohe",
    "label": "Jiaohe0423" },

  {
    "code": "0753",
    "name": "蕉岭",
    "pinyin": "Jiaoling",
    "label": "Jiaoling0753" },

  {
    "code": "0532",
    "name": "胶南",
    "pinyin": "Jiaonan",
    "label": "Jiaonan0532" },

  {
    "code": "0532",
    "name": "胶州",
    "pinyin": "Jiaozhou",
    "label": "Jiaozhou0532" },

  {
    "code": "0573",
    "name": "嘉善",
    "pinyin": "Jiashan",
    "label": "Jiashan0573" },

  {
    "code": "0537",
    "name": "嘉祥",
    "pinyin": "Jiaxiang",
    "label": "Jiaxiang0537" },

  {
    "code": "0663",
    "name": "揭东",
    "pinyin": "Jiedong",
    "label": "Jiedong0663" },

  {
    "code": "0558",
    "name": "界首",
    "pinyin": "Jieshou",
    "label": "Jieshou0558" },

  {
    "code": "0663",
    "name": "揭西",
    "pinyin": "Jiexi",
    "label": "Jiexi0663" },

  {
    "code": "0532",
    "name": "即墨",
    "pinyin": "Jimo",
    "label": "Jimo0532" },

  {
    "code": "0795",
    "name": "靖安",
    "pinyin": "Jingan",
    "label": "Jingan0795" },

  {
    "code": "0563",
    "name": "旌德",
    "pinyin": "Jingde",
    "label": "Jingde0563" },

  {
    "code": "0796",
    "name": "井冈山",
    "pinyin": "Jinggangshan",
    "label": "Jinggangshan0796" },

  {
    "code": "0523",
    "name": "靖江",
    "pinyin": "Jingjiang",
    "label": "Jingjiang0523" },

  {
    "code": "0578",
    "name": "景宁",
    "pinyin": "Jingning",
    "label": "Jingning0578" },

  {
    "code": "0563",
    "name": "泾县",
    "pinyin": "Jingxian",
    "label": "Jingxian0563" },

  {
    "code": "0311",
    "name": "井陉",
    "pinyin": "Jingxing",
    "label": "Jingxing0311" },

  {
    "code": "0517",
    "name": "金湖",
    "pinyin": "Jinhu",
    "label": "Jinhu0517" },

  {
    "code": "0595",
    "name": "晋江",
    "pinyin": "Jinjiang",
    "label": "Jinjiang0595" },

  {
    "code": "0595",
    "name": "金门",
    "pinyin": "Jinmen",
    "label": "Jinmen0595" },

  {
    "code": "0871",
    "name": "晋宁",
    "pinyin": "Jinning",
    "label": "Jinning0871" },

  {
    "code": "0519",
    "name": "金坛",
    "pinyin": "Jintan",
    "label": "Jintan0519" },

  {
    "code": "028",
    "name": "金堂",
    "pinyin": "Jintang",
    "label": "Jintang028" },

  {
    "code": "0791",
    "name": "进贤",
    "pinyin": "Jinxian",
    "label": "Jinxian0791" },

  {
    "code": "0794",
    "name": "金溪",
    "pinyin": "Jinxi",
    "label": "Jinxi0794" },

  {
    "code": "0537",
    "name": "金乡",
    "pinyin": "Jinxiang",
    "label": "Jinxiang0537" },

  {
    "code": "0578",
    "name": "缙云",
    "pinyin": "Jinyun",
    "label": "Jinyun0578" },

  {
    "code": "0564",
    "name": "金寨",
    "pinyin": "Jinzhai",
    "label": "Jinzhai0564" },

  {
    "code": "0311",
    "name": "晋州",
    "pinyin": "Jinzhou",
    "label": "Jinzhou0311" },

  {
    "code": "0796",
    "name": "吉水",
    "pinyin": "Jishui",
    "label": "Jishui0796" },

  {
    "code": "0792",
    "name": "九江",
    "pinyin": "Jiujiang",
    "label": "Jiujiang0792" },

  {
    "code": "0431",
    "name": "九台",
    "pinyin": "Jiutai",
    "label": "Jiutai0431" },

  {
    "code": "0563",
    "name": "绩溪",
    "pinyin": "Jixi",
    "label": "Jixi0563" },

  {
    "code": "0531",
    "name": "济阳",
    "pinyin": "Jiyang",
    "label": "Jiyang0531" },

  {
    "code": "0391",
    "name": "济源",
    "pinyin": "Jiyuan",
    "label": "Jiyuan0391" },

  {
    "code": "0530",
    "name": "鄄城",
    "pinyin": "Juancheng",
    "label": "Juancheng0530" },

  {
    "code": "0539",
    "name": "莒南",
    "pinyin": "Junan",
    "label": "Junan0539" },

  {
    "code": "0511",
    "name": "句容",
    "pinyin": "Jurong",
    "label": "Jurong0511" },

  {
    "code": "0633",
    "name": "莒县",
    "pinyin": "Juxian",
    "label": "Juxian0633" },

  {
    "code": "0530",
    "name": "巨野",
    "pinyin": "Juye",
    "label": "Juye0530" }] },



{
  "initial": "K",
  "list": [
  {
    "code": "0378",
    "name": "开封",
    "pinyin": "Kaifeng",
    "label": "Kaifeng0378" },

  {
    "code": "0871",
    "name": "昆明",
    "pinyin": "Kunming",
    "label": "Kunming0871" },

  {
    "code": "0998",
    "name": "喀什地",
    "pinyin": "Kashidi",
    "label": "Kashidi0998" },

  {
    "code": "0990",
    "name": "克拉玛依",
    "pinyin": "Kelamayi",
    "label": "Kelamayi0990" },

  {
    "code": "0908",
    "name": "克孜勒",
    "pinyin": "Kezile",
    "label": "Kezile0908" },

  {
    "code": "0570",
    "name": "开化",
    "pinyin": "Kaihua",
    "label": "Kaihua0570" },

  {
    "code": "0750",
    "name": "开平",
    "pinyin": "Kaiping",
    "label": "Kaiping0750" },

  {
    "code": "023",
    "name": "开县",
    "pinyin": "Kaixian",
    "label": "Kaixian023" },

  {
    "code": "0851",
    "name": "开阳",
    "pinyin": "Kaiyang",
    "label": "Kaiyang0851" },

  {
    "code": "024",
    "name": "康平",
    "pinyin": "Kangping",
    "label": "Kangping024" },

  {
    "code": "0546",
    "name": "垦利",
    "pinyin": "Kenli",
    "label": "Kenli0546" },

  {
    "code": "0512",
    "name": "昆山",
    "pinyin": "Kunshan",
    "label": "Kunshan0512" }] },



{
  "initial": "L",
  "list": [
  {
    "code": "0772",
    "name": "来宾",
    "pinyin": "Laibin",
    "label": "Laibin0772" },

  {
    "code": "0931",
    "name": "兰州",
    "pinyin": "Lanzhou",
    "label": "Lanzhou0931" },

  {
    "code": "0772",
    "name": "柳州",
    "pinyin": "Liuzhou",
    "label": "Liuzhou0772" },

  {
    "code": "0379",
    "name": "洛阳",
    "pinyin": "Luoyang",
    "label": "Luoyang0379" },

  {
    "code": "0634",
    "name": "莱芜",
    "pinyin": "Laiwu",
    "label": "Laiwu0634" },

  {
    "code": "0316",
    "name": "廊坊",
    "pinyin": "Langfang",
    "label": "Langfang0316" },

  {
    "code": "0891",
    "name": "拉萨",
    "pinyin": "Lasa",
    "label": "Lasa0891" },

  {
    "code": "0833",
    "name": "乐山",
    "pinyin": "Leshan",
    "label": "Leshan0833" },

  {
    "code": "0834",
    "name": "凉山",
    "pinyin": "Liangshan",
    "label": "Liangshan0834" },

  {
    "code": "0518",
    "name": "连云港",
    "pinyin": "Lianyungang",
    "label": "Lianyungang0518" },

  {
    "code": "0635",
    "name": "聊城",
    "pinyin": "Liaocheng",
    "label": "Liaocheng0635" },

  {
    "code": "0419",
    "name": "辽阳",
    "pinyin": "Liaoyang",
    "label": "Liaoyang0419" },

  {
    "code": "0437",
    "name": "辽源",
    "pinyin": "Liaoyuan",
    "label": "Liaoyuan0437" },

  {
    "code": "0888",
    "name": "丽江",
    "pinyin": "Lijiang",
    "label": "Lijiang0888" },

  {
    "code": "0883",
    "name": "临沧",
    "pinyin": "Lincang",
    "label": "Lincang0883" },

  {
    "code": "0357",
    "name": "临汾",
    "pinyin": "Linfen",
    "label": "Linfen0357" },

  {
    "code": "0930",
    "name": "临夏",
    "pinyin": "Linxia",
    "label": "Linxia0930" },

  {
    "code": "0539",
    "name": "临沂",
    "pinyin": "Linyi",
    "label": "Linyi0539" },

  {
    "code": "0894",
    "name": "林芝",
    "pinyin": "Linzhi",
    "label": "Linzhi0894" },

  {
    "code": "0578",
    "name": "丽水",
    "pinyin": "Lishui",
    "label": "Lishui0578" },

  {
    "code": "0564",
    "name": "六安",
    "pinyin": "Liuan",
    "label": "Liuan0564" },

  {
    "code": "0858",
    "name": "六盘水",
    "pinyin": "Liupanshui",
    "label": "Liupanshui0858" },

  {
    "code": "0939",
    "name": "陇南",
    "pinyin": "Longnan",
    "label": "Longnan0939" },

  {
    "code": "0597",
    "name": "龙岩",
    "pinyin": "Longyan",
    "label": "Longyan0597" },

  {
    "code": "0738",
    "name": "娄底",
    "pinyin": "Loudi",
    "label": "Loudi0738" },

  {
    "code": "0395",
    "name": "漯河",
    "pinyin": "Luohe",
    "label": "Luohe0395" },

  {
    "code": "0830",
    "name": "泸州",
    "pinyin": "Luzhou",
    "label": "Luzhou0830" },

  {
    "code": "0358",
    "name": "吕梁",
    "pinyin": "Lvliang",
    "label": "Lvliang0358" },

  {
    "code": "0550",
    "name": "来安",
    "pinyin": "Laian",
    "label": "Laian0550" },

  {
    "code": "0532",
    "name": "莱西",
    "pinyin": "Laixi",
    "label": "Laixi0532" },

  {
    "code": "0535",
    "name": "莱阳",
    "pinyin": "Laiyang",
    "label": "Laiyang0535" },

  {
    "code": "0535",
    "name": "莱州",
    "pinyin": "Laizhou",
    "label": "Laizhou0535" },

  {
    "code": "0563",
    "name": "郎溪",
    "pinyin": "Langxi",
    "label": "Langxi0563" },

  {
    "code": "029",
    "name": "蓝田",
    "pinyin": "Lantian",
    "label": "Lantian029" },

  {
    "code": "0579",
    "name": "兰溪",
    "pinyin": "Lanxi",
    "label": "Lanxi0579" },

  {
    "code": "0794",
    "name": "乐安",
    "pinyin": "Lean",
    "label": "Lean0794" },

  {
    "code": "0751",
    "name": "乐昌",
    "pinyin": "Lechang",
    "label": "Lechang0751" },

  {
    "code": "0759",
    "name": "雷州",
    "pinyin": "Leizhou",
    "label": "Leizhou0759" },

  {
    "code": "0534",
    "name": "乐陵",
    "pinyin": "Leling",
    "label": "Leling0534" },

  {
    "code": "0798",
    "name": "乐平",
    "pinyin": "Leping",
    "label": "Leping0798" },

  {
    "code": "0577",
    "name": "乐清",
    "pinyin": "Leqing",
    "label": "Leqing0577" },

  {
    "code": "0315",
    "name": "乐亭",
    "pinyin": "Leting",
    "label": "Leting0315" },

  {
    "code": "0597",
    "name": "连城",
    "pinyin": "Liancheng",
    "label": "Liancheng0597" },

  {
    "code": "023",
    "name": "梁平",
    "pinyin": "Liangping",
    "label": "Liangping023" },

  {
    "code": "0537",
    "name": "梁山",
    "pinyin": "Liangshan",
    "label": "Liangshan0537" },

  {
    "code": "0799",
    "name": "莲花",
    "pinyin": "Lianhua",
    "label": "Lianhua0799" },

  {
    "code": "0591",
    "name": "连江",
    "pinyin": "Lianjiang",
    "label": "Lianjiang0591" },

  {
    "code": "0759",
    "name": "廉江",
    "pinyin": "Lianjiang",
    "label": "Lianjiang0759" },

  {
    "code": "0763",
    "name": "连南",
    "pinyin": "Liannan",
    "label": "Liannan0763" },

  {
    "code": "0762",
    "name": "连平",
    "pinyin": "Lianping",
    "label": "Lianping0762" },

  {
    "code": "0763",
    "name": "连山",
    "pinyin": "Lianshan",
    "label": "Lianshan0763" },

  {
    "code": "0517",
    "name": "涟水",
    "pinyin": "Lianshui",
    "label": "Lianshui0517" },

  {
    "code": "0763",
    "name": "连州",
    "pinyin": "Lianzhou",
    "label": "Lianzhou0763" },

  {
    "code": "024",
    "name": "辽中",
    "pinyin": "Liaozhong",
    "label": "Liaozhong024" },

  {
    "code": "0794",
    "name": "黎川",
    "pinyin": "Lichuan",
    "label": "Lichuan0794" },

  {
    "code": "0546",
    "name": "利津",
    "pinyin": "Lijin",
    "label": "Lijin0546" },

  {
    "code": "0571",
    "name": "临安",
    "pinyin": "Linan",
    "label": "Linan0571" },

  {
    "code": "0557",
    "name": "灵璧",
    "pinyin": "Lingbi",
    "label": "Lingbi0557" },

  {
    "code": "0311",
    "name": "灵寿",
    "pinyin": "Lingshou",
    "label": "Lingshou0311" },

  {
    "code": "0534",
    "name": "陵县",
    "pinyin": "Lingxian",
    "label": "Lingxian0534" },

  {
    "code": "0576",
    "name": "临海",
    "pinyin": "Linhai",
    "label": "Linhai0576" },

  {
    "code": "0635",
    "name": "临清",
    "pinyin": "Linqing",
    "label": "Linqing0635" },

  {
    "code": "0558",
    "name": "临泉",
    "pinyin": "Linquan",
    "label": "Linquan0558" },

  {
    "code": "0536",
    "name": "临朐",
    "pinyin": "Linqu",
    "label": "Linqu0536" },

  {
    "code": "0539",
    "name": "临沭",
    "pinyin": "Linshu",
    "label": "Linshu0539" },

  {
    "code": "0534",
    "name": "临邑",
    "pinyin": "Linyi",
    "label": "Linyi0534" },

  {
    "code": "025",
    "name": "溧水",
    "pinyin": "Lishui",
    "label": "Lishui025" },

  {
    "code": "0772",
    "name": "柳城",
    "pinyin": "Liucheng",
    "label": "Liucheng0772" },

  {
    "code": "0772",
    "name": "柳江",
    "pinyin": "Liujiang",
    "label": "Liujiang0772" },

  {
    "code": "0731",
    "name": "浏阳",
    "pinyin": "Liuyang",
    "label": "Liuyang0731" },

  {
    "code": "0558",
    "name": "利辛",
    "pinyin": "Lixin",
    "label": "Lixin0558" },

  {
    "code": "0519",
    "name": "溧阳",
    "pinyin": "Liyang",
    "label": "Liyang0519" },

  {
    "code": "0771",
    "name": "隆安",
    "pinyin": "Longan",
    "label": "Longan0771" },

  {
    "code": "0762",
    "name": "龙川",
    "pinyin": "Longchuan",
    "label": "Longchuan0762" },

  {
    "code": "0596",
    "name": "龙海",
    "pinyin": "Longhai",
    "label": "Longhai0596" },

  {
    "code": "0535",
    "name": "龙口",
    "pinyin": "Longkou",
    "label": "Longkou0535" },

  {
    "code": "0752",
    "name": "龙门",
    "pinyin": "Longmen",
    "label": "Longmen0752" },

  {
    "code": "0797",
    "name": "龙南",
    "pinyin": "Longnan",
    "label": "Longnan0797" },

  {
    "code": "0578",
    "name": "龙泉",
    "pinyin": "Longquan",
    "label": "Longquan0578" },

  {
    "code": "0570",
    "name": "龙游",
    "pinyin": "Longyou",
    "label": "Longyou0570" },

  {
    "code": "0311",
    "name": "栾城",
    "pinyin": "Luancheng",
    "label": "Luancheng0311" },

  {
    "code": "0379",
    "name": "栾川",
    "pinyin": "Luanchuan",
    "label": "Luanchuan0379" },

  {
    "code": "0315",
    "name": "滦南",
    "pinyin": "Luannan",
    "label": "Luannan0315" },

  {
    "code": "0315",
    "name": "滦县",
    "pinyin": "Luanxian",
    "label": "Luanxian0315" },

  {
    "code": "0660",
    "name": "陆丰",
    "pinyin": "Lufeng",
    "label": "Lufeng0660" },

  {
    "code": "0660",
    "name": "陆河",
    "pinyin": "Luhe",
    "label": "Luhe0660" },

  {
    "code": "0565",
    "name": "庐江",
    "pinyin": "Lujiang",
    "label": "Lujiang0565" },

  {
    "code": "0766",
    "name": "罗定",
    "pinyin": "Luoding",
    "label": "Luoding0766" },

  {
    "code": "0379",
    "name": "洛宁",
    "pinyin": "Luoning",
    "label": "Luoning0379" },

  {
    "code": "0591",
    "name": "罗源",
    "pinyin": "Luoyuan",
    "label": "Luoyuan0591" },

  {
    "code": "0311",
    "name": "鹿泉",
    "pinyin": "Luquan",
    "label": "Luquan0311" },

  {
    "code": "0871",
    "name": "禄劝",
    "pinyin": "Luquan",
    "label": "Luquan0871" },

  {
    "code": "0799",
    "name": "芦溪",
    "pinyin": "Luxi",
    "label": "Luxi0799" },

  {
    "code": "0772",
    "name": "鹿寨",
    "pinyin": "Luzhai",
    "label": "Luzhai0772" }] },



{
  "initial": "M",
  "list": [
  {
    "code": "0555",
    "name": "马鞍山",
    "pinyin": "Maanshan",
    "label": "Maanshan0555" },

  {
    "code": "0668",
    "name": "茂名",
    "pinyin": "Maoming",
    "label": "Maoming0668" },

  {
    "code": "028",
    "name": "眉山",
    "pinyin": "Meishan",
    "label": "Meishan028" },

  {
    "code": "0753",
    "name": "梅州",
    "pinyin": "Meizhou",
    "label": "Meizhou0753" },

  {
    "code": "0816",
    "name": "绵阳",
    "pinyin": "Mianyang",
    "label": "Mianyang0816" },

  {
    "code": "0453",
    "name": "牡丹江",
    "pinyin": "Mudanjiang",
    "label": "Mudanjiang0453" },

  {
    "code": "0771",
    "name": "马山",
    "pinyin": "Mashan",
    "label": "Mashan0771" },

  {
    "code": "0753",
    "name": "梅县",
    "pinyin": "Meixian",
    "label": "Meixian0753" },

  {
    "code": "0558",
    "name": "蒙城",
    "pinyin": "Mengcheng",
    "label": "Mengcheng0558" },

  {
    "code": "0379",
    "name": "孟津",
    "pinyin": "Mengjin",
    "label": "Mengjin0379" },

  {
    "code": "0539",
    "name": "蒙阴",
    "pinyin": "Mengyin",
    "label": "Mengyin0539" },

  {
    "code": "0391",
    "name": "孟州",
    "pinyin": "Mengzhou",
    "label": "Mengzhou0391" },

  {
    "code": "0550",
    "name": "明光",
    "pinyin": "Mingguang",
    "label": "Mingguang0550" },

  {
    "code": "0598",
    "name": "明溪",
    "pinyin": "Mingxi",
    "label": "Mingxi0598" },

  {
    "code": "0591",
    "name": "闽侯",
    "pinyin": "Minhou",
    "label": "Minhou0591" },

  {
    "code": "0591",
    "name": "闽清",
    "pinyin": "Minqing",
    "label": "Minqing0591" },

  {
    "code": "0451",
    "name": "木兰",
    "pinyin": "Mulan",
    "label": "Mulan0451" }] },



{
  "initial": "N",
  "list": [
  {
    "code": "0817",
    "name": "南充",
    "pinyin": "Nanchong",
    "label": "Nanchong0817" },

  {
    "code": "0791",
    "name": "南昌",
    "pinyin": "Nanchang",
    "label": "Nanchang0791" },

  {
    "code": "025",
    "name": "南京",
    "pinyin": "Nanjing",
    "label": "Nanjing025" },

  {
    "code": "0771",
    "name": "南宁",
    "pinyin": "Nanning",
    "label": "Nanning0771" },

  {
    "code": "0513",
    "name": "南通",
    "pinyin": "Nantong",
    "label": "Nantong0513" },

  {
    "code": "0574",
    "name": "宁波",
    "pinyin": "Ningbo",
    "label": "Ningbo0574" },

  {
    "code": "0599",
    "name": "南平",
    "pinyin": "Nanping",
    "label": "Nanping0599" },

  {
    "code": "0377",
    "name": "南阳",
    "pinyin": "Nanyang",
    "label": "Nanyang0377" },

  {
    "code": "0896",
    "name": "那曲",
    "pinyin": "Naqu",
    "label": "Naqu0896" },

  {
    "code": "0832",
    "name": "内江",
    "pinyin": "Neijiang",
    "label": "Neijiang0832" },

  {
    "code": "0593",
    "name": "宁德",
    "pinyin": "Ningde",
    "label": "Ningde0593" },

  {
    "code": "0886",
    "name": "怒江",
    "pinyin": "Nujiang",
    "label": "Nujiang0886" },

  {
    "code": "0595",
    "name": "南安",
    "pinyin": "Nanan",
    "label": "Nanan0595" },

  {
    "code": "0754",
    "name": "南澳",
    "pinyin": "Nanao",
    "label": "Nanao0754" },

  {
    "code": "0794",
    "name": "南城",
    "pinyin": "Nancheng",
    "label": "Nancheng0794" },

  {
    "code": "023",
    "name": "南川",
    "pinyin": "Nanchuan",
    "label": "Nanchuan023" },

  {
    "code": "0794",
    "name": "南丰",
    "pinyin": "Nanfeng",
    "label": "Nanfeng0794" },

  {
    "code": "0596",
    "name": "南靖",
    "pinyin": "Nanjing",
    "label": "Nanjing0596" },

  {
    "code": "0797",
    "name": "南康",
    "pinyin": "Nankang",
    "label": "Nankang0797" },

  {
    "code": "0553",
    "name": "南陵",
    "pinyin": "Nanling",
    "label": "Nanling0553" },

  {
    "code": "0751",
    "name": "南雄",
    "pinyin": "Nanxiong",
    "label": "Nanxiong0751" },

  {
    "code": "0797",
    "name": "宁都",
    "pinyin": "Ningdu",
    "label": "Ningdu0797" },

  {
    "code": "0563",
    "name": "宁国",
    "pinyin": "Ningguo",
    "label": "Ningguo0563" },

  {
    "code": "0574",
    "name": "宁海",
    "pinyin": "Ninghai",
    "label": "Ninghai0574" },

  {
    "code": "0598",
    "name": "宁化",
    "pinyin": "Ninghua",
    "label": "Ninghua0598" },

  {
    "code": "0534",
    "name": "宁津",
    "pinyin": "Ningjin",
    "label": "Ningjin0534" },

  {
    "code": "0731",
    "name": "宁乡",
    "pinyin": "Ningxiang",
    "label": "Ningxiang0731" },

  {
    "code": "0538",
    "name": "宁阳",
    "pinyin": "Ningyang",
    "label": "Ningyang0538" },

  {
    "code": "0431",
    "name": "农安",
    "pinyin": "Nongan",
    "label": "Nongan0431" }] },



{
  "initial": "P",
  "list": [
  {
    "code": "0427",
    "name": "盘锦",
    "pinyin": "Panjin",
    "label": "Panjin0427" },

  {
    "code": "0812",
    "name": "攀枝花",
    "pinyin": "Panzhihua",
    "label": "Panzhihua0812" },

  {
    "code": "0375",
    "name": "平顶山",
    "pinyin": "Pingdingshan",
    "label": "Pingdingshan0375" },

  {
    "code": "0933",
    "name": "平凉",
    "pinyin": "Pingliang",
    "label": "Pingliang0933" },

  {
    "code": "0799",
    "name": "萍乡",
    "pinyin": "Pingxiang",
    "label": "Pingxiang0799" },

  {
    "code": "0879",
    "name": "普洱",
    "pinyin": "Puer",
    "label": "Puer0879" },

  {
    "code": "0594",
    "name": "莆田",
    "pinyin": "Putian",
    "label": "Putian0594" },

  {
    "code": "0393",
    "name": "濮阳",
    "pinyin": "Puyang",
    "label": "Puyang0393" },

  {
    "code": "0579",
    "name": "磐安",
    "pinyin": "Panan",
    "label": "Panan0579" },

  {
    "code": "0423",
    "name": "磐石",
    "pinyin": "Panshi",
    "label": "Panshi0423" },

  {
    "code": "0516",
    "name": "沛县",
    "pinyin": "Peixian",
    "label": "Peixian0516" },

  {
    "code": "0535",
    "name": "蓬莱",
    "pinyin": "Penglai",
    "label": "Penglai0535" },

  {
    "code": "023",
    "name": "彭水",
    "pinyin": "Pengshui",
    "label": "Pengshui023" },

  {
    "code": "0792",
    "name": "彭泽",
    "pinyin": "Pengze",
    "label": "Pengze0792" },

  {
    "code": "028",
    "name": "彭州",
    "pinyin": "Pengzhou",
    "label": "Pengzhou028" },

  {
    "code": "0532",
    "name": "平度",
    "pinyin": "Pingdu",
    "label": "Pingdu0532" },

  {
    "code": "0596",
    "name": "平和",
    "pinyin": "Pinghe",
    "label": "Pinghe0596" },

  {
    "code": "0573",
    "name": "平湖",
    "pinyin": "Pinghu",
    "label": "Pinghu0573" },

  {
    "code": "0593",
    "name": "屏南",
    "pinyin": "Pingnan",
    "label": "Pingnan0593" },

  {
    "code": "0311",
    "name": "平山",
    "pinyin": "Pingshan",
    "label": "Pingshan0311" },

  {
    "code": "0591",
    "name": "平潭",
    "pinyin": "Pingtan",
    "label": "Pingtan0591" },

  {
    "code": "0577",
    "name": "平阳",
    "pinyin": "Pingyang",
    "label": "Pingyang0577" },

  {
    "code": "0531",
    "name": "平阴",
    "pinyin": "Pingyin",
    "label": "Pingyin0531" },

  {
    "code": "0539",
    "name": "平邑",
    "pinyin": "Pingyi",
    "label": "Pingyi0539" },

  {
    "code": "0534",
    "name": "平原",
    "pinyin": "Pingyuan",
    "label": "Pingyuan0534" },

  {
    "code": "0753",
    "name": "平远",
    "pinyin": "Pingyuan",
    "label": "Pingyuan0753" },

  {
    "code": "028",
    "name": "郫县",
    "pinyin": "Pixian",
    "label": "Pixian028" },

  {
    "code": "0516",
    "name": "邳州",
    "pinyin": "Pizhou",
    "label": "Pizhou0516" },

  {
    "code": "0793",
    "name": "鄱阳",
    "pinyin": "Poyang",
    "label": "Poyang0793" },

  {
    "code": "0599",
    "name": "浦城",
    "pinyin": "Pucheng",
    "label": "Pucheng0599" },

  {
    "code": "0579",
    "name": "浦江",
    "pinyin": "Pujiang",
    "label": "Pujiang0579" },

  {
    "code": "028",
    "name": "蒲江",
    "pinyin": "Pujiang",
    "label": "Pujiang028" },

  {
    "code": "0411",
    "name": "普兰店",
    "pinyin": "Pulandian",
    "label": "Pulandian0411" },

  {
    "code": "0663",
    "name": "普宁",
    "pinyin": "Puning",
    "label": "Puning0663" }] },



{
  "initial": "Q",
  "list": [
  {
    "code": "0855",
    "name": "黔东",
    "pinyin": "Qiandong",
    "label": "Qiandong0855" },

  {
    "code": "0532",
    "name": "青岛",
    "pinyin": "Qingdao",
    "label": "Qingdao0532" },

  {
    "code": "0595",
    "name": "泉州",
    "pinyin": "Quanzhou",
    "label": "Quanzhou0595" },

  {
    "code": "0854",
    "name": "黔南",
    "pinyin": "Qiannan",
    "label": "Qiannan0854" },

  {
    "code": "0859",
    "name": "黔西南",
    "pinyin": "Qianxinan",
    "label": "Qianxinan0859" },

  {
    "code": "0934",
    "name": "庆阳",
    "pinyin": "Qingyang",
    "label": "Qingyang0934" },

  {
    "code": "0763",
    "name": "清远",
    "pinyin": "Qingyuan",
    "label": "Qingyuan0763" },

  {
    "code": "0335",
    "name": "秦皇岛",
    "pinyin": "Qinhuangdao",
    "label": "Qinhuangdao0335" },

  {
    "code": "0777",
    "name": "钦州",
    "pinyin": "Qinzhou",
    "label": "Qinzhou0777" },

  {
    "code": "0452",
    "name": "齐齐哈尔",
    "pinyin": "Qiqihaer",
    "label": "Qiqihaer0452" },

  {
    "code": "0464",
    "name": "七台河",
    "pinyin": "Qitaihe",
    "label": "Qitaihe0464" },

  {
    "code": "0874",
    "name": "曲靖",
    "pinyin": "Qujing",
    "label": "Qujing0874" },

  {
    "code": "0570",
    "name": "衢州",
    "pinyin": "Quzhou",
    "label": "Quzhou0570" },

  {
    "code": "0315",
    "name": "迁安",
    "pinyin": "Qianan",
    "label": "Qianan0315" },

  {
    "code": "0556",
    "name": "潜山",
    "pinyin": "Qianshan",
    "label": "Qianshan0556" },

  {
    "code": "0793",
    "name": "铅山",
    "pinyin": "Qianshan",
    "label": "Qianshan0793" },

  {
    "code": "0315",
    "name": "迁西",
    "pinyin": "Qianxi",
    "label": "Qianxi0315" },

  {
    "code": "0513",
    "name": "启东",
    "pinyin": "Qidong",
    "label": "Qidong0513" },

  {
    "code": "0534",
    "name": "齐河",
    "pinyin": "Qihe",
    "label": "Qihe0534" },

  {
    "code": "023",
    "name": "綦江",
    "pinyin": "Qijiang",
    "label": "Qijiang023" },

  {
    "code": "0559",
    "name": "祁门",
    "pinyin": "Qimen",
    "label": "Qimen0559" },

  {
    "code": "0598",
    "name": "清流",
    "pinyin": "Qingliu",
    "label": "Qingliu0598" },

  {
    "code": "0578",
    "name": "青田",
    "pinyin": "Qingtian",
    "label": "Qingtian0578" },

  {
    "code": "0763",
    "name": "清新",
    "pinyin": "Qingxin",
    "label": "Qingxin0763" },

  {
    "code": "0566",
    "name": "青阳",
    "pinyin": "Qingyang",
    "label": "Qingyang0566" },

  {
    "code": "0578",
    "name": "庆元",
    "pinyin": "Qingyuan",
    "label": "Qingyuan0578" },

  {
    "code": "0534",
    "name": "庆云",
    "pinyin": "Qingyun",
    "label": "Qingyun0534" },

  {
    "code": "0851",
    "name": "清镇",
    "pinyin": "Qingzhen",
    "label": "Qingzhen0851" },

  {
    "code": "0536",
    "name": "青州",
    "pinyin": "Qingzhou",
    "label": "Qingzhou0536" },

  {
    "code": "0391",
    "name": "沁阳",
    "pinyin": "Qinyang",
    "label": "Qinyang0391" },

  {
    "code": "028",
    "name": "邛崃",
    "pinyin": "Qionglai",
    "label": "Qionglai028" },

  {
    "code": "0535",
    "name": "栖霞",
    "pinyin": "Qixia",
    "label": "Qixia0535" },

  {
    "code": "0550",
    "name": "全椒",
    "pinyin": "Quanjiao",
    "label": "Quanjiao0550" },

  {
    "code": "0797",
    "name": "全南",
    "pinyin": "Quannan",
    "label": "Quannan0797" },

  {
    "code": "0537",
    "name": "曲阜",
    "pinyin": "Qufu",
    "label": "Qufu0537" },

  {
    "code": "0751",
    "name": "曲江",
    "pinyin": "Qujiang",
    "label": "Qujiang0751" }] },



{
  "initial": "R",
  "list": [
  {
    "code": "0892",
    "name": "日喀则",
    "pinyin": "Rikaze",
    "label": "Rikaze0892" },

  {
    "code": "0633",
    "name": "日照",
    "pinyin": "Rizhao",
    "label": "Rizhao0633" },

  {
    "code": "0768",
    "name": "饶平",
    "pinyin": "Raoping",
    "label": "Raoping0768" },

  {
    "code": "0751",
    "name": "仁化",
    "pinyin": "Renhua",
    "label": "Renhua0751" },

  {
    "code": "0772",
    "name": "融安",
    "pinyin": "Rongan",
    "label": "Rongan0772" },

  {
    "code": "023",
    "name": "荣昌",
    "pinyin": "Rongchang",
    "label": "Rongchang023" },

  {
    "code": "0631",
    "name": "荣成",
    "pinyin": "Rongcheng",
    "label": "Rongcheng0631" },

  {
    "code": "0772",
    "name": "融水",
    "pinyin": "Rongshui",
    "label": "Rongshui0772" },

  {
    "code": "0513",
    "name": "如东",
    "pinyin": "Rudong",
    "label": "Rudong0513" },

  {
    "code": "0513",
    "name": "如皋",
    "pinyin": "Rugao",
    "label": "Rugao0513" },

  {
    "code": "0577",
    "name": "瑞安",
    "pinyin": "Ruian",
    "label": "Ruian0577" },

  {
    "code": "0792",
    "name": "瑞昌",
    "pinyin": "Ruichang",
    "label": "Ruichang0792" },

  {
    "code": "0797",
    "name": "瑞金",
    "pinyin": "Ruijin",
    "label": "Ruijin0797" },

  {
    "code": "0631",
    "name": "乳山",
    "pinyin": "Rushan",
    "label": "Rushan0631" },

  {
    "code": "0379",
    "name": "汝阳",
    "pinyin": "Ruyang",
    "label": "Ruyang0379" },

  {
    "code": "0751",
    "name": "乳源",
    "pinyin": "Ruyuan",
    "label": "Ruyuan0751" }] },



{
  "initial": "S",
  "list": [
  {
    "code": "0398",
    "name": "三门峡",
    "pinyin": "Sanmenxia",
    "label": "Sanmenxia0398" },

  {
    "code": "021",
    "name": "上海",
    "pinyin": "Shanghai",
    "label": "Shanghai021" },

  {
    "code": "024",
    "name": "沈阳",
    "pinyin": "Shenyang",
    "label": "Shenyang024" },

  {
    "code": "0755",
    "name": "深圳",
    "pinyin": "Shenzhen",
    "label": "Shenzhen0755" },

  {
    "code": "0311",
    "name": "石家庄",
    "pinyin": "Shijiazhuang",
    "label": "Shijiazhuang0311" },

  {
    "code": "0512",
    "name": "苏州",
    "pinyin": "Suzhou",
    "label": "Suzhou0512" },

  {
    "code": "0598",
    "name": "三明",
    "pinyin": "Sanming",
    "label": "Sanming0598" },

  {
    "code": "0899",
    "name": "三亚",
    "pinyin": "Sanya",
    "label": "Sanya0899" },

  {
    "code": "0914",
    "name": "商洛",
    "pinyin": "Shangluo",
    "label": "Shangluo0914" },

  {
    "code": "0370",
    "name": "商丘",
    "pinyin": "Shangqiu",
    "label": "Shangqiu0370" },

  {
    "code": "0793",
    "name": "上饶",
    "pinyin": "Shangrao",
    "label": "Shangrao0793" },

  {
    "code": "0893",
    "name": "山南",
    "pinyin": "Shannan",
    "label": "Shannan0893" },

  {
    "code": "0754",
    "name": "汕头",
    "pinyin": "Shantou",
    "label": "Shantou0754" },

  {
    "code": "0660",
    "name": "汕尾",
    "pinyin": "Shanwei",
    "label": "Shanwei0660" },

  {
    "code": "0751",
    "name": "韶关",
    "pinyin": "Shaoguan",
    "label": "Shaoguan0751" },

  {
    "code": "0575",
    "name": "绍兴",
    "pinyin": "Shaoxing",
    "label": "Shaoxing0575" },

  {
    "code": "0739",
    "name": "邵阳",
    "pinyin": "Shaoyang",
    "label": "Shaoyang0739" },

  {
    "code": "0719",
    "name": "十堰",
    "pinyin": "Shiyan",
    "label": "Shiyan0719" },

  {
    "code": "0952",
    "name": "石嘴山",
    "pinyin": "Shizuishan",
    "label": "Shizuishan0952" },

  {
    "code": "0469",
    "name": "双鸭山",
    "pinyin": "Shuangyashan",
    "label": "Shuangyashan0469" },

  {
    "code": "0349",
    "name": "朔州",
    "pinyin": "Shuozhou",
    "label": "Shuozhou0349" },

  {
    "code": "0434",
    "name": "四平",
    "pinyin": "Siping",
    "label": "Siping0434" },

  {
    "code": "0438",
    "name": "松原",
    "pinyin": "Songyuan",
    "label": "Songyuan0438" },

  {
    "code": "0455",
    "name": "绥化",
    "pinyin": "Suihua",
    "label": "Suihua0455" },

  {
    "code": "0825",
    "name": "遂宁",
    "pinyin": "Suining",
    "label": "Suining0825" },

  {
    "code": "0722",
    "name": "随州",
    "pinyin": "Suizhou",
    "label": "Suizhou0722" },

  {
    "code": "0527",
    "name": "宿迁",
    "pinyin": "Suqian",
    "label": "Suqian0527" },

  {
    "code": "0557",
    "name": "宿州",
    "pinyin": "Suzhou",
    "label": "Suzhou0557" },

  {
    "code": "0772",
    "name": "三江",
    "pinyin": "Sanjiang",
    "label": "Sanjiang0772" },

  {
    "code": "0576",
    "name": "三门",
    "pinyin": "Sanmen",
    "label": "Sanmen0576" },

  {
    "code": "0596",
    "name": "诏安",
    "pinyin": "Saoan",
    "label": "Saoan0596" },

  {
    "code": "0795",
    "name": "上高",
    "pinyin": "Shanggao",
    "label": "Shanggao0795" },

  {
    "code": "0597",
    "name": "上杭",
    "pinyin": "Shanghang",
    "label": "Shanghang0597" },

  {
    "code": "0531",
    "name": "商河",
    "pinyin": "Shanghe",
    "label": "Shanghe0531" },

  {
    "code": "0799",
    "name": "上栗",
    "pinyin": "Shangli",
    "label": "Shangli0799" },

  {
    "code": "0771",
    "name": "上林",
    "pinyin": "Shanglin",
    "label": "Shanglin0771" },

  {
    "code": "0793",
    "name": "上饶",
    "pinyin": "Shangrao",
    "label": "Shangrao0793" },

  {
    "code": "0797",
    "name": "上犹",
    "pinyin": "Shangyou",
    "label": "Shangyou0797" },

  {
    "code": "0575",
    "name": "上虞",
    "pinyin": "Shangyu",
    "label": "Shangyu0575" },

  {
    "code": "0451",
    "name": "尚志",
    "pinyin": "Shangzhi",
    "label": "Shangzhi0451" },

  {
    "code": "0599",
    "name": "邵武",
    "pinyin": "Shaowu",
    "label": "Shaowu0599" },

  {
    "code": "0575",
    "name": "绍兴",
    "pinyin": "Shaoxing",
    "label": "Shaoxing0575" },

  {
    "code": "0598",
    "name": "沙县",
    "pinyin": "Shaxian",
    "label": "Shaxian0598" },

  {
    "code": "0580",
    "name": "嵊泗",
    "pinyin": "Shengsi",
    "label": "Shengsi0580" },

  {
    "code": "0575",
    "name": "嵊州",
    "pinyin": "Shengzhou",
    "label": "Shengzhou0575" },

  {
    "code": "0635",
    "name": "莘县",
    "pinyin": "Shenxian",
    "label": "Shenxian0635" },

  {
    "code": "0311",
    "name": "深泽",
    "pinyin": "Shenze",
    "label": "Shenze0311" },

  {
    "code": "0559",
    "name": "歙县",
    "pinyin": "Shexian",
    "label": "Shexian0559" },

  {
    "code": "0515",
    "name": "射阳",
    "pinyin": "Sheyang",
    "label": "Sheyang0515" },

  {
    "code": "0797",
    "name": "石城",
    "pinyin": "Shicheng",
    "label": "Shicheng0797" },

  {
    "code": "0871",
    "name": "石林",
    "pinyin": "Shilin",
    "label": "Shilin0871" },

  {
    "code": "0595",
    "name": "石狮",
    "pinyin": "Shishi",
    "label": "Shishi0595" },

  {
    "code": "0566",
    "name": "石台",
    "pinyin": "Shitai",
    "label": "Shitai0566" },

  {
    "code": "0751",
    "name": "始兴",
    "pinyin": "Shixing",
    "label": "Shixing0751" },

  {
    "code": "023",
    "name": "石柱",
    "pinyin": "Shizhu",
    "label": "Shizhu023" },

  {
    "code": "0536",
    "name": "寿光",
    "pinyin": "Shouguang",
    "label": "Shouguang0536" },

  {
    "code": "0593",
    "name": "寿宁",
    "pinyin": "Shouning",
    "label": "Shouning0593" },

  {
    "code": "0564",
    "name": "寿县",
    "pinyin": "Shouxian",
    "label": "Shouxian0564" },

  {
    "code": "0451",
    "name": "双城",
    "pinyin": "Shuangcheng",
    "label": "Shuangcheng0451" },

  {
    "code": "028",
    "name": "双流",
    "pinyin": "Shuangliu",
    "label": "Shuangliu028" },

  {
    "code": "0564",
    "name": "舒城",
    "pinyin": "Shucheng",
    "label": "Shucheng0564" },

  {
    "code": "0423",
    "name": "舒兰",
    "pinyin": "Shulan",
    "label": "Shulan0423" },

  {
    "code": "0599",
    "name": "顺昌",
    "pinyin": "Shunchang",
    "label": "Shunchang0599" },

  {
    "code": "0527",
    "name": "沭阳",
    "pinyin": "Shuyang",
    "label": "Shuyang0527" },

  {
    "code": "0527",
    "name": "泗洪",
    "pinyin": "Sihong",
    "label": "Sihong0527" },

  {
    "code": "0758",
    "name": "四会",
    "pinyin": "Sihui",
    "label": "Sihui0758" },

  {
    "code": "0537",
    "name": "泗水",
    "pinyin": "Sishui",
    "label": "Sishui0537" },

  {
    "code": "0557",
    "name": "泗县",
    "pinyin": "Sixian",
    "label": "Sixian0557" },

  {
    "code": "0527",
    "name": "泗阳",
    "pinyin": "Siyang",
    "label": "Siyang0527" },

  {
    "code": "0871",
    "name": "嵩明",
    "pinyin": "Songming",
    "label": "Songming0871" },

  {
    "code": "0599",
    "name": "松溪",
    "pinyin": "Songxi",
    "label": "Songxi0599" },

  {
    "code": "0379",
    "name": "嵩县",
    "pinyin": "Songxian",
    "label": "Songxian0379" },

  {
    "code": "0578",
    "name": "松阳",
    "pinyin": "Songyang",
    "label": "Songyang0578" },

  {
    "code": "0578",
    "name": "遂昌",
    "pinyin": "Suichang",
    "label": "Suichang0578" },

  {
    "code": "0796",
    "name": "遂川",
    "pinyin": "Suichuan",
    "label": "Suichuan0796" },

  {
    "code": "0516",
    "name": "睢宁",
    "pinyin": "Suining",
    "label": "Suining0516" },

  {
    "code": "0561",
    "name": "濉溪",
    "pinyin": "Suixi",
    "label": "Suixi0561" },

  {
    "code": "0759",
    "name": "遂溪",
    "pinyin": "Suixi",
    "label": "Suixi0759" },

  {
    "code": "0556",
    "name": "宿松",
    "pinyin": "Susong",
    "label": "Susong0556" },

  {
    "code": "0527",
    "name": "宿豫",
    "pinyin": "Suyu",
    "label": "Suyu0527" }] },



{
  "initial": "T",
  "list": [
  {
    "code": "0901",
    "name": "塔城地",
    "pinyin": "Tachengdi",
    "label": "Tachengdi0901" },

  {
    "code": "022",
    "name": "天津",
    "pinyin": "Tianjin",
    "label": "Tianjin022" },

  {
    "code": "0576",
    "name": "台州",
    "pinyin": "Taizhou",
    "label": "Taizhou0576" },

  {
    "code": "0315",
    "name": "唐山",
    "pinyin": "Tangshan",
    "label": "Tangshan0315" },

  {
    "code": "0538",
    "name": "泰安",
    "pinyin": "Taian",
    "label": "Taian0538" },

  {
    "code": "0351",
    "name": "太原",
    "pinyin": "Taiyuan",
    "label": "Taiyuan0351" },

  {
    "code": "0523",
    "name": "泰州",
    "pinyin": "Taizhou",
    "label": "Taizhou0523" },

  {
    "code": "0938",
    "name": "天水",
    "pinyin": "Tianshui",
    "label": "Tianshui0938" },

  {
    "code": "0410",
    "name": "铁岭",
    "pinyin": "Tieling",
    "label": "Tieling0410" },

  {
    "code": "0919",
    "name": "铜川",
    "pinyin": "Tongchuan",
    "label": "Tongchuan0919" },

  {
    "code": "0435",
    "name": "通化",
    "pinyin": "Tonghua",
    "label": "Tonghua0435" },

  {
    "code": "0475",
    "name": "通辽",
    "pinyin": "Tongliao",
    "label": "Tongliao0475" },

  {
    "code": "0562",
    "name": "铜陵",
    "pinyin": "Tongling",
    "label": "Tongling0562" },

  {
    "code": "0856",
    "name": "铜仁",
    "pinyin": "Tongren",
    "label": "Tongren0856" },

  {
    "code": "0995",
    "name": "吐鲁番",
    "pinyin": "Tulufan",
    "label": "Tulufan0995" },

  {
    "code": "0512",
    "name": "太仓",
    "pinyin": "Taicang",
    "label": "Taicang0512" },

  {
    "code": "0558",
    "name": "太和",
    "pinyin": "Taihe",
    "label": "Taihe0558" },

  {
    "code": "0796",
    "name": "泰和",
    "pinyin": "Taihe",
    "label": "Taihe0796" },

  {
    "code": "0556",
    "name": "太湖",
    "pinyin": "Taihu",
    "label": "Taihu0556" },

  {
    "code": "0598",
    "name": "泰宁",
    "pinyin": "Taining",
    "label": "Taining0598" },

  {
    "code": "0750",
    "name": "台山",
    "pinyin": "Taishan",
    "label": "Taishan0750" },

  {
    "code": "0577",
    "name": "泰顺",
    "pinyin": "Taishun",
    "label": "Taishun0577" },

  {
    "code": "0523",
    "name": "泰兴",
    "pinyin": "Taixing",
    "label": "Taixing0523" },

  {
    "code": "0539",
    "name": "郯城",
    "pinyin": "Tancheng",
    "label": "Tancheng0539" },

  {
    "code": "0315",
    "name": "唐海",
    "pinyin": "Tanghai",
    "label": "Tanghai0315" },

  {
    "code": "0623",
    "name": "滕州",
    "pinyin": "Tengzhou",
    "label": "Tengzhou0623" },

  {
    "code": "0550",
    "name": "天长",
    "pinyin": "Tianchang",
    "label": "Tianchang0550" },

  {
    "code": "0576",
    "name": "天台",
    "pinyin": "Tiantai",
    "label": "Tiantai0576" },

  {
    "code": "0556",
    "name": "桐城",
    "pinyin": "Tongcheng",
    "label": "Tongcheng0556" },

  {
    "code": "0795",
    "name": "铜鼓",
    "pinyin": "Tonggu",
    "label": "Tonggu0795" },

  {
    "code": "0451",
    "name": "通河",
    "pinyin": "Tonghe",
    "label": "Tonghe0451" },

  {
    "code": "023",
    "name": "铜梁",
    "pinyin": "Tongliang",
    "label": "Tongliang023" },

  {
    "code": "0562",
    "name": "铜陵",
    "pinyin": "Tongling",
    "label": "Tongling0562" },

  {
    "code": "0571",
    "name": "桐庐",
    "pinyin": "Tonglu",
    "label": "Tonglu0571" },

  {
    "code": "023",
    "name": "潼南",
    "pinyin": "Tongnan",
    "label": "Tongnan023" },

  {
    "code": "0516",
    "name": "铜山",
    "pinyin": "Tongshan",
    "label": "Tongshan0516" },

  {
    "code": "0573",
    "name": "桐乡",
    "pinyin": "Tongxiang",
    "label": "Tongxiang0573" },

  {
    "code": "0513",
    "name": "通州",
    "pinyin": "Tongzhou",
    "label": "Tongzhou0513" }] },



{
  "initial": "W",
  "list": [
  {
    "code": "0913",
    "name": "渭南",
    "pinyin": "Weinan",
    "label": "Weinan0913" },

  {
    "code": "0536",
    "name": "潍坊",
    "pinyin": "Weifang",
    "label": "Weifang0536" },

  {
    "code": "0631",
    "name": "威海",
    "pinyin": "Weihai",
    "label": "Weihai0631" },

  {
    "code": "027",
    "name": "武汉",
    "pinyin": "Wuhan",
    "label": "Wuhan027" },

  {
    "code": "0510",
    "name": "无锡",
    "pinyin": "Wuxi",
    "label": "Wuxi0510" },

  {
    "code": "0876",
    "name": "文山",
    "pinyin": "Wenshan",
    "label": "Wenshan0876" },

  {
    "code": "0577",
    "name": "温州",
    "pinyin": "Wenzhou",
    "label": "Wenzhou0577" },

  {
    "code": "0473",
    "name": "乌海",
    "pinyin": "Wuhai",
    "label": "Wuhai0473" },

  {
    "code": "0553",
    "name": "芜湖",
    "pinyin": "Wuhu",
    "label": "Wuhu0553" },

  {
    "code": "0474",
    "name": "乌兰察布",
    "pinyin": "Wulanchabu",
    "label": "Wulanchabu0474" },

  {
    "code": "0991",
    "name": "乌鲁木齐",
    "pinyin": "Wulumuqi",
    "label": "Wulumuqi0991" },

  {
    "code": "0935",
    "name": "武威",
    "pinyin": "Wuwei",
    "label": "Wuwei0935" },

  {
    "code": "0953",
    "name": "吴忠",
    "pinyin": "Wuzhong",
    "label": "Wuzhong0953" },

  {
    "code": "0774",
    "name": "梧州",
    "pinyin": "Wuzhou",
    "label": "Wuzhou0774" },

  {
    "code": "0411",
    "name": "瓦房店",
    "pinyin": "Wafangdian",
    "label": "Wafangdian0411" },

  {
    "code": "0796",
    "name": "万安",
    "pinyin": "Wanan",
    "label": "Wanan0796" },

  {
    "code": "0731",
    "name": "望城",
    "pinyin": "Wangcheng",
    "label": "Wangcheng0731" },

  {
    "code": "0556",
    "name": "望江",
    "pinyin": "Wangjiang",
    "label": "Wangjiang0556" },

  {
    "code": "0793",
    "name": "万年",
    "pinyin": "Wannian",
    "label": "Wannian0793" },

  {
    "code": "0795",
    "name": "万载",
    "pinyin": "Wanzai",
    "label": "Wanzai0795" },

  {
    "code": "0537",
    "name": "微山",
    "pinyin": "Weishan",
    "label": "Weishan0537" },

  {
    "code": "0577",
    "name": "文成",
    "pinyin": "Wencheng",
    "label": "Wencheng0577" },

  {
    "code": "0631",
    "name": "文登",
    "pinyin": "Wendeng",
    "label": "Wendeng0631" },

  {
    "code": "0751",
    "name": "翁源",
    "pinyin": "Wengyuan",
    "label": "Wengyuan0751" },

  {
    "code": "0576",
    "name": "温岭",
    "pinyin": "Wenling",
    "label": "Wenling0576" },

  {
    "code": "0537",
    "name": "汶上",
    "pinyin": "Wenshang",
    "label": "Wenshang0537" },

  {
    "code": "0391",
    "name": "温县",
    "pinyin": "Wenxian",
    "label": "Wenxian0391" },

  {
    "code": "0558",
    "name": "涡阳",
    "pinyin": "Woyang",
    "label": "Woyang0558" },

  {
    "code": "0451",
    "name": "五常",
    "pinyin": "Wuchang",
    "label": "Wuchang0451" },

  {
    "code": "0534",
    "name": "武城",
    "pinyin": "Wucheng",
    "label": "Wucheng0534" },

  {
    "code": "0759",
    "name": "吴川",
    "pinyin": "Wuchuan",
    "label": "Wuchuan0759" },

  {
    "code": "0543",
    "name": "无棣",
    "pinyin": "Wudi",
    "label": "Wudi0543" },

  {
    "code": "0552",
    "name": "五河",
    "pinyin": "Wuhe",
    "label": "Wuhe0552" },

  {
    "code": "0553",
    "name": "芜湖",
    "pinyin": "Wuhu",
    "label": "Wuhu0553" },

  {
    "code": "0753",
    "name": "五华",
    "pinyin": "Wuhua",
    "label": "Wuhua0753" },

  {
    "code": "0311",
    "name": "无极",
    "pinyin": "Wuji",
    "label": "Wuji0311" },

  {
    "code": "0512",
    "name": "吴江",
    "pinyin": "Wujiang",
    "label": "Wujiang0512" },

  {
    "code": "0633",
    "name": "五莲",
    "pinyin": "Wulian",
    "label": "Wulian0633" },

  {
    "code": "023",
    "name": "武隆",
    "pinyin": "Wulong",
    "label": "Wulong023" },

  {
    "code": "0771",
    "name": "武鸣",
    "pinyin": "Wuming",
    "label": "Wuming0771" },

  {
    "code": "0792",
    "name": "武宁",
    "pinyin": "Wuning",
    "label": "Wuning0792" },

  {
    "code": "0597",
    "name": "武平",
    "pinyin": "Wuping",
    "label": "Wuping0597" },

  {
    "code": "023",
    "name": "巫山",
    "pinyin": "Wushan",
    "label": "Wushan023" },

  {
    "code": "0565",
    "name": "无为",
    "pinyin": "Wuwei",
    "label": "Wuwei0565" },

  {
    "code": "023",
    "name": "巫溪",
    "pinyin": "Wuxi",
    "label": "Wuxi023" },

  {
    "code": "0579",
    "name": "武义",
    "pinyin": "Wuyi",
    "label": "Wuyi0579" },

  {
    "code": "0599",
    "name": "武夷山",
    "pinyin": "Wuyishan",
    "label": "Wuyishan0599" },

  {
    "code": "0793",
    "name": "婺源",
    "pinyin": "Wuyuan",
    "label": "Wuyuan0793" },

  {
    "code": "0391",
    "name": "武陟",
    "pinyin": "Wuzhi",
    "label": "Wuzhi0391" }] },



{
  "initial": "X",
  "list": [
  {
    "code": "0710",
    "name": "襄樊",
    "pinyin": "Xiangfan",
    "label": "Xiangfan0710" },

  {
    "code": "0592",
    "name": "厦门",
    "pinyin": "Xiamen",
    "label": "Xiamen0592" },

  {
    "code": "029",
    "name": "西安",
    "pinyin": "Xian",
    "label": "Xian029" },

  {
    "code": "0374",
    "name": "许昌",
    "pinyin": "Xuchang",
    "label": "Xuchang0374" },

  {
    "code": "0516",
    "name": "徐州",
    "pinyin": "Xuzhou",
    "label": "Xuzhou0516" },

  {
    "code": "0732",
    "name": "湘潭",
    "pinyin": "Xiangtan",
    "label": "Xiangtan0732" },

  {
    "code": "0743",
    "name": "湘西",
    "pinyin": "Xiangxi",
    "label": "Xiangxi0743" },

  {
    "code": "0715",
    "name": "咸宁",
    "pinyin": "Xianning",
    "label": "Xianning0715" },

  {
    "code": "029",
    "name": "咸阳",
    "pinyin": "Xianyang",
    "label": "Xianyang029" },

  {
    "code": "0712",
    "name": "孝感",
    "pinyin": "Xiaogan",
    "label": "Xiaogan0712" },

  {
    "code": "0479",
    "name": "锡林郭勒盟",
    "pinyin": "Xilinguolemeng",
    "label": "Xilinguolemeng0479" },

  {
    "code": "0482",
    "name": "兴安盟",
    "pinyin": "Xinganmeng",
    "label": "Xinganmeng0482" },

  {
    "code": "0319",
    "name": "邢台",
    "pinyin": "Xingtai",
    "label": "Xingtai0319" },

  {
    "code": "0971",
    "name": "西宁",
    "pinyin": "Xining",
    "label": "Xining0971" },

  {
    "code": "0373",
    "name": "新乡",
    "pinyin": "Xinxiang",
    "label": "Xinxiang0373" },

  {
    "code": "0376",
    "name": "信阳",
    "pinyin": "Xinyang",
    "label": "Xinyang0376" },

  {
    "code": "0790",
    "name": "新余",
    "pinyin": "Xinyu",
    "label": "Xinyu0790" },

  {
    "code": "0350",
    "name": "忻州",
    "pinyin": "Xinzhou",
    "label": "Xinzhou0350" },

  {
    "code": "0691",
    "name": "西双版纳",
    "pinyin": "Xishuangbanna",
    "label": "Xishuangbanna0691" },

  {
    "code": "0563",
    "name": "宣城",
    "pinyin": "Xuancheng",
    "label": "Xuancheng0563" },

  {
    "code": "0796",
    "name": "峡江",
    "pinyin": "Xiajiang",
    "label": "Xiajiang0796" },

  {
    "code": "0534",
    "name": "夏津",
    "pinyin": "Xiajin",
    "label": "Xiajin0534" },

  {
    "code": "0574",
    "name": "象山",
    "pinyin": "Xiangshan",
    "label": "Xiangshan0574" },

  {
    "code": "0515",
    "name": "响水",
    "pinyin": "Xiangshui",
    "label": "Xiangshui0515" },

  {
    "code": "0576",
    "name": "仙居",
    "pinyin": "Xianju",
    "label": "Xianju0576" },

  {
    "code": "0594",
    "name": "仙游",
    "pinyin": "Xianyou",
    "label": "Xianyou0594" },

  {
    "code": "0557",
    "name": "萧县",
    "pinyin": "Xiaoxian",
    "label": "Xiaoxian0557" },

  {
    "code": "0593",
    "name": "霞浦",
    "pinyin": "Xiapu",
    "label": "Xiapu0593" },

  {
    "code": "0851",
    "name": "息烽",
    "pinyin": "Xifeng",
    "label": "Xifeng0851" },

  {
    "code": "0379",
    "name": "新安",
    "pinyin": "Xinan",
    "label": "Xinan0379" },

  {
    "code": "0575",
    "name": "新昌",
    "pinyin": "Xinchang",
    "label": "Xinchang0575" },

  {
    "code": "0797",
    "name": "信丰",
    "pinyin": "Xinfeng",
    "label": "Xinfeng0797" },

  {
    "code": "0751",
    "name": "新丰",
    "pinyin": "Xinfeng",
    "label": "Xinfeng0751" },

  {
    "code": "0796",
    "name": "新干",
    "pinyin": "Xingan",
    "label": "Xingan0796" },

  {
    "code": "0797",
    "name": "兴国",
    "pinyin": "Xingguo",
    "label": "Xingguo0797" },

  {
    "code": "0523",
    "name": "兴化",
    "pinyin": "Xinghua",
    "label": "Xinghua0523" },

  {
    "code": "0753",
    "name": "兴宁",
    "pinyin": "Xingning",
    "label": "Xingning0753" },

  {
    "code": "0311",
    "name": "行唐",
    "pinyin": "Xingtang",
    "label": "Xingtang0311" },

  {
    "code": "0371",
    "name": "荥阳",
    "pinyin": "Xingyang",
    "label": "Xingyang0371" },

  {
    "code": "0792",
    "name": "星子",
    "pinyin": "Xingzi",
    "label": "Xingzi0792" },

  {
    "code": "0311",
    "name": "辛集",
    "pinyin": "Xinji",
    "label": "Xinji0311" },

  {
    "code": "0791",
    "name": "新建",
    "pinyin": "Xinjian",
    "label": "Xinjian0791" },

  {
    "code": "028",
    "name": "新津",
    "pinyin": "Xinjin",
    "label": "Xinjin028" },

  {
    "code": "0311",
    "name": "新乐",
    "pinyin": "Xinle",
    "label": "Xinle0311" },

  {
    "code": "024",
    "name": "新民",
    "pinyin": "Xinmin",
    "label": "Xinmin024" },

  {
    "code": "0371",
    "name": "新密",
    "pinyin": "Xinmi",
    "label": "Xinmi0371" },

  {
    "code": "0538",
    "name": "新泰",
    "pinyin": "Xintai",
    "label": "Xintai0538" },

  {
    "code": "0766",
    "name": "新兴",
    "pinyin": "Xinxing",
    "label": "Xinxing0766" },

  {
    "code": "0516",
    "name": "新沂",
    "pinyin": "Xinyi",
    "label": "Xinyi0516" },

  {
    "code": "0668",
    "name": "信宜",
    "pinyin": "Xinyi",
    "label": "Xinyi0668" },

  {
    "code": "0371",
    "name": "新郑",
    "pinyin": "Xinzheng",
    "label": "Xinzheng0371" },

  {
    "code": "0559",
    "name": "休宁",
    "pinyin": "Xiuning",
    "label": "Xiuning0559" },

  {
    "code": "023",
    "name": "秀山",
    "pinyin": "Xiushan",
    "label": "Xiushan023" },

  {
    "code": "0792",
    "name": "修水",
    "pinyin": "Xiushui",
    "label": "Xiushui0792" },

  {
    "code": "0851",
    "name": "修文",
    "pinyin": "Xiuwen",
    "label": "Xiuwen0851" },

  {
    "code": "0391",
    "name": "修武",
    "pinyin": "Xiuwu",
    "label": "Xiuwu0391" },

  {
    "code": "0871",
    "name": "寻甸",
    "pinyin": "Xundian",
    "label": "Xundian0871" },

  {
    "code": "0797",
    "name": "寻乌",
    "pinyin": "Xunwu",
    "label": "Xunwu0797" },

  {
    "code": "0759",
    "name": "徐闻",
    "pinyin": "Xuwen",
    "label": "Xuwen0759" },

  {
    "code": "0517",
    "name": "盱眙",
    "pinyin": "Xuyi",
    "label": "Xuyi0517" }] },



{
  "initial": "Y",
  "list": [
  {
    "code": "0835",
    "name": "雅安",
    "pinyin": "Yaan",
    "label": "Yaan0835" },

  {
    "code": "0514",
    "name": "扬州",
    "pinyin": "Yangzhou",
    "label": "Yangzhou0514" },

  {
    "code": "0535",
    "name": "烟台",
    "pinyin": "Yantai",
    "label": "Yantai0535" },

  {
    "code": "0911",
    "name": "延安",
    "pinyin": "Yanan",
    "label": "Yanan0911" },

  {
    "code": "0433",
    "name": "延边",
    "pinyin": "Yanbian",
    "label": "Yanbian0433" },

  {
    "code": "0515",
    "name": "盐城",
    "pinyin": "Yancheng",
    "label": "Yancheng0515" },

  {
    "code": "0662",
    "name": "阳江",
    "pinyin": "Yangjiang",
    "label": "Yangjiang0662" },

  {
    "code": "0353",
    "name": "阳泉",
    "pinyin": "Yangquan",
    "label": "Yangquan0353" },

  {
    "code": "0831",
    "name": "宜宾",
    "pinyin": "Yibin",
    "label": "Yibin0831" },

  {
    "code": "0717",
    "name": "宜昌",
    "pinyin": "Yichang",
    "label": "Yichang0717" },

  {
    "code": "0458",
    "name": "伊春",
    "pinyin": "Yichun",
    "label": "Yichun0458" },

  {
    "code": "0795",
    "name": "宜春",
    "pinyin": "Yichun",
    "label": "Yichun0795" },

  {
    "code": "0999",
    "name": "伊犁哈萨克",
    "pinyin": "Yilihasake",
    "label": "Yilihasake0999" },

  {
    "code": "0951",
    "name": "银川",
    "pinyin": "Yinchuan",
    "label": "Yinchuan0951" },

  {
    "code": "0417",
    "name": "营口",
    "pinyin": "Yingkou",
    "label": "Yingkou0417" },

  {
    "code": "0701",
    "name": "鹰潭",
    "pinyin": "Yingtan",
    "label": "Yingtan0701" },

  {
    "code": "0737",
    "name": "益阳",
    "pinyin": "Yiyang",
    "label": "Yiyang0737" },

  {
    "code": "0746",
    "name": "永州",
    "pinyin": "Yongzhou",
    "label": "Yongzhou0746" },

  {
    "code": "0730",
    "name": "岳阳",
    "pinyin": "Yueyang",
    "label": "Yueyang0730" },

  {
    "code": "0775",
    "name": "玉林",
    "pinyin": "Yulin",
    "label": "Yulin0775" },

  {
    "code": "0912",
    "name": "榆林",
    "pinyin": "Yulin",
    "label": "Yulin0912" },

  {
    "code": "0359",
    "name": "运城",
    "pinyin": "Yuncheng",
    "label": "Yuncheng0359" },

  {
    "code": "0766",
    "name": "云浮",
    "pinyin": "Yunfu",
    "label": "Yunfu0766" },

  {
    "code": "0976",
    "name": "玉树",
    "pinyin": "Yushu",
    "label": "Yushu0976" },

  {
    "code": "0877",
    "name": "玉溪",
    "pinyin": "Yuxi",
    "label": "Yuxi0877" },

  {
    "code": "0662",
    "name": "阳春",
    "pinyin": "Yangchun",
    "label": "Yangchun0662" },

  {
    "code": "0662",
    "name": "阳东",
    "pinyin": "Yangdong",
    "label": "Yangdong0662" },

  {
    "code": "0635",
    "name": "阳谷",
    "pinyin": "Yanggu",
    "label": "Yanggu0635" },

  {
    "code": "0763",
    "name": "阳山",
    "pinyin": "Yangshan",
    "label": "Yangshan0763" },

  {
    "code": "0543",
    "name": "阳信",
    "pinyin": "Yangxin",
    "label": "Yangxin0543" },

  {
    "code": "0662",
    "name": "阳西",
    "pinyin": "Yangxi",
    "label": "Yangxi0662" },

  {
    "code": "0511",
    "name": "扬中",
    "pinyin": "Yangzhong",
    "label": "Yangzhong0511" },

  {
    "code": "0379",
    "name": "偃师",
    "pinyin": "Yanshi",
    "label": "Yanshi0379" },

  {
    "code": "0451",
    "name": "延寿",
    "pinyin": "Yanshou",
    "label": "Yanshou0451" },

  {
    "code": "0537",
    "name": "兖州",
    "pinyin": "Yanzhou",
    "label": "Yanzhou0537" },

  {
    "code": "0379",
    "name": "伊川",
    "pinyin": "Yichuan",
    "label": "Yichuan0379" },

  {
    "code": "0795",
    "name": "宜丰",
    "pinyin": "Yifeng",
    "label": "Yifeng0795" },

  {
    "code": "0794",
    "name": "宜黄",
    "pinyin": "Yihuang",
    "label": "Yihuang0794" },

  {
    "code": "0451",
    "name": "依兰",
    "pinyin": "Yilan",
    "label": "Yilan0451" },

  {
    "code": "0871",
    "name": "宜良",
    "pinyin": "Yiliang",
    "label": "Yiliang0871" },

  {
    "code": "0539",
    "name": "沂南",
    "pinyin": "Yinan",
    "label": "Yinan0539" },

  {
    "code": "0763",
    "name": "英德",
    "pinyin": "Yingde",
    "label": "Yingde0763" },

  {
    "code": "0558",
    "name": "颍上",
    "pinyin": "Yingshang",
    "label": "Yingshang0558" },

  {
    "code": "0539",
    "name": "沂水",
    "pinyin": "Yishui",
    "label": "Yishui0539" },

  {
    "code": "0579",
    "name": "义乌",
    "pinyin": "Yiwu",
    "label": "Yiwu0579" },

  {
    "code": "0559",
    "name": "黟县",
    "pinyin": "Yixian",
    "label": "Yixian0559" },

  {
    "code": "0510",
    "name": "宜兴",
    "pinyin": "Yixing",
    "label": "Yixing0510" },

  {
    "code": "0793",
    "name": "弋阳",
    "pinyin": "Yiyang",
    "label": "Yiyang0793" },

  {
    "code": "0379",
    "name": "宜阳",
    "pinyin": "Yiyang",
    "label": "Yiyang0379" },

  {
    "code": "0533",
    "name": "沂源",
    "pinyin": "Yiyuan",
    "label": "Yiyuan0533" },

  {
    "code": "0514",
    "name": "仪征",
    "pinyin": "Yizheng",
    "label": "Yizheng0514" },

  {
    "code": "0598",
    "name": "永安",
    "pinyin": "Yongan",
    "label": "Yongan0598" },

  {
    "code": "023",
    "name": "永川",
    "pinyin": "Yongchuan",
    "label": "Yongchuan023" },

  {
    "code": "0595",
    "name": "永春",
    "pinyin": "Yongchun",
    "label": "Yongchun0595" },

  {
    "code": "0931",
    "name": "永登",
    "pinyin": "Yongdeng",
    "label": "Yongdeng0931" },

  {
    "code": "0597",
    "name": "永定",
    "pinyin": "Yongding",
    "label": "Yongding0597" },

  {
    "code": "0796",
    "name": "永丰",
    "pinyin": "Yongfeng",
    "label": "Yongfeng0796" },

  {
    "code": "0423",
    "name": "永吉",
    "pinyin": "Yongji",
    "label": "Yongji0423" },

  {
    "code": "0577",
    "name": "永嘉",
    "pinyin": "Yongjia",
    "label": "Yongjia0577" },

  {
    "code": "0579",
    "name": "永康",
    "pinyin": "Yongkang",
    "label": "Yongkang0579" },

  {
    "code": "0771",
    "name": "邕宁",
    "pinyin": "Yongning",
    "label": "Yongning0771" },

  {
    "code": "0591",
    "name": "永泰",
    "pinyin": "Yongtai",
    "label": "Yongtai0591" },

  {
    "code": "0796",
    "name": "永新",
    "pinyin": "Yongxin",
    "label": "Yongxin0796" },

  {
    "code": "0792",
    "name": "永修",
    "pinyin": "Yongxiu",
    "label": "Yongxiu0792" },

  {
    "code": "0598",
    "name": "尤溪",
    "pinyin": "Youxi",
    "label": "Youxi0598" },

  {
    "code": "023",
    "name": "酉阳",
    "pinyin": "Youyang",
    "label": "Youyang023" },

  {
    "code": "0311",
    "name": "元氏",
    "pinyin": "Yuanshi",
    "label": "Yuanshi0311" },

  {
    "code": "0534",
    "name": "禹城",
    "pinyin": "Yucheng",
    "label": "Yucheng0534" },

  {
    "code": "0797",
    "name": "于都",
    "pinyin": "Yudu",
    "label": "Yudu0797" },

  {
    "code": "0556",
    "name": "岳西",
    "pinyin": "Yuexi",
    "label": "Yuexi0556" },

  {
    "code": "0793",
    "name": "余干",
    "pinyin": "Yugan",
    "label": "Yugan0793" },

  {
    "code": "0576",
    "name": "玉环",
    "pinyin": "Yuhuan",
    "label": "Yuhuan0576" },

  {
    "code": "0701",
    "name": "余江",
    "pinyin": "Yujiang",
    "label": "Yujiang0701" },

  {
    "code": "0766",
    "name": "郁南",
    "pinyin": "Yunan",
    "label": "Yunan0766" },

  {
    "code": "0766",
    "name": "云安",
    "pinyin": "Yunan",
    "label": "Yunan0766" },

  {
    "code": "0530",
    "name": "郓城",
    "pinyin": "Yuncheng",
    "label": "Yuncheng0530" },

  {
    "code": "0578",
    "name": "云和",
    "pinyin": "Yunhe",
    "label": "Yunhe0578" },

  {
    "code": "0596",
    "name": "云霄",
    "pinyin": "Yunxiao",
    "label": "Yunxiao0596" },

  {
    "code": "023",
    "name": "云阳",
    "pinyin": "Yunyang",
    "label": "Yunyang023" },

  {
    "code": "0793",
    "name": "玉山",
    "pinyin": "Yushan",
    "label": "Yushan0793" },

  {
    "code": "0431",
    "name": "榆树",
    "pinyin": "Yushu",
    "label": "Yushu0431" },

  {
    "code": "0537",
    "name": "鱼台",
    "pinyin": "Yutai",
    "label": "Yutai0537" },

  {
    "code": "0315",
    "name": "玉田",
    "pinyin": "Yutian",
    "label": "Yutian0315" },

  {
    "code": "0574",
    "name": "余姚",
    "pinyin": "Yuyao",
    "label": "Yuyao0574" },

  {
    "code": "0931",
    "name": "榆中",
    "pinyin": "Yuzhong",
    "label": "Yuzhong0931" }] },



{
  "initial": "Z",
  "list": [
  {
    "code": "0596",
    "name": "漳州",
    "pinyin": "Zhangzhou",
    "label": "Zhangzhou0596" },

  {
    "code": "0371",
    "name": "郑州",
    "pinyin": "Zhengzhou",
    "label": "Zhengzhou0371" },

  {
    "code": "0760",
    "name": "中山",
    "pinyin": "Zhongshan",
    "label": "Zhongshan0760" },

  {
    "code": "0756",
    "name": "珠海",
    "pinyin": "Zhuhai",
    "label": "Zhuhai0756" },

  {
    "code": "0623",
    "name": "枣庄",
    "pinyin": "Zaozhuang",
    "label": "Zaozhuang0623" },

  {
    "code": "0744",
    "name": "张家界",
    "pinyin": "Zhangjiajie",
    "label": "Zhangjiajie0744" },

  {
    "code": "0313",
    "name": "张家口",
    "pinyin": "Zhangjiakou",
    "label": "Zhangjiakou0313" },

  {
    "code": "0936",
    "name": "张掖",
    "pinyin": "Zhangye",
    "label": "Zhangye0936" },

  {
    "code": "0759",
    "name": "湛江",
    "pinyin": "Zhanjiang",
    "label": "Zhanjiang0759" },

  {
    "code": "0758",
    "name": "肇庆",
    "pinyin": "Zhaoqing",
    "label": "Zhaoqing0758" },

  {
    "code": "0870",
    "name": "昭通",
    "pinyin": "Zhaotong",
    "label": "Zhaotong0870" },

  {
    "code": "0511",
    "name": "镇江",
    "pinyin": "Zhenjiang",
    "label": "Zhenjiang0511" },

  {
    "code": "0955",
    "name": "中卫",
    "pinyin": "Zhongwei",
    "label": "Zhongwei0955" },

  {
    "code": "0394",
    "name": "周口",
    "pinyin": "Zhoukou",
    "label": "Zhoukou0394" },

  {
    "code": "0580",
    "name": "舟山",
    "pinyin": "Zhoushan",
    "label": "Zhoushan0580" },

  {
    "code": "0396",
    "name": "驻马店",
    "pinyin": "Zhumadian",
    "label": "Zhumadian0396" },

  {
    "code": "0731",
    "name": "株洲",
    "pinyin": "Zhuzhou",
    "label": "Zhuzhou0731" },

  {
    "code": "0533",
    "name": "淄博",
    "pinyin": "Zibo",
    "label": "Zibo0533" },

  {
    "code": "0813",
    "name": "自贡",
    "pinyin": "Zigong",
    "label": "Zigong0813" },

  {
    "code": "028",
    "name": "资阳",
    "pinyin": "Ziyang",
    "label": "Ziyang028" },

  {
    "code": "0852",
    "name": "遵义",
    "pinyin": "Zunyi",
    "label": "Zunyi0852" },

  {
    "code": "0311",
    "name": "赞皇",
    "pinyin": "Zanhuang",
    "label": "Zanhuang0311" },

  {
    "code": "020",
    "name": "增城",
    "pinyin": "Zengcheng",
    "label": "Zengcheng020" },

  {
    "code": "0512",
    "name": "张家港",
    "pinyin": "Zhangjiagang",
    "label": "Zhangjiagang0512" },

  {
    "code": "0597",
    "name": "漳平",
    "pinyin": "Zhangping",
    "label": "Zhangping0597" },

  {
    "code": "0596",
    "name": "漳浦",
    "pinyin": "Zhangpu",
    "label": "Zhangpu0596" },

  {
    "code": "0531",
    "name": "章丘",
    "pinyin": "Zhangqiu",
    "label": "Zhangqiu0531" },

  {
    "code": "0795",
    "name": "樟树",
    "pinyin": "Zhangshu",
    "label": "Zhangshu0795" },

  {
    "code": "0543",
    "name": "沾化",
    "pinyin": "Zhanhua",
    "label": "Zhanhua0543" },

  {
    "code": "0311",
    "name": "赵县",
    "pinyin": "Zhaoxian",
    "label": "Zhaoxian0311" },

  {
    "code": "0535",
    "name": "招远",
    "pinyin": "Zhaoyuan",
    "label": "Zhaoyuan0535" },

  {
    "code": "0311",
    "name": "正定",
    "pinyin": "Zhengding",
    "label": "Zhengding0311" },

  {
    "code": "0599",
    "name": "政和",
    "pinyin": "Zhenghe",
    "label": "Zhenghe0599" },

  {
    "code": "0593",
    "name": "柘荣",
    "pinyin": "Zherong",
    "label": "Zherong0593" },

  {
    "code": "0371",
    "name": "中牟",
    "pinyin": "Zhongmou",
    "label": "Zhongmou0371" },

  {
    "code": "023",
    "name": "忠县",
    "pinyin": "Zhongxian",
    "label": "Zhongxian023" },

  {
    "code": "0593",
    "name": "周宁",
    "pinyin": "Zhouning",
    "label": "Zhouning0593" },

  {
    "code": "029",
    "name": "周至",
    "pinyin": "Zhouzhi",
    "label": "Zhouzhi029" },

  {
    "code": "0411",
    "name": "庄河",
    "pinyin": "Zhuanghe",
    "label": "Zhuanghe0411" },

  {
    "code": "0536",
    "name": "诸城",
    "pinyin": "Zhucheng",
    "label": "Zhucheng0536" },

  {
    "code": "0575",
    "name": "诸暨",
    "pinyin": "Zhuji",
    "label": "Zhuji0575" },

  {
    "code": "0762",
    "name": "紫金",
    "pinyin": "Zijin",
    "label": "Zijin0762" },

  {
    "code": "0794",
    "name": "资溪",
    "pinyin": "Zixi",
    "label": "Zixi0794" },

  {
    "code": "0537",
    "name": "邹城",
    "pinyin": "Zoucheng",
    "label": "Zoucheng0537" },

  {
    "code": "0543",
    "name": "邹平",
    "pinyin": "Zouping",
    "label": "Zouping0543" },

  {
    "code": "0315",
    "name": "遵化",
    "pinyin": "Zunhua",
    "label": "Zunhua0315" }] }];exports.default = _default;

/***/ }),

/***/ 25:
/*!*****************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/icons/arrow-top.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAYAAADTcMcaAAAAcklEQVQYlY3OIQ7CUBAE0LcUwwE4Bp6TVCPwJSGpqaAC2QQE5iOQvU0PgeYSmIqK37TjNpuXmUgpmckev9xjMwNO+KJciyp8sEOP8xK64YkY7wJvXHMo8ECbaQ50uE9RMc655PZP0uCF2KLGAcMCgiOqP0AcDwtzDaD5AAAAAElFTkSuQmCC"

/***/ }),

/***/ 26:
/*!************************************************!*\
  !*** E:/wu3.23/杜高/dugao/static/home/list1.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/home/list1.png";

/***/ }),

/***/ 273:
/*!**********************************************!*\
  !*** E:/wu3.23/杜高/dugao/common/city.data.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{ "value": 110000, "label": "北京市", "children": [{ "value": 110101, "label": "东城区" }, { "value": 110102, "label": "西城区" }, { "value": 110105, "label": "朝阳区" }, { "value": 110106, "label": "丰台区" }, { "value": 110107, "label": "石景山区" }, { "value": 110108, "label": "海淀区" }, { "value": 110109, "label": "门头沟区" }, { "value": 110111, "label": "房山区" }, { "value": 110112, "label": "通州区" }, { "value": 110113, "label": "顺义区" }, { "value": 110114, "label": "昌平区" }, { "value": 110115, "label": "大兴区" }, { "value": 110116, "label": "怀柔区" }, { "value": 110117, "label": "平谷区" }, { "value": 110118, "label": "密云区" }, { "value": 110119, "label": "延庆区" }] }, { "value": 120000, "label": "天津市", "children": [{ "value": 120101, "label": "和平区" }, { "value": 120102, "label": "河东区" }, { "value": 120103, "label": "河西区" }, { "value": 120104, "label": "南开区" }, { "value": 120105, "label": "河北区" }, { "value": 120106, "label": "红桥区" }, { "value": 120110, "label": "东丽区" }, { "value": 120111, "label": "西青区" }, { "value": 120112, "label": "津南区" }, { "value": 120113, "label": "北辰区" }, { "value": 120114, "label": "武清区" }, { "value": 120115, "label": "宝坻区" }, { "value": 120116, "label": "滨海新区" }, { "value": 120117, "label": "宁河区" }, { "value": 120118, "label": "静海区" }, { "value": 120119, "label": "蓟州区" }] }, { "value": 130000, "label": "河北省", "children": [{ "value": 130100, "label": "石家庄市" }, { "value": 130200, "label": "唐山市" }, { "value": 130300, "label": "秦皇岛市" }, { "value": 130400, "label": "邯郸市" }, { "value": 130500, "label": "邢台市" }, { "value": 130600, "label": "保定市" }, { "value": 130700, "label": "张家口市" }, { "value": 130800, "label": "承德市" }, { "value": 130900, "label": "沧州市" }, { "value": 131000, "label": "廊坊市" }, { "value": 131100, "label": "衡水市" }, { "value": 139000, "label": "省直辖县级行政区划" }] }, { "value": 140000, "label": "山西省", "children": [{ "value": 140100, "label": "太原市" }, { "value": 140200, "label": "大同市" }, { "value": 140300, "label": "阳泉市" }, { "value": 140400, "label": "长治市" }, { "value": 140500, "label": "晋城市" }, { "value": 140600, "label": "朔州市" }, { "value": 140700, "label": "晋中市" }, { "value": 140800, "label": "运城市" }, { "value": 140900, "label": "忻州市" }, { "value": 141000, "label": "临汾市" }, { "value": 141100, "label": "吕梁市" }] }, { "value": 150000, "label": "内蒙古自治区", "children": [{ "value": 150100, "label": "呼和浩特市" }, { "value": 150200, "label": "包头市" }, { "value": 150300, "label": "乌海市" }, { "value": 150400, "label": "赤峰市" }, { "value": 150500, "label": "通辽市" }, { "value": 150600, "label": "鄂尔多斯市" }, { "value": 150700, "label": "呼伦贝尔市" }, { "value": 150800, "label": "巴彦淖尔市" }, { "value": 150900, "label": "乌兰察布市" }, { "value": 152200, "label": "兴安盟" }, { "value": 152500, "label": "锡林郭勒盟" }, { "value": 152900, "label": "阿拉善盟" }] }, { "value": 210000, "label": "辽宁省", "children": [{ "value": 210100, "label": "沈阳市" }, { "value": 210200, "label": "大连市" }, { "value": 210300, "label": "鞍山市" }, { "value": 210400, "label": "抚顺市" }, { "value": 210500, "label": "本溪市" }, { "value": 210600, "label": "丹东市" }, { "value": 210700, "label": "锦州市" }, { "value": 210800, "label": "营口市" }, { "value": 210900, "label": "阜新市" }, { "value": 211000, "label": "辽阳市" }, { "value": 211100, "label": "盘锦市" }, { "value": 211200, "label": "铁岭市" }, { "value": 211300, "label": "朝阳市" }, { "value": 211400, "label": "葫芦岛市" }] }, { "value": 220000, "label": "吉林省", "children": [{ "value": 220100, "label": "长春市" }, { "value": 220200, "label": "吉林市" }, { "value": 220300, "label": "四平市" }, { "value": 220400, "label": "辽源市" }, { "value": 220500, "label": "通化市" }, { "value": 220600, "label": "白山市" }, { "value": 220700, "label": "松原市" }, { "value": 220800, "label": "白城市" }, { "value": 222400, "label": "延边朝鲜族自治州" }] }, { "value": 230000, "label": "黑龙江省", "children": [{ "value": 230100, "label": "哈尔滨市" }, { "value": 230200, "label": "齐齐哈尔市" }, { "value": 230300, "label": "鸡西市" }, { "value": 230400, "label": "鹤岗市" }, { "value": 230500, "label": "双鸭山市" }, { "value": 230600, "label": "大庆市" }, { "value": 230700, "label": "伊春市" }, { "value": 230800, "label": "佳木斯市" }, { "value": 230900, "label": "七台河市" }, { "value": 231000, "label": "牡丹江市" }, { "value": 231100, "label": "黑河市" }, { "value": 231200, "label": "绥化市" }, { "value": 232700, "label": "大兴安岭地区" }] }, { "value": 310000, "label": "上海市", "children": [{ "value": 310101, "label": "黄浦区" }, { "value": 310104, "label": "徐汇区" }, { "value": 310105, "label": "长宁区" }, { "value": 310106, "label": "静安区" }, { "value": 310107, "label": "普陀区" }, { "value": 310109, "label": "虹口区" }, { "value": 310110, "label": "杨浦区" }, { "value": 310112, "label": "闵行区" }, { "value": 310113, "label": "宝山区" }, { "value": 310114, "label": "嘉定区" }, { "value": 310115, "label": "浦东新区" }, { "value": 310116, "label": "金山区" }, { "value": 310117, "label": "松江区" }, { "value": 310118, "label": "青浦区" }, { "value": 310120, "label": "奉贤区" }, { "value": 310151, "label": "崇明区" }] }, { "value": 320000, "label": "江苏省", "children": [{ "value": 320100, "label": "南京市" }, { "value": 320200, "label": "无锡市" }, { "value": 320300, "label": "徐州市" }, { "value": 320400, "label": "常州市" }, { "value": 320500, "label": "苏州市" }, { "value": 320600, "label": "南通市" }, { "value": 320700, "label": "连云港市" }, { "value": 320800, "label": "淮安市" }, { "value": 320900, "label": "盐城市" }, { "value": 321000, "label": "扬州市" }, { "value": 321100, "label": "镇江市" }, { "value": 321200, "label": "泰州市" }, { "value": 321300, "label": "宿迁市" }] }, { "value": 330000, "label": "浙江省", "children": [{ "value": 330100, "label": "杭州市" }, { "value": 330200, "label": "宁波市" }, { "value": 330300, "label": "温州市" }, { "value": 330400, "label": "嘉兴市" }, { "value": 330500, "label": "湖州市" }, { "value": 330600, "label": "绍兴市" }, { "value": 330700, "label": "金华市" }, { "value": 330800, "label": "衢州市" }, { "value": 330900, "label": "舟山市" }, { "value": 331000, "label": "台州市" }, { "value": 331100, "label": "丽水市" }] }, { "value": 340000, "label": "安徽省", "children": [{ "value": 340100, "label": "合肥市" }, { "value": 340200, "label": "芜湖市" }, { "value": 340300, "label": "蚌埠市" }, { "value": 340400, "label": "淮南市" }, { "value": 340500, "label": "马鞍山市" }, { "value": 340600, "label": "淮北市" }, { "value": 340700, "label": "铜陵市" }, { "value": 340800, "label": "安庆市" }, { "value": 341000, "label": "黄山市" }, { "value": 341100, "label": "滁州市" }, { "value": 341200, "label": "阜阳市" }, { "value": 341300, "label": "宿州市" }, { "value": 341500, "label": "六安市" }, { "value": 341600, "label": "亳州市" }, { "value": 341700, "label": "池州市" }, { "value": 341800, "label": "宣城市" }] }, { "value": 350000, "label": "福建省", "children": [{ "value": 350100, "label": "福州市" }, { "value": 350200, "label": "厦门市" }, { "value": 350300, "label": "莆田市" }, { "value": 350400, "label": "三明市" }, { "value": 350500, "label": "泉州市" }, { "value": 350600, "label": "漳州市" }, { "value": 350700, "label": "南平市" }, { "value": 350800, "label": "龙岩市" }, { "value": 350900, "label": "宁德市" }] }, { "value": 360000, "label": "江西省", "children": [{ "value": 360100, "label": "南昌市" }, { "value": 360200, "label": "景德镇市" }, { "value": 360300, "label": "萍乡市" }, { "value": 360400, "label": "九江市" }, { "value": 360500, "label": "新余市" }, { "value": 360600, "label": "鹰潭市" }, { "value": 360700, "label": "赣州市" }, { "value": 360800, "label": "吉安市" }, { "value": 360900, "label": "宜春市" }, { "value": 361000, "label": "抚州市" }, { "value": 361100, "label": "上饶市" }] }, { "value": 370000, "label": "山东省", "children": [{ "value": 370100, "label": "济南市" }, { "value": 370200, "label": "青岛市" }, { "value": 370300, "label": "淄博市" }, { "value": 370400, "label": "枣庄市" }, { "value": 370500, "label": "东营市" }, { "value": 370600, "label": "烟台市" }, { "value": 370700, "label": "潍坊市" }, { "value": 370800, "label": "济宁市" }, { "value": 370900, "label": "泰安市" }, { "value": 371000, "label": "威海市" }, { "value": 371100, "label": "日照市" }, { "value": 371200, "label": "莱芜市" }, { "value": 371300, "label": "临沂市" }, { "value": 371400, "label": "德州市" }, { "value": 371500, "label": "聊城市" }, { "value": 371600, "label": "滨州市" }, { "value": 371700, "label": "菏泽市" }] }, { "value": 410000, "label": "河南省", "children": [{ "value": 410100, "label": "郑州市" }, { "value": 410200, "label": "开封市" }, { "value": 410300, "label": "洛阳市" }, { "value": 410400, "label": "平顶山市" }, { "value": 410500, "label": "安阳市" }, { "value": 410600, "label": "鹤壁市" }, { "value": 410700, "label": "新乡市" }, { "value": 410800, "label": "焦作市" }, { "value": 410900, "label": "濮阳市" }, { "value": 411000, "label": "许昌市" }, { "value": 411100, "label": "漯河市" }, { "value": 411200, "label": "三门峡市" }, { "value": 411300, "label": "南阳市" }, { "value": 411400, "label": "商丘市" }, { "value": 411500, "label": "信阳市" }, { "value": 411600, "label": "周口市" }, { "value": 411700, "label": "驻马店市" }, { "value": 419000, "label": "省直辖县级行政区划" }] }, { "value": 420000, "label": "湖北省", "children": [{ "value": 420100, "label": "武汉市" }, { "value": 420200, "label": "黄石市" }, { "value": 420300, "label": "十堰市" }, { "value": 420500, "label": "宜昌市" }, { "value": 420600, "label": "襄阳市" }, { "value": 420700, "label": "鄂州市" }, { "value": 420800, "label": "荆门市" }, { "value": 420900, "label": "孝感市" }, { "value": 421000, "label": "荆州市" }, { "value": 421100, "label": "黄冈市" }, { "value": 421200, "label": "咸宁市" }, { "value": 421300, "label": "随州市" }, { "value": 422800, "label": "恩施土家族苗族自治州" }, { "value": 429000, "label": "省直辖县级行政区划" }] }, { "value": 430000, "label": "湖南省", "children": [{ "value": 430100, "label": "长沙市" }, { "value": 430200, "label": "株洲市" }, { "value": 430300, "label": "湘潭市" }, { "value": 430400, "label": "衡阳市" }, { "value": 430500, "label": "邵阳市" }, { "value": 430600, "label": "岳阳市" }, { "value": 430700, "label": "常德市" }, { "value": 430800, "label": "张家界市" }, { "value": 430900, "label": "益阳市" }, { "value": 431000, "label": "郴州市" }, { "value": 431100, "label": "永州市" }, { "value": 431200, "label": "怀化市" }, { "value": 431300, "label": "娄底市" }, { "value": 433100, "label": "湘西土家族苗族自治州" }] }, { "value": 440000, "label": "广东省", "children": [{ "value": 440100, "label": "广州市" }, { "value": 440200, "label": "韶关市" }, { "value": 440300, "label": "深圳市" }, { "value": 440400, "label": "珠海市" }, { "value": 440500, "label": "汕头市" }, { "value": 440600, "label": "佛山市" }, { "value": 440700, "label": "江门市" }, { "value": 440800, "label": "湛江市" }, { "value": 440900, "label": "茂名市" }, { "value": 441200, "label": "肇庆市" }, { "value": 441300, "label": "惠州市" }, { "value": 441400, "label": "梅州市" }, { "value": 441500, "label": "汕尾市" }, { "value": 441600, "label": "河源市" }, { "value": 441700, "label": "阳江市" }, { "value": 441800, "label": "清远市" }, { "value": 441900, "label": "东莞市" }, { "value": 442000, "label": "中山市" }, { "value": 445100, "label": "潮州市" }, { "value": 445200, "label": "揭阳市" }, { "value": 445300, "label": "云浮市" }] }, { "value": 450000, "label": "广西壮族自治区", "children": [{ "value": 450100, "label": "南宁市" }, { "value": 450200, "label": "柳州市" }, { "value": 450300, "label": "桂林市" }, { "value": 450400, "label": "梧州市" }, { "value": 450500, "label": "北海市" }, { "value": 450600, "label": "防城港市" }, { "value": 450700, "label": "钦州市" }, { "value": 450800, "label": "贵港市" }, { "value": 450900, "label": "玉林市" }, { "value": 451000, "label": "百色市" }, { "value": 451100, "label": "贺州市" }, { "value": 451200, "label": "河池市" }, { "value": 451300, "label": "来宾市" }, { "value": 451400, "label": "崇左市" }] }, { "value": 460000, "label": "海南省", "children": [{ "value": 460100, "label": "海口市" }, { "value": 460200, "label": "三亚市" }, { "value": 460300, "label": "三沙市" }, { "value": 460400, "label": "儋州市" }, { "value": 469000, "label": "省直辖县级行政区划" }] }, { "value": 500000, "label": "重庆市", "children": [{ "value": 500101, "label": "万州区" }, { "value": 500102, "label": "涪陵区" }, { "value": 500103, "label": "渝中区" }, { "value": 500104, "label": "大渡口区" }, { "value": 500105, "label": "江北区" }, { "value": 500106, "label": "沙坪坝区" }, { "value": 500107, "label": "九龙坡区" }, { "value": 500108, "label": "南岸区" }, { "value": 500109, "label": "北碚区" }, { "value": 500110, "label": "綦江区" }, { "value": 500111, "label": "大足区" }, { "value": 500112, "label": "渝北区" }, { "value": 500113, "label": "巴南区" }, { "value": 500114, "label": "黔江区" }, { "value": 500115, "label": "长寿区" }, { "value": 500116, "label": "江津区" }, { "value": 500117, "label": "合川区" }, { "value": 500118, "label": "永川区" }, { "value": 500119, "label": "南川区" }, { "value": 500120, "label": "璧山区" }, { "value": 500151, "label": "铜梁区" }, { "value": 500152, "label": "潼南区" }, { "value": 500153, "label": "荣昌区" }, { "value": 500154, "label": "开州区" }] }, { "value": 510000, "label": "四川省", "children": [{ "value": 510100, "label": "成都市" }, { "value": 510300, "label": "自贡市" }, { "value": 510400, "label": "攀枝花市" }, { "value": 510500, "label": "泸州市" }, { "value": 510600, "label": "德阳市" }, { "value": 510700, "label": "绵阳市" }, { "value": 510800, "label": "广元市" }, { "value": 510900, "label": "遂宁市" }, { "value": 511000, "label": "内江市" }, { "value": 511100, "label": "乐山市" }, { "value": 511300, "label": "南充市" }, { "value": 511400, "label": "眉山市" }, { "value": 511500, "label": "宜宾市" }, { "value": 511600, "label": "广安市" }, { "value": 511700, "label": "达州市" }, { "value": 511800, "label": "雅安市" }, { "value": 511900, "label": "巴中市" }, { "value": 512000, "label": "资阳市" }, { "value": 513200, "label": "阿坝藏族羌族自治州" }, { "value": 513300, "label": "甘孜藏族自治州" }, { "value": 513400, "label": "凉山彝族自治州" }] }, { "value": 520000, "label": "贵州省", "children": [{ "value": 520100, "label": "贵阳市" }, { "value": 520200, "label": "六盘水市" }, { "value": 520300, "label": "遵义市" }, { "value": 520400, "label": "安顺市" }, { "value": 520500, "label": "毕节市" }, { "value": 520600, "label": "铜仁市" }, { "value": 522300, "label": "黔西南布依族苗族自治州" }, { "value": 522600, "label": "黔东南苗族侗族自治州" }, { "value": 522700, "label": "黔南布依族苗族自治州" }] }, { "value": 530000, "label": "云南省", "children": [{ "value": 530100, "label": "昆明市" }, { "value": 530300, "label": "曲靖市" }, { "value": 530400, "label": "玉溪市" }, { "value": 530500, "label": "保山市" }, { "value": 530600, "label": "昭通市" }, { "value": 530700, "label": "丽江市" }, { "value": 530800, "label": "普洱市" }, { "value": 530900, "label": "临沧市" }, { "value": 532300, "label": "楚雄彝族自治州" }, { "value": 532500, "label": "红河哈尼族彝族自治州" }, { "value": 532600, "label": "文山壮族苗族自治州" }, { "value": 532800, "label": "西双版纳傣族自治州" }, { "value": 532900, "label": "大理白族自治州" }, { "value": 533100, "label": "德宏傣族景颇族自治州" }, { "value": 533300, "label": "怒江傈僳族自治州" }, { "value": 533400, "label": "迪庆藏族自治州" }] }, { "value": 540000, "label": "西藏自治区", "children": [{ "value": 540100, "label": "拉萨市" }, { "value": 540200, "label": "日喀则市" }, { "value": 540300, "label": "昌都市" }, { "value": 540400, "label": "林芝市" }, { "value": 540500, "label": "山南市" }, { "value": 542400, "label": "那曲地区" }, { "value": 542500, "label": "阿里地区" }] }, { "value": 610000, "label": "陕西省", "children": [{ "value": 610100, "label": "西安市" }, { "value": 610200, "label": "铜川市" }, { "value": 610300, "label": "宝鸡市" }, { "value": 610400, "label": "咸阳市" }, { "value": 610500, "label": "渭南市" }, { "value": 610600, "label": "延安市" }, { "value": 610700, "label": "汉中市" }, { "value": 610800, "label": "榆林市" }, { "value": 610900, "label": "安康市" }, { "value": 611000, "label": "商洛市" }] }, { "value": 620000, "label": "甘肃省", "children": [{ "value": 620100, "label": "兰州市" }, { "value": 620200, "label": "嘉峪关市" }, { "value": 620300, "label": "金昌市" }, { "value": 620400, "label": "白银市" }, { "value": 620500, "label": "天水市" }, { "value": 620600, "label": "武威市" }, { "value": 620700, "label": "张掖市" }, { "value": 620800, "label": "平凉市" }, { "value": 620900, "label": "酒泉市" }, { "value": 621000, "label": "庆阳市" }, { "value": 621100, "label": "定西市" }, { "value": 621200, "label": "陇南市" }, { "value": 622900, "label": "临夏回族自治州" }, { "value": 623000, "label": "甘南藏族自治州" }] }, { "value": 630000, "label": "青海省", "children": [{ "value": 630100, "label": "西宁市" }, { "value": 630200, "label": "海东市" }, { "value": 632200, "label": "海北藏族自治州" }, { "value": 632300, "label": "黄南藏族自治州" }, { "value": 632500, "label": "海南藏族自治州" }, { "value": 632600, "label": "果洛藏族自治州" }, { "value": 632700, "label": "玉树藏族自治州" }, { "value": 632800, "label": "海西蒙古族藏族自治州" }] }, { "value": 640000, "label": "宁夏回族自治区", "children": [{ "value": 640100, "label": "银川市" }, { "value": 640200, "label": "石嘴山市" }, { "value": 640300, "label": "吴忠市" }, { "value": 640400, "label": "固原市" }, { "value": 640500, "label": "中卫市" }] }, { "value": 650000, "label": "新疆维吾尔自治区", "children": [{ "value": 650100, "label": "乌鲁木齐市" }, { "value": 650200, "label": "克拉玛依市" }, { "value": 650400, "label": "吐鲁番市" }, { "value": 650500, "label": "哈密市" }, { "value": 652300, "label": "昌吉回族自治州" }, { "value": 652700, "label": "博尔塔拉蒙古自治州" }, { "value": 652800, "label": "巴音郭楞蒙古自治州" }, { "value": 652900, "label": "阿克苏地区" }, { "value": 653000, "label": "克孜勒苏柯尔克孜自治州" }, { "value": 653100, "label": "喀什地区" }, { "value": 653200, "label": "和田地区" }, { "value": 654000, "label": "伊犁哈萨克自治州" }, { "value": 654200, "label": "塔城地区" }, { "value": 654300, "label": "阿勒泰地区" }, { "value": 659000, "label": "自治区直辖县级行政区划" }] }, { "value": 710000, "label": "台湾省", "children": [{ "value": "710100", "label": "台北市" }, { "value": "710200", "label": "高雄市" }, { "value": "710300", "label": "台南市" }, { "value": "710400", "label": "台中市" }, { "value": "710500", "label": "金门县" }, { "value": "710600", "label": "南投县" }, { "value": "710700", "label": "基隆市" }, { "value": "710800", "label": "新竹市" }, { "value": "710900", "label": "嘉义市" }, { "value": "711100", "label": "新北市" }, { "value": "711200", "label": "宜兰县" }, { "value": "711300", "label": "新竹县" }, { "value": "711400", "label": "桃园县" }, { "value": "711500", "label": "苗栗县" }, { "value": "711700", "label": "彰化县" }, { "value": "711900", "label": "嘉义县" }, { "value": "712100", "label": "云林县" }, { "value": "712400", "label": "屏东县" }, { "value": "712500", "label": "台东县" }, { "value": "712600", "label": "花莲县" }, { "value": "712700", "label": "澎湖县" }] }, { "value": 810000, "label": "香港特别行政区", "children": [{ "value": "810100", "label": "香港岛" }, { "value": "810200", "label": "九龙" }, { "value": "810300", "label": "新界" }] }, { "value": 820000, "label": "澳门特别行政区", "children": [{ "value": "820100", "label": "澳门半岛" }, { "value": "820200", "label": "氹仔岛" }, { "value": "820300", "label": "路环岛" }] }];exports.default = _default;

/***/ }),

/***/ 29:
/*!*****************************************!*\
  !*** E:/wu3.23/杜高/dugao/utils/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.toast = toast;exports.judgeLogin = judgeLogin;exports.trim = trim;exports.verifyPhone = verifyPhone;exports.debounce = debounce;exports.throtte = throtte;exports.upFile = upFile;exports.saveFile = saveFile;exports.autoImg = autoImg;exports.navigateBack = navigateBack;exports.navigate = navigate;exports.switchTab = switchTab;exports.redirect = redirect;exports.CreatOnlyVal = CreatOnlyVal;Object.defineProperty(exports, "get", { enumerable: true, get: function get() {return _request.get;} });Object.defineProperty(exports, "post", { enumerable: true, get: function get() {return _request.post;} });Object.defineProperty(exports, "requestHideLoading", { enumerable: true, get: function get() {return _request.requestHideLoading;} });Object.defineProperty(exports, "editTime", { enumerable: true, get: function get() {return _dateTools.editTime;} });Object.defineProperty(exports, "dateUtils", { enumerable: true, get: function get() {return _dateTools.dateUtils;} });Object.defineProperty(exports, "timeDiff", { enumerable: true, get: function get() {return _dateTools.timeDiff;} });Object.defineProperty(exports, "formatNumber", { enumerable: true, get: function get() {return _dateTools.formatNumber;} });exports.RegisterPath = exports.LoginPath = exports.hostPath = exports.filePath = exports.host = void 0;















var _request = __webpack_require__(/*! @/utils/request */ 30);
var _dateTools = __webpack_require__(/*! @/utils/date-tools */ 31); //API接口地址
// 线上
// const host = 'https://api.naomiebie.cn/api/';//
// const filePath = 'http://top.naosongduan.cn';//文件域名
// const hostPath = 'http://top.naosongduan.cn/h5/index.html';//主机路径
// 测试
var host = 'http://ddypapi.wtvxin.com/api/'; //
// const host = 'https://scapi.sc-mall.net/api/';  //发现页面套用社交云商接口地址
exports.host = host;var filePath = 'http://ddypapi.wtvxin.com'; //文件域名
exports.filePath = filePath;var hostPath = 'http://hnapi.wtvxin.com/index.html'; //主机路径
exports.hostPath = hostPath;var LoginPath = "login/login"; //登录路径
exports.LoginPath = LoginPath;var RegisterPath = "login/register"; //注册路径
exports.RegisterPath = RegisterPath; // icon--是否显示图标，mask--是否显示防触摸穿透蒙层
function toast(title) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { icon: false, mask: false, time: 2000 };uni.showToast({ title: title, icon: data.icon ? 'success' : 'none', mask: data.mask || false, duration: data.time || 2000 });

}
//判断是否登录，未登录做弹窗跳转登录页面
function judgeLogin() {
  // 未登录false，已登录true
  if (!uni.getStorageSync("userId") || !uni.getStorageSync("token")) {
    uni.showModal({
      title: '未登录',
      content: '是否跳转到登录页面？',
      cancelColor: '#999',
      confirmColor: '#ff6f00',
      success: function success(res) {
        if (res.confirm) {
          navigate(LoginPath);
        }
      } });

    return false;
  } else {
    return true;
  }
}
// 去空字符串
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//验证手机号
function verifyPhone(tel) {
  var r_phone = /^1(3|4|5|6|7|8)\d{9}$/;
  // var phoneNumber = $.trim($('#phoneNumber').val());
  if (trim(tel) == "") {
    toast("手机号不能为空!");
    return false;
  }
  if (!r_phone.test(tel)) {
    toast("请输入正确的手机格式!");
    return false;
  }
  return true;
}

// 函数防抖,多少秒内只允许执行一次，重复点击会重新计时
var timeout = null;
function debounce(fn) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
}
// 函数节流,多少秒内只允许执行一次，重复点击会无视
var throtteStatus = false;
function throtte(fn) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (throtteStatus) return;
  throtteStatus = true;
  setTimeout(fn, wait);
  setTimeout(function () {
    throtteStatus = false;
  }, wait);
}
// 上传文件
function upFile(filePath) {
  return new Promise(function (resolve, reject) {
    uni.uploadFile({
      url: host + 'Area/VoiceUpload',
      filePath: filePath,
      name: 'file',
      success: function success(res) {
        console.log('文件上传', res);
        resolve(res);
      },
      fail: function fail(err) {
        console.log('文件上传失败', err);
        uni.showToast({
          title: '文件上传失败，请重试！',
          icon: 'none' });

        reject(err);
      } });

  });
}
// 保存文件
function saveFile(filePath) {
  // downloadFile下载文件，然后saveFile保存
  uni.downloadFile({
    url: filePath,
    success: function success(res) {
      if (res.statusCode === 200) {
        // h5端
        if (typeof window === 'object' && 'document' in window) {
          var oA = document.createElement("a");
          oA.download = ''; // 设置下载的文件名，默认是'下载'
          oA.href = res.tempFilePath;
          document.body.appendChild(oA);
          oA.click();
          oA.remove(); // 下载之后把创建的元素删除
        } else {
          uni.saveFile({
            tempFilePath: res.tempFilePath,
            complete: function complete(res) {
              console.log(res);
            } });

        }
      }
    } });

}

// 更改图片展示，判断是否带链接图片
function autoImg(img) {
  if (img.indexOf('http') === -1) {
    return filePath + img;
  }
  return img;
}

// 后退到上一页,防抖
function navigateBack() {
  debounce(function () {uni.navigateBack();console.log('回退了一次');}, 2000);
}
// 跳转url,带参
function navigate(url, params, isLogin) {
  // 判断是否已登录
  if (isLogin && !judgeLogin()) {
    return;
  }
  var p = '';
  if (params) {
    var arr = Object.keys(params);
    arr.map(function (item, index) {
      p += "".concat(item, "=").concat(params[item]);
      if (index < arr.length - 1) {p += '&';};
    });
  }
  uni.navigateTo({
    url: "/pages/".concat(url, "?").concat(p) });

}
// 跳转url,带参
function switchTab(url, params, isLogin) {
  if (isLogin && !judgeLogin()) {
    return;
  }
  var p = '';
  if (params) {
    var arr = Object.keys(params);
    arr.map(function (item, index) {
      p += "".concat(item, "=").concat(params[item]);
      if (index < arr.length - 1) {p += '&';};
    });
  }
  uni.switchTab({
    url: "/pages/".concat(url, "?").concat(p) });

}

// 关闭当前页面跳转url,带参
function redirect(url, params, isLogin) {
  if (isLogin && !judgeLogin()) {
    return;
  }
  var p = '';
  if (params) {
    var arr = Object.keys(params);
    arr.map(function (item, index) {
      p += "".concat(item, "=").concat(params[item]);
      if (index < arr.length - 1) {p += '&';};
    });
  }
  uni.redirectTo({
    url: "/pages/".concat(url, "?").concat(p) });

}

//产生不相同的字符串
function CreatOnlyVal() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!*******************************************!*\
  !*** E:/wu3.23/杜高/dugao/utils/request.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.get = get;exports.post = post;exports.requestHideLoading = requestHideLoading;
var _utils = __webpack_require__(/*! @/utils */ 29);


// get请求；
// statusObj ---isLogin，是否需要判断登录，
function get(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var statusObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (statusObj.isLogin && !(0, _utils.judgeLogin)()) {
    return Promise.reject();
  } else {
    return request(url, 'GET', data, statusObj);
  }
}
// post请求
function post(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var statusObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (statusObj.isLogin && !(0, _utils.judgeLogin)()) {
    return Promise.reject();
  } else {
    return request(url, 'POST', data, statusObj);
  }
}


var loginTipsStatus = false; //未登录弹窗，如果存在多个请求，只弹出一次弹窗
// 统一请求返回code
var code = {
  success: 0, //成功
  fail: 1, //失败
  notLogin: 2, //未登录||登录过期
  resCode1: 200 //成功特别方式
};

//请求封装
function request(url, method, data) {
  uni.showLoading({
    title: '加载中' //数据请求前loading
  });
  return new Promise(function (resolve, reject) {
    uni.request({
      url: _utils.host + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },
      success: function success(res) {
        if (res.statusCode === 200) {
          var ret = res.data;
          switch (ret.code) {
            case code.success:
              resolve(ret);
              break;
            case code.resCode1:
              resolve(ret);
              break;
            case code.notLogin:
              // 没登录或登录过期，询问是否跳转到登录页面
              uni.setStorageSync("userId", '');
              uni.setStorageSync("token", '');
              if (!loginTipsStatus) {
                loginTipsStatus = true;

                uni.showModal({
                  title: '需要登录',
                  content: '是否跳转到登录页面？',
                  cancelColor: '#999',
                  confirmColor: '#ff6f00',
                  success: function success(res) {
                    console.log(res);
                    if (res.confirm) {
                      (0, _utils.navigate)(_utils.LoginPath);
                    }
                  },
                  complete: function complete() {
                    loginTipsStatus = false;
                  } });

              }
              break;
            case code.fail:
              (0, _utils.toast)(ret.msg);
              reject(ret);
              break;
            default:
              (0, _utils.toast)(ret.msg);
              reject(ret);}

        } else {
          (0, _utils.toast)('服务器繁忙，请稍后重试');
          (0, _utils.navigateBack)();
          reject();
        }
      },
      fail: function fail(error) {
        (0, _utils.toast)('服务器繁忙，请稍后重试');
        (0, _utils.navigateBack)();
        reject(error);
      },
      complete: function complete() {
        uni.hideLoading();
      } });

  });
}

//请求封装,隐藏加载
function requestHideLoading(url, data, method) {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: _utils.host + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },
      success: function success(res) {
        var ret = res.data;
        if (code.success) {
          resolve(ret);
        } else {
          (0, _utils.toast)(ret.msg);
          reject(ret);
        }
      },
      fail: function fail(error) {
        (0, _utils.toast)('服务器繁忙，请稍后重试');
        reject(error);
      } });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 31:
/*!**********************************************!*\
  !*** E:/wu3.23/杜高/dugao/utils/date-tools.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.editTime = editTime;exports.formatNumber = formatNumber;exports.formatTime = formatTime;exports.timeDiff = timeDiff;exports.dateUtils = void 0;
// 更改时间格式
// type:'date'--返回日期；'time'--返回日期+时间; 's'--日期+时间+秒
function editTime(time) {var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'date';
  var newTime = '';
  if (type === 'time') {
    newTime = time.substr(0, time.lastIndexOf(':'));
    newTime = newTime.replace('T', ' ');
  }
  if (type === "date") {
    newTime = time.substr(0, time.lastIndexOf('T'));
  }
  if (type === "s") {
    newTime = time.substr(0, time.lastIndexOf('.'));
    newTime = newTime.replace('T', ' ');
  }
  return newTime;
}

// 时间格式化工具
function formatNumber(n) {
  var str = n.toString();
  return str[1] ? str : "0".concat(str);
}

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  var t1 = [year, month, day].map(formatNumber).join('/');
  var t2 = [hour, minute, second].map(formatNumber).join(':');

  return "".concat(t1, " ").concat(t2);
}

//   JS获取距当前时间差
var dateUtils = {
  UNITS: {
    '年': 31557600000,
    '月': 2629800000,
    '天': 86400000, //1000 * 24 * 60 * 60
    '小时': 3600000, //1000 * 60 * 60
    '分钟': 60000, //1000 * 60
    '秒': 1000 },

  // milliseconds--时间戳
  humanize: function humanize(milliseconds) {
    console.log(this.UNITS);
    var humanize = '';
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
        break;
      }
    }
    return humanize || '刚刚';
  },
  format: function format(dateStr) {
    var date = this.parse(dateStr);
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS['天']) {
      return this.humanize(diff);
    }
    var _format = function _format(number) {
      return number < 10 ? '0' + number : number;
    };
    return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDay()) + ' ' +
    _format(date.getHours()) + ':' + _format(date.getMinutes()) + ':' + _format(date.getSeconds());
  },
  parse: function parse(str) {//将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  } };

// 时间差，输入的时间距离现在时间差，输出''天''小时''分钟''秒
exports.dateUtils = dateUtils;function timeDiff(time) {
  var diff = '';
  var time_diff = new Date().getTime() - time;
  // 计算相差天数  
  var days = Math.floor(time_diff / (24 * 3600 * 1000));
  if (days > 0) {
    return diff += days + '天';
  }
  // 计算相差小时数  
  var leave1 = time_diff % (24 * 3600 * 1000);
  var hours = Math.floor(leave1 / (3600 * 1000));
  if (hours > 0) {
    return diff += hours + '小时';
  } else {
    if (diff !== '') {
      return diff += hours + '小时';
    }
  }
  // 计算相差分钟数  
  var leave2 = leave1 % (3600 * 1000);
  var minutes = Math.floor(leave2 / (60 * 1000));
  if (minutes > 0) {
    return diff += minutes + '分钟';
  } else {
    if (diff !== '') {
      return diff += minutes + '分钟';
    }
  }
  // 计算相差秒数  
  var leave3 = leave2 % (60 * 1000);
  var seconds = Math.round(leave3 / 1000);
  if (seconds == 0) {
    return diff = '刚刚';
  } else if (seconds > 0) {
    return diff += seconds + '秒';
  } else {
    if (diff !== '') {
      return diff += seconds + '秒';
    }
  }

  return diff;
}

/***/ }),

/***/ 362:
/*!************************************************!*\
  !*** E:/wu3.23/杜高/dugao/common/image-tools.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
      bitmap.load(path, function () {
        try {
          var base64 = bitmap.toBase64Data();
        } catch (error) {
          reject(error);
        }
        bitmap.clear();
        resolve(base64);
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], {
        type: type })));

    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = Date.now() + '.' + extName;
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
      bitmap.loadBase64Data(base64, function () {
        var filePath = '_doc/uniapp_temp/' + fileName;
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ }),

/***/ 4:
/*!*************************************!*\
  !*** E:/wu3.23/杜高/dugao/pages.json ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 41);

/***/ }),

/***/ 41:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 42);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 42:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 43:
/*!*****************************************!*\
  !*** E:/wu3.23/杜高/dugao/common/util.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.formatTime = formatTime;exports.formatLocation = formatLocation;exports.toLogin = toLogin;exports.getCurrentPageUrlWithArgs = getCurrentPageUrlWithArgs;exports.getStorageOpenid = getStorageOpenid;exports.valPhone = valPhone;exports.SEOTitle = SEOTitle;exports.getUrlParam = getUrlParam;exports.setRegular = setRegular;exports.navigate = navigate;exports.uncodeUtf16 = uncodeUtf16;Object.defineProperty(exports, "host", { enumerable: true, get: function get() {return _utils.host;} });Object.defineProperty(exports, "get", { enumerable: true, get: function get() {return _request.get;} });Object.defineProperty(exports, "post", { enumerable: true, get: function get() {return _request.post;} });Object.defineProperty(exports, "requestHideLoading", { enumerable: true, get: function get() {return _request.requestHideLoading;} });exports.dateUtils = void 0;























































































































































































































































var _utils = __webpack_require__(/*! @/utils */ 29);
var _request = __webpack_require__(/*! @/utils/request.js */ 30);function formatNumber(n) {var str = n.toString();return str[1] ? str : "0".concat(str);}function formatTime(date) {date = new Date(date);var year = date.getFullYear();var month = date.getMonth() + 1;var day = date.getDate();var hour = date.getHours();var minute = date.getMinutes();var second = date.getSeconds();var t1 = [year, month, day].map(formatNumber).join('/');var t2 = [hour, minute, second].map(formatNumber).join(':');return "".concat(t1, " ").concat(t2);}function formatLocation(longitude, latitude) {if (typeof longitude === 'string' && typeof latitude === 'string') {longitude = parseFloat(longitude);latitude = parseFloat(latitude);}longitude = longitude.toFixed(2);latitude = latitude.toFixed(2);return { longitude: longitude.toString().split('.'), latitude: latitude.toString().split('.') };}var dateUtils = { UNITS: { '年': 31557600000, '月': 2629800000, '天': 86400000, '小时': 3600000, '分钟': 60000, '秒': 1000 }, humanize: function humanize(milliseconds) {var humanize = '';for (var key in this.UNITS) {if (milliseconds >= this.UNITS[key]) {humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';break;}}return humanize || '刚刚';}, format: function format(dateStr) {var date = this.parse(dateStr);var diff = Date.now() - date.getTime();if (diff < this.UNITS['天']) {return this.humanize(diff);}var _format = function _format(number) {return number < 10 ? '0' + number : number;};return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDay()) + ' ' + _format(date.getHours()) + ':' + _format(date.getMinutes()) + ':' + _format(date.getSeconds());}, parse: function parse(str) {//将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);} }; // 判断是否登录了
exports.dateUtils = dateUtils;function toLogin(objUrl) {// const userInfo = wx.getStorageSync('userInfo');
  var userId = uni.getStorageSync('userId');var token = uni.getStorageSync('token');if (userId && token) {return true;} else {var strUrl = '';if (objUrl) {strUrl = objUrl.replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');}uni.showModal({ title: '登录提示', content: "您还没有登录，是否重新登录？", cancelColor: '#999', confirmColor: '#ff6f00', success: function success(res) {if (res.confirm) {uni.navigateTo({ url: "/pages/login/login?askUrl=" + strUrl });} else if (res.cancel) {}} });return false;}} // 获取openId
function getStorageOpenid() {var openId = uni.getStorageSync("openId");if (openId) {return openId;} else {return '';}} //定时任务
function setRegular(targetHour) {var timeInterval, nowTime, nowSeconds, targetSeconds;nowTime = new Date(); // 计算当前时间的秒数
  nowSeconds = nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds(); // 计算目标时间对应的秒数
  targetSeconds = targetHour * 3600; //  判断是否已超过今日目标小时，若超过，时间间隔设置为距离明天目标小时的距离
  timeInterval = targetSeconds > nowSeconds ? targetSeconds - nowSeconds : targetSeconds + 24 * 3600 - nowSeconds;setTimeout(getProductFileList, timeInterval * 1000);}function getProductFileList() {localStorage.removeItem('token');localStorage.removeItem('userId');setTimeout(getProductFileList, 24 * 3600 * 1000); //之后每天调用一次
} //setRegular(4);//每天凌晨4点刷新
// 获取当前地址
function getCurrentPageUrlWithArgs() {var pages = getCurrentPages();var currentPage = pages[pages.length - 1];var url = currentPage.route;var options = currentPage.options;var urlWithArgs = "/".concat(url, "?");for (var key in options) {var value = options[key];urlWithArgs += "".concat(key, "=").concat(value, "&");}urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);return urlWithArgs;} //每3秒去检查token是否过期
// function checkAccessToken() {
//   setInterval(checkAccessTokenTimeout, 3 * 1000); //这个时间可以自定义。比如 25 * 60 * 1000（代表25分钟）
// }
// function checkAccessTokenTimeout() {
//   var accesstoken = wx.getStorageSync('token');
//   if (accesstoken == null || accesstoken == undefined || accesstoken == "") {
//     return false
//   }
//   var tokenDate = wx.getStorageSync('tokenDate');
//   var aftertimestamp = Date.parse(new Date()); //返回时间毫秒数，比如1489899243209
//   if (aftertimestamp - tokenDate >= 43200000) { //超过了12小时,重新登陆
//     removeLocalToken()
//     return false
//   }
//   return true
// }
//验证手机号
function valPhone(tel) {var r_phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; // var phoneNumber = $.trim($('#phoneNumber').val());
  if (tel == "") {uni.showToast({ title: "手机号不能为空!", icon: "none", duration: 2000 });return false;}if (!r_phone.test(tel)) {uni.showToast({ title: "请输入正确的手机格式!", icon: "none", duration: 2000 });return false;}return true;}function createTag(tagName, name, content) {var tag = document.createElement(tagName);tag.name = name;tag.content = content;return tag;}var doctit = "";function SEOTitle(str) {if (str == "") {document.title = doctit;} else {document.title = str + "-" + doctit;}}function getUrlParam(name) {var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");var url = window.location.search.substr(1); //.toLowerCase();
  var r = url.match(reg);if (r != null) return unescape(r[2]);return null;} // 普通跳转
function navigate(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var p = '';var arr = Object.keys(params); //键数组
  arr.map(function (item) {p += "".concat(item, "=").concat(params[item]);if (arr[arr.length - 1] !== item) {p += '&';}});uni.navigateTo({ url: '/pages/' + url + (p && '?' + p) });}function uncodeUtf16(str) {var reg = /\&#.*?;/g;var result = str.replace(reg, function (_char) {var H, L, code;if (_char.length == 9) {code = parseInt(_char.match(/[0-9]+/g));H = Math.floor((code - 0x10000) / 0x400) + 0xD800;L = (code - 0x10000) % 0x400 + 0xDC00;return unescape("%u" + H.toString(16) + "%u" + L.toString(16));} else {return _char;}});return result;}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 44:
/*!******************************************!*\
  !*** E:/wu3.23/杜高/dugao/common/head.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 513:
/*!********************************************************!*\
  !*** E:/wu3.23/杜高/dugao/components/uni-icons/icons.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 528:
/*!******************************************************************!*\
  !*** E:/wu3.23/杜高/dugao/components/uParse/src/libs/html2json.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _wxDiscode = _interopRequireDefault(__webpack_require__(/*! ./wxDiscode */ 529));
var _htmlparser = _interopRequireDefault(__webpack_require__(/*! ./htmlparser */ 530));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                 * html2Json 改造来自: https://github.com/Jxck/html2json
                                                                                                                                                                 *
                                                                                                                                                                 *
                                                                                                                                                                 * author: Di (微信小程序开发工程师)
                                                                                                                                                                 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                                                                                 *               垂直微信小程序开发交流社区
                                                                                                                                                                 *
                                                                                                                                                                 * github地址: https://github.com/icindy/wxParse
                                                                                                                                                                 *
                                                                                                                                                                 * for: 微信小程序富文本解析
                                                                                                                                                                 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                                                                                 */function makeMap(str) {var obj = {};var items = str.split(',');for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}return obj;} // Block Elements - HTML 5
var block = makeMap('br,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');
// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

function removeDOCTYPE(html) {
  var isDocument = /<body.*>([^]*)<\/body>/.test(html);
  return isDocument ? RegExp.$1 : html;
}

function trimHtml(html) {
  return html.
  replace(/<!--.*?-->/gi, '').
  replace(/\/\*.*?\*\//gi, '').
  replace(/[ ]+</gi, '<').
  replace(/<script[^]*<\/script>/gi, '').
  replace(/<style[^]*<\/style>/gi, '');
}

function getScreenInfo() {
  var screen = {};
  uni.getSystemInfo({
    success: function success(res) {
      screen.width = res.windowWidth;
      screen.height = res.windowHeight;
    } });

  return screen;
}

function html2json(html, customHandler, imageProp, host) {
  // 处理字符串
  html = removeDOCTYPE(html);
  html = trimHtml(html);
  html = _wxDiscode.default.strDiscode(html);
  // 生成node节点
  var bufArray = [];
  var results = {
    nodes: [],
    imageUrls: [] };


  function Node(tag) {
    this.node = 'element';
    this.tag = tag;
  }
  Node.prototype.$screen = getScreenInfo();
  Node.prototype.$host = host;

  (0, _htmlparser.default)(html, {
    start: function start(tag, attrs, unary) {
      // node for this element
      var node = new Node(tag);

      if (bufArray.length !== 0) {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
      }

      if (block[tag]) {
        node.tagType = 'block';
      } else if (inline[tag]) {
        node.tagType = 'inline';
      } else if (closeSelf[tag]) {
        node.tagType = 'closeSelf';
      }

      node.attr = attrs.reduce(function (pre, attr) {var
        name = attr.name;var
        value = attr.value;
        if (name === 'class') {
          node.classStr = value;
        }
        // has multi attibutes
        // make it array of attribute
        if (name === 'style') {
          node.styleStr = value;
        }
        if (value.match(/ /)) {
          value = value.split(' ');
        }

        // if attr already exists
        // merge it
        if (pre[name]) {
          if (Array.isArray(pre[name])) {
            // already array, push to last
            pre[name].push(value);
          } else {
            // single value, make it array
            pre[name] = [pre[name], value];
          }
        } else {
          // not exist, put it
          pre[name] = value;
        }

        return pre;
      }, {});

      // 优化样式相关属性
      if (node.classStr) {
        node.classStr += " ".concat(node.tag);
      } else {
        node.classStr = node.tag;
      }
      if (node.tagType === 'inline') {
        node.classStr += ' inline';
      }

      // 对img添加额外数据
      if (node.tag === 'img') {
        var imgUrl = node.attr.src;
        imgUrl = _wxDiscode.default.urlToHttpUrl(imgUrl, imageProp.domain);
        Object.assign(node.attr, imageProp, {
          src: imgUrl || '' });

        if (imgUrl) {
          results.imageUrls.push(imgUrl);
        }
      }

      // 处理a标签属性
      if (node.tag === 'a') {
        node.attr.href = node.attr.href || '';
      }

      // 处理font标签样式属性
      if (node.tag === 'font') {
        var fontSize = [
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large',
        '-webkit-xxx-large'];

        var styleAttrs = {
          color: 'color',
          face: 'font-family',
          size: 'font-size' };

        if (!node.styleStr) node.styleStr = '';
        Object.keys(styleAttrs).forEach(function (key) {
          if (node.attr[key]) {
            var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.styleStr += "".concat(styleAttrs[key], ": ").concat(value, ";");
          }
        });
      }

      // 临时记录source资源
      if (node.tag === 'source') {
        results.source = node.attr.src;
      }

      if (customHandler.start) {
        customHandler.start(node, results);
      }

      if (unary) {
        // if this tag doesn't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var _parent = bufArray[0] || results;
        if (_parent.nodes === undefined) {
          _parent.nodes = [];
        }
        _parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function end(tag) {
      // merge into parent tag
      var node = bufArray.shift();
      if (node.tag !== tag) {
        console.error('invalid state: mismatch end tag');
      }

      // 当有缓存source资源时于于video补上src资源
      if (node.tag === 'video' && results.source) {
        node.attr.src = results.source;
        delete results.source;
      }

      if (customHandler.end) {
        customHandler.end(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (!parent.nodes) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    },
    chars: function chars(text) {
      if (!text.trim()) return;

      var node = {
        node: 'text',
        text: text };


      if (customHandler.chars) {
        customHandler.chars(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    } });


  return results;
}var _default =

html2json;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 529:
/*!******************************************************************!*\
  !*** E:/wu3.23/杜高/dugao/components/uParse/src/libs/wxDiscode.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // HTML 支持的数学符号
function strNumDiscode(str) {
  str = str.replace(/&forall;/g, '∀');
  str = str.replace(/&part;/g, '∂');
  str = str.replace(/&exist;/g, '∃');
  str = str.replace(/&empty;/g, '∅');
  str = str.replace(/&nabla;/g, '∇');
  str = str.replace(/&isin;/g, '∈');
  str = str.replace(/&notin;/g, '∉');
  str = str.replace(/&ni;/g, '∋');
  str = str.replace(/&prod;/g, '∏');
  str = str.replace(/&sum;/g, '∑');
  str = str.replace(/&minus;/g, '−');
  str = str.replace(/&lowast;/g, '∗');
  str = str.replace(/&radic;/g, '√');
  str = str.replace(/&prop;/g, '∝');
  str = str.replace(/&infin;/g, '∞');
  str = str.replace(/&ang;/g, '∠');
  str = str.replace(/&and;/g, '∧');
  str = str.replace(/&or;/g, '∨');
  str = str.replace(/&cap;/g, '∩');
  str = str.replace(/&cup;/g, '∪');
  str = str.replace(/&int;/g, '∫');
  str = str.replace(/&there4;/g, '∴');
  str = str.replace(/&sim;/g, '∼');
  str = str.replace(/&cong;/g, '≅');
  str = str.replace(/&asymp;/g, '≈');
  str = str.replace(/&ne;/g, '≠');
  str = str.replace(/&le;/g, '≤');
  str = str.replace(/&ge;/g, '≥');
  str = str.replace(/&sub;/g, '⊂');
  str = str.replace(/&sup;/g, '⊃');
  str = str.replace(/&nsub;/g, '⊄');
  str = str.replace(/&sube;/g, '⊆');
  str = str.replace(/&supe;/g, '⊇');
  str = str.replace(/&oplus;/g, '⊕');
  str = str.replace(/&otimes;/g, '⊗');
  str = str.replace(/&perp;/g, '⊥');
  str = str.replace(/&sdot;/g, '⋅');
  return str;
}

// HTML 支持的希腊字母
function strGreeceDiscode(str) {
  str = str.replace(/&Alpha;/g, 'Α');
  str = str.replace(/&Beta;/g, 'Β');
  str = str.replace(/&Gamma;/g, 'Γ');
  str = str.replace(/&Delta;/g, 'Δ');
  str = str.replace(/&Epsilon;/g, 'Ε');
  str = str.replace(/&Zeta;/g, 'Ζ');
  str = str.replace(/&Eta;/g, 'Η');
  str = str.replace(/&Theta;/g, 'Θ');
  str = str.replace(/&Iota;/g, 'Ι');
  str = str.replace(/&Kappa;/g, 'Κ');
  str = str.replace(/&Lambda;/g, 'Λ');
  str = str.replace(/&Mu;/g, 'Μ');
  str = str.replace(/&Nu;/g, 'Ν');
  str = str.replace(/&Xi;/g, 'Ν');
  str = str.replace(/&Omicron;/g, 'Ο');
  str = str.replace(/&Pi;/g, 'Π');
  str = str.replace(/&Rho;/g, 'Ρ');
  str = str.replace(/&Sigma;/g, 'Σ');
  str = str.replace(/&Tau;/g, 'Τ');
  str = str.replace(/&Upsilon;/g, 'Υ');
  str = str.replace(/&Phi;/g, 'Φ');
  str = str.replace(/&Chi;/g, 'Χ');
  str = str.replace(/&Psi;/g, 'Ψ');
  str = str.replace(/&Omega;/g, 'Ω');

  str = str.replace(/&alpha;/g, 'α');
  str = str.replace(/&beta;/g, 'β');
  str = str.replace(/&gamma;/g, 'γ');
  str = str.replace(/&delta;/g, 'δ');
  str = str.replace(/&epsilon;/g, 'ε');
  str = str.replace(/&zeta;/g, 'ζ');
  str = str.replace(/&eta;/g, 'η');
  str = str.replace(/&theta;/g, 'θ');
  str = str.replace(/&iota;/g, 'ι');
  str = str.replace(/&kappa;/g, 'κ');
  str = str.replace(/&lambda;/g, 'λ');
  str = str.replace(/&mu;/g, 'μ');
  str = str.replace(/&nu;/g, 'ν');
  str = str.replace(/&xi;/g, 'ξ');
  str = str.replace(/&omicron;/g, 'ο');
  str = str.replace(/&pi;/g, 'π');
  str = str.replace(/&rho;/g, 'ρ');
  str = str.replace(/&sigmaf;/g, 'ς');
  str = str.replace(/&sigma;/g, 'σ');
  str = str.replace(/&tau;/g, 'τ');
  str = str.replace(/&upsilon;/g, 'υ');
  str = str.replace(/&phi;/g, 'φ');
  str = str.replace(/&chi;/g, 'χ');
  str = str.replace(/&psi;/g, 'ψ');
  str = str.replace(/&omega;/g, 'ω');
  str = str.replace(/&thetasym;/g, 'ϑ');
  str = str.replace(/&upsih;/g, 'ϒ');
  str = str.replace(/&piv;/g, 'ϖ');
  str = str.replace(/&middot;/g, '·');
  return str;
}

function strcharacterDiscode(str) {
  // 加入常用解析
  str = str.replace(/&nbsp;/g, ' ');
  str = str.replace(/&ensp;/g, ' ');
  str = str.replace(/&emsp;/g, '　');
  str = str.replace(/&quot;/g, "'");
  str = str.replace(/&amp;/g, '&');
  str = str.replace(/&lt;/g, '<');
  str = str.replace(/&gt;/g, '>');
  str = str.replace(/&#8226;/g, '•');

  return str;
}

// HTML 支持的其他实体
function strOtherDiscode(str) {
  str = str.replace(/&OElig;/g, 'Œ');
  str = str.replace(/&oelig;/g, 'œ');
  str = str.replace(/&Scaron;/g, 'Š');
  str = str.replace(/&scaron;/g, 'š');
  str = str.replace(/&Yuml;/g, 'Ÿ');
  str = str.replace(/&fnof;/g, 'ƒ');
  str = str.replace(/&circ;/g, 'ˆ');
  str = str.replace(/&tilde;/g, '˜');
  str = str.replace(/&ensp;/g, '');
  str = str.replace(/&emsp;/g, '');
  str = str.replace(/&thinsp;/g, '');
  str = str.replace(/&zwnj;/g, '');
  str = str.replace(/&zwj;/g, '');
  str = str.replace(/&lrm;/g, '');
  str = str.replace(/&rlm;/g, '');
  str = str.replace(/&ndash;/g, '–');
  str = str.replace(/&mdash;/g, '—');
  str = str.replace(/&lsquo;/g, '‘');
  str = str.replace(/&rsquo;/g, '’');
  str = str.replace(/&sbquo;/g, '‚');
  str = str.replace(/&ldquo;/g, '“');
  str = str.replace(/&rdquo;/g, '”');
  str = str.replace(/&bdquo;/g, '„');
  str = str.replace(/&dagger;/g, '†');
  str = str.replace(/&Dagger;/g, '‡');
  str = str.replace(/&bull;/g, '•');
  str = str.replace(/&hellip;/g, '…');
  str = str.replace(/&permil;/g, '‰');
  str = str.replace(/&prime;/g, '′');
  str = str.replace(/&Prime;/g, '″');
  str = str.replace(/&lsaquo;/g, '‹');
  str = str.replace(/&rsaquo;/g, '›');
  str = str.replace(/&oline;/g, '‾');
  str = str.replace(/&euro;/g, '€');
  str = str.replace(/&trade;/g, '™');

  str = str.replace(/&larr;/g, '←');
  str = str.replace(/&uarr;/g, '↑');
  str = str.replace(/&rarr;/g, '→');
  str = str.replace(/&darr;/g, '↓');
  str = str.replace(/&harr;/g, '↔');
  str = str.replace(/&crarr;/g, '↵');
  str = str.replace(/&lceil;/g, '⌈');
  str = str.replace(/&rceil;/g, '⌉');

  str = str.replace(/&lfloor;/g, '⌊');
  str = str.replace(/&rfloor;/g, '⌋');
  str = str.replace(/&loz;/g, '◊');
  str = str.replace(/&spades;/g, '♠');
  str = str.replace(/&clubs;/g, '♣');
  str = str.replace(/&hearts;/g, '♥');

  str = str.replace(/&diams;/g, '♦');
  str = str.replace(/&#39;/g, "'");
  return str;
}

function strDiscode(str) {
  str = strNumDiscode(str);
  str = strGreeceDiscode(str);
  str = strcharacterDiscode(str);
  str = strOtherDiscode(str);
  return str;
}

function urlToHttpUrl(url, domain) {
  if (/^\/\//.test(url)) {
    return "https:".concat(url);
  } else if (/^\//.test(url)) {
    return "https://".concat(domain).concat(url);
  }
  return url;
}var _default =

{
  strDiscode: strDiscode,
  urlToHttpUrl: urlToHttpUrl };exports.default = _default;

/***/ }),

/***/ 530:
/*!*******************************************************************!*\
  !*** E:/wu3.23/杜高/dugao/components/uParse/src/libs/htmlparser.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      *
                                                                                                      * htmlParser改造自: https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
                                                                                                      *
                                                                                                      * author: Di (微信小程序开发工程师)
                                                                                                      * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                      *               垂直微信小程序开发交流社区
                                                                                                      *
                                                                                                      * github地址: https://github.com/icindy/wxParse
                                                                                                      *
                                                                                                      * for: 微信小程序富文本解析
                                                                                                      * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                      */
// Regular Expressions for parsing tags and attributes

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z0-9_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

function makeMap(str) {
  var obj = {};
  var items = str.split(',');
  for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}
  return obj;
}

// Empty Elements - HTML 5
var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr');

// Block Elements - HTML 5
var block = makeMap('address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');

// Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var last = html;
  var stack = [];

  stack.last = function () {return stack[stack.length - 1];};

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    var pos;
    if (!tagName) {
      pos = 0;
    } else {
      // Find the closest opened tag of the same type
      tagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos -= 1) {
        if (stack[pos] === tagName) break;
      }
    }
    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i -= 1) {
        if (handler.end) handler.end(stack[i]);
      }

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() === tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) stack.push(tagName);

    if (handler.start) {
      var attrs = [];

      rest.replace(attr, function genAttr(matches, name) {
        var value = arguments[2] || arguments[3] || arguments[4] || (fillAttrs[name] ? name : '');

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"') // "
        });
      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  while (html) {
    chars = true;

    if (html.indexOf('</') === 0) {
      match = html.match(endTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(endTag, parseEndTag);
        chars = false;
      }

      // start tag
    } else if (html.indexOf('<') === 0) {
      match = html.match(startTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(startTag, parseStartTag);
        chars = false;
      }
    }

    if (chars) {
      index = html.indexOf('<');
      var text = '';
      while (index === 0) {
        text += '<';
        html = html.substring(1);
        index = html.indexOf('<');
      }
      text += index < 0 ? html : html.substring(0, index);
      html = index < 0 ? '' : html.substring(index);

      if (handler.chars) handler.chars(text);
    }

    if (html === last) throw new Error("Parse Error: ".concat(html));
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();
}var _default =

HTMLParser;exports.default = _default;

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200424005","_inBundle":false,"_integrity":"sha512-FT8Z/C5xSmIxooqhV1v69jTkxATPz+FsRQIFOrbdlWekjGkrE73jfrdNMWm7gL5u41ALPJTVArxN1Re9by1bjQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200424005.tgz","_shasum":"47f4375095eda3089cf4678b4b96fc656a7ab623","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"94494d54ed23e2dcf9ab8e3245b48b770b4e98a9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200424005"};

/***/ }),

/***/ 7:
/*!******************************************************!*\
  !*** E:/wu3.23/杜高/dugao/pages.json?{"type":"style"} ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/find/index": { "navigationBarTitleText": "发现", "enablePullDownRefresh": true, "usingComponents": { "uni-nav-bar": "/components/uni-nav-bar", "media-list": "/components/tab-nvue/mediaList", "acti-list": "/components/tab-nvue/actiList", "no-data": "/components/noData", "uni-load-more": "/components/uni-load-more" }, "usingAutoImportComponents": { "uni-load-more": "/components/uni-load-more/uni-load-more" } }, "pages/card/index": { "navigationBarTitleText": "购物车", "usingComponents": { "uni-number-box": "/components/uni-number-box/uni-number-box", "uni-popup": "/components/uni-popup/uni-popup", "popupsku": "/components/popupSku", "no-data": "/components/noData" }, "usingAutoImportComponents": { "uni-number-box": "/components/uni-number-box/uni-number-box", "uni-popup": "/components/uni-popup/uni-popup" } }, "pages/my/my": { "navigationBarTitleText": "我的", "navigationBarBackgroundColor": "#ff6f00", "navigationBarTextStyle": "white", "enablePullDownRefresh": true, "usingComponents": {}, "usingAutoImportComponents": { "uni-icons": "/components/uni-icons/uni-icons" } }, "pages/my/wallet": { "navigationBarTitleText": "我的钱包", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/my/browsing": { "navigationBarTitleText": "浏览记录", "usingComponents": { "uni-load-more": "/components/uni-load-more", "no-data": "/components/noData" }, "usingAutoImportComponents": { "uni-load-more": "/components/uni-load-more/uni-load-more" } }, "pages/my/collect": { "navigationBarTitleText": "我的收藏", "usingComponents": { "no-data": "/components/noData", "uni-load-more": "/components/uni-load-more" }, "usingAutoImportComponents": { "uni-load-more": "/components/uni-load-more/uni-load-more" } }, "pages/login/login": { "navigationBarTitleText": "登录", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/login/register": { "navigationBarTitleText": "注册", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/scheme/solvecase": { "navigationBarTitleText": "保花保果解决方案", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/scheme/videozone": { "navigationBarTitleText": "视频专区", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/scheme/fertilizer": { "navigationBarTitleText": "施肥方案", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/scheme/videodetails": { "navigationBarTitleText": "视频详情", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/hotBrand/hotBrand": { "navigationBarTitleText": "热销榜", "navigationBarBackgroundColor": "#94aebe", "navigationBarTextStyle": "white", "usingComponents": { "no-data": "/components/noData", "uni-load-more": "/components/uni-load-more" }, "usingAutoImportComponents": { "uni-load-more": "/components/uni-load-more/uni-load-more" } }, "pages/other/kefu/kefu": { "navigationBarTitleText": "在线客服", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/kefuDeatil/kefuDeatil": { "navigationBarTitleText": "在线客服", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/set/set": { "navigationBarTitleText": "设置", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/setpwd/setpwd": { "navigationBarTitleText": "设置支付密码", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/changeLoginPwd/changeLoginPwd": { "navigationBarTitleText": "修改登录密码", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/account/account": { "navigationBarTitleText": "账户管理", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/verPhone/verPhone": { "navigationBarTitleText": "验证手机号", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/myAcount/myAcount": { "navigationBarTitleText": "我的收益", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/withdraw/withdraw": { "navigationBarTitleText": "提现", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/other/getCome/getCome": { "navigationBarTitleText": "收益明细", "usingComponents": { "no-data": "/components/noData", "picker-time": "/components/pickerTime" }, "usingAutoImportComponents": {} }, "pages/other/money/money": { "navigationBarTitleText": "交易明细", "usingComponents": { "no-data": "/components/noData", "picker-time": "/components/pickerTime", "uni-load-more": "/components/uni-load-more" }, "usingAutoImportComponents": { "uni-load-more": "/components/uni-load-more/uni-load-more" } }, "pages/other/myguest/myguest": { "navigationBarTitleText": "我的团队", "usingComponents": { "no-data": "/components/noData" }, "usingAutoImportComponents": {} }, "pages/other/chooseCity/chooseCity": { "navigationBarTitleText": "城市选择", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/question/question": { "navigationBarTitleText": "常见问题", "usingComponents": { "u-parse": "/components/uParse/src/wxParse", "no-data": "/components/noData", "uni-load-more": "/components/uni-load-more" }, "usingAutoImportComponents": {} }, "pages/member/address/address": { "navigationBarTitleText": "收货地址", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/addsite/addsite": { "navigationBarTitleText": "新增地址", "navigationBarBackgroundColor": "#ffffff", "usingComponents": { "mpvue-city-picker": "/components/mpvue-citypicker/mpvueCityPicker" }, "usingAutoImportComponents": {} }, "pages/member/invoiceList/invoiceList": { "navigationBarTitleText": "发票信息", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/addInvoice/addInvoice": { "navigationBarTitleText": "新增发票", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/logistics/logistics": { "navigationBarTitleText": "物流信息", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/apply/apply": { "navigationBarTitleText": "申请退款", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/order/order": { "navigationBarTitleText": "我的订单", "navigationBarBackgroundColor": "#ffffff", "usingComponents": { "no-data": "/components/noData", "uni-load-more": "/components/uni-load-more" }, "usingAutoImportComponents": { "uni-load-more": "/components/uni-load-more/uni-load-more" } }, "pages/member/myAppraise/myAppraise": { "navigationBarTitleText": "我的评价", "navigationBarBackgroundColor": "#ffffff", "usingComponents": { "no-data": "/components/noData", "uni-load-more": "/components/uni-load-more" }, "usingAutoImportComponents": { "uni-load-more": "/components/uni-load-more/uni-load-more" } }, "pages/member/coupon/coupon": { "navigationBarTitleText": "优惠券", "navigationBarBackgroundColor": "#ffffff", "usingComponents": { "no-data": "/components/noData", "load-more": "/components/uni-load-more" }, "usingAutoImportComponents": {} }, "pages/member/afterSaleType/afterSaleType": { "navigationBarTitleText": "售后服务", "navigationBarBackgroundColor": "#ffffff", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/applyReturn/applyReturn": { "navigationBarTitleText": "售后服务", "navigationBarBackgroundColor": "#ffffff", "usingComponents": { "pickers": "/components/pickers" }, "usingAutoImportComponents": {} }, "pages/member/orderDetail/orderDetail": { "navigationBarTitleText": "订单详情", "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#ff3333", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/invite/invite": { "navigationBarTitleText": "邀请好友", "navigationBarBackgroundColor": "#ffffff", "enablePullDownRefresh": true, "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/editinfo/editinfo": { "navigationBarTitleText": "个人资料", "usingComponents": { "uni-popup": "/components/uni-popup/uni-popup" }, "usingAutoImportComponents": {} }, "pages/member/editNickName/editNickName": { "navigationBarTitleText": "编辑昵称", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/member/addComment/addComment": { "navigationBarTitleText": "发布评价", "usingComponents": { "uni-rate": "/components/uni-rate" }, "usingAutoImportComponents": {} }, "pages/member/orderTui/orderTui": { "navigationBarTitleText": "售后订单", "usingComponents": { "no-data": "/components/noData" }, "usingAutoImportComponents": {} }, "pages/member/orderTuidetail/orderTuidetail": { "navigationBarTitleText": "售后详情", "usingComponents": { "pickers": "/components/pickers" }, "usingAutoImportComponents": {} }, "pages/member/couponCenter/couponCenter": { "navigationBarTitleText": "优惠券", "navigationBarBackgroundColor": "#ffffff", "usingComponents": { "no-data": "/components/noData", "load-more": "/components/uni-load-more" }, "usingAutoImportComponents": {} }, "pages/message/messageClass/messageClass": { "navigationBarTitleText": "消息中心", "usingComponents": { "no-data": "/components/noData" }, "usingAutoImportComponents": {} }, "pages/message/messageList/messageList": { "usingComponents": { "u-parse": "/components/uParse/src/wxParse", "no-data": "/components/noData", "uni-load-more": "/components/uni-load-more" }, "usingAutoImportComponents": { "uni-load-more": "/components/uni-load-more/uni-load-more" } }, "pages/message/msgDetail/msgDetail": { "navigationBarTitleText": "详情", "usingComponents": { "u-parse": "/components/uParse/src/wxParse" }, "usingAutoImportComponents": {} }, "pages/message/agreement/agreement": { "navigationBarTitleText": "用户协议", "usingComponents": { "u-parse": "/components/uParse/src/wxParse" }, "usingAutoImportComponents": {} }, "pages/product/productDetail/productDetail": { "navigationBarTitleText": "产品详情", "usingComponents": {}, "usingAutoImportComponents": { "uni-popup": "/components/uni-popup/uni-popup" } }, "pages/product/classify/classify": { "navigationBarTitleText": "产品分类", "usingComponents": { "uni-nav-bar": "/components/uni-nav-bar", "uni-icons": "/components/uni-icon", "no-data": "/components/noData", "uni-load-more": "/components/uni-load-more" }, "usingAutoImportComponents": { "uni-icons": "/components/uni-icons/uni-icons", "uni-load-more": "/components/uni-load-more/uni-load-more" } }, "pages/card/submitOrder": { "navigationBarTitleText": "确定订单", "usingComponents": { "uni-popup": "/components/uni-popup/uni-popup" }, "usingAutoImportComponents": { "uni-popup": "/components/uni-popup/uni-popup" } }, "pages/card/pay": { "navigationBarTitleText": "支付订单", "usingComponents": { "pay": "/components/pay" }, "usingAutoImportComponents": { "pay": "/components/pay/pay" } }, "pages/card/paysuccess": { "navigationBarTitleText": "支付成功", "navigationBarBackgroundColor": "#ff6f00", "navigationBarTextStyle": "white", "usingComponents": {}, "usingAutoImportComponents": {} } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "杜高生物", "navigationBarBackgroundColor": "#FFF", "backgroundColor": "#FFF" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!*****************************************************!*\
  !*** E:/wu3.23/杜高/dugao/pages.json?{"type":"stat"} ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__931CC77" };exports.default = _default;

/***/ }),

/***/ 93:
/*!***********************************************!*\
  !*** E:/wu3.23/杜高/dugao/pages/login/login.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = logins;var _utils = __webpack_require__(/*! @/utils */ 29);
var LoginRequestUrl = "Login/SignIn_New"; //登录接口地址，
var LoginSuccessCode = 0; //登录成功
var LoginNotRegisterCode = 2; //未注册
var LoginfailCode = 1; //登录失败

// params = { success:成功执行的方法}
function logins(params) {
  return new Promise(function (resolve, reject) {
    var ivata = "";
    var encriptData = "";
    uni.showLoading({
      title: "登陆中..." });

    //用户授权登陆，code发送给服务器
    uni.login({
      success: function success(ret) {
        if (!ret.code) {
          uni.hideLoading();
          (0, _utils.toast)('获取授权信息失败');
          reject();
        }
        var code = ret.code; //拿到code进行下一步操作
        uni.setStorageSync("wxCode", ret.code); //*支付*可能要用到的code
        uni.getUserInfo({
          lang: 'zh_CN',
          withCredentials: true,
          success: function success(res) {
            var userInfo = res.userInfo;
            ivata = res.iv;
            encriptData = res.encryptedData;
            //保存用户信息，userInfo对象里面含有用户昵称，用户头像,性别等信息：
            uni.setStorageSync("userInfo", userInfo);
            //userInfo.nickName 用户昵称;
            //userInfo.avatarUrl 用户头像图片的URL;
            //userInfo.gender 用户性别
            uni.request({
              method: "POST",
              //提交数据到服务器，如果没有绑定手机号码，则提示用户需要绑定手机号码
              url: _utils.host + LoginRequestUrl, //请求登录
              data: {
                iv: ivata,
                code: code,
                encryptedData: encriptData },

              header: {
                "content-type": "application/x-www-form-urlencoded" },

              success: function success(res) {
                //后台返回的MemberOpenId,可更改标识
                if (res.data.code === 'undefined' || res.data.code === undefined) {
                  (0, _utils.toast)('登录失败！请重新尝试');
                  reject();
                  return;
                }
                var _res = res.data;
                // 设置一些缓存，注册或者支付要使用的，直接在缓存获取
                uni.setStorageSync("unionid", _res.data.unionid);
                uni.setStorageSync("openId", _res.data.openId);
                // uni.setStorageSync("Token", _res.data.WxToken); //保存的令牌 accessToken
                // 登录成功
                if (_res.code === LoginSuccessCode) {
                  console.log(_res, 'code');
                  uni.setStorageSync("userId", _res.data.UserId); //保存用户Id到本地缓存
                  uni.setStorageSync("token", _res.data.Token); //保存的令牌 accessToken

                  // 自动登录不刷新页面时
                  (0, _utils.toast)('登录成功', { icon: true });
                  // 登录成功执行的方法封装，在index的请求封装，code为2时
                  // params.success&&params.success(res.data)
                  (0, _utils.navigateBack)();
                  resolve(res.data);
                } else
                  //--没有绑定手机，则跳转到绑定手机的页面--看业务需求
                  if (_res.code === LoginNotRegisterCode) {
                    (0, _utils.toast)('请绑定手机号码进行登录！');
                    setTimeout(function () {
                      // 跳转注册
                      (0, _utils.redirect)(_utils.RegisterPath);
                      reject();
                    }, 1500);
                  } else
                    // 登录失败
                    if (_res.code === LoginfailCode) {
                      (0, _utils.toast)('登录失败！请重新尝试');
                      reject();
                    }
                    // 其他
                    else {
                        (0, _utils.toast)('登录失败！请重新尝试');
                        reject();
                      }
              },
              fail: function fail(error) {
                (0, _utils.toast)('登录失败！请重新尝试');
                reject();
              },
              complete: function complete() {
                uni.hideLoading();
              } });


          },
          fail: function fail() {
            uni.hideLoading();
            //   未授权，跳转授权  
            // 可能是自动登录，跳转到登录页面 
            (0, _utils.navigate)(_utils.LoginPath);
            reject();
          } });


      } });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map