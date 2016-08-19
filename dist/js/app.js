
(function () {
	window.addEventListener('load', function (event) {
		window.Game = new Game();
		Game.check();
		Game.Content.check();
		Game.Render.views.gamePlayers.innerHTML = Game.Render.renderGamePlayers();
	}, false);
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
(function mouseDown() {
	var queue = function queue(node, e) {
		if (node.closest('[' + Game.attr.getTruth + ']')) Game.getTruth();
		if (node.closest('[' + Game.attr.getAction + ']')) Game.getAction();
		if (node.closest('[' + Game.manager.Sidebar.attr.button + ']')) Game.manager.Sidebar.check();
	};
	document.addEventListener('mousedown', function (e) {
		queue(e.target, e);
	}, false);
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Game = (function () {
	function Game() {
		_classCallCheck(this, Game);

		this.data = {
			started: true,
			rubribcs: [],
			players: [{ name: 'Mihail', gender: 'm', score: 0 }, { name: 'Elena', gender: 'f', score: 1 }, { name: 'Timur', gender: 'm', score: -1 }],
			settings: {
				repeatContent: false,
				alcohol: true,
				score: true,
				streak: 2,
				sex: 'hetero', // possible 'hetero', 'homo', 'herma'
				smartPick: true,
				randomPlayers: true,
				cards: {
					gray: true,
					yellow: true,
					special: true
				}
			}
		};
		this.attr = {
			game: 'data-game',
			getTruth: 'data-game="truth"',
			getAction: 'data-game="action"',
			currentPlayer: 'data-currentplayer'
		};
		this.nodes = {
			currentPlayer: document.querySelector('[' + this.attr.currentPlayer + ']')
		};
		debugger;
		this.manager = {
			PlayerController: new PlayerController(),
			Render: new Render(),
			Storage: new Storage(),
			Content: new Content(),
			Overlay: new Overlay(),
			Sidebar: new Sidebar()
		};
	}

	_createClass(Game, [{
		key: 'check',
		value: function check() {
			if (this.manager.Storage.get('Game') !== false) {
				this.load();
				// Show screen 0.
				this.manager.Render._screen0();
			} else {
				// Show screen 1.
				this.manager.Render._screen1();
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
			var game = this.manager.Storage.get('Game');
			this.data = game;
		}
	}, {
		key: 'save',
		value: function save() {
			this.manager.Storage.set('Game', this.data);
		}
	}, {
		key: 'getTruth',
		value: function getTruth() {}
	}, {
		key: 'getAction',
		value: function getAction() {}
	}]);

	return Game;
})();
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
				if (type && type === 'str') {
					return localStorage.getItem(name);
				} else {
					return JSON.parse(localStorage.getItem(name));
				}
			} else {
				return false;
			}
		}
	}, {
		key: 'set',
		value: function set(name, value) {
			localStorage.setItem(name, JSON.stringify(value));
		}
	}]);

	return Storage;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Overlay = (function () {
	function Overlay() {
		_classCallCheck(this, Overlay);

		this['enum'] = this.self = document.querySelector('[data-overlay]');
		this.states = ['hidden', 'active'];
		this.listener = null;
		this.transition = 500;
	}

	_createClass(Overlay, [{
		key: 'show',
		value: function show() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
			var onCloseCallback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			var Overlay = this;
			this.self.classList.remove(this.states[0]);
			this.self.classList.add(this.states[1]);
			if (isFunc(onCloseCallback)) {
				this.self.addEventListener('mousedown', function (event) {
					Overlay.close(null, onCloseCallback);
					Overlay.listener = onCloseCallback;
					Overlay.listener();
				});
			}
			var timeout = setTimeout(function () {
				if (isFunc(callback)) {
					callback();
				}
			}, this.transition);
		}
	}, {
		key: 'close',
		value: function close() {
			var _this = this;

			var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
			var onCloseCallback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			this.self.classList.remove(this.states[1]);
			if (isFunc(this.listener)) {
				this.self.removeEventListener('mousedown', onCloseCallback, false);
				this.listener = null;
			}
			var timeout = setTimeout(function () {
				_this.self.classList.add(_this.states[0]);
				if (isFunc(callback)) {
					callback();
				}
			}, this.transition);
		}
	}]);

	return Overlay;
})();

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

		this["enum"] = Object.frezee({
			awaiting: 0,
			playing: 1
		});

		this.name = props.name;
		this.gender = props.gender;
		this.state = props.state;
		this.pickRate = props.pickRate;
		this.score = props.score;
		this.views = props.views;
		this.streak = {
			action: props.streak.action,
			truth: props.streak.truth
		};
	}

	_createClass(Player, [{
		key: "streak",
		value: function streak(type) {}
	}]);

	return Player;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerController = (function () {
	function PlayerController() {
		_classCallCheck(this, PlayerController);
	}

	_createClass(PlayerController, [{
		key: "getScoreBoard",

		// console.trace();
		// debugger;
		// this.players = Game.data.players;
		value: function getScoreBoard() {
			// return array of players sorted for scores
		}
	}, {
		key: "getAssistent",
		value: function getAssistent() {
			// получить игрока ассисента (основываясь на пикрейт игроков)
		}
	}, {
		key: "getCurrent",
		value: function getCurrent() {}
	}, {
		key: "getNext",
		value: function getNext() {}
	}, {
		key: "getPrevious",
		value: function getPrevious() {}
	}, {
		key: "getRandom",
		value: function getRandom() {
			// Получить рандомного игрока
		}
	}, {
		key: "getLeader",
		value: function getLeader() {
			// Получить лидера по скорборду
		}
	}, {
		key: "getLast",
		value: function getLast() {
			// Получить последнего по скорборду
		}
	}]);

	return PlayerController;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Render = (function () {
	function Render() {
		_classCallCheck(this, Render);

		this.views = {
			modals: document.querySelector('[data-modals-view]'),
			gamePlayers: document.querySelector('[data-game-players]'),
			main: null
		};
		this.templates = {
			players: document.querySelector('#modal_players'),
			rubrics: document.querySelector('#modal_rubrics'),
			settings: document.querySelector('#modal_settings'),
			rules: document.querySelector('#modal_rules'),
			'continue': document.querySelector('#modal_continue'),
			gamePlayers: document.querySelector('#game_players')
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
			var players = this.render(this.templates.players, Game.data);
			return players;
		}
	}, {
		key: 'renderRubrics',
		value: function renderRubrics() {
			var rubrics = this.render(this.templates.rubrics, Game.data);
			return rubrics;
		}
	}, {
		key: 'renderSettings',
		value: function renderSettings() {
			var settings = this.render(this.templates.settings, Game.data);
			return settings;
		}
	}, {
		key: 'renderRules',
		value: function renderRules() {
			var rules = this.render(this.templates.rules, Game.data);
			return rules;
		}
	}, {
		key: 'renderContinue',
		value: function renderContinue() {
			var gameContinue = this.render(this.templates['continue'], Game.Storage.get('Game'));
			return gameContinue;
		}
	}, {
		key: 'renderGamePlayers',
		value: function renderGamePlayers() {
			var gamePlayers = this.render(this.templates.gamePlayers, Game.data);
			return gamePlayers;
		}

		/*
  	Screens
  */
	}, {
		key: '_screen0',
		value: function _screen0() {
			var view = this.renderContinue();
			this.views.modals.innerHTML = view;
		}
	}, {
		key: '_screen1',
		value: function _screen1() {
			var rendered = '',
			    views = [this.renderPlayers(), this.renderRubrics(), this.renderSettings(), this.renderRules()];
			views.forEach(function (view) {
				rendered += view;
			});
			// this.views.modals.innerHTML = rendered;
		}
	}]);

	return Render;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Sidebar = (function () {
	function Sidebar() {
		_classCallCheck(this, Sidebar);

		this.attr = {
			self: 'data-sidebar',
			button: 'data-open-sidebar'
		};
		this['enum'] = Object.freeze({
			closed: 'closed',
			opened: 'opened'
		});
		this.self = document.querySelector('[' + this.attr.self + ']');
		this.state = this['enum'].closed;
	}

	_createClass(Sidebar, [{
		key: 'check',
		value: function check() {
			if (this.state === this['enum'].closed) {
				this.open();
			} else {
				this.close();
			}
		}
	}, {
		key: 'open',
		value: function open() {
			this.state = this['enum'].opened;
			Game.manager.Overlay.show(null, this.close.bind(this));
			this.self.classList.add(this['enum'].opened);
		}
	}, {
		key: 'close',
		value: function close() {
			this.state = this['enum'].closed;
			this.self.classList.remove(this['enum'].opened);
		}
	}]);

	return Sidebar;
})();


if (typeof Element.prototype.matches !== 'function') {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches(selector) {
		var element = this;
		var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
		var index = 0;

		while (elements[index] && elements[index] !== element) {
			++index;
		}

		return Boolean(elements[index]);
	};
}
if (typeof Element.prototype.closest !== 'function') {
	Element.prototype.closest = function closest(selector) {
		var element = this;

		while (element && element.nodeType === 1) {
			if (element.matches(selector)) {
				return element;
			}

			element = element.parentNode;
		}

		return null;
	};
}

if (typeof Element.prototype.remove !== 'function') {
	Element.prototype.remove = function () {
		if (this.parentNode) {
			this.parentNode.removeChild(this);
		}
	};
}
/* Laura Doktorova https://github.com/olado/doT */
(function () {
  function p(b, a, d) {
    return ("string" === typeof a ? a : a.toString()).replace(b.define || h, function (a, c, e, g) {
      0 === c.indexOf("def.") && (c = c.substring(4));c in d || (":" === e ? (b.defineParams && g.replace(b.defineParams, function (a, b, l) {
        d[c] = { arg: b, text: l };
      }), c in d || (d[c] = g)) : new Function("def", "def['" + c + "']=" + g)(d));return "";
    }).replace(b.use || h, function (a, c) {
      b.useParams && (c = c.replace(b.useParams, function (a, b, c, l) {
        if (d[c] && d[c].arg && l) return a = (c + ":" + l).replace(/'|\\/g, "_"), d.__exp = d.__exp || {}, d.__exp[a] = d[c].text.replace(new RegExp("(^|[^\\w$])" + d[c].arg + "([^\\w$])", "g"), "$1" + l + "$2"), b + "def.__exp['" + a + "']";
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
if ("document" in self) {
  if (!("classList" in document.createElement("_"))) {
    (function (j) {
      "use strict";if (!("Element" in j)) {
        return;
      }var a = "classList",
          f = "prototype",
          m = j.Element[f],
          b = Object,
          k = String[f].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
      },
          c = Array[f].indexOf || function (q) {
        var p = 0,
            o = this.length;for (; p < o; p++) {
          if (p in this && this[p] === q) {
            return p;
          }
        }return -1;
      },
          n = function n(o, p) {
        this.name = o;this.code = DOMException[o];this.message = p;
      },
          g = function g(p, o) {
        if (o === "") {
          throw new n("SYNTAX_ERR", "An invalid or illegal string was specified");
        }if (/\s/.test(o)) {
          throw new n("INVALID_CHARACTER_ERR", "String contains an invalid character");
        }return c.call(p, o);
      },
          d = function d(s) {
        var r = k.call(s.getAttribute("class") || ""),
            q = r ? r.split(/\s+/) : [],
            p = 0,
            o = q.length;for (; p < o; p++) {
          this.push(q[p]);
        }this._updateClassName = function () {
          s.setAttribute("class", this.toString());
        };
      },
          e = d[f] = [],
          i = function i() {
        return new d(this);
      };n[f] = Error[f];e.item = function (o) {
        return this[o] || null;
      };e.contains = function (o) {
        o += "";return g(this, o) !== -1;
      };e.add = function () {
        var s = arguments,
            r = 0,
            p = s.length,
            q,
            o = false;do {
          q = s[r] + "";if (g(this, q) === -1) {
            this.push(q);o = true;
          }
        } while (++r < p);if (o) {
          this._updateClassName();
        }
      };e.remove = function () {
        var t = arguments,
            s = 0,
            p = t.length,
            r,
            o = false,
            q;do {
          r = t[s] + "";q = g(this, r);while (q !== -1) {
            this.splice(q, 1);o = true;q = g(this, r);
          }
        } while (++s < p);if (o) {
          this._updateClassName();
        }
      };e.toggle = function (p, q) {
        p += "";var o = this.contains(p),
            r = o ? q !== true && "remove" : q !== false && "add";if (r) {
          this[r](p);
        }if (q === true || q === false) {
          return q;
        } else {
          return !o;
        }
      };e.toString = function () {
        return this.join(" ");
      };if (b.defineProperty) {
        var l = { get: i, enumerable: true, configurable: true };try {
          b.defineProperty(m, a, l);
        } catch (h) {
          if (h.number === -2146823252) {
            l.enumerable = false;b.defineProperty(m, a, l);
          }
        }
      } else {
        if (b[f].__defineGetter__) {
          m.__defineGetter__(a, i);
        }
      }
    })(self);
  } else {
    (function () {
      var b = document.createElement("_");b.classList.add("c1", "c2");if (!b.classList.contains("c2")) {
        var c = function c(e) {
          var d = DOMTokenList.prototype[e];DOMTokenList.prototype[e] = function (h) {
            var g,
                f = arguments.length;for (g = 0; g < f; g++) {
              h = arguments[g];d.call(this, h);
            }
          };
        };c("add");c("remove");
      }b.classList.toggle("c3", false);if (b.classList.contains("c3")) {
        var a = DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle = function (d, e) {
          if (1 in arguments && !this.contains(d) === !e) {
            return e;
          } else {
            return a.call(this, d);
          }
        };
      }b = null;
    })();
  }
};
var random = function random(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var isFunc = function isFunc(func) {
	return typeof func === 'function';
};
//# sourceMappingURL=maps/app.js.map
