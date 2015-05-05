/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************************!*\
  !*** ./public/js/application.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! neon */ 19);
	__webpack_require__(/*! neon/stdlib */ 16);
	
	var jQuery = __webpack_require__(/*! ./vendor/jquery-2.0.3.js */ 1);
	window.jQuery = jQuery;
	window.$ = jQuery;
	
	// our namespace
	window.CV = {};
	
	__webpack_require__(/*! ../../lib/js/widget-utils.js */ 15);
	__webpack_require__(/*! ./vendor/Widget.js */ 2);
	
	window.validate = __webpack_require__(/*! validate */ 3);
	window.soundManager = __webpack_require__(/*! SoundManager2 */ 20).soundManager;
	
	__webpack_require__(/*! ./../css/style.less */ 17);
	
	__webpack_require__(/*! ./widgets/card.js */ 4);
	__webpack_require__(/*! ./widgets/voice-cover.js */ 5);
	__webpack_require__(/*! ./widgets/responsive-slider.js */ 6);
	__webpack_require__(/*! ./widgets/category-cover.js */ 7);
	
	__webpack_require__(/*! ./widgets/post.js */ 8);
	__webpack_require__(/*! ./widgets/post-image.js */ 9);
	__webpack_require__(/*! ./widgets/post-video.js */ 10);
	__webpack_require__(/*! ./widgets/post-audio.js */ 11);
	__webpack_require__(/*! ./widgets/post-link.js */ 12);
	__webpack_require__(/*! ./widgets/post-quote.js */ 13);
	
	__webpack_require__(/*! ./widgets/audio.js */ 14);


/***/ },
/* 1 */
/*!******************************************!*\
  !*** ./public/js/vendor/jquery-2.0.3.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * jQuery JavaScript Library v2.0.3
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2013-07-03T13:30Z
	 */
	(function( window, undefined ) {
	
	// Can't do this because several apps including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	// Support: Firefox 18+
	//"use strict";
	var
	  // A central reference to the root jQuery(document)
	  rootjQuery,
	
	  // The deferred used on DOM ready
	  readyList,
	
	  // Support: IE9
	  // For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	  core_strundefined = typeof undefined,
	
	  // Use the correct document accordingly with window argument (sandbox)
	  location = window.location,
	  document = window.document,
	  docElem = document.documentElement,
	
	  // Map over jQuery in case of overwrite
	  _jQuery = window.jQuery,
	
	  // Map over the $ in case of overwrite
	  _$ = window.$,
	
	  // [[Class]] -> type pairs
	  class2type = {},
	
	  // List of deleted data cache ids, so we can reuse them
	  core_deletedIds = [],
	
	  core_version = "2.0.3",
	
	  // Save a reference to some core methods
	  core_concat = core_deletedIds.concat,
	  core_push = core_deletedIds.push,
	  core_slice = core_deletedIds.slice,
	  core_indexOf = core_deletedIds.indexOf,
	  core_toString = class2type.toString,
	  core_hasOwn = class2type.hasOwnProperty,
	  core_trim = core_version.trim,
	
	  // Define a local copy of jQuery
	  jQuery = function( selector, context ) {
	    // The jQuery object is actually just the init constructor 'enhanced'
	    return new jQuery.fn.init( selector, context, rootjQuery );
	  },
	
	  // Used for matching numbers
	  core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	
	  // Used for splitting on whitespace
	  core_rnotwhite = /\S+/g,
	
	  // A simple way to check for HTML strings
	  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	  // Strict HTML recognition (#11290: must start with <)
	  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	
	  // Match a standalone tag
	  rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	
	  // Matches dashed string for camelizing
	  rmsPrefix = /^-ms-/,
	  rdashAlpha = /-([\da-z])/gi,
	
	  // Used by jQuery.camelCase as callback to replace()
	  fcamelCase = function( all, letter ) {
	    return letter.toUpperCase();
	  },
	
	  // The ready event handler and self cleanup method
	  completed = function() {
	    document.removeEventListener( "DOMContentLoaded", completed, false );
	    window.removeEventListener( "load", completed, false );
	    jQuery.ready();
	  };
	
	jQuery.fn = jQuery.prototype = {
	  // The current version of jQuery being used
	  jquery: core_version,
	
	  constructor: jQuery,
	  init: function( selector, context, rootjQuery ) {
	    var match, elem;
	
	    // HANDLE: $(""), $(null), $(undefined), $(false)
	    if ( !selector ) {
	      return this;
	    }
	
	    // Handle HTML strings
	    if ( typeof selector === "string" ) {
	      if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
	        // Assume that strings that start and end with <> are HTML and skip the regex check
	        match = [ null, selector, null ];
	
	      } else {
	        match = rquickExpr.exec( selector );
	      }
	
	      // Match html or make sure no context is specified for #id
	      if ( match && (match[1] || !context) ) {
	
	        // HANDLE: $(html) -> $(array)
	        if ( match[1] ) {
	          context = context instanceof jQuery ? context[0] : context;
	
	          // scripts is true for back-compat
	          jQuery.merge( this, jQuery.parseHTML(
	            match[1],
	            context && context.nodeType ? context.ownerDocument || context : document,
	            true
	          ) );
	
	          // HANDLE: $(html, props)
	          if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
	            for ( match in context ) {
	              // Properties of context are called as methods if possible
	              if ( jQuery.isFunction( this[ match ] ) ) {
	                this[ match ]( context[ match ] );
	
	              // ...and otherwise set as attributes
	              } else {
	                this.attr( match, context[ match ] );
	              }
	            }
	          }
	
	          return this;
	
	        // HANDLE: $(#id)
	        } else {
	          elem = document.getElementById( match[2] );
	
	          // Check parentNode to catch when Blackberry 4.6 returns
	          // nodes that are no longer in the document #6963
	          if ( elem && elem.parentNode ) {
	            // Inject the element directly into the jQuery object
	            this.length = 1;
	            this[0] = elem;
	          }
	
	          this.context = document;
	          this.selector = selector;
	          return this;
	        }
	
	      // HANDLE: $(expr, $(...))
	      } else if ( !context || context.jquery ) {
	        return ( context || rootjQuery ).find( selector );
	
	      // HANDLE: $(expr, context)
	      // (which is just equivalent to: $(context).find(expr)
	      } else {
	        return this.constructor( context ).find( selector );
	      }
	
	    // HANDLE: $(DOMElement)
	    } else if ( selector.nodeType ) {
	      this.context = this[0] = selector;
	      this.length = 1;
	      return this;
	
	    // HANDLE: $(function)
	    // Shortcut for document ready
	    } else if ( jQuery.isFunction( selector ) ) {
	      return rootjQuery.ready( selector );
	    }
	
	    if ( selector.selector !== undefined ) {
	      this.selector = selector.selector;
	      this.context = selector.context;
	    }
	
	    return jQuery.makeArray( selector, this );
	  },
	
	  // Start with an empty selector
	  selector: "",
	
	  // The default length of a jQuery object is 0
	  length: 0,
	
	  toArray: function() {
	    return core_slice.call( this );
	  },
	
	  // Get the Nth element in the matched element set OR
	  // Get the whole matched element set as a clean array
	  get: function( num ) {
	    return num == null ?
	
	      // Return a 'clean' array
	      this.toArray() :
	
	      // Return just the object
	      ( num < 0 ? this[ this.length + num ] : this[ num ] );
	  },
	
	  // Take an array of elements and push it onto the stack
	  // (returning the new matched element set)
	  pushStack: function( elems ) {
	
	    // Build a new jQuery matched element set
	    var ret = jQuery.merge( this.constructor(), elems );
	
	    // Add the old object onto the stack (as a reference)
	    ret.prevObject = this;
	    ret.context = this.context;
	
	    // Return the newly-formed element set
	    return ret;
	  },
	
	  // Execute a callback for every element in the matched set.
	  // (You can seed the arguments with an array of args, but this is
	  // only used internally.)
	  each: function( callback, args ) {
	    return jQuery.each( this, callback, args );
	  },
	
	  ready: function( fn ) {
	    // Add the callback
	    jQuery.ready.promise().done( fn );
	
	    return this;
	  },
	
	  slice: function() {
	    return this.pushStack( core_slice.apply( this, arguments ) );
	  },
	
	  first: function() {
	    return this.eq( 0 );
	  },
	
	  last: function() {
	    return this.eq( -1 );
	  },
	
	  eq: function( i ) {
	    var len = this.length,
	      j = +i + ( i < 0 ? len : 0 );
	    return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	  },
	
	  map: function( callback ) {
	    return this.pushStack( jQuery.map(this, function( elem, i ) {
	      return callback.call( elem, i, elem );
	    }));
	  },
	
	  end: function() {
	    return this.prevObject || this.constructor(null);
	  },
	
	  // For internal use only.
	  // Behaves like an Array's method, not like a jQuery method.
	  push: core_push,
	  sort: [].sort,
	  splice: [].splice
	};
	
	// Give the init function the jQuery prototype for later instantiation
	jQuery.fn.init.prototype = jQuery.fn;
	
	jQuery.extend = jQuery.fn.extend = function() {
	  var options, name, src, copy, copyIsArray, clone,
	    target = arguments[0] || {},
	    i = 1,
	    length = arguments.length,
	    deep = false;
	
	  // Handle a deep copy situation
	  if ( typeof target === "boolean" ) {
	    deep = target;
	    target = arguments[1] || {};
	    // skip the boolean and the target
	    i = 2;
	  }
	
	  // Handle case when target is a string or something (possible in deep copy)
	  if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
	    target = {};
	  }
	
	  // extend jQuery itself if only one argument is passed
	  if ( length === i ) {
	    target = this;
	    --i;
	  }
	
	  for ( ; i < length; i++ ) {
	    // Only deal with non-null/undefined values
	    if ( (options = arguments[ i ]) != null ) {
	      // Extend the base object
	      for ( name in options ) {
	        src = target[ name ];
	        copy = options[ name ];
	
	        // Prevent never-ending loop
	        if ( target === copy ) {
	          continue;
	        }
	
	        // Recurse if we're merging plain objects or arrays
	        if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
	          if ( copyIsArray ) {
	            copyIsArray = false;
	            clone = src && jQuery.isArray(src) ? src : [];
	
	          } else {
	            clone = src && jQuery.isPlainObject(src) ? src : {};
	          }
	
	          // Never move original objects, clone them
	          target[ name ] = jQuery.extend( deep, clone, copy );
	
	        // Don't bring in undefined values
	        } else if ( copy !== undefined ) {
	          target[ name ] = copy;
	        }
	      }
	    }
	  }
	
	  // Return the modified object
	  return target;
	};
	
	jQuery.extend({
	  // Unique for each copy of jQuery on the page
	  expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),
	
	  noConflict: function( deep ) {
	    if ( window.$ === jQuery ) {
	      window.$ = _$;
	    }
	
	    if ( deep && window.jQuery === jQuery ) {
	      window.jQuery = _jQuery;
	    }
	
	    return jQuery;
	  },
	
	  // Is the DOM ready to be used? Set to true once it occurs.
	  isReady: false,
	
	  // A counter to track how many items to wait for before
	  // the ready event fires. See #6781
	  readyWait: 1,
	
	  // Hold (or release) the ready event
	  holdReady: function( hold ) {
	    if ( hold ) {
	      jQuery.readyWait++;
	    } else {
	      jQuery.ready( true );
	    }
	  },
	
	  // Handle when the DOM is ready
	  ready: function( wait ) {
	
	    // Abort if there are pending holds or we're already ready
	    if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
	      return;
	    }
	
	    // Remember that the DOM is ready
	    jQuery.isReady = true;
	
	    // If a normal DOM Ready event fired, decrement, and wait if need be
	    if ( wait !== true && --jQuery.readyWait > 0 ) {
	      return;
	    }
	
	    // If there are functions bound, to execute
	    readyList.resolveWith( document, [ jQuery ] );
	
	    // Trigger any bound ready events
	    if ( jQuery.fn.trigger ) {
	      jQuery( document ).trigger("ready").off("ready");
	    }
	  },
	
	  // See test/unit/core.js for details concerning isFunction.
	  // Since version 1.3, DOM methods and functions like alert
	  // aren't supported. They return false on IE (#2968).
	  isFunction: function( obj ) {
	    return jQuery.type(obj) === "function";
	  },
	
	  isArray: Array.isArray,
	
	  isWindow: function( obj ) {
	    return obj != null && obj === obj.window;
	  },
	
	  isNumeric: function( obj ) {
	    return !isNaN( parseFloat(obj) ) && isFinite( obj );
	  },
	
	  type: function( obj ) {
	    if ( obj == null ) {
	      return String( obj );
	    }
	    // Support: Safari <= 5.1 (functionish RegExp)
	    return typeof obj === "object" || typeof obj === "function" ?
	      class2type[ core_toString.call(obj) ] || "object" :
	      typeof obj;
	  },
	
	  isPlainObject: function( obj ) {
	    // Not plain objects:
	    // - Any object or value whose internal [[Class]] property is not "[object Object]"
	    // - DOM nodes
	    // - window
	    if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
	      return false;
	    }
	
	    // Support: Firefox <20
	    // The try/catch suppresses exceptions thrown when attempting to access
	    // the "constructor" property of certain host objects, ie. |window.location|
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
	    try {
	      if ( obj.constructor &&
	          !core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
	        return false;
	      }
	    } catch ( e ) {
	      return false;
	    }
	
	    // If the function hasn't returned already, we're confident that
	    // |obj| is a plain object, created by {} or constructed with new Object
	    return true;
	  },
	
	  isEmptyObject: function( obj ) {
	    var name;
	    for ( name in obj ) {
	      return false;
	    }
	    return true;
	  },
	
	  error: function( msg ) {
	    throw new Error( msg );
	  },
	
	  // data: string of html
	  // context (optional): If specified, the fragment will be created in this context, defaults to document
	  // keepScripts (optional): If true, will include scripts passed in the html string
	  parseHTML: function( data, context, keepScripts ) {
	    if ( !data || typeof data !== "string" ) {
	      return null;
	    }
	    if ( typeof context === "boolean" ) {
	      keepScripts = context;
	      context = false;
	    }
	    context = context || document;
	
	    var parsed = rsingleTag.exec( data ),
	      scripts = !keepScripts && [];
	
	    // Single tag
	    if ( parsed ) {
	      return [ context.createElement( parsed[1] ) ];
	    }
	
	    parsed = jQuery.buildFragment( [ data ], context, scripts );
	
	    if ( scripts ) {
	      jQuery( scripts ).remove();
	    }
	
	    return jQuery.merge( [], parsed.childNodes );
	  },
	
	  parseJSON: JSON.parse,
	
	  // Cross-browser xml parsing
	  parseXML: function( data ) {
	    var xml, tmp;
	    if ( !data || typeof data !== "string" ) {
	      return null;
	    }
	
	    // Support: IE9
	    try {
	      tmp = new DOMParser();
	      xml = tmp.parseFromString( data , "text/xml" );
	    } catch ( e ) {
	      xml = undefined;
	    }
	
	    if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
	      jQuery.error( "Invalid XML: " + data );
	    }
	    return xml;
	  },
	
	  noop: function() {},
	
	  // Evaluates a script in a global context
	  globalEval: function( code ) {
	    var script,
	        indirect = eval;
	
	    code = jQuery.trim( code );
	
	    if ( code ) {
	      // If the code includes a valid, prologue position
	      // strict mode pragma, execute code by injecting a
	      // script tag into the document.
	      if ( code.indexOf("use strict") === 1 ) {
	        script = document.createElement("script");
	        script.text = code;
	        document.head.appendChild( script ).parentNode.removeChild( script );
	      } else {
	      // Otherwise, avoid the DOM node creation, insertion
	      // and removal by using an indirect global eval
	        indirect( code );
	      }
	    }
	  },
	
	  // Convert dashed to camelCase; used by the css and data modules
	  // Microsoft forgot to hump their vendor prefix (#9572)
	  camelCase: function( string ) {
	    return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	  },
	
	  nodeName: function( elem, name ) {
	    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	  },
	
	  // args is for internal usage only
	  each: function( obj, callback, args ) {
	    var value,
	      i = 0,
	      length = obj.length,
	      isArray = isArraylike( obj );
	
	    if ( args ) {
	      if ( isArray ) {
	        for ( ; i < length; i++ ) {
	          value = callback.apply( obj[ i ], args );
	
	          if ( value === false ) {
	            break;
	          }
	        }
	      } else {
	        for ( i in obj ) {
	          value = callback.apply( obj[ i ], args );
	
	          if ( value === false ) {
	            break;
	          }
	        }
	      }
	
	    // A special, fast, case for the most common use of each
	    } else {
	      if ( isArray ) {
	        for ( ; i < length; i++ ) {
	          value = callback.call( obj[ i ], i, obj[ i ] );
	
	          if ( value === false ) {
	            break;
	          }
	        }
	      } else {
	        for ( i in obj ) {
	          value = callback.call( obj[ i ], i, obj[ i ] );
	
	          if ( value === false ) {
	            break;
	          }
	        }
	      }
	    }
	
	    return obj;
	  },
	
	  trim: function( text ) {
	    return text == null ? "" : core_trim.call( text );
	  },
	
	  // results is for internal usage only
	  makeArray: function( arr, results ) {
	    var ret = results || [];
	
	    if ( arr != null ) {
	      if ( isArraylike( Object(arr) ) ) {
	        jQuery.merge( ret,
	          typeof arr === "string" ?
	          [ arr ] : arr
	        );
	      } else {
	        core_push.call( ret, arr );
	      }
	    }
	
	    return ret;
	  },
	
	  inArray: function( elem, arr, i ) {
	    return arr == null ? -1 : core_indexOf.call( arr, elem, i );
	  },
	
	  merge: function( first, second ) {
	    var l = second.length,
	      i = first.length,
	      j = 0;
	
	    if ( typeof l === "number" ) {
	      for ( ; j < l; j++ ) {
	        first[ i++ ] = second[ j ];
	      }
	    } else {
	      while ( second[j] !== undefined ) {
	        first[ i++ ] = second[ j++ ];
	      }
	    }
	
	    first.length = i;
	
	    return first;
	  },
	
	  grep: function( elems, callback, inv ) {
	    var retVal,
	      ret = [],
	      i = 0,
	      length = elems.length;
	    inv = !!inv;
	
	    // Go through the array, only saving the items
	    // that pass the validator function
	    for ( ; i < length; i++ ) {
	      retVal = !!callback( elems[ i ], i );
	      if ( inv !== retVal ) {
	        ret.push( elems[ i ] );
	      }
	    }
	
	    return ret;
	  },
	
	  // arg is for internal usage only
	  map: function( elems, callback, arg ) {
	    var value,
	      i = 0,
	      length = elems.length,
	      isArray = isArraylike( elems ),
	      ret = [];
	
	    // Go through the array, translating each of the items to their
	    if ( isArray ) {
	      for ( ; i < length; i++ ) {
	        value = callback( elems[ i ], i, arg );
	
	        if ( value != null ) {
	          ret[ ret.length ] = value;
	        }
	      }
	
	    // Go through every key on the object,
	    } else {
	      for ( i in elems ) {
	        value = callback( elems[ i ], i, arg );
	
	        if ( value != null ) {
	          ret[ ret.length ] = value;
	        }
	      }
	    }
	
	    // Flatten any nested arrays
	    return core_concat.apply( [], ret );
	  },
	
	  // A global GUID counter for objects
	  guid: 1,
	
	  // Bind a function to a context, optionally partially applying any
	  // arguments.
	  proxy: function( fn, context ) {
	    var tmp, args, proxy;
	
	    if ( typeof context === "string" ) {
	      tmp = fn[ context ];
	      context = fn;
	      fn = tmp;
	    }
	
	    // Quick check to determine if target is callable, in the spec
	    // this throws a TypeError, but we will just return undefined.
	    if ( !jQuery.isFunction( fn ) ) {
	      return undefined;
	    }
	
	    // Simulated bind
	    args = core_slice.call( arguments, 2 );
	    proxy = function() {
	      return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
	    };
	
	    // Set the guid of unique handler to the same of original handler, so it can be removed
	    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
	    return proxy;
	  },
	
	  // Multifunctional method to get and set values of a collection
	  // The value/s can optionally be executed if it's a function
	  access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
	    var i = 0,
	      length = elems.length,
	      bulk = key == null;
	
	    // Sets many values
	    if ( jQuery.type( key ) === "object" ) {
	      chainable = true;
	      for ( i in key ) {
	        jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
	      }
	
	    // Sets one value
	    } else if ( value !== undefined ) {
	      chainable = true;
	
	      if ( !jQuery.isFunction( value ) ) {
	        raw = true;
	      }
	
	      if ( bulk ) {
	        // Bulk operations run against the entire set
	        if ( raw ) {
	          fn.call( elems, value );
	          fn = null;
	
	        // ...except when executing function values
	        } else {
	          bulk = fn;
	          fn = function( elem, key, value ) {
	            return bulk.call( jQuery( elem ), value );
	          };
	        }
	      }
	
	      if ( fn ) {
	        for ( ; i < length; i++ ) {
	          fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
	        }
	      }
	    }
	
	    return chainable ?
	      elems :
	
	      // Gets
	      bulk ?
	        fn.call( elems ) :
	        length ? fn( elems[0], key ) : emptyGet;
	  },
	
	  now: Date.now,
	
	  // A method for quickly swapping in/out CSS properties to get correct calculations.
	  // Note: this method belongs to the css module but it's needed here for the support module.
	  // If support gets modularized, this method should be moved back to the css module.
	  swap: function( elem, options, callback, args ) {
	    var ret, name,
	      old = {};
	
	    // Remember the old values, and insert the new ones
	    for ( name in options ) {
	      old[ name ] = elem.style[ name ];
	      elem.style[ name ] = options[ name ];
	    }
	
	    ret = callback.apply( elem, args || [] );
	
	    // Revert the old values
	    for ( name in options ) {
	      elem.style[ name ] = old[ name ];
	    }
	
	    return ret;
	  }
	});
	
	jQuery.ready.promise = function( obj ) {
	  if ( !readyList ) {
	
	    readyList = jQuery.Deferred();
	
	    // Catch cases where $(document).ready() is called after the browser event has already occurred.
	    // we once tried to use readyState "interactive" here, but it caused issues like the one
	    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
	    if ( document.readyState === "complete" ) {
	      // Handle it asynchronously to allow scripts the opportunity to delay ready
	      setTimeout( jQuery.ready );
	
	    } else {
	
	      // Use the handy event callback
	      document.addEventListener( "DOMContentLoaded", completed, false );
	
	      // A fallback to window.onload, that will always work
	      window.addEventListener( "load", completed, false );
	    }
	  }
	  return readyList.promise( obj );
	};
	
	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	  class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	
	function isArraylike( obj ) {
	  var length = obj.length,
	    type = jQuery.type( obj );
	
	  if ( jQuery.isWindow( obj ) ) {
	    return false;
	  }
	
	  if ( obj.nodeType === 1 && length ) {
	    return true;
	  }
	
	  return type === "array" || type !== "function" &&
	    ( length === 0 ||
	    typeof length === "number" && length > 0 && ( length - 1 ) in obj );
	}
	
	// All jQuery objects should point back to these
	rootjQuery = jQuery(document);
	/*!
	 * Sizzle CSS Selector Engine v1.9.4-pre
	 * http://sizzlejs.com/
	 *
	 * Copyright 2013 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2013-06-03
	 */
	(function( window, undefined ) {
	
	var i,
	  support,
	  cachedruns,
	  Expr,
	  getText,
	  isXML,
	  compile,
	  outermostContext,
	  sortInput,
	
	  // Local document vars
	  setDocument,
	  document,
	  docElem,
	  documentIsHTML,
	  rbuggyQSA,
	  rbuggyMatches,
	  matches,
	  contains,
	
	  // Instance-specific data
	  expando = "sizzle" + -(new Date()),
	  preferredDoc = window.document,
	  dirruns = 0,
	  done = 0,
	  classCache = createCache(),
	  tokenCache = createCache(),
	  compilerCache = createCache(),
	  hasDuplicate = false,
	  sortOrder = function( a, b ) {
	    if ( a === b ) {
	      hasDuplicate = true;
	      return 0;
	    }
	    return 0;
	  },
	
	  // General-purpose constants
	  strundefined = typeof undefined,
	  MAX_NEGATIVE = 1 << 31,
	
	  // Instance methods
	  hasOwn = ({}).hasOwnProperty,
	  arr = [],
	  pop = arr.pop,
	  push_native = arr.push,
	  push = arr.push,
	  slice = arr.slice,
	  // Use a stripped-down indexOf if we can't use a native one
	  indexOf = arr.indexOf || function( elem ) {
	    var i = 0,
	      len = this.length;
	    for ( ; i < len; i++ ) {
	      if ( this[i] === elem ) {
	        return i;
	      }
	    }
	    return -1;
	  },
	
	  booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
	  // Regular expressions
	
	  // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	  whitespace = "[\\x20\\t\\r\\n\\f]",
	  // http://www.w3.org/TR/css3-syntax/#characters
	  characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	
	  // Loosely modeled on CSS identifier characters
	  // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	  // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	  identifier = characterEncoding.replace( "w", "w#" ),
	
	  // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	  attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
	    "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
	
	  // Prefer arguments quoted,
	  //   then not containing pseudos/brackets,
	  //   then attribute selectors/non-parenthetical expressions,
	  //   then anything else
	  // These preferences are here to reduce the number of selectors
	  //   needing tokenize in the PSEUDO preFilter
	  pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",
	
	  // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	  rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
	  rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	  rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
	  rsibling = new RegExp( whitespace + "*[+~]" ),
	  rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),
	
	  rpseudo = new RegExp( pseudos ),
	  ridentifier = new RegExp( "^" + identifier + "$" ),
	
	  matchExpr = {
	    "ID": new RegExp( "^#(" + characterEncoding + ")" ),
	    "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
	    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
	    "ATTR": new RegExp( "^" + attributes ),
	    "PSEUDO": new RegExp( "^" + pseudos ),
	    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
	      "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
	      "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
	    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
	    // For use in libraries implementing .is()
	    // We use this for POS matching in `select`
	    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
	      whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	  },
	
	  rnative = /^[^{]+\{\s*\[native \w/,
	
	  // Easily-parseable/retrievable ID or TAG or CLASS selectors
	  rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
	  rinputs = /^(?:input|select|textarea|button)$/i,
	  rheader = /^h\d$/i,
	
	  rescape = /'|\\/g,
	
	  // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	  runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	  funescape = function( _, escaped, escapedWhitespace ) {
	    var high = "0x" + escaped - 0x10000;
	    // NaN means non-codepoint
	    // Support: Firefox
	    // Workaround erroneous numeric interpretation of +"0x"
	    return high !== high || escapedWhitespace ?
	      escaped :
	      // BMP codepoint
	      high < 0 ?
	        String.fromCharCode( high + 0x10000 ) :
	        // Supplemental Plane codepoint (surrogate pair)
	        String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	  };
	
	// Optimize for push.apply( _, NodeList )
	try {
	  push.apply(
	    (arr = slice.call( preferredDoc.childNodes )),
	    preferredDoc.childNodes
	  );
	  // Support: Android<4.0
	  // Detect silently failing push.apply
	  arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
	  push = { apply: arr.length ?
	
	    // Leverage slice if possible
	    function( target, els ) {
	      push_native.apply( target, slice.call(els) );
	    } :
	
	    // Support: IE<9
	    // Otherwise append directly
	    function( target, els ) {
	      var j = target.length,
	        i = 0;
	      // Can't trust NodeList.length
	      while ( (target[j++] = els[i++]) ) {}
	      target.length = j - 1;
	    }
	  };
	}
	
	function Sizzle( selector, context, results, seed ) {
	  var match, elem, m, nodeType,
	    // QSA vars
	    i, groups, old, nid, newContext, newSelector;
	
	  if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
	    setDocument( context );
	  }
	
	  context = context || document;
	  results = results || [];
	
	  if ( !selector || typeof selector !== "string" ) {
	    return results;
	  }
	
	  if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
	    return [];
	  }
	
	  if ( documentIsHTML && !seed ) {
	
	    // Shortcuts
	    if ( (match = rquickExpr.exec( selector )) ) {
	      // Speed-up: Sizzle("#ID")
	      if ( (m = match[1]) ) {
	        if ( nodeType === 9 ) {
	          elem = context.getElementById( m );
	          // Check parentNode to catch when Blackberry 4.6 returns
	          // nodes that are no longer in the document #6963
	          if ( elem && elem.parentNode ) {
	            // Handle the case where IE, Opera, and Webkit return items
	            // by name instead of ID
	            if ( elem.id === m ) {
	              results.push( elem );
	              return results;
	            }
	          } else {
	            return results;
	          }
	        } else {
	          // Context is not a document
	          if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
	            contains( context, elem ) && elem.id === m ) {
	            results.push( elem );
	            return results;
	          }
	        }
	
	      // Speed-up: Sizzle("TAG")
	      } else if ( match[2] ) {
	        push.apply( results, context.getElementsByTagName( selector ) );
	        return results;
	
	      // Speed-up: Sizzle(".CLASS")
	      } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
	        push.apply( results, context.getElementsByClassName( m ) );
	        return results;
	      }
	    }
	
	    // QSA path
	    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	      nid = old = expando;
	      newContext = context;
	      newSelector = nodeType === 9 && selector;
	
	      // qSA works strangely on Element-rooted queries
	      // We can work around this by specifying an extra ID on the root
	      // and working up from there (Thanks to Andrew Dupont for the technique)
	      // IE 8 doesn't work on object elements
	      if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
	        groups = tokenize( selector );
	
	        if ( (old = context.getAttribute("id")) ) {
	          nid = old.replace( rescape, "\\$&" );
	        } else {
	          context.setAttribute( "id", nid );
	        }
	        nid = "[id='" + nid + "'] ";
	
	        i = groups.length;
	        while ( i-- ) {
	          groups[i] = nid + toSelector( groups[i] );
	        }
	        newContext = rsibling.test( selector ) && context.parentNode || context;
	        newSelector = groups.join(",");
	      }
	
	      if ( newSelector ) {
	        try {
	          push.apply( results,
	            newContext.querySelectorAll( newSelector )
	          );
	          return results;
	        } catch(qsaError) {
	        } finally {
	          if ( !old ) {
	            context.removeAttribute("id");
	          }
	        }
	      }
	    }
	  }
	
	  // All others
	  return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *  deleting the oldest entry
	 */
	function createCache() {
	  var keys = [];
	
	  function cache( key, value ) {
	    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
	    if ( keys.push( key += " " ) > Expr.cacheLength ) {
	      // Only keep the most recent entries
	      delete cache[ keys.shift() ];
	    }
	    return (cache[ key ] = value);
	  }
	  return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
	  fn[ expando ] = true;
	  return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
	  var div = document.createElement("div");
	
	  try {
	    return !!fn( div );
	  } catch (e) {
	    return false;
	  } finally {
	    // Remove from its parent by default
	    if ( div.parentNode ) {
	      div.parentNode.removeChild( div );
	    }
	    // release memory in IE
	    div = null;
	  }
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
	  var arr = attrs.split("|"),
	    i = attrs.length;
	
	  while ( i-- ) {
	    Expr.attrHandle[ arr[i] ] = handler;
	  }
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
	  var cur = b && a,
	    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
	      ( ~b.sourceIndex || MAX_NEGATIVE ) -
	      ( ~a.sourceIndex || MAX_NEGATIVE );
	
	  // Use IE sourceIndex if available on both nodes
	  if ( diff ) {
	    return diff;
	  }
	
	  // Check if b follows a
	  if ( cur ) {
	    while ( (cur = cur.nextSibling) ) {
	      if ( cur === b ) {
	        return -1;
	      }
	    }
	  }
	
	  return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
	  return function( elem ) {
	    var name = elem.nodeName.toLowerCase();
	    return name === "input" && elem.type === type;
	  };
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
	  return function( elem ) {
	    var name = elem.nodeName.toLowerCase();
	    return (name === "input" || name === "button") && elem.type === type;
	  };
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
	  return markFunction(function( argument ) {
	    argument = +argument;
	    return markFunction(function( seed, matches ) {
	      var j,
	        matchIndexes = fn( [], seed.length, argument ),
	        i = matchIndexes.length;
	
	      // Match elements found at the specified indexes
	      while ( i-- ) {
	        if ( seed[ (j = matchIndexes[i]) ] ) {
	          seed[j] = !(matches[j] = seed[j]);
	        }
	      }
	    });
	  });
	}
	
	/**
	 * Detect xml
	 * @param {Element|Object} elem An element or a document
	 */
	isXML = Sizzle.isXML = function( elem ) {
	  // documentElement is verified for cases where it doesn't yet exist
	  // (such as loading iframes in IE - #4833)
	  var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	  return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
	  var doc = node ? node.ownerDocument || node : preferredDoc,
	    parent = doc.defaultView;
	
	  // If no document and documentElement is available, return
	  if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
	    return document;
	  }
	
	  // Set our document
	  document = doc;
	  docElem = doc.documentElement;
	
	  // Support tests
	  documentIsHTML = !isXML( doc );
	
	  // Support: IE>8
	  // If iframe document is assigned to "document" variable and if iframe has been reloaded,
	  // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	  // IE6-8 do not support the defaultView property so parent will be undefined
	  if ( parent && parent.attachEvent && parent !== parent.top ) {
	    parent.attachEvent( "onbeforeunload", function() {
	      setDocument();
	    });
	  }
	
	  /* Attributes
	  ---------------------------------------------------------------------- */
	
	  // Support: IE<8
	  // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	  support.attributes = assert(function( div ) {
	    div.className = "i";
	    return !div.getAttribute("className");
	  });
	
	  /* getElement(s)By*
	  ---------------------------------------------------------------------- */
	
	  // Check if getElementsByTagName("*") returns only elements
	  support.getElementsByTagName = assert(function( div ) {
	    div.appendChild( doc.createComment("") );
	    return !div.getElementsByTagName("*").length;
	  });
	
	  // Check if getElementsByClassName can be trusted
	  support.getElementsByClassName = assert(function( div ) {
	    div.innerHTML = "<div class='a'></div><div class='a i'></div>";
	
	    // Support: Safari<4
	    // Catch class over-caching
	    div.firstChild.className = "i";
	    // Support: Opera<10
	    // Catch gEBCN failure to find non-leading classes
	    return div.getElementsByClassName("i").length === 2;
	  });
	
	  // Support: IE<10
	  // Check if getElementById returns elements by name
	  // The broken getElementById methods don't pick up programatically-set names,
	  // so use a roundabout getElementsByName test
	  support.getById = assert(function( div ) {
	    docElem.appendChild( div ).id = expando;
	    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	  });
	
	  // ID find and filter
	  if ( support.getById ) {
	    Expr.find["ID"] = function( id, context ) {
	      if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
	        var m = context.getElementById( id );
	        // Check parentNode to catch when Blackberry 4.6 returns
	        // nodes that are no longer in the document #6963
	        return m && m.parentNode ? [m] : [];
	      }
	    };
	    Expr.filter["ID"] = function( id ) {
	      var attrId = id.replace( runescape, funescape );
	      return function( elem ) {
	        return elem.getAttribute("id") === attrId;
	      };
	    };
	  } else {
	    // Support: IE6/7
	    // getElementById is not reliable as a find shortcut
	    delete Expr.find["ID"];
	
	    Expr.filter["ID"] =  function( id ) {
	      var attrId = id.replace( runescape, funescape );
	      return function( elem ) {
	        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
	        return node && node.value === attrId;
	      };
	    };
	  }
	
	  // Tag
	  Expr.find["TAG"] = support.getElementsByTagName ?
	    function( tag, context ) {
	      if ( typeof context.getElementsByTagName !== strundefined ) {
	        return context.getElementsByTagName( tag );
	      }
	    } :
	    function( tag, context ) {
	      var elem,
	        tmp = [],
	        i = 0,
	        results = context.getElementsByTagName( tag );
	
	      // Filter out possible comments
	      if ( tag === "*" ) {
	        while ( (elem = results[i++]) ) {
	          if ( elem.nodeType === 1 ) {
	            tmp.push( elem );
	          }
	        }
	
	        return tmp;
	      }
	      return results;
	    };
	
	  // Class
	  Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
	    if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
	      return context.getElementsByClassName( className );
	    }
	  };
	
	  /* QSA/matchesSelector
	  ---------------------------------------------------------------------- */
	
	  // QSA and matchesSelector support
	
	  // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	  rbuggyMatches = [];
	
	  // qSa(:focus) reports false when true (Chrome 21)
	  // We allow this because of a bug in IE8/9 that throws an error
	  // whenever `document.activeElement` is accessed on an iframe
	  // So, we allow :focus to pass through QSA all the time to avoid the IE error
	  // See http://bugs.jquery.com/ticket/13378
	  rbuggyQSA = [];
	
	  if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
	    // Build QSA regex
	    // Regex strategy adopted from Diego Perini
	    assert(function( div ) {
	      // Select is set to empty string on purpose
	      // This is to test IE's treatment of not explicitly
	      // setting a boolean content attribute,
	      // since its presence should be enough
	      // http://bugs.jquery.com/ticket/12359
	      div.innerHTML = "<select><option selected=''></option></select>";
	
	      // Support: IE8
	      // Boolean attributes and "value" are not treated correctly
	      if ( !div.querySelectorAll("[selected]").length ) {
	        rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
	      }
	
	      // Webkit/Opera - :checked should return selected option elements
	      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	      // IE8 throws error here and will not see later tests
	      if ( !div.querySelectorAll(":checked").length ) {
	        rbuggyQSA.push(":checked");
	      }
	    });
	
	    assert(function( div ) {
	
	      // Support: Opera 10-12/IE8
	      // ^= $= *= and empty values
	      // Should not select anything
	      // Support: Windows 8 Native Apps
	      // The type attribute is restricted during .innerHTML assignment
	      var input = doc.createElement("input");
	      input.setAttribute( "type", "hidden" );
	      div.appendChild( input ).setAttribute( "t", "" );
	
	      if ( div.querySelectorAll("[t^='']").length ) {
	        rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
	      }
	
	      // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
	      // IE8 throws error here and will not see later tests
	      if ( !div.querySelectorAll(":enabled").length ) {
	        rbuggyQSA.push( ":enabled", ":disabled" );
	      }
	
	      // Opera 10-11 does not throw on post-comma invalid pseudos
	      div.querySelectorAll("*,:x");
	      rbuggyQSA.push(",.*:");
	    });
	  }
	
	  if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
	    docElem.mozMatchesSelector ||
	    docElem.oMatchesSelector ||
	    docElem.msMatchesSelector) )) ) {
	
	    assert(function( div ) {
	      // Check to see if it's possible to do matchesSelector
	      // on a disconnected node (IE 9)
	      support.disconnectedMatch = matches.call( div, "div" );
	
	      // This should fail with an exception
	      // Gecko does not error, returns false instead
	      matches.call( div, "[s!='']:x" );
	      rbuggyMatches.push( "!=", pseudos );
	    });
	  }
	
	  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	  rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
	  /* Contains
	  ---------------------------------------------------------------------- */
	
	  // Element contains another
	  // Purposefully does not implement inclusive descendent
	  // As in, an element does not contain itself
	  contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
	    function( a, b ) {
	      var adown = a.nodeType === 9 ? a.documentElement : a,
	        bup = b && b.parentNode;
	      return a === bup || !!( bup && bup.nodeType === 1 && (
	        adown.contains ?
	          adown.contains( bup ) :
	          a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
	      ));
	    } :
	    function( a, b ) {
	      if ( b ) {
	        while ( (b = b.parentNode) ) {
	          if ( b === a ) {
	            return true;
	          }
	        }
	      }
	      return false;
	    };
	
	  /* Sorting
	  ---------------------------------------------------------------------- */
	
	  // Document order sorting
	  sortOrder = docElem.compareDocumentPosition ?
	  function( a, b ) {
	
	    // Flag for duplicate removal
	    if ( a === b ) {
	      hasDuplicate = true;
	      return 0;
	    }
	
	    var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );
	
	    if ( compare ) {
	      // Disconnected nodes
	      if ( compare & 1 ||
	        (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
	        // Choose the first element that is related to our preferred document
	        if ( a === doc || contains(preferredDoc, a) ) {
	          return -1;
	        }
	        if ( b === doc || contains(preferredDoc, b) ) {
	          return 1;
	        }
	
	        // Maintain original order
	        return sortInput ?
	          ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
	          0;
	      }
	
	      return compare & 4 ? -1 : 1;
	    }
	
	    // Not directly comparable, sort on existence of method
	    return a.compareDocumentPosition ? -1 : 1;
	  } :
	  function( a, b ) {
	    var cur,
	      i = 0,
	      aup = a.parentNode,
	      bup = b.parentNode,
	      ap = [ a ],
	      bp = [ b ];
	
	    // Exit early if the nodes are identical
	    if ( a === b ) {
	      hasDuplicate = true;
	      return 0;
	
	    // Parentless nodes are either documents or disconnected
	    } else if ( !aup || !bup ) {
	      return a === doc ? -1 :
	        b === doc ? 1 :
	        aup ? -1 :
	        bup ? 1 :
	        sortInput ?
	        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
	        0;
	
	    // If the nodes are siblings, we can do a quick check
	    } else if ( aup === bup ) {
	      return siblingCheck( a, b );
	    }
	
	    // Otherwise we need full lists of their ancestors for comparison
	    cur = a;
	    while ( (cur = cur.parentNode) ) {
	      ap.unshift( cur );
	    }
	    cur = b;
	    while ( (cur = cur.parentNode) ) {
	      bp.unshift( cur );
	    }
	
	    // Walk down the tree looking for a discrepancy
	    while ( ap[i] === bp[i] ) {
	      i++;
	    }
	
	    return i ?
	      // Do a sibling check if the nodes have a common ancestor
	      siblingCheck( ap[i], bp[i] ) :
	
	      // Otherwise nodes in our document sort first
	      ap[i] === preferredDoc ? -1 :
	      bp[i] === preferredDoc ? 1 :
	      0;
	  };
	
	  return doc;
	};
	
	Sizzle.matches = function( expr, elements ) {
	  return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
	  // Set document vars if needed
	  if ( ( elem.ownerDocument || elem ) !== document ) {
	    setDocument( elem );
	  }
	
	  // Make sure that attribute selectors are quoted
	  expr = expr.replace( rattributeQuotes, "='$1']" );
	
	  if ( support.matchesSelector && documentIsHTML &&
	    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
	    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
	    try {
	      var ret = matches.call( elem, expr );
	
	      // IE 9's matchesSelector returns false on disconnected nodes
	      if ( ret || support.disconnectedMatch ||
	          // As well, disconnected nodes are said to be in a document
	          // fragment in IE 9
	          elem.document && elem.document.nodeType !== 11 ) {
	        return ret;
	      }
	    } catch(e) {}
	  }
	
	  return Sizzle( expr, document, null, [elem] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
	  // Set document vars if needed
	  if ( ( context.ownerDocument || context ) !== document ) {
	    setDocument( context );
	  }
	  return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
	  // Set document vars if needed
	  if ( ( elem.ownerDocument || elem ) !== document ) {
	    setDocument( elem );
	  }
	
	  var fn = Expr.attrHandle[ name.toLowerCase() ],
	    // Don't get fooled by Object.prototype properties (jQuery #13807)
	    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
	      fn( elem, name, !documentIsHTML ) :
	      undefined;
	
	  return val === undefined ?
	    support.attributes || !documentIsHTML ?
	      elem.getAttribute( name ) :
	      (val = elem.getAttributeNode(name)) && val.specified ?
	        val.value :
	        null :
	    val;
	};
	
	Sizzle.error = function( msg ) {
	  throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
	  var elem,
	    duplicates = [],
	    j = 0,
	    i = 0;
	
	  // Unless we *know* we can detect duplicates, assume their presence
	  hasDuplicate = !support.detectDuplicates;
	  sortInput = !support.sortStable && results.slice( 0 );
	  results.sort( sortOrder );
	
	  if ( hasDuplicate ) {
	    while ( (elem = results[i++]) ) {
	      if ( elem === results[ i ] ) {
	        j = duplicates.push( i );
	      }
	    }
	    while ( j-- ) {
	      results.splice( duplicates[ j ], 1 );
	    }
	  }
	
	  return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
	  var node,
	    ret = "",
	    i = 0,
	    nodeType = elem.nodeType;
	
	  if ( !nodeType ) {
	    // If no nodeType, this is expected to be an array
	    for ( ; (node = elem[i]); i++ ) {
	      // Do not traverse comment nodes
	      ret += getText( node );
	    }
	  } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
	    // Use textContent for elements
	    // innerText usage removed for consistency of new lines (see #11153)
	    if ( typeof elem.textContent === "string" ) {
	      return elem.textContent;
	    } else {
	      // Traverse its children
	      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
	        ret += getText( elem );
	      }
	    }
	  } else if ( nodeType === 3 || nodeType === 4 ) {
	    return elem.nodeValue;
	  }
	  // Do not include comment or processing instruction nodes
	
	  return ret;
	};
	
	Expr = Sizzle.selectors = {
	
	  // Can be adjusted by the user
	  cacheLength: 50,
	
	  createPseudo: markFunction,
	
	  match: matchExpr,
	
	  attrHandle: {},
	
	  find: {},
	
	  relative: {
	    ">": { dir: "parentNode", first: true },
	    " ": { dir: "parentNode" },
	    "+": { dir: "previousSibling", first: true },
	    "~": { dir: "previousSibling" }
	  },
	
	  preFilter: {
	    "ATTR": function( match ) {
	      match[1] = match[1].replace( runescape, funescape );
	
	      // Move the given value to match[3] whether quoted or unquoted
	      match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );
	
	      if ( match[2] === "~=" ) {
	        match[3] = " " + match[3] + " ";
	      }
	
	      return match.slice( 0, 4 );
	    },
	
	    "CHILD": function( match ) {
	      /* matches from matchExpr["CHILD"]
	        1 type (only|nth|...)
	        2 what (child|of-type)
	        3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
	        4 xn-component of xn+y argument ([+-]?\d*n|)
	        5 sign of xn-component
	        6 x of xn-component
	        7 sign of y-component
	        8 y of y-component
	      */
	      match[1] = match[1].toLowerCase();
	
	      if ( match[1].slice( 0, 3 ) === "nth" ) {
	        // nth-* requires argument
	        if ( !match[3] ) {
	          Sizzle.error( match[0] );
	        }
	
	        // numeric x and y parameters for Expr.filter.CHILD
	        // remember that false/true cast respectively to 0/1
	        match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
	        match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
	      // other types prohibit arguments
	      } else if ( match[3] ) {
	        Sizzle.error( match[0] );
	      }
	
	      return match;
	    },
	
	    "PSEUDO": function( match ) {
	      var excess,
	        unquoted = !match[5] && match[2];
	
	      if ( matchExpr["CHILD"].test( match[0] ) ) {
	        return null;
	      }
	
	      // Accept quoted arguments as-is
	      if ( match[3] && match[4] !== undefined ) {
	        match[2] = match[4];
	
	      // Strip excess characters from unquoted arguments
	      } else if ( unquoted && rpseudo.test( unquoted ) &&
	        // Get excess from tokenize (recursively)
	        (excess = tokenize( unquoted, true )) &&
	        // advance to the next closing parenthesis
	        (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
	        // excess is a negative index
	        match[0] = match[0].slice( 0, excess );
	        match[2] = unquoted.slice( 0, excess );
	      }
	
	      // Return only captures needed by the pseudo filter method (type and argument)
	      return match.slice( 0, 3 );
	    }
	  },
	
	  filter: {
	
	    "TAG": function( nodeNameSelector ) {
	      var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
	      return nodeNameSelector === "*" ?
	        function() { return true; } :
	        function( elem ) {
	          return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
	        };
	    },
	
	    "CLASS": function( className ) {
	      var pattern = classCache[ className + " " ];
	
	      return pattern ||
	        (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
	        classCache( className, function( elem ) {
	          return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
	        });
	    },
	
	    "ATTR": function( name, operator, check ) {
	      return function( elem ) {
	        var result = Sizzle.attr( elem, name );
	
	        if ( result == null ) {
	          return operator === "!=";
	        }
	        if ( !operator ) {
	          return true;
	        }
	
	        result += "";
	
	        return operator === "=" ? result === check :
	          operator === "!=" ? result !== check :
	          operator === "^=" ? check && result.indexOf( check ) === 0 :
	          operator === "*=" ? check && result.indexOf( check ) > -1 :
	          operator === "$=" ? check && result.slice( -check.length ) === check :
	          operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
	          operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
	          false;
	      };
	    },
	
	    "CHILD": function( type, what, argument, first, last ) {
	      var simple = type.slice( 0, 3 ) !== "nth",
	        forward = type.slice( -4 ) !== "last",
	        ofType = what === "of-type";
	
	      return first === 1 && last === 0 ?
	
	        // Shortcut for :nth-*(n)
	        function( elem ) {
	          return !!elem.parentNode;
	        } :
	
	        function( elem, context, xml ) {
	          var cache, outerCache, node, diff, nodeIndex, start,
	            dir = simple !== forward ? "nextSibling" : "previousSibling",
	            parent = elem.parentNode,
	            name = ofType && elem.nodeName.toLowerCase(),
	            useCache = !xml && !ofType;
	
	          if ( parent ) {
	
	            // :(first|last|only)-(child|of-type)
	            if ( simple ) {
	              while ( dir ) {
	                node = elem;
	                while ( (node = node[ dir ]) ) {
	                  if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
	                    return false;
	                  }
	                }
	                // Reverse direction for :only-* (if we haven't yet done so)
	                start = dir = type === "only" && !start && "nextSibling";
	              }
	              return true;
	            }
	
	            start = [ forward ? parent.firstChild : parent.lastChild ];
	
	            // non-xml :nth-child(...) stores cache data on `parent`
	            if ( forward && useCache ) {
	              // Seek `elem` from a previously-cached index
	              outerCache = parent[ expando ] || (parent[ expando ] = {});
	              cache = outerCache[ type ] || [];
	              nodeIndex = cache[0] === dirruns && cache[1];
	              diff = cache[0] === dirruns && cache[2];
	              node = nodeIndex && parent.childNodes[ nodeIndex ];
	
	              while ( (node = ++nodeIndex && node && node[ dir ] ||
	
	                // Fallback to seeking `elem` from the start
	                (diff = nodeIndex = 0) || start.pop()) ) {
	
	                // When found, cache indexes on `parent` and break
	                if ( node.nodeType === 1 && ++diff && node === elem ) {
	                  outerCache[ type ] = [ dirruns, nodeIndex, diff ];
	                  break;
	                }
	              }
	
	            // Use previously-cached element index if available
	            } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
	              diff = cache[1];
	
	            // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
	            } else {
	              // Use the same loop as above to seek `elem` from the start
	              while ( (node = ++nodeIndex && node && node[ dir ] ||
	                (diff = nodeIndex = 0) || start.pop()) ) {
	
	                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
	                  // Cache the index of each encountered element
	                  if ( useCache ) {
	                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
	                  }
	
	                  if ( node === elem ) {
	                    break;
	                  }
	                }
	              }
	            }
	
	            // Incorporate the offset, then check against cycle size
	            diff -= last;
	            return diff === first || ( diff % first === 0 && diff / first >= 0 );
	          }
	        };
	    },
	
	    "PSEUDO": function( pseudo, argument ) {
	      // pseudo-class names are case-insensitive
	      // http://www.w3.org/TR/selectors/#pseudo-classes
	      // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
	      // Remember that setFilters inherits from pseudos
	      var args,
	        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
	          Sizzle.error( "unsupported pseudo: " + pseudo );
	
	      // The user may use createPseudo to indicate that
	      // arguments are needed to create the filter function
	      // just as Sizzle does
	      if ( fn[ expando ] ) {
	        return fn( argument );
	      }
	
	      // But maintain support for old signatures
	      if ( fn.length > 1 ) {
	        args = [ pseudo, pseudo, "", argument ];
	        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
	          markFunction(function( seed, matches ) {
	            var idx,
	              matched = fn( seed, argument ),
	              i = matched.length;
	            while ( i-- ) {
	              idx = indexOf.call( seed, matched[i] );
	              seed[ idx ] = !( matches[ idx ] = matched[i] );
	            }
	          }) :
	          function( elem ) {
	            return fn( elem, 0, args );
	          };
	      }
	
	      return fn;
	    }
	  },
	
	  pseudos: {
	    // Potentially complex pseudos
	    "not": markFunction(function( selector ) {
	      // Trim the selector passed to compile
	      // to avoid treating leading and trailing
	      // spaces as combinators
	      var input = [],
	        results = [],
	        matcher = compile( selector.replace( rtrim, "$1" ) );
	
	      return matcher[ expando ] ?
	        markFunction(function( seed, matches, context, xml ) {
	          var elem,
	            unmatched = matcher( seed, null, xml, [] ),
	            i = seed.length;
	
	          // Match elements unmatched by `matcher`
	          while ( i-- ) {
	            if ( (elem = unmatched[i]) ) {
	              seed[i] = !(matches[i] = elem);
	            }
	          }
	        }) :
	        function( elem, context, xml ) {
	          input[0] = elem;
	          matcher( input, null, xml, results );
	          return !results.pop();
	        };
	    }),
	
	    "has": markFunction(function( selector ) {
	      return function( elem ) {
	        return Sizzle( selector, elem ).length > 0;
	      };
	    }),
	
	    "contains": markFunction(function( text ) {
	      return function( elem ) {
	        return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
	      };
	    }),
	
	    // "Whether an element is represented by a :lang() selector
	    // is based solely on the element's language value
	    // being equal to the identifier C,
	    // or beginning with the identifier C immediately followed by "-".
	    // The matching of C against the element's language value is performed case-insensitively.
	    // The identifier C does not have to be a valid language name."
	    // http://www.w3.org/TR/selectors/#lang-pseudo
	    "lang": markFunction( function( lang ) {
	      // lang value must be a valid identifier
	      if ( !ridentifier.test(lang || "") ) {
	        Sizzle.error( "unsupported lang: " + lang );
	      }
	      lang = lang.replace( runescape, funescape ).toLowerCase();
	      return function( elem ) {
	        var elemLang;
	        do {
	          if ( (elemLang = documentIsHTML ?
	            elem.lang :
	            elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
	            elemLang = elemLang.toLowerCase();
	            return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
	          }
	        } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
	        return false;
	      };
	    }),
	
	    // Miscellaneous
	    "target": function( elem ) {
	      var hash = window.location && window.location.hash;
	      return hash && hash.slice( 1 ) === elem.id;
	    },
	
	    "root": function( elem ) {
	      return elem === docElem;
	    },
	
	    "focus": function( elem ) {
	      return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
	    },
	
	    // Boolean properties
	    "enabled": function( elem ) {
	      return elem.disabled === false;
	    },
	
	    "disabled": function( elem ) {
	      return elem.disabled === true;
	    },
	
	    "checked": function( elem ) {
	      // In CSS3, :checked should return both checked and selected elements
	      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	      var nodeName = elem.nodeName.toLowerCase();
	      return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
	    },
	
	    "selected": function( elem ) {
	      // Accessing this property makes selected-by-default
	      // options in Safari work properly
	      if ( elem.parentNode ) {
	        elem.parentNode.selectedIndex;
	      }
	
	      return elem.selected === true;
	    },
	
	    // Contents
	    "empty": function( elem ) {
	      // http://www.w3.org/TR/selectors/#empty-pseudo
	      // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
	      //   not comment, processing instructions, or others
	      // Thanks to Diego Perini for the nodeName shortcut
	      //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
	      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
	        if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
	          return false;
	        }
	      }
	      return true;
	    },
	
	    "parent": function( elem ) {
	      return !Expr.pseudos["empty"]( elem );
	    },
	
	    // Element/input types
	    "header": function( elem ) {
	      return rheader.test( elem.nodeName );
	    },
	
	    "input": function( elem ) {
	      return rinputs.test( elem.nodeName );
	    },
	
	    "button": function( elem ) {
	      var name = elem.nodeName.toLowerCase();
	      return name === "input" && elem.type === "button" || name === "button";
	    },
	
	    "text": function( elem ) {
	      var attr;
	      // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
	      // use getAttribute instead to test this case
	      return elem.nodeName.toLowerCase() === "input" &&
	        elem.type === "text" &&
	        ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
	    },
	
	    // Position-in-collection
	    "first": createPositionalPseudo(function() {
	      return [ 0 ];
	    }),
	
	    "last": createPositionalPseudo(function( matchIndexes, length ) {
	      return [ length - 1 ];
	    }),
	
	    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
	      return [ argument < 0 ? argument + length : argument ];
	    }),
	
	    "even": createPositionalPseudo(function( matchIndexes, length ) {
	      var i = 0;
	      for ( ; i < length; i += 2 ) {
	        matchIndexes.push( i );
	      }
	      return matchIndexes;
	    }),
	
	    "odd": createPositionalPseudo(function( matchIndexes, length ) {
	      var i = 1;
	      for ( ; i < length; i += 2 ) {
	        matchIndexes.push( i );
	      }
	      return matchIndexes;
	    }),
	
	    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
	      var i = argument < 0 ? argument + length : argument;
	      for ( ; --i >= 0; ) {
	        matchIndexes.push( i );
	      }
	      return matchIndexes;
	    }),
	
	    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
	      var i = argument < 0 ? argument + length : argument;
	      for ( ; ++i < length; ) {
	        matchIndexes.push( i );
	      }
	      return matchIndexes;
	    })
	  }
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	  Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
	  Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	function tokenize( selector, parseOnly ) {
	  var matched, match, tokens, type,
	    soFar, groups, preFilters,
	    cached = tokenCache[ selector + " " ];
	
	  if ( cached ) {
	    return parseOnly ? 0 : cached.slice( 0 );
	  }
	
	  soFar = selector;
	  groups = [];
	  preFilters = Expr.preFilter;
	
	  while ( soFar ) {
	
	    // Comma and first run
	    if ( !matched || (match = rcomma.exec( soFar )) ) {
	      if ( match ) {
	        // Don't consume trailing commas as valid
	        soFar = soFar.slice( match[0].length ) || soFar;
	      }
	      groups.push( tokens = [] );
	    }
	
	    matched = false;
	
	    // Combinators
	    if ( (match = rcombinators.exec( soFar )) ) {
	      matched = match.shift();
	      tokens.push({
	        value: matched,
	        // Cast descendant combinators to space
	        type: match[0].replace( rtrim, " " )
	      });
	      soFar = soFar.slice( matched.length );
	    }
	
	    // Filters
	    for ( type in Expr.filter ) {
	      if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
	        (match = preFilters[ type ]( match ))) ) {
	        matched = match.shift();
	        tokens.push({
	          value: matched,
	          type: type,
	          matches: match
	        });
	        soFar = soFar.slice( matched.length );
	      }
	    }
	
	    if ( !matched ) {
	      break;
	    }
	  }
	
	  // Return the length of the invalid excess
	  // if we're just parsing
	  // Otherwise, throw an error or return tokens
	  return parseOnly ?
	    soFar.length :
	    soFar ?
	      Sizzle.error( selector ) :
	      // Cache the tokens
	      tokenCache( selector, groups ).slice( 0 );
	}
	
	function toSelector( tokens ) {
	  var i = 0,
	    len = tokens.length,
	    selector = "";
	  for ( ; i < len; i++ ) {
	    selector += tokens[i].value;
	  }
	  return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
	  var dir = combinator.dir,
	    checkNonElements = base && dir === "parentNode",
	    doneName = done++;
	
	  return combinator.first ?
	    // Check against closest ancestor/preceding element
	    function( elem, context, xml ) {
	      while ( (elem = elem[ dir ]) ) {
	        if ( elem.nodeType === 1 || checkNonElements ) {
	          return matcher( elem, context, xml );
	        }
	      }
	    } :
	
	    // Check against all ancestor/preceding elements
	    function( elem, context, xml ) {
	      var data, cache, outerCache,
	        dirkey = dirruns + " " + doneName;
	
	      // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
	      if ( xml ) {
	        while ( (elem = elem[ dir ]) ) {
	          if ( elem.nodeType === 1 || checkNonElements ) {
	            if ( matcher( elem, context, xml ) ) {
	              return true;
	            }
	          }
	        }
	      } else {
	        while ( (elem = elem[ dir ]) ) {
	          if ( elem.nodeType === 1 || checkNonElements ) {
	            outerCache = elem[ expando ] || (elem[ expando ] = {});
	            if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
	              if ( (data = cache[1]) === true || data === cachedruns ) {
	                return data === true;
	              }
	            } else {
	              cache = outerCache[ dir ] = [ dirkey ];
	              cache[1] = matcher( elem, context, xml ) || cachedruns;
	              if ( cache[1] === true ) {
	                return true;
	              }
	            }
	          }
	        }
	      }
	    };
	}
	
	function elementMatcher( matchers ) {
	  return matchers.length > 1 ?
	    function( elem, context, xml ) {
	      var i = matchers.length;
	      while ( i-- ) {
	        if ( !matchers[i]( elem, context, xml ) ) {
	          return false;
	        }
	      }
	      return true;
	    } :
	    matchers[0];
	}
	
	function condense( unmatched, map, filter, context, xml ) {
	  var elem,
	    newUnmatched = [],
	    i = 0,
	    len = unmatched.length,
	    mapped = map != null;
	
	  for ( ; i < len; i++ ) {
	    if ( (elem = unmatched[i]) ) {
	      if ( !filter || filter( elem, context, xml ) ) {
	        newUnmatched.push( elem );
	        if ( mapped ) {
	          map.push( i );
	        }
	      }
	    }
	  }
	
	  return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	  if ( postFilter && !postFilter[ expando ] ) {
	    postFilter = setMatcher( postFilter );
	  }
	  if ( postFinder && !postFinder[ expando ] ) {
	    postFinder = setMatcher( postFinder, postSelector );
	  }
	  return markFunction(function( seed, results, context, xml ) {
	    var temp, i, elem,
	      preMap = [],
	      postMap = [],
	      preexisting = results.length,
	
	      // Get initial elements from seed or context
	      elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
	      // Prefilter to get matcher input, preserving a map for seed-results synchronization
	      matcherIn = preFilter && ( seed || !selector ) ?
	        condense( elems, preMap, preFilter, context, xml ) :
	        elems,
	
	      matcherOut = matcher ?
	        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
	        postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
	          // ...intermediate processing is necessary
	          [] :
	
	          // ...otherwise use results directly
	          results :
	        matcherIn;
	
	    // Find primary matches
	    if ( matcher ) {
	      matcher( matcherIn, matcherOut, context, xml );
	    }
	
	    // Apply postFilter
	    if ( postFilter ) {
	      temp = condense( matcherOut, postMap );
	      postFilter( temp, [], context, xml );
	
	      // Un-match failing elements by moving them back to matcherIn
	      i = temp.length;
	      while ( i-- ) {
	        if ( (elem = temp[i]) ) {
	          matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
	        }
	      }
	    }
	
	    if ( seed ) {
	      if ( postFinder || preFilter ) {
	        if ( postFinder ) {
	          // Get the final matcherOut by condensing this intermediate into postFinder contexts
	          temp = [];
	          i = matcherOut.length;
	          while ( i-- ) {
	            if ( (elem = matcherOut[i]) ) {
	              // Restore matcherIn since elem is not yet a final match
	              temp.push( (matcherIn[i] = elem) );
	            }
	          }
	          postFinder( null, (matcherOut = []), temp, xml );
	        }
	
	        // Move matched elements from seed to results to keep them synchronized
	        i = matcherOut.length;
	        while ( i-- ) {
	          if ( (elem = matcherOut[i]) &&
	            (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {
	
	            seed[temp] = !(results[temp] = elem);
	          }
	        }
	      }
	
	    // Add elements to results, through postFinder if defined
	    } else {
	      matcherOut = condense(
	        matcherOut === results ?
	          matcherOut.splice( preexisting, matcherOut.length ) :
	          matcherOut
	      );
	      if ( postFinder ) {
	        postFinder( null, results, matcherOut, xml );
	      } else {
	        push.apply( results, matcherOut );
	      }
	    }
	  });
	}
	
	function matcherFromTokens( tokens ) {
	  var checkContext, matcher, j,
	    len = tokens.length,
	    leadingRelative = Expr.relative[ tokens[0].type ],
	    implicitRelative = leadingRelative || Expr.relative[" "],
	    i = leadingRelative ? 1 : 0,
	
	    // The foundational matcher ensures that elements are reachable from top-level context(s)
	    matchContext = addCombinator( function( elem ) {
	      return elem === checkContext;
	    }, implicitRelative, true ),
	    matchAnyContext = addCombinator( function( elem ) {
	      return indexOf.call( checkContext, elem ) > -1;
	    }, implicitRelative, true ),
	    matchers = [ function( elem, context, xml ) {
	      return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
	        (checkContext = context).nodeType ?
	          matchContext( elem, context, xml ) :
	          matchAnyContext( elem, context, xml ) );
	    } ];
	
	  for ( ; i < len; i++ ) {
	    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
	      matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
	    } else {
	      matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
	      // Return special upon seeing a positional matcher
	      if ( matcher[ expando ] ) {
	        // Find the next relative operator (if any) for proper handling
	        j = ++i;
	        for ( ; j < len; j++ ) {
	          if ( Expr.relative[ tokens[j].type ] ) {
	            break;
	          }
	        }
	        return setMatcher(
	          i > 1 && elementMatcher( matchers ),
	          i > 1 && toSelector(
	            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
	            tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
	          ).replace( rtrim, "$1" ),
	          matcher,
	          i < j && matcherFromTokens( tokens.slice( i, j ) ),
	          j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
	          j < len && toSelector( tokens )
	        );
	      }
	      matchers.push( matcher );
	    }
	  }
	
	  return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	  // A counter to specify which element is currently being matched
	  var matcherCachedRuns = 0,
	    bySet = setMatchers.length > 0,
	    byElement = elementMatchers.length > 0,
	    superMatcher = function( seed, context, xml, results, expandContext ) {
	      var elem, j, matcher,
	        setMatched = [],
	        matchedCount = 0,
	        i = "0",
	        unmatched = seed && [],
	        outermost = expandContext != null,
	        contextBackup = outermostContext,
	        // We must always have either seed elements or context
	        elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
	        // Use integer dirruns iff this is the outermost matcher
	        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);
	
	      if ( outermost ) {
	        outermostContext = context !== document && context;
	        cachedruns = matcherCachedRuns;
	      }
	
	      // Add elements passing elementMatchers directly to results
	      // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
	      for ( ; (elem = elems[i]) != null; i++ ) {
	        if ( byElement && elem ) {
	          j = 0;
	          while ( (matcher = elementMatchers[j++]) ) {
	            if ( matcher( elem, context, xml ) ) {
	              results.push( elem );
	              break;
	            }
	          }
	          if ( outermost ) {
	            dirruns = dirrunsUnique;
	            cachedruns = ++matcherCachedRuns;
	          }
	        }
	
	        // Track unmatched elements for set filters
	        if ( bySet ) {
	          // They will have gone through all possible matchers
	          if ( (elem = !matcher && elem) ) {
	            matchedCount--;
	          }
	
	          // Lengthen the array for every element, matched or not
	          if ( seed ) {
	            unmatched.push( elem );
	          }
	        }
	      }
	
	      // Apply set filters to unmatched elements
	      matchedCount += i;
	      if ( bySet && i !== matchedCount ) {
	        j = 0;
	        while ( (matcher = setMatchers[j++]) ) {
	          matcher( unmatched, setMatched, context, xml );
	        }
	
	        if ( seed ) {
	          // Reintegrate element matches to eliminate the need for sorting
	          if ( matchedCount > 0 ) {
	            while ( i-- ) {
	              if ( !(unmatched[i] || setMatched[i]) ) {
	                setMatched[i] = pop.call( results );
	              }
	            }
	          }
	
	          // Discard index placeholder values to get only actual matches
	          setMatched = condense( setMatched );
	        }
	
	        // Add matches to results
	        push.apply( results, setMatched );
	
	        // Seedless set matches succeeding multiple successful matchers stipulate sorting
	        if ( outermost && !seed && setMatched.length > 0 &&
	          ( matchedCount + setMatchers.length ) > 1 ) {
	
	          Sizzle.uniqueSort( results );
	        }
	      }
	
	      // Override manipulation of globals by nested matchers
	      if ( outermost ) {
	        dirruns = dirrunsUnique;
	        outermostContext = contextBackup;
	      }
	
	      return unmatched;
	    };
	
	  return bySet ?
	    markFunction( superMatcher ) :
	    superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	  var i,
	    setMatchers = [],
	    elementMatchers = [],
	    cached = compilerCache[ selector + " " ];
	
	  if ( !cached ) {
	    // Generate a function of recursive functions that can be used to check each element
	    if ( !group ) {
	      group = tokenize( selector );
	    }
	    i = group.length;
	    while ( i-- ) {
	      cached = matcherFromTokens( group[i] );
	      if ( cached[ expando ] ) {
	        setMatchers.push( cached );
	      } else {
	        elementMatchers.push( cached );
	      }
	    }
	
	    // Cache the compiled function
	    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	  }
	  return cached;
	};
	
	function multipleContexts( selector, contexts, results ) {
	  var i = 0,
	    len = contexts.length;
	  for ( ; i < len; i++ ) {
	    Sizzle( selector, contexts[i], results );
	  }
	  return results;
	}
	
	function select( selector, context, results, seed ) {
	  var i, tokens, token, type, find,
	    match = tokenize( selector );
	
	  if ( !seed ) {
	    // Try to minimize operations if there is only one group
	    if ( match.length === 1 ) {
	
	      // Take a shortcut and set the context if the root selector is an ID
	      tokens = match[0] = match[0].slice( 0 );
	      if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
	          support.getById && context.nodeType === 9 && documentIsHTML &&
	          Expr.relative[ tokens[1].type ] ) {
	
	        context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
	        if ( !context ) {
	          return results;
	        }
	        selector = selector.slice( tokens.shift().value.length );
	      }
	
	      // Fetch a seed set for right-to-left matching
	      i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
	      while ( i-- ) {
	        token = tokens[i];
	
	        // Abort if we hit a combinator
	        if ( Expr.relative[ (type = token.type) ] ) {
	          break;
	        }
	        if ( (find = Expr.find[ type ]) ) {
	          // Search, expanding context for leading sibling combinators
	          if ( (seed = find(
	            token.matches[0].replace( runescape, funescape ),
	            rsibling.test( tokens[0].type ) && context.parentNode || context
	          )) ) {
	
	            // If seed is empty or no tokens remain, we can return early
	            tokens.splice( i, 1 );
	            selector = seed.length && toSelector( tokens );
	            if ( !selector ) {
	              push.apply( results, seed );
	              return results;
	            }
	
	            break;
	          }
	        }
	      }
	    }
	  }
	
	  // Compile and execute a filtering function
	  // Provide `match` to avoid retokenization if we modified the selector above
	  compile( selector, match )(
	    seed,
	    context,
	    !documentIsHTML,
	    results,
	    rsibling.test( selector )
	  );
	  return results;
	}
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome<14
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
	  // Should return 1, but returns 4 (following)
	  return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
	  div.innerHTML = "<a href='#'></a>";
	  return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
	  addHandle( "type|href|height|width", function( elem, name, isXML ) {
	    if ( !isXML ) {
	      return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
	    }
	  });
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
	  div.innerHTML = "<input/>";
	  div.firstChild.setAttribute( "value", "" );
	  return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
	  addHandle( "value", function( elem, name, isXML ) {
	    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
	      return elem.defaultValue;
	    }
	  });
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
	  return div.getAttribute("disabled") == null;
	}) ) {
	  addHandle( booleans, function( elem, name, isXML ) {
	    var val;
	    if ( !isXML ) {
	      return (val = elem.getAttributeNode( name )) && val.specified ?
	        val.value :
	        elem[ name ] === true ? name.toLowerCase() : null;
	    }
	  });
	}
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	})( window );
	// String to Object options format cache
	var optionsCache = {};
	
	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
	  var object = optionsCache[ options ] = {};
	  jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
	    object[ flag ] = true;
	  });
	  return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *  options: an optional list of space-separated options that will change how
	 *      the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *  once:     will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *  memory:     will keep track of previous values and will call any callback added
	 *          after the list has been fired right away with the latest "memorized"
	 *          values (like a Deferred)
	 *
	 *  unique:     will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *  stopOnFalse:  interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
	  // Convert options from String-formatted to Object-formatted if needed
	  // (we check in cache first)
	  options = typeof options === "string" ?
	    ( optionsCache[ options ] || createOptions( options ) ) :
	    jQuery.extend( {}, options );
	
	  var // Last fire value (for non-forgettable lists)
	    memory,
	    // Flag to know if list was already fired
	    fired,
	    // Flag to know if list is currently firing
	    firing,
	    // First callback to fire (used internally by add and fireWith)
	    firingStart,
	    // End of the loop when firing
	    firingLength,
	    // Index of currently firing callback (modified by remove if needed)
	    firingIndex,
	    // Actual callback list
	    list = [],
	    // Stack of fire calls for repeatable lists
	    stack = !options.once && [],
	    // Fire callbacks
	    fire = function( data ) {
	      memory = options.memory && data;
	      fired = true;
	      firingIndex = firingStart || 0;
	      firingStart = 0;
	      firingLength = list.length;
	      firing = true;
	      for ( ; list && firingIndex < firingLength; firingIndex++ ) {
	        if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
	          memory = false; // To prevent further calls using add
	          break;
	        }
	      }
	      firing = false;
	      if ( list ) {
	        if ( stack ) {
	          if ( stack.length ) {
	            fire( stack.shift() );
	          }
	        } else if ( memory ) {
	          list = [];
	        } else {
	          self.disable();
	        }
	      }
	    },
	    // Actual Callbacks object
	    self = {
	      // Add a callback or a collection of callbacks to the list
	      add: function() {
	        if ( list ) {
	          // First, we save the current length
	          var start = list.length;
	          (function add( args ) {
	            jQuery.each( args, function( _, arg ) {
	              var type = jQuery.type( arg );
	              if ( type === "function" ) {
	                if ( !options.unique || !self.has( arg ) ) {
	                  list.push( arg );
	                }
	              } else if ( arg && arg.length && type !== "string" ) {
	                // Inspect recursively
	                add( arg );
	              }
	            });
	          })( arguments );
	          // Do we need to add the callbacks to the
	          // current firing batch?
	          if ( firing ) {
	            firingLength = list.length;
	          // With memory, if we're not firing then
	          // we should call right away
	          } else if ( memory ) {
	            firingStart = start;
	            fire( memory );
	          }
	        }
	        return this;
	      },
	      // Remove a callback from the list
	      remove: function() {
	        if ( list ) {
	          jQuery.each( arguments, function( _, arg ) {
	            var index;
	            while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
	              list.splice( index, 1 );
	              // Handle firing indexes
	              if ( firing ) {
	                if ( index <= firingLength ) {
	                  firingLength--;
	                }
	                if ( index <= firingIndex ) {
	                  firingIndex--;
	                }
	              }
	            }
	          });
	        }
	        return this;
	      },
	      // Check if a given callback is in the list.
	      // If no argument is given, return whether or not list has callbacks attached.
	      has: function( fn ) {
	        return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
	      },
	      // Remove all callbacks from the list
	      empty: function() {
	        list = [];
	        firingLength = 0;
	        return this;
	      },
	      // Have the list do nothing anymore
	      disable: function() {
	        list = stack = memory = undefined;
	        return this;
	      },
	      // Is it disabled?
	      disabled: function() {
	        return !list;
	      },
	      // Lock the list in its current state
	      lock: function() {
	        stack = undefined;
	        if ( !memory ) {
	          self.disable();
	        }
	        return this;
	      },
	      // Is it locked?
	      locked: function() {
	        return !stack;
	      },
	      // Call all callbacks with the given context and arguments
	      fireWith: function( context, args ) {
	        if ( list && ( !fired || stack ) ) {
	          args = args || [];
	          args = [ context, args.slice ? args.slice() : args ];
	          if ( firing ) {
	            stack.push( args );
	          } else {
	            fire( args );
	          }
	        }
	        return this;
	      },
	      // Call all the callbacks with the given arguments
	      fire: function() {
	        self.fireWith( this, arguments );
	        return this;
	      },
	      // To know if the callbacks have already been called at least once
	      fired: function() {
	        return !!fired;
	      }
	    };
	
	  return self;
	};
	jQuery.extend({
	
	  Deferred: function( func ) {
	    var tuples = [
	        // action, add listener, listener list, final state
	        [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
	        [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
	        [ "notify", "progress", jQuery.Callbacks("memory") ]
	      ],
	      state = "pending",
	      promise = {
	        state: function() {
	          return state;
	        },
	        always: function() {
	          deferred.done( arguments ).fail( arguments );
	          return this;
	        },
	        then: function( /* fnDone, fnFail, fnProgress */ ) {
	          var fns = arguments;
	          return jQuery.Deferred(function( newDefer ) {
	            jQuery.each( tuples, function( i, tuple ) {
	              var action = tuple[ 0 ],
	                fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
	              // deferred[ done | fail | progress ] for forwarding actions to newDefer
	              deferred[ tuple[1] ](function() {
	                var returned = fn && fn.apply( this, arguments );
	                if ( returned && jQuery.isFunction( returned.promise ) ) {
	                  returned.promise()
	                    .done( newDefer.resolve )
	                    .fail( newDefer.reject )
	                    .progress( newDefer.notify );
	                } else {
	                  newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
	                }
	              });
	            });
	            fns = null;
	          }).promise();
	        },
	        // Get a promise for this deferred
	        // If obj is provided, the promise aspect is added to the object
	        promise: function( obj ) {
	          return obj != null ? jQuery.extend( obj, promise ) : promise;
	        }
	      },
	      deferred = {};
	
	    // Keep pipe for back-compat
	    promise.pipe = promise.then;
	
	    // Add list-specific methods
	    jQuery.each( tuples, function( i, tuple ) {
	      var list = tuple[ 2 ],
	        stateString = tuple[ 3 ];
	
	      // promise[ done | fail | progress ] = list.add
	      promise[ tuple[1] ] = list.add;
	
	      // Handle state
	      if ( stateString ) {
	        list.add(function() {
	          // state = [ resolved | rejected ]
	          state = stateString;
	
	        // [ reject_list | resolve_list ].disable; progress_list.lock
	        }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
	      }
	
	      // deferred[ resolve | reject | notify ]
	      deferred[ tuple[0] ] = function() {
	        deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
	        return this;
	      };
	      deferred[ tuple[0] + "With" ] = list.fireWith;
	    });
	
	    // Make the deferred a promise
	    promise.promise( deferred );
	
	    // Call given func if any
	    if ( func ) {
	      func.call( deferred, deferred );
	    }
	
	    // All done!
	    return deferred;
	  },
	
	  // Deferred helper
	  when: function( subordinate /* , ..., subordinateN */ ) {
	    var i = 0,
	      resolveValues = core_slice.call( arguments ),
	      length = resolveValues.length,
	
	      // the count of uncompleted subordinates
	      remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
	
	      // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
	      deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	
	      // Update function for both resolve and progress values
	      updateFunc = function( i, contexts, values ) {
	        return function( value ) {
	          contexts[ i ] = this;
	          values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
	          if( values === progressValues ) {
	            deferred.notifyWith( contexts, values );
	          } else if ( !( --remaining ) ) {
	            deferred.resolveWith( contexts, values );
	          }
	        };
	      },
	
	      progressValues, progressContexts, resolveContexts;
	
	    // add listeners to Deferred subordinates; treat others as resolved
	    if ( length > 1 ) {
	      progressValues = new Array( length );
	      progressContexts = new Array( length );
	      resolveContexts = new Array( length );
	      for ( ; i < length; i++ ) {
	        if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
	          resolveValues[ i ].promise()
	            .done( updateFunc( i, resolveContexts, resolveValues ) )
	            .fail( deferred.reject )
	            .progress( updateFunc( i, progressContexts, progressValues ) );
	        } else {
	          --remaining;
	        }
	      }
	    }
	
	    // if we're not waiting on anything, resolve the master
	    if ( !remaining ) {
	      deferred.resolveWith( resolveContexts, resolveValues );
	    }
	
	    return deferred.promise();
	  }
	});
	jQuery.support = (function( support ) {
	  var input = document.createElement("input"),
	    fragment = document.createDocumentFragment(),
	    div = document.createElement("div"),
	    select = document.createElement("select"),
	    opt = select.appendChild( document.createElement("option") );
	
	  // Finish early in limited environments
	  if ( !input.type ) {
	    return support;
	  }
	
	  input.type = "checkbox";
	
	  // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	  // Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	  support.checkOn = input.value !== "";
	
	  // Must access the parent to make an option select properly
	  // Support: IE9, IE10
	  support.optSelected = opt.selected;
	
	  // Will be defined later
	  support.reliableMarginRight = true;
	  support.boxSizingReliable = true;
	  support.pixelPosition = false;
	
	  // Make sure checked status is properly cloned
	  // Support: IE9, IE10
	  input.checked = true;
	  support.noCloneChecked = input.cloneNode( true ).checked;
	
	  // Make sure that the options inside disabled selects aren't marked as disabled
	  // (WebKit marks them as disabled)
	  select.disabled = true;
	  support.optDisabled = !opt.disabled;
	
	  // Check if an input maintains its value after becoming a radio
	  // Support: IE9, IE10
	  input = document.createElement("input");
	  input.value = "t";
	  input.type = "radio";
	  support.radioValue = input.value === "t";
	
	  // #11217 - WebKit loses check when the name is after the checked attribute
	  input.setAttribute( "checked", "t" );
	  input.setAttribute( "name", "t" );
	
	  fragment.appendChild( input );
	
	  // Support: Safari 5.1, Android 4.x, Android 2.3
	  // old WebKit doesn't clone checked state correctly in fragments
	  support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
	  // Support: Firefox, Chrome, Safari
	  // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	  support.focusinBubbles = "onfocusin" in window;
	
	  div.style.backgroundClip = "content-box";
	  div.cloneNode( true ).style.backgroundClip = "";
	  support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
	  // Run tests that need a body at doc ready
	  jQuery(function() {
	    var container, marginDiv,
	      // Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
	      divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
	      body = document.getElementsByTagName("body")[ 0 ];
	
	    if ( !body ) {
	      // Return for frameset docs that don't have a body
	      return;
	    }
	
	    container = document.createElement("div");
	    container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
	
	    // Check box-sizing and margin behavior.
	    body.appendChild( container ).appendChild( div );
	    div.innerHTML = "";
	    // Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
	    div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";
	
	    // Workaround failing boxSizing test due to offsetWidth returning wrong value
	    // with some non-1 values of body zoom, ticket #13543
	    jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
	      support.boxSizing = div.offsetWidth === 4;
	    });
	
	    // Use window.getComputedStyle because jsdom on node.js will break without it.
	    if ( window.getComputedStyle ) {
	      support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
	      support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
	
	      // Support: Android 2.3
	      // Check if div with explicit width and no margin-right incorrectly
	      // gets computed margin-right based on width of container. (#3333)
	      // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	      marginDiv = div.appendChild( document.createElement("div") );
	      marginDiv.style.cssText = div.style.cssText = divReset;
	      marginDiv.style.marginRight = marginDiv.style.width = "0";
	      div.style.width = "1px";
	
	      support.reliableMarginRight =
	        !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
	    }
	
	    body.removeChild( container );
	  });
	
	  return support;
	})( {} );
	
	/*
	  Implementation Summary
	
	  1. Enforce API surface and semantic compatibility with 1.9.x branch
	  2. Improve the module's maintainability by reducing the storage
	    paths to a single mechanism.
	  3. Use the same single mechanism to support "private" and "user" data.
	  4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	  5. Avoid exposing implementation details on user objects (eg. expando properties)
	  6. Provide a clear path for implementation upgrade to WeakMap in 2014
	*/
	var data_user, data_priv,
	  rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	  rmultiDash = /([A-Z])/g;
	
	function Data() {
	  // Support: Android < 4,
	  // Old WebKit does not have Object.preventExtensions/freeze method,
	  // return new empty object instead with no [[set]] accessor
	  Object.defineProperty( this.cache = {}, 0, {
	    get: function() {
	      return {};
	    }
	  });
	
	  this.expando = jQuery.expando + Math.random();
	}
	
	Data.uid = 1;
	
	Data.accepts = function( owner ) {
	  // Accepts only:
	  //  - Node
	  //    - Node.ELEMENT_NODE
	  //    - Node.DOCUMENT_NODE
	  //  - Object
	  //    - Any
	  return owner.nodeType ?
	    owner.nodeType === 1 || owner.nodeType === 9 : true;
	};
	
	Data.prototype = {
	  key: function( owner ) {
	    // We can accept data for non-element nodes in modern browsers,
	    // but we should not, see #8335.
	    // Always return the key for a frozen object.
	    if ( !Data.accepts( owner ) ) {
	      return 0;
	    }
	
	    var descriptor = {},
	      // Check if the owner object already has a cache key
	      unlock = owner[ this.expando ];
	
	    // If not, create one
	    if ( !unlock ) {
	      unlock = Data.uid++;
	
	      // Secure it in a non-enumerable, non-writable property
	      try {
	        descriptor[ this.expando ] = { value: unlock };
	        Object.defineProperties( owner, descriptor );
	
	      // Support: Android < 4
	      // Fallback to a less secure definition
	      } catch ( e ) {
	        descriptor[ this.expando ] = unlock;
	        jQuery.extend( owner, descriptor );
	      }
	    }
	
	    // Ensure the cache object
	    if ( !this.cache[ unlock ] ) {
	      this.cache[ unlock ] = {};
	    }
	
	    return unlock;
	  },
	  set: function( owner, data, value ) {
	    var prop,
	      // There may be an unlock assigned to this node,
	      // if there is no entry for this "owner", create one inline
	      // and set the unlock as though an owner entry had always existed
	      unlock = this.key( owner ),
	      cache = this.cache[ unlock ];
	
	    // Handle: [ owner, key, value ] args
	    if ( typeof data === "string" ) {
	      cache[ data ] = value;
	
	    // Handle: [ owner, { properties } ] args
	    } else {
	      // Fresh assignments by object are shallow copied
	      if ( jQuery.isEmptyObject( cache ) ) {
	        jQuery.extend( this.cache[ unlock ], data );
	      // Otherwise, copy the properties one-by-one to the cache object
	      } else {
	        for ( prop in data ) {
	          cache[ prop ] = data[ prop ];
	        }
	      }
	    }
	    return cache;
	  },
	  get: function( owner, key ) {
	    // Either a valid cache is found, or will be created.
	    // New caches will be created and the unlock returned,
	    // allowing direct access to the newly created
	    // empty data object. A valid owner object must be provided.
	    var cache = this.cache[ this.key( owner ) ];
	
	    return key === undefined ?
	      cache : cache[ key ];
	  },
	  access: function( owner, key, value ) {
	    var stored;
	    // In cases where either:
	    //
	    //   1. No key was specified
	    //   2. A string key was specified, but no value provided
	    //
	    // Take the "read" path and allow the get method to determine
	    // which value to return, respectively either:
	    //
	    //   1. The entire cache object
	    //   2. The data stored at the key
	    //
	    if ( key === undefined ||
	        ((key && typeof key === "string") && value === undefined) ) {
	
	      stored = this.get( owner, key );
	
	      return stored !== undefined ?
	        stored : this.get( owner, jQuery.camelCase(key) );
	    }
	
	    // [*]When the key is not a string, or both a key and value
	    // are specified, set or extend (existing objects) with either:
	    //
	    //   1. An object of properties
	    //   2. A key and value
	    //
	    this.set( owner, key, value );
	
	    // Since the "set" path can have two possible entry points
	    // return the expected data based on which path was taken[*]
	    return value !== undefined ? value : key;
	  },
	  remove: function( owner, key ) {
	    var i, name, camel,
	      unlock = this.key( owner ),
	      cache = this.cache[ unlock ];
	
	    if ( key === undefined ) {
	      this.cache[ unlock ] = {};
	
	    } else {
	      // Support array or space separated string of keys
	      if ( jQuery.isArray( key ) ) {
	        // If "name" is an array of keys...
	        // When data is initially created, via ("key", "val") signature,
	        // keys will be converted to camelCase.
	        // Since there is no way to tell _how_ a key was added, remove
	        // both plain key and camelCase key. #12786
	        // This will only penalize the array argument path.
	        name = key.concat( key.map( jQuery.camelCase ) );
	      } else {
	        camel = jQuery.camelCase( key );
	        // Try the string as a key before any manipulation
	        if ( key in cache ) {
	          name = [ key, camel ];
	        } else {
	          // If a key with the spaces exists, use it.
	          // Otherwise, create an array by matching non-whitespace
	          name = camel;
	          name = name in cache ?
	            [ name ] : ( name.match( core_rnotwhite ) || [] );
	        }
	      }
	
	      i = name.length;
	      while ( i-- ) {
	        delete cache[ name[ i ] ];
	      }
	    }
	  },
	  hasData: function( owner ) {
	    return !jQuery.isEmptyObject(
	      this.cache[ owner[ this.expando ] ] || {}
	    );
	  },
	  discard: function( owner ) {
	    if ( owner[ this.expando ] ) {
	      delete this.cache[ owner[ this.expando ] ];
	    }
	  }
	};
	
	// These may be used throughout the jQuery core codebase
	data_user = new Data();
	data_priv = new Data();
	
	
	jQuery.extend({
	  acceptData: Data.accepts,
	
	  hasData: function( elem ) {
	    return data_user.hasData( elem ) || data_priv.hasData( elem );
	  },
	
	  data: function( elem, name, data ) {
	    return data_user.access( elem, name, data );
	  },
	
	  removeData: function( elem, name ) {
	    data_user.remove( elem, name );
	  },
	
	  // TODO: Now that all calls to _data and _removeData have been replaced
	  // with direct calls to data_priv methods, these can be deprecated.
	  _data: function( elem, name, data ) {
	    return data_priv.access( elem, name, data );
	  },
	
	  _removeData: function( elem, name ) {
	    data_priv.remove( elem, name );
	  }
	});
	
	jQuery.fn.extend({
	  data: function( key, value ) {
	    var attrs, name,
	      elem = this[ 0 ],
	      i = 0,
	      data = null;
	
	    // Gets all values
	    if ( key === undefined ) {
	      if ( this.length ) {
	        data = data_user.get( elem );
	
	        if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
	          attrs = elem.attributes;
	          for ( ; i < attrs.length; i++ ) {
	            name = attrs[ i ].name;
	
	            if ( name.indexOf( "data-" ) === 0 ) {
	              name = jQuery.camelCase( name.slice(5) );
	              dataAttr( elem, name, data[ name ] );
	            }
	          }
	          data_priv.set( elem, "hasDataAttrs", true );
	        }
	      }
	
	      return data;
	    }
	
	    // Sets multiple values
	    if ( typeof key === "object" ) {
	      return this.each(function() {
	        data_user.set( this, key );
	      });
	    }
	
	    return jQuery.access( this, function( value ) {
	      var data,
	        camelKey = jQuery.camelCase( key );
	
	      // The calling jQuery object (element matches) is not empty
	      // (and therefore has an element appears at this[ 0 ]) and the
	      // `value` parameter was not undefined. An empty jQuery object
	      // will result in `undefined` for elem = this[ 0 ] which will
	      // throw an exception if an attempt to read a data cache is made.
	      if ( elem && value === undefined ) {
	        // Attempt to get data from the cache
	        // with the key as-is
	        data = data_user.get( elem, key );
	        if ( data !== undefined ) {
	          return data;
	        }
	
	        // Attempt to get data from the cache
	        // with the key camelized
	        data = data_user.get( elem, camelKey );
	        if ( data !== undefined ) {
	          return data;
	        }
	
	        // Attempt to "discover" the data in
	        // HTML5 custom data-* attrs
	        data = dataAttr( elem, camelKey, undefined );
	        if ( data !== undefined ) {
	          return data;
	        }
	
	        // We tried really hard, but the data doesn't exist.
	        return;
	      }
	
	      // Set the data...
	      this.each(function() {
	        // First, attempt to store a copy or reference of any
	        // data that might've been store with a camelCased key.
	        var data = data_user.get( this, camelKey );
	
	        // For HTML5 data-* attribute interop, we have to
	        // store property names with dashes in a camelCase form.
	        // This might not apply to all properties...*
	        data_user.set( this, camelKey, value );
	
	        // *... In the case of properties that might _actually_
	        // have dashes, we need to also store a copy of that
	        // unchanged property.
	        if ( key.indexOf("-") !== -1 && data !== undefined ) {
	          data_user.set( this, key, value );
	        }
	      });
	    }, null, value, arguments.length > 1, null, true );
	  },
	
	  removeData: function( key ) {
	    return this.each(function() {
	      data_user.remove( this, key );
	    });
	  }
	});
	
	function dataAttr( elem, key, data ) {
	  var name;
	
	  // If nothing was found internally, try to fetch any
	  // data from the HTML5 data-* attribute
	  if ( data === undefined && elem.nodeType === 1 ) {
	    name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
	    data = elem.getAttribute( name );
	
	    if ( typeof data === "string" ) {
	      try {
	        data = data === "true" ? true :
	          data === "false" ? false :
	          data === "null" ? null :
	          // Only convert to a number if it doesn't change the string
	          +data + "" === data ? +data :
	          rbrace.test( data ) ? JSON.parse( data ) :
	          data;
	      } catch( e ) {}
	
	      // Make sure we set the data so it isn't changed later
	      data_user.set( elem, key, data );
	    } else {
	      data = undefined;
	    }
	  }
	  return data;
	}
	jQuery.extend({
	  queue: function( elem, type, data ) {
	    var queue;
	
	    if ( elem ) {
	      type = ( type || "fx" ) + "queue";
	      queue = data_priv.get( elem, type );
	
	      // Speed up dequeue by getting out quickly if this is just a lookup
	      if ( data ) {
	        if ( !queue || jQuery.isArray( data ) ) {
	          queue = data_priv.access( elem, type, jQuery.makeArray(data) );
	        } else {
	          queue.push( data );
	        }
	      }
	      return queue || [];
	    }
	  },
	
	  dequeue: function( elem, type ) {
	    type = type || "fx";
	
	    var queue = jQuery.queue( elem, type ),
	      startLength = queue.length,
	      fn = queue.shift(),
	      hooks = jQuery._queueHooks( elem, type ),
	      next = function() {
	        jQuery.dequeue( elem, type );
	      };
	
	    // If the fx queue is dequeued, always remove the progress sentinel
	    if ( fn === "inprogress" ) {
	      fn = queue.shift();
	      startLength--;
	    }
	
	    if ( fn ) {
	
	      // Add a progress sentinel to prevent the fx queue from being
	      // automatically dequeued
	      if ( type === "fx" ) {
	        queue.unshift( "inprogress" );
	      }
	
	      // clear up the last queue stop function
	      delete hooks.stop;
	      fn.call( elem, next, hooks );
	    }
	
	    if ( !startLength && hooks ) {
	      hooks.empty.fire();
	    }
	  },
	
	  // not intended for public consumption - generates a queueHooks object, or returns the current one
	  _queueHooks: function( elem, type ) {
	    var key = type + "queueHooks";
	    return data_priv.get( elem, key ) || data_priv.access( elem, key, {
	      empty: jQuery.Callbacks("once memory").add(function() {
	        data_priv.remove( elem, [ type + "queue", key ] );
	      })
	    });
	  }
	});
	
	jQuery.fn.extend({
	  queue: function( type, data ) {
	    var setter = 2;
	
	    if ( typeof type !== "string" ) {
	      data = type;
	      type = "fx";
	      setter--;
	    }
	
	    if ( arguments.length < setter ) {
	      return jQuery.queue( this[0], type );
	    }
	
	    return data === undefined ?
	      this :
	      this.each(function() {
	        var queue = jQuery.queue( this, type, data );
	
	        // ensure a hooks for this queue
	        jQuery._queueHooks( this, type );
	
	        if ( type === "fx" && queue[0] !== "inprogress" ) {
	          jQuery.dequeue( this, type );
	        }
	      });
	  },
	  dequeue: function( type ) {
	    return this.each(function() {
	      jQuery.dequeue( this, type );
	    });
	  },
	  // Based off of the plugin by Clint Helfers, with permission.
	  // http://blindsignals.com/index.php/2009/07/jquery-delay/
	  delay: function( time, type ) {
	    time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	    type = type || "fx";
	
	    return this.queue( type, function( next, hooks ) {
	      var timeout = setTimeout( next, time );
	      hooks.stop = function() {
	        clearTimeout( timeout );
	      };
	    });
	  },
	  clearQueue: function( type ) {
	    return this.queue( type || "fx", [] );
	  },
	  // Get a promise resolved when queues of a certain type
	  // are emptied (fx is the type by default)
	  promise: function( type, obj ) {
	    var tmp,
	      count = 1,
	      defer = jQuery.Deferred(),
	      elements = this,
	      i = this.length,
	      resolve = function() {
	        if ( !( --count ) ) {
	          defer.resolveWith( elements, [ elements ] );
	        }
	      };
	
	    if ( typeof type !== "string" ) {
	      obj = type;
	      type = undefined;
	    }
	    type = type || "fx";
	
	    while( i-- ) {
	      tmp = data_priv.get( elements[ i ], type + "queueHooks" );
	      if ( tmp && tmp.empty ) {
	        count++;
	        tmp.empty.add( resolve );
	      }
	    }
	    resolve();
	    return defer.promise( obj );
	  }
	});
	var nodeHook, boolHook,
	  rclass = /[\t\r\n\f]/g,
	  rreturn = /\r/g,
	  rfocusable = /^(?:input|select|textarea|button)$/i;
	
	jQuery.fn.extend({
	  attr: function( name, value ) {
	    return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	  },
	
	  removeAttr: function( name ) {
	    return this.each(function() {
	      jQuery.removeAttr( this, name );
	    });
	  },
	
	  prop: function( name, value ) {
	    return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	  },
	
	  removeProp: function( name ) {
	    return this.each(function() {
	      delete this[ jQuery.propFix[ name ] || name ];
	    });
	  },
	
	  addClass: function( value ) {
	    var classes, elem, cur, clazz, j,
	      i = 0,
	      len = this.length,
	      proceed = typeof value === "string" && value;
	
	    if ( jQuery.isFunction( value ) ) {
	      return this.each(function( j ) {
	        jQuery( this ).addClass( value.call( this, j, this.className ) );
	      });
	    }
	
	    if ( proceed ) {
	      // The disjunction here is for better compressibility (see removeClass)
	      classes = ( value || "" ).match( core_rnotwhite ) || [];
	
	      for ( ; i < len; i++ ) {
	        elem = this[ i ];
	        cur = elem.nodeType === 1 && ( elem.className ?
	          ( " " + elem.className + " " ).replace( rclass, " " ) :
	          " "
	        );
	
	        if ( cur ) {
	          j = 0;
	          while ( (clazz = classes[j++]) ) {
	            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
	              cur += clazz + " ";
	            }
	          }
	          elem.className = jQuery.trim( cur );
	
	        }
	      }
	    }
	
	    return this;
	  },
	
	  removeClass: function( value ) {
	    var classes, elem, cur, clazz, j,
	      i = 0,
	      len = this.length,
	      proceed = arguments.length === 0 || typeof value === "string" && value;
	
	    if ( jQuery.isFunction( value ) ) {
	      return this.each(function( j ) {
	        jQuery( this ).removeClass( value.call( this, j, this.className ) );
	      });
	    }
	    if ( proceed ) {
	      classes = ( value || "" ).match( core_rnotwhite ) || [];
	
	      for ( ; i < len; i++ ) {
	        elem = this[ i ];
	        // This expression is here for better compressibility (see addClass)
	        cur = elem.nodeType === 1 && ( elem.className ?
	          ( " " + elem.className + " " ).replace( rclass, " " ) :
	          ""
	        );
	
	        if ( cur ) {
	          j = 0;
	          while ( (clazz = classes[j++]) ) {
	            // Remove *all* instances
	            while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
	              cur = cur.replace( " " + clazz + " ", " " );
	            }
	          }
	          elem.className = value ? jQuery.trim( cur ) : "";
	        }
	      }
	    }
	
	    return this;
	  },
	
	  toggleClass: function( value, stateVal ) {
	    var type = typeof value;
	
	    if ( typeof stateVal === "boolean" && type === "string" ) {
	      return stateVal ? this.addClass( value ) : this.removeClass( value );
	    }
	
	    if ( jQuery.isFunction( value ) ) {
	      return this.each(function( i ) {
	        jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
	      });
	    }
	
	    return this.each(function() {
	      if ( type === "string" ) {
	        // toggle individual class names
	        var className,
	          i = 0,
	          self = jQuery( this ),
	          classNames = value.match( core_rnotwhite ) || [];
	
	        while ( (className = classNames[ i++ ]) ) {
	          // check each className given, space separated list
	          if ( self.hasClass( className ) ) {
	            self.removeClass( className );
	          } else {
	            self.addClass( className );
	          }
	        }
	
	      // Toggle whole class name
	      } else if ( type === core_strundefined || type === "boolean" ) {
	        if ( this.className ) {
	          // store className if set
	          data_priv.set( this, "__className__", this.className );
	        }
	
	        // If the element has a class name or if we're passed "false",
	        // then remove the whole classname (if there was one, the above saved it).
	        // Otherwise bring back whatever was previously saved (if anything),
	        // falling back to the empty string if nothing was stored.
	        this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
	      }
	    });
	  },
	
	  hasClass: function( selector ) {
	    var className = " " + selector + " ",
	      i = 0,
	      l = this.length;
	    for ( ; i < l; i++ ) {
	      if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
	        return true;
	      }
	    }
	
	    return false;
	  },
	
	  val: function( value ) {
	    var hooks, ret, isFunction,
	      elem = this[0];
	
	    if ( !arguments.length ) {
	      if ( elem ) {
	        hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
	        if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
	          return ret;
	        }
	
	        ret = elem.value;
	
	        return typeof ret === "string" ?
	          // handle most common string cases
	          ret.replace(rreturn, "") :
	          // handle cases where value is null/undef or number
	          ret == null ? "" : ret;
	      }
	
	      return;
	    }
	
	    isFunction = jQuery.isFunction( value );
	
	    return this.each(function( i ) {
	      var val;
	
	      if ( this.nodeType !== 1 ) {
	        return;
	      }
	
	      if ( isFunction ) {
	        val = value.call( this, i, jQuery( this ).val() );
	      } else {
	        val = value;
	      }
	
	      // Treat null/undefined as ""; convert numbers to string
	      if ( val == null ) {
	        val = "";
	      } else if ( typeof val === "number" ) {
	        val += "";
	      } else if ( jQuery.isArray( val ) ) {
	        val = jQuery.map(val, function ( value ) {
	          return value == null ? "" : value + "";
	        });
	      }
	
	      hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
	      // If set returns undefined, fall back to normal setting
	      if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
	        this.value = val;
	      }
	    });
	  }
	});
	
	jQuery.extend({
	  valHooks: {
	    option: {
	      get: function( elem ) {
	        // attributes.value is undefined in Blackberry 4.7 but
	        // uses .value. See #6932
	        var val = elem.attributes.value;
	        return !val || val.specified ? elem.value : elem.text;
	      }
	    },
	    select: {
	      get: function( elem ) {
	        var value, option,
	          options = elem.options,
	          index = elem.selectedIndex,
	          one = elem.type === "select-one" || index < 0,
	          values = one ? null : [],
	          max = one ? index + 1 : options.length,
	          i = index < 0 ?
	            max :
	            one ? index : 0;
	
	        // Loop through all the selected options
	        for ( ; i < max; i++ ) {
	          option = options[ i ];
	
	          // IE6-9 doesn't update selected after form reset (#2551)
	          if ( ( option.selected || i === index ) &&
	              // Don't return options that are disabled or in a disabled optgroup
	              ( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
	              ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
	            // Get the specific value for the option
	            value = jQuery( option ).val();
	
	            // We don't need an array for one selects
	            if ( one ) {
	              return value;
	            }
	
	            // Multi-Selects return an array
	            values.push( value );
	          }
	        }
	
	        return values;
	      },
	
	      set: function( elem, value ) {
	        var optionSet, option,
	          options = elem.options,
	          values = jQuery.makeArray( value ),
	          i = options.length;
	
	        while ( i-- ) {
	          option = options[ i ];
	          if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
	            optionSet = true;
	          }
	        }
	
	        // force browsers to behave consistently when non-matching value is set
	        if ( !optionSet ) {
	          elem.selectedIndex = -1;
	        }
	        return values;
	      }
	    }
	  },
	
	  attr: function( elem, name, value ) {
	    var hooks, ret,
	      nType = elem.nodeType;
	
	    // don't get/set attributes on text, comment and attribute nodes
	    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
	      return;
	    }
	
	    // Fallback to prop when attributes are not supported
	    if ( typeof elem.getAttribute === core_strundefined ) {
	      return jQuery.prop( elem, name, value );
	    }
	
	    // All attributes are lowercase
	    // Grab necessary hook if one is defined
	    if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	      name = name.toLowerCase();
	      hooks = jQuery.attrHooks[ name ] ||
	        ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
	    }
	
	    if ( value !== undefined ) {
	
	      if ( value === null ) {
	        jQuery.removeAttr( elem, name );
	
	      } else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
	        return ret;
	
	      } else {
	        elem.setAttribute( name, value + "" );
	        return value;
	      }
	
	    } else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
	      return ret;
	
	    } else {
	      ret = jQuery.find.attr( elem, name );
	
	      // Non-existent attributes return null, we normalize to undefined
	      return ret == null ?
	        undefined :
	        ret;
	    }
	  },
	
	  removeAttr: function( elem, value ) {
	    var name, propName,
	      i = 0,
	      attrNames = value && value.match( core_rnotwhite );
	
	    if ( attrNames && elem.nodeType === 1 ) {
	      while ( (name = attrNames[i++]) ) {
	        propName = jQuery.propFix[ name ] || name;
	
	        // Boolean attributes get special treatment (#10870)
	        if ( jQuery.expr.match.bool.test( name ) ) {
	          // Set corresponding property to false
	          elem[ propName ] = false;
	        }
	
	        elem.removeAttribute( name );
	      }
	    }
	  },
	
	  attrHooks: {
	    type: {
	      set: function( elem, value ) {
	        if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
	          // Setting the type on a radio button after the value resets the value in IE6-9
	          // Reset value to default in case type is set after value during creation
	          var val = elem.value;
	          elem.setAttribute( "type", value );
	          if ( val ) {
	            elem.value = val;
	          }
	          return value;
	        }
	      }
	    }
	  },
	
	  propFix: {
	    "for": "htmlFor",
	    "class": "className"
	  },
	
	  prop: function( elem, name, value ) {
	    var ret, hooks, notxml,
	      nType = elem.nodeType;
	
	    // don't get/set properties on text, comment and attribute nodes
	    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
	      return;
	    }
	
	    notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
	
	    if ( notxml ) {
	      // Fix name and attach hooks
	      name = jQuery.propFix[ name ] || name;
	      hooks = jQuery.propHooks[ name ];
	    }
	
	    if ( value !== undefined ) {
	      return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
	        ret :
	        ( elem[ name ] = value );
	
	    } else {
	      return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
	        ret :
	        elem[ name ];
	    }
	  },
	
	  propHooks: {
	    tabIndex: {
	      get: function( elem ) {
	        return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
	          elem.tabIndex :
	          -1;
	      }
	    }
	  }
	});
	
	// Hooks for boolean attributes
	boolHook = {
	  set: function( elem, value, name ) {
	    if ( value === false ) {
	      // Remove boolean attributes when set to false
	      jQuery.removeAttr( elem, name );
	    } else {
	      elem.setAttribute( name, name );
	    }
	    return name;
	  }
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	  var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;
	
	  jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ) {
	    var fn = jQuery.expr.attrHandle[ name ],
	      ret = isXML ?
	        undefined :
	        /* jshint eqeqeq: false */
	        // Temporarily disable this handler to check existence
	        (jQuery.expr.attrHandle[ name ] = undefined) !=
	          getter( elem, name, isXML ) ?
	
	          name.toLowerCase() :
	          null;
	
	    // Restore handler
	    jQuery.expr.attrHandle[ name ] = fn;
	
	    return ret;
	  };
	});
	
	// Support: IE9+
	// Selectedness for an option in an optgroup can be inaccurate
	if ( !jQuery.support.optSelected ) {
	  jQuery.propHooks.selected = {
	    get: function( elem ) {
	      var parent = elem.parentNode;
	      if ( parent && parent.parentNode ) {
	        parent.parentNode.selectedIndex;
	      }
	      return null;
	    }
	  };
	}
	
	jQuery.each([
	  "tabIndex",
	  "readOnly",
	  "maxLength",
	  "cellSpacing",
	  "cellPadding",
	  "rowSpan",
	  "colSpan",
	  "useMap",
	  "frameBorder",
	  "contentEditable"
	], function() {
	  jQuery.propFix[ this.toLowerCase() ] = this;
	});
	
	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
	  jQuery.valHooks[ this ] = {
	    set: function( elem, value ) {
	      if ( jQuery.isArray( value ) ) {
	        return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
	      }
	    }
	  };
	  if ( !jQuery.support.checkOn ) {
	    jQuery.valHooks[ this ].get = function( elem ) {
	      // Support: Webkit
	      // "" is returned instead of "on" if a value isn't specified
	      return elem.getAttribute("value") === null ? "on" : elem.value;
	    };
	  }
	});
	var rkeyEvent = /^key/,
	  rmouseEvent = /^(?:mouse|contextmenu)|click/,
	  rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	  rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	
	function returnTrue() {
	  return true;
	}
	
	function returnFalse() {
	  return false;
	}
	
	function safeActiveElement() {
	  try {
	    return document.activeElement;
	  } catch ( err ) { }
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
	  global: {},
	
	  add: function( elem, types, handler, data, selector ) {
	
	    var handleObjIn, eventHandle, tmp,
	      events, t, handleObj,
	      special, handlers, type, namespaces, origType,
	      elemData = data_priv.get( elem );
	
	    // Don't attach events to noData or text/comment nodes (but allow plain objects)
	    if ( !elemData ) {
	      return;
	    }
	
	    // Caller can pass in an object of custom data in lieu of the handler
	    if ( handler.handler ) {
	      handleObjIn = handler;
	      handler = handleObjIn.handler;
	      selector = handleObjIn.selector;
	    }
	
	    // Make sure that the handler has a unique ID, used to find/remove it later
	    if ( !handler.guid ) {
	      handler.guid = jQuery.guid++;
	    }
	
	    // Init the element's event structure and main handler, if this is the first
	    if ( !(events = elemData.events) ) {
	      events = elemData.events = {};
	    }
	    if ( !(eventHandle = elemData.handle) ) {
	      eventHandle = elemData.handle = function( e ) {
	        // Discard the second event of a jQuery.event.trigger() and
	        // when an event is called after a page has unloaded
	        return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
	          jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
	          undefined;
	      };
	      // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
	      eventHandle.elem = elem;
	    }
	
	    // Handle multiple events separated by a space
	    types = ( types || "" ).match( core_rnotwhite ) || [""];
	    t = types.length;
	    while ( t-- ) {
	      tmp = rtypenamespace.exec( types[t] ) || [];
	      type = origType = tmp[1];
	      namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
	      // There *must* be a type, no attaching namespace-only handlers
	      if ( !type ) {
	        continue;
	      }
	
	      // If event changes its type, use the special event handlers for the changed type
	      special = jQuery.event.special[ type ] || {};
	
	      // If selector defined, determine special event api type, otherwise given type
	      type = ( selector ? special.delegateType : special.bindType ) || type;
	
	      // Update special based on newly reset type
	      special = jQuery.event.special[ type ] || {};
	
	      // handleObj is passed to all event handlers
	      handleObj = jQuery.extend({
	        type: type,
	        origType: origType,
	        data: data,
	        handler: handler,
	        guid: handler.guid,
	        selector: selector,
	        needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
	        namespace: namespaces.join(".")
	      }, handleObjIn );
	
	      // Init the event handler queue if we're the first
	      if ( !(handlers = events[ type ]) ) {
	        handlers = events[ type ] = [];
	        handlers.delegateCount = 0;
	
	        // Only use addEventListener if the special events handler returns false
	        if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	          if ( elem.addEventListener ) {
	            elem.addEventListener( type, eventHandle, false );
	          }
	        }
	      }
	
	      if ( special.add ) {
	        special.add.call( elem, handleObj );
	
	        if ( !handleObj.handler.guid ) {
	          handleObj.handler.guid = handler.guid;
	        }
	      }
	
	      // Add to the element's handler list, delegates in front
	      if ( selector ) {
	        handlers.splice( handlers.delegateCount++, 0, handleObj );
	      } else {
	        handlers.push( handleObj );
	      }
	
	      // Keep track of which events have ever been used, for event optimization
	      jQuery.event.global[ type ] = true;
	    }
	
	    // Nullify elem to prevent memory leaks in IE
	    elem = null;
	  },
	
	  // Detach an event or set of events from an element
	  remove: function( elem, types, handler, selector, mappedTypes ) {
	
	    var j, origCount, tmp,
	      events, t, handleObj,
	      special, handlers, type, namespaces, origType,
	      elemData = data_priv.hasData( elem ) && data_priv.get( elem );
	
	    if ( !elemData || !(events = elemData.events) ) {
	      return;
	    }
	
	    // Once for each type.namespace in types; type may be omitted
	    types = ( types || "" ).match( core_rnotwhite ) || [""];
	    t = types.length;
	    while ( t-- ) {
	      tmp = rtypenamespace.exec( types[t] ) || [];
	      type = origType = tmp[1];
	      namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
	      // Unbind all events (on this namespace, if provided) for the element
	      if ( !type ) {
	        for ( type in events ) {
	          jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
	        }
	        continue;
	      }
	
	      special = jQuery.event.special[ type ] || {};
	      type = ( selector ? special.delegateType : special.bindType ) || type;
	      handlers = events[ type ] || [];
	      tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );
	
	      // Remove matching events
	      origCount = j = handlers.length;
	      while ( j-- ) {
	        handleObj = handlers[ j ];
	
	        if ( ( mappedTypes || origType === handleObj.origType ) &&
	          ( !handler || handler.guid === handleObj.guid ) &&
	          ( !tmp || tmp.test( handleObj.namespace ) ) &&
	          ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
	          handlers.splice( j, 1 );
	
	          if ( handleObj.selector ) {
	            handlers.delegateCount--;
	          }
	          if ( special.remove ) {
	            special.remove.call( elem, handleObj );
	          }
	        }
	      }
	
	      // Remove generic event handler if we removed something and no more handlers exist
	      // (avoids potential for endless recursion during removal of special event handlers)
	      if ( origCount && !handlers.length ) {
	        if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	          jQuery.removeEvent( elem, type, elemData.handle );
	        }
	
	        delete events[ type ];
	      }
	    }
	
	    // Remove the expando if it's no longer used
	    if ( jQuery.isEmptyObject( events ) ) {
	      delete elemData.handle;
	      data_priv.remove( elem, "events" );
	    }
	  },
	
	  trigger: function( event, data, elem, onlyHandlers ) {
	
	    var i, cur, tmp, bubbleType, ontype, handle, special,
	      eventPath = [ elem || document ],
	      type = core_hasOwn.call( event, "type" ) ? event.type : event,
	      namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];
	
	    cur = tmp = elem = elem || document;
	
	    // Don't do events on text and comment nodes
	    if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
	      return;
	    }
	
	    // focus/blur morphs to focusin/out; ensure we're not firing them right now
	    if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
	      return;
	    }
	
	    if ( type.indexOf(".") >= 0 ) {
	      // Namespaced trigger; create a regexp to match event type in handle()
	      namespaces = type.split(".");
	      type = namespaces.shift();
	      namespaces.sort();
	    }
	    ontype = type.indexOf(":") < 0 && "on" + type;
	
	    // Caller can pass in a jQuery.Event object, Object, or just an event type string
	    event = event[ jQuery.expando ] ?
	      event :
	      new jQuery.Event( type, typeof event === "object" && event );
	
	    // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
	    event.isTrigger = onlyHandlers ? 2 : 3;
	    event.namespace = namespaces.join(".");
	    event.namespace_re = event.namespace ?
	      new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
	      null;
	
	    // Clean up the event in case it is being reused
	    event.result = undefined;
	    if ( !event.target ) {
	      event.target = elem;
	    }
	
	    // Clone any incoming data and prepend the event, creating the handler arg list
	    data = data == null ?
	      [ event ] :
	      jQuery.makeArray( data, [ event ] );
	
	    // Allow special events to draw outside the lines
	    special = jQuery.event.special[ type ] || {};
	    if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
	      return;
	    }
	
	    // Determine event propagation path in advance, per W3C events spec (#9951)
	    // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
	    if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
	      bubbleType = special.delegateType || type;
	      if ( !rfocusMorph.test( bubbleType + type ) ) {
	        cur = cur.parentNode;
	      }
	      for ( ; cur; cur = cur.parentNode ) {
	        eventPath.push( cur );
	        tmp = cur;
	      }
	
	      // Only add window if we got to document (e.g., not plain obj or detached DOM)
	      if ( tmp === (elem.ownerDocument || document) ) {
	        eventPath.push( tmp.defaultView || tmp.parentWindow || window );
	      }
	    }
	
	    // Fire handlers on the event path
	    i = 0;
	    while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {
	
	      event.type = i > 1 ?
	        bubbleType :
	        special.bindType || type;
	
	      // jQuery handler
	      handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
	      if ( handle ) {
	        handle.apply( cur, data );
	      }
	
	      // Native handler
	      handle = ontype && cur[ ontype ];
	      if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
	        event.preventDefault();
	      }
	    }
	    event.type = type;
	
	    // If nobody prevented the default action, do it now
	    if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
	      if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
	        jQuery.acceptData( elem ) ) {
	
	        // Call a native DOM method on the target with the same name name as the event.
	        // Don't do default actions on window, that's where global variables be (#6170)
	        if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
	          // Don't re-trigger an onFOO event when we call its FOO() method
	          tmp = elem[ ontype ];
	
	          if ( tmp ) {
	            elem[ ontype ] = null;
	          }
	
	          // Prevent re-triggering of the same event, since we already bubbled it above
	          jQuery.event.triggered = type;
	          elem[ type ]();
	          jQuery.event.triggered = undefined;
	
	          if ( tmp ) {
	            elem[ ontype ] = tmp;
	          }
	        }
	      }
	    }
	
	    return event.result;
	  },
	
	  dispatch: function( event ) {
	
	    // Make a writable jQuery.Event from the native event object
	    event = jQuery.event.fix( event );
	
	    var i, j, ret, matched, handleObj,
	      handlerQueue = [],
	      args = core_slice.call( arguments ),
	      handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
	      special = jQuery.event.special[ event.type ] || {};
	
	    // Use the fix-ed jQuery.Event rather than the (read-only) native event
	    args[0] = event;
	    event.delegateTarget = this;
	
	    // Call the preDispatch hook for the mapped type, and let it bail if desired
	    if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
	      return;
	    }
	
	    // Determine handlers
	    handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
	    // Run delegates first; they may want to stop propagation beneath us
	    i = 0;
	    while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
	      event.currentTarget = matched.elem;
	
	      j = 0;
	      while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {
	
	        // Triggered event must either 1) have no namespace, or
	        // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
	        if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {
	
	          event.handleObj = handleObj;
	          event.data = handleObj.data;
	
	          ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
	              .apply( matched.elem, args );
	
	          if ( ret !== undefined ) {
	            if ( (event.result = ret) === false ) {
	              event.preventDefault();
	              event.stopPropagation();
	            }
	          }
	        }
	      }
	    }
	
	    // Call the postDispatch hook for the mapped type
	    if ( special.postDispatch ) {
	      special.postDispatch.call( this, event );
	    }
	
	    return event.result;
	  },
	
	  handlers: function( event, handlers ) {
	    var i, matches, sel, handleObj,
	      handlerQueue = [],
	      delegateCount = handlers.delegateCount,
	      cur = event.target;
	
	    // Find delegate handlers
	    // Black-hole SVG <use> instance trees (#13180)
	    // Avoid non-left-click bubbling in Firefox (#3861)
	    if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {
	
	      for ( ; cur !== this; cur = cur.parentNode || this ) {
	
	        // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
	        if ( cur.disabled !== true || event.type !== "click" ) {
	          matches = [];
	          for ( i = 0; i < delegateCount; i++ ) {
	            handleObj = handlers[ i ];
	
	            // Don't conflict with Object.prototype properties (#13203)
	            sel = handleObj.selector + " ";
	
	            if ( matches[ sel ] === undefined ) {
	              matches[ sel ] = handleObj.needsContext ?
	                jQuery( sel, this ).index( cur ) >= 0 :
	                jQuery.find( sel, this, null, [ cur ] ).length;
	            }
	            if ( matches[ sel ] ) {
	              matches.push( handleObj );
	            }
	          }
	          if ( matches.length ) {
	            handlerQueue.push({ elem: cur, handlers: matches });
	          }
	        }
	      }
	    }
	
	    // Add the remaining (directly-bound) handlers
	    if ( delegateCount < handlers.length ) {
	      handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
	    }
	
	    return handlerQueue;
	  },
	
	  // Includes some event props shared by KeyEvent and MouseEvent
	  props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
	
	  fixHooks: {},
	
	  keyHooks: {
	    props: "char charCode key keyCode".split(" "),
	    filter: function( event, original ) {
	
	      // Add which for key events
	      if ( event.which == null ) {
	        event.which = original.charCode != null ? original.charCode : original.keyCode;
	      }
	
	      return event;
	    }
	  },
	
	  mouseHooks: {
	    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
	    filter: function( event, original ) {
	      var eventDoc, doc, body,
	        button = original.button;
	
	      // Calculate pageX/Y if missing and clientX/Y available
	      if ( event.pageX == null && original.clientX != null ) {
	        eventDoc = event.target.ownerDocument || document;
	        doc = eventDoc.documentElement;
	        body = eventDoc.body;
	
	        event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
	        event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
	      }
	
	      // Add which for click: 1 === left; 2 === middle; 3 === right
	      // Note: button is not normalized, so don't use it
	      if ( !event.which && button !== undefined ) {
	        event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
	      }
	
	      return event;
	    }
	  },
	
	  fix: function( event ) {
	    if ( event[ jQuery.expando ] ) {
	      return event;
	    }
	
	    // Create a writable copy of the event object and normalize some properties
	    var i, prop, copy,
	      type = event.type,
	      originalEvent = event,
	      fixHook = this.fixHooks[ type ];
	
	    if ( !fixHook ) {
	      this.fixHooks[ type ] = fixHook =
	        rmouseEvent.test( type ) ? this.mouseHooks :
	        rkeyEvent.test( type ) ? this.keyHooks :
	        {};
	    }
	    copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
	    event = new jQuery.Event( originalEvent );
	
	    i = copy.length;
	    while ( i-- ) {
	      prop = copy[ i ];
	      event[ prop ] = originalEvent[ prop ];
	    }
	
	    // Support: Cordova 2.5 (WebKit) (#13255)
	    // All events should have a target; Cordova deviceready doesn't
	    if ( !event.target ) {
	      event.target = document;
	    }
	
	    // Support: Safari 6.0+, Chrome < 28
	    // Target should not be a text node (#504, #13143)
	    if ( event.target.nodeType === 3 ) {
	      event.target = event.target.parentNode;
	    }
	
	    return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	  },
	
	  special: {
	    load: {
	      // Prevent triggered image.load events from bubbling to window.load
	      noBubble: true
	    },
	    focus: {
	      // Fire native event if possible so blur/focus sequence is correct
	      trigger: function() {
	        if ( this !== safeActiveElement() && this.focus ) {
	          this.focus();
	          return false;
	        }
	      },
	      delegateType: "focusin"
	    },
	    blur: {
	      trigger: function() {
	        if ( this === safeActiveElement() && this.blur ) {
	          this.blur();
	          return false;
	        }
	      },
	      delegateType: "focusout"
	    },
	    click: {
	      // For checkbox, fire native event so checked state will be right
	      trigger: function() {
	        if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
	          this.click();
	          return false;
	        }
	      },
	
	      // For cross-browser consistency, don't fire native .click() on links
	      _default: function( event ) {
	        return jQuery.nodeName( event.target, "a" );
	      }
	    },
	
	    beforeunload: {
	      postDispatch: function( event ) {
	
	        // Support: Firefox 20+
	        // Firefox doesn't alert if the returnValue field is not set.
	        if ( event.result !== undefined ) {
	          event.originalEvent.returnValue = event.result;
	        }
	      }
	    }
	  },
	
	  simulate: function( type, elem, event, bubble ) {
	    // Piggyback on a donor event to simulate a different one.
	    // Fake originalEvent to avoid donor's stopPropagation, but if the
	    // simulated event prevents default then we do the same on the donor.
	    var e = jQuery.extend(
	      new jQuery.Event(),
	      event,
	      {
	        type: type,
	        isSimulated: true,
	        originalEvent: {}
	      }
	    );
	    if ( bubble ) {
	      jQuery.event.trigger( e, null, elem );
	    } else {
	      jQuery.event.dispatch.call( elem, e );
	    }
	    if ( e.isDefaultPrevented() ) {
	      event.preventDefault();
	    }
	  }
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	  if ( elem.removeEventListener ) {
	    elem.removeEventListener( type, handle, false );
	  }
	};
	
	jQuery.Event = function( src, props ) {
	  // Allow instantiation without the 'new' keyword
	  if ( !(this instanceof jQuery.Event) ) {
	    return new jQuery.Event( src, props );
	  }
	
	  // Event object
	  if ( src && src.type ) {
	    this.originalEvent = src;
	    this.type = src.type;
	
	    // Events bubbling up the document may have been marked as prevented
	    // by a handler lower down the tree; reflect the correct value.
	    this.isDefaultPrevented = ( src.defaultPrevented ||
	      src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;
	
	  // Event type
	  } else {
	    this.type = src;
	  }
	
	  // Put explicitly provided properties onto the event object
	  if ( props ) {
	    jQuery.extend( this, props );
	  }
	
	  // Create a timestamp if incoming event doesn't have one
	  this.timeStamp = src && src.timeStamp || jQuery.now();
	
	  // Mark it as fixed
	  this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
	  isDefaultPrevented: returnFalse,
	  isPropagationStopped: returnFalse,
	  isImmediatePropagationStopped: returnFalse,
	
	  preventDefault: function() {
	    var e = this.originalEvent;
	
	    this.isDefaultPrevented = returnTrue;
	
	    if ( e && e.preventDefault ) {
	      e.preventDefault();
	    }
	  },
	  stopPropagation: function() {
	    var e = this.originalEvent;
	
	    this.isPropagationStopped = returnTrue;
	
	    if ( e && e.stopPropagation ) {
	      e.stopPropagation();
	    }
	  },
	  stopImmediatePropagation: function() {
	    this.isImmediatePropagationStopped = returnTrue;
	    this.stopPropagation();
	  }
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
	  mouseenter: "mouseover",
	  mouseleave: "mouseout"
	}, function( orig, fix ) {
	  jQuery.event.special[ orig ] = {
	    delegateType: fix,
	    bindType: fix,
	
	    handle: function( event ) {
	      var ret,
	        target = this,
	        related = event.relatedTarget,
	        handleObj = event.handleObj;
	
	      // For mousenter/leave call the handler if related is outside the target.
	      // NB: No relatedTarget if the mouse left/entered the browser window
	      if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
	        event.type = handleObj.origType;
	        ret = handleObj.handler.apply( this, arguments );
	        event.type = fix;
	      }
	      return ret;
	    }
	  };
	});
	
	// Create "bubbling" focus and blur events
	// Support: Firefox, Chrome, Safari
	if ( !jQuery.support.focusinBubbles ) {
	  jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
	    // Attach a single capturing handler while someone wants focusin/focusout
	    var attaches = 0,
	      handler = function( event ) {
	        jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
	      };
	
	    jQuery.event.special[ fix ] = {
	      setup: function() {
	        if ( attaches++ === 0 ) {
	          document.addEventListener( orig, handler, true );
	        }
	      },
	      teardown: function() {
	        if ( --attaches === 0 ) {
	          document.removeEventListener( orig, handler, true );
	        }
	      }
	    };
	  });
	}
	
	jQuery.fn.extend({
	
	  on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
	    var origFn, type;
	
	    // Types can be a map of types/handlers
	    if ( typeof types === "object" ) {
	      // ( types-Object, selector, data )
	      if ( typeof selector !== "string" ) {
	        // ( types-Object, data )
	        data = data || selector;
	        selector = undefined;
	      }
	      for ( type in types ) {
	        this.on( type, selector, data, types[ type ], one );
	      }
	      return this;
	    }
	
	    if ( data == null && fn == null ) {
	      // ( types, fn )
	      fn = selector;
	      data = selector = undefined;
	    } else if ( fn == null ) {
	      if ( typeof selector === "string" ) {
	        // ( types, selector, fn )
	        fn = data;
	        data = undefined;
	      } else {
	        // ( types, data, fn )
	        fn = data;
	        data = selector;
	        selector = undefined;
	      }
	    }
	    if ( fn === false ) {
	      fn = returnFalse;
	    } else if ( !fn ) {
	      return this;
	    }
	
	    if ( one === 1 ) {
	      origFn = fn;
	      fn = function( event ) {
	        // Can use an empty set, since event contains the info
	        jQuery().off( event );
	        return origFn.apply( this, arguments );
	      };
	      // Use same guid so caller can remove using origFn
	      fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	    }
	    return this.each( function() {
	      jQuery.event.add( this, types, fn, data, selector );
	    });
	  },
	  one: function( types, selector, data, fn ) {
	    return this.on( types, selector, data, fn, 1 );
	  },
	  off: function( types, selector, fn ) {
	    var handleObj, type;
	    if ( types && types.preventDefault && types.handleObj ) {
	      // ( event )  dispatched jQuery.Event
	      handleObj = types.handleObj;
	      jQuery( types.delegateTarget ).off(
	        handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
	        handleObj.selector,
	        handleObj.handler
	      );
	      return this;
	    }
	    if ( typeof types === "object" ) {
	      // ( types-object [, selector] )
	      for ( type in types ) {
	        this.off( type, selector, types[ type ] );
	      }
	      return this;
	    }
	    if ( selector === false || typeof selector === "function" ) {
	      // ( types [, fn] )
	      fn = selector;
	      selector = undefined;
	    }
	    if ( fn === false ) {
	      fn = returnFalse;
	    }
	    return this.each(function() {
	      jQuery.event.remove( this, types, fn, selector );
	    });
	  },
	
	  trigger: function( type, data ) {
	    return this.each(function() {
	      jQuery.event.trigger( type, data, this );
	    });
	  },
	  triggerHandler: function( type, data ) {
	    var elem = this[0];
	    if ( elem ) {
	      return jQuery.event.trigger( type, data, elem, true );
	    }
	  }
	});
	var isSimple = /^.[^:#\[\.,]*$/,
	  rparentsprev = /^(?:parents|prev(?:Until|All))/,
	  rneedsContext = jQuery.expr.match.needsContext,
	  // methods guaranteed to produce a unique set when starting from a unique set
	  guaranteedUnique = {
	    children: true,
	    contents: true,
	    next: true,
	    prev: true
	  };
	
	jQuery.fn.extend({
	  find: function( selector ) {
	    var i,
	      ret = [],
	      self = this,
	      len = self.length;
	
	    if ( typeof selector !== "string" ) {
	      return this.pushStack( jQuery( selector ).filter(function() {
	        for ( i = 0; i < len; i++ ) {
	          if ( jQuery.contains( self[ i ], this ) ) {
	            return true;
	          }
	        }
	      }) );
	    }
	
	    for ( i = 0; i < len; i++ ) {
	      jQuery.find( selector, self[ i ], ret );
	    }
	
	    // Needed because $( selector, context ) becomes $( context ).find( selector )
	    ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
	    ret.selector = this.selector ? this.selector + " " + selector : selector;
	    return ret;
	  },
	
	  has: function( target ) {
	    var targets = jQuery( target, this ),
	      l = targets.length;
	
	    return this.filter(function() {
	      var i = 0;
	      for ( ; i < l; i++ ) {
	        if ( jQuery.contains( this, targets[i] ) ) {
	          return true;
	        }
	      }
	    });
	  },
	
	  not: function( selector ) {
	    return this.pushStack( winnow(this, selector || [], true) );
	  },
	
	  filter: function( selector ) {
	    return this.pushStack( winnow(this, selector || [], false) );
	  },
	
	  is: function( selector ) {
	    return !!winnow(
	      this,
	
	      // If this is a positional/relative selector, check membership in the returned set
	      // so $("p:first").is("p:last") won't return true for a doc with two "p".
	      typeof selector === "string" && rneedsContext.test( selector ) ?
	        jQuery( selector ) :
	        selector || [],
	      false
	    ).length;
	  },
	
	  closest: function( selectors, context ) {
	    var cur,
	      i = 0,
	      l = this.length,
	      matched = [],
	      pos = ( rneedsContext.test( selectors ) || typeof selectors !== "string" ) ?
	        jQuery( selectors, context || this.context ) :
	        0;
	
	    for ( ; i < l; i++ ) {
	      for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
	        // Always skip document fragments
	        if ( cur.nodeType < 11 && (pos ?
	          pos.index(cur) > -1 :
	
	          // Don't pass non-elements to Sizzle
	          cur.nodeType === 1 &&
	            jQuery.find.matchesSelector(cur, selectors)) ) {
	
	          cur = matched.push( cur );
	          break;
	        }
	      }
	    }
	
	    return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	  },
	
	  // Determine the position of an element within
	  // the matched set of elements
	  index: function( elem ) {
	
	    // No argument, return index in parent
	    if ( !elem ) {
	      return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
	    }
	
	    // index in selector
	    if ( typeof elem === "string" ) {
	      return core_indexOf.call( jQuery( elem ), this[ 0 ] );
	    }
	
	    // Locate the position of the desired element
	    return core_indexOf.call( this,
	
	      // If it receives a jQuery object, the first element is used
	      elem.jquery ? elem[ 0 ] : elem
	    );
	  },
	
	  add: function( selector, context ) {
	    var set = typeof selector === "string" ?
	        jQuery( selector, context ) :
	        jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
	      all = jQuery.merge( this.get(), set );
	
	    return this.pushStack( jQuery.unique(all) );
	  },
	
	  addBack: function( selector ) {
	    return this.add( selector == null ?
	      this.prevObject : this.prevObject.filter(selector)
	    );
	  }
	});
	
	function sibling( cur, dir ) {
	  while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	
	  return cur;
	}
	
	jQuery.each({
	  parent: function( elem ) {
	    var parent = elem.parentNode;
	    return parent && parent.nodeType !== 11 ? parent : null;
	  },
	  parents: function( elem ) {
	    return jQuery.dir( elem, "parentNode" );
	  },
	  parentsUntil: function( elem, i, until ) {
	    return jQuery.dir( elem, "parentNode", until );
	  },
	  next: function( elem ) {
	    return sibling( elem, "nextSibling" );
	  },
	  prev: function( elem ) {
	    return sibling( elem, "previousSibling" );
	  },
	  nextAll: function( elem ) {
	    return jQuery.dir( elem, "nextSibling" );
	  },
	  prevAll: function( elem ) {
	    return jQuery.dir( elem, "previousSibling" );
	  },
	  nextUntil: function( elem, i, until ) {
	    return jQuery.dir( elem, "nextSibling", until );
	  },
	  prevUntil: function( elem, i, until ) {
	    return jQuery.dir( elem, "previousSibling", until );
	  },
	  siblings: function( elem ) {
	    return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	  },
	  children: function( elem ) {
	    return jQuery.sibling( elem.firstChild );
	  },
	  contents: function( elem ) {
	    return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	  }
	}, function( name, fn ) {
	  jQuery.fn[ name ] = function( until, selector ) {
	    var matched = jQuery.map( this, fn, until );
	
	    if ( name.slice( -5 ) !== "Until" ) {
	      selector = until;
	    }
	
	    if ( selector && typeof selector === "string" ) {
	      matched = jQuery.filter( selector, matched );
	    }
	
	    if ( this.length > 1 ) {
	      // Remove duplicates
	      if ( !guaranteedUnique[ name ] ) {
	        jQuery.unique( matched );
	      }
	
	      // Reverse order for parents* and prev-derivatives
	      if ( rparentsprev.test( name ) ) {
	        matched.reverse();
	      }
	    }
	
	    return this.pushStack( matched );
	  };
	});
	
	jQuery.extend({
	  filter: function( expr, elems, not ) {
	    var elem = elems[ 0 ];
	
	    if ( not ) {
	      expr = ":not(" + expr + ")";
	    }
	
	    return elems.length === 1 && elem.nodeType === 1 ?
	      jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
	      jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
	        return elem.nodeType === 1;
	      }));
	  },
	
	  dir: function( elem, dir, until ) {
	    var matched = [],
	      truncate = until !== undefined;
	
	    while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
	      if ( elem.nodeType === 1 ) {
	        if ( truncate && jQuery( elem ).is( until ) ) {
	          break;
	        }
	        matched.push( elem );
	      }
	    }
	    return matched;
	  },
	
	  sibling: function( n, elem ) {
	    var matched = [];
	
	    for ( ; n; n = n.nextSibling ) {
	      if ( n.nodeType === 1 && n !== elem ) {
	        matched.push( n );
	      }
	    }
	
	    return matched;
	  }
	});
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
	  if ( jQuery.isFunction( qualifier ) ) {
	    return jQuery.grep( elements, function( elem, i ) {
	      /* jshint -W018 */
	      return !!qualifier.call( elem, i, elem ) !== not;
	    });
	
	  }
	
	  if ( qualifier.nodeType ) {
	    return jQuery.grep( elements, function( elem ) {
	      return ( elem === qualifier ) !== not;
	    });
	
	  }
	
	  if ( typeof qualifier === "string" ) {
	    if ( isSimple.test( qualifier ) ) {
	      return jQuery.filter( qualifier, elements, not );
	    }
	
	    qualifier = jQuery.filter( qualifier, elements );
	  }
	
	  return jQuery.grep( elements, function( elem ) {
	    return ( core_indexOf.call( qualifier, elem ) >= 0 ) !== not;
	  });
	}
	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	  rtagName = /<([\w:]+)/,
	  rhtml = /<|&#?\w+;/,
	  rnoInnerhtml = /<(?:script|style|link)/i,
	  manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	  // checked="checked" or checked
	  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	  rscriptType = /^$|\/(?:java|ecma)script/i,
	  rscriptTypeMasked = /^true\/(.*)/,
	  rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	
	  // We have to close these tags to support XHTML (#13200)
	  wrapMap = {
	
	    // Support: IE 9
	    option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
	    thead: [ 1, "<table>", "</table>" ],
	    col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
	    _default: [ 0, "", "" ]
	  };
	
	// Support: IE 9
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	jQuery.fn.extend({
	  text: function( value ) {
	    return jQuery.access( this, function( value ) {
	      return value === undefined ?
	        jQuery.text( this ) :
	        this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value ) );
	    }, null, value, arguments.length );
	  },
	
	  append: function() {
	    return this.domManip( arguments, function( elem ) {
	      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
	        var target = manipulationTarget( this, elem );
	        target.appendChild( elem );
	      }
	    });
	  },
	
	  prepend: function() {
	    return this.domManip( arguments, function( elem ) {
	      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
	        var target = manipulationTarget( this, elem );
	        target.insertBefore( elem, target.firstChild );
	      }
	    });
	  },
	
	  before: function() {
	    return this.domManip( arguments, function( elem ) {
	      if ( this.parentNode ) {
	        this.parentNode.insertBefore( elem, this );
	      }
	    });
	  },
	
	  after: function() {
	    return this.domManip( arguments, function( elem ) {
	      if ( this.parentNode ) {
	        this.parentNode.insertBefore( elem, this.nextSibling );
	      }
	    });
	  },
	
	  // keepData is for internal use only--do not document
	  remove: function( selector, keepData ) {
	    var elem,
	      elems = selector ? jQuery.filter( selector, this ) : this,
	      i = 0;
	
	    for ( ; (elem = elems[i]) != null; i++ ) {
	      if ( !keepData && elem.nodeType === 1 ) {
	        jQuery.cleanData( getAll( elem ) );
	      }
	
	      if ( elem.parentNode ) {
	        if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
	          setGlobalEval( getAll( elem, "script" ) );
	        }
	        elem.parentNode.removeChild( elem );
	      }
	    }
	
	    return this;
	  },
	
	  empty: function() {
	    var elem,
	      i = 0;
	
	    for ( ; (elem = this[i]) != null; i++ ) {
	      if ( elem.nodeType === 1 ) {
	
	        // Prevent memory leaks
	        jQuery.cleanData( getAll( elem, false ) );
	
	        // Remove any remaining nodes
	        elem.textContent = "";
	      }
	    }
	
	    return this;
	  },
	
	  clone: function( dataAndEvents, deepDataAndEvents ) {
	    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
	    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
	    return this.map( function () {
	      return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
	    });
	  },
	
	  html: function( value ) {
	    return jQuery.access( this, function( value ) {
	      var elem = this[ 0 ] || {},
	        i = 0,
	        l = this.length;
	
	      if ( value === undefined && elem.nodeType === 1 ) {
	        return elem.innerHTML;
	      }
	
	      // See if we can take a shortcut and just use innerHTML
	      if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
	        !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
	        value = value.replace( rxhtmlTag, "<$1></$2>" );
	
	        try {
	          for ( ; i < l; i++ ) {
	            elem = this[ i ] || {};
	
	            // Remove element nodes and prevent memory leaks
	            if ( elem.nodeType === 1 ) {
	              jQuery.cleanData( getAll( elem, false ) );
	              elem.innerHTML = value;
	            }
	          }
	
	          elem = 0;
	
	        // If using innerHTML throws an exception, use the fallback method
	        } catch( e ) {}
	      }
	
	      if ( elem ) {
	        this.empty().append( value );
	      }
	    }, null, value, arguments.length );
	  },
	
	  replaceWith: function() {
	    var
	      // Snapshot the DOM in case .domManip sweeps something relevant into its fragment
	      args = jQuery.map( this, function( elem ) {
	        return [ elem.nextSibling, elem.parentNode ];
	      }),
	      i = 0;
	
	    // Make the changes, replacing each context element with the new content
	    this.domManip( arguments, function( elem ) {
	      var next = args[ i++ ],
	        parent = args[ i++ ];
	
	      if ( parent ) {
	        // Don't use the snapshot next if it has moved (#13810)
	        if ( next && next.parentNode !== parent ) {
	          next = this.nextSibling;
	        }
	        jQuery( this ).remove();
	        parent.insertBefore( elem, next );
	      }
	    // Allow new content to include elements from the context set
	    }, true );
	
	    // Force removal if there was no new content (e.g., from empty arguments)
	    return i ? this : this.remove();
	  },
	
	  detach: function( selector ) {
	    return this.remove( selector, true );
	  },
	
	  domManip: function( args, callback, allowIntersection ) {
	
	    // Flatten any nested arrays
	    args = core_concat.apply( [], args );
	
	    var fragment, first, scripts, hasScripts, node, doc,
	      i = 0,
	      l = this.length,
	      set = this,
	      iNoClone = l - 1,
	      value = args[ 0 ],
	      isFunction = jQuery.isFunction( value );
	
	    // We can't cloneNode fragments that contain checked, in WebKit
	    if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
	      return this.each(function( index ) {
	        var self = set.eq( index );
	        if ( isFunction ) {
	          args[ 0 ] = value.call( this, index, self.html() );
	        }
	        self.domManip( args, callback, allowIntersection );
	      });
	    }
	
	    if ( l ) {
	      fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
	      first = fragment.firstChild;
	
	      if ( fragment.childNodes.length === 1 ) {
	        fragment = first;
	      }
	
	      if ( first ) {
	        scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
	        hasScripts = scripts.length;
	
	        // Use the original fragment for the last item instead of the first because it can end up
	        // being emptied incorrectly in certain situations (#8070).
	        for ( ; i < l; i++ ) {
	          node = fragment;
	
	          if ( i !== iNoClone ) {
	            node = jQuery.clone( node, true, true );
	
	            // Keep references to cloned scripts for later restoration
	            if ( hasScripts ) {
	              // Support: QtWebKit
	              // jQuery.merge because core_push.apply(_, arraylike) throws
	              jQuery.merge( scripts, getAll( node, "script" ) );
	            }
	          }
	
	          callback.call( this[ i ], node, i );
	        }
	
	        if ( hasScripts ) {
	          doc = scripts[ scripts.length - 1 ].ownerDocument;
	
	          // Reenable scripts
	          jQuery.map( scripts, restoreScript );
	
	          // Evaluate executable scripts on first document insertion
	          for ( i = 0; i < hasScripts; i++ ) {
	            node = scripts[ i ];
	            if ( rscriptType.test( node.type || "" ) &&
	              !data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {
	
	              if ( node.src ) {
	                // Hope ajax is available...
	                jQuery._evalUrl( node.src );
	              } else {
	                jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
	              }
	            }
	          }
	        }
	      }
	    }
	
	    return this;
	  }
	});
	
	jQuery.each({
	  appendTo: "append",
	  prependTo: "prepend",
	  insertBefore: "before",
	  insertAfter: "after",
	  replaceAll: "replaceWith"
	}, function( name, original ) {
	  jQuery.fn[ name ] = function( selector ) {
	    var elems,
	      ret = [],
	      insert = jQuery( selector ),
	      last = insert.length - 1,
	      i = 0;
	
	    for ( ; i <= last; i++ ) {
	      elems = i === last ? this : this.clone( true );
	      jQuery( insert[ i ] )[ original ]( elems );
	
	      // Support: QtWebKit
	      // .get() because core_push.apply(_, arraylike) throws
	      core_push.apply( ret, elems.get() );
	    }
	
	    return this.pushStack( ret );
	  };
	});
	
	jQuery.extend({
	  clone: function( elem, dataAndEvents, deepDataAndEvents ) {
	    var i, l, srcElements, destElements,
	      clone = elem.cloneNode( true ),
	      inPage = jQuery.contains( elem.ownerDocument, elem );
	
	    // Support: IE >= 9
	    // Fix Cloning issues
	    if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {
	
	      // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
	      destElements = getAll( clone );
	      srcElements = getAll( elem );
	
	      for ( i = 0, l = srcElements.length; i < l; i++ ) {
	        fixInput( srcElements[ i ], destElements[ i ] );
	      }
	    }
	
	    // Copy the events from the original to the clone
	    if ( dataAndEvents ) {
	      if ( deepDataAndEvents ) {
	        srcElements = srcElements || getAll( elem );
	        destElements = destElements || getAll( clone );
	
	        for ( i = 0, l = srcElements.length; i < l; i++ ) {
	          cloneCopyEvent( srcElements[ i ], destElements[ i ] );
	        }
	      } else {
	        cloneCopyEvent( elem, clone );
	      }
	    }
	
	    // Preserve script evaluation history
	    destElements = getAll( clone, "script" );
	    if ( destElements.length > 0 ) {
	      setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
	    }
	
	    // Return the cloned set
	    return clone;
	  },
	
	  buildFragment: function( elems, context, scripts, selection ) {
	    var elem, tmp, tag, wrap, contains, j,
	      i = 0,
	      l = elems.length,
	      fragment = context.createDocumentFragment(),
	      nodes = [];
	
	    for ( ; i < l; i++ ) {
	      elem = elems[ i ];
	
	      if ( elem || elem === 0 ) {
	
	        // Add nodes directly
	        if ( jQuery.type( elem ) === "object" ) {
	          // Support: QtWebKit
	          // jQuery.merge because core_push.apply(_, arraylike) throws
	          jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
	        // Convert non-html into a text node
	        } else if ( !rhtml.test( elem ) ) {
	          nodes.push( context.createTextNode( elem ) );
	
	        // Convert html into DOM nodes
	        } else {
	          tmp = tmp || fragment.appendChild( context.createElement("div") );
	
	          // Deserialize a standard representation
	          tag = ( rtagName.exec( elem ) || ["", ""] )[ 1 ].toLowerCase();
	          wrap = wrapMap[ tag ] || wrapMap._default;
	          tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];
	
	          // Descend through wrappers to the right content
	          j = wrap[ 0 ];
	          while ( j-- ) {
	            tmp = tmp.lastChild;
	          }
	
	          // Support: QtWebKit
	          // jQuery.merge because core_push.apply(_, arraylike) throws
	          jQuery.merge( nodes, tmp.childNodes );
	
	          // Remember the top-level container
	          tmp = fragment.firstChild;
	
	          // Fixes #12346
	          // Support: Webkit, IE
	          tmp.textContent = "";
	        }
	      }
	    }
	
	    // Remove wrapper from fragment
	    fragment.textContent = "";
	
	    i = 0;
	    while ( (elem = nodes[ i++ ]) ) {
	
	      // #4087 - If origin and destination elements are the same, and this is
	      // that element, do not do anything
	      if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
	        continue;
	      }
	
	      contains = jQuery.contains( elem.ownerDocument, elem );
	
	      // Append to fragment
	      tmp = getAll( fragment.appendChild( elem ), "script" );
	
	      // Preserve script evaluation history
	      if ( contains ) {
	        setGlobalEval( tmp );
	      }
	
	      // Capture executables
	      if ( scripts ) {
	        j = 0;
	        while ( (elem = tmp[ j++ ]) ) {
	          if ( rscriptType.test( elem.type || "" ) ) {
	            scripts.push( elem );
	          }
	        }
	      }
	    }
	
	    return fragment;
	  },
	
	  cleanData: function( elems ) {
	    var data, elem, events, type, key, j,
	      special = jQuery.event.special,
	      i = 0;
	
	    for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
	      if ( Data.accepts( elem ) ) {
	        key = elem[ data_priv.expando ];
	
	        if ( key && (data = data_priv.cache[ key ]) ) {
	          events = Object.keys( data.events || {} );
	          if ( events.length ) {
	            for ( j = 0; (type = events[j]) !== undefined; j++ ) {
	              if ( special[ type ] ) {
	                jQuery.event.remove( elem, type );
	
	              // This is a shortcut to avoid jQuery.event.remove's overhead
	              } else {
	                jQuery.removeEvent( elem, type, data.handle );
	              }
	            }
	          }
	          if ( data_priv.cache[ key ] ) {
	            // Discard any remaining `private` data
	            delete data_priv.cache[ key ];
	          }
	        }
	      }
	      // Discard any remaining `user` data
	      delete data_user.cache[ elem[ data_user.expando ] ];
	    }
	  },
	
	  _evalUrl: function( url ) {
	    return jQuery.ajax({
	      url: url,
	      type: "GET",
	      dataType: "script",
	      async: false,
	      global: false,
	      "throws": true
	    });
	  }
	});
	
	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
	  return jQuery.nodeName( elem, "table" ) &&
	    jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?
	
	    elem.getElementsByTagName("tbody")[0] ||
	      elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
	    elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
	  elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	  return elem;
	}
	function restoreScript( elem ) {
	  var match = rscriptTypeMasked.exec( elem.type );
	
	  if ( match ) {
	    elem.type = match[ 1 ];
	  } else {
	    elem.removeAttribute("type");
	  }
	
	  return elem;
	}
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
	  var l = elems.length,
	    i = 0;
	
	  for ( ; i < l; i++ ) {
	    data_priv.set(
	      elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
	    );
	  }
	}
	
	function cloneCopyEvent( src, dest ) {
	  var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
	  if ( dest.nodeType !== 1 ) {
	    return;
	  }
	
	  // 1. Copy private data: events, handlers, etc.
	  if ( data_priv.hasData( src ) ) {
	    pdataOld = data_priv.access( src );
	    pdataCur = data_priv.set( dest, pdataOld );
	    events = pdataOld.events;
	
	    if ( events ) {
	      delete pdataCur.handle;
	      pdataCur.events = {};
	
	      for ( type in events ) {
	        for ( i = 0, l = events[ type ].length; i < l; i++ ) {
	          jQuery.event.add( dest, type, events[ type ][ i ] );
	        }
	      }
	    }
	  }
	
	  // 2. Copy user data
	  if ( data_user.hasData( src ) ) {
	    udataOld = data_user.access( src );
	    udataCur = jQuery.extend( {}, udataOld );
	
	    data_user.set( dest, udataCur );
	  }
	}
	
	
	function getAll( context, tag ) {
	  var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
	      context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
	      [];
	
	  return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
	    jQuery.merge( [ context ], ret ) :
	    ret;
	}
	
	// Support: IE >= 9
	function fixInput( src, dest ) {
	  var nodeName = dest.nodeName.toLowerCase();
	
	  // Fails to persist the checked state of a cloned checkbox or radio button.
	  if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
	    dest.checked = src.checked;
	
	  // Fails to return the selected option to the default selected state when cloning options
	  } else if ( nodeName === "input" || nodeName === "textarea" ) {
	    dest.defaultValue = src.defaultValue;
	  }
	}
	jQuery.fn.extend({
	  wrapAll: function( html ) {
	    var wrap;
	
	    if ( jQuery.isFunction( html ) ) {
	      return this.each(function( i ) {
	        jQuery( this ).wrapAll( html.call(this, i) );
	      });
	    }
	
	    if ( this[ 0 ] ) {
	
	      // The elements to wrap the target around
	      wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
	      if ( this[ 0 ].parentNode ) {
	        wrap.insertBefore( this[ 0 ] );
	      }
	
	      wrap.map(function() {
	        var elem = this;
	
	        while ( elem.firstElementChild ) {
	          elem = elem.firstElementChild;
	        }
	
	        return elem;
	      }).append( this );
	    }
	
	    return this;
	  },
	
	  wrapInner: function( html ) {
	    if ( jQuery.isFunction( html ) ) {
	      return this.each(function( i ) {
	        jQuery( this ).wrapInner( html.call(this, i) );
	      });
	    }
	
	    return this.each(function() {
	      var self = jQuery( this ),
	        contents = self.contents();
	
	      if ( contents.length ) {
	        contents.wrapAll( html );
	
	      } else {
	        self.append( html );
	      }
	    });
	  },
	
	  wrap: function( html ) {
	    var isFunction = jQuery.isFunction( html );
	
	    return this.each(function( i ) {
	      jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
	    });
	  },
	
	  unwrap: function() {
	    return this.parent().each(function() {
	      if ( !jQuery.nodeName( this, "body" ) ) {
	        jQuery( this ).replaceWith( this.childNodes );
	      }
	    }).end();
	  }
	});
	var curCSS, iframe,
	  // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	  // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	  rmargin = /^margin/,
	  rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	  rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	  rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	  elemdisplay = { BODY: "block" },
	
	  cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	  cssNormalTransform = {
	    letterSpacing: 0,
	    fontWeight: 400
	  },
	
	  cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	  cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
	
	// return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {
	
	  // shortcut for names that are not vendor prefixed
	  if ( name in style ) {
	    return name;
	  }
	
	  // check for vendor prefixed names
	  var capName = name.charAt(0).toUpperCase() + name.slice(1),
	    origName = name,
	    i = cssPrefixes.length;
	
	  while ( i-- ) {
	    name = cssPrefixes[ i ] + capName;
	    if ( name in style ) {
	      return name;
	    }
	  }
	
	  return origName;
	}
	
	function isHidden( elem, el ) {
	  // isHidden might be called from jQuery#filter function;
	  // in that case, element will be second argument
	  elem = el || elem;
	  return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	}
	
	// NOTE: we've included the "window" in window.getComputedStyle
	// because jsdom on node.js will break without it.
	function getStyles( elem ) {
	  return window.getComputedStyle( elem, null );
	}
	
	function showHide( elements, show ) {
	  var display, elem, hidden,
	    values = [],
	    index = 0,
	    length = elements.length;
	
	  for ( ; index < length; index++ ) {
	    elem = elements[ index ];
	    if ( !elem.style ) {
	      continue;
	    }
	
	    values[ index ] = data_priv.get( elem, "olddisplay" );
	    display = elem.style.display;
	    if ( show ) {
	      // Reset the inline display of this element to learn if it is
	      // being hidden by cascaded rules or not
	      if ( !values[ index ] && display === "none" ) {
	        elem.style.display = "";
	      }
	
	      // Set elements which have been overridden with display: none
	      // in a stylesheet to whatever the default browser style is
	      // for such an element
	      if ( elem.style.display === "" && isHidden( elem ) ) {
	        values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
	      }
	    } else {
	
	      if ( !values[ index ] ) {
	        hidden = isHidden( elem );
	
	        if ( display && display !== "none" || !hidden ) {
	          data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
	        }
	      }
	    }
	  }
	
	  // Set the display of most of the elements in a second loop
	  // to avoid the constant reflow
	  for ( index = 0; index < length; index++ ) {
	    elem = elements[ index ];
	    if ( !elem.style ) {
	      continue;
	    }
	    if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
	      elem.style.display = show ? values[ index ] || "" : "none";
	    }
	  }
	
	  return elements;
	}
	
	jQuery.fn.extend({
	  css: function( name, value ) {
	    return jQuery.access( this, function( elem, name, value ) {
	      var styles, len,
	        map = {},
	        i = 0;
	
	      if ( jQuery.isArray( name ) ) {
	        styles = getStyles( elem );
	        len = name.length;
	
	        for ( ; i < len; i++ ) {
	          map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
	        }
	
	        return map;
	      }
	
	      return value !== undefined ?
	        jQuery.style( elem, name, value ) :
	        jQuery.css( elem, name );
	    }, name, value, arguments.length > 1 );
	  },
	  show: function() {
	    return showHide( this, true );
	  },
	  hide: function() {
	    return showHide( this );
	  },
	  toggle: function( state ) {
	    if ( typeof state === "boolean" ) {
	      return state ? this.show() : this.hide();
	    }
	
	    return this.each(function() {
	      if ( isHidden( this ) ) {
	        jQuery( this ).show();
	      } else {
	        jQuery( this ).hide();
	      }
	    });
	  }
	});
	
	jQuery.extend({
	  // Add in style property hooks for overriding the default
	  // behavior of getting and setting a style property
	  cssHooks: {
	    opacity: {
	      get: function( elem, computed ) {
	        if ( computed ) {
	          // We should always get a number back from opacity
	          var ret = curCSS( elem, "opacity" );
	          return ret === "" ? "1" : ret;
	        }
	      }
	    }
	  },
	
	  // Don't automatically add "px" to these possibly-unitless properties
	  cssNumber: {
	    "columnCount": true,
	    "fillOpacity": true,
	    "fontWeight": true,
	    "lineHeight": true,
	    "opacity": true,
	    "order": true,
	    "orphans": true,
	    "widows": true,
	    "zIndex": true,
	    "zoom": true
	  },
	
	  // Add in properties whose names you wish to fix before
	  // setting or getting the value
	  cssProps: {
	    // normalize float css property
	    "float": "cssFloat"
	  },
	
	  // Get and set the style property on a DOM Node
	  style: function( elem, name, value, extra ) {
	    // Don't set styles on text and comment nodes
	    if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
	      return;
	    }
	
	    // Make sure that we're working with the right name
	    var ret, type, hooks,
	      origName = jQuery.camelCase( name ),
	      style = elem.style;
	
	    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );
	
	    // gets hook for the prefixed version
	    // followed by the unprefixed version
	    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
	    // Check if we're setting a value
	    if ( value !== undefined ) {
	      type = typeof value;
	
	      // convert relative number strings (+= or -=) to relative numbers. #7345
	      if ( type === "string" && (ret = rrelNum.exec( value )) ) {
	        value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
	        // Fixes bug #9237
	        type = "number";
	      }
	
	      // Make sure that NaN and null values aren't set. See: #7116
	      if ( value == null || type === "number" && isNaN( value ) ) {
	        return;
	      }
	
	      // If a number was passed in, add 'px' to the (except for certain CSS properties)
	      if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
	        value += "px";
	      }
	
	      // Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
	      // but it would mean to define eight (for every problematic property) identical functions
	      if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
	        style[ name ] = "inherit";
	      }
	
	      // If a hook was provided, use that value, otherwise just set the specified value
	      if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
	        style[ name ] = value;
	      }
	
	    } else {
	      // If a hook was provided get the non-computed value from there
	      if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
	        return ret;
	      }
	
	      // Otherwise just get the value from the style object
	      return style[ name ];
	    }
	  },
	
	  css: function( elem, name, extra, styles ) {
	    var val, num, hooks,
	      origName = jQuery.camelCase( name );
	
	    // Make sure that we're working with the right name
	    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );
	
	    // gets hook for the prefixed version
	    // followed by the unprefixed version
	    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
	    // If a hook was provided get the computed value from there
	    if ( hooks && "get" in hooks ) {
	      val = hooks.get( elem, true, extra );
	    }
	
	    // Otherwise, if a way to get the computed value exists, use that
	    if ( val === undefined ) {
	      val = curCSS( elem, name, styles );
	    }
	
	    //convert "normal" to computed value
	    if ( val === "normal" && name in cssNormalTransform ) {
	      val = cssNormalTransform[ name ];
	    }
	
	    // Return, converting to number if forced or a qualifier was provided and val looks numeric
	    if ( extra === "" || extra ) {
	      num = parseFloat( val );
	      return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
	    }
	    return val;
	  }
	});
	
	curCSS = function( elem, name, _computed ) {
	  var width, minWidth, maxWidth,
	    computed = _computed || getStyles( elem ),
	
	    // Support: IE9
	    // getPropertyValue is only needed for .css('filter') in IE9, see #12537
	    ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
	    style = elem.style;
	
	  if ( computed ) {
	
	    if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
	      ret = jQuery.style( elem, name );
	    }
	
	    // Support: Safari 5.1
	    // A tribute to the "awesome hack by Dean Edwards"
	    // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
	    // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
	    if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
	      // Remember the original values
	      width = style.width;
	      minWidth = style.minWidth;
	      maxWidth = style.maxWidth;
	
	      // Put in the new values to get a computed value out
	      style.minWidth = style.maxWidth = style.width = ret;
	      ret = computed.width;
	
	      // Revert the changed values
	      style.width = width;
	      style.minWidth = minWidth;
	      style.maxWidth = maxWidth;
	    }
	  }
	
	  return ret;
	};
	
	
	function setPositiveNumber( elem, value, subtract ) {
	  var matches = rnumsplit.exec( value );
	  return matches ?
	    // Guard against undefined "subtract", e.g., when used as in cssHooks
	    Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
	    value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	  var i = extra === ( isBorderBox ? "border" : "content" ) ?
	    // If we already have the right measurement, avoid augmentation
	    4 :
	    // Otherwise initialize for horizontal or vertical properties
	    name === "width" ? 1 : 0,
	
	    val = 0;
	
	  for ( ; i < 4; i += 2 ) {
	    // both box models exclude margin, so add it if we want it
	    if ( extra === "margin" ) {
	      val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
	    }
	
	    if ( isBorderBox ) {
	      // border-box includes padding, so remove it if we want content
	      if ( extra === "content" ) {
	        val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	      }
	
	      // at this point, extra isn't border nor margin, so remove border
	      if ( extra !== "margin" ) {
	        val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
	      }
	    } else {
	      // at this point, extra isn't content, so add padding
	      val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
	      // at this point, extra isn't content nor padding, so add border
	      if ( extra !== "padding" ) {
	        val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
	      }
	    }
	  }
	
	  return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
	  // Start with offset property, which is equivalent to the border-box value
	  var valueIsBorderBox = true,
	    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
	    styles = getStyles( elem ),
	    isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
	  // some non-html elements return undefined for offsetWidth, so check for null/undefined
	  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	  if ( val <= 0 || val == null ) {
	    // Fall back to computed then uncomputed css if necessary
	    val = curCSS( elem, name, styles );
	    if ( val < 0 || val == null ) {
	      val = elem.style[ name ];
	    }
	
	    // Computed unit is not pixels. Stop here and return.
	    if ( rnumnonpx.test(val) ) {
	      return val;
	    }
	
	    // we need the check for style in case a browser which returns unreliable values
	    // for getComputedStyle silently falls back to the reliable elem.style
	    valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );
	
	    // Normalize "", auto, and prepare for extra
	    val = parseFloat( val ) || 0;
	  }
	
	  // use the active box-sizing model to add/subtract irrelevant styles
	  return ( val +
	    augmentWidthOrHeight(
	      elem,
	      name,
	      extra || ( isBorderBox ? "border" : "content" ),
	      valueIsBorderBox,
	      styles
	    )
	  ) + "px";
	}
	
	// Try to determine the default display value of an element
	function css_defaultDisplay( nodeName ) {
	  var doc = document,
	    display = elemdisplay[ nodeName ];
	
	  if ( !display ) {
	    display = actualDisplay( nodeName, doc );
	
	    // If the simple way fails, read from inside an iframe
	    if ( display === "none" || !display ) {
	      // Use the already-created iframe if possible
	      iframe = ( iframe ||
	        jQuery("<iframe frameborder='0' width='0' height='0'/>")
	        .css( "cssText", "display:block !important" )
	      ).appendTo( doc.documentElement );
	
	      // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
	      doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
	      doc.write("<!doctype html><html><body>");
	      doc.close();
	
	      display = actualDisplay( nodeName, doc );
	      iframe.detach();
	    }
	
	    // Store the correct default display
	    elemdisplay[ nodeName ] = display;
	  }
	
	  return display;
	}
	
	// Called ONLY from within css_defaultDisplay
	function actualDisplay( name, doc ) {
	  var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
	    display = jQuery.css( elem[0], "display" );
	  elem.remove();
	  return display;
	}
	
	jQuery.each([ "height", "width" ], function( i, name ) {
	  jQuery.cssHooks[ name ] = {
	    get: function( elem, computed, extra ) {
	      if ( computed ) {
	        // certain elements can have dimension info if we invisibly show them
	        // however, it must have a current display style that would benefit from this
	        return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
	          jQuery.swap( elem, cssShow, function() {
	            return getWidthOrHeight( elem, name, extra );
	          }) :
	          getWidthOrHeight( elem, name, extra );
	      }
	    },
	
	    set: function( elem, value, extra ) {
	      var styles = extra && getStyles( elem );
	      return setPositiveNumber( elem, value, extra ?
	        augmentWidthOrHeight(
	          elem,
	          name,
	          extra,
	          jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
	          styles
	        ) : 0
	      );
	    }
	  };
	});
	
	// These hooks cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	jQuery(function() {
	  // Support: Android 2.3
	  if ( !jQuery.support.reliableMarginRight ) {
	    jQuery.cssHooks.marginRight = {
	      get: function( elem, computed ) {
	        if ( computed ) {
	          // Support: Android 2.3
	          // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	          // Work around by temporarily setting element display to inline-block
	          return jQuery.swap( elem, { "display": "inline-block" },
	            curCSS, [ elem, "marginRight" ] );
	        }
	      }
	    };
	  }
	
	  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	  // getComputedStyle returns percent when specified for top/left/bottom/right
	  // rather than make the css module depend on the offset module, we just check for it here
	  if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
	    jQuery.each( [ "top", "left" ], function( i, prop ) {
	      jQuery.cssHooks[ prop ] = {
	        get: function( elem, computed ) {
	          if ( computed ) {
	            computed = curCSS( elem, prop );
	            // if curCSS returns percentage, fallback to offset
	            return rnumnonpx.test( computed ) ?
	              jQuery( elem ).position()[ prop ] + "px" :
	              computed;
	          }
	        }
	      };
	    });
	  }
	
	});
	
	if ( jQuery.expr && jQuery.expr.filters ) {
	  jQuery.expr.filters.hidden = function( elem ) {
	    // Support: Opera <= 12.12
	    // Opera reports offsetWidths and offsetHeights less than zero on some elements
	    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	  };
	
	  jQuery.expr.filters.visible = function( elem ) {
	    return !jQuery.expr.filters.hidden( elem );
	  };
	}
	
	// These hooks are used by animate to expand properties
	jQuery.each({
	  margin: "",
	  padding: "",
	  border: "Width"
	}, function( prefix, suffix ) {
	  jQuery.cssHooks[ prefix + suffix ] = {
	    expand: function( value ) {
	      var i = 0,
	        expanded = {},
	
	        // assumes a single number if not a string
	        parts = typeof value === "string" ? value.split(" ") : [ value ];
	
	      for ( ; i < 4; i++ ) {
	        expanded[ prefix + cssExpand[ i ] + suffix ] =
	          parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
	      }
	
	      return expanded;
	    }
	  };
	
	  if ( !rmargin.test( prefix ) ) {
	    jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	  }
	});
	var r20 = /%20/g,
	  rbracket = /\[\]$/,
	  rCRLF = /\r?\n/g,
	  rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	  rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	jQuery.fn.extend({
	  serialize: function() {
	    return jQuery.param( this.serializeArray() );
	  },
	  serializeArray: function() {
	    return this.map(function(){
	      // Can add propHook for "elements" to filter or add form elements
	      var elements = jQuery.prop( this, "elements" );
	      return elements ? jQuery.makeArray( elements ) : this;
	    })
	    .filter(function(){
	      var type = this.type;
	      // Use .is(":disabled") so that fieldset[disabled] works
	      return this.name && !jQuery( this ).is( ":disabled" ) &&
	        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
	        ( this.checked || !manipulation_rcheckableType.test( type ) );
	    })
	    .map(function( i, elem ){
	      var val = jQuery( this ).val();
	
	      return val == null ?
	        null :
	        jQuery.isArray( val ) ?
	          jQuery.map( val, function( val ){
	            return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
	          }) :
	          { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
	    }).get();
	  }
	});
	
	//Serialize an array of form elements or a set of
	//key/values into a query string
	jQuery.param = function( a, traditional ) {
	  var prefix,
	    s = [],
	    add = function( key, value ) {
	      // If value is a function, invoke it and return its value
	      value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
	      s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
	    };
	
	  // Set traditional to true for jQuery <= 1.3.2 behavior.
	  if ( traditional === undefined ) {
	    traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	  }
	
	  // If an array was passed in, assume that it is an array of form elements.
	  if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	    // Serialize the form elements
	    jQuery.each( a, function() {
	      add( this.name, this.value );
	    });
	
	  } else {
	    // If traditional, encode the "old" way (the way 1.3.2 or older
	    // did it), otherwise encode params recursively.
	    for ( prefix in a ) {
	      buildParams( prefix, a[ prefix ], traditional, add );
	    }
	  }
	
	  // Return the resulting serialization
	  return s.join( "&" ).replace( r20, "+" );
	};
	
	function buildParams( prefix, obj, traditional, add ) {
	  var name;
	
	  if ( jQuery.isArray( obj ) ) {
	    // Serialize array item.
	    jQuery.each( obj, function( i, v ) {
	      if ( traditional || rbracket.test( prefix ) ) {
	        // Treat each array item as a scalar.
	        add( prefix, v );
	
	      } else {
	        // Item is non-scalar (array or object), encode its numeric index.
	        buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
	      }
	    });
	
	  } else if ( !traditional && jQuery.type( obj ) === "object" ) {
	    // Serialize object item.
	    for ( name in obj ) {
	      buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
	    }
	
	  } else {
	    // Serialize scalar item.
	    add( prefix, obj );
	  }
	}
	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	  "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
	
	  // Handle event binding
	  jQuery.fn[ name ] = function( data, fn ) {
	    return arguments.length > 0 ?
	      this.on( name, null, data, fn ) :
	      this.trigger( name );
	  };
	});
	
	jQuery.fn.extend({
	  hover: function( fnOver, fnOut ) {
	    return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	  },
	
	  bind: function( types, data, fn ) {
	    return this.on( types, null, data, fn );
	  },
	  unbind: function( types, fn ) {
	    return this.off( types, null, fn );
	  },
	
	  delegate: function( selector, types, data, fn ) {
	    return this.on( types, selector, data, fn );
	  },
	  undelegate: function( selector, types, fn ) {
	    // ( namespace ) or ( selector, types [, fn] )
	    return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	  }
	});
	var
	  // Document location
	  ajaxLocParts,
	  ajaxLocation,
	
	  ajax_nonce = jQuery.now(),
	
	  ajax_rquery = /\?/,
	  rhash = /#.*$/,
	  rts = /([?&])_=[^&]*/,
	  rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	  // #7653, #8125, #8152: local protocol detection
	  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	  rnoContent = /^(?:GET|HEAD)$/,
	  rprotocol = /^\/\//,
	  rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
	
	  // Keep a copy of the old load method
	  _load = jQuery.fn.load,
	
	  /* Prefilters
	   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	   * 2) These are called:
	   *    - BEFORE asking for a transport
	   *    - AFTER param serialization (s.data is a string if s.processData is true)
	   * 3) key is the dataType
	   * 4) the catchall symbol "*" can be used
	   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	   */
	  prefilters = {},
	
	  /* Transports bindings
	   * 1) key is the dataType
	   * 2) the catchall symbol "*" can be used
	   * 3) selection will start with transport dataType and THEN go to "*" if needed
	   */
	  transports = {},
	
	  // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	  allTypes = "*/".concat("*");
	
	// #8138, IE may throw an exception when accessing
	// a field from window.location if document.domain has been set
	try {
	  ajaxLocation = location.href;
	} catch( e ) {
	  // Use the href attribute of an A element
	  // since IE will modify it given document.location
	  ajaxLocation = document.createElement( "a" );
	  ajaxLocation.href = "";
	  ajaxLocation = ajaxLocation.href;
	}
	
	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
	  // dataTypeExpression is optional and defaults to "*"
	  return function( dataTypeExpression, func ) {
	
	    if ( typeof dataTypeExpression !== "string" ) {
	      func = dataTypeExpression;
	      dataTypeExpression = "*";
	    }
	
	    var dataType,
	      i = 0,
	      dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];
	
	    if ( jQuery.isFunction( func ) ) {
	      // For each dataType in the dataTypeExpression
	      while ( (dataType = dataTypes[i++]) ) {
	        // Prepend if requested
	        if ( dataType[0] === "+" ) {
	          dataType = dataType.slice( 1 ) || "*";
	          (structure[ dataType ] = structure[ dataType ] || []).unshift( func );
	
	        // Otherwise append
	        } else {
	          (structure[ dataType ] = structure[ dataType ] || []).push( func );
	        }
	      }
	    }
	  };
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
	  var inspected = {},
	    seekingTransport = ( structure === transports );
	
	  function inspect( dataType ) {
	    var selected;
	    inspected[ dataType ] = true;
	    jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
	      var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
	      if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	        options.dataTypes.unshift( dataTypeOrTransport );
	        inspect( dataTypeOrTransport );
	        return false;
	      } else if ( seekingTransport ) {
	        return !( selected = dataTypeOrTransport );
	      }
	    });
	    return selected;
	  }
	
	  return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
	  var key, deep,
	    flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
	  for ( key in src ) {
	    if ( src[ key ] !== undefined ) {
	      ( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
	    }
	  }
	  if ( deep ) {
	    jQuery.extend( true, target, deep );
	  }
	
	  return target;
	}
	
	jQuery.fn.load = function( url, params, callback ) {
	  if ( typeof url !== "string" && _load ) {
	    return _load.apply( this, arguments );
	  }
	
	  var selector, type, response,
	    self = this,
	    off = url.indexOf(" ");
	
	  if ( off >= 0 ) {
	    selector = url.slice( off );
	    url = url.slice( 0, off );
	  }
	
	  // If it's a function
	  if ( jQuery.isFunction( params ) ) {
	
	    // We assume that it's the callback
	    callback = params;
	    params = undefined;
	
	  // Otherwise, build a param string
	  } else if ( params && typeof params === "object" ) {
	    type = "POST";
	  }
	
	  // If we have elements to modify, make the request
	  if ( self.length > 0 ) {
	    jQuery.ajax({
	      url: url,
	
	      // if "type" variable is undefined, then "GET" method will be used
	      type: type,
	      dataType: "html",
	      data: params
	    }).done(function( responseText ) {
	
	      // Save response for use in complete callback
	      response = arguments;
	
	      self.html( selector ?
	
	        // If a selector was specified, locate the right elements in a dummy div
	        // Exclude scripts to avoid IE 'Permission Denied' errors
	        jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
	        // Otherwise use the full result
	        responseText );
	
	    }).complete( callback && function( jqXHR, status ) {
	      self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
	    });
	  }
	
	  return this;
	};
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	  jQuery.fn[ type ] = function( fn ){
	    return this.on( type, fn );
	  };
	});
	
	jQuery.extend({
	
	  // Counter for holding the number of active queries
	  active: 0,
	
	  // Last-Modified header cache for next request
	  lastModified: {},
	  etag: {},
	
	  ajaxSettings: {
	    url: ajaxLocation,
	    type: "GET",
	    isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
	    global: true,
	    processData: true,
	    async: true,
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	    /*
	    timeout: 0,
	    data: null,
	    dataType: null,
	    username: null,
	    password: null,
	    cache: null,
	    throws: false,
	    traditional: false,
	    headers: {},
	    */
	
	    accepts: {
	      "*": allTypes,
	      text: "text/plain",
	      html: "text/html",
	      xml: "application/xml, text/xml",
	      json: "application/json, text/javascript"
	    },
	
	    contents: {
	      xml: /xml/,
	      html: /html/,
	      json: /json/
	    },
	
	    responseFields: {
	      xml: "responseXML",
	      text: "responseText",
	      json: "responseJSON"
	    },
	
	    // Data converters
	    // Keys separate source (or catchall "*") and destination types with a single space
	    converters: {
	
	      // Convert anything to text
	      "* text": String,
	
	      // Text to html (true = no transformation)
	      "text html": true,
	
	      // Evaluate text as a json expression
	      "text json": jQuery.parseJSON,
	
	      // Parse text as xml
	      "text xml": jQuery.parseXML
	    },
	
	    // For options that shouldn't be deep extended:
	    // you can add your own custom options here if
	    // and when you create one that shouldn't be
	    // deep extended (see ajaxExtend)
	    flatOptions: {
	      url: true,
	      context: true
	    }
	  },
	
	  // Creates a full fledged settings object into target
	  // with both ajaxSettings and settings fields.
	  // If target is omitted, writes into ajaxSettings.
	  ajaxSetup: function( target, settings ) {
	    return settings ?
	
	      // Building a settings object
	      ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
	      // Extending ajaxSettings
	      ajaxExtend( jQuery.ajaxSettings, target );
	  },
	
	  ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	  ajaxTransport: addToPrefiltersOrTransports( transports ),
	
	  // Main method
	  ajax: function( url, options ) {
	
	    // If url is an object, simulate pre-1.5 signature
	    if ( typeof url === "object" ) {
	      options = url;
	      url = undefined;
	    }
	
	    // Force options to be an object
	    options = options || {};
	
	    var transport,
	      // URL without anti-cache param
	      cacheURL,
	      // Response headers
	      responseHeadersString,
	      responseHeaders,
	      // timeout handle
	      timeoutTimer,
	      // Cross-domain detection vars
	      parts,
	      // To know if global events are to be dispatched
	      fireGlobals,
	      // Loop variable
	      i,
	      // Create the final options object
	      s = jQuery.ajaxSetup( {}, options ),
	      // Callbacks context
	      callbackContext = s.context || s,
	      // Context for global events is callbackContext if it is a DOM node or jQuery collection
	      globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
	        jQuery( callbackContext ) :
	        jQuery.event,
	      // Deferreds
	      deferred = jQuery.Deferred(),
	      completeDeferred = jQuery.Callbacks("once memory"),
	      // Status-dependent callbacks
	      statusCode = s.statusCode || {},
	      // Headers (they are sent all at once)
	      requestHeaders = {},
	      requestHeadersNames = {},
	      // The jqXHR state
	      state = 0,
	      // Default abort message
	      strAbort = "canceled",
	      // Fake xhr
	      jqXHR = {
	        readyState: 0,
	
	        // Builds headers hashtable if needed
	        getResponseHeader: function( key ) {
	          var match;
	          if ( state === 2 ) {
	            if ( !responseHeaders ) {
	              responseHeaders = {};
	              while ( (match = rheaders.exec( responseHeadersString )) ) {
	                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
	              }
	            }
	            match = responseHeaders[ key.toLowerCase() ];
	          }
	          return match == null ? null : match;
	        },
	
	        // Raw string
	        getAllResponseHeaders: function() {
	          return state === 2 ? responseHeadersString : null;
	        },
	
	        // Caches the header
	        setRequestHeader: function( name, value ) {
	          var lname = name.toLowerCase();
	          if ( !state ) {
	            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
	            requestHeaders[ name ] = value;
	          }
	          return this;
	        },
	
	        // Overrides response content-type header
	        overrideMimeType: function( type ) {
	          if ( !state ) {
	            s.mimeType = type;
	          }
	          return this;
	        },
	
	        // Status-dependent callbacks
	        statusCode: function( map ) {
	          var code;
	          if ( map ) {
	            if ( state < 2 ) {
	              for ( code in map ) {
	                // Lazy-add the new callback in a way that preserves old ones
	                statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
	              }
	            } else {
	              // Execute the appropriate callbacks
	              jqXHR.always( map[ jqXHR.status ] );
	            }
	          }
	          return this;
	        },
	
	        // Cancel the request
	        abort: function( statusText ) {
	          var finalText = statusText || strAbort;
	          if ( transport ) {
	            transport.abort( finalText );
	          }
	          done( 0, finalText );
	          return this;
	        }
	      };
	
	    // Attach deferreds
	    deferred.promise( jqXHR ).complete = completeDeferred.add;
	    jqXHR.success = jqXHR.done;
	    jqXHR.error = jqXHR.fail;
	
	    // Remove hash character (#7531: and string promotion)
	    // Add protocol if not provided (prefilters might expect it)
	    // Handle falsy url in the settings object (#10093: consistency with old signature)
	    // We also use the url parameter if available
	    s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
	      .replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
	
	    // Alias method option to type as per ticket #12004
	    s.type = options.method || options.type || s.method || s.type;
	
	    // Extract dataTypes list
	    s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];
	
	    // A cross-domain request is in order when we have a protocol:host:port mismatch
	    if ( s.crossDomain == null ) {
	      parts = rurl.exec( s.url.toLowerCase() );
	      s.crossDomain = !!( parts &&
	        ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
	          ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
	            ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
	      );
	    }
	
	    // Convert data if not already a string
	    if ( s.data && s.processData && typeof s.data !== "string" ) {
	      s.data = jQuery.param( s.data, s.traditional );
	    }
	
	    // Apply prefilters
	    inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
	    // If request was aborted inside a prefilter, stop there
	    if ( state === 2 ) {
	      return jqXHR;
	    }
	
	    // We can fire global events as of now if asked to
	    fireGlobals = s.global;
	
	    // Watch for a new set of requests
	    if ( fireGlobals && jQuery.active++ === 0 ) {
	      jQuery.event.trigger("ajaxStart");
	    }
	
	    // Uppercase the type
	    s.type = s.type.toUpperCase();
	
	    // Determine if request has content
	    s.hasContent = !rnoContent.test( s.type );
	
	    // Save the URL in case we're toying with the If-Modified-Since
	    // and/or If-None-Match header later on
	    cacheURL = s.url;
	
	    // More options handling for requests with no content
	    if ( !s.hasContent ) {
	
	      // If data is available, append data to url
	      if ( s.data ) {
	        cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
	        // #9682: remove data so that it's not used in an eventual retry
	        delete s.data;
	      }
	
	      // Add anti-cache in url if needed
	      if ( s.cache === false ) {
	        s.url = rts.test( cacheURL ) ?
	
	          // If there is already a '_' parameter, set its value
	          cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :
	
	          // Otherwise add one to the end
	          cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
	      }
	    }
	
	    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	    if ( s.ifModified ) {
	      if ( jQuery.lastModified[ cacheURL ] ) {
	        jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
	      }
	      if ( jQuery.etag[ cacheURL ] ) {
	        jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
	      }
	    }
	
	    // Set the correct header, if data is being sent
	    if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
	      jqXHR.setRequestHeader( "Content-Type", s.contentType );
	    }
	
	    // Set the Accepts header for the server, depending on the dataType
	    jqXHR.setRequestHeader(
	      "Accept",
	      s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
	        s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
	        s.accepts[ "*" ]
	    );
	
	    // Check for headers option
	    for ( i in s.headers ) {
	      jqXHR.setRequestHeader( i, s.headers[ i ] );
	    }
	
	    // Allow custom headers/mimetypes and early abort
	    if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
	      // Abort if not done already and return
	      return jqXHR.abort();
	    }
	
	    // aborting is no longer a cancellation
	    strAbort = "abort";
	
	    // Install callbacks on deferreds
	    for ( i in { success: 1, error: 1, complete: 1 } ) {
	      jqXHR[ i ]( s[ i ] );
	    }
	
	    // Get transport
	    transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
	    // If no transport, we auto-abort
	    if ( !transport ) {
	      done( -1, "No Transport" );
	    } else {
	      jqXHR.readyState = 1;
	
	      // Send global event
	      if ( fireGlobals ) {
	        globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
	      }
	      // Timeout
	      if ( s.async && s.timeout > 0 ) {
	        timeoutTimer = setTimeout(function() {
	          jqXHR.abort("timeout");
	        }, s.timeout );
	      }
	
	      try {
	        state = 1;
	        transport.send( requestHeaders, done );
	      } catch ( e ) {
	        // Propagate exception as error if not done
	        if ( state < 2 ) {
	          done( -1, e );
	        // Simply rethrow otherwise
	        } else {
	          throw e;
	        }
	      }
	    }
	
	    // Callback for when everything is done
	    function done( status, nativeStatusText, responses, headers ) {
	      var isSuccess, success, error, response, modified,
	        statusText = nativeStatusText;
	
	      // Called once
	      if ( state === 2 ) {
	        return;
	      }
	
	      // State is "done" now
	      state = 2;
	
	      // Clear timeout if it exists
	      if ( timeoutTimer ) {
	        clearTimeout( timeoutTimer );
	      }
	
	      // Dereference transport for early garbage collection
	      // (no matter how long the jqXHR object will be used)
	      transport = undefined;
	
	      // Cache response headers
	      responseHeadersString = headers || "";
	
	      // Set readyState
	      jqXHR.readyState = status > 0 ? 4 : 0;
	
	      // Determine if successful
	      isSuccess = status >= 200 && status < 300 || status === 304;
	
	      // Get response data
	      if ( responses ) {
	        response = ajaxHandleResponses( s, jqXHR, responses );
	      }
	
	      // Convert no matter what (that way responseXXX fields are always set)
	      response = ajaxConvert( s, response, jqXHR, isSuccess );
	
	      // If successful, handle type chaining
	      if ( isSuccess ) {
	
	        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	        if ( s.ifModified ) {
	          modified = jqXHR.getResponseHeader("Last-Modified");
	          if ( modified ) {
	            jQuery.lastModified[ cacheURL ] = modified;
	          }
	          modified = jqXHR.getResponseHeader("etag");
	          if ( modified ) {
	            jQuery.etag[ cacheURL ] = modified;
	          }
	        }
	
	        // if no content
	        if ( status === 204 || s.type === "HEAD" ) {
	          statusText = "nocontent";
	
	        // if not modified
	        } else if ( status === 304 ) {
	          statusText = "notmodified";
	
	        // If we have data, let's convert it
	        } else {
	          statusText = response.state;
	          success = response.data;
	          error = response.error;
	          isSuccess = !error;
	        }
	      } else {
	        // We extract error from statusText
	        // then normalize statusText and status for non-aborts
	        error = statusText;
	        if ( status || !statusText ) {
	          statusText = "error";
	          if ( status < 0 ) {
	            status = 0;
	          }
	        }
	      }
	
	      // Set data for the fake xhr object
	      jqXHR.status = status;
	      jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
	      // Success/Error
	      if ( isSuccess ) {
	        deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
	      } else {
	        deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
	      }
	
	      // Status-dependent callbacks
	      jqXHR.statusCode( statusCode );
	      statusCode = undefined;
	
	      if ( fireGlobals ) {
	        globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
	          [ jqXHR, s, isSuccess ? success : error ] );
	      }
	
	      // Complete
	      completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
	      if ( fireGlobals ) {
	        globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	        // Handle the global AJAX counter
	        if ( !( --jQuery.active ) ) {
	          jQuery.event.trigger("ajaxStop");
	        }
	      }
	    }
	
	    return jqXHR;
	  },
	
	  getJSON: function( url, data, callback ) {
	    return jQuery.get( url, data, callback, "json" );
	  },
	
	  getScript: function( url, callback ) {
	    return jQuery.get( url, undefined, callback, "script" );
	  }
	});
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
	  jQuery[ method ] = function( url, data, callback, type ) {
	    // shift arguments if data argument was omitted
	    if ( jQuery.isFunction( data ) ) {
	      type = type || callback;
	      callback = data;
	      data = undefined;
	    }
	
	    return jQuery.ajax({
	      url: url,
	      type: method,
	      dataType: type,
	      data: data,
	      success: callback
	    });
	  };
	});
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
	  var ct, type, finalDataType, firstDataType,
	    contents = s.contents,
	    dataTypes = s.dataTypes;
	
	  // Remove auto dataType and get content-type in the process
	  while( dataTypes[ 0 ] === "*" ) {
	    dataTypes.shift();
	    if ( ct === undefined ) {
	      ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
	    }
	  }
	
	  // Check if we're dealing with a known content-type
	  if ( ct ) {
	    for ( type in contents ) {
	      if ( contents[ type ] && contents[ type ].test( ct ) ) {
	        dataTypes.unshift( type );
	        break;
	      }
	    }
	  }
	
	  // Check to see if we have a response for the expected dataType
	  if ( dataTypes[ 0 ] in responses ) {
	    finalDataType = dataTypes[ 0 ];
	  } else {
	    // Try convertible dataTypes
	    for ( type in responses ) {
	      if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
	        finalDataType = type;
	        break;
	      }
	      if ( !firstDataType ) {
	        firstDataType = type;
	      }
	    }
	    // Or just use first one
	    finalDataType = finalDataType || firstDataType;
	  }
	
	  // If we found a dataType
	  // We add the dataType to the list if needed
	  // and return the corresponding response
	  if ( finalDataType ) {
	    if ( finalDataType !== dataTypes[ 0 ] ) {
	      dataTypes.unshift( finalDataType );
	    }
	    return responses[ finalDataType ];
	  }
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
	  var conv2, current, conv, tmp, prev,
	    converters = {},
	    // Work with a copy of dataTypes in case we need to modify it for conversion
	    dataTypes = s.dataTypes.slice();
	
	  // Create converters map with lowercased keys
	  if ( dataTypes[ 1 ] ) {
	    for ( conv in s.converters ) {
	      converters[ conv.toLowerCase() ] = s.converters[ conv ];
	    }
	  }
	
	  current = dataTypes.shift();
	
	  // Convert to each sequential dataType
	  while ( current ) {
	
	    if ( s.responseFields[ current ] ) {
	      jqXHR[ s.responseFields[ current ] ] = response;
	    }
	
	    // Apply the dataFilter if provided
	    if ( !prev && isSuccess && s.dataFilter ) {
	      response = s.dataFilter( response, s.dataType );
	    }
	
	    prev = current;
	    current = dataTypes.shift();
	
	    if ( current ) {
	
	    // There's only work to do if current dataType is non-auto
	      if ( current === "*" ) {
	
	        current = prev;
	
	      // Convert response if prev dataType is non-auto and differs from current
	      } else if ( prev !== "*" && prev !== current ) {
	
	        // Seek a direct converter
	        conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
	        // If none found, seek a pair
	        if ( !conv ) {
	          for ( conv2 in converters ) {
	
	            // If conv2 outputs current
	            tmp = conv2.split( " " );
	            if ( tmp[ 1 ] === current ) {
	
	              // If prev can be converted to accepted input
	              conv = converters[ prev + " " + tmp[ 0 ] ] ||
	                converters[ "* " + tmp[ 0 ] ];
	              if ( conv ) {
	                // Condense equivalence converters
	                if ( conv === true ) {
	                  conv = converters[ conv2 ];
	
	                // Otherwise, insert the intermediate dataType
	                } else if ( converters[ conv2 ] !== true ) {
	                  current = tmp[ 0 ];
	                  dataTypes.unshift( tmp[ 1 ] );
	                }
	                break;
	              }
	            }
	          }
	        }
	
	        // Apply converter (if not an equivalence)
	        if ( conv !== true ) {
	
	          // Unless errors are allowed to bubble, catch and return them
	          if ( conv && s[ "throws" ] ) {
	            response = conv( response );
	          } else {
	            try {
	              response = conv( response );
	            } catch ( e ) {
	              return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
	            }
	          }
	        }
	      }
	    }
	  }
	
	  return { state: "success", data: response };
	}
	// Install script dataType
	jQuery.ajaxSetup({
	  accepts: {
	    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	  },
	  contents: {
	    script: /(?:java|ecma)script/
	  },
	  converters: {
	    "text script": function( text ) {
	      jQuery.globalEval( text );
	      return text;
	    }
	  }
	});
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
	  if ( s.cache === undefined ) {
	    s.cache = false;
	  }
	  if ( s.crossDomain ) {
	    s.type = "GET";
	  }
	});
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	  // This transport only deals with cross domain requests
	  if ( s.crossDomain ) {
	    var script, callback;
	    return {
	      send: function( _, complete ) {
	        script = jQuery("<script>").prop({
	          async: true,
	          charset: s.scriptCharset,
	          src: s.url
	        }).on(
	          "load error",
	          callback = function( evt ) {
	            script.remove();
	            callback = null;
	            if ( evt ) {
	              complete( evt.type === "error" ? 404 : 200, evt.type );
	            }
	          }
	        );
	        document.head.appendChild( script[ 0 ] );
	      },
	      abort: function() {
	        if ( callback ) {
	          callback();
	        }
	      }
	    };
	  }
	});
	var oldCallbacks = [],
	  rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup({
	  jsonp: "callback",
	  jsonpCallback: function() {
	    var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
	    this[ callback ] = true;
	    return callback;
	  }
	});
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
	  var callbackName, overwritten, responseContainer,
	    jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
	      "url" :
	      typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
	    );
	
	  // Handle iff the expected data type is "jsonp" or we have a parameter to set
	  if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
	    // Get callback name, remembering preexisting value associated with it
	    callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
	      s.jsonpCallback() :
	      s.jsonpCallback;
	
	    // Insert callback into url or form data
	    if ( jsonProp ) {
	      s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
	    } else if ( s.jsonp !== false ) {
	      s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
	    }
	
	    // Use data converter to retrieve json after script execution
	    s.converters["script json"] = function() {
	      if ( !responseContainer ) {
	        jQuery.error( callbackName + " was not called" );
	      }
	      return responseContainer[ 0 ];
	    };
	
	    // force json dataType
	    s.dataTypes[ 0 ] = "json";
	
	    // Install callback
	    overwritten = window[ callbackName ];
	    window[ callbackName ] = function() {
	      responseContainer = arguments;
	    };
	
	    // Clean-up function (fires after converters)
	    jqXHR.always(function() {
	      // Restore preexisting value
	      window[ callbackName ] = overwritten;
	
	      // Save back as free
	      if ( s[ callbackName ] ) {
	        // make sure that re-using the options doesn't screw things around
	        s.jsonpCallback = originalSettings.jsonpCallback;
	
	        // save the callback name for future use
	        oldCallbacks.push( callbackName );
	      }
	
	      // Call if it was a function and we have a response
	      if ( responseContainer && jQuery.isFunction( overwritten ) ) {
	        overwritten( responseContainer[ 0 ] );
	      }
	
	      responseContainer = overwritten = undefined;
	    });
	
	    // Delegate to script
	    return "script";
	  }
	});
	jQuery.ajaxSettings.xhr = function() {
	  try {
	    return new XMLHttpRequest();
	  } catch( e ) {}
	};
	
	var xhrSupported = jQuery.ajaxSettings.xhr(),
	  xhrSuccessStatus = {
	    // file protocol always yields status code 0, assume 200
	    0: 200,
	    // Support: IE9
	    // #1450: sometimes IE returns 1223 when it should be 204
	    1223: 204
	  },
	  // Support: IE9
	  // We need to keep track of outbound xhr and abort them manually
	  // because IE is not smart enough to do it all by itself
	  xhrId = 0,
	  xhrCallbacks = {};
	
	if ( window.ActiveXObject ) {
	  jQuery( window ).on( "unload", function() {
	    for( var key in xhrCallbacks ) {
	      xhrCallbacks[ key ]();
	    }
	    xhrCallbacks = undefined;
	  });
	}
	
	jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	jQuery.support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport(function( options ) {
	  var callback;
	  // Cross domain only allowed if supported through XMLHttpRequest
	  if ( jQuery.support.cors || xhrSupported && !options.crossDomain ) {
	    return {
	      send: function( headers, complete ) {
	        var i, id,
	          xhr = options.xhr();
	        xhr.open( options.type, options.url, options.async, options.username, options.password );
	        // Apply custom fields if provided
	        if ( options.xhrFields ) {
	          for ( i in options.xhrFields ) {
	            xhr[ i ] = options.xhrFields[ i ];
	          }
	        }
	        // Override mime type if needed
	        if ( options.mimeType && xhr.overrideMimeType ) {
	          xhr.overrideMimeType( options.mimeType );
	        }
	        // X-Requested-With header
	        // For cross-domain requests, seeing as conditions for a preflight are
	        // akin to a jigsaw puzzle, we simply never set it to be sure.
	        // (it can always be set on a per-request basis or even using ajaxSetup)
	        // For same-domain requests, won't change header if already provided.
	        if ( !options.crossDomain && !headers["X-Requested-With"] ) {
	          headers["X-Requested-With"] = "XMLHttpRequest";
	        }
	        // Set headers
	        for ( i in headers ) {
	          xhr.setRequestHeader( i, headers[ i ] );
	        }
	        // Callback
	        callback = function( type ) {
	          return function() {
	            if ( callback ) {
	              delete xhrCallbacks[ id ];
	              callback = xhr.onload = xhr.onerror = null;
	              if ( type === "abort" ) {
	                xhr.abort();
	              } else if ( type === "error" ) {
	                complete(
	                  // file protocol always yields status 0, assume 404
	                  xhr.status || 404,
	                  xhr.statusText
	                );
	              } else {
	                complete(
	                  xhrSuccessStatus[ xhr.status ] || xhr.status,
	                  xhr.statusText,
	                  // Support: IE9
	                  // #11426: When requesting binary data, IE9 will throw an exception
	                  // on any attempt to access responseText
	                  typeof xhr.responseText === "string" ? {
	                    text: xhr.responseText
	                  } : undefined,
	                  xhr.getAllResponseHeaders()
	                );
	              }
	            }
	          };
	        };
	        // Listen to events
	        xhr.onload = callback();
	        xhr.onerror = callback("error");
	        // Create the abort callback
	        callback = xhrCallbacks[( id = xhrId++ )] = callback("abort");
	        // Do send the request
	        // This may raise an exception which is actually
	        // handled in jQuery.ajax (so no try/catch here)
	        xhr.send( options.hasContent && options.data || null );
	      },
	      abort: function() {
	        if ( callback ) {
	          callback();
	        }
	      }
	    };
	  }
	});
	var fxNow, timerId,
	  rfxtypes = /^(?:toggle|show|hide)$/,
	  rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	  rrun = /queueHooks$/,
	  animationPrefilters = [ defaultPrefilter ],
	  tweeners = {
	    "*": [function( prop, value ) {
	      var tween = this.createTween( prop, value ),
	        target = tween.cur(),
	        parts = rfxnum.exec( value ),
	        unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
	        // Starting value computation is required for potential unit mismatches
	        start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
	          rfxnum.exec( jQuery.css( tween.elem, prop ) ),
	        scale = 1,
	        maxIterations = 20;
	
	      if ( start && start[ 3 ] !== unit ) {
	        // Trust units reported by jQuery.css
	        unit = unit || start[ 3 ];
	
	        // Make sure we update the tween properties later on
	        parts = parts || [];
	
	        // Iteratively approximate from a nonzero starting point
	        start = +target || 1;
	
	        do {
	          // If previous iteration zeroed out, double until we get *something*
	          // Use a string for doubling factor so we don't accidentally see scale as unchanged below
	          scale = scale || ".5";
	
	          // Adjust and apply
	          start = start / scale;
	          jQuery.style( tween.elem, prop, start + unit );
	
	        // Update scale, tolerating zero or NaN from tween.cur()
	        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
	        } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
	      }
	
	      // Update tween properties
	      if ( parts ) {
	        start = tween.start = +start || +target || 0;
	        tween.unit = unit;
	        // If a +=/-= token was provided, we're doing a relative animation
	        tween.end = parts[ 1 ] ?
	          start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
	          +parts[ 2 ];
	      }
	
	      return tween;
	    }]
	  };
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
	  setTimeout(function() {
	    fxNow = undefined;
	  });
	  return ( fxNow = jQuery.now() );
	}
	
	function createTween( value, prop, animation ) {
	  var tween,
	    collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
	    index = 0,
	    length = collection.length;
	  for ( ; index < length; index++ ) {
	    if ( (tween = collection[ index ].call( animation, prop, value )) ) {
	
	      // we're done with this property
	      return tween;
	    }
	  }
	}
	
	function Animation( elem, properties, options ) {
	  var result,
	    stopped,
	    index = 0,
	    length = animationPrefilters.length,
	    deferred = jQuery.Deferred().always( function() {
	      // don't match elem in the :animated selector
	      delete tick.elem;
	    }),
	    tick = function() {
	      if ( stopped ) {
	        return false;
	      }
	      var currentTime = fxNow || createFxNow(),
	        remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	        // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
	        temp = remaining / animation.duration || 0,
	        percent = 1 - temp,
	        index = 0,
	        length = animation.tweens.length;
	
	      for ( ; index < length ; index++ ) {
	        animation.tweens[ index ].run( percent );
	      }
	
	      deferred.notifyWith( elem, [ animation, percent, remaining ]);
	
	      if ( percent < 1 && length ) {
	        return remaining;
	      } else {
	        deferred.resolveWith( elem, [ animation ] );
	        return false;
	      }
	    },
	    animation = deferred.promise({
	      elem: elem,
	      props: jQuery.extend( {}, properties ),
	      opts: jQuery.extend( true, { specialEasing: {} }, options ),
	      originalProperties: properties,
	      originalOptions: options,
	      startTime: fxNow || createFxNow(),
	      duration: options.duration,
	      tweens: [],
	      createTween: function( prop, end ) {
	        var tween = jQuery.Tween( elem, animation.opts, prop, end,
	            animation.opts.specialEasing[ prop ] || animation.opts.easing );
	        animation.tweens.push( tween );
	        return tween;
	      },
	      stop: function( gotoEnd ) {
	        var index = 0,
	          // if we are going to the end, we want to run all the tweens
	          // otherwise we skip this part
	          length = gotoEnd ? animation.tweens.length : 0;
	        if ( stopped ) {
	          return this;
	        }
	        stopped = true;
	        for ( ; index < length ; index++ ) {
	          animation.tweens[ index ].run( 1 );
	        }
	
	        // resolve when we played the last frame
	        // otherwise, reject
	        if ( gotoEnd ) {
	          deferred.resolveWith( elem, [ animation, gotoEnd ] );
	        } else {
	          deferred.rejectWith( elem, [ animation, gotoEnd ] );
	        }
	        return this;
	      }
	    }),
	    props = animation.props;
	
	  propFilter( props, animation.opts.specialEasing );
	
	  for ( ; index < length ; index++ ) {
	    result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
	    if ( result ) {
	      return result;
	    }
	  }
	
	  jQuery.map( props, createTween, animation );
	
	  if ( jQuery.isFunction( animation.opts.start ) ) {
	    animation.opts.start.call( elem, animation );
	  }
	
	  jQuery.fx.timer(
	    jQuery.extend( tick, {
	      elem: elem,
	      anim: animation,
	      queue: animation.opts.queue
	    })
	  );
	
	  // attach callbacks from options
	  return animation.progress( animation.opts.progress )
	    .done( animation.opts.done, animation.opts.complete )
	    .fail( animation.opts.fail )
	    .always( animation.opts.always );
	}
	
	function propFilter( props, specialEasing ) {
	  var index, name, easing, value, hooks;
	
	  // camelCase, specialEasing and expand cssHook pass
	  for ( index in props ) {
	    name = jQuery.camelCase( index );
	    easing = specialEasing[ name ];
	    value = props[ index ];
	    if ( jQuery.isArray( value ) ) {
	      easing = value[ 1 ];
	      value = props[ index ] = value[ 0 ];
	    }
	
	    if ( index !== name ) {
	      props[ name ] = value;
	      delete props[ index ];
	    }
	
	    hooks = jQuery.cssHooks[ name ];
	    if ( hooks && "expand" in hooks ) {
	      value = hooks.expand( value );
	      delete props[ name ];
	
	      // not quite $.extend, this wont overwrite keys already present.
	      // also - reusing 'index' from above because we have the correct "name"
	      for ( index in value ) {
	        if ( !( index in props ) ) {
	          props[ index ] = value[ index ];
	          specialEasing[ index ] = easing;
	        }
	      }
	    } else {
	      specialEasing[ name ] = easing;
	    }
	  }
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
	
	  tweener: function( props, callback ) {
	    if ( jQuery.isFunction( props ) ) {
	      callback = props;
	      props = [ "*" ];
	    } else {
	      props = props.split(" ");
	    }
	
	    var prop,
	      index = 0,
	      length = props.length;
	
	    for ( ; index < length ; index++ ) {
	      prop = props[ index ];
	      tweeners[ prop ] = tweeners[ prop ] || [];
	      tweeners[ prop ].unshift( callback );
	    }
	  },
	
	  prefilter: function( callback, prepend ) {
	    if ( prepend ) {
	      animationPrefilters.unshift( callback );
	    } else {
	      animationPrefilters.push( callback );
	    }
	  }
	});
	
	function defaultPrefilter( elem, props, opts ) {
	  /* jshint validthis: true */
	  var prop, value, toggle, tween, hooks, oldfire,
	    anim = this,
	    orig = {},
	    style = elem.style,
	    hidden = elem.nodeType && isHidden( elem ),
	    dataShow = data_priv.get( elem, "fxshow" );
	
	  // handle queue: false promises
	  if ( !opts.queue ) {
	    hooks = jQuery._queueHooks( elem, "fx" );
	    if ( hooks.unqueued == null ) {
	      hooks.unqueued = 0;
	      oldfire = hooks.empty.fire;
	      hooks.empty.fire = function() {
	        if ( !hooks.unqueued ) {
	          oldfire();
	        }
	      };
	    }
	    hooks.unqueued++;
	
	    anim.always(function() {
	      // doing this makes sure that the complete handler will be called
	      // before this completes
	      anim.always(function() {
	        hooks.unqueued--;
	        if ( !jQuery.queue( elem, "fx" ).length ) {
	          hooks.empty.fire();
	        }
	      });
	    });
	  }
	
	  // height/width overflow pass
	  if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
	    // Make sure that nothing sneaks out
	    // Record all 3 overflow attributes because IE9-10 do not
	    // change the overflow attribute when overflowX and
	    // overflowY are set to the same value
	    opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
	    // Set display property to inline-block for height/width
	    // animations on inline elements that are having width/height animated
	    if ( jQuery.css( elem, "display" ) === "inline" &&
	        jQuery.css( elem, "float" ) === "none" ) {
	
	      style.display = "inline-block";
	    }
	  }
	
	  if ( opts.overflow ) {
	    style.overflow = "hidden";
	    anim.always(function() {
	      style.overflow = opts.overflow[ 0 ];
	      style.overflowX = opts.overflow[ 1 ];
	      style.overflowY = opts.overflow[ 2 ];
	    });
	  }
	
	
	  // show/hide pass
	  for ( prop in props ) {
	    value = props[ prop ];
	    if ( rfxtypes.exec( value ) ) {
	      delete props[ prop ];
	      toggle = toggle || value === "toggle";
	      if ( value === ( hidden ? "hide" : "show" ) ) {
	
	        // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
	        if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
	          hidden = true;
	        } else {
	          continue;
	        }
	      }
	      orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
	    }
	  }
	
	  if ( !jQuery.isEmptyObject( orig ) ) {
	    if ( dataShow ) {
	      if ( "hidden" in dataShow ) {
	        hidden = dataShow.hidden;
	      }
	    } else {
	      dataShow = data_priv.access( elem, "fxshow", {} );
	    }
	
	    // store state if its toggle - enables .stop().toggle() to "reverse"
	    if ( toggle ) {
	      dataShow.hidden = !hidden;
	    }
	    if ( hidden ) {
	      jQuery( elem ).show();
	    } else {
	      anim.done(function() {
	        jQuery( elem ).hide();
	      });
	    }
	    anim.done(function() {
	      var prop;
	
	      data_priv.remove( elem, "fxshow" );
	      for ( prop in orig ) {
	        jQuery.style( elem, prop, orig[ prop ] );
	      }
	    });
	    for ( prop in orig ) {
	      tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
	
	      if ( !( prop in dataShow ) ) {
	        dataShow[ prop ] = tween.start;
	        if ( hidden ) {
	          tween.end = tween.start;
	          tween.start = prop === "width" || prop === "height" ? 1 : 0;
	        }
	      }
	    }
	  }
	}
	
	function Tween( elem, options, prop, end, easing ) {
	  return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
	  constructor: Tween,
	  init: function( elem, options, prop, end, easing, unit ) {
	    this.elem = elem;
	    this.prop = prop;
	    this.easing = easing || "swing";
	    this.options = options;
	    this.start = this.now = this.cur();
	    this.end = end;
	    this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	  },
	  cur: function() {
	    var hooks = Tween.propHooks[ this.prop ];
	
	    return hooks && hooks.get ?
	      hooks.get( this ) :
	      Tween.propHooks._default.get( this );
	  },
	  run: function( percent ) {
	    var eased,
	      hooks = Tween.propHooks[ this.prop ];
	
	    if ( this.options.duration ) {
	      this.pos = eased = jQuery.easing[ this.easing ](
	        percent, this.options.duration * percent, 0, 1, this.options.duration
	      );
	    } else {
	      this.pos = eased = percent;
	    }
	    this.now = ( this.end - this.start ) * eased + this.start;
	
	    if ( this.options.step ) {
	      this.options.step.call( this.elem, this.now, this );
	    }
	
	    if ( hooks && hooks.set ) {
	      hooks.set( this );
	    } else {
	      Tween.propHooks._default.set( this );
	    }
	    return this;
	  }
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
	  _default: {
	    get: function( tween ) {
	      var result;
	
	      if ( tween.elem[ tween.prop ] != null &&
	        (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
	        return tween.elem[ tween.prop ];
	      }
	
	      // passing an empty string as a 3rd parameter to .css will automatically
	      // attempt a parseFloat and fallback to a string if the parse fails
	      // so, simple values such as "10px" are parsed to Float.
	      // complex values such as "rotate(1rad)" are returned as is.
	      result = jQuery.css( tween.elem, tween.prop, "" );
	      // Empty strings, null, undefined and "auto" are converted to 0.
	      return !result || result === "auto" ? 0 : result;
	    },
	    set: function( tween ) {
	      // use step hook for back compat - use cssHook if its there - use .style if its
	      // available and use plain properties where available
	      if ( jQuery.fx.step[ tween.prop ] ) {
	        jQuery.fx.step[ tween.prop ]( tween );
	      } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
	        jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
	      } else {
	        tween.elem[ tween.prop ] = tween.now;
	      }
	    }
	  }
	};
	
	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	  set: function( tween ) {
	    if ( tween.elem.nodeType && tween.elem.parentNode ) {
	      tween.elem[ tween.prop ] = tween.now;
	    }
	  }
	};
	
	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	  var cssFn = jQuery.fn[ name ];
	  jQuery.fn[ name ] = function( speed, easing, callback ) {
	    return speed == null || typeof speed === "boolean" ?
	      cssFn.apply( this, arguments ) :
	      this.animate( genFx( name, true ), speed, easing, callback );
	  };
	});
	
	jQuery.fn.extend({
	  fadeTo: function( speed, to, easing, callback ) {
	
	    // show any hidden elements after setting opacity to 0
	    return this.filter( isHidden ).css( "opacity", 0 ).show()
	
	      // animate to the value specified
	      .end().animate({ opacity: to }, speed, easing, callback );
	  },
	  animate: function( prop, speed, easing, callback ) {
	    var empty = jQuery.isEmptyObject( prop ),
	      optall = jQuery.speed( speed, easing, callback ),
	      doAnimation = function() {
	        // Operate on a copy of prop so per-property easing won't be lost
	        var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
	        // Empty animations, or finishing resolves immediately
	        if ( empty || data_priv.get( this, "finish" ) ) {
	          anim.stop( true );
	        }
	      };
	      doAnimation.finish = doAnimation;
	
	    return empty || optall.queue === false ?
	      this.each( doAnimation ) :
	      this.queue( optall.queue, doAnimation );
	  },
	  stop: function( type, clearQueue, gotoEnd ) {
	    var stopQueue = function( hooks ) {
	      var stop = hooks.stop;
	      delete hooks.stop;
	      stop( gotoEnd );
	    };
	
	    if ( typeof type !== "string" ) {
	      gotoEnd = clearQueue;
	      clearQueue = type;
	      type = undefined;
	    }
	    if ( clearQueue && type !== false ) {
	      this.queue( type || "fx", [] );
	    }
	
	    return this.each(function() {
	      var dequeue = true,
	        index = type != null && type + "queueHooks",
	        timers = jQuery.timers,
	        data = data_priv.get( this );
	
	      if ( index ) {
	        if ( data[ index ] && data[ index ].stop ) {
	          stopQueue( data[ index ] );
	        }
	      } else {
	        for ( index in data ) {
	          if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
	            stopQueue( data[ index ] );
	          }
	        }
	      }
	
	      for ( index = timers.length; index--; ) {
	        if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
	          timers[ index ].anim.stop( gotoEnd );
	          dequeue = false;
	          timers.splice( index, 1 );
	        }
	      }
	
	      // start the next in the queue if the last step wasn't forced
	      // timers currently will call their complete callbacks, which will dequeue
	      // but only if they were gotoEnd
	      if ( dequeue || !gotoEnd ) {
	        jQuery.dequeue( this, type );
	      }
	    });
	  },
	  finish: function( type ) {
	    if ( type !== false ) {
	      type = type || "fx";
	    }
	    return this.each(function() {
	      var index,
	        data = data_priv.get( this ),
	        queue = data[ type + "queue" ],
	        hooks = data[ type + "queueHooks" ],
	        timers = jQuery.timers,
	        length = queue ? queue.length : 0;
	
	      // enable finishing flag on private data
	      data.finish = true;
	
	      // empty the queue first
	      jQuery.queue( this, type, [] );
	
	      if ( hooks && hooks.stop ) {
	        hooks.stop.call( this, true );
	      }
	
	      // look for any active animations, and finish them
	      for ( index = timers.length; index--; ) {
	        if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
	          timers[ index ].anim.stop( true );
	          timers.splice( index, 1 );
	        }
	      }
	
	      // look for any animations in the old queue and finish them
	      for ( index = 0; index < length; index++ ) {
	        if ( queue[ index ] && queue[ index ].finish ) {
	          queue[ index ].finish.call( this );
	        }
	      }
	
	      // turn off finishing flag
	      delete data.finish;
	    });
	  }
	});
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
	  var which,
	    attrs = { height: type },
	    i = 0;
	
	  // if we include width, step value is 1 to do all cssExpand values,
	  // if we don't include width, step value is 2 to skip over Left and Right
	  includeWidth = includeWidth? 1 : 0;
	  for( ; i < 4 ; i += 2 - includeWidth ) {
	    which = cssExpand[ i ];
	    attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	  }
	
	  if ( includeWidth ) {
	    attrs.opacity = attrs.width = type;
	  }
	
	  return attrs;
	}
	
	// Generate shortcuts for custom animations
	jQuery.each({
	  slideDown: genFx("show"),
	  slideUp: genFx("hide"),
	  slideToggle: genFx("toggle"),
	  fadeIn: { opacity: "show" },
	  fadeOut: { opacity: "hide" },
	  fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
	  jQuery.fn[ name ] = function( speed, easing, callback ) {
	    return this.animate( props, speed, easing, callback );
	  };
	});
	
	jQuery.speed = function( speed, easing, fn ) {
	  var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
	    complete: fn || !fn && easing ||
	      jQuery.isFunction( speed ) && speed,
	    duration: speed,
	    easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	  };
	
	  opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
	    opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	
	  // normalize opt.queue - true/undefined/null -> "fx"
	  if ( opt.queue == null || opt.queue === true ) {
	    opt.queue = "fx";
	  }
	
	  // Queueing
	  opt.old = opt.complete;
	
	  opt.complete = function() {
	    if ( jQuery.isFunction( opt.old ) ) {
	      opt.old.call( this );
	    }
	
	    if ( opt.queue ) {
	      jQuery.dequeue( this, opt.queue );
	    }
	  };
	
	  return opt;
	};
	
	jQuery.easing = {
	  linear: function( p ) {
	    return p;
	  },
	  swing: function( p ) {
	    return 0.5 - Math.cos( p*Math.PI ) / 2;
	  }
	};
	
	jQuery.timers = [];
	jQuery.fx = Tween.prototype.init;
	jQuery.fx.tick = function() {
	  var timer,
	    timers = jQuery.timers,
	    i = 0;
	
	  fxNow = jQuery.now();
	
	  for ( ; i < timers.length; i++ ) {
	    timer = timers[ i ];
	    // Checks the timer has not already been removed
	    if ( !timer() && timers[ i ] === timer ) {
	      timers.splice( i--, 1 );
	    }
	  }
	
	  if ( !timers.length ) {
	    jQuery.fx.stop();
	  }
	  fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
	  if ( timer() && jQuery.timers.push( timer ) ) {
	    jQuery.fx.start();
	  }
	};
	
	jQuery.fx.interval = 13;
	
	jQuery.fx.start = function() {
	  if ( !timerId ) {
	    timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	  }
	};
	
	jQuery.fx.stop = function() {
	  clearInterval( timerId );
	  timerId = null;
	};
	
	jQuery.fx.speeds = {
	  slow: 600,
	  fast: 200,
	  // Default speed
	  _default: 400
	};
	
	// Back Compat <1.8 extension point
	jQuery.fx.step = {};
	
	if ( jQuery.expr && jQuery.expr.filters ) {
	  jQuery.expr.filters.animated = function( elem ) {
	    return jQuery.grep(jQuery.timers, function( fn ) {
	      return elem === fn.elem;
	    }).length;
	  };
	}
	jQuery.fn.offset = function( options ) {
	  if ( arguments.length ) {
	    return options === undefined ?
	      this :
	      this.each(function( i ) {
	        jQuery.offset.setOffset( this, options, i );
	      });
	  }
	
	  var docElem, win,
	    elem = this[ 0 ],
	    box = { top: 0, left: 0 },
	    doc = elem && elem.ownerDocument;
	
	  if ( !doc ) {
	    return;
	  }
	
	  docElem = doc.documentElement;
	
	  // Make sure it's not a disconnected DOM node
	  if ( !jQuery.contains( docElem, elem ) ) {
	    return box;
	  }
	
	  // If we don't have gBCR, just use 0,0 rather than error
	  // BlackBerry 5, iOS 3 (original iPhone)
	  if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
	    box = elem.getBoundingClientRect();
	  }
	  win = getWindow( doc );
	  return {
	    top: box.top + win.pageYOffset - docElem.clientTop,
	    left: box.left + win.pageXOffset - docElem.clientLeft
	  };
	};
	
	jQuery.offset = {
	
	  setOffset: function( elem, options, i ) {
	    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
	      position = jQuery.css( elem, "position" ),
	      curElem = jQuery( elem ),
	      props = {};
	
	    // Set position first, in-case top/left are set even on static elem
	    if ( position === "static" ) {
	      elem.style.position = "relative";
	    }
	
	    curOffset = curElem.offset();
	    curCSSTop = jQuery.css( elem, "top" );
	    curCSSLeft = jQuery.css( elem, "left" );
	    calculatePosition = ( position === "absolute" || position === "fixed" ) && ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;
	
	    // Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
	    if ( calculatePosition ) {
	      curPosition = curElem.position();
	      curTop = curPosition.top;
	      curLeft = curPosition.left;
	
	    } else {
	      curTop = parseFloat( curCSSTop ) || 0;
	      curLeft = parseFloat( curCSSLeft ) || 0;
	    }
	
	    if ( jQuery.isFunction( options ) ) {
	      options = options.call( elem, i, curOffset );
	    }
	
	    if ( options.top != null ) {
	      props.top = ( options.top - curOffset.top ) + curTop;
	    }
	    if ( options.left != null ) {
	      props.left = ( options.left - curOffset.left ) + curLeft;
	    }
	
	    if ( "using" in options ) {
	      options.using.call( elem, props );
	
	    } else {
	      curElem.css( props );
	    }
	  }
	};
	
	
	jQuery.fn.extend({
	
	  position: function() {
	    if ( !this[ 0 ] ) {
	      return;
	    }
	
	    var offsetParent, offset,
	      elem = this[ 0 ],
	      parentOffset = { top: 0, left: 0 };
	
	    // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
	    if ( jQuery.css( elem, "position" ) === "fixed" ) {
	      // We assume that getBoundingClientRect is available when computed position is fixed
	      offset = elem.getBoundingClientRect();
	
	    } else {
	      // Get *real* offsetParent
	      offsetParent = this.offsetParent();
	
	      // Get correct offsets
	      offset = this.offset();
	      if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
	        parentOffset = offsetParent.offset();
	      }
	
	      // Add offsetParent borders
	      parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
	      parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
	    }
	
	    // Subtract parent offsets and element margins
	    return {
	      top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
	      left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
	    };
	  },
	
	  offsetParent: function() {
	    return this.map(function() {
	      var offsetParent = this.offsetParent || docElem;
	
	      while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
	        offsetParent = offsetParent.offsetParent;
	      }
	
	      return offsetParent || docElem;
	    });
	  }
	});
	
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	  var top = "pageYOffset" === prop;
	
	  jQuery.fn[ method ] = function( val ) {
	    return jQuery.access( this, function( elem, method, val ) {
	      var win = getWindow( elem );
	
	      if ( val === undefined ) {
	        return win ? win[ prop ] : elem[ method ];
	      }
	
	      if ( win ) {
	        win.scrollTo(
	          !top ? val : window.pageXOffset,
	          top ? val : window.pageYOffset
	        );
	
	      } else {
	        elem[ method ] = val;
	      }
	    }, method, val, arguments.length, null );
	  };
	});
	
	function getWindow( elem ) {
	  return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	  jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
	    // margin is only for outerHeight, outerWidth
	    jQuery.fn[ funcName ] = function( margin, value ) {
	      var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
	        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
	      return jQuery.access( this, function( elem, type, value ) {
	        var doc;
	
	        if ( jQuery.isWindow( elem ) ) {
	          // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
	          // isn't a whole lot we can do. See pull request at this URL for discussion:
	          // https://github.com/jquery/jquery/pull/764
	          return elem.document.documentElement[ "client" + name ];
	        }
	
	        // Get document width or height
	        if ( elem.nodeType === 9 ) {
	          doc = elem.documentElement;
	
	          // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
	          // whichever is greatest
	          return Math.max(
	            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
	            elem.body[ "offset" + name ], doc[ "offset" + name ],
	            doc[ "client" + name ]
	          );
	        }
	
	        return value === undefined ?
	          // Get width or height on the element, requesting but not forcing parseFloat
	          jQuery.css( elem, type, extra ) :
	
	          // Set width or height on the element
	          jQuery.style( elem, type, value, extra );
	      }, type, chainable ? margin : undefined, chainable, null );
	    };
	  });
	});
	// Limit scope pollution from any deprecated API
	// (function() {
	
	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
	  return this.length;
	};
	
	jQuery.fn.andSelf = jQuery.fn.addBack;
	
	// })();
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	  // Expose jQuery as module.exports in loaders that implement the Node
	  // module pattern (including browserify). Do not create the global, since
	  // the user will be storing it themselves locally, and globals are frowned
	  // upon in the Node module world.
	  module.exports = jQuery;
	} else {
	  // Register as a named AMD module, since jQuery can be concatenated with other
	  // files that may use define, but not via a proper concatenation script that
	  // understands anonymous AMD modules. A named AMD is safest and most robust
	  // way to register. Lowercase jquery is used because AMD module names are
	  // derived from file names, and jQuery is normally delivered in a lowercase
	  // file name. Do this after creating the global so that if an AMD module wants
	  // to call noConflict to hide this version of jQuery, it will work.
	  if ( true ) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return jQuery; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}
	
	// If there is a window object, that at least has a document property,
	// define jQuery and $ identifiers
	if ( typeof window === "object" && typeof window.document === "object" ) {
	  window.jQuery = window.$ = jQuery;
	}
	
	})( window );
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/buildin/module.js */ 23)(module)))

/***/ },
/* 2 */
/*!************************************!*\
  !*** ./public/js/vendor/Widget.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	Base Class from which almost all widgets are based overall the project
	
	The main idea behind constructing a new widget toolkit instead of using one of the many high quality widget
	toolkits avaliable is that we considered that currently, no widget system provides all the features that where
	required for this project.
	
	Features of the widget system
	* A custom and easy to handle event binding, dispatching and manipulation, with some sort of bubbling support
	* A module system which we can use to include specific behaviour to any widget and reuse the code where needed
	* A tree structure support for the widgets that the event system could bubble, and that also serves as
	* A navigation system.
	* The widgets must be able to be grouped to form more complex widgets
	* Remove the complexity of DOM manipulation and handling
	* A way to wrap widgets at our convenience to reuse widgets avaliable and make them comly to our needs
	without the need to hack those widgets, that would force us to maintain the new versions of those widgets
	and that is a very complex task when widgets become so complex.
	* A widget system that would allow us to start wrapping some widgets for a fast start and later code our own widgets
	at will.
	* expose a consistent API that allow us to choose the use of widgets by API calls and user interaction at will and with the same
	clearance and capacity
	* an easy way to allow subclasing widgets
	* an easy way to provide new html, class, and css for a specific instance of a widget that would remove us the need
	to create complex inheritance structures that are hard to maintain.
	
	Usage Example.
	
	The most basic usage of a widget is to simply create an instance and render it at a target element
	in this case body
	var myWidgetInstance = new Breezi.Widget();
	myWidgetInstance.render(document.body);
	
	like this widget does renders does not display anything so lets give it something to display first
	var myWidgetInstance = new Breezi.Widget();
	myWidgetInstance.element.html('Im a simple widget');
	myWidgetInstance.render(document.body);
	
	this reveals that internally every widget has an element property that is initialized by default to a jQuery Instance
	this allow easy DOM manipulation, animation and operations handled by a high quality third party library.
	@class Widget
	@namespace Breezi
	@inlcudes CustomEventSupport
	@includes NodeSupport
	@dependency Neon
	@dependency CustomEventSupport
	@dependency NodeSupport
	**/
	Class('Widget').includes(CustomEventSupport, NodeSupport)({
	
	    /**
	    The default html for the widget, at the most simple case this is just a div.
	    @name HTML
	    @attribute_type CONSTANT
	    @type String
	    */
	    HTML : '<div></div>',
	
	    /**
	    the widget container default class for all widgets is widget
	    @name ELEMENT_CLASS
	    @constant
	    @type String
	    **/
	    ELEMENT_CLASS : 'widget',
	
	    /**
	    @property prototype
	    @type Object
	    **/
	    prototype : {
	        /**
	        Holds the active status of the widget
	        By default all widgets are deactivated waiting
	        for an action to activate it.
	        @property active <public> [Boolean] (false)
	        **/
	        active : false,
	
	        /**
	        Holds the disabled status of the widget
	        By default all widgets are enabled and only by
	        API could be disabled.
	        @property disabled <public> [Boolean] (false)
	        **/
	        disabled : false,
	
	        __destroyed : false,
	
	        init : function init(config) {
	            var property;
	
	            Object.keys(config || {}).forEach(function (propertyName) {
	                this[propertyName] = config[propertyName];
	            }, this);
	
	            if (this.element == null) {
	                this.element = $(this.constructor.HTML.replace(/\s\s+/g, ''));
	                this.element.addClass(this.constructor.ELEMENT_CLASS);
	            }
	
	            if (this.hasOwnProperty('className') === true) {
	                this.element.addClass(this.className);
	            }
	        },
	
	        /**
	        implementation of the activate method, when you need an override, do it
	        over this method instead of doing it on activate
	        @property _activate <private> [Function]
	        @return undefined [undefined]
	        **/
	        _activate : function _activate() {
	            this.active = true;
	            this.element.addClass('active');
	        },
	
	        /**
	        Public activation method for widget, you can listen to this event
	        to take some other actions, but the most important part of this
	        method is that it runs its default action, (its activation)
	        this method uses _activate as its implementation to maintain
	        the events order intact.
	        @property activate <public> [Function]
	        @method
	        @dispatch beforeActivate
	        @dispatch activate
	        @return this [Widget]
	        **/
	        activate : function activate() {
	            if (this.__destroyed === true) {
	                console.warn('calling on destroyed object');
	            }
	            this.dispatch('beforeActivate');
	            this._activate();
	            this.dispatch('activate');
	            return this;
	        },
	
	        /**
	        deactivation implementation
	        this is the oposite of activation method and as such it must be
	        treated as important as that.
	        @property _deactivate <private> [Function]
	        @method
	        @return undefined [undefined]
	        **/
	        _deactivate : function _deactivate() {
	            this.active = false;
	            this.element.removeClass('active');
	        },
	
	        /**
	        Public deactivation method for widget, you can listen to this event
	        to take some other actions, but the most important part of this
	        method is that it runs its default action, (its activation)
	        this method uses _deactivate as its implementation to maintain
	        the events order intact.
	        @property activate <public> [Function]
	        @method
	        @dispatch beforeDeactivatee
	        @dispatch deactivate
	        @return this [Widget]
	        **/
	        deactivate : function deactivate() {
	            if (this.__destroyed === true) {
	                console.warn('calling on destroyed object');
	            }
	            this.dispatch('beforeDeactivate');
	            this._deactivate();
	            this.dispatch('deactivate');
	            return this;
	        },
	
	        /**
	        Enable implementation method
	        if you need to provide a different procedure for enable
	        you must override this method and call "super"
	        @property _enable <private> [Function]
	        @method
	        @return undefined [undefined]
	        **/
	        _enable : function _enable() {
	            this.disabled = false;
	            this.element.removeClass('disable');
	        },
	
	        /**
	        Public enable method, this method should not be
	        overriden.
	        @property enable <public> [Function]
	        @method
	        @return this [Widget]
	        **/
	        enable : function enable() {
	            if (this.__destroyed === true) {
	                console.warn('calling on destroyed object');
	            }
	            this.dispatch('beforeEnable');
	            this._enable();
	            this.dispatch('enable');
	
	            return this;
	        },
	
	        /**
	        Disable implementation
	        @property _disable <private> [Function]
	        @return undefined [undefined]
	        **/
	        _disable : function _disable() {
	            this.disabled = true;
	            this.element.addClass('disable');
	        },
	
	        /**
	        Disables the widget, the idea behind disabling a widget
	        comes from DOM form elements. so following this idea
	        all widgets can be disabled and queried for its disabled
	        state via the disabled property.
	        Same as DOM form elements there is feedback and that is why
	        the default implementation sets the "disable" class
	        on the element so proper visual feedback can be provided
	        to the user.
	        @property disable <public> [Function]
	        @method
	        @return this [Widget]
	        **/
	        disable : function disable() {
	            if (this.__destroyed === true) {
	                console.warn('calling on destroyed object');
	            }
	            this.dispatch('beforeDisable');
	            this._disable();
	            this.dispatch('disable');
	
	            return this;
	        },
	
	        /**
	        Destroy implementation. Its main responsabilities are cleaning
	        all references to other objects so garbage collector can collect
	        the memory used by this and the other objects
	        @property _destroy <private> [Function]
	        @method
	        @return undefined [undefined]
	        **/
	        _destroy : function _destroy() {
	            var childrenLength;
	
	            if (this.element) {
	                this.element.remove();
	            }
	
	            if (this.children !== null){
	                childrenLength = this.children.length;
	                while(childrenLength > 0){
	                    this.children[0].destroy();
	                    if (this.children.length === childrenLength) {
	                        this.children.shift();
	                    }
	                    childrenLength--;
	                }
	            }
	
	            if (this.parent) {
	                this.parent.removeChild(this);
	            }
	
	            this.children       = null;
	            this.element        = null;
	        },
	
	        /**
	        Destroy public method, this one should not be replaced
	        @property destroy <public> [Function]
	        @method
	        @return null [null]
	        **/
	        destroy : function destroy() {
	            if (this.__destroyed === true) {
	                console.warn('calling on destroyed object');
	            }
	
	            this.dispatch('beforeDestroy');
	            this._destroy();
	            this.dispatch('destroy');
	
	            this.eventListeners = null;
	            this.__destroyed    = true;
	
	            return null;
	        },
	
	        /**
	        The render method is the mechanism by which you pass a widget from
	        living only on memory to get into the DOM and with this into the
	        application flow. The recomendation is that render is the last method
	        of the setup of a widget, including appending its children. this is
	        because once a widget gets renderer, further operations cause browser
	        reflows, and DOM operations are slower than memory operations.
	        This method shoudl not be replaced by its children.
	        @property render <public> [Function]
	        @method
	        @argument element <required> [JQuery] (undefined) This is the element
	        into which the widget will be appended.
	        @argument beforeElement <optional> [jQuery] (undefined) this is the element
	        that will be used as a reference to insert the widgets element. this argument
	        must be a child of the "element" argument.
	        @return this [Widget]
	        **/
	        render : function render(element, beforeElement) {
	            if (this.__destroyed === true) {
	                console.warn('calling on destroyed object');
	            }
	            this.dispatch('beforeRender', {
	                element : element,
	                beforeElement : beforeElement
	            });
	            if (beforeElement) {
	                this.element.insertBefore(beforeElement);
	            } else {
	                this.element.appendTo(element);
	            }
	            this.dispatch('render');
	            return this;
	        }
	    }
	});


/***/ },
/* 3 */
/*!**************************************!*\
  !*** ./public/js/vendor/validate.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(module) {//     Validate.js 0.4.0
	//     (c) 2013-2015 Nicklas Ansman, 2013 Wrapp
	//     Validate.js may be freely distributed under the MIT license.
	//     For all details and documentation:
	//     http://validatejs.org/
	
	(function(exports, module, define, require) {
	  "use strict";
	
	  // The main function that calls the validators specified by the constraints.
	  // The options are the following:
	  //   - flatten (boolean) - If `true` will return a flat array instead of an object.
	  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
	  //
	  // Please note that the options are also passed to each validator.
	  var validate = function(attributes, constraints, options) {
	    options = v.extend({}, v.options, options);
	
	    var results = v.runValidations(attributes, constraints, options)
	      , attr
	      , validator;
	
	    for (attr in results) {
	      for (validator in results[attr]) {
	        if (v.isPromise(results[attr][validator])) {
	          throw new Error("Use validate.async if you want support for promises");
	        }
	      }
	    }
	    return validate.processValidationResults(results, options);
	  };
	
	  var v = validate
	    , root = this
	    // Finds %{key} style patterns in the given string
	    , FORMAT_REGEXP = /%\{([^\}]+)\}/g;
	
	  // Copies over attributes from one or more sources to a single destination.
	  // Very much similar to underscore's extend.
	  // The first argument is the target object and the remaining arguments will be
	  // used as targets.
	  v.extend = function(obj) {
	    [].slice.call(arguments, 1).forEach(function(source) {
	      for (var attr in source) {
	        obj[attr] = source[attr];
	      }
	    });
	    return obj;
	  };
	
	  v.extend(validate, {
	    // This "class" is just a wrapper around a dictionary and is here to allow
	    // you to differentiate between library errors and validation errors
	    // when using promises.
	    ValidationErrors: function(errors) {
	      v.extend(this, errors);
	    },
	
	    // Runs the validators specified by the constraints object.
	    // Will return an array of the format:
	    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
	    runValidations: function(attributes, constraints, options) {
	      var results = []
	        , attr
	        , validatorName
	        , value
	        , validators
	        , validator
	        , validatorOptions
	        , error;
	
	      // Loops through each constraints, finds the correct validator and run it.
	      for (attr in constraints) {
	        value = v.getDeepObjectValue(attributes, attr);
	        validators = v.result(constraints[attr], value, attributes, attr);
	
	        for (validatorName in validators) {
	          validator = v.validators[validatorName];
	
	          if (!validator) {
	            error = v.format("Unknown validator %{name}", {name: validatorName});
	            throw new Error(error);
	          }
	
	          validatorOptions = validators[validatorName];
	          // This allows the options to be a function. The function will be
	          // called with the value, attribute name and the complete dict of
	          // attributes. This is useful when you want to have different
	          // validations depending on the attribute value.
	          validatorOptions = v.result(validatorOptions, value, attributes, attr);
	          if (!validatorOptions) {
	            continue;
	          }
	          results.push({
	            attribute: attr,
	            error: validator.call(validator, value, validatorOptions, attr,
	                                  attributes)
	          });
	        }
	      }
	
	      return results;
	    },
	
	    // Takes the output from runValidations and converts it to the correct
	    // output format.
	    processValidationResults: function(results, options) {
	      var errors = {};
	
	      // This indexes the errors per attribute
	      results.forEach(function(result) {
	        var error = result.error
	          , attribute = result.attribute;
	
	        if (v.isString(error)) {
	          error = [error];
	        }
	
	        if (error) {
	          errors[attribute] = (errors[attribute] || []).concat(error);
	        }
	      });
	
	      // Semi ugly way to check if the errors are empty, try iterating over
	      // them and short circuit when something is found.
	      for (var _ in errors) {
	        return v.fullMessages(errors, options);
	      }
	    },
	
	    // Runs the validations with support for promises.
	    // This function will return a promise that is settled when all the
	    // validation promises have been completed.
	    // It can be called even if no validations returned a promise.
	    async: function(attributes, constraints, options) {
	      options = v.extend({}, v.async.options, options);
	      var results = v.runValidations(attributes, constraints, options);
	
	      return v.Promise(function(resolve, reject) {
	        v.waitForResults(results).then(function() {
	          var errors = v.processValidationResults(results, options);
	          if (errors) {
	            if (!options.flatten) {
	              errors = new v.ValidationErrors(errors);
	            }
	            reject(errors);
	          } else {
	            resolve(attributes);
	          }
	        }).then(undefined, v.error);
	      });
	    },
	
	    // Returns a promise that is resolved when all promises in the results array
	    // are settled. The promise returned from this function is always resolved,
	    // never rejected.
	    // This function modifies the input argument, it replaces the promises
	    // with the value returned from the promise.
	    waitForResults: function(results) {
	      // Create a sequence of all the results starting with a resolved promise.
	      var promise = results.reduce(function(memo, result) {
	        // If this result isn't a promise skip it in the sequence.
	        if (!v.isPromise(result.error)) {
	          return memo;
	        }
	
	        return memo.then(function() {
	          return result.error.then(
	            function() {
	              result.error = null;
	            },
	            function(error) {
	              // If for some reason the validator promise was rejected but no
	              // error was specified.
	              if (!error) {
	                v.warn("Validator promise was rejected but didn't return an error");
	              }
	              result.error = error;
	            }
	          ).then(undefined, v.error);
	        }).then(undefined, v.error);
	      }, v.Promise(function(r) { r(); })); // A resolved promise
	
	      return promise.then(undefined, v.error);
	    },
	
	    // If the given argument is a call: function the and: function return the value
	    // otherwise just return the value. Additional arguments will be passed as
	    // arguments to the function.
	    // Example:
	    // ```
	    // result('foo') // 'foo'
	    // result(Math.max, 1, 2) // 2
	    // ```
	    result: function(value) {
	      var args = [].slice.call(arguments, 1);
	      if (typeof value === 'function') {
	        value = value.apply(null, args);
	      }
	      return value;
	    },
	
	    // Checks if the value is a number. This function does not consider NaN a
	    // number like many other `isNumber` functions do.
	    isNumber: function(value) {
	      return typeof value === 'number' && !isNaN(value);
	    },
	
	    // Returns false if the object is not a function
	    isFunction: function(value) {
	      return typeof value === 'function';
	    },
	
	    // A simple check to verify that the value is an integer. Uses `isNumber`
	    // and a simple modulo check.
	    isInteger: function(value) {
	      return v.isNumber(value) && value % 1 === 0;
	    },
	
	    // Uses the `Object` function to check if the given argument is an object.
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	
	    // Returns false if the object is `null` of `undefined`
	    isDefined: function(obj) {
	      return obj !== null && obj !== undefined;
	    },
	
	    // Checks if the given argument is a promise. Anything with a `then`
	    // function is considered a promise.
	    isPromise: function(p) {
	      return !!p && typeof p.then === 'function';
	    },
	
	    // Formats the specified strings with the given values like so:
	    // ```
	    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
	    // ```
	    format: function(str, vals) {
	      return str.replace(FORMAT_REGEXP, function(m0, m1) {
	        return String(vals[m1]);
	      });
	    },
	
	    // "Prettifies" the given string.
	    // Prettifying means replacing [.\_-] with spaces as well as splitting
	    // camel case words.
	    prettify: function(str) {
	      return str
	        // Splits keys separated by periods
	        .replace(/([^\s])\.([^\s])/g, '$1 $2')
	        // Removes backslashes
	        .replace(/\\+/g, '')
	        // Replaces - and - with space
	        .replace(/[_-]/g, ' ')
	        // Splits camel cased words
	        .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
	          return "" + m1 + " " + m2.toLowerCase();
	        })
	        .toLowerCase();
	    },
	
	    isString: function(value) {
	      return typeof value === 'string';
	    },
	
	    isArray: function(value) {
	      return {}.toString.call(value) === '[object Array]';
	    },
	
	    contains: function(obj, value) {
	      if (!v.isDefined(obj)) {
	        return false;
	      }
	      if (v.isArray(obj)) {
	        return obj.indexOf(value) !== -1;
	      }
	      return value in obj;
	    },
	
	    getDeepObjectValue: function(obj, keypath) {
	      if (!v.isObject(obj) || !v.isString(keypath)) {
	        return undefined;
	      }
	
	      var key = ""
	        , i
	        , escape = false;
	
	      for (i = 0; i < keypath.length; ++i) {
	        switch (keypath[i]) {
	          case '.':
	            if (escape) {
	              escape = false;
	              key += '.';
	            } else if (key in obj) {
	              obj = obj[key];
	              key = "";
	            } else {
	              return undefined;
	            }
	            break;
	
	          case '\\':
	            if (escape) {
	              escape = false;
	              key += '\\';
	            } else {
	              escape = true;
	            }
	            break;
	
	          default:
	            escape = false;
	            key += keypath[i];
	            break;
	        }
	      }
	
	      if (v.isDefined(obj) && key in obj) {
	        return obj[key];
	      } else {
	        return undefined;
	      }
	    },
	
	    capitalize: function(str) {
	      if (!v.isString(str)) {
	        return str;
	      }
	      return str[0].toUpperCase() + str.slice(1);
	    },
	
	    fullMessages: function(errors, options) {
	      options = options || {};
	
	      var ret = options.flatten ? [] : {}
	        , attr;
	
	      if (!errors) {
	        return ret;
	      }
	
	      function processErrors(attr, errors) {
	        errors.forEach(function(error) {
	          if (error[0] === '^') {
	            error = error.slice(1);
	          } else if (options.fullMessages !== false) {
	            error = v.format("%{message}", {
	              attr: v.capitalize(v.prettify(attr)),
	              message: error
	            });
	          }
	          error = error.replace(/\\\^/g, "^");
	          // If flatten is true a flat array is returned.
	          if (options.flatten) {
	            ret.push(error);
	          }
	          else {
	            (ret[attr] || (ret[attr] = [])).push(error);
	          }
	        });
	      }
	
	      // Converts the errors of object of the format
	      // {attr: [<error>, <error>, ...]} to contain the attribute name.
	      for (attr in errors) {
	        processErrors(attr, errors[attr]);
	      }
	      return ret;
	    },
	
	    // Returns a promise, should be called with the new operator.
	    // The first argument will be called with two functions, the first for
	    // resolving the promise and the second for rejecting it.
	    // Supports (in order of precedence):
	    //   * EcmaScript 6 Promises
	    //   * RSVP
	    //   * when
	    //   * Q
	    //
	    // If no supported promises are detected an error is thrown.
	    // A word of warning, only A+ style promises are supported. jQuery deferreds
	    // are NOT supported.
	    Promise: v.extend(function(callback) {
	      var promise = v.Promise.nativePromise(callback) ||
	                    v.Promise.RSVPPromise(callback) ||
	                    v.Promise.whenPromise(callback) ||
	                    v.Promise.QPromise(callback);
	
	      if (!promise) {
	        throw new Error("No promises could be detected");
	      }
	
	      return promise;
	    }, {
	      nativePromise: function(callback) {
	        var Promise_, module;
	        if (typeof Promise !== "undefined") {
	          Promise_ = Promise;
	        } else {
	          module = v.tryRequire("es6-promise");
	          if (module) {
	            Promise_ = module.Promise;
	          }
	        }
	        if (Promise_) {
	          return new Promise_(callback);
	        }
	      },
	      RSVPPromise: function(callback) {
	        var Promise, module;
	        if (typeof RSVP !== "undefined") {
	          Promise = RSVP.Promise;
	        } else {
	          module = v.tryRequire("rsvp");
	          if (module) {
	            Promise = module.Promise;
	          }
	        }
	        if (Promise) {
	          return new Promise(callback);
	        }
	      },
	      whenPromise: function(callback) {
	        var promise, module;
	        if (typeof when !== "undefined") {
	          promise = when.promise;
	        } else {
	          module = v.tryRequire("when");
	          if (module) {
	            promise = module.promise;
	          }
	        }
	        if (promise) {
	          return promise(callback);
	        }
	      },
	      QPromise: function(callback) {
	        var promise, module;
	        if (typeof Q !== "undefined") {
	          promise = Q.promise;
	        } else {
	          module = v.tryRequire("q");
	          if (module) {
	            promise = module.promise;
	          }
	        }
	        if (promise) {
	          return promise(callback);
	        }
	      }
	    }),
	
	    tryRequire: function(moduleName) {
	      if (!v.require) {
	        return null;
	      }
	      try {
	        return v.require(moduleName);
	      } catch(e) {
	        return null;
	      }
	    },
	
	    // require: require,
	
	    exposeModule: function(validate, root, exports, module, define) {
	      if (exports) {
	        if (module && module.exports) {
	          exports = module.exports = validate;
	        }
	        exports.validate = validate;
	      }
	      else {
	        root.validate = validate;
	        if (validate.isFunction(define) && define.amd) {
	          define("validate", [], function () { return validate; });
	        }
	      }
	    },
	
	    warn: function(msg) {
	      if (typeof console !== "undefined" && console.warn) {
	        console.warn(msg);
	      }
	    },
	
	    error: function(msg) {
	      if (typeof console !== "undefined" && console.error) {
	        console.error(msg);
	      }
	    }
	  });
	
	  validate.validators = {
	    // Presence validates that the value isn't empty
	    presence: function(value, options) {
	      options = v.extend({}, this.options, options);
	
	      var message = options.message || this.message || "can't be blank"
	        , attr;
	
	      // Null and undefined aren't allowed
	      if (!v.isDefined(value)) {
	        return message;
	      }
	
	      // functions are ok
	      if (v.isFunction(value)) {
	        return;
	      }
	
	      if (typeof value === 'string') {
	        // Tests if the string contains only whitespace (tab, newline, space etc)
	        if ((/^\s*$/).test(value)) {
	          return message;
	        }
	      }
	      else if (v.isArray(value)) {
	        // For arrays we use the length property
	        if (value.length === 0) {
	          return message;
	        }
	      }
	      else if (v.isObject(value)) {
	        // If we find at least one property we consider it non empty
	        for (attr in value) {
	          return;
	        }
	        return message;
	      }
	    },
	    length: function(value, options, attribute) {
	      // Null and undefined are fine
	      if (!v.isDefined(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var is = options.is
	        , maximum = options.maximum
	        , minimum = options.minimum
	        , tokenizer = options.tokenizer || function(val) { return val; }
	        , err
	        , errors = [];
	
	      value = tokenizer(value);
	      var length = value.length;
	      if(!v.isNumber(length)) {
	        v.error(v.format("Attribute %{attr} has a non numeric value for `length`", {attr: attribute}));
	        return options.message || this.notValid || "has an incorrect length";
	      }
	
	      // Is checks
	      if (v.isNumber(is) && length !== is) {
	        err = options.wrongLength ||
	          this.wrongLength ||
	          "is the wrong length (should be %{count} characters)";
	        errors.push(v.format(err, {count: is}));
	      }
	
	      if (v.isNumber(minimum) && length < minimum) {
	        err = options.tooShort ||
	          this.tooShort ||
	          "is too short (minimum is %{count} characters)";
	        errors.push(v.format(err, {count: minimum}));
	      }
	
	      if (v.isNumber(maximum) && length > maximum) {
	        err = options.tooLong ||
	          this.tooLong ||
	          "is too long (maximum is %{count} characters)";
	        errors.push(v.format(err, {count: maximum}));
	      }
	
	      if (errors.length > 0) {
	        return options.message || errors;
	      }
	    },
	    numericality: function(value, options) {
	      if (!v.isDefined(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var errors = []
	        , name
	        , count
	        , checks = {
	            greaterThan:          function(v, c) { return v > c; },
	            greaterThanOrEqualTo: function(v, c) { return v >= c; },
	            equalTo:              function(v, c) { return v === c; },
	            lessThan:             function(v, c) { return v < c; },
	            lessThanOrEqualTo:    function(v, c) { return v <= c; }
	          };
	
	      // Coerce the value to a number unless we're being strict.
	      if (options.noStrings !== true && v.isString(value)) {
	        value = +value;
	      }
	
	      // If it's not a number we shouldn't continue since it will compare it.
	      if (!v.isNumber(value)) {
	        return options.message || this.notValid || "is not a number";
	      }
	
	      // Same logic as above, sort of. Don't bother with comparisons if this
	      // doesn't pass.
	      if (options.onlyInteger && !v.isInteger(value)) {
	        return options.message || this.notInteger  || "must be an integer";
	      }
	
	      for (name in checks) {
	        count = options[name];
	        if (v.isNumber(count) && !checks[name](value, count)) {
	          // This picks the default message if specified
	          // For example the greaterThan check uses the message from
	          // this.notGreaterThan so we capitalize the name and prepend "not"
	          var msg = this["not" + v.capitalize(name)] ||
	            "must be %{type} %{count}";
	
	          errors.push(v.format(msg, {
	            count: count,
	            type: v.prettify(name)
	          }));
	        }
	      }
	
	      if (options.odd && value % 2 !== 1) {
	        errors.push(this.notOdd || "must be odd");
	      }
	      if (options.even && value % 2 !== 0) {
	        errors.push(this.notEven || "must be even");
	      }
	
	      if (errors.length) {
	        return options.message || errors;
	      }
	    },
	    datetime: v.extend(function(value, options) {
	      if (!v.isDefined(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var err
	        , errors = []
	        , earliest = options.earliest ? this.parse(options.earliest, options) : NaN
	        , latest = options.latest ? this.parse(options.latest, options) : NaN;
	
	      value = this.parse(value, options);
	
	      if (isNaN(value) || options.dateOnly && value % 86400000 !== 0) {
	        return options.message || this.notValid || "must be a valid date";
	      }
	
	      if (!isNaN(earliest) && value < earliest) {
	        err = this.tooEarly || "must be no earlier than %{date}";
	        err = v.format(err, {date: this.format(earliest, options)});
	        errors.push(err);
	      }
	
	      if (!isNaN(latest) && value > latest) {
	        err = this.tooLate || "must be no later than %{date}";
	        err = v.format(err, {date: this.format(latest, options)});
	        errors.push(err);
	      }
	
	      if (errors.length) {
	        return options.message || errors;
	      }
	    }, {
	      // This is the function that will be used to convert input to the number
	      // of millis since the epoch.
	      // It should return NaN if it's not a valid date.
	      parse: function(value, options) {
	        if (v.isFunction(root.XDate)) {
	          return new root.XDate(value, true).getTime();
	        }
	
	        var moment = v.tryRequire("moment") || root.moment;
	        if (v.isDefined(moment)) {
	          return +moment.utc(value);
	        }
	
	        throw new Error("Neither XDate or moment.js was found");
	      },
	      // Formats the given timestamp. Uses ISO8601 to format them.
	      // If options.dateOnly is true then only the year, month and day will be
	      // output.
	      format: function(date, options) {
	        var format = options.dateFormat;
	
	        if (v.isFunction(root.XDate)) {
	          format = format || (options.dateOnly ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss");
	          return new XDate(date, true).toString(format);
	        }
	
	        var moment = v.tryRequire("moment") || root.moment;
	        if (v.isDefined(moment)) {
	          format = format || (options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss");
	          return moment.utc(date).format(format);
	        }
	
	        throw new Error("Neither XDate or moment.js was found");
	      }
	    }),
	    date: function(value, options) {
	      options = v.extend({}, options, {dateOnly: true});
	      return v.validators.datetime.call(v.validators.datetime, value, options);
	    },
	    format: function(value, options) {
	      if (v.isString(options) || (options instanceof RegExp)) {
	        options = {pattern: options};
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var message = options.message || this.message || "is invalid"
	        , pattern = options.pattern
	        , match;
	
	      if (!v.isDefined(value)) {
	        return;
	      }
	      if (!v.isString(value)) {
	        return message;
	      }
	
	      if (v.isString(pattern)) {
	        pattern = new RegExp(options.pattern, options.flags);
	      }
	      match = pattern.exec(value);
	      if (!match || match[0].length != value.length) {
	        return message;
	      }
	    },
	    inclusion: function(value, options) {
	      if (!v.isDefined(value)) {
	        return;
	      }
	      if (v.isArray(options)) {
	        options = {within: options};
	      }
	      options = v.extend({}, this.options, options);
	      if (v.contains(options.within, value)) {
	        return;
	      }
	      var message = options.message ||
	        this.message ||
	        "^%{value} is not included in the list";
	      return v.format(message, {value: value});
	    },
	    exclusion: function(value, options) {
	      if (!v.isDefined(value)) {
	        return;
	      }
	      if (v.isArray(options)) {
	        options = {within: options};
	      }
	      options = v.extend({}, this.options, options);
	      if (!v.contains(options.within, value)) {
	        return;
	      }
	      var message = options.message || this.message || "^%{value} is restricted";
	      return v.format(message, {value: value});
	    },
	    email: v.extend(function(value, options) {
	      options = v.extend({}, this.options, options);
	      var message = options.message || this.message || "is not a valid email";
	      if (!v.isDefined(value)) {
	        return;
	      }
	      if (!v.isString(value)) {
	        return message;
	      }
	      if ((/^\s*$/).test(value)) {
	        return;
	      }
	      if (!this.PATTERN.exec(value)) {
	        return message;
	      }
	    }, {
	      PATTERN: /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
	    })
	  };
	
	  validate.exposeModule(validate, root, exports, module, __webpack_require__(/*! !webpack amd define */ 22));
	}).call(this,
	        true ? exports : null,
	        true ? module : null,
	        __webpack_require__(/*! !webpack amd define */ 22),
	        typeof require !== 'undefined' ? require : null);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/buildin/module.js */ 23)(module)))

/***/ },
/* 4 */
/*!***********************************!*\
  !*** ./public/js/widgets/card.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Card Widget
	 *
	 * @proposed data format
	 * is_organization  {Boolean} indicates if the data belongs to an organization
	 * profile_cover    {String} path to the profile cover updaloaded user/org
	 * author           {Object} author avatar, username, full_name, url
	 * description      {String} profile description
	 * joined_at        {String} ISO date string
	 * voices_total     {Number} total count of published voices
	 * followers        {Number} number of followers
	 * collaborators    <optional> {Number} users participating in org's voices
	 * collaborations   <optional> {Number} no. or voices in which is collaborating
	
	 * @TODO : define how we will collect locations. what are we planning to do
	 * with this data. eg. filtering, searching, showing flags.
	 * location         <optional>
	 *
	 * @example
	 * is_organization  : false
	 * profile_cover    : 'http://.../profile-cover.jpg'
	 * author           : {avatar: '.../avatar.jpg', username: 'username', full_name: 'John Doe", url: '.../username'}
	 * description      : 'Suspendisse Dictum Feugiat'
	 * joined_at        : '2015-03-30T13:59:47Z'
	 * voices_total     : 32
	 * followers        : 288
	 * collaborators    : 12
	 * collaborations   : 3
	 */
	
	var moment = __webpack_require__(/*! moment */ 28);
	
	Class(CV, 'Card').inherits(Widget).includes(CV.WidgetUtils)({
	  HTML : '\
	    <article role="article" class="widget-card">\
	      <div class="card_background-image-wrapper -img-cover"></div>\
	      <div class="card_info-wrapper">\
	        <img class="card_avatar -rounded" alt="{{author.full_name}}’s avatar image"/>\
	        <p class="card_username">\
	          <a class="card_username-link"></a>\
	        </p>\
	        <h3 class="card_fullname">OpenGovFoundation</h3>\
	        <p class="card_description">\
	          <i class="card_description-text"></i>\
	        </p>\
	        <div class="card_meta">\
	          <div class="card_meta-location -inline">\
	            <svg class="card_meta-svg -color-grey-light">\
	              <use xlink:href="#svg-map-pin"></use>\
	            </svg>\
	            <span class="card_meta-location-text"></span>\
	          </div>\
	          <div class="card_meta-joined-at -inline">\
	            <svg class="card_meta-svg -color-grey-light">\
	              <use xlink:href="#svg-calendar"></use>\
	            </svg>\
	            <time class="card_meta-joined-at-text" datetime=""></time>\
	          </div>\
	        </div>\
	        <div class="card_stats">\
	          <div class="-row">\
	            <div class="-col-4">\
	              <p class="stats-number card_total-voices-text -font-bold"></p>\
	              <p class="stats-label">Voices</p>\
	            </div>\
	            <div class="-col-4 card_collaborations-wrapper">\
	              <p class="stats-number card_collaborations-text -font-bold"></p>\
	              <p class="stats-label card_collaborations-label-text"></p>\
	            </div>\
	            <div class="-col-4">\
	              <p class="stats-number card_total-followers-text -font-bold"></p>\
	              <p class="stats-label">Followers</p>\
	            </div>\
	          </div>\
	        </div>\
	      </div>\
	    </article>\
	  ',
	
	  prototype : {
	    init : function init(config) {
	      Widget.prototype.init.call(this, config);
	
	      this.el = this.element[0];
	
	      this.profileCoverEl = this.el.querySelector('.card_background-image-wrapper');
	      this.avatarEl = this.el.querySelector('.card_avatar');
	      this.usernameEl = this.el.querySelector('.card_username-link');
	      this.fullNameEl = this.el.querySelector('.card_fullname');
	      this.descriptionEl = this.el.querySelector('.card_description-text');
	      this.locationEl = this.el.querySelector('.card_meta-location-text');
	      this.joinedAtEl = this.el.querySelector('.card_meta-joined-at-text');
	      this.totalVoicesEl = this.el.querySelector('.card_total-voices-text');
	      this.totalFollowersEl = this.el.querySelector('.card_total-followers-text');
	      this.collaborationsEl = this.el.querySelector('.card_collaborations-text');
	      this.collaborationsLabelEl = this.el.querySelector('.card_collaborations-label-text');
	
	      this._setupElements();
	    },
	
	    /**
	     * Update its content with the received data.
	     * @method _setupElements <private> [Function]
	     * @return Card [Object]
	     */
	    _setupElements : function() {
	      this.dom.updateBgImage(this.profileCoverEl, this.author.profile_cover);
	
	      this.dom.updateAttr('src', this.avatarEl, this.author.avatar);
	      this.dom.updateAttr('alt', this.avatarEl, this.author.full_name + "’s avatar image");
	
	      this.dom.updateText(this.usernameEl, "@" + this.author.username);
	      this.dom.updateAttr('href', this.usernameEl, this.author.profile_url);
	
	      this.dom.updateText(this.fullNameEl, this.author.full_name);
	      this.dom.updateText(this.descriptionEl, this.author.description);
	      this.dom.updateText(this.locationEl, this.author.location);
	      this.dom.updateText(this.joinedAtEl, moment(this.author.created_at).format('MMM YYYY'));
	      this.dom.updateText(this.totalVoicesEl, this.format.numbers(this.author.total_voices));
	      this.dom.updateText(this.totalFollowersEl, this.format.numbers(this.author.followers));
	
	      if (this.type === "organization") {
	        this.dom.updateText(this.collaborationsLabelEl, 'Collaborators');
	        this.dom.updateText(this.collaborationsEl, this.format.numbers(this.author.collaborators));
	      } else {
	        this.dom.updateText(this.collaborationsLabelEl, 'Collaborations');
	        this.dom.updateText(this.collaborationsEl, this.format.numbers(this.author.collaborations));
	      }
	
	      return this;
	    }
	  }
	});


/***/ },
/* 5 */
/*!******************************************!*\
  !*** ./public/js/widgets/voice-cover.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VoiceCover Widget
	 *
	 * @proposed data format
	 * tags         {Array of Objects} list of topics tagged to the voice
	 * image_cover  {String} path to the main cover image
	 * author       {Object} author avatar, username, url
	 * title        {String} voice title (65 chars max)
	 * description  {String} voice description
	 * followers    {Number} voice followers
	 * updated_at   {String} ISO date string
	 * gallery      <optional> {Array of Objects} list of thumbnail images (design expect 3 images)
	 */
	
	var moment = __webpack_require__(/*! moment */ 28);
	
	Class('VoiceCover').inherits(Widget).includes(CV.WidgetUtils)({
	  HTML : '\
	    <article class="cv-voice-cover" role="article">\
	      <ul class="cv-tags -list-horizontal"></ul>\
	      <div class="voice-cover">\
	        <div class="voice-cover-main-image-wrapper">\
	          <div class="voice-cover-main-image -img-cover"></div>\
	        </div>\
	        <a class="voice-cover-hover-overlay" href="{{voice-url}}">\
	          <button class="voice-cover-hover-overlay-button ui-btn -md -overlay -font-semi-bold">View Voice</button>\
	        </a>\
	      </div>\
	      <div class="author">\
	        <a class="author-anchor" href="{{voice-author-url}}">\
	          <img class="author-avatar -rounded" src="{{voice-author-avatar-small}}" alt="">\
	          <span class="author-username">{{voice-author-name}}</span>\
	        </a>\
	      </div>\
	      <h2 class="voice-cover-title -font-bold">{{voice-title}}</h2>\
	      <p class="voice-cover-description">{{voice-description}}</p>\
	      <div class="meta">\
	        <span class="voice-cover-followers">{{voice-followers}}</span> followers &middot;&nbsp;\
	        Updated <time class="voice-cover-datetime" datetime="{{voice-updated-at-iso}}">{{voice-updated-at-human}}</time></div>\
	    </article>\
	  ',
	
	  TAG_ITEM_HTML : '\
	    <li class="cv-tags-list-item">\
	      <a class="cv-tags-tag" href="{{tag-url}}">{{tag-name}}</a>\
	    </li>\
	  ',
	
	  HAS_GALLERY_CLASSNAME : 'gallery',
	  GALLERY_WRAPPER_HTML : '<div class="voice-cover-image-list -row"></div>',
	  GALLERY_IMAGE_HTML :  '\
	    <div class="voice-cover-image-list-item -col-4">\
	      <div class="voice-cover-thumb-image -img-cover"></div>\
	    </div>\
	  ',
	
	  IS_NEW_BADGE_HTML : '\
	    <svg class="voice-cover-badge-new">\
	      <use xlink:href="#svg-badge"></use>\
	      <text x="50%" y="50%" class="-font-bold">NEW</text>\
	    </svg>\
	  ',
	
	  prototype : {
	    init : function init(config) {
	      Widget.prototype.init.call(this, config);
	
	      this.el = this.element[0];
	      this.tagListElement = this.element.find('.cv-tags');
	      this.voiceCoverElement = this.element.find('.voice-cover');
	      this.dateTimeElement = this.el.querySelector('.voice-cover-datetime');
	
	      this.dom.updateAttr('href', this.el.querySelector('.voice-cover-hover-overlay'), this.url);
	      this.dom.updateAttr('title', this.el.querySelector('.voice-cover-hover-overlay'), this.title + ' voice');
	      this.createTags(this.tags);
	      this.dom.updateBgImage(this.el.querySelector('.voice-cover-main-image'), this.image_cover);
	
	      this.dom.updateAttr('href', this.el.querySelector('.author-anchor'), this.author.url);
	      this.dom.updateAttr('title', this.el.querySelector('.author-anchor'), this.author.username + ' profile');
	      this.dom.updateAttr('src', this.el.querySelector('.author-avatar'), this.author.avatar);
	      this.dom.updateText(this.el.querySelector('.author-username'), this.author.username);
	
	      this.dom.updateText(this.el.querySelector('.voice-cover-title'), this.title);
	      this.dom.updateText(this.el.querySelector('.voice-cover-description'), this.description);
	
	      this.dom.updateText(this.el.querySelector('.voice-cover-followers'), this.format.numbers(this.followers));
	      this.dom.updateText(this.dateTimeElement, moment(this.updated_at).fromNow());
	      this.dom.updateAttr('datetime', this.dateTimeElement, this.updated_at);
	
	      if (this.gallery.length >= 3) {
	        this.createGallery(this.gallery);
	      }
	
	      // 21 == 3 weeks (days)
	      if (moment().diff(moment(this.dom.updated_at), 'days') <= 21) {
	        this.addNewBadge();
	      }
	    },
	
	    /**
	     * Creates a tag per topic that is tagged to the topic and appends them.
	     * @method createTags <private> [Function]
	     * @params tags <required> [Array] list of topics tagged to the voice
	     * @return undefined
	     */
	    createTags : function createTags(tags) {
	      tags.forEach(function(tag) {
	        var temp = $(this.constructor.TAG_ITEM_HTML);
	        var anchor = temp.find('.cv-tags-tag');
	
	        this.dom.updateText(anchor[0], tag.name);
	        this.dom.updateAttr('href', anchor[0], tag.url);
	
	        this.tagListElement.append(temp);
	      }, this);
	
	      return this;
	    },
	
	    /**
	     * Creates the thumbnails for each gallery-image and appends the resulting
	     * gallery to voiceCoverElement.
	     * @method createGallery <private> [Function]
	     * @params gallery <required> [Array] list of objects with image's info
	     * @return undefined
	     */
	    createGallery : function createGallery(gallery) {
	      var galleryWrapper = $(this.constructor.GALLERY_WRAPPER_HTML);
	
	      this.element.addClass(this.constructor.HAS_GALLERY_CLASSNAME);
	
	      gallery.forEach(function(image) {
	        var item = $(this.constructor.GALLERY_IMAGE_HTML);
	        this.dom.updateBgImage(item.find('.voice-cover-thumb-image')[0], image);
	        galleryWrapper.append(item);
	        item = null;
	      }, this);
	
	      this.voiceCoverElement.append(galleryWrapper);
	
	      galleryWrapper = null;
	
	      return this;
	    },
	
	    /**
	     * Appends the new badge to the voiceCoverElement.
	     * @method addNewBadge <private> [Function]
	     * @return undefined
	     */
	    addNewBadge : function addNewBadge() {
	      var badge = $(this.constructor.IS_NEW_BADGE_HTML);
	
	      this.voiceCoverElement.append( badge );
	
	      requestAnimationFrame(function() {
	        badge[0].classList.add('active');
	      });
	
	      return this;
	    }
	  }
	});


/***/ },
/* 6 */
/*!************************************************!*\
  !*** ./public/js/widgets/responsive-slider.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	Class(CV, 'ResponsiveSlider').inherits(Widget)({
	    HTML: '\
	        <div class="widget-responsive-slider">\
	          <div class="slider-list"></div>\
	          <button class="slider-prev">\
	            <svg class="slider-arrow slider-arrow-svg"><use xlink:href="#svg-arrow-left"></use></svg>\
	          </button>\
	          <button class="slider-arrow slider-next">\
	            <svg class="slider-arrow-svg"><use xlink:href="#svg-arrow-right"></use></svg>\
	          </button>\
	          <div class="slider-dots"></div>\
	        </div>\
	    ',
	
	    prototype : {
	
	        arrows : true,
	        dots : false,
	        minSlideWidth : 0,
	
	        index : 0,
	        _slidesShown : 1,
	        _totalSlides : 0,
	        _itemsLen : 0,
	        _window: null,
	
	        init : function init(config) {
	            Widget.prototype.init.call(this, config);
	
	            this.el = this.element;
	            this._window = window;
	
	            this.sliderElement = this.el.querySelector('.slider-list');
	            this.itemElements = this.sliderElement.querySelectorAll('.slider-item');
	            this.dotsWrapper = this.el.querySelector('.slider-dots');
	            this.prevButtonElement = this.el.querySelector('.slider-prev');
	            this.nextButtonElement = this.el.querySelector('.slider-next');
	
	            this.itemElements = this.sliderElement.querySelectorAll('.slider-item');
	            this.itemsLen = this.itemElements.length;
	
	            if (this.arrows) {
	                this.prevButtonElement.classList.add('active');
	                this.nextButtonElement.classList.add('active');
	            }
	
	            this._bindEvents()._setup();
	        },
	
	        _bindEvents : function _bindEvents() {
	            this._window.addEventListener('resize', this._setup.bind(this));
	            if (this.arrows) this.prevButtonElement.addEventListener('click', this.prev.bind(this));
	            if (this.arrows) this.nextButtonElement.addEventListener('click', this.next.bind(this));
	            if (this.dots) this.dotsWrapper.addEventListener('click', this._dotsClickHandler.bind(this));
	
	            return this;
	        },
	
	        _setup : function _setup() {
	            var sliderWidth = this.sliderElement.getBoundingClientRect().width;
	            var slidesNumber = 1;
	
	            if (this.minSlideWidth) {
	                if (sliderWidth > this.minSlideWidth)
	                    slidesNumber = Math.floor(sliderWidth / this.minSlideWidth);
	            }
	
	            this.index = 0;
	            this._totalSlides = Math.ceil(this.itemsLen / slidesNumber) - 1;
	
	            if (this.dots) this._createDots();
	
	            this.updateSlidesWidth(slidesNumber);
	            this.updatePosition();
	
	            slideWidth = slidesNumber = null;
	
	            return this;
	        },
	
	        _dotsClickHandler : function _dotsClickHandler(ev) {
	            var child = ev.target;
	            var i = 0;
	
	            if (child.nodeName !== "BUTTON") return;
	            while((child = child.previousSibling) != null) i++;
	
	            if (i === this.index) return;
	
	            this.index = i;
	            this.updatePosition();
	        },
	
	        _createDots : function _createDots() {
	            var fragment = document.createDocumentFragment();
	            var i = 0;
	
	            this.dotsWrapper.innerHTML = "";
	            for (i = 0; i <= this._totalSlides; i++) {
	                var dot = document.createElement('button');
	                fragment.appendChild(dot);
	            }
	
	            this.dotsWrapper.appendChild(fragment);
	
	            fragment = null;
	
	            return this;
	        },
	
	        _updateDots : function _updateDots() {
	            if (!this.dots) return this;
	
	            for (var i = 0; i < this.dotsWrapper.childElementCount; i++)
	                this.dotsWrapper.childNodes[i].classList.remove('active');
	
	            this.dotsWrapper.childNodes[this.index].classList.add('active');
	
	            return this;
	        },
	
	        _updateButtons : function _updateButtons() {
	            if (this.index === 0) {
	                this.prevButtonElement.setAttribute('disabled', true);
	                this.prevButtonElement.classList.add('disabled');
	            } else {
	                this.prevButtonElement.removeAttribute('disabled');
	                this.prevButtonElement.classList.remove('disabled');
	            }
	
	            if (this.index === this._totalSlides) {
	                this.nextButtonElement.setAttribute('disabled', true);
	                this.nextButtonElement.classList.add('disabled');
	            } else {
	                this.nextButtonElement.removeAttribute('disabled');
	                this.nextButtonElement.classList.remove('disabled');
	            }
	
	            return this;
	        },
	
	        prev : function prev() {
	            if (this.index <= 0) return this;
	
	            this.index--;
	
	            return this.updatePosition();
	        },
	
	        next : function next() {
	            if (this.index >= this._totalSlides) return this;
	
	            this.index++;
	
	            return this.updatePosition();
	        },
	
	        updateSlidesWidth : function updateSlidesWidth(numberOfSlides) {
	            var slideWidth = 100 / numberOfSlides + '%';
	
	            this._slidesShown = numberOfSlides;
	
	            for (var i = 0; i < this.itemsLen; i ++)
	                this.itemElements[i].style.width = slideWidth;
	
	            return this;
	        },
	
	        updatePosition : function updatePosition() {
	            var x, remainingPercentage, remain, missing;
	
	            this._updateButtons()._updateDots();
	
	            x = Math.abs(this.index * 100);
	            remainingPercentage = 0;
	
	            if (this.index > 0) {
	                remain = this.itemsLen - ((this.index) * this._slidesShown);
	            }
	
	            if (remain < this._slidesShown) {
	                missing = this._slidesShown - remain;
	                remainingPercentage = (100 / (remain + missing)) * remain;
	                x -= 100 - remainingPercentage;
	            }
	
	            x = x * -1;
	
	            this.sliderElement.style.transform = 'translateX(' + x + '%)';
	
	            return this;
	        }
	    }
	});


/***/ },
/* 7 */
/*!*********************************************!*\
  !*** ./public/js/widgets/category-cover.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @data format
	 * name         {String} category name
	 * image_cover  {String} path to the main cover image
	 * url          {String} topic's permalink
	 */
	Class('CategoryCover').inherits(Widget).includes(CV.WidgetUtils)({
	    HTML : '\
	        <div class="homepage-category-list-item">\
	            <div class="homepage-category-list-item-inner">\
	                <div class="homepage-category-cover -img-cover"></div>\
	                <a class="categories_link -font-semi-bold" href="#" alt="">\
	                    <span class="categories_link-inner"></span>\
	                </a>\
	            </div>\
	        </div>\
	    ',
	
	    prototype : {
	
	        data : {
	            name: '',
	            image_cover: '',
	            url: ''
	        },
	
	        init : function init(config) {
	            Widget.prototype.init.call(this, config);
	
	            this.el = this.element[0];
	
	            this.anchorElement = this.el.querySelector('.categories_link');
	
	            this.dom.updateBgImage(this.el.querySelector('.homepage-category-cover'), this.data.image_cover);
	            this.dom.updateAttr('href', this.anchorElement, this.data.url);
	            this.dom.updateAttr('alt', this.anchorElement, this.data.name);
	            this.dom.updateText(this.el.querySelector('.categories_link-inner'), this.data.name);
	        }
	    }
	});


/***/ },
/* 8 */
/*!***********************************!*\
  !*** ./public/js/widgets/post.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	Class(CV, 'Post').inherits(Widget).includes(CV.WidgetUtils)({
	    ACTIONS_HTML : '\
	        <div class="post-card-actions">\
	            <div class="-row -full-height">\
	                <div class="post-card-actions-item -col-4">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-repost"></use>\
	                    </svg>\
	                </div>\
	                <div class="post-card-actions-item -col-4">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-save"></use>\
	                    </svg>\
	                </div>\
	                <div class="post-card-actions-item -col-4">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-share"></use>\
	                    </svg>\
	                </div>\
	            </div>\
	        </div>\
	    ',
	
	    create : function create(config) {
	        var type = this.prototype.format.capitalizeFirstLetter(config.source_type);
	
	        return new window['CV']['Post' + type](config);
	    },
	
	    prototype : {
	        _repostIntent : function _repostIntent() {},
	        _repost : function _repost() {},
	
	        _save : function _save() {},
	
	        shareIntent : function shareIntent() {},
	        _share : function _share() {}
	    }
	});
	


/***/ },
/* 9 */
/*!*****************************************!*\
  !*** ./public/js/widgets/post-image.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(/*! moment */ 28);
	
	Class(CV, 'PostImage').inherits(CV.Post)({
	    HTML : '\
	    <article class="post-card image">\
	        <div class="post-card-image-wrapper">\
	            <img class="post-card-image"/>\
	        </div>\
	        <div class="post-card-info">\
	            <div class="post-card-meta">\
	                <span class="post-card-meta-source"></span>\
	                <time class="post-card-meta-date" datetime=""></time>\
	            </div>\
	            <h2 class="post-card-title"></h2>\
	            <p class="post-card-description"></p>\
	            <div class="post-card-activity">\
	                <div class="post-card-activity-repost -inline-block -mr1">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-repost"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	                <div class="post-card-activity-saved -inline-block">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-save"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	            </div>\
	        </div>\
	    </article>\
	    ',
	
	    ICON : '<svg class="post-card-meta-icon"><use xlink:href="#svg-image"></use></svg>',
	
	    prototype : {
	        init : function init(config) {
	            Widget.prototype.init.call(this, config);
	
	            this.el = this.element[0];
	            this.sourceElement = this.el.querySelector('.post-card-meta-source');
	            this.dateTimeElement = this.el.querySelector('.post-card-meta-date');
	
	            this.el.insertAdjacentHTML('beforeend', this.constructor.ACTIONS_HTML);
	
	            if (this.image_url) {
	                this.dom.updateAttr('src', this.el.querySelector('.post-card-image'), this.image_url);
	                this.dom.show(this.el.querySelector('.post-card-image-wrapper'));
	            }
	
	            if (this.source_url && this.source_service) {
	                var a = this.dom.create('a');
	                this.dom.updateAttr('href', a, this.source_url);
	                this.dom.updateText(a, this.source_service + " ");
	                this.dom.updateText(this.sourceElement, 'from ');
	                this.sourceElement.appendChild(a);
	            } else {
	                this.el.querySelector('.post-card-meta').insertAdjacentHTML('afterbegin', this.constructor.ICON);
	                this.dom.updateText(this.sourceElement, 'posted ');
	            }
	
	            this.dom.updateText(this.dateTimeElement, "on " + moment(this.created_at).format('MMM DD, YYYY'));
	            this.dom.updateAttr('datetime', this.dateTimeElement, this.created_at);
	
	            this.dom.updateText(this.el.querySelector('.post-card-title'), this.title);
	            this.dom.updateText(this.el.querySelector('.post-card-description'), this.description);
	
	            this.dom.updateText(this.el.querySelector('.post-card-activity-repost .post-card-activity-label'), this.total_reposts);
	            this.dom.updateText(this.el.querySelector('.post-card-activity-saved .post-card-activity-label'), this.total_saves);
	        }
	    }
	});


/***/ },
/* 10 */
/*!*****************************************!*\
  !*** ./public/js/widgets/post-video.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(/*! moment */ 28);
	
	// <iframe width="560" height="315" src="https://www.youtube.com/embed/Opktm709TJo" frameborder="0" allowfullscreen></iframe>
	// <iframe src="https://player.vimeo.com/video/20729832?title=0&byline=0&portrait=0" width="500" height="272" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
	Class(CV, 'PostVideo').inherits(CV.Post)({
	    HTML : '\
	    <article class="post-card video">\
	        <div class="post-card-image-wrapper">\
	            <img class="post-card-image"/>\
	            <div class="post-card-play-button">\
	                <svg class="post-card-svg-play">\
	                    <use xlink:href="#svg-play"></use>\
	                </svg>\
	            </div>\
	        </div>\
	        <div class="post-card-info">\
	            <div class="post-card-meta">\
	                <span class="post-card-meta-source"></span>\
	                <time class="post-card-meta-date" datetime=""></time>\
	            </div>\
	            <h2 class="post-card-title"></h2>\
	            <p class="post-card-description"></p>\
	            <div class="post-card-activity">\
	                <div class="post-card-activity-repost -inline-block -mr1">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-repost"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	                <div class="post-card-activity-saved -inline-block">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-save"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	            </div>\
	        </div>\
	    </article>\
	    ',
	
	    ICON : '<svg class="post-card-meta-icon"><use xlink:href="#svg-play"></use></svg>',
	    reYT : new RegExp('v=((\\w+-?)+)'),
	    reV : new RegExp('[0-9]+'),
	
	    prototype : {
	        init : function init(config) {
	            Widget.prototype.init.call(this, config);
	
	            this.el = this.element[0];
	            this.sourceElement = this.el.querySelector('.post-card-meta-source');
	            this.dateTimeElement = this.el.querySelector('.post-card-meta-date');
	            this.videoWrapper = this.el.querySelector('.post-card-image-wrapper');
	
	            this.el.insertAdjacentHTML('beforeend', this.constructor.ACTIONS_HTML);
	
	            if (this.image_url) {
	                this.dom.updateAttr('src', this.el.querySelector('.post-card-image'), this.image_url);
	                this.dom.show(this.el.querySelector('.post-card-image-wrapper'));
	            }
	
	            if (this.source_url && this.source_service) {
	                var a = this.dom.create('a');
	                this.dom.updateAttr('href', a, this.source_url);
	                this.dom.updateText(a, this.source_service + " ");
	                this.dom.updateText(this.sourceElement, 'from ');
	                this.sourceElement.appendChild(a);
	            } else {
	                this.el.querySelector('.post-card-meta').insertAdjacentHTML('afterbegin', this.constructor.ICON);
	                this.dom.updateText(this.sourceElement, 'posted ');
	            }
	
	            this.dom.updateText(this.dateTimeElement, "on " + moment(this.created_at).format('MMM DD, YYYY'));
	            this.dom.updateAttr('datetime', this.dateTimeElement, this.created_at);
	
	            this.dom.updateText(this.el.querySelector('.post-card-title'), this.title);
	            this.dom.updateText(this.el.querySelector('.post-card-description'), this.description);
	
	            this.dom.updateText(this.el.querySelector('.post-card-activity-repost .post-card-activity-label'), this.total_reposts);
	            this.dom.updateText(this.el.querySelector('.post-card-activity-saved .post-card-activity-label'), this.total_saves);
	
	            this._bindEvents();
	        },
	
	        _bindEvents : function _bindEvents() {
	            console.log('click')
	            this.addVideoHandler = this.addVideo.bind(this);
	            this.videoWrapper.addEventListener('click', this.addVideoHandler);
	        },
	
	        addVideo : function() {
	            this.videoWrapper.removeEventListener('click', this.addVideoHandler);
	
	            var iframe = document.createElement('iframe');
	            this.dom.updateAttr('frameborder', iframe, 0);
	            this.dom.updateAttr('allowfullscreen', iframe, true);
	
	            if (this.source_service === 'youtube') {
	                var id = this.source_url.match(this.constructor.reYT)[1];
	                this.dom.updateAttr('src', iframe, 'https://www.youtube.com/embed/' + id + '?autoplay=1');
	            }
	
	            if (this.source_service === 'vimeo') {
	                var id = this.source_url.match(this.constructor.reV)[0];
	                this.dom.updateAttr('src', iframe, 'https://player.vimeo.com/video/' + id + '?autoplay=1');
	            }
	
	            this.videoWrapper.appendChild(iframe);
	        }
	    }
	});


/***/ },
/* 11 */
/*!*****************************************!*\
  !*** ./public/js/widgets/post-audio.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	
	var moment = __webpack_require__(/*! moment */ 28);
	Class(CV, 'PostAudio').inherits(CV.Post)({
	    HTML : '\
	    <article class="post-card audio">\
	        <div class="post-card-image-wrapper">\
	            <img class="post-card-image"/>\
	        </div>\
	        <div class="post-card-audio-player-wrapper">\
	            <div class="post-card-audio-player-progress-wrapper">\
	                <div class="post-card-audio-player-progress"></div>\
	            </div>\
	            <button class="post-card-play-button -rel">\
	                <svg class="post-card-svg-play">\
	                    <use xlink:href="#svg-play"></use>\
	                </svg>\
	                <svg class="post-card-svg-pause">\
	                    <use xlink:href="#svg-pause"></use>\
	                </svg>\
	            </button>\
	            <div class="post-card-audio-player-text -rel">\
	                <p class="init"><b>Listen</b> (<span class="post-card-audio-player-total-time-db">3:45</span>)</p>\
	                <p class="loaded">\
	                    <span class="post-card-audio-player-current-time">0:00</span>\
	                    &nbsp;/\&nbsp;<span class="post-card-audio-player-total-time">0:00</span>\
	                </p>\
	            </div>\
	        </div>\
	        <div class="post-card-info">\
	            <div class="post-card-meta">\
	                <span class="post-card-meta-source"></span>\
	                <time class="post-card-meta-date" datetime=""></time>\
	            </div>\
	            <h2 class="post-card-title"></h2>\
	            <p class="post-card-description"></p>\
	            <div class="post-card-activity">\
	                <div class="post-card-activity-repost -inline-block -mr1">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-repost"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	                <div class="post-card-activity-saved -inline-block">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-save"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	            </div>\
	        </div>\
	    </article>\
	    ',
	
	    ICON : '<svg class="post-card-meta-icon"><use xlink:href="#svg-speaker"></use></svg>',
	
	    prototype : {
	
	        audio: null,
	
	        init : function init(config) {
	            Widget.prototype.init.call(this, config);
	
	            this.el = this.element[0];
	            this.playerWrapper = this.el.querySelector('.post-card-audio-player-wrapper');
	            this.playButton = this.el.querySelector('.post-card-play-button');
	            this.audioTotalTime = this.el.querySelector('.post-card-audio-player-total-time');
	            this.audioCurrentTime = this.el.querySelector('.post-card-audio-player-current-time');
	            this.playerProgressWrapper = this.el.querySelector('.post-card-audio-player-progress-wrapper');
	            this.playerProgress = this.el.querySelector('.post-card-audio-player-progress');
	            this.sourceElement = this.el.querySelector('.post-card-meta-source');
	            this.dateTimeElement = this.el.querySelector('.post-card-meta-date');
	
	            this.el.insertAdjacentHTML('beforeend', this.constructor.ACTIONS_HTML);
	
	            if (this.image_url) {
	                this.dom.updateAttr('src', this.el.querySelector('.post-card-image'), this.image_url);
	                this.dom.show(this.el.querySelector('.post-card-image-wrapper'));
	            }
	
	            if (this.source_url && this.source_service) {
	                var a = this.dom.create('a');
	                this.dom.updateAttr('href', a, this.source_url);
	                this.dom.updateText(a, this.source_service + " ");
	                this.dom.updateText(this.sourceElement, 'from ');
	                this.sourceElement.appendChild(a);
	            } else {
	                this.el.querySelector('.post-card-meta').insertAdjacentHTML('afterbegin', this.constructor.ICON);
	                this.dom.updateText(this.sourceElement, 'posted ');
	            }
	
	            this.dom.updateText(this.dateTimeElement, "on " + moment(this.created_at).format('MMM DD, YYYY'));
	            this.dom.updateAttr('datetime', this.dateTimeElement, this.created_at);
	
	            this.dom.updateText(this.el.querySelector('.post-card-title'), this.title);
	            this.dom.updateText(this.el.querySelector('.post-card-description'), this.description);
	
	            this.dom.updateText(this.el.querySelector('.post-card-activity-repost .post-card-activity-label'), this.total_reposts);
	            this.dom.updateText(this.el.querySelector('.post-card-activity-saved .post-card-activity-label'), this.total_saves);
	
	            this.dom.updateText(this.el.querySelector('.post-card-audio-player-total-time-db'), this.audio_duration);
	
	            this.audio = new CV.Audio(this.source_url);
	
	            this._bindEvents();
	        },
	
	        _bindEvents : function _bindEvents() {
	            this.playButton.addEventListener('click', this.togglePlayHandler.bind(this), false);
	            this.playerProgressWrapper.addEventListener('mouseup', this.progressMouseup.bind(this), false);
	
	            this.audio.bind('onload', function() {
	                console.log('onload received :)')
	                this.playerWrapper.classList.remove('-is-downloading');
	                this.playerWrapper.classList.add('-is-loaded');
	                this.dom.updateText(this.audioTotalTime, this.format.secondsToHHMMSS(this.audio.getDuration() / 1000));
	
	                this._soundLoaded = true;
	                this.togglePlayHandler();
	            }.bind(this));
	
	            this.audio.bind('whileplaying', function(data) {
	                console.log('whileplaying received :)')
	                var p = this.audio.getProgressPercentage();
	                this.playerProgress.style['WebkitTransform'] = 'translate3d(' + (p - 100) + '%, 0, 0)';
	                this.audioCurrentTime.textContent = this.format.secondsToHHMMSS(this.audio.getCurrentTime() / 1000);
	            }.bind(this));
	
	            this.audio.bind('onfinish', function(data) {
	                this.audio.setPosition(0);
	                this.togglePlayHandler();
	            }.bind(this));
	
	            return this;
	        },
	
	        progressMouseup : function(ev) {
	            if (!this._soundLoaded) return;
	
	            var cr, x, width, duration, newPosition;
	
	            cr = ev.currentTarget.getBoundingClientRect();
	            x = ev.pageX - cr.left;
	            width = cr.width;
	            duration = this.audio.getDuration();
	            newPosition = ~~(x * duration / width);
	
	            this.audio.setPosition(newPosition);
	
	            cr = x = width = duration = newPosition = null;
	        },
	
	        _loadSound : function() {
	            this.playerWrapper.classList.add('-is-downloading');
	            this.audio.load();
	        },
	
	        _soundLoaded: false,
	        togglePlayHandler : function togglePlayHandler() {
	            if (this._soundLoaded === false) {
	                return this._loadSound();
	            }
	
	            this.playerWrapper.classList.toggle('-is-playing');
	
	            if (this.audio.paused) this.audio.play();
	            else this.audio.pause();
	        }
	    }
	});


/***/ },
/* 12 */
/*!****************************************!*\
  !*** ./public/js/widgets/post-link.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(/*! moment */ 28);
	
	Class(CV, 'PostLink').inherits(CV.Post)({
	    HTML : '\
	    <article class="post-card link">\
	        <div class="post-card-image-wrapper">\
	            <img class="post-card-image"/>\
	        </div>\
	        <div class="post-card-info">\
	            <div class="post-card-meta">\
	                <span class="post-card-meta-source"></span>\
	                <time class="post-card-meta-date" datetime=""></time>\
	            </div>\
	            <h2 class="post-card-title"></h2>\
	            <p class="post-card-description"></p>\
	            <div class="post-card-activity">\
	                <div class="post-card-activity-repost -inline-block -mr1">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-repost"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	                <div class="post-card-activity-saved -inline-block">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-save"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	            </div>\
	        </div>\
	    </article>\
	    ',
	
	    ICON : '<svg class="post-card-meta-icon"><use xlink:href="#svg-repost"></use></svg>',
	
	    prototype : {
	        init : function init(config) {
	            Widget.prototype.init.call(this, config);
	
	            this.el = this.element[0];
	            this.sourceElement = this.el.querySelector('.post-card-meta-source');
	            this.dateTimeElement = this.el.querySelector('.post-card-meta-date');
	
	            this.el.insertAdjacentHTML('beforeend', this.constructor.ACTIONS_HTML);
	
	            if (this.image_url) {
	                this.dom.updateAttr('src', this.el.querySelector('.post-card-image'), this.image_url);
	                this.dom.show(this.el.querySelector('.post-card-image-wrapper'));
	            }
	
	            if (this.source_url && this.source_service) {
	                var a = this.dom.create('a');
	                this.dom.updateAttr('href', a, this.source_url);
	                this.dom.updateText(a, this.source_service + " ");
	                this.dom.updateText(this.sourceElement, 'from ');
	                this.sourceElement.appendChild(a);
	            } else {
	                this.el.querySelector('.post-card-meta').insertAdjacentHTML('afterbegin', this.constructor.ICON);
	                this.dom.updateText(this.sourceElement, 'posted ');
	            }
	
	            this.dom.updateText(this.dateTimeElement, "on " + moment(this.created_at).format('MMM DD, YYYY'));
	            this.dom.updateAttr('datetime', this.dateTimeElement, this.created_at);
	
	            this.dom.updateText(this.el.querySelector('.post-card-title'), this.title);
	            this.dom.updateText(this.el.querySelector('.post-card-description'), this.description);
	
	            this.dom.updateText(this.el.querySelector('.post-card-activity-repost .post-card-activity-label'), this.total_reposts);
	            this.dom.updateText(this.el.querySelector('.post-card-activity-saved .post-card-activity-label'), this.total_saves);
	        }
	    }
	});


/***/ },
/* 13 */
/*!*****************************************!*\
  !*** ./public/js/widgets/post-quote.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(/*! moment */ 28);
	
	Class(CV, 'PostQuote').inherits(CV.Post)({
	    HTML : '\
	    <article class="post-card">\
	        <div class="post-card-info">\
	            <div class="post-card-meta">\
	                <span class="post-card-meta-source"></span>\
	                <time class="post-card-meta-date" datetime=""></time>\
	            </div>\
	            <p class="post-card-quote"></p>\
	            <p class="post-card-quote-author"></p>\
	            <div class="post-card-activity">\
	                <div class="post-card-activity-repost -inline-block -mr1">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-repost"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	                <div class="post-card-activity-saved -inline-block">\
	                    <svg class="post-card-activity-svg">\
	                        <use xlink:href="#svg-save"></use>\
	                    </svg>\
	                    <span class="post-card-activity-label">0</span>\
	                </div>\
	            </div>\
	        </div>\
	    </article>\
	    ',
	
	    ICON : '<svg class="post-card-meta-icon"><use xlink:href="#svg-repost"></use></svg>',
	
	    prototype : {
	        init : function init(config) {
	            Widget.prototype.init.call(this, config);
	
	            this.el = this.element[0];
	            this.sourceElement = this.el.querySelector('.post-card-meta-source');
	            this.dateTimeElement = this.el.querySelector('.post-card-meta-date');
	
	            this.el.insertAdjacentHTML('beforeend', this.constructor.ACTIONS_HTML);
	
	            if (this.source_url && this.source_service) {
	                var a = this.dom.create('a');
	                this.dom.updateAttr('href', a, this.source_url);
	                this.dom.updateText(a, this.source_service + " ");
	                this.dom.updateText(this.sourceElement, 'from ');
	                this.sourceElement.appendChild(a);
	            } else {
	                this.el.querySelector('.post-card-meta').insertAdjacentHTML('afterbegin', this.constructor.ICON);
	                this.dom.updateText(this.sourceElement, 'posted ');
	            }
	
	            this.dom.updateText(this.dateTimeElement, "on " + moment(this.created_at).format('MMM DD, YYYY'));
	            this.dom.updateAttr('datetime', this.dateTimeElement, this.created_at);
	
	            this.dom.updateText(this.el.querySelector('.post-card-quote'), this.title);
	            this.dom.updateText(this.el.querySelector('.post-card-quote-author'), this.description);
	
	            this.dom.updateText(this.el.querySelector('.post-card-activity-repost .post-card-activity-label'), this.total_reposts);
	            this.dom.updateText(this.el.querySelector('.post-card-activity-saved .post-card-activity-label'), this.total_saves);
	        }
	    }
	});


/***/ },
/* 14 */
/*!************************************!*\
  !*** ./public/js/widgets/audio.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Ensures SoundManager2 is initialized once.
	 * Register the sound and expose the SoundManager instance as 'sound', so you
	 * can manually bind to the events you are interested in.
	 * This is basically a wrapper for SoundManager2. To know what you can do with
	 * the exposed 'sound' property, check SoundManager2 documentation.
	 *
	 * @ocumentation: http://www.schillmania.com/projects/soundmanager2/doc/
	 */
	Class(CV, 'Audio').includes(CustomEventSupport)({
	
	    _loading : false,
	
	    /* Start soundManager. Once is loaded, it will notify any Audio instances
	     * so they can start using its API.
	     * @method setup <static> [Function]
	     * @dispatch 'ready'
	     * @dispath 'error'
	     * @return CV.Audio Class
	     */
	    setup : function() {
	        if (this._loading) {
	            return;
	        }
	
	        this._loading = true;
	
	        soundManager.setup({
	            url : '/node_modules/SoundManager2/swf/',
	            preferFlash: false,
	            onready : function() {
	                console.log('SM ready');
	                CV.Audio.dispatch('ready');
	            },
	            ontimeout : function() {
	                console.log('Uh-oh. No HTML5 support, SWF missing, Flash blocked or other issue')
	                CV.Audio.dispatch('error');
	            }
	        });
	
	        return this;
	    },
	
	    prototype : {
	
	        /* config */
	        URLString : "",
	
	        /* public props */
	        sound : null,
	        paused : true,
	
	        init : function init(URLString) {
	            this.URLString = URLString;
	
	            if (soundManager.enabled) { /* SoundManager2 is already loaded*/
	                return this._createSound();
	            }
	
	            CV.Audio.setup();
	            CV.Audio.bind('ready', this._createSound.bind(this));
	        },
	
	        /* this method is called after SoundManager2 is loaded
	         * @method _createSound <private> [Function]
	         */
	        _createSound : function _createSound() {
	            this.sound = soundManager.createSound({
	                url : this.URLString
	            });
	
	            return this;
	        },
	
	        /* By deafult the sound is created but not loaded. To play a sound you
	         * need to tell SoundManager2 to actually load the sound file, which is
	         * exactly what this method does. It will also regiter the events we
	         * are interested on listening from SoundManager2.
	         * @method load <public>
	         */
	        load : function() {
	            var audioInstance = this;
	
	            this.sound.options = {
	                onload : function() {audioInstance.dispatch('onload');},
	                whileplaying : function() {audioInstance.dispatch('whileplaying');},
	                onfinish : function() {audioInstance.dispatch('onfinish');}
	            }
	
	            this.sound.load();
	        },
	
	        /* @method play <public>
	         */
	        play : function() {
	            this.sound.play();
	            this.paused = false;
	
	            return this;
	        },
	
	        /* @method pause <public>
	         */
	        pause : function() {
	            this.sound.pause();
	            this.paused = true;
	
	            return this;
	        },
	
	        setPosition : function(position) {
	            this.sound.setPosition(position);
	        },
	
	        /* Returns the audio file duration in milliseconds
	         * @method getDuration <public>
	         */
	        getDuration : function() {
	            return this.sound.duration;
	        },
	
	        /* Returns the audio-file currentTime in milliseconds.
	         * @method getCurrentTime <public>
	         */
	        getCurrentTime : function() {
	            return this.sound.position;
	        },
	
	        /* Returns the progress in percetamge (0-100)
	         * @method getProgressPercentage <public>
	         */
	        getProgressPercentage : function() {
	            return this.getCurrentTime() / this.getDuration() * 100;
	        }
	    }
	});


/***/ },
/* 15 */
/*!********************************!*\
  !*** ./lib/js/widget-utils.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Generic Module of Utilities
	 * dom : handy methods for DOM manipulation
	 * format : methods for formatting and manipulating numbers
	 */
	Module(CV, 'WidgetUtils')({
	    prototype : {
	        dom : {
	            /* Replace the backgroundImage property of the style attribute for
	             * the element passed with the imageStringPath param value.
	             * @method updateBackgroundImage <public> [Function]
	             */
	            updateBgImage : function(element, imageStringPath) {
	                element.style.backgroundImage = 'url(' + imageStringPath + ')';
	            },
	
	            /* Replace the textContent of the element passed with the
	             * textString param value.
	             * @method updateBackgroundImage <public> [Function]
	             */
	            updateText : function(element, textString) {
	                element.textContent = textString;
	            },
	
	            /* Replace the passed attribute on the passed element the value param.
	             * @method updateAttr <public> [Function]
	             */
	            updateAttr : function(attr, element, value) {
	                element.setAttribute(attr, value);
	            },
	
	            create: function(type) {
	                return document.createElement(type);
	            },
	
	            show: function(element) {
	                element.style.display = "block";
	                return element;
	            }
	        },
	
	        format : {
	            /* Return a formatted number by commas on each thrid rtl.
	             * @method format.number <public> [Function]
	             * @param number <required> [Number]
	             * @return n [String] e.g "1,234,567"
	             */
	            numbers : function numbers(number) {
	                var n = number.toString();              // "1234567"
	                n = n.split("").reverse().join("");     // "7654321"
	                n = n.match(/.{1,3}/g).join(",");       // "765,432,1"
	                n = n.split("").reverse().join("");     // "1,234,567"
	
	                return n;
	            },
	
	            /* Capitalize the first character of the passed string.
	             * @method format.capitalizeFirstLetter <public> [Function]
	             * @param string <required> [String]
	             * @return string (modified) e.g "hello world" => "Hello world"
	             */
	            capitalizeFirstLetter : function capitalizeFirstLetter(string) {
	                return string.charAt(0).toUpperCase() + string.slice(1);
	            },
	
	            /*
	             * Converts the passed number (seconds) into a time string with
	             * format (hh:)mm:ss
	             * @method secondsToHHMMSS <public> [Function]
	             * @params seconds <required> [Number]
	             * @return [String] e.g 60 => "01:00"
	             */
	            secondsToHHMMSS : function(seconds) {
	                var h, m, s;
	
	                seconds = ~~seconds;
	                h = ~~(seconds / 3600);
	                m = ~~(seconds % 3600 / 60);
	                s = ~~(seconds % 3600 % 60);
	
	                return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
	            }
	        }
	    }
	});


/***/ },
/* 16 */
/*!********************************!*\
  !*** ./~/neon/stdlib/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	// This file is node only
	if(true){
	    __webpack_require__(/*! ./custom_event */ 24);
	    __webpack_require__(/*! ./custom_event_support */ 25);
	    __webpack_require__(/*! ./node_support */ 26);
	    __webpack_require__(/*! ./bubbling_support */ 27);
	}


/***/ },
/* 17 */
/*!*******************************!*\
  !*** ./public/css/style.less ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/autoprefixer-loader?browsers=last 2 version!./~/less-loader!./public/css/style.less */ 18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 21)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/noeldelgado/Projects/empathya/crowdvoice.by/node_modules/css-loader/index.js!/Users/noeldelgado/Projects/empathya/crowdvoice.by/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/noeldelgado/Projects/empathya/crowdvoice.by/node_modules/less-loader/index.js!/Users/noeldelgado/Projects/empathya/crowdvoice.by/public/css/style.less", function() {
			var newContent = require("!!/Users/noeldelgado/Projects/empathya/crowdvoice.by/node_modules/css-loader/index.js!/Users/noeldelgado/Projects/empathya/crowdvoice.by/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/noeldelgado/Projects/empathya/crowdvoice.by/node_modules/less-loader/index.js!/Users/noeldelgado/Projects/empathya/crowdvoice.by/public/css/style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/*!**************************************************************************************************************!*\
  !*** ./~/css-loader!./~/autoprefixer-loader?browsers=last 2 version!./~/less-loader!./public/css/style.less ***!
  \**************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 140)();
	exports.push([module.id, "/* =========================================================================== *\n *  vendor :: sanitize.css - render elements consistently across browsers\n * =========================================================================== */\n/*! sanitize.css | CC0 Public Domain | github.com/jonathantneal/sanitize.css */\npre,textarea{overflow:auto}\n:root{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;box-sizing:border-box;cursor:default;font-family:sans-serif;line-height:1.5em;text-rendering:optimizeLegibility;vertical-align:top}\n[hidden],audio:not([controls]),template{display:none}\ndetails,main,summary{display:block}\ninput[type=number]{width:auto}\ninput[type=search]{-webkit-appearance:textfield}\ninput[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}\nprogress{display:inline-block}\nsmall{font-size:75%}\ntextarea{resize:vertical}\n[unselectable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}\n*,::after,::before{box-sizing:inherit;color:inherit;font-family:inherit;font-size:inherit;line-height:inherit;text-decoration:inherit;vertical-align:inherit;border-style:solid;border-width:0}\n*{margin:0;padding:0;cursor:inherit}\na,button,input,select,textarea{cursor:initial}\nbutton,input,select,textarea{background:0 0}\ncode,kbd,pre,samp{font-family:monospace,monospace}\ninput{min-height:1.5em}\nnav ol,nav ul{list-style:none}\nselect{-moz-appearance:none;-webkit-appearance:none}\nselect::-ms-expand{display:none}\nselect::-ms-value{color:currentColor}\ntable{border-collapse:collapse;border-spacing:0}\n::-moz-selection{background-color:#B3D4FC;text-shadow:none}\n::selection{background-color:#B3D4FC;text-shadow:none}\n@media screen{[hidden~=screen]{display:inherit}\n[hidden~=screen]:not(:active):not(:focus):not(:target){clip:rect(0 0 0 0)!important;position:absolute!important}\n}\n/* =========================================================================== *\n *  lib :: kabinett\n * =========================================================================== */\n/**\n  Kabinett – Module Core Variables\n*/\n/* =========================================================================== *\n *  global base variables\n * =========================================================================== */\n/* =========================================================================== *\n *  buttons variables\n * =========================================================================== */\n/**\n  Kabinett – Module Core Base\n*/\n:root {\n  font-size: 13px;\n  font-family: 'Open Sans', sans-serif;\n  line-height: 1.618;\n  color: #666666;\n  background-color: white;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: \"Ubuntu Mono\", \"Source Code Pro\", Consolas, monospace;\n}\n/**\n  Kabinett – Module Typography\n  @source font-size http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css\n  @source font-size http://hg.mozilla.org/mozilla-central/file/tip/layout/style/html.css\n*/\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 1em 0 0.5em;\n  color: #333333;\n}\nh1,\n.h1 {\n  font-size: 2rem;\n}\nh2,\n.h2 {\n  font-size: 1.5rem;\n}\nh3,\n.h3 {\n  font-size: 1.17rem;\n}\nh4,\n.h4 {\n  font-size: 1rem;\n}\nh5,\n.h5 {\n  font-size: 0.83rem;\n}\nh6,\n.h6 {\n  font-size: 0.67rem;\n}\n/*\n  @TODO: Make it responsive\n\n  Kabinett – Grid Module\n*/\n.-row:after {\n  content: '';\n  clear: both;\n  display: table;\n}\n.-col,\n.-col-1,\n.-col-2,\n.-col-3,\n.-col-4,\n.-col-5,\n.-col-6,\n.-col-7,\n.-col-8,\n.-col-9,\n.-col-10,\n.-col-11,\n.-col-12 {\n  float: left;\n  min-height: 1px;\n}\n.-col-1 {\n  width: 8.33333333%;\n}\n.-col-2 {\n  width: 16.66666667%;\n}\n.-col-3 {\n  width: 25%;\n}\n.-col-4 {\n  width: 33.33333333%;\n}\n.-col-5 {\n  width: 41.66666667%;\n}\n.-col-6 {\n  width: 50%;\n}\n.-col-7 {\n  width: 58.33333333%;\n}\n.-col-8 {\n  width: 66.66666667%;\n}\n.-col-9 {\n  width: 75%;\n}\n.-col-10 {\n  width: 83.33333333%;\n}\n.-col-11 {\n  width: 91.66666667%;\n}\n.-col-12 {\n  width: 100%;\n}\n/**\n  Button Component\n  .{{ns}}-btn\n\n  @example\n    <button class=\"{{ns}}-button\">...</button>\n*/\n.ui-btn {\n  font-size: 12px;\n  display: inline-block;\n  vertical-align: top;\n  height: 30px;\n  line-height: 1em;\n  padding: 0 1em;\n  border: 1px solid;\n  border-color: currentColor;\n  border-radius: 4px;\n  text-decoration: none;\n  cursor: pointer;\n  outline: none;\n  /** ===== STATES ===== */\n  /** ===== SIZES  ===== **/\n}\n.ui-btn:active,\n.ui-btn.-is-active {\n  line-height: 31px;\n}\n.ui-btn.-sm:active,\n.ui-btn.-sm.-is-active {\n  line-height: 25px;\n}\n.ui-btn.-md:active,\n.ui-btn.-md.-is-active {\n  line-height: 35px;\n}\n.ui-btn.-lg:active,\n.ui-btn.-lg.-is-active {\n  line-height: 54px;\n}\n.ui-btn.-xl:active,\n.ui-btn.-xl.-is-active {\n  line-height: 62px;\n}\n.ui-btn.-free-size {\n  height: auto;\n  line-height: 1;\n}\n.ui-btn.-free-size:active,\n.ui-btn.-free-size.-is-active {\n  line-height: 1;\n}\n.ui-btn-group {\n  display: inline-block;\n}\n.ui-btn-group .ui-btn {\n  float: left;\n}\n.ui-btn-group .ui-btn:first-child {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.ui-btn-group .ui-btn:last-child {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.ui-btn-group .ui-btn:not(:last-child) {\n  border-right-width: 0;\n}\n/**\n  Input Element\n  .{{ns}}-input\n  .{{ns}}-textarea\n\n  @example\n    <input type=\"...\" class=\"{{ns}}-input\"/>\n    <textarea class=\"{{ns}}-textarea\"></textarea>\n*/\n.ui-input,\n.ui-textarea {\n  font-size: 12px;\n  display: inline-block;\n  vertical-align: top;\n  height: 30px;\n  padding: 0 1em;\n  border: 1px solid;\n  border-color: currentColor;\n  border-radius: 4px;\n  outline: none;\n  /** ===== MODIFIERS ===== */\n}\n.ui-input.error,\n.ui-textarea.error,\n.ui-input-wrapper.error .ui-input,\n.ui-input-wrapper.error .ui-textarea {\n  background-color: #fdf3f2;\n  border-color: #e74c3c;\n}\n.ui-textarea {\n  height: auto;\n  padding-top: 1em;\n  padding-bottom: 1em;\n}\n/** ===== WRAPPER ====== **/\n.ui-input-wrapper {\n  position: relative;\n}\n/** ===== GROUP ====== **/\n.ui-input-group {\n  display: table;\n  width: 100%;\n}\n.ui-input-group .ui-input,\n.ui-input-group .ui-input-group-btn {\n  display: table-cell;\n}\n.ui-input-group .ui-input {\n  width: 100%;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.ui-input-group .ui-input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n}\n.ui-input-group .ui-input-group-btn .ui-btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n/**\n  Select Component\n  .{{ns}}-select\n\n  @example\n    <div class=\"{{ns}}-select\">\n      <svg class=\"{{ns}}-select-svg\">\n        <use xlink:href=\"...\"></use>\n      </svg>\n      <select class=\"{{ns}}-select-select\">...</select>\n    </div>\n*/\n.ui-select {\n  font-size: 12px;\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  height: 30px;\n  border: 1px solid;\n  border-color: currentColor;\n  border-radius: 4px;\n  cursor: pointer;\n  /** ===== MODIFIERS ===== */\n}\n.ui-select-svg {\n  position: absolute;\n  width: .75em;\n  height: .75em;\n  top: 50%;\n  right: .7em;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  fill: currentColor;\n  pointer-events: none;\n}\n.ui-select-select {\n  height: 100%;\n  width: 100%;\n  padding: 0 3em 0 1em;\n  cursor: pointer;\n  border: none;\n  box-shadow: none;\n  background: none;\n  outline: none;\n}\n.ui-select.-separator::before {\n  content: '';\n  position: absolute;\n  right: 2em;\n  width: 1px;\n  height: 100%;\n  background-color: currentColor;\n}\n/**\n  Checkbox Component\n  .{{ns}}-checkbox\n\n  @example\n    <div class=\"{{ns}}-checkbox\">\n      <label>\n        <input class=\"{{ns}}-checkbox-checkbox\" type=\"checkbox\">\n        <span class=\"{{ns}}-checkbox-element\"></span>\n        <span class=\"{{ns}}-checkbox-label\">Label</span>\n      </label>\n    </div>\n*/\n.ui-checkbox {\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  cursor: pointer;\n}\n.ui-checkbox-checkbox {\n  display: none;\n}\n.ui-checkbox-checkbox:checked + .ui-checkbox-element::after {\n  color: inherit;\n  display: block;\n}\n.ui-checkbox-element {\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  top: 2px;\n  width: 16px;\n  height: 16px;\n  border: 1px solid;\n  border-color: currentColor;\n  border-radius: 2px;\n}\n.ui-checkbox-element:after {\n  display: none;\n  content: \"✔\";\n  font-size: .8em;\n  text-align: center;\n}\n/**\n  Radio Component\n  .{{ns}}-radio\n\n  @example\n    <div class=\"{{ns}}-radio\">\n      <label>\n        <input class=\"{{ns}}-radio-radio\" type=\"radio\">\n        <span class=\"{{ns}}-radio-element\"></span>\n        <span class=\"{{ns}}-radio-label\">Label</span>\n      </label>\n    </div>\n*/\n.ui-radio {\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  cursor: pointer;\n}\n.ui-radio-radio {\n  display: none;\n}\n.ui-radio-radio:checked + .ui-radio-element::after {\n  display: block;\n}\n.ui-radio-element {\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  top: 2px;\n  width: 16px;\n  height: 16px;\n  border: 1px solid;\n  border-color: currentColor;\n  border-radius: 50%;\n}\n.ui-radio-element:after {\n  display: none;\n  content: \"\";\n  width: .5em;\n  height: .5em;\n  left: 50%;\n  position: relative;\n  top: 50%;\n  background-color: currentColor;\n  border-radius: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n/**\n  Modules::Elements::Tooltip\n  .{{ns}}-tootlip\n\n  @example\n    <span class=\"{{ui}}-tooltip\">...</span>\n\n    // option show on :hover\n    <div class=\"{{ns}}-has-tooltip\">\n      ...\n      <span class=\"{{ui}}-tooltip\">...</span>\n    </div>\n*/\n.ui-tooltip {\n  font-size: 0.75rem;\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  z-index: 1;\n  padding: .25em 1em;\n  border: 1px solid;\n  color: white;\n  background-color: #666666;\n  border-color: #666666;\n  border-radius: 3px;\n  /** ===== MODIFIERS ===== */\n}\n.ui-tooltip:after {\n  content: '';\n  position: absolute;\n  border-width: 5px;\n  border-style: solid;\n  border-color: transparent;\n}\n.ui-tooltip.-top:after {\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border-top-color: inherit;\n}\n.ui-tooltip.-right:after {\n  right: 100%;\n  top: 50%;\n  margin-top: -5px;\n  border-right-color: inherit;\n}\n.ui-tooltip.-left:after {\n  left: 100%;\n  top: 50%;\n  margin-top: -5px;\n  border-left-color: inherit;\n}\n.ui-tooltip.-bottom:after {\n  bottom: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border-bottom-color: inherit;\n}\n.ui-has-tooltip {\n  position: relative;\n}\n.ui-has-tooltip .ui-tooltip {\n  opacity: 0;\n  visibility: hidden;\n  position: absolute;\n  transition: all 140ms ease-out;\n}\n.ui-has-tooltip .ui-tooltip.-top {\n  left: 50%;\n  bottom: 100%;\n  -webkit-transform: translate(-50%, -10px);\n          transform: translate(-50%, -10px);\n}\n.ui-has-tooltip .ui-tooltip.-right {\n  top: 50%;\n  left: 100%;\n  -webkit-transform: translate(10px, -50%);\n          transform: translate(10px, -50%);\n}\n.ui-has-tooltip .ui-tooltip.-bottom {\n  left: 50%;\n  top: 100%;\n  -webkit-transform: translate(-50%, 10px);\n          transform: translate(-50%, 10px);\n}\n.ui-has-tooltip .ui-tooltip.-left {\n  top: 50%;\n  right: 100%;\n  -webkit-transform: translate(-10px, -50%);\n          transform: translate(-10px, -50%);\n}\n.ui-has-tooltip:hover .ui-tooltip {\n  opacity: 1;\n  visibility: visible;\n}\n.ui-popover {\n  position: relative;\n  border: 1px solid currentColor;\n  background-color: #ffffff;\n  border-radius: 6px;\n}\n.ui-popover::before,\n.ui-popover::after {\n  content: '';\n  position: absolute;\n  border-width: 10px;\n  border-style: solid;\n  border-color: transparent;\n}\n.ui-popover.-top::before,\n.ui-popover.-top::after {\n  top: 100%;\n  left: 50%;\n  margin-left: -10px;\n}\n.ui-popover.-top::before,\n.ui-popover.-top-left::before {\n  border-top-color: inherit;\n}\n.ui-popover.-top::after,\n.ui-popover.-top-left::after {\n  margin-top: -1px;\n  border-top-color: #ffffff;\n}\n.ui-popover.-top-left::before,\n.ui-popover.-top-left::after {\n  top: 100%;\n  right: 3rem;\n}\n.popover-content {\n  padding: 2rem;\n}\n.ui-has-popover {\n  position: relative;\n}\n.ui-has-popover .ui-popover {\n  position: absolute;\n}\n.ui-has-popover .ui-popover.-top {\n  left: 50%;\n  bottom: 100%;\n  -webkit-transform: translate(-50%, -10px);\n          transform: translate(-50%, -10px);\n}\n.ui-has-popover .ui-popover.-top-left {\n  bottom: 100%;\n  right: 0;\n  -webkit-transform: translate(0, -10px);\n          transform: translate(0, -10px);\n}\n/**\n  Kabinett – Module Utilities Layout\n*/\n.-hide {\n  display: none !important;\n}\n.-block {\n  display: block;\n  width: 100%;\n}\n.-inline {\n  display: inline;\n}\n.-inline-block {\n  display: inline-block;\n}\n.-float-left {\n  float: left;\n}\n.-float-right {\n  float: right;\n}\n.-clearfix:after {\n  content: '';\n  clear: both;\n  display: table;\n}\n.-full-width {\n  width: 100%;\n}\n.-fit {\n  max-width: 100%;\n}\n.-full-height {\n  height: 100%;\n}\n.-rel {\n  position: relative;\n}\n.-abs {\n  position: absolute;\n}\n.-fixed {\n  position: fixed;\n}\n.-m0 {\n  margin: 0;\n}\n.-p0 {\n  padding: 0;\n}\n.-mt0 {\n  margin-top: 0;\n}\n.-mr0 {\n  margin-right: 0;\n}\n.-ml0 {\n  margin-left: 0;\n}\n.-mb0 {\n  margin-bottom: 0;\n}\n.-mt1 {\n  margin-top: 1em;\n}\n.-mr1 {\n  margin-right: 1em;\n}\n.-ml1 {\n  margin-left: 1em;\n}\n.-mb1 {\n  margin-bottom: 1em;\n}\n.-mt2 {\n  margin-top: 2em;\n}\n.-mr2 {\n  margin-right: 2em;\n}\n.-ml2 {\n  margin-left: 2em;\n}\n.-mb2 {\n  margin-bottom: 2em;\n}\n.-mt3 {\n  margin-top: 3em;\n}\n.-mr3 {\n  margin-right: 3em;\n}\n.-ml3 {\n  margin-left: 3em;\n}\n.-mb3 {\n  margin-bottom: 3em;\n}\n.-mt4 {\n  margin-top: 4em;\n}\n.-mr4 {\n  margin-right: 4em;\n}\n.-ml4 {\n  margin-left: 4em;\n}\n.-mb4 {\n  margin-bottom: 4em;\n}\n.-mt5 {\n  margin-top: 5em;\n}\n.-mr5 {\n  margin-right: 5em;\n}\n.-ml5 {\n  margin-left: 5em;\n}\n.-mb5 {\n  margin-bottom: 5em;\n}\n.-p1 {\n  padding: 1em;\n}\n.-pt1 {\n  padding-top: 1em;\n}\n.-pr1 {\n  padding-right: 1em;\n}\n.-pb1 {\n  padding-bottom: 1em;\n}\n.-pl1 {\n  padding-left: 1em;\n}\n.-p2 {\n  padding: 2em;\n}\n.-pt2 {\n  padding-top: 2em;\n}\n.-pr2 {\n  padding-right: 2em;\n}\n.-pb2 {\n  padding-bottom: 2em;\n}\n.-pl2 {\n  padding-left: 2em;\n}\n.-p3 {\n  padding: 3em;\n}\n.-pt3 {\n  padding-top: 3em;\n}\n.-pr3 {\n  padding-right: 3em;\n}\n.-pb3 {\n  padding-bottom: 3em;\n}\n.-pl3 {\n  padding-left: 3em;\n}\n.-p4 {\n  padding: 4em;\n}\n.-pt4 {\n  padding-top: 4em;\n}\n.-pr4 {\n  padding-right: 4em;\n}\n.-pb4 {\n  padding-bottom: 4em;\n}\n.-pl4 {\n  padding-left: 4em;\n}\n.-p5 {\n  padding: 5em;\n}\n.-pt5 {\n  padding-top: 5em;\n}\n.-pr5 {\n  padding-right: 5em;\n}\n.-pb5 {\n  padding-bottom: 5em;\n}\n.-pl5 {\n  padding-left: 5em;\n}\n.-list-horizontal {\n  list-style: none;\n}\n.-list-horizontal > li {\n  display: inline-block;\n}\n/**\n  Kabinett – Module Utilities Presentation\n*/\n.-upper {\n  text-transform: uppercase;\n}\n.-lower {\n  text-transform: lowercase;\n}\n.-text-left {\n  text-align: left;\n}\n.-text-center {\n  text-align: center;\n}\n.-text-right {\n  text-align: right;\n}\n.-muted {\n  opacity: 0.5;\n}\n.-rounded {\n  border-radius: 2em;\n}\n.-br1 {\n  border-radius: 1em;\n}\n.-br2 {\n  border-radius: 2em;\n}\n.-br3 {\n  border-radius: 3em;\n}\n.-br4 {\n  border-radius: 4em;\n}\n.-br5 {\n  border-radius: 5em;\n}\n.-br1px {\n  border-radius: 1px;\n}\n.-br2px {\n  border-radius: 2px;\n}\n.-br3px {\n  border-radius: 3px;\n}\n.-br4px {\n  border-radius: 4px;\n}\n.-br5px {\n  border-radius: 5px;\n}\n.-img-cover {\n  background-size: cover;\n  background-position: 50% 50%;\n}\n.-img-contain {\n  background-size: contain;\n}\n.-inner-shadow-t {\n  box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.1);\n}\n.-inner-shadow-b {\n  box-shadow: 0 -2px 0 0 rgba(0, 0, 0, 0.1) inset;\n}\n.-inner-shadow-b.active,\n.-inner-shadow-b:active {\n  box-shadow: inset 0 2px 0 0 rgba(0, 0, 0, 0.1);\n}\n.-list-clean {\n  list-style: none;\n}\n/**\n  Kabinett – Module Utilities Elements\n*/\n.-sm {\n  font-size: 10px;\n  height: 23px;\n  border-radius: 4px;\n}\n.-md {\n  font-size: 14px;\n  height: 33px;\n  border-radius: 5px;\n}\n.-lg {\n  font-size: 15px;\n  height: 52px;\n  border-radius: 6px;\n}\n.-xl {\n  font-size: 24px;\n  height: 60px;\n  border-radius: 7px;\n}\n/**\n  Kabinett – Module Utilities Typography\n*/\n.-font-thin {\n  font-weight: 100;\n}\n.-font-extra-light {\n  font-weight: 200;\n}\n.-font-light {\n  font-weight: 300;\n}\n.-font-normal {\n  font-weight: 400;\n}\n.-font-semi-bold {\n  font-weight: 600;\n}\n.-font-bold {\n  font-weight: 700;\n}\n.-font-ultra-bold {\n  font-weight: 900;\n}\n/**\n  Kabinett – Module Utilities Colors Base\n  @require core/_mixins\n*/\n/**\n  Kabinett – Module Core Mixins\n*/\n.-color-white {\n  color: #ffffff;\n  fill: #ffffff;\n}\n.-color-bg-white {\n  background-color: #ffffff;\n}\n.-color-border-white {\n  border-color: #ffffff;\n}\n.-color-black {\n  color: #000000;\n  fill: #000000;\n}\n.-color-bg-black {\n  background-color: #000000;\n}\n.-color-border-black {\n  border-color: #000000;\n}\n.-color-primary {\n  color: #ef631f;\n  fill: #ef631f;\n}\n.-color-bg-primary {\n  background-color: #ef631f;\n}\n.-color-border-primary {\n  border-color: #ef631f;\n}\n.-color-secondary {\n  color: #8899a6;\n  fill: #8899a6;\n}\n.-color-bg-secondary {\n  background-color: #8899a6;\n}\n.-color-border-secondary {\n  border-color: #8899a6;\n}\n.-color-danger {\n  color: #e74c3c;\n  fill: #e74c3c;\n}\n.-color-bg-danger {\n  background-color: #e74c3c;\n}\n.-color-border-danger {\n  border-color: #e74c3c;\n}\n.-color-info {\n  color: #3498db;\n  fill: #3498db;\n}\n.-color-bg-info {\n  background-color: #3498db;\n}\n.-color-border-info {\n  border-color: #3498db;\n}\n.-color-success {\n  color: #2ecc71;\n  fill: #2ecc71;\n}\n.-color-bg-success {\n  background-color: #2ecc71;\n}\n.-color-border-success {\n  border-color: #2ecc71;\n}\n.-color-warning {\n  color: #f1c40f;\n  fill: #f1c40f;\n}\n.-color-bg-warning {\n  background-color: #f1c40f;\n}\n.-color-border-warning {\n  border-color: #f1c40f;\n}\n.-color-grey {\n  color: #7d7d8e;\n  fill: #7d7d8e;\n}\n.-color-bg-grey {\n  background-color: #7d7d8e;\n}\n.-color-border-grey {\n  border-color: #7d7d8e;\n}\n.-color-grey-dark {\n  color: #45454e;\n  fill: #45454e;\n}\n.-color-bg-grey-dark {\n  background-color: #45454e;\n}\n.-color-border-grey-dark {\n  border-color: #45454e;\n}\n.-color-grey-light {\n  color: #b8b8c1;\n  fill: #b8b8c1;\n}\n.-color-bg-grey-light {\n  background-color: #b8b8c1;\n}\n.-color-border-grey-light {\n  border-color: #b8b8c1;\n}\n.-color-grey-lighter {\n  color: #f2f2f4;\n  fill: #f2f2f4;\n}\n.-color-bg-grey-lighter {\n  background-color: #f2f2f4;\n}\n.-color-border-grey-lighter {\n  border-color: #f2f2f4;\n}\n.-color-twitter {\n  color: #55acee;\n  fill: #55acee;\n}\n.-color-bg-twitter {\n  background-color: #55acee;\n}\n.-color-border-twitter {\n  border-color: #55acee;\n}\n.-color-facebook {\n  color: #3e5c9a;\n  fill: #3e5c9a;\n}\n.-color-bg-facebook {\n  background-color: #3e5c9a;\n}\n.-color-border-facebook {\n  border-color: #3e5c9a;\n}\n.-color-google-plus {\n  color: #dd4b39;\n  fill: #dd4b39;\n}\n.-color-bg-google-plus {\n  background-color: #dd4b39;\n}\n.-color-border-google-plus {\n  border-color: #dd4b39;\n}\n/* =========================================================================== *\n  overrides :: button\n * =========================================================================== */\n.ui-btn {\n  border-color: transparent;\n  transition: background-color 240ms ease;\n}\n.ui-btn:active,\n.ui-btn.-is-active {\n  transition-duration: 0;\n}\n.ui-btn.-primary {\n  background-color: #ef631f;\n  color: #ffffff;\n  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);\n}\n.ui-btn.-primary:hover,\n.ui-btn.-primary.-is-hover {\n  background-color: #ff5d0f;\n}\n.ui-btn.-primary:active,\n.ui-btn.-primary.-is-active {\n  background-color: #d76b37;\n}\n.ui-btn.-outline {\n  border-color: currentColor;\n}\n.ui-btn.-overlay {\n  background-color: rgba(0, 0, 0, 0.5);\n  color: #ffffff;\n  border: 2px solid #7d7d8e;\n}\n.ui-btn.-overlay:hover,\n.ui-btn.-overlay.-is-hover {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.ui-btn.-overlay:active,\n.ui-btn.-overlay.-is-active {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n/******************************************************************\n  overrides :: input + textarea\n *****************************************************************/\n.ui-input,\n.ui-textarea {\n  background-color: #ffffff;\n  box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.1);\n}\n.ui-input:focus,\n.ui-textarea:focus,\n.ui-input.-is-focus,\n.ui-textarea.-is-focus {\n  border-color: #ef631f;\n}\n/* =========================================================================== *\n * cv globals / general styles\n * =========================================================================== */\na {\n  color: #ef631f;\n}\n.cv-main-logo {\n  padding: 1.15rem 0 0 .6rem;\n  white-space: nowrap;\n}\n.cv-main-logo-type {\n  font-size: 20px;\n  padding: .4rem 0 0 .3rem;\n}\n.cv-main-logo .logo-type-cv {\n  color: #45454e;\n}\n.cv-main-logo .logo-type-by {\n  color: #b8b8c1;\n}\n/* =========================================================================== *\n * cv components\n * =========================================================================== */\n/* =========================================================================== *\n *  home page\n * =========================================================================== */\n.page-home .cv-main-header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1;\n}\n/* =========================================================================== *\n *  inner pages\n * =========================================================================== */\n.page-inner .header-login-actions {\n  padding-top: 1.45rem;\n}\n.page-inner .account-info-avatar {\n  margin: .45rem .5rem 0;\n}\n.page-inner .account-info-name {\n  font-size: 20px;\n  text-decoration: underline;\n}\n.page-inner .actions-wrapper {\n  padding: .35rem .22rem;\n  margin: .6rem 0 0 .25rem;\n  border: 1px solid #b8b8c1;\n  border-radius: 2px;\n}\n.page-inner .actions-dropdown-svg {\n  width: 9px;\n  height: 6px;\n}\n/* =========================================================================== *\n *  globally shared\n * =========================================================================== */\n.cv-main-header {\n  height: 74px;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.15);\n}\n.header-login-actions {\n  padding: 2rem 2rem 0 .5rem;\n}\n.header-actions {\n  display: inline-block;\n  padding-top: 1.6rem;\n  padding-right: 1rem;\n}\n.header-actions-svg {\n  width: 14px;\n  height: 14px;\n  margin: .5rem .5rem 0;\n  fill: #b8b8c1;\n}\n.header-search {\n  padding-right: 1.5rem;\n}\n.page-inner .cv-main-header .cv-main-logo-type {\n  padding-left: 1.5rem;\n}\n/* =========================================================================== *\n *  home page\n * =========================================================================== */\n.page-home .cv-main-sidebar {\n  top: 124px;\n  left: 0;\n  width: 214px;\n}\n.page-home .cv-main-sidebar .cv-main-logo {\n  display: none;\n}\n.page-home .sidebar-link {\n  color: #7d7d8e;\n}\n.page-home .sidebar-link:before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 7px;\n  height: 100%;\n  border-radius: 0 2px 2px;\n}\n/* =========================================================================== *\n *  inner pages\n * =========================================================================== */\n.page-inner .cv-main-sidebar {\n  width: 60px;\n  top: 0;\n  bottom: 0;\n  overflow: hidden;\n  background-color: #2d2d33;\n  z-index: 1;\n  transition: width 240ms ease;\n}\n.page-inner .cv-main-sidebar .cv-main-logo {\n  margin-bottom: 55px;\n  background-color: #000;\n}\n.page-inner .cv-main-sidebar .cv-main-logo .logo-type-cv {\n  color: #ffffff;\n}\n.page-inner .cv-main-sidebar .cv-main-logo .logo-type-by {\n  color: #7d7d8e;\n}\n.page-inner .cv-main-sidebar:hover {\n  width: 214px;\n}\n.page-inner .cv-main-sidebar:hover .cv-main-logo-type,\n.page-inner .cv-main-sidebar:hover .sidebar-heading,\n.page-inner .cv-main-sidebar:hover .sidebar-link-label {\n  opacity: 1;\n}\n.page-inner .cv-main-sidebar:hover .sidebar-link {\n  color: #b8b8c1;\n}\n.page-inner .cv-main-sidebar:hover .sidebar-link-svg {\n  fill: #b8b8c1;\n}\n.page-inner .sidebar-nav {\n  width: 214px;\n}\n.page-inner .cv-main-sidebar .cv-main-logo-type,\n.page-inner .sidebar-heading,\n.page-inner .sidebar-link-label {\n  opacity: 0;\n  transition: opacity 240ms ease;\n}\n/* =========================================================================== *\n *  globally shared\n * =========================================================================== */\n.cv-main-sidebar {\n  position: fixed;\n}\n.cv-main-sidebar .cv-main-logo {\n  height: 74px;\n}\n.sidebar-link,\n.sidebar-heading {\n  padding-left: 1.5em;\n}\n.sidebar-link {\n  font-size: 14px;\n  display: block;\n  height: 28px;\n  margin-bottom: .5em;\n  padding-top: .4em;\n  white-space: nowrap;\n  transition: color 240ms ease, -webkit-transform 100ms ease-out;\n  transition: color 240ms ease, transform 100ms ease-out;\n}\n.sidebar-link:hover,\n.sidebar-link.-is-active {\n  color: #ef631f;\n}\n.sidebar-link:hover .sidebar-link-svg,\n.sidebar-link.-is-active .sidebar-link-svg {\n  fill: #ef631f;\n}\n.sidebar-link:hover {\n  -webkit-transform: translateX(4px);\n          transform: translateX(4px);\n}\n.sidebar-link.-is-active {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.sidebar-link.-is-active:before {\n  background-color: currentColor;\n}\n.sidebar-link-svg {\n  width: 16px;\n  height: 16px;\n  fill: #7d7d8e;\n  transition: fill 240ms ease;\n}\n.sidebar-link-label {\n  padding-left: .5em;\n  line-height: 1.25em;\n}\n.sidebar-heading {\n  font-size: 1rem;\n  margin-top: 2em;\n  font-weight: 200;\n  color: #b8b8c1;\n}\n/* =========================================================================== *\n *  home page\n * =========================================================================== */\n/* =========================================================================== *\n *  globally shared\n * =========================================================================== */\n.cv-main-footer {\n  height: 120px;\n  background-color: #333;\n}\n.cv-main-footer a {\n  color: #fff;\n}\n.cv-main-footer-inner {\n  padding: 0 2rem 0 214px;\n}\n.footer-logo {\n  margin-top: 30px;\n}\n.footer-nav {\n  padding: 50px 0 0 1em;\n}\n.footer-nav a:after {\n  content: '•';\n  margin: 0 .5em;\n  color: #666666;\n}\n.footer-social {\n  padding-top: 50px;\n}\n.footer-subscribe-container {\n  padding-top: 45px;\n}\n.request-contribute-popover {\n  width: 560px;\n}\n@media (max-width: 1200px) {\n  .cv-main-footer-inner {\n    padding-left: 2rem;\n  }\n}\n.cv-tags {\n  font-size: 12px;\n  margin-bottom: 1em;\n}\n.cv-tags-list-item:not(:last-child):after {\n  color: #7d7d8e;\n  content: ',';\n  margin-right: .25rem;\n}\n.cv-tags-tag {\n  color: #7d7d8e;\n  text-decoration: underline;\n}\n.cv-voice-cover .author {\n  margin: 1em 0 0 0;\n}\n.cv-voice-cover .author img {\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: .4em;\n}\n.cv-voice-cover .author a {\n  color: #b8b8c1;\n}\n.cv-voice-cover .author a span {\n  text-decoration: underline;\n}\n.voice-cover {\n  position: relative;\n}\n.voice-cover:hover .voice-cover-hover-overlay {\n  opacity: 1;\n}\n.voice-cover:hover .voice-cover-main-image {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.voice-cover-title {\n  font-size: 28px;\n  line-height: 36px;\n  margin: .5rem 0;\n}\n.voice-cover-hover-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.65);\n  border-radius: 6px;\n  transition: opacity 240ms ease;\n  opacity: 0;\n}\n.voice-cover-hover-overlay-button {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.voice-cover-main-image-wrapper {\n  position: relative;\n  height: 295px;\n  overflow: hidden;\n  border-radius: 6px;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n}\n.voice-cover-main-image {\n  height: 100%;\n  transition: -webkit-transform 480ms ease;\n  transition: transform 480ms ease;\n}\n.voice-cover-badge-new {\n  width: 40px;\n  height: 40px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  -webkit-transform: translate(30%, -30%) scale(0);\n          transform: translate(30%, -30%) scale(0);\n  fill: #ef631f;\n  transition-property: -webkit-transform;\n  transition-property: transform;\n  transition-duration: 400ms;\n  transition-delay: 1600ms;\n  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n}\n.voice-cover-badge-new text {\n  font-size: 9px;\n  text-anchor: middle;\n  alignment-baseline: central;\n  fill: white;\n}\n.voice-cover-badge-new.active {\n  -webkit-transform: translate(30%, -30%) scale(1);\n          transform: translate(30%, -30%) scale(1);\n}\n.cv-voice-cover .meta {\n  font-size: 11px;\n  border-top: 1px solid rgba(0, 0, 0, 0.25);\n  margin-top: 1rem;\n  padding-top: .5rem;\n  opacity: .5;\n}\n.cv-voice-cover.gallery .voice-cover-main-image-wrapper {\n  height: 197px;\n  margin-bottom: 1px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.cv-voice-cover.gallery .voice-cover-thumb-image {\n  height: 97px;\n  margin-right: 1px;\n}\n.cv-voice-cover.gallery .voice-cover-image-list-item:first-child .voice-cover-thumb-image {\n  border-bottom-left-radius: 6px;\n}\n.cv-voice-cover.gallery .voice-cover-image-list-item:last-child .voice-cover-thumb-image {\n  border-bottom-right-radius: 6px;\n}\n.widget-card {\n  min-height: 526px;\n  margin-bottom: 1px;\n}\n.card_background-image-wrapper {\n  overflow: hidden;\n  height: 200px;\n  border-radius: 6px 6px 0 0;\n}\n.card_info-wrapper {\n  position: relative;\n  min-height: 325px;\n  padding: 0 20px 60px;\n  border-width: 0 1px 1px;\n  border-style: none solid solid;\n  border-color: #ccc;\n  text-align: center;\n  border-radius: 0 0 6px 6px;\n  background-image: linear-gradient(to bottom, #ffffff, #f5f5f5);\n}\n.card_avatar {\n  font-size: 36px;\n  position: relative;\n  margin-top: -33px;\n  border: 2px solid #fff;\n}\n.card_username,\n.card_fullname {\n  margin-top: .5rem;\n}\n.card_username-link {\n  color: #b8b8c1;\n  text-decoration: underline;\n}\n.card_fullname {\n  font-size: 22px;\n  line-height: 30px;\n  margin-bottom: .3em;\n  white-space: normal;\n  color: #333;\n}\n.card_description {\n  margin-bottom: 1.5rem;\n  white-space: normal;\n}\n.card_meta-location {\n  margin-right: 1rem;\n}\n.card_meta-joined-at {\n  margin-left: 1rem;\n}\n.card_meta-svg {\n  width: 16px;\n  height: 16px;\n  margin-right: .5rem;\n}\n.card_meta-joined-at-text,\n.card_meta-location-text {\n  font-size: 12px;\n  color: #b8b8c1;\n}\n.card_stats {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  background-color: #fff;\n  border-bottom-right-radius: inherit;\n  border-bottom-left-radius: inherit;\n}\n.card_stats .-col-4 {\n  padding: .5em 0 1em;\n  border-right: 1px solid #f2f2f4;\n}\n.stats-number {\n  font-size: 18px;\n}\n.stats-label {\n  font-size: 12px;\n  line-height: 1;\n  color: #b8b8c1;\n}\n.widget-responsive-slider {\n  position: relative;\n  white-space: nowrap;\n}\n.slider-list-wrapper {\n  overflow: hidden;\n}\n.slider-list {\n  font-size: 0;\n  -webkit-transform: translateX(0%);\n          transform: translateX(0%);\n  transition: -webkit-transform 240ms ease;\n  transition: transform 240ms ease;\n}\n.slider-item {\n  font-size: 1rem;\n  display: inline-block;\n  width: 100%;\n}\n.slider-arrow {\n  position: absolute;\n  top: 50%;\n  margin-top: -8px;\n  width: 16px;\n  height: 25px;\n  display: none;\n  color: #ef631f;\n  fill: #ef631f;\n  cursor: pointer;\n}\n.slider-next {\n  right: -1rem;\n}\n.slider-prev {\n  left: -1rem;\n}\n.slider-arrow.active {\n  display: block;\n}\n.slider-arrow-svg {\n  width: 100%;\n  height: 100%;\n}\n.slider-arrow.disabled {\n  color: #b8b8c1;\n  fill: #b8b8c1;\n  cursor: not-allowed;\n}\n.slider-dots {\n  margin-top: 2rem;\n  text-align: center;\n}\n.slider-dots > button {\n  border: 0;\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  margin: 0 5px;\n  background-color: #b8b8c1;\n}\n.slider-dots > button.active {\n  background-color: #ef631f;\n}\n.post-card {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  background-color: #fff;\n  background-image: linear-gradient(to bottom, #ffffff, #f7f7f7);\n  border-radius: 6px;\n  border-width: 0 1px 2px 1px;\n  border-style: none solid solid;\n  border-color: transparent #dbdbdb #dbdbdb;\n}\n.post-card.video .post-card-image-wrapper {\n  padding: 18px 0;\n  background-color: #000;\n}\n.post-card.video .post-card-image-wrapper iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.post-card-image-wrapper,\n.post-card-audio-player-wrapper {\n  position: relative;\n  overflow: hidden;\n  border-bottom: 4px solid #e5e5e5;\n  border-radius: 5px 5px 0 0;\n}\n.post-card-image-wrapper {\n  display: none;\n  min-height: 60px;\n  margin: 0 -1px;\n  text-align: center;\n  background-color: #e5e5e5;\n}\n.post-card-image-wrapper .post-card-play-button {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin: -18px 0 0 -28px;\n  padding: .6rem 1.55rem;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n.post-card-image-wrapper .post-card-svg-play {\n  width: 17px;\n  height: 20px;\n  fill: #ffffff;\n}\n.post-card-image {\n  max-width: 100%;\n}\n.post-card-play-button {\n  border-radius: 6px;\n}\n.post-card-audio-player-wrapper {\n  height: 60px;\n}\n.post-card-audio-player-wrapper .post-card-play-button {\n  display: inline-block;\n  padding: .5rem .6rem;\n  border: 1px solid #b8b8c1;\n  margin: 1rem;\n}\n.post-card-audio-player-wrapper .post-card-svg-play,\n.post-card-audio-player-wrapper .post-card-svg-pause {\n  width: 14px;\n  height: 16px;\n  fill: #45454e;\n}\n.post-card-audio-player-wrapper .post-card-svg-play {\n  display: block;\n}\n.post-card-audio-player-wrapper .post-card-audio-player-text .loaded,\n.post-card-audio-player-wrapper .post-card-svg-pause {\n  display: none;\n}\n.post-card-audio-player-wrapper.-is-downloading {\n  pointer-events: none;\n}\n.post-card-audio-player-wrapper.-is-downloading .post-card-audio-player-progress-wrapper {\n  background-color: #f2f2f4;\n  background-image: linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, transparent 75%, transparent);\n  background-size: 50px 50px;\n  -webkit-animation: loading-stripes 2s linear infinite;\n          animation: loading-stripes 2s linear infinite;\n}\n.post-card-audio-player-wrapper.-is-playing .post-card-svg-play {\n  display: none;\n}\n.post-card-audio-player-wrapper.-is-playing .post-card-svg-pause {\n  display: block;\n}\n.post-card-audio-player-wrapper.-is-loaded .post-card-audio-player-text .init {\n  display: none;\n}\n.post-card-audio-player-wrapper.-is-loaded .post-card-audio-player-text .loaded {\n  display: block;\n}\n.post-card-audio-player-wrapper.-is-loaded .post-card-audio-player-progress-wrapper {\n  cursor: pointer;\n}\n.post-card-audio-player-text {\n  display: inline-block;\n  vertical-align: top;\n  padding-top: 18px;\n  pointer-events: none;\n}\n.post-card-audio-player-progress-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.post-card-audio-player-progress {\n  width: 100%;\n  height: 100%;\n  background: #EAFFC9;\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n  transition: -webkit-transform 200ms ease;\n  transition: transform 200ms ease;\n}\n.post-card-meta {\n  font-size: 12px;\n  margin-bottom: .75em;\n  color: #b8b8c1;\n}\n.post-card-meta a {\n  color: #7d7d8e;\n  text-decoration: underline;\n}\n.post-card-meta-icon {\n  width: 16px;\n  height: 16px;\n  margin-right: 5px;\n  vertical-align: text-bottom;\n  fill: #b8b8c1;\n}\n/* ======= INFO ======= */\n.post-card-info {\n  padding: 20px 25px 45px;\n}\n.post-card-title {\n  font-size: 26px;\n  line-height: 34px;\n  margin-top: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.post-card-description {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #7d7d8e;\n}\n.post-card-quote {\n  font-size: 26px;\n  line-height: 34px;\n  margin-top: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-style: italic;\n  color: #333333;\n}\n.post-card-quote::before {\n  content: '“';\n}\n.post-card-quote::after {\n  content: '”';\n}\n.post-card-quote-author {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #7d7d8e;\n  font-size: 15px;\n  margin-top: 1rem;\n}\n.post-card-quote-author::before {\n  content: '– ';\n}\n.post-card-activity {\n  font-size: 12px;\n  line-height: 1;\n  margin: 1.5rem 0;\n  color: #b8b8c1;\n  fill: #b8b8c1;\n}\n.post-card-activity-svg {\n  margin-right: 5px;\n}\n.post-card-activity-repost .post-card-activity-svg {\n  width: 14px;\n  height: 12px;\n}\n.post-card-activity-saved .post-card-activity-svg {\n  width: 7px;\n  height: 12px;\n}\n/* ======= ACTIONS ======= */\n.post-card-actions {\n  display: none;\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 45px;\n  background-color: #ffffff;\n  text-align: center;\n  border-radius: 0 0 5px 5px;\n}\n.post-card-actions svg {\n  width: 20px;\n  height: 20px;\n  fill: #b8b8c1;\n}\n.post-card-actions-item {\n  height: 100%;\n  padding-top: 1rem;\n  border-right: 1px solid #f2f2f4;\n  cursor: pointer;\n  transition: background-color 140ms ease;\n}\n.post-card-actions-item:last-child {\n  border-right: 0;\n}\n.post-card-actions-item:hover {\n  background-color: #f2f2f4;\n}\n@-webkit-keyframes loading-stripes {\n  100% {\n    background-position: 50px 50px;\n  }\n}\n@keyframes loading-stripes {\n  100% {\n    background-position: 50px 50px;\n  }\n}\n/* =========================================================================== *\n * cv views\n * =========================================================================== */\n.page-home .yield {\n  padding-top: 74px;\n}\n.homepage-intro,\n.homepage-featured-voices,\n.homepage-organization-cards,\n.homepage-category-list {\n  padding-left: 214px;\n  padding-right: 2rem;\n}\n.homepage-heading-wrapper {\n  border-top: 1px solid #b8b8c1;\n}\n.homepage-heading-wrapper .homepage-heading {\n  font-size: 28px;\n  display: inline-block;\n  margin: -1px 0 0;\n  padding: .3em .1em 1.5em;\n  border-top: 1px solid #ef631f;\n}\n/* =========================================================================== *\n *  intro\n * =========================================================================== */\n.homepage-intro {\n  min-height: 683px;\n  padding-top: 65px;\n  background-color: #fff;\n  background-image: url(\"/img/views/home/illustration-30-b.jpg\");\n  background-position: 125% 50%;\n  background-repeat: no-repeat;\n  background-size: 60%;\n}\n.homepage-intro .intro-description {\n  font-size: 17px;\n  margin-bottom: 60px;\n  width: 45vw;\n}\n.homepage-intro .intro-description-text {\n  font-size: 1em;\n}\n.homepage-intro .stats {\n  font-size: 1rem;\n  margin-bottom: 60px;\n}\n.homepage-intro .stats-col {\n  padding-right: 1.5em;\n}\n.homepage-intro .stats-number {\n  font-size: 1.538em;\n}\n.homepage-intro .stats-label {\n  font-size: 1em;\n}\n.homepage-intro-banner {\n  font-size: 1rem;\n}\n.homepage-intro-banner .intro-heading {\n  font-size: 2.308em;\n}\n.homepage-intro-banner .intro-sub-heading {\n  font-size: 6.154em;\n  line-height: 1em;\n}\n@media (min-width: 1300px) {\n  .homepage-intro .homepage-intro-banner,\n  .homepage-intro .intro-description-text,\n  .homepage-intro .stats {\n    font-size: 1.25em;\n  }\n}\n@media (min-width: 1500px) {\n  .homepage-intro .homepage-intro-banner,\n  .homepage-intro .intro-description-text,\n  .homepage-intro .stats {\n    font-size: 1.4em;\n  }\n}\n/* =========================================================================== *\n *  featured voices\n * =========================================================================== */\n.homepage-featured-voices {\n  margin-bottom: 100px;\n}\n.homepage-featured-voices .heading-right {\n  padding-top: 1rem;\n}\n/* =========================================================================== *\n *  category list\n * =========================================================================== */\n.homepage-category-list {\n  margin-bottom: 110px;\n  padding-top: 110px;\n  background: transparent url('/img/views/home/categories-background.jpg') 50% 0 repeat-x;\n}\n.homepage-category-list-heading {\n  font-size: 48px;\n  line-height: 1.2em;\n  margin-bottom: 50px;\n}\n.homepage-category-list-item {\n  float: left;\n  width: 20%;\n  position: relative;\n  margin-bottom: 1px;\n  overflow: hidden;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n}\n.homepage-category-list-item .categories_link {\n  font-size: 18px;\n  position: relative;\n  display: table;\n  width: 100%;\n  height: 15vw;\n  text-align: center;\n  background-color: rgba(0, 0, 0, 0.5);\n  color: #fff;\n}\n.homepage-category-list-item .categories_link-inner {\n  display: table-cell;\n  vertical-align: middle;\n}\n.homepage-category-list-item:hover .homepage-category-cover {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.homepage-category-list-item-inner {\n  position: relative;\n  margin-right: 1px;\n  overflow: hidden;\n}\n.homepage-category-cover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  transition: -webkit-transform 480ms ease;\n  transition: transform 480ms ease;\n}\n.homepage-category-list-item:nth-child(1) {\n  border-top-left-radius: 6px;\n}\n.homepage-category-list-item:nth-child(5) {\n  border-top-right-radius: 6px;\n}\n.homepage-category-list-item:nth-child(6) {\n  border-bottom-left-radius: 6px;\n}\n.homepage-category-list-item:nth-child(10) {\n  border-bottom-right-radius: 6px;\n}\n.homepage-category-list-item:nth-child(5) .homepage-category-list-item-inner,\n.homepage-category-list-item:nth-child(10) .homepage-category-list-item-inner {\n  margin-right: 0;\n}\n.homepage-category-list-cta {\n  margin-top: 70px;\n}\n.homepage-category-list-cta .ui-btn {\n  padding: .6em 3em;\n}\n.homepage-category-list-cta .ui-btn div:last-child {\n  font-size: 16px;\n  line-height: 1.5em;\n  opacity: .5;\n}\n/* =========================================================================== *\n *  organization cards\n * =========================================================================== */\n.homepage-organization-cards .widget-card {\n  padding: 0 1rem;\n}\n.page-inner .yield {\n  padding-left: 60px;\n}\n.page-inner {\n  background-color: #f2f2f4;\n}\n.page-inner .cv-main-content {\n  padding: 0 80px 0 40px;\n}\n.voice-background-cover {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n}\n.voice-background-cover::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, #f2f2f4);\n}\n.voice-background-cover-image {\n  width: 100%;\n}\n.voice-heading {\n  font-size: 46px;\n  line-height: 1em;\n  width: 50%;\n  padding: 1.3em 0 .45em;\n  color: #ffffff;\n}\n.voice-stats {\n  padding: .5em 0 6em;\n  border-top: 1px solid rgba(255, 255, 255, 0.2);\n  color: rgba(255, 255, 255, 0.5);\n}\n.voice-posts {\n  padding-bottom: 46px;\n}\n.voice-posts .post-card {\n  width: 30%;\n  margin: 0 .5rem 1rem;\n}\n.voice-posts .post-card:hover {\n  box-shadow: 0 0 0 2px #ef631f;\n}\n.voice-posts .post-card:hover .post-card-actions {\n  display: block;\n}\n.voice-posts .voice-card-about {\n  padding: 25px;\n}\n.voice-posts .voice-card-about:hover {\n  box-shadow: none;\n}\n.voice-card-about-description p {\n  margin-bottom: 1em;\n}\n.voice-card-about-description p:last-child {\n  margin-bottom: 0;\n}\n.voice-card-about-header {\n  margin-bottom: 1.75rem;\n}\n.voice-card-about-title {\n  font-size: 20px;\n  margin: 0 0 0 .5em;\n}\n.voice-footer {\n  position: fixed;\n  bottom: 0;\n  left: 60px;\n  right: 0;\n  height: 46px;\n  border-top: 2px solid rgba(0, 0, 0, 0.25);\n  background-color: #ffffff;\n  background-clip: content-box;\n}\n.voice-footer-inner {\n  padding: 0 2rem;\n}\n.voice-footer-right {\n  padding-top: .8rem;\n}\n.voice-footer-title {\n  padding-top: 5px;\n  line-height: 1.5;\n}\n.voice-footer-by {\n  font-size: .8rem;\n  line-height: 1;\n}\n.voice-footer-svg {\n  width: 14px;\n  height: 14px;\n}\n.voice-add-post-button {\n  position: fixed;\n  width: 50px;\n  height: 50px;\n  right: 2rem;\n  bottom: 6em;\n  border-radius: 50%;\n}\n", ""]);

/***/ },
/* 19 */
/*!************************!*\
  !*** ./~/neon/neon.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	if (typeof global === "undefined") {
	  global = window;
	}
	
	global.Interface = function Interface(nameOrNameSpace, name) {
	    var nameSpace, interfaceName, factory;
	    nameSpace = (nameOrNameSpace && name) ? nameOrNameSpace : this;
	    interfaceName = (nameOrNameSpace && name) ? name :
	        (nameOrNameSpace) ? nameOrNameSpace : 'interface' + Math.random().toString();
	    factory = function(definition) {
	        definition.isInterface = true;
	        definition.name = interfaceName;
	        nameSpace[interfaceName] = definition;
	        return nameSpace[interfaceName];
	    };
	    return factory;
	};
	
	global.Module = function Module(nameOrNameSpace, name) {
	    var nameSpace, moduleName, factory, newModule;
	
	    nameSpace = (nameOrNameSpace && name) ? nameOrNameSpace : this;
	    moduleName = (nameOrNameSpace && name) ? name :
	        (nameOrNameSpace) ? nameOrNameSpace : 'module' + Math.random().toString();
	
	    newModule = {
	        moduleName : moduleName,
	         prototype : {},
	         __includedModules : [],
	         include : function(module) {
	             var property;
	             for (property in module) {
	                 if (module.hasOwnProperty(property)
	                         && property !== 'prototype'
	                         && property !== 'isModule'
	                         && property !== '__includedModules'
	                         && property !== 'include'
	                         && property !== 'moduleName') {
	                     newModule[property] = module[property];
	                 }
	             }
	
	             if (module.hasOwnProperty('prototype') && module.prototype) {
	                 for (property in module.prototype) {
	                     if (module.prototype.hasOwnProperty(property)) {
	                         newModule.prototype[property] = module.prototype[property];
	                     }
	                 }
	             }
	             else {
	                module.prototype = {};
	             }
	
	             this.__includedModules.push(module);
	
	             return this;
	         }
	    }
	    
	    factory = function(definition){
	        var property;
	        
	        newModule.isModule = true;
	        
	        for (property in definition) {
	            if (definition.hasOwnProperty(property)
	                && property !== 'prototype'
	                && property !== 'isModule'
	                && property !== '__includedModules'
	                && property !== 'include'
	                && property !== 'moduleName') {
	                newModule[property] = definition[property];
	            }
	        }
	        
	        if (definition.hasOwnProperty('prototype') && definition.prototype) {
	            for (property in definition.prototype) {
	                if (definition.prototype.hasOwnProperty(property)) {
	                    newModule.prototype[property] = definition.prototype[property];
	                }
	            }
	        }
	        
	        nameSpace[moduleName] = newModule;
	        
	        return nameSpace[moduleName];
	    };
	    
	    factory.includes = function () {
	        for(var i = 0; i < arguments.length; i++){
	            newModule.include(arguments[i]);
	        }
	        return factory;
	    };
	    
	    return factory;
	};
	
	global.Class = function Class(classNameOrNameSpace, className) {
	    var nameSpace, newClass, classFactory;
	    nameSpace = (classNameOrNameSpace && className) ? classNameOrNameSpace : global;
	    className = (classNameOrNameSpace && className) ? className :
	        (classNameOrNameSpace) ? classNameOrNameSpace : 'class' + Math.random().toString();
	
	    newClass = function() {
	        if (this.init) {
	            this.init.apply(this, arguments);
	        }
	    };
	
	    newClass.__descendants = [];
	    newClass.__implementedInterfaces = [];
	    newClass.__includedModules = [];
	    newClass.className = className;
	    newClass.include = function(module) {
	        var property;
	        for (property in module) {
	            if (module.hasOwnProperty(property)
	                && property != 'prototype'
	                && property != 'constructor'
	                && property != 'isModule'
	                && property != 'superClass'
	                && property != 'include') {
	                newClass[property] = module[property];
	            }
	        }
	
	        if (module.hasOwnProperty('prototype') && module.prototype) {
	            for (property in module.prototype) {
	                if (module.prototype.hasOwnProperty(property)) {
	                    newClass.prototype[property] = module.prototype[property];
	                }
	            }
	        } else {
	            module.prototype = {};
	        }
	
	        newClass.__includedModules.push(module);
	        return this;
	    };
	
	    classFactory = function(classDefinition) {
	        var i, il, j, jl, property, classPrototype = classDefinition.prototype;
	        if (classPrototype) {
	            for (property in classPrototype) {
	                if (classPrototype.hasOwnProperty(property)) {
	                    newClass.prototype[property] = classPrototype[property];
	                }
	            }
	            delete classDefinition.prototype;
	        }
	        for (property in classDefinition) {
	            if (classDefinition.hasOwnProperty(property)) {
	                newClass[property] = classDefinition[property];
	            }
	        }
	
	        for (i = 0, il = newClass.__implementedInterfaces.length; i < il; i++) {
	            for (j = 0, jl = newClass.__implementedInterfaces[i].constructor.length; j < jl; j++) {
	                if (!newClass[ newClass.__implementedInterfaces[i].constructor[j] ]) {
	                    console.log('must implement static ' + newClass.__implementedInterfaces[i].name);
	                    break;
	                }
	            }
	
	            if (newClass.__implementedInterfaces[i].hasOwnProperty('prototype')
	                && newClass.__implementedInterfaces[i].prototype) {
	                for (j = 0, jl = newClass.__implementedInterfaces[i].prototype.length; j < jl; j++) {
	                    if (!newClass.prototype[newClass.__implementedInterfaces[i].prototype[j]]) {
	                        console.log('must implement prototype ' + newClass.__implementedInterfaces[i].name);
	                        break;
	                    }
	                }
	            }
	        }
	
	        try {
	            if (Li && Li.ObjectSpy && Li.Spy) {
	                newClass.__objectSpy = new Li.ObjectSpy();
	                newClass.__objectSpy.spy(newClass);
	                newClass.__objectSpy.spy(newClass.prototype);
	            }
	        } catch (error) {}
	
	        nameSpace[className] = newClass;
	        return newClass;
	    };
	
	    classFactory.inherits = function(superClass) {
	        var i, inheritedClass;
	        newClass.superClass = superClass;
	        if (superClass.hasOwnProperty('__descendants')) {
	            superClass.__descendants.push(newClass);
	        }
	        inheritedClass = function() {
	        };
	        inheritedClass.prototype = superClass.prototype;
	        newClass.prototype = new inheritedClass();
	        newClass.prototype.constructor = newClass;
	
	        for (i in superClass) {
	            if (superClass.hasOwnProperty(i)
	                && i != 'prototype'
	                && i !== 'className'
	                && i !== 'superClass'
	                && i !== 'include'
	                && i != '__descendants') {
	                newClass[i] = superClass[i];
	            }
	        }
	
	        delete this.inherits;
	        return this;
	    };
	
	    classFactory.ensures = function(interfaces) {
	        for (var i = 0; i < arguments.length; i++) {
	            newClass.__implementedInterfaces.push(arguments[i]);
	        }
	        delete this.ensures;
	        return classFactory;
	    };
	
	    classFactory.includes = function() {
	        for (var i = 0; i < arguments.length; i++) {
	            newClass.include(arguments[i]);
	        }
	        return classFactory;
	    };
	
	    return classFactory;
	
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/*!*************************************************!*\
  !*** ./~/SoundManager2/script/soundmanager2.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/** @license
	 *
	 * SoundManager 2: JavaScript Sound for the Web
	 * ----------------------------------------------
	 * http://schillmania.com/projects/soundmanager2/
	 *
	 * Copyright (c) 2007, Scott Schiller. All rights reserved.
	 * Code provided under the BSD License:
	 * http://schillmania.com/projects/soundmanager2/license.txt
	 *
	 * V2.97a.20140901+DEV
	 */
	
	/*global window, SM2_DEFER, sm2Debugger, console, document, navigator, setTimeout, setInterval, clearInterval, Audio, opera, module, define */
	/*jslint regexp: true, sloppy: true, white: true, nomen: true, plusplus: true, todo: true */
	
	/**
	 * About this file
	 * -------------------------------------------------------------------------------------
	 * This is the fully-commented source version of the SoundManager 2 API,
	 * recommended for use during development and testing.
	 *
	 * See soundmanager2-nodebug-jsmin.js for an optimized build (~11KB with gzip.)
	 * http://schillmania.com/projects/soundmanager2/doc/getstarted/#basic-inclusion
	 * Alternately, serve this file with gzip for 75% compression savings (~30KB over HTTP.)
	 *
	 * You may notice <d> and </d> comments in this source; these are delimiters for
	 * debug blocks which are removed in the -nodebug builds, further optimizing code size.
	 *
	 * Also, as you may note: Whoa, reliable cross-platform/device audio support is hard! ;)
	 */
	
	(function(window, _undefined) {
	
	"use strict";
	
	if (!window || !window.document) {
	
	  // Don't cross the [environment] streams. SM2 expects to be running in a browser, not under node.js etc.
	  // Additionally, if a browser somehow manages to fail this test, as Egon said: "It would be bad."
	
	  throw new Error('SoundManager requires a browser with window and document objects.');
	
	}
	
	var soundManager = null;
	
	/**
	 * The SoundManager constructor.
	 *
	 * @constructor
	 * @param {string} smURL Optional: Path to SWF files
	 * @param {string} smID Optional: The ID to use for the SWF container element
	 * @this {SoundManager}
	 * @return {SoundManager} The new SoundManager instance
	 */
	
	function SoundManager(smURL, smID) {
	
	  /**
	   * soundManager configuration options list
	   * defines top-level configuration properties to be applied to the soundManager instance (eg. soundManager.flashVersion)
	   * to set these properties, use the setup() method - eg., soundManager.setup({url: '/swf/', flashVersion: 9})
	   */
	
	  this.setupOptions = {
	
	    'url': (smURL || null),             // path (directory) where SoundManager 2 SWFs exist, eg., /path/to/swfs/
	    'flashVersion': 8,                  // flash build to use (8 or 9.) Some API features require 9.
	    'debugMode': true,                  // enable debugging output (console.log() with HTML fallback)
	    'debugFlash': false,                // enable debugging output inside SWF, troubleshoot Flash/browser issues
	    'useConsole': true,                 // use console.log() if available (otherwise, writes to #soundmanager-debug element)
	    'consoleOnly': true,                // if console is being used, do not create/write to #soundmanager-debug
	    'waitForWindowLoad': false,         // force SM2 to wait for window.onload() before trying to call soundManager.onload()
	    'bgColor': '#ffffff',               // SWF background color. N/A when wmode = 'transparent'
	    'useHighPerformance': false,        // position:fixed flash movie can help increase js/flash speed, minimize lag
	    'flashPollingInterval': null,       // msec affecting whileplaying/loading callback frequency. If null, default of 50 msec is used.
	    'html5PollingInterval': null,       // msec affecting whileplaying() for HTML5 audio, excluding mobile devices. If null, native HTML5 update events are used.
	    'flashLoadTimeout': 1000,           // msec to wait for flash movie to load before failing (0 = infinity)
	    'wmode': null,                      // flash rendering mode - null, 'transparent', or 'opaque' (last two allow z-index to work)
	    'allowScriptAccess': 'always',      // for scripting the SWF (object/embed property), 'always' or 'sameDomain'
	    'useFlashBlock': false,             // *requires flashblock.css, see demos* - allow recovery from flash blockers. Wait indefinitely and apply timeout CSS to SWF, if applicable.
	    'useHTML5Audio': true,              // use HTML5 Audio() where API is supported (most Safari, Chrome versions), Firefox (no MP3/MP4.) Ideally, transparent vs. Flash API where possible.
	    'html5Test': /^(probably|maybe)$/i, // HTML5 Audio() format support test. Use /^probably$/i; if you want to be more conservative.
	    'preferFlash': false,               // overrides useHTML5audio, will use Flash for MP3/MP4/AAC if present. Potential option if HTML5 playback with these formats is quirky.
	    'noSWFCache': false,                // if true, appends ?ts={date} to break aggressive SWF caching.
	    'idPrefix': 'sound'                 // if an id is not provided to createSound(), this prefix is used for generated IDs - 'sound0', 'sound1' etc.
	
	  };
	
	  this.defaultOptions = {
	
	    /**
	     * the default configuration for sound objects made with createSound() and related methods
	     * eg., volume, auto-load behaviour and so forth
	     */
	
	    'autoLoad': false,        // enable automatic loading (otherwise .load() will be called on demand with .play(), the latter being nicer on bandwidth - if you want to .load yourself, you also can)
	    'autoPlay': false,        // enable playing of file as soon as possible (much faster if "stream" is true)
	    'from': null,             // position to start playback within a sound (msec), default = beginning
	    'loops': 1,               // how many times to repeat the sound (position will wrap around to 0, setPosition() will break out of loop when >0)
	    'onid3': null,            // callback function for "ID3 data is added/available"
	    'onload': null,           // callback function for "load finished"
	    'whileloading': null,     // callback function for "download progress update" (X of Y bytes received)
	    'onplay': null,           // callback for "play" start
	    'onpause': null,          // callback for "pause"
	    'onresume': null,         // callback for "resume" (pause toggle)
	    'whileplaying': null,     // callback during play (position update)
	    'onposition': null,       // object containing times and function callbacks for positions of interest
	    'onstop': null,           // callback for "user stop"
	    'onfailure': null,        // callback function for when playing fails
	    'onfinish': null,         // callback function for "sound finished playing"
	    'multiShot': true,        // let sounds "restart" or layer on top of each other when played multiple times, rather than one-shot/one at a time
	    'multiShotEvents': false, // fire multiple sound events (currently onfinish() only) when multiShot is enabled
	    'position': null,         // offset (milliseconds) to seek to within loaded sound data.
	    'pan': 0,                 // "pan" settings, left-to-right, -100 to 100
	    'stream': true,           // allows playing before entire file has loaded (recommended)
	    'to': null,               // position to end playback within a sound (msec), default = end
	    'type': null,             // MIME-like hint for file pattern / canPlay() tests, eg. audio/mp3
	    'usePolicyFile': false,   // enable crossdomain.xml request for audio on remote domains (for ID3/waveform access)
	    'volume': 100             // self-explanatory. 0-100, the latter being the max.
	
	  };
	
	  this.flash9Options = {
	
	    /**
	     * flash 9-only options,
	     * merged into defaultOptions if flash 9 is being used
	     */
	
	    'isMovieStar': null,      // "MovieStar" MPEG4 audio mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
	    'usePeakData': false,     // enable left/right channel peak (level) data
	    'useWaveformData': false, // enable sound spectrum (raw waveform data) - NOTE: May increase CPU load.
	    'useEQData': false,       // enable sound EQ (frequency spectrum data) - NOTE: May increase CPU load.
	    'onbufferchange': null,   // callback for "isBuffering" property change
	    'ondataerror': null       // callback for waveform/eq data access error (flash playing audio in other tabs/domains)
	
	  };
	
	  this.movieStarOptions = {
	
	    /**
	     * flash 9.0r115+ MPEG4 audio options,
	     * merged into defaultOptions if flash 9+movieStar mode is enabled
	     */
	
	    'bufferTime': 3,          // seconds of data to buffer before playback begins (null = flash default of 0.1 seconds - if AAC playback is gappy, try increasing.)
	    'serverURL': null,        // rtmp: FMS or FMIS server to connect to, required when requesting media via RTMP or one of its variants
	    'onconnect': null,        // rtmp: callback for connection to flash media server
	    'duration': null          // rtmp: song duration (msec)
	
	  };
	
	  this.audioFormats = {
	
	    /**
	     * determines HTML5 support + flash requirements.
	     * if no support (via flash and/or HTML5) for a "required" format, SM2 will fail to start.
	     * flash fallback is used for MP3 or MP4 if HTML5 can't play it (or if preferFlash = true)
	     */
	
	    'mp3': {
	      'type': ['audio/mpeg; codecs="mp3"', 'audio/mpeg', 'audio/mp3', 'audio/MPA', 'audio/mpa-robust'],
	      'required': true
	    },
	
	    'mp4': {
	      'related': ['aac','m4a','m4b'], // additional formats under the MP4 container
	      'type': ['audio/mp4; codecs="mp4a.40.2"', 'audio/aac', 'audio/x-m4a', 'audio/MP4A-LATM', 'audio/mpeg4-generic'],
	      'required': false
	    },
	
	    'ogg': {
	      'type': ['audio/ogg; codecs=vorbis'],
	      'required': false
	    },
	
	    'opus': {
	      'type': ['audio/ogg; codecs=opus', 'audio/opus'],
	      'required': false
	    },
	
	    'wav': {
	      'type': ['audio/wav; codecs="1"', 'audio/wav', 'audio/wave', 'audio/x-wav'],
	      'required': false
	    }
	
	  };
	
	  // HTML attributes (id + class names) for the SWF container
	
	  this.movieID = 'sm2-container';
	  this.id = (smID || 'sm2movie');
	
	  this.debugID = 'soundmanager-debug';
	  this.debugURLParam = /([#?&])debug=1/i;
	
	  // dynamic attributes
	
	  this.versionNumber = 'V2.97a.20140901+DEV';
	  this.version = null;
	  this.movieURL = null;
	  this.altURL = null;
	  this.swfLoaded = false;
	  this.enabled = false;
	  this.oMC = null;
	  this.sounds = {};
	  this.soundIDs = [];
	  this.muted = false;
	  this.didFlashBlock = false;
	  this.filePattern = null;
	
	  this.filePatterns = {
	
	    'flash8': /\.mp3(\?.*)?$/i,
	    'flash9': /\.mp3(\?.*)?$/i
	
	  };
	
	  // support indicators, set at init
	
	  this.features = {
	
	    'buffering': false,
	    'peakData': false,
	    'waveformData': false,
	    'eqData': false,
	    'movieStar': false
	
	  };
	
	  // flash sandbox info, used primarily in troubleshooting
	
	  this.sandbox = {
	
	    // <d>
	    'type': null,
	    'types': {
	      'remote': 'remote (domain-based) rules',
	      'localWithFile': 'local with file access (no internet access)',
	      'localWithNetwork': 'local with network (internet access only, no local access)',
	      'localTrusted': 'local, trusted (local+internet access)'
	    },
	    'description': null,
	    'noRemote': null,
	    'noLocal': null
	    // </d>
	
	  };
	
	  /**
	   * format support (html5/flash)
	   * stores canPlayType() results based on audioFormats.
	   * eg. { mp3: boolean, mp4: boolean }
	   * treat as read-only.
	   */
	
	  this.html5 = {
	    'usingFlash': null // set if/when flash fallback is needed
	  };
	
	  // file type support hash
	  this.flash = {};
	
	  // determined at init time
	  this.html5Only = false;
	
	  // used for special cases (eg. iPad/iPhone/palm OS?)
	  this.ignoreFlash = false;
	
	  /**
	   * a few private internals (OK, a lot. :D)
	   */
	
	  var SMSound,
	  sm2 = this, globalHTML5Audio = null, flash = null, sm = 'soundManager', smc = sm + ': ', h5 = 'HTML5::', id, ua = navigator.userAgent, wl = window.location.href.toString(), doc = document, doNothing, setProperties, init, fV, on_queue = [], debugOpen = true, debugTS, didAppend = false, appendSuccess = false, didInit = false, disabled = false, windowLoaded = false, _wDS, wdCount = 0, initComplete, mixin, assign, extraOptions, addOnEvent, processOnEvents, initUserOnload, delayWaitForEI, waitForEI, rebootIntoHTML5, setVersionInfo, handleFocus, strings, initMovie, preInit, domContentLoaded, winOnLoad, didDCLoaded, getDocument, createMovie, catchError, setPolling, initDebug, debugLevels = ['log', 'info', 'warn', 'error'], defaultFlashVersion = 8, disableObject, failSafely, normalizeMovieURL, oRemoved = null, oRemovedHTML = null, str, flashBlockHandler, getSWFCSS, swfCSS, toggleDebug, loopFix, policyFix, complain, idCheck, waitingForEI = false, initPending = false, startTimer, stopTimer, timerExecute, h5TimerCount = 0, h5IntervalTimer = null, parseURL, messages = [],
	  canIgnoreFlash, needsFlash = null, featureCheck, html5OK, html5CanPlay, html5Ext, html5Unload, domContentLoadedIE, testHTML5, event, slice = Array.prototype.slice, useGlobalHTML5Audio = false, lastGlobalHTML5URL, hasFlash, detectFlash, badSafariFix, html5_events, showSupport, flushMessages, wrapCallback, idCounter = 0,
	  is_iDevice = ua.match(/(ipad|iphone|ipod)/i), isAndroid = ua.match(/android/i), isIE = ua.match(/msie/i), isWebkit = ua.match(/webkit/i), isSafari = (ua.match(/safari/i) && !ua.match(/chrome/i)), isOpera = (ua.match(/opera/i)),
	  mobileHTML5 = (ua.match(/(mobile|pre\/|xoom)/i) || is_iDevice || isAndroid),
	  isBadSafari = (!wl.match(/usehtml5audio/i) && !wl.match(/sm2\-ignorebadua/i) && isSafari && !ua.match(/silk/i) && ua.match(/OS X 10_6_([3-7])/i)), // Safari 4 and 5 (excluding Kindle Fire, "Silk") occasionally fail to load/play HTML5 audio on Snow Leopard 10.6.3 through 10.6.7 due to bug(s) in QuickTime X and/or other underlying frameworks. :/ Confirmed bug. https://bugs.webkit.org/show_bug.cgi?id=32159
	  hasConsole = (window.console !== _undefined && console.log !== _undefined), isFocused = (doc.hasFocus !== _undefined?doc.hasFocus():null), tryInitOnFocus = (isSafari && (doc.hasFocus === _undefined || !doc.hasFocus())), okToDisable = !tryInitOnFocus, flashMIME = /(mp3|mp4|mpa|m4a|m4b)/i, msecScale = 1000,
	  emptyURL = 'about:blank', // safe URL to unload, or load nothing from (flash 8 + most HTML5 UAs)
	  emptyWAV = 'data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==', // tiny WAV for HTML5 unloading
	  overHTTP = (doc.location?doc.location.protocol.match(/http/i):null),
	  http = (!overHTTP ? 'http:/'+'/' : ''),
	  // mp3, mp4, aac etc.
	  netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
	  // Flash v9.0r115+ "moviestar" formats
	  netStreamTypes = ['mpeg4', 'aac', 'flv', 'mov', 'mp4', 'm4v', 'f4v', 'm4a', 'm4b', 'mp4v', '3gp', '3g2'],
	  netStreamPattern = new RegExp('\\.(' + netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
	
	  this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; // default mp3 set
	
	  // use altURL if not "online"
	  this.useAltURL = !overHTTP;
	
	  swfCSS = {
	
	    'swfBox': 'sm2-object-box',
	    'swfDefault': 'movieContainer',
	    'swfError': 'swf_error', // SWF loaded, but SM2 couldn't start (other error)
	    'swfTimedout': 'swf_timedout',
	    'swfLoaded': 'swf_loaded',
	    'swfUnblocked': 'swf_unblocked', // or loaded OK
	    'sm2Debug': 'sm2_debug',
	    'highPerf': 'high_performance',
	    'flashDebug': 'flash_debug'
	
	  };
	
	  /**
	   * basic HTML5 Audio() support test
	   * try...catch because of IE 9 "not implemented" nonsense
	   * https://github.com/Modernizr/Modernizr/issues/224
	   */
	
	  this.hasHTML5 = (function() {
	    try {
	      // new Audio(null) for stupid Opera 9.64 case, which throws not_enough_arguments exception otherwise.
	      return (Audio !== _undefined && (isOpera && opera !== _undefined && opera.version() < 10 ? new Audio(null) : new Audio()).canPlayType !== _undefined);
	    } catch(e) {
	      return false;
	    }
	  }());
	
	  /**
	   * Public SoundManager API
	   * -----------------------
	   */
	
	  /**
	   * Configures top-level soundManager properties.
	   *
	   * @param {object} options Option parameters, eg. { flashVersion: 9, url: '/path/to/swfs/' }
	   * onready and ontimeout are also accepted parameters. call soundManager.setup() to see the full list.
	   */
	
	  this.setup = function(options) {
	
	    var noURL = (!sm2.url);
	
	    // warn if flash options have already been applied
	
	    if (options !== _undefined && didInit && needsFlash && sm2.ok() && (options.flashVersion !== _undefined || options.url !== _undefined || options.html5Test !== _undefined)) {
	      complain(str('setupLate'));
	    }
	
	    // TODO: defer: true?
	
	    assign(options);
	
	    // special case 1: "Late setup". SM2 loaded normally, but user didn't assign flash URL eg., setup({url:...}) before SM2 init. Treat as delayed init.
	
	    if (options) {
	
	      if (noURL && didDCLoaded && options.url !== _undefined) {
	        sm2.beginDelayedInit();
	      }
	
	      // special case 2: If lazy-loading SM2 (DOMContentLoaded has already happened) and user calls setup() with url: parameter, try to init ASAP.
	
	      if (!didDCLoaded && options.url !== _undefined && doc.readyState === 'complete') {
	        setTimeout(domContentLoaded, 1);
	      }
	
	    }
	
	    return sm2;
	
	  };
	
	  this.ok = function() {
	
	    return (needsFlash ? (didInit && !disabled) : (sm2.useHTML5Audio && sm2.hasHTML5));
	
	  };
	
	  this.supported = this.ok; // legacy
	
	  this.getMovie = function(smID) {
	
	    // safety net: some old browsers differ on SWF references, possibly related to ExternalInterface / flash version
	    return id(smID) || doc[smID] || window[smID];
	
	  };
	
	  /**
	   * Creates a SMSound sound object instance.
	   *
	   * @param {object} oOptions Sound options (at minimum, id and url parameters are required.)
	   * @return {object} SMSound The new SMSound object.
	   */
	
	  this.createSound = function(oOptions, _url) {
	
	    var cs, cs_string, options, oSound = null;
	
	    // <d>
	    cs = sm + '.createSound(): ';
	    cs_string = cs + str(!didInit?'notReady':'notOK');
	    // </d>
	
	    if (!didInit || !sm2.ok()) {
	      complain(cs_string);
	      return false;
	    }
	
	    if (_url !== _undefined) {
	      // function overloading in JS! :) ..assume simple createSound(id, url) use case
	      oOptions = {
	        'id': oOptions,
	        'url': _url
	      };
	    }
	
	    // inherit from defaultOptions
	    options = mixin(oOptions);
	
	    options.url = parseURL(options.url);
	
	    // generate an id, if needed.
	    if (options.id === undefined) {
	      options.id = sm2.setupOptions.idPrefix + (idCounter++);
	    }
	
	    // <d>
	    if (options.id.toString().charAt(0).match(/^[0-9]$/)) {
	      sm2._wD(cs + str('badID', options.id), 2);
	    }
	
	    sm2._wD(cs + options.id + (options.url ? ' (' + options.url + ')' : ''), 1);
	    // </d>
	
	    if (idCheck(options.id, true)) {
	      sm2._wD(cs + options.id + ' exists', 1);
	      return sm2.sounds[options.id];
	    }
	
	    function make() {
	
	      options = loopFix(options);
	      sm2.sounds[options.id] = new SMSound(options);
	      sm2.soundIDs.push(options.id);
	      return sm2.sounds[options.id];
	
	    }
	
	    if (html5OK(options)) {
	
	      oSound = make();
	      sm2._wD(options.id + ': Using HTML5');
	      oSound._setup_html5(options);
	
	    } else {
	
	      if (sm2.html5Only) {
	        sm2._wD(options.id + ': No HTML5 support for this sound, and no Flash. Exiting.');
	        return make();
	      }
	
	      // TODO: Move HTML5/flash checks into generic URL parsing/handling function.
	
	      if (sm2.html5.usingFlash && options.url && options.url.match(/data\:/i)) {
	        // data: URIs not supported by Flash, either.
	        sm2._wD(options.id + ': data: URIs not supported via Flash. Exiting.');
	        return make();
	      }
	
	      if (fV > 8) {
	        if (options.isMovieStar === null) {
	          // attempt to detect MPEG-4 formats
	          options.isMovieStar = !!(options.serverURL || (options.type ? options.type.match(netStreamMimeTypes) : false) || (options.url && options.url.match(netStreamPattern)));
	        }
	        // <d>
	        if (options.isMovieStar) {
	          sm2._wD(cs + 'using MovieStar handling');
	          if (options.loops > 1) {
	            _wDS('noNSLoop');
	          }
	        }
	        // </d>
	      }
	
	      options = policyFix(options, cs);
	      oSound = make();
	
	      if (fV === 8) {
	        flash._createSound(options.id, options.loops||1, options.usePolicyFile);
	      } else {
	        flash._createSound(options.id, options.url, options.usePeakData, options.useWaveformData, options.useEQData, options.isMovieStar, (options.isMovieStar?options.bufferTime:false), options.loops||1, options.serverURL, options.duration||null, options.autoPlay, true, options.autoLoad, options.usePolicyFile);
	        if (!options.serverURL) {
	          // We are connected immediately
	          oSound.connected = true;
	          if (options.onconnect) {
	            options.onconnect.apply(oSound);
	          }
	        }
	      }
	
	      if (!options.serverURL && (options.autoLoad || options.autoPlay)) {
	        // call load for non-rtmp streams
	        oSound.load(options);
	      }
	
	    }
	
	    // rtmp will play in onconnect
	    if (!options.serverURL && options.autoPlay) {
	      oSound.play();
	    }
	
	    return oSound;
	
	  };
	
	  /**
	   * Destroys a SMSound sound object instance.
	   *
	   * @param {string} sID The ID of the sound to destroy
	   */
	
	  this.destroySound = function(sID, _bFromSound) {
	
	    // explicitly destroy a sound before normal page unload, etc.
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	
	    var oS = sm2.sounds[sID], i;
	
	    oS.stop();
	    
	    // Disable all callbacks after stop(), when the sound is being destroyed
	    oS._iO = {};
	    
	    oS.unload();
	
	    for (i = 0; i < sm2.soundIDs.length; i++) {
	      if (sm2.soundIDs[i] === sID) {
	        sm2.soundIDs.splice(i, 1);
	        break;
	      }
	    }
	
	    if (!_bFromSound) {
	      // ignore if being called from SMSound instance
	      oS.destruct(true);
	    }
	
	    oS = null;
	    delete sm2.sounds[sID];
	
	    return true;
	
	  };
	
	  /**
	   * Calls the load() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {object} oOptions Optional: Sound options
	   */
	
	  this.load = function(sID, oOptions) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].load(oOptions);
	
	  };
	
	  /**
	   * Calls the unload() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   */
	
	  this.unload = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].unload();
	
	  };
	
	  /**
	   * Calls the onPosition() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nPosition The position to watch for
	   * @param {function} oMethod The relevant callback to fire
	   * @param {object} oScope Optional: The scope to apply the callback to
	   * @return {SMSound} The SMSound object
	   */
	
	  this.onPosition = function(sID, nPosition, oMethod, oScope) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].onposition(nPosition, oMethod, oScope);
	
	  };
	
	  // legacy/backwards-compability: lower-case method name
	  this.onposition = this.onPosition;
	
	  /**
	   * Calls the clearOnPosition() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nPosition The position to watch for
	   * @param {function} oMethod Optional: The relevant callback to fire
	   * @return {SMSound} The SMSound object
	   */
	
	  this.clearOnPosition = function(sID, nPosition, oMethod) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].clearOnPosition(nPosition, oMethod);
	
	  };
	
	  /**
	   * Calls the play() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {object} oOptions Optional: Sound options
	   * @return {SMSound} The SMSound object
	   */
	
	  this.play = function(sID, oOptions) {
	
	    var result = null,
	        // legacy function-overloading use case: play('mySound', '/path/to/some.mp3');
	        overloaded = (oOptions && !(oOptions instanceof Object));
	
	    if (!didInit || !sm2.ok()) {
	      complain(sm + '.play(): ' + str(!didInit?'notReady':'notOK'));
	      return false;
	    }
	
	    if (!idCheck(sID, overloaded)) {
	
	      if (!overloaded) {
	        // no sound found for the given ID. Bail.
	        return false;
	      }
	
	      if (overloaded) {
	        oOptions = {
	          url: oOptions
	        };
	      }
	
	      if (oOptions && oOptions.url) {
	        // overloading use case, create+play: .play('someID', {url:'/path/to.mp3'});
	        sm2._wD(sm + '.play(): Attempting to create "' + sID + '"', 1);
	        oOptions.id = sID;
	        result = sm2.createSound(oOptions).play();
	      }
	
	    } else if (overloaded) {
	
	      // existing sound object case
	      oOptions = {
	        url: oOptions
	      };
	
	    }
	
	    if (result === null) {
	      // default case
	      result = sm2.sounds[sID].play(oOptions);
	    }
	
	    return result;
	
	  };
	
	  this.start = this.play; // just for convenience
	
	  /**
	   * Calls the setPosition() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nMsecOffset Position (milliseconds)
	   * @return {SMSound} The SMSound object
	   */
	
	  this.setPosition = function(sID, nMsecOffset) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].setPosition(nMsecOffset);
	
	  };
	
	  /**
	   * Calls the stop() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.stop = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	
	    sm2._wD(sm + '.stop(' + sID + ')', 1);
	    return sm2.sounds[sID].stop();
	
	  };
	
	  /**
	   * Stops all currently-playing sounds.
	   */
	
	  this.stopAll = function() {
	
	    var oSound;
	    sm2._wD(sm + '.stopAll()', 1);
	
	    for (oSound in sm2.sounds) {
	      if (sm2.sounds.hasOwnProperty(oSound)) {
	        // apply only to sound objects
	        sm2.sounds[oSound].stop();
	      }
	    }
	
	  };
	
	  /**
	   * Calls the pause() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.pause = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].pause();
	
	  };
	
	  /**
	   * Pauses all currently-playing sounds.
	   */
	
	  this.pauseAll = function() {
	
	    var i;
	    for (i = sm2.soundIDs.length-1; i >= 0; i--) {
	      sm2.sounds[sm2.soundIDs[i]].pause();
	    }
	
	  };
	
	  /**
	   * Calls the resume() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.resume = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].resume();
	
	  };
	
	  /**
	   * Resumes all currently-paused sounds.
	   */
	
	  this.resumeAll = function() {
	
	    var i;
	    for (i = sm2.soundIDs.length-1; i >= 0; i--) {
	      sm2.sounds[sm2.soundIDs[i]].resume();
	    }
	
	  };
	
	  /**
	   * Calls the togglePause() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.togglePause = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].togglePause();
	
	  };
	
	  /**
	   * Calls the setPan() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nPan The pan value (-100 to 100)
	   * @return {SMSound} The SMSound object
	   */
	
	  this.setPan = function(sID, nPan) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].setPan(nPan);
	
	  };
	
	  /**
	   * Calls the setVolume() method of a SMSound object by ID
	   * Overloaded case: pass only volume argument eg., setVolume(50) to apply to all sounds.
	   *
	   * @param {string} sID The ID of the sound
	   * @param {number} nVol The volume value (0 to 100)
	   * @return {SMSound} The SMSound object
	   */
	
	  this.setVolume = function(sID, nVol) {
	
	    // setVolume(50) function overloading case - apply to all sounds
	
	    var i, j;
	
	    if (sID !== _undefined && !isNaN(sID) && nVol === _undefined) {
	      for (i=0, j=sm2.soundIDs.length; i<j; i++) {
	        sm2.sounds[sm2.soundIDs[i]].setVolume(sID);
	      }
	      return;
	    }
	
	    // setVolume('mySound', 50) case
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	
	    return sm2.sounds[sID].setVolume(nVol);
	
	  };
	
	  /**
	   * Calls the mute() method of either a single SMSound object by ID, or all sound objects.
	   *
	   * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
	   */
	
	  this.mute = function(sID) {
	
	    var i = 0;
	
	    if (sID instanceof String) {
	      sID = null;
	    }
	
	    if (!sID) {
	
	      sm2._wD(sm + '.mute(): Muting all sounds');
	      for (i = sm2.soundIDs.length-1; i >= 0; i--) {
	        sm2.sounds[sm2.soundIDs[i]].mute();
	      }
	      sm2.muted = true;
	
	    } else {
	
	      if (!idCheck(sID)) {
	        return false;
	      }
	      sm2._wD(sm + '.mute(): Muting "' + sID + '"');
	      return sm2.sounds[sID].mute();
	
	    }
	
	    return true;
	
	  };
	
	  /**
	   * Mutes all sounds.
	   */
	
	  this.muteAll = function() {
	
	    sm2.mute();
	
	  };
	
	  /**
	   * Calls the unmute() method of either a single SMSound object by ID, or all sound objects.
	   *
	   * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
	   */
	
	  this.unmute = function(sID) {
	
	    var i;
	
	    if (sID instanceof String) {
	      sID = null;
	    }
	
	    if (!sID) {
	
	      sm2._wD(sm + '.unmute(): Unmuting all sounds');
	      for (i = sm2.soundIDs.length-1; i >= 0; i--) {
	        sm2.sounds[sm2.soundIDs[i]].unmute();
	      }
	      sm2.muted = false;
	
	    } else {
	
	      if (!idCheck(sID)) {
	        return false;
	      }
	      sm2._wD(sm + '.unmute(): Unmuting "' + sID + '"');
	      return sm2.sounds[sID].unmute();
	
	    }
	
	    return true;
	
	  };
	
	  /**
	   * Unmutes all sounds.
	   */
	
	  this.unmuteAll = function() {
	
	    sm2.unmute();
	
	  };
	
	  /**
	   * Calls the toggleMute() method of a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.toggleMute = function(sID) {
	
	    if (!idCheck(sID)) {
	      return false;
	    }
	    return sm2.sounds[sID].toggleMute();
	
	  };
	
	  /**
	   * Retrieves the memory used by the flash plugin.
	   *
	   * @return {number} The amount of memory in use
	   */
	
	  this.getMemoryUse = function() {
	
	    // flash-only
	    var ram = 0;
	
	    if (flash && fV !== 8) {
	      ram = parseInt(flash._getMemoryUse(), 10);
	    }
	
	    return ram;
	
	  };
	
	  /**
	   * Undocumented: NOPs soundManager and all SMSound objects.
	   */
	
	  this.disable = function(bNoDisable) {
	
	    // destroy all functions
	    var i;
	
	    if (bNoDisable === _undefined) {
	      bNoDisable = false;
	    }
	
	    if (disabled) {
	      return false;
	    }
	
	    disabled = true;
	    _wDS('shutdown', 1);
	
	    for (i = sm2.soundIDs.length-1; i >= 0; i--) {
	      disableObject(sm2.sounds[sm2.soundIDs[i]]);
	    }
	
	    // fire "complete", despite fail
	    initComplete(bNoDisable);
	    event.remove(window, 'load', initUserOnload);
	
	    return true;
	
	  };
	
	  /**
	   * Determines playability of a MIME type, eg. 'audio/mp3'.
	   */
	
	  this.canPlayMIME = function(sMIME) {
	
	    var result;
	
	    if (sm2.hasHTML5) {
	      result = html5CanPlay({type:sMIME});
	    }
	
	    if (!result && needsFlash) {
	      // if flash 9, test netStream (movieStar) types as well.
	      result = (sMIME && sm2.ok() ? !!((fV > 8 ? sMIME.match(netStreamMimeTypes) : null) || sMIME.match(sm2.mimePattern)) : null); // TODO: make less "weird" (per JSLint)
	    }
	
	    return result;
	
	  };
	
	  /**
	   * Determines playability of a URL based on audio support.
	   *
	   * @param {string} sURL The URL to test
	   * @return {boolean} URL playability
	   */
	
	  this.canPlayURL = function(sURL) {
	
	    var result;
	
	    if (sm2.hasHTML5) {
	      result = html5CanPlay({url: sURL});
	    }
	
	    if (!result && needsFlash) {
	      result = (sURL && sm2.ok() ? !!(sURL.match(sm2.filePattern)) : null);
	    }
	
	    return result;
	
	  };
	
	  /**
	   * Determines playability of an HTML DOM &lt;a&gt; object (or similar object literal) based on audio support.
	   *
	   * @param {object} oLink an HTML DOM &lt;a&gt; object or object literal including href and/or type attributes
	   * @return {boolean} URL playability
	   */
	
	  this.canPlayLink = function(oLink) {
	
	    if (oLink.type !== _undefined && oLink.type) {
	      if (sm2.canPlayMIME(oLink.type)) {
	        return true;
	      }
	    }
	
	    return sm2.canPlayURL(oLink.href);
	
	  };
	
	  /**
	   * Retrieves a SMSound object by ID.
	   *
	   * @param {string} sID The ID of the sound
	   * @return {SMSound} The SMSound object
	   */
	
	  this.getSoundById = function(sID, _suppressDebug) {
	
	    if (!sID) {
	      return null;
	    }
	
	    var result = sm2.sounds[sID];
	
	    // <d>
	    if (!result && !_suppressDebug) {
	      sm2._wD(sm + '.getSoundById(): Sound "' + sID + '" not found.', 2);
	    }
	    // </d>
	
	    return result;
	
	  };
	
	  /**
	   * Queues a callback for execution when SoundManager has successfully initialized.
	   *
	   * @param {function} oMethod The callback method to fire
	   * @param {object} oScope Optional: The scope to apply to the callback
	   */
	
	  this.onready = function(oMethod, oScope) {
	
	    var sType = 'onready',
	        result = false;
	
	    if (typeof oMethod === 'function') {
	
	      // <d>
	      if (didInit) {
	        sm2._wD(str('queue', sType));
	      }
	      // </d>
	
	      if (!oScope) {
	        oScope = window;
	      }
	
	      addOnEvent(sType, oMethod, oScope);
	      processOnEvents();
	
	      result = true;
	
	    } else {
	
	      throw str('needFunction', sType);
	
	    }
	
	    return result;
	
	  };
	
	  /**
	   * Queues a callback for execution when SoundManager has failed to initialize.
	   *
	   * @param {function} oMethod The callback method to fire
	   * @param {object} oScope Optional: The scope to apply to the callback
	   */
	
	  this.ontimeout = function(oMethod, oScope) {
	
	    var sType = 'ontimeout',
	        result = false;
	
	    if (typeof oMethod === 'function') {
	
	      // <d>
	      if (didInit) {
	        sm2._wD(str('queue', sType));
	      }
	      // </d>
	
	      if (!oScope) {
	        oScope = window;
	      }
	
	      addOnEvent(sType, oMethod, oScope);
	      processOnEvents({type:sType});
	
	      result = true;
	
	    } else {
	
	      throw str('needFunction', sType);
	
	    }
	
	    return result;
	
	  };
	
	  /**
	   * Writes console.log()-style debug output to a console or in-browser element.
	   * Applies when debugMode = true
	   *
	   * @param {string} sText The console message
	   * @param {object} nType Optional log level (number), or object. Number case: Log type/style where 0 = 'info', 1 = 'warn', 2 = 'error'. Object case: Object to be dumped.
	   */
	
	  this._writeDebug = function(sText, sTypeOrObject) {
	
	    // pseudo-private console.log()-style output
	    // <d>
	
	    var sDID = 'soundmanager-debug', o, oItem;
	
	    if (!sm2.debugMode) {
	      return false;
	    }
	
	    if (hasConsole && sm2.useConsole) {
	      if (sTypeOrObject && typeof sTypeOrObject === 'object') {
	        // object passed; dump to console.
	        console.log(sText, sTypeOrObject);
	      } else if (debugLevels[sTypeOrObject] !== _undefined) {
	        console[debugLevels[sTypeOrObject]](sText);
	      } else {
	        console.log(sText);
	      }
	      if (sm2.consoleOnly) {
	        return true;
	      }
	    }
	
	    o = id(sDID);
	
	    if (!o) {
	      return false;
	    }
	
	    oItem = doc.createElement('div');
	
	    if (++wdCount % 2 === 0) {
	      oItem.className = 'sm2-alt';
	    }
	
	    if (sTypeOrObject === _undefined) {
	      sTypeOrObject = 0;
	    } else {
	      sTypeOrObject = parseInt(sTypeOrObject, 10);
	    }
	
	    oItem.appendChild(doc.createTextNode(sText));
	
	    if (sTypeOrObject) {
	      if (sTypeOrObject >= 2) {
	        oItem.style.fontWeight = 'bold';
	      }
	      if (sTypeOrObject === 3) {
	        oItem.style.color = '#ff3333';
	      }
	    }
	
	    // top-to-bottom
	    // o.appendChild(oItem);
	
	    // bottom-to-top
	    o.insertBefore(oItem, o.firstChild);
	
	    o = null;
	    // </d>
	
	    return true;
	
	  };
	
	  // <d>
	  // last-resort debugging option
	  if (wl.indexOf('sm2-debug=alert') !== -1) {
	    this._writeDebug = function(sText) {
	      window.alert(sText);
	    };
	  }
	  // </d>
	
	  // alias
	  this._wD = this._writeDebug;
	
	  /**
	   * Provides debug / state information on all SMSound objects.
	   */
	
	  this._debug = function() {
	
	    // <d>
	    var i, j;
	    _wDS('currentObj', 1);
	
	    for (i = 0, j = sm2.soundIDs.length; i < j; i++) {
	      sm2.sounds[sm2.soundIDs[i]]._debug();
	    }
	    // </d>
	
	  };
	
	  /**
	   * Restarts and re-initializes the SoundManager instance.
	   *
	   * @param {boolean} resetEvents Optional: When true, removes all registered onready and ontimeout event callbacks.
	   * @param {boolean} excludeInit Options: When true, does not call beginDelayedInit() (which would restart SM2).
	   * @return {object} soundManager The soundManager instance.
	   */
	
	  this.reboot = function(resetEvents, excludeInit) {
	
	    // reset some (or all) state, and re-init unless otherwise specified.
	
	    // <d>
	    if (sm2.soundIDs.length) {
	      sm2._wD('Destroying ' + sm2.soundIDs.length + ' SMSound object' + (sm2.soundIDs.length !== 1 ? 's' : '') + '...');
	    }
	    // </d>
	
	    var i, j, k;
	
	    for (i = sm2.soundIDs.length-1; i >= 0; i--) {
	      sm2.sounds[sm2.soundIDs[i]].destruct();
	    }
	
	    // trash ze flash (remove from the DOM)
	
	    if (flash) {
	
	      try {
	
	        if (isIE) {
	          oRemovedHTML = flash.innerHTML;
	        }
	
	        oRemoved = flash.parentNode.removeChild(flash);
	
	      } catch(e) {
	
	        // Remove failed? May be due to flash blockers silently removing the SWF object/embed node from the DOM. Warn and continue.
	
	        _wDS('badRemove', 2);
	
	      }
	
	    }
	
	    // actually, force recreate of movie.
	
	    oRemovedHTML = oRemoved = needsFlash = flash = null;
	
	    sm2.enabled = didDCLoaded = didInit = waitingForEI = initPending = didAppend = appendSuccess = disabled = useGlobalHTML5Audio = sm2.swfLoaded = false;
	
	    sm2.soundIDs = [];
	    sm2.sounds = {};
	
	    idCounter = 0;
	
	    if (!resetEvents) {
	      // reset callbacks for onready, ontimeout etc. so that they will fire again on re-init
	      for (i in on_queue) {
	        if (on_queue.hasOwnProperty(i)) {
	          for (j = 0, k = on_queue[i].length; j < k; j++) {
	            on_queue[i][j].fired = false;
	          }
	        }
	      }
	    } else {
	      // remove all callbacks entirely
	      on_queue = [];
	    }
	
	    // <d>
	    if (!excludeInit) {
	      sm2._wD(sm + ': Rebooting...');
	    }
	    // </d>
	
	    // reset HTML5 and flash canPlay test results
	
	    sm2.html5 = {
	      'usingFlash': null
	    };
	
	    sm2.flash = {};
	
	    // reset device-specific HTML/flash mode switches
	
	    sm2.html5Only = false;
	    sm2.ignoreFlash = false;
	
	    window.setTimeout(function() {
	
	      preInit();
	
	      // by default, re-init
	
	      if (!excludeInit) {
	        sm2.beginDelayedInit();
	      }
	
	    }, 20);
	
	    return sm2;
	
	  };
	
	  this.reset = function() {
	
	    /**
	     * Shuts down and restores the SoundManager instance to its original loaded state, without an explicit reboot. All onready/ontimeout handlers are removed.
	     * After this call, SM2 may be re-initialized via soundManager.beginDelayedInit().
	     * @return {object} soundManager The soundManager instance.
	     */
	
	    _wDS('reset');
	    return sm2.reboot(true, true);
	
	  };
	
	  /**
	   * Undocumented: Determines the SM2 flash movie's load progress.
	   *
	   * @return {number or null} Percent loaded, or if invalid/unsupported, null.
	   */
	
	  this.getMoviePercent = function() {
	
	    /**
	     * Interesting syntax notes...
	     * Flash/ExternalInterface (ActiveX/NPAPI) bridge methods are not typeof "function" nor instanceof Function, but are still valid.
	     * Additionally, JSLint dislikes ('PercentLoaded' in flash)-style syntax and recommends hasOwnProperty(), which does not work in this case.
	     * Furthermore, using (flash && flash.PercentLoaded) causes IE to throw "object doesn't support this property or method".
	     * Thus, 'in' syntax must be used.
	     */
	
	    return (flash && 'PercentLoaded' in flash ? flash.PercentLoaded() : null); // Yes, JSLint. See nearby comment in source for explanation.
	
	  };
	
	  /**
	   * Additional helper for manually invoking SM2's init process after DOM Ready / window.onload().
	   */
	
	  this.beginDelayedInit = function() {
	
	    windowLoaded = true;
	    domContentLoaded();
	
	    setTimeout(function() {
	
	      if (initPending) {
	        return false;
	      }
	
	      createMovie();
	      initMovie();
	      initPending = true;
	
	      return true;
	
	    }, 20);
	
	    delayWaitForEI();
	
	  };
	
	  /**
	   * Destroys the SoundManager instance and all SMSound instances.
	   */
	
	  this.destruct = function() {
	
	    sm2._wD(sm + '.destruct()');
	    sm2.disable(true);
	
	  };
	
	  /**
	   * SMSound() (sound object) constructor
	   * ------------------------------------
	   *
	   * @param {object} oOptions Sound options (id and url are required attributes)
	   * @return {SMSound} The new SMSound object
	   */
	
	  SMSound = function(oOptions) {
	
	    var s = this, resetProperties, add_html5_events, remove_html5_events, stop_html5_timer, start_html5_timer, attachOnPosition, onplay_called = false, onPositionItems = [], onPositionFired = 0, detachOnPosition, applyFromTo, lastURL = null, lastHTML5State, urlOmitted;
	
	    lastHTML5State = {
	      // tracks duration + position (time)
	      duration: null,
	      time: null
	    };
	
	    this.id = oOptions.id;
	
	    // legacy
	    this.sID = this.id;
	
	    this.url = oOptions.url;
	    this.options = mixin(oOptions);
	
	    // per-play-instance-specific options
	    this.instanceOptions = this.options;
	
	    // short alias
	    this._iO = this.instanceOptions;
	
	    // assign property defaults
	    this.pan = this.options.pan;
	    this.volume = this.options.volume;
	
	    // whether or not this object is using HTML5
	    this.isHTML5 = false;
	
	    // internal HTML5 Audio() object reference
	    this._a = null;
	
	    // for flash 8 special-case createSound() without url, followed by load/play with url case
	    urlOmitted = (this.url ? false : true);
	
	    /**
	     * SMSound() public methods
	     * ------------------------
	     */
	
	    this.id3 = {};
	
	    /**
	     * Writes SMSound object parameters to debug console
	     */
	
	    this._debug = function() {
	
	      // <d>
	      sm2._wD(s.id + ': Merged options:', s.options);
	      // </d>
	
	    };
	
	    /**
	     * Begins loading a sound per its *url*.
	     *
	     * @param {object} oOptions Optional: Sound options
	     * @return {SMSound} The SMSound object
	     */
	
	    this.load = function(oOptions) {
	
	      var oSound = null, instanceOptions;
	
	      if (oOptions !== _undefined) {
	        s._iO = mixin(oOptions, s.options);
	      } else {
	        oOptions = s.options;
	        s._iO = oOptions;
	        if (lastURL && lastURL !== s.url) {
	          _wDS('manURL');
	          s._iO.url = s.url;
	          s.url = null;
	        }
	      }
	
	      if (!s._iO.url) {
	        s._iO.url = s.url;
	      }
	
	      s._iO.url = parseURL(s._iO.url);
	
	      // ensure we're in sync
	      s.instanceOptions = s._iO;
	
	      // local shortcut
	      instanceOptions = s._iO;
	
	      sm2._wD(s.id + ': load (' + instanceOptions.url + ')');
	
	      if (!instanceOptions.url && !s.url) {
	        sm2._wD(s.id + ': load(): url is unassigned. Exiting.', 2);
	        return s;
	      }
	
	      // <d>
	      if (!s.isHTML5 && fV === 8 && !s.url && !instanceOptions.autoPlay) {
	        // flash 8 load() -> play() won't work before onload has fired.
	        sm2._wD(s.id + ': Flash 8 load() limitation: Wait for onload() before calling play().', 1);
	      }
	      // </d>
	
	      if (instanceOptions.url === s.url && s.readyState !== 0 && s.readyState !== 2) {
	        _wDS('onURL', 1);
	        // if loaded and an onload() exists, fire immediately.
	        if (s.readyState === 3 && instanceOptions.onload) {
	          // assume success based on truthy duration.
	          wrapCallback(s, function() {
	            instanceOptions.onload.apply(s, [(!!s.duration)]);
	          });
	        }
	        return s;
	      }
	
	      // reset a few state properties
	
	      s.loaded = false;
	      s.readyState = 1;
	      s.playState = 0;
	      s.id3 = {};
	
	      // TODO: If switching from HTML5 -> flash (or vice versa), stop currently-playing audio.
	
	      if (html5OK(instanceOptions)) {
	
	        oSound = s._setup_html5(instanceOptions);
	
	        if (!oSound._called_load) {
	
	          s._html5_canplay = false;
	
	          // TODO: review called_load / html5_canplay logic
	
	          // if url provided directly to load(), assign it here.
	
	          if (s.url !== instanceOptions.url) {
	
	            sm2._wD(_wDS('manURL') + ': ' + instanceOptions.url);
	
	            s._a.src = instanceOptions.url;
	
	            // TODO: review / re-apply all relevant options (volume, loop, onposition etc.)
	
	            // reset position for new URL
	            s.setPosition(0);
	
	          }
	
	          // given explicit load call, try to preload.
	
	          // early HTML5 implementation (non-standard)
	          s._a.autobuffer = 'auto';
	
	          // standard property, values: none / metadata / auto
	          // reference: http://msdn.microsoft.com/en-us/library/ie/ff974759%28v=vs.85%29.aspx
	          s._a.preload = 'auto';
	
	          s._a._called_load = true;
	
	        } else {
	
	          sm2._wD(s.id + ': Ignoring request to load again');
	
	        }
	
	      } else {
	
	        if (sm2.html5Only) {
	          sm2._wD(s.id + ': No flash support. Exiting.');
	          return s;
	        }
	
	        if (s._iO.url && s._iO.url.match(/data\:/i)) {
	          // data: URIs not supported by Flash, either.
	          sm2._wD(s.id + ': data: URIs not supported via Flash. Exiting.');
	          return s;
	        }
	
	        try {
	          s.isHTML5 = false;
	          s._iO = policyFix(loopFix(instanceOptions));
	          // if we have "position", disable auto-play as we'll be seeking to that position at onload().
	          if (s._iO.autoPlay && (s._iO.position || s._iO.from)) {
	            sm2._wD(s.id + ': Disabling autoPlay because of non-zero offset case');
	            s._iO.autoPlay = false;
	          }
	          // re-assign local shortcut
	          instanceOptions = s._iO;
	          if (fV === 8) {
	            flash._load(s.id, instanceOptions.url, instanceOptions.stream, instanceOptions.autoPlay, instanceOptions.usePolicyFile);
	          } else {
	            flash._load(s.id, instanceOptions.url, !!(instanceOptions.stream), !!(instanceOptions.autoPlay), instanceOptions.loops||1, !!(instanceOptions.autoLoad), instanceOptions.usePolicyFile);
	          }
	        } catch(e) {
	          _wDS('smError', 2);
	          debugTS('onload', false);
	          catchError({type:'SMSOUND_LOAD_JS_EXCEPTION', fatal:true});
	        }
	
	      }
	
	      // after all of this, ensure sound url is up to date.
	      s.url = instanceOptions.url;
	
	      return s;
	
	    };
	
	    /**
	     * Unloads a sound, canceling any open HTTP requests.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.unload = function() {
	
	      // Flash 8/AS2 can't "close" a stream - fake it by loading an empty URL
	      // Flash 9/AS3: Close stream, preventing further load
	      // HTML5: Most UAs will use empty URL
	
	      if (s.readyState !== 0) {
	
	        sm2._wD(s.id + ': unload()');
	
	        if (!s.isHTML5) {
	
	          if (fV === 8) {
	            flash._unload(s.id, emptyURL);
	          } else {
	            flash._unload(s.id);
	          }
	
	        } else {
	
	          stop_html5_timer();
	
	          if (s._a) {
	
	            s._a.pause();
	
	            // update empty URL, too
	            lastURL = html5Unload(s._a);
	
	          }
	
	        }
	
	        // reset load/status flags
	        resetProperties();
	
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Unloads and destroys a sound.
	     */
	
	    this.destruct = function(_bFromSM) {
	
	      sm2._wD(s.id + ': Destruct');
	
	      if (!s.isHTML5) {
	
	        // kill sound within Flash
	        // Disable the onfailure handler
	        s._iO.onfailure = null;
	        flash._destroySound(s.id);
	
	      } else {
	
	        stop_html5_timer();
	
	        if (s._a) {
	          s._a.pause();
	          html5Unload(s._a);
	          if (!useGlobalHTML5Audio) {
	            remove_html5_events();
	          }
	          // break obvious circular reference
	          s._a._s = null;
	          s._a = null;
	        }
	
	      }
	
	      if (!_bFromSM) {
	        // ensure deletion from controller
	        sm2.destroySound(s.id, true);
	      }
	
	    };
	
	    /**
	     * Begins playing a sound.
	     *
	     * @param {object} oOptions Optional: Sound options
	     * @return {SMSound} The SMSound object
	     */
	
	    this.play = function(oOptions, _updatePlayState) {
	
	      var fN, allowMulti, a, onready,
	          audioClone, onended, oncanplay,
	          startOK = true,
	          exit = null;
	
	      // <d>
	      fN = s.id + ': play(): ';
	      // </d>
	
	      // default to true
	      _updatePlayState = (_updatePlayState === _undefined ? true : _updatePlayState);
	
	      if (!oOptions) {
	        oOptions = {};
	      }
	
	      // first, use local URL (if specified)
	      if (s.url) {
	        s._iO.url = s.url;
	      }
	
	      // mix in any options defined at createSound()
	      s._iO = mixin(s._iO, s.options);
	
	      // mix in any options specific to this method
	      s._iO = mixin(oOptions, s._iO);
	
	      s._iO.url = parseURL(s._iO.url);
	
	      s.instanceOptions = s._iO;
	
	      // RTMP-only
	      if (!s.isHTML5 && s._iO.serverURL && !s.connected) {
	        if (!s.getAutoPlay()) {
	          sm2._wD(fN +' Netstream not connected yet - setting autoPlay');
	          s.setAutoPlay(true);
	        }
	        // play will be called in onconnect()
	        return s;
	      }
	
	      if (html5OK(s._iO)) {
	        s._setup_html5(s._iO);
	        start_html5_timer();
	      }
	
	      if (s.playState === 1 && !s.paused) {
	        allowMulti = s._iO.multiShot;
	        if (!allowMulti) {
	          sm2._wD(fN + 'Already playing (one-shot)', 1);
	          if (s.isHTML5) {
	            // go back to original position.
	            s.setPosition(s._iO.position);
	          }
	          exit = s;
	        } else {
	          sm2._wD(fN + 'Already playing (multi-shot)', 1);
	        }
	      }
	
	      if (exit !== null) {
	        return exit;
	      }
	
	      // edge case: play() with explicit URL parameter
	      if (oOptions.url && oOptions.url !== s.url) {
	
	        // special case for createSound() followed by load() / play() with url; avoid double-load case.
	        if (!s.readyState && !s.isHTML5 && fV === 8 && urlOmitted) {
	
	          urlOmitted = false;
	
	        } else {
	
	          // load using merged options
	          s.load(s._iO);
	
	        }
	
	      }
	
	      if (!s.loaded) {
	
	        if (s.readyState === 0) {
	
	          sm2._wD(fN + 'Attempting to load');
	
	          // try to get this sound playing ASAP
	          if (!s.isHTML5 && !sm2.html5Only) {
	
	            // flash: assign directly because setAutoPlay() increments the instanceCount
	            s._iO.autoPlay = true;
	            s.load(s._iO);
	
	          } else if (s.isHTML5) {
	
	            // iOS needs this when recycling sounds, loading a new URL on an existing object.
	            s.load(s._iO);
	
	          } else {
	
	            sm2._wD(fN + 'Unsupported type. Exiting.');
	            exit = s;
	
	          }
	
	          // HTML5 hack - re-set instanceOptions?
	          s.instanceOptions = s._iO;
	
	        } else if (s.readyState === 2) {
	
	          sm2._wD(fN + 'Could not load - exiting', 2);
	          exit = s;
	
	        } else {
	
	          sm2._wD(fN + 'Loading - attempting to play...');
	
	        }
	
	      } else {
	
	        // "play()"
	        sm2._wD(fN.substr(0, fN.lastIndexOf(':')));
	
	      }
	
	      if (exit !== null) {
	        return exit;
	      }
	
	      if (!s.isHTML5 && fV === 9 && s.position > 0 && s.position === s.duration) {
	        // flash 9 needs a position reset if play() is called while at the end of a sound.
	        sm2._wD(fN + 'Sound at end, resetting to position:0');
	        oOptions.position = 0;
	      }
	
	      /**
	       * Streams will pause when their buffer is full if they are being loaded.
	       * In this case paused is true, but the song hasn't started playing yet.
	       * If we just call resume() the onplay() callback will never be called.
	       * So only call resume() if the position is > 0.
	       * Another reason is because options like volume won't have been applied yet.
	       * For normal sounds, just resume.
	       */
	
	      if (s.paused && s.position >= 0 && (!s._iO.serverURL || s.position > 0)) {
	
	        // https://gist.github.com/37b17df75cc4d7a90bf6
	        sm2._wD(fN + 'Resuming from paused state', 1);
	        s.resume();
	
	      } else {
	
	        s._iO = mixin(oOptions, s._iO);
	
	        /**
	         * Preload in the event of play() with position under Flash,
	         * or from/to parameters and non-RTMP case
	         */
	        if (((!s.isHTML5 && s._iO.position !== null && s._iO.position > 0) || (s._iO.from !== null && s._iO.from > 0) || s._iO.to !== null) && s.instanceCount === 0 && s.playState === 0 && !s._iO.serverURL) {
	
	          onready = function() {
	            // sound "canplay" or onload()
	            // re-apply position/from/to to instance options, and start playback
	            s._iO = mixin(oOptions, s._iO);
	            s.play(s._iO);
	          };
	
	          // HTML5 needs to at least have "canplay" fired before seeking.
	          if (s.isHTML5 && !s._html5_canplay) {
	
	            // this hasn't been loaded yet. load it first, and then do this again.
	            sm2._wD(fN + 'Beginning load for non-zero offset case');
	
	            s.load({
	              // note: custom HTML5-only event added for from/to implementation.
	              _oncanplay: onready
	            });
	
	            exit = false;
	
	          } else if (!s.isHTML5 && !s.loaded && (!s.readyState || s.readyState !== 2)) {
	
	            // to be safe, preload the whole thing in Flash.
	
	            sm2._wD(fN + 'Preloading for non-zero offset case');
	
	            s.load({
	              onload: onready
	            });
	
	            exit = false;
	
	          }
	
	          if (exit !== null) {
	            return exit;
	          }
	
	          // otherwise, we're ready to go. re-apply local options, and continue
	
	          s._iO = applyFromTo();
	
	        }
	
	        // sm2._wD(fN + 'Starting to play');
	
	        // increment instance counter, where enabled + supported
	        if (!s.instanceCount || s._iO.multiShotEvents || (s.isHTML5 && s._iO.multiShot && !useGlobalHTML5Audio) || (!s.isHTML5 && fV > 8 && !s.getAutoPlay())) {
	          s.instanceCount++;
	        }
	
	        // if first play and onposition parameters exist, apply them now
	        if (s._iO.onposition && s.playState === 0) {
	          attachOnPosition(s);
	        }
	
	        s.playState = 1;
	        s.paused = false;
	
	        s.position = (s._iO.position !== _undefined && !isNaN(s._iO.position) ? s._iO.position : 0);
	
	        if (!s.isHTML5) {
	          s._iO = policyFix(loopFix(s._iO));
	        }
	
	        if (s._iO.onplay && _updatePlayState) {
	          s._iO.onplay.apply(s);
	          onplay_called = true;
	        }
	
	        s.setVolume(s._iO.volume, true);
	        s.setPan(s._iO.pan, true);
	
	        if (!s.isHTML5) {
	
	          startOK = flash._start(s.id, s._iO.loops || 1, (fV === 9 ? s.position : s.position / msecScale), s._iO.multiShot || false);
	
	          if (fV === 9 && !startOK) {
	            // edge case: no sound hardware, or 32-channel flash ceiling hit.
	            // applies only to Flash 9, non-NetStream/MovieStar sounds.
	            // http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/media/Sound.html#play%28%29
	            sm2._wD(fN + 'No sound hardware, or 32-sound ceiling hit', 2);
	            if (s._iO.onplayerror) {
	              s._iO.onplayerror.apply(s);
	            }
	
	          }
	
	        } else {
	
	          if (s.instanceCount < 2) {
	
	            // HTML5 single-instance case
	
	            start_html5_timer();
	
	            a = s._setup_html5();
	
	            s.setPosition(s._iO.position);
	
	            a.play();
	
	          } else {
	
	            // HTML5 multi-shot case
	
	            sm2._wD(s.id + ': Cloning Audio() for instance #' + s.instanceCount + '...');
	
	            audioClone = new Audio(s._iO.url);
	
	            onended = function() {
	              event.remove(audioClone, 'ended', onended);
	              s._onfinish(s);
	              // cleanup
	              html5Unload(audioClone);
	              audioClone = null;
	            };
	
	            oncanplay = function() {
	              event.remove(audioClone, 'canplay', oncanplay);
	              try {
	                audioClone.currentTime = s._iO.position/msecScale;
	              } catch(err) {
	                complain(s.id + ': multiShot play() failed to apply position of ' + (s._iO.position/msecScale));
	              }
	              audioClone.play();
	            };
	
	            event.add(audioClone, 'ended', onended);
	
	            // apply volume to clones, too
	            if (s._iO.volume !== undefined) {
	              audioClone.volume = Math.max(0, Math.min(1, s._iO.volume/100));
	            }
	
	            // playing multiple muted sounds? if you do this, you're weird ;) - but let's cover it.
	            if (s.muted) {
	              audioClone.muted = true;
	            }
	
	            if (s._iO.position) {
	              // HTML5 audio can't seek before onplay() event has fired.
	              // wait for canplay, then seek to position and start playback.
	              event.add(audioClone, 'canplay', oncanplay);
	            } else {
	              // begin playback at currentTime: 0
	              audioClone.play();
	            }
	
	          }
	
	        }
	
	      }
	
	      return s;
	
	    };
	
	    // just for convenience
	    this.start = this.play;
	
	    /**
	     * Stops playing a sound (and optionally, all sounds)
	     *
	     * @param {boolean} bAll Optional: Whether to stop all sounds
	     * @return {SMSound} The SMSound object
	     */
	
	    this.stop = function(bAll) {
	
	      var instanceOptions = s._iO,
	          originalPosition;
	
	      if (s.playState === 1) {
	
	        sm2._wD(s.id + ': stop()');
	
	        s._onbufferchange(0);
	        s._resetOnPosition(0);
	        s.paused = false;
	
	        if (!s.isHTML5) {
	          s.playState = 0;
	        }
	
	        // remove onPosition listeners, if any
	        detachOnPosition();
	
	        // and "to" position, if set
	        if (instanceOptions.to) {
	          s.clearOnPosition(instanceOptions.to);
	        }
	
	        if (!s.isHTML5) {
	
	          flash._stop(s.id, bAll);
	
	          // hack for netStream: just unload
	          if (instanceOptions.serverURL) {
	            s.unload();
	          }
	
	        } else {
	
	          if (s._a) {
	
	            originalPosition = s.position;
	
	            // act like Flash, though
	            s.setPosition(0);
	
	            // hack: reflect old position for onstop() (also like Flash)
	            s.position = originalPosition;
	
	            // html5 has no stop()
	            // NOTE: pausing means iOS requires interaction to resume.
	            s._a.pause();
	
	            s.playState = 0;
	
	            // and update UI
	            s._onTimer();
	
	            stop_html5_timer();
	
	          }
	
	        }
	
	        s.instanceCount = 0;
	        s._iO = {};
	
	        if (instanceOptions.onstop) {
	          instanceOptions.onstop.apply(s);
	        }
	
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Undocumented/internal: Sets autoPlay for RTMP.
	     *
	     * @param {boolean} autoPlay state
	     */
	
	    this.setAutoPlay = function(autoPlay) {
	
	      sm2._wD(s.id + ': Autoplay turned ' + (autoPlay ? 'on' : 'off'));
	      s._iO.autoPlay = autoPlay;
	
	      if (!s.isHTML5) {
	        flash._setAutoPlay(s.id, autoPlay);
	        if (autoPlay) {
	          // only increment the instanceCount if the sound isn't loaded (TODO: verify RTMP)
	          if (!s.instanceCount && s.readyState === 1) {
	            s.instanceCount++;
	            sm2._wD(s.id + ': Incremented instance count to '+s.instanceCount);
	          }
	        }
	      }
	
	    };
	
	    /**
	     * Undocumented/internal: Returns the autoPlay boolean.
	     *
	     * @return {boolean} The current autoPlay value
	     */
	
	    this.getAutoPlay = function() {
	
	      return s._iO.autoPlay;
	
	    };
	
	    /**
	     * Sets the position of a sound.
	     *
	     * @param {number} nMsecOffset Position (milliseconds)
	     * @return {SMSound} The SMSound object
	     */
	
	    this.setPosition = function(nMsecOffset) {
	
	      if (nMsecOffset === _undefined) {
	        nMsecOffset = 0;
	      }
	
	      var position, position1K,
	          // Use the duration from the instance options, if we don't have a track duration yet.
	          // position >= 0 and <= current available (loaded) duration
	          offset = (s.isHTML5 ? Math.max(nMsecOffset, 0) : Math.min(s.duration || s._iO.duration, Math.max(nMsecOffset, 0)));
	
	      s.position = offset;
	      position1K = s.position/msecScale;
	      s._resetOnPosition(s.position);
	      s._iO.position = offset;
	
	      if (!s.isHTML5) {
	
	        position = (fV === 9 ? s.position : position1K);
	
	        if (s.readyState && s.readyState !== 2) {
	          // if paused or not playing, will not resume (by playing)
	          flash._setPosition(s.id, position, (s.paused || !s.playState), s._iO.multiShot);
	        }
	
	      } else if (s._a) {
	
	        // Set the position in the canplay handler if the sound is not ready yet
	        if (s._html5_canplay) {
	
	          if (s._a.currentTime !== position1K) {
	
	            /**
	             * DOM/JS errors/exceptions to watch out for:
	             * if seek is beyond (loaded?) position, "DOM exception 11"
	             * "INDEX_SIZE_ERR": DOM exception 1
	             */
	            sm2._wD(s.id + ': setPosition('+position1K+')');
	
	            try {
	              s._a.currentTime = position1K;
	              if (s.playState === 0 || s.paused) {
	                // allow seek without auto-play/resume
	                s._a.pause();
	              }
	            } catch(e) {
	              sm2._wD(s.id + ': setPosition(' + position1K + ') failed: ' + e.message, 2);
	            }
	
	          }
	
	        } else if (position1K) {
	
	          // warn on non-zero seek attempts
	          sm2._wD(s.id + ': setPosition(' + position1K + '): Cannot seek yet, sound not ready', 2);
	          return s;
	
	        }
	
	        if (s.paused) {
	
	          // if paused, refresh UI right away
	          // force update
	          s._onTimer(true);
	
	        }
	
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Pauses sound playback.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.pause = function(_bCallFlash) {
	
	      if (s.paused || (s.playState === 0 && s.readyState !== 1)) {
	        return s;
	      }
	
	      sm2._wD(s.id + ': pause()');
	      s.paused = true;
	
	      if (!s.isHTML5) {
	        if (_bCallFlash || _bCallFlash === _undefined) {
	          flash._pause(s.id, s._iO.multiShot);
	        }
	      } else {
	        s._setup_html5().pause();
	        stop_html5_timer();
	      }
	
	      if (s._iO.onpause) {
	        s._iO.onpause.apply(s);
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Resumes sound playback.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    /**
	     * When auto-loaded streams pause on buffer full they have a playState of 0.
	     * We need to make sure that the playState is set to 1 when these streams "resume".
	     * When a paused stream is resumed, we need to trigger the onplay() callback if it
	     * hasn't been called already. In this case since the sound is being played for the
	     * first time, I think it's more appropriate to call onplay() rather than onresume().
	     */
	
	    this.resume = function() {
	
	      var instanceOptions = s._iO;
	
	      if (!s.paused) {
	        return s;
	      }
	
	      sm2._wD(s.id + ': resume()');
	      s.paused = false;
	      s.playState = 1;
	
	      if (!s.isHTML5) {
	        if (instanceOptions.isMovieStar && !instanceOptions.serverURL) {
	          // Bizarre Webkit bug (Chrome reported via 8tracks.com dudes): AAC content paused for 30+ seconds(?) will not resume without a reposition.
	          s.setPosition(s.position);
	        }
	        // flash method is toggle-based (pause/resume)
	        flash._pause(s.id, instanceOptions.multiShot);
	      } else {
	        s._setup_html5().play();
	        start_html5_timer();
	      }
	
	      if (!onplay_called && instanceOptions.onplay) {
	        instanceOptions.onplay.apply(s);
	        onplay_called = true;
	      } else if (instanceOptions.onresume) {
	        instanceOptions.onresume.apply(s);
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Toggles sound playback.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.togglePause = function() {
	
	      sm2._wD(s.id + ': togglePause()');
	
	      if (s.playState === 0) {
	        s.play({
	          position: (fV === 9 && !s.isHTML5 ? s.position : s.position / msecScale)
	        });
	        return s;
	      }
	
	      if (s.paused) {
	        s.resume();
	      } else {
	        s.pause();
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Sets the panning (L-R) effect.
	     *
	     * @param {number} nPan The pan value (-100 to 100)
	     * @return {SMSound} The SMSound object
	     */
	
	    this.setPan = function(nPan, bInstanceOnly) {
	
	      if (nPan === _undefined) {
	        nPan = 0;
	      }
	
	      if (bInstanceOnly === _undefined) {
	        bInstanceOnly = false;
	      }
	
	      if (!s.isHTML5) {
	        flash._setPan(s.id, nPan);
	      } // else { no HTML5 pan? }
	
	      s._iO.pan = nPan;
	
	      if (!bInstanceOnly) {
	        s.pan = nPan;
	        s.options.pan = nPan;
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Sets the volume.
	     *
	     * @param {number} nVol The volume value (0 to 100)
	     * @return {SMSound} The SMSound object
	     */
	
	    this.setVolume = function(nVol, _bInstanceOnly) {
	
	      /**
	       * Note: Setting volume has no effect on iOS "special snowflake" devices.
	       * Hardware volume control overrides software, and volume
	       * will always return 1 per Apple docs. (iOS 4 + 5.)
	       * http://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/HTML-canvas-guide/AddingSoundtoCanvasAnimations/AddingSoundtoCanvasAnimations.html
	       */
	
	      if (nVol === _undefined) {
	        nVol = 100;
	      }
	
	      if (_bInstanceOnly === _undefined) {
	        _bInstanceOnly = false;
	      }
	
	      if (!s.isHTML5) {
	        flash._setVolume(s.id, (sm2.muted && !s.muted) || s.muted?0:nVol);
	      } else if (s._a) {
	        if (sm2.muted && !s.muted) {
	          s.muted = true;
	          s._a.muted = true;
	        }
	        // valid range: 0-1
	        s._a.volume = Math.max(0, Math.min(1, nVol/100));
	      }
	
	      s._iO.volume = nVol;
	
	      if (!_bInstanceOnly) {
	        s.volume = nVol;
	        s.options.volume = nVol;
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Mutes the sound.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.mute = function() {
	
	      s.muted = true;
	
	      if (!s.isHTML5) {
	        flash._setVolume(s.id, 0);
	      } else if (s._a) {
	        s._a.muted = true;
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Unmutes the sound.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.unmute = function() {
	
	      s.muted = false;
	      var hasIO = (s._iO.volume !== _undefined);
	
	      if (!s.isHTML5) {
	        flash._setVolume(s.id, hasIO?s._iO.volume:s.options.volume);
	      } else if (s._a) {
	        s._a.muted = false;
	      }
	
	      return s;
	
	    };
	
	    /**
	     * Toggles the muted state of a sound.
	     *
	     * @return {SMSound} The SMSound object
	     */
	
	    this.toggleMute = function() {
	
	      return (s.muted?s.unmute():s.mute());
	
	    };
	
	    /**
	     * Registers a callback to be fired when a sound reaches a given position during playback.
	     *
	     * @param {number} nPosition The position to watch for
	     * @param {function} oMethod The relevant callback to fire
	     * @param {object} oScope Optional: The scope to apply the callback to
	     * @return {SMSound} The SMSound object
	     */
	
	    this.onPosition = function(nPosition, oMethod, oScope) {
	
	      // TODO: basic dupe checking?
	
	      onPositionItems.push({
	        position: parseInt(nPosition, 10),
	        method: oMethod,
	        scope: (oScope !== _undefined ? oScope : s),
	        fired: false
	      });
	
	      return s;
	
	    };
	
	    // legacy/backwards-compability: lower-case method name
	    this.onposition = this.onPosition;
	
	    /**
	     * Removes registered callback(s) from a sound, by position and/or callback.
	     *
	     * @param {number} nPosition The position to clear callback(s) for
	     * @param {function} oMethod Optional: Identify one callback to be removed when multiple listeners exist for one position
	     * @return {SMSound} The SMSound object
	     */
	
	    this.clearOnPosition = function(nPosition, oMethod) {
	
	      var i;
	
	      nPosition = parseInt(nPosition, 10);
	
	      if (isNaN(nPosition)) {
	        // safety check
	        return false;
	      }
	
	      for (i=0; i < onPositionItems.length; i++) {
	
	        if (nPosition === onPositionItems[i].position) {
	          // remove this item if no method was specified, or, if the method matches
	          if (!oMethod || (oMethod === onPositionItems[i].method)) {
	            if (onPositionItems[i].fired) {
	              // decrement "fired" counter, too
	              onPositionFired--;
	            }
	            onPositionItems.splice(i, 1);
	          }
	        }
	
	      }
	
	    };
	
	    this._processOnPosition = function() {
	
	      var i, item, j = onPositionItems.length;
	
	      if (!j || !s.playState || onPositionFired >= j) {
	        return false;
	      }
	
	      for (i=j-1; i >= 0; i--) {
	        item = onPositionItems[i];
	        if (!item.fired && s.position >= item.position) {
	          item.fired = true;
	          onPositionFired++;
	          item.method.apply(item.scope, [item.position]);
			  j = onPositionItems.length; //  reset j -- onPositionItems.length can be changed in the item callback above... occasionally breaking the loop.
	        }
	      }
	
	      return true;
	
	    };
	
	    this._resetOnPosition = function(nPosition) {
	
	      // reset "fired" for items interested in this position
	      var i, item, j = onPositionItems.length;
	
	      if (!j) {
	        return false;
	      }
	
	      for (i=j-1; i >= 0; i--) {
	        item = onPositionItems[i];
	        if (item.fired && nPosition <= item.position) {
	          item.fired = false;
	          onPositionFired--;
	        }
	      }
	
	      return true;
	
	    };
	
	    /**
	     * SMSound() private internals
	     * --------------------------------
	     */
	
	    applyFromTo = function() {
	
	      var instanceOptions = s._iO,
	          f = instanceOptions.from,
	          t = instanceOptions.to,
	          start, end;
	
	      end = function() {
	
	        // end has been reached.
	        sm2._wD(s.id + ': "To" time of ' + t + ' reached.');
	
	        // detach listener
	        s.clearOnPosition(t, end);
	
	        // stop should clear this, too
	        s.stop();
	
	      };
	
	      start = function() {
	
	        sm2._wD(s.id + ': Playing "from" ' + f);
	
	        // add listener for end
	        if (t !== null && !isNaN(t)) {
	          s.onPosition(t, end);
	        }
	
	      };
	
	      if (f !== null && !isNaN(f)) {
	
	        // apply to instance options, guaranteeing correct start position.
	        instanceOptions.position = f;
	
	        // multiShot timing can't be tracked, so prevent that.
	        instanceOptions.multiShot = false;
	
	        start();
	
	      }
	
	      // return updated instanceOptions including starting position
	      return instanceOptions;
	
	    };
	
	    attachOnPosition = function() {
	
	      var item,
	          op = s._iO.onposition;
	
	      // attach onposition things, if any, now.
	
	      if (op) {
	
	        for (item in op) {
	          if (op.hasOwnProperty(item)) {
	            s.onPosition(parseInt(item, 10), op[item]);
	          }
	        }
	
	      }
	
	    };
	
	    detachOnPosition = function() {
	
	      var item,
	          op = s._iO.onposition;
	
	      // detach any onposition()-style listeners.
	
	      if (op) {
	
	        for (item in op) {
	          if (op.hasOwnProperty(item)) {
	            s.clearOnPosition(parseInt(item, 10));
	          }
	        }
	
	      }
	
	    };
	
	    start_html5_timer = function() {
	
	      if (s.isHTML5) {
	        startTimer(s);
	      }
	
	    };
	
	    stop_html5_timer = function() {
	
	      if (s.isHTML5) {
	        stopTimer(s);
	      }
	
	    };
	
	    resetProperties = function(retainPosition) {
	
	      if (!retainPosition) {
	        onPositionItems = [];
	        onPositionFired = 0;
	      }
	
	      onplay_called = false;
	
	      s._hasTimer = null;
	      s._a = null;
	      s._html5_canplay = false;
	      s.bytesLoaded = null;
	      s.bytesTotal = null;
	      s.duration = (s._iO && s._iO.duration ? s._iO.duration : null);
	      s.durationEstimate = null;
	      s.buffered = [];
	
	      // legacy: 1D array
	      s.eqData = [];
	
	      s.eqData.left = [];
	      s.eqData.right = [];
	
	      s.failures = 0;
	      s.isBuffering = false;
	      s.instanceOptions = {};
	      s.instanceCount = 0;
	      s.loaded = false;
	      s.metadata = {};
	
	      // 0 = uninitialised, 1 = loading, 2 = failed/error, 3 = loaded/success
	      s.readyState = 0;
	
	      s.muted = false;
	      s.paused = false;
	
	      s.peakData = {
	        left: 0,
	        right: 0
	      };
	
	      s.waveformData = {
	        left: [],
	        right: []
	      };
	
	      s.playState = 0;
	      s.position = null;
	
	      s.id3 = {};
	
	    };
	
	    resetProperties();
	
	    /**
	     * Pseudo-private SMSound internals
	     * --------------------------------
	     */
	
	    this._onTimer = function(bForce) {
	
	      /**
	       * HTML5-only _whileplaying() etc.
	       * called from both HTML5 native events, and polling/interval-based timers
	       * mimics flash and fires only when time/duration change, so as to be polling-friendly
	       */
	
	      var duration, isNew = false, time, x = {};
	
	      if (s._hasTimer || bForce) {
	
	        // TODO: May not need to track readyState (1 = loading)
	
	        if (s._a && (bForce || ((s.playState > 0 || s.readyState === 1) && !s.paused))) {
	
	          duration = s._get_html5_duration();
	
	          if (duration !== lastHTML5State.duration) {
	
	            lastHTML5State.duration = duration;
	            s.duration = duration;
	            isNew = true;
	
	          }
	
	          // TODO: investigate why this goes wack if not set/re-set each time.
	          s.durationEstimate = s.duration;
	
	          time = (s._a.currentTime * msecScale || 0);
	
	          if (time !== lastHTML5State.time) {
	
	            lastHTML5State.time = time;
	            isNew = true;
	
	          }
	
	          if (isNew || bForce) {
	
	            s._whileplaying(time,x,x,x,x);
	
	          }
	
	        }/* else {
	
	          // sm2._wD('_onTimer: Warn for "'+s.id+'": '+(!s._a?'Could not find element. ':'')+(s.playState === 0?'playState bad, 0?':'playState = '+s.playState+', OK'));
	
	          return false;
	
	        }*/
	
	        return isNew;
	
	      }
	
	    };
	
	    this._get_html5_duration = function() {
	
	      var instanceOptions = s._iO,
	          // if audio object exists, use its duration - else, instance option duration (if provided - it's a hack, really, and should be retired) OR null
	          d = (s._a && s._a.duration ? s._a.duration*msecScale : (instanceOptions && instanceOptions.duration ? instanceOptions.duration : null)),
	          result = (d && !isNaN(d) && d !== Infinity ? d : null);
	
	      return result;
	
	    };
	
	    this._apply_loop = function(a, nLoops) {
	
	      /**
	       * boolean instead of "loop", for webkit? - spec says string. http://www.w3.org/TR/html-markup/audio.html#audio.attrs.loop
	       * note that loop is either off or infinite under HTML5, unlike Flash which allows arbitrary loop counts to be specified.
	       */
	
	      // <d>
	      if (!a.loop && nLoops > 1) {
	        sm2._wD('Note: Native HTML5 looping is infinite.', 1);
	      }
	      // </d>
	
	      a.loop = (nLoops > 1 ? 'loop' : '');
	
	    };
	
	    this._setup_html5 = function(oOptions) {
	
	      var instanceOptions = mixin(s._iO, oOptions),
	          a = useGlobalHTML5Audio ? globalHTML5Audio : s._a,
	          dURL = decodeURI(instanceOptions.url),
	          sameURL;
	
	      /**
	       * "First things first, I, Poppa..." (reset the previous state of the old sound, if playing)
	       * Fixes case with devices that can only play one sound at a time
	       * Otherwise, other sounds in mid-play will be terminated without warning and in a stuck state
	       */
	
	      if (useGlobalHTML5Audio) {
	
	        if (dURL === decodeURI(lastGlobalHTML5URL)) {
	          // global HTML5 audio: re-use of URL
	          sameURL = true;
	        }
	
	      } else if (dURL === decodeURI(lastURL)) {
	
	        // options URL is the same as the "last" URL, and we used (loaded) it
	        sameURL = true;
	
	      }
	
	      if (a) {
	
	        if (a._s) {
	
	          if (useGlobalHTML5Audio) {
	
	            if (a._s && a._s.playState && !sameURL) {
	
	              // global HTML5 audio case, and loading a new URL. stop the currently-playing one.
	              a._s.stop();
	
	            }
	
	          } else if (!useGlobalHTML5Audio && dURL === decodeURI(lastURL)) {
	
	            // non-global HTML5 reuse case: same url, ignore request
	            s._apply_loop(a, instanceOptions.loops);
	
	            return a;
	
	          }
	
	        }
	
	        if (!sameURL) {
	
	          // don't retain onPosition() stuff with new URLs.
	
	          if (lastURL) {
	            resetProperties(false);
	          }
	
	          // assign new HTML5 URL
	
	          a.src = instanceOptions.url;
	
	          s.url = instanceOptions.url;
	
	          lastURL = instanceOptions.url;
	
	          lastGlobalHTML5URL = instanceOptions.url;
	
	          a._called_load = false;
	
	        }
	
	      } else {
	
	        if (instanceOptions.autoLoad || instanceOptions.autoPlay) {
	
	          s._a = new Audio(instanceOptions.url);
	          s._a.load();
	
	        } else {
	
	          // null for stupid Opera 9.64 case
	          s._a = (isOpera && opera.version() < 10 ? new Audio(null) : new Audio());
	
	        }
	
	        // assign local reference
	        a = s._a;
	
	        a._called_load = false;
	
	        if (useGlobalHTML5Audio) {
	
	          globalHTML5Audio = a;
	
	        }
	
	      }
	
	      s.isHTML5 = true;
	
	      // store a ref on the track
	      s._a = a;
	
	      // store a ref on the audio
	      a._s = s;
	
	      add_html5_events();
	
	      s._apply_loop(a, instanceOptions.loops);
	
	      if (instanceOptions.autoLoad || instanceOptions.autoPlay) {
	
	        s.load();
	
	      } else {
	
	        // early HTML5 implementation (non-standard)
	        a.autobuffer = false;
	
	        // standard ('none' is also an option.)
	        a.preload = 'auto';
	
	      }
	
	      return a;
	
	    };
	
	    add_html5_events = function() {
	
	      if (s._a._added_events) {
	        return false;
	      }
	
	      var f;
	
	      function add(oEvt, oFn, bCapture) {
	        return s._a ? s._a.addEventListener(oEvt, oFn, bCapture||false) : null;
	      }
	
	      s._a._added_events = true;
	
	      for (f in html5_events) {
	        if (html5_events.hasOwnProperty(f)) {
	          add(f, html5_events[f]);
	        }
	      }
	
	      return true;
	
	    };
	
	    remove_html5_events = function() {
	
	      // Remove event listeners
	
	      var f;
	
	      function remove(oEvt, oFn, bCapture) {
	        return (s._a ? s._a.removeEventListener(oEvt, oFn, bCapture||false) : null);
	      }
	
	      sm2._wD(s.id + ': Removing event listeners');
	      s._a._added_events = false;
	
	      for (f in html5_events) {
	        if (html5_events.hasOwnProperty(f)) {
	          remove(f, html5_events[f]);
	        }
	      }
	
	    };
	
	    /**
	     * Pseudo-private event internals
	     * ------------------------------
	     */
	
	    this._onload = function(nSuccess) {
	
	      var fN,
	          // check for duration to prevent false positives from flash 8 when loading from cache.
	          loadOK = !!nSuccess || (!s.isHTML5 && fV === 8 && s.duration);
	
	      // <d>
	      fN = s.id + ': ';
	      sm2._wD(fN + (loadOK ? 'onload()' : 'Failed to load / invalid sound?' + (!s.duration ? ' Zero-length duration reported.' : ' -') + ' (' + s.url + ')'), (loadOK ? 1 : 2));
	      if (!loadOK && !s.isHTML5) {
	        if (sm2.sandbox.noRemote === true) {
	          sm2._wD(fN + str('noNet'), 1);
	        }
	        if (sm2.sandbox.noLocal === true) {
	          sm2._wD(fN + str('noLocal'), 1);
	        }
	      }
	      // </d>
	
	      s.loaded = loadOK;
	      s.readyState = loadOK?3:2;
	      s._onbufferchange(0);
	
	      if (s._iO.onload) {
	        wrapCallback(s, function() {
	          s._iO.onload.apply(s, [loadOK]);
	        });
	      }
	
	      return true;
	
	    };
	
	    this._onbufferchange = function(nIsBuffering) {
	
	      if (s.playState === 0) {
	        // ignore if not playing
	        return false;
	      }
	
	      if ((nIsBuffering && s.isBuffering) || (!nIsBuffering && !s.isBuffering)) {
	        return false;
	      }
	
	      s.isBuffering = (nIsBuffering === 1);
	      if (s._iO.onbufferchange) {
	        sm2._wD(s.id + ': Buffer state change: ' + nIsBuffering);
	        s._iO.onbufferchange.apply(s, [nIsBuffering]);
	      }
	
	      return true;
	
	    };
	
	    /**
	     * Playback may have stopped due to buffering, or related reason.
	     * This state can be encountered on iOS < 6 when auto-play is blocked.
	     */
	
	    this._onsuspend = function() {
	
	      if (s._iO.onsuspend) {
	        sm2._wD(s.id + ': Playback suspended');
	        s._iO.onsuspend.apply(s);
	      }
	
	      return true;
	
	    };
	
	    /**
	     * flash 9/movieStar + RTMP-only method, should fire only once at most
	     * at this point we just recreate failed sounds rather than trying to reconnect
	     */
	
	    this._onfailure = function(msg, level, code) {
	
	      s.failures++;
	      sm2._wD(s.id + ': Failure (' + s.failures + '): ' + msg);
	
	      if (s._iO.onfailure && s.failures === 1) {
	        s._iO.onfailure(msg, level, code);
	      } else {
	        sm2._wD(s.id + ': Ignoring failure');
	      }
	
	    };
	
	    /**
	     * flash 9/movieStar + RTMP-only method for unhandled warnings/exceptions from Flash
	     * e.g., RTMP "method missing" warning (non-fatal) for getStreamLength on server
	     */
	
	    this._onwarning = function(msg, level, code) {
	
	      if (s._iO.onwarning) {
	        s._iO.onwarning(msg, level, code);
	      }
	
	    };
	
	    this._onfinish = function() {
	
	      // store local copy before it gets trashed...
	      var io_onfinish = s._iO.onfinish;
	
	      s._onbufferchange(0);
	      s._resetOnPosition(0);
	
	      // reset some state items
	      if (s.instanceCount) {
	
	        s.instanceCount--;
	
	        if (!s.instanceCount) {
	
	          // remove onPosition listeners, if any
	          detachOnPosition();
	
	          // reset instance options
	          s.playState = 0;
	          s.paused = false;
	          s.instanceCount = 0;
	          s.instanceOptions = {};
	          s._iO = {};
	          stop_html5_timer();
	
	          // reset position, too
	          if (s.isHTML5) {
	            s.position = 0;
	          }
	
	        }
	
	        if (!s.instanceCount || s._iO.multiShotEvents) {
	          // fire onfinish for last, or every instance
	          if (io_onfinish) {
	            sm2._wD(s.id + ': onfinish()');
	            wrapCallback(s, function() {
	              io_onfinish.apply(s);
	            });
	          }
	        }
	
	      }
	
	    };
	
	    this._whileloading = function(nBytesLoaded, nBytesTotal, nDuration, nBufferLength) {
	
	      var instanceOptions = s._iO;
	
	      s.bytesLoaded = nBytesLoaded;
	      s.bytesTotal = nBytesTotal;
	      s.duration = Math.floor(nDuration);
	      s.bufferLength = nBufferLength;
	
	      if (!s.isHTML5 && !instanceOptions.isMovieStar) {
	
	        if (instanceOptions.duration) {
	          // use duration from options, if specified and larger. nobody should be specifying duration in options, actually, and it should be retired.
	          s.durationEstimate = (s.duration > instanceOptions.duration) ? s.duration : instanceOptions.duration;
	        } else {
	          s.durationEstimate = parseInt((s.bytesTotal / s.bytesLoaded) * s.duration, 10);
	        }
	
	      } else {
	
	        s.durationEstimate = s.duration;
	
	      }
	
	      // for flash, reflect sequential-load-style buffering
	      if (!s.isHTML5) {
	        s.buffered = [{
	          'start': 0,
	          'end': s.duration
	        }];
	      }
	
	      // allow whileloading to fire even if "load" fired under HTML5, due to HTTP range/partials
	      if ((s.readyState !== 3 || s.isHTML5) && instanceOptions.whileloading) {
	        instanceOptions.whileloading.apply(s);
	      }
	
	    };
	
	    this._whileplaying = function(nPosition, oPeakData, oWaveformDataLeft, oWaveformDataRight, oEQData) {
	
	      var instanceOptions = s._iO,
	          eqLeft;
	
	      if (isNaN(nPosition) || nPosition === null) {
	        // flash safety net
	        return false;
	      }
	
	      // Safari HTML5 play() may return small -ve values when starting from position: 0, eg. -50.120396875. Unexpected/invalid per W3, I think. Normalize to 0.
	      s.position = Math.max(0, nPosition);
	
	      s._processOnPosition();
	
	      if (!s.isHTML5 && fV > 8) {
	
	        if (instanceOptions.usePeakData && oPeakData !== _undefined && oPeakData) {
	          s.peakData = {
	            left: oPeakData.leftPeak,
	            right: oPeakData.rightPeak
	          };
	        }
	
	        if (instanceOptions.useWaveformData && oWaveformDataLeft !== _undefined && oWaveformDataLeft) {
	          s.waveformData = {
	            left: oWaveformDataLeft.split(','),
	            right: oWaveformDataRight.split(',')
	          };
	        }
	
	        if (instanceOptions.useEQData) {
	          if (oEQData !== _undefined && oEQData && oEQData.leftEQ) {
	            eqLeft = oEQData.leftEQ.split(',');
	            s.eqData = eqLeft;
	            s.eqData.left = eqLeft;
	            if (oEQData.rightEQ !== _undefined && oEQData.rightEQ) {
	              s.eqData.right = oEQData.rightEQ.split(',');
	            }
	          }
	        }
	
	      }
	
	      if (s.playState === 1) {
	
	        // special case/hack: ensure buffering is false if loading from cache (and not yet started)
	        if (!s.isHTML5 && fV === 8 && !s.position && s.isBuffering) {
	          s._onbufferchange(0);
	        }
	
	        if (instanceOptions.whileplaying) {
	          // flash may call after actual finish
	          instanceOptions.whileplaying.apply(s);
	        }
	
	      }
	
	      return true;
	
	    };
	
	    this._oncaptiondata = function(oData) {
	
	      /**
	       * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature
	       *
	       * @param {object} oData
	       */
	
	      sm2._wD(s.id + ': Caption data received.');
	
	      s.captiondata = oData;
	
	      if (s._iO.oncaptiondata) {
	        s._iO.oncaptiondata.apply(s, [oData]);
	      }
	
	    };
	
	    this._onmetadata = function(oMDProps, oMDData) {
	
	      /**
	       * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature
	       * RTMP may include song title, MovieStar content may include encoding info
	       *
	       * @param {array} oMDProps (names)
	       * @param {array} oMDData (values)
	       */
	
	      sm2._wD(s.id + ': Metadata received.');
	
	      var oData = {}, i, j;
	
	      for (i = 0, j = oMDProps.length; i < j; i++) {
	        oData[oMDProps[i]] = oMDData[i];
	      }
	      s.metadata = oData;
	
	      if (s._iO.onmetadata) {
	        s._iO.onmetadata.call(s, s.metadata);
	      }
	
	    };
	
	    this._onid3 = function(oID3Props, oID3Data) {
	
	      /**
	       * internal: flash 8 + flash 9 ID3 feature
	       * may include artist, song title etc.
	       *
	       * @param {array} oID3Props (names)
	       * @param {array} oID3Data (values)
	       */
	
	      sm2._wD(s.id + ': ID3 data received.');
	
	      var oData = [], i, j;
	
	      for (i = 0, j = oID3Props.length; i < j; i++) {
	        oData[oID3Props[i]] = oID3Data[i];
	      }
	      s.id3 = mixin(s.id3, oData);
	
	      if (s._iO.onid3) {
	        s._iO.onid3.apply(s);
	      }
	
	    };
	
	    // flash/RTMP-only
	
	    this._onconnect = function(bSuccess) {
	
	      bSuccess = (bSuccess === 1);
	      sm2._wD(s.id + ': ' + (bSuccess ? 'Connected.' : 'Failed to connect? - ' + s.url), (bSuccess ? 1 : 2));
	      s.connected = bSuccess;
	
	      if (bSuccess) {
	
	        s.failures = 0;
	
	        if (idCheck(s.id)) {
	          if (s.getAutoPlay()) {
	            // only update the play state if auto playing
	            s.play(_undefined, s.getAutoPlay());
	          } else if (s._iO.autoLoad) {
	            s.load();
	          }
	        }
	
	        if (s._iO.onconnect) {
	          s._iO.onconnect.apply(s, [bSuccess]);
	        }
	
	      }
	
	    };
	
	    this._ondataerror = function(sError) {
	
	      // flash 9 wave/eq data handler
	      // hack: called at start, and end from flash at/after onfinish()
	      if (s.playState > 0) {
	        sm2._wD(s.id + ': Data error: ' + sError);
	        if (s._iO.ondataerror) {
	          s._iO.ondataerror.apply(s);
	        }
	      }
	
	    };
	
	    // <d>
	    this._debug();
	    // </d>
	
	  }; // SMSound()
	
	  /**
	   * Private SoundManager internals
	   * ------------------------------
	   */
	
	  getDocument = function() {
	
	    return (doc.body || doc.getElementsByTagName('div')[0]);
	
	  };
	
	  id = function(sID) {
	
	    return doc.getElementById(sID);
	
	  };
	
	  mixin = function(oMain, oAdd) {
	
	    // non-destructive merge
	    var o1 = (oMain || {}), o2, o;
	
	    // if unspecified, o2 is the default options object
	    o2 = (oAdd === _undefined ? sm2.defaultOptions : oAdd);
	
	    for (o in o2) {
	
	      if (o2.hasOwnProperty(o) && o1[o] === _undefined) {
	
	        if (typeof o2[o] !== 'object' || o2[o] === null) {
	
	          // assign directly
	          o1[o] = o2[o];
	
	        } else {
	
	          // recurse through o2
	          o1[o] = mixin(o1[o], o2[o]);
	
	        }
	
	      }
	
	    }
	
	    return o1;
	
	  };
	
	  wrapCallback = function(oSound, callback) {
	
	    /**
	     * 03/03/2013: Fix for Flash Player 11.6.602.171 + Flash 8 (flashVersion = 8) SWF issue
	     * setTimeout() fix for certain SMSound callbacks like onload() and onfinish(), where subsequent calls like play() and load() fail when Flash Player 11.6.602.171 is installed, and using soundManager with flashVersion = 8 (which is the default).
	     * Not sure of exact cause. Suspect race condition and/or invalid (NaN-style) position argument trickling down to the next JS -> Flash _start() call, in the play() case.
	     * Fix: setTimeout() to yield, plus safer null / NaN checking on position argument provided to Flash.
	     * https://getsatisfaction.com/schillmania/topics/recent_chrome_update_seems_to_have_broken_my_sm2_audio_player
	     */
	    if (!oSound.isHTML5 && fV === 8) {
	      window.setTimeout(callback, 0);
	    } else {
	      callback();
	    }
	
	  };
	
	  // additional soundManager properties that soundManager.setup() will accept
	
	  extraOptions = {
	    'onready': 1,
	    'ontimeout': 1,
	    'defaultOptions': 1,
	    'flash9Options': 1,
	    'movieStarOptions': 1
	  };
	
	  assign = function(o, oParent) {
	
	    /**
	     * recursive assignment of properties, soundManager.setup() helper
	     * allows property assignment based on whitelist
	     */
	
	    var i,
	        result = true,
	        hasParent = (oParent !== _undefined),
	        setupOptions = sm2.setupOptions,
	        bonusOptions = extraOptions;
	
	    // <d>
	
	    // if soundManager.setup() called, show accepted parameters.
	
	    if (o === _undefined) {
	
	      result = [];
	
	      for (i in setupOptions) {
	
	        if (setupOptions.hasOwnProperty(i)) {
	          result.push(i);
	        }
	
	      }
	
	      for (i in bonusOptions) {
	
	        if (bonusOptions.hasOwnProperty(i)) {
	
	          if (typeof sm2[i] === 'object') {
	
	            result.push(i+': {...}');
	
	          } else if (sm2[i] instanceof Function) {
	
	            result.push(i+': function() {...}');
	
	          } else {
	
	            result.push(i);
	
	          }
	
	        }
	
	      }
	
	      sm2._wD(str('setup', result.join(', ')));
	
	      return false;
	
	    }
	
	    // </d>
	
	    for (i in o) {
	
	      if (o.hasOwnProperty(i)) {
	
	        // if not an {object} we want to recurse through...
	
	        if (typeof o[i] !== 'object' || o[i] === null || o[i] instanceof Array || o[i] instanceof RegExp) {
	
	          // check "allowed" options
	
	          if (hasParent && bonusOptions[oParent] !== _undefined) {
	
	            // valid recursive / nested object option, eg., { defaultOptions: { volume: 50 } }
	            sm2[oParent][i] = o[i];
	
	          } else if (setupOptions[i] !== _undefined) {
	
	            // special case: assign to setupOptions object, which soundManager property references
	            sm2.setupOptions[i] = o[i];
	
	            // assign directly to soundManager, too
	            sm2[i] = o[i];
	
	          } else if (bonusOptions[i] === _undefined) {
	
	            // invalid or disallowed parameter. complain.
	            complain(str((sm2[i] === _undefined ? 'setupUndef' : 'setupError'), i), 2);
	
	            result = false;
	
	          } else {
	
	            /**
	             * valid extraOptions (bonusOptions) parameter.
	             * is it a method, like onready/ontimeout? call it.
	             * multiple parameters should be in an array, eg. soundManager.setup({onready: [myHandler, myScope]});
	             */
	
	            if (sm2[i] instanceof Function) {
	
	              sm2[i].apply(sm2, (o[i] instanceof Array? o[i] : [o[i]]));
	
	            } else {
	
	              // good old-fashioned direct assignment
	              sm2[i] = o[i];
	
	            }
	
	          }
	
	        } else {
	
	          // recursion case, eg., { defaultOptions: { ... } }
	
	          if (bonusOptions[i] === _undefined) {
	
	            // invalid or disallowed parameter. complain.
	            complain(str((sm2[i] === _undefined ? 'setupUndef' : 'setupError'), i), 2);
	
	            result = false;
	
	          } else {
	
	            // recurse through object
	            return assign(o[i], i);
	
	          }
	
	        }
	
	      }
	
	    }
	
	    return result;
	
	  };
	
	  function preferFlashCheck(kind) {
	
	    // whether flash should play a given type
	    return (sm2.preferFlash && hasFlash && !sm2.ignoreFlash && (sm2.flash[kind] !== _undefined && sm2.flash[kind]));
	
	  }
	
	  /**
	   * Internal DOM2-level event helpers
	   * ---------------------------------
	   */
	
	  event = (function() {
	
	    // normalize event methods
	    var old = (window.attachEvent),
	    evt = {
	      add: (old?'attachEvent':'addEventListener'),
	      remove: (old?'detachEvent':'removeEventListener')
	    };
	
	    // normalize "on" event prefix, optional capture argument
	    function getArgs(oArgs) {
	
	      var args = slice.call(oArgs),
	          len = args.length;
	
	      if (old) {
	        // prefix
	        args[1] = 'on' + args[1];
	        if (len > 3) {
	          // no capture
	          args.pop();
	        }
	      } else if (len === 3) {
	        args.push(false);
	      }
	
	      return args;
	
	    }
	
	    function apply(args, sType) {
	
	      // normalize and call the event method, with the proper arguments
	      var element = args.shift(),
	          method = [evt[sType]];
	
	      if (old) {
	        // old IE can't do apply().
	        element[method](args[0], args[1]);
	      } else {
	        element[method].apply(element, args);
	      }
	
	    }
	
	    function add() {
	
	      apply(getArgs(arguments), 'add');
	
	    }
	
	    function remove() {
	
	      apply(getArgs(arguments), 'remove');
	
	    }
	
	    return {
	      'add': add,
	      'remove': remove
	    };
	
	  }());
	
	  /**
	   * Internal HTML5 event handling
	   * -----------------------------
	   */
	
	  function html5_event(oFn) {
	
	    // wrap html5 event handlers so we don't call them on destroyed and/or unloaded sounds
	
	    return function(e) {
	
	      var s = this._s,
	          result;
	
	      if (!s || !s._a) {
	        // <d>
	        if (s && s.id) {
	          sm2._wD(s.id + ': Ignoring ' + e.type);
	        } else {
	          sm2._wD(h5 + 'Ignoring ' + e.type);
	        }
	        // </d>
	        result = null;
	      } else {
	        result = oFn.call(this, e);
	      }
	
	      return result;
	
	    };
	
	  }
	
	  html5_events = {
	
	    // HTML5 event-name-to-handler map
	
	    abort: html5_event(function() {
	
	      sm2._wD(this._s.id + ': abort');
	
	    }),
	
	    // enough has loaded to play
	
	    canplay: html5_event(function() {
	
	      var s = this._s,
	          position1K;
	
	      if (s._html5_canplay) {
	        // this event has already fired. ignore.
	        return true;
	      }
	
	      s._html5_canplay = true;
	      sm2._wD(s.id + ': canplay');
	      s._onbufferchange(0);
	
	      // position according to instance options
	      position1K = (s._iO.position !== _undefined && !isNaN(s._iO.position) ? s._iO.position/msecScale : null);
	
	      // set the position if position was provided before the sound loaded
	      if (this.currentTime !== position1K) {
	        sm2._wD(s.id + ': canplay: Setting position to ' + position1K);
	        try {
	          this.currentTime = position1K;
	        } catch(ee) {
	          sm2._wD(s.id + ': canplay: Setting position of ' + position1K + ' failed: ' + ee.message, 2);
	        }
	      }
	
	      // hack for HTML5 from/to case
	      if (s._iO._oncanplay) {
	        s._iO._oncanplay();
	      }
	
	    }),
	
	    canplaythrough: html5_event(function() {
	
	      var s = this._s;
	
	      if (!s.loaded) {
	        s._onbufferchange(0);
	        s._whileloading(s.bytesLoaded, s.bytesTotal, s._get_html5_duration());
	        s._onload(true);
	      }
	
	    }),
	
	    durationchange: html5_event(function() {
	
	      // durationchange may fire at various times, probably the safest way to capture accurate/final duration.
	
	      var s = this._s,
	          duration;
	
	      duration = s._get_html5_duration();
	
	      if (!isNaN(duration) && duration !== s.duration) {
	
	        sm2._wD(this._s.id + ': durationchange (' + duration + ')' + (s.duration ? ', previously ' + s.duration : ''));
	
	        s.durationEstimate = s.duration = duration;
	
	      }
	
	    }),
	
	    // TODO: Reserved for potential use
	    /*
	    emptied: html5_event(function() {
	
	      sm2._wD(this._s.id + ': emptied');
	
	    }),
	    */
	
	    ended: html5_event(function() {
	
	      var s = this._s;
	
	      sm2._wD(s.id + ': ended');
	
	      s._onfinish();
	
	    }),
	
	    error: html5_event(function() {
	
	      sm2._wD(this._s.id + ': HTML5 error, code ' + this.error.code);
	      /**
	       * HTML5 error codes, per W3C
	       * Error 1: Client aborted download at user's request.
	       * Error 2: Network error after load started.
	       * Error 3: Decoding issue.
	       * Error 4: Media (audio file) not supported.
	       * Reference: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#error-codes
	       */
	      // call load with error state?
	      this._s._onload(false);
	
	    }),
	
	    loadeddata: html5_event(function() {
	
	      var s = this._s;
	
	      sm2._wD(s.id + ': loadeddata');
	
	      // safari seems to nicely report progress events, eventually totalling 100%
	      if (!s._loaded && !isSafari) {
	        s.duration = s._get_html5_duration();
	      }
	
	    }),
	
	    loadedmetadata: html5_event(function() {
	
	      sm2._wD(this._s.id + ': loadedmetadata');
	
	    }),
	
	    loadstart: html5_event(function() {
	
	      sm2._wD(this._s.id + ': loadstart');
	      // assume buffering at first
	      this._s._onbufferchange(1);
	
	    }),
	
	    play: html5_event(function() {
	
	      // sm2._wD(this._s.id + ': play()');
	      // once play starts, no buffering
	      this._s._onbufferchange(0);
	
	    }),
	
	    playing: html5_event(function() {
	
	      sm2._wD(this._s.id + ': playing ' + String.fromCharCode(9835));
	      // once play starts, no buffering
	      this._s._onbufferchange(0);
	
	    }),
	
	    progress: html5_event(function(e) {
	
	      // note: can fire repeatedly after "loaded" event, due to use of HTTP range/partials
	
	      var s = this._s,
	          i, j, progStr, buffered = 0,
	          isProgress = (e.type === 'progress'),
	          ranges = e.target.buffered,
	          // firefox 3.6 implements e.loaded/total (bytes)
	          loaded = (e.loaded||0),
	          total = (e.total||1);
	
	      // reset the "buffered" (loaded byte ranges) array
	      s.buffered = [];
	
	      if (ranges && ranges.length) {
	
	        // if loaded is 0, try TimeRanges implementation as % of load
	        // https://developer.mozilla.org/en/DOM/TimeRanges
	
	        // re-build "buffered" array
	        // HTML5 returns seconds. SM2 API uses msec for setPosition() etc., whether Flash or HTML5.
	        for (i=0, j=ranges.length; i<j; i++) {
	          s.buffered.push({
	            'start': ranges.start(i) * msecScale,
	            'end': ranges.end(i) * msecScale
	          });
	        }
	
	        // use the last value locally
	        buffered = (ranges.end(0) - ranges.start(0)) * msecScale;
	
	        // linear case, buffer sum; does not account for seeking and HTTP partials / byte ranges
	        loaded = Math.min(1, buffered/(e.target.duration*msecScale));
	
	        // <d>
	        if (isProgress && ranges.length > 1) {
	          progStr = [];
	          j = ranges.length;
	          for (i=0; i<j; i++) {
	            progStr.push(e.target.buffered.start(i)*msecScale +'-'+ e.target.buffered.end(i)*msecScale);
	          }
	          sm2._wD(this._s.id + ': progress, timeRanges: ' + progStr.join(', '));
	        }
	
	        if (isProgress && !isNaN(loaded)) {
	          sm2._wD(this._s.id + ': progress, ' + Math.floor(loaded*100) + '% loaded');
	        }
	        // </d>
	
	      }
	
	      if (!isNaN(loaded)) {
	
	        // TODO: prevent calls with duplicate values.
	        s._whileloading(loaded, total, s._get_html5_duration());
	        if (loaded && total && loaded === total) {
	          // in case "onload" doesn't fire (eg. gecko 1.9.2)
	          html5_events.canplaythrough.call(this, e);
	        }
	
	      }
	
	    }),
	
	    ratechange: html5_event(function() {
	
	      sm2._wD(this._s.id + ': ratechange');
	
	    }),
	
	    suspend: html5_event(function(e) {
	
	      // download paused/stopped, may have finished (eg. onload)
	      var s = this._s;
	
	      sm2._wD(this._s.id + ': suspend');
	      html5_events.progress.call(this, e);
	      s._onsuspend();
	
	    }),
	
	    stalled: html5_event(function() {
	
	      sm2._wD(this._s.id + ': stalled');
	
	    }),
	
	    timeupdate: html5_event(function() {
	
	      this._s._onTimer();
	
	    }),
	
	    waiting: html5_event(function() {
	
	      var s = this._s;
	
	      // see also: seeking
	      sm2._wD(this._s.id + ': waiting');
	
	      // playback faster than download rate, etc.
	      s._onbufferchange(1);
	
	    })
	
	  };
	
	  html5OK = function(iO) {
	
	    // playability test based on URL or MIME type
	
	    var result;
	
	    if (!iO || (!iO.type && !iO.url && !iO.serverURL)) {
	
	      // nothing to check
	      result = false;
	
	    } else if (iO.serverURL || (iO.type && preferFlashCheck(iO.type))) {
	
	      // RTMP, or preferring flash
	      result = false;
	
	    } else {
	
	      // Use type, if specified. Pass data: URIs to HTML5. If HTML5-only mode, no other options, so just give 'er
	      result = ((iO.type ? html5CanPlay({type:iO.type}) : html5CanPlay({url:iO.url}) || sm2.html5Only || iO.url.match(/data\:/i)));
	
	    }
	
	    return result;
	
	  };
	
	  html5Unload = function(oAudio) {
	
	    /**
	     * Internal method: Unload media, and cancel any current/pending network requests.
	     * Firefox can load an empty URL, which allegedly destroys the decoder and stops the download.
	     * https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox#Stopping_the_download_of_media
	     * However, Firefox has been seen loading a relative URL from '' and thus requesting the hosting page on unload.
	     * Other UA behaviour is unclear, so everyone else gets an about:blank-style URL.
	     */
	
	    var url;
	
	    if (oAudio) {
	
	      // Firefox and Chrome accept short WAVe data: URIs. Chome dislikes audio/wav, but accepts audio/wav for data: MIME.
	      // Desktop Safari complains / fails on data: URI, so it gets about:blank.
	      url = (isSafari ? emptyURL : (sm2.html5.canPlayType('audio/wav') ? emptyWAV : emptyURL));
	
	      oAudio.src = url;
	
	      // reset some state, too
	      if (oAudio._called_unload !== undefined) {
	        oAudio._called_load = false;
	      }
	
	    }
	
	    if (useGlobalHTML5Audio) {
	
	      // ensure URL state is trashed, also
	      lastGlobalHTML5URL = null;
	
	    }
	
	    return url;
	
	  };
	
	  html5CanPlay = function(o) {
	
	    /**
	     * Try to find MIME, test and return truthiness
	     * o = {
	     *  url: '/path/to/an.mp3',
	     *  type: 'audio/mp3'
	     * }
	     */
	
	    if (!sm2.useHTML5Audio || !sm2.hasHTML5) {
	      return false;
	    }
	
	    var url = (o.url || null),
	        mime = (o.type || null),
	        aF = sm2.audioFormats,
	        result,
	        offset,
	        fileExt,
	        item;
	
	    // account for known cases like audio/mp3
	
	    if (mime && sm2.html5[mime] !== _undefined) {
	      return (sm2.html5[mime] && !preferFlashCheck(mime));
	    }
	
	    if (!html5Ext) {
	      html5Ext = [];
	      for (item in aF) {
	        if (aF.hasOwnProperty(item)) {
	          html5Ext.push(item);
	          if (aF[item].related) {
	            html5Ext = html5Ext.concat(aF[item].related);
	          }
	        }
	      }
	      html5Ext = new RegExp('\\.('+html5Ext.join('|')+')(\\?.*)?$','i');
	    }
	
	    // TODO: Strip URL queries, etc.
	    fileExt = (url ? url.toLowerCase().match(html5Ext) : null);
	
	    if (!fileExt || !fileExt.length) {
	      if (!mime) {
	        result = false;
	      } else {
	        // audio/mp3 -> mp3, result should be known
	        offset = mime.indexOf(';');
	        // strip "audio/X; codecs..."
	        fileExt = (offset !== -1?mime.substr(0,offset):mime).substr(6);
	      }
	    } else {
	      // match the raw extension name - "mp3", for example
	      fileExt = fileExt[1];
	    }
	
	    if (fileExt && sm2.html5[fileExt] !== _undefined) {
	      // result known
	      result = (sm2.html5[fileExt] && !preferFlashCheck(fileExt));
	    } else {
	      mime = 'audio/'+fileExt;
	      result = sm2.html5.canPlayType({type:mime});
	      sm2.html5[fileExt] = result;
	      // sm2._wD('canPlayType, found result: ' + result);
	      result = (result && sm2.html5[mime] && !preferFlashCheck(mime));
	    }
	
	    return result;
	
	  };
	
	  testHTML5 = function() {
	
	    /**
	     * Internal: Iterates over audioFormats, determining support eg. audio/mp3, audio/mpeg and so on
	     * assigns results to html5[] and flash[].
	     */
	
	    if (!sm2.useHTML5Audio || !sm2.hasHTML5) {
	      // without HTML5, we need Flash.
	      sm2.html5.usingFlash = true;
	      needsFlash = true;
	      return false;
	    }
	
	    // double-whammy: Opera 9.64 throws WRONG_ARGUMENTS_ERR if no parameter passed to Audio(), and Webkit + iOS happily tries to load "null" as a URL. :/
	    var a = (Audio !== _undefined ? (isOpera && opera.version() < 10 ? new Audio(null) : new Audio()) : null),
	        item, lookup, support = {}, aF, i;
	
	    function cp(m) {
	
	      var canPlay, j,
	          result = false,
	          isOK = false;
	
	      if (!a || typeof a.canPlayType !== 'function') {
	        return result;
	      }
	
	      if (m instanceof Array) {
	        // iterate through all mime types, return any successes
	        for (i=0, j=m.length; i<j; i++) {
	          if (sm2.html5[m[i]] || a.canPlayType(m[i]).match(sm2.html5Test)) {
	            isOK = true;
	            sm2.html5[m[i]] = true;
	            // note flash support, too
	            sm2.flash[m[i]] = !!(m[i].match(flashMIME));
	          }
	        }
	        result = isOK;
	      } else {
	        canPlay = (a && typeof a.canPlayType === 'function' ? a.canPlayType(m) : false);
	        result = !!(canPlay && (canPlay.match(sm2.html5Test)));
	      }
	
	      return result;
	
	    }
	
	    // test all registered formats + codecs
	
	    aF = sm2.audioFormats;
	
	    for (item in aF) {
	
	      if (aF.hasOwnProperty(item)) {
	
	        lookup = 'audio/' + item;
	
	        support[item] = cp(aF[item].type);
	
	        // write back generic type too, eg. audio/mp3
	        support[lookup] = support[item];
	
	        // assign flash
	        if (item.match(flashMIME)) {
	
	          sm2.flash[item] = true;
	          sm2.flash[lookup] = true;
	
	        } else {
	
	          sm2.flash[item] = false;
	          sm2.flash[lookup] = false;
	
	        }
	
	        // assign result to related formats, too
	
	        if (aF[item] && aF[item].related) {
	
	          for (i=aF[item].related.length-1; i >= 0; i--) {
	
	            // eg. audio/m4a
	            support['audio/'+aF[item].related[i]] = support[item];
	            sm2.html5[aF[item].related[i]] = support[item];
	            sm2.flash[aF[item].related[i]] = support[item];
	
	          }
	
	        }
	
	      }
	
	    }
	
	    support.canPlayType = (a?cp:null);
	    sm2.html5 = mixin(sm2.html5, support);
	
	    sm2.html5.usingFlash = featureCheck();
	    needsFlash = sm2.html5.usingFlash;
	
	    return true;
	
	  };
	
	  strings = {
	
	    // <d>
	    notReady: 'Unavailable - wait until onready() has fired.',
	    notOK: 'Audio support is not available.',
	    domError: sm + 'exception caught while appending SWF to DOM.',
	    spcWmode: 'Removing wmode, preventing known SWF loading issue(s)',
	    swf404: smc + 'Verify that %s is a valid path.',
	    tryDebug: 'Try ' + sm + '.debugFlash = true for more security details (output goes to SWF.)',
	    checkSWF: 'See SWF output for more debug info.',
	    localFail: smc + 'Non-HTTP page (' + doc.location.protocol + ' URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/',
	    waitFocus: smc + 'Special case: Waiting for SWF to load with window focus...',
	    waitForever: smc + 'Waiting indefinitely for Flash (will recover if unblocked)...',
	    waitSWF: smc + 'Waiting for 100% SWF load...',
	    needFunction: smc + 'Function object expected for %s',
	    badID: 'Sound ID "%s" should be a string, starting with a non-numeric character',
	    currentObj: smc + '_debug(): Current sound objects',
	    waitOnload: smc + 'Waiting for window.onload()',
	    docLoaded: smc + 'Document already loaded',
	    onload: smc + 'initComplete(): calling soundManager.onload()',
	    onloadOK: sm + '.onload() complete',
	    didInit: smc + 'init(): Already called?',
	    secNote: 'Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html',
	    badRemove: smc + 'Failed to remove Flash node.',
	    shutdown: sm + '.disable(): Shutting down',
	    queue: smc + 'Queueing %s handler',
	    smError: 'SMSound.load(): Exception: JS-Flash communication failed, or JS error.',
	    fbTimeout: 'No flash response, applying .'+swfCSS.swfTimedout+' CSS...',
	    fbLoaded: 'Flash loaded',
	    fbHandler: smc + 'flashBlockHandler()',
	    manURL: 'SMSound.load(): Using manually-assigned URL',
	    onURL: sm + '.load(): current URL already assigned.',
	    badFV: sm + '.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
	    as2loop: 'Note: Setting stream:false so looping can work (flash 8 limitation)',
	    noNSLoop: 'Note: Looping not implemented for MovieStar formats',
	    needfl9: 'Note: Switching to flash 9, required for MP4 formats.',
	    mfTimeout: 'Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case',
	    needFlash: smc + 'Fatal error: Flash is needed to play some required formats, but is not available.',
	    gotFocus: smc + 'Got window focus.',
	    policy: 'Enabling usePolicyFile for data access',
	    setup: sm + '.setup(): allowed parameters: %s',
	    setupError: sm + '.setup(): "%s" cannot be assigned with this method.',
	    setupUndef: sm + '.setup(): Could not find option "%s"',
	    setupLate: sm + '.setup(): url, flashVersion and html5Test property changes will not take effect until reboot().',
	    noURL: smc + 'Flash URL required. Call soundManager.setup({url:...}) to get started.',
	    sm2Loaded: 'SoundManager 2: Ready. ' + String.fromCharCode(10003),
	    reset: sm + '.reset(): Removing event callbacks',
	    mobileUA: 'Mobile UA detected, preferring HTML5 by default.',
	    globalHTML5: 'Using singleton HTML5 Audio() pattern for this device.'
	    // </d>
	
	  };
	
	  str = function() {
	
	    // internal string replace helper.
	    // arguments: o [,items to replace]
	    // <d>
	
	    var args,
	        i, j, o,
	        sstr;
	
	    // real array, please
	    args = slice.call(arguments);
	
	    // first argument
	    o = args.shift();
	
	    sstr = (strings && strings[o] ? strings[o] : '');
	
	    if (sstr && args && args.length) {
	      for (i = 0, j = args.length; i < j; i++) {
	        sstr = sstr.replace('%s', args[i]);
	      }
	    }
	
	    return sstr;
	    // </d>
	
	  };
	
	  loopFix = function(sOpt) {
	
	    // flash 8 requires stream = false for looping to work
	    if (fV === 8 && sOpt.loops > 1 && sOpt.stream) {
	      _wDS('as2loop');
	      sOpt.stream = false;
	    }
	
	    return sOpt;
	
	  };
	
	  policyFix = function(sOpt, sPre) {
	
	    if (sOpt && !sOpt.usePolicyFile && (sOpt.onid3 || sOpt.usePeakData || sOpt.useWaveformData || sOpt.useEQData)) {
	      sm2._wD((sPre || '') + str('policy'));
	      sOpt.usePolicyFile = true;
	    }
	
	    return sOpt;
	
	  };
	
	  complain = function(sMsg) {
	
	    // <d>
	    if (hasConsole && console.warn !== _undefined) {
	      console.warn(sMsg);
	    } else {
	      sm2._wD(sMsg);
	    }
	    // </d>
	
	  };
	
	  doNothing = function() {
	
	    return false;
	
	  };
	
	  disableObject = function(o) {
	
	    var oProp;
	
	    for (oProp in o) {
	      if (o.hasOwnProperty(oProp) && typeof o[oProp] === 'function') {
	        o[oProp] = doNothing;
	      }
	    }
	
	    oProp = null;
	
	  };
	
	  failSafely = function(bNoDisable) {
	
	    // general failure exception handler
	
	    if (bNoDisable === _undefined) {
	      bNoDisable = false;
	    }
	
	    if (disabled || bNoDisable) {
	      sm2.disable(bNoDisable);
	    }
	
	  };
	
	  normalizeMovieURL = function(smURL) {
	
	    var urlParams = null, url;
	
	    if (smURL) {
	      if (smURL.match(/\.swf(\?.*)?$/i)) {
	        urlParams = smURL.substr(smURL.toLowerCase().lastIndexOf('.swf?') + 4);
	        if (urlParams) {
	          // assume user knows what they're doing
	          return smURL;
	        }
	      } else if (smURL.lastIndexOf('/') !== smURL.length - 1) {
	        // append trailing slash, if needed
	        smURL += '/';
	      }
	    }
	
	    url = (smURL && smURL.lastIndexOf('/') !== - 1 ? smURL.substr(0, smURL.lastIndexOf('/') + 1) : './') + sm2.movieURL;
	
	    if (sm2.noSWFCache) {
	      url += ('?ts=' + new Date().getTime());
	    }
	
	    return url;
	
	  };
	
	  setVersionInfo = function() {
	
	    // short-hand for internal use
	
	    fV = parseInt(sm2.flashVersion, 10);
	
	    if (fV !== 8 && fV !== 9) {
	      sm2._wD(str('badFV', fV, defaultFlashVersion));
	      sm2.flashVersion = fV = defaultFlashVersion;
	    }
	
	    // debug flash movie, if applicable
	
	    var isDebug = (sm2.debugMode || sm2.debugFlash?'_debug.swf':'.swf');
	
	    if (sm2.useHTML5Audio && !sm2.html5Only && sm2.audioFormats.mp4.required && fV < 9) {
	      sm2._wD(str('needfl9'));
	      sm2.flashVersion = fV = 9;
	    }
	
	    sm2.version = sm2.versionNumber + (sm2.html5Only?' (HTML5-only mode)':(fV === 9?' (AS3/Flash 9)':' (AS2/Flash 8)'));
	
	    // set up default options
	    if (fV > 8) {
	      // +flash 9 base options
	      sm2.defaultOptions = mixin(sm2.defaultOptions, sm2.flash9Options);
	      sm2.features.buffering = true;
	      // +moviestar support
	      sm2.defaultOptions = mixin(sm2.defaultOptions, sm2.movieStarOptions);
	      sm2.filePatterns.flash9 = new RegExp('\\.(mp3|' + netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
	      sm2.features.movieStar = true;
	    } else {
	      sm2.features.movieStar = false;
	    }
	
	    // regExp for flash canPlay(), etc.
	    sm2.filePattern = sm2.filePatterns[(fV !== 8?'flash9':'flash8')];
	
	    // if applicable, use _debug versions of SWFs
	    sm2.movieURL = (fV === 8?'soundmanager2.swf':'soundmanager2_flash9.swf').replace('.swf', isDebug);
	
	    sm2.features.peakData = sm2.features.waveformData = sm2.features.eqData = (fV > 8);
	
	  };
	
	  setPolling = function(bPolling, bHighPerformance) {
	
	    if (!flash) {
	      return false;
	    }
	
	    flash._setPolling(bPolling, bHighPerformance);
	
	  };
	
	  initDebug = function() {
	
	    // starts debug mode, creating output <div> for UAs without console object
	
	    // allow force of debug mode via URL
	    // <d>
	    if (sm2.debugURLParam.test(wl)) {
	      sm2.debugMode = true;
	    }
	
	    if (id(sm2.debugID)) {
	      return false;
	    }
	
	    var oD, oDebug, oTarget, oToggle, tmp;
	
	    if (sm2.debugMode && !id(sm2.debugID) && (!hasConsole || !sm2.useConsole || !sm2.consoleOnly)) {
	
	      oD = doc.createElement('div');
	      oD.id = sm2.debugID + '-toggle';
	
	      oToggle = {
	        'position': 'fixed',
	        'bottom': '0px',
	        'right': '0px',
	        'width': '1.2em',
	        'height': '1.2em',
	        'lineHeight': '1.2em',
	        'margin': '2px',
	        'textAlign': 'center',
	        'border': '1px solid #999',
	        'cursor': 'pointer',
	        'background': '#fff',
	        'color': '#333',
	        'zIndex': 10001
	      };
	
	      oD.appendChild(doc.createTextNode('-'));
	      oD.onclick = toggleDebug;
	      oD.title = 'Toggle SM2 debug console';
	
	      if (ua.match(/msie 6/i)) {
	        oD.style.position = 'absolute';
	        oD.style.cursor = 'hand';
	      }
	
	      for (tmp in oToggle) {
	        if (oToggle.hasOwnProperty(tmp)) {
	          oD.style[tmp] = oToggle[tmp];
	        }
	      }
	
	      oDebug = doc.createElement('div');
	      oDebug.id = sm2.debugID;
	      oDebug.style.display = (sm2.debugMode?'block':'none');
	
	      if (sm2.debugMode && !id(oD.id)) {
	        try {
	          oTarget = getDocument();
	          oTarget.appendChild(oD);
	        } catch(e2) {
	          throw new Error(str('domError')+' \n'+e2.toString());
	        }
	        oTarget.appendChild(oDebug);
	      }
	
	    }
	
	    oTarget = null;
	    // </d>
	
	  };
	
	  idCheck = this.getSoundById;
	
	  // <d>
	  _wDS = function(o, errorLevel) {
	
	    return (!o ? '' : sm2._wD(str(o), errorLevel));
	
	  };
	
	  toggleDebug = function() {
	
	    var o = id(sm2.debugID),
	    oT = id(sm2.debugID + '-toggle');
	
	    if (!o) {
	      return false;
	    }
	
	    if (debugOpen) {
	      // minimize
	      oT.innerHTML = '+';
	      o.style.display = 'none';
	    } else {
	      oT.innerHTML = '-';
	      o.style.display = 'block';
	    }
	
	    debugOpen = !debugOpen;
	
	  };
	
	  debugTS = function(sEventType, bSuccess, sMessage) {
	
	    // troubleshooter debug hooks
	
	    if (window.sm2Debugger !== _undefined) {
	      try {
	        sm2Debugger.handleEvent(sEventType, bSuccess, sMessage);
	      } catch(e) {
	        // oh well
	        return false;
	      }
	    }
	
	    return true;
	
	  };
	  // </d>
	
	  getSWFCSS = function() {
	
	    var css = [];
	
	    if (sm2.debugMode) {
	      css.push(swfCSS.sm2Debug);
	    }
	
	    if (sm2.debugFlash) {
	      css.push(swfCSS.flashDebug);
	    }
	
	    if (sm2.useHighPerformance) {
	      css.push(swfCSS.highPerf);
	    }
	
	    return css.join(' ');
	
	  };
	
	  flashBlockHandler = function() {
	
	    // *possible* flash block situation.
	
	    var name = str('fbHandler'),
	        p = sm2.getMoviePercent(),
	        css = swfCSS,
	        error = {type:'FLASHBLOCK'};
	
	    if (sm2.html5Only) {
	      // no flash, or unused
	      return false;
	    }
	
	    if (!sm2.ok()) {
	
	      if (needsFlash) {
	        // make the movie more visible, so user can fix
	        sm2.oMC.className = getSWFCSS() + ' ' + css.swfDefault + ' ' + (p === null?css.swfTimedout:css.swfError);
	        sm2._wD(name + ': ' + str('fbTimeout') + (p ? ' (' + str('fbLoaded') + ')' : ''));
	      }
	
	      sm2.didFlashBlock = true;
	
	      // fire onready(), complain lightly
	      processOnEvents({type:'ontimeout', ignoreInit:true, error:error});
	      catchError(error);
	
	    } else {
	
	      // SM2 loaded OK (or recovered)
	
	      // <d>
	      if (sm2.didFlashBlock) {
	        sm2._wD(name + ': Unblocked');
	      }
	      // </d>
	
	      if (sm2.oMC) {
	        sm2.oMC.className = [getSWFCSS(), css.swfDefault, css.swfLoaded + (sm2.didFlashBlock?' '+css.swfUnblocked:'')].join(' ');
	      }
	
	    }
	
	  };
	
	  addOnEvent = function(sType, oMethod, oScope) {
	
	    if (on_queue[sType] === _undefined) {
	      on_queue[sType] = [];
	    }
	
	    on_queue[sType].push({
	      'method': oMethod,
	      'scope': (oScope || null),
	      'fired': false
	    });
	
	  };
	
	  processOnEvents = function(oOptions) {
	
	    // if unspecified, assume OK/error
	
	    if (!oOptions) {
	      oOptions = {
	        type: (sm2.ok() ? 'onready' : 'ontimeout')
	      };
	    }
	
	    if (!didInit && oOptions && !oOptions.ignoreInit) {
	      // not ready yet.
	      return false;
	    }
	
	    if (oOptions.type === 'ontimeout' && (sm2.ok() || (disabled && !oOptions.ignoreInit))) {
	      // invalid case
	      return false;
	    }
	
	    var status = {
	          success: (oOptions && oOptions.ignoreInit?sm2.ok():!disabled)
	        },
	
	        // queue specified by type, or none
	        srcQueue = (oOptions && oOptions.type?on_queue[oOptions.type]||[]:[]),
	
	        queue = [], i, j,
	        args = [status],
	        canRetry = (needsFlash && !sm2.ok());
	
	    if (oOptions.error) {
	      args[0].error = oOptions.error;
	    }
	
	    for (i = 0, j = srcQueue.length; i < j; i++) {
	      if (srcQueue[i].fired !== true) {
	        queue.push(srcQueue[i]);
	      }
	    }
	
	    if (queue.length) {
	      // sm2._wD(sm + ': Firing ' + queue.length + ' ' + oOptions.type + '() item' + (queue.length === 1 ? '' : 's'));
	      for (i = 0, j = queue.length; i < j; i++) {
	        if (queue[i].scope) {
	          queue[i].method.apply(queue[i].scope, args);
	        } else {
	          queue[i].method.apply(this, args);
	        }
	        if (!canRetry) {
	          // useFlashBlock and SWF timeout case doesn't count here.
	          queue[i].fired = true;
	        }
	      }
	    }
	
	    return true;
	
	  };
	
	  initUserOnload = function() {
	
	    window.setTimeout(function() {
	
	      if (sm2.useFlashBlock) {
	        flashBlockHandler();
	      }
	
	      processOnEvents();
	
	      // call user-defined "onload", scoped to window
	
	      if (typeof sm2.onload === 'function') {
	        _wDS('onload', 1);
	        sm2.onload.apply(window);
	        _wDS('onloadOK', 1);
	      }
	
	      if (sm2.waitForWindowLoad) {
	        event.add(window, 'load', initUserOnload);
	      }
	
	    },1);
	
	  };
	
	  detectFlash = function() {
	
	    // hat tip: Flash Detect library (BSD, (C) 2007) by Carl "DocYes" S. Yestrau - http://featureblend.com/javascript-flash-detection-library.html / http://featureblend.com/license.txt
	
	    if (hasFlash !== _undefined) {
	      // this work has already been done.
	      return hasFlash;
	    }
	
	    var hasPlugin = false, n = navigator, nP = n.plugins, obj, type, types, AX = window.ActiveXObject;
	
	    if (nP && nP.length) {
	      type = 'application/x-shockwave-flash';
	      types = n.mimeTypes;
	      if (types && types[type] && types[type].enabledPlugin && types[type].enabledPlugin.description) {
	        hasPlugin = true;
	      }
	    } else if (AX !== _undefined && !ua.match(/MSAppHost/i)) {
	      // Windows 8 Store Apps (MSAppHost) are weird (compatibility?) and won't complain here, but will barf if Flash/ActiveX object is appended to the DOM.
	      try {
	        obj = new AX('ShockwaveFlash.ShockwaveFlash');
	      } catch(e) {
	        // oh well
	        obj = null;
	      }
	      hasPlugin = (!!obj);
	      // cleanup, because it is ActiveX after all
	      obj = null;
	    }
	
	    hasFlash = hasPlugin;
	
	    return hasPlugin;
	
	  };
	
	featureCheck = function() {
	
	    var flashNeeded,
	        item,
	        formats = sm2.audioFormats,
	        // iPhone <= 3.1 has broken HTML5 audio(), but firmware 3.2 (original iPad) + iOS4 works.
	        isSpecial = (is_iDevice && !!(ua.match(/os (1|2|3_0|3_1)\s/i)));
	
	    if (isSpecial) {
	
	      // has Audio(), but is broken; let it load links directly.
	      sm2.hasHTML5 = false;
	
	      // ignore flash case, however
	      sm2.html5Only = true;
	
	      // hide the SWF, if present
	      if (sm2.oMC) {
	        sm2.oMC.style.display = 'none';
	      }
	
	    } else {
	
	      if (sm2.useHTML5Audio) {
	
	        if (!sm2.html5 || !sm2.html5.canPlayType) {
	          sm2._wD('SoundManager: No HTML5 Audio() support detected.');
	          sm2.hasHTML5 = false;
	        }
	
	        // <d>
	        if (isBadSafari) {
	          sm2._wD(smc + 'Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - ' + (!hasFlash ?' would use flash fallback for MP3/MP4, but none detected.' : 'will use flash fallback for MP3/MP4, if available'), 1);
	        }
	        // </d>
	
	      }
	
	    }
	
	    if (sm2.useHTML5Audio && sm2.hasHTML5) {
	
	      // sort out whether flash is optional, required or can be ignored.
	
	      // innocent until proven guilty.
	      canIgnoreFlash = true;
	
	      for (item in formats) {
	        if (formats.hasOwnProperty(item)) {
	          if (formats[item].required) {
	            if (!sm2.html5.canPlayType(formats[item].type)) {
	              // 100% HTML5 mode is not possible.
	              canIgnoreFlash = false;
	              flashNeeded = true;
	            } else if (sm2.preferFlash && (sm2.flash[item] || sm2.flash[formats[item].type])) {
	              // flash may be required, or preferred for this format.
	              flashNeeded = true;
	            }
	          }
	        }
	      }
	
	    }
	
	    // sanity check...
	    if (sm2.ignoreFlash) {
	      flashNeeded = false;
	      canIgnoreFlash = true;
	    }
	
	    sm2.html5Only = (sm2.hasHTML5 && sm2.useHTML5Audio && !flashNeeded);
	
	    return (!sm2.html5Only);
	
	  };
	
	  parseURL = function(url) {
	
	    /**
	     * Internal: Finds and returns the first playable URL (or failing that, the first URL.)
	     * @param {string or array} url A single URL string, OR, an array of URL strings or {url:'/path/to/resource', type:'audio/mp3'} objects.
	     */
	
	    var i, j, urlResult = 0, result;
	
	    if (url instanceof Array) {
	
	      // find the first good one
	      for (i=0, j=url.length; i<j; i++) {
	
	        if (url[i] instanceof Object) {
	          // MIME check
	          if (sm2.canPlayMIME(url[i].type)) {
	            urlResult = i;
	            break;
	          }
	
	        } else if (sm2.canPlayURL(url[i])) {
	          // URL string check
	          urlResult = i;
	          break;
	        }
	
	      }
	
	      // normalize to string
	      if (url[urlResult].url) {
	        url[urlResult] = url[urlResult].url;
	      }
	
	      result = url[urlResult];
	
	    } else {
	
	      // single URL case
	      result = url;
	
	    }
	
	    return result;
	
	  };
	
	
	  startTimer = function(oSound) {
	
	    /**
	     * attach a timer to this sound, and start an interval if needed
	     */
	
	    if (!oSound._hasTimer) {
	
	      oSound._hasTimer = true;
	
	      if (!mobileHTML5 && sm2.html5PollingInterval) {
	
	        if (h5IntervalTimer === null && h5TimerCount === 0) {
	
	          h5IntervalTimer = setInterval(timerExecute, sm2.html5PollingInterval);
	
	        }
	
	        h5TimerCount++;
	
	      }
	
	    }
	
	  };
	
	  stopTimer = function(oSound) {
	
	    /**
	     * detach a timer
	     */
	
	    if (oSound._hasTimer) {
	
	      oSound._hasTimer = false;
	
	      if (!mobileHTML5 && sm2.html5PollingInterval) {
	
	        // interval will stop itself at next execution.
	
	        h5TimerCount--;
	
	      }
	
	    }
	
	  };
	
	  timerExecute = function() {
	
	    /**
	     * manual polling for HTML5 progress events, ie., whileplaying() (can achieve greater precision than conservative default HTML5 interval)
	     */
	
	    var i;
	
	    if (h5IntervalTimer !== null && !h5TimerCount) {
	
	      // no active timers, stop polling interval.
	
	      clearInterval(h5IntervalTimer);
	
	      h5IntervalTimer = null;
	
	      return false;
	
	    }
	
	    // check all HTML5 sounds with timers
	
	    for (i = sm2.soundIDs.length-1; i >= 0; i--) {
	
	      if (sm2.sounds[sm2.soundIDs[i]].isHTML5 && sm2.sounds[sm2.soundIDs[i]]._hasTimer) {
	
	        sm2.sounds[sm2.soundIDs[i]]._onTimer();
	
	      }
	
	    }
	
	  };
	
	  catchError = function(options) {
	
	    options = (options !== _undefined ? options : {});
	
	    if (typeof sm2.onerror === 'function') {
	      sm2.onerror.apply(window, [{type:(options.type !== _undefined ? options.type : null)}]);
	    }
	
	    if (options.fatal !== _undefined && options.fatal) {
	      sm2.disable();
	    }
	
	  };
	
	  badSafariFix = function() {
	
	    // special case: "bad" Safari (OS X 10.3 - 10.7) must fall back to flash for MP3/MP4
	    if (!isBadSafari || !detectFlash()) {
	      // doesn't apply
	      return false;
	    }
	
	    var aF = sm2.audioFormats, i, item;
	
	    for (item in aF) {
	      if (aF.hasOwnProperty(item)) {
	        if (item === 'mp3' || item === 'mp4') {
	          sm2._wD(sm + ': Using flash fallback for ' + item + ' format');
	          sm2.html5[item] = false;
	          // assign result to related formats, too
	          if (aF[item] && aF[item].related) {
	            for (i = aF[item].related.length-1; i >= 0; i--) {
	              sm2.html5[aF[item].related[i]] = false;
	            }
	          }
	        }
	      }
	    }
	
	  };
	
	  /**
	   * Pseudo-private flash/ExternalInterface methods
	   * ----------------------------------------------
	   */
	
	  this._setSandboxType = function(sandboxType) {
	
	    // <d>
	    var sb = sm2.sandbox;
	
	    sb.type = sandboxType;
	    sb.description = sb.types[(sb.types[sandboxType] !== _undefined?sandboxType:'unknown')];
	
	    if (sb.type === 'localWithFile') {
	
	      sb.noRemote = true;
	      sb.noLocal = false;
	      _wDS('secNote', 2);
	
	    } else if (sb.type === 'localWithNetwork') {
	
	      sb.noRemote = false;
	      sb.noLocal = true;
	
	    } else if (sb.type === 'localTrusted') {
	
	      sb.noRemote = false;
	      sb.noLocal = false;
	
	    }
	    // </d>
	
	  };
	
	  this._externalInterfaceOK = function(swfVersion) {
	
	    // flash callback confirming flash loaded, EI working etc.
	    // swfVersion: SWF build string
	
	    if (sm2.swfLoaded) {
	      return false;
	    }
	
	    var e;
	
	    debugTS('swf', true);
	    debugTS('flashtojs', true);
	    sm2.swfLoaded = true;
	    tryInitOnFocus = false;
	
	    if (isBadSafari) {
	      badSafariFix();
	    }
	
	    // complain if JS + SWF build/version strings don't match, excluding +DEV builds
	    // <d>
	    if (!swfVersion || swfVersion.replace(/\+dev/i,'') !== sm2.versionNumber.replace(/\+dev/i, '')) {
	
	      e = sm + ': Fatal: JavaScript file build "' + sm2.versionNumber + '" does not match Flash SWF build "' + swfVersion + '" at ' + sm2.url + '. Ensure both are up-to-date.';
	
	      // escape flash -> JS stack so this error fires in window.
	      setTimeout(function versionMismatch() {
	        throw new Error(e);
	      }, 0);
	
	      // exit, init will fail with timeout
	      return false;
	
	    }
	    // </d>
	
	    // IE needs a larger timeout
	    setTimeout(init, isIE ? 100 : 1);
	
	  };
	
	  /**
	   * Private initialization helpers
	   * ------------------------------
	   */
	
	  createMovie = function(smID, smURL) {
	
	    if (didAppend && appendSuccess) {
	      // ignore if already succeeded
	      return false;
	    }
	
	    function initMsg() {
	
	      // <d>
	
	      var options = [],
	          title,
	          msg = [],
	          delimiter = ' + ';
	
	      title = 'SoundManager ' + sm2.version + (!sm2.html5Only && sm2.useHTML5Audio ? (sm2.hasHTML5 ? ' + HTML5 audio' : ', no HTML5 audio support') : '');
	
	      if (!sm2.html5Only) {
	
	        if (sm2.preferFlash) {
	          options.push('preferFlash');
	        }
	
	        if (sm2.useHighPerformance) {
	          options.push('useHighPerformance');
	        }
	
	        if (sm2.flashPollingInterval) {
	          options.push('flashPollingInterval (' + sm2.flashPollingInterval + 'ms)');
	        }
	
	        if (sm2.html5PollingInterval) {
	          options.push('html5PollingInterval (' + sm2.html5PollingInterval + 'ms)');
	        }
	
	        if (sm2.wmode) {
	          options.push('wmode (' + sm2.wmode + ')');
	        }
	
	        if (sm2.debugFlash) {
	          options.push('debugFlash');
	        }
	
	        if (sm2.useFlashBlock) {
	          options.push('flashBlock');
	        }
	
	      } else {
	
	        if (sm2.html5PollingInterval) {
	          options.push('html5PollingInterval (' + sm2.html5PollingInterval + 'ms)');
	        }
	
	      }
	
	      if (options.length) {
	        msg = msg.concat([options.join(delimiter)]);
	      }
	
	      sm2._wD(title + (msg.length ? delimiter + msg.join(', ') : ''), 1);
	
	      showSupport();
	
	      // </d>
	
	    }
	
	    if (sm2.html5Only) {
	
	      // 100% HTML5 mode
	      setVersionInfo();
	
	      initMsg();
	      sm2.oMC = id(sm2.movieID);
	      init();
	
	      // prevent multiple init attempts
	      didAppend = true;
	
	      appendSuccess = true;
	
	      return false;
	
	    }
	
	    // flash path
	    var remoteURL = (smURL || sm2.url),
	    localURL = (sm2.altURL || remoteURL),
	    swfTitle = 'JS/Flash audio component (SoundManager 2)',
	    oTarget = getDocument(),
	    extraClass = getSWFCSS(),
	    isRTL = null,
	    html = doc.getElementsByTagName('html')[0],
	    oEmbed, oMovie, tmp, movieHTML, oEl, s, x, sClass;
	
	    isRTL = (html && html.dir && html.dir.match(/rtl/i));
	    smID = (smID === _undefined?sm2.id:smID);
	
	    function param(name, value) {
	      return '<param name="'+name+'" value="'+value+'" />';
	    }
	
	    // safety check for legacy (change to Flash 9 URL)
	    setVersionInfo();
	    sm2.url = normalizeMovieURL(overHTTP?remoteURL:localURL);
	    smURL = sm2.url;
	
	    sm2.wmode = (!sm2.wmode && sm2.useHighPerformance ? 'transparent' : sm2.wmode);
	
	    if (sm2.wmode !== null && (ua.match(/msie 8/i) || (!isIE && !sm2.useHighPerformance)) && navigator.platform.match(/win32|win64/i)) {
	      /**
	       * extra-special case: movie doesn't load until scrolled into view when using wmode = anything but 'window' here
	       * does not apply when using high performance (position:fixed means on-screen), OR infinite flash load timeout
	       * wmode breaks IE 8 on Vista + Win7 too in some cases, as of January 2011 (?)
	       */
	      messages.push(strings.spcWmode);
	      sm2.wmode = null;
	    }
	
	    oEmbed = {
	      'name': smID,
	      'id': smID,
	      'src': smURL,
	      'quality': 'high',
	      'allowScriptAccess': sm2.allowScriptAccess,
	      'bgcolor': sm2.bgColor,
	      'pluginspage': http+'www.macromedia.com/go/getflashplayer',
	      'title': swfTitle,
	      'type': 'application/x-shockwave-flash',
	      'wmode': sm2.wmode,
	      // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
	      'hasPriority': 'true'
	    };
	
	    if (sm2.debugFlash) {
	      oEmbed.FlashVars = 'debug=1';
	    }
	
	    if (!sm2.wmode) {
	      // don't write empty attribute
	      delete oEmbed.wmode;
	    }
	
	    if (isIE) {
	
	      // IE is "special".
	      oMovie = doc.createElement('div');
	      movieHTML = [
	        '<object id="' + smID + '" data="' + smURL + '" type="' + oEmbed.type + '" title="' + oEmbed.title +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',
	        param('movie', smURL),
	        param('AllowScriptAccess', sm2.allowScriptAccess),
	        param('quality', oEmbed.quality),
	        (sm2.wmode? param('wmode', sm2.wmode): ''),
	        param('bgcolor', sm2.bgColor),
	        param('hasPriority', 'true'),
	        (sm2.debugFlash ? param('FlashVars', oEmbed.FlashVars) : ''),
	        '</object>'
	      ].join('');
	
	    } else {
	
	      oMovie = doc.createElement('embed');
	      for (tmp in oEmbed) {
	        if (oEmbed.hasOwnProperty(tmp)) {
	          oMovie.setAttribute(tmp, oEmbed[tmp]);
	        }
	      }
	
	    }
	
	    initDebug();
	    extraClass = getSWFCSS();
	    oTarget = getDocument();
	
	    if (oTarget) {
	
	      sm2.oMC = (id(sm2.movieID) || doc.createElement('div'));
	
	      if (!sm2.oMC.id) {
	
	        sm2.oMC.id = sm2.movieID;
	        sm2.oMC.className = swfCSS.swfDefault + ' ' + extraClass;
	        s = null;
	        oEl = null;
	
	        if (!sm2.useFlashBlock) {
	          if (sm2.useHighPerformance) {
	            // on-screen at all times
	            s = {
	              'position': 'fixed',
	              'width': '8px',
	              'height': '8px',
	              // >= 6px for flash to run fast, >= 8px to start up under Firefox/win32 in some cases. odd? yes.
	              'bottom': '0px',
	              'left': '0px',
	              'overflow': 'hidden'
	            };
	          } else {
	            // hide off-screen, lower priority
	            s = {
	              'position': 'absolute',
	              'width': '6px',
	              'height': '6px',
	              'top': '-9999px',
	              'left': '-9999px'
	            };
	            if (isRTL) {
	              s.left = Math.abs(parseInt(s.left,10))+'px';
	            }
	          }
	        }
	
	        if (isWebkit) {
	          // soundcloud-reported render/crash fix, safari 5
	          sm2.oMC.style.zIndex = 10000;
	        }
	
	        if (!sm2.debugFlash) {
	          for (x in s) {
	            if (s.hasOwnProperty(x)) {
	              sm2.oMC.style[x] = s[x];
	            }
	          }
	        }
	
	        try {
	          if (!isIE) {
	            sm2.oMC.appendChild(oMovie);
	          }
	          oTarget.appendChild(sm2.oMC);
	          if (isIE) {
	            oEl = sm2.oMC.appendChild(doc.createElement('div'));
	            oEl.className = swfCSS.swfBox;
	            oEl.innerHTML = movieHTML;
	          }
	          appendSuccess = true;
	        } catch(e) {
	          throw new Error(str('domError')+' \n'+e.toString());
	        }
	
	      } else {
	
	        // SM2 container is already in the document (eg. flashblock use case)
	        sClass = sm2.oMC.className;
	        sm2.oMC.className = (sClass?sClass+' ':swfCSS.swfDefault) + (extraClass?' '+extraClass:'');
	        sm2.oMC.appendChild(oMovie);
	        if (isIE) {
	          oEl = sm2.oMC.appendChild(doc.createElement('div'));
	          oEl.className = swfCSS.swfBox;
	          oEl.innerHTML = movieHTML;
	        }
	        appendSuccess = true;
	
	      }
	
	    }
	
	    didAppend = true;
	    initMsg();
	    // sm2._wD(sm + ': Trying to load ' + smURL + (!overHTTP && sm2.altURL ? ' (alternate URL)' : ''), 1);
	
	    return true;
	
	  };
	
	  initMovie = function() {
	
	    if (sm2.html5Only) {
	      createMovie();
	      return false;
	    }
	
	    // attempt to get, or create, movie (may already exist)
	    if (flash) {
	      return false;
	    }
	
	    if (!sm2.url) {
	
	      /**
	       * Something isn't right - we've reached init, but the soundManager url property has not been set.
	       * User has not called setup({url: ...}), or has not set soundManager.url (legacy use case) directly before init time.
	       * Notify and exit. If user calls setup() with a url: property, init will be restarted as in the deferred loading case.
	       */
	
	       _wDS('noURL');
	       return false;
	
	    }
	
	    // inline markup case
	    flash = sm2.getMovie(sm2.id);
	
	    if (!flash) {
	      if (!oRemoved) {
	        // try to create
	        createMovie(sm2.id, sm2.url);
	      } else {
	        // try to re-append removed movie after reboot()
	        if (!isIE) {
	          sm2.oMC.appendChild(oRemoved);
	        } else {
	          sm2.oMC.innerHTML = oRemovedHTML;
	        }
	        oRemoved = null;
	        didAppend = true;
	      }
	      flash = sm2.getMovie(sm2.id);
	    }
	
	    if (typeof sm2.oninitmovie === 'function') {
	      setTimeout(sm2.oninitmovie, 1);
	    }
	
	    // <d>
	    flushMessages();
	    // </d>
	
	    return true;
	
	  };
	
	  delayWaitForEI = function() {
	
	    setTimeout(waitForEI, 1000);
	
	  };
	
	  rebootIntoHTML5 = function() {
	
	    // special case: try for a reboot with preferFlash: false, if 100% HTML5 mode is possible and useFlashBlock is not enabled.
	
	    window.setTimeout(function() {
	
	      complain(smc + 'useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false...');
	
	      sm2.setup({
	        preferFlash: false
	      }).reboot();
	
	      // if for some reason you want to detect this case, use an ontimeout() callback and look for html5Only and didFlashBlock == true.
	      sm2.didFlashBlock = true;
	
	      sm2.beginDelayedInit();
	
	    }, 1);
	
	  };
	
	  waitForEI = function() {
	
	    var p,
	        loadIncomplete = false;
	
	    if (!sm2.url) {
	      // No SWF url to load (noURL case) - exit for now. Will be retried when url is set.
	      return false;
	    }
	
	    if (waitingForEI) {
	      return false;
	    }
	
	    waitingForEI = true;
	    event.remove(window, 'load', delayWaitForEI);
	
	    if (hasFlash && tryInitOnFocus && !isFocused) {
	      // Safari won't load flash in background tabs, only when focused.
	      _wDS('waitFocus');
	      return false;
	    }
	
	    if (!didInit) {
	      p = sm2.getMoviePercent();
	      if (p > 0 && p < 100) {
	        loadIncomplete = true;
	      }
	    }
	
	    setTimeout(function() {
	
	      p = sm2.getMoviePercent();
	
	      if (loadIncomplete) {
	        // special case: if movie *partially* loaded, retry until it's 100% before assuming failure.
	        waitingForEI = false;
	        sm2._wD(str('waitSWF'));
	        window.setTimeout(delayWaitForEI, 1);
	        return false;
	      }
	
	      // <d>
	      if (!didInit) {
	
	        sm2._wD(sm + ': No Flash response within expected time. Likely causes: ' + (p === 0 ? 'SWF load failed, ':'') + 'Flash blocked or JS-Flash security error.' + (sm2.debugFlash?' ' + str('checkSWF'):''), 2);
	
	        if (!overHTTP && p) {
	
	          _wDS('localFail', 2);
	
	          if (!sm2.debugFlash) {
	            _wDS('tryDebug', 2);
	          }
	
	        }
	
	        if (p === 0) {
	
	          // if 0 (not null), probably a 404.
	          sm2._wD(str('swf404', sm2.url), 1);
	
	        }
	
	        debugTS('flashtojs', false, true?' (Check flash security or flash blockers)':' (No plugin/missing SWF?)');
	
	      }
	      // </d>
	
	      // give up / time-out, depending
	
	      if (!didInit && okToDisable) {
	
	        if (p === null) {
	
	          // SWF failed to report load progress. Possibly blocked.
	
	          if (sm2.useFlashBlock || sm2.flashLoadTimeout === 0) {
	
	            if (sm2.useFlashBlock) {
	
	              flashBlockHandler();
	
	            }
	
	            _wDS('waitForever');
	
	          } else {
	
	            // no custom flash block handling, but SWF has timed out. Will recover if user unblocks / allows SWF load.
	
	            if (!sm2.useFlashBlock && canIgnoreFlash) {
	
	              rebootIntoHTML5();
	
	            } else {
	
	              _wDS('waitForever');
	
	              // fire any regular registered ontimeout() listeners.
	              processOnEvents({type:'ontimeout', ignoreInit: true, error: {type: 'INIT_FLASHBLOCK'}});
	
	            }
	
	          }
	
	        } else {
	
	          // SWF loaded? Shouldn't be a blocking issue, then.
	
	          if (sm2.flashLoadTimeout === 0) {
	
	            _wDS('waitForever');
	
	          } else {
	
	            if (!sm2.useFlashBlock && canIgnoreFlash) {
	
	              rebootIntoHTML5();
	
	            } else {
	
	              failSafely(true);
	
	            }
	
	          }
	
	        }
	
	      }
	
	    }, sm2.flashLoadTimeout);
	
	  };
	
	  handleFocus = function() {
	
	    function cleanup() {
	      event.remove(window, 'focus', handleFocus);
	    }
	
	    if (isFocused || !tryInitOnFocus) {
	      // already focused, or not special Safari background tab case
	      cleanup();
	      return true;
	    }
	
	    okToDisable = true;
	    isFocused = true;
	    _wDS('gotFocus');
	
	    // allow init to restart
	    waitingForEI = false;
	
	    // kick off ExternalInterface timeout, now that the SWF has started
	    delayWaitForEI();
	
	    cleanup();
	    return true;
	
	  };
	
	  flushMessages = function() {
	
	    // <d>
	
	    // SM2 pre-init debug messages
	    if (messages.length) {
	      sm2._wD('SoundManager 2: ' + messages.join(' '), 1);
	      messages = [];
	    }
	
	    // </d>
	
	  };
	
	  showSupport = function() {
	
	    // <d>
	
	    flushMessages();
	
	    var item, tests = [];
	
	    if (sm2.useHTML5Audio && sm2.hasHTML5) {
	      for (item in sm2.audioFormats) {
	        if (sm2.audioFormats.hasOwnProperty(item)) {
	          tests.push(item + ' = ' + sm2.html5[item] + (!sm2.html5[item] && needsFlash && sm2.flash[item] ? ' (using flash)' : (sm2.preferFlash && sm2.flash[item] && needsFlash ? ' (preferring flash)': (!sm2.html5[item] ? ' (' + (sm2.audioFormats[item].required ? 'required, ':'') + 'and no flash support)' : ''))));
	        }
	      }
	      sm2._wD('SoundManager 2 HTML5 support: ' + tests.join(', '), 1);
	    }
	
	    // </d>
	
	  };
	
	  initComplete = function(bNoDisable) {
	
	    if (didInit) {
	      return false;
	    }
	
	    if (sm2.html5Only) {
	      // all good.
	      _wDS('sm2Loaded', 1);
	      didInit = true;
	      initUserOnload();
	      debugTS('onload', true);
	      return true;
	    }
	
	    var wasTimeout = (sm2.useFlashBlock && sm2.flashLoadTimeout && !sm2.getMoviePercent()),
	        result = true,
	        error;
	
	    if (!wasTimeout) {
	      didInit = true;
	    }
	
	    error = {type: (!hasFlash && needsFlash ? 'NO_FLASH' : 'INIT_TIMEOUT')};
	
	    sm2._wD('SoundManager 2 ' + (disabled ? 'failed to load' : 'loaded') + ' (' + (disabled ? 'Flash security/load error' : 'OK') + ') ' + String.fromCharCode(disabled ? 10006 : 10003), disabled ? 2: 1);
	
	    if (disabled || bNoDisable) {
	      if (sm2.useFlashBlock && sm2.oMC) {
	        sm2.oMC.className = getSWFCSS() + ' ' + (sm2.getMoviePercent() === null?swfCSS.swfTimedout:swfCSS.swfError);
	      }
	      processOnEvents({type:'ontimeout', error:error, ignoreInit: true});
	      debugTS('onload', false);
	      catchError(error);
	      result = false;
	    } else {
	      debugTS('onload', true);
	    }
	
	    if (!disabled) {
	      if (sm2.waitForWindowLoad && !windowLoaded) {
	        _wDS('waitOnload');
	        event.add(window, 'load', initUserOnload);
	      } else {
	        // <d>
	        if (sm2.waitForWindowLoad && windowLoaded) {
	          _wDS('docLoaded');
	        }
	        // </d>
	        initUserOnload();
	      }
	    }
	
	    return result;
	
	  };
	
	  /**
	   * apply top-level setupOptions object as local properties, eg., this.setupOptions.flashVersion -> this.flashVersion (soundManager.flashVersion)
	   * this maintains backward compatibility, and allows properties to be defined separately for use by soundManager.setup().
	   */
	
	  setProperties = function() {
	
	    var i,
	        o = sm2.setupOptions;
	
	    for (i in o) {
	
	      if (o.hasOwnProperty(i)) {
	
	        // assign local property if not already defined
	
	        if (sm2[i] === _undefined) {
	
	          sm2[i] = o[i];
	
	        } else if (sm2[i] !== o[i]) {
	
	          // legacy support: write manually-assigned property (eg., soundManager.url) back to setupOptions to keep things in sync
	          sm2.setupOptions[i] = sm2[i];
	
	        }
	
	      }
	
	    }
	
	  };
	
	
	  init = function() {
	
	    // called after onload()
	
	    if (didInit) {
	      _wDS('didInit');
	      return false;
	    }
	
	    function cleanup() {
	      event.remove(window, 'load', sm2.beginDelayedInit);
	    }
	
	    if (sm2.html5Only) {
	      if (!didInit) {
	        // we don't need no steenking flash!
	        cleanup();
	        sm2.enabled = true;
	        initComplete();
	      }
	      return true;
	    }
	
	    // flash path
	    initMovie();
	
	    try {
	
	      // attempt to talk to Flash
	      flash._externalInterfaceTest(false);
	
	      // apply user-specified polling interval, OR, if "high performance" set, faster vs. default polling
	      // (determines frequency of whileloading/whileplaying callbacks, effectively driving UI framerates)
	      setPolling(true, (sm2.flashPollingInterval || (sm2.useHighPerformance ? 10 : 50)));
	
	      if (!sm2.debugMode) {
	        // stop the SWF from making debug output calls to JS
	        flash._disableDebug();
	      }
	
	      sm2.enabled = true;
	      debugTS('jstoflash', true);
	
	      if (!sm2.html5Only) {
	        // prevent browser from showing cached page state (or rather, restoring "suspended" page state) via back button, because flash may be dead
	        // http://www.webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
	        event.add(window, 'unload', doNothing);
	      }
	
	    } catch(e) {
	
	      sm2._wD('js/flash exception: ' + e.toString());
	      debugTS('jstoflash', false);
	      catchError({type:'JS_TO_FLASH_EXCEPTION', fatal:true});
	      // don't disable, for reboot()
	      failSafely(true);
	      initComplete();
	
	      return false;
	
	    }
	
	    initComplete();
	
	    // disconnect events
	    cleanup();
	
	    return true;
	
	  };
	
	  domContentLoaded = function() {
	
	    if (didDCLoaded) {
	      return false;
	    }
	
	    didDCLoaded = true;
	
	    // assign top-level soundManager properties eg. soundManager.url
	    setProperties();
	
	    initDebug();
	
	    /**
	     * Temporary feature: allow force of HTML5 via URL params: sm2-usehtml5audio=0 or 1
	     * Ditto for sm2-preferFlash, too.
	     */
	    // <d>
	    (function(){
	
	      var a = 'sm2-usehtml5audio=',
	          a2 = 'sm2-preferflash=',
	          b = null,
	          b2 = null,
	          l = wl.toLowerCase();
	
	      if (l.indexOf(a) !== -1) {
	        b = (l.charAt(l.indexOf(a)+a.length) === '1');
	        if (hasConsole) {
	          console.log((b?'Enabling ':'Disabling ')+'useHTML5Audio via URL parameter');
	        }
	        sm2.setup({
	          'useHTML5Audio': b
	        });
	      }
	
	      if (l.indexOf(a2) !== -1) {
	        b2 = (l.charAt(l.indexOf(a2)+a2.length) === '1');
	        if (hasConsole) {
	          console.log((b2?'Enabling ':'Disabling ')+'preferFlash via URL parameter');
	        }
	        sm2.setup({
	          'preferFlash': b2
	        });
	      }
	
	    }());
	    // </d>
	
	    if (!hasFlash && sm2.hasHTML5) {
	      sm2._wD('SoundManager 2: No Flash detected' + (!sm2.useHTML5Audio ? ', enabling HTML5.' : '. Trying HTML5-only mode.'), 1);
	      sm2.setup({
	        'useHTML5Audio': true,
	        // make sure we aren't preferring flash, either
	        // TODO: preferFlash should not matter if flash is not installed. Currently, stuff breaks without the below tweak.
	        'preferFlash': false
	      });
	    }
	
	    testHTML5();
	
	    if (!hasFlash && needsFlash) {
	      messages.push(strings.needFlash);
	      // TODO: Fatal here vs. timeout approach, etc.
	      // hack: fail sooner.
	      sm2.setup({
	        'flashLoadTimeout': 1
	      });
	    }
	
	    if (doc.removeEventListener) {
	      doc.removeEventListener('DOMContentLoaded', domContentLoaded, false);
	    }
	
	    initMovie();
	
	    return true;
	
	  };
	
	  domContentLoadedIE = function() {
	
	    if (doc.readyState === 'complete') {
	      domContentLoaded();
	      doc.detachEvent('onreadystatechange', domContentLoadedIE);
	    }
	
	    return true;
	
	  };
	
	  winOnLoad = function() {
	
	    // catch edge case of initComplete() firing after window.load()
	    windowLoaded = true;
	
	    // catch case where DOMContentLoaded has been sent, but we're still in doc.readyState = 'interactive'
	    domContentLoaded();
	
	    event.remove(window, 'load', winOnLoad);
	
	  };
	
	  /**
	   * miscellaneous run-time, pre-init stuff
	   */
	
	  preInit = function() {
	
	    if (mobileHTML5) {
	
	      // prefer HTML5 for mobile + tablet-like devices, probably more reliable vs. flash at this point.
	
	      // <d>
	      if (!sm2.setupOptions.useHTML5Audio || sm2.setupOptions.preferFlash) {
	        // notify that defaults are being changed.
	        messages.push(strings.mobileUA);
	      }
	      // </d>
	
	      sm2.setupOptions.useHTML5Audio = true;
	      sm2.setupOptions.preferFlash = false;
	
	      if (is_iDevice || (isAndroid && !ua.match(/android\s2\.3/i))) {
	        // iOS and Android devices tend to work better with a single audio instance, specifically for chained playback of sounds in sequence.
	        // common use case: exiting sound onfinish() -> createSound() -> play()
	        // <d>
	        messages.push(strings.globalHTML5);
	        // </d>
	        if (is_iDevice) {
	          sm2.ignoreFlash = true;
	        }
	        useGlobalHTML5Audio = true;
	      }
	
	    }
	
	  };
	
	  preInit();
	
	  // sniff up-front
	  detectFlash();
	
	  // focus and window load, init (primarily flash-driven)
	  event.add(window, 'focus', handleFocus);
	  event.add(window, 'load', delayWaitForEI);
	  event.add(window, 'load', winOnLoad);
	
	  if (doc.addEventListener) {
	
	    doc.addEventListener('DOMContentLoaded', domContentLoaded, false);
	
	  } else if (doc.attachEvent) {
	
	    doc.attachEvent('onreadystatechange', domContentLoadedIE);
	
	  } else {
	
	    // no add/attachevent support - safe to assume no JS -> Flash either
	    debugTS('onload', false);
	    catchError({type:'NO_DOM2_EVENTS', fatal:true});
	
	  }
	
	} // SoundManager()
	
	// SM2_DEFER details: http://www.schillmania.com/projects/soundmanager2/doc/getstarted/#lazy-loading
	
	if (window.SM2_DEFER === undefined || !SM2_DEFER) {
	  soundManager = new SoundManager();
	}
	
	/**
	 * SoundManager public interfaces
	 * ------------------------------
	 */
	
	if (typeof module === 'object' && module && typeof module.exports === 'object') {
	
	  /**
	   * commonJS module
	   * note: SM2 requires a window global due to Flash, which makes calls to window.soundManager.
	   * flash may not always be needed, but this is not known until async init and SM2 may even "reboot" into Flash mode.
	   */
	
	  window.soundManager = soundManager;
	
	  module.exports.SoundManager = SoundManager;
	  module.exports.soundManager = soundManager;
	
	} else if (true) {
	
	  /**
	   * AMD - requireJS
	   * example usage:
	   * require(["/path/to/soundmanager2.js"], function(soundManager) {
	   *   soundManager.setup({
	   *     url: '/swf/',
	   *     onready: function() { ... }
	   *   })
	   * });
	   */
	
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    // assign globals
	    window.SoundManager = SoundManager;
	    window.soundManager = soundManager;
	    // ... and return the soundManager instance
	    return soundManager;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	} else {
	
	  // standard browser case
	
	  window.SoundManager = SoundManager; // constructor
	  window.soundManager = soundManager; // public API, flash callbacks etc.
	
	}
	
	}(window));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/buildin/module.js */ 23)(module)))

/***/ },
/* 21 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 22 */
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 23 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 24 */
/*!***************************************!*\
  !*** ./~/neon/stdlib/custom_event.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	Class('CustomEvent')({
	    prototype : {
	        bubbles                       : true,
	        cancelable                    : true,
	        currentTarget                 : null,
	        timeStamp                     : 0,
	        target                        : null,
	        type                          : '',
	        isPropagationStopped          : false,
	        isDefaultPrevented            : false,
	        isImmediatePropagationStopped : false,
	        areImmediateHandlersPrevented : false,
	        init : function init(type, data) {
	            this.type = type;
	            if (typeof data !== 'undefined') {
	                for(var property in data) {
	                    if (data.hasOwnProperty(property)) {
	                        this[property] = data[property];
	                    }
	                }
	            }
	        },
	        stopPropagation : function stopPropagation() {
	            this.isPropagationStopped = true;
	        },
	        preventDefault : function preventDefault() {
	            this.isDefaultPrevented = true;
	        },
	        stopImmediatePropagation : function stopImmediatePropagation() {
	            this.preventImmediateHandlers();
	            this.stopPropagation();
	        },
	        preventImmediateHandlers : function preventImmediateHandlers() {
	            this.areImmediateHandlersPrevented = true;
	        }
	    }
	});


/***/ },
/* 25 */
/*!***********************************************!*\
  !*** ./~/neon/stdlib/custom_event_support.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	Module('CustomEventSupport')({
	
	    eventListeners : null,
	
	    bind : function(type, eventHandler) {
	        var found, i, listeners;
	
	        if(!this.eventListeners) {
	            this.eventListeners = {};
	        }
	
	        if(!this.eventListeners[type]) {
	            this.eventListeners[type] = [];
	        }
	
	        found  = false;
	
	        listeners = this.eventListeners[type];
	        for (i = 0; i < listeners.length; i++) {
	            if (listeners[i] === eventHandler) {
	                found = true;
	                break;
	            }
	        }
	
	        if(!found) {
	            this.eventListeners[type].push(eventHandler);
	        }
	
	        return this;
	    },
	
	    unbind : function(type, eventHandler) {
	        var i, found, listeners;
	
	        found  = false;
	
	        if(!this.eventListeners) {
	            this.eventListeners = {};
	        }
	
	        if(typeof eventHandler == 'undefined') {
	            this.eventListeners[type] = [];
	        }
	
	        listeners = this.eventListeners[type];
	        for (i = 0; i < listeners.length; i++) {
	            if(listeners[i] === eventHandler) {
	                found = true;
	                break;
	            }
	        }
	
	        if(found) {
	            this.eventListeners[type].splice(i, 1);
	        }
	
	        return this;
	    },
	
	    dispatch : function(type, data) {
	            var event, listeners, instance, i;
	
	            if (this.eventListeners === null) {
	                this.eventListeners = {};
	            }
	
	            if (typeof data === 'undefined') {
	                data = {};
	            }
	
	            if (data.hasOwnProperty('target') === false) {
	                data.target = this;
	            }
	
	            event         = new CustomEvent(type, data);
	            listeners     = this.eventListeners[type] || [];
	            instance      = this;
	
	            for (i = 0; i < listeners.length; i = i + 1) {
	                listeners[i].call(instance, event);
	                if (event.areImmediateHandlersPrevented === true) {
	                    break;
	                }
	            }
	
	            return event;
	    },
	
	    prototype : {
	
	        eventListeners : null,
	
	        bind : function(type, eventHandler) {
	            var found, i, listeners;
	
	            if(!this.eventListeners) {
	                this.eventListeners = {};
	            }
	
	            if(!this.eventListeners[type]) {
	                this.eventListeners[type] = [];
	            }
	
	            found  = false;
	
	            listeners = this.eventListeners[type];
	            for (i = 0; i < listeners.length; i++) {
	                if(listeners[i] === eventHandler) {
	                    found = true;
	                    break;
	                }
	            }
	
	            if(!found) {
	                this.eventListeners[type].push(eventHandler);
	            }
	
	            return this;
	        },
	
	        unbind : function(type, eventHandler) {
	            var i, found, listeners;
	
	            found = false;
	            i     = 0;
	
	            if(!this.eventListeners) {
	                this.eventListeners = {};
	            }
	
	            if(typeof eventHandler == 'undefined') {
	                this.eventListeners[type] = [];
	            }
	
	            listeners = this.eventListeners[type];
	            for (i = 0; i < listeners.length; i++) {
	                if(listeners[i] == eventHandler) {
	                    found = true;
	                    break;
	                }
	            }
	
	            if(found) {
	                this.eventListeners[type].splice(i, 1);
	            }
	
	            return this;
	        },
	
	        dispatch : function(type, data) {
	            var event, listeners, instance, i;
	
	            if (this.eventListeners === null) {
	                this.eventListeners = {};
	            }
	
	            if (typeof data === 'undefined') {
	                data = {};
	            }
	
	            if (data.hasOwnProperty('target') === false) {
	                data.target = this;
	            }
	
	            event         = new CustomEvent(type, data);
	            listeners     = this.eventListeners[type] || [];
	            instance      = this;
	
	            for (i = 0; i < listeners.length; i = i + 1) {
	                listeners[i].call(instance, event);
	                if (event.areImmediateHandlersPrevented === true) {
	                    break;
	                }
	            }
	
	            return event;
	        }
	    }
	});


/***/ },
/* 26 */
/*!***************************************!*\
  !*** ./~/neon/stdlib/node_support.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	Module('NodeSupport')({
	    prototype : {
	        parent      : null,
	
	        children    : [],
	
	        appendChild : function(child) {
	            if(child.parent) {
	                child.parent.removeChild(child);
	            }
	
	            if(!this.hasOwnProperty('children')) {
	                this.children = [];
	            }
	
	            this.children.push(child);
	            this[child.name] = child;
	            child.setParent(this);
	            return child;
	        },
	
	        insertBefore : function (child, beforeChild) {
	            var position;
	
	            if (child.parent) {
	                child.parent.removeChild(child);
	            }
	
	            if (!this.hasOwnProperty('children')) {
	                this.children = [];
	            }
	
	            if (typeof beforeChild === 'undefined') {
	                this.appendChild(child);
	            } else {
	                position = this.children.indexOf(beforeChild);
	                this.children.splice(position, 0, child);
	
	                this[child.name] = child;
	                child.setParent(this);
	            }
	
	            return child;
	
	        },
	
	        insertChild : function(child, position) {
	            console.warn('NodeSupport insertChild method is deprecated, try insertBefore');
	
	            if (child.parent) {
	                child.parent.removeChild(child);
	            }
	
	            if (!this.hasOwnProperty('children')) {
	                this.children = [];
	            }
	
	            if (typeof position == 'undefined') {
	                this.children.push(child);
	                this[child.name] = child;
	                child.setParent(this);
	                return child;
	            }
	
	            this.children.splice(position, 0, child);
	            this[child.name] = child;
	            child.setParent(this);
	            return child;
	        },
	
	        removeChild : function (child) {
	            var position = this.children.indexOf(child);
	
	            if (position !== -1) {
	                this.children.splice(position, 1);
	                delete this[child.name];
	                child.parent = null;
	            }
	
	            return child;
	        },
	
	        setParent   : function (parent) {
	            this.parent = parent;
	            return this;
	        },
	
	        getDescendants : function () {
	            var nodes = [];
	            this.children.forEach(function (node) {
	                nodes.push(node);
	            });
	            this.children.forEach(function (node) {
	                nodes = nodes.concat(node.getDescendants());
	            });
	            return nodes;
	        },
	
	        getPreviousSibling : function () {
	            if (typeof this.parent === 'undefined') {
	                return;
	            }
	
	            if (this.parent.children[0] === this) {
	                return;
	            }
	
	            return this.parent.children[ this.parent.children.indexOf(this) - 1 ];
	        },
	
	        getNextSibling : function () {
	            if (typeof this.parent === 'undefined') {
	                return;
	            }
	
	            if (this.parent.children[ this.parent.children.length - 1 ] === this) {
	                return;
	            }
	
	            return this.parent.children[ this.parent.children.indexOf(this) + 1 ];
	        }
	    }
	});


/***/ },
/* 27 */
/*!*******************************************!*\
  !*** ./~/neon/stdlib/bubbling_support.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	Module('BubblingSupport')({
	        dispatch : function (type, data) {
	            data = data || {};
	            var event = CustomEventSupport.prototype.dispatch.call(this, type, data);
	            if (event.isPropagationStopped === false) {
	                if (this.parent && this.parent.dispatch) {
	                    data.target = event.target;
	                    data.currentTarget = this.parent;
	                    this.parent.dispatch(event.type, data);
	                }
	            }
	            return event;
	        },
	
	        prototype : {
	            dispatch : function (type, data) {
	                data = data || {};
	
	                var event = CustomEventSupport.prototype.dispatch.call(this, type, data);
	
	                if (event.isPropagationStopped === false && event.bubbles === true) {
	                    if (this.parent && this.parent.dispatch) {
	                        data.target = event.target;
	                        data.currentTarget = this.parent;
	                        this.parent.dispatch(event.type, data);
	                    }
	                }
	
	                return event;
	            }
	        }
	    });


/***/ },
/* 28 */
/*!****************************!*\
  !*** ./~/moment/moment.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.10.2
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	
	(function (global, factory) {
	    true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';
	
	    var hookCallback;
	
	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }
	
	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }
	
	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false
	        };
	    }
	
	    function isArray(input) {
	        return Object.prototype.toString.call(input) === '[object Array]';
	    }
	
	    function isDate(input) {
	        return Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
	    }
	
	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }
	
	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }
	
	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }
	
	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }
	
	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }
	
	        return a;
	    }
	
	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }
	
	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            m._isValid = !isNaN(m._d.getTime()) &&
	                m._pf.overflow < 0 &&
	                !m._pf.empty &&
	                !m._pf.invalidMonth &&
	                !m._pf.nullInput &&
	                !m._pf.invalidFormat &&
	                !m._pf.userInvalidated;
	
	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    m._pf.charsLeftOver === 0 &&
	                    m._pf.unusedTokens.length === 0 &&
	                    m._pf.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }
	
	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(m._pf, flags);
	        }
	        else {
	            m._pf.userInvalidated = true;
	        }
	
	        return m;
	    }
	
	    var momentProperties = utils_hooks__hooks.momentProperties = [];
	
	    function copyConfig(to, from) {
	        var i, prop, val;
	
	        if (typeof from._isAMomentObject !== 'undefined') {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (typeof from._i !== 'undefined') {
	            to._i = from._i;
	        }
	        if (typeof from._f !== 'undefined') {
	            to._f = from._f;
	        }
	        if (typeof from._l !== 'undefined') {
	            to._l = from._l;
	        }
	        if (typeof from._strict !== 'undefined') {
	            to._strict = from._strict;
	        }
	        if (typeof from._tzm !== 'undefined') {
	            to._tzm = from._tzm;
	        }
	        if (typeof from._isUTC !== 'undefined') {
	            to._isUTC = from._isUTC;
	        }
	        if (typeof from._offset !== 'undefined') {
	            to._offset = from._offset;
	        }
	        if (typeof from._pf !== 'undefined') {
	            to._pf = from._pf;
	        }
	        if (typeof from._locale !== 'undefined') {
	            to._locale = from._locale;
	        }
	
	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (typeof val !== 'undefined') {
	                    to[prop] = val;
	                }
	            }
	        }
	
	        return to;
	    }
	
	    var updateInProgress = false;
	
	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(+config._d);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }
	
	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && hasOwnProp(obj, '_isAMomentObject'));
	    }
	
	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;
	
	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            if (coercedNumber >= 0) {
	                value = Math.floor(coercedNumber);
	            } else {
	                value = Math.ceil(coercedNumber);
	            }
	        }
	
	        return value;
	    }
	
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }
	
	    function Locale() {
	    }
	
	    var locales = {};
	    var globalLocale;
	
	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }
	
	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;
	
	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }
	
	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && typeof module !== 'undefined' &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                __webpack_require__(/*! ./locale */ 42)("./" + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }
	
	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (typeof values === 'undefined') {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }
	
	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }
	
	        return globalLocale._abbr;
	    }
	
	    function defineLocale (name, values) {
	        if (values !== null) {
	            values.abbr = name;
	            if (!locales[name]) {
	                locales[name] = new Locale();
	            }
	            locales[name].set(values);
	
	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	
	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }
	
	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;
	
	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }
	
	        if (!key) {
	            return globalLocale;
	        }
	
	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }
	
	        return chooseLocale(key);
	    }
	
	    var aliases = {};
	
	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }
	
	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }
	
	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;
	
	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }
	
	        return normalizedInput;
	    }
	
	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }
	
	    function get_set__get (mom, unit) {
	        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
	    }
	
	    function get_set__set (mom, unit, value) {
	        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	    }
	
	    // MOMENTS
	
	    function getSet (units, value) {
	        var unit;
	        if (typeof units === 'object') {
	            for (unit in units) {
	                this.set(unit, units[unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (typeof this[units] === 'function') {
	                return this[units](value);
	            }
	        }
	        return this;
	    }
	
	    function zeroFill(number, targetLength, forceSign) {
	        var output = '' + Math.abs(number),
	            sign = number >= 0;
	
	        while (output.length < targetLength) {
	            output = '0' + output;
	        }
	        return (sign ? (forceSign ? '+' : '') : '-') + output;
	    }
	
	    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g;
	
	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
	
	    var formatFunctions = {};
	
	    var formatTokenFunctions = {};
	
	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }
	
	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }
	
	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;
	
	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }
	
	        return function (mom) {
	            var output = '';
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }
	
	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }
	
	        format = expandFormat(format, m.localeData());
	
	        if (!formatFunctions[format]) {
	            formatFunctions[format] = makeFormatFunction(format);
	        }
	
	        return formatFunctions[format](m);
	    }
	
	    function expandFormat(format, locale) {
	        var i = 5;
	
	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }
	
	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }
	
	        return format;
	    }
	
	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999
	
	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf
	
	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	
	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
	
	    // any word (or two) characters or numbers including two/three word month in arabic.
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	
	    var regexes = {};
	
	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = typeof regex === 'function' ? regex : function (isStrict) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }
	
	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }
	
	        return regexes[token](config._strict, config._locale);
	    }
	
	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }
	
	    var tokens = {};
	
	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }
	
	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }
	
	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }
	
	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	
	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }
	
	    // FORMATTING
	
	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });
	
	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });
	
	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });
	
	    // ALIASES
	
	    addUnitAlias('month', 'M');
	
	    // PARSING
	
	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  matchWord);
	    addRegexToken('MMMM', matchWord);
	
	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });
	
	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            config._pf.invalidMonth = input;
	        }
	    });
	
	    // LOCALES
	
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m) {
	        return this._months[m.month()];
	    }
	
	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m) {
	        return this._monthsShort[m.month()];
	    }
	
	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;
	
	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }
	
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }
	
	    // MOMENTS
	
	    function setMonth (mom, value) {
	        var dayOfMonth;
	
	        // TODO: Move this out of here!
	        if (typeof value === 'string') {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (typeof value !== 'number') {
	                return mom;
	            }
	        }
	
	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }
	
	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }
	
	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }
	
	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;
	
	        if (a && m._pf.overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;
	
	            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	
	            m._pf.overflow = overflow;
	        }
	
	        return m;
	    }
	
	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }
	
	    function deprecate(msg, fn) {
	        var firstTime = true;
	        return extend(function () {
	            if (firstTime) {
	                warn(msg);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }
	
	    var deprecations = {};
	
	    function deprecateSimple(name, msg) {
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }
	
	    utils_hooks__hooks.suppressDeprecationWarnings = false;
	
	    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	
	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
	        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
	        ['YYYY-DDD', /\d{4}-\d{3}/]
	    ];
	
	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
	        ['HH:mm', /(T| )\d\d:\d\d/],
	        ['HH', /(T| )\d\d/]
	    ];
	
	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
	
	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = from_string__isoRegex.exec(string);
	
	        if (match) {
	            config._pf.iso = true;
	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(string)) {
	                    // match[5] should be 'T' or undefined
	                    config._f = isoDates[i][0] + (match[6] || ' ');
	                    break;
	                }
	            }
	            for (i = 0, l = isoTimes.length; i < l; i++) {
	                if (isoTimes[i][1].exec(string)) {
	                    config._f += isoTimes[i][0];
	                    break;
	                }
	            }
	            if (string.match(matchOffset)) {
	                config._f += 'Z';
	            }
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }
	
	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);
	
	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }
	
	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }
	
	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'https://github.com/moment/moment/issues/1407 for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );
	
	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);
	
	        //the date constructor doesn't accept years < 1970
	        if (y < 1970) {
	            date.setFullYear(y);
	        }
	        return date;
	    }
	
	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));
	        if (y < 1970) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }
	
	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });
	
	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
	
	    // ALIASES
	
	    addUnitAlias('year', 'y');
	
	    // PARSING
	
	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);
	
	    addParseToken(['YYYY', 'YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	
	    // HELPERS
	
	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }
	
	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }
	
	    // HOOKS
	
	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };
	
	    // MOMENTS
	
	    var getSetYear = makeGetSet('FullYear', false);
	
	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }
	
	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
	
	    // ALIASES
	
	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');
	
	    // PARSING
	
	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);
	
	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });
	
	    // HELPERS
	
	    // firstDayOfWeek       0 = sun, 6 = sat
	    //                      the day of the week that starts the week
	    //                      (usually sunday or monday)
	    // firstDayOfWeekOfYear 0 = sun, 6 = sat
	    //                      the first week is the week that contains the first
	    //                      of this day of the week
	    //                      (eg. ISO weeks use thursday (4))
	    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
	        var end = firstDayOfWeekOfYear - firstDayOfWeek,
	            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
	            adjustedMoment;
	
	
	        if (daysToDayOfWeek > end) {
	            daysToDayOfWeek -= 7;
	        }
	
	        if (daysToDayOfWeek < end - 7) {
	            daysToDayOfWeek += 7;
	        }
	
	        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
	        return {
	            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
	            year: adjustedMoment.year()
	        };
	    }
	
	    // LOCALES
	
	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }
	
	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };
	
	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }
	
	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }
	
	    // MOMENTS
	
	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }
	
	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }
	
	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
	
	    // ALIASES
	
	    addUnitAlias('dayOfYear', 'DDD');
	
	    // PARSING
	
	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });
	
	    // HELPERS
	
	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
	        var d = createUTCDate(year, 0, 1).getUTCDay();
	        var daysToAdd;
	        var dayOfYear;
	
	        d = d === 0 ? 7 : d;
	        weekday = weekday != null ? weekday : firstDayOfWeek;
	        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
	        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;
	
	        return {
	            year      : dayOfYear > 0 ? year      : year - 1,
	            dayOfYear : dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
	        };
	    }
	
	    // MOMENTS
	
	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }
	
	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }
	
	    function currentDateArray(config) {
	        var now = new Date();
	        if (config._useUTC) {
	            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
	        }
	        return [now.getFullYear(), now.getMonth(), now.getDate()];
	    }
	
	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;
	
	        if (config._d) {
	            return;
	        }
	
	        currentDate = currentDateArray(config);
	
	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }
	
	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
	
	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                config._pf._overflowDayOfYear = true;
	            }
	
	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }
	
	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }
	
	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }
	
	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }
	
	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }
	
	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }
	
	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp;
	
	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;
	
	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;
	
	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);
	
	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < dow) {
	                    ++week;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
	
	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	    }
	
	    utils_hooks__hooks.ISO_8601 = function () {};
	
	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }
	
	        config._a = [];
	        config._pf.empty = true;
	
	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;
	
	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
	
	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    config._pf.unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    config._pf.empty = false;
	                }
	                else {
	                    config._pf.unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                config._pf.unusedTokens.push(token);
	            }
	        }
	
	        // add remaining unparsed input length to the string
	        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            config._pf.unusedInput.push(string);
	        }
	
	        // clear _12h flag if hour is <= 12
	        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
	            config._pf.bigHour = undefined;
	        }
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
	
	        configFromArray(config);
	        checkOverflow(config);
	    }
	
	
	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;
	
	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }
	
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,
	
	            scoreToBeat,
	            i,
	            currentScore;
	
	        if (config._f.length === 0) {
	            config._pf.invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }
	
	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._pf = defaultParsingFlags();
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);
	
	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }
	
	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += tempConfig._pf.charsLeftOver;
	
	            //or tokens
	            currentScore += tempConfig._pf.unusedTokens.length * 10;
	
	            tempConfig._pf.score = currentScore;
	
	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }
	
	        extend(config, bestMoment || tempConfig);
	    }
	
	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }
	
	        var i = normalizeObjectUnits(config._i);
	        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];
	
	        configFromArray(config);
	    }
	
	    function createFromConfig (config) {
	        var input = config._i,
	            format = config._f,
	            res;
	
	        config._locale = config._locale || locale_locales__getLocale(config._l);
	
	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }
	
	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }
	
	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        } else {
	            configFromInput(config);
	        }
	
	        res = new Moment(checkOverflow(config));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }
	
	        return res;
	    }
	
	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date();
	        } else if (isDate(input)) {
	            config._d = new Date(+input);
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }
	
	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};
	
	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;
	        c._pf = defaultParsingFlags();
	
	        return createFromConfig(c);
	    }
	
	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }
	
	    var prototypeMin = deprecate(
	         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
	         function () {
	             var other = local__createLocal.apply(null, arguments);
	             return other < this ? this : other;
	         }
	     );
	
	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            return other > this ? this : other;
	        }
	    );
	
	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }
	
	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isBefore', args);
	    }
	
	    function max () {
	        var args = [].slice.call(arguments, 0);
	
	        return pickBy('isAfter', args);
	    }
	
	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;
	
	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 36e5; // 1000 * 60 * 60
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;
	
	        this._data = {};
	
	        this._locale = locale_locales__getLocale();
	
	        this._bubble();
	    }
	
	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }
	
	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }
	
	    offset('Z', ':');
	    offset('ZZ', '');
	
	    // PARSING
	
	    addRegexToken('Z',  matchOffset);
	    addRegexToken('ZZ', matchOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(input);
	    });
	
	    // HELPERS
	
	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;
	
	    function offsetFromString(string) {
	        var matches = ((string || '').match(matchOffset) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);
	
	        return parts[0] === '+' ? minutes : -minutes;
	    }
	
	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(+res._d + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	        return model._isUTC ? local__createLocal(input).zone(model._offset || 0) : local__createLocal(input).local();
	    }
	
	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }
	
	    // HOOKS
	
	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};
	
	    // MOMENTS
	
	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(input);
	            }
	            if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }
	
	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }
	
	            this.utcOffset(input, keepLocalTime);
	
	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }
	
	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }
	
	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;
	
	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }
	
	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            this.utcOffset(offsetFromString(this._i));
	        }
	        return this;
	    }
	
	    function hasAlignedHourOffset (input) {
	        if (!input) {
	            input = 0;
	        }
	        else {
	            input = local__createLocal(input).utcOffset();
	        }
	
	        return (this.utcOffset() - input) % 60 === 0;
	    }
	
	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }
	
	    function isDaylightSavingTimeShifted () {
	        if (this._a) {
	            var other = this._isUTC ? create_utc__createUTC(this._a) : local__createLocal(this._a);
	            return this.isValid() && compareArrays(this._a, other.toArray()) > 0;
	        }
	
	        return false;
	    }
	
	    function isLocal () {
	        return !this._isUTC;
	    }
	
	    function isUtcOffset () {
	        return this._isUTC;
	    }
	
	    function isUtc () {
	        return this._isUTC && this._offset === 0;
	    }
	
	    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;
	
	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
	
	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;
	
	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])        * sign,
	                h  : toInt(match[HOUR])        * sign,
	                m  : toInt(match[MINUTE])      * sign,
	                s  : toInt(match[SECOND])      * sign,
	                ms : toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = create__isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                d : parseIso(match[4], sign),
	                h : parseIso(match[5], sign),
	                m : parseIso(match[6], sign),
	                s : parseIso(match[7], sign),
	                w : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));
	
	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }
	
	        ret = new Duration(duration);
	
	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }
	
	        return ret;
	    }
	
	    create__createDuration.fn = Duration.prototype;
	
	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }
	
	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};
	
	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }
	
	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
	
	        return res;
	    }
	
	    function momentsDifference(base, other) {
	        var res;
	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }
	
	        return res;
	    }
	
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
	                tmp = val; val = period; period = tmp;
	            }
	
	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }
	
	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = duration._days,
	            months = duration._months;
	        updateOffset = updateOffset == null ? true : updateOffset;
	
	        if (milliseconds) {
	            mom._d.setTime(+mom._d + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }
	
	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');
	
	    function moment_calendar__calendar (time) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            diff = this.diff(sod, 'days', true),
	            format = diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';
	        return this.format(this.localeData().calendar(format, this, local__createLocal(now)));
	    }
	
	    function clone () {
	        return new Moment(this);
	    }
	
	    function isAfter (input, units) {
	        var inputMs;
	        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this > +input;
	        } else {
	            inputMs = isMoment(input) ? +input : +local__createLocal(input);
	            return inputMs < +this.clone().startOf(units);
	        }
	    }
	
	    function isBefore (input, units) {
	        var inputMs;
	        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this < +input;
	        } else {
	            inputMs = isMoment(input) ? +input : +local__createLocal(input);
	            return +this.clone().endOf(units) < inputMs;
	        }
	    }
	
	    function isBetween (from, to, units) {
	        return this.isAfter(from, units) && this.isBefore(to, units);
	    }
	
	    function isSame (input, units) {
	        var inputMs;
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this === +input;
	        } else {
	            inputMs = +local__createLocal(input);
	            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
	        }
	    }
	
	    function absFloor (number) {
	        if (number < 0) {
	            return Math.ceil(number);
	        } else {
	            return Math.floor(number);
	        }
	    }
	
	    function diff (input, units, asFloat) {
	        var that = cloneWithOffset(input, this),
	            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
	            delta, output;
	
	        units = normalizeUnits(units);
	
	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }
	
	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;
	
	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }
	
	        return -(wholeMonthDiff + adjust);
	    }
	
	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	
	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }
	
	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if ('function' === typeof Date.prototype.toISOString) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }
	
	    function format (inputString) {
	        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
	        return this.localeData().postformat(output);
	    }
	
	    function from (time, withoutSuffix) {
	        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	    }
	
	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }
	
	    function locale (key) {
	        var newLocaleData;
	
	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }
	
	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );
	
	    function localeData () {
	        return this._locale;
	    }
	
	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	        }
	
	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }
	
	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }
	
	        return this;
	    }
	
	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }
	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }
	
	    function to_type__valueOf () {
	        return +this._d - ((this._offset || 0) * 60000);
	    }
	
	    function unix () {
	        return Math.floor(+this / 1000);
	    }
	
	    function toDate () {
	        return this._offset ? new Date(+this) : this._d;
	    }
	
	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }
	
	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }
	
	    function parsingFlags () {
	        return extend({}, this._pf);
	    }
	
	    function invalidAt () {
	        return this._pf.overflow;
	    }
	
	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });
	
	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });
	
	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }
	
	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');
	
	    // ALIASES
	
	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');
	
	    // PARSING
	
	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);
	
	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });
	
	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	
	    // HELPERS
	
	    function weeksInYear(year, dow, doy) {
	        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
	    }
	
	    // MOMENTS
	
	    function getSetWeekYear (input) {
	        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
	        return input == null ? year : this.add((input - year), 'y');
	    }
	
	    function getSetISOWeekYear (input) {
	        var year = weekOfYear(this, 1, 4).year;
	        return input == null ? year : this.add((input - year), 'y');
	    }
	
	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }
	
	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }
	
	    addFormatToken('Q', 0, 0, 'quarter');
	
	    // ALIASES
	
	    addUnitAlias('quarter', 'Q');
	
	    // PARSING
	
	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });
	
	    // MOMENTS
	
	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }
	
	    addFormatToken('D', ['DD', 2], 'Do', 'date');
	
	    // ALIASES
	
	    addUnitAlias('date', 'D');
	
	    // PARSING
	
	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });
	
	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });
	
	    // MOMENTS
	
	    var getSetDayOfMonth = makeGetSet('Date', true);
	
	    addFormatToken('d', 0, 'do', 'day');
	
	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });
	
	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });
	
	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });
	
	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');
	
	    // ALIASES
	
	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');
	
	    // PARSING
	
	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   matchWord);
	    addRegexToken('ddd',  matchWord);
	    addRegexToken('dddd', matchWord);
	
	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
	        var weekday = config._locale.weekdaysParse(input);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            config._pf.invalidWeekday = input;
	        }
	    });
	
	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });
	
	    // HELPERS
	
	    function parseWeekday(input, locale) {
	        if (typeof input === 'string') {
	            if (!isNaN(input)) {
	                input = parseInt(input, 10);
	            }
	            else {
	                input = locale.weekdaysParse(input);
	                if (typeof input !== 'number') {
	                    return null;
	                }
	            }
	        }
	        return input;
	    }
	
	    // LOCALES
	
	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m) {
	        return this._weekdays[m.day()];
	    }
	
	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return this._weekdaysShort[m.day()];
	    }
	
	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return this._weekdaysMin[m.day()];
	    }
	
	    function localeWeekdaysParse (weekdayName) {
	        var i, mom, regex;
	
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	        }
	
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            if (!this._weekdaysParse[i]) {
	                mom = local__createLocal([2000, 1]).day(i);
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }
	
	    // MOMENTS
	
	    function getSetDayOfWeek (input) {
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }
	
	    function getSetLocaleDayOfWeek (input) {
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }
	
	    function getSetISODayOfWeek (input) {
	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.
	        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
	    }
	
	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, function () {
	        return this.hours() % 12 || 12;
	    });
	
	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }
	
	    meridiem('a', true);
	    meridiem('A', false);
	
	    // ALIASES
	
	    addUnitAlias('hour', 'h');
	
	    // PARSING
	
	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }
	
	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);
	
	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        config._pf.bigHour = true;
	    });
	
	    // LOCALES
	
	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }
	
	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }
	
	
	    // MOMENTS
	
	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);
	
	    addFormatToken('m', ['mm', 2], 0, 'minute');
	
	    // ALIASES
	
	    addUnitAlias('minute', 'm');
	
	    // PARSING
	
	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);
	
	    // MOMENTS
	
	    var getSetMinute = makeGetSet('Minutes', false);
	
	    addFormatToken('s', ['ss', 2], 0, 'second');
	
	    // ALIASES
	
	    addUnitAlias('second', 's');
	
	    // PARSING
	
	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);
	
	    // MOMENTS
	
	    var getSetSecond = makeGetSet('Seconds', false);
	
	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });
	
	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });
	
	    function millisecond__milliseconds (token) {
	        addFormatToken(0, [token, 3], 0, 'millisecond');
	    }
	
	    millisecond__milliseconds('SSS');
	    millisecond__milliseconds('SSSS');
	
	    // ALIASES
	
	    addUnitAlias('millisecond', 'ms');
	
	    // PARSING
	
	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);
	    addRegexToken('SSSS', matchUnsigned);
	    addParseToken(['S', 'SS', 'SSS', 'SSSS'], function (input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    });
	
	    // MOMENTS
	
	    var getSetMillisecond = makeGetSet('Milliseconds', false);
	
	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');
	
	    // MOMENTS
	
	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }
	
	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }
	
	    var momentPrototype__proto = Moment.prototype;
	
	    momentPrototype__proto.add          = add_subtract__add;
	    momentPrototype__proto.calendar     = moment_calendar__calendar;
	    momentPrototype__proto.clone        = clone;
	    momentPrototype__proto.diff         = diff;
	    momentPrototype__proto.endOf        = endOf;
	    momentPrototype__proto.format       = format;
	    momentPrototype__proto.from         = from;
	    momentPrototype__proto.fromNow      = fromNow;
	    momentPrototype__proto.get          = getSet;
	    momentPrototype__proto.invalidAt    = invalidAt;
	    momentPrototype__proto.isAfter      = isAfter;
	    momentPrototype__proto.isBefore     = isBefore;
	    momentPrototype__proto.isBetween    = isBetween;
	    momentPrototype__proto.isSame       = isSame;
	    momentPrototype__proto.isValid      = moment_valid__isValid;
	    momentPrototype__proto.lang         = lang;
	    momentPrototype__proto.locale       = locale;
	    momentPrototype__proto.localeData   = localeData;
	    momentPrototype__proto.max          = prototypeMax;
	    momentPrototype__proto.min          = prototypeMin;
	    momentPrototype__proto.parsingFlags = parsingFlags;
	    momentPrototype__proto.set          = getSet;
	    momentPrototype__proto.startOf      = startOf;
	    momentPrototype__proto.subtract     = add_subtract__subtract;
	    momentPrototype__proto.toArray      = toArray;
	    momentPrototype__proto.toDate       = toDate;
	    momentPrototype__proto.toISOString  = moment_format__toISOString;
	    momentPrototype__proto.toJSON       = moment_format__toISOString;
	    momentPrototype__proto.toString     = toString;
	    momentPrototype__proto.unix         = unix;
	    momentPrototype__proto.valueOf      = to_type__valueOf;
	
	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;
	
	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;
	
	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;
	
	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;
	
	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;
	
	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;
	
	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;
	
	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;
	
	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;
	
	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;
	
	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;
	
	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;
	
	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);
	
	    var momentPrototype = momentPrototype__proto;
	
	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }
	
	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }
	
	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };
	
	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key];
	        return typeof output === 'function' ? output.call(mom, now) : output;
	    }
	
	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY LT',
	        LLLL : 'dddd, MMMM D, YYYY LT'
	    };
	
	    function longDateFormat (key) {
	        var output = this._longDateFormat[key];
	        if (!output && this._longDateFormat[key.toUpperCase()]) {
	            output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
	                return val.slice(1);
	            });
	            this._longDateFormat[key] = output;
	        }
	        return output;
	    }
	
	    var defaultInvalidDate = 'Invalid date';
	
	    function invalidDate () {
	        return this._invalidDate;
	    }
	
	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;
	
	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }
	
	    function preParsePostFormat (string) {
	        return string;
	    }
	
	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };
	
	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (typeof output === 'function') ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }
	
	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
	    }
	
	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (typeof prop === 'function') {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
	    }
	
	    var prototype__proto = Locale.prototype;
	
	    prototype__proto._calendar       = defaultCalendar;
	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto._longDateFormat = defaultLongDateFormat;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto._invalidDate    = defaultInvalidDate;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto._ordinal        = defaultOrdinal;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto._ordinalParse   = defaultOrdinalParse;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto._relativeTime   = defaultRelativeTime;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;
	
	    // Month
	    prototype__proto.months       =        localeMonths;
	    prototype__proto._months      = defaultLocaleMonths;
	    prototype__proto.monthsShort  =        localeMonthsShort;
	    prototype__proto._monthsShort = defaultLocaleMonthsShort;
	    prototype__proto.monthsParse  =        localeMonthsParse;
	
	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto._week = defaultLocaleWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;
	
	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto._weekdays      = defaultLocaleWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;
	
	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
	    prototype__proto.meridiem = localeMeridiem;
	
	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }
	
	    function list (format, index, field, count, setter) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }
	
	        format = format || '';
	
	        if (index != null) {
	            return lists__get(format, index, field, setter);
	        }
	
	        var i;
	        var out = [];
	        for (i = 0; i < count; i++) {
	            out[i] = lists__get(format, i, field, setter);
	        }
	        return out;
	    }
	
	    function lists__listMonths (format, index) {
	        return list(format, index, 'months', 12, 'month');
	    }
	
	    function lists__listMonthsShort (format, index) {
	        return list(format, index, 'monthsShort', 12, 'month');
	    }
	
	    function lists__listWeekdays (format, index) {
	        return list(format, index, 'weekdays', 7, 'day');
	    }
	
	    function lists__listWeekdaysShort (format, index) {
	        return list(format, index, 'weekdaysShort', 7, 'day');
	    }
	
	    function lists__listWeekdaysMin (format, index) {
	        return list(format, index, 'weekdaysMin', 7, 'day');
	    }
	
	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });
	
	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);
	
	    var mathAbs = Math.abs;
	
	    function duration_abs__abs () {
	        var data           = this._data;
	
	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);
	
	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);
	
	        return this;
	    }
	
	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);
	
	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;
	
	        return duration._bubble();
	    }
	
	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }
	
	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }
	
	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years = 0;
	
	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;
	
	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;
	
	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;
	
	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;
	
	        days += absFloor(hours / 24);
	
	        // Accurately convert days to years, assume start from year 0.
	        years = absFloor(daysToYears(days));
	        days -= absFloor(yearsToDays(years));
	
	        // 30 days to a month
	        // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
	        months += absFloor(days / 30);
	        days   %= 30;
	
	        // 12 months -> 1 year
	        years  += absFloor(months / 12);
	        months %= 12;
	
	        data.days   = days;
	        data.months = months;
	        data.years  = years;
	
	        return this;
	    }
	
	    function daysToYears (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        return days * 400 / 146097;
	    }
	
	    function yearsToDays (years) {
	        // years * 365 + absFloor(years / 4) -
	        //     absFloor(years / 100) + absFloor(years / 400);
	        return years * 146097 / 400;
	    }
	
	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;
	
	        units = normalizeUnits(units);
	
	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToYears(days) * 12;
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(yearsToDays(this._months / 12));
	            switch (units) {
	                case 'week'   : return days / 7            + milliseconds / 6048e5;
	                case 'day'    : return days                + milliseconds / 864e5;
	                case 'hour'   : return days * 24           + milliseconds / 36e5;
	                case 'minute' : return days * 24 * 60      + milliseconds / 6e4;
	                case 'second' : return days * 24 * 60 * 60 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }
	
	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }
	
	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }
	
	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');
	
	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }
	
	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }
	
	    var duration_get__milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');
	
	    function weeks () {
	        return absFloor(this.days() / 7);
	    }
	
	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };
	
	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }
	
	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));
	
	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes === 1          && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   === 1          && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    === 1          && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  === 1          && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   === 1          && ['y']           || ['yy', years];
	
	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }
	
	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }
	
	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);
	
	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }
	
	        return locale.postformat(output);
	    }
	
	    var iso_string__abs = Math.abs;
	
	    function iso_string__toISOString() {
	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = iso_string__abs(this.years());
	        var M = iso_string__abs(this.months());
	        var D = iso_string__abs(this.days());
	        var h = iso_string__abs(this.hours());
	        var m = iso_string__abs(this.minutes());
	        var s = iso_string__abs(this.seconds() + this.milliseconds() / 1000);
	        var total = this.asSeconds();
	
	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }
	
	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }
	
	    var duration_prototype__proto = Duration.prototype;
	
	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = duration_get__milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;
	
	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;
	
	    // Side effect imports
	
	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');
	
	    // PARSING
	
	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });
	
	    // Side effect imports
	
	
	    utils_hooks__hooks.version = '2.10.2';
	
	    setHookCallback(local__createLocal);
	
	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	
	    var _moment = utils_hooks__hooks;
	
	    return _moment;
	
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/buildin/module.js */ 23)(module)))

/***/ },
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/*!**********************************!*\
  !*** ./~/moment/locale ^\.\/.*$ ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 43,
		"./af.js": 43,
		"./ar": 47,
		"./ar-ma": 44,
		"./ar-ma.js": 44,
		"./ar-sa": 45,
		"./ar-sa.js": 45,
		"./ar-tn": 46,
		"./ar-tn.js": 46,
		"./ar.js": 47,
		"./az": 48,
		"./az.js": 48,
		"./be": 49,
		"./be.js": 49,
		"./bg": 50,
		"./bg.js": 50,
		"./bn": 51,
		"./bn.js": 51,
		"./bo": 52,
		"./bo.js": 52,
		"./br": 53,
		"./br.js": 53,
		"./bs": 54,
		"./bs.js": 54,
		"./ca": 55,
		"./ca.js": 55,
		"./cs": 56,
		"./cs.js": 56,
		"./cv": 57,
		"./cv.js": 57,
		"./cy": 58,
		"./cy.js": 58,
		"./da": 59,
		"./da.js": 59,
		"./de": 61,
		"./de-at": 60,
		"./de-at.js": 60,
		"./de.js": 61,
		"./el": 62,
		"./el.js": 62,
		"./en-au": 63,
		"./en-au.js": 63,
		"./en-ca": 64,
		"./en-ca.js": 64,
		"./en-gb": 65,
		"./en-gb.js": 65,
		"./eo": 66,
		"./eo.js": 66,
		"./es": 67,
		"./es.js": 67,
		"./et": 68,
		"./et.js": 68,
		"./eu": 69,
		"./eu.js": 69,
		"./fa": 70,
		"./fa.js": 70,
		"./fi": 71,
		"./fi.js": 71,
		"./fo": 72,
		"./fo.js": 72,
		"./fr": 74,
		"./fr-ca": 73,
		"./fr-ca.js": 73,
		"./fr.js": 74,
		"./fy": 75,
		"./fy.js": 75,
		"./gl": 76,
		"./gl.js": 76,
		"./he": 77,
		"./he.js": 77,
		"./hi": 78,
		"./hi.js": 78,
		"./hr": 79,
		"./hr.js": 79,
		"./hu": 80,
		"./hu.js": 80,
		"./hy-am": 81,
		"./hy-am.js": 81,
		"./id": 82,
		"./id.js": 82,
		"./is": 83,
		"./is.js": 83,
		"./it": 84,
		"./it.js": 84,
		"./ja": 85,
		"./ja.js": 85,
		"./ka": 86,
		"./ka.js": 86,
		"./km": 87,
		"./km.js": 87,
		"./ko": 88,
		"./ko.js": 88,
		"./lb": 89,
		"./lb.js": 89,
		"./lt": 90,
		"./lt.js": 90,
		"./lv": 91,
		"./lv.js": 91,
		"./mk": 92,
		"./mk.js": 92,
		"./ml": 93,
		"./ml.js": 93,
		"./mr": 94,
		"./mr.js": 94,
		"./ms-my": 95,
		"./ms-my.js": 95,
		"./my": 96,
		"./my.js": 96,
		"./nb": 97,
		"./nb.js": 97,
		"./ne": 98,
		"./ne.js": 98,
		"./nl": 99,
		"./nl.js": 99,
		"./nn": 100,
		"./nn.js": 100,
		"./pl": 101,
		"./pl.js": 101,
		"./pt": 103,
		"./pt-br": 102,
		"./pt-br.js": 102,
		"./pt.js": 103,
		"./ro": 104,
		"./ro.js": 104,
		"./ru": 105,
		"./ru.js": 105,
		"./sk": 106,
		"./sk.js": 106,
		"./sl": 107,
		"./sl.js": 107,
		"./sq": 108,
		"./sq.js": 108,
		"./sr": 110,
		"./sr-cyrl": 109,
		"./sr-cyrl.js": 109,
		"./sr.js": 110,
		"./sv": 111,
		"./sv.js": 111,
		"./ta": 112,
		"./ta.js": 112,
		"./th": 113,
		"./th.js": 113,
		"./tl-ph": 114,
		"./tl-ph.js": 114,
		"./tr": 115,
		"./tr.js": 115,
		"./tzm": 117,
		"./tzm-latn": 116,
		"./tzm-latn.js": 116,
		"./tzm.js": 117,
		"./uk": 118,
		"./uk.js": 118,
		"./uz": 119,
		"./uz.js": 119,
		"./vi": 120,
		"./vi.js": 120,
		"./zh-cn": 121,
		"./zh-cn.js": 121,
		"./zh-tw": 122,
		"./zh-tw.js": 122
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 42;


/***/ },
/* 43 */
/*!*******************************!*\
  !*** ./~/moment/locale/af.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : afrikaans (af)
	//! author : Werner Mollentze : https://github.com/wernerm
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var af = moment.defineLocale('af', {
	        months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
	        weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
	        weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
	        meridiemParse: /vm|nm/i,
	        isPM : function (input) {
	            return /^nm$/i.test(input);
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'vm' : 'VM';
	            } else {
	                return isLower ? 'nm' : 'NM';
	            }
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[Vandag om] LT',
	            nextDay : '[Môre om] LT',
	            nextWeek : 'dddd [om] LT',
	            lastDay : '[Gister om] LT',
	            lastWeek : '[Laas] dddd [om] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'oor %s',
	            past : '%s gelede',
	            s : '\'n paar sekondes',
	            m : '\'n minuut',
	            mm : '%d minute',
	            h : '\'n uur',
	            hh : '%d ure',
	            d : '\'n dag',
	            dd : '%d dae',
	            M : '\'n maand',
	            MM : '%d maande',
	            y : '\'n jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
	        },
	        week : {
	            dow : 1, // Maandag is die eerste dag van die week.
	            doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
	        }
	    });
	
	    return af;
	
	}));

/***/ },
/* 44 */
/*!**********************************!*\
  !*** ./~/moment/locale/ar-ma.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Moroccan Arabic (ar-ma)
	//! author : ElFadili Yassine : https://github.com/ElFadiliY
	//! author : Abdel Said : https://github.com/abdelsaid
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ar_ma = moment.defineLocale('ar-ma', {
	        months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ar_ma;
	
	}));

/***/ },
/* 45 */
/*!**********************************!*\
  !*** ./~/moment/locale/ar-sa.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic Saudi Arabia (ar-sa)
	//! author : Suhail Alkowaileet : https://github.com/xsoh
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    };
	
	    var ar_sa = moment.defineLocale('ar-sa', {
	        months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        preparse: function (string) {
	            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ar_sa;
	
	}));

/***/ },
/* 46 */
/*!**********************************!*\
  !*** ./~/moment/locale/ar-tn.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale  : Tunisian Arabic (ar-tn)
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ar_tn = moment.defineLocale('ar-tn', {
	        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'LT:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY LT',
	            LLLL: 'dddd D MMMM YYYY LT'
	        },
	        calendar: {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'في %s',
	            past: 'منذ %s',
	            s: 'ثوان',
	            m: 'دقيقة',
	            mm: '%d دقائق',
	            h: 'ساعة',
	            hh: '%d ساعات',
	            d: 'يوم',
	            dd: '%d أيام',
	            M: 'شهر',
	            MM: '%d أشهر',
	            y: 'سنة',
	            yy: '%d سنوات'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return ar_tn;
	
	}));

/***/ },
/* 47 */
/*!*******************************!*\
  !*** ./~/moment/locale/ar.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! Locale: Arabic (ar)
	//! Author: Abdel Said: https://github.com/abdelsaid
	//! Changes in months, weekdays: Ahmed Elkhatib
	//! Native plural forms: forabi https://github.com/forabi
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    }, pluralForm = function (n) {
	        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	    }, plurals = {
	        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	    }, pluralize = function (u) {
	        return function (number, withoutSuffix, string, isFuture) {
	            var f = pluralForm(number),
	                str = plurals[u][pluralForm(number)];
	            if (f === 2) {
	                str = str[withoutSuffix ? 0 : 1];
	            }
	            return str.replace(/%d/i, number);
	        };
	    }, months = [
	        'كانون الثاني يناير',
	        'شباط فبراير',
	        'آذار مارس',
	        'نيسان أبريل',
	        'أيار مايو',
	        'حزيران يونيو',
	        'تموز يوليو',
	        'آب أغسطس',
	        'أيلول سبتمبر',
	        'تشرين الأول أكتوبر',
	        'تشرين الثاني نوفمبر',
	        'كانون الأول ديسمبر'
	    ];
	
	    var ar = moment.defineLocale('ar', {
	        months : months,
	        monthsShort : months,
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم عند الساعة] LT',
	            nextDay: '[غدًا عند الساعة] LT',
	            nextWeek: 'dddd [عند الساعة] LT',
	            lastDay: '[أمس عند الساعة] LT',
	            lastWeek: 'dddd [عند الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'بعد %s',
	            past : 'منذ %s',
	            s : pluralize('s'),
	            m : pluralize('m'),
	            mm : pluralize('m'),
	            h : pluralize('h'),
	            hh : pluralize('h'),
	            d : pluralize('d'),
	            dd : pluralize('d'),
	            M : pluralize('M'),
	            MM : pluralize('M'),
	            y : pluralize('y'),
	            yy : pluralize('y')
	        },
	        preparse: function (string) {
	            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ar;
	
	}));

/***/ },
/* 48 */
/*!*******************************!*\
  !*** ./~/moment/locale/az.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : azerbaijani (az)
	//! author : topchiyev : https://github.com/topchiyev
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var suffixes = {
	        1: '-inci',
	        5: '-inci',
	        8: '-inci',
	        70: '-inci',
	        80: '-inci',
	        2: '-nci',
	        7: '-nci',
	        20: '-nci',
	        50: '-nci',
	        3: '-üncü',
	        4: '-üncü',
	        100: '-üncü',
	        6: '-ncı',
	        9: '-uncu',
	        10: '-uncu',
	        30: '-uncu',
	        60: '-ıncı',
	        90: '-ıncı'
	    };
	
	    var az = moment.defineLocale('az', {
	        months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
	        monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
	        weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
	        weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
	        weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[sabah saat] LT',
	            nextWeek : '[gələn həftə] dddd [saat] LT',
	            lastDay : '[dünən] LT',
	            lastWeek : '[keçən həftə] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s əvvəl',
	            s : 'birneçə saniyyə',
	            m : 'bir dəqiqə',
	            mm : '%d dəqiqə',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir il',
	            yy : '%d il'
	        },
	        meridiemParse: /gecə|səhər|gündüz|axşam/,
	        isPM : function (input) {
	            return /^(gündüz|axşam)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'gecə';
	            } else if (hour < 12) {
	                return 'səhər';
	            } else if (hour < 17) {
	                return 'gündüz';
	            } else {
	                return 'axşam';
	            }
	        },
	        ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '-ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return az;
	
	}));

/***/ },
/* 49 */
/*!*******************************!*\
  !*** ./~/moment/locale/be.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : belarusian (be)
	//! author : Dmitry Demidov : https://github.com/demidov91
	//! author: Praleska: http://praleska.pro/
	//! Author : Menelion Elensúle : https://github.com/Oire
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
	            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
	            'dd': 'дзень_дні_дзён',
	            'MM': 'месяц_месяцы_месяцаў',
	            'yy': 'год_гады_гадоў'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвіліна' : 'хвіліну';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'гадзіна' : 'гадзіну';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    function monthsCaseReplace(m, format) {
	        var months = {
	            'nominative': 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_'),
	            'accusative': 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_')
	        },
	        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
	            'accusative' :
	            'nominative';
	        return months[nounCase][m.month()];
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = {
	            'nominative': 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
	            'accusative': 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_')
	        },
	        nounCase = (/\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/).test(format) ?
	            'accusative' :
	            'nominative';
	        return weekdays[nounCase][m.day()];
	    }
	
	    var be = moment.defineLocale('be', {
	        months : monthsCaseReplace,
	        monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
	        weekdays : weekdaysCaseReplace,
	        weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., LT',
	            LLLL : 'dddd, D MMMM YYYY г., LT'
	        },
	        calendar : {
	            sameDay: '[Сёння ў] LT',
	            nextDay: '[Заўтра ў] LT',
	            lastDay: '[Учора ў] LT',
	            nextWeek: function () {
	                return '[У] dddd [ў] LT';
	            },
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return '[У мінулую] dddd [ў] LT';
	                case 1:
	                case 2:
	                case 4:
	                    return '[У мінулы] dddd [ў] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'праз %s',
	            past : '%s таму',
	            s : 'некалькі секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : relativeTimeWithPlural,
	            hh : relativeTimeWithPlural,
	            d : 'дзень',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночы|раніцы|дня|вечара/,
	        isPM : function (input) {
	            return /^(дня|вечара)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночы';
	            } else if (hour < 12) {
	                return 'раніцы';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечара';
	            }
	        },
	        ordinalParse: /\d{1,2}-(і|ы|га)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
	            case 'D':
	                return number + '-га';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return be;
	
	}));

/***/ },
/* 50 */
/*!*******************************!*\
  !*** ./~/moment/locale/bg.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : bulgarian (bg)
	//! author : Krasen Borisov : https://github.com/kraz
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var bg = moment.defineLocale('bg', {
	        months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[Днес в] LT',
	            nextDay : '[Утре в] LT',
	            nextWeek : 'dddd [в] LT',
	            lastDay : '[Вчера в] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[В изминалата] dddd [в] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[В изминалия] dddd [в] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'след %s',
	            past : 'преди %s',
	            s : 'няколко секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дни',
	            M : 'месец',
	            MM : '%d месеца',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return bg;
	
	}));

/***/ },
/* 51 */
/*!*******************************!*\
  !*** ./~/moment/locale/bn.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bengali (bn)
	//! author : Kaushik Gandhi : https://github.com/kaushikgandhi
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '১',
	        '2': '২',
	        '3': '৩',
	        '4': '৪',
	        '5': '৫',
	        '6': '৬',
	        '7': '৭',
	        '8': '৮',
	        '9': '৯',
	        '0': '০'
	    },
	    numberMap = {
	        '১': '1',
	        '২': '2',
	        '৩': '3',
	        '৪': '4',
	        '৫': '5',
	        '৬': '6',
	        '৭': '7',
	        '৮': '8',
	        '৯': '9',
	        '০': '0'
	    };
	
	    var bn = moment.defineLocale('bn', {
	        months : 'জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
	        monthsShort : 'জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্'.split('_'),
	        weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রুবার_শনিবার'.split('_'),
	        weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্রু_শনি'.split('_'),
	        weekdaysMin : 'রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm সময়',
	            LTS : 'A h:mm:ss সময়',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, LT',
	            LLLL : 'dddd, D MMMM YYYY, LT'
	        },
	        calendar : {
	            sameDay : '[আজ] LT',
	            nextDay : '[আগামীকাল] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[গতকাল] LT',
	            lastWeek : '[গত] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s পরে',
	            past : '%s আগে',
	            s : 'কএক সেকেন্ড',
	            m : 'এক মিনিট',
	            mm : '%d মিনিট',
	            h : 'এক ঘন্টা',
	            hh : '%d ঘন্টা',
	            d : 'এক দিন',
	            dd : '%d দিন',
	            M : 'এক মাস',
	            MM : '%d মাস',
	            y : 'এক বছর',
	            yy : '%d বছর'
	        },
	        preparse: function (string) {
	            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /রাত|শকাল|দুপুর|বিকেল|রাত/,
	        isPM: function (input) {
	            return /^(দুপুর|বিকেল|রাত)$/.test(input);
	        },
	        //Bengali is a vast language its spoken
	        //in different forms in various parts of the world.
	        //I have just generalized with most common one used
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'রাত';
	            } else if (hour < 10) {
	                return 'শকাল';
	            } else if (hour < 17) {
	                return 'দুপুর';
	            } else if (hour < 20) {
	                return 'বিকেল';
	            } else {
	                return 'রাত';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return bn;
	
	}));

/***/ },
/* 52 */
/*!*******************************!*\
  !*** ./~/moment/locale/bo.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : tibetan (bo)
	//! author : Thupten N. Chakrishar : https://github.com/vajradog
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '༡',
	        '2': '༢',
	        '3': '༣',
	        '4': '༤',
	        '5': '༥',
	        '6': '༦',
	        '7': '༧',
	        '8': '༨',
	        '9': '༩',
	        '0': '༠'
	    },
	    numberMap = {
	        '༡': '1',
	        '༢': '2',
	        '༣': '3',
	        '༤': '4',
	        '༥': '5',
	        '༦': '6',
	        '༧': '7',
	        '༨': '8',
	        '༩': '9',
	        '༠': '0'
	    };
	
	    var bo = moment.defineLocale('bo', {
	        months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
	        weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, LT',
	            LLLL : 'dddd, D MMMM YYYY, LT'
	        },
	        calendar : {
	            sameDay : '[དི་རིང] LT',
	            nextDay : '[སང་ཉིན] LT',
	            nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
	            lastDay : '[ཁ་སང] LT',
	            lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ལ་',
	            past : '%s སྔན་ལ',
	            s : 'ལམ་སང',
	            m : 'སྐར་མ་གཅིག',
	            mm : '%d སྐར་མ',
	            h : 'ཆུ་ཚོད་གཅིག',
	            hh : '%d ཆུ་ཚོད',
	            d : 'ཉིན་གཅིག',
	            dd : '%d ཉིན་',
	            M : 'ཟླ་བ་གཅིག',
	            MM : '%d ཟླ་བ',
	            y : 'ལོ་གཅིག',
	            yy : '%d ལོ'
	        },
	        preparse: function (string) {
	            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
	        isPM: function (input) {
	            return /^(ཉིན་གུང|དགོང་དག|མཚན་མོ)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'མཚན་མོ';
	            } else if (hour < 10) {
	                return 'ཞོགས་ཀས';
	            } else if (hour < 17) {
	                return 'ཉིན་གུང';
	            } else if (hour < 20) {
	                return 'དགོང་དག';
	            } else {
	                return 'མཚན་མོ';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return bo;
	
	}));

/***/ },
/* 53 */
/*!*******************************!*\
  !*** ./~/moment/locale/br.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : breton (br)
	//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function relativeTimeWithMutation(number, withoutSuffix, key) {
	        var format = {
	            'mm': 'munutenn',
	            'MM': 'miz',
	            'dd': 'devezh'
	        };
	        return number + ' ' + mutation(format[key], number);
	    }
	    function specialMutationForYears(number) {
	        switch (lastNumber(number)) {
	        case 1:
	        case 3:
	        case 4:
	        case 5:
	        case 9:
	            return number + ' bloaz';
	        default:
	            return number + ' vloaz';
	        }
	    }
	    function lastNumber(number) {
	        if (number > 9) {
	            return lastNumber(number % 10);
	        }
	        return number;
	    }
	    function mutation(text, number) {
	        if (number === 2) {
	            return softMutation(text);
	        }
	        return text;
	    }
	    function softMutation(text) {
	        var mutationTable = {
	            'm': 'v',
	            'b': 'v',
	            'd': 'z'
	        };
	        if (mutationTable[text.charAt(0)] === undefined) {
	            return text;
	        }
	        return mutationTable[text.charAt(0)] + text.substring(1);
	    }
	
	    var br = moment.defineLocale('br', {
	        months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
	        monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
	        weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
	        weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
	        weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h[e]mm A',
	            LTS : 'h[e]mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D [a viz] MMMM YYYY',
	            LLL : 'D [a viz] MMMM YYYY LT',
	            LLLL : 'dddd, D [a viz] MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[Hiziv da] LT',
	            nextDay : '[Warc\'hoazh da] LT',
	            nextWeek : 'dddd [da] LT',
	            lastDay : '[Dec\'h da] LT',
	            lastWeek : 'dddd [paset da] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'a-benn %s',
	            past : '%s \'zo',
	            s : 'un nebeud segondennoù',
	            m : 'ur vunutenn',
	            mm : relativeTimeWithMutation,
	            h : 'un eur',
	            hh : '%d eur',
	            d : 'un devezh',
	            dd : relativeTimeWithMutation,
	            M : 'ur miz',
	            MM : relativeTimeWithMutation,
	            y : 'ur bloaz',
	            yy : specialMutationForYears
	        },
	        ordinalParse: /\d{1,2}(añ|vet)/,
	        ordinal : function (number) {
	            var output = (number === 1) ? 'añ' : 'vet';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return br;
	
	}));

/***/ },
/* 54 */
/*!*******************************!*\
  !*** ./~/moment/locale/bs.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : bosnian (bs)
	//! author : Nedim Cholich : https://github.com/frontyard
	//! based on (hr) translation by Bojan Marković
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	        }
	    }
	
	    var bs = moment.defineLocale('bs', {
	        months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY LT',
	            LLLL : 'dddd, D. MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return bs;
	
	}));

/***/ },
/* 55 */
/*!*******************************!*\
  !*** ./~/moment/locale/ca.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : catalan (ca)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ca = moment.defineLocale('ca', {
	        months : 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
	        monthsShort : 'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.'.split('_'),
	        weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
	        weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
	        weekdaysMin : 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextDay : function () {
	                return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastDay : function () {
	                return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'fa %s',
	            s : 'uns segons',
	            m : 'un minut',
	            mm : '%d minuts',
	            h : 'una hora',
	            hh : '%d hores',
	            d : 'un dia',
	            dd : '%d dies',
	            M : 'un mes',
	            MM : '%d mesos',
	            y : 'un any',
	            yy : '%d anys'
	        },
	        ordinalParse: /\d{1,2}(r|n|t|è|a)/,
	        ordinal : function (number, period) {
	            var output = (number === 1) ? 'r' :
	                (number === 2) ? 'n' :
	                (number === 3) ? 'r' :
	                (number === 4) ? 't' : 'è';
	            if (period === 'w' || period === 'W') {
	                output = 'a';
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return ca;
	
	}));

/***/ },
/* 56 */
/*!*******************************!*\
  !*** ./~/moment/locale/cs.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : czech (cs)
	//! author : petrbela : https://github.com/petrbela
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
	        monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minuty' : 'minut');
	            } else {
	                return result + 'minutami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodin');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dny' : 'dní');
	            } else {
	                return result + 'dny';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'měsíce' : 'měsíců');
	            } else {
	                return result + 'měsíci';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'let');
	            } else {
	                return result + 'lety';
	            }
	            break;
	        }
	    }
	
	    var cs = moment.defineLocale('cs', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParse : (function (months, monthsShort) {
	            var i, _monthsParse = [];
	            for (i = 0; i < 12; i++) {
	                // use custom parser to solve problem with July (červenec)
	                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
	            }
	            return _monthsParse;
	        }(months, monthsShort)),
	        weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
	        weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
	        weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY LT',
	            LLLL : 'dddd D. MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[dnes v] LT',
	            nextDay: '[zítra v] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v neděli v] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [v] LT';
	                case 3:
	                    return '[ve středu v] LT';
	                case 4:
	                    return '[ve čtvrtek v] LT';
	                case 5:
	                    return '[v pátek v] LT';
	                case 6:
	                    return '[v sobotu v] LT';
	                }
	            },
	            lastDay: '[včera v] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[minulou neděli v] LT';
	                case 1:
	                case 2:
	                    return '[minulé] dddd [v] LT';
	                case 3:
	                    return '[minulou středu v] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [v] LT';
	                case 6:
	                    return '[minulou sobotu v] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'před %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse : /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return cs;
	
	}));

/***/ },
/* 57 */
/*!*******************************!*\
  !*** ./~/moment/locale/cv.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : chuvash (cv)
	//! author : Anatoly Mironov : https://github.com/mirontoli
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var cv = moment.defineLocale('cv', {
	        months : 'кăрлач_нарăс_пуш_ака_май_çĕртме_утă_çурла_авăн_юпа_чӳк_раштав'.split('_'),
	        monthsShort : 'кăр_нар_пуш_ака_май_çĕр_утă_çур_ав_юпа_чӳк_раш'.split('_'),
	        weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кĕçнерникун_эрнекун_шăматкун'.split('_'),
	        weekdaysShort : 'выр_тун_ытл_юн_кĕç_эрн_шăм'.split('_'),
	        weekdaysMin : 'вр_тн_ыт_юн_кç_эр_шм'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ]',
	            LLL : 'YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT',
	            LLLL : 'dddd, YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT'
	        },
	        calendar : {
	            sameDay: '[Паян] LT [сехетре]',
	            nextDay: '[Ыран] LT [сехетре]',
	            lastDay: '[Ĕнер] LT [сехетре]',
	            nextWeek: '[Çитес] dddd LT [сехетре]',
	            lastWeek: '[Иртнĕ] dddd LT [сехетре]',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (output) {
	                var affix = /сехет$/i.exec(output) ? 'рен' : /çул$/i.exec(output) ? 'тан' : 'ран';
	                return output + affix;
	            },
	            past : '%s каялла',
	            s : 'пĕр-ик çеккунт',
	            m : 'пĕр минут',
	            mm : '%d минут',
	            h : 'пĕр сехет',
	            hh : '%d сехет',
	            d : 'пĕр кун',
	            dd : '%d кун',
	            M : 'пĕр уйăх',
	            MM : '%d уйăх',
	            y : 'пĕр çул',
	            yy : '%d çул'
	        },
	        ordinalParse: /\d{1,2}-мĕш/,
	        ordinal : '%d-мĕш',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return cv;
	
	}));

/***/ },
/* 58 */
/*!*******************************!*\
  !*** ./~/moment/locale/cy.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Welsh (cy)
	//! author : Robert Allen
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var cy = moment.defineLocale('cy', {
	        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
	        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
	        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
	        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
	        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
	        // time formats are the same as en-gb
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'LT:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY LT',
	            LLLL: 'dddd, D MMMM YYYY LT'
	        },
	        calendar: {
	            sameDay: '[Heddiw am] LT',
	            nextDay: '[Yfory am] LT',
	            nextWeek: 'dddd [am] LT',
	            lastDay: '[Ddoe am] LT',
	            lastWeek: 'dddd [diwethaf am] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'mewn %s',
	            past: '%s yn ôl',
	            s: 'ychydig eiliadau',
	            m: 'munud',
	            mm: '%d munud',
	            h: 'awr',
	            hh: '%d awr',
	            d: 'diwrnod',
	            dd: '%d diwrnod',
	            M: 'mis',
	            MM: '%d mis',
	            y: 'blwyddyn',
	            yy: '%d flynedd'
	        },
	        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
	        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
	        ordinal: function (number) {
	            var b = number,
	                output = '',
	                lookup = [
	                    '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
	                    'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
	                ];
	            if (b > 20) {
	                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
	                    output = 'fed'; // not 30ain, 70ain or 90ain
	                } else {
	                    output = 'ain';
	                }
	            } else if (b > 0) {
	                output = lookup[b];
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return cy;
	
	}));

/***/ },
/* 59 */
/*!*******************************!*\
  !*** ./~/moment/locale/da.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : danish (da)
	//! author : Ulrik Nielsen : https://github.com/mrbase
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var da = moment.defineLocale('da', {
	        months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY LT',
	            LLLL : 'dddd [d.] D. MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[I dag kl.] LT',
	            nextDay : '[I morgen kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[I går kl.] LT',
	            lastWeek : '[sidste] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s siden',
	            s : 'få sekunder',
	            m : 'et minut',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dage',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'et år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return da;
	
	}));

/***/ },
/* 60 */
/*!**********************************!*\
  !*** ./~/moment/locale/de-at.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : austrian german (de-at)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Martin Groller : https://github.com/MadMG
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	
	    var de_at = moment.defineLocale('de-at', {
	        months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY LT',
	            LLLL : 'dddd, D. MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[Morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[Gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return de_at;
	
	}));

/***/ },
/* 61 */
/*!*******************************!*\
  !*** ./~/moment/locale/de.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : german (de)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	
	    var de = moment.defineLocale('de', {
	        months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY LT',
	            LLLL : 'dddd, D. MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[Morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[Gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return de;
	
	}));

/***/ },
/* 62 */
/*!*******************************!*\
  !*** ./~/moment/locale/el.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : modern greek (el)
	//! author : Aggelos Karalias : https://github.com/mehiel
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var el = moment.defineLocale('el', {
	        monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
	        monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
	        months : function (momentToFormat, format) {
	            if (/D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
	                return this._monthsGenitiveEl[momentToFormat.month()];
	            } else {
	                return this._monthsNominativeEl[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
	        weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
	        weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
	        weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'μμ' : 'ΜΜ';
	            } else {
	                return isLower ? 'πμ' : 'ΠΜ';
	            }
	        },
	        isPM : function (input) {
	            return ((input + '').toLowerCase()[0] === 'μ');
	        },
	        meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendarEl : {
	            sameDay : '[Σήμερα {}] LT',
	            nextDay : '[Αύριο {}] LT',
	            nextWeek : 'dddd [{}] LT',
	            lastDay : '[Χθες {}] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 6:
	                        return '[το προηγούμενο] dddd [{}] LT';
	                    default:
	                        return '[την προηγούμενη] dddd [{}] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        calendar : function (key, mom) {
	            var output = this._calendarEl[key],
	                hours = mom && mom.hours();
	            if (typeof output === 'function') {
	                output = output.apply(mom);
	            }
	            return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
	        },
	        relativeTime : {
	            future : 'σε %s',
	            past : '%s πριν',
	            s : 'λίγα δευτερόλεπτα',
	            m : 'ένα λεπτό',
	            mm : '%d λεπτά',
	            h : 'μία ώρα',
	            hh : '%d ώρες',
	            d : 'μία μέρα',
	            dd : '%d μέρες',
	            M : 'ένας μήνας',
	            MM : '%d μήνες',
	            y : 'ένας χρόνος',
	            yy : '%d χρόνια'
	        },
	        ordinalParse: /\d{1,2}η/,
	        ordinal: '%dη',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4st is the first week of the year.
	        }
	    });
	
	    return el;
	
	}));

/***/ },
/* 63 */
/*!**********************************!*\
  !*** ./~/moment/locale/en-au.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : australian english (en-au)
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var en_au = moment.defineLocale('en-au', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return en_au;
	
	}));

/***/ },
/* 64 */
/*!**********************************!*\
  !*** ./~/moment/locale/en-ca.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : canadian english (en-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var en_ca = moment.defineLocale('en-ca', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM, YYYY',
	            LLL : 'D MMMM, YYYY LT',
	            LLLL : 'dddd, D MMMM, YYYY LT'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });
	
	    return en_ca;
	
	}));

/***/ },
/* 65 */
/*!**********************************!*\
  !*** ./~/moment/locale/en-gb.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : great britain english (en-gb)
	//! author : Chris Gedrim : https://github.com/chrisgedrim
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var en_gb = moment.defineLocale('en-gb', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return en_gb;
	
	}));

/***/ },
/* 66 */
/*!*******************************!*\
  !*** ./~/moment/locale/eo.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : esperanto (eo)
	//! author : Colin Dean : https://github.com/colindean
	//! komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
	//!          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var eo = moment.defineLocale('eo', {
	        months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
	        weekdays : 'Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato'.split('_'),
	        weekdaysShort : 'Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Ĵa_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D[-an de] MMMM, YYYY',
	            LLL : 'D[-an de] MMMM, YYYY LT',
	            LLLL : 'dddd, [la] D[-an de] MMMM, YYYY LT'
	        },
	        meridiemParse: /[ap]\.t\.m/i,
	        isPM: function (input) {
	            return input.charAt(0).toLowerCase() === 'p';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'p.t.m.' : 'P.T.M.';
	            } else {
	                return isLower ? 'a.t.m.' : 'A.T.M.';
	            }
	        },
	        calendar : {
	            sameDay : '[Hodiaŭ je] LT',
	            nextDay : '[Morgaŭ je] LT',
	            nextWeek : 'dddd [je] LT',
	            lastDay : '[Hieraŭ je] LT',
	            lastWeek : '[pasinta] dddd [je] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'je %s',
	            past : 'antaŭ %s',
	            s : 'sekundoj',
	            m : 'minuto',
	            mm : '%d minutoj',
	            h : 'horo',
	            hh : '%d horoj',
	            d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
	            dd : '%d tagoj',
	            M : 'monato',
	            MM : '%d monatoj',
	            y : 'jaro',
	            yy : '%d jaroj'
	        },
	        ordinalParse: /\d{1,2}a/,
	        ordinal : '%da',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return eo;
	
	}));

/***/ },
/* 67 */
/*!*******************************!*\
  !*** ./~/moment/locale/es.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : spanish (es)
	//! author : Julio Napurí : https://github.com/julionc
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
	        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
	
	    var es = moment.defineLocale('es', {
	        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShort[m.month()];
	            } else {
	                return monthsShortDot[m.month()];
	            }
	        },
	        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	        weekdaysMin : 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY LT',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY LT'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastDay : function () {
	                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'hace %s',
	            s : 'unos segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'una hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un año',
	            yy : '%d años'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return es;
	
	}));

/***/ },
/* 68 */
/*!*******************************!*\
  !*** ./~/moment/locale/et.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : estonian (et)
	//! author : Henry Kehlmann : https://github.com/madhenry
	//! improvements : Illimar Tambek : https://github.com/ragulka
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
	            'm' : ['ühe minuti', 'üks minut'],
	            'mm': [number + ' minuti', number + ' minutit'],
	            'h' : ['ühe tunni', 'tund aega', 'üks tund'],
	            'hh': [number + ' tunni', number + ' tundi'],
	            'd' : ['ühe päeva', 'üks päev'],
	            'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
	            'MM': [number + ' kuu', number + ' kuud'],
	            'y' : ['ühe aasta', 'aasta', 'üks aasta'],
	            'yy': [number + ' aasta', number + ' aastat']
	        };
	        if (withoutSuffix) {
	            return format[key][2] ? format[key][2] : format[key][1];
	        }
	        return isFuture ? format[key][0] : format[key][1];
	    }
	
	    var et = moment.defineLocale('et', {
	        months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
	        monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
	        weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
	        weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
	        weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
	        longDateFormat : {
	            LT   : 'H:mm',
	            LTS : 'LT:ss',
	            L    : 'DD.MM.YYYY',
	            LL   : 'D. MMMM YYYY',
	            LLL  : 'D. MMMM YYYY LT',
	            LLLL : 'dddd, D. MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay  : '[Täna,] LT',
	            nextDay  : '[Homme,] LT',
	            nextWeek : '[Järgmine] dddd LT',
	            lastDay  : '[Eile,] LT',
	            lastWeek : '[Eelmine] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s pärast',
	            past   : '%s tagasi',
	            s      : processRelativeTime,
	            m      : processRelativeTime,
	            mm     : processRelativeTime,
	            h      : processRelativeTime,
	            hh     : processRelativeTime,
	            d      : processRelativeTime,
	            dd     : '%d päeva',
	            M      : processRelativeTime,
	            MM     : processRelativeTime,
	            y      : processRelativeTime,
	            yy     : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return et;
	
	}));

/***/ },
/* 69 */
/*!*******************************!*\
  !*** ./~/moment/locale/eu.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : euskara (eu)
	//! author : Eneko Illarramendi : https://github.com/eillarra
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var eu = moment.defineLocale('eu', {
	        months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
	        monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
	        weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
	        weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
	        weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY[ko] MMMM[ren] D[a]',
	            LLL : 'YYYY[ko] MMMM[ren] D[a] LT',
	            LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] LT',
	            l : 'YYYY-M-D',
	            ll : 'YYYY[ko] MMM D[a]',
	            lll : 'YYYY[ko] MMM D[a] LT',
	            llll : 'ddd, YYYY[ko] MMM D[a] LT'
	        },
	        calendar : {
	            sameDay : '[gaur] LT[etan]',
	            nextDay : '[bihar] LT[etan]',
	            nextWeek : 'dddd LT[etan]',
	            lastDay : '[atzo] LT[etan]',
	            lastWeek : '[aurreko] dddd LT[etan]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s barru',
	            past : 'duela %s',
	            s : 'segundo batzuk',
	            m : 'minutu bat',
	            mm : '%d minutu',
	            h : 'ordu bat',
	            hh : '%d ordu',
	            d : 'egun bat',
	            dd : '%d egun',
	            M : 'hilabete bat',
	            MM : '%d hilabete',
	            y : 'urte bat',
	            yy : '%d urte'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return eu;
	
	}));

/***/ },
/* 70 */
/*!*******************************!*\
  !*** ./~/moment/locale/fa.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Persian (fa)
	//! author : Ebrahim Byagowi : https://github.com/ebraminio
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '۱',
	        '2': '۲',
	        '3': '۳',
	        '4': '۴',
	        '5': '۵',
	        '6': '۶',
	        '7': '۷',
	        '8': '۸',
	        '9': '۹',
	        '0': '۰'
	    }, numberMap = {
	        '۱': '1',
	        '۲': '2',
	        '۳': '3',
	        '۴': '4',
	        '۵': '5',
	        '۶': '6',
	        '۷': '7',
	        '۸': '8',
	        '۹': '9',
	        '۰': '0'
	    };
	
	    var fa = moment.defineLocale('fa', {
	        months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        meridiemParse: /قبل از ظهر|بعد از ظهر/,
	        isPM: function (input) {
	            return /بعد از ظهر/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'قبل از ظهر';
	            } else {
	                return 'بعد از ظهر';
	            }
	        },
	        calendar : {
	            sameDay : '[امروز ساعت] LT',
	            nextDay : '[فردا ساعت] LT',
	            nextWeek : 'dddd [ساعت] LT',
	            lastDay : '[دیروز ساعت] LT',
	            lastWeek : 'dddd [پیش] [ساعت] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'در %s',
	            past : '%s پیش',
	            s : 'چندین ثانیه',
	            m : 'یک دقیقه',
	            mm : '%d دقیقه',
	            h : 'یک ساعت',
	            hh : '%d ساعت',
	            d : 'یک روز',
	            dd : '%d روز',
	            M : 'یک ماه',
	            MM : '%d ماه',
	            y : 'یک سال',
	            yy : '%d سال'
	        },
	        preparse: function (string) {
	            return string.replace(/[۰-۹]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        ordinalParse: /\d{1,2}م/,
	        ordinal : '%dم',
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return fa;
	
	}));

/***/ },
/* 71 */
/*!*******************************!*\
  !*** ./~/moment/locale/fi.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : finnish (fi)
	//! author : Tarmo Aidantausta : https://github.com/bleadof
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
	        numbersFuture = [
	            'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
	            numbersPast[7], numbersPast[8], numbersPast[9]
	        ];
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = '';
	        switch (key) {
	        case 's':
	            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
	        case 'm':
	            return isFuture ? 'minuutin' : 'minuutti';
	        case 'mm':
	            result = isFuture ? 'minuutin' : 'minuuttia';
	            break;
	        case 'h':
	            return isFuture ? 'tunnin' : 'tunti';
	        case 'hh':
	            result = isFuture ? 'tunnin' : 'tuntia';
	            break;
	        case 'd':
	            return isFuture ? 'päivän' : 'päivä';
	        case 'dd':
	            result = isFuture ? 'päivän' : 'päivää';
	            break;
	        case 'M':
	            return isFuture ? 'kuukauden' : 'kuukausi';
	        case 'MM':
	            result = isFuture ? 'kuukauden' : 'kuukautta';
	            break;
	        case 'y':
	            return isFuture ? 'vuoden' : 'vuosi';
	        case 'yy':
	            result = isFuture ? 'vuoden' : 'vuotta';
	            break;
	        }
	        result = verbalNumber(number, isFuture) + ' ' + result;
	        return result;
	    }
	    function verbalNumber(number, isFuture) {
	        return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
	    }
	
	    var fi = moment.defineLocale('fi', {
	        months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
	        monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
	        weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
	        weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'Do MMMM[ta] YYYY',
	            LLL : 'Do MMMM[ta] YYYY, [klo] LT',
	            LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] LT',
	            l : 'D.M.YYYY',
	            ll : 'Do MMM YYYY',
	            lll : 'Do MMM YYYY, [klo] LT',
	            llll : 'ddd, Do MMM YYYY, [klo] LT'
	        },
	        calendar : {
	            sameDay : '[tänään] [klo] LT',
	            nextDay : '[huomenna] [klo] LT',
	            nextWeek : 'dddd [klo] LT',
	            lastDay : '[eilen] [klo] LT',
	            lastWeek : '[viime] dddd[na] [klo] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s päästä',
	            past : '%s sitten',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return fi;
	
	}));

/***/ },
/* 72 */
/*!*******************************!*\
  !*** ./~/moment/locale/fo.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : faroese (fo)
	//! author : Ragnar Johannesen : https://github.com/ragnar123
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var fo = moment.defineLocale('fo', {
	        months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
	        weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
	        weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D. MMMM, YYYY LT'
	        },
	        calendar : {
	            sameDay : '[Í dag kl.] LT',
	            nextDay : '[Í morgin kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[Í gjár kl.] LT',
	            lastWeek : '[síðstu] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'um %s',
	            past : '%s síðani',
	            s : 'fá sekund',
	            m : 'ein minutt',
	            mm : '%d minuttir',
	            h : 'ein tími',
	            hh : '%d tímar',
	            d : 'ein dagur',
	            dd : '%d dagar',
	            M : 'ein mánaði',
	            MM : '%d mánaðir',
	            y : 'eitt ár',
	            yy : '%d ár'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return fo;
	
	}));

/***/ },
/* 73 */
/*!**********************************!*\
  !*** ./~/moment/locale/fr-ca.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : canadian french (fr-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var fr_ca = moment.defineLocale('fr-ca', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : '');
	        }
	    });
	
	    return fr_ca;
	
	}));

/***/ },
/* 74 */
/*!*******************************!*\
  !*** ./~/moment/locale/fr.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : french (fr)
	//! author : John Fischer : https://github.com/jfroffice
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var fr = moment.defineLocale('fr', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : '');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return fr;
	
	}));

/***/ },
/* 75 */
/*!*******************************!*\
  !*** ./~/moment/locale/fy.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : frisian (fy)
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');
	
	    var fy = moment.defineLocale('fy', {
	        months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
	        weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
	        weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[hjoed om] LT',
	            nextDay: '[moarn om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[juster om] LT',
	            lastWeek: '[ôfrûne] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'oer %s',
	            past : '%s lyn',
	            s : 'in pear sekonden',
	            m : 'ien minút',
	            mm : '%d minuten',
	            h : 'ien oere',
	            hh : '%d oeren',
	            d : 'ien dei',
	            dd : '%d dagen',
	            M : 'ien moanne',
	            MM : '%d moannen',
	            y : 'ien jier',
	            yy : '%d jierren'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return fy;
	
	}));

/***/ },
/* 76 */
/*!*******************************!*\
  !*** ./~/moment/locale/gl.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : galician (gl)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var gl = moment.defineLocale('gl', {
	        months : 'Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro'.split('_'),
	        monthsShort : 'Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.'.split('_'),
	        weekdays : 'Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado'.split('_'),
	        weekdaysShort : 'Dom._Lun._Mar._Mér._Xov._Ven._Sáb.'.split('_'),
	        weekdaysMin : 'Do_Lu_Ma_Mé_Xo_Ve_Sá'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            lastDay : function () {
	                return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
	            },
	            lastWeek : function () {
	                return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (str) {
	                if (str === 'uns segundos') {
	                    return 'nuns segundos';
	                }
	                return 'en ' + str;
	            },
	            past : 'hai %s',
	            s : 'uns segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'unha hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un ano',
	            yy : '%d anos'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return gl;
	
	}));

/***/ },
/* 77 */
/*!*******************************!*\
  !*** ./~/moment/locale/he.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hebrew (he)
	//! author : Tomer Cohen : https://github.com/tomer
	//! author : Moshe Simantov : https://github.com/DevelopmentIL
	//! author : Tal Ater : https://github.com/TalAter
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var he = moment.defineLocale('he', {
	        months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
	        monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
	        weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
	        weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
	        weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [ב]MMMM YYYY',
	            LLL : 'D [ב]MMMM YYYY LT',
	            LLLL : 'dddd, D [ב]MMMM YYYY LT',
	            l : 'D/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY LT',
	            llll : 'ddd, D MMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[היום ב־]LT',
	            nextDay : '[מחר ב־]LT',
	            nextWeek : 'dddd [בשעה] LT',
	            lastDay : '[אתמול ב־]LT',
	            lastWeek : '[ביום] dddd [האחרון בשעה] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'בעוד %s',
	            past : 'לפני %s',
	            s : 'מספר שניות',
	            m : 'דקה',
	            mm : '%d דקות',
	            h : 'שעה',
	            hh : function (number) {
	                if (number === 2) {
	                    return 'שעתיים';
	                }
	                return number + ' שעות';
	            },
	            d : 'יום',
	            dd : function (number) {
	                if (number === 2) {
	                    return 'יומיים';
	                }
	                return number + ' ימים';
	            },
	            M : 'חודש',
	            MM : function (number) {
	                if (number === 2) {
	                    return 'חודשיים';
	                }
	                return number + ' חודשים';
	            },
	            y : 'שנה',
	            yy : function (number) {
	                if (number === 2) {
	                    return 'שנתיים';
	                } else if (number % 10 === 0 && number !== 10) {
	                    return number + ' שנה';
	                }
	                return number + ' שנים';
	            }
	        }
	    });
	
	    return he;
	
	}));

/***/ },
/* 78 */
/*!*******************************!*\
  !*** ./~/moment/locale/hi.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hindi (hi)
	//! author : Mayank Singhal : https://github.com/mayanksinghal
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };
	
	    var hi = moment.defineLocale('hi', {
	        months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
	        monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
	        weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm बजे',
	            LTS : 'A h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, LT',
	            LLLL : 'dddd, D MMMM YYYY, LT'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[कल] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[कल] LT',
	            lastWeek : '[पिछले] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s में',
	            past : '%s पहले',
	            s : 'कुछ ही क्षण',
	            m : 'एक मिनट',
	            mm : '%d मिनट',
	            h : 'एक घंटा',
	            hh : '%d घंटे',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महीने',
	            MM : '%d महीने',
	            y : 'एक वर्ष',
	            yy : '%d वर्ष'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
	        meridiemParse: /रात|सुबह|दोपहर|शाम/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सुबह') {
	                return hour;
	            } else if (meridiem === 'दोपहर') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'शाम') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात';
	            } else if (hour < 10) {
	                return 'सुबह';
	            } else if (hour < 17) {
	                return 'दोपहर';
	            } else if (hour < 20) {
	                return 'शाम';
	            } else {
	                return 'रात';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return hi;
	
	}));

/***/ },
/* 79 */
/*!*******************************!*\
  !*** ./~/moment/locale/hr.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hrvatski (hr)
	//! author : Bojan Marković : https://github.com/bmarkovic
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	        }
	    }
	
	    var hr = moment.defineLocale('hr', {
	        months : 'sječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_'),
	        monthsShort : 'sje._vel._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY LT',
	            LLLL : 'dddd, D. MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return hr;
	
	}));

/***/ },
/* 80 */
/*!*******************************!*\
  !*** ./~/moment/locale/hu.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hungarian (hu)
	//! author : Adam Brunner : https://github.com/adambrunner
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
	    function translate(number, withoutSuffix, key, isFuture) {
	        var num = number,
	            suffix;
	        switch (key) {
	        case 's':
	            return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
	        case 'm':
	            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'mm':
	            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'h':
	            return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'hh':
	            return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'd':
	            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'dd':
	            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'M':
	            return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'MM':
	            return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'y':
	            return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
	        case 'yy':
	            return num + (isFuture || withoutSuffix ? ' év' : ' éve');
	        }
	        return '';
	    }
	    function week(isFuture) {
	        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
	    }
	
	    var hu = moment.defineLocale('hu', {
	        months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
	        monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
	        weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
	        weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
	        weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'YYYY.MM.DD.',
	            LL : 'YYYY. MMMM D.',
	            LLL : 'YYYY. MMMM D., LT',
	            LLLL : 'YYYY. MMMM D., dddd LT'
	        },
	        meridiemParse: /de|du/i,
	        isPM: function (input) {
	            return input.charAt(1).toLowerCase() === 'u';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower === true ? 'de' : 'DE';
	            } else {
	                return isLower === true ? 'du' : 'DU';
	            }
	        },
	        calendar : {
	            sameDay : '[ma] LT[-kor]',
	            nextDay : '[holnap] LT[-kor]',
	            nextWeek : function () {
	                return week.call(this, true);
	            },
	            lastDay : '[tegnap] LT[-kor]',
	            lastWeek : function () {
	                return week.call(this, false);
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s múlva',
	            past : '%s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return hu;
	
	}));

/***/ },
/* 81 */
/*!**********************************!*\
  !*** ./~/moment/locale/hy-am.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Armenian (hy-am)
	//! author : Armendarabyan : https://github.com/armendarabyan
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function monthsCaseReplace(m, format) {
	        var months = {
	            'nominative': 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_'),
	            'accusative': 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_')
	        },
	        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
	            'accusative' :
	            'nominative';
	        return months[nounCase][m.month()];
	    }
	    function monthsShortCaseReplace(m, format) {
	        var monthsShort = 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_');
	        return monthsShort[m.month()];
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_');
	        return weekdays[m.day()];
	    }
	
	    var hy_am = moment.defineLocale('hy-am', {
	        months : monthsCaseReplace,
	        monthsShort : monthsShortCaseReplace,
	        weekdays : weekdaysCaseReplace,
	        weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY թ.',
	            LLL : 'D MMMM YYYY թ., LT',
	            LLLL : 'dddd, D MMMM YYYY թ., LT'
	        },
	        calendar : {
	            sameDay: '[այսօր] LT',
	            nextDay: '[վաղը] LT',
	            lastDay: '[երեկ] LT',
	            nextWeek: function () {
	                return 'dddd [օրը ժամը] LT';
	            },
	            lastWeek: function () {
	                return '[անցած] dddd [օրը ժամը] LT';
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s հետո',
	            past : '%s առաջ',
	            s : 'մի քանի վայրկյան',
	            m : 'րոպե',
	            mm : '%d րոպե',
	            h : 'ժամ',
	            hh : '%d ժամ',
	            d : 'օր',
	            dd : '%d օր',
	            M : 'ամիս',
	            MM : '%d ամիս',
	            y : 'տարի',
	            yy : '%d տարի'
	        },
	        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
	        isPM: function (input) {
	            return /^(ցերեկվա|երեկոյան)$/.test(input);
	        },
	        meridiem : function (hour) {
	            if (hour < 4) {
	                return 'գիշերվա';
	            } else if (hour < 12) {
	                return 'առավոտվա';
	            } else if (hour < 17) {
	                return 'ցերեկվա';
	            } else {
	                return 'երեկոյան';
	            }
	        },
	        ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'DDD':
	            case 'w':
	            case 'W':
	            case 'DDDo':
	                if (number === 1) {
	                    return number + '-ին';
	                }
	                return number + '-րդ';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return hy_am;
	
	}));

/***/ },
/* 82 */
/*!*******************************!*\
  !*** ./~/moment/locale/id.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Indonesia (id)
	//! author : Mohammad Satrio Utomo : https://github.com/tyok
	//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var id = moment.defineLocale('id', {
	        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
	        weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
	        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'LT.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] LT',
	            LLLL : 'dddd, D MMMM YYYY [pukul] LT'
	        },
	        meridiemParse: /pagi|siang|sore|malam/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'siang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sore' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'siang';
	            } else if (hours < 19) {
	                return 'sore';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Besok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kemarin pukul] LT',
	            lastWeek : 'dddd [lalu pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lalu',
	            s : 'beberapa detik',
	            m : 'semenit',
	            mm : '%d menit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return id;
	
	}));

/***/ },
/* 83 */
/*!*******************************!*\
  !*** ./~/moment/locale/is.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : icelandic (is)
	//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function plural(n) {
	        if (n % 100 === 11) {
	            return true;
	        } else if (n % 10 === 1) {
	            return false;
	        }
	        return true;
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
	        case 'm':
	            return withoutSuffix ? 'mínúta' : 'mínútu';
	        case 'mm':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
	            } else if (withoutSuffix) {
	                return result + 'mínúta';
	            }
	            return result + 'mínútu';
	        case 'hh':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
	            }
	            return result + 'klukkustund';
	        case 'd':
	            if (withoutSuffix) {
	                return 'dagur';
	            }
	            return isFuture ? 'dag' : 'degi';
	        case 'dd':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'dagar';
	                }
	                return result + (isFuture ? 'daga' : 'dögum');
	            } else if (withoutSuffix) {
	                return result + 'dagur';
	            }
	            return result + (isFuture ? 'dag' : 'degi');
	        case 'M':
	            if (withoutSuffix) {
	                return 'mánuður';
	            }
	            return isFuture ? 'mánuð' : 'mánuði';
	        case 'MM':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'mánuðir';
	                }
	                return result + (isFuture ? 'mánuði' : 'mánuðum');
	            } else if (withoutSuffix) {
	                return result + 'mánuður';
	            }
	            return result + (isFuture ? 'mánuð' : 'mánuði');
	        case 'y':
	            return withoutSuffix || isFuture ? 'ár' : 'ári';
	        case 'yy':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
	            }
	            return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
	        }
	    }
	
	    var is = moment.defineLocale('is', {
	        months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
	        weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
	        weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
	        weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] LT',
	            LLLL : 'dddd, D. MMMM YYYY [kl.] LT'
	        },
	        calendar : {
	            sameDay : '[í dag kl.] LT',
	            nextDay : '[á morgun kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[í gær kl.] LT',
	            lastWeek : '[síðasta] dddd [kl.] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'eftir %s',
	            past : 'fyrir %s síðan',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : 'klukkustund',
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return is;
	
	}));

/***/ },
/* 84 */
/*!*******************************!*\
  !*** ./~/moment/locale/it.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : italian (it)
	//! author : Lorenzo : https://github.com/aliem
	//! author: Mattia Larentis: https://github.com/nostalgiaz
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var it = moment.defineLocale('it', {
	        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
	        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
	        weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
	        weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
	        weekdaysMin : 'D_L_Ma_Me_G_V_S'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Oggi alle] LT',
	            nextDay: '[Domani alle] LT',
	            nextWeek: 'dddd [alle] LT',
	            lastDay: '[Ieri alle] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[la scorsa] dddd [alle] LT';
	                    default:
	                        return '[lo scorso] dddd [alle] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
	            },
	            past : '%s fa',
	            s : 'alcuni secondi',
	            m : 'un minuto',
	            mm : '%d minuti',
	            h : 'un\'ora',
	            hh : '%d ore',
	            d : 'un giorno',
	            dd : '%d giorni',
	            M : 'un mese',
	            MM : '%d mesi',
	            y : 'un anno',
	            yy : '%d anni'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal: '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return it;
	
	}));

/***/ },
/* 85 */
/*!*******************************!*\
  !*** ./~/moment/locale/ja.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : japanese (ja)
	//! author : LI Long : https://github.com/baryon
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ja = moment.defineLocale('ja', {
	        months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
	        weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
	        weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
	        longDateFormat : {
	            LT : 'Ah時m分',
	            LTS : 'LTs秒',
	            L : 'YYYY/MM/DD',
	            LL : 'YYYY年M月D日',
	            LLL : 'YYYY年M月D日LT',
	            LLLL : 'YYYY年M月D日LT dddd'
	        },
	        meridiemParse: /午前|午後/i,
	        isPM : function (input) {
	            return input === '午後';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return '午前';
	            } else {
	                return '午後';
	            }
	        },
	        calendar : {
	            sameDay : '[今日] LT',
	            nextDay : '[明日] LT',
	            nextWeek : '[来週]dddd LT',
	            lastDay : '[昨日] LT',
	            lastWeek : '[前週]dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s後',
	            past : '%s前',
	            s : '数秒',
	            m : '1分',
	            mm : '%d分',
	            h : '1時間',
	            hh : '%d時間',
	            d : '1日',
	            dd : '%d日',
	            M : '1ヶ月',
	            MM : '%dヶ月',
	            y : '1年',
	            yy : '%d年'
	        }
	    });
	
	    return ja;
	
	}));

/***/ },
/* 86 */
/*!*******************************!*\
  !*** ./~/moment/locale/ka.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Georgian (ka)
	//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function monthsCaseReplace(m, format) {
	        var months = {
	            'nominative': 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
	            'accusative': 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
	        },
	        nounCase = (/D[oD] *MMMM?/).test(format) ?
	            'accusative' :
	            'nominative';
	        return months[nounCase][m.month()];
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = {
	            'nominative': 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
	            'accusative': 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_')
	        },
	        nounCase = (/(წინა|შემდეგ)/).test(format) ?
	            'accusative' :
	            'nominative';
	        return weekdays[nounCase][m.day()];
	    }
	
	    var ka = moment.defineLocale('ka', {
	        months : monthsCaseReplace,
	        monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
	        weekdays : weekdaysCaseReplace,
	        weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
	        weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[დღეს] LT[-ზე]',
	            nextDay : '[ხვალ] LT[-ზე]',
	            lastDay : '[გუშინ] LT[-ზე]',
	            nextWeek : '[შემდეგ] dddd LT[-ზე]',
	            lastWeek : '[წინა] dddd LT-ზე',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
	                    s.replace(/ი$/, 'ში') :
	                    s + 'ში';
	            },
	            past : function (s) {
	                if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
	                    return s.replace(/(ი|ე)$/, 'ის წინ');
	                }
	                if ((/წელი/).test(s)) {
	                    return s.replace(/წელი$/, 'წლის წინ');
	                }
	            },
	            s : 'რამდენიმე წამი',
	            m : 'წუთი',
	            mm : '%d წუთი',
	            h : 'საათი',
	            hh : '%d საათი',
	            d : 'დღე',
	            dd : '%d დღე',
	            M : 'თვე',
	            MM : '%d თვე',
	            y : 'წელი',
	            yy : '%d წელი'
	        },
	        ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
	        ordinal : function (number) {
	            if (number === 0) {
	                return number;
	            }
	            if (number === 1) {
	                return number + '-ლი';
	            }
	            if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
	                return 'მე-' + number;
	            }
	            return number + '-ე';
	        },
	        week : {
	            dow : 1,
	            doy : 7
	        }
	    });
	
	    return ka;
	
	}));

/***/ },
/* 87 */
/*!*******************************!*\
  !*** ./~/moment/locale/km.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : khmer (km)
	//! author : Kruy Vanna : https://github.com/kruyvanna
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var km = moment.defineLocale('km', {
	        months: 'មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        monthsShort: 'មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'LT:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY LT',
	            LLLL: 'dddd, D MMMM YYYY LT'
	        },
	        calendar: {
	            sameDay: '[ថ្ងៃនៈ ម៉ោង] LT',
	            nextDay: '[ស្អែក ម៉ោង] LT',
	            nextWeek: 'dddd [ម៉ោង] LT',
	            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
	            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%sទៀត',
	            past: '%sមុន',
	            s: 'ប៉ុន្មានវិនាទី',
	            m: 'មួយនាទី',
	            mm: '%d នាទី',
	            h: 'មួយម៉ោង',
	            hh: '%d ម៉ោង',
	            d: 'មួយថ្ងៃ',
	            dd: '%d ថ្ងៃ',
	            M: 'មួយខែ',
	            MM: '%d ខែ',
	            y: 'មួយឆ្នាំ',
	            yy: '%d ឆ្នាំ'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return km;
	
	}));

/***/ },
/* 88 */
/*!*******************************!*\
  !*** ./~/moment/locale/ko.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : korean (ko)
	//!
	//! authors
	//!
	//! - Kyungwook, Park : https://github.com/kyungw00k
	//! - Jeeeyul Lee <jeeeyul@gmail.com>
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ko = moment.defineLocale('ko', {
	        months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
	        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
	        weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
	        longDateFormat : {
	            LT : 'A h시 m분',
	            LTS : 'A h시 m분 s초',
	            L : 'YYYY.MM.DD',
	            LL : 'YYYY년 MMMM D일',
	            LLL : 'YYYY년 MMMM D일 LT',
	            LLLL : 'YYYY년 MMMM D일 dddd LT'
	        },
	        calendar : {
	            sameDay : '오늘 LT',
	            nextDay : '내일 LT',
	            nextWeek : 'dddd LT',
	            lastDay : '어제 LT',
	            lastWeek : '지난주 dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s 후',
	            past : '%s 전',
	            s : '몇초',
	            ss : '%d초',
	            m : '일분',
	            mm : '%d분',
	            h : '한시간',
	            hh : '%d시간',
	            d : '하루',
	            dd : '%d일',
	            M : '한달',
	            MM : '%d달',
	            y : '일년',
	            yy : '%d년'
	        },
	        ordinalParse : /\d{1,2}일/,
	        ordinal : '%d일',
	        meridiemParse : /오전|오후/,
	        isPM : function (token) {
	            return token === '오후';
	        },
	        meridiem : function (hour, minute, isUpper) {
	            return hour < 12 ? '오전' : '오후';
	        }
	    });
	
	    return ko;
	
	}));

/***/ },
/* 89 */
/*!*******************************!*\
  !*** ./~/moment/locale/lb.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Luxembourgish (lb)
	//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eng Minutt', 'enger Minutt'],
	            'h': ['eng Stonn', 'enger Stonn'],
	            'd': ['een Dag', 'engem Dag'],
	            'M': ['ee Mount', 'engem Mount'],
	            'y': ['ee Joer', 'engem Joer']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	    function processFutureTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'a ' + string;
	        }
	        return 'an ' + string;
	    }
	    function processPastTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'viru ' + string;
	        }
	        return 'virun ' + string;
	    }
	    /**
	     * Returns true if the word before the given number loses the '-n' ending.
	     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
	     *
	     * @param number {integer}
	     * @returns {boolean}
	     */
	    function eifelerRegelAppliesToNumber(number) {
	        number = parseInt(number, 10);
	        if (isNaN(number)) {
	            return false;
	        }
	        if (number < 0) {
	            // Negative Number --> always true
	            return true;
	        } else if (number < 10) {
	            // Only 1 digit
	            if (4 <= number && number <= 7) {
	                return true;
	            }
	            return false;
	        } else if (number < 100) {
	            // 2 digits
	            var lastDigit = number % 10, firstDigit = number / 10;
	            if (lastDigit === 0) {
	                return eifelerRegelAppliesToNumber(firstDigit);
	            }
	            return eifelerRegelAppliesToNumber(lastDigit);
	        } else if (number < 10000) {
	            // 3 or 4 digits --> recursively check first digit
	            while (number >= 10) {
	                number = number / 10;
	            }
	            return eifelerRegelAppliesToNumber(number);
	        } else {
	            // Anything larger than 4 digits: recursively check first n-3 digits
	            number = number / 1000;
	            return eifelerRegelAppliesToNumber(number);
	        }
	    }
	
	    var lb = moment.defineLocale('lb', {
	        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
	        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
	        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm [Auer]',
	            LTS: 'H:mm:ss [Auer]',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY LT',
	            LLLL: 'dddd, D. MMMM YYYY LT'
	        },
	        calendar: {
	            sameDay: '[Haut um] LT',
	            sameElse: 'L',
	            nextDay: '[Muer um] LT',
	            nextWeek: 'dddd [um] LT',
	            lastDay: '[Gëschter um] LT',
	            lastWeek: function () {
	                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
	                switch (this.day()) {
	                    case 2:
	                    case 4:
	                        return '[Leschten] dddd [um] LT';
	                    default:
	                        return '[Leschte] dddd [um] LT';
	                }
	            }
	        },
	        relativeTime : {
	            future : processFutureTime,
	            past : processPastTime,
	            s : 'e puer Sekonnen',
	            m : processRelativeTime,
	            mm : '%d Minutten',
	            h : processRelativeTime,
	            hh : '%d Stonnen',
	            d : processRelativeTime,
	            dd : '%d Deeg',
	            M : processRelativeTime,
	            MM : '%d Méint',
	            y : processRelativeTime,
	            yy : '%d Joer'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return lb;
	
	}));

/***/ },
/* 90 */
/*!*******************************!*\
  !*** ./~/moment/locale/lt.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lithuanian (lt)
	//! author : Mindaugas Mozūras : https://github.com/mmozuras
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var units = {
	        'm' : 'minutė_minutės_minutę',
	        'mm': 'minutės_minučių_minutes',
	        'h' : 'valanda_valandos_valandą',
	        'hh': 'valandos_valandų_valandas',
	        'd' : 'diena_dienos_dieną',
	        'dd': 'dienos_dienų_dienas',
	        'M' : 'mėnuo_mėnesio_mėnesį',
	        'MM': 'mėnesiai_mėnesių_mėnesius',
	        'y' : 'metai_metų_metus',
	        'yy': 'metai_metų_metus'
	    },
	    weekDays = 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_');
	    function translateSeconds(number, withoutSuffix, key, isFuture) {
	        if (withoutSuffix) {
	            return 'kelios sekundės';
	        } else {
	            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
	        }
	    }
	    function translateSingular(number, withoutSuffix, key, isFuture) {
	        return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
	    }
	    function special(number) {
	        return number % 10 === 0 || (number > 10 && number < 20);
	    }
	    function forms(key) {
	        return units[key].split('_');
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        if (number === 1) {
	            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
	        } else if (withoutSuffix) {
	            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
	        } else {
	            if (isFuture) {
	                return result + forms(key)[1];
	            } else {
	                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
	            }
	        }
	    }
	    function relativeWeekDay(moment, format) {
	        var nominative = format.indexOf('dddd HH:mm') === -1,
	            weekDay = weekDays[moment.day()];
	        return nominative ? weekDay : weekDay.substring(0, weekDay.length - 2) + 'į';
	    }
	
	    var lt = moment.defineLocale('lt', {
	        months : 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
	        monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
	        weekdays : relativeWeekDay,
	        weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
	        weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY [m.] MMMM D [d.]',
	            LLL : 'YYYY [m.] MMMM D [d.], LT [val.]',
	            LLLL : 'YYYY [m.] MMMM D [d.], dddd, LT [val.]',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY [m.] MMMM D [d.]',
	            lll : 'YYYY [m.] MMMM D [d.], LT [val.]',
	            llll : 'YYYY [m.] MMMM D [d.], ddd, LT [val.]'
	        },
	        calendar : {
	            sameDay : '[Šiandien] LT',
	            nextDay : '[Rytoj] LT',
	            nextWeek : 'dddd LT',
	            lastDay : '[Vakar] LT',
	            lastWeek : '[Praėjusį] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'po %s',
	            past : 'prieš %s',
	            s : translateSeconds,
	            m : translateSingular,
	            mm : translate,
	            h : translateSingular,
	            hh : translate,
	            d : translateSingular,
	            dd : translate,
	            M : translateSingular,
	            MM : translate,
	            y : translateSingular,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}-oji/,
	        ordinal : function (number) {
	            return number + '-oji';
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return lt;
	
	}));

/***/ },
/* 91 */
/*!*******************************!*\
  !*** ./~/moment/locale/lv.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : latvian (lv)
	//! author : Kristaps Karlsons : https://github.com/skakri
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var units = {
	        'mm': 'minūti_minūtes_minūte_minūtes',
	        'hh': 'stundu_stundas_stunda_stundas',
	        'dd': 'dienu_dienas_diena_dienas',
	        'MM': 'mēnesi_mēnešus_mēnesis_mēneši',
	        'yy': 'gadu_gadus_gads_gadi'
	    };
	    function format(word, number, withoutSuffix) {
	        var forms = word.split('_');
	        if (withoutSuffix) {
	            return number % 10 === 1 && number !== 11 ? forms[2] : forms[3];
	        } else {
	            return number % 10 === 1 && number !== 11 ? forms[0] : forms[1];
	        }
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        return number + ' ' + format(units[key], number, withoutSuffix);
	    }
	
	    var lv = moment.defineLocale('lv', {
	        months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
	        weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'YYYY. [gada] D. MMMM',
	            LLL : 'YYYY. [gada] D. MMMM, LT',
	            LLLL : 'YYYY. [gada] D. MMMM, dddd, LT'
	        },
	        calendar : {
	            sameDay : '[Šodien pulksten] LT',
	            nextDay : '[Rīt pulksten] LT',
	            nextWeek : 'dddd [pulksten] LT',
	            lastDay : '[Vakar pulksten] LT',
	            lastWeek : '[Pagājušā] dddd [pulksten] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s vēlāk',
	            past : '%s agrāk',
	            s : 'dažas sekundes',
	            m : 'minūti',
	            mm : relativeTimeWithPlural,
	            h : 'stundu',
	            hh : relativeTimeWithPlural,
	            d : 'dienu',
	            dd : relativeTimeWithPlural,
	            M : 'mēnesi',
	            MM : relativeTimeWithPlural,
	            y : 'gadu',
	            yy : relativeTimeWithPlural
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return lv;
	
	}));

/***/ },
/* 92 */
/*!*******************************!*\
  !*** ./~/moment/locale/mk.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : macedonian (mk)
	//! author : Borislav Mickov : https://github.com/B0k0
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var mk = moment.defineLocale('mk', {
	        months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
	        weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[Денес во] LT',
	            nextDay : '[Утре во] LT',
	            nextWeek : 'dddd [во] LT',
	            lastDay : '[Вчера во] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[Во изминатата] dddd [во] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[Во изминатиот] dddd [во] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'после %s',
	            past : 'пред %s',
	            s : 'неколку секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дена',
	            M : 'месец',
	            MM : '%d месеци',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return mk;
	
	}));

/***/ },
/* 93 */
/*!*******************************!*\
  !*** ./~/moment/locale/ml.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : malayalam (ml)
	//! author : Floyd Pink : https://github.com/floydpink
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ml = moment.defineLocale('ml', {
	        months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
	        monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
	        weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
	        weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
	        weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm -നു',
	            LTS : 'A h:mm:ss -നു',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, LT',
	            LLLL : 'dddd, D MMMM YYYY, LT'
	        },
	        calendar : {
	            sameDay : '[ഇന്ന്] LT',
	            nextDay : '[നാളെ] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[ഇന്നലെ] LT',
	            lastWeek : '[കഴിഞ്ഞ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s കഴിഞ്ഞ്',
	            past : '%s മുൻപ്',
	            s : 'അൽപ നിമിഷങ്ങൾ',
	            m : 'ഒരു മിനിറ്റ്',
	            mm : '%d മിനിറ്റ്',
	            h : 'ഒരു മണിക്കൂർ',
	            hh : '%d മണിക്കൂർ',
	            d : 'ഒരു ദിവസം',
	            dd : '%d ദിവസം',
	            M : 'ഒരു മാസം',
	            MM : '%d മാസം',
	            y : 'ഒരു വർഷം',
	            yy : '%d വർഷം'
	        },
	        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
	        isPM : function (input) {
	            return /^(ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'രാത്രി';
	            } else if (hour < 12) {
	                return 'രാവിലെ';
	            } else if (hour < 17) {
	                return 'ഉച്ച കഴിഞ്ഞ്';
	            } else if (hour < 20) {
	                return 'വൈകുന്നേരം';
	            } else {
	                return 'രാത്രി';
	            }
	        }
	    });
	
	    return ml;
	
	}));

/***/ },
/* 94 */
/*!*******************************!*\
  !*** ./~/moment/locale/mr.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Marathi (mr)
	//! author : Harshad Kale : https://github.com/kalehv
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };
	
	    var mr = moment.defineLocale('mr', {
	        months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
	        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
	        weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm वाजता',
	            LTS : 'A h:mm:ss वाजता',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, LT',
	            LLLL : 'dddd, D MMMM YYYY, LT'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[उद्या] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[काल] LT',
	            lastWeek: '[मागील] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s नंतर',
	            past : '%s पूर्वी',
	            s : 'सेकंद',
	            m: 'एक मिनिट',
	            mm: '%d मिनिटे',
	            h : 'एक तास',
	            hh : '%d तास',
	            d : 'एक दिवस',
	            dd : '%d दिवस',
	            M : 'एक महिना',
	            MM : '%d महिने',
	            y : 'एक वर्ष',
	            yy : '%d वर्षे'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात्री') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सकाळी') {
	                return hour;
	            } else if (meridiem === 'दुपारी') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'सायंकाळी') {
	                return hour + 12;
	            }
	        },
	        meridiem: function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात्री';
	            } else if (hour < 10) {
	                return 'सकाळी';
	            } else if (hour < 17) {
	                return 'दुपारी';
	            } else if (hour < 20) {
	                return 'सायंकाळी';
	            } else {
	                return 'रात्री';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return mr;
	
	}));

/***/ },
/* 95 */
/*!**********************************!*\
  !*** ./~/moment/locale/ms-my.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Malaysia (ms-MY)
	//! author : Weldan Jamili : https://github.com/weldan
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ms_my = moment.defineLocale('ms-my', {
	        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'LT.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] LT',
	            LLLL : 'dddd, D MMMM YYYY [pukul] LT'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Esok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kelmarin pukul] LT',
	            lastWeek : 'dddd [lepas pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lepas',
	            s : 'beberapa saat',
	            m : 'seminit',
	            mm : '%d minit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ms_my;
	
	}));

/***/ },
/* 96 */
/*!*******************************!*\
  !*** ./~/moment/locale/my.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Burmese (my)
	//! author : Squar team, mysquar.com
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '၁',
	        '2': '၂',
	        '3': '၃',
	        '4': '၄',
	        '5': '၅',
	        '6': '၆',
	        '7': '၇',
	        '8': '၈',
	        '9': '၉',
	        '0': '၀'
	    }, numberMap = {
	        '၁': '1',
	        '၂': '2',
	        '၃': '3',
	        '၄': '4',
	        '၅': '5',
	        '၆': '6',
	        '၇': '7',
	        '၈': '8',
	        '၉': '9',
	        '၀': '0'
	    };
	
	    var my = moment.defineLocale('my', {
	        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
	        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
	        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
	        weekdaysShort: 'နွေ_လာ_င်္ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	        weekdaysMin: 'နွေ_လာ_င်္ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY LT',
	            LLLL: 'dddd D MMMM YYYY LT'
	        },
	        calendar: {
	            sameDay: '[ယနေ.] LT [မှာ]',
	            nextDay: '[မနက်ဖြန်] LT [မှာ]',
	            nextWeek: 'dddd LT [မှာ]',
	            lastDay: '[မနေ.က] LT [မှာ]',
	            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'လာမည့် %s မှာ',
	            past: 'လွန်ခဲ့သော %s က',
	            s: 'စက္ကန်.အနည်းငယ်',
	            m: 'တစ်မိနစ်',
	            mm: '%d မိနစ်',
	            h: 'တစ်နာရီ',
	            hh: '%d နာရီ',
	            d: 'တစ်ရက်',
	            dd: '%d ရက်',
	            M: 'တစ်လ',
	            MM: '%d လ',
	            y: 'တစ်နှစ်',
	            yy: '%d နှစ်'
	        },
	        preparse: function (string) {
	            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return my;
	
	}));

/***/ },
/* 97 */
/*!*******************************!*\
  !*** ./~/moment/locale/nb.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : norwegian bokmål (nb)
	//! authors : Espen Hovlandsdal : https://github.com/rexxars
	//!           Sigurd Gartmann : https://github.com/sigurdga
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var nb = moment.defineLocale('nb', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'søn_man_tirs_ons_tors_fre_lør'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'H.mm',
	            LTS : 'LT.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] LT',
	            LLLL : 'dddd D. MMMM YYYY [kl.] LT'
	        },
	        calendar : {
	            sameDay: '[i dag kl.] LT',
	            nextDay: '[i morgen kl.] LT',
	            nextWeek: 'dddd [kl.] LT',
	            lastDay: '[i går kl.] LT',
	            lastWeek: '[forrige] dddd [kl.] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : 'for %s siden',
	            s : 'noen sekunder',
	            m : 'ett minutt',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dager',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return nb;
	
	}));

/***/ },
/* 98 */
/*!*******************************!*\
  !*** ./~/moment/locale/ne.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : nepali/nepalese
	//! author : suvash : https://github.com/suvash
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };
	
	    var ne = moment.defineLocale('ne', {
	        months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
	        monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
	        weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
	        weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
	        weekdaysMin : 'आइ._सो._मङ्_बु._बि._शु._श.'.split('_'),
	        longDateFormat : {
	            LT : 'Aको h:mm बजे',
	            LTS : 'Aको h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, LT',
	            LLLL : 'dddd, D MMMM YYYY, LT'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /राती|बिहान|दिउँसो|बेलुका|साँझ|राती/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'राती') {
	                return hour < 3 ? hour : hour + 12;
	            } else if (meridiem === 'बिहान') {
	                return hour;
	            } else if (meridiem === 'दिउँसो') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'बेलुका' || meridiem === 'साँझ') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 3) {
	                return 'राती';
	            } else if (hour < 10) {
	                return 'बिहान';
	            } else if (hour < 15) {
	                return 'दिउँसो';
	            } else if (hour < 18) {
	                return 'बेलुका';
	            } else if (hour < 20) {
	                return 'साँझ';
	            } else {
	                return 'राती';
	            }
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[भोली] LT',
	            nextWeek : '[आउँदो] dddd[,] LT',
	            lastDay : '[हिजो] LT',
	            lastWeek : '[गएको] dddd[,] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%sमा',
	            past : '%s अगाडी',
	            s : 'केही समय',
	            m : 'एक मिनेट',
	            mm : '%d मिनेट',
	            h : 'एक घण्टा',
	            hh : '%d घण्टा',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महिना',
	            MM : '%d महिना',
	            y : 'एक बर्ष',
	            yy : '%d बर्ष'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ne;
	
	}));

/***/ },
/* 99 */
/*!*******************************!*\
  !*** ./~/moment/locale/nl.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : dutch (nl)
	//! author : Joris Röling : https://github.com/jjupiter
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
	
	    var nl = moment.defineLocale('nl', {
	        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
	        weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[vandaag om] LT',
	            nextDay: '[morgen om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[gisteren om] LT',
	            lastWeek: '[afgelopen] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'over %s',
	            past : '%s geleden',
	            s : 'een paar seconden',
	            m : 'één minuut',
	            mm : '%d minuten',
	            h : 'één uur',
	            hh : '%d uur',
	            d : 'één dag',
	            dd : '%d dagen',
	            M : 'één maand',
	            MM : '%d maanden',
	            y : 'één jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return nl;
	
	}));

/***/ },
/* 100 */
/*!*******************************!*\
  !*** ./~/moment/locale/nn.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : norwegian nynorsk (nn)
	//! author : https://github.com/mechuwind
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var nn = moment.defineLocale('nn', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
	        weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
	        weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[I dag klokka] LT',
	            nextDay: '[I morgon klokka] LT',
	            nextWeek: 'dddd [klokka] LT',
	            lastDay: '[I går klokka] LT',
	            lastWeek: '[Føregåande] dddd [klokka] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : 'for %s sidan',
	            s : 'nokre sekund',
	            m : 'eit minutt',
	            mm : '%d minutt',
	            h : 'ein time',
	            hh : '%d timar',
	            d : 'ein dag',
	            dd : '%d dagar',
	            M : 'ein månad',
	            MM : '%d månader',
	            y : 'eit år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return nn;
	
	}));

/***/ },
/* 101 */
/*!*******************************!*\
  !*** ./~/moment/locale/pl.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : polish (pl)
	//! author : Rafal Hirsz : https://github.com/evoL
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
	        monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
	    function plural(n) {
	        return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'minuta' : 'minutę';
	        case 'mm':
	            return result + (plural(number) ? 'minuty' : 'minut');
	        case 'h':
	            return withoutSuffix  ? 'godzina'  : 'godzinę';
	        case 'hh':
	            return result + (plural(number) ? 'godziny' : 'godzin');
	        case 'MM':
	            return result + (plural(number) ? 'miesiące' : 'miesięcy');
	        case 'yy':
	            return result + (plural(number) ? 'lata' : 'lat');
	        }
	    }
	
	    var pl = moment.defineLocale('pl', {
	        months : function (momentToFormat, format) {
	            if (/D MMMM/.test(format)) {
	                return monthsSubjective[momentToFormat.month()];
	            } else {
	                return monthsNominative[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
	        weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
	        weekdaysShort : 'nie_pon_wt_śr_czw_pt_sb'.split('_'),
	        weekdaysMin : 'N_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Dziś o] LT',
	            nextDay: '[Jutro o] LT',
	            nextWeek: '[W] dddd [o] LT',
	            lastDay: '[Wczoraj o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[W zeszłą niedzielę o] LT';
	                case 3:
	                    return '[W zeszłą środę o] LT';
	                case 6:
	                    return '[W zeszłą sobotę o] LT';
	                default:
	                    return '[W zeszły] dddd [o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : '%s temu',
	            s : 'kilka sekund',
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : '1 dzień',
	            dd : '%d dni',
	            M : 'miesiąc',
	            MM : translate,
	            y : 'rok',
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return pl;
	
	}));

/***/ },
/* 102 */
/*!**********************************!*\
  !*** ./~/moment/locale/pt-br.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : brazilian portuguese (pt-br)
	//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var pt_br = moment.defineLocale('pt-br', {
	        months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
	        monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
	        weekdays : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
	        weekdaysShort : 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
	        weekdaysMin : 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY [às] LT',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] LT'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : '%s atrás',
	            s : 'segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº'
	    });
	
	    return pt_br;
	
	}));

/***/ },
/* 103 */
/*!*******************************!*\
  !*** ./~/moment/locale/pt.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : portuguese (pt)
	//! author : Jefferson : https://github.com/jalex79
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var pt = moment.defineLocale('pt', {
	        months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
	        monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
	        weekdays : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
	        weekdaysShort : 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
	        weekdaysMin : 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY LT',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : 'há %s',
	            s : 'segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return pt;
	
	}));

/***/ },
/* 104 */
/*!*******************************!*\
  !*** ./~/moment/locale/ro.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : romanian (ro)
	//! author : Vlad Gurdiga : https://github.com/gurdiga
	//! author : Valentin Agachi : https://github.com/avaly
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	                'mm': 'minute',
	                'hh': 'ore',
	                'dd': 'zile',
	                'MM': 'luni',
	                'yy': 'ani'
	            },
	            separator = ' ';
	        if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
	            separator = ' de ';
	        }
	        return number + separator + format[key];
	    }
	
	    var ro = moment.defineLocale('ro', {
	        months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
	        monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
	        weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
	        weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
	        weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[azi la] LT',
	            nextDay: '[mâine la] LT',
	            nextWeek: 'dddd [la] LT',
	            lastDay: '[ieri la] LT',
	            lastWeek: '[fosta] dddd [la] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'peste %s',
	            past : '%s în urmă',
	            s : 'câteva secunde',
	            m : 'un minut',
	            mm : relativeTimeWithPlural,
	            h : 'o oră',
	            hh : relativeTimeWithPlural,
	            d : 'o zi',
	            dd : relativeTimeWithPlural,
	            M : 'o lună',
	            MM : relativeTimeWithPlural,
	            y : 'un an',
	            yy : relativeTimeWithPlural
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ro;
	
	}));

/***/ },
/* 105 */
/*!*******************************!*\
  !*** ./~/moment/locale/ru.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : russian (ru)
	//! author : Viktorminator : https://github.com/Viktorminator
	//! Author : Menelion Elensúle : https://github.com/Oire
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
	            'hh': 'час_часа_часов',
	            'dd': 'день_дня_дней',
	            'MM': 'месяц_месяца_месяцев',
	            'yy': 'год_года_лет'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'минута' : 'минуту';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    function monthsCaseReplace(m, format) {
	        var months = {
	            'nominative': 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
	            'accusative': 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_')
	        },
	        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
	            'accusative' :
	            'nominative';
	        return months[nounCase][m.month()];
	    }
	    function monthsShortCaseReplace(m, format) {
	        var monthsShort = {
	            'nominative': 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
	            'accusative': 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_')
	        },
	        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
	            'accusative' :
	            'nominative';
	        return monthsShort[nounCase][m.month()];
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = {
	            'nominative': 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
	            'accusative': 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_')
	        },
	        nounCase = (/\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/).test(format) ?
	            'accusative' :
	            'nominative';
	        return weekdays[nounCase][m.day()];
	    }
	
	    var ru = moment.defineLocale('ru', {
	        months : monthsCaseReplace,
	        monthsShort : monthsShortCaseReplace,
	        weekdays : weekdaysCaseReplace,
	        weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        monthsParse : [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i],
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., LT',
	            LLLL : 'dddd, D MMMM YYYY г., LT'
	        },
	        calendar : {
	            sameDay: '[Сегодня в] LT',
	            nextDay: '[Завтра в] LT',
	            lastDay: '[Вчера в] LT',
	            nextWeek: function () {
	                return this.day() === 2 ? '[Во] dddd [в] LT' : '[В] dddd [в] LT';
	            },
	            lastWeek: function (now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                    case 0:
	                        return '[В прошлое] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В прошлый] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В прошлую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'через %s',
	            past : '%s назад',
	            s : 'несколько секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'час',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночи|утра|дня|вечера/i,
	        isPM : function (input) {
	            return /^(дня|вечера)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночи';
	            } else if (hour < 12) {
	                return 'утра';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечера';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го|я)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            case 'w':
	            case 'W':
	                return number + '-я';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ru;
	
	}));

/***/ },
/* 106 */
/*!*******************************!*\
  !*** ./~/moment/locale/sk.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : slovak (sk)
	//! author : Martin Minka : https://github.com/k2s
	//! based on work of petrbela : https://github.com/petrbela
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
	        monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minúty' : 'minút');
	            } else {
	                return result + 'minútami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodín');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dni' : 'dní');
	            } else {
	                return result + 'dňami';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'mesiace' : 'mesiacov');
	            } else {
	                return result + 'mesiacmi';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'rokov');
	            } else {
	                return result + 'rokmi';
	            }
	            break;
	        }
	    }
	
	    var sk = moment.defineLocale('sk', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParse : (function (months, monthsShort) {
	            var i, _monthsParse = [];
	            for (i = 0; i < 12; i++) {
	                // use custom parser to solve problem with July (červenec)
	                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
	            }
	            return _monthsParse;
	        }(months, monthsShort)),
	        weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
	        weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
	        weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY LT',
	            LLLL : 'dddd D. MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[dnes o] LT',
	            nextDay: '[zajtra o] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [o] LT';
	                case 3:
	                    return '[v stredu o] LT';
	                case 4:
	                    return '[vo štvrtok o] LT';
	                case 5:
	                    return '[v piatok o] LT';
	                case 6:
	                    return '[v sobotu o] LT';
	                }
	            },
	            lastDay: '[včera o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[minulú nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[minulý] dddd [o] LT';
	                case 3:
	                    return '[minulú stredu o] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [o] LT';
	                case 6:
	                    return '[minulú sobotu o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'pred %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return sk;
	
	}));

/***/ },
/* 107 */
/*!*******************************!*\
  !*** ./~/moment/locale/sl.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : slovenian (sl)
	//! author : Robert Sedovšek : https://github.com/sedovsek
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'ena minuta' : 'eno minuto';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2) {
	                result += 'minuti';
	            } else if (number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minut';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'ena ura' : 'eno uro';
	        case 'hh':
	            if (number === 1) {
	                result += 'ura';
	            } else if (number === 2) {
	                result += 'uri';
	            } else if (number === 3 || number === 4) {
	                result += 'ure';
	            } else {
	                result += 'ur';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dni';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mesec';
	            } else if (number === 2) {
	                result += 'meseca';
	            } else if (number === 3 || number === 4) {
	                result += 'mesece';
	            } else {
	                result += 'mesecev';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'leto';
	            } else if (number === 2) {
	                result += 'leti';
	            } else if (number === 3 || number === 4) {
	                result += 'leta';
	            } else {
	                result += 'let';
	            }
	            return result;
	        }
	    }
	
	    var sl = moment.defineLocale('sl', {
	        months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
	        weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
	        weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
	        weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'LT:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY LT',
	            LLLL : 'dddd, D. MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay  : '[danes ob] LT',
	            nextDay  : '[jutri ob] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v] [nedeljo] [ob] LT';
	                case 3:
	                    return '[v] [sredo] [ob] LT';
	                case 6:
	                    return '[v] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[v] dddd [ob] LT';
	                }
	            },
	            lastDay  : '[včeraj ob] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[prejšnja] dddd [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prejšnji] dddd [ob] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'čez %s',
	            past   : '%s nazaj',
	            s      : 'nekaj sekund',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'en dan',
	            dd     : translate,
	            M      : 'en mesec',
	            MM     : translate,
	            y      : 'eno leto',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return sl;
	
	}));

/***/ },
/* 108 */
/*!*******************************!*\
  !*** ./~/moment/locale/sq.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Albanian (sq)
	//! author : Flakërim Ismani : https://github.com/flakerimi
	//! author: Menelion Elensúle: https://github.com/Oire (tests)
	//! author : Oerd Cukalla : https://github.com/oerd (fixes)
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var sq = moment.defineLocale('sq', {
	        months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
	        monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
	        weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
	        weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
	        weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
	        meridiemParse: /PD|MD/,
	        isPM: function (input) {
	            return input.charAt(0) === 'M';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            return hours < 12 ? 'PD' : 'MD';
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[Sot në] LT',
	            nextDay : '[Nesër në] LT',
	            nextWeek : 'dddd [në] LT',
	            lastDay : '[Dje në] LT',
	            lastWeek : 'dddd [e kaluar në] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'në %s',
	            past : '%s më parë',
	            s : 'disa sekonda',
	            m : 'një minutë',
	            mm : '%d minuta',
	            h : 'një orë',
	            hh : '%d orë',
	            d : 'një ditë',
	            dd : '%d ditë',
	            M : 'një muaj',
	            MM : '%d muaj',
	            y : 'një vit',
	            yy : '%d vite'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return sq;
	
	}));

/***/ },
/* 109 */
/*!************************************!*\
  !*** ./~/moment/locale/sr-cyrl.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian-cyrillic (sr-cyrl)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var translator = {
	        words: { //Different grammatical cases
	            m: ['један минут', 'једне минуте'],
	            mm: ['минут', 'минуте', 'минута'],
	            h: ['један сат', 'једног сата'],
	            hh: ['сат', 'сата', 'сати'],
	            dd: ['дан', 'дана', 'дана'],
	            MM: ['месец', 'месеца', 'месеци'],
	            yy: ['година', 'године', 'година']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };
	
	    var sr_cyrl = moment.defineLocale('sr-cyrl', {
	        months: ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'],
	        monthsShort: ['јан.', 'феб.', 'мар.', 'апр.', 'мај', 'јун', 'јул', 'авг.', 'сеп.', 'окт.', 'нов.', 'дец.'],
	        weekdays: ['недеља', 'понедељак', 'уторак', 'среда', 'четвртак', 'петак', 'субота'],
	        weekdaysShort: ['нед.', 'пон.', 'уто.', 'сре.', 'чет.', 'пет.', 'суб.'],
	        weekdaysMin: ['не', 'по', 'ут', 'ср', 'че', 'пе', 'су'],
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'LT:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY LT',
	            LLLL: 'dddd, D. MMMM YYYY LT'
	        },
	        calendar: {
	            sameDay: '[данас у] LT',
	            nextDay: '[сутра у] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[у] [недељу] [у] LT';
	                case 3:
	                    return '[у] [среду] [у] LT';
	                case 6:
	                    return '[у] [суботу] [у] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[у] dddd [у] LT';
	                }
	            },
	            lastDay  : '[јуче у] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[прошле] [недеље] [у] LT',
	                    '[прошлог] [понедељка] [у] LT',
	                    '[прошлог] [уторка] [у] LT',
	                    '[прошле] [среде] [у] LT',
	                    '[прошлог] [четвртка] [у] LT',
	                    '[прошлог] [петка] [у] LT',
	                    '[прошле] [суботе] [у] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past   : 'пре %s',
	            s      : 'неколико секунди',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'дан',
	            dd     : translator.translate,
	            M      : 'месец',
	            MM     : translator.translate,
	            y      : 'годину',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return sr_cyrl;
	
	}));

/***/ },
/* 110 */
/*!*******************************!*\
  !*** ./~/moment/locale/sr.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian-latin (sr)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jedne minute'],
	            mm: ['minut', 'minute', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mesec', 'meseca', 'meseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };
	
	    var sr = moment.defineLocale('sr', {
	        months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
	        monthsShort: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun', 'jul', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
	        weekdays: ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'],
	        weekdaysShort: ['ned.', 'pon.', 'uto.', 'sre.', 'čet.', 'pet.', 'sub.'],
	        weekdaysMin: ['ne', 'po', 'ut', 'sr', 'če', 'pe', 'su'],
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'LT:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY LT',
	            LLLL: 'dddd, D. MMMM YYYY LT'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sutra u] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedelju] [u] LT';
	                case 3:
	                    return '[u] [sredu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[juče u] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[prošle] [nedelje] [u] LT',
	                    '[prošlog] [ponedeljka] [u] LT',
	                    '[prošlog] [utorka] [u] LT',
	                    '[prošle] [srede] [u] LT',
	                    '[prošlog] [četvrtka] [u] LT',
	                    '[prošlog] [petka] [u] LT',
	                    '[prošle] [subote] [u] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'pre %s',
	            s      : 'nekoliko sekundi',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'dan',
	            dd     : translator.translate,
	            M      : 'mesec',
	            MM     : translator.translate,
	            y      : 'godinu',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return sr;
	
	}));

/***/ },
/* 111 */
/*!*******************************!*\
  !*** ./~/moment/locale/sv.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swedish (sv)
	//! author : Jens Alm : https://github.com/ulmus
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var sv = moment.defineLocale('sv', {
	        months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
	        weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
	        weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Idag] LT',
	            nextDay: '[Imorgon] LT',
	            lastDay: '[Igår] LT',
	            nextWeek: 'dddd LT',
	            lastWeek: '[Förra] dddd[en] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : 'för %s sedan',
	            s : 'några sekunder',
	            m : 'en minut',
	            mm : '%d minuter',
	            h : 'en timme',
	            hh : '%d timmar',
	            d : 'en dag',
	            dd : '%d dagar',
	            M : 'en månad',
	            MM : '%d månader',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}(e|a)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'e' :
	                (b === 1) ? 'a' :
	                (b === 2) ? 'a' :
	                (b === 3) ? 'e' : 'e';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return sv;
	
	}));

/***/ },
/* 112 */
/*!*******************************!*\
  !*** ./~/moment/locale/ta.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : tamil (ta)
	//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var ta = moment.defineLocale('ta', {
	        months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
	        weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
	        weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, LT',
	            LLLL : 'dddd, D MMMM YYYY, LT'
	        },
	        calendar : {
	            sameDay : '[இன்று] LT',
	            nextDay : '[நாளை] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[நேற்று] LT',
	            lastWeek : '[கடந்த வாரம்] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s இல்',
	            past : '%s முன்',
	            s : 'ஒரு சில விநாடிகள்',
	            m : 'ஒரு நிமிடம்',
	            mm : '%d நிமிடங்கள்',
	            h : 'ஒரு மணி நேரம்',
	            hh : '%d மணி நேரம்',
	            d : 'ஒரு நாள்',
	            dd : '%d நாட்கள்',
	            M : 'ஒரு மாதம்',
	            MM : '%d மாதங்கள்',
	            y : 'ஒரு வருடம்',
	            yy : '%d ஆண்டுகள்'
	        },
	        ordinalParse: /\d{1,2}வது/,
	        ordinal : function (number) {
	            return number + 'வது';
	        },
	        // refer http://ta.wikipedia.org/s/1er1
	        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 2) {
	                return ' யாமம்';
	            } else if (hour < 6) {
	                return ' வைகறை';  // வைகறை
	            } else if (hour < 10) {
	                return ' காலை'; // காலை
	            } else if (hour < 14) {
	                return ' நண்பகல்'; // நண்பகல்
	            } else if (hour < 18) {
	                return ' எற்பாடு'; // எற்பாடு
	            } else if (hour < 22) {
	                return ' மாலை'; // மாலை
	            } else {
	                return ' யாமம்';
	            }
	        },
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'யாமம்') {
	                return hour < 2 ? hour : hour + 12;
	            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
	                return hour;
	            } else if (meridiem === 'நண்பகல்') {
	                return hour >= 10 ? hour : hour + 12;
	            } else {
	                return hour + 12;
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return ta;
	
	}));

/***/ },
/* 113 */
/*!*******************************!*\
  !*** ./~/moment/locale/th.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : thai (th)
	//! author : Kridsada Thanabulpong : https://github.com/sirn
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var th = moment.defineLocale('th', {
	        months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
	        monthsShort : 'มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา'.split('_'),
	        weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
	        weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
	        weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
	        longDateFormat : {
	            LT : 'H นาฬิกา m นาที',
	            LTS : 'LT s วินาที',
	            L : 'YYYY/MM/DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY เวลา LT',
	            LLLL : 'วันddddที่ D MMMM YYYY เวลา LT'
	        },
	        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
	        isPM: function (input) {
	            return input === 'หลังเที่ยง';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ก่อนเที่ยง';
	            } else {
	                return 'หลังเที่ยง';
	            }
	        },
	        calendar : {
	            sameDay : '[วันนี้ เวลา] LT',
	            nextDay : '[พรุ่งนี้ เวลา] LT',
	            nextWeek : 'dddd[หน้า เวลา] LT',
	            lastDay : '[เมื่อวานนี้ เวลา] LT',
	            lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'อีก %s',
	            past : '%sที่แล้ว',
	            s : 'ไม่กี่วินาที',
	            m : '1 นาที',
	            mm : '%d นาที',
	            h : '1 ชั่วโมง',
	            hh : '%d ชั่วโมง',
	            d : '1 วัน',
	            dd : '%d วัน',
	            M : '1 เดือน',
	            MM : '%d เดือน',
	            y : '1 ปี',
	            yy : '%d ปี'
	        }
	    });
	
	    return th;
	
	}));

/***/ },
/* 114 */
/*!**********************************!*\
  !*** ./~/moment/locale/tl-ph.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tagalog/Filipino (tl-ph)
	//! author : Dan Hagman
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var tl_ph = moment.defineLocale('tl-ph', {
	        months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
	        monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
	        weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
	        weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
	        weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'MM/D/YYYY',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY LT',
	            LLLL : 'dddd, MMMM DD, YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Ngayon sa] LT',
	            nextDay: '[Bukas sa] LT',
	            nextWeek: 'dddd [sa] LT',
	            lastDay: '[Kahapon sa] LT',
	            lastWeek: 'dddd [huling linggo] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'sa loob ng %s',
	            past : '%s ang nakalipas',
	            s : 'ilang segundo',
	            m : 'isang minuto',
	            mm : '%d minuto',
	            h : 'isang oras',
	            hh : '%d oras',
	            d : 'isang araw',
	            dd : '%d araw',
	            M : 'isang buwan',
	            MM : '%d buwan',
	            y : 'isang taon',
	            yy : '%d taon'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return tl_ph;
	
	}));

/***/ },
/* 115 */
/*!*******************************!*\
  !*** ./~/moment/locale/tr.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : turkish (tr)
	//! authors : Erhan Gundogan : https://github.com/erhangundogan,
	//!           Burak Yiğit Kaya: https://github.com/BYK
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var suffixes = {
	        1: '\'inci',
	        5: '\'inci',
	        8: '\'inci',
	        70: '\'inci',
	        80: '\'inci',
	        2: '\'nci',
	        7: '\'nci',
	        20: '\'nci',
	        50: '\'nci',
	        3: '\'üncü',
	        4: '\'üncü',
	        100: '\'üncü',
	        6: '\'ncı',
	        9: '\'uncu',
	        10: '\'uncu',
	        30: '\'uncu',
	        60: '\'ıncı',
	        90: '\'ıncı'
	    };
	
	    var tr = moment.defineLocale('tr', {
	        months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
	        monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
	        weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
	        weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
	        weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd, D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[yarın saat] LT',
	            nextWeek : '[haftaya] dddd [saat] LT',
	            lastDay : '[dün] LT',
	            lastWeek : '[geçen hafta] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s önce',
	            s : 'birkaç saniye',
	            m : 'bir dakika',
	            mm : '%d dakika',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir yıl',
	            yy : '%d yıl'
	        },
	        ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '\'ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return tr;
	
	}));

/***/ },
/* 116 */
/*!*************************************!*\
  !*** ./~/moment/locale/tzm-latn.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt in Latin (tzm-latn)
	//! author : Abdel Said : https://github.com/abdelsaid
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var tzm_latn = moment.defineLocale('tzm-latn', {
	        months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[asdkh g] LT',
	            nextDay: '[aska g] LT',
	            nextWeek: 'dddd [g] LT',
	            lastDay: '[assant g] LT',
	            lastWeek: 'dddd [g] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dadkh s yan %s',
	            past : 'yan %s',
	            s : 'imik',
	            m : 'minuḍ',
	            mm : '%d minuḍ',
	            h : 'saɛa',
	            hh : '%d tassaɛin',
	            d : 'ass',
	            dd : '%d ossan',
	            M : 'ayowr',
	            MM : '%d iyyirn',
	            y : 'asgas',
	            yy : '%d isgasn'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return tzm_latn;
	
	}));

/***/ },
/* 117 */
/*!********************************!*\
  !*** ./~/moment/locale/tzm.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt (tzm)
	//! author : Abdel Said : https://github.com/abdelsaid
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var tzm = moment.defineLocale('tzm', {
	        months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS: 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'dddd D MMMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
	            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
	            nextWeek: 'dddd [ⴴ] LT',
	            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
	            lastWeek: 'dddd [ⴴ] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
	            past : 'ⵢⴰⵏ %s',
	            s : 'ⵉⵎⵉⴽ',
	            m : 'ⵎⵉⵏⵓⴺ',
	            mm : '%d ⵎⵉⵏⵓⴺ',
	            h : 'ⵙⴰⵄⴰ',
	            hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
	            d : 'ⴰⵙⵙ',
	            dd : '%d oⵙⵙⴰⵏ',
	            M : 'ⴰⵢoⵓⵔ',
	            MM : '%d ⵉⵢⵢⵉⵔⵏ',
	            y : 'ⴰⵙⴳⴰⵙ',
	            yy : '%d ⵉⵙⴳⴰⵙⵏ'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return tzm;
	
	}));

/***/ },
/* 118 */
/*!*******************************!*\
  !*** ./~/moment/locale/uk.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : ukrainian (uk)
	//! author : zemlanin : https://github.com/zemlanin
	//! Author : Menelion Elensúle : https://github.com/Oire
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': 'хвилина_хвилини_хвилин',
	            'hh': 'година_години_годин',
	            'dd': 'день_дні_днів',
	            'MM': 'місяць_місяці_місяців',
	            'yy': 'рік_роки_років'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвилина' : 'хвилину';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'година' : 'годину';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    function monthsCaseReplace(m, format) {
	        var months = {
	            'nominative': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
	            'accusative': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_')
	        },
	        nounCase = (/D[oD]? *MMMM?/).test(format) ?
	            'accusative' :
	            'nominative';
	        return months[nounCase][m.month()];
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = {
	            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
	            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
	            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
	        },
	        nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
	            'accusative' :
	            ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
	                'genitive' :
	                'nominative');
	        return weekdays[nounCase][m.day()];
	    }
	    function processHoursFunction(str) {
	        return function () {
	            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
	        };
	    }
	
	    var uk = moment.defineLocale('uk', {
	        months : monthsCaseReplace,
	        monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
	        weekdays : weekdaysCaseReplace,
	        weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY р.',
	            LLL : 'D MMMM YYYY р., LT',
	            LLLL : 'dddd, D MMMM YYYY р., LT'
	        },
	        calendar : {
	            sameDay: processHoursFunction('[Сьогодні '),
	            nextDay: processHoursFunction('[Завтра '),
	            lastDay: processHoursFunction('[Вчора '),
	            nextWeek: processHoursFunction('[У] dddd ['),
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return processHoursFunction('[Минулої] dddd [').call(this);
	                case 1:
	                case 2:
	                case 4:
	                    return processHoursFunction('[Минулого] dddd [').call(this);
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past : '%s тому',
	            s : 'декілька секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'годину',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'місяць',
	            MM : relativeTimeWithPlural,
	            y : 'рік',
	            yy : relativeTimeWithPlural
	        },
	        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
	        meridiemParse: /ночі|ранку|дня|вечора/,
	        isPM: function (input) {
	            return /^(дня|вечора)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночі';
	            } else if (hour < 12) {
	                return 'ранку';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечора';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });
	
	    return uk;
	
	}));

/***/ },
/* 119 */
/*!*******************************!*\
  !*** ./~/moment/locale/uz.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : uzbek (uz)
	//! author : Sardor Muminov : https://github.com/muminoff
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var uz = moment.defineLocale('uz', {
	        months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
	        monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
	        weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
	        weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY LT',
	            LLLL : 'D MMMM YYYY, dddd LT'
	        },
	        calendar : {
	            sameDay : '[Бугун соат] LT [да]',
	            nextDay : '[Эртага] LT [да]',
	            nextWeek : 'dddd [куни соат] LT [да]',
	            lastDay : '[Кеча соат] LT [да]',
	            lastWeek : '[Утган] dddd [куни соат] LT [да]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'Якин %s ичида',
	            past : 'Бир неча %s олдин',
	            s : 'фурсат',
	            m : 'бир дакика',
	            mm : '%d дакика',
	            h : 'бир соат',
	            hh : '%d соат',
	            d : 'бир кун',
	            dd : '%d кун',
	            M : 'бир ой',
	            MM : '%d ой',
	            y : 'бир йил',
	            yy : '%d йил'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return uz;
	
	}));

/***/ },
/* 120 */
/*!*******************************!*\
  !*** ./~/moment/locale/vi.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : vietnamese (vi)
	//! author : Bang Nguyen : https://github.com/bangnk
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var vi = moment.defineLocale('vi', {
	        months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
	        monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
	        weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
	        weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'LT:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM [năm] YYYY',
	            LLL : 'D MMMM [năm] YYYY LT',
	            LLLL : 'dddd, D MMMM [năm] YYYY LT',
	            l : 'DD/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY LT',
	            llll : 'ddd, D MMM YYYY LT'
	        },
	        calendar : {
	            sameDay: '[Hôm nay lúc] LT',
	            nextDay: '[Ngày mai lúc] LT',
	            nextWeek: 'dddd [tuần tới lúc] LT',
	            lastDay: '[Hôm qua lúc] LT',
	            lastWeek: 'dddd [tuần rồi lúc] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s tới',
	            past : '%s trước',
	            s : 'vài giây',
	            m : 'một phút',
	            mm : '%d phút',
	            h : 'một giờ',
	            hh : '%d giờ',
	            d : 'một ngày',
	            dd : '%d ngày',
	            M : 'một tháng',
	            MM : '%d tháng',
	            y : 'một năm',
	            yy : '%d năm'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return vi;
	
	}));

/***/ },
/* 121 */
/*!**********************************!*\
  !*** ./~/moment/locale/zh-cn.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : chinese (zh-cn)
	//! author : suupic : https://github.com/suupic
	//! author : Zeno Zeng : https://github.com/zenozeng
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var zh_cn = moment.defineLocale('zh-cn', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah点mm',
	            LTS : 'Ah点m分s秒',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日LT',
	            LLLL : 'YYYY年MMMD日ddddLT',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日LT',
	            llll : 'YYYY年MMMD日ddddLT'
	        },
	        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '凌晨' || meridiem === '早上' ||
	                    meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            } else {
	                // '中午'
	                return hour >= 11 ? hour : hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 600) {
	                return '凌晨';
	            } else if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : function () {
	                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
	            },
	            nextDay : function () {
	                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
	            },
	            lastDay : function () {
	                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
	            },
	            nextWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            lastWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            sameElse : 'LL'
	        },
	        ordinalParse: /\d{1,2}(日|月|周)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            case 'M':
	                return number + '月';
	            case 'w':
	            case 'W':
	                return number + '周';
	            default:
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s内',
	            past : '%s前',
	            s : '几秒',
	            m : '1分钟',
	            mm : '%d分钟',
	            h : '1小时',
	            hh : '%d小时',
	            d : '1天',
	            dd : '%d天',
	            M : '1个月',
	            MM : '%d个月',
	            y : '1年',
	            yy : '%d年'
	        },
	        week : {
	            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });
	
	    return zh_cn;
	
	}));

/***/ },
/* 122 */
/*!**********************************!*\
  !*** ./~/moment/locale/zh-tw.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : traditional chinese (zh-tw)
	//! author : Ben : https://github.com/ben-lin
	
	(function (global, factory) {
	   true ? factory(__webpack_require__(/*! ../moment */ 28)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';
	
	
	    var zh_tw = moment.defineLocale('zh-tw', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah點mm',
	            LTS : 'Ah點m分s秒',
	            L : 'YYYY年MMMD日',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日LT',
	            LLLL : 'YYYY年MMMD日ddddLT',
	            l : 'YYYY年MMMD日',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日LT',
	            llll : 'YYYY年MMMD日ddddLT'
	        },
	        meridiemParse: /早上|上午|中午|下午|晚上/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '早上' || meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '中午') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : '[今天]LT',
	            nextDay : '[明天]LT',
	            nextWeek : '[下]ddddLT',
	            lastDay : '[昨天]LT',
	            lastWeek : '[上]ddddLT',
	            sameElse : 'L'
	        },
	        ordinalParse: /\d{1,2}(日|月|週)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd' :
	            case 'D' :
	            case 'DDD' :
	                return number + '日';
	            case 'M' :
	                return number + '月';
	            case 'w' :
	            case 'W' :
	                return number + '週';
	            default :
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s內',
	            past : '%s前',
	            s : '幾秒',
	            m : '一分鐘',
	            mm : '%d分鐘',
	            h : '一小時',
	            hh : '%d小時',
	            d : '一天',
	            dd : '%d天',
	            M : '一個月',
	            MM : '%d個月',
	            y : '一年',
	            yy : '%d年'
	        }
	    });
	
	    return zh_tw;
	
	}));

/***/ },
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */
/*!*************************************!*\
  !*** ./~/css-loader/cssToString.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map