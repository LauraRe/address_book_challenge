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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/path-to-regexp/index.js":
/*!**********************************************!*\
  !*** ./node_modules/path-to-regexp/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isarray = __webpack_require__(/*! isarray */ \"./node_modules/path-to-regexp/node_modules/isarray/index.js\")\n\n/**\n * Expose `pathToRegexp`.\n */\nmodule.exports = pathToRegexp\nmodule.exports.parse = parse\nmodule.exports.compile = compile\nmodule.exports.tokensToFunction = tokensToFunction\nmodule.exports.tokensToRegExp = tokensToRegExp\n\n/**\n * The main path matching regexp utility.\n *\n * @type {RegExp}\n */\nvar PATH_REGEXP = new RegExp([\n  // Match escaped characters that would otherwise appear in future matches.\n  // This allows the user to escape special characters that won't transform.\n  '(\\\\\\\\.)',\n  // Match Express-style parameters and un-named parameters with a prefix\n  // and optional suffixes. Matches appear as:\n  //\n  // \"/:test(\\\\d+)?\" => [\"/\", \"test\", \"\\d+\", undefined, \"?\", undefined]\n  // \"/route(\\\\d+)\"  => [undefined, undefined, undefined, \"\\d+\", undefined, undefined]\n  // \"/*\"            => [\"/\", undefined, undefined, undefined, undefined, \"*\"]\n  '([\\\\/.])?(?:(?:\\\\:(\\\\w+)(?:\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))?|\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))([+*?])?|(\\\\*))'\n].join('|'), 'g')\n\n/**\n * Parse a string for the raw tokens.\n *\n * @param  {string}  str\n * @param  {Object=} options\n * @return {!Array}\n */\nfunction parse (str, options) {\n  var tokens = []\n  var key = 0\n  var index = 0\n  var path = ''\n  var defaultDelimiter = options && options.delimiter || '/'\n  var res\n\n  while ((res = PATH_REGEXP.exec(str)) != null) {\n    var m = res[0]\n    var escaped = res[1]\n    var offset = res.index\n    path += str.slice(index, offset)\n    index = offset + m.length\n\n    // Ignore already escaped sequences.\n    if (escaped) {\n      path += escaped[1]\n      continue\n    }\n\n    var next = str[index]\n    var prefix = res[2]\n    var name = res[3]\n    var capture = res[4]\n    var group = res[5]\n    var modifier = res[6]\n    var asterisk = res[7]\n\n    // Push the current path onto the tokens.\n    if (path) {\n      tokens.push(path)\n      path = ''\n    }\n\n    var partial = prefix != null && next != null && next !== prefix\n    var repeat = modifier === '+' || modifier === '*'\n    var optional = modifier === '?' || modifier === '*'\n    var delimiter = res[2] || defaultDelimiter\n    var pattern = capture || group\n\n    tokens.push({\n      name: name || key++,\n      prefix: prefix || '',\n      delimiter: delimiter,\n      optional: optional,\n      repeat: repeat,\n      partial: partial,\n      asterisk: !!asterisk,\n      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')\n    })\n  }\n\n  // Match any characters still remaining.\n  if (index < str.length) {\n    path += str.substr(index)\n  }\n\n  // If the path exists, push it onto the end.\n  if (path) {\n    tokens.push(path)\n  }\n\n  return tokens\n}\n\n/**\n * Compile a string to a template function for the path.\n *\n * @param  {string}             str\n * @param  {Object=}            options\n * @return {!function(Object=, Object=)}\n */\nfunction compile (str, options) {\n  return tokensToFunction(parse(str, options))\n}\n\n/**\n * Prettier encoding of URI path segments.\n *\n * @param  {string}\n * @return {string}\n */\nfunction encodeURIComponentPretty (str) {\n  return encodeURI(str).replace(/[\\/?#]/g, function (c) {\n    return '%' + c.charCodeAt(0).toString(16).toUpperCase()\n  })\n}\n\n/**\n * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.\n *\n * @param  {string}\n * @return {string}\n */\nfunction encodeAsterisk (str) {\n  return encodeURI(str).replace(/[?#]/g, function (c) {\n    return '%' + c.charCodeAt(0).toString(16).toUpperCase()\n  })\n}\n\n/**\n * Expose a method for transforming tokens into the path function.\n */\nfunction tokensToFunction (tokens) {\n  // Compile all the tokens into regexps.\n  var matches = new Array(tokens.length)\n\n  // Compile all the patterns before compilation.\n  for (var i = 0; i < tokens.length; i++) {\n    if (typeof tokens[i] === 'object') {\n      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')\n    }\n  }\n\n  return function (obj, opts) {\n    var path = ''\n    var data = obj || {}\n    var options = opts || {}\n    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent\n\n    for (var i = 0; i < tokens.length; i++) {\n      var token = tokens[i]\n\n      if (typeof token === 'string') {\n        path += token\n\n        continue\n      }\n\n      var value = data[token.name]\n      var segment\n\n      if (value == null) {\n        if (token.optional) {\n          // Prepend partial segment prefixes.\n          if (token.partial) {\n            path += token.prefix\n          }\n\n          continue\n        } else {\n          throw new TypeError('Expected \"' + token.name + '\" to be defined')\n        }\n      }\n\n      if (isarray(value)) {\n        if (!token.repeat) {\n          throw new TypeError('Expected \"' + token.name + '\" to not repeat, but received `' + JSON.stringify(value) + '`')\n        }\n\n        if (value.length === 0) {\n          if (token.optional) {\n            continue\n          } else {\n            throw new TypeError('Expected \"' + token.name + '\" to not be empty')\n          }\n        }\n\n        for (var j = 0; j < value.length; j++) {\n          segment = encode(value[j])\n\n          if (!matches[i].test(segment)) {\n            throw new TypeError('Expected all \"' + token.name + '\" to match \"' + token.pattern + '\", but received `' + JSON.stringify(segment) + '`')\n          }\n\n          path += (j === 0 ? token.prefix : token.delimiter) + segment\n        }\n\n        continue\n      }\n\n      segment = token.asterisk ? encodeAsterisk(value) : encode(value)\n\n      if (!matches[i].test(segment)) {\n        throw new TypeError('Expected \"' + token.name + '\" to match \"' + token.pattern + '\", but received \"' + segment + '\"')\n      }\n\n      path += token.prefix + segment\n    }\n\n    return path\n  }\n}\n\n/**\n * Escape a regular expression string.\n *\n * @param  {string} str\n * @return {string}\n */\nfunction escapeString (str) {\n  return str.replace(/([.+*?=^!:${}()[\\]|\\/\\\\])/g, '\\\\$1')\n}\n\n/**\n * Escape the capturing group by escaping special characters and meaning.\n *\n * @param  {string} group\n * @return {string}\n */\nfunction escapeGroup (group) {\n  return group.replace(/([=!:$\\/()])/g, '\\\\$1')\n}\n\n/**\n * Attach the keys as a property of the regexp.\n *\n * @param  {!RegExp} re\n * @param  {Array}   keys\n * @return {!RegExp}\n */\nfunction attachKeys (re, keys) {\n  re.keys = keys\n  return re\n}\n\n/**\n * Get the flags for a regexp from the options.\n *\n * @param  {Object} options\n * @return {string}\n */\nfunction flags (options) {\n  return options.sensitive ? '' : 'i'\n}\n\n/**\n * Pull out keys from a regexp.\n *\n * @param  {!RegExp} path\n * @param  {!Array}  keys\n * @return {!RegExp}\n */\nfunction regexpToRegexp (path, keys) {\n  // Use a negative lookahead to match only capturing groups.\n  var groups = path.source.match(/\\((?!\\?)/g)\n\n  if (groups) {\n    for (var i = 0; i < groups.length; i++) {\n      keys.push({\n        name: i,\n        prefix: null,\n        delimiter: null,\n        optional: false,\n        repeat: false,\n        partial: false,\n        asterisk: false,\n        pattern: null\n      })\n    }\n  }\n\n  return attachKeys(path, keys)\n}\n\n/**\n * Transform an array into a regexp.\n *\n * @param  {!Array}  path\n * @param  {Array}   keys\n * @param  {!Object} options\n * @return {!RegExp}\n */\nfunction arrayToRegexp (path, keys, options) {\n  var parts = []\n\n  for (var i = 0; i < path.length; i++) {\n    parts.push(pathToRegexp(path[i], keys, options).source)\n  }\n\n  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))\n\n  return attachKeys(regexp, keys)\n}\n\n/**\n * Create a path regexp from string input.\n *\n * @param  {string}  path\n * @param  {!Array}  keys\n * @param  {!Object} options\n * @return {!RegExp}\n */\nfunction stringToRegexp (path, keys, options) {\n  return tokensToRegExp(parse(path, options), keys, options)\n}\n\n/**\n * Expose a function for taking tokens and returning a RegExp.\n *\n * @param  {!Array}          tokens\n * @param  {(Array|Object)=} keys\n * @param  {Object=}         options\n * @return {!RegExp}\n */\nfunction tokensToRegExp (tokens, keys, options) {\n  if (!isarray(keys)) {\n    options = /** @type {!Object} */ (keys || options)\n    keys = []\n  }\n\n  options = options || {}\n\n  var strict = options.strict\n  var end = options.end !== false\n  var route = ''\n\n  // Iterate over the tokens and create our regexp string.\n  for (var i = 0; i < tokens.length; i++) {\n    var token = tokens[i]\n\n    if (typeof token === 'string') {\n      route += escapeString(token)\n    } else {\n      var prefix = escapeString(token.prefix)\n      var capture = '(?:' + token.pattern + ')'\n\n      keys.push(token)\n\n      if (token.repeat) {\n        capture += '(?:' + prefix + capture + ')*'\n      }\n\n      if (token.optional) {\n        if (!token.partial) {\n          capture = '(?:' + prefix + '(' + capture + '))?'\n        } else {\n          capture = prefix + '(' + capture + ')?'\n        }\n      } else {\n        capture = prefix + '(' + capture + ')'\n      }\n\n      route += capture\n    }\n  }\n\n  var delimiter = escapeString(options.delimiter || '/')\n  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter\n\n  // In non-strict mode we allow a slash at the end of match. If the path to\n  // match already ends with a slash, we remove it for consistency. The slash\n  // is valid at the end of a path match, not in the middle. This is important\n  // in non-ending mode, where \"/test/\" shouldn't match \"/test//route\".\n  if (!strict) {\n    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'\n  }\n\n  if (end) {\n    route += '$'\n  } else {\n    // In non-ending mode, we need the capturing groups to match as much as\n    // possible by using a positive lookahead to the end or next path segment.\n    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'\n  }\n\n  return attachKeys(new RegExp('^' + route, flags(options)), keys)\n}\n\n/**\n * Normalize the given path string, returning a regular expression.\n *\n * An empty array can be passed in for the keys, which will hold the\n * placeholder key descriptions. For example, using `/user/:id`, `keys` will\n * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.\n *\n * @param  {(string|RegExp|Array)} path\n * @param  {(Array|Object)=}       keys\n * @param  {Object=}               options\n * @return {!RegExp}\n */\nfunction pathToRegexp (path, keys, options) {\n  if (!isarray(keys)) {\n    options = /** @type {!Object} */ (keys || options)\n    keys = []\n  }\n\n  options = options || {}\n\n  if (path instanceof RegExp) {\n    return regexpToRegexp(path, /** @type {!Array} */ (keys))\n  }\n\n  if (isarray(path)) {\n    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)\n  }\n\n  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)\n}\n\n\n//# sourceURL=webpack:///./node_modules/path-to-regexp/index.js?");

