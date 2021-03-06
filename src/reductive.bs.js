// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Context$Reductive = require("./context.bs.js");

function create(reducer, preloadedState, enhancer, param) {
  if (enhancer !== undefined) {
    return /* record */[
            /* state */preloadedState,
            /* reducer */reducer,
            /* listeners : [] */0,
            /* customDispatcher */enhancer
          ];
  } else {
    return /* record */[
            /* state */preloadedState,
            /* reducer */reducer,
            /* listeners : [] */0,
            /* customDispatcher */undefined
          ];
  }
}

function unsubscribe(store, listener, param) {
  store[/* listeners */2] = List.filter((function (l) {
            return listener !== l;
          }))(store[/* listeners */2]);
  return /* () */0;
}

function subscribe(store, listener) {
  store[/* listeners */2] = /* :: */[
    listener,
    store[/* listeners */2]
  ];
  return (function (param) {
      return unsubscribe(store, listener, param);
    });
}

function nativeDispatch(store, action) {
  store[/* state */0] = Curry._2(store[/* reducer */1], store[/* state */0], action);
  return List.iter((function (listener) {
                return Curry._1(listener, /* () */0);
              }), store[/* listeners */2]);
}

function dispatch(store, action) {
  var match = store[/* customDispatcher */3];
  if (match !== undefined) {
    return Curry._3(match, store, (function (param) {
                  return nativeDispatch(store, param);
                }), action);
  } else {
    return nativeDispatch(store, action);
  }
}

function getState(store) {
  return store[/* state */0];
}

function replaceReducer(store, reducer) {
  store[/* reducer */1] = reducer;
  return /* () */0;
}

var Store = /* module */[
  /* create */create,
  /* unsubscribe */unsubscribe,
  /* subscribe */subscribe,
  /* nativeDispatch */nativeDispatch,
  /* dispatch */dispatch,
  /* getState */getState,
  /* replaceReducer */replaceReducer
];

function compose(param) {
  return /* () */0;
}

function combineReducers(param) {
  return /* () */0;
}

function applyMiddleware(param) {
  return /* () */0;
}

function bindActionCreators(actions, dispatch) {
  return List.map((function (action, param) {
                return Curry._1(dispatch, action);
              }), actions);
}

function Make(funarg) {
  var defaultValue = funarg[/* store */0];
  var include = Context$Reductive.Make(/* module */[/* defaultValue */defaultValue]);
  var context = include[0];
  var Provider = include[1];
  var Reductive$Make$Provider = function (Props) {
    var children = Props.children;
    return React.createElement(Provider[/* make */0], {
                value: funarg[/* store */0],
                children: children
              });
  };
  var Provider$1 = /* module */[/* make */Reductive$Make$Provider];
  var useSelector = function (selector) {
    var storeFromContext = React.useContext(context);
    var match = React.useReducer((function (s, param) {
            return s + 1 | 0;
          }), 0);
    var forceRerender = match[1];
    var latestSelectedState = React.useRef(undefined);
    var latestSelector = React.useRef(selector);
    React.useLayoutEffect((function () {
            latestSelector.current = selector;
            var newSelectedState = Curry._1(selector, funarg[/* store */0][/* state */0]);
            latestSelectedState.current = Caml_option.some(newSelectedState);
            return undefined;
          }), /* array */[selector]);
    React.useLayoutEffect((function () {
            var checkForUpdates = function (param) {
              var newSelectedState = Curry._1(selector, funarg[/* store */0][/* state */0]);
              var match = latestSelectedState.current;
              var hasStateChanged = match !== undefined ? newSelectedState !== Caml_option.valFromOption(match) : true;
              if (hasStateChanged) {
                latestSelectedState.current = Caml_option.some(newSelectedState);
                return Curry._1(forceRerender, /* () */0);
              } else {
                return 0;
              }
            };
            return subscribe(storeFromContext, checkForUpdates);
          }), /* array */[storeFromContext]);
    var currentStoreState = funarg[/* store */0][/* state */0];
    if (latestSelector.current !== selector) {
      return Curry._1(selector, currentStoreState);
    } else {
      var match$1 = latestSelectedState.current;
      if (match$1 !== undefined) {
        return Caml_option.valFromOption(match$1);
      } else {
        return Curry._1(selector, currentStoreState);
      }
    }
  };
  var useDispatch = function (param) {
    var partial_arg = React.useContext(context);
    return (function (param) {
        return dispatch(partial_arg, param);
      });
  };
  return [
          [context],
          Provider$1,
          useSelector,
          useDispatch
        ];
}

exports.Store = Store;
exports.Make = Make;
exports.compose = compose;
exports.combineReducers = combineReducers;
exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
/* react Not a pure module */
