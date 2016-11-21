var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Alert = (function () {
	function Alert() {
		_classCallCheck(this, Alert);

		this.attr = {
			self: 'data-alert',
			content: 'data-alert-content'
		};
		this.nodes = {
			self: document.querySelector('[' + this.attr.self + ']'),
			content: document.querySelector('[' + this.attr.content + ']')
		};
		this.setTimeout = null;
		this.type = null;
		this.transition = 400;
		this.classes = ['js-visible'];
		this.events();
	}

	_createClass(Alert, [{
		key: 'show',
		value: function show(type, message) {
			var _this = this;

			var constant = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
			var time = arguments.length <= 3 || arguments[3] === undefined ? 3e3 : arguments[3];

			this.type = type;
			this.nodes.content.innerHTML = message;
			this.nodes.self.classList.add(this.type);
			this.nodes.self.classList.add(this.classes[0]);
			if (!constant) setTimeout(function () {
				return _this.close();
			}, time);
		}
	}, {
		key: 'close',
		value: function close() {
			var _this2 = this;

			new PromisedTimeOut(function () {
				return _this2.nodes.self.classList.remove(_this2.classes[0]);
			}, this.transition).then(function () {
				return _this2.nodes.self.classList.remove(_this2.type);
			});
		}
	}, {
		key: 'events',
		value: function events() {
			var _this3 = this;

			this.nodes.self.listener('click', function () {
				_this3.close();
			});
		}
	}]);

	return Alert;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var App = (function () {
	function App() {
		_classCallCheck(this, App);

		this.data = this.getInitialState();
		this.attr = {
			game: 'data-game',
			getTruth: 'data-game="truth"',
			getAction: 'data-game="action"',
			currentPlayer: 'data-currentplayer'
		};
		this.nodes = {
			currentPlayer: document.querySelector('[' + this.attr.currentPlayer + ']'),
			getTruth: document.querySelector('[' + this.attr.getTruth + ']'),
			getAction: document.querySelector('[' + this.attr.getAction + ']'),
			game: document.querySelector('[' + this.game + ']')
		};
		this.manager = {
			PlayerController: new PlayerController(),
			VersionController: new VersionController(),
			Preloader: new Preloader(),
			Storage: new Storage(),
			Content: new Content(),
			Overlay: new Overlay(),
			Sidebar: new Sidebar(),
			Render: new Render(),
			Alert: new Alert().show,
			Modals: new Modals()
		};
		this.online = navigator.onLine;
		/*
  	Define is latest version of JSON loaded
  */
		this.isUpdated = false;
		this.language = 'en';
	}

	_createClass(App, [{
		key: 'getInitialState',
		value: function getInitialState() {
			return {
				started: false,
				rubribcs: [],
				players: [],
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
		}
	}]);

	return App;
})();

(function () {
		window.addEventListener('load', function (event) {
				window.App = new App();
				App.manager.GameController = new GameController();
		}, false);
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Content = (function () {
	function Content() {
		_classCallCheck(this, Content);

		this.content = null;
		this.truth = [];
		this.action = [];
	}

	_createClass(Content, [{
		key: "set",
		value: function set(data) {
			this.content = data;
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
		if (node.closest('[' + App.attr.getTruth + ']')) App.getTruth();
		if (node.closest('[' + App.attr.getAction + ']')) App.getAction();
		if (node.closest('[' + App.manager.Sidebar.attr.button + ']')) App.manager.Sidebar.check();
	};
	document.addEventListener('mousedown', function (e) {
		queue(e.target, e);
	}, false);
	// Rewrite to events() in classes
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GameController = (function () {
	function GameController() {
		_classCallCheck(this, GameController);

		this.check();
	}

	_createClass(GameController, [{
		key: 'check',
		value: function check() {
			if (App.manager.Storage.get('Game') !== false) {
				// Show screen 0.
				this.load();
				App.manager.Render._screen0();
				App.manager.Preloader.hide();
			} else {
				// Show screen 1.
				App.manager.Render._screen1();
				App.manager.VersionController.check();
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
	}]);

	return GameController;
})();
window.Language = {
	ru: {
		badinternet: 'Опс. Произошла какая-то ошибка :(. Проверьте ваше интернет соединение.'
	},

	en: {
		badinternet: 'Ooops. Some error happen :(. Check your internet connection.'
	}
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
		value: function get(name) {
			if (localStorage.getItem(name) !== null && typeof localStorage.getItem(name) !== 'undefined') {
				return JSON.parse(localStorage.getItem(name));
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
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modals = (function () {
	function Modals() {
		_classCallCheck(this, Modals);

		this.players = new PlayerModal();
		this.rubrics = new RubricsModal();
		this.settings = new SettingsModal();
		this.rules = new RulesModal();
		this["continue"] = new ContinueModal();
		this["enum"] = Object.freeze({
			players: 0,
			rubrics: 1,
			settings: 2,
			rules: 3,
			"continue": 4
		});
		this.current = null;
	}

	_createClass(Modals, [{
		key: "next",
		value: function next() {}
	}, {
		key: "check",
		value: function check() {}
	}, {
		key: "close",
		value: function close() {}
	}]);

	return Modals;
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
		value: function getScoreBoard() {
			// return array of Players sorted by scores
		}
	}, {
		key: "getAssistent",
		value: function getAssistent() {
			// получить игрока ассисента (основываясь на пикрейт игроков)
		}
	}, {
		key: "getCurrent",
		value: function getCurrent() {
			// получить текущего игрока
			// return instanceof Player
		}
	}, {
		key: "getNext",
		value: function getNext() {
			// даст игрока который ходит следующий, основываясь на pickrate если выдача игроков идет
			// случайно
			// return instanceof Player
		}
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
	}, {
		key: "getWinner",
		value: function getWinner() {}
	}]);

	return PlayerController;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Preloader = (function () {
	function Preloader() {
		_classCallCheck(this, Preloader);

		this.attr = {
			preloader: 'data-preloader'
		};
		this.nodes = {
			preloader: document.querySelector('[' + this.attr.preloader + ']')
		};
		this.classes = ['opacity', 'hidden'];
		this.transition = 300;
	}

	_createClass(Preloader, [{
		key: 'show',
		value: function show() {
			this.nodes.preloader.classList.remove(this.classes[0]);
			this.nodes.preloader.classList.remove(this.classes[1]);
		}
	}, {
		key: 'hide',
		value: function hide() {
			var _this = this;

			this.nodes.preloader.classList.add(this.classes[0]);
			setTimeout(function () {
				_this.nodes.preloader.classList.add(_this.classes[1]);
			}, this.transition);
		}
	}]);

	return Preloader;
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
		key: 'modalPlayers',
		value: function modalPlayers() {
			var players = this.render(this.templates.players, App.data);
			return players;
		}
	}, {
		key: 'modalRubrics',
		value: function modalRubrics() {
			var rubrics = this.render(this.templates.rubrics, App.data);
			return rubrics;
		}
	}, {
		key: 'modalSettings',
		value: function modalSettings() {
			var settings = this.render(this.templates.settings, App.data);
			return settings;
		}
	}, {
		key: 'modalRules',
		value: function modalRules() {
			var rules = this.render(this.templates.rules, App.data);
			return rules;
		}
	}, {
		key: 'modalContinue',
		value: function modalContinue() {
			var gameContinue = this.render(this.templates['continue'], App.manager.Storage.get('Game'));
			return gameContinue;
		}
	}, {
		key: 'GamePlayers',
		value: function GamePlayers() {
			var gamePlayers = this.render(this.templates.gamePlayers, App.data);
			return gamePlayers;
		}

		/*
  	Screens
  */
	}, {
		key: '_screen0',
		value: function _screen0() {
			var view = this.modalContinue();
			this.views.modals.innerHTML = view;
		}
	}, {
		key: '_screen1',
		value: function _screen1() {
			var rendered = '',
			    views = [this.modalPlayers(), this.modalRubrics(), this.modalSettings(), this.modalRules()];
			views.forEach(function (view) {
				rendered += view;
			});
			this.views.modals.innerHTML = rendered;
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
			App.manager.Overlay.show(null, this.close.bind(this));
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


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var VersionController = (function () {
	function VersionController() {
		_classCallCheck(this, VersionController);
	}

	_createClass(VersionController, [{
		key: 'check',
		value: function check() {
			var version = App.manager.Storage.get('JV');
			if (version === false) {
				this.load();
				return;
			}
			if (App.online === true && JV === version) {
				// Don't update
				this.storage();
			} else if (App.online === true && JV !== version) {
				this.load();
			}
		}
	}, {
		key: 'load',
		value: function load() {
			var _this = this;

			var requestFailed = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			var request = new XMLHttpRequest();
			request.open('GET', 'data/response.json', true);
			request.send();
			request.onreadystatechange = function () {
				if (request.readyState !== 4) return;
				if (request.status === 200) {
					App.isUpdated = true;
					App.manager.Storage.set('JV', JV);
					App.manager.Storage.set('content', request.responseText);
					App.manager.Content.set(JSON.parse(request.responseText));
					App.manager.Preloader.hide();
				} else if (version !== false && requestFailed === false) {
					_this.storage(true);
				} else if (version === false && requestFailed === false) {
					App.manager.Alert('error', Language[App.language].badinternet, true);
				}
			};
		}
	}, {
		key: 'storage',
		value: function storage() {
			var requestFailed = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			var content = App.manager.Storage.get('content');
			if (content) {
				App.isUpdated = true;
				App.manager.Content.set(content);
				App.manager.Preloader.hide();
			} else {
				this.load(requestFailed);
			}
		}
	}]);

	return VersionController;
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

var Listener = document.addEventListener;

Node.prototype.listener = function (type, callback) {
	this.addEventListener(type, callback);
};

var PromisedTimeOut = function PromisedTimeOut(func, timeout) {
	if (!func || !timeout) throw new Error('Defined func and timeout');
	func();
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve();
		}, timeout);
	});
};

var $ = document.querySelector;
var $$ = document.querySelectorAll;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContinueModal = function ContinueModal() {
	_classCallCheck(this, ContinueModal);
};
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerModal = (function () {
	function PlayerModal() {
		_classCallCheck(this, PlayerModal);

		this.attr = {};
	}

	_createClass(PlayerModal, [{
		key: "check",
		value: function check() {}
	}, {
		key: "render",
		value: function render() {}
	}]);

	return PlayerModal;
})();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RubricsModal = function RubricsModal() {
	_classCallCheck(this, RubricsModal);
};
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RulesModal = function RulesModal() {
	_classCallCheck(this, RulesModal);
};
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsModal = function SettingsModal() {
	_classCallCheck(this, SettingsModal);
};
//# sourceMappingURL=maps/app.js.map
