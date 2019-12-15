// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./img\\bg-01.jpg":[["bg-01.69755dd8.jpg","src/img/bg-01.jpg"],"src/img/bg-01.jpg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

// <⚠️ DONT DELETE THIS ⚠️>
// <⚠️ /DONT DELETE THIS ⚠️>
// Refer to
// white space
// https://www.codingfactory.net/10597
// ellipsis
// https://jos39.tistory.com/211
// g-value
var g_previousResult = document.querySelector(".previousResult");
var g_nowResult = document.querySelector(".nowResult");
var clickPad = document.querySelectorAll(".clickPad");
var calculaotr = {
  previousResult: "",
  nowResult: "",
  operandResult: "",
  operatorResult: "",
  operand: [0],
  operator: [],
  numberArray: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  lastInput: "operand",
  inputNum: 0,
  checkFirstClick: true
};
var tempOperand = ""; // function
// inputFunction

function inputF(e) {
  // console.log(e.currentTarget.innerText);
  var whatIsIt = e.currentTarget.innerText;
  var numberArray = calculaotr.numberArray;
  var operandResult = calculaotr.operandResult,
      operatorResult = calculaotr.operatorResult,
      operand = calculaotr.operand,
      operator = calculaotr.operator,
      lastInput = calculaotr.lastInput,
      inputNum = calculaotr.inputNum,
      checkFirstClick = calculaotr.checkFirstClick,
      previousResult = calculaotr.previousResult,
      nowResult = calculaotr.nowResult; // calculaotr
  // console.log(whatIsIt);
  // console.log(typeof whatIsIt);
  // console.log(numberArray.indexOf(whatIsIt));

  if (numberArray.indexOf(whatIsIt) !== -1) {
    // number
    if (checkFirstClick) {
      operand.pop();
    }

    console.log("첫번쨰");
    tempOperand += whatIsIt;
    if (tempOperand === '0') return tempOperand = "";
    console.log(tempOperand);
    operand.push(parseFloat(whatIsIt));
    console.log(operand);
    console.log(operator);
    calculaotr.inputNum++; // if ((calculaotr.lastInput === "operand")) {
    //    calculaotr.nowResult = tempOperand;
    // } else {
    //    calculaotr.nowResult += tempOperand;
    // }
    // operatorResult
    // debugger;

    if (lastInput === "operand") {
      if (tempOperand.length > 1) {
        operandResult = tempOperand.slice(tempOperand.length - 1);
      } else {
        operandResult = tempOperand;
      }
    } else {
      operandResult = tempOperand;
    }

    calculaotr.nowResult += operandResult;
    calculaotr.lastInput = "operand";
  } else {
    // debugger;
    // operator or C or =
    if (whatIsIt === "C") {
      // all reset
      tempOperand = "";
      operandResult = "";
      operatorResult = "";
      calculaotr.previousResult = "";
      calculaotr.nowResult = "";
      calculaotr.operand = [0];
      calculaotr.operator = [];
      calculaotr.lastInput = "operand";
      calculaotr.inputNum = 0;
      calculaotr.checkFirstClick = true;
      g_nowResult.innerText = 0;
      g_previousResult.innerText = "";
      return;
    } else if (whatIsIt === "=") {
      g_previousResult.innerText = nowResult + " =";
      g_nowResult.innerText = "" + eval(nowResult);
      tempOperand = "";
      operandResult = "";
      operatorResult = "";
      calculaotr.previousResult = ""; // calculaotr.nowResult = "";

      calculaotr.operand = [0];
      calculaotr.operator = [];
      calculaotr.lastInput = "operand";
      calculaotr.inputNum = 0; // calculaotr.checkFirstClick = true;
      // g_nowResult.innerText = 0;

      return;
    }

    if (lastInput === "operator") {
      operator.pop();
    }

    console.log("두번째");

    if (inputNum > 0) {
      for (var i = 0; i < inputNum; i++) {
        calculaotr.operand.pop();
      }

      operand.push(parseFloat(tempOperand));
    }

    operator.push(whatIsIt);
    console.log(operand);
    console.log(operator);
    calculaotr.inputNum = 0;
    tempOperand = "";
    calculaotr.lastInput = "operator";

    if (checkFirstClick) {
      if (lastInput === "operator") {
        calculaotr.nowResult = calculaotr.nowResult.slice(0, nowResult.length - 3);
      }

      calculaotr.nowResult += "0 " + operator[operator.length - 1] + " ";
    } else {
      if (lastInput === "operator") {
        calculaotr.nowResult = calculaotr.nowResult.slice(0, nowResult.length - 3);
      }

      calculaotr.nowResult += " " + operator[operator.length - 1] + " ";
    } // 앞에 + - 고 뒤에 * / 면 먼저계산안해주고
    // 앞에 + - 고 뒤에 + - 면 먼저거 계산
    // 앞에 * / 고 뒤에 + - 면 먼저거 계산
    // 앞에 * / 고 뒤에 * / 면 먼저거 계산


    if (operator.length > 1) {
      if ((operator[operator.length - 1] == "*" || operator[operator.length - 1] == "/") && (operator[operator.length - 2] == "+" || operator[operator.length - 2] == "-")) {
        // 먼저 계산 안해주는곳
        console.log("먼저 계산 X");
      } else {
        // debugger;
        // 먼저 계산 해주는곳
        console.log("먼저 계산 O");
        g_previousResult.innerText = g_nowResult.innerText + ' ' + operator[operator.length - 1];
        g_nowResult.innerText = "" + eval(nowResult);
        calculaotr.operator = [];
        return;
      }
    }
  }

  console.log("");
  calculaotr.checkFirstClick = false;
  g_nowResult.innerText = calculaotr.nowResult;
  console.log("nowResult", calculaotr.nowResult);
} // handlerBind


clickPad.forEach(function (clickPad) {
  clickPad.addEventListener("click", inputF);
}); // init

function init() {}

init(); // 초기값은 0
// 수 연산자 수 연산자 앞에 연산자가있으면
// 수 연산자 수 를 계한후 하나로 통합 + 연산자
//  previousResult 3 + 3 +
//  nowResult 6
// 숫자 6
// 연산자 +
// 연산자가 2개일때 + - 보다 * / 를 먼저해야함
// 변수 +,- 변수 * / 일때는 계산 바로안한고
// 4 + 2 + 3
// 1. 4 + 2
// 2. +누르는순간(*,/)아니니까
// 3. 4+2+ 가위로가고
// 4. 6은 아래로
// 4 + 2 * 3
// 4 + 2
// 4 + 2 *
// 3
// 그리고 다음 연산자가 눌리면 2 * 3을 먼저 계산
// 6 + 3 * 4 + 1
// 암튼 * / 우선 연산해주게 해야한는데 복잡하니까
// 그냥 연산자 2번째꺼일때 계산해주자...
// 앞에 + - 고 뒤에 * / 면 먼저계산안해주고
// 앞에 + - 고 뒤에 + - 면 먼저거 계산
// 앞에 * / 고 뒤에 + - 면 먼저거 계산
// 앞에 * / 고 뒤에 * / 면 먼저거 계산
},{"./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "12196" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map