/***/ }),

/***/ "./node_modules/path-to-regexp/node_modules/isarray/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/path-to-regexp/node_modules/isarray/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = Array.isArray || function (arr) {\n  return Object.prototype.toString.call(arr) == '[object Array]';\n};\n\n\n//# sourceURL=webpack:///./node_modules/path-to-regexp/node_modules/isarray/index.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _pathToRegexp = __webpack_require__(/*! path-to-regexp */ \"./node_modules/path-to-regexp/index.js\");\n\nvar storage = window.localStorage;\n\nvar renderContacts = function renderContacts() {\n    var contacts = JSON.parse(storage.getItem('contacts'));\n    var div = document.querySelector('.contact-list');\n\n    if (contacts && contacts.length > 0) {\n        div.innerHTML = '';\n        var ul = document.createElement('ul');\n        contacts.forEach(function (contact) {\n            var li = document.createElement('li');\n            li.innerHTML = '\\n            <div class=\"card\">\\n                <div id=\"' + contact.id + '\" class=\"content\">\\n                    <img class=\"image block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0\" src=\"https://pngimage.net/wp-content/uploads/2018/06/login-icon-vector-png-5.png\" alt=\"Portrait_Placeholder\">\\n                    <h1>' + contact.name + '</h1>\\n                    <h2>' + contact.company + '</h2>\\n                    <p>' + contact.notes + '</p>\\n                    ' + contact.email + '\\n                    <button class=\"delete-contact\">Delete Contact</button>\\n                    <a href=\"https://www.twitter.com/' + contact.twitter + '\">@' + contact.twitter + '</a>\\n                </div>\\n            </div>\\n            ';\n            ul.appendChild(li);\n            var delete_button = li.querySelector('.delete-contact');\n            delete_button.addEventListener('click', function (event) {\n                var id = event.target.parentNode.id;\n                var contacts = JSON.parse(storage.getItem('contacts')) || [];\n                debugger;\n                contacts.forEach(function (contact) {\n                    contact.id == id ? contacts.splice(contacts.indexOf(contact), 1) : false;\n                });\n\n                console.log(contacts);\n\n                storage.setItem('contacts', JSON.stringify(contacts));\n                renderContacts();\n            });\n        });\n        div.appendChild(ul);\n    } else {\n        div.innerHTML = '<p>You have no contacts in your address book</p>';\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    renderContacts();\n    debugger;\n    var addContactForm = document.querySelector('.new-contact-form');\n\n    addContactForm.addEventListener('submit', function (event) {\n        event.preventDefault();\n\n        var storage = window.localStorage;\n\n        var _addContactForm$eleme = addContactForm.elements,\n            name = _addContactForm$eleme.name,\n            email = _addContactForm$eleme.email,\n            phone = _addContactForm$eleme.phone,\n            company = _addContactForm$eleme.company,\n            notes = _addContactForm$eleme.notes,\n            twitter = _addContactForm$eleme.twitter;\n\n\n        var contact = {\n            id: Date.now(),\n            name: name.value,\n            email: email.value,\n            phone: phone.value,\n            company: company.value,\n            notes: notes.value,\n            twitter: twitter.value\n\n            //console.log(`Saving the following contact: ${JSON.stringify(contact)}`)\n        };var contacts = JSON.parse(storage.getItem('contacts')) || [];\n        contacts.push(contact);\n        storage.setItem('contacts', JSON.stringify(contacts));\n        renderContacts();\n        addContactForm.reset();\n    });\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });