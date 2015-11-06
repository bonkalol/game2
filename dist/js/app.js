
(function () {

	window.addEventListener('load', function (event) {
		game.check();
		content.check();
	}, false);

	document.addEventListener('mousedown', function (event) {
		// eventRouter(event.target);
	});
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Content = (function () {
	function Content() {
		_classCallCheck(this, Content);

		this.content = [];
		this.truth = [];
		this.action = [];
		this.json = {};
	}

	_createClass(Content, [{
		key: "check",
		value: function check() {
			// Check is content loaded.
		}
	}, {
		key: "load",
		value: function load() {
			// Load json.
		}
	}, {
		key: "get",
		value: function get(type) {
			// Get truth or action.
		}
	}]);

	return Content;
})();

window.content = new Content();
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
/* Laura Doktorova https://github.com/olado/doT */
(function () {
  function p(b, a, d) {
    return ("string" === typeof a ? a : a.toString()).replace(b.define || h, function (a, c, e, g) {
      0 === c.indexOf("def.") && (c = c.substring(4));c in d || (":" === e ? (b.defineParams && g.replace(b.defineParams, function (a, b, l) {
        d[c] = { arg: b, text: l };
      }), c in d || (d[c] = g)) : new Function("def", "def['" + c + "']=" + g)(d));return "";
    }).replace(b.use || h, function (a, c) {
      b.useParams && (c = c.replace(b.useParams, function (a, b, c, l) {
        if (d[c] && d[c].arg && l) return (a = (c + ":" + l).replace(/'|\\/g, "_"), d.__exp = d.__exp || {}, d.__exp[a] = d[c].text.replace(new RegExp("(^|[^\\w$])" + d[c].arg + "([^\\w$])", "g"), "$1" + l + "$2"), b + "def.__exp['" + a + "']");
      }));var e = new Function("def", "return " + c)(d);return e ? p(b, e, d) : e;
    });
  }function k(b) {
    return b.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
  }var f = { version: "1.0.3", templateSettings: { evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g, interpolate: /\{\{=([\s\S]+?)\}\}/g, encode: /\{\{!([\s\S]+?)\}\}/g, use: /\{\{#([\s\S]+?)\}\}/g, useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
      define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g, defineParams: /^\s*([\w$]+):([\s\S]+)/, conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g, iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g, varname: "it", strip: !0, append: !0, selfcontained: !1, doNotSkipEncoded: !1 }, template: void 0, compile: void 0 },
      m;f.encodeHTMLSource = function (b) {
    var a = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
        d = b ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;return function (b) {
      return b ? b.toString().replace(d, function (b) {
        return a[b] || b;
      }) : "";
    };
  };m = (function () {
    return this || (0, eval)("this");
  })();"undefined" !== typeof module && module.exports ? module.exports = f : "function" === typeof define && define.amd ? define(function () {
    return f;
  }) : m.doT = f;var r = { start: "'+(", end: ")+'", startencode: "'+encodeHTML(" },
      s = { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" },
      h = /$^/;f.template = function (b, a, d) {
    a = a || f.templateSettings;var n = a.append ? r : s,
        c,
        e = 0,
        g;b = a.use || a.define ? p(a, b, d || {}) : b;b = ("var out='" + (a.strip ? b.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : b).replace(/'|\\/g, "\\$&").replace(a.interpolate || h, function (b, a) {
      return n.start + k(a) + n.end;
    }).replace(a.encode || h, function (b, a) {
      c = !0;return n.startencode + k(a) + n.end;
    }).replace(a.conditional || h, function (b, a, c) {
      return a ? c ? "';}else if(" + k(c) + "){out+='" : "';}else{out+='" : c ? "';if(" + k(c) + "){out+='" : "';}out+='";
    }).replace(a.iterate || h, function (b, a, c, d) {
      if (!a) return "';} } out+='";e += 1;g = d || "i" + e;a = k(a);return "';var arr" + e + "=" + a + ";if(arr" + e + "){var " + c + "," + g + "=-1,l" + e + "=arr" + e + ".length-1;while(" + g + "<l" + e + "){" + c + "=arr" + e + "[" + g + "+=1];out+='";
    }).replace(a.evaluate || h, function (a, b) {
      return "';" + k(b) + "out+='";
    }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, "");c && (a.selfcontained || !m || m._encodeHTML || (m._encodeHTML = f.encodeHTMLSource(a.doNotSkipEncoded)), b = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + f.encodeHTMLSource.toString() + "(" + (a.doNotSkipEncoded || "") + "));" + b);try {
      return new Function(a.varname, b);
    } catch (q) {
      throw ("undefined" !== typeof console && console.log("Could not create a template function: " + b), q);
    }
  };f.compile = function (b, a) {
    return f.template(b, null, a);
  };
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventRouter = (function () {
	function EventRouter() {
		_classCallCheck(this, EventRouter);
	}

	_createClass(EventRouter, [{
		key: "modalNext",
		value: function modalNext(element) {}
	}, {
		key: "modalBack",
		value: function modalBack(element) {}
	}]);

	return EventRouter;
})();

window.eventRouter = new EventRouter();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/*
	game.settings.gender
	0 - Игрок мужского пола может попасть только на игрока женского пола
	1 - Игрок мужского пола может попасть на игрока женского и мужского пола
*/

var Game = (function () {
	function Game() {
		_classCallCheck(this, Game);

		this.props = {
			started: null,
			players: [],
			rubribcs: []
		};
		this.settings = {
			repeatContent: false,
			gender: 0,
			streak: 2
		};
	}

	_createClass(Game, [{
		key: 'check',
		value: function check() {
			if (storage.get('Game') !== false) {
				// Show screen 0.
				render._screen0();
			} else {
				// Show screen 1.
				render._screen1();
			}
		}
	}, {
		key: 'init',
		value: function init() {
			// Start game cycle.
		}
	}, {
		key: 'load',
		value: function load() {
			// Load game.
		}
	}, {
		key: 'save',
		value: function save() {
			storage.set('Game.props', this.props);
			storage.set('Game.settings', this.settings);
		}
	}]);

	return Game;
})();

window.game = new Game();
var random = function random(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
};
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/*

	Wrapper for localStorage

*/

var Storage = (function () {
	function Storage() {
		_classCallCheck(this, Storage);
	}

	_createClass(Storage, [{
		key: 'get',
		value: function get(name, type) {
			if (localStorage.getItem(name) !== null && typeof localStorage.getItem(name) !== 'undefined') {
				if (type && type !== 'str') {
					return JSON.parse(localStorage.getItem(name));
				} else {
					return localStorage.getItem(name);
				}
			} else {
				return false;
			}
		}
	}, {
		key: 'set',
		value: function set(name, value) {
			localStorage.setItem(name, value);
		}
	}]);

	return Storage;
})();

window.storage = new Storage();


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*

	State
	0 - не активный игрок
	1 - активный игрок

	PickRate
	Как часто игра выбирала игрока как ассистента текущему игроку

*/

var Player = (function () {
	function Player(props) {
		_classCallCheck(this, Player);

		this.name = props.name;
		this.gender = props.gender;
		this.state = props.state;
		this.pickRate = props.pickRate;
		this.score = props.score;
		this.streak = {
			action: props.streak.action,
			truth: props.streak.truth
		};
	}

	_createClass(Player, [{
		key: "get",
		value: function get(prop) {
			return this[prop];
		}
	}]);

	return Player;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Render = (function () {
	function Render() {
		_classCallCheck(this, Render);

		this.views = {
			modals: document.querySelector('[data-modals-view]'),
			main: null
		};
		this.templates = {
			players: document.querySelector('#modal_players'),
			rubrics: document.querySelector('#modal_rubrics')
		};
	}

	_createClass(Render, [{
		key: 'render',
		value: function render(template, object) {
			var view = template.innerHTML;
			view = doT.template(view);
			view = view(object);
			return view;
		}

		/*
  	Parts
  */
	}, {
		key: 'renderPlayers',
		value: function renderPlayers() {
			var rendered = '',
			    players = this.render(this.templates.players, game.props);
			return players;
		}
	}, {
		key: 'renderRubrics',
		value: function renderRubrics() {
			var rendered = '',
			    rubrics = this.render(this.templates.rubrics, game.props);
			return rubrics;
		}
	}, {
		key: 'renderContinue',
		value: function renderContinue() {}

		/*
  	Screens
  */
	}, {
		key: '_screen0',
		value: function _screen0() {
			var rendered = '';
			view = this.renderContinue();
			this.views.modals.innerHTML = view;
		}
	}, {
		key: '_screen1',
		value: function _screen1() {
			var rendered = '',
			    views = [this.renderPlayers(), this.renderRubrics()];
			views.forEach(function (view) {
				rendered += view;
			});
			this.views.modals.innerHTML = rendered;
		}
	}]);

	return Render;
})();

window.render = new Render();



//# sourceMappingURL=maps/app.js.map
