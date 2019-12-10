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
})({"src/video_writeForm_control.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var modal = document.querySelector(".modal");
var modalCloseBtn = modal.querySelector(".close");
var modalVideo = modal.querySelector(".modalViewer-video");
var player1 = document.querySelector("#player1");
var writeBtn = document.querySelector(".write");
var modal_form = modal.querySelector(".modal-form");
var modal_input = modal_form.querySelector(".modal-input");
var pending = document.querySelector(".pending");
var finished = document.querySelector(".finished");
var movieViewerH2 = document.querySelector(".movieViewer h2");
var movieViewer_default = document.querySelector(".movieViewer-default");
var movieViewer_video = document.querySelector(".movieViewer-video");
var TO_DO_LIST = "toDoList";
var FINISHED_LIST = "finishedList";
var TO_DO_LIST_ARRAY = [];
var FINISHED_LIST_ARRAY = [];
var pendingCount = 1;
var finishedCount = 1;
var addFlag = false;
var finisgedFlag = false;
var VIDOE_SRC_ARRAY = ["https://www.youtube.com/embed/5-sfG8BV8wU?autoplay=1&loop=1&playlist=5-sfG8BV8wU", "https://www.youtube.com/embed/QruaJ8cNNds?autoplay=1&loop=1enablejsapi=1&playlist=QruaJ8cNNds", "https://www.youtube.com/embed/QruaJ8cNNds?mute=1&loop=1&enablejsapi=1&playlist=QruaJ8cNNds"];

var HanndlerMovieViewerH2 = function HanndlerMovieViewerH2() {
  setTimeout(function () {
    var pendingLi = document.querySelectorAll(".pending li");
    var finishedLi = document.querySelectorAll(".finished li");
    var pendingLi_Leng = pendingLi.length;
    var finishedLi_Leng = finishedLi.length;

    if (pendingLi_Leng || finishedLi_Leng) {
      var tempSrc = player1.getAttribute("src");

      if (tempSrc !== VIDOE_SRC_ARRAY[1]) {
        player1.setAttribute("src", VIDOE_SRC_ARRAY[1]);
      }

      movieViewerH2.innerText = "You have ".concat(pendingLi_Leng, " list and ").concat(finishedLi_Leng, " finished list.");
      movieViewer_video.classList.add("dp-block");
      movieViewer_default.classList.remove("dp-block");
    } else {
      player1.setAttribute("src", VIDOE_SRC_ARRAY[2]);
      movieViewerH2.innerText = "Add Do it list.";
      movieViewer_default.classList.add("dp-block");
      movieViewer_video.classList.remove("dp-block");
    }
  }, 0);
};

var addList = function addList(obj) {
  var li = document.createElement("li");
  var xBtn = document.createElement("span");
  var fBtn = document.createElement("span");
  var text = obj.text,
      id = obj.id;

  if (addFlag) {} else {
    TO_DO_LIST_ARRAY.push(obj);
    addFlag = false;
  }

  xBtn.innerText = "❌";
  fBtn.innerText = "✔";
  li.id = id;
  li.className = "pending-li";
  xBtn.className = "cursor x-btn";
  fBtn.className = "cursor f-btn";
  li.innerText = "".concat(pendingCount, ". ").concat(text);
  li.appendChild(xBtn);
  li.appendChild(fBtn);
  pending.appendChild(li);
  pendingCount++;
  modal_input.value = "";
  xBtn.addEventListener("click", deletePending);
  fBtn.addEventListener("click", moveToFinished);
};

var handlerModalClose = function handlerModalClose() {
  setTimeout(function () {
    HanndlerMovieViewerH2();
    modalVideo.setAttribute("src", "");
    modal.className = "dp-none";
    movieViewer_video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
  }, 0);
};

var handlerWriteBtn = function handlerWriteBtn() {
  modalVideo.setAttribute("src", VIDOE_SRC_ARRAY[0]);
  modal.className = "modal";
  movieViewer_video.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
};

var handlerModal_form = function handlerModal_form(e) {
  e.preventDefault();
  var todo = modal_input.value;
  var TO_DO_LIST_OBJ = getLocalStorage();

  if (TO_DO_LIST_OBJ) {
    var TO_DO_LIST_OBJ_LEN = TO_DO_LIST_OBJ.length;
  }

  if (todo) {
    setLocalStorageOne(todo);
    var lastObj = getLocalStorage();
    lastObj = lastObj[lastObj.length - 1];
    addFlag = true;
    addList(lastObj);
    handlerModalClose();
  } else {
    alert("You must write to do list!");
  }
};

var setLocalStorageOne = function setLocalStorageOne(text) {
  var listID = new Date().valueOf();
  var getObj = getLocalStorage();
  getObj ? TO_DO_LIST_ARRAY = _toConsumableArray(getObj) : TO_DO_LIST_ARRAY;
  TO_DO_LIST_ARRAY.push({
    id: listID,
    text: text
  });
  localStorage.setItem(TO_DO_LIST, JSON.stringify(TO_DO_LIST_ARRAY));
}; // const setLocalStorage = function(text) {
//    const listID = new Date().valueOf();
//    TO_DO_LIST_ARRAY.push({ id: listID, text: text });
//    localStorage.setItem(TO_DO_LIST, JSON.stringify(TO_DO_LIST_ARRAY));
// };


var getLocalStorage = function getLocalStorage() {
  var resultObj = localStorage.getItem(TO_DO_LIST);
  return JSON.parse(resultObj);
};

function loadToDos() {
  var loadedToDos = localStorage.getItem(TO_DO_LIST);
  var loadedFinished = localStorage.getItem(FINISHED_LIST);

  if (loadedToDos !== null) {
    var parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function (toDo) {
      addList(toDo);
    });
  }

  if (loadedFinished !== null) {
    var _parseToDos = JSON.parse(loadedFinished);

    _parseToDos.forEach(function (toDo) {
      paintFinised(toDo);
    });
  }
}

function paintFinised(obj) {
  var li = document.createElement("li");
  var f_xBtn = document.createElement("span");
  var f_fBtn = document.createElement("span");
  var text = obj.text,
      id = obj.id;

  if (finisgedFlag) {} else {
    FINISHED_LIST_ARRAY.push(obj);
    finisgedFlag = false;
  }

  f_xBtn.innerText = "❌";
  f_fBtn.innerText = "⏏";
  li.id = id;
  li.className = "pending-li";
  f_xBtn.className = "cursor x-btn";
  f_fBtn.className = "cursor f-btn";
  li.innerText = "".concat(finishedCount, ". ").concat(text);
  li.appendChild(f_xBtn);
  li.appendChild(f_fBtn);
  finished.appendChild(li);
  finishedCount++;
  modal_input.value = "";
  f_xBtn.addEventListener("click", deleteFinished);
  f_fBtn.addEventListener("click", moveToPending);
}

function moveToFinished(e) {
  addFinished(e);
  resetFinishedLi();
  FINISHED_LIST_ARRAY.forEach(function (item) {
    finisgedFlag = true;
    paintFinised(item);
  }); // FINISHED_LIST_ARRAY.push();
}

function moveToPending(e) {
  addPending(e);
  resetPendingLi();
  TO_DO_LIST_ARRAY.forEach(function (item) {
    addFlag = true;
    addList(item);
  }); // FINISHED_LIST_ARRAY.push();
}

function addPending(e) {
  var btn = e.target;
  var li = btn.parentNode; // pending.removeChild(li);

  var addPendingdDos = FINISHED_LIST_ARRAY.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  TO_DO_LIST_ARRAY = TO_DO_LIST_ARRAY.concat(addPendingdDos);
  saveToDos();
  var clenToFinished = FINISHED_LIST_ARRAY.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  FINISHED_LIST_ARRAY = clenToFinished;
  saveFinished(); // saveFinished();
  // pendingCount--;

  resetFinishedLi();
  FINISHED_LIST_ARRAY.forEach(function (toDo) {
    finisgedFlag = true;
    paintFinised(toDo);
  });
  HanndlerMovieViewerH2();
}

function saveFinished() {
  localStorage.setItem(FINISHED_LIST, JSON.stringify(FINISHED_LIST_ARRAY));
}

function saveToDos() {
  localStorage.setItem(TO_DO_LIST, JSON.stringify(TO_DO_LIST_ARRAY));
}

function addFinished(e) {
  var btn = e.target;
  var li = btn.parentNode; // pending.removeChild(li);

  var addFinishedDos = TO_DO_LIST_ARRAY.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  FINISHED_LIST_ARRAY = FINISHED_LIST_ARRAY.concat(addFinishedDos);
  saveFinished();
  var clenToDos = TO_DO_LIST_ARRAY.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  TO_DO_LIST_ARRAY = clenToDos;
  saveToDos(); // saveFinished();
  // pendingCount--;

  resetPendingLi();
  TO_DO_LIST_ARRAY.forEach(function (toDo) {
    addFlag = true;
    addList(toDo);
  });
  HanndlerMovieViewerH2();
}

function resetPendingLi() {
  // const pending_li = document.quey
  while (pending.childElementCount) {
    pending.removeChild(pending.lastChild);
  }

  pendingCount = 1;
}

function resetFinishedLi() {
  while (finished.childElementCount) {
    finished.removeChild(finished.lastChild);
  }

  finishedCount = 1;
}

function deletePending(e) {
  var btn = e.target;
  var li = btn.parentNode; // pending.removeChild(li);

  var clenToDos = TO_DO_LIST_ARRAY.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  TO_DO_LIST_ARRAY = clenToDos;
  saveToDos(); // pendingCount--;

  resetPendingLi();
  TO_DO_LIST_ARRAY.forEach(function (item) {
    addFlag = true;
    addList(item);
  });
  HanndlerMovieViewerH2();
}

function deleteFinished(e) {
  var btn = e.target;
  var li = btn.parentNode; // finished.removeChild(li);

  var clenFinished = FINISHED_LIST_ARRAY.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  FINISHED_LIST_ARRAY = clenFinished;
  saveFinished(); // finishedCount--;

  resetFinishedLi();
  FINISHED_LIST_ARRAY.forEach(function (item) {
    finisgedFlag = true;
    paintFinised(item);
  });
  HanndlerMovieViewerH2();
}

var init = function init() {
  loadToDos();
  modalCloseBtn.addEventListener("click", handlerModalClose);
  writeBtn.addEventListener("click", handlerWriteBtn);
  modal_form.addEventListener("submit", handlerModal_form);
};

init();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "5073" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/video_writeForm_control.js"], null)
//# sourceMappingURL=/video_writeForm_control.163f8320.js.map