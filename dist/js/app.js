
(function () {

	window.addEventListener('load', function (event) {
		Game.check();
	}, false);
})();
(function (e) {
  "use strict";function t() {
    return l.createDocumentFragment();
  }function n(e) {
    return l.createElement(e);
  }function r(e) {
    if (e.length === 1) return i(e[0]);for (var n = t(), r = I.call(e), s = 0; s < e.length; s++) n.appendChild(i(r[s]));return n;
  }function i(e) {
    return typeof e == "string" ? l.createTextNode(e) : e;
  }for (var s, o, u, a, f, l = e.document, c = Object.defineProperty || function (e, t, n) {
    e.__defineGetter__(t, n.get);
  }, h = [].indexOf || function (t) {
    var n = this.length;while (n--) if (this[n] === t) break;return n;
  }, p = function p(e) {
    if (!e) throw "SyntaxError";if (y.test(e)) throw "InvalidCharacterError";return e;
  }, d = function d(e) {
    var t = e.className,
        n = typeof t == "object",
        r = (n ? t.baseVal : t).replace(g, "");r.length && F.push.apply(this, r.split(y)), this._isSVG = n, this._ = e;
  }, v = { get: function get() {
      return new d(this);
    }, set: function set() {} }, m = "dom4-tmp-".concat(Math.random() * +new Date()).replace(".", "-"), g = /^\s+|\s+$/g, y = /\s+/, b = " ", w = "classList", E = function E(t, n) {
    if (this.contains(t)) n || this.remove(t);else if (n === undefined || n) n = !0, this.add(t);return !!n;
  }, S = e.DocumentFragment, x = e.Node, T = x && x.prototype, N = e.CharacterData || x, C = N && N.prototype, k = e.DocumentType, L = k && k.prototype, A = (e.Element || x || e.HTMLElement).prototype, O = e.HTMLSelectElement || n("select").constructor, M = O.prototype.remove, _ = e.ShadowRoot, D = e.SVGElement, P = / /g, H = "\\ ", B = function B(e) {
    var t = e === "querySelectorAll";return function (n) {
      var r,
          i,
          s,
          o,
          u,
          a,
          f = this.parentNode;if (f) {
        for (s = this.getAttribute("id") || m, o = s === m ? s : s.replace(P, H), a = n.split(","), i = 0; i < a.length; i++) a[i] = "#" + o + " " + a[i];n = a.join(",");
      }s === m && this.setAttribute("id", s), u = (f || this)[e](n), s === m && this.removeAttribute("id");if (t) {
        i = u.length, r = new Array(i);while (i--) r[i] = u[i];
      } else r = u;return r;
    };
  }, j = function j(e) {
    "query" in e || (e.query = A.query), "queryAll" in e || (e.queryAll = A.queryAll);
  }, F = ["matches", A.matchesSelector || A.webkitMatchesSelector || A.khtmlMatchesSelector || A.mozMatchesSelector || A.msMatchesSelector || A.oMatchesSelector || function (t) {
    var n = this.parentNode;return !!n && -1 < h.call(n.querySelectorAll(t), this);
  }, "closest", function (t) {
    var n = this,
        r;while ((r = n && n.matches) && !n.matches(t)) n = n.parentNode;return r ? n : null;
  }, "prepend", function () {
    var t = this.firstChild,
        n = r(arguments);t ? this.insertBefore(n, t) : this.appendChild(n);
  }, "append", function () {
    this.appendChild(r(arguments));
  }, "before", function () {
    var t = this.parentNode;t && t.insertBefore(r(arguments), this);
  }, "after", function () {
    var t = this.parentNode,
        n = this.nextSibling,
        i = r(arguments);t && (n ? t.insertBefore(i, n) : t.appendChild(i));
  }, "replace", function () {
    this.replaceWith.apply(this, arguments);
  }, "replaceWith", function () {
    var t = this.parentNode;t && t.replaceChild(r(arguments), this);
  }, "remove", function () {
    var t = this.parentNode;t && t.removeChild(this);
  }, "query", B("querySelector"), "queryAll", B("querySelectorAll")], I = F.slice, q = F.length; q; q -= 2) o = F[q - 2], o in A || (A[o] = F[q - 1]), o === "remove" && (O.prototype[o] = function () {
    return 0 < arguments.length ? M.apply(this, arguments) : A.remove.call(this);
  }), /before|after|replace|remove/.test(o) && (N && !(o in C) && (C[o] = F[q - 1]), k && !(o in L) && (L[o] = F[q - 1]));j(l);if (S) j(S.prototype);else try {
    j(t().constructor.prototype);
  } catch (R) {}_ && j(_.prototype), n("a").matches("a") || (A[o] = (function (e) {
    return function (n) {
      return e.call(this.parentNode ? this : t().appendChild(this), n);
    };
  })(A[o])), d.prototype = { length: 0, add: function add() {
      for (var t = 0, n; t < arguments.length; t++) n = arguments[t], this.contains(n) || F.push.call(this, o);this._isSVG ? this._.setAttribute("class", "" + this) : this._.className = "" + this;
    }, contains: (function (e) {
      return function (n) {
        return (q = e.call(this, o = p(n)), -1 < q);
      };
    })([].indexOf || function (e) {
      q = this.length;while (q-- && this[q] !== e);return q;
    }), item: function item(t) {
      return this[t] || null;
    }, remove: function remove() {
      for (var t = 0, n; t < arguments.length; t++) n = arguments[t], this.contains(n) && F.splice.call(this, q, 1);this._isSVG ? this._.setAttribute("class", "" + this) : this._.className = "" + this;
    }, toggle: E, toString: function U() {
      return F.join.call(this, b);
    } }, D && !(w in D.prototype) && c(D.prototype, w, v), w in l.documentElement ? (a = n("div")[w], a.add("a", "b", "a"), "a b" != a && (u = a.constructor.prototype, "add" in u || (u = e.TemporaryTokenList.prototype), f = function (e) {
    return function () {
      var t = 0;while (t < arguments.length) e.call(this, arguments[t++]);
    };
  }, u.add = f(u.add), u.remove = f(u.remove), u.toggle = E)) : c(A, w, v), "contains" in T || c(T, "contains", { value: function value(e) {
      while (e && e !== this) e = e.parentNode;return this === e;
    } }), "head" in l || c(l, "head", { get: function get() {
      return s || (s = l.getElementsByTagName("head")[0]);
    } }), (function () {
    for (var t, n = e.requestAnimationFrame, r = e.cancelAnimationFrame, i = ["o", "ms", "moz", "webkit"], s = i.length; !r && s--;) n = n || e[i[s] + "RequestAnimationFrame"], r = e[i[s] + "CancelAnimationFrame"] || e[i[s] + "CancelRequestAnimationFrame"];r || (n ? (t = n, n = function (e) {
      var n = !0;return (t(function () {
        n && e.apply(this, arguments);
      }), function () {
        n = !1;
      });
    }, r = function (e) {
      e();
    }) : (n = function (e) {
      return setTimeout(e, 15, 15);
    }, r = function (e) {
      clearTimeout(e);
    })), e.requestAnimationFrame = n, e.cancelAnimationFrame = r;
  })();try {
    new e.CustomEvent("?");
  } catch (R) {
    e.CustomEvent = (function (e, t) {
      function n(n, i) {
        var s = l.createEvent(e);if (typeof n != "string") throw new Error("An event name must be provided");return (e == "Event" && (s.initCustomEvent = r), i == null && (i = t), s.initCustomEvent(n, i.bubbles, i.cancelable, i.detail), s);
      }function r(e, t, n, r) {
        this.initEvent(e, t, n), this.detail = r;
      }return n;
    })(e.CustomEvent ? "CustomEvent" : "Event", { bubbles: !1, cancelable: !1, detail: null });
  }
})(window);

(function () {

	var Game = function Game() {
		this.props = {
			started: null,
			players: [],
			content: [],
			truth: [],
			action: [],
			json: {}
		};
	};

	Game.prototype.check = function () {
		if (localStorage.get('Game') !== false) {
			// Show screen 0.
		} else {
				// Show screen 1.
			}
	};

	Game.prototype.init = function () {
		// Start game cycle.
	};

	Game.prototype.load = function () {
		// Load game.
	};

	Game.prototype.save = function () {
		// Save game state.
		Storage.set('Game', Game.props);
	};

	window.Game = new Game();
})();
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
}
(function () {

	window.Storage.prototype.get = function (name, type) {
		if (this.getItem(name) !== null && typeof this.getItem(name) !== 'undefined') {
			if (type && type !== 'str') {
				return JSON.parse(this.getItem(name));
			} else {
				return this.getItem(name);
			}
		} else {
			return false;
		}
	};

	window.Storage.prototype.set = function (name, value) {
		this.setItem(name, value);
	};
})();







//# sourceMappingURL=/maps/app.js.map