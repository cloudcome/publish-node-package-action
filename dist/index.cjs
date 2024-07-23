"use strict";
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var _root, _hasMagic, _uflag, _parts, _parent, _parentIndex, _negs, _filledNegs, _options, _toString, _emptyExt, _AST_instances, fillNegs_fn, _AST_static, parseAST_fn, partsToRegExp_fn, parseGlob_fn, _a, _constructing, _b, _c, _max, _maxSize, _dispose, _disposeAfter, _fetchMethod, _memoMethod, _size, _calculatedSize, _keyMap, _keyList, _valList, _next, _prev, _head, _tail, _free, _disposed, _sizes, _starts, _ttls, _hasDispose, _hasFetchMethod, _hasDisposeAfter, _LRUCache_instances, initializeTTLTracking_fn, _updateItemAge, _statusTTL, _setItemTTL, _isStale, initializeSizeTracking_fn, _removeItemSize, _addItemSize, _requireSize, indexes_fn, rindexes_fn, isValidIndex_fn, evict_fn, backgroundFetch_fn, isBackgroundFetch_fn, connect_fn, moveToTail_fn, delete_fn, clear_fn, _fs, _dev, _mode, _nlink, _uid, _gid, _rdev, _blksize, _ino, _size2, _blocks, _atimeMs, _mtimeMs, _ctimeMs, _birthtimeMs, _atime, _mtime, _ctime, _birthtime, _matchName, _depth, _fullpath, _fullpathPosix, _relative, _relativePosix, _type, _children, _linkTarget, _realpath, _PathBase_instances, resolveParts_fn, readdirSuccess_fn, markENOENT_fn, markChildrenENOENT_fn, markENOREALPATH_fn, markENOTDIR_fn, readdirFail_fn, lstatFail_fn, readlinkFail_fn, readdirAddChild_fn, readdirAddNewChild_fn, readdirMaybePromoteChild_fn, readdirPromoteChild_fn, applyStat_fn, _onReaddirCB, _readdirCBInFlight, callOnReaddirCB_fn, _asyncReaddirInFlight, _resolveCache, _resolvePosixCache, _children2, _fs2, _patternList, _globList, _index, _platform, _rest, _globString, _isDrive, _isUNC, _isAbsolute, _followGlobstar, _onResume, _ignore, _sep, _GlobUtil_instances, ignored_fn, childrenIgnored_fn;
const require$$0 = require("path");
const require$$0$1 = require("fs/promises");
const fs = require("fs");
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
const { basename: basename$1, dirname: dirname$1 } = require$$0;
const getName$1 = (parent, base) => parent.charAt(0) === "@" ? `${parent}/${base}` : base;
var lib$4 = (dir) => dir ? getName$1(basename$1(dirname$1(dir)), basename$1(dir)) : false;
var commonjs$4 = {};
var balancedMatch = balanced$1;
function balanced$1(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);
  var r = range(a, b, str);
  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}
