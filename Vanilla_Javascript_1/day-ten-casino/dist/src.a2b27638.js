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
},{"./img\\cardSharp.jpg":[["cardSharp.aaf1560a.jpg","src/img/cardSharp.jpg"],"src/img/cardSharp.jpg"],"./img\\goni.jpg":[["goni.70321d8c.jpg","src/img/goni.jpg"],"src/img/goni.jpg"],"./img\\madam.jpg":[["madam.148b3edb.jpg","src/img/madam.jpg"],"src/img/madam.jpg"],"./img\\allIn.jpg":[["allIn.074e3f18.jpg","src/img/allIn.jpg"],"src/img/allIn.jpg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

// <⚠️ DONT DELETE THIS ⚠️>
// <⚠️ /DONT DELETE THIS ⚠️>
// Refer to
// Rage Sliders
// https://www.w3schools.com/howto/howto_js_rangeslider.asp
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
// YouTube
// https://stackoverflow.com/questions/25684693/where-to-pass-arguments-of-postmessage-command-to-youtube-iframe
// global
var slider = document.getElementById("myRange");
var rangeValue = document.getElementById("rangeValue");
var cardSharpChose = document.querySelector(".card-sharp-chose span");
var playerInput_form = document.querySelector(".playerInput-form");
var playerInput = playerInput_form.querySelector(".playerInput");
var contents_img = document.querySelector(".contents-img");
var contents_video = document.querySelector(".contents_video");
var contents_video_iframe = contents_video.querySelector("iframe");
var contents_video_winVideo = contents_video.querySelector(".winVidoe");
var contents_video_loseVideo = contents_video.querySelector(".loseVidoe");
var g_randomNumber = null;
var loseVidoeSrcArry = ["https://www.youtube.com/embed/SQJknkRiZRk?start=0&enablejsapi=1&loop=1&autoplay=1&playlist=SQJknkRiZRk", "https://www.youtube.com/embed/x-YnH-u_DE8?start=0&enablejsapi=1&loop=1&autoplay=1&playlist=x-YnH-u_DE8", "https://www.youtube.com/embed/XtqIpsPf5Mg?start=0&enablejsapi=1&loop=1&autoplay=1&playlist=XtqIpsPf5Mg", "https://www.youtube.com/embed/n1jEDms_n6w?start=0&enablejsapi=1&loop=1&autoplay=1&playlist=n1jEDms_n6w", "https://www.youtube.com/embed/p0vipc65p9k?start=7&enablejsapi=1&loop=1&autoplay=1&playlist=p0vipc65p9k"];
var winVidoeSrcArry = ["https://www.youtube.com/embed/5aqgSp816IA?start=53&enablejsapi=1&loop=1&autoplay=1&playlist=5aqgSp816IA", "https://www.youtube.com/embed/-DIivZITQzo?start=41&enablejsapi=1&loop=1&autoplay=1&playlist=-DIivZITQzo", "https://www.youtube.com/embed/Q9oat_q3UqQ?start=738&enablejsapi=1&loop=1&autoplay=1&playlist=Q9oat_q3UqQ", "https://www.youtube.com/embed/g16mjNRXVY4?start=33&enablejsapi=1&loop=1&autoplay=1&playlist=-DIivZITQzo", "https://www.youtube.com/embed/z7r0DIjRGd4?start=82&enablejsapi=1&loop=1&autoplay=1&playlist=-DIivZITQzo"]; //  slider

slider.addEventListener("input", function () {
  printRangeValue();
  printCardSharpChose();
});

function printRangeValue() {
  rangeValue.innerHTML = slider.value;
}

function printCardSharpChose() {
  g_randomNumber = randomNumberGenerate(slider.value);
  cardSharpChose.innerText = g_randomNumber;
} // player
// 손목걸기


function handlerPlayerInputform(e) {
  e.preventDefault();
  var number = parseInt(playerInput.value, 10);
  var sliderNumber = parseInt(slider.value, 10);

  if (number < 0 || number > sliderNumber) {
    contents_video.classList.add("dp-none");
    contents_video_iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    contents_video_winVideo.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    contents_video_loseVideo.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    contents_img.className = "contents-img wrongValue dp-block";
    return;
  }

  if (!isNaN(number)) {
    var correctBool = compareCorrect();
    printCardSharpChose();
    contents_img.classList.remove("noValue", "dp-block");

    if (correctBool) {
      // debugger;
      // let data1 = { event: "command", func: "seekTo", args: [53, true] };
      // let message1 = JSON.stringify(data1);
      // contents_video_winVideo.contentWindow.postMessage(
      //    '{"event":"command","func":"stopVideo","args":""}',
      //    "*"
      // );
      contents_video.className = "contents_video win";
      contents_video_iframe.className = "dp-none";
      contents_video_loseVideo.className = "loseVidoe dp-none";
      contents_video_winVideo.className = "winVidoe dp-block";
      contents_video_iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
      contents_video_loseVideo.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*"); // contents_video_winVideo.contentWindow.postMessage(message1, "*");

      var rNumber = randomNumberGenerate(4);
      contents_video_winVideo.setAttribute("src", winVidoeSrcArry[rNumber]);
    } else {
      // let data = { event: "command", func: "seekTo", args: [0, true] };
      // let message = JSON.stringify(data);
      contents_video.className = "contents_video lose";
      contents_video_iframe.className = "dp-none";
      contents_video_winVideo.className = "winVidoe dp-none";
      contents_video_loseVideo.className = "loseVideo db-block";
      contents_video_iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
      contents_video_winVideo.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*"); // contents_video_loseVideo.contentWindow.postMessage(message, "*");
      // contents_video_loseVideo.contentWindow.postMessage(
      //    '{"event":"command","func":"playVideo","args":""}',
      //    "*"
      // );

      var _rNumber = randomNumberGenerate(4);

      contents_video_loseVideo.setAttribute("src", loseVidoeSrcArry[_rNumber]);
    }
  } else {
    contents_video_iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    contents_video_winVideo.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    contents_video_loseVideo.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    contents_video.classList.add("dp-none"); // contents_img.classList.add("noValue", "dp-block");

    contents_img.className = "contents-img dp-block noValue";
  }
} // common
// compare CardSharp and player Value


function compareCorrect() {
  var playerValue = parseInt(playerInput.value, 10);

  if (playerValue === g_randomNumber) {
    return true;
  } else {
    return false;
  }
} // randomNumberGenerate


function randomNumberGenerate(p_number) {
  var number = parseInt(p_number);
  return Math.round(Math.random() * number);
} // init


function init() {
  printRangeValue();
  printCardSharpChose();
  playerInput_form.addEventListener("submit", handlerPlayerInputform);
}

init();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "4321" + '/');

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