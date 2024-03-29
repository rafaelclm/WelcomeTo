(function (t) {
    t.Parse = t.Parse || {}, t.Parse.VERSION = "js1.2.16"
})(this),
function () {
    var t = this,
        e = t._,
        n = {}, i = Array.prototype,
        r = Object.prototype,
        s = Function.prototype,
        a = i.push,
        o = i.slice,
        u = i.concat,
        c = r.toString,
        l = r.hasOwnProperty,
        h = i.forEach,
        f = i.map,
        d = i.reduce,
        p = i.reduceRight,
        _ = i.filter,
        m = i.every,
        v = i.some,
        g = i.indexOf,
        y = i.lastIndexOf,
        b = Array.isArray,
        O = Object.keys,
        w = s.bind,
        E = function (t) {
            return t instanceof E ? t : this instanceof E ? (this._wrapped = t, void 0) : new E(t)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = E), exports._ = E) : t._ = E, E.VERSION = "1.4.4";
    var x = E.each = E.forEach = function (t, e, i) {
        if (null != t)
            if (h && t.forEach === h) t.forEach(e, i);
            else if (t.length === +t.length) {
            for (var r = 0, s = t.length; s > r; r++)
                if (e.call(i, t[r], r, t) === n) return
        } else
            for (var a in t)
                if (E.has(t, a) && e.call(i, t[a], a, t) === n) return
    };
    E.map = E.collect = function (t, e, n) {
        var i = [];
        return null == t ? i : f && t.map === f ? t.map(e, n) : (x(t, function (t, r, s) {
            i[i.length] = e.call(n, t, r, s)
        }), i)
    };
    var S = "Reduce of empty array with no initial value";
    E.reduce = E.foldl = E.inject = function (t, e, n, i) {
        var r = arguments.length > 2;
        if (null == t && (t = []), d && t.reduce === d) return i && (e = E.bind(e, i)), r ? t.reduce(e, n) : t.reduce(e);
        if (x(t, function (t, s, a) {
            r ? n = e.call(i, n, t, s, a) : (n = t, r = !0)
        }), !r) throw new TypeError(S);
        return n
    }, E.reduceRight = E.foldr = function (t, e, n, i) {
        var r = arguments.length > 2;
        if (null == t && (t = []), p && t.reduceRight === p) return i && (e = E.bind(e, i)), r ? t.reduceRight(e, n) : t.reduceRight(e);
        var s = t.length;
        if (s !== +s) {
            var a = E.keys(t);
            s = a.length
        }
        if (x(t, function (o, u, c) {
            u = a ? a[--s] : --s, r ? n = e.call(i, n, t[u], u, c) : (n = t[u], r = !0)
        }), !r) throw new TypeError(S);
        return n
    }, E.find = E.detect = function (t, e, n) {
        var i;
        return A(t, function (t, r, s) {
            return e.call(n, t, r, s) ? (i = t, !0) : void 0
        }), i
    }, E.filter = E.select = function (t, e, n) {
        var i = [];
        return null == t ? i : _ && t.filter === _ ? t.filter(e, n) : (x(t, function (t, r, s) {
            e.call(n, t, r, s) && (i[i.length] = t)
        }), i)
    }, E.reject = function (t, e, n) {
        return E.filter(t, function (t, i, r) {
            return !e.call(n, t, i, r)
        }, n)
    }, E.every = E.all = function (t, e, i) {
        e || (e = E.identity);
        var r = !0;
        return null == t ? r : m && t.every === m ? t.every(e, i) : (x(t, function (t, s, a) {
            return (r = r && e.call(i, t, s, a)) ? void 0 : n
        }), !! r)
    };
    var A = E.some = E.any = function (t, e, i) {
        e || (e = E.identity);
        var r = !1;
        return null == t ? r : v && t.some === v ? t.some(e, i) : (x(t, function (t, s, a) {
            return r || (r = e.call(i, t, s, a)) ? n : void 0
        }), !! r)
    };
    E.contains = E.include = function (t, e) {
        return null == t ? !1 : g && t.indexOf === g ? -1 != t.indexOf(e) : A(t, function (t) {
            return t === e
        })
    }, E.invoke = function (t, e) {
        var n = o.call(arguments, 2),
            i = E.isFunction(e);
        return E.map(t, function (t) {
            return (i ? e : t[e]).apply(t, n)
        })
    }, E.pluck = function (t, e) {
        return E.map(t, function (t) {
            return t[e]
        })
    }, E.where = function (t, e, n) {
        return E.isEmpty(e) ? n ? null : [] : E[n ? "find" : "filter"](t, function (t) {
            for (var n in e)
                if (e[n] !== t[n]) return !1;
            return !0
        })
    }, E.findWhere = function (t, e) {
        return E.where(t, e, !0)
    }, E.max = function (t, e, n) {
        if (!e && E.isArray(t) && t[0] === +t[0] && 65535 > t.length) return Math.max.apply(Math, t);
        if (!e && E.isEmpty(t)) return -1 / 0;
        var i = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return x(t, function (t, r, s) {
            var a = e ? e.call(n, t, r, s) : t;
            a >= i.computed && (i = {
                value: t,
                computed: a
            })
        }), i.value
    }, E.min = function (t, e, n) {
        if (!e && E.isArray(t) && t[0] === +t[0] && 65535 > t.length) return Math.min.apply(Math, t);
        if (!e && E.isEmpty(t)) return 1 / 0;
        var i = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return x(t, function (t, r, s) {
            var a = e ? e.call(n, t, r, s) : t;
            i.computed > a && (i = {
                value: t,
                computed: a
            })
        }), i.value
    }, E.shuffle = function (t) {
        var e, n = 0,
            i = [];
        return x(t, function (t) {
            e = E.random(n++), i[n - 1] = i[e], i[e] = t
        }), i
    };
    var N = function (t) {
        return E.isFunction(t) ? t : function (e) {
            return e[t]
        }
    };
    E.sortBy = function (t, e, n) {
        var i = N(e);
        return E.pluck(E.map(t, function (t, e, r) {
            return {
                value: t,
                index: e,
                criteria: i.call(n, t, e, r)
            }
        }).sort(function (t, e) {
            var n = t.criteria,
                i = e.criteria;
            if (n !== i) {
                if (n > i || void 0 === n) return 1;
                if (i > n || void 0 === i) return -1
            }
            return t.index < e.index ? -1 : 1
        }), "value")
    };
    var j = function (t, e, n, i) {
        var r = {}, s = N(e || E.identity);
        return x(t, function (e, a) {
            var o = s.call(n, e, a, t);
            i(r, o, e)
        }), r
    };
    E.groupBy = function (t, e, n) {
        return j(t, e, n, function (t, e, n) {
            (E.has(t, e) ? t[e] : t[e] = []).push(n)
        })
    }, E.countBy = function (t, e, n) {
        return j(t, e, n, function (t, e) {
            E.has(t, e) || (t[e] = 0), t[e]++
        })
    }, E.sortedIndex = function (t, e, n, i) {
        n = null == n ? E.identity : N(n);
        for (var r = n.call(i, e), s = 0, a = t.length; a > s;) {
            var o = s + a >>> 1;
            r > n.call(i, t[o]) ? s = o + 1 : a = o
        }
        return s
    }, E.toArray = function (t) {
        return t ? E.isArray(t) ? o.call(t) : t.length === +t.length ? E.map(t, E.identity) : E.values(t) : []
    }, E.size = function (t) {
        return null == t ? 0 : t.length === +t.length ? t.length : E.keys(t).length
    }, E.first = E.head = E.take = function (t, e, n) {
        return null == t ? void 0 : null == e || n ? t[0] : o.call(t, 0, e)
    }, E.initial = function (t, e, n) {
        return o.call(t, 0, t.length - (null == e || n ? 1 : e))
    }, E.last = function (t, e, n) {
        return null == t ? void 0 : null == e || n ? t[t.length - 1] : o.call(t, Math.max(t.length - e, 0))
    }, E.rest = E.tail = E.drop = function (t, e, n) {
        return o.call(t, null == e || n ? 1 : e)
    }, E.compact = function (t) {
        return E.filter(t, E.identity)
    };
    var P = function (t, e, n) {
        return x(t, function (t) {
            E.isArray(t) ? e ? a.apply(n, t) : P(t, e, n) : n.push(t)
        }), n
    };
    E.flatten = function (t, e) {
        return P(t, e, [])
    }, E.without = function (t) {
        return E.difference(t, o.call(arguments, 1))
    }, E.uniq = E.unique = function (t, e, n, i) {
        E.isFunction(e) && (i = n, n = e, e = !1);
        var r = n ? E.map(t, n, i) : t,
            s = [],
            a = [];
        return x(r, function (n, i) {
            (e ? i && a[a.length - 1] === n : E.contains(a, n)) || (a.push(n), s.push(t[i]))
        }), s
    }, E.union = function () {
        return E.uniq(u.apply(i, arguments))
    }, E.intersection = function (t) {
        var e = o.call(arguments, 1);
        return E.filter(E.uniq(t), function (t) {
            return E.every(e, function (e) {
                return E.indexOf(e, t) >= 0
            })
        })
    }, E.difference = function (t) {
        var e = u.apply(i, o.call(arguments, 1));
        return E.filter(t, function (t) {
            return !E.contains(e, t)
        })
    }, E.zip = function () {
        for (var t = o.call(arguments), e = E.max(E.pluck(t, "length")), n = Array(e), i = 0; e > i; i++) n[i] = E.pluck(t, "" + i);
        return n
    }, E.object = function (t, e) {
        if (null == t) return {};
        for (var n = {}, i = 0, r = t.length; r > i; i++) e ? n[t[i]] = e[i] : n[t[i][0]] = t[i][1];
        return n
    }, E.indexOf = function (t, e, n) {
        if (null == t) return -1;
        var i = 0,
            r = t.length;
        if (n) {
            if ("number" != typeof n) return i = E.sortedIndex(t, e), t[i] === e ? i : -1;
            i = 0 > n ? Math.max(0, r + n) : n
        }
        if (g && t.indexOf === g) return t.indexOf(e, n);
        for (; r > i; i++)
            if (t[i] === e) return i;
        return -1
    }, E.lastIndexOf = function (t, e, n) {
        if (null == t) return -1;
        var i = null != n;
        if (y && t.lastIndexOf === y) return i ? t.lastIndexOf(e, n) : t.lastIndexOf(e);
        for (var r = i ? n : t.length; r--;)
            if (t[r] === e) return r;
        return -1
    }, E.range = function (t, e, n) {
        1 >= arguments.length && (e = t || 0, t = 0), n = arguments[2] || 1;
        for (var i = Math.max(Math.ceil((e - t) / n), 0), r = 0, s = Array(i); i > r;) s[r++] = t, t += n;
        return s
    }, E.bind = function (t, e) {
        if (t.bind === w && w) return w.apply(t, o.call(arguments, 1));
        var n = o.call(arguments, 2);
        return function () {
            return t.apply(e, n.concat(o.call(arguments)))
        }
    }, E.partial = function (t) {
        var e = o.call(arguments, 1);
        return function () {
            return t.apply(this, e.concat(o.call(arguments)))
        }
    }, E.bindAll = function (t) {
        var e = o.call(arguments, 1);
        return 0 === e.length && (e = E.functions(t)), x(e, function (e) {
            t[e] = E.bind(t[e], t)
        }), t
    }, E.memoize = function (t, e) {
        var n = {};
        return e || (e = E.identity),
        function () {
            var i = e.apply(this, arguments);
            return E.has(n, i) ? n[i] : n[i] = t.apply(this, arguments)
        }
    }, E.delay = function (t, e) {
        var n = o.call(arguments, 2);
        return setTimeout(function () {
            return t.apply(null, n)
        }, e)
    }, E.defer = function (t) {
        return E.delay.apply(E, [t, 1].concat(o.call(arguments, 1)))
    }, E.throttle = function (t, e) {
        var n, i, r, s, a = 0,
            o = function () {
                a = new Date, r = null, s = t.apply(n, i)
            };
        return function () {
            var u = new Date,
                c = e - (u - a);
            return n = this, i = arguments, 0 >= c ? (clearTimeout(r), r = null, a = u, s = t.apply(n, i)) : r || (r = setTimeout(o, c)), s
        }
    }, E.debounce = function (t, e, n) {
        var i, r;
        return function () {
            var s = this,
                a = arguments,
                o = function () {
                    i = null, n || (r = t.apply(s, a))
                }, u = n && !i;
            return clearTimeout(i), i = setTimeout(o, e), u && (r = t.apply(s, a)), r
        }
    }, E.once = function (t) {
        var e, n = !1;
        return function () {
            return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e)
        }
    }, E.wrap = function (t, e) {
        return function () {
            var n = [t];
            return a.apply(n, arguments), e.apply(this, n)
        }
    }, E.compose = function () {
        var t = arguments;
        return function () {
            for (var e = arguments, n = t.length - 1; n >= 0; n--) e = [t[n].apply(this, e)];
            return e[0]
        }
    }, E.after = function (t, e) {
        return 0 >= t ? e() : function () {
            return 1 > --t ? e.apply(this, arguments) : void 0
        }
    }, E.keys = O || function (t) {
        if (t !== Object(t)) throw new TypeError("Invalid object");
        var e = [];
        for (var n in t) E.has(t, n) && (e[e.length] = n);
        return e
    }, E.values = function (t) {
        var e = [];
        for (var n in t) E.has(t, n) && e.push(t[n]);
        return e
    }, E.pairs = function (t) {
        var e = [];
        for (var n in t) E.has(t, n) && e.push([n, t[n]]);
        return e
    }, E.invert = function (t) {
        var e = {};
        for (var n in t) E.has(t, n) && (e[t[n]] = n);
        return e
    }, E.functions = E.methods = function (t) {
        var e = [];
        for (var n in t) E.isFunction(t[n]) && e.push(n);
        return e.sort()
    }, E.extend = function (t) {
        return x(o.call(arguments, 1), function (e) {
            if (e)
                for (var n in e) t[n] = e[n]
        }), t
    }, E.pick = function (t) {
        var e = {}, n = u.apply(i, o.call(arguments, 1));
        return x(n, function (n) {
            n in t && (e[n] = t[n])
        }), e
    }, E.omit = function (t) {
        var e = {}, n = u.apply(i, o.call(arguments, 1));
        for (var r in t) E.contains(n, r) || (e[r] = t[r]);
        return e
    }, E.defaults = function (t) {
        return x(o.call(arguments, 1), function (e) {
            if (e)
                for (var n in e) null == t[n] && (t[n] = e[n])
        }), t
    }, E.clone = function (t) {
        return E.isObject(t) ? E.isArray(t) ? t.slice() : E.extend({}, t) : t
    }, E.tap = function (t, e) {
        return e(t), t
    };
    var C = function (t, e, n, i) {
        if (t === e) return 0 !== t || 1 / t == 1 / e;
        if (null == t || null == e) return t === e;
        t instanceof E && (t = t._wrapped), e instanceof E && (e = e._wrapped);
        var r = c.call(t);
        if (r != c.call(e)) return !1;
        switch (r) {
        case "[object String]":
            return t == e + "";
        case "[object Number]":
            return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
        case "[object Date]":
        case "[object Boolean]":
            return +t == +e;
        case "[object RegExp]":
            return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
        }
        if ("object" != typeof t || "object" != typeof e) return !1;
        for (var s = n.length; s--;)
            if (n[s] == t) return i[s] == e;
        n.push(t), i.push(e);
        var a = 0,
            o = !0;
        if ("[object Array]" == r) {
            if (a = t.length, o = a == e.length)
                for (; a-- && (o = C(t[a], e[a], n, i)););
        } else {
            var u = t.constructor,
                l = e.constructor;
            if (u !== l && !(E.isFunction(u) && u instanceof u && E.isFunction(l) && l instanceof l)) return !1;
            for (var h in t)
                if (E.has(t, h) && (a++, !(o = E.has(e, h) && C(t[h], e[h], n, i)))) break;
            if (o) {
                for (h in e)
                    if (E.has(e, h) && !a--) break;
                o = !a
            }
        }
        return n.pop(), i.pop(), o
    };
    E.isEqual = function (t, e) {
        return C(t, e, [], [])
    }, E.isEmpty = function (t) {
        if (null == t) return !0;
        if (E.isArray(t) || E.isString(t)) return 0 === t.length;
        for (var e in t)
            if (E.has(t, e)) return !1;
        return !0
    }, E.isElement = function (t) {
        return !(!t || 1 !== t.nodeType)
    }, E.isArray = b || function (t) {
        return "[object Array]" == c.call(t)
    }, E.isObject = function (t) {
        return t === Object(t)
    }, x(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (t) {
        E["is" + t] = function (e) {
            return c.call(e) == "[object " + t + "]"
        }
    }), E.isArguments(arguments) || (E.isArguments = function (t) {
        return !(!t || !E.has(t, "callee"))
    }), E.isFunction = function (t) {
        return "function" == typeof t
    }, E.isFinite = function (t) {
        return isFinite(t) && !isNaN(parseFloat(t))
    }, E.isNaN = function (t) {
        return E.isNumber(t) && t != +t
    }, E.isBoolean = function (t) {
        return t === !0 || t === !1 || "[object Boolean]" == c.call(t)
    }, E.isNull = function (t) {
        return null === t
    }, E.isUndefined = function (t) {
        return void 0 === t
    }, E.has = function (t, e) {
        return l.call(t, e)
    }, E.noConflict = function () {
        return t._ = e, this
    }, E.identity = function (t) {
        return t
    }, E.times = function (t, e, n) {
        for (var i = Array(t), r = 0; t > r; r++) i[r] = e.call(n, r);
        return i
    }, E.random = function (t, e) {
        return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    };
    var R = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    R.unescape = E.invert(R.escape);
    var I = {
        escape: RegExp("[" + E.keys(R.escape).join("") + "]", "g"),
        unescape: RegExp("(" + E.keys(R.unescape).join("|") + ")", "g")
    };
    E.each(["escape", "unescape"], function (t) {
        E[t] = function (e) {
            return null == e ? "" : ("" + e).replace(I[t], function (e) {
                return R[t][e]
            })
        }
    }), E.result = function (t, e) {
        if (null == t) return null;
        var n = t[e];
        return E.isFunction(n) ? n.call(t) : n
    }, E.mixin = function (t) {
        x(E.functions(t), function (e) {
            var n = E[e] = t[e];
            E.prototype[e] = function () {
                var t = [this._wrapped];
                return a.apply(t, arguments), M.call(this, n.apply(E, t))
            }
        })
    };
    var U = 0;
    E.uniqueId = function (t) {
        var e = ++U + "";
        return t ? t + e : e
    }, E.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var T = /(.)^/,
        k = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    E.template = function (t, e, n) {
        var i;
        n = E.defaults({}, n, E.templateSettings);
        var r = RegExp([(n.escape || T).source, (n.interpolate || T).source, (n.evaluate || T).source].join("|") + "|$", "g"),
            s = 0,
            a = "__p+='";
        t.replace(r, function (e, n, i, r, o) {
            return a += t.slice(s, o).replace(D, function (t) {
                return "\\" + k[t]
            }), n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), i && (a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), r && (a += "';\n" + r + "\n__p+='"), s = o + e.length, e
        }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            i = Function(n.variable || "obj", "_", a)
        } catch (o) {
            throw o.source = a, o
        }
        if (e) return i(e, E);
        var u = function (t) {
            return i.call(this, t, E)
        };
        return u.source = "function(" + (n.variable || "obj") + "){\n" + a + "}", u
    }, E.chain = function (t) {
        return E(t).chain()
    };
    var M = function (t) {
        return this._chain ? E(t).chain() : t
    };
    E.mixin(E), x(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
        var e = i[t];
        E.prototype[t] = function () {
            var n = this._wrapped;
            return e.apply(n, arguments), "shift" != t && "splice" != t || 0 !== n.length || delete n[0], M.call(this, n)
        }
    }), x(["concat", "join", "slice"], function (t) {
        var e = i[t];
        E.prototype[t] = function () {
            return M.call(this, e.apply(this._wrapped, arguments))
        }
    }), E.extend(E.prototype, {
        chain: function () {
            return this._chain = !0, this
        },
        value: function () {
            return this._wrapped
        }
    })
}.call(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse;
    "undefined" != typeof exports && exports._ ? (e._ = exports._.noConflict(), e.localStorage = require("localStorage"), e.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest, exports.Parse = e) : (e._ = _.noConflict(), "undefined" != typeof localStorage && (e.localStorage = localStorage), "undefined" != typeof XMLHttpRequest && (e.XMLHttpRequest = XMLHttpRequest)), "undefined" != typeof $ && (e.$ = $);
    var n = function () {}, i = function (t, i, r) {
            var s;
            return s = i && i.hasOwnProperty("constructor") ? i.constructor : function () {
                t.apply(this, arguments)
            }, e._.extend(s, t), n.prototype = t.prototype, s.prototype = new n, i && e._.extend(s.prototype, i), r && e._.extend(s, r), s.prototype.constructor = s, s.__super__ = t.prototype, s
        };
    e.serverURL = "https://api.parse.com", "undefined" != typeof process && process.versions && process.versions.node && (e._isNode = !0), e.initialize = function (t, n, i) {
        if (i) throw "Parse.initialize() was passed a Master Key, which is only allowed from within Node.js.";
        e._initialize(t, n)
    }, e._initialize = function (t, n, i) {
        e.applicationId = t, e.javaScriptKey = n, e.masterKey = i, e._useMasterKey = !1
    }, e._isNode && (e.initialize = e._initialize, e.Cloud = e.Cloud || {}, e.Cloud.useMasterKey = function () {
        e._useMasterKey = !0
    }), e._getParsePath = function (t) {
        if (!e.applicationId) throw "You need to call Parse.initialize before using Parse.";
        if (t || (t = ""), !e._.isString(t)) throw "Tried to get a localStorage path that wasn't a String.";
        return "/" === t[0] && (t = t.substring(1)), "Parse/" + e.applicationId + "/" + t
    }, e._installationId = null, e._getInstallationId = function () {
        if (e._installationId) return e._installationId;
        var t = e._getParsePath("installationId");
        if (e._installationId = e.localStorage.getItem(t), !e._installationId || "" === e._installationId) {
            var n = function () {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            };
            e._installationId = n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n(), e.localStorage.setItem(t, e._installationId)
        }
        return e._installationId
    }, e._parseDate = function (t) {
        var e = RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$"),
            n = e.exec(t);
        if (!n) return null;
        var i = n[1] || 0,
            r = (n[2] || 1) - 1,
            s = n[3] || 0,
            a = n[4] || 0,
            o = n[5] || 0,
            u = n[6] || 0,
            c = n[8] || 0;
        return new Date(Date.UTC(i, r, s, a, o, u, c))
    }, e._ajaxIE8 = function (t, n, i) {
        var r = new e.Promise,
            s = new XDomainRequest;
        return s.onload = function () {
            var t;
            try {
                t = JSON.parse(s.responseText)
            } catch (e) {
                r.reject(e)
            }
            t && r.resolve(t)
        }, s.onerror = s.ontimeout = function () {
            var t = {
                responseText: JSON.stringify({
                    code: e.Error.X_DOMAIN_REQUEST,
                    error: "IE's XDomainRequest does not supply error info."
                })
            };
            r.reject(t)
        }, s.onprogress = function () {}, s.open(t, n), s.send(i), r
    }, e._useXDomainRequest = function () {
        return "undefined" != typeof XDomainRequest ? "withCredentials" in new XMLHttpRequest ? !1 : !0 : !1
    }, e._ajax = function (t, n, i, r, s) {
        var a = {
            success: r,
            error: s
        };
        if (e._useXDomainRequest()) return e._ajaxIE8(t, n, i)._thenRunCallbacks(a);
        var o = new e.Promise,
            u = !1,
            c = new e.XMLHttpRequest;
        return c.onreadystatechange = function () {
            if (4 === c.readyState) {
                if (u) return;
                if (u = !0, c.status >= 200 && 300 > c.status) {
                    var t;
                    try {
                        t = JSON.parse(c.responseText)
                    } catch (e) {
                        o.reject(e)
                    }
                    t && o.resolve(t, c.status, c)
                } else o.reject(c)
            }
        }, c.open(t, n, !0), c.setRequestHeader("Content-Type", "text/plain"), e._isNode && c.setRequestHeader("User-Agent", "Parse/" + e.VERSION + " (NodeJS " + process.versions.node + ")"), c.send(i), o._thenRunCallbacks(a)
    }, e._extend = function (t, e) {
        var n = i(this, t, e);
        return n.extend = this.extend, n
    }, e._request = function (t) {
        var n = t.route,
            i = t.className,
            r = t.objectId,
            s = t.method,
            a = t.useMasterKey,
            o = t.sessionToken,
            u = t.data;
        if (!e.applicationId) throw "You must specify your applicationId using Parse.initialize.";
        if (!e.javaScriptKey && !e.masterKey) throw "You must specify a key using Parse.initialize.";
        if (!o) {
            var c = e.User.current();
            c && c._sessionToken && (o = c._sessionToken)
        }
        if ("batch" !== n && "classes" !== n && "events" !== n && "files" !== n && "functions" !== n && "login" !== n && "push" !== n && "requestPasswordReset" !== n && "rest_verify_analytics" !== n && "users" !== n && "jobs" !== n) throw "Bad route: '" + n + "'.";
        var l = e.serverURL;
        "/" !== l.charAt(l.length - 1) && (l += "/"), l += "1/" + n, i && (l += "/" + i), r && (l += "/" + r), u = e._.clone(u || {}), "POST" !== s && (u._method = s, s = "POST"), e._.isUndefined(a) && (a = e._useMasterKey), u._ApplicationId = e.applicationId, a ? u._MasterKey = e.masterKey : u._JavaScriptKey = e.javaScriptKey, u._ClientVersion = e.VERSION, u._InstallationId = e._getInstallationId(), o && (u._SessionToken = o);
        var h = JSON.stringify(u);
        return e._ajax(s, l, h).then(null, function (t) {
            var n;
            if (t && t.responseText) try {
                var i = JSON.parse(t.responseText);
                n = new e.Error(i.code, i.error)
            } catch (r) {
                n = new e.Error(e.Error.INVALID_JSON, "Received an error with invalid JSON from Parse: " + t.responseText)
            } else n = new e.Error(e.Error.CONNECTION_FAILED, "XMLHttpRequest failed: " + JSON.stringify(t));
            return e.Promise.error(n)
        })
    }, e._getValue = function (t, n) {
        return t && t[n] ? e._.isFunction(t[n]) ? t[n]() : t[n] : null
    }, e._encode = function (t, n, i) {
        var r = e._;
        if (t instanceof e.Object) {
            if (i) throw "Parse.Objects not allowed here";
            if (!n || r.include(n, t) || !t._hasData) return t._toPointer();
            if (!t.dirty()) return n = n.concat(t), e._encode(t._toFullJSON(n), n, i);
            throw "Tried to save an object with a pointer to a new, unsaved object."
        }
        if (t instanceof e.ACL) return t.toJSON();
        if (r.isDate(t)) return {
            __type: "Date",
            iso: t.toJSON()
        };
        if (t instanceof e.GeoPoint) return t.toJSON();
        if (r.isArray(t)) return r.map(t, function (t) {
            return e._encode(t, n, i)
        });
        if (r.isRegExp(t)) return t.source;
        if (t instanceof e.Relation) return t.toJSON();
        if (t instanceof e.Op) return t.toJSON();
        if (t instanceof e.File) {
            if (!t.url()) throw "Tried to save an object containing an unsaved file.";
            return {
                __type: "File",
                name: t.name(),
                url: t.url()
            }
        }
        if (r.isObject(t)) {
            var s = {};
            return e._objectEach(t, function (t, r) {
                s[r] = e._encode(t, n, i)
            }), s
        }
        return t
    }, e._decode = function (t, n) {
        var i = e._;
        if (!i.isObject(n)) return n;
        if (i.isArray(n)) return e._arrayEach(n, function (t, i) {
            n[i] = e._decode(i, t)
        }), n;
        if (n instanceof e.Object) return n;
        if (n instanceof e.File) return n;
        if (n instanceof e.Op) return n;
        if (n.__op) return e.Op._decode(n);
        if ("Pointer" === n.__type) {
            var r = e.Object._create(n.className);
            return r._finishFetch({
                objectId: n.objectId
            }, !1), r
        }
        if ("Object" === n.__type) {
            var s = n.className;
            delete n.__type, delete n.className;
            var a = e.Object._create(s);
            return a._finishFetch(n, !0), a
        }
        if ("Date" === n.__type) return e._parseDate(n.iso);
        if ("GeoPoint" === n.__type) return new e.GeoPoint({
            latitude: n.latitude,
            longitude: n.longitude
        });
        if ("ACL" === t) return n instanceof e.ACL ? n : new e.ACL(n);
        if ("Relation" === n.__type) {
            var o = new e.Relation(null, t);
            return o.targetClassName = n.className, o
        }
        if ("File" === n.__type) {
            var u = new e.File(n.name);
            return u._url = n.url, u
        }
        return e._objectEach(n, function (t, i) {
            n[i] = e._decode(i, t)
        }), n
    }, e._arrayEach = e._.each, e._traverse = function (t, n, i) {
        if (t instanceof e.Object) {
            if (i = i || [], e._.indexOf(i, t) >= 0) return;
            return i.push(t), e._traverse(t.attributes, n, i), n(t)
        }
        return t instanceof e.Relation || t instanceof e.File ? n(t) : e._.isArray(t) ? (e._.each(t, function (r, s) {
            var a = e._traverse(r, n, i);
            a && (t[s] = a)
        }), n(t)) : e._.isObject(t) ? (e._each(t, function (r, s) {
            var a = e._traverse(r, n, i);
            a && (t[s] = a)
        }), n(t)) : n(t)
    }, e._objectEach = e._each = function (t, n) {
        var i = e._;
        i.isObject(t) ? i.each(i.keys(t), function (e) {
            n(t[e], e)
        }) : i.each(t, n)
    }, e._isNullOrUndefined = function (t) {
        return e._.isNull(t) || e._.isUndefined(t)
    }
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Analytics = e.Analytics || {}, n.extend(e.Analytics, {
        track: function (t, i) {
            if (t = t || "", t = t.replace(/^\s*/, ""), t = t.replace(/\s*$/, ""), 0 === t.length) throw "A name for the custom event must be provided";
            return n.each(i, function (t, e) {
                if (!n.isString(e) || !n.isString(t)) throw 'track() dimensions expects keys and values of type "string".'
            }), e._request({
                route: "events",
                className: t,
                method: "POST",
                data: {
                    dimensions: i
                }
            })
        }
    })
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Error = function (t, e) {
        this.code = t, this.message = e
    }, n.extend(e.Error, {
        OTHER_CAUSE: -1,
        INTERNAL_SERVER_ERROR: 1,
        CONNECTION_FAILED: 100,
        OBJECT_NOT_FOUND: 101,
        INVALID_QUERY: 102,
        INVALID_CLASS_NAME: 103,
        MISSING_OBJECT_ID: 104,
        INVALID_KEY_NAME: 105,
        INVALID_POINTER: 106,
        INVALID_JSON: 107,
        COMMAND_UNAVAILABLE: 108,
        NOT_INITIALIZED: 109,
        INCORRECT_TYPE: 111,
        INVALID_CHANNEL_NAME: 112,
        PUSH_MISCONFIGURED: 115,
        OBJECT_TOO_LARGE: 116,
        OPERATION_FORBIDDEN: 119,
        CACHE_MISS: 120,
        INVALID_NESTED_KEY: 121,
        INVALID_FILE_NAME: 122,
        INVALID_ACL: 123,
        TIMEOUT: 124,
        INVALID_EMAIL_ADDRESS: 125,
        MISSING_CONTENT_TYPE: 126,
        MISSING_CONTENT_LENGTH: 127,
        INVALID_CONTENT_LENGTH: 128,
        FILE_TOO_LARGE: 129,
        FILE_SAVE_ERROR: 130,
        FILE_DELETE_ERROR: 153,
        DUPLICATE_VALUE: 137,
        INVALID_ROLE_NAME: 139,
        EXCEEDED_QUOTA: 140,
        SCRIPT_FAILED: 141,
        VALIDATION_ERROR: 142,
        INVALID_IMAGE_DATA: 150,
        UNSAVED_FILE_ERROR: 151,
        INVALID_PUSH_TIME_ERROR: 152,
        USERNAME_MISSING: 200,
        PASSWORD_MISSING: 201,
        USERNAME_TAKEN: 202,
        EMAIL_TAKEN: 203,
        EMAIL_MISSING: 204,
        EMAIL_NOT_FOUND: 205,
        SESSION_MISSING: 206,
        MUST_CREATE_USER_THROUGH_SIGNUP: 207,
        ACCOUNT_ALREADY_LINKED: 208,
        LINKED_ID_MISSING: 250,
        INVALID_LINKED_SESSION: 251,
        UNSUPPORTED_SERVICE: 252,
        AGGREGATE_ERROR: 600,
        FILE_READ_ERROR: 601,
        X_DOMAIN_REQUEST: 602
    })
}(this),
function () {
    var t = this,
        e = t.Parse || (t.Parse = {}),
        n = /\s+/,
        i = Array.prototype.slice;
    e.Events = {
        on: function (t, e, i) {
            var r, s, a, o, u;
            if (!e) return this;
            for (t = t.split(n), r = this._callbacks || (this._callbacks = {}), s = t.shift(); s;) u = r[s], a = u ? u.tail : {}, a.next = o = {}, a.context = i, a.callback = e, r[s] = {
                tail: o,
                next: u ? u.next : a
            }, s = t.shift();
            return this
        },
        off: function (t, e, i) {
            var r, s, a, o, u, c;
            if (s = this._callbacks) {
                if (!(t || e || i)) return delete this._callbacks, this;
                for (t = t ? t.split(n) : _.keys(s), r = t.shift(); r;)
                    if (a = s[r], delete s[r], a && (e || i)) {
                        for (o = a.tail, a = a.next; a !== o;) u = a.callback, c = a.context, (e && u !== e || i && c !== i) && this.on(r, u, c), a = a.next;
                        r = t.shift()
                    }
                return this
            }
        },
        trigger: function (t) {
            var e, r, s, a, o, u, c;
            if (!(s = this._callbacks)) return this;
            for (u = s.all, t = t.split(n), c = i.call(arguments, 1), e = t.shift(); e;) {
                if (r = s[e])
                    for (a = r.tail;
                        (r = r.next) !== a;) r.callback.apply(r.context || this, c);
                if (r = u)
                    for (a = r.tail, o = [e].concat(c);
                        (r = r.next) !== a;) r.callback.apply(r.context || this, o);
                e = t.shift()
            }
            return this
        }
    }, e.Events.bind = e.Events.on, e.Events.unbind = e.Events.off
}.call(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.GeoPoint = function (t, i) {
        n.isArray(t) ? (e.GeoPoint._validate(t[0], t[1]), this.latitude = t[0], this.longitude = t[1]) : n.isObject(t) ? (e.GeoPoint._validate(t.latitude, t.longitude), this.latitude = t.latitude, this.longitude = t.longitude) : n.isNumber(t) && n.isNumber(i) ? (e.GeoPoint._validate(t, i), this.latitude = t, this.longitude = i) : (this.latitude = 0, this.longitude = 0);
        var r = this;
        this.__defineGetter__ && this.__defineSetter__ && (this._latitude = this.latitude, this._longitude = this.longitude, this.__defineGetter__("latitude", function () {
            return r._latitude
        }), this.__defineGetter__("longitude", function () {
            return r._longitude
        }), this.__defineSetter__("latitude", function (t) {
            e.GeoPoint._validate(t, r.longitude), r._latitude = t
        }), this.__defineSetter__("longitude", function (t) {
            e.GeoPoint._validate(r.latitude, t), r._longitude = t
        }))
    }, e.GeoPoint._validate = function (t, e) {
        if (-90 > t) throw "Parse.GeoPoint latitude " + t + " < -90.0.";
        if (t > 90) throw "Parse.GeoPoint latitude " + t + " > 90.0.";
        if (-180 > e) throw "Parse.GeoPoint longitude " + e + " < -180.0.";
        if (e > 180) throw "Parse.GeoPoint longitude " + e + " > 180.0."
    }, e.GeoPoint.current = function (t) {
        var n = new e.Promise;
        return navigator.geolocation.getCurrentPosition(function (t) {
            n.resolve(new e.GeoPoint({
                latitude: t.coords.latitude,
                longitude: t.coords.longitude
            }))
        }, function (t) {
            n.reject(t)
        }), n._thenRunCallbacks(t)
    }, e.GeoPoint.prototype = {
        toJSON: function () {
            return e.GeoPoint._validate(this.latitude, this.longitude), {
                __type: "GeoPoint",
                latitude: this.latitude,
                longitude: this.longitude
            }
        },
        radiansTo: function (t) {
            var e = Math.PI / 180,
                n = this.latitude * e,
                i = this.longitude * e,
                r = t.latitude * e,
                s = t.longitude * e,
                a = n - r,
                o = i - s,
                u = Math.sin(a / 2),
                c = Math.sin(o / 2),
                l = u * u + Math.cos(n) * Math.cos(r) * c * c;
            return l = Math.min(1, l), 2 * Math.asin(Math.sqrt(l))
        },
        kilometersTo: function (t) {
            return 6371 * this.radiansTo(t)
        },
        milesTo: function (t) {
            return 3958.8 * this.radiansTo(t)
        }
    }
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._,
        i = "*";
    e.ACL = function (t) {
        var i = this;
        if (i.permissionsById = {}, n.isObject(t))
            if (t instanceof e.User) i.setReadAccess(t, !0), i.setWriteAccess(t, !0);
            else {
                if (n.isFunction(t)) throw "Parse.ACL() called with a function.  Did you forget ()?";
                e._objectEach(t, function (t, r) {
                    if (!n.isString(r)) throw "Tried to create an ACL with an invalid userId.";
                    i.permissionsById[r] = {}, e._objectEach(t, function (t, e) {
                        if ("read" !== e && "write" !== e) throw "Tried to create an ACL with an invalid permission type.";
                        if (!n.isBoolean(t)) throw "Tried to create an ACL with an invalid permission value.";
                        i.permissionsById[r][e] = t
                    })
                })
            }
    }, e.ACL.prototype.toJSON = function () {
        return n.clone(this.permissionsById)
    }, e.ACL.prototype._setAccess = function (t, i, r) {
        if (i instanceof e.User ? i = i.id : i instanceof e.Role && (i = "role:" + i.getName()), !n.isString(i)) throw "userId must be a string.";
        if (!n.isBoolean(r)) throw "allowed must be either true or false.";
        var s = this.permissionsById[i];
        if (!s) {
            if (!r) return;
            s = {}, this.permissionsById[i] = s
        }
        r ? this.permissionsById[i][t] = !0 : (delete s[t], n.isEmpty(s) && delete s[i])
    }, e.ACL.prototype._getAccess = function (t, n) {
        n instanceof e.User ? n = n.id : n instanceof e.Role && (n = "role:" + n.getName());
        var i = this.permissionsById[n];
        return i ? i[t] ? !0 : !1 : !1
    }, e.ACL.prototype.setReadAccess = function (t, e) {
        this._setAccess("read", t, e)
    }, e.ACL.prototype.getReadAccess = function (t) {
        return this._getAccess("read", t)
    }, e.ACL.prototype.setWriteAccess = function (t, e) {
        this._setAccess("write", t, e)
    }, e.ACL.prototype.getWriteAccess = function (t) {
        return this._getAccess("write", t)
    }, e.ACL.prototype.setPublicReadAccess = function (t) {
        this.setReadAccess(i, t)
    }, e.ACL.prototype.getPublicReadAccess = function () {
        return this.getReadAccess(i)
    }, e.ACL.prototype.setPublicWriteAccess = function (t) {
        this.setWriteAccess(i, t)
    }, e.ACL.prototype.getPublicWriteAccess = function () {
        return this.getWriteAccess(i)
    }, e.ACL.prototype.getRoleReadAccess = function (t) {
        if (t instanceof e.Role && (t = t.getName()), n.isString(t)) return this.getReadAccess("role:" + t);
        throw "role must be a Parse.Role or a String"
    }, e.ACL.prototype.getRoleWriteAccess = function (t) {
        if (t instanceof e.Role && (t = t.getName()), n.isString(t)) return this.getWriteAccess("role:" + t);
        throw "role must be a Parse.Role or a String"
    }, e.ACL.prototype.setRoleReadAccess = function (t, i) {
        if (t instanceof e.Role && (t = t.getName()), n.isString(t)) return this.setReadAccess("role:" + t, i), void 0;
        throw "role must be a Parse.Role or a String"
    }, e.ACL.prototype.setRoleWriteAccess = function (t, i) {
        if (t instanceof e.Role && (t = t.getName()), n.isString(t)) return this.setWriteAccess("role:" + t, i), void 0;
        throw "role must be a Parse.Role or a String"
    }
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Op = function () {
        this._initialize.apply(this, arguments)
    }, e.Op.prototype = {
        _initialize: function () {}
    }, n.extend(e.Op, {
        _extend: e._extend,
        _opDecoderMap: {},
        _registerDecoder: function (t, n) {
            e.Op._opDecoderMap[t] = n
        },
        _decode: function (t) {
            var n = e.Op._opDecoderMap[t.__op];
            return n ? n(t) : void 0
        }
    }), e.Op._registerDecoder("Batch", function (t) {
        var n = null;
        return e._arrayEach(t.ops, function (t) {
            t = e.Op._decode(t), n = t._mergeWithPrevious(n)
        }), n
    }), e.Op.Set = e.Op._extend({
        _initialize: function (t) {
            this._value = t
        },
        value: function () {
            return this._value
        },
        toJSON: function () {
            return e._encode(this.value())
        },
        _mergeWithPrevious: function () {
            return this
        },
        _estimate: function () {
            return this.value()
        }
    }), e.Op._UNSET = {}, e.Op.Unset = e.Op._extend({
        toJSON: function () {
            return {
                __op: "Delete"
            }
        },
        _mergeWithPrevious: function () {
            return this
        },
        _estimate: function () {
            return e.Op._UNSET
        }
    }), e.Op._registerDecoder("Delete", function () {
        return new e.Op.Unset
    }), e.Op.Increment = e.Op._extend({
        _initialize: function (t) {
            this._amount = t
        },
        amount: function () {
            return this._amount
        },
        toJSON: function () {
            return {
                __op: "Increment",
                amount: this._amount
            }
        },
        _mergeWithPrevious: function (t) {
            if (t) {
                if (t instanceof e.Op.Unset) return new e.Op.Set(this.amount());
                if (t instanceof e.Op.Set) return new e.Op.Set(t.value() + this.amount());
                if (t instanceof e.Op.Increment) return new e.Op.Increment(this.amount() + t.amount());
                throw "Op is invalid after previous op."
            }
            return this
        },
        _estimate: function (t) {
            return t ? t + this.amount() : this.amount()
        }
    }), e.Op._registerDecoder("Increment", function (t) {
        return new e.Op.Increment(t.amount)
    }), e.Op.Add = e.Op._extend({
        _initialize: function (t) {
            this._objects = t
        },
        objects: function () {
            return this._objects
        },
        toJSON: function () {
            return {
                __op: "Add",
                objects: e._encode(this.objects())
            }
        },
        _mergeWithPrevious: function (t) {
            if (t) {
                if (t instanceof e.Op.Unset) return new e.Op.Set(this.objects());
                if (t instanceof e.Op.Set) return new e.Op.Set(this._estimate(t.value()));
                if (t instanceof e.Op.Add) return new e.Op.Add(t.objects().concat(this.objects()));
                throw "Op is invalid after previous op."
            }
            return this
        },
        _estimate: function (t) {
            return t ? t.concat(this.objects()) : n.clone(this.objects())
        }
    }), e.Op._registerDecoder("Add", function (t) {
        return new e.Op.Add(e._decode(void 0, t.objects))
    }), e.Op.AddUnique = e.Op._extend({
        _initialize: function (t) {
            this._objects = n.uniq(t)
        },
        objects: function () {
            return this._objects
        },
        toJSON: function () {
            return {
                __op: "AddUnique",
                objects: e._encode(this.objects())
            }
        },
        _mergeWithPrevious: function (t) {
            if (t) {
                if (t instanceof e.Op.Unset) return new e.Op.Set(this.objects());
                if (t instanceof e.Op.Set) return new e.Op.Set(this._estimate(t.value()));
                if (t instanceof e.Op.AddUnique) return new e.Op.AddUnique(this._estimate(t.objects()));
                throw "Op is invalid after previous op."
            }
            return this
        },
        _estimate: function (t) {
            if (t) {
                var i = n.clone(t);
                return e._arrayEach(this.objects(), function (t) {
                    if (t instanceof e.Object && t.id) {
                        var r = n.find(i, function (n) {
                            return n instanceof e.Object && n.id === t.id
                        });
                        if (r) {
                            var s = n.indexOf(i, r);
                            i[s] = t
                        } else i.push(t)
                    } else n.contains(i, t) || i.push(t)
                }), i
            }
            return n.clone(this.objects())
        }
    }), e.Op._registerDecoder("AddUnique", function (t) {
        return new e.Op.AddUnique(e._decode(void 0, t.objects))
    }), e.Op.Remove = e.Op._extend({
        _initialize: function (t) {
            this._objects = n.uniq(t)
        },
        objects: function () {
            return this._objects
        },
        toJSON: function () {
            return {
                __op: "Remove",
                objects: e._encode(this.objects())
            }
        },
        _mergeWithPrevious: function (t) {
            if (t) {
                if (t instanceof e.Op.Unset) return t;
                if (t instanceof e.Op.Set) return new e.Op.Set(this._estimate(t.value()));
                if (t instanceof e.Op.Remove) return new e.Op.Remove(n.union(t.objects(), this.objects()));
                throw "Op is invalid after previous op."
            }
            return this
        },
        _estimate: function (t) {
            if (t) {
                var i = n.difference(t, this.objects());
                return e._arrayEach(this.objects(), function (t) {
                    t instanceof e.Object && t.id && (i = n.reject(i, function (n) {
                        return n instanceof e.Object && n.id === t.id
                    }))
                }), i
            }
            return []
        }
    }), e.Op._registerDecoder("Remove", function (t) {
        return new e.Op.Remove(e._decode(void 0, t.objects))
    }), e.Op.Relation = e.Op._extend({
        _initialize: function (t, i) {
            this._targetClassName = null;
            var r = this,
                s = function (t) {
                    if (t instanceof e.Object) {
                        if (!t.id) throw "You can't add an unsaved Parse.Object to a relation.";
                        if (r._targetClassName || (r._targetClassName = t.className), r._targetClassName !== t.className) throw "Tried to create a Parse.Relation with 2 different types: " + r._targetClassName + " and " + t.className + ".";
                        return t.id
                    }
                    return t
                };
            this.relationsToAdd = n.uniq(n.map(t, s)), this.relationsToRemove = n.uniq(n.map(i, s))
        },
        added: function () {
            var t = this;
            return n.map(this.relationsToAdd, function (n) {
                var i = e.Object._create(t._targetClassName);
                return i.id = n, i
            })
        },
        removed: function () {
            var t = this;
            return n.map(this.relationsToRemove, function (n) {
                var i = e.Object._create(t._targetClassName);
                return i.id = n, i
            })
        },
        toJSON: function () {
            var t = null,
                e = null,
                i = this,
                r = function (t) {
                    return {
                        __type: "Pointer",
                        className: i._targetClassName,
                        objectId: t
                    }
                }, s = null;
            return this.relationsToAdd.length > 0 && (s = n.map(this.relationsToAdd, r), t = {
                __op: "AddRelation",
                objects: s
            }), this.relationsToRemove.length > 0 && (s = n.map(this.relationsToRemove, r), e = {
                __op: "RemoveRelation",
                objects: s
            }), t && e ? {
                __op: "Batch",
                ops: [t, e]
            } : t || e || {}
        },
        _mergeWithPrevious: function (t) {
            if (t) {
                if (t instanceof e.Op.Unset) throw "You can't modify a relation after deleting it.";
                if (t instanceof e.Op.Relation) {
                    if (t._targetClassName && t._targetClassName !== this._targetClassName) throw "Related object must be of class " + t._targetClassName + ", but " + this._targetClassName + " was passed in.";
                    var i = n.union(n.difference(t.relationsToAdd, this.relationsToRemove), this.relationsToAdd),
                        r = n.union(n.difference(t.relationsToRemove, this.relationsToAdd), this.relationsToRemove),
                        s = new e.Op.Relation(i, r);
                    return s._targetClassName = this._targetClassName, s
                }
                throw "Op is invalid after previous op."
            }
            return this
        },
        _estimate: function (t, n, i) {
            if (t) {
                if (t instanceof e.Relation) {
                    if (this._targetClassName)
                        if (t.targetClassName) {
                            if (t.targetClassName !== this._targetClassName) throw "Related object must be a " + t.targetClassName + ", but a " + this._targetClassName + " was passed in."
                        } else t.targetClassName = this._targetClassName;
                    return t
                }
                throw "Op is invalid after previous op."
            }
            var r = new e.Relation(n, i);
            r.targetClassName = this._targetClassName
        }
    }), e.Op._registerDecoder("AddRelation", function (t) {
        return new e.Op.Relation(e._decode(void 0, t.objects), [])
    }), e.Op._registerDecoder("RemoveRelation", function (t) {
        return new e.Op.Relation([], e._decode(void 0, t.objects))
    })
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Relation = function (t, e) {
        this.parent = t, this.key = e, this.targetClassName = null
    }, e.Relation.prototype = {
        _ensureParentAndKey: function (t, e) {
            if (this.parent = this.parent || t, this.key = this.key || e, this.parent !== t) throw "Internal Error. Relation retrieved from two different Objects.";
            if (this.key !== e) throw "Internal Error. Relation retrieved from two different keys."
        },
        add: function (t) {
            n.isArray(t) || (t = [t]);
            var i = new e.Op.Relation(t, []);
            this.parent.set(this.key, i), this.targetClassName = i._targetClassName
        },
        remove: function (t) {
            n.isArray(t) || (t = [t]);
            var i = new e.Op.Relation([], t);
            this.parent.set(this.key, i), this.targetClassName = i._targetClassName
        },
        toJSON: function () {
            return {
                __type: "Relation",
                className: this.targetClassName
            }
        },
        query: function () {
            var t, n;
            return this.targetClassName ? (t = e.Object._getSubclass(this.targetClassName), n = new e.Query(t)) : (t = e.Object._getSubclass(this.parent.className), n = new e.Query(t), n._extraOptions.redirectClassNameForKey = this.key), n._addCondition("$relatedTo", "object", this.parent._toPointer()), n._addCondition("$relatedTo", "key", this.key), n
        }
    }
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Promise = function () {
        this._resolved = !1, this._rejected = !1, this._resolvedCallbacks = [], this._rejectedCallbacks = []
    }, n.extend(e.Promise, {
        is: function (t) {
            return t && t.then && n.isFunction(t.then)
        },
        as: function () {
            var t = new e.Promise;
            return t.resolve.apply(t, arguments), t
        },
        error: function () {
            var t = new e.Promise;
            return t.reject.apply(t, arguments), t
        },
        when: function (t) {
            var n;
            n = t && e._isNullOrUndefined(t.length) ? arguments : t;
            var i = n.length,
                r = !1,
                s = [],
                a = [];
            if (s.length = n.length, a.length = n.length, 0 === i) return e.Promise.as.apply(this, s);
            var o = new e.Promise,
                u = function () {
                    i -= 1, 0 === i && (r ? o.reject(a) : o.resolve.apply(o, s))
                };
            return e._arrayEach(n, function (t, n) {
                e.Promise.is(t) ? t.then(function (t) {
                    s[n] = t, u()
                }, function (t) {
                    a[n] = t, r = !0, u()
                }) : (s[n] = t, u())
            }), o
        },
        _continueWhile: function (t, n) {
            return t() ? n().then(function () {
                return e.Promise._continueWhile(t, n)
            }) : e.Promise.as()
        }
    }), n.extend(e.Promise.prototype, {
        resolve: function () {
            if (this._resolved || this._rejected) throw "A promise was resolved even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
            this._resolved = !0, this._result = arguments;
            var t = arguments;
            e._arrayEach(this._resolvedCallbacks, function (e) {
                e.apply(this, t)
            }), this._resolvedCallbacks = [], this._rejectedCallbacks = []
        },
        reject: function (t) {
            if (this._resolved || this._rejected) throw "A promise was rejected even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
            this._rejected = !0, this._error = t, e._arrayEach(this._rejectedCallbacks, function (e) {
                e(t)
            }), this._resolvedCallbacks = [], this._rejectedCallbacks = []
        },
        then: function (t, n) {
            var i = new e.Promise,
                r = function () {
                    var n = arguments;
                    t && (n = [t.apply(this, n)]), 1 === n.length && e.Promise.is(n[0]) ? n[0].then(function () {
                        i.resolve.apply(i, arguments)
                    }, function (t) {
                        i.reject(t)
                    }) : i.resolve.apply(i, n)
                }, s = function (t) {
                    var r = [];
                    n ? (r = [n(t)], 1 === r.length && e.Promise.is(r[0]) ? r[0].then(function () {
                        i.resolve.apply(i, arguments)
                    }, function (t) {
                        i.reject(t)
                    }) : i.reject(r[0])) : i.reject(t)
                };
            return this._resolved ? r.apply(this, this._result) : this._rejected ? s(this._error) : (this._resolvedCallbacks.push(r), this._rejectedCallbacks.push(s)), i
        },
        always: function (t) {
            return this.then(t, t)
        },
        done: function (t) {
            return this.then(t)
        },
        fail: function (t) {
            return this.then(null, t)
        },
        _thenRunCallbacks: function (t, i) {
            var r;
            if (n.isFunction(t)) {
                var s = t;
                r = {
                    success: function (t) {
                        s(t, null)
                    },
                    error: function (t) {
                        s(null, t)
                    }
                }
            } else r = n.clone(t);
            return r = r || {}, this.then(function (t) {
                return r.success ? r.success.apply(this, arguments) : i && i.trigger("sync", i, t, r), e.Promise.as.apply(e.Promise, arguments)
            }, function (t) {
                return r.error ? n.isUndefined(i) ? r.error(t) : r.error(i, t) : i && i.trigger("error", i, t, r), e.Promise.error(t)
            })
        },
        _continueWith: function (t) {
            return this.then(function () {
                return t(arguments, null)
            }, function (e) {
                return t(null, e)
            })
        }
    })
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._,
        i = function (t) {
            if (26 > t) return String.fromCharCode(65 + t);
            if (52 > t) return String.fromCharCode(97 + (t - 26));
            if (62 > t) return String.fromCharCode(48 + (t - 52));
            if (62 === t) return "+";
            if (63 === t) return "/";
            throw "Tried to encode large digit " + t + " in base64."
        }, r = function (t) {
            var e = [];
            return e.length = Math.ceil(t.length / 3), n.times(e.length, function (n) {
                var r = t[3 * n],
                    s = t[3 * n + 1] || 0,
                    a = t[3 * n + 2] || 0,
                    o = t.length > 3 * n + 1,
                    u = t.length > 3 * n + 2;
                e[n] = [i(63 & r >> 2), i(48 & r << 4 | 15 & s >> 4), o ? i(60 & s << 2 | 3 & a >> 6) : "=", u ? i(63 & a) : "="].join("")
            }), e.join("")
        }, s = {
            ai: "application/postscript",
            aif: "audio/x-aiff",
            aifc: "audio/x-aiff",
            aiff: "audio/x-aiff",
            asc: "text/plain",
            atom: "application/atom+xml",
            au: "audio/basic",
            avi: "video/x-msvideo",
            bcpio: "application/x-bcpio",
            bin: "application/octet-stream",
            bmp: "image/bmp",
            cdf: "application/x-netcdf",
            cgm: "image/cgm",
            "class": "application/octet-stream",
            cpio: "application/x-cpio",
            cpt: "application/mac-compactpro",
            csh: "application/x-csh",
            css: "text/css",
            dcr: "application/x-director",
            dif: "video/x-dv",
            dir: "application/x-director",
            djv: "image/vnd.djvu",
            djvu: "image/vnd.djvu",
            dll: "application/octet-stream",
            dmg: "application/octet-stream",
            dms: "application/octet-stream",
            doc: "application/msword",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
            docm: "application/vnd.ms-word.document.macroEnabled.12",
            dotm: "application/vnd.ms-word.template.macroEnabled.12",
            dtd: "application/xml-dtd",
            dv: "video/x-dv",
            dvi: "application/x-dvi",
            dxr: "application/x-director",
            eps: "application/postscript",
            etx: "text/x-setext",
            exe: "application/octet-stream",
            ez: "application/andrew-inset",
            gif: "image/gif",
            gram: "application/srgs",
            grxml: "application/srgs+xml",
            gtar: "application/x-gtar",
            hdf: "application/x-hdf",
            hqx: "application/mac-binhex40",
            htm: "text/html",
            html: "text/html",
            ice: "x-conference/x-cooltalk",
            ico: "image/x-icon",
            ics: "text/calendar",
            ief: "image/ief",
            ifb: "text/calendar",
            iges: "model/iges",
            igs: "model/iges",
            jnlp: "application/x-java-jnlp-file",
            jp2: "image/jp2",
            jpe: "image/jpeg",
            jpeg: "image/jpeg",
            jpg: "image/jpeg",
            js: "application/x-javascript",
            kar: "audio/midi",
            latex: "application/x-latex",
            lha: "application/octet-stream",
            lzh: "application/octet-stream",
            m3u: "audio/x-mpegurl",
            m4a: "audio/mp4a-latm",
            m4b: "audio/mp4a-latm",
            m4p: "audio/mp4a-latm",
            m4u: "video/vnd.mpegurl",
            m4v: "video/x-m4v",
            mac: "image/x-macpaint",
            man: "application/x-troff-man",
            mathml: "application/mathml+xml",
            me: "application/x-troff-me",
            mesh: "model/mesh",
            mid: "audio/midi",
            midi: "audio/midi",
            mif: "application/vnd.mif",
            mov: "video/quicktime",
            movie: "video/x-sgi-movie",
            mp2: "audio/mpeg",
            mp3: "audio/mpeg",
            mp4: "video/mp4",
            mpe: "video/mpeg",
            mpeg: "video/mpeg",
            mpg: "video/mpeg",
            mpga: "audio/mpeg",
            ms: "application/x-troff-ms",
            msh: "model/mesh",
            mxu: "video/vnd.mpegurl",
            nc: "application/x-netcdf",
            oda: "application/oda",
            ogg: "application/ogg",
            pbm: "image/x-portable-bitmap",
            pct: "image/pict",
            pdb: "chemical/x-pdb",
            pdf: "application/pdf",
            pgm: "image/x-portable-graymap",
            pgn: "application/x-chess-pgn",
            pic: "image/pict",
            pict: "image/pict",
            png: "image/png",
            pnm: "image/x-portable-anymap",
            pnt: "image/x-macpaint",
            pntg: "image/x-macpaint",
            ppm: "image/x-portable-pixmap",
            ppt: "application/vnd.ms-powerpoint",
            pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
            ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
            ppam: "application/vnd.ms-powerpoint.addin.macroEnabled.12",
            pptm: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
            potm: "application/vnd.ms-powerpoint.template.macroEnabled.12",
            ppsm: "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
            ps: "application/postscript",
            qt: "video/quicktime",
            qti: "image/x-quicktime",
            qtif: "image/x-quicktime",
            ra: "audio/x-pn-realaudio",
            ram: "audio/x-pn-realaudio",
            ras: "image/x-cmu-raster",
            rdf: "application/rdf+xml",
            rgb: "image/x-rgb",
            rm: "application/vnd.rn-realmedia",
            roff: "application/x-troff",
            rtf: "text/rtf",
            rtx: "text/richtext",
            sgm: "text/sgml",
            sgml: "text/sgml",
            sh: "application/x-sh",
            shar: "application/x-shar",
            silo: "model/mesh",
            sit: "application/x-stuffit",
            skd: "application/x-koan",
            skm: "application/x-koan",
            skp: "application/x-koan",
            skt: "application/x-koan",
            smi: "application/smil",
            smil: "application/smil",
            snd: "audio/basic",
            so: "application/octet-stream",
            spl: "application/x-futuresplash",
            src: "application/x-wais-source",
            sv4cpio: "application/x-sv4cpio",
            sv4crc: "application/x-sv4crc",
            svg: "image/svg+xml",
            swf: "application/x-shockwave-flash",
            t: "application/x-troff",
            tar: "application/x-tar",
            tcl: "application/x-tcl",
            tex: "application/x-tex",
            texi: "application/x-texinfo",
            texinfo: "application/x-texinfo",
            tif: "image/tiff",
            tiff: "image/tiff",
            tr: "application/x-troff",
            tsv: "text/tab-separated-values",
            txt: "text/plain",
            ustar: "application/x-ustar",
            vcd: "application/x-cdlink",
            vrml: "model/vrml",
            vxml: "application/voicexml+xml",
            wav: "audio/x-wav",
            wbmp: "image/vnd.wap.wbmp",
            wbmxl: "application/vnd.wap.wbxml",
            wml: "text/vnd.wap.wml",
            wmlc: "application/vnd.wap.wmlc",
            wmls: "text/vnd.wap.wmlscript",
            wmlsc: "application/vnd.wap.wmlscriptc",
            wrl: "model/vrml",
            xbm: "image/x-xbitmap",
            xht: "application/xhtml+xml",
            xhtml: "application/xhtml+xml",
            xls: "application/vnd.ms-excel",
            xml: "application/xml",
            xpm: "image/x-xpixmap",
            xsl: "application/xml",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
            xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
            xltm: "application/vnd.ms-excel.template.macroEnabled.12",
            xlam: "application/vnd.ms-excel.addin.macroEnabled.12",
            xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
            xslt: "application/xslt+xml",
            xul: "application/vnd.mozilla.xul+xml",
            xwd: "image/x-xwindowdump",
            xyz: "chemical/x-xyz",
            zip: "application/zip"
        }, a = function (t, n) {
            var i = new e.Promise;
            if ("undefined" == typeof FileReader) return e.Promise.error(new e.Error(e.Error.FILE_READ_ERROR, "Attempted to use a FileReader on an unsupported browser."));
            var r = new FileReader;
            return r.onloadend = function () {
                if (2 !== r.readyState) return i.reject(new e.Error(e.Error.FILE_READ_ERROR, "Error reading file.")), void 0;
                var t = r.result,
                    s = /^data:([^;]*);base64,(.*)$/.exec(t);
                return s ? (i.resolve(s[2], n || s[1]), void 0) : (i.reject(new e.Error(e.ERROR.FILE_READ_ERROR, "Unable to interpret data URL: " + t)), void 0)
            }, r.readAsDataURL(t), i
        };
    e.File = function (t, i, o) {
        this._name = t;
        var u = /\.([^.]*)$/.exec(t);
        u && (u = u[1].toLowerCase());
        var c = o || s[u] || "text/plain";
        if (n.isArray(i)) this._source = e.Promise.as(r(i), c);
        else if (i && i.base64) {
            var l = /^data:([a-zA-Z]*\/[a-zA-Z+.-]*);(charset=[a-zA-Z0-9\-\/\s]*,)?base64,(\S+)/,
                h = l.exec(i.base64);
            this._source = h && h.length > 0 ? e.Promise.as(4 === h.length ? h[3] : h[2], h[1]) : e.Promise.as(i.base64, c)
        } else if ("undefined" != typeof File && i instanceof File) this._source = a(i, o);
        else if (n.isString(i)) throw "Creating a Parse.File from a String is not yet supported."
    }, e.File.prototype = {
        name: function () {
            return this._name
        },
        url: function () {
            return this._url
        },
        save: function (t) {
            t = t || {};
            var n = this;
            return n._previousSave || (n._previousSave = n._source.then(function (i, r) {
                var s = {
                    base64: i,
                    _ContentType: r
                };
                return e._request({
                    route: "files",
                    className: n._name,
                    method: "POST",
                    data: s,
                    useMasterKey: t.useMasterKey
                })
            }).then(function (t) {
                return n._name = t.name, n._url = t.url, n
            })), n._previousSave._thenRunCallbacks(t)
        }
    }
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Object = function (t, i) {
        if (n.isString(t)) return e.Object._create.apply(this, arguments);
        t = t || {}, i && i.parse && (t = this.parse(t));
        var r = e._getValue(this, "defaults");
        if (r && (t = n.extend({}, r, t)), i && i.collection && (this.collection = i.collection), this._serverData = {}, this._opSetQueue = [{}], this.attributes = {}, this._hashedJSON = {}, this._escapedAttributes = {}, this.cid = n.uniqueId("c"), this.changed = {}, this._silent = {}, this._pending = {}, !this.set(t, {
            silent: !0
        })) throw Error("Can't create an invalid Parse.Object");
        this.changed = {}, this._silent = {}, this._pending = {}, this._hasData = !0, this._previousAttributes = n.clone(this.attributes), this.initialize.apply(this, arguments)
    }, e.Object.saveAll = function (t, n) {
        return n = n || {}, e.Object._deepSaveAsync(t, {
            useMasterKey: n.useMasterKey
        })._thenRunCallbacks(n)
    }, e.Object.destroyAll = function (t, i) {
        i = i || {};
        var r = function (t) {
            t.trigger("destroy", t, t.collection, i)
        }, s = [],
            a = function (t) {
                var a = e.Promise.as();
                return t.length > 0 && (a = a.then(function () {
                    return e._request({
                        route: "batch",
                        method: "POST",
                        useMasterKey: i.useMasterKey,
                        data: {
                            requests: n.map(t, function (t) {
                                return {
                                    method: "DELETE",
                                    path: "/1/classes/" + t.className + "/" + t.id
                                }
                            })
                        }
                    })
                }).then(function (n) {
                    e._arrayEach(t, function (t, a) {
                        if (n[a].success && i.wait) r(t);
                        else if (n[a].error) {
                            var o = new e.Error(n[a].error.code, n[a].error.error);
                            o.object = t, s.push(o)
                        }
                    })
                })), a
            }, o = e.Promise.as(),
            u = [];
        return e._arrayEach(t, function (e, n) {
            if (e.id && i.wait || r(e), e.id && u.push(e), 20 === u.length || n + 1 === t.length) {
                var s = u;
                u = [], o = o.then(function () {
                    return a(s)
                })
            }
        }), o.then(function () {
            if (0 === s.length) return !0;
            var t = new e.Error(e.Error.AGGREGATE_ERROR, "Error deleting an object in destroyAll");
            return t.errors = s, e.Promise.error(t)
        })._thenRunCallbacks(i)
    }, n.extend(e.Object.prototype, e.Events, {
        _existed: !1,
        initialize: function () {},
        toJSON: function () {
            var t = this._toFullJSON();
            return e._arrayEach(["__type", "className"], function (e) {
                delete t[e]
            }), t
        },
        _toFullJSON: function (t) {
            var i = n.clone(this.attributes);
            return e._objectEach(i, function (n, r) {
                i[r] = e._encode(n, t)
            }), e._objectEach(this._operations, function (t, e) {
                i[e] = t
            }), n.has(this, "id") && (i.objectId = this.id), n.has(this, "createdAt") && (i.createdAt = n.isDate(this.createdAt) ? this.createdAt.toJSON() : this.createdAt), n.has(this, "updatedAt") && (i.updatedAt = n.isDate(this.updatedAt) ? this.updatedAt.toJSON() : this.updatedAt), i.__type = "Object", i.className = this.className, i
        },
        _refreshCache: function () {
            var t = this;
            t._refreshingCache || (t._refreshingCache = !0, e._objectEach(this.attributes, function (i, r) {
                i instanceof e.Object ? i._refreshCache() : n.isObject(i) && t._resetCacheForKey(r) && t.set(r, new e.Op.Set(i), {
                    silent: !0
                })
            }), delete t._refreshingCache)
        },
        dirty: function (t) {
            this._refreshCache();
            var e = n.last(this._opSetQueue);
            return t ? e[t] ? !0 : !1 : this.id ? n.keys(e).length > 0 ? !0 : !1 : !0
        },
        dirtyKeys: function () {
            return n.keys(n.last(this._opSetQueue))
        },
        _toPointer: function () {
            if (!this.id) throw Error("Can't serialize an unsaved Parse.Object");
            return {
                __type: "Pointer",
                className: this.className,
                objectId: this.id
            }
        },
        get: function (t) {
            return this.attributes[t]
        },
        relation: function (t) {
            var n = this.get(t);
            if (n) {
                if (!(n instanceof e.Relation)) throw "Called relation() on non-relation field " + t;
                return n._ensureParentAndKey(this, t), n
            }
            return new e.Relation(this, t)
        },
        escape: function (t) {
            var i = this._escapedAttributes[t];
            if (i) return i;
            var r, s = this.attributes[t];
            return r = e._isNullOrUndefined(s) ? "" : n.escape("" + s), this._escapedAttributes[t] = r, r
        },
        has: function (t) {
            return !e._isNullOrUndefined(this.attributes[t])
        },
        _mergeMagicFields: function (t) {
            var i = this,
                r = ["id", "objectId", "createdAt", "updatedAt"];
            e._arrayEach(r, function (r) {
                t[r] && ("objectId" === r ? i.id = t[r] : i[r] = "createdAt" !== r && "updatedAt" !== r || n.isDate(t[r]) ? t[r] : e._parseDate(t[r]), delete t[r])
            })
        },
        _startSave: function () {
            this._opSetQueue.push({})
        },
        _cancelSave: function () {
            var t = n.first(this._opSetQueue);
            this._opSetQueue = n.rest(this._opSetQueue);
            var i = n.first(this._opSetQueue);
            e._objectEach(t, function (e, n) {
                var r = t[n],
                    s = i[n];
                r && s ? i[n] = s._mergeWithPrevious(r) : r && (i[n] = r)
            }), this._saving = this._saving - 1
        },
        _finishSave: function (t) {
            var i = {};
            e._traverse(this.attributes, function (t) {
                t instanceof e.Object && t.id && t._hasData && (i[t.id] = t)
            });
            var r = n.first(this._opSetQueue);
            this._opSetQueue = n.rest(this._opSetQueue), this._applyOpSet(r, this._serverData), this._mergeMagicFields(t);
            var s = this;
            e._objectEach(t, function (t, n) {
                s._serverData[n] = e._decode(n, t);
                var r = e._traverse(s._serverData[n], function (t) {
                    return t instanceof e.Object && i[t.id] ? i[t.id] : void 0
                });
                r && (s._serverData[n] = r)
            }), this._rebuildAllEstimatedData(), this._saving = this._saving - 1
        },
        _finishFetch: function (t, n) {
            this._opSetQueue = [{}], this._mergeMagicFields(t);
            var i = this,
                r = {};
            e._objectEach(t, function (t, n) {
                r[n] = e._decode(n, t)
            }), i._serverData = r, this._rebuildAllEstimatedData(), this._refreshCache(), this._opSetQueue = [{}], this._hasData = n
        },
        _applyOpSet: function (t, n) {
            var i = this;
            e._objectEach(t, function (t, r) {
                n[r] = t._estimate(n[r], i, r), n[r] === e.Op._UNSET && delete n[r]
            })
        },
        _resetCacheForKey: function (t) {
            var i = this.attributes[t];
            if (!(!n.isObject(i) || i instanceof e.Object || i instanceof e.File)) {
                i = i.toJSON ? i.toJSON() : i;
                var r = JSON.stringify(i);
                if (this._hashedJSON[t] !== r) return this._hashedJSON[t] = r, !0
            }
            return !1
        },
        _rebuildEstimatedDataForKey: function (t) {
            var n = this;
            delete this.attributes[t], this._serverData[t] && (this.attributes[t] = this._serverData[t]), e._arrayEach(this._opSetQueue, function (i) {
                var r = i[t];
                r && (n.attributes[t] = r._estimate(n.attributes[t], n, t), n.attributes[t] === e.Op._UNSET ? delete n.attributes[t] : n._resetCacheForKey(t))
            })
        },
        _rebuildAllEstimatedData: function () {
            var t = this,
                i = n.clone(this.attributes);
            this.attributes = n.clone(this._serverData), e._arrayEach(this._opSetQueue, function (n) {
                t._applyOpSet(n, t.attributes), e._objectEach(n, function (e, n) {
                    t._resetCacheForKey(n)
                })
            }), e._objectEach(i, function (e, n) {
                t.attributes[n] !== e && t.trigger("change:" + n, t, t.attributes[n], {})
            }), e._objectEach(this.attributes, function (e, r) {
                n.has(i, r) || t.trigger("change:" + r, t, e, {})
            })
        },
        set: function (t, i, r) {
            var s;
            if (n.isObject(t) || e._isNullOrUndefined(t) ? (s = t, e._objectEach(s, function (t, n) {
                s[n] = e._decode(n, t)
            }), r = i) : (s = {}, s[t] = e._decode(t, i)), r = r || {}, !s) return this;
            s instanceof e.Object && (s = s.attributes), r.unset && e._objectEach(s, function (t, n) {
                s[n] = new e.Op.Unset
            });
            var a = n.clone(s),
                o = this;
            if (e._objectEach(a, function (t, n) {
                t instanceof e.Op && (a[n] = t._estimate(o.attributes[n], o, n), a[n] === e.Op._UNSET && delete a[n])
            }), !this._validate(s, r)) return !1;
            this._mergeMagicFields(s), r.changes = {};
            var u = this._escapedAttributes;
            return this._previousAttributes || {}, e._arrayEach(n.keys(s), function (t) {
                var i = s[t];
                i instanceof e.Relation && (i.parent = o), i instanceof e.Op || (i = new e.Op.Set(i));
                var a = !0;
                i instanceof e.Op.Set && n.isEqual(o.attributes[t], i.value) && (a = !1), a && (delete u[t], r.silent ? o._silent[t] = !0 : r.changes[t] = !0);
                var c = n.last(o._opSetQueue);
                c[t] = i._mergeWithPrevious(c[t]), o._rebuildEstimatedDataForKey(t), a ? (o.changed[t] = o.attributes[t], r.silent || (o._pending[t] = !0)) : (delete o.changed[t], delete o._pending[t])
            }), r.silent || this.change(r), this
        },
        unset: function (t, e) {
            return e = e || {}, e.unset = !0, this.set(t, null, e)
        },
        increment: function (t, i) {
            return (n.isUndefined(i) || n.isNull(i)) && (i = 1), this.set(t, new e.Op.Increment(i))
        },
        add: function (t, n) {
            return this.set(t, new e.Op.Add([n]))
        },
        addUnique: function (t, n) {
            return this.set(t, new e.Op.AddUnique([n]))
        },
        remove: function (t, n) {
            return this.set(t, new e.Op.Remove([n]))
        },
        op: function (t) {
            return n.last(this._opSetQueue)[t]
        },
        clear: function (t) {
            t = t || {}, t.unset = !0;
            var e = n.extend(this.attributes, this._operations);
            return this.set(e, t)
        },
        _getSaveJSON: function () {
            var t = n.clone(n.first(this._opSetQueue));
            return e._objectEach(t, function (e, n) {
                t[n] = e.toJSON()
            }), t
        },
        _canBeSerialized: function () {
            return e.Object._canBeSerializedAsValue(this.attributes)
        },
        fetch: function (t) {
            var n = this;
            t = t || {};
            var i = e._request({
                method: "GET",
                route: "classes",
                className: this.className,
                objectId: this.id,
                useMasterKey: t.useMasterKey
            });
            return i.then(function (t, e, i) {
                return n._finishFetch(n.parse(t, e, i), !0), n
            })._thenRunCallbacks(t, this)
        },
        save: function (t, i, r) {
            var s, a, o;
            if (n.isObject(t) || e._isNullOrUndefined(t) ? (s = t, o = i) : (s = {}, s[t] = i, o = r), !o && s) {
                var u = n.reject(s, function (t, e) {
                    return n.include(["success", "error", "wait"], e)
                });
                if (0 === u.length) {
                    var c = !0;
                    if (n.has(s, "success") && !n.isFunction(s.success) && (c = !1), n.has(s, "error") && !n.isFunction(s.error) && (c = !1), c) return this.save(null, s)
                }
            }
            o = n.clone(o) || {}, o.wait && (a = n.clone(this.attributes));
            var l = n.clone(o) || {};
            l.wait && (l.silent = !0);
            var h;
            if (l.error = function (t, e) {
                h = e
            }, s && !this.set(s, l)) return e.Promise.error(h)._thenRunCallbacks(o, this);
            var f = this;
            f._refreshCache();
            var d = [],
                p = [];
            return e.Object._findUnsavedChildren(f.attributes, d, p), d.length + p.length > 0 ? e.Object._deepSaveAsync(this.attributes, {
                useMasterKey: o.useMasterKey
            }).then(function () {
                return f.save(null, o)
            }, function (t) {
                return e.Promise.error(t)._thenRunCallbacks(o, f)
            }) : (this._startSave(), this._saving = (this._saving || 0) + 1, this._allPreviousSaves = this._allPreviousSaves || e.Promise.as(), this._allPreviousSaves = this._allPreviousSaves._continueWith(function () {
                var t = f.id ? "PUT" : "POST",
                    i = f._getSaveJSON(),
                    r = "classes",
                    u = f.className;
                "_User" !== f.className || f.id || (r = "users", u = null);
                var c = e._request({
                    route: r,
                    className: u,
                    objectId: f.id,
                    method: t,
                    useMasterKey: o.useMasterKey,
                    data: i
                });
                return c = c.then(function (t, e, i) {
                    var r = f.parse(t, e, i);
                    return o.wait && (r = n.extend(s || {}, r)), f._finishSave(r), o.wait && f.set(a, l), f
                }, function (t) {
                    return f._cancelSave(), e.Promise.error(t)
                })._thenRunCallbacks(o, f)
            }), this._allPreviousSaves)
        },
        destroy: function (t) {
            t = t || {};
            var n = this,
                i = function () {
                    n.trigger("destroy", n, n.collection, t)
                };
            if (!this.id) return i();
            t.wait || i();
            var r = e._request({
                route: "classes",
                className: this.className,
                objectId: this.id,
                method: "DELETE",
                useMasterKey: t.useMasterKey
            });
            return r.then(function () {
                return t.wait && i(), n
            })._thenRunCallbacks(t, this)
        },
        parse: function (t, i) {
            var r = n.clone(t);
            return n(["createdAt", "updatedAt"]).each(function (t) {
                r[t] && (r[t] = e._parseDate(r[t]))
            }), r.updatedAt || (r.updatedAt = r.createdAt), i && (this._existed = 201 !== i), r
        },
        clone: function () {
            return new this.constructor(this.attributes)
        },
        isNew: function () {
            return !this.id
        },
        change: function (t) {
            t = t || {};
            var i = this._changing;
            this._changing = !0;
            var r = this;
            e._objectEach(this._silent, function (t) {
                r._pending[t] = !0
            });
            var s = n.extend({}, t.changes, this._silent);
            if (this._silent = {}, e._objectEach(s, function (e, n) {
                r.trigger("change:" + n, r, r.get(n), t)
            }), i) return this;
            for (var a = function (t, e) {
                r._pending[e] || r._silent[e] || delete r.changed[e]
            }; !n.isEmpty(this._pending);) this._pending = {}, this.trigger("change", this, t), e._objectEach(this.changed, a), r._previousAttributes = n.clone(this.attributes);
            return this._changing = !1, this
        },
        existed: function () {
            return this._existed
        },
        hasChanged: function (t) {
            return arguments.length ? this.changed && n.has(this.changed, t) : !n.isEmpty(this.changed)
        },
        changedAttributes: function (t) {
            if (!t) return this.hasChanged() ? n.clone(this.changed) : !1;
            var i = {}, r = this._previousAttributes;
            return e._objectEach(t, function (t, e) {
                n.isEqual(r[e], t) || (i[e] = t)
            }), i
        },
        previous: function (t) {
            return arguments.length && this._previousAttributes ? this._previousAttributes[t] : null
        },
        previousAttributes: function () {
            return n.clone(this._previousAttributes)
        },
        isValid: function () {
            return !this.validate(this.attributes)
        },
        validate: function (t) {
            if (n.has(t, "ACL") && !(t.ACL instanceof e.ACL)) return new e.Error(e.Error.OTHER_CAUSE, "ACL must be a Parse.ACL.");
            var i = !0;
            return e._objectEach(t, function (t, e) {
                /^[A-Za-z][0-9A-Za-z_]*$/.test(e) || (i = !1)
            }), i ? !1 : new e.Error(e.Error.INVALID_KEY_NAME)
        },
        _validate: function (t, e) {
            if (e.silent || !this.validate) return !0;
            t = n.extend({}, this.attributes, t);
            var i = this.validate(t, e);
            return i ? (e && e.error ? e.error(this, i, e) : this.trigger("error", this, i, e), !1) : !0
        },
        getACL: function () {
            return this.get("ACL")
        },
        setACL: function (t, e) {
            return this.set("ACL", t, e)
        }
    }), e.Object._getSubclass = function (t) {
        if (!n.isString(t)) throw "Parse.Object._getSubclass requires a string argument.";
        var i = e.Object._classMap[t];
        return i || (i = e.Object.extend(t), e.Object._classMap[t] = i), i
    }, e.Object._create = function (t, n, i) {
        var r = e.Object._getSubclass(t);
        return new r(n, i)
    }, e.Object._classMap = {}, e.Object._extend = e._extend, e.Object.extend = function (t, i, r) {
        if (!n.isString(t)) {
            if (t && n.has(t, "className")) return e.Object.extend(t.className, t, i);
            throw Error("Parse.Object.extend's first argument should be the className.")
        }
        "User" === t && e.User._performUserRewrite && (t = "_User"), i = i || {}, i.className = t;
        var s = null;
        if (n.has(e.Object._classMap, t)) {
            var a = e.Object._classMap[t];
            s = a._extend(i, r)
        } else s = this._extend(i, r);
        return s.extend = function (i) {
            if (n.isString(i) || i && n.has(i, "className")) return e.Object.extend.apply(s, arguments);
            var r = [t].concat(e._.toArray(arguments));
            return e.Object.extend.apply(s, r)
        }, e.Object._classMap[t] = s, s
    }, e.Object._findUnsavedChildren = function (t, n, i) {
        e._traverse(t, function (t) {
            return t instanceof e.Object ? (t._refreshCache(), t.dirty() && n.push(t), void 0) : t instanceof e.File ? (t.url() || i.push(t), void 0) : void 0
        })
    }, e.Object._canBeSerializedAsValue = function (t) {
        if (t instanceof e.Object) return !!t.id;
        if (t instanceof e.File) return !0;
        var i = !0;
        return n.isArray(t) ? e._arrayEach(t, function (t) {
            e.Object._canBeSerializedAsValue(t) || (i = !1)
        }) : n.isObject(t) && e._objectEach(t, function (t) {
            e.Object._canBeSerializedAsValue(t) || (i = !1)
        }), i
    }, e.Object._deepSaveAsync = function (t, i) {
        var r = [],
            s = [];
        e.Object._findUnsavedChildren(t, r, s);
        var a = e.Promise.as();
        n.each(s, function (t) {
            a = a.then(function () {
                return t.save(i)
            })
        });
        var o = n.uniq(r),
            u = n.uniq(o);
        return a.then(function () {
            return e.Promise._continueWhile(function () {
                return u.length > 0
            }, function () {
                var t = [],
                    r = [];
                if (e._arrayEach(u, function (e) {
                    return t.length > 20 ? (r.push(e), void 0) : (e._canBeSerialized() ? t.push(e) : r.push(e), void 0)
                }), u = r, 0 === t.length) return e.Promise.error(new e.Error(e.Error.OTHER_CAUSE, "Tried to save a batch with a cycle."));
                var s = e.Promise.when(n.map(t, function (t) {
                    return t._allPreviousSaves || e.Promise.as()
                })),
                    a = new e.Promise;
                return e._arrayEach(t, function (t) {
                    t._allPreviousSaves = a
                }), s._continueWith(function () {
                    return e._request({
                        route: "batch",
                        method: "POST",
                        useMasterKey: i.useMasterKey,
                        data: {
                            requests: n.map(t, function (t) {
                                var e = t._getSaveJSON(),
                                    n = "POST",
                                    i = "/1/classes/" + t.className;
                                return t.id && (i = i + "/" + t.id, n = "PUT"), t._startSave(), {
                                    method: n,
                                    path: i,
                                    body: e
                                }
                            })
                        }
                    }).then(function (n, i, r) {
                        var s;
                        return e._arrayEach(t, function (t, e) {
                            n[e].success ? t._finishSave(t.parse(n[e].success, i, r)) : (s = s || n[e].error, t._cancelSave())
                        }), s ? e.Promise.error(new e.Error(s.code, s.error)) : void 0
                    }).then(function (t) {
                        return a.resolve(t), t
                    }, function (t) {
                        return a.reject(t), e.Promise.error(t)
                    })
                })
            })
        }).then(function () {
            return t
        })
    }
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Role = e.Object.extend("_Role", {
        constructor: function (t, i) {
            n.isString(t) && i instanceof e.ACL ? (e.Object.prototype.constructor.call(this, null, null), this.setName(t), this.setACL(i)) : e.Object.prototype.constructor.call(this, t, i)
        },
        getName: function () {
            return this.get("name")
        },
        setName: function (t, e) {
            return this.set("name", t, e)
        },
        getUsers: function () {
            return this.relation("users")
        },
        getRoles: function () {
            return this.relation("roles")
        },
        validate: function (t, i) {
            if ("name" in t && t.name !== this.getName()) {
                var r = t.name;
                if (this.id && this.id !== t.objectId) return new e.Error(e.Error.OTHER_CAUSE, "A role's name can only be set before it has been saved.");
                if (!n.isString(r)) return new e.Error(e.Error.OTHER_CAUSE, "A role's name must be a String.");
                if (!/^[0-9a-zA-Z\-_ ]+$/.test(r)) return new e.Error(e.Error.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _, -, and spaces.")
            }
            return e.Object.prototype.validate ? e.Object.prototype.validate.call(this, t, i) : !1
        }
    })
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Collection = function (t, e) {
        e = e || {}, e.comparator && (this.comparator = e.comparator), e.model && (this.model = e.model), e.query && (this.query = e.query), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, {
            silent: !0,
            parse: e.parse
        })
    }, n.extend(e.Collection.prototype, e.Events, {
        model: e.Object,
        initialize: function () {},
        toJSON: function () {
            return this.map(function (t) {
                return t.toJSON()
            })
        },
        add: function (t, i) {
            var r, s, a, o, u, c, l = {}, h = {};
            for (i = i || {}, t = n.isArray(t) ? t.slice() : [t], r = 0, a = t.length; a > r; r++) {
                if (t[r] = this._prepareModel(t[r], i), o = t[r], !o) throw Error("Can't add an invalid model to a collection");
                if (u = o.cid, l[u] || this._byCid[u]) throw Error("Duplicate cid: can't add the same model to a collection twice");
                if (c = o.id, !e._isNullOrUndefined(c) && (h[c] || this._byId[c])) throw Error("Duplicate id: can't add the same model to a collection twice");
                h[c] = o, l[u] = o
            }
            for (r = 0; a > r; r++)(o = t[r]).on("all", this._onModelEvent, this), this._byCid[o.cid] = o, o.id && (this._byId[o.id] = o);
            if (this.length += a, s = e._isNullOrUndefined(i.at) ? this.models.length : i.at, this.models.splice.apply(this.models, [s, 0].concat(t)), this.comparator && this.sort({
                silent: !0
            }), i.silent) return this;
            for (r = 0, a = this.models.length; a > r; r++) o = this.models[r], l[o.cid] && (i.index = r, o.trigger("add", o, this, i));
            return this
        },
        remove: function (t, e) {
            var i, r, s, a;
            for (e = e || {}, t = n.isArray(t) ? t.slice() : [t], i = 0, r = t.length; r > i; i++) a = this.getByCid(t[i]) || this.get(t[i]), a && (delete this._byId[a.id], delete this._byCid[a.cid], s = this.indexOf(a), this.models.splice(s, 1), this.length--, e.silent || (e.index = s, a.trigger("remove", a, this, e)), this._removeReference(a));
            return this
        },
        get: function (t) {
            return t && this._byId[t.id || t]
        },
        getByCid: function (t) {
            return t && this._byCid[t.cid || t]
        },
        at: function (t) {
            return this.models[t]
        },
        sort: function (t) {
            if (t = t || {}, !this.comparator) throw Error("Cannot sort a set without a comparator");
            var e = n.bind(this.comparator, this);
            return 1 === this.comparator.length ? this.models = this.sortBy(e) : this.models.sort(e), t.silent || this.trigger("reset", this, t), this
        },
        pluck: function (t) {
            return n.map(this.models, function (e) {
                return e.get(t)
            })
        },
        reset: function (t, n) {
            var i = this;
            return t = t || [], n = n || {}, e._arrayEach(this.models, function (t) {
                i._removeReference(t)
            }), this._reset(), this.add(t, {
                silent: !0,
                parse: n.parse
            }), n.silent || this.trigger("reset", this, n), this
        },
        fetch: function (t) {
            t = n.clone(t) || {}, void 0 === t.parse && (t.parse = !0);
            var i = this,
                r = this.query || new e.Query(this.model);
            return r.find({
                useMasterKey: t.useMasterKey
            }).then(function (e) {
                return t.add ? i.add(e, t) : i.reset(e, t), i
            })._thenRunCallbacks(t, this)
        },
        create: function (t, e) {
            var i = this;
            if (e = e ? n.clone(e) : {}, t = this._prepareModel(t, e), !t) return !1;
            e.wait || i.add(t, e);
            var r = e.success;
            return e.success = function (n, s) {
                e.wait && i.add(n, e), r ? r(n, s) : n.trigger("sync", t, s, e)
            }, t.save(null, e), t
        },
        parse: function (t) {
            return t
        },
        chain: function () {
            return n(this.models).chain()
        },
        _reset: function () {
            this.length = 0, this.models = [], this._byId = {}, this._byCid = {}
        },
        _prepareModel: function (t, n) {
            if (t instanceof e.Object) t.collection || (t.collection = this);
            else {
                var i = t;
                n.collection = this, t = new this.model(i, n), t._validate(t.attributes, n) || (t = !1)
            }
            return t
        },
        _removeReference: function (t) {
            this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function (t, e, n, i) {
            ("add" !== t && "remove" !== t || n === this) && ("destroy" === t && this.remove(e, i), e && "change:objectId" === t && (delete this._byId[e.previous("objectId")], this._byId[e.id] = e), this.trigger.apply(this, arguments))
        }
    });
    var i = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"];
    e._arrayEach(i, function (t) {
        e.Collection.prototype[t] = function () {
            return n[t].apply(n, [this.models].concat(n.toArray(arguments)))
        }
    }), e.Collection.extend = e._extend
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.View = function (t) {
        this.cid = n.uniqueId("view"), this._configure(t || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
    };
    var i = /^(\S+)\s*(.*)$/,
        r = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    n.extend(e.View.prototype, e.Events, {
        tagName: "div",
        $: function (t) {
            return this.$el.find(t)
        },
        initialize: function () {},
        render: function () {
            return this
        },
        remove: function () {
            return this.$el.remove(), this
        },
        make: function (t, n, i) {
            var r = document.createElement(t);
            return n && e.$(r).attr(n), i && e.$(r).html(i), r
        },
        setElement: function (t, n) {
            return this.$el = e.$(t), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
        },
        delegateEvents: function (t) {
            if (t = t || e._getValue(this, "events")) {
                this.undelegateEvents();
                var r = this;
                e._objectEach(t, function (e, s) {
                    if (n.isFunction(e) || (e = r[t[s]]), !e) throw Error('Event "' + t[s] + '" does not exist');
                    var a = s.match(i),
                        o = a[1],
                        u = a[2];
                    e = n.bind(e, r), o += ".delegateEvents" + r.cid, "" === u ? r.$el.bind(o, e) : r.$el.delegate(u, o, e)
                })
            }
        },
        undelegateEvents: function () {
            this.$el.unbind(".delegateEvents" + this.cid)
        },
        _configure: function (t) {
            this.options && (t = n.extend({}, this.options, t));
            var e = this;
            n.each(r, function (n) {
                t[n] && (e[n] = t[n])
            }), this.options = t
        },
        _ensureElement: function () {
            if (this.el) this.setElement(this.el, !1);
            else {
                var t = e._getValue(this, "attributes") || {};
                this.id && (t.id = this.id), this.className && (t["class"] = this.className), this.setElement(this.make(this.tagName, t), !1)
            }
        }
    }), e.View.extend = e._extend
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.User = e.Object.extend("_User", {
        _isCurrentUser: !1,
        _mergeMagicFields: function (t) {
            t.sessionToken && (this._sessionToken = t.sessionToken, delete t.sessionToken), e.User.__super__._mergeMagicFields.call(this, t)
        },
        _cleanupAuthData: function () {
            if (this.isCurrent()) {
                var t = this.get("authData");
                t && e._objectEach(this.get("authData"), function (e, n) {
                    t[n] || delete t[n]
                })
            }
        },
        _synchronizeAllAuthData: function () {
            var t = this.get("authData");
            if (t) {
                var n = this;
                e._objectEach(this.get("authData"), function (t, e) {
                    n._synchronizeAuthData(e)
                })
            }
        },
        _synchronizeAuthData: function (t) {
            if (this.isCurrent()) {
                var i;
                n.isString(t) ? (i = t, t = e.User._authProviders[i]) : i = t.getAuthType();
                var r = this.get("authData");
                if (r && t) {
                    var s = t.restoreAuthentication(r[i]);
                    s || this._unlinkFrom(t)
                }
            }
        },
        _handleSaveResult: function (t) {
            t && (this._isCurrentUser = !0), this._cleanupAuthData(), this._synchronizeAllAuthData(), delete this._serverData.password, this._rebuildEstimatedDataForKey("password"), this._refreshCache(), (t || this.isCurrent()) && e.User._saveCurrentUser(this)
        },
        _linkWith: function (t, i) {
            var r;
            if (n.isString(t) ? (r = t, t = e.User._authProviders[t]) : r = t.getAuthType(), n.has(i, "authData")) {
                var s = this.get("authData") || {};
                s[r] = i.authData, this.set("authData", s);
                var a = n.clone(i) || {};
                return a.success = function (t) {
                    t._handleSaveResult(!0), i.success && i.success.apply(this, arguments)
                }, this.save({
                    authData: s
                }, a)
            }
            var o = this,
                u = new e.Promise;
            return t.authenticate({
                success: function (t, e) {
                    o._linkWith(t, {
                        authData: e,
                        success: i.success,
                        error: i.error
                    }).then(function () {
                        u.resolve(o)
                    })
                },
                error: function (t, e) {
                    i.error && i.error(o, e), u.reject(e)
                }
            }), u
        },
        _unlinkFrom: function (t, i) {
            var r;
            n.isString(t) ? (r = t, t = e.User._authProviders[t]) : r = t.getAuthType();
            var s = n.clone(i),
                a = this;
            return s.authData = null, s.success = function () {
                a._synchronizeAuthData(t), i.success && i.success.apply(this, arguments)
            }, this._linkWith(t, s)
        },
        _isLinked: function (t) {
            var e;
            e = n.isString(t) ? t : t.getAuthType();
            var i = this.get("authData") || {};
            return !!i[e]
        },
        _logOutWithAll: function () {
            var t = this.get("authData");
            if (t) {
                var n = this;
                e._objectEach(this.get("authData"), function (t, e) {
                    n._logOutWith(e)
                })
            }
        },
        _logOutWith: function (t) {
            this.isCurrent() && (n.isString(t) && (t = e.User._authProviders[t]), t && t.deauthenticate && t.deauthenticate())
        },
        signUp: function (t, i) {
            var r;
            i = i || {};
            var s = t && t.username || this.get("username");
            if (!s || "" === s) return r = new e.Error(e.Error.OTHER_CAUSE, "Cannot sign up user with an empty name."), i && i.error && i.error(this, r), e.Promise.error(r);
            var a = t && t.password || this.get("password");
            if (!a || "" === a) return r = new e.Error(e.Error.OTHER_CAUSE, "Cannot sign up user with an empty password."), i && i.error && i.error(this, r), e.Promise.error(r);
            var o = n.clone(i);
            return o.success = function (t) {
                t._handleSaveResult(!0), i.success && i.success.apply(this, arguments)
            }, this.save(t, o)
        },
        logIn: function (t) {
            var n = this;
            t = t || {};
            var i = e._request({
                route: "login",
                method: "GET",
                useMasterKey: t.useMasterKey,
                data: this.toJSON()
            });
            return i.then(function (t, e, i) {
                var r = n.parse(t, e, i);
                return n._finishFetch(r), n._handleSaveResult(!0), n
            })._thenRunCallbacks(t, this)
        },
        save: function (t, i, r) {
            var s, a;
            n.isObject(t) || n.isNull(t) || n.isUndefined(t) ? (s = t, a = i) : (s = {}, s[t] = i, a = r), a = a || {};
            var o = n.clone(a);
            return o.success = function (t) {
                t._handleSaveResult(!1), a.success && a.success.apply(this, arguments)
            }, e.Object.prototype.save.call(this, s, o)
        },
        fetch: function (t) {
            var i = t ? n.clone(t) : {};
            return i.success = function (e) {
                e._handleSaveResult(!1), t && t.success && t.success.apply(this, arguments)
            }, e.Object.prototype.fetch.call(this, i)
        },
        isCurrent: function () {
            return this._isCurrentUser
        },
        getUsername: function () {
            return this.get("username")
        },
        setUsername: function (t, e) {
            return this.set("username", t, e)
        },
        setPassword: function (t, e) {
            return this.set("password", t, e)
        },
        getEmail: function () {
            return this.get("email")
        },
        setEmail: function (t, e) {
            return this.set("email", t, e)
        },
        authenticated: function () {
            return !!this._sessionToken && e.User.current() && e.User.current().id === this.id
        },
        getSessionToken: function () {
            return this._sessionToken
        }
    }, {
        _currentUser: null,
        _currentUserMatchesDisk: !1,
        _CURRENT_USER_KEY: "currentUser",
        _authProviders: {},
        _performUserRewrite: !0,
        signUp: function (t, n, i, r) {
            i = i || {}, i.username = t, i.password = n;
            var s = e.Object._create("_User");
            return s.signUp(i, r)
        },
        logIn: function (t, n, i) {
            var r = e.Object._create("_User");
            return r._finishFetch({
                username: t,
                password: n
            }), r.logIn(i)
        },
        become: function (t, n) {
            n = n || {};
            var i = e.Object._create("_User");
            return e._request({
                route: "users",
                className: "me",
                method: "GET",
                useMasterKey: n.useMasterKey,
                sessionToken: t
            }).then(function (t, e, n) {
                var r = i.parse(t, e, n);
                return i._finishFetch(r), i._handleSaveResult(!0), i
            })._thenRunCallbacks(n, i)
        },
        logOut: function () {
            null !== e.User._currentUser && (e.User._currentUser._logOutWithAll(), e.User._currentUser._isCurrentUser = !1), e.User._currentUserMatchesDisk = !0, e.User._currentUser = null, e.localStorage.removeItem(e._getParsePath(e.User._CURRENT_USER_KEY))
        },
        requestPasswordReset: function (t, n) {
            n = n || {};
            var i = e._request({
                route: "requestPasswordReset",
                method: "POST",
                useMasterKey: n.useMasterKey,
                data: {
                    email: t
                }
            });
            return i._thenRunCallbacks(n)
        },
        current: function () {
            if (e.User._currentUser) return e.User._currentUser;
            if (e.User._currentUserMatchesDisk) return e.User._currentUser;
            e.User._currentUserMatchesDisk = !0;
            var t = e.localStorage.getItem(e._getParsePath(e.User._CURRENT_USER_KEY));
            if (!t) return null;
            e.User._currentUser = e.Object._create("_User"), e.User._currentUser._isCurrentUser = !0;
            var n = JSON.parse(t);
            return e.User._currentUser.id = n._id, delete n._id, e.User._currentUser._sessionToken = n._sessionToken, delete n._sessionToken, e.User._currentUser.set(n), e.User._currentUser._synchronizeAllAuthData(), e.User._currentUser._refreshCache(), e.User._currentUser._opSetQueue = [{}], e.User._currentUser
        },
        allowCustomUserClass: function (t) {
            this._performUserRewrite = !t
        },
        _saveCurrentUser: function (t) {
            e.User._currentUser !== t && e.User.logOut(), t._isCurrentUser = !0, e.User._currentUser = t, e.User._currentUserMatchesDisk = !0;
            var n = t.toJSON();
            n._id = t.id, n._sessionToken = t._sessionToken, e.localStorage.setItem(e._getParsePath(e.User._CURRENT_USER_KEY), JSON.stringify(n))
        },
        _registerAuthenticationProvider: function (t) {
            e.User._authProviders[t.getAuthType()] = t, e.User.current() && e.User.current()._synchronizeAuthData(t.getAuthType())
        },
        _logInWith: function (t, n) {
            var i = e.Object._create("_User");
            return i._linkWith(t, n)
        }
    })
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Query = function (t) {
        n.isString(t) && (t = e.Object._getSubclass(t)), this.objectClass = t, this.className = t.prototype.className, this._where = {}, this._include = [], this._limit = -1, this._skip = 0, this._extraOptions = {}
    }, e.Query.or = function () {
        var t = n.toArray(arguments),
            i = null;
        e._arrayEach(t, function (t) {
            if (n.isNull(i) && (i = t.className), i !== t.className) throw "All queries must be for the same class"
        });
        var r = new e.Query(i);
        return r._orQuery(t), r
    }, e.Query.prototype = {
        get: function (t, n) {
            var i = this;
            return i.equalTo("objectId", t), i.first().then(function (t) {
                if (t) return t;
                var n = new e.Error(e.Error.OBJECT_NOT_FOUND, "Object not found.");
                return e.Promise.error(n)
            })._thenRunCallbacks(n, null)
        },
        toJSON: function () {
            var t = {
                where: this._where
            };
            return this._include.length > 0 && (t.include = this._include.join(",")), this._select && (t.keys = this._select.join(",")), this._limit >= 0 && (t.limit = this._limit), this._skip > 0 && (t.skip = this._skip), void 0 !== this._order && (t.order = this._order), e._objectEach(this._extraOptions, function (e, n) {
                t[n] = e
            }), t
        },
        find: function (t) {
            var i = this;
            t = t || {};
            var r = e._request({
                route: "classes",
                className: this.className,
                method: "GET",
                useMasterKey: t.useMasterKey,
                data: this.toJSON()
            });
            return r.then(function (t) {
                return n.map(t.results, function (n) {
                    var r;
                    return r = t.className ? new e.Object(t.className) : new i.objectClass, r._finishFetch(n, !0), r
                })
            })._thenRunCallbacks(t)
        },
        count: function (t) {
            var n = this;
            t = t || {};
            var i = this.toJSON();
            i.limit = 0, i.count = 1;
            var r = e._request({
                route: "classes",
                className: n.className,
                method: "GET",
                useMasterKey: t.useMasterKey,
                data: i
            });
            return r.then(function (t) {
                return t.count
            })._thenRunCallbacks(t)
        },
        first: function (t) {
            var i = this;
            t = t || {};
            var r = this.toJSON();
            r.limit = 1;
            var s = e._request({
                route: "classes",
                className: this.className,
                method: "GET",
                useMasterKey: t.useMasterKey,
                data: r
            });
            return s.then(function (t) {
                return n.map(t.results, function (t) {
                    var e = new i.objectClass;
                    return e._finishFetch(t, !0), e
                })[0]
            })._thenRunCallbacks(t)
        },
        collection: function (t, i) {
            return i = i || {}, new e.Collection(t, n.extend(i, {
                model: this.objectClass,
                query: this
            }))
        },
        skip: function (t) {
            return this._skip = t, this
        },
        limit: function (t) {
            return this._limit = t, this
        },
        equalTo: function (t, i) {
            return n.isUndefined(i) ? this.doesNotExist(t) : (this._where[t] = e._encode(i), this)
        },
        _addCondition: function (t, n, i) {
            return this._where[t] || (this._where[t] = {}), this._where[t][n] = e._encode(i), this
        },
        notEqualTo: function (t, e) {
            return this._addCondition(t, "$ne", e), this
        },
        lessThan: function (t, e) {
            return this._addCondition(t, "$lt", e), this
        },
        greaterThan: function (t, e) {
            return this._addCondition(t, "$gt", e), this
        },
        lessThanOrEqualTo: function (t, e) {
            return this._addCondition(t, "$lte", e), this
        },
        greaterThanOrEqualTo: function (t, e) {
            return this._addCondition(t, "$gte", e), this
        },
        containedIn: function (t, e) {
            return this._addCondition(t, "$in", e), this
        },
        notContainedIn: function (t, e) {
            return this._addCondition(t, "$nin", e), this
        },
        containsAll: function (t, e) {
            return this._addCondition(t, "$all", e), this
        },
        exists: function (t) {
            return this._addCondition(t, "$exists", !0), this
        },
        doesNotExist: function (t) {
            return this._addCondition(t, "$exists", !1), this
        },
        matches: function (t, e, n) {
            return this._addCondition(t, "$regex", e), n || (n = ""), e.ignoreCase && (n += "i"), e.multiline && (n += "m"), n && n.length && this._addCondition(t, "$options", n), this
        },
        matchesQuery: function (t, e) {
            var n = e.toJSON();
            return n.className = e.className, this._addCondition(t, "$inQuery", n), this
        },
        doesNotMatchQuery: function (t, e) {
            var n = e.toJSON();
            return n.className = e.className, this._addCondition(t, "$notInQuery", n), this
        },
        matchesKeyInQuery: function (t, e, n) {
            var i = n.toJSON();
            return i.className = n.className, this._addCondition(t, "$select", {
                key: e,
                query: i
            }), this
        },
        doesNotMatchKeyInQuery: function (t, e, n) {
            var i = n.toJSON();
            return i.className = n.className, this._addCondition(t, "$dontSelect", {
                key: e,
                query: i
            }), this
        },
        _orQuery: function (t) {
            var e = n.map(t, function (t) {
                return t.toJSON().where
            });
            return this._where.$or = e, this
        },
        _quote: function (t) {
            return "\\Q" + t.replace("\\E", "\\E\\\\E\\Q") + "\\E"
        },
        contains: function (t, e) {
            return this._addCondition(t, "$regex", this._quote(e)), this
        },
        startsWith: function (t, e) {
            return this._addCondition(t, "$regex", "^" + this._quote(e)), this
        },
        endsWith: function (t, e) {
            return this._addCondition(t, "$regex", this._quote(e) + "$"), this
        },
        ascending: function (t) {
            return this._order = t, this
        },
        descending: function (t) {
            return this._order = "-" + t, this
        },
        near: function (t, n) {
            return n instanceof e.GeoPoint || (n = new e.GeoPoint(n)), this._addCondition(t, "$nearSphere", n), this
        },
        withinRadians: function (t, e, n) {
            return this.near(t, e), this._addCondition(t, "$maxDistance", n), this
        },
        withinMiles: function (t, e, n) {
            return this.withinRadians(t, e, n / 3958.8)
        },
        withinKilometers: function (t, e, n) {
            return this.withinRadians(t, e, n / 6371)
        },
        withinGeoBox: function (t, n, i) {
            return n instanceof e.GeoPoint || (n = new e.GeoPoint(n)), i instanceof e.GeoPoint || (i = new e.GeoPoint(i)), this._addCondition(t, "$within", {
                $box: [n, i]
            }), this
        },
        include: function () {
            var t = this;
            return e._arrayEach(arguments, function (e) {
                n.isArray(e) ? t._include = t._include.concat(e) : t._include.push(e)
            }), this
        },
        select: function () {
            var t = this;
            return this._select = this._select || [], e._arrayEach(arguments, function (e) {
                n.isArray(e) ? t._select = t._select.concat(e) : t._select.push(e)
            }), this
        },
        each: function (t, i) {
            if (i = i || {}, this._order || this._skip || this._limit >= 0) {
                var r = "Cannot iterate on a query with sort, skip, or limit.";
                return e.Promise.error(r)._thenRunCallbacks(i)
            }
            new e.Promise;
            var s = new e.Query(this.objectClass);
            s._limit = i.batchSize || 100, s._where = n.clone(this._where), s._include = n.clone(this._include), s.ascending("objectId");
            var a = !1;
            return e.Promise._continueWhile(function () {
                return !a
            }, function () {
                return s.find().then(function (n) {
                    var i = e.Promise.as();
                    return e._.each(n, function (e) {
                        i = i.then(function () {
                            return t(e)
                        })
                    }), i.then(function () {
                        n.length >= s._limit ? s.greaterThan("objectId", n[n.length - 1].id) : a = !0
                    })
                })
            })._thenRunCallbacks(i)
        }
    }
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e, n, i = t.Parse,
        r = i._,
        s = !1,
        a = {
            authenticate: function (t) {
                var n = this;
                FB.login(function (e) {
                    e.authResponse ? t.success && t.success(n, {
                        id: e.authResponse.userID,
                        access_token: e.authResponse.accessToken,
                        expiration_date: new Date(1e3 * e.authResponse.expiresIn + (new Date).getTime()).toJSON()
                    }) : t.error && t.error(n, e)
                }, {
                    scope: e
                })
            },
            restoreAuthentication: function (t) {
                if (t) {
                    var e = {
                        userID: t.id,
                        accessToken: t.access_token,
                        expiresIn: (i._parseDate(t.expiration_date).getTime() - (new Date).getTime()) / 1e3
                    }, s = r.clone(n);
                    s.authResponse = e, s.status = !1;
                    var a = FB.getAuthResponse();
                    a && a.userID !== e.userID && FB.logout(), FB.init(s)
                }
                return !0
            },
            getAuthType: function () {
                return "facebook"
            },
            deauthenticate: function () {
                this.restoreAuthentication(null)
            }
        };
    i.FacebookUtils = {
        init: function (t) {
            if ("undefined" == typeof FB) throw "The Facebook JavaScript SDK must be loaded before calling init.";
            if (n = r.clone(t) || {}, n.status && "undefined" != typeof console) {
                var e = console.warn || console.log || function () {};
                e.call(console, "The 'status' flag passed into FB.init, when set to true, can interfere with Parse Facebook integration, so it has been suppressed. Please call FB.getLoginStatus() explicitly if you require this behavior.")
            }
            n.status = !1, FB.init(n), i.User._registerAuthenticationProvider(a), s = !0
        },
        isLinked: function (t) {
            return t._isLinked("facebook")
        },
        logIn: function (t, n) {
            if (!t || r.isString(t)) {
                if (!s) throw "You must initialize FacebookUtils before calling logIn.";
                return e = t, i.User._logInWith("facebook", n)
            }
            var a = r.clone(n) || {};
            return a.authData = t, i.User._logInWith("facebook", a)
        },
        link: function (t, n, i) {
            if (!n || r.isString(n)) {
                if (!s) throw "You must initialize FacebookUtils before calling link.";
                return e = n, t._linkWith("facebook", i)
            }
            var a = r.clone(i) || {};
            return a.authData = n, t._linkWith("facebook", a)
        },
        unlink: function (t, e) {
            if (!s) throw "You must initialize FacebookUtils before calling unlink.";
            return t._unlinkFrom("facebook", e)
        }
    }
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.History = function () {
        this.handlers = [], n.bindAll(this, "checkUrl")
    };
    var i = /^[#\/]/,
        r = /msie [\w.]+/;
    e.History.started = !1, n.extend(e.History.prototype, e.Events, {
        interval: 50,
        getHash: function (t) {
            var e = t ? t.location : window.location,
                n = e.href.match(/#(.*)$/);
            return n ? n[1] : ""
        },
        getFragment: function (t, n) {
            if (e._isNullOrUndefined(t))
                if (this._hasPushState || n) {
                    t = window.location.pathname;
                    var r = window.location.search;
                    r && (t += r)
                } else t = this.getHash();
            return t.indexOf(this.options.root) || (t = t.substr(this.options.root.length)), t.replace(i, "")
        },
        start: function (t) {
            if (e.History.started) throw Error("Parse.history has already been started");
            e.History.started = !0, this.options = n.extend({}, {
                root: "/"
            }, this.options, t), this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !! this.options.pushState, this._hasPushState = !! (this.options.pushState && window.history && window.history.pushState);
            var s = this.getFragment(),
                a = document.documentMode,
                o = r.exec(navigator.userAgent.toLowerCase()) && (!a || 7 >= a);
            o && (this.iframe = e.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(s)), this._hasPushState ? e.$(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !o ? e.$(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = window.setInterval(this.checkUrl, this.interval)), this.fragment = s;
            var u = window.location,
                c = u.pathname === this.options.root;
            return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !c ? (this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && c && u.hash && (this.fragment = this.getHash().replace(i, ""), window.history.replaceState({}, document.title, u.protocol + "//" + u.host + this.options.root + this.fragment)), this.options.silent ? void 0 : this.loadUrl())
        },
        stop: function () {
            e.$(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl), window.clearInterval(this._checkUrlInterval), e.History.started = !1
        },
        route: function (t, e) {
            this.handlers.unshift({
                route: t,
                callback: e
            })
        },
        checkUrl: function () {
            var t = this.getFragment();
            return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), this.loadUrl() || this.loadUrl(this.getHash()), void 0)
        },
        loadUrl: function (t) {
            var e = this.fragment = this.getFragment(t),
                i = n.any(this.handlers, function (t) {
                    return t.route.test(e) ? (t.callback(e), !0) : void 0
                });
            return i
        },
        navigate: function (t, n) {
            if (!e.History.started) return !1;
            n && n !== !0 || (n = {
                trigger: n
            });
            var r = (t || "").replace(i, "");
            if (this.fragment !== r) {
                if (this._hasPushState) {
                    0 !== r.indexOf(this.options.root) && (r = this.options.root + r), this.fragment = r;
                    var s = n.replace ? "replaceState" : "pushState";
                    window.history[s]({}, document.title, r)
                } else this._wantsHashChange ? (this.fragment = r, this._updateHash(window.location, r, n.replace), this.iframe && r !== this.getFragment(this.getHash(this.iframe)) && (n.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, r, n.replace))) : window.location.assign(this.options.root + t);
                n.trigger && this.loadUrl(t)
            }
        },
        _updateHash: function (t, e, n) {
            if (n) {
                var i = ("" + t).replace(/(javascript:|#).*$/, "");
                t.replace(i + "#" + e)
            } else t.hash = e
        }
    })
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Router = function (t) {
        t = t || {}, t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
    };
    var i = /:\w+/g,
        r = /\*\w+/g,
        s = /[\-\[\]{}()+?.,\\\^\$\|#\s]/g;
    n.extend(e.Router.prototype, e.Events, {
        initialize: function () {},
        route: function (t, i, r) {
            return e.history = e.history || new e.History, n.isRegExp(t) || (t = this._routeToRegExp(t)), r || (r = this[i]), e.history.route(t, n.bind(function (n) {
                var s = this._extractParameters(t, n);
                r && r.apply(this, s), this.trigger.apply(this, ["route:" + i].concat(s)), e.history.trigger("route", this, i, s)
            }, this)), this
        },
        navigate: function (t, n) {
            e.history.navigate(t, n)
        },
        _bindRoutes: function () {
            if (this.routes) {
                var t = [];
                for (var e in this.routes) this.routes.hasOwnProperty(e) && t.unshift([e, this.routes[e]]);
                for (var n = 0, i = t.length; i > n; n++) this.route(t[n][0], t[n][1], this[t[n][1]])
            }
        },
        _routeToRegExp: function (t) {
            return t = t.replace(s, "\\$&").replace(i, "([^/]+)").replace(r, "(.*?)"), RegExp("^" + t + "$")
        },
        _extractParameters: function (t, e) {
            return t.exec(e).slice(1)
        }
    }), e.Router.extend = e._extend
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse,
        n = e._;
    e.Cloud = e.Cloud || {}, n.extend(e.Cloud, {
        run: function (t, n, i) {
            i = i || {};
            var r = e._request({
                route: "functions",
                className: t,
                method: "POST",
                useMasterKey: i.useMasterKey,
                data: e._encode(n, null, !0)
            });
            return r.then(function (t) {
                return e._decode(null, t).result
            })._thenRunCallbacks(i)
        }
    })
}(this),
function (t) {
    t.Parse = t.Parse || {};
    var e = t.Parse;
    e.Installation = e.Object.extend("_Installation"), e.Push = e.Push || {}, e.Push.send = function (t, n) {
        if (n = n || {}, t.where && (t.where = t.where.toJSON().where), t.push_time && (t.push_time = t.push_time.toJSON()), t.expiration_time && (t.expiration_time = t.expiration_time.toJSON()), t.expiration_time && t.expiration_time_interval) throw "Both expiration_time and expiration_time_interval can't be set";
        var i = e._request({
            route: "push",
            method: "POST",
            data: t,
            useMasterKey: n.useMasterKey
        });
        return i._thenRunCallbacks(n)
    }
}(this);