function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}
balanced$1.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;
  if (ai >= 0 && bi > 0) {
    if (a === b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;
    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [begs.pop(), bi];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }
        bi = str.indexOf(b, i + 1);
      }
      i = ai < bi && ai >= 0 ? ai : bi;
    }
    if (begs.length) {
      result = [left, right];
    }
  }
  return result;
}
var balanced = balancedMatch;
var braceExpansion = expandTop;
var escSlash = "\0SLASH" + Math.random() + "\0";
var escOpen = "\0OPEN" + Math.random() + "\0";
var escClose = "\0CLOSE" + Math.random() + "\0";
var escComma = "\0COMMA" + Math.random() + "\0";
var escPeriod = "\0PERIOD" + Math.random() + "\0";
function numeric(str) {
  return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
  return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
}
function unescapeBraces(str) {
  return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
}
function parseCommaParts(str) {
  if (!str)
    return [""];
  var parts = [];
  var m = balanced("{", "}", str);
  if (!m)
    return str.split(",");
  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(",");
  p[p.length - 1] += "{" + body + "}";
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length - 1] += postParts.shift();
    p.push.apply(p, postParts);
  }
  parts.push.apply(parts, p);
  return parts;
}
function expandTop(str) {
  if (!str)
    return [];
  if (str.substr(0, 2) === "{}") {
    str = "\\{\\}" + str.substr(2);
  }
  return expand(escapeBraces(str), true).map(unescapeBraces);
}
function embrace(str) {
  return "{" + str + "}";
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}
function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}
function expand(str, isTop) {
  var expansions = [];
  var m = balanced("{", "}", str);
  if (!m) return [str];
  var pre = m.pre;
  var post = m.post.length ? expand(m.post, false) : [""];
  if (/\$$/.test(m.pre)) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + "{" + m.body + "}" + post[k];
      expansions.push(expansion);
    }
  } else {
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (m.post.match(/,.*\}/)) {
        str = m.pre + "{" + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }
    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          return post.map(function(p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }
    var N;
    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);
      N = [];
      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === "\\")
            c = "";
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join("0");
              if (i < 0)
                c = "-" + z + c.slice(1);
              else
                c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = [];
      for (var j = 0; j < n.length; j++) {
        N.push.apply(N, expand(n[j], false));
      }
    }
    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion)
          expansions.push(expansion);
      }
    }
  }
  return expansions;
}
var assertValidPattern$1 = {};
Object.defineProperty(assertValidPattern$1, "__esModule", { value: true });
assertValidPattern$1.assertValidPattern = void 0;
const MAX_PATTERN_LENGTH = 1024 * 64;
const assertValidPattern = (pattern2) => {
  if (typeof pattern2 !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern2.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};
assertValidPattern$1.assertValidPattern = assertValidPattern;
var ast = {};
var braceExpressions = {};
Object.defineProperty(braceExpressions, "__esModule", { value: true });
braceExpressions.parseClass = void 0;
const posixClasses = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false]
};
const braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
const regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
const rangesToString = (ranges) => ranges.join("");
const parseClass = (glob2, position) => {
  const pos = position;
  if (glob2.charAt(pos) !== "[") {
    throw new Error("not in a brace expression");
  }
  const ranges = [];
  const negs = [];
  let i = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE: while (i < glob2.length) {
    const c = glob2.charAt(i);
    if ((c === "!" || c === "^") && i === pos + 1) {
      negate = true;
      i++;
      continue;
    }
    if (c === "]" && sawStart && !escaping) {
      endPos = i + 1;
      break;
    }
    sawStart = true;
    if (c === "\\") {
      if (!escaping) {
        escaping = true;
        i++;
        continue;
      }
    }
    if (c === "[" && !escaping) {
      for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
        if (glob2.startsWith(cls, i)) {
          if (rangeStart) {
            return ["$.", false, glob2.length - pos, true];
          }
          i += cls.length;
          if (neg)
            negs.push(unip);
          else
            ranges.push(unip);
          uflag = uflag || u;
          continue WHILE;
        }
      }
    }
    escaping = false;
    if (rangeStart) {
      if (c > rangeStart) {
        ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
      } else if (c === rangeStart) {
        ranges.push(braceEscape(c));
      }
      rangeStart = "";
      i++;
      continue;
    }
    if (glob2.startsWith("-]", i + 1)) {
      ranges.push(braceEscape(c + "-"));
      i += 2;
      continue;
    }
    if (glob2.startsWith("-", i + 1)) {
      rangeStart = c;
      i += 2;
      continue;
    }
    ranges.push(braceEscape(c));
    i++;
  }
  if (endPos < i) {
    return ["", false, 0, false];
  }
  if (!ranges.length && !negs.length) {
    return ["$.", false, glob2.length - pos, true];
  }
  if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
    const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
    return [regexpEscape(r), false, endPos - pos, false];
  }
  const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
  const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
  const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
  return [comb, uflag, endPos - pos, true];
};
braceExpressions.parseClass = parseClass;
var _unescape = {};
Object.defineProperty(_unescape, "__esModule", { value: true });
_unescape.unescape = void 0;
const unescape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
};
_unescape.unescape = unescape;
Object.defineProperty(ast, "__esModule", { value: true });
ast.AST = void 0;
const brace_expressions_js_1 = braceExpressions;
const unescape_js_1 = _unescape;
const types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
const isExtglobType = (c) => types.has(c);
const startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
const startNoDot = "(?!\\.)";
const addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
const justDots = /* @__PURE__ */ new Set(["..", "."]);
const reSpecials = new Set("().*{}+?[]^$\\!");
const regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
const qmark = "[^/]";
const star = qmark + "*?";
const starNoEmpty = qmark + "+?";
const _AST = class _AST {
  constructor(type, parent, options = {}) {
    __privateAdd(this, _AST_instances);
    __publicField(this, "type");
    __privateAdd(this, _root);
    __privateAdd(this, _hasMagic);
    __privateAdd(this, _uflag, false);
    __privateAdd(this, _parts, []);
    __privateAdd(this, _parent);
    __privateAdd(this, _parentIndex);
    __privateAdd(this, _negs);
    __privateAdd(this, _filledNegs, false);
    __privateAdd(this, _options);
    __privateAdd(this, _toString);
    // set to true if it's an extglob with no children
    // (which really means one child of '')
    __privateAdd(this, _emptyExt, false);
    this.type = type;
    if (type)
      __privateSet(this, _hasMagic, true);
    __privateSet(this, _parent, parent);
    __privateSet(this, _root, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _root) : this);
    __privateSet(this, _options, __privateGet(this, _root) === this ? options : __privateGet(__privateGet(this, _root), _options));
    __privateSet(this, _negs, __privateGet(this, _root) === this ? [] : __privateGet(__privateGet(this, _root), _negs));
    if (type === "!" && !__privateGet(__privateGet(this, _root), _filledNegs))
      __privateGet(this, _negs).push(this);
    __privateSet(this, _parentIndex, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0);
  }
  get hasMagic() {
    if (__privateGet(this, _hasMagic) !== void 0)
      return __privateGet(this, _hasMagic);
    for (const p of __privateGet(this, _parts)) {
      if (typeof p === "string")
        continue;
      if (p.type || p.hasMagic)
        return __privateSet(this, _hasMagic, true);
    }
    return __privateGet(this, _hasMagic);
  }
  // reconstructs the pattern
  toString() {
    if (__privateGet(this, _toString) !== void 0)
      return __privateGet(this, _toString);
    if (!this.type) {
      return __privateSet(this, _toString, __privateGet(this, _parts).map((p) => String(p)).join(""));
    } else {
      return __privateSet(this, _toString, this.type + "(" + __privateGet(this, _parts).map((p) => String(p)).join("|") + ")");
    }
  }
  push(...parts) {
    for (const p of parts) {
      if (p === "")
        continue;
      if (typeof p !== "string" && !(p instanceof _AST && __privateGet(p, _parent) === this)) {
        throw new Error("invalid part: " + p);
      }
      __privateGet(this, _parts).push(p);
    }
  }
  toJSON() {
    var _a2;
    const ret = this.type === null ? __privateGet(this, _parts).slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...__privateGet(this, _parts).map((p) => p.toJSON())];
    if (this.isStart() && !this.type)
      ret.unshift([]);
    if (this.isEnd() && (this === __privateGet(this, _root) || __privateGet(__privateGet(this, _root), _filledNegs) && ((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!")) {
      ret.push({});
    }
    return ret;
  }
  isStart() {
    var _a2;
    if (__privateGet(this, _root) === this)
      return true;
    if (!((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.isStart()))
      return false;
    if (__privateGet(this, _parentIndex) === 0)
      return true;
    const p = __privateGet(this, _parent);
    for (let i = 0; i < __privateGet(this, _parentIndex); i++) {
      const pp = __privateGet(p, _parts)[i];
      if (!(pp instanceof _AST && pp.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    var _a2, _b2, _c2;
    if (__privateGet(this, _root) === this)
      return true;
    if (((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!")
      return true;
    if (!((_b2 = __privateGet(this, _parent)) == null ? void 0 : _b2.isEnd()))
      return false;
    if (!this.type)
      return (_c2 = __privateGet(this, _parent)) == null ? void 0 : _c2.isEnd();
    const pl = __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0;
    return __privateGet(this, _parentIndex) === pl - 1;
  }
  copyIn(part) {
    if (typeof part === "string")
      this.push(part);
    else
      this.push(part.clone(this));
  }
  clone(parent) {
    const c = new _AST(this.type, parent);
    for (const p of __privateGet(this, _parts)) {
      c.copyIn(p);
    }
    return c;
  }
  static fromGlob(pattern2, options = {}) {
    var _a2;
    const ast2 = new _AST(null, void 0, options);
    __privateMethod(_a2 = _AST, _AST_static, parseAST_fn).call(_a2, pattern2, ast2, 0, options);
    return ast2;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== __privateGet(this, _root))
      return __privateGet(this, _root).toMMPattern();
    const glob2 = this.toString();
    const [re, body, hasMagic2, uflag] = this.toRegExpSource();
    const anyMagic = hasMagic2 || __privateGet(this, _hasMagic) || __privateGet(this, _options).nocase && !__privateGet(this, _options).nocaseMagicOnly && glob2.toUpperCase() !== glob2.toLowerCase();
    if (!anyMagic) {
      return body;
    }
    const flags = (__privateGet(this, _options).nocase ? "i" : "") + (uflag ? "u" : "");
    return Object.assign(new RegExp(`^${re}$`, flags), {
      _src: re,
      _glob: glob2
    });
  }
  get options() {
    return __privateGet(this, _options);
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(allowDot) {
    var _a2;
    const dot = allowDot ?? !!__privateGet(this, _options).dot;
    if (__privateGet(this, _root) === this)
      __privateMethod(this, _AST_instances, fillNegs_fn).call(this);
    if (!this.type) {
      const noEmpty = this.isStart() && this.isEnd();
      const src = __privateGet(this, _parts).map((p) => {
        var _a3;
        const [re, _, hasMagic2, uflag] = typeof p === "string" ? __privateMethod(_a3 = _AST, _AST_static, parseGlob_fn).call(_a3, p, __privateGet(this, _hasMagic), noEmpty) : p.toRegExpSource(allowDot);
        __privateSet(this, _hasMagic, __privateGet(this, _hasMagic) || hasMagic2);
        __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
        return re;
      }).join("");
      let start2 = "";
      if (this.isStart()) {
        if (typeof __privateGet(this, _parts)[0] === "string") {
          const dotTravAllowed = __privateGet(this, _parts).length === 1 && justDots.has(__privateGet(this, _parts)[0]);
          if (!dotTravAllowed) {
            const aps = addPatternStart;
            const needNoTrav = (
              // dots are allowed, and the pattern starts with [ or .
              dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
              src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
              src.startsWith("\\.\\.") && aps.has(src.charAt(4))
            );
            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
            start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && __privateGet(__privateGet(this, _root), _filledNegs) && ((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start2 + src + end;
      return [
        final2,
        (0, unescape_js_1.unescape)(src),
        __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
        __privateGet(this, _uflag)
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = __privateMethod(this, _AST_instances, partsToRegExp_fn).call(this, dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      __privateSet(this, _parts, [s]);
      this.type = null;
      __privateSet(this, _hasMagic, void 0);
      return [s, (0, unescape_js_1.unescape)(this.toString()), false, false];
    }
    let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : __privateMethod(this, _AST_instances, partsToRegExp_fn).call(this, true);
    if (bodyDotAllowed === body) {
      bodyDotAllowed = "";
    }
    if (bodyDotAllowed) {
      body = `(?:${body})(?:${bodyDotAllowed})*?`;
    }
    let final = "";
    if (this.type === "!" && __privateGet(this, _emptyExt)) {
      final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
    } else {
      const close = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
      final = start + body + close;
    }
    return [
      final,
      (0, unescape_js_1.unescape)(body),
      __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
      __privateGet(this, _uflag)
    ];
  }
};
_root = new WeakMap();
_hasMagic = new WeakMap();
_uflag = new WeakMap();
_parts = new WeakMap();
_parent = new WeakMap();
_parentIndex = new WeakMap();
_negs = new WeakMap();
_filledNegs = new WeakMap();
_options = new WeakMap();
_toString = new WeakMap();
_emptyExt = new WeakMap();
_AST_instances = new WeakSet();
fillNegs_fn = function() {
  if (this !== __privateGet(this, _root))
    throw new Error("should only call on root");
  if (__privateGet(this, _filledNegs))
    return this;
  this.toString();
  __privateSet(this, _filledNegs, true);
  let n;
  while (n = __privateGet(this, _negs).pop()) {
    if (n.type !== "!")
      continue;
    let p = n;
    let pp = __privateGet(p, _parent);
    while (pp) {
      for (let i = __privateGet(p, _parentIndex) + 1; !pp.type && i < __privateGet(pp, _parts).length; i++) {
        for (const part of __privateGet(n, _parts)) {
          if (typeof part === "string") {
            throw new Error("string part in extglob AST??");
          }
          part.copyIn(__privateGet(pp, _parts)[i]);
        }
      }
      p = pp;
      pp = __privateGet(p, _parent);
    }
  }
  return this;
};
_AST_static = new WeakSet();
parseAST_fn = function(str, ast2, pos, opt) {
  var _a2, _b2;
  let escaping = false;
  let inBrace = false;
  let braceStart = -1;
  let braceNeg = false;
  if (ast2.type === null) {
    let i2 = pos;
    let acc2 = "";
    while (i2 < str.length) {
      const c = str.charAt(i2++);
      if (escaping || c === "\\") {
        escaping = !escaping;
        acc2 += c;
        continue;
      }
      if (inBrace) {
        if (i2 === braceStart + 1) {
          if (c === "^" || c === "!") {
            braceNeg = true;
          }
        } else if (c === "]" && !(i2 === braceStart + 2 && braceNeg)) {
          inBrace = false;
        }
        acc2 += c;
        continue;
      } else if (c === "[") {
        inBrace = true;
        braceStart = i2;
        braceNeg = false;
        acc2 += c;
        continue;
      }
      if (!opt.noext && isExtglobType(c) && str.charAt(i2) === "(") {
        ast2.push(acc2);
        acc2 = "";
        const ext = new _AST(c, ast2);
        i2 = __privateMethod(_a2 = _AST, _AST_static, parseAST_fn).call(_a2, str, ext, i2, opt);
        ast2.push(ext);
        continue;
      }
      acc2 += c;
    }
    ast2.push(acc2);
    return i2;
  }
  let i = pos + 1;
  let part = new _AST(null, ast2);
  const parts = [];
  let acc = "";
  while (i < str.length) {
    const c = str.charAt(i++);
    if (escaping || c === "\\") {
      escaping = !escaping;
      acc += c;
      continue;
    }
    if (inBrace) {
      if (i === braceStart + 1) {
        if (c === "^" || c === "!") {
          braceNeg = true;
        }
      } else if (c === "]" && !(i === braceStart + 2 && braceNeg)) {
        inBrace = false;
      }
      acc += c;
      continue;
    } else if (c === "[") {
      inBrace = true;
      braceStart = i;
      braceNeg = false;
      acc += c;
      continue;
    }
    if (isExtglobType(c) && str.charAt(i) === "(") {
      part.push(acc);
      acc = "";
      const ext = new _AST(c, part);
      part.push(ext);
      i = __privateMethod(_b2 = _AST, _AST_static, parseAST_fn).call(_b2, str, ext, i, opt);
      continue;
    }
    if (c === "|") {
      part.push(acc);
      acc = "";
      parts.push(part);
      part = new _AST(null, ast2);
      continue;
    }
    if (c === ")") {
      if (acc === "" && __privateGet(ast2, _parts).length === 0) {
        __privateSet(ast2, _emptyExt, true);
      }
      part.push(acc);
      acc = "";
      ast2.push(...parts, part);
      return i;
    }
    acc += c;
  }
  ast2.type = null;
  __privateSet(ast2, _hasMagic, void 0);
  __privateSet(ast2, _parts, [str.substring(pos - 1)]);
  return i;
};
partsToRegExp_fn = function(dot) {
  return __privateGet(this, _parts).map((p) => {
    if (typeof p === "string") {
      throw new Error("string type in extglob ast??");
    }
    const [re, _, _hasMagic2, uflag] = p.toRegExpSource(dot);
    __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
    return re;
  }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
};
parseGlob_fn = function(glob2, hasMagic2, noEmpty = false) {
  let escaping = false;
  let re = "";
  let uflag = false;
  for (let i = 0; i < glob2.length; i++) {
    const c = glob2.charAt(i);
    if (escaping) {
      escaping = false;
      re += (reSpecials.has(c) ? "\\" : "") + c;
      continue;
    }
    if (c === "\\") {
      if (i === glob2.length - 1) {
        re += "\\\\";
      } else {
        escaping = true;
      }
      continue;
    }
    if (c === "[") {
      const [src, needUflag, consumed, magic] = (0, brace_expressions_js_1.parseClass)(glob2, i);
      if (consumed) {
        re += src;
        uflag = uflag || needUflag;
        i += consumed - 1;
        hasMagic2 = hasMagic2 || magic;
        continue;
      }
    }
    if (c === "*") {
      if (noEmpty && glob2 === "*")
        re += starNoEmpty;
      else
        re += star;
      hasMagic2 = true;
      continue;
    }
    if (c === "?") {
      re += qmark;
      hasMagic2 = true;
      continue;
    }
    re += regExpEscape(c);
  }
  return [re, (0, unescape_js_1.unescape)(glob2), !!hasMagic2, uflag];
};
__privateAdd(_AST, _AST_static);
let AST = _AST;
ast.AST = AST;
var _escape = {};
Object.defineProperty(_escape, "__esModule", { value: true });
_escape.escape = void 0;
const escape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};
_escape.escape = escape;
(function(exports2) {
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.unescape = exports2.escape = exports2.AST = exports2.Minimatch = exports2.match = exports2.makeRe = exports2.braceExpand = exports2.defaults = exports2.filter = exports2.GLOBSTAR = exports2.sep = exports2.minimatch = void 0;
  const brace_expansion_1 = __importDefault(braceExpansion);
  const assert_valid_pattern_js_1 = assertValidPattern$1;
  const ast_js_1 = ast;
  const escape_js_1 = _escape;
  const unescape_js_12 = _unescape;
  const minimatch2 = (p, pattern2, options = {}) => {
    (0, assert_valid_pattern_js_1.assertValidPattern)(pattern2);
    if (!options.nocomment && pattern2.charAt(0) === "#") {
      return false;
    }
    return new Minimatch(pattern2, options).match(p);
  };
  exports2.minimatch = minimatch2;
  const starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
  const starDotExtTest = (ext2) => (f) => !f.startsWith(".") && f.endsWith(ext2);
  const starDotExtTestDot = (ext2) => (f) => f.endsWith(ext2);
  const starDotExtTestNocase = (ext2) => {
    ext2 = ext2.toLowerCase();
    return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext2);
  };
  const starDotExtTestNocaseDot = (ext2) => {
    ext2 = ext2.toLowerCase();
    return (f) => f.toLowerCase().endsWith(ext2);
  };
  const starDotStarRE = /^\*+\.\*+$/;
  const starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
  const starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
  const dotStarRE = /^\.\*+$/;
  const dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
  const starRE = /^\*+$/;
  const starTest = (f) => f.length !== 0 && !f.startsWith(".");
  const starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
  const qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
  const qmarksTestNocase = ([$0, ext2 = ""]) => {
    const noext = qmarksTestNoExt([$0]);
    if (!ext2)
      return noext;
    ext2 = ext2.toLowerCase();
    return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
  };
  const qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
    const noext = qmarksTestNoExtDot([$0]);
    if (!ext2)
      return noext;
    ext2 = ext2.toLowerCase();
    return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
  };
  const qmarksTestDot = ([$0, ext2 = ""]) => {
    const noext = qmarksTestNoExtDot([$0]);
    return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
  };
  const qmarksTest = ([$0, ext2 = ""]) => {
    const noext = qmarksTestNoExt([$0]);
    return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
  };
  const qmarksTestNoExt = ([$0]) => {
    const len = $0.length;
    return (f) => f.length === len && !f.startsWith(".");
  };
  const qmarksTestNoExtDot = ([$0]) => {
    const len = $0.length;
    return (f) => f.length === len && f !== "." && f !== "..";
  };
  const defaultPlatform2 = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
  const path2 = {
    win32: { sep: "\\" },
    posix: { sep: "/" }
  };
  exports2.sep = defaultPlatform2 === "win32" ? path2.win32.sep : path2.posix.sep;
  exports2.minimatch.sep = exports2.sep;
  exports2.GLOBSTAR = Symbol("globstar **");
  exports2.minimatch.GLOBSTAR = exports2.GLOBSTAR;
  const qmark2 = "[^/]";
  const star2 = qmark2 + "*?";
  const twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
  const twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
  const filter = (pattern2, options = {}) => (p) => (0, exports2.minimatch)(p, pattern2, options);
  exports2.filter = filter;
  exports2.minimatch.filter = exports2.filter;
  const ext = (a, b = {}) => Object.assign({}, a, b);
  const defaults = (def) => {
    if (!def || typeof def !== "object" || !Object.keys(def).length) {
      return exports2.minimatch;
    }
    const orig = exports2.minimatch;
    const m = (p, pattern2, options = {}) => orig(p, pattern2, ext(def, options));
    return Object.assign(m, {
      Minimatch: class Minimatch extends orig.Minimatch {
        constructor(pattern2, options = {}) {
          super(pattern2, ext(def, options));
        }
        static defaults(options) {
          return orig.defaults(ext(def, options)).Minimatch;
        }
      },
      AST: class AST extends orig.AST {
        /* c8 ignore start */
        constructor(type, parent, options = {}) {
          super(type, parent, ext(def, options));
        }
        /* c8 ignore stop */
        static fromGlob(pattern2, options = {}) {
          return orig.AST.fromGlob(pattern2, ext(def, options));
        }
      },
      unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
      escape: (s, options = {}) => orig.escape(s, ext(def, options)),
      filter: (pattern2, options = {}) => orig.filter(pattern2, ext(def, options)),
      defaults: (options) => orig.defaults(ext(def, options)),
      makeRe: (pattern2, options = {}) => orig.makeRe(pattern2, ext(def, options)),
      braceExpand: (pattern2, options = {}) => orig.braceExpand(pattern2, ext(def, options)),
      match: (list, pattern2, options = {}) => orig.match(list, pattern2, ext(def, options)),
      sep: orig.sep,
      GLOBSTAR: exports2.GLOBSTAR
    });
  };
  exports2.defaults = defaults;
  exports2.minimatch.defaults = exports2.defaults;
  const braceExpand = (pattern2, options = {}) => {
    (0, assert_valid_pattern_js_1.assertValidPattern)(pattern2);
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern2)) {
      return [pattern2];
    }
    return (0, brace_expansion_1.default)(pattern2);
  };
  exports2.braceExpand = braceExpand;
  exports2.minimatch.braceExpand = exports2.braceExpand;
  const makeRe = (pattern2, options = {}) => new Minimatch(pattern2, options).makeRe();
  exports2.makeRe = makeRe;
  exports2.minimatch.makeRe = exports2.makeRe;
  const match = (list, pattern2, options = {}) => {
    const mm = new Minimatch(pattern2, options);
    list = list.filter((f) => mm.match(f));
    if (mm.options.nonull && !list.length) {
      list.push(pattern2);
    }
    return list;
  };
  exports2.match = match;
  exports2.minimatch.match = exports2.match;
  const globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
  const regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  class Minimatch {
    constructor(pattern2, options = {}) {
      __publicField(this, "options");
      __publicField(this, "set");
      __publicField(this, "pattern");
      __publicField(this, "windowsPathsNoEscape");
      __publicField(this, "nonegate");
      __publicField(this, "negate");
      __publicField(this, "comment");
      __publicField(this, "empty");
      __publicField(this, "preserveMultipleSlashes");
      __publicField(this, "partial");
      __publicField(this, "globSet");
      __publicField(this, "globParts");
      __publicField(this, "nocase");
      __publicField(this, "isWindows");
      __publicField(this, "platform");
      __publicField(this, "windowsNoMagicRoot");
      __publicField(this, "regexp");
      (0, assert_valid_pattern_js_1.assertValidPattern)(pattern2);
      options = options || {};
      this.options = options;
      this.pattern = pattern2;
      this.platform = options.platform || defaultPlatform2;
      this.isWindows = this.platform === "win32";
      this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
      if (this.windowsPathsNoEscape) {
        this.pattern = this.pattern.replace(/\\/g, "/");
      }
      this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
      this.regexp = null;
      this.negate = false;
      this.nonegate = !!options.nonegate;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.nocase = !!this.options.nocase;
      this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
      this.globSet = [];
      this.globParts = [];
      this.set = [];
      this.make();
    }
    hasMagic() {
      if (this.options.magicalBraces && this.set.length > 1) {
        return true;
      }
      for (const pattern2 of this.set) {
        for (const part of pattern2) {
          if (typeof part !== "string")
            return true;
        }
      }
      return false;
    }
    debug(..._) {
    }
    make() {
      const pattern2 = this.pattern;
      const options = this.options;
      if (!options.nocomment && pattern2.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern2) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      this.globSet = [...new Set(this.braceExpand())];
      if (options.debug) {
        this.debug = (...args) => console.error(...args);
      }
      this.debug(this.pattern, this.globSet);
      const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
      this.globParts = this.preprocess(rawGlobParts);
      this.debug(this.pattern, this.globParts);
      let set = this.globParts.map((s, _, __) => {
        if (this.isWindows && this.windowsNoMagicRoot) {
          const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
          const isDrive = /^[a-z]:/i.test(s[0]);
          if (isUNC) {
            return [...s.slice(0, 4), ...s.slice(4).map((ss) => this.parse(ss))];
          } else if (isDrive) {
            return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
          }
        }
        return s.map((ss) => this.parse(ss));
      });
      this.debug(this.pattern, set);
      this.set = set.filter((s) => s.indexOf(false) === -1);
      if (this.isWindows) {
        for (let i = 0; i < this.set.length; i++) {
          const p = this.set[i];
          if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
            p[2] = "?";
          }
        }
      }
      this.debug(this.pattern, this.set);
    }
    // various transforms to equivalent pattern sets that are
    // faster to process in a filesystem walk.  The goal is to
    // eliminate what we can, and push all ** patterns as far
    // to the right as possible, even if it increases the number
    // of patterns that we have to process.
    preprocess(globParts) {
      if (this.options.noglobstar) {
        for (let i = 0; i < globParts.length; i++) {
          for (let j = 0; j < globParts[i].length; j++) {
            if (globParts[i][j] === "**") {
              globParts[i][j] = "*";
            }
          }
        }
      }
      const { optimizationLevel = 1 } = this.options;
      if (optimizationLevel >= 2) {
        globParts = this.firstPhasePreProcess(globParts);
        globParts = this.secondPhasePreProcess(globParts);
      } else if (optimizationLevel >= 1) {
        globParts = this.levelOneOptimize(globParts);
      } else {
        globParts = this.adjascentGlobstarOptimize(globParts);
      }
      return globParts;
    }
    // just get rid of adjascent ** portions
    adjascentGlobstarOptimize(globParts) {
      return globParts.map((parts) => {
        let gs = -1;
        while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
          let i = gs;
          while (parts[i + 1] === "**") {
            i++;
          }
          if (i !== gs) {
            parts.splice(gs, i - gs);
          }
        }
        return parts;
      });
    }
    // get rid of adjascent ** and resolve .. portions
    levelOneOptimize(globParts) {
      return globParts.map((parts) => {
        parts = parts.reduce((set, part) => {
          const prev = set[set.length - 1];
          if (part === "**" && prev === "**") {
            return set;
          }
          if (part === "..") {
            if (prev && prev !== ".." && prev !== "." && prev !== "**") {
              set.pop();
              return set;
            }
          }
          set.push(part);
          return set;
        }, []);
        return parts.length === 0 ? [""] : parts;
      });
    }
    levelTwoFileOptimize(parts) {
      if (!Array.isArray(parts)) {
        parts = this.slashSplit(parts);
      }
      let didSomething = false;
      do {
        didSomething = false;
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < parts.length - 1; i++) {
            const p = parts[i];
            if (i === 1 && p === "" && parts[0] === "")
              continue;
            if (p === "." || p === "") {
              didSomething = true;
              parts.splice(i, 1);
              i--;
            }
          }
          if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
            didSomething = true;
            parts.pop();
          }
        }
        let dd = 0;
        while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
          const p = parts[dd - 1];
          if (p && p !== "." && p !== ".." && p !== "**") {
            didSomething = true;
            parts.splice(dd - 1, 2);
            dd -= 2;
          }
        }
      } while (didSomething);
      return parts.length === 0 ? [""] : parts;
    }
    // First phase: single-pattern processing
    // <pre> is 1 or more portions
    // <rest> is 1 or more portions
    // <p> is any portion other than ., .., '', or **
    // <e> is . or ''
    //
    // **/.. is *brutal* for filesystem walking performance, because
    // it effectively resets the recursive walk each time it occurs,
    // and ** cannot be reduced out by a .. pattern part like a regexp
    // or most strings (other than .., ., and '') can be.
    //
    // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
    // <pre>/<e>/<rest> -> <pre>/<rest>
    // <pre>/<p>/../<rest> -> <pre>/<rest>
    // **/**/<rest> -> **/<rest>
    //
    // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
    // this WOULD be allowed if ** did follow symlinks, or * didn't
    firstPhasePreProcess(globParts) {
      let didSomething = false;
      do {
        didSomething = false;
        for (let parts of globParts) {
          let gs = -1;
          while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
            let gss = gs;
            while (parts[gss + 1] === "**") {
              gss++;
            }
            if (gss > gs) {
              parts.splice(gs + 1, gss - gs);
            }
            let next = parts[gs + 1];
            const p = parts[gs + 2];
            const p2 = parts[gs + 3];
            if (next !== "..")
              continue;
            if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
              continue;
            }
            didSomething = true;
            parts.splice(gs, 1);
            const other = parts.slice(0);
            other[gs] = "**";
            globParts.push(other);
            gs--;
          }
          if (!this.preserveMultipleSlashes) {
            for (let i = 1; i < parts.length - 1; i++) {
              const p = parts[i];
              if (i === 1 && p === "" && parts[0] === "")
                continue;
              if (p === "." || p === "") {
                didSomething = true;
                parts.splice(i, 1);
                i--;
              }
            }
            if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
              didSomething = true;
              parts.pop();
            }
          }
          let dd = 0;
          while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
            const p = parts[dd - 1];
            if (p && p !== "." && p !== ".." && p !== "**") {
              didSomething = true;
              const needDot = dd === 1 && parts[dd + 1] === "**";
              const splin = needDot ? ["."] : [];
              parts.splice(dd - 1, 2, ...splin);
              if (parts.length === 0)
                parts.push("");
              dd -= 2;
            }
          }
        }
      } while (didSomething);
      return globParts;
    }
    // second phase: multi-pattern dedupes
    // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
    // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
    // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
    //
    // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
    // ^-- not valid because ** doens't follow symlinks
    secondPhasePreProcess(globParts) {
      for (let i = 0; i < globParts.length - 1; i++) {
        for (let j = i + 1; j < globParts.length; j++) {
          const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
          if (matched) {
            globParts[i] = [];
            globParts[j] = matched;
            break;
          }
        }
      }
      return globParts.filter((gs) => gs.length);
    }
    partsMatch(a, b, emptyGSMatch = false) {
      let ai = 0;
      let bi = 0;
      let result = [];
      let which = "";
      while (ai < a.length && bi < b.length) {
        if (a[ai] === b[bi]) {
          result.push(which === "b" ? b[bi] : a[ai]);
          ai++;
          bi++;
        } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
          result.push(a[ai]);
          ai++;
        } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
          result.push(b[bi]);
          bi++;
        } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
          if (which === "b")
            return false;
          which = "a";
          result.push(a[ai]);
          ai++;
          bi++;
        } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
          if (which === "a")
            return false;
          which = "b";
          result.push(b[bi]);
          ai++;
          bi++;
        } else {
          return false;
        }
      }
      return a.length === b.length && result;
    }
    parseNegate() {
      if (this.nonegate)
        return;
      const pattern2 = this.pattern;
      let negate = false;
      let negateOffset = 0;
      for (let i = 0; i < pattern2.length && pattern2.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern2.slice(negateOffset);
      this.negate = negate;
    }
    // set partial to true to test if, for example,
    // "/a/b" matches the start of "/*/b/*/d"
    // Partial means, if you run out of file before you run
    // out of pattern, then that's fine, as long as all
    // the parts match.
    matchOne(file, pattern2, partial = false) {
      const options = this.options;
      if (this.isWindows) {
        const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
        const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
        const patternDrive = typeof pattern2[0] === "string" && /^[a-z]:$/i.test(pattern2[0]);
        const patternUNC = !patternDrive && pattern2[0] === "" && pattern2[1] === "" && pattern2[2] === "?" && typeof pattern2[3] === "string" && /^[a-z]:$/i.test(pattern2[3]);
        const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
        const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
        if (typeof fdi === "number" && typeof pdi === "number") {
          const [fd, pd] = [file[fdi], pattern2[pdi]];
          if (fd.toLowerCase() === pd.toLowerCase()) {
            pattern2[pdi] = fd;
            if (pdi > fdi) {
              pattern2 = pattern2.slice(pdi);
            } else if (fdi > pdi) {
              file = file.slice(fdi);
            }
          }
        }
      }
      const { optimizationLevel = 1 } = this.options;
      if (optimizationLevel >= 2) {
        file = this.levelTwoFileOptimize(file);
      }
      this.debug("matchOne", this, { file, pattern: pattern2 });
      this.debug("matchOne", file.length, pattern2.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern2.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern2[pi];
        var f = file[fi];
        this.debug(pattern2, p, f);
        if (p === false) {
          return false;
        }
        if (p === exports2.GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern2, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern2, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern2.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern2, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern2, pr);
            if (fr === fl) {
              return true;
            }
          }
          return false;
        }
        let hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = p.test(f);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      } else {
        throw new Error("wtf?");
      }
    }
    braceExpand() {
      return (0, exports2.braceExpand)(this.pattern, this.options);
    }
    parse(pattern2) {
      (0, assert_valid_pattern_js_1.assertValidPattern)(pattern2);
      const options = this.options;
      if (pattern2 === "**")
        return exports2.GLOBSTAR;
      if (pattern2 === "")
        return "";
      let m;
      let fastTest = null;
      if (m = pattern2.match(starRE)) {
        fastTest = options.dot ? starTestDot : starTest;
      } else if (m = pattern2.match(starDotExtRE)) {
        fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
      } else if (m = pattern2.match(qmarksRE)) {
        fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
      } else if (m = pattern2.match(starDotStarRE)) {
        fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
      } else if (m = pattern2.match(dotStarRE)) {
        fastTest = dotStarTest;
      }
      const re = ast_js_1.AST.fromGlob(pattern2, this.options).toMMPattern();
      if (fastTest && typeof re === "object") {
        Reflect.defineProperty(re, "test", { value: fastTest });
      }
      return re;
    }
    makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      const set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      const options = this.options;
      const twoStar = options.noglobstar ? star2 : options.dot ? twoStarDot : twoStarNoDot;
      const flags = new Set(options.nocase ? ["i"] : []);
      let re = set.map((pattern2) => {
        const pp = pattern2.map((p) => {
          if (p instanceof RegExp) {
            for (const f of p.flags.split(""))
              flags.add(f);
          }
          return typeof p === "string" ? regExpEscape2(p) : p === exports2.GLOBSTAR ? exports2.GLOBSTAR : p._src;
        });
        pp.forEach((p, i) => {
          const next = pp[i + 1];
          const prev = pp[i - 1];
          if (p !== exports2.GLOBSTAR || prev === exports2.GLOBSTAR) {
            return;
          }
          if (prev === void 0) {
            if (next !== void 0 && next !== exports2.GLOBSTAR) {
              pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
            } else {
              pp[i] = twoStar;
            }
          } else if (next === void 0) {
            pp[i - 1] = prev + "(?:\\/|" + twoStar + ")?";
          } else if (next !== exports2.GLOBSTAR) {
            pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
            pp[i + 1] = exports2.GLOBSTAR;
          }
        });
        return pp.filter((p) => p !== exports2.GLOBSTAR).join("/");
      }).join("|");
      const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
      re = "^" + open + re + close + "$";
      if (this.negate)
        re = "^(?!" + re + ").+$";
      try {
        this.regexp = new RegExp(re, [...flags].join(""));
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    slashSplit(p) {
      if (this.preserveMultipleSlashes) {
        return p.split("/");
      } else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
        return ["", ...p.split(/\/+/)];
      } else {
        return p.split(/\/+/);
      }
    }
    match(f, partial = this.partial) {
      this.debug("match", f, this.pattern);
      if (this.comment) {
        return false;
      }
      if (this.empty) {
        return f === "";
      }
      if (f === "/" && partial) {
        return true;
      }
      const options = this.options;
      if (this.isWindows) {
        f = f.split("\\").join("/");
      }
      const ff = this.slashSplit(f);
      this.debug(this.pattern, "split", ff);
      const set = this.set;
      this.debug(this.pattern, "set", set);
      let filename = ff[ff.length - 1];
      if (!filename) {
        for (let i = ff.length - 2; !filename && i >= 0; i--) {
          filename = ff[i];
        }
      }
      for (let i = 0; i < set.length; i++) {
        const pattern2 = set[i];
        let file = ff;
        if (options.matchBase && pattern2.length === 1) {
          file = [filename];
        }
        const hit = this.matchOne(file, pattern2, partial);
        if (hit) {
          if (options.flipNegate) {
            return true;
          }
          return !this.negate;
        }
      }
      if (options.flipNegate) {
        return false;
      }
      return this.negate;
    }
    static defaults(def) {
      return exports2.minimatch.defaults(def).Minimatch;
    }
  }
  exports2.Minimatch = Minimatch;
  var ast_js_2 = ast;
  Object.defineProperty(exports2, "AST", { enumerable: true, get: function() {
    return ast_js_2.AST;
  } });
  var escape_js_2 = _escape;
  Object.defineProperty(exports2, "escape", { enumerable: true, get: function() {
    return escape_js_2.escape;
  } });
  var unescape_js_2 = _unescape;
  Object.defineProperty(exports2, "unescape", { enumerable: true, get: function() {
    return unescape_js_2.unescape;
  } });
  exports2.minimatch.AST = ast_js_1.AST;
  exports2.minimatch.Minimatch = Minimatch;
  exports2.minimatch.escape = escape_js_1.escape;
  exports2.minimatch.unescape = unescape_js_12.unescape;
})(commonjs$4);
const INDENT = Symbol.for("indent");
const NEWLINE = Symbol.for("newline");
const DEFAULT_NEWLINE = "\n";
const DEFAULT_INDENT = "  ";
const BOM = /^\uFEFF/;
const FORMAT = /^\s*[{[]((?:\r?\n)+)([\s\t]*)/;
const EMPTY = /^(?:\{\}|\[\])((?:\r?\n)+)?$/;
const UNEXPECTED_TOKEN = /^Unexpected token '?(.)'?(,)? /i;
const hexify = (char) => {
  const h = char.charCodeAt(0).toString(16).toUpperCase();
  return `0x${h.length % 2 ? "0" : ""}${h}`;
};
const stripBOM = (txt) => String(txt).replace(BOM, "");
const makeParsedError = (msg, parsing, position = 0) => ({
  message: `${msg} while parsing ${parsing}`,
  position
});
const parseError = (e, txt, context = 20) => {
  let msg = e.message;
  if (!txt) {
    return makeParsedError(msg, "empty string");
  }
  const badTokenMatch = msg.match(UNEXPECTED_TOKEN);
  const badIndexMatch = msg.match(/ position\s+(\d+)/i);
  if (badTokenMatch) {
    msg = msg.replace(
      UNEXPECTED_TOKEN,
      `Unexpected token ${JSON.stringify(badTokenMatch[1])} (${hexify(badTokenMatch[1])})$2 `
    );
  }
  let errIdx;
  if (badIndexMatch) {
    errIdx = +badIndexMatch[1];
  } else if (msg.match(/^Unexpected end of JSON.*/i)) {
    errIdx = txt.length - 1;
  }
  if (errIdx == null) {
    return makeParsedError(msg, `'${txt.slice(0, context * 2)}'`);
  }
  const start = errIdx <= context ? 0 : errIdx - context;
  const end = errIdx + context >= txt.length ? txt.length : errIdx + context;
  const slice = `${start ? "..." : ""}${txt.slice(start, end)}${end === txt.length ? "" : "..."}`;
  return makeParsedError(
    msg,
    `${txt === slice ? "" : "near "}${JSON.stringify(slice)}`,
    errIdx
  );
};
class JSONParseError extends SyntaxError {
  constructor(er, txt, context, caller) {
    const metadata = parseError(er, txt, context);
    super(metadata.message);
    Object.assign(this, metadata);
    this.code = "EJSONPARSE";
    this.systemError = er;
    Error.captureStackTrace(this, caller || this.constructor);
  }
  get name() {
    return this.constructor.name;
  }
  set name(n) {
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
const parseJson = (txt, reviver) => {
  const result = JSON.parse(txt, reviver);
  if (result && typeof result === "object") {
    const match = txt.match(EMPTY) || txt.match(FORMAT) || [null, "", ""];
    result[NEWLINE] = match[1] ?? DEFAULT_NEWLINE;
    result[INDENT] = match[2] ?? DEFAULT_INDENT;
  }
  return result;
};
const parseJsonError = (raw, reviver, context) => {
  const txt = stripBOM(raw);
  try {
    return parseJson(txt, reviver);
  } catch (e) {
    if (typeof raw !== "string" && !Buffer.isBuffer(raw)) {
      const msg = Array.isArray(raw) && raw.length === 0 ? "an empty array" : String(raw);
      throw Object.assign(
        new TypeError(`Cannot parse ${msg}`),
        { code: "EJSONPARSE", systemError: e }
      );
    }
    throw new JSONParseError(e, txt, context, parseJsonError);
  }
};
var lib$3 = parseJsonError;
parseJsonError.JSONParseError = JSONParseError;
parseJsonError.noExceptions = (raw, reviver) => {
  try {
    return parseJson(stripBOM(raw), reviver);
  } catch {
  }
};
const { join: join$1, basename } = require$$0;
const normalize$2 = (pkg) => !pkg.bin ? removeBin(pkg) : typeof pkg.bin === "string" ? normalizeString(pkg) : Array.isArray(pkg.bin) ? normalizeArray(pkg) : typeof pkg.bin === "object" ? normalizeObject(pkg) : removeBin(pkg);
const normalizeString = (pkg) => {
  if (!pkg.name) {
    return removeBin(pkg);
  }
  pkg.bin = { [pkg.name]: pkg.bin };
  return normalizeObject(pkg);
};
const normalizeArray = (pkg) => {
  pkg.bin = pkg.bin.reduce((acc, k) => {
    acc[basename(k)] = k;
    return acc;
  }, {});
  return normalizeObject(pkg);
};
const removeBin = (pkg) => {
  delete pkg.bin;
  return pkg;
};
const normalizeObject = (pkg) => {
  const orig = pkg.bin;
  const clean = {};
  let hasBins = false;
  Object.keys(orig).forEach((binKey) => {
    const base = join$1("/", basename(binKey.replace(/\\|:/g, "/"))).slice(1);
    if (typeof orig[binKey] !== "string" || !base) {
      return;
    }
    const binTarget = join$1("/", orig[binKey].replace(/\\/g, "/")).replace(/\\/g, "/").slice(1);
    if (!binTarget) {
      return;
    }
    clean[base] = binTarget;
    hasBins = true;
  });
  if (hasBins) {
    pkg.bin = clean;
  } else {
    delete pkg.bin;
  }
  return pkg;
};
var lib$2 = normalize$2;
const { readFile, lstat, readdir } = require$$0$1;
const parse = lib$3;
const normalizePackageBin = lib$2;
const { resolve, dirname, join, relative } = require$$0;
const rpj$1 = (path2) => readFile(path2, "utf8").then((data) => readBinDir(path2, normalize$1(stripUnderscores(parse(data))))).catch((er) => {
  er.path = path2;
  throw er;
});
const readBinDir = async (path2, data) => {
  if (data.bin) {
    return data;
  }
  const m = data.directories && data.directories.bin;
  if (!m || typeof m !== "string") {
    return data;
  }
  const root = dirname(path2);
  const dir = join(".", join("/", m));
  data.bin = await walkBinDir(root, dir, {});
  return data;
};
const walkBinDir = async (root, dir, obj) => {
  const entries = await readdir(resolve(root, dir)).catch(() => []);
  for (const entry of entries) {
    if (entry.charAt(0) === ".") {
      continue;
    }
    const f = resolve(root, dir, entry);
    const st = await lstat(f).catch(() => null);
    if (!st) {
      continue;
    } else if (st.isFile()) {
      obj[entry] = relative(root, f);
    } else if (st.isDirectory()) {
      await walkBinDir(root, join(dir, entry), obj);
    }
  }
  return obj;
};
const stripUnderscores = (data) => {
  for (const key of Object.keys(data).filter((k) => /^_/.test(k))) {
    delete data[key];
  }
  return data;
};
const normalize$1 = (data) => {
  addId(data);
  fixBundled(data);
  pruneRepeatedOptionals(data);
  fixScripts(data);
  fixFunding(data);
  normalizePackageBin(data);
  return data;
};
rpj$1.normalize = normalize$1;
const addId = (data) => {
  if (data.name && data.version) {
    data._id = `${data.name}@${data.version}`;
  }
  return data;
};
const pruneRepeatedOptionals = (data) => {
  const od = data.optionalDependencies;
  const dd = data.dependencies || {};
  if (od && typeof od === "object") {
    for (const name of Object.keys(od)) {
      delete dd[name];
    }
  }
  if (Object.keys(dd).length === 0) {
    delete data.dependencies;
  }
  return data;
};
const fixBundled = (data) => {
  const bdd = data.bundledDependencies;
  const bd = data.bundleDependencies === void 0 ? bdd : data.bundleDependencies;
  if (bd === false) {
    data.bundleDependencies = [];
  } else if (bd === true) {
    data.bundleDependencies = Object.keys(data.dependencies || {});
  } else if (bd && typeof bd === "object") {
    if (!Array.isArray(bd)) {
      data.bundleDependencies = Object.keys(bd);
    } else {
      data.bundleDependencies = bd;
    }
  } else {
    delete data.bundleDependencies;
  }
  delete data.bundledDependencies;
  return data;
};
const fixScripts = (data) => {
  if (!data.scripts || typeof data.scripts !== "object") {
    delete data.scripts;
    return data;
  }
  for (const [name, script] of Object.entries(data.scripts)) {
    if (typeof script !== "string") {
      delete data.scripts[name];
    }
  }
  return data;
};
const fixFunding = (data) => {
  if (data.funding && typeof data.funding === "string") {
    data.funding = { url: data.funding };
  }
  return data;
};
var lib$1 = rpj$1;
var commonjs$3 = {};
var glob$1 = {};
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var commonjs$2 = {};
var commonjs$1 = {};
Object.defineProperty(commonjs$1, "__esModule", { value: true });
commonjs$1.LRUCache = void 0;
const perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
const warned = /* @__PURE__ */ new Set();
const PROCESS = typeof process === "object" && !!process ? process : {};
const emitWarning = (msg, type, code, fn) => {
  typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
};
let AC = globalThis.AbortController;
let AS = globalThis.AbortSignal;
if (typeof AC === "undefined") {
  AS = class AbortSignal {
    constructor() {
      __publicField(this, "onabort");
      __publicField(this, "_onabort", []);
      __publicField(this, "reason");
      __publicField(this, "aborted", false);
    }
    addEventListener(_, fn) {
      this._onabort.push(fn);
    }
  };
  AC = class AbortController {
    constructor() {
      __publicField(this, "signal", new AS());
      warnACPolyfill();
    }
    abort(reason) {
      var _a2, _b2;
      if (this.signal.aborted)
        return;
      this.signal.reason = reason;
      this.signal.aborted = true;
      for (const fn of this.signal._onabort) {
        fn(reason);
      }
      (_b2 = (_a2 = this.signal).onabort) == null ? void 0 : _b2.call(_a2, reason);
    }
  };
  let printACPolyfillWarning = ((_a = PROCESS.env) == null ? void 0 : _a.LRU_CACHE_IGNORE_AC_WARNING) !== "1";
  const warnACPolyfill = () => {
    if (!printACPolyfillWarning)
      return;
    printACPolyfillWarning = false;
    emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
  };
}
const shouldWarn = (code) => !warned.has(code);
const isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
const getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
class ZeroArray extends Array {
  constructor(size) {
    super(size);
    this.fill(0);
  }
}
const _Stack = class _Stack {
  constructor(max, HeapCls) {
    __publicField(this, "heap");
    __publicField(this, "length");
    if (!__privateGet(_Stack, _constructing)) {
      throw new TypeError("instantiate Stack using Stack.create(n)");
    }
    this.heap = new HeapCls(max);
    this.length = 0;
  }
  static create(max) {
    const HeapCls = getUintArray(max);
    if (!HeapCls)
      return [];
    __privateSet(_Stack, _constructing, true);
    const s = new _Stack(max, HeapCls);
    __privateSet(_Stack, _constructing, false);
    return s;
  }
  push(n) {
    this.heap[this.length++] = n;
  }
  pop() {
    return this.heap[--this.length];
  }
};
_constructing = new WeakMap();
// private constructor
__privateAdd(_Stack, _constructing, false);
let Stack = _Stack;
const _LRUCache = class _LRUCache {
  constructor(options) {
    __privateAdd(this, _LRUCache_instances);
    // options that cannot be changed without disaster
    __privateAdd(this, _max);
    __privateAdd(this, _maxSize);
    __privateAdd(this, _dispose);
    __privateAdd(this, _disposeAfter);
    __privateAdd(this, _fetchMethod);
    __privateAdd(this, _memoMethod);
    /**
     * {@link LRUCache.OptionsBase.ttl}
     */
    __publicField(this, "ttl");
    /**
     * {@link LRUCache.OptionsBase.ttlResolution}
     */
    __publicField(this, "ttlResolution");
    /**
     * {@link LRUCache.OptionsBase.ttlAutopurge}
     */
    __publicField(this, "ttlAutopurge");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnGet}
     */
    __publicField(this, "updateAgeOnGet");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnHas}
     */
    __publicField(this, "updateAgeOnHas");
    /**
     * {@link LRUCache.OptionsBase.allowStale}
     */
    __publicField(this, "allowStale");
    /**
     * {@link LRUCache.OptionsBase.noDisposeOnSet}
     */
    __publicField(this, "noDisposeOnSet");
    /**
     * {@link LRUCache.OptionsBase.noUpdateTTL}
     */
    __publicField(this, "noUpdateTTL");
    /**
     * {@link LRUCache.OptionsBase.maxEntrySize}
     */
    __publicField(this, "maxEntrySize");
    /**
     * {@link LRUCache.OptionsBase.sizeCalculation}
     */
    __publicField(this, "sizeCalculation");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
     */
    __publicField(this, "noDeleteOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
     */
    __publicField(this, "noDeleteOnStaleGet");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
     */
    __publicField(this, "allowStaleOnFetchAbort");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
     */
    __publicField(this, "allowStaleOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.ignoreFetchAbort}
     */
    __publicField(this, "ignoreFetchAbort");
    // computed properties
    __privateAdd(this, _size);
    __privateAdd(this, _calculatedSize);
    __privateAdd(this, _keyMap);
    __privateAdd(this, _keyList);
    __privateAdd(this, _valList);
    __privateAdd(this, _next);
    __privateAdd(this, _prev);
    __privateAdd(this, _head);
    __privateAdd(this, _tail);
    __privateAdd(this, _free);
    __privateAdd(this, _disposed);
    __privateAdd(this, _sizes);
    __privateAdd(this, _starts);
    __privateAdd(this, _ttls);
    __privateAdd(this, _hasDispose);
    __privateAdd(this, _hasFetchMethod);
    __privateAdd(this, _hasDisposeAfter);
    // conditionally set private methods related to TTL
    __privateAdd(this, _updateItemAge, () => {
    });
    __privateAdd(this, _statusTTL, () => {
    });
    __privateAdd(this, _setItemTTL, () => {
    });
    /* c8 ignore stop */
    __privateAdd(this, _isStale, () => false);
    __privateAdd(this, _removeItemSize, (_i) => {
    });
    __privateAdd(this, _addItemSize, (_i, _s, _st) => {
    });
    __privateAdd(this, _requireSize, (_k, _v, size, sizeCalculation) => {
      if (size || sizeCalculation) {
        throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      }
      return 0;
    });
    /**
     * A String value that is used in the creation of the default string
     * description of an object. Called by the built-in method
     * `Object.prototype.toString`.
     */
    __publicField(this, _b, "LRUCache");
    const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) {
      throw new Error("invalid max value: " + max);
    }
    __privateSet(this, _max, max);
    __privateSet(this, _maxSize, maxSize);
    this.maxEntrySize = maxEntrySize || __privateGet(this, _maxSize);
    this.sizeCalculation = sizeCalculation;
    if (this.sizeCalculation) {
      if (!__privateGet(this, _maxSize) && !this.maxEntrySize) {
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      }
      if (typeof this.sizeCalculation !== "function") {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    if (memoMethod !== void 0 && typeof memoMethod !== "function") {
      throw new TypeError("memoMethod must be a function if defined");
    }
    __privateSet(this, _memoMethod, memoMethod);
    if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
      throw new TypeError("fetchMethod must be a function if specified");
    }
    __privateSet(this, _fetchMethod, fetchMethod);
    __privateSet(this, _hasFetchMethod, !!fetchMethod);
    __privateSet(this, _keyMap, /* @__PURE__ */ new Map());
    __privateSet(this, _keyList, new Array(max).fill(void 0));
    __privateSet(this, _valList, new Array(max).fill(void 0));
    __privateSet(this, _next, new UintArray(max));
    __privateSet(this, _prev, new UintArray(max));
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateSet(this, _free, Stack.create(max));
    __privateSet(this, _size, 0);
    __privateSet(this, _calculatedSize, 0);
    if (typeof dispose === "function") {
      __privateSet(this, _dispose, dispose);
    }
    if (typeof disposeAfter === "function") {
      __privateSet(this, _disposeAfter, disposeAfter);
      __privateSet(this, _disposed, []);
    } else {
      __privateSet(this, _disposeAfter, void 0);
      __privateSet(this, _disposed, void 0);
    }
    __privateSet(this, _hasDispose, !!__privateGet(this, _dispose));
    __privateSet(this, _hasDisposeAfter, !!__privateGet(this, _disposeAfter));
    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
    this.ignoreFetchAbort = !!ignoreFetchAbort;
    if (this.maxEntrySize !== 0) {
      if (__privateGet(this, _maxSize) !== 0) {
        if (!isPosInt(__privateGet(this, _maxSize))) {
          throw new TypeError("maxSize must be a positive integer if specified");
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      }
      __privateMethod(this, _LRUCache_instances, initializeSizeTracking_fn).call(this);
    }
    this.allowStale = !!allowStale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError("ttl must be a positive integer if specified");
      }
      __privateMethod(this, _LRUCache_instances, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _max) === 0 && this.ttl === 0 && __privateGet(this, _maxSize) === 0) {
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    }
    if (!this.ttlAutopurge && !__privateGet(this, _max) && !__privateGet(this, _maxSize)) {
      const code = "LRU_CACHE_UNBOUNDED";
      if (shouldWarn(code)) {
        warned.add(code);
        const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
        emitWarning(msg, "UnboundedCacheWarning", code, _LRUCache);
      }
    }
  }
  /**
   * Do not call this method unless you need to inspect the
   * inner workings of the cache.  If anything returned by this
   * object is modified in any way, strange breakage may occur.
   *
   * These fields are private for a reason!
   *
   * @internal
   */
  static unsafeExposeInternals(c) {
    return {
      // properties
      starts: __privateGet(c, _starts),
      ttls: __privateGet(c, _ttls),
      sizes: __privateGet(c, _sizes),
      keyMap: __privateGet(c, _keyMap),
      keyList: __privateGet(c, _keyList),
      valList: __privateGet(c, _valList),
      next: __privateGet(c, _next),
      prev: __privateGet(c, _prev),
      get head() {
        return __privateGet(c, _head);
      },
      get tail() {
        return __privateGet(c, _tail);
      },
      free: __privateGet(c, _free),
      // methods
      isBackgroundFetch: (p) => {
        var _a2;
        return __privateMethod(_a2 = c, _LRUCache_instances, isBackgroundFetch_fn).call(_a2, p);
      },
      backgroundFetch: (k, index, options, context) => {
        var _a2;
        return __privateMethod(_a2 = c, _LRUCache_instances, backgroundFetch_fn).call(_a2, k, index, options, context);
      },
      moveToTail: (index) => {
        var _a2;
        return __privateMethod(_a2 = c, _LRUCache_instances, moveToTail_fn).call(_a2, index);
      },
      indexes: (options) => {
        var _a2;
        return __privateMethod(_a2 = c, _LRUCache_instances, indexes_fn).call(_a2, options);
      },
      rindexes: (options) => {
        var _a2;
        return __privateMethod(_a2 = c, _LRUCache_instances, rindexes_fn).call(_a2, options);
      },
      isStale: (index) => {
        var _a2;
        return __privateGet(_a2 = c, _isStale).call(_a2, index);
      }
    };
  }
  // Protected read-only members
  /**
   * {@link LRUCache.OptionsBase.max} (read-only)
   */
  get max() {
    return __privateGet(this, _max);
  }
  /**
   * {@link LRUCache.OptionsBase.maxSize} (read-only)
   */
  get maxSize() {
    return __privateGet(this, _maxSize);
  }
  /**
   * The total computed size of items in the cache (read-only)
   */
  get calculatedSize() {
    return __privateGet(this, _calculatedSize);
  }
  /**
   * The number of items stored in the cache (read-only)
   */
  get size() {
    return __privateGet(this, _size);
  }
  /**
   * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
   */
  get fetchMethod() {
    return __privateGet(this, _fetchMethod);
  }
  get memoMethod() {
    return __privateGet(this, _memoMethod);
  }
  /**
   * {@link LRUCache.OptionsBase.dispose} (read-only)
   */
  get dispose() {
    return __privateGet(this, _dispose);
  }
  /**
   * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
   */
  get disposeAfter() {
    return __privateGet(this, _disposeAfter);
  }
  /**
   * Return the number of ms left in the item's TTL. If item is not in cache,
   * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
   */
  getRemainingTTL(key) {
    return __privateGet(this, _keyMap).has(key) ? Infinity : 0;
  }
  /**
   * Return a generator yielding `[key, value]` pairs,
   * in order from most recently used to least recently used.
   */
  *entries() {
    for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i] !== void 0 && __privateGet(this, _keyList)[i] !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield [__privateGet(this, _keyList)[i], __privateGet(this, _valList)[i]];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.entries}
   *
   * Return a generator yielding `[key, value]` pairs,
   * in order from least recently used to most recently used.
   */
  *rentries() {
    for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i] !== void 0 && __privateGet(this, _keyList)[i] !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield [__privateGet(this, _keyList)[i], __privateGet(this, _valList)[i]];
      }
    }
  }
  /**
   * Return a generator yielding the keys in the cache,
   * in order from most recently used to least recently used.
   */
  *keys() {
    for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
      const k = __privateGet(this, _keyList)[i];
      if (k !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield k;
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.keys}
   *
   * Return a generator yielding the keys in the cache,
   * in order from least recently used to most recently used.
   */
  *rkeys() {
    for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
      const k = __privateGet(this, _keyList)[i];
      if (k !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield k;
      }
    }
  }
  /**
   * Return a generator yielding the values in the cache,
   * in order from most recently used to least recently used.
   */
  *values() {
    for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      if (v !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield __privateGet(this, _valList)[i];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.values}
   *
   * Return a generator yielding the values in the cache,
   * in order from least recently used to most recently used.
   */
  *rvalues() {
    for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      if (v !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield __privateGet(this, _valList)[i];
      }
    }
  }
  /**
   * Iterating over the cache itself yields the same results as
   * {@link LRUCache.entries}
   */
  [(_c = Symbol.iterator, _b = Symbol.toStringTag, _c)]() {
    return this.entries();
  }
  /**
   * Find a value for which the supplied fn method returns a truthy value,
   * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
   */
  find(fn, getOptions = {}) {
    for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      if (fn(value, __privateGet(this, _keyList)[i], this)) {
        return this.get(__privateGet(this, _keyList)[i], getOptions);
      }
    }
  }
  /**
   * Call the supplied function on each item in the cache, in order from most
   * recently used to least recently used.
   *
   * `fn` is called as `fn(value, key, cache)`.
   *
   * If `thisp` is provided, function will be called in the `this`-context of
   * the provided object, or the cache if no `thisp` object is provided.
   *
   * Does not update age or recenty of use, or iterate over stale values.
   */
  forEach(fn, thisp = this) {
    for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i], this);
    }
  }
  /**
   * The same as {@link LRUCache.forEach} but items are iterated over in
   * reverse order.  (ie, less recently used items are iterated over first.)
   */
  rforEach(fn, thisp = this) {
    for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i], this);
    }
  }
  /**
   * Delete any stale entries. Returns true if anything was removed,
   * false otherwise.
   */
  purgeStale() {
    let deleted = false;
    for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this, { allowStale: true })) {
      if (__privateGet(this, _isStale).call(this, i)) {
        __privateMethod(this, _LRUCache_instances, delete_fn).call(this, __privateGet(this, _keyList)[i], "expire");
        deleted = true;
      }
    }
    return deleted;
  }
  /**
   * Get the extended info about a given entry, to get its value, size, and
   * TTL info simultaneously. Returns `undefined` if the key is not present.
   *
   * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
   * serialization, the `start` value is always the current timestamp, and the
   * `ttl` is a calculated remaining time to live (negative if expired).
   *
   * Always returns stale values, if their info is found in the cache, so be
   * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
   * if relevant.
   */
  info(key) {
    const i = __privateGet(this, _keyMap).get(key);
    if (i === void 0)
      return void 0;
    const v = __privateGet(this, _valList)[i];
    const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
    if (value === void 0)
      return void 0;
    const entry = { value };
    if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
      const ttl = __privateGet(this, _ttls)[i];
      const start = __privateGet(this, _starts)[i];
      if (ttl && start) {
        const remain = ttl - (perf.now() - start);
        entry.ttl = remain;
        entry.start = Date.now();
      }
    }
    if (__privateGet(this, _sizes)) {
      entry.size = __privateGet(this, _sizes)[i];
    }
    return entry;
  }
  /**
   * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
   * passed to {@link LRLUCache#load}.
   *
   * The `start` fields are calculated relative to a portable `Date.now()`
   * timestamp, even if `performance.now()` is available.
   *
   * Stale entries are always included in the `dump`, even if
   * {@link LRUCache.OptionsBase.allowStale} is false.
   *
   * Note: this returns an actual array, not a generator, so it can be more
   * easily passed around.
   */
  dump() {
    const arr = [];
    for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this, { allowStale: true })) {
      const key = __privateGet(this, _keyList)[i];
      const v = __privateGet(this, _valList)[i];
      const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0 || key === void 0)
        continue;
      const entry = { value };
      if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
        entry.ttl = __privateGet(this, _ttls)[i];
        const age = perf.now() - __privateGet(this, _starts)[i];
        entry.start = Math.floor(Date.now() - age);
      }
      if (__privateGet(this, _sizes)) {
        entry.size = __privateGet(this, _sizes)[i];
      }
      arr.unshift([key, entry]);
    }
    return arr;
  }
  /**
   * Reset the cache and load in the items in entries in the order listed.
   *
   * The shape of the resulting cache may be different if the same options are
   * not used in both caches.
   *
   * The `start` fields are assumed to be calculated relative to a portable
   * `Date.now()` timestamp, even if `performance.now()` is available.
   */
  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }
  /**
   * Add a value to the cache.
   *
   * Note: if `undefined` is specified as a value, this is an alias for
   * {@link LRUCache#delete}
   *
   * Fields on the {@link LRUCache.SetOptions} options param will override
   * their corresponding values in the constructor options for the scope
   * of this single `set()` operation.
   *
   * If `start` is provided, then that will set the effective start
   * time for the TTL calculation. Note that this must be a previous
   * value of `performance.now()` if supported, or a previous value of
   * `Date.now()` if not.
   *
   * Options object may also include `size`, which will prevent
   * calling the `sizeCalculation` function and just use the specified
   * number if it is a positive integer, and `noDisposeOnSet` which
   * will prevent calling a `dispose` function in the case of
   * overwrites.
   *
   * If the `size` (or return value of `sizeCalculation`) for a given
   * entry is greater than `maxEntrySize`, then the item will not be
   * added to the cache.
   *
   * Will update the recency of the entry.
   *
   * If the value is `undefined`, then this is an alias for
   * `cache.delete(key)`. `undefined` is never stored in the cache.
   */
  set(k, v, setOptions = {}) {
    var _a2, _b2, _c2, _d, _e;
    if (v === void 0) {
      this.delete(k);
      return this;
    }
    const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
    let { noUpdateTTL = this.noUpdateTTL } = setOptions;
    const size = __privateGet(this, _requireSize).call(this, k, v, setOptions.size || 0, sizeCalculation);
    if (this.maxEntrySize && size > this.maxEntrySize) {
      if (status) {
        status.set = "miss";
        status.maxEntrySizeExceeded = true;
      }
      __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "set");
      return this;
    }
    let index = __privateGet(this, _size) === 0 ? void 0 : __privateGet(this, _keyMap).get(k);
    if (index === void 0) {
      index = __privateGet(this, _size) === 0 ? __privateGet(this, _tail) : __privateGet(this, _free).length !== 0 ? __privateGet(this, _free).pop() : __privateGet(this, _size) === __privateGet(this, _max) ? __privateMethod(this, _LRUCache_instances, evict_fn).call(this, false) : __privateGet(this, _size);
      __privateGet(this, _keyList)[index] = k;
      __privateGet(this, _valList)[index] = v;
      __privateGet(this, _keyMap).set(k, index);
      __privateGet(this, _next)[__privateGet(this, _tail)] = index;
      __privateGet(this, _prev)[index] = __privateGet(this, _tail);
      __privateSet(this, _tail, index);
      __privateWrapper(this, _size)._++;
      __privateGet(this, _addItemSize).call(this, index, size, status);
      if (status)
        status.set = "add";
      noUpdateTTL = false;
    } else {
      __privateMethod(this, _LRUCache_instances, moveToTail_fn).call(this, index);
      const oldVal = __privateGet(this, _valList)[index];
      if (v !== oldVal) {
        if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, oldVal)) {
          oldVal.__abortController.abort(new Error("replaced"));
          const { __staleWhileFetching: s } = oldVal;
          if (s !== void 0 && !noDisposeOnSet) {
            if (__privateGet(this, _hasDispose)) {
              (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, s, k, "set");
            }
            if (__privateGet(this, _hasDisposeAfter)) {
              (_b2 = __privateGet(this, _disposed)) == null ? void 0 : _b2.push([s, k, "set"]);
            }
          }
        } else if (!noDisposeOnSet) {
          if (__privateGet(this, _hasDispose)) {
            (_c2 = __privateGet(this, _dispose)) == null ? void 0 : _c2.call(this, oldVal, k, "set");
          }
          if (__privateGet(this, _hasDisposeAfter)) {
            (_d = __privateGet(this, _disposed)) == null ? void 0 : _d.push([oldVal, k, "set"]);
          }
        }
        __privateGet(this, _removeItemSize).call(this, index);
        __privateGet(this, _addItemSize).call(this, index, size, status);
        __privateGet(this, _valList)[index] = v;
        if (status) {
          status.set = "replace";
          const oldValue = oldVal && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, oldVal) ? oldVal.__staleWhileFetching : oldVal;
          if (oldValue !== void 0)
            status.oldValue = oldValue;
        }
      } else if (status) {
        status.set = "update";
      }
    }
    if (ttl !== 0 && !__privateGet(this, _ttls)) {
      __privateMethod(this, _LRUCache_instances, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _ttls)) {
      if (!noUpdateTTL) {
        __privateGet(this, _setItemTTL).call(this, index, ttl, start);
      }
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
    }
    if (!noDisposeOnSet && __privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_e = __privateGet(this, _disposeAfter)) == null ? void 0 : _e.call(this, ...task);
      }
    }
    return this;
  }
  /**
   * Evict the least recently used item, returning its value or
   * `undefined` if cache is empty.
   */
  pop() {
    var _a2;
    try {
      while (__privateGet(this, _size)) {
        const val = __privateGet(this, _valList)[__privateGet(this, _head)];
        __privateMethod(this, _LRUCache_instances, evict_fn).call(this, true);
        if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, val)) {
          if (val.__staleWhileFetching) {
            return val.__staleWhileFetching;
          }
        } else if (val !== void 0) {
          return val;
        }
      }
    } finally {
      if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
        const dt = __privateGet(this, _disposed);
        let task;
        while (task = dt == null ? void 0 : dt.shift()) {
          (_a2 = __privateGet(this, _disposeAfter)) == null ? void 0 : _a2.call(this, ...task);
        }
      }
    }
  }
  /**
   * Check if a key is in the cache, without updating the recency of use.
   * Will return false if the item is stale, even though it is technically
   * in the cache.
   *
   * Check if a key is in the cache, without updating the recency of
   * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
   * to `true` in either the options or the constructor.
   *
   * Will return `false` if the item is stale, even though it is technically in
   * the cache. The difference can be determined (if it matters) by using a
   * `status` argument, and inspecting the `has` field.
   *
   * Will not update item age unless
   * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
   */
  has(k, hasOptions = {}) {
    const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
    const index = __privateGet(this, _keyMap).get(k);
    if (index !== void 0) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) && v.__staleWhileFetching === void 0) {
        return false;
      }
      if (!__privateGet(this, _isStale).call(this, index)) {
        if (updateAgeOnHas) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status) {
          status.has = "hit";
          __privateGet(this, _statusTTL).call(this, status, index);
        }
        return true;
      } else if (status) {
        status.has = "stale";
        __privateGet(this, _statusTTL).call(this, status, index);
      }
    } else if (status) {
      status.has = "miss";
    }
    return false;
  }
  /**
   * Like {@link LRUCache#get} but doesn't update recency or delete stale
   * items.
   *
   * Returns `undefined` if the item is stale, unless
   * {@link LRUCache.OptionsBase.allowStale} is set.
   */
  peek(k, peekOptions = {}) {
    const { allowStale = this.allowStale } = peekOptions;
    const index = __privateGet(this, _keyMap).get(k);
    if (index === void 0 || !allowStale && __privateGet(this, _isStale).call(this, index)) {
      return;
    }
    const v = __privateGet(this, _valList)[index];
    return __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
  }
  async fetch(k, fetchOptions = {}) {
    const {
      // get options
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      // set options
      ttl = this.ttl,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
      // fetch exclusive options
      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
      ignoreFetchAbort = this.ignoreFetchAbort,
      allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
      context,
      forceRefresh = false,
      status,
      signal
    } = fetchOptions;
    if (!__privateGet(this, _hasFetchMethod)) {
      if (status)
        status.fetch = "get";
      return this.get(k, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        status
      });
    }
    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
      status,
      signal
    };
    let index = __privateGet(this, _keyMap).get(k);
    if (index === void 0) {
      if (status)
        status.fetch = "miss";
      const p = __privateMethod(this, _LRUCache_instances, backgroundFetch_fn).call(this, k, index, options, context);
      return p.__returned = p;
    } else {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
        const stale = allowStale && v.__staleWhileFetching !== void 0;
        if (status) {
          status.fetch = "inflight";
          if (stale)
            status.returnedStale = true;
        }
        return stale ? v.__staleWhileFetching : v.__returned = v;
      }
      const isStale = __privateGet(this, _isStale).call(this, index);
      if (!forceRefresh && !isStale) {
        if (status)
          status.fetch = "hit";
        __privateMethod(this, _LRUCache_instances, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status)
          __privateGet(this, _statusTTL).call(this, status, index);
        return v;
      }
      const p = __privateMethod(this, _LRUCache_instances, backgroundFetch_fn).call(this, k, index, options, context);
      const hasStale = p.__staleWhileFetching !== void 0;
      const staleVal = hasStale && allowStale;
      if (status) {
        status.fetch = isStale ? "stale" : "refresh";
        if (staleVal && isStale)
          status.returnedStale = true;
      }
      return staleVal ? p.__staleWhileFetching : p.__returned = p;
    }
  }
  async forceFetch(k, fetchOptions = {}) {
    const v = await this.fetch(k, fetchOptions);
    if (v === void 0)
      throw new Error("fetch() returned undefined");
    return v;
  }
  memo(k, memoOptions = {}) {
    const memoMethod = __privateGet(this, _memoMethod);
    if (!memoMethod) {
      throw new Error("no memoMethod provided to constructor");
    }
    const { context, forceRefresh, ...options } = memoOptions;
    const v = this.get(k, options);
    if (!forceRefresh && v !== void 0)
      return v;
    const vv = memoMethod(k, v, {
      options,
      context
    });
    this.set(k, vv, options);
    return vv;
  }
  /**
   * Return a value from the cache. Will update the recency of the cache
   * entry found.
   *
   * If the key is not found, get() will return `undefined`.
   */
  get(k, getOptions = {}) {
    const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
    const index = __privateGet(this, _keyMap).get(k);
    if (index !== void 0) {
      const value = __privateGet(this, _valList)[index];
      const fetching = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, value);
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
      if (__privateGet(this, _isStale).call(this, index)) {
        if (status)
          status.get = "stale";
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "expire");
          }
          if (status && allowStale)
            status.returnedStale = true;
          return allowStale ? value : void 0;
        } else {
          if (status && allowStale && value.__staleWhileFetching !== void 0) {
            status.returnedStale = true;
          }
          return allowStale ? value.__staleWhileFetching : void 0;
        }
      } else {
        if (status)
          status.get = "hit";
        if (fetching) {
          return value.__staleWhileFetching;
        }
        __privateMethod(this, _LRUCache_instances, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        return value;
      }
    } else if (status) {
      status.get = "miss";
    }
  }
  /**
   * Deletes a key out of the cache.
   *
   * Returns true if the key was deleted, false otherwise.
   */
  delete(k) {
    return __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "delete");
  }
  /**
   * Clear the cache entirely, throwing away all values.
   */
  clear() {
    return __privateMethod(this, _LRUCache_instances, clear_fn).call(this, "delete");
  }
};
_max = new WeakMap();
_maxSize = new WeakMap();
_dispose = new WeakMap();
_disposeAfter = new WeakMap();
_fetchMethod = new WeakMap();
_memoMethod = new WeakMap();
_size = new WeakMap();
_calculatedSize = new WeakMap();
_keyMap = new WeakMap();
_keyList = new WeakMap();
_valList = new WeakMap();
_next = new WeakMap();
_prev = new WeakMap();
_head = new WeakMap();
_tail = new WeakMap();
_free = new WeakMap();
_disposed = new WeakMap();
_sizes = new WeakMap();
_starts = new WeakMap();
_ttls = new WeakMap();
_hasDispose = new WeakMap();
_hasFetchMethod = new WeakMap();
_hasDisposeAfter = new WeakMap();
_LRUCache_instances = new WeakSet();
initializeTTLTracking_fn = function() {
  const ttls = new ZeroArray(__privateGet(this, _max));
  const starts = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _ttls, ttls);
  __privateSet(this, _starts, starts);
  __privateSet(this, _setItemTTL, (index, ttl, start = perf.now()) => {
    starts[index] = ttl !== 0 ? start : 0;
    ttls[index] = ttl;
    if (ttl !== 0 && this.ttlAutopurge) {
      const t = setTimeout(() => {
        if (__privateGet(this, _isStale).call(this, index)) {
          __privateMethod(this, _LRUCache_instances, delete_fn).call(this, __privateGet(this, _keyList)[index], "expire");
        }
      }, ttl + 1);
      if (t.unref) {
        t.unref();
      }
    }
  });
  __privateSet(this, _updateItemAge, (index) => {
    starts[index] = ttls[index] !== 0 ? perf.now() : 0;
  });
  __privateSet(this, _statusTTL, (status, index) => {
    if (ttls[index]) {
      const ttl = ttls[index];
      const start = starts[index];
      if (!ttl || !start)
        return;
      status.ttl = ttl;
      status.start = start;
      status.now = cachedNow || getNow();
      const age = status.now - start;
      status.remainingTTL = ttl - age;
    }
  });
  let cachedNow = 0;
  const getNow = () => {
    const n = perf.now();
    if (this.ttlResolution > 0) {
      cachedNow = n;
      const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
      if (t.unref) {
        t.unref();
      }
    }
    return n;
  };
  this.getRemainingTTL = (key) => {
    const index = __privateGet(this, _keyMap).get(key);
    if (index === void 0) {
      return 0;
    }
    const ttl = ttls[index];
    const start = starts[index];
    if (!ttl || !start) {
      return Infinity;
    }
    const age = (cachedNow || getNow()) - start;
    return ttl - age;
  };
  __privateSet(this, _isStale, (index) => {
    const s = starts[index];
    const t = ttls[index];
    return !!t && !!s && (cachedNow || getNow()) - s > t;
  });
};
_updateItemAge = new WeakMap();
_statusTTL = new WeakMap();
_setItemTTL = new WeakMap();
_isStale = new WeakMap();
initializeSizeTracking_fn = function() {
  const sizes = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _calculatedSize, 0);
  __privateSet(this, _sizes, sizes);
  __privateSet(this, _removeItemSize, (index) => {
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) - sizes[index]);
    sizes[index] = 0;
  });
  __privateSet(this, _requireSize, (k, v, size, sizeCalculation) => {
    if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
      return 0;
    }
    if (!isPosInt(size)) {
      if (sizeCalculation) {
        if (typeof sizeCalculation !== "function") {
          throw new TypeError("sizeCalculation must be a function");
        }
        size = sizeCalculation(v, k);
        if (!isPosInt(size)) {
          throw new TypeError("sizeCalculation return invalid (expect positive integer)");
        }
      } else {
        throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      }
    }
    return size;
  });
  __privateSet(this, _addItemSize, (index, size, status) => {
    sizes[index] = size;
    if (__privateGet(this, _maxSize)) {
      const maxSize = __privateGet(this, _maxSize) - sizes[index];
      while (__privateGet(this, _calculatedSize) > maxSize) {
        __privateMethod(this, _LRUCache_instances, evict_fn).call(this, true);
      }
    }
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) + sizes[index]);
    if (status) {
      status.entrySize = size;
      status.totalCalculatedSize = __privateGet(this, _calculatedSize);
    }
  });
};
_removeItemSize = new WeakMap();
_addItemSize = new WeakMap();
_requireSize = new WeakMap();
indexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i = __privateGet(this, _tail); true; ) {
      if (!__privateMethod(this, _LRUCache_instances, isValidIndex_fn).call(this, i)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i)) {
        yield i;
      }
      if (i === __privateGet(this, _head)) {
        break;
      } else {
        i = __privateGet(this, _prev)[i];
      }
    }
  }
};
rindexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i = __privateGet(this, _head); true; ) {
      if (!__privateMethod(this, _LRUCache_instances, isValidIndex_fn).call(this, i)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i)) {
        yield i;
      }
      if (i === __privateGet(this, _tail)) {
        break;
      } else {
        i = __privateGet(this, _next)[i];
      }
    }
  }
};
isValidIndex_fn = function(index) {
  return index !== void 0 && __privateGet(this, _keyMap).get(__privateGet(this, _keyList)[index]) === index;
};
evict_fn = function(free) {
  var _a2, _b2;
  const head = __privateGet(this, _head);
  const k = __privateGet(this, _keyList)[head];
  const v = __privateGet(this, _valList)[head];
  if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
    v.__abortController.abort(new Error("evicted"));
  } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
    if (__privateGet(this, _hasDispose)) {
      (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, v, k, "evict");
    }
    if (__privateGet(this, _hasDisposeAfter)) {
      (_b2 = __privateGet(this, _disposed)) == null ? void 0 : _b2.push([v, k, "evict"]);
    }
  }
  __privateGet(this, _removeItemSize).call(this, head);
  if (free) {
    __privateGet(this, _keyList)[head] = void 0;
    __privateGet(this, _valList)[head] = void 0;
    __privateGet(this, _free).push(head);
  }
  if (__privateGet(this, _size) === 1) {
    __privateSet(this, _head, __privateSet(this, _tail, 0));
    __privateGet(this, _free).length = 0;
  } else {
    __privateSet(this, _head, __privateGet(this, _next)[head]);
  }
  __privateGet(this, _keyMap).delete(k);
  __privateWrapper(this, _size)._--;
  return head;
};
backgroundFetch_fn = function(k, index, options, context) {
  const v = index === void 0 ? void 0 : __privateGet(this, _valList)[index];
  if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
    return v;
  }
  const ac = new AC();
  const { signal } = options;
  signal == null ? void 0 : signal.addEventListener("abort", () => ac.abort(signal.reason), {
    signal: ac.signal
  });
  const fetchOpts = {
    signal: ac.signal,
    options,
    context
  };
  const cb = (v2, updateCache = false) => {
    const { aborted } = ac.signal;
    const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
    if (options.status) {
      if (aborted && !updateCache) {
        options.status.fetchAborted = true;
        options.status.fetchError = ac.signal.reason;
        if (ignoreAbort)
          options.status.fetchAbortIgnored = true;
      } else {
        options.status.fetchResolved = true;
      }
    }
    if (aborted && !ignoreAbort && !updateCache) {
      return fetchFail(ac.signal.reason);
    }
    const bf2 = p;
    if (__privateGet(this, _valList)[index] === p) {
      if (v2 === void 0) {
        if (bf2.__staleWhileFetching) {
          __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
        } else {
          __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "fetch");
        }
      } else {
        if (options.status)
          options.status.fetchUpdated = true;
        this.set(k, v2, fetchOpts.options);
      }
    }
    return v2;
  };
  const eb = (er) => {
    if (options.status) {
      options.status.fetchRejected = true;
      options.status.fetchError = er;
    }
    return fetchFail(er);
  };
  const fetchFail = (er) => {
    const { aborted } = ac.signal;
    const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
    const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
    const noDelete = allowStale || options.noDeleteOnFetchRejection;
    const bf2 = p;
    if (__privateGet(this, _valList)[index] === p) {
      const del = !noDelete || bf2.__staleWhileFetching === void 0;
      if (del) {
        __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "fetch");
      } else if (!allowStaleAborted) {
        __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
      }
    }
    if (allowStale) {
      if (options.status && bf2.__staleWhileFetching !== void 0) {
        options.status.returnedStale = true;
      }
      return bf2.__staleWhileFetching;
    } else if (bf2.__returned === bf2) {
      throw er;
    }
  };
  const pcall = (res, rej) => {
    var _a2;
    const fmp = (_a2 = __privateGet(this, _fetchMethod)) == null ? void 0 : _a2.call(this, k, v, fetchOpts);
    if (fmp && fmp instanceof Promise) {
      fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
    }
    ac.signal.addEventListener("abort", () => {
      if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
        res(void 0);
        if (options.allowStaleOnFetchAbort) {
          res = (v2) => cb(v2, true);
        }
      }
    });
  };
  if (options.status)
    options.status.fetchDispatched = true;
  const p = new Promise(pcall).then(cb, eb);
  const bf = Object.assign(p, {
    __abortController: ac,
    __staleWhileFetching: v,
    __returned: void 0
  });
  if (index === void 0) {
    this.set(k, bf, { ...fetchOpts.options, status: void 0 });
    index = __privateGet(this, _keyMap).get(k);
  } else {
    __privateGet(this, _valList)[index] = bf;
  }
  return bf;
};
isBackgroundFetch_fn = function(p) {
  if (!__privateGet(this, _hasFetchMethod))
    return false;
  const b = p;
  return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
};
connect_fn = function(p, n) {
  __privateGet(this, _prev)[n] = p;
  __privateGet(this, _next)[p] = n;
};
moveToTail_fn = function(index) {
  if (index !== __privateGet(this, _tail)) {
    if (index === __privateGet(this, _head)) {
      __privateSet(this, _head, __privateGet(this, _next)[index]);
    } else {
      __privateMethod(this, _LRUCache_instances, connect_fn).call(this, __privateGet(this, _prev)[index], __privateGet(this, _next)[index]);
    }
    __privateMethod(this, _LRUCache_instances, connect_fn).call(this, __privateGet(this, _tail), index);
    __privateSet(this, _tail, index);
  }
};
delete_fn = function(k, reason) {
  var _a2, _b2, _c2, _d;
  let deleted = false;
  if (__privateGet(this, _size) !== 0) {
    const index = __privateGet(this, _keyMap).get(k);
    if (index !== void 0) {
      deleted = true;
      if (__privateGet(this, _size) === 1) {
        __privateMethod(this, _LRUCache_instances, clear_fn).call(this, reason);
      } else {
        __privateGet(this, _removeItemSize).call(this, index);
        const v = __privateGet(this, _valList)[index];
        if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
          v.__abortController.abort(new Error("deleted"));
        } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
          if (__privateGet(this, _hasDispose)) {
            (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, v, k, reason);
          }
          if (__privateGet(this, _hasDisposeAfter)) {
            (_b2 = __privateGet(this, _disposed)) == null ? void 0 : _b2.push([v, k, reason]);
          }
        }
        __privateGet(this, _keyMap).delete(k);
        __privateGet(this, _keyList)[index] = void 0;
        __privateGet(this, _valList)[index] = void 0;
        if (index === __privateGet(this, _tail)) {
          __privateSet(this, _tail, __privateGet(this, _prev)[index]);
        } else if (index === __privateGet(this, _head)) {
          __privateSet(this, _head, __privateGet(this, _next)[index]);
        } else {
          const pi = __privateGet(this, _prev)[index];
          __privateGet(this, _next)[pi] = __privateGet(this, _next)[index];
          const ni = __privateGet(this, _next)[index];
          __privateGet(this, _prev)[ni] = __privateGet(this, _prev)[index];
        }
        __privateWrapper(this, _size)._--;
        __privateGet(this, _free).push(index);
      }
    }
  }
  if (__privateGet(this, _hasDisposeAfter) && ((_c2 = __privateGet(this, _disposed)) == null ? void 0 : _c2.length)) {
    const dt = __privateGet(this, _disposed);
    let task;
    while (task = dt == null ? void 0 : dt.shift()) {
      (_d = __privateGet(this, _disposeAfter)) == null ? void 0 : _d.call(this, ...task);
    }
  }
  return deleted;
};
clear_fn = function(reason) {
  var _a2, _b2, _c2;
  for (const index of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this, { allowStale: true })) {
    const v = __privateGet(this, _valList)[index];
    if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
      v.__abortController.abort(new Error("deleted"));
    } else {
      const k = __privateGet(this, _keyList)[index];
      if (__privateGet(this, _hasDispose)) {
        (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, v, k, reason);
      }
      if (__privateGet(this, _hasDisposeAfter)) {
        (_b2 = __privateGet(this, _disposed)) == null ? void 0 : _b2.push([v, k, reason]);
      }
    }
  }
  __privateGet(this, _keyMap).clear();
  __privateGet(this, _valList).fill(void 0);
  __privateGet(this, _keyList).fill(void 0);
  if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
    __privateGet(this, _ttls).fill(0);
    __privateGet(this, _starts).fill(0);
  }
  if (__privateGet(this, _sizes)) {
    __privateGet(this, _sizes).fill(0);
  }
  __privateSet(this, _head, 0);
  __privateSet(this, _tail, 0);
  __privateGet(this, _free).length = 0;
  __privateSet(this, _calculatedSize, 0);
  __privateSet(this, _size, 0);
  if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
    const dt = __privateGet(this, _disposed);
    let task;
    while (task = dt == null ? void 0 : dt.shift()) {
      (_c2 = __privateGet(this, _disposeAfter)) == null ? void 0 : _c2.call(this, ...task);
    }
  }
};
let LRUCache = _LRUCache;
commonjs$1.LRUCache = LRUCache;
var commonjs = {};
(function(exports2) {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.Minipass = exports2.isWritable = exports2.isReadable = exports2.isStream = void 0;
  const proc = typeof process === "object" && process ? process : {
    stdout: null,
    stderr: null
  };
  const node_events_1 = require$$1;
  const node_stream_1 = __importDefault(require$$1);
  const node_string_decoder_1 = require$$1;
  const isStream = (s) => !!s && typeof s === "object" && (s instanceof Minipass || s instanceof node_stream_1.default || (0, exports2.isReadable)(s) || (0, exports2.isWritable)(s));
  exports2.isStream = isStream;
  const isReadable = (s) => !!s && typeof s === "object" && s instanceof node_events_1.EventEmitter && typeof s.pipe === "function" && // node core Writable streams have a pipe() method, but it throws
  s.pipe !== node_stream_1.default.Writable.prototype.pipe;
  exports2.isReadable = isReadable;
  const isWritable = (s) => !!s && typeof s === "object" && s instanceof node_events_1.EventEmitter && typeof s.write === "function" && typeof s.end === "function";
  exports2.isWritable = isWritable;
  const EOF = Symbol("EOF");
  const MAYBE_EMIT_END = Symbol("maybeEmitEnd");
  const EMITTED_END = Symbol("emittedEnd");
  const EMITTING_END = Symbol("emittingEnd");
  const EMITTED_ERROR = Symbol("emittedError");
  const CLOSED = Symbol("closed");
  const READ = Symbol("read");
  const FLUSH = Symbol("flush");
  const FLUSHCHUNK = Symbol("flushChunk");
  const ENCODING = Symbol("encoding");
  const DECODER = Symbol("decoder");
  const FLOWING = Symbol("flowing");
  const PAUSED = Symbol("paused");
  const RESUME = Symbol("resume");
  const BUFFER = Symbol("buffer");
  const PIPES = Symbol("pipes");
  const BUFFERLENGTH = Symbol("bufferLength");
  const BUFFERPUSH = Symbol("bufferPush");
  const BUFFERSHIFT = Symbol("bufferShift");
  const OBJECTMODE = Symbol("objectMode");
  const DESTROYED = Symbol("destroyed");
  const ERROR = Symbol("error");
  const EMITDATA = Symbol("emitData");
  const EMITEND = Symbol("emitEnd");
  const EMITEND2 = Symbol("emitEnd2");
  const ASYNC = Symbol("async");
  const ABORT = Symbol("abort");
  const ABORTED = Symbol("aborted");
  const SIGNAL = Symbol("signal");
  const DATALISTENERS = Symbol("dataListeners");
  const DISCARDED = Symbol("discarded");
  const defer = (fn) => Promise.resolve().then(fn);
  const nodefer = (fn) => fn();
  const isEndish = (ev) => ev === "end" || ev === "finish" || ev === "prefinish";
  const isArrayBufferLike = (b) => b instanceof ArrayBuffer || !!b && typeof b === "object" && b.constructor && b.constructor.name === "ArrayBuffer" && b.byteLength >= 0;
  const isArrayBufferView = (b) => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);
  class Pipe {
    constructor(src, dest, opts) {
      __publicField(this, "src");
      __publicField(this, "dest");
      __publicField(this, "opts");
      __publicField(this, "ondrain");
      this.src = src;
      this.dest = dest;
      this.opts = opts;
      this.ondrain = () => src[RESUME]();
      this.dest.on("drain", this.ondrain);
    }
    unpipe() {
      this.dest.removeListener("drain", this.ondrain);
    }
    // only here for the prototype
    /* c8 ignore start */
    proxyErrors(_er) {
    }
    /* c8 ignore stop */
    end() {
      this.unpipe();
      if (this.opts.end)
        this.dest.end();
    }
  }
  class PipeProxyErrors extends Pipe {
    unpipe() {
      this.src.removeListener("error", this.proxyErrors);
      super.unpipe();
    }
    constructor(src, dest, opts) {
      super(src, dest, opts);
      this.proxyErrors = (er) => dest.emit("error", er);
      src.on("error", this.proxyErrors);
    }
  }
  const isObjectModeOptions = (o) => !!o.objectMode;
  const isEncodingOptions = (o) => !o.objectMode && !!o.encoding && o.encoding !== "buffer";
  class Minipass extends node_events_1.EventEmitter {
    /**
     * If `RType` is Buffer, then options do not need to be provided.
     * Otherwise, an options object must be provided to specify either
     * {@link Minipass.SharedOptions.objectMode} or
     * {@link Minipass.SharedOptions.encoding}, as appropriate.
     */
    constructor(...args) {
      const options = args[0] || {};
      super();
      __publicField(this, _s, false);
      __publicField(this, _r, false);
      __publicField(this, _q, []);
      __publicField(this, _p, []);
      __publicField(this, _o);
      __publicField(this, _n);
      __publicField(this, _m);
      __publicField(this, _l);
      __publicField(this, _k, false);
      __publicField(this, _j, false);
      __publicField(this, _i, false);
      __publicField(this, _h, false);
      __publicField(this, _g, null);
      __publicField(this, _f, 0);
      __publicField(this, _e, false);
      __publicField(this, _d);
      __publicField(this, _c2, false);
      __publicField(this, _b2, 0);
      __publicField(this, _a2, false);
      /**
       * true if the stream can be written
       */
      __publicField(this, "writable", true);
      /**
       * true if the stream can be read
       */
      __publicField(this, "readable", true);
      if (options.objectMode && typeof options.encoding === "string") {
        throw new TypeError("Encoding and objectMode may not be used together");
      }
      if (isObjectModeOptions(options)) {
        this[OBJECTMODE] = true;
        this[ENCODING] = null;
      } else if (isEncodingOptions(options)) {
        this[ENCODING] = options.encoding;
        this[OBJECTMODE] = false;
      } else {
        this[OBJECTMODE] = false;
        this[ENCODING] = null;
      }
      this[ASYNC] = !!options.async;
      this[DECODER] = this[ENCODING] ? new node_string_decoder_1.StringDecoder(this[ENCODING]) : null;
      if (options && options.debugExposeBuffer === true) {
        Object.defineProperty(this, "buffer", { get: () => this[BUFFER] });
      }
      if (options && options.debugExposePipes === true) {
        Object.defineProperty(this, "pipes", { get: () => this[PIPES] });
      }
      const { signal } = options;
      if (signal) {
        this[SIGNAL] = signal;
        if (signal.aborted) {
          this[ABORT]();
        } else {
          signal.addEventListener("abort", () => this[ABORT]());
        }
      }
    }
    /**
     * The amount of data stored in the buffer waiting to be read.
     *
     * For Buffer strings, this will be the total byte length.
     * For string encoding streams, this will be the string character length,
     * according to JavaScript's `string.length` logic.
     * For objectMode streams, this is a count of the items waiting to be
     * emitted.
     */
    get bufferLength() {
      return this[BUFFERLENGTH];
    }
    /**
     * The `BufferEncoding` currently in use, or `null`
     */
    get encoding() {
      return this[ENCODING];
    }
    /**
     * @deprecated - This is a read only property
     */
    set encoding(_enc) {
      throw new Error("Encoding must be set at instantiation time");
    }
    /**
     * @deprecated - Encoding may only be set at instantiation time
     */
    setEncoding(_enc) {
      throw new Error("Encoding must be set at instantiation time");
    }
    /**
     * True if this is an objectMode stream
     */
    get objectMode() {
      return this[OBJECTMODE];
    }
    /**
     * @deprecated - This is a read-only property
     */
    set objectMode(_om) {
      throw new Error("objectMode must be set at instantiation time");
    }
    /**
     * true if this is an async stream
     */
    get ["async"]() {
      return this[ASYNC];
    }
    /**
     * Set to true to make this stream async.
     *
     * Once set, it cannot be unset, as this would potentially cause incorrect
     * behavior.  Ie, a sync stream can be made async, but an async stream
     * cannot be safely made sync.
     */
    set ["async"](a) {
      this[ASYNC] = this[ASYNC] || !!a;
    }
    // drop everything and get out of the flow completely
    [(_s = FLOWING, _r = PAUSED, _q = PIPES, _p = BUFFER, _o = OBJECTMODE, _n = ENCODING, _m = ASYNC, _l = DECODER, _k = EOF, _j = EMITTED_END, _i = EMITTING_END, _h = CLOSED, _g = EMITTED_ERROR, _f = BUFFERLENGTH, _e = DESTROYED, _d = SIGNAL, _c2 = ABORTED, _b2 = DATALISTENERS, _a2 = DISCARDED, ABORT)]() {
      var _a3, _b3;
      this[ABORTED] = true;
      this.emit("abort", (_a3 = this[SIGNAL]) == null ? void 0 : _a3.reason);
      this.destroy((_b3 = this[SIGNAL]) == null ? void 0 : _b3.reason);
    }
    /**
     * True if the stream has been aborted.
     */
    get aborted() {
      return this[ABORTED];
    }
    /**
     * No-op setter. Stream aborted status is set via the AbortSignal provided
     * in the constructor options.
     */
    set aborted(_) {
    }
    write(chunk, encoding, cb) {
      var _a3;
      if (this[ABORTED])
        return false;
      if (this[EOF])
        throw new Error("write after end");
      if (this[DESTROYED]) {
        this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" }));
        return true;
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = "utf8";
      }
      if (!encoding)
        encoding = "utf8";
      const fn = this[ASYNC] ? defer : nodefer;
      if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
        if (isArrayBufferView(chunk)) {
          chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
        } else if (isArrayBufferLike(chunk)) {
          chunk = Buffer.from(chunk);
        } else if (typeof chunk !== "string") {
          throw new Error("Non-contiguous data written to non-objectMode stream");
        }
      }
      if (this[OBJECTMODE]) {
        if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
          this[FLUSH](true);
        if (this[FLOWING])
          this.emit("data", chunk);
        else
          this[BUFFERPUSH](chunk);
        if (this[BUFFERLENGTH] !== 0)
          this.emit("readable");
        if (cb)
          fn(cb);
        return this[FLOWING];
      }
      if (!chunk.length) {
        if (this[BUFFERLENGTH] !== 0)
          this.emit("readable");
        if (cb)
          fn(cb);
        return this[FLOWING];
      }
      if (typeof chunk === "string" && // unless it is a string already ready for us to use
      !(encoding === this[ENCODING] && !((_a3 = this[DECODER]) == null ? void 0 : _a3.lastNeed))) {
        chunk = Buffer.from(chunk, encoding);
      }
      if (Buffer.isBuffer(chunk) && this[ENCODING]) {
        chunk = this[DECODER].write(chunk);
      }
      if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
        this[FLUSH](true);
      if (this[FLOWING])
        this.emit("data", chunk);
      else
        this[BUFFERPUSH](chunk);
      if (this[BUFFERLENGTH] !== 0)
        this.emit("readable");
      if (cb)
        fn(cb);
      return this[FLOWING];
    }
    /**
     * Low-level explicit read method.
     *
     * In objectMode, the argument is ignored, and one item is returned if
     * available.
     *
     * `n` is the number of bytes (or in the case of encoding streams,
     * characters) to consume. If `n` is not provided, then the entire buffer
     * is returned, or `null` is returned if no data is available.
     *
     * If `n` is greater that the amount of data in the internal buffer,
     * then `null` is returned.
     */
    read(n) {
      if (this[DESTROYED])
        return null;
      this[DISCARDED] = false;
      if (this[BUFFERLENGTH] === 0 || n === 0 || n && n > this[BUFFERLENGTH]) {
        this[MAYBE_EMIT_END]();
        return null;
      }
      if (this[OBJECTMODE])
        n = null;
      if (this[BUFFER].length > 1 && !this[OBJECTMODE]) {
        this[BUFFER] = [
          this[ENCODING] ? this[BUFFER].join("") : Buffer.concat(this[BUFFER], this[BUFFERLENGTH])
        ];
      }
      const ret = this[READ](n || null, this[BUFFER][0]);
      this[MAYBE_EMIT_END]();
      return ret;
    }
    [READ](n, chunk) {
      if (this[OBJECTMODE])
        this[BUFFERSHIFT]();
      else {
        const c = chunk;
        if (n === c.length || n === null)
          this[BUFFERSHIFT]();
        else if (typeof c === "string") {
          this[BUFFER][0] = c.slice(n);
          chunk = c.slice(0, n);
          this[BUFFERLENGTH] -= n;
        } else {
          this[BUFFER][0] = c.subarray(n);
          chunk = c.subarray(0, n);
          this[BUFFERLENGTH] -= n;
        }
      }
      this.emit("data", chunk);
      if (!this[BUFFER].length && !this[EOF])
        this.emit("drain");
      return chunk;
    }
    end(chunk, encoding, cb) {
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = void 0;
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = "utf8";
      }
      if (chunk !== void 0)
        this.write(chunk, encoding);
      if (cb)
        this.once("end", cb);
      this[EOF] = true;
      this.writable = false;
      if (this[FLOWING] || !this[PAUSED])
        this[MAYBE_EMIT_END]();
      return this;
    }
    // don't let the internal resume be overwritten
    [RESUME]() {
      if (this[DESTROYED])
        return;
      if (!this[DATALISTENERS] && !this[PIPES].length) {
        this[DISCARDED] = true;
      }
      this[PAUSED] = false;
      this[FLOWING] = true;
      this.emit("resume");
      if (this[BUFFER].length)
        this[FLUSH]();
      else if (this[EOF])
        this[MAYBE_EMIT_END]();
      else
        this.emit("drain");
    }
    /**
     * Resume the stream if it is currently in a paused state
     *
     * If called when there are no pipe destinations or `data` event listeners,
     * this will place the stream in a "discarded" state, where all data will
     * be thrown away. The discarded state is removed if a pipe destination or
     * data handler is added, if pause() is called, or if any synchronous or
     * asynchronous iteration is started.
     */
    resume() {
      return this[RESUME]();
    }
    /**
     * Pause the stream
     */
    pause() {
      this[FLOWING] = false;
      this[PAUSED] = true;
      this[DISCARDED] = false;
    }
    /**
     * true if the stream has been forcibly destroyed
     */
    get destroyed() {
      return this[DESTROYED];
    }
    /**
     * true if the stream is currently in a flowing state, meaning that
     * any writes will be immediately emitted.
     */
    get flowing() {
      return this[FLOWING];
    }
    /**
     * true if the stream is currently in a paused state
     */
    get paused() {
      return this[PAUSED];
    }
    [BUFFERPUSH](chunk) {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] += 1;
      else
        this[BUFFERLENGTH] += chunk.length;
      this[BUFFER].push(chunk);
    }
    [BUFFERSHIFT]() {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] -= 1;
      else
        this[BUFFERLENGTH] -= this[BUFFER][0].length;
      return this[BUFFER].shift();
    }
    [FLUSH](noDrain = false) {
      do {
      } while (this[FLUSHCHUNK](this[BUFFERSHIFT]()) && this[BUFFER].length);
      if (!noDrain && !this[BUFFER].length && !this[EOF])
        this.emit("drain");
    }
    [FLUSHCHUNK](chunk) {
      this.emit("data", chunk);
      return this[FLOWING];
    }
    /**
     * Pipe all data emitted by this stream into the destination provided.
     *
     * Triggers the flow of data.
     */
    pipe(dest, opts) {
      if (this[DESTROYED])
        return dest;
      this[DISCARDED] = false;
      const ended = this[EMITTED_END];
      opts = opts || {};
      if (dest === proc.stdout || dest === proc.stderr)
        opts.end = false;
      else
        opts.end = opts.end !== false;
      opts.proxyErrors = !!opts.proxyErrors;
      if (ended) {
        if (opts.end)
          dest.end();
      } else {
        this[PIPES].push(!opts.proxyErrors ? new Pipe(this, dest, opts) : new PipeProxyErrors(this, dest, opts));
        if (this[ASYNC])
          defer(() => this[RESUME]());
        else
          this[RESUME]();
      }
      return dest;
    }
    /**
     * Fully unhook a piped destination stream.
     *
     * If the destination stream was the only consumer of this stream (ie,
     * there are no other piped destinations or `'data'` event listeners)
     * then the flow of data will stop until there is another consumer or
     * {@link Minipass#resume} is explicitly called.
     */
    unpipe(dest) {
      const p = this[PIPES].find((p2) => p2.dest === dest);
      if (p) {
        if (this[PIPES].length === 1) {
          if (this[FLOWING] && this[DATALISTENERS] === 0) {
            this[FLOWING] = false;
          }
          this[PIPES] = [];
        } else
          this[PIPES].splice(this[PIPES].indexOf(p), 1);
        p.unpipe();
      }
    }
    /**
     * Alias for {@link Minipass#on}
     */
    addListener(ev, handler) {
      return this.on(ev, handler);
    }
    /**
     * Mostly identical to `EventEmitter.on`, with the following
     * behavior differences to prevent data loss and unnecessary hangs:
     *
     * - Adding a 'data' event handler will trigger the flow of data
     *
     * - Adding a 'readable' event handler when there is data waiting to be read
     *   will cause 'readable' to be emitted immediately.
     *
     * - Adding an 'endish' event handler ('end', 'finish', etc.) which has
     *   already passed will cause the event to be emitted immediately and all
     *   handlers removed.
     *
     * - Adding an 'error' event handler after an error has been emitted will
     *   cause the event to be re-emitted immediately with the error previously
     *   raised.
     */
    on(ev, handler) {
      const ret = super.on(ev, handler);
      if (ev === "data") {
        this[DISCARDED] = false;
        this[DATALISTENERS]++;
        if (!this[PIPES].length && !this[FLOWING]) {
          this[RESUME]();
        }
      } else if (ev === "readable" && this[BUFFERLENGTH] !== 0) {
        super.emit("readable");
      } else if (isEndish(ev) && this[EMITTED_END]) {
        super.emit(ev);
        this.removeAllListeners(ev);
      } else if (ev === "error" && this[EMITTED_ERROR]) {
        const h = handler;
        if (this[ASYNC])
          defer(() => h.call(this, this[EMITTED_ERROR]));
        else
          h.call(this, this[EMITTED_ERROR]);
      }
      return ret;
    }
    /**
     * Alias for {@link Minipass#off}
     */
    removeListener(ev, handler) {
      return this.off(ev, handler);
    }
    /**
     * Mostly identical to `EventEmitter.off`
     *
     * If a 'data' event handler is removed, and it was the last consumer
     * (ie, there are no pipe destinations or other 'data' event listeners),
     * then the flow of data will stop until there is another consumer or
     * {@link Minipass#resume} is explicitly called.
     */
    off(ev, handler) {
      const ret = super.off(ev, handler);
      if (ev === "data") {
        this[DATALISTENERS] = this.listeners("data").length;
        if (this[DATALISTENERS] === 0 && !this[DISCARDED] && !this[PIPES].length) {
          this[FLOWING] = false;
        }
      }
      return ret;
    }
    /**
     * Mostly identical to `EventEmitter.removeAllListeners`
     *
     * If all 'data' event handlers are removed, and they were the last consumer
     * (ie, there are no pipe destinations), then the flow of data will stop
     * until there is another consumer or {@link Minipass#resume} is explicitly
     * called.
     */
    removeAllListeners(ev) {
      const ret = super.removeAllListeners(ev);
      if (ev === "data" || ev === void 0) {
        this[DATALISTENERS] = 0;
        if (!this[DISCARDED] && !this[PIPES].length) {
          this[FLOWING] = false;
        }
      }
      return ret;
    }
    /**
     * true if the 'end' event has been emitted
     */
    get emittedEnd() {
      return this[EMITTED_END];
    }
    [MAYBE_EMIT_END]() {
      if (!this[EMITTING_END] && !this[EMITTED_END] && !this[DESTROYED] && this[BUFFER].length === 0 && this[EOF]) {
        this[EMITTING_END] = true;
        this.emit("end");
        this.emit("prefinish");
        this.emit("finish");
        if (this[CLOSED])
          this.emit("close");
        this[EMITTING_END] = false;
      }
    }
    /**
     * Mostly identical to `EventEmitter.emit`, with the following
     * behavior differences to prevent data loss and unnecessary hangs:
     *
     * If the stream has been destroyed, and the event is something other
     * than 'close' or 'error', then `false` is returned and no handlers
     * are called.
     *
     * If the event is 'end', and has already been emitted, then the event
     * is ignored. If the stream is in a paused or non-flowing state, then
     * the event will be deferred until data flow resumes. If the stream is
     * async, then handlers will be called on the next tick rather than
     * immediately.
     *
     * If the event is 'close', and 'end' has not yet been emitted, then
     * the event will be deferred until after 'end' is emitted.
     *
     * If the event is 'error', and an AbortSignal was provided for the stream,
     * and there are no listeners, then the event is ignored, matching the
     * behavior of node core streams in the presense of an AbortSignal.
     *
     * If the event is 'finish' or 'prefinish', then all listeners will be
     * removed after emitting the event, to prevent double-firing.
     */
    emit(ev, ...args) {
      const data = args[0];
      if (ev !== "error" && ev !== "close" && ev !== DESTROYED && this[DESTROYED]) {
        return false;
      } else if (ev === "data") {
        return !this[OBJECTMODE] && !data ? false : this[ASYNC] ? (defer(() => this[EMITDATA](data)), true) : this[EMITDATA](data);
      } else if (ev === "end") {
        return this[EMITEND]();
      } else if (ev === "close") {
        this[CLOSED] = true;
        if (!this[EMITTED_END] && !this[DESTROYED])
          return false;
        const ret2 = super.emit("close");
        this.removeAllListeners("close");
        return ret2;
      } else if (ev === "error") {
        this[EMITTED_ERROR] = data;
        super.emit(ERROR, data);
        const ret2 = !this[SIGNAL] || this.listeners("error").length ? super.emit("error", data) : false;
        this[MAYBE_EMIT_END]();
        return ret2;
      } else if (ev === "resume") {
        const ret2 = super.emit("resume");
        this[MAYBE_EMIT_END]();
        return ret2;
      } else if (ev === "finish" || ev === "prefinish") {
        const ret2 = super.emit(ev);
        this.removeAllListeners(ev);
        return ret2;
      }
      const ret = super.emit(ev, ...args);
      this[MAYBE_EMIT_END]();
      return ret;
    }
    [EMITDATA](data) {
      for (const p of this[PIPES]) {
        if (p.dest.write(data) === false)
          this.pause();
      }
      const ret = this[DISCARDED] ? false : super.emit("data", data);
      this[MAYBE_EMIT_END]();
      return ret;
    }
    [EMITEND]() {
      if (this[EMITTED_END])
        return false;
      this[EMITTED_END] = true;
      this.readable = false;
      return this[ASYNC] ? (defer(() => this[EMITEND2]()), true) : this[EMITEND2]();
    }
    [EMITEND2]() {
      if (this[DECODER]) {
        const data = this[DECODER].end();
        if (data) {
          for (const p of this[PIPES]) {
            p.dest.write(data);
          }
          if (!this[DISCARDED])
            super.emit("data", data);
        }
      }
      for (const p of this[PIPES]) {
        p.end();
      }
      const ret = super.emit("end");
      this.removeAllListeners("end");
      return ret;
    }
    /**
     * Return a Promise that resolves to an array of all emitted data once
     * the stream ends.
     */
    async collect() {
      const buf = Object.assign([], {
        dataLength: 0
      });
      if (!this[OBJECTMODE])
        buf.dataLength = 0;
      const p = this.promise();
      this.on("data", (c) => {
        buf.push(c);
        if (!this[OBJECTMODE])
          buf.dataLength += c.length;
      });
      await p;
      return buf;
    }
    /**
     * Return a Promise that resolves to the concatenation of all emitted data
     * once the stream ends.
     *
     * Not allowed on objectMode streams.
     */
    async concat() {
      if (this[OBJECTMODE]) {
        throw new Error("cannot concat in objectMode");
      }
      const buf = await this.collect();
      return this[ENCODING] ? buf.join("") : Buffer.concat(buf, buf.dataLength);
    }
    /**
     * Return a void Promise that resolves once the stream ends.
     */
    async promise() {
      return new Promise((resolve2, reject) => {
        this.on(DESTROYED, () => reject(new Error("stream destroyed")));
        this.on("error", (er) => reject(er));
        this.on("end", () => resolve2());
      });
    }
    /**
     * Asynchronous `for await of` iteration.
     *
     * This will continue emitting all chunks until the stream terminates.
     */
    [Symbol.asyncIterator]() {
      this[DISCARDED] = false;
      let stopped = false;
      const stop = async () => {
        this.pause();
        stopped = true;
        return { value: void 0, done: true };
      };
      const next = () => {
        if (stopped)
          return stop();
        const res = this.read();
        if (res !== null)
          return Promise.resolve({ done: false, value: res });
        if (this[EOF])
          return stop();
        let resolve2;
        let reject;
        const onerr = (er) => {
          this.off("data", ondata);
          this.off("end", onend);
          this.off(DESTROYED, ondestroy);
          stop();
          reject(er);
        };
        const ondata = (value) => {
          this.off("error", onerr);
          this.off("end", onend);
          this.off(DESTROYED, ondestroy);
          this.pause();
          resolve2({ value, done: !!this[EOF] });
        };
        const onend = () => {
          this.off("error", onerr);
          this.off("data", ondata);
          this.off(DESTROYED, ondestroy);
          stop();
          resolve2({ done: true, value: void 0 });
        };
        const ondestroy = () => onerr(new Error("stream destroyed"));
        return new Promise((res2, rej) => {
          reject = rej;
          resolve2 = res2;
          this.once(DESTROYED, ondestroy);
          this.once("error", onerr);
          this.once("end", onend);
          this.once("data", ondata);
        });
      };
      return {
        next,
        throw: stop,
        return: stop,
        [Symbol.asyncIterator]() {
          return this;
        }
      };
    }
    /**
     * Synchronous `for of` iteration.
     *
     * The iteration will terminate when the internal buffer runs out, even
     * if the stream has not yet terminated.
     */
    [Symbol.iterator]() {
      this[DISCARDED] = false;
      let stopped = false;
      const stop = () => {
        this.pause();
        this.off(ERROR, stop);
        this.off(DESTROYED, stop);
        this.off("end", stop);
        stopped = true;
        return { done: true, value: void 0 };
      };
      const next = () => {
        if (stopped)
          return stop();
        const value = this.read();
        return value === null ? stop() : { done: false, value };
      };
      this.once("end", stop);
      this.once(ERROR, stop);
      this.once(DESTROYED, stop);
      return {
        next,
        throw: stop,
        return: stop,
        [Symbol.iterator]() {
          return this;
        }
      };
    }
    /**
     * Destroy a stream, preventing it from being used for any further purpose.
     *
     * If the stream has a `close()` method, then it will be called on
     * destruction.
     *
     * After destruction, any attempt to write data, read data, or emit most
     * events will be ignored.
     *
     * If an error argument is provided, then it will be emitted in an
     * 'error' event.
     */
    destroy(er) {
      if (this[DESTROYED]) {
        if (er)
          this.emit("error", er);
        else
          this.emit(DESTROYED);
        return this;
      }
      this[DESTROYED] = true;
      this[DISCARDED] = true;
      this[BUFFER].length = 0;
      this[BUFFERLENGTH] = 0;
      const wc = this;
      if (typeof wc.close === "function" && !this[CLOSED])
        wc.close();
      if (er)
        this.emit("error", er);
      else
        this.emit(DESTROYED);
      return this;
    }
    /**
     * Alias for {@link isStream}
     *
     * Former export location, maintained for backwards compatibility.
     *
     * @deprecated
     */
    static get isStream() {
      return exports2.isStream;
    }
  }
  exports2.Minipass = Minipass;
})(commonjs);
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(commonjs$2, "__esModule", { value: true });
commonjs$2.PathScurry = commonjs$2.Path = commonjs$2.PathScurryDarwin = commonjs$2.PathScurryPosix = commonjs$2.PathScurryWin32 = commonjs$2.PathScurryBase = commonjs$2.PathPosix = commonjs$2.PathWin32 = commonjs$2.PathBase = commonjs$2.ChildrenCache = commonjs$2.ResolveCache = void 0;
const lru_cache_1 = commonjs$1;
const node_path_1 = require$$1;
const node_url_1$1 = require$$1;
const fs_1 = fs;
const actualFS = __importStar(require$$1);
const realpathSync = fs_1.realpathSync.native;
const promises_1 = require$$1;
const minipass_1$1 = commonjs;
const defaultFS = {
  lstatSync: fs_1.lstatSync,
  readdir: fs_1.readdir,
  readdirSync: fs_1.readdirSync,
  readlinkSync: fs_1.readlinkSync,
  realpathSync,
  promises: {
    lstat: promises_1.lstat,
    readdir: promises_1.readdir,
    readlink: promises_1.readlink,
    realpath: promises_1.realpath
  }
};
const fsFromOption = (fsOption) => !fsOption || fsOption === defaultFS || fsOption === actualFS ? defaultFS : {
  ...defaultFS,
  ...fsOption,
  promises: {
    ...defaultFS.promises,
    ...fsOption.promises || {}
  }
};
const uncDriveRegexp = /^\\\\\?\\([a-z]:)\\?$/i;
const uncToDrive = (rootPath) => rootPath.replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
const eitherSep = /[\\\/]/;
const UNKNOWN = 0;
const IFIFO = 1;
const IFCHR = 2;
const IFDIR = 4;
const IFBLK = 6;
const IFREG = 8;
const IFLNK = 10;
const IFSOCK = 12;
const IFMT = 15;
const IFMT_UNKNOWN = ~IFMT;
const READDIR_CALLED = 16;
const LSTAT_CALLED = 32;
const ENOTDIR = 64;
const ENOENT = 128;
const ENOREADLINK = 256;
const ENOREALPATH = 512;
const ENOCHILD = ENOTDIR | ENOENT | ENOREALPATH;
const TYPEMASK = 1023;
const entToType = (s) => s.isFile() ? IFREG : s.isDirectory() ? IFDIR : s.isSymbolicLink() ? IFLNK : s.isCharacterDevice() ? IFCHR : s.isBlockDevice() ? IFBLK : s.isSocket() ? IFSOCK : s.isFIFO() ? IFIFO : UNKNOWN;
const normalizeCache = /* @__PURE__ */ new Map();
const normalize = (s) => {
  const c = normalizeCache.get(s);
  if (c)
    return c;
  const n = s.normalize("NFKD");
  normalizeCache.set(s, n);
  return n;
};
const normalizeNocaseCache = /* @__PURE__ */ new Map();
const normalizeNocase = (s) => {
  const c = normalizeNocaseCache.get(s);
  if (c)
    return c;
  const n = normalize(s.toLowerCase());
  normalizeNocaseCache.set(s, n);
  return n;
};
class ResolveCache extends lru_cache_1.LRUCache {
  constructor() {
    super({ max: 256 });
  }
}
commonjs$2.ResolveCache = ResolveCache;
class ChildrenCache extends lru_cache_1.LRUCache {
  constructor(maxSize = 16 * 1024) {
    super({
      maxSize,
      // parent + children
      sizeCalculation: (a) => a.length + 1
    });
  }
}
commonjs$2.ChildrenCache = ChildrenCache;
const setAsCwd = Symbol("PathScurry setAsCwd");
class PathBase {
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
    __privateAdd(this, _PathBase_instances);
    /**
     * the basename of this path
     *
     * **Important**: *always* test the path name against any test string
     * usingthe {@link isNamed} method, and not by directly comparing this
     * string. Otherwise, unicode path strings that the system sees as identical
     * will not be properly treated as the same path, leading to incorrect
     * behavior and possible security issues.
     */
    __publicField(this, "name");
    /**
     * the Path entry corresponding to the path root.
     *
     * @internal
     */
    __publicField(this, "root");
    /**
     * All roots found within the current PathScurry family
     *
     * @internal
     */
    __publicField(this, "roots");
    /**
     * a reference to the parent path, or undefined in the case of root entries
     *
     * @internal
     */
    __publicField(this, "parent");
    /**
     * boolean indicating whether paths are compared case-insensitively
     * @internal
     */
    __publicField(this, "nocase");
    /**
     * boolean indicating that this path is the current working directory
     * of the PathScurry collection that contains it.
     */
    __publicField(this, "isCWD", false);
    // potential default fs override
    __privateAdd(this, _fs);
    // Stats fields
    __privateAdd(this, _dev);
    __privateAdd(this, _mode);
    __privateAdd(this, _nlink);
    __privateAdd(this, _uid);
    __privateAdd(this, _gid);
    __privateAdd(this, _rdev);
    __privateAdd(this, _blksize);
    __privateAdd(this, _ino);
    __privateAdd(this, _size2);
    __privateAdd(this, _blocks);
    __privateAdd(this, _atimeMs);
    __privateAdd(this, _mtimeMs);
    __privateAdd(this, _ctimeMs);
    __privateAdd(this, _birthtimeMs);
    __privateAdd(this, _atime);
    __privateAdd(this, _mtime);
    __privateAdd(this, _ctime);
    __privateAdd(this, _birthtime);
    __privateAdd(this, _matchName);
    __privateAdd(this, _depth);
    __privateAdd(this, _fullpath);
    __privateAdd(this, _fullpathPosix);
    __privateAdd(this, _relative);
    __privateAdd(this, _relativePosix);
    __privateAdd(this, _type);
    __privateAdd(this, _children);
    __privateAdd(this, _linkTarget);
    __privateAdd(this, _realpath);
    __privateAdd(this, _onReaddirCB, []);
    __privateAdd(this, _readdirCBInFlight, false);
    __privateAdd(this, _asyncReaddirInFlight);
    this.name = name;
    __privateSet(this, _matchName, nocase ? normalizeNocase(name) : normalize(name));
    __privateSet(this, _type, type & TYPEMASK);
    this.nocase = nocase;
    this.roots = roots;
    this.root = root || this;
    __privateSet(this, _children, children);
    __privateSet(this, _fullpath, opts.fullpath);
    __privateSet(this, _relative, opts.relative);
    __privateSet(this, _relativePosix, opts.relativePosix);
    this.parent = opts.parent;
    if (this.parent) {
      __privateSet(this, _fs, __privateGet(this.parent, _fs));
    } else {
      __privateSet(this, _fs, fsFromOption(opts.fs));
    }
  }
  get dev() {
    return __privateGet(this, _dev);
  }
  get mode() {
    return __privateGet(this, _mode);
  }
  get nlink() {
    return __privateGet(this, _nlink);
  }
  get uid() {
    return __privateGet(this, _uid);
  }
  get gid() {
    return __privateGet(this, _gid);
  }
  get rdev() {
    return __privateGet(this, _rdev);
  }
  get blksize() {
    return __privateGet(this, _blksize);
  }
  get ino() {
    return __privateGet(this, _ino);
  }
  get size() {
    return __privateGet(this, _size2);
  }
  get blocks() {
    return __privateGet(this, _blocks);
  }
  get atimeMs() {
    return __privateGet(this, _atimeMs);
  }
  get mtimeMs() {
    return __privateGet(this, _mtimeMs);
  }
  get ctimeMs() {
    return __privateGet(this, _ctimeMs);
  }
  get birthtimeMs() {
    return __privateGet(this, _birthtimeMs);
  }
  get atime() {
    return __privateGet(this, _atime);
  }
  get mtime() {
    return __privateGet(this, _mtime);
  }
  get ctime() {
    return __privateGet(this, _ctime);
  }
  get birthtime() {
    return __privateGet(this, _birthtime);
  }
  /**
   * This property is for compatibility with the Dirent class as of
   * Node v20, where Dirent['parentPath'] refers to the path of the
   * directory that was passed to readdir. For root entries, it's the path
   * to the entry itself.
   */
  get parentPath() {
    return (this.parent || this).fullpath();
  }
  /**
   * Deprecated alias for Dirent['parentPath'] Somewhat counterintuitively,
   * this property refers to the *parent* path, not the path object itself.
   */
  get path() {
    return this.parentPath;
  }
  /**
   * Returns the depth of the Path object from its root.
   *
   * For example, a path at `/foo/bar` would have a depth of 2.
   */
  depth() {
    if (__privateGet(this, _depth) !== void 0)
      return __privateGet(this, _depth);
    if (!this.parent)
      return __privateSet(this, _depth, 0);
    return __privateSet(this, _depth, this.parent.depth() + 1);
  }
  /**
   * @internal
   */
  childrenCache() {
    return __privateGet(this, _children);
  }
  /**
   * Get the Path object referenced by the string path, resolved from this Path
   */
  resolve(path2) {
    var _a2;
    if (!path2) {
      return this;
    }
    const rootPath = this.getRootString(path2);
    const dir = path2.substring(rootPath.length);
    const dirParts = dir.split(this.splitSep);
    const result = rootPath ? __privateMethod(_a2 = this.getRoot(rootPath), _PathBase_instances, resolveParts_fn).call(_a2, dirParts) : __privateMethod(this, _PathBase_instances, resolveParts_fn).call(this, dirParts);
    return result;
  }
  /**
   * Returns the cached children Path objects, if still available.  If they
   * have fallen out of the cache, then returns an empty array, and resets the
   * READDIR_CALLED bit, so that future calls to readdir() will require an fs
   * lookup.
   *
   * @internal
   */
  children() {
    const cached = __privateGet(this, _children).get(this);
    if (cached) {
      return cached;
    }
    const children = Object.assign([], { provisional: 0 });
    __privateGet(this, _children).set(this, children);
    __privateSet(this, _type, __privateGet(this, _type) & ~READDIR_CALLED);
    return children;
  }
  /**
   * Resolves a path portion and returns or creates the child Path.
   *
   * Returns `this` if pathPart is `''` or `'.'`, or `parent` if pathPart is
   * `'..'`.
   *
   * This should not be called directly.  If `pathPart` contains any path
   * separators, it will lead to unsafe undefined behavior.
   *
   * Use `Path.resolve()` instead.
   *
   * @internal
   */
  child(pathPart, opts) {
    if (pathPart === "" || pathPart === ".") {
      return this;
    }
    if (pathPart === "..") {
      return this.parent || this;
    }
    const children = this.children();
    const name = this.nocase ? normalizeNocase(pathPart) : normalize(pathPart);
    for (const p of children) {
      if (__privateGet(p, _matchName) === name) {
        return p;
      }
    }
    const s = this.parent ? this.sep : "";
    const fullpath = __privateGet(this, _fullpath) ? __privateGet(this, _fullpath) + s + pathPart : void 0;
    const pchild = this.newChild(pathPart, UNKNOWN, {
      ...opts,
      parent: this,
      fullpath
    });
    if (!this.canReaddir()) {
      __privateSet(pchild, _type, __privateGet(pchild, _type) | ENOENT);
    }
    children.push(pchild);
    return pchild;
  }
  /**
   * The relative path from the cwd. If it does not share an ancestor with
   * the cwd, then this ends up being equivalent to the fullpath()
   */
  relative() {
    if (this.isCWD)
      return "";
    if (__privateGet(this, _relative) !== void 0) {
      return __privateGet(this, _relative);
    }
    const name = this.name;
    const p = this.parent;
    if (!p) {
      return __privateSet(this, _relative, this.name);
    }
    const pv = p.relative();
    return pv + (!pv || !p.parent ? "" : this.sep) + name;
  }
  /**
   * The relative path from the cwd, using / as the path separator.
   * If it does not share an ancestor with
   * the cwd, then this ends up being equivalent to the fullpathPosix()
   * On posix systems, this is identical to relative().
   */
  relativePosix() {
    if (this.sep === "/")
      return this.relative();
    if (this.isCWD)
      return "";
    if (__privateGet(this, _relativePosix) !== void 0)
      return __privateGet(this, _relativePosix);
    const name = this.name;
    const p = this.parent;
    if (!p) {
      return __privateSet(this, _relativePosix, this.fullpathPosix());
    }
    const pv = p.relativePosix();
    return pv + (!pv || !p.parent ? "" : "/") + name;
  }
  /**
   * The fully resolved path string for this Path entry
   */
  fullpath() {
    if (__privateGet(this, _fullpath) !== void 0) {
      return __privateGet(this, _fullpath);
    }
    const name = this.name;
    const p = this.parent;
    if (!p) {
      return __privateSet(this, _fullpath, this.name);
    }
    const pv = p.fullpath();
    const fp = pv + (!p.parent ? "" : this.sep) + name;
    return __privateSet(this, _fullpath, fp);
  }
  /**
   * On platforms other than windows, this is identical to fullpath.
   *
   * On windows, this is overridden to return the forward-slash form of the
   * full UNC path.
   */
  fullpathPosix() {
    if (__privateGet(this, _fullpathPosix) !== void 0)
      return __privateGet(this, _fullpathPosix);
    if (this.sep === "/")
      return __privateSet(this, _fullpathPosix, this.fullpath());
    if (!this.parent) {
      const p2 = this.fullpath().replace(/\\/g, "/");
      if (/^[a-z]:\//i.test(p2)) {
        return __privateSet(this, _fullpathPosix, `//?/${p2}`);
      } else {
        return __privateSet(this, _fullpathPosix, p2);
      }
    }
    const p = this.parent;
    const pfpp = p.fullpathPosix();
    const fpp = pfpp + (!pfpp || !p.parent ? "" : "/") + this.name;
    return __privateSet(this, _fullpathPosix, fpp);
  }
  /**
   * Is the Path of an unknown type?
   *
   * Note that we might know *something* about it if there has been a previous
   * filesystem operation, for example that it does not exist, or is not a
   * link, or whether it has child entries.
   */
  isUnknown() {
    return (__privateGet(this, _type) & IFMT) === UNKNOWN;
  }
  isType(type) {
    return this[`is${type}`]();
  }
  getType() {
    return this.isUnknown() ? "Unknown" : this.isDirectory() ? "Directory" : this.isFile() ? "File" : this.isSymbolicLink() ? "SymbolicLink" : this.isFIFO() ? "FIFO" : this.isCharacterDevice() ? "CharacterDevice" : this.isBlockDevice() ? "BlockDevice" : (
      /* c8 ignore start */
      this.isSocket() ? "Socket" : "Unknown"
    );
  }
  /**
   * Is the Path a regular file?
   */
  isFile() {
    return (__privateGet(this, _type) & IFMT) === IFREG;
  }
  /**
   * Is the Path a directory?
   */
  isDirectory() {
    return (__privateGet(this, _type) & IFMT) === IFDIR;
  }
  /**
   * Is the path a character device?
   */
  isCharacterDevice() {
    return (__privateGet(this, _type) & IFMT) === IFCHR;
  }
  /**
   * Is the path a block device?
   */
  isBlockDevice() {
    return (__privateGet(this, _type) & IFMT) === IFBLK;
  }
  /**
   * Is the path a FIFO pipe?
   */
  isFIFO() {
    return (__privateGet(this, _type) & IFMT) === IFIFO;
  }
  /**
   * Is the path a socket?
   */
  isSocket() {
    return (__privateGet(this, _type) & IFMT) === IFSOCK;
  }
  /**
   * Is the path a symbolic link?
   */
  isSymbolicLink() {
    return (__privateGet(this, _type) & IFLNK) === IFLNK;
  }
  /**
   * Return the entry if it has been subject of a successful lstat, or
   * undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* simply
   * mean that we haven't called lstat on it.
   */
  lstatCached() {
    return __privateGet(this, _type) & LSTAT_CALLED ? this : void 0;
  }
  /**
   * Return the cached link target if the entry has been the subject of a
   * successful readlink, or undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * readlink() has been called at some point.
   */
  readlinkCached() {
    return __privateGet(this, _linkTarget);
  }
  /**
   * Returns the cached realpath target if the entry has been the subject
   * of a successful realpath, or undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * realpath() has been called at some point.
   */
  realpathCached() {
    return __privateGet(this, _realpath);
  }
  /**
   * Returns the cached child Path entries array if the entry has been the
   * subject of a successful readdir(), or [] otherwise.
   *
   * Does not read the filesystem, so an empty array *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * readdir() has been called recently enough to still be valid.
   */
  readdirCached() {
    const children = this.children();
    return children.slice(0, children.provisional);
  }
  /**
   * Return true if it's worth trying to readlink.  Ie, we don't (yet) have
   * any indication that readlink will definitely fail.
   *
   * Returns false if the path is known to not be a symlink, if a previous
   * readlink failed, or if the entry does not exist.
   */
  canReadlink() {
    if (__privateGet(this, _linkTarget))
      return true;
    if (!this.parent)
      return false;
    const ifmt = __privateGet(this, _type) & IFMT;
    return !(ifmt !== UNKNOWN && ifmt !== IFLNK || __privateGet(this, _type) & ENOREADLINK || __privateGet(this, _type) & ENOENT);
  }
  /**
   * Return true if readdir has previously been successfully called on this
   * path, indicating that cachedReaddir() is likely valid.
   */
  calledReaddir() {
    return !!(__privateGet(this, _type) & READDIR_CALLED);
  }
  /**
   * Returns true if the path is known to not exist. That is, a previous lstat
   * or readdir failed to verify its existence when that would have been
   * expected, or a parent entry was marked either enoent or enotdir.
   */
  isENOENT() {
    return !!(__privateGet(this, _type) & ENOENT);
  }
  /**
   * Return true if the path is a match for the given path name.  This handles
   * case sensitivity and unicode normalization.
   *
   * Note: even on case-sensitive systems, it is **not** safe to test the
   * equality of the `.name` property to determine whether a given pathname
   * matches, due to unicode normalization mismatches.
   *
   * Always use this method instead of testing the `path.name` property
   * directly.
   */
  isNamed(n) {
    return !this.nocase ? __privateGet(this, _matchName) === normalize(n) : __privateGet(this, _matchName) === normalizeNocase(n);
  }
  /**
   * Return the Path object corresponding to the target of a symbolic link.
   *
   * If the Path is not a symbolic link, or if the readlink call fails for any
   * reason, `undefined` is returned.
   *
   * Result is cached, and thus may be outdated if the filesystem is mutated.
   */
  async readlink() {
    var _a2;
    const target = __privateGet(this, _linkTarget);
    if (target) {
      return target;
    }
    if (!this.canReadlink()) {
      return void 0;
    }
    if (!this.parent) {
      return void 0;
    }
    try {
      const read = await __privateGet(this, _fs).promises.readlink(this.fullpath());
      const linkTarget = (_a2 = await this.parent.realpath()) == null ? void 0 : _a2.resolve(read);
      if (linkTarget) {
        return __privateSet(this, _linkTarget, linkTarget);
      }
    } catch (er) {
      __privateMethod(this, _PathBase_instances, readlinkFail_fn).call(this, er.code);
      return void 0;
    }
  }
  /**
   * Synchronous {@link PathBase.readlink}
   */
  readlinkSync() {
    var _a2;
    const target = __privateGet(this, _linkTarget);
    if (target) {
      return target;
    }
    if (!this.canReadlink()) {
      return void 0;
    }
    if (!this.parent) {
      return void 0;
    }
    try {
      const read = __privateGet(this, _fs).readlinkSync(this.fullpath());
      const linkTarget = (_a2 = this.parent.realpathSync()) == null ? void 0 : _a2.resolve(read);
      if (linkTarget) {
        return __privateSet(this, _linkTarget, linkTarget);
      }
    } catch (er) {
      __privateMethod(this, _PathBase_instances, readlinkFail_fn).call(this, er.code);
      return void 0;
    }
  }
  /**
   * Call lstat() on this Path, and update all known information that can be
   * determined.
   *
   * Note that unlike `fs.lstat()`, the returned value does not contain some
   * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
   * information is required, you will need to call `fs.lstat` yourself.
   *
   * If the Path refers to a nonexistent file, or if the lstat call fails for
   * any reason, `undefined` is returned.  Otherwise the updated Path object is
   * returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async lstat() {
    if ((__privateGet(this, _type) & ENOENT) === 0) {
      try {
        __privateMethod(this, _PathBase_instances, applyStat_fn).call(this, await __privateGet(this, _fs).promises.lstat(this.fullpath()));
        return this;
      } catch (er) {
        __privateMethod(this, _PathBase_instances, lstatFail_fn).call(this, er.code);
      }
    }
  }
  /**
   * synchronous {@link PathBase.lstat}
   */
  lstatSync() {
    if ((__privateGet(this, _type) & ENOENT) === 0) {
      try {
        __privateMethod(this, _PathBase_instances, applyStat_fn).call(this, __privateGet(this, _fs).lstatSync(this.fullpath()));
        return this;
      } catch (er) {
        __privateMethod(this, _PathBase_instances, lstatFail_fn).call(this, er.code);
      }
    }
  }
  /**
   * Standard node-style callback interface to get list of directory entries.
   *
   * If the Path cannot or does not contain any children, then an empty array
   * is returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   *
   * @param cb The callback called with (er, entries).  Note that the `er`
   * param is somewhat extraneous, as all readdir() errors are handled and
   * simply result in an empty set of entries being returned.
   * @param allowZalgo Boolean indicating that immediately known results should
   * *not* be deferred with `queueMicrotask`. Defaults to `false`. Release
   * zalgo at your peril, the dark pony lord is devious and unforgiving.
   */
  readdirCB(cb, allowZalgo = false) {
    if (!this.canReaddir()) {
      if (allowZalgo)
        cb(null, []);
      else
        queueMicrotask(() => cb(null, []));
      return;
    }
    const children = this.children();
    if (this.calledReaddir()) {
      const c = children.slice(0, children.provisional);
      if (allowZalgo)
        cb(null, c);
      else
        queueMicrotask(() => cb(null, c));
      return;
    }
    __privateGet(this, _onReaddirCB).push(cb);
    if (__privateGet(this, _readdirCBInFlight)) {
      return;
    }
    __privateSet(this, _readdirCBInFlight, true);
    const fullpath = this.fullpath();
    __privateGet(this, _fs).readdir(fullpath, { withFileTypes: true }, (er, entries) => {
      if (er) {
        __privateMethod(this, _PathBase_instances, readdirFail_fn).call(this, er.code);
        children.provisional = 0;
      } else {
        for (const e of entries) {
          __privateMethod(this, _PathBase_instances, readdirAddChild_fn).call(this, e, children);
        }
        __privateMethod(this, _PathBase_instances, readdirSuccess_fn).call(this, children);
      }
      __privateMethod(this, _PathBase_instances, callOnReaddirCB_fn).call(this, children.slice(0, children.provisional));
      return;
    });
  }
  /**
   * Return an array of known child entries.
   *
   * If the Path cannot or does not contain any children, then an empty array
   * is returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async readdir() {
    if (!this.canReaddir()) {
      return [];
    }
    const children = this.children();
    if (this.calledReaddir()) {
      return children.slice(0, children.provisional);
    }
    const fullpath = this.fullpath();
    if (__privateGet(this, _asyncReaddirInFlight)) {
      await __privateGet(this, _asyncReaddirInFlight);
    } else {
      let resolve2 = () => {
      };
      __privateSet(this, _asyncReaddirInFlight, new Promise((res) => resolve2 = res));
      try {
        for (const e of await __privateGet(this, _fs).promises.readdir(fullpath, {
          withFileTypes: true
        })) {
          __privateMethod(this, _PathBase_instances, readdirAddChild_fn).call(this, e, children);
        }
        __privateMethod(this, _PathBase_instances, readdirSuccess_fn).call(this, children);
      } catch (er) {
        __privateMethod(this, _PathBase_instances, readdirFail_fn).call(this, er.code);
        children.provisional = 0;
      }
      __privateSet(this, _asyncReaddirInFlight, void 0);
      resolve2();
    }
    return children.slice(0, children.provisional);
  }
  /**
   * synchronous {@link PathBase.readdir}
   */
  readdirSync() {
    if (!this.canReaddir()) {
      return [];
    }
    const children = this.children();
    if (this.calledReaddir()) {
      return children.slice(0, children.provisional);
    }
    const fullpath = this.fullpath();
    try {
      for (const e of __privateGet(this, _fs).readdirSync(fullpath, {
        withFileTypes: true
      })) {
        __privateMethod(this, _PathBase_instances, readdirAddChild_fn).call(this, e, children);
      }
      __privateMethod(this, _PathBase_instances, readdirSuccess_fn).call(this, children);
    } catch (er) {
      __privateMethod(this, _PathBase_instances, readdirFail_fn).call(this, er.code);
      children.provisional = 0;
    }
    return children.slice(0, children.provisional);
  }
  canReaddir() {
    if (__privateGet(this, _type) & ENOCHILD)
      return false;
    const ifmt = IFMT & __privateGet(this, _type);
    if (!(ifmt === UNKNOWN || ifmt === IFDIR || ifmt === IFLNK)) {
      return false;
    }
    return true;
  }
  shouldWalk(dirs, walkFilter) {
    return (__privateGet(this, _type) & IFDIR) === IFDIR && !(__privateGet(this, _type) & ENOCHILD) && !dirs.has(this) && (!walkFilter || walkFilter(this));
  }
  /**
   * Return the Path object corresponding to path as resolved
   * by realpath(3).
   *
   * If the realpath call fails for any reason, `undefined` is returned.
   *
   * Result is cached, and thus may be outdated if the filesystem is mutated.
   * On success, returns a Path object.
   */
  async realpath() {
    if (__privateGet(this, _realpath))
      return __privateGet(this, _realpath);
    if ((ENOREALPATH | ENOREADLINK | ENOENT) & __privateGet(this, _type))
      return void 0;
    try {
      const rp = await __privateGet(this, _fs).promises.realpath(this.fullpath());
      return __privateSet(this, _realpath, this.resolve(rp));
    } catch (_) {
      __privateMethod(this, _PathBase_instances, markENOREALPATH_fn).call(this);
    }
  }
  /**
   * Synchronous {@link realpath}
   */
  realpathSync() {
    if (__privateGet(this, _realpath))
      return __privateGet(this, _realpath);
    if ((ENOREALPATH | ENOREADLINK | ENOENT) & __privateGet(this, _type))
      return void 0;
    try {
      const rp = __privateGet(this, _fs).realpathSync(this.fullpath());
      return __privateSet(this, _realpath, this.resolve(rp));
    } catch (_) {
      __privateMethod(this, _PathBase_instances, markENOREALPATH_fn).call(this);
    }
  }
  /**
   * Internal method to mark this Path object as the scurry cwd,
   * called by {@link PathScurry#chdir}
   *
   * @internal
   */
  [setAsCwd](oldCwd) {
    if (oldCwd === this)
      return;
    oldCwd.isCWD = false;
    this.isCWD = true;
    const changed = /* @__PURE__ */ new Set([]);
    let rp = [];
    let p = this;
    while (p && p.parent) {
      changed.add(p);
      __privateSet(p, _relative, rp.join(this.sep));
      __privateSet(p, _relativePosix, rp.join("/"));
      p = p.parent;
      rp.push("..");
    }
    p = oldCwd;
    while (p && p.parent && !changed.has(p)) {
      __privateSet(p, _relative, void 0);
      __privateSet(p, _relativePosix, void 0);
      p = p.parent;
    }
  }
}
_fs = new WeakMap();
_dev = new WeakMap();
_mode = new WeakMap();
_nlink = new WeakMap();
_uid = new WeakMap();
_gid = new WeakMap();
_rdev = new WeakMap();
_blksize = new WeakMap();
_ino = new WeakMap();
_size2 = new WeakMap();
_blocks = new WeakMap();
_atimeMs = new WeakMap();
_mtimeMs = new WeakMap();
_ctimeMs = new WeakMap();
_birthtimeMs = new WeakMap();
_atime = new WeakMap();
_mtime = new WeakMap();
_ctime = new WeakMap();
_birthtime = new WeakMap();
_matchName = new WeakMap();
_depth = new WeakMap();
_fullpath = new WeakMap();
_fullpathPosix = new WeakMap();
_relative = new WeakMap();
_relativePosix = new WeakMap();
_type = new WeakMap();
_children = new WeakMap();
_linkTarget = new WeakMap();
_realpath = new WeakMap();
_PathBase_instances = new WeakSet();
resolveParts_fn = function(dirParts) {
  let p = this;
  for (const part of dirParts) {
    p = p.child(part);
  }
  return p;
};
readdirSuccess_fn = function(children) {
  var _a2;
  __privateSet(this, _type, __privateGet(this, _type) | READDIR_CALLED);
  for (let p = children.provisional; p < children.length; p++) {
    const c = children[p];
    if (c)
      __privateMethod(_a2 = c, _PathBase_instances, markENOENT_fn).call(_a2);
  }
};
markENOENT_fn = function() {
  if (__privateGet(this, _type) & ENOENT)
    return;
  __privateSet(this, _type, (__privateGet(this, _type) | ENOENT) & IFMT_UNKNOWN);
  __privateMethod(this, _PathBase_instances, markChildrenENOENT_fn).call(this);
};
markChildrenENOENT_fn = function() {
  var _a2;
  const children = this.children();
  children.provisional = 0;
  for (const p of children) {
    __privateMethod(_a2 = p, _PathBase_instances, markENOENT_fn).call(_a2);
  }
};
markENOREALPATH_fn = function() {
  __privateSet(this, _type, __privateGet(this, _type) | ENOREALPATH);
  __privateMethod(this, _PathBase_instances, markENOTDIR_fn).call(this);
};
// save the information when we know the entry is not a dir
markENOTDIR_fn = function() {
  if (__privateGet(this, _type) & ENOTDIR)
    return;
  let t = __privateGet(this, _type);
  if ((t & IFMT) === IFDIR)
    t &= IFMT_UNKNOWN;
  __privateSet(this, _type, t | ENOTDIR);
  __privateMethod(this, _PathBase_instances, markChildrenENOENT_fn).call(this);
};
readdirFail_fn = function(code = "") {
  if (code === "ENOTDIR" || code === "EPERM") {
    __privateMethod(this, _PathBase_instances, markENOTDIR_fn).call(this);
  } else if (code === "ENOENT") {
    __privateMethod(this, _PathBase_instances, markENOENT_fn).call(this);
  } else {
    this.children().provisional = 0;
  }
};
lstatFail_fn = function(code = "") {
  var _a2;
  if (code === "ENOTDIR") {
    const p = this.parent;
    __privateMethod(_a2 = p, _PathBase_instances, markENOTDIR_fn).call(_a2);
  } else if (code === "ENOENT") {
    __privateMethod(this, _PathBase_instances, markENOENT_fn).call(this);
  }
};
readlinkFail_fn = function(code = "") {
  var _a2;
  let ter = __privateGet(this, _type);
  ter |= ENOREADLINK;
  if (code === "ENOENT")
    ter |= ENOENT;
  if (code === "EINVAL" || code === "UNKNOWN") {
    ter &= IFMT_UNKNOWN;
  }
  __privateSet(this, _type, ter);
  if (code === "ENOTDIR" && this.parent) {
    __privateMethod(_a2 = this.parent, _PathBase_instances, markENOTDIR_fn).call(_a2);
  }
};
readdirAddChild_fn = function(e, c) {
  return __privateMethod(this, _PathBase_instances, readdirMaybePromoteChild_fn).call(this, e, c) || __privateMethod(this, _PathBase_instances, readdirAddNewChild_fn).call(this, e, c);
};
readdirAddNewChild_fn = function(e, c) {
  const type = entToType(e);
  const child = this.newChild(e.name, type, { parent: this });
  const ifmt = __privateGet(child, _type) & IFMT;
  if (ifmt !== IFDIR && ifmt !== IFLNK && ifmt !== UNKNOWN) {
    __privateSet(child, _type, __privateGet(child, _type) | ENOTDIR);
  }
  c.unshift(child);
  c.provisional++;
  return child;
};
readdirMaybePromoteChild_fn = function(e, c) {
  for (let p = c.provisional; p < c.length; p++) {
    const pchild = c[p];
    const name = this.nocase ? normalizeNocase(e.name) : normalize(e.name);
    if (name !== __privateGet(pchild, _matchName)) {
      continue;
    }
    return __privateMethod(this, _PathBase_instances, readdirPromoteChild_fn).call(this, e, pchild, p, c);
  }
};
readdirPromoteChild_fn = function(e, p, index, c) {
  const v = p.name;
  __privateSet(p, _type, __privateGet(p, _type) & IFMT_UNKNOWN | entToType(e));
  if (v !== e.name)
    p.name = e.name;
  if (index !== c.provisional) {
    if (index === c.length - 1)
      c.pop();
    else
      c.splice(index, 1);
    c.unshift(p);
  }
  c.provisional++;
  return p;
};
applyStat_fn = function(st) {
  const { atime, atimeMs, birthtime, birthtimeMs, blksize, blocks, ctime, ctimeMs, dev, gid, ino, mode, mtime, mtimeMs, nlink, rdev, size, uid } = st;
  __privateSet(this, _atime, atime);
  __privateSet(this, _atimeMs, atimeMs);
  __privateSet(this, _birthtime, birthtime);
  __privateSet(this, _birthtimeMs, birthtimeMs);
  __privateSet(this, _blksize, blksize);
  __privateSet(this, _blocks, blocks);
  __privateSet(this, _ctime, ctime);
  __privateSet(this, _ctimeMs, ctimeMs);
  __privateSet(this, _dev, dev);
  __privateSet(this, _gid, gid);
  __privateSet(this, _ino, ino);
  __privateSet(this, _mode, mode);
  __privateSet(this, _mtime, mtime);
  __privateSet(this, _mtimeMs, mtimeMs);
  __privateSet(this, _nlink, nlink);
  __privateSet(this, _rdev, rdev);
  __privateSet(this, _size2, size);
  __privateSet(this, _uid, uid);
  const ifmt = entToType(st);
  __privateSet(this, _type, __privateGet(this, _type) & IFMT_UNKNOWN | ifmt | LSTAT_CALLED);
  if (ifmt !== UNKNOWN && ifmt !== IFDIR && ifmt !== IFLNK) {
    __privateSet(this, _type, __privateGet(this, _type) | ENOTDIR);
  }
};
_onReaddirCB = new WeakMap();
_readdirCBInFlight = new WeakMap();
callOnReaddirCB_fn = function(children) {
  __privateSet(this, _readdirCBInFlight, false);
  const cbs = __privateGet(this, _onReaddirCB).slice();
  __privateGet(this, _onReaddirCB).length = 0;
  cbs.forEach((cb) => cb(null, children));
};
_asyncReaddirInFlight = new WeakMap();
commonjs$2.PathBase = PathBase;
class PathWin32 extends PathBase {
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
    super(name, type, root, roots, nocase, children, opts);
    /**
     * Separator for generating path strings.
     */
    __publicField(this, "sep", "\\");
    /**
     * Separator for parsing path strings.
     */
    __publicField(this, "splitSep", eitherSep);
  }
  /**
   * @internal
   */
  newChild(name, type = UNKNOWN, opts = {}) {
    return new PathWin32(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
  }
  /**
   * @internal
   */
  getRootString(path2) {
    return node_path_1.win32.parse(path2).root;
  }
  /**
   * @internal
   */
  getRoot(rootPath) {
    rootPath = uncToDrive(rootPath.toUpperCase());
    if (rootPath === this.root.name) {
      return this.root;
    }
    for (const [compare, root] of Object.entries(this.roots)) {
      if (this.sameRoot(rootPath, compare)) {
        return this.roots[rootPath] = root;
      }
    }
    return this.roots[rootPath] = new PathScurryWin32(rootPath, this).root;
  }
  /**
   * @internal
   */
  sameRoot(rootPath, compare = this.root.name) {
    rootPath = rootPath.toUpperCase().replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
    return rootPath === compare;
  }
}
commonjs$2.PathWin32 = PathWin32;
class PathPosix extends PathBase {
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
    super(name, type, root, roots, nocase, children, opts);
    /**
     * separator for parsing path strings
     */
    __publicField(this, "splitSep", "/");
    /**
     * separator for generating path strings
     */
    __publicField(this, "sep", "/");
  }
  /**
   * @internal
   */
  getRootString(path2) {
    return path2.startsWith("/") ? "/" : "";
  }
  /**
   * @internal
   */
  getRoot(_rootPath) {
    return this.root;
  }
  /**
   * @internal
   */
  newChild(name, type = UNKNOWN, opts = {}) {
    return new PathPosix(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
  }
}
commonjs$2.PathPosix = PathPosix;
class PathScurryBase {
  /**
   * This class should not be instantiated directly.
   *
   * Use PathScurryWin32, PathScurryDarwin, PathScurryPosix, or PathScurry
   *
   * @internal
   */
  constructor(cwd = process.cwd(), pathImpl, sep, { nocase, childrenCacheSize = 16 * 1024, fs: fs2 = defaultFS } = {}) {
    /**
     * The root Path entry for the current working directory of this Scurry
     */
    __publicField(this, "root");
    /**
     * The string path for the root of this Scurry's current working directory
     */
    __publicField(this, "rootPath");
    /**
     * A collection of all roots encountered, referenced by rootPath
     */
    __publicField(this, "roots");
    /**
     * The Path entry corresponding to this PathScurry's current working directory.
     */
    __publicField(this, "cwd");
    __privateAdd(this, _resolveCache);
    __privateAdd(this, _resolvePosixCache);
    __privateAdd(this, _children2);
    /**
     * Perform path comparisons case-insensitively.
     *
     * Defaults true on Darwin and Windows systems, false elsewhere.
     */
    __publicField(this, "nocase");
    __privateAdd(this, _fs2);
    __privateSet(this, _fs2, fsFromOption(fs2));
    if (cwd instanceof URL || cwd.startsWith("file://")) {
      cwd = (0, node_url_1$1.fileURLToPath)(cwd);
    }
    const cwdPath = pathImpl.resolve(cwd);
    this.roots = /* @__PURE__ */ Object.create(null);
    this.rootPath = this.parseRootPath(cwdPath);
    __privateSet(this, _resolveCache, new ResolveCache());
    __privateSet(this, _resolvePosixCache, new ResolveCache());
    __privateSet(this, _children2, new ChildrenCache(childrenCacheSize));
    const split = cwdPath.substring(this.rootPath.length).split(sep);
    if (split.length === 1 && !split[0]) {
      split.pop();
    }
    if (nocase === void 0) {
      throw new TypeError("must provide nocase setting to PathScurryBase ctor");
    }
    this.nocase = nocase;
    this.root = this.newRoot(__privateGet(this, _fs2));
    this.roots[this.rootPath] = this.root;
    let prev = this.root;
    let len = split.length - 1;
    const joinSep = pathImpl.sep;
    let abs = this.rootPath;
    let sawFirst = false;
    for (const part of split) {
      const l = len--;
      prev = prev.child(part, {
        relative: new Array(l).fill("..").join(joinSep),
        relativePosix: new Array(l).fill("..").join("/"),
        fullpath: abs += (sawFirst ? "" : joinSep) + part
      });
      sawFirst = true;
    }
    this.cwd = prev;
  }
  /**
   * Get the depth of a provided path, string, or the cwd
   */
  depth(path2 = this.cwd) {
    if (typeof path2 === "string") {
      path2 = this.cwd.resolve(path2);
    }
    return path2.depth();
  }
  /**
   * Return the cache of child entries.  Exposed so subclasses can create
   * child Path objects in a platform-specific way.
   *
   * @internal
   */
  childrenCache() {
    return __privateGet(this, _children2);
  }
  /**
   * Resolve one or more path strings to a resolved string
   *
   * Same interface as require('path').resolve.
   *
   * Much faster than path.resolve() when called multiple times for the same
   * path, because the resolved Path objects are cached.  Much slower
   * otherwise.
   */
  resolve(...paths) {
    let r = "";
    for (let i = paths.length - 1; i >= 0; i--) {
      const p = paths[i];
      if (!p || p === ".")
        continue;
      r = r ? `${p}/${r}` : p;
      if (this.isAbsolute(p)) {
        break;
      }
    }
    const cached = __privateGet(this, _resolveCache).get(r);
    if (cached !== void 0) {
      return cached;
    }
    const result = this.cwd.resolve(r).fullpath();
    __privateGet(this, _resolveCache).set(r, result);
    return result;
  }
  /**
   * Resolve one or more path strings to a resolved string, returning
   * the posix path.  Identical to .resolve() on posix systems, but on
   * windows will return a forward-slash separated UNC path.
   *
   * Same interface as require('path').resolve.
   *
   * Much faster than path.resolve() when called multiple times for the same
   * path, because the resolved Path objects are cached.  Much slower
   * otherwise.
   */
  resolvePosix(...paths) {
    let r = "";
    for (let i = paths.length - 1; i >= 0; i--) {
      const p = paths[i];
      if (!p || p === ".")
        continue;
      r = r ? `${p}/${r}` : p;
      if (this.isAbsolute(p)) {
        break;
      }
    }
    const cached = __privateGet(this, _resolvePosixCache).get(r);
    if (cached !== void 0) {
      return cached;
    }
    const result = this.cwd.resolve(r).fullpathPosix();
    __privateGet(this, _resolvePosixCache).set(r, result);
    return result;
  }
  /**
   * find the relative path from the cwd to the supplied path string or entry
   */
  relative(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.relative();
  }
  /**
   * find the relative path from the cwd to the supplied path string or
   * entry, using / as the path delimiter, even on Windows.
   */
  relativePosix(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.relativePosix();
  }
  /**
   * Return the basename for the provided string or Path object
   */
  basename(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.name;
  }
  /**
   * Return the dirname for the provided string or Path object
   */
  dirname(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return (entry.parent || entry).fullpath();
  }
  async readdir(entry = this.cwd, opts = {
    withFileTypes: true
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes } = opts;
    if (!entry.canReaddir()) {
      return [];
    } else {
      const p = await entry.readdir();
      return withFileTypes ? p : p.map((e) => e.name);
    }
  }
  readdirSync(entry = this.cwd, opts = {
    withFileTypes: true
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true } = opts;
    if (!entry.canReaddir()) {
      return [];
    } else if (withFileTypes) {
      return entry.readdirSync();
    } else {
      return entry.readdirSync().map((e) => e.name);
    }
  }
  /**
   * Call lstat() on the string or Path object, and update all known
   * information that can be determined.
   *
   * Note that unlike `fs.lstat()`, the returned value does not contain some
   * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
   * information is required, you will need to call `fs.lstat` yourself.
   *
   * If the Path refers to a nonexistent file, or if the lstat call fails for
   * any reason, `undefined` is returned.  Otherwise the updated Path object is
   * returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async lstat(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.lstat();
  }
  /**
   * synchronous {@link PathScurryBase.lstat}
   */
  lstatSync(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.lstatSync();
  }
  async readlink(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = await entry.readlink();
    return withFileTypes ? e : e == null ? void 0 : e.fullpath();
  }
  readlinkSync(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = entry.readlinkSync();
    return withFileTypes ? e : e == null ? void 0 : e.fullpath();
  }
  async realpath(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = await entry.realpath();
    return withFileTypes ? e : e == null ? void 0 : e.fullpath();
  }
  realpathSync(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = entry.realpathSync();
    return withFileTypes ? e : e == null ? void 0 : e.fullpath();
  }
  async walk(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    const results = [];
    if (!filter || filter(entry)) {
      results.push(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set();
    const walk = (dir, cb) => {
      dirs.add(dir);
      dir.readdirCB((er, entries) => {
        if (er) {
          return cb(er);
        }
        let len = entries.length;
        if (!len)
          return cb();
        const next = () => {
          if (--len === 0) {
            cb();
          }
        };
        for (const e of entries) {
          if (!filter || filter(e)) {
            results.push(withFileTypes ? e : e.fullpath());
          }
          if (follow && e.isSymbolicLink()) {
            e.realpath().then((r) => (r == null ? void 0 : r.isUnknown()) ? r.lstat() : r).then((r) => (r == null ? void 0 : r.shouldWalk(dirs, walkFilter)) ? walk(r, next) : next());
          } else {
            if (e.shouldWalk(dirs, walkFilter)) {
              walk(e, next);
            } else {
              next();
            }
          }
        }
      }, true);
    };
    const start = entry;
    return new Promise((res, rej) => {
      walk(start, (er) => {
        if (er)
          return rej(er);
        res(results);
      });
    });
  }
  walkSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    const results = [];
    if (!filter || filter(entry)) {
      results.push(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set([entry]);
    for (const dir of dirs) {
      const entries = dir.readdirSync();
      for (const e of entries) {
        if (!filter || filter(e)) {
          results.push(withFileTypes ? e : e.fullpath());
        }
        let r = e;
        if (e.isSymbolicLink()) {
          if (!(follow && (r = e.realpathSync())))
            continue;
          if (r.isUnknown())
            r.lstatSync();
        }
        if (r.shouldWalk(dirs, walkFilter)) {
          dirs.add(r);
        }
      }
    }
    return results;
  }
  /**
   * Support for `for await`
   *
   * Alias for {@link PathScurryBase.iterate}
   *
   * Note: As of Node 19, this is very slow, compared to other methods of
   * walking.  Consider using {@link PathScurryBase.stream} if memory overhead
   * and backpressure are concerns, or {@link PathScurryBase.walk} if not.
   */
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
  iterate(entry = this.cwd, options = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      options = entry;
      entry = this.cwd;
    }
    return this.stream(entry, options)[Symbol.asyncIterator]();
  }
  /**
   * Iterating over a PathScurry performs a synchronous walk.
   *
   * Alias for {@link PathScurryBase.iterateSync}
   */
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  *iterateSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    if (!filter || filter(entry)) {
      yield withFileTypes ? entry : entry.fullpath();
    }
    const dirs = /* @__PURE__ */ new Set([entry]);
    for (const dir of dirs) {
      const entries = dir.readdirSync();
      for (const e of entries) {
        if (!filter || filter(e)) {
          yield withFileTypes ? e : e.fullpath();
        }
        let r = e;
        if (e.isSymbolicLink()) {
          if (!(follow && (r = e.realpathSync())))
            continue;
          if (r.isUnknown())
            r.lstatSync();
        }
        if (r.shouldWalk(dirs, walkFilter)) {
          dirs.add(r);
        }
      }
    }
  }
  stream(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    const results = new minipass_1$1.Minipass({ objectMode: true });
    if (!filter || filter(entry)) {
      results.write(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set();
    const queue = [entry];
    let processing = 0;
    const process2 = () => {
      let paused = false;
      while (!paused) {
        const dir = queue.shift();
        if (!dir) {
          if (processing === 0)
            results.end();
          return;
        }
        processing++;
        dirs.add(dir);
        const onReaddir = (er, entries, didRealpaths = false) => {
          if (er)
            return results.emit("error", er);
          if (follow && !didRealpaths) {
            const promises = [];
            for (const e of entries) {
              if (e.isSymbolicLink()) {
                promises.push(e.realpath().then((r) => (r == null ? void 0 : r.isUnknown()) ? r.lstat() : r));
              }
            }
            if (promises.length) {
              Promise.all(promises).then(() => onReaddir(null, entries, true));
              return;
            }
          }
          for (const e of entries) {
            if (e && (!filter || filter(e))) {
              if (!results.write(withFileTypes ? e : e.fullpath())) {
                paused = true;
              }
            }
          }
          processing--;
          for (const e of entries) {
            const r = e.realpathCached() || e;
            if (r.shouldWalk(dirs, walkFilter)) {
              queue.push(r);
            }
          }
          if (paused && !results.flowing) {
            results.once("drain", process2);
          } else if (!sync) {
            process2();
          }
        };
        let sync = true;
        dir.readdirCB(onReaddir, true);
        sync = false;
      }
    };
    process2();
    return results;
  }
  streamSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    const results = new minipass_1$1.Minipass({ objectMode: true });
    const dirs = /* @__PURE__ */ new Set();
    if (!filter || filter(entry)) {
      results.write(withFileTypes ? entry : entry.fullpath());
    }
    const queue = [entry];
    let processing = 0;
    const process2 = () => {
      let paused = false;
      while (!paused) {
        const dir = queue.shift();
        if (!dir) {
          if (processing === 0)
            results.end();
          return;
        }
        processing++;
        dirs.add(dir);
        const entries = dir.readdirSync();
        for (const e of entries) {
          if (!filter || filter(e)) {
            if (!results.write(withFileTypes ? e : e.fullpath())) {
              paused = true;
            }
          }
        }
        processing--;
        for (const e of entries) {
          let r = e;
          if (e.isSymbolicLink()) {
            if (!(follow && (r = e.realpathSync())))
              continue;
            if (r.isUnknown())
              r.lstatSync();
          }
          if (r.shouldWalk(dirs, walkFilter)) {
            queue.push(r);
          }
        }
      }
      if (paused && !results.flowing)
        results.once("drain", process2);
    };
    process2();
    return results;
  }
  chdir(path2 = this.cwd) {
    const oldCwd = this.cwd;
    this.cwd = typeof path2 === "string" ? this.cwd.resolve(path2) : path2;
    this.cwd[setAsCwd](oldCwd);
  }
}
_resolveCache = new WeakMap();
_resolvePosixCache = new WeakMap();
_children2 = new WeakMap();
_fs2 = new WeakMap();
commonjs$2.PathScurryBase = PathScurryBase;
class PathScurryWin32 extends PathScurryBase {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = true } = opts;
    super(cwd, node_path_1.win32, "\\", { ...opts, nocase });
    /**
     * separator for generating path strings
     */
    __publicField(this, "sep", "\\");
    this.nocase = nocase;
    for (let p = this.cwd; p; p = p.parent) {
      p.nocase = this.nocase;
    }
  }
  /**
   * @internal
   */
  parseRootPath(dir) {
    return node_path_1.win32.parse(dir).root.toUpperCase();
  }
  /**
   * @internal
   */
  newRoot(fs2) {
    return new PathWin32(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs: fs2 });
  }
  /**
   * Return true if the provided path string is an absolute path
   */
  isAbsolute(p) {
    return p.startsWith("/") || p.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(p);
  }
}
commonjs$2.PathScurryWin32 = PathScurryWin32;
class PathScurryPosix extends PathScurryBase {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = false } = opts;
    super(cwd, node_path_1.posix, "/", { ...opts, nocase });
    /**
     * separator for generating path strings
     */
    __publicField(this, "sep", "/");
    this.nocase = nocase;
  }
  /**
   * @internal
   */
  parseRootPath(_dir) {
    return "/";
  }
  /**
   * @internal
   */
  newRoot(fs2) {
    return new PathPosix(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs: fs2 });
  }
  /**
   * Return true if the provided path string is an absolute path
   */
  isAbsolute(p) {
    return p.startsWith("/");
  }
}
commonjs$2.PathScurryPosix = PathScurryPosix;
class PathScurryDarwin extends PathScurryPosix {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = true } = opts;
    super(cwd, { ...opts, nocase });
  }
}
commonjs$2.PathScurryDarwin = PathScurryDarwin;
commonjs$2.Path = process.platform === "win32" ? PathWin32 : PathPosix;
commonjs$2.PathScurry = process.platform === "win32" ? PathScurryWin32 : process.platform === "darwin" ? PathScurryDarwin : PathScurryPosix;
var pattern = {};
Object.defineProperty(pattern, "__esModule", { value: true });
pattern.Pattern = void 0;
const minimatch_1$4 = commonjs$4;
const isPatternList = (pl) => pl.length >= 1;
const isGlobList = (gl) => gl.length >= 1;
const _Pattern = class _Pattern {
  constructor(patternList, globList, index, platform) {
    __privateAdd(this, _patternList);
    __privateAdd(this, _globList);
    __privateAdd(this, _index);
    __publicField(this, "length");
    __privateAdd(this, _platform);
    __privateAdd(this, _rest);
    __privateAdd(this, _globString);
    __privateAdd(this, _isDrive);
    __privateAdd(this, _isUNC);
    __privateAdd(this, _isAbsolute);
    __privateAdd(this, _followGlobstar, true);
    if (!isPatternList(patternList)) {
      throw new TypeError("empty pattern list");
    }
    if (!isGlobList(globList)) {
      throw new TypeError("empty glob list");
    }
    if (globList.length !== patternList.length) {
      throw new TypeError("mismatched pattern list and glob list lengths");
    }
    this.length = patternList.length;
    if (index < 0 || index >= this.length) {
      throw new TypeError("index out of range");
    }
    __privateSet(this, _patternList, patternList);
    __privateSet(this, _globList, globList);
    __privateSet(this, _index, index);
    __privateSet(this, _platform, platform);
    if (__privateGet(this, _index) === 0) {
      if (this.isUNC()) {
        const [p0, p1, p2, p3, ...prest] = __privateGet(this, _patternList);
        const [g0, g1, g2, g3, ...grest] = __privateGet(this, _globList);
        if (prest[0] === "") {
          prest.shift();
          grest.shift();
        }
        const p = [p0, p1, p2, p3, ""].join("/");
        const g = [g0, g1, g2, g3, ""].join("/");
        __privateSet(this, _patternList, [p, ...prest]);
        __privateSet(this, _globList, [g, ...grest]);
        this.length = __privateGet(this, _patternList).length;
      } else if (this.isDrive() || this.isAbsolute()) {
        const [p1, ...prest] = __privateGet(this, _patternList);
        const [g1, ...grest] = __privateGet(this, _globList);
        if (prest[0] === "") {
          prest.shift();
          grest.shift();
        }
        const p = p1 + "/";
        const g = g1 + "/";
        __privateSet(this, _patternList, [p, ...prest]);
        __privateSet(this, _globList, [g, ...grest]);
        this.length = __privateGet(this, _patternList).length;
      }
    }
  }
  /**
   * The first entry in the parsed list of patterns
   */
  pattern() {
    return __privateGet(this, _patternList)[__privateGet(this, _index)];
  }
  /**
   * true of if pattern() returns a string
   */
  isString() {
    return typeof __privateGet(this, _patternList)[__privateGet(this, _index)] === "string";
  }
  /**
   * true of if pattern() returns GLOBSTAR
   */
  isGlobstar() {
    return __privateGet(this, _patternList)[__privateGet(this, _index)] === minimatch_1$4.GLOBSTAR;
  }
  /**
   * true if pattern() returns a regexp
   */
  isRegExp() {
    return __privateGet(this, _patternList)[__privateGet(this, _index)] instanceof RegExp;
  }
  /**
   * The /-joined set of glob parts that make up this pattern
   */
  globString() {
    return __privateSet(this, _globString, __privateGet(this, _globString) || (__privateGet(this, _index) === 0 ? this.isAbsolute() ? __privateGet(this, _globList)[0] + __privateGet(this, _globList).slice(1).join("/") : __privateGet(this, _globList).join("/") : __privateGet(this, _globList).slice(__privateGet(this, _index)).join("/")));
  }
  /**
   * true if there are more pattern parts after this one
   */
  hasMore() {
    return this.length > __privateGet(this, _index) + 1;
  }
  /**
   * The rest of the pattern after this part, or null if this is the end
   */
  rest() {
    if (__privateGet(this, _rest) !== void 0)
      return __privateGet(this, _rest);
    if (!this.hasMore())
      return __privateSet(this, _rest, null);
    __privateSet(this, _rest, new _Pattern(__privateGet(this, _patternList), __privateGet(this, _globList), __privateGet(this, _index) + 1, __privateGet(this, _platform)));
    __privateSet(__privateGet(this, _rest), _isAbsolute, __privateGet(this, _isAbsolute));
    __privateSet(__privateGet(this, _rest), _isUNC, __privateGet(this, _isUNC));
    __privateSet(__privateGet(this, _rest), _isDrive, __privateGet(this, _isDrive));
    return __privateGet(this, _rest);
  }
  /**
   * true if the pattern represents a //unc/path/ on windows
   */
  isUNC() {
    const pl = __privateGet(this, _patternList);
    return __privateGet(this, _isUNC) !== void 0 ? __privateGet(this, _isUNC) : __privateSet(this, _isUNC, __privateGet(this, _platform) === "win32" && __privateGet(this, _index) === 0 && pl[0] === "" && pl[1] === "" && typeof pl[2] === "string" && !!pl[2] && typeof pl[3] === "string" && !!pl[3]);
  }
  // pattern like C:/...
  // split = ['C:', ...]
  // XXX: would be nice to handle patterns like `c:*` to test the cwd
  // in c: for *, but I don't know of a way to even figure out what that
  // cwd is without actually chdir'ing into it?
  /**
   * True if the pattern starts with a drive letter on Windows
   */
  isDrive() {
    const pl = __privateGet(this, _patternList);
    return __privateGet(this, _isDrive) !== void 0 ? __privateGet(this, _isDrive) : __privateSet(this, _isDrive, __privateGet(this, _platform) === "win32" && __privateGet(this, _index) === 0 && this.length > 1 && typeof pl[0] === "string" && /^[a-z]:$/i.test(pl[0]));
  }
  // pattern = '/' or '/...' or '/x/...'
  // split = ['', ''] or ['', ...] or ['', 'x', ...]
  // Drive and UNC both considered absolute on windows
  /**
   * True if the pattern is rooted on an absolute path
   */
  isAbsolute() {
    const pl = __privateGet(this, _patternList);
    return __privateGet(this, _isAbsolute) !== void 0 ? __privateGet(this, _isAbsolute) : __privateSet(this, _isAbsolute, pl[0] === "" && pl.length > 1 || this.isDrive() || this.isUNC());
  }
  /**
   * consume the root of the pattern, and return it
   */
  root() {
    const p = __privateGet(this, _patternList)[0];
    return typeof p === "string" && this.isAbsolute() && __privateGet(this, _index) === 0 ? p : "";
  }
  /**
   * Check to see if the current globstar pattern is allowed to follow
   * a symbolic link.
   */
  checkFollowGlobstar() {
    return !(__privateGet(this, _index) === 0 || !this.isGlobstar() || !__privateGet(this, _followGlobstar));
  }
  /**
   * Mark that the current globstar pattern is following a symbolic link
   */
  markFollowGlobstar() {
    if (__privateGet(this, _index) === 0 || !this.isGlobstar() || !__privateGet(this, _followGlobstar))
      return false;
    __privateSet(this, _followGlobstar, false);
    return true;
  }
};
_patternList = new WeakMap();
_globList = new WeakMap();
_index = new WeakMap();
_platform = new WeakMap();
_rest = new WeakMap();
_globString = new WeakMap();
_isDrive = new WeakMap();
_isUNC = new WeakMap();
_isAbsolute = new WeakMap();
_followGlobstar = new WeakMap();
let Pattern = _Pattern;
pattern.Pattern = Pattern;
var walker = {};
var ignore = {};
Object.defineProperty(ignore, "__esModule", { value: true });
ignore.Ignore = void 0;
const minimatch_1$3 = commonjs$4;
const pattern_js_1$1 = pattern;
const defaultPlatform$1 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
class Ignore {
  constructor(ignored, { nobrace, nocase, noext, noglobstar, platform = defaultPlatform$1 }) {
    __publicField(this, "relative");
    __publicField(this, "relativeChildren");
    __publicField(this, "absolute");
    __publicField(this, "absoluteChildren");
    __publicField(this, "platform");
    __publicField(this, "mmopts");
    this.relative = [];
    this.absolute = [];
    this.relativeChildren = [];
    this.absoluteChildren = [];
    this.platform = platform;
    this.mmopts = {
      dot: true,
      nobrace,
      nocase,
      noext,
      noglobstar,
      optimizationLevel: 2,
      platform,
      nocomment: true,
      nonegate: true
    };
    for (const ign of ignored)
      this.add(ign);
  }
  add(ign) {
    const mm = new minimatch_1$3.Minimatch(ign, this.mmopts);
    for (let i = 0; i < mm.set.length; i++) {
      const parsed = mm.set[i];
      const globParts = mm.globParts[i];
      if (!parsed || !globParts) {
        throw new Error("invalid pattern object");
      }
      while (parsed[0] === "." && globParts[0] === ".") {
        parsed.shift();
        globParts.shift();
      }
      const p = new pattern_js_1$1.Pattern(parsed, globParts, 0, this.platform);
      const m = new minimatch_1$3.Minimatch(p.globString(), this.mmopts);
      const children = globParts[globParts.length - 1] === "**";
      const absolute = p.isAbsolute();
      if (absolute)
        this.absolute.push(m);
      else
        this.relative.push(m);
      if (children) {
        if (absolute)
          this.absoluteChildren.push(m);
        else
          this.relativeChildren.push(m);
      }
    }
  }
  ignored(p) {
    const fullpath = p.fullpath();
    const fullpaths = `${fullpath}/`;
    const relative2 = p.relative() || ".";
    const relatives = `${relative2}/`;
    for (const m of this.relative) {
      if (m.match(relative2) || m.match(relatives))
        return true;
    }
    for (const m of this.absolute) {
      if (m.match(fullpath) || m.match(fullpaths))
        return true;
    }
    return false;
  }
  childrenIgnored(p) {
    const fullpath = p.fullpath() + "/";
    const relative2 = (p.relative() || ".") + "/";
    for (const m of this.relativeChildren) {
      if (m.match(relative2))
        return true;
    }
    for (const m of this.absoluteChildren) {
      if (m.match(fullpath))
        return true;
    }
    return false;
  }
}
ignore.Ignore = Ignore;
var processor = {};
Object.defineProperty(processor, "__esModule", { value: true });
processor.Processor = processor.SubWalks = processor.MatchRecord = processor.HasWalkedCache = void 0;
const minimatch_1$2 = commonjs$4;
class HasWalkedCache {
  constructor(store = /* @__PURE__ */ new Map()) {
    __publicField(this, "store");
    this.store = store;
  }
  copy() {
    return new HasWalkedCache(new Map(this.store));
  }
  hasWalked(target, pattern2) {
    var _a2;
    return (_a2 = this.store.get(target.fullpath())) == null ? void 0 : _a2.has(pattern2.globString());
  }
  storeWalked(target, pattern2) {
    const fullpath = target.fullpath();
    const cached = this.store.get(fullpath);
    if (cached)
      cached.add(pattern2.globString());
    else
      this.store.set(fullpath, /* @__PURE__ */ new Set([pattern2.globString()]));
  }
}
processor.HasWalkedCache = HasWalkedCache;
class MatchRecord {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(target, absolute, ifDir) {
    const n = (absolute ? 2 : 0) | (ifDir ? 1 : 0);
    const current = this.store.get(target);
    this.store.set(target, current === void 0 ? n : n & current);
  }
  // match, absolute, ifdir
  entries() {
    return [...this.store.entries()].map(([path2, n]) => [
      path2,
      !!(n & 2),
      !!(n & 1)
    ]);
  }
}
processor.MatchRecord = MatchRecord;
class SubWalks {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(target, pattern2) {
    if (!target.canReaddir()) {
      return;
    }
    const subs = this.store.get(target);
    if (subs) {
      if (!subs.find((p) => p.globString() === pattern2.globString())) {
        subs.push(pattern2);
      }
    } else
      this.store.set(target, [pattern2]);
  }
  get(target) {
    const subs = this.store.get(target);
    if (!subs) {
      throw new Error("attempting to walk unknown path");
    }
    return subs;
  }
  entries() {
    return this.keys().map((k) => [k, this.store.get(k)]);
  }
  keys() {
    return [...this.store.keys()].filter((t) => t.canReaddir());
  }
}
processor.SubWalks = SubWalks;
class Processor {
  constructor(opts, hasWalkedCache) {
    __publicField(this, "hasWalkedCache");
    __publicField(this, "matches", new MatchRecord());
    __publicField(this, "subwalks", new SubWalks());
    __publicField(this, "patterns");
    __publicField(this, "follow");
    __publicField(this, "dot");
    __publicField(this, "opts");
    this.opts = opts;
    this.follow = !!opts.follow;
    this.dot = !!opts.dot;
    this.hasWalkedCache = hasWalkedCache ? hasWalkedCache.copy() : new HasWalkedCache();
  }
  processPatterns(target, patterns) {
    this.patterns = patterns;
    const processingSet = patterns.map((p) => [target, p]);
    for (let [t, pattern2] of processingSet) {
      this.hasWalkedCache.storeWalked(t, pattern2);
      const root = pattern2.root();
      const absolute = pattern2.isAbsolute() && this.opts.absolute !== false;
      if (root) {
        t = t.resolve(root === "/" && this.opts.root !== void 0 ? this.opts.root : root);
        const rest2 = pattern2.rest();
        if (!rest2) {
          this.matches.add(t, true, false);
          continue;
        } else {
          pattern2 = rest2;
        }
      }
      if (t.isENOENT())
        continue;
      let p;
      let rest;
      let changed = false;
      while (typeof (p = pattern2.pattern()) === "string" && (rest = pattern2.rest())) {
        const c = t.resolve(p);
        t = c;
        pattern2 = rest;
        changed = true;
      }
      p = pattern2.pattern();
      rest = pattern2.rest();
      if (changed) {
        if (this.hasWalkedCache.hasWalked(t, pattern2))
          continue;
        this.hasWalkedCache.storeWalked(t, pattern2);
      }
      if (typeof p === "string") {
        const ifDir = p === ".." || p === "" || p === ".";
        this.matches.add(t.resolve(p), absolute, ifDir);
        continue;
      } else if (p === minimatch_1$2.GLOBSTAR) {
        if (!t.isSymbolicLink() || this.follow || pattern2.checkFollowGlobstar()) {
          this.subwalks.add(t, pattern2);
        }
        const rp = rest == null ? void 0 : rest.pattern();
        const rrest = rest == null ? void 0 : rest.rest();
        if (!rest || (rp === "" || rp === ".") && !rrest) {
          this.matches.add(t, absolute, rp === "" || rp === ".");
        } else {
          if (rp === "..") {
            const tp = t.parent || t;
            if (!rrest)
              this.matches.add(tp, absolute, true);
            else if (!this.hasWalkedCache.hasWalked(tp, rrest)) {
              this.subwalks.add(tp, rrest);
            }
          }
        }
      } else if (p instanceof RegExp) {
        this.subwalks.add(t, pattern2);
      }
    }
    return this;
  }
  subwalkTargets() {
    return this.subwalks.keys();
  }
  child() {
    return new Processor(this.opts, this.hasWalkedCache);
  }
  // return a new Processor containing the subwalks for each
  // child entry, and a set of matches, and
  // a hasWalkedCache that's a copy of this one
  // then we're going to call
  filterEntries(parent, entries) {
    const patterns = this.subwalks.get(parent);
    const results = this.child();
    for (const e of entries) {
      for (const pattern2 of patterns) {
        const absolute = pattern2.isAbsolute();
        const p = pattern2.pattern();
        const rest = pattern2.rest();
        if (p === minimatch_1$2.GLOBSTAR) {
          results.testGlobstar(e, pattern2, rest, absolute);
        } else if (p instanceof RegExp) {
          results.testRegExp(e, p, rest, absolute);
        } else {
          results.testString(e, p, rest, absolute);
        }
      }
    }
    return results;
  }
  testGlobstar(e, pattern2, rest, absolute) {
    if (this.dot || !e.name.startsWith(".")) {
      if (!pattern2.hasMore()) {
        this.matches.add(e, absolute, false);
      }
      if (e.canReaddir()) {
        if (this.follow || !e.isSymbolicLink()) {
          this.subwalks.add(e, pattern2);
        } else if (e.isSymbolicLink()) {
          if (rest && pattern2.checkFollowGlobstar()) {
            this.subwalks.add(e, rest);
          } else if (pattern2.markFollowGlobstar()) {
            this.subwalks.add(e, pattern2);
          }
        }
      }
    }
    if (rest) {
      const rp = rest.pattern();
      if (typeof rp === "string" && // dots and empty were handled already
      rp !== ".." && rp !== "" && rp !== ".") {
        this.testString(e, rp, rest.rest(), absolute);
      } else if (rp === "..") {
        const ep = e.parent || e;
        this.subwalks.add(ep, rest);
      } else if (rp instanceof RegExp) {
        this.testRegExp(e, rp, rest.rest(), absolute);
      }
    }
  }
  testRegExp(e, p, rest, absolute) {
    if (!p.test(e.name))
      return;
    if (!rest) {
      this.matches.add(e, absolute, false);
    } else {
      this.subwalks.add(e, rest);
    }
  }
  testString(e, p, rest, absolute) {
    if (!e.isNamed(p))
      return;
    if (!rest) {
      this.matches.add(e, absolute, false);
    } else {
      this.subwalks.add(e, rest);
    }
  }
}
processor.Processor = Processor;
Object.defineProperty(walker, "__esModule", { value: true });
walker.GlobStream = walker.GlobWalker = walker.GlobUtil = void 0;
const minipass_1 = commonjs;
const ignore_js_1 = ignore;
const processor_js_1 = processor;
const makeIgnore = (ignore2, opts) => typeof ignore2 === "string" ? new ignore_js_1.Ignore([ignore2], opts) : Array.isArray(ignore2) ? new ignore_js_1.Ignore(ignore2, opts) : ignore2;
class GlobUtil {
  constructor(patterns, path2, opts) {
    __privateAdd(this, _GlobUtil_instances);
    __publicField(this, "path");
    __publicField(this, "patterns");
    __publicField(this, "opts");
    __publicField(this, "seen", /* @__PURE__ */ new Set());
    __publicField(this, "paused", false);
    __publicField(this, "aborted", false);
    __privateAdd(this, _onResume, []);
    __privateAdd(this, _ignore);
    __privateAdd(this, _sep);
    __publicField(this, "signal");
    __publicField(this, "maxDepth");
    __publicField(this, "includeChildMatches");
    this.patterns = patterns;
    this.path = path2;
    this.opts = opts;
    __privateSet(this, _sep, !opts.posix && opts.platform === "win32" ? "\\" : "/");
    this.includeChildMatches = opts.includeChildMatches !== false;
    if (opts.ignore || !this.includeChildMatches) {
      __privateSet(this, _ignore, makeIgnore(opts.ignore ?? [], opts));
      if (!this.includeChildMatches && typeof __privateGet(this, _ignore).add !== "function") {
        const m = "cannot ignore child matches, ignore lacks add() method.";
        throw new Error(m);
      }
    }
    this.maxDepth = opts.maxDepth || Infinity;
    if (opts.signal) {
      this.signal = opts.signal;
      this.signal.addEventListener("abort", () => {
        __privateGet(this, _onResume).length = 0;
      });
    }
  }
  // backpressure mechanism
  pause() {
    this.paused = true;
  }
  resume() {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      return;
    this.paused = false;
    let fn = void 0;
    while (!this.paused && (fn = __privateGet(this, _onResume).shift())) {
      fn();
    }
  }
  onResume(fn) {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      return;
    if (!this.paused) {
      fn();
    } else {
      __privateGet(this, _onResume).push(fn);
    }
  }
  // do the requisite realpath/stat checking, and return the path
  // to add or undefined to filter it out.
  async matchCheck(e, ifDir) {
    if (ifDir && this.opts.nodir)
      return void 0;
    let rpc;
    if (this.opts.realpath) {
      rpc = e.realpathCached() || await e.realpath();
      if (!rpc)
        return void 0;
      e = rpc;
    }
    const needStat = e.isUnknown() || this.opts.stat;
    const s = needStat ? await e.lstat() : e;
    if (this.opts.follow && this.opts.nodir && (s == null ? void 0 : s.isSymbolicLink())) {
      const target = await s.realpath();
      if (target && (target.isUnknown() || this.opts.stat)) {
        await target.lstat();
      }
    }
    return this.matchCheckTest(s, ifDir);
  }
  matchCheckTest(e, ifDir) {
    var _a2;
    return e && (this.maxDepth === Infinity || e.depth() <= this.maxDepth) && (!ifDir || e.canReaddir()) && (!this.opts.nodir || !e.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !e.isSymbolicLink() || !((_a2 = e.realpathCached()) == null ? void 0 : _a2.isDirectory())) && !__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, e) ? e : void 0;
  }
  matchCheckSync(e, ifDir) {
    if (ifDir && this.opts.nodir)
      return void 0;
    let rpc;
    if (this.opts.realpath) {
      rpc = e.realpathCached() || e.realpathSync();
      if (!rpc)
        return void 0;
      e = rpc;
    }
    const needStat = e.isUnknown() || this.opts.stat;
    const s = needStat ? e.lstatSync() : e;
    if (this.opts.follow && this.opts.nodir && (s == null ? void 0 : s.isSymbolicLink())) {
      const target = s.realpathSync();
      if (target && ((target == null ? void 0 : target.isUnknown()) || this.opts.stat)) {
        target.lstatSync();
      }
    }
    return this.matchCheckTest(s, ifDir);
  }
  matchFinish(e, absolute) {
    var _a2;
    if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, e))
      return;
    if (!this.includeChildMatches && ((_a2 = __privateGet(this, _ignore)) == null ? void 0 : _a2.add)) {
      const ign = `${e.relativePosix()}/**`;
      __privateGet(this, _ignore).add(ign);
    }
    const abs = this.opts.absolute === void 0 ? absolute : this.opts.absolute;
    this.seen.add(e);
    const mark = this.opts.mark && e.isDirectory() ? __privateGet(this, _sep) : "";
    if (this.opts.withFileTypes) {
      this.matchEmit(e);
    } else if (abs) {
      const abs2 = this.opts.posix ? e.fullpathPosix() : e.fullpath();
      this.matchEmit(abs2 + mark);
    } else {
      const rel = this.opts.posix ? e.relativePosix() : e.relative();
      const pre = this.opts.dotRelative && !rel.startsWith(".." + __privateGet(this, _sep)) ? "." + __privateGet(this, _sep) : "";
      this.matchEmit(!rel ? "." + mark : pre + rel + mark);
    }
  }
  async match(e, absolute, ifDir) {
    const p = await this.matchCheck(e, ifDir);
    if (p)
      this.matchFinish(p, absolute);
  }
  matchSync(e, absolute, ifDir) {
    const p = this.matchCheckSync(e, ifDir);
    if (p)
      this.matchFinish(p, absolute);
  }
  walkCB(target, patterns, cb) {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      cb();
    this.walkCB2(target, patterns, new processor_js_1.Processor(this.opts), cb);
  }
  walkCB2(target, patterns, processor2, cb) {
    var _a2;
    if (__privateMethod(this, _GlobUtil_instances, childrenIgnored_fn).call(this, target))
      return cb();
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      cb();
    if (this.paused) {
      this.onResume(() => this.walkCB2(target, patterns, processor2, cb));
      return;
    }
    processor2.processPatterns(target, patterns);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor2.matches.entries()) {
      if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, m))
        continue;
      tasks++;
      this.match(m, absolute, ifDir).then(() => next());
    }
    for (const t of processor2.subwalkTargets()) {
      if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
        continue;
      }
      tasks++;
      const childrenCached = t.readdirCached();
      if (t.calledReaddir())
        this.walkCB3(t, childrenCached, processor2, next);
      else {
        t.readdirCB((_, entries) => this.walkCB3(t, entries, processor2, next), true);
      }
    }
    next();
  }
  walkCB3(target, entries, processor2, cb) {
    processor2 = processor2.filterEntries(target, entries);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor2.matches.entries()) {
      if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, m))
        continue;
      tasks++;
      this.match(m, absolute, ifDir).then(() => next());
    }
    for (const [target2, patterns] of processor2.subwalks.entries()) {
      tasks++;
      this.walkCB2(target2, patterns, processor2.child(), next);
    }
    next();
  }
  walkCBSync(target, patterns, cb) {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      cb();
    this.walkCB2Sync(target, patterns, new processor_js_1.Processor(this.opts), cb);
  }
  walkCB2Sync(target, patterns, processor2, cb) {
    var _a2;
    if (__privateMethod(this, _GlobUtil_instances, childrenIgnored_fn).call(this, target))
      return cb();
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      cb();
    if (this.paused) {
      this.onResume(() => this.walkCB2Sync(target, patterns, processor2, cb));
      return;
    }
    processor2.processPatterns(target, patterns);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor2.matches.entries()) {
      if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, m))
        continue;
      this.matchSync(m, absolute, ifDir);
    }
    for (const t of processor2.subwalkTargets()) {
      if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
        continue;
      }
      tasks++;
      const children = t.readdirSync();
      this.walkCB3Sync(t, children, processor2, next);
    }
    next();
  }
  walkCB3Sync(target, entries, processor2, cb) {
    processor2 = processor2.filterEntries(target, entries);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor2.matches.entries()) {
      if (__privateMethod(this, _GlobUtil_instances, ignored_fn).call(this, m))
        continue;
      this.matchSync(m, absolute, ifDir);
    }
    for (const [target2, patterns] of processor2.subwalks.entries()) {
      tasks++;
      this.walkCB2Sync(target2, patterns, processor2.child(), next);
    }
    next();
  }
}
_onResume = new WeakMap();
_ignore = new WeakMap();
_sep = new WeakMap();
_GlobUtil_instances = new WeakSet();
ignored_fn = function(path2) {
  var _a2, _b2;
  return this.seen.has(path2) || !!((_b2 = (_a2 = __privateGet(this, _ignore)) == null ? void 0 : _a2.ignored) == null ? void 0 : _b2.call(_a2, path2));
};
childrenIgnored_fn = function(path2) {
  var _a2, _b2;
  return !!((_b2 = (_a2 = __privateGet(this, _ignore)) == null ? void 0 : _a2.childrenIgnored) == null ? void 0 : _b2.call(_a2, path2));
};
walker.GlobUtil = GlobUtil;
class GlobWalker extends GlobUtil {
  constructor(patterns, path2, opts) {
    super(patterns, path2, opts);
    __publicField(this, "matches", /* @__PURE__ */ new Set());
  }
  matchEmit(e) {
    this.matches.add(e);
  }
  async walk() {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      throw this.signal.reason;
    if (this.path.isUnknown()) {
      await this.path.lstat();
    }
    await new Promise((res, rej) => {
      this.walkCB(this.path, this.patterns, () => {
        var _a3;
        if ((_a3 = this.signal) == null ? void 0 : _a3.aborted) {
          rej(this.signal.reason);
        } else {
          res(this.matches);
        }
      });
    });
    return this.matches;
  }
  walkSync() {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      throw this.signal.reason;
    if (this.path.isUnknown()) {
      this.path.lstatSync();
    }
    this.walkCBSync(this.path, this.patterns, () => {
      var _a3;
      if ((_a3 = this.signal) == null ? void 0 : _a3.aborted)
        throw this.signal.reason;
    });
    return this.matches;
  }
}
walker.GlobWalker = GlobWalker;
class GlobStream extends GlobUtil {
  constructor(patterns, path2, opts) {
    super(patterns, path2, opts);
    __publicField(this, "results");
    this.results = new minipass_1.Minipass({
      signal: this.signal,
      objectMode: true
    });
    this.results.on("drain", () => this.resume());
    this.results.on("resume", () => this.resume());
  }
  matchEmit(e) {
    this.results.write(e);
    if (!this.results.flowing)
      this.pause();
  }
  stream() {
    const target = this.path;
    if (target.isUnknown()) {
      target.lstat().then(() => {
        this.walkCB(target, this.patterns, () => this.results.end());
      });
    } else {
      this.walkCB(target, this.patterns, () => this.results.end());
    }
    return this.results;
  }
  streamSync() {
    if (this.path.isUnknown()) {
      this.path.lstatSync();
    }
    this.walkCBSync(this.path, this.patterns, () => this.results.end());
    return this.results;
  }
}
walker.GlobStream = GlobStream;
Object.defineProperty(glob$1, "__esModule", { value: true });
glob$1.Glob = void 0;
const minimatch_1$1 = commonjs$4;
const node_url_1 = require$$1;
const path_scurry_1 = commonjs$2;
const pattern_js_1 = pattern;
const walker_js_1 = walker;
const defaultPlatform = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
class Glob {
  /**
   * All options are stored as properties on the `Glob` object.
   *
   * See {@link GlobOptions} for full options descriptions.
   *
   * Note that a previous `Glob` object can be passed as the
   * `GlobOptions` to another `Glob` instantiation to re-use settings
   * and caches with a new pattern.
   *
   * Traversal functions can be called multiple times to run the walk
   * again.
   */
  constructor(pattern2, opts) {
    __publicField(this, "absolute");
    __publicField(this, "cwd");
    __publicField(this, "root");
    __publicField(this, "dot");
    __publicField(this, "dotRelative");
    __publicField(this, "follow");
    __publicField(this, "ignore");
    __publicField(this, "magicalBraces");
    __publicField(this, "mark");
    __publicField(this, "matchBase");
    __publicField(this, "maxDepth");
    __publicField(this, "nobrace");
    __publicField(this, "nocase");
    __publicField(this, "nodir");
    __publicField(this, "noext");
    __publicField(this, "noglobstar");
    __publicField(this, "pattern");
    __publicField(this, "platform");
    __publicField(this, "realpath");
    __publicField(this, "scurry");
    __publicField(this, "stat");
    __publicField(this, "signal");
    __publicField(this, "windowsPathsNoEscape");
    __publicField(this, "withFileTypes");
    __publicField(this, "includeChildMatches");
    /**
     * The options provided to the constructor.
     */
    __publicField(this, "opts");
    /**
     * An array of parsed immutable {@link Pattern} objects.
     */
    __publicField(this, "patterns");
    if (!opts)
      throw new TypeError("glob options required");
    this.withFileTypes = !!opts.withFileTypes;
    this.signal = opts.signal;
    this.follow = !!opts.follow;
    this.dot = !!opts.dot;
    this.dotRelative = !!opts.dotRelative;
    this.nodir = !!opts.nodir;
    this.mark = !!opts.mark;
    if (!opts.cwd) {
      this.cwd = "";
    } else if (opts.cwd instanceof URL || opts.cwd.startsWith("file://")) {
      opts.cwd = (0, node_url_1.fileURLToPath)(opts.cwd);
    }
    this.cwd = opts.cwd || "";
    this.root = opts.root;
    this.magicalBraces = !!opts.magicalBraces;
    this.nobrace = !!opts.nobrace;
    this.noext = !!opts.noext;
    this.realpath = !!opts.realpath;
    this.absolute = opts.absolute;
    this.includeChildMatches = opts.includeChildMatches !== false;
    this.noglobstar = !!opts.noglobstar;
    this.matchBase = !!opts.matchBase;
    this.maxDepth = typeof opts.maxDepth === "number" ? opts.maxDepth : Infinity;
    this.stat = !!opts.stat;
    this.ignore = opts.ignore;
    if (this.withFileTypes && this.absolute !== void 0) {
      throw new Error("cannot set absolute and withFileTypes:true");
    }
    if (typeof pattern2 === "string") {
      pattern2 = [pattern2];
    }
    this.windowsPathsNoEscape = !!opts.windowsPathsNoEscape || opts.allowWindowsEscape === false;
    if (this.windowsPathsNoEscape) {
      pattern2 = pattern2.map((p) => p.replace(/\\/g, "/"));
    }
    if (this.matchBase) {
      if (opts.noglobstar) {
        throw new TypeError("base matching requires globstar");
      }
      pattern2 = pattern2.map((p) => p.includes("/") ? p : `./**/${p}`);
    }
    this.pattern = pattern2;
    this.platform = opts.platform || defaultPlatform;
    this.opts = { ...opts, platform: this.platform };
    if (opts.scurry) {
      this.scurry = opts.scurry;
      if (opts.nocase !== void 0 && opts.nocase !== opts.scurry.nocase) {
        throw new Error("nocase option contradicts provided scurry option");
      }
    } else {
      const Scurry = opts.platform === "win32" ? path_scurry_1.PathScurryWin32 : opts.platform === "darwin" ? path_scurry_1.PathScurryDarwin : opts.platform ? path_scurry_1.PathScurryPosix : path_scurry_1.PathScurry;
      this.scurry = new Scurry(this.cwd, {
        nocase: opts.nocase,
        fs: opts.fs
      });
    }
    this.nocase = this.scurry.nocase;
    const nocaseMagicOnly = this.platform === "darwin" || this.platform === "win32";
    const mmo = {
      // default nocase based on platform
      ...opts,
      dot: this.dot,
      matchBase: this.matchBase,
      nobrace: this.nobrace,
      nocase: this.nocase,
      nocaseMagicOnly,
      nocomment: true,
      noext: this.noext,
      nonegate: true,
      optimizationLevel: 2,
      platform: this.platform,
      windowsPathsNoEscape: this.windowsPathsNoEscape,
      debug: !!this.opts.debug
    };
    const mms = this.pattern.map((p) => new minimatch_1$1.Minimatch(p, mmo));
    const [matchSet, globParts] = mms.reduce((set, m) => {
      set[0].push(...m.set);
      set[1].push(...m.globParts);
      return set;
    }, [[], []]);
    this.patterns = matchSet.map((set, i) => {
      const g = globParts[i];
      if (!g)
        throw new Error("invalid pattern object");
      return new pattern_js_1.Pattern(set, g, 0, this.platform);
    });
  }
  async walk() {
    return [
      ...await new walker_js_1.GlobWalker(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches
      }).walk()
    ];
  }
  walkSync() {
    return [
      ...new walker_js_1.GlobWalker(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches
      }).walkSync()
    ];
  }
  stream() {
    return new walker_js_1.GlobStream(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).stream();
  }
  streamSync() {
    return new walker_js_1.GlobStream(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).streamSync();
  }
  /**
   * Default sync iteration function. Returns a Generator that
   * iterates over the results.
   */
  iterateSync() {
    return this.streamSync()[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  /**
   * Default async iteration function. Returns an AsyncGenerator that
   * iterates over the results.
   */
  iterate() {
    return this.stream()[Symbol.asyncIterator]();
  }
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
}
glob$1.Glob = Glob;
var hasMagic$1 = {};
Object.defineProperty(hasMagic$1, "__esModule", { value: true });
hasMagic$1.hasMagic = void 0;
const minimatch_1 = commonjs$4;
const hasMagic = (pattern2, options = {}) => {
  if (!Array.isArray(pattern2)) {
    pattern2 = [pattern2];
  }
  for (const p of pattern2) {
    if (new minimatch_1.Minimatch(p, options).hasMagic())
      return true;
  }
  return false;
};
hasMagic$1.hasMagic = hasMagic;
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.glob = exports2.sync = exports2.iterate = exports2.iterateSync = exports2.stream = exports2.streamSync = exports2.Ignore = exports2.hasMagic = exports2.Glob = exports2.unescape = exports2.escape = void 0;
  exports2.globStreamSync = globStreamSync;
  exports2.globStream = globStream;
  exports2.globSync = globSync;
  exports2.globIterateSync = globIterateSync;
  exports2.globIterate = globIterate;
  const minimatch_12 = commonjs$4;
  const glob_js_1 = glob$1;
  const has_magic_js_1 = hasMagic$1;
  var minimatch_2 = commonjs$4;
  Object.defineProperty(exports2, "escape", { enumerable: true, get: function() {
    return minimatch_2.escape;
  } });
  Object.defineProperty(exports2, "unescape", { enumerable: true, get: function() {
    return minimatch_2.unescape;
  } });
  var glob_js_2 = glob$1;
  Object.defineProperty(exports2, "Glob", { enumerable: true, get: function() {
    return glob_js_2.Glob;
  } });
  var has_magic_js_2 = hasMagic$1;
  Object.defineProperty(exports2, "hasMagic", { enumerable: true, get: function() {
    return has_magic_js_2.hasMagic;
  } });
  var ignore_js_12 = ignore;
  Object.defineProperty(exports2, "Ignore", { enumerable: true, get: function() {
    return ignore_js_12.Ignore;
  } });
  function globStreamSync(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).streamSync();
  }
  function globStream(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).stream();
  }
  function globSync(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).walkSync();
  }
  async function glob_(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).walk();
  }
  function globIterateSync(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).iterateSync();
  }
  function globIterate(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).iterate();
  }
  exports2.streamSync = globStreamSync;
  exports2.stream = Object.assign(globStream, { sync: globStreamSync });
  exports2.iterateSync = globIterateSync;
  exports2.iterate = Object.assign(globIterate, {
    sync: globIterateSync
  });
  exports2.sync = Object.assign(globSync, {
    stream: globStreamSync,
    iterate: globIterateSync
  });
  exports2.glob = Object.assign(glob_, {
    glob: glob_,
    globSync,
    sync: exports2.sync,
    globStream,
    stream: exports2.stream,
    globStreamSync,
    streamSync: exports2.streamSync,
    globIterate,
    iterate: exports2.iterate,
    globIterateSync,
    iterateSync: exports2.iterateSync,
    Glob: glob_js_1.Glob,
    hasMagic: has_magic_js_1.hasMagic,
    escape: minimatch_12.escape,
    unescape: minimatch_12.unescape
  });
  exports2.glob.glob = exports2.glob;
})(commonjs$3);
const path = require$$0;
const getName = lib$4;
const { minimatch } = commonjs$4;
const rpj = lib$1;
const { glob } = commonjs$3;
function appendNegatedPatterns(allPatterns) {
  const patterns = [];
  const negatedPatterns = [];
  for (let pattern2 of allPatterns) {
    const excl = pattern2.match(/^!+/);
    if (excl) {
      pattern2 = pattern2.slice(excl[0].length);
    }
    pattern2 = pattern2.replace(/^\.?\/+/, "");
    const negate = excl && excl[0].length % 2 === 1;
    if (negate) {
      negatedPatterns.push(pattern2);
    } else {
      for (let i = 0; i < negatedPatterns.length; ++i) {
        const negatedPattern = negatedPatterns[i];
        if (minimatch(pattern2, negatedPattern)) {
          negatedPatterns.splice(i, 1);
        }
      }
      patterns.push(pattern2);
    }
  }
  for (const negated of negatedPatterns) {
    for (const pattern2 of minimatch.match(patterns, negated)) {
      patterns.splice(patterns.indexOf(pattern2), 1);
    }
  }
  return { patterns, negatedPatterns };
}
function getPatterns(workspaces) {
  const workspacesDeclaration = Array.isArray(workspaces.packages) ? workspaces.packages : workspaces;
  if (!Array.isArray(workspacesDeclaration)) {
    throw getError({
      message: "workspaces config expects an Array",
      code: "EWORKSPACESCONFIG"
    });
  }
  return appendNegatedPatterns(workspacesDeclaration);
}
function getPackageName(pkg, pathname) {
  const { name } = pkg;
  return name || getName(pathname);
}
function pkgPathmame(opts) {
  return (...args) => {
    const cwd = opts.cwd ? opts.cwd : process.cwd();
    return path.join.apply(null, [cwd, ...args]);
  };
}
function getGlobPattern(pattern2) {
  pattern2 = pattern2.replace(/\\/g, "/");
  return pattern2.endsWith("/") ? pattern2 : `${pattern2}/`;
}
function getError({ Type = TypeError, message, code }) {
  return Object.assign(new Type(message), { code });
}
function reverseResultMap(map) {
  return new Map(Array.from(map, (item) => item.reverse()));
}
async function mapWorkspaces(opts = {}) {
  if (!opts || !opts.pkg) {
    throw getError({
      message: "mapWorkspaces missing pkg info",
      code: "EMAPWORKSPACESPKG"
    });
  }
  const { workspaces = [] } = opts.pkg;
  const { patterns, negatedPatterns } = getPatterns(workspaces);
  const results = /* @__PURE__ */ new Map();
  const seen = /* @__PURE__ */ new Map();
  if (!patterns.length && !negatedPatterns.length) {
    return results;
  }
  const getGlobOpts = () => ({
    ...opts,
    ignore: [
      ...opts.ignore || [],
      "**/node_modules/**",
      // just ignore the negated patterns to avoid unnecessary crawling
      ...negatedPatterns
    ]
  });
  const getPackagePathname = pkgPathmame(opts);
  let matches = await glob(patterns.map((p) => getGlobPattern(p)), getGlobOpts());
  matches = matches.sort((a, b) => a.localeCompare(b, "en"));
  const orderedMatches = [];
  for (const pattern2 of patterns) {
    orderedMatches.push(...matches.filter((m) => {
      return minimatch(m, pattern2, { partial: true, windowsPathsNoEscape: true });
    }));
  }
  for (const match of orderedMatches) {
    let pkg;
    const packageJsonPathname = getPackagePathname(match, "package.json");
    try {
      pkg = await rpj(packageJsonPathname);
    } catch (err) {
      if (err.code === "ENOENT") {
        continue;
      } else {
        throw err;
      }
    }
    const packagePathname = path.dirname(packageJsonPathname);
    const name = getPackageName(pkg, packagePathname);
    let seenPackagePathnames = seen.get(name);
    if (!seenPackagePathnames) {
      seenPackagePathnames = /* @__PURE__ */ new Set();
      seen.set(name, seenPackagePathnames);
    }
    seenPackagePathnames.add(packagePathname);
  }
  const errorMessageArray = ["must not have multiple workspaces with the same name"];
  for (const [packageName, seenPackagePathnames] of seen) {
    if (seenPackagePathnames.size > 1) {
      addDuplicateErrorMessages(errorMessageArray, packageName, seenPackagePathnames);
    } else {
      results.set(packageName, seenPackagePathnames.values().next().value);
    }
  }
  if (errorMessageArray.length > 1) {
    throw getError({
      Type: Error,
      message: errorMessageArray.join("\n"),
      code: "EDUPLICATEWORKSPACE"
    });
  }
  return results;
}
function addDuplicateErrorMessages(messageArray, packageName, packagePathnames) {
  messageArray.push(
    `package '${packageName}' has conflicts in the following paths:`
  );
  for (const packagePathname of packagePathnames) {
    messageArray.push(
      "    " + packagePathname
    );
  }
}
mapWorkspaces.virtual = function(opts = {}) {
  if (!opts || !opts.lockfile) {
    throw getError({
      message: "mapWorkspaces.virtual missing lockfile info",
      code: "EMAPWORKSPACESLOCKFILE"
    });
  }
  const { packages = {} } = opts.lockfile;
  const { workspaces = [] } = packages[""] || {};
  const results = /* @__PURE__ */ new Map();
  const { patterns, negatedPatterns } = getPatterns(workspaces);
  if (!patterns.length && !negatedPatterns.length) {
    return results;
  }
  negatedPatterns.push("**/node_modules/**");
  const packageKeys = Object.keys(packages);
  for (const pattern2 of negatedPatterns) {
    for (const packageKey of minimatch.match(packageKeys, pattern2)) {
      packageKeys.splice(packageKeys.indexOf(packageKey), 1);
    }
  }
  const getPackagePathname = pkgPathmame(opts);
  for (const pattern2 of patterns) {
    for (const packageKey of minimatch.match(packageKeys, pattern2)) {
      const packagePathname = getPackagePathname(packageKey);
      const name = getPackageName(packages[packageKey], packagePathname);
      results.set(packagePathname, name);
    }
  }
  return reverseResultMap(results);
};
var lib = mapWorkspaces;
const mapWorkspaces$1 = /* @__PURE__ */ getDefaultExportFromCjs(lib);
async function run(cwd, context) {
  var _a2;
  console.log("publish-node-package-action", "1.13.0");
  const owner = (_a2 = context.payload.repository) == null ? void 0 : _a2.owner.login;
  if (!owner) {
    throw new Error("No owner found in context");
  }
  const pkg = JSON.parse(fs.readFileSync(require$$0.join(cwd, "/package.json"), "utf-8"));
  const workspaces = await mapWorkspaces$1({ pkg, cwd });
  Object.values(workspaces).forEach((workspace) => {
    const file = require$$0.join(workspace, "/package.json");
    const pkg2 = JSON.parse(fs.readFileSync(file, "utf-8"));
    const underlineName = pkg2.name.replace(/@(.*)\/(.*)/, "$1__$2");
    pkg2.name = "@" + owner + "/" + underlineName;
    fs.writeFileSync(file, JSON.stringify(pkg2), "utf-8");
  });
  return "";
}
module.exports = run;
