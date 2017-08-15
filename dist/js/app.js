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

			new _.PromisedTimeOut(function () {
				return _this2.nodes.self.classList.remove(_this2.classes[0]);
			}, this.transition).then(function () {
				return _this2.nodes.self.classList.remove(_this2.type);
			});
		}
	}, {
		key: 'events',
		value: function events() {
			var _this3 = this;

			this.nodes.self.addEventListener('click', function () {
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
			Alert: new Alert(),
			Modals: new Modals()
		};
		this.online = navigator.onLine;
		this.isUpdated = false; // Define is latest version of JSON loaded
		this.language = 'en';
	}

	_createClass(App, [{
		key: 'getInitialState',
		value: function getInitialState() {
			return {
				started: false,
				rubrics: [],
				players: [],
				previousPlayer: null,
				currentPlayer: null,
				queue: [],
				settings: {
					repeatContent: false,
					alco: true,
					score: true,
					streak: 2,
					sex: 'hetero', // Possible 'hetero', 'homo', 'herma'
					smartPick: true,
					randomPlayers: true,
					skip: false,
					cards: {
						hidden: true,
						all: true,
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
				App.manager.Game = new Game();
				App.manager.Preloader.hide();
		}, false);
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Content = (function () {
	function Content() {
		_classCallCheck(this, Content);

		this.content = null;
		this.inGame = {
			truth: [],
			action: []
		};
		this.excludes = {};
		this.truth = [];
		this.action = [];
		this.CONTENT_ACTIONS = ['action', 'truth'];
		this.CONTENT_TYPES = Object.freeze({
			ALCO: 'alco',
			PARTNER: 'partner',
			HIDDEN: 'hidden',
			ALL: 'all',
			SPECIAL: 'special'
		});
	}

	_createClass(Content, [{
		key: 'set',
		value: function set(data) {
			var _this = this;

			this.content = data.rubrics;
			Object.keys(this.content).forEach(function (rubric) {
				_this.CONTENT_ACTIONS.forEach(function (type) {
					_this.content[rubric][type].forEach(function (question, i) {
						if (typeof question === 'string') {
							_this.content[rubric][type][i] = { text: question };
						}
						_this.content[rubric][type][i].rubric = rubric;
					});
				});
			});
		}
	}, {
		key: 'init',
		value: function init() {
			var _this2 = this;

			var type = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

			Object.keys(this.content).forEach(function (key) {
				if (!App.data.rubrics.includes(key)) return;
				if (type) {
					_this2.inGame[type] = _this2.inGame[type].concat(_this2.content[key][type]);
					return;
				}
				_this2.inGame.action = _this2.inGame.action.concat(_this2.content[key].action);
				_this2.inGame.truth = _this2.inGame.truth.concat(_this2.content[key].truth);
			});
			this.filter();
		}
	}, {
		key: 'merge',
		value: function merge() {
			var _this3 = this;

			// merge
			this.iterate(App.data.rubrics, function (rubric, type) {
				_this3.content[rubric][type].forEach(function (question, i) {
					var questionToAdd = _.getByKeyValue(_this3.inGame[type], 'text', question.text);
					if (!questionToAdd) {
						_this3.inGame[type].push(question);
					}
				});
			});
			// unmerge
			this.iterate(this.content, function (rubric, type) {
				_this3.inGame[type].forEach(function (question, i) {
					if (!App.data.rubrics.includes(question.rubric)) {
						_this3.inGame[type].splice(i, 1);
					}
				});
			});
			this.filter();
		}
	}, {
		key: 'filter',
		value: function filter() {
			var _this4 = this;

			this.excludes = {
				alco: App.data.settings[this.CONTENT_TYPES.ALCO],
				hidden: App.data.settings.cards[this.CONTENT_TYPES.HIDDEN],
				all: App.data.settings.cards[this.CONTENT_TYPES.ALL],
				special: App.data.settings.cards[this.CONTENT_TYPES.SPECIAL]
			};
			this.CONTENT_ACTIONS.forEach(function (type) {
				_this4.inGame[type].forEach(function (question) {
					if (!question.type) {
						question.filtered = false;
						return;
					}
					question.filtered = Object.keys(_this4.excludes).some(function (filterName) {
						return question.type.includes(filterName) && !_this4.excludes[filterName];
					});
				});
			});
		}
	}, {
		key: 'iterate',
		value: function iterate(arr, callback) {
			var _this5 = this;

			var target = Array.isArray(arr) ? arr : Object.keys(arr);
			target.forEach(function (key) {
				_this5.CONTENT_ACTIONS.forEach(function (type) {
					callback(key, type);
				});
			});
		}
	}, {
		key: 'parse',
		value: function parse() {}
	}, {
		key: 'get',
		value: function get(type) {
			// Get truth or action.
			var questions = this.inGame[type].filter(function (question) {
				return !question.disabled;
			}),
			    question = questions[_.getRandomInt(0, questions.length - 1)];
			if (!App.data.settings.repeatContent) {
				question.disabled = true;
				if (questions.length === 1) {
					this.inGame[type].forEach(function (question) {
						question.disabled = false;
					});
				}
			}
			this.parse(question);
			return question;
		}
	}]);

	return Content;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Game = (function () {
	function Game() {
		_classCallCheck(this, Game);

		this.check();
		this.attr = {
			self: 'data-game-view',
			container: 'data-game-container',
			stats: 'data-game-stats',
			action: 'data-game-action',
			card: 'data-card-container'
		};
		this.nodes = {
			self: $('[' + this.attr.self + ']'),
			container: $('[' + this.attr.container + ']'),
			stats: $('[' + this.attr.stats + ']')
		};
		this.classes = {
			hidden: 'js-hidden'
		};
		this._events();
	}

	_createClass(Game, [{
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
		key: 'start',
		value: function start() {
			// Start game cycle.
			this.nodes.self.classList.remove(this.classes.hidden);
			this.init();
			this.render();
		}
	}, {
		key: 'restart',
		value: function restart() {}
	}, {
		key: 'continue',
		value: function _continue() {}
	}, {
		key: 'render',
		value: function render() {
			this.nodes.stats.innerHTML = App.manager.Render.stats();
			this.nodes.container.innerHTML = App.manager.Render.game();
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
		key: 'init',
		value: function init() {
			var settings = App.data.settings;

			App.manager.Content.init();
			if (settings.randomPlayers) {
				App.data.currentPlayer = App.manager.PlayerController.getRandom();
			} else {
				App.data.currentPlayer = App.manager.PlayerController.get(0);
			}
		}
	}, {
		key: 'get',
		value: function get(type) {
			var question = App.manager.Content.get(type);
			this.card = new CardConstructor(question);
			this.nodes.card.innerHTML = this.card.html;
			this.updateState(question);
		}
	}, {
		key: 'updateState',
		value: function updateState(question) {
			App.manager.PlayerController.queue.update(question);
			//
		}
	}, {
		key: '_events',
		value: function _events() {
			var _this = this;

			document.addEventListener('mousedown', function (event) {
				var target = event.target.closest('[' + _this.attr.action + ']');
				if (target) {
					_this.get(target.getAttribute(_this.attr.action));
				}
			}, false);
		}
	}]);

	return Game;
})();
window.Language = {
	ru: {
		badinternet: 'Опс. Произошла какая-то ошибка :(. Проверьте ваше интернет соединение.',
		players: {
			exist: 'Игрок с таким именем уже существует, создавайте игроков с уникальными именами.'
		}
	},

	en: {
		badinternet: 'Ooops. Some error happen :(. Check your internet connection.',
		players: {
			exist: 'Player with this name is allready exist, please, create players with uniq names.'
		}
	}
};
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Modal = (function () {
	function Modal(self) {
		_classCallCheck(this, Modal);

		this.attr = {
			self: self,
			action: 'data-modal-action',
			status: 'data-modal-status'
		};
		this.baseClasses = ['js-disabled', 'js-finished', 'js-close', 'transition'];
		this.buttons = this.__buttons();
		if (this.__events) this.__events();
	}

	_createClass(Modal, [{
		key: 'getStatus',
		value: function getStatus() {
			return JSON.parse(this.getView().getAttribute(this.attr.status));
		}
	}, {
		key: 'getView',
		value: function getView() {
			return $('[' + this.attr.self + ']');
		}
	}, {
		key: 'next',
		value: function next() {
			if (typeof this.beforeNext === 'function') this.beforeNext();
			this.getView().classList.add(this.baseClasses[3]);
			this.getView().classList.add(this.baseClasses[1]);
		}
	}, {
		key: 'prev',
		value: function prev() {
			this.getView().classList.add(this.baseClasses[3]);
			this.getView().previousSibling.classList.remove(this.baseClasses[1]);
		}
	}, {
		key: 'close',
		value: function close() {
			this.getView().classList.add(this.baseClasses[3]);
			this.getView().classList.add(this.baseClasses[2]);
		}
	}, {
		key: 'save',
		value: function save() {
			/*
   	@Custom for every popup
   	@Defined in popups
   */
		}
	}, {
		key: '__buttons',
		value: function __buttons() {
			var _this = this;

			return {
				enable: function enable() {
					_this.getView().$('[' + _this.attr.action + ']')[0].classList.remove(_this.classes[0]);
				},
				disable: function disable() {
					_this.getView().$('[' + _this.attr.action + ']')[0].classList.add(_this.classes[0]);
				}
			};
		}
	}]);

	return Modal;
})();

var Modals = (function () {
	function Modals() {
		_classCallCheck(this, Modals);

		this.language = new LanguageModal();
		this.players = new PlayerModal();
		this.rubrics = new RubricsModal();
		this.settings = new SettingsModal();
		this.rules = new RulesModal();
		this['continue'] = new ContinueModal();

		this.TOUCH_TYPES = ['touchstart', 'touchmove', 'touchend'];
		this.attr = {
			action: 'data-modal-action',
			self: 'data-modals-view',
			modals: 'data-modals-modal'
		};
		this.nodes = {
			self: $('[' + this.attr.self + ']')
		};
		this.classes = {
			hidden: 'js-hidden',
			transition: 'transition',
			finished: 'js-finished'
		};
		this.delta = {
			start: null,
			end: null,
			counter: 0
		};
		this.__events();
	}

	_createClass(Modals, [{
		key: 'getCurrent',
		value: function getCurrent() {
			return $('[' + this.attr.modals + ']:not(.js-finished)');
		}
	}, {
		key: 'parseAction',
		value: function parseAction(attr) {
			var parsed = attr.split(':');
			return parsed;
		}
	}, {
		key: 'dispatcher',
		value: function dispatcher(name, action, event) {
			this[name][action](event);
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.nodes.self.classList.add(this.classes.hidden);
		}
	}, {
		key: 'show',
		value: function show() {
			this.nodes.self.classList.remove(this.classes.hidden);
		}
	}, {
		key: 'handleTouch',
		value: function handleTouch(event) {
			var current = this.getCurrent(),
			    name = current.getAttribute(this.attr.modals),
			    canSwipeToNext = current.nextSibling && this[name].getStatus();
			current.classList.remove(this.classes.transition);
			if (event.type === this.TOUCH_TYPES[0]) {
				this.delta.start = event.touches[0].clientX;
				this.nodes.self.classList.remove(this.classes.transition);
			}
			if (event.type === this.TOUCH_TYPES[1]) {
				if (this.delta.start - event.touches[0].clientX > 10 && canSwipeToNext) {
					// Ничего не делать если слайд незначительный
					this.delta.counter = this.delta.start - event.touches[0].clientX;
					current.style.transform = 'translate(calc(-50% - ' + this.delta.counter + 'px), -50%)';
				} else if (this.delta.start - event.touches[0].clientX < 10) {
					this.delta.counter = this.delta.start - event.touches[0].clientX;
				}
			}
			if (event.type === this.TOUCH_TYPES[2]) {
				this.delta.counter > 80 ? this.next(current) : this.back(current);
				this.delta.counter < -80 ? this.previous(current) : void 0;
				this.delta.counter = 0;
			}
		}
	}, {
		key: 'next',
		value: function next(current) {
			current.classList.add(this.classes.transition);
			current.classList.add(this.classes.finished);
			this.reset(current);
		}
	}, {
		key: 'previous',
		value: function previous(current) {
			var prev = current.previousSibling;
			if (prev) {
				prev.classList.remove(this.classes.finished);
			}
		}
	}, {
		key: 'back',
		value: function back(current) {
			current.classList.add(this.classes.transition);
			current.style.transform = null;
		}
	}, {
		key: 'reset',
		value: function reset(current) {
			current.style.transform = null;
		}
	}, {
		key: '__events',
		value: function __events() {
			var _this2 = this;

			document.addEventListener('mousedown', function (event) {
				var closest = event.target.closest('[' + _this2.attr.action + ']');
				if (closest) {
					var parsed = _this2.parseAction(closest.getAttribute(_this2.attr.action));
					_this2.dispatcher(parsed[0], parsed[1], event);
				}
			});
			this.TOUCH_TYPES.forEach(function (touch) {
				_this2.nodes.self.addEventListener(touch, function (event) {
					_this2.handleTouch(event);
				});
			}, false);
		}
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
			if (_.isFunc(onCloseCallback)) {
				this.self.addEventListener('mousedown', function (event) {
					Overlay.close(null, onCloseCallback);
					Overlay.listener = onCloseCallback;
					Overlay.listener();
				});
			}
			var timeout = setTimeout(function () {
				if (_.isFunc(callback)) {
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
			if (_.isFunc(this.listener)) {
				this.self.removeEventListener('mousedown', onCloseCallback, false);
				this.listener = null;
			}
			var timeout = setTimeout(function () {
				_this.self.classList.add(_this.states[0]);
				if (_.isFunc(callback)) {
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

		this.props = {};
		if (props.id) {
			_.setProps(this, props);
		} else {
			this.initProps(props);
		}
	}

	_createClass(Player, [{
		key: "initProps",
		value: function initProps(props) {
			this.name = props.name;
			this.gender = props.gender;
			this.pickRate = 0;
			this.score = 0;
			this.queue = [];
			this.id = _.getRandom();
			this.streak = {
				action: 0,
				truth: 0
			};
		}
	}]);

	return Player;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PlayerController = (function () {
	function PlayerController() {
		_classCallCheck(this, PlayerController);

		this.classes = {
			score: {
				eq: 'eq',
				more: 'more',
				less: 'less'
			}
		};
		this.queue = new Queue();
	}

	_createClass(PlayerController, [{
		key: 'create',
		value: function create(name, gender) {
			return App.data.players.push(new Player({
				name: name,
				gender: gender
			}));
		}
	}, {
		key: 'remove',
		value: function remove(id) {
			var index = App.data.players.indexOf(_.getByKeyValue(App.data.players, 'id', id));
			if (App.data.players[index].current) return App.data.players.splice(index, 1);
		}
	}, {
		key: 'exist',
		value: function exist(name) {
			return _.getByKeyValue(App.data.players, 'name', name);
		}
	}, {
		key: 'get',
		value: function get(id) {
			return App.data.players[id];
		}
	}, {
		key: 'getScoreBoard',
		value: function getScoreBoard() {
			return App.data.players.sort(function (x, y) {
				return x.score < y.score;
			});
		}
	}, {
		key: 'getScoreClass',
		value: function getScoreClass(score) {
			var className = this.classes.score.eq;
			if (score > 0) className = this.classes.score.more;else if (score < 0) className = this.classes.score.less;
			return className;
		}
	}, {
		key: 'getNext',
		value: function getNext() {
			// даст игрока который ходит следующий, если выдача игроков идет случайно то
			// основываясь на pickrate
			// return instanceof Player
			App.data.currentPlayer.pickRate++;
			App.data.previousPlayer = App.data.currentPlayer;
			var settings = App.data.settings;
			if (settings.randomPlayers) {
				App.data.currentPlayer = this.getPickRate();
			} else {
				App.data.currentPlayer = this.getNextPlayer();
			}
			return App.data.currentPlayer;
		}
	}, {
		key: 'getRandom',
		value: function getRandom() {
			var max = App.data.players.length - 1,
			    random = _.getRandomInt(0, max);
			return App.data.players[random];
		}
	}, {
		key: 'getPickRate',
		value: function getPickRate() {
			// случайная выдача игроков
			// основываясь на pickrate
			// выдает игрока с наименьшим пикрейтом
			// return instanceof Player
			return App.data.players.sort(function (x, y) {
				return x.pickRate > y.pickRate;
			})[0];
		}
	}, {
		key: 'getNextPlayer',
		value: function getNextPlayer() {
			var indexOfPlayer = App.data.players.indexOf(App.data.currentPlayer);
			if (App.data.players[indexOfPlayer + 1]) {
				return App.data.players[indexOfPlayer + 1];
			} else {
				return App.data.players[0];
			}
		}
	}, {
		key: 'getLeader',
		value: function getLeader() {
			// Получить лидера по скорборду
			// return array instanceof Player
			return App.data.players.sort(function (x, y) {
				return x.score < y.score;
			})[0];
		}
	}, {
		key: 'getLoser',
		value: function getLoser() {
			// Получить последнего по скорборду
			// return instanceof Player
			return App.data.players.sort(function (x, y) {
				return x.score > y.score;
			})[0];
		}
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
		this.STATES = Object.freeze({
			LOADED: 'LOADED',
			PRELOADING: 'PRELOADING'
		});
		this.state = this.STATES.LOADED;
		this.transition = 300;
	}

	_createClass(Preloader, [{
		key: 'show',
		value: function show() {
			this.nodes.preloader.classList.remove(this.classes[0]);
			this.nodes.preloader.classList.remove(this.classes[1]);
			this.state = this.STATES.PRELOADING;
		}
	}, {
		key: 'hide',
		value: function hide() {
			var _this = this;

			this.nodes.preloader.classList.add(this.classes[0]);
			setTimeout(function () {
				_this.nodes.preloader.classList.add(_this.classes[1]);
			}, this.transition);
			this.state = this.STATES.LOADED;
		}
	}, {
		key: 'getState',
		value: function getState() {
			return this.state;
		}
	}]);

	return Preloader;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Queue = (function () {
	function Queue() {
		_classCallCheck(this, Queue);

		this.TILL_TYPES = Object.freeze({
			TURN: 'turn'
		});
	}

	_createClass(Queue, [{
		key: 'update',
		value: function update(question) {
			var _this = this;

			var queuedPlayers = this.getQueuePlayers();
			/*
   	Update current players queue
   */
			queuedPlayers.forEach(function (player) {
				// if (player.queue.length === 0) return;
				player.queue.forEach(function (queue, i) {
					if (queue.count === _this.TILL_TYPES.TURN && App.data.currentPlayer === player) {
						player.queue[i].count = 0;
						return;
					}
					if (player.queue.count > 0) {
						player.queue.count--;
					} else {
						player.queue.splice(i, 1);
					}
				});
			});

			if (question.type.includes(App.manager.Content.CONTENT_TYPES.HIDDEN)) {
				App.data.currentPlayer.queue.push({
					content: App.manager.Game.card.content,
					count: App.manager.Game.card.queue
				});
			}
		}
	}, {
		key: 'getQueuePlayers',
		value: function getQueuePlayers() {
			return App.data.players.filter(function (player) {
				return player.queue !== null;
			});
		}
	}, {
		key: 'getQueueDonePlayers',
		value: function getQueueDonePlayers() {
			return App.data.players.filter(function (player) {
				return player.queue === 0;
			});
		}
	}]);

	return Queue;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Render = (function () {
	function Render() {
		_classCallCheck(this, Render);

		this.views = {
			modals: $('[data-modals-view]'),
			gamePlayers: $('[data-game-players]'),
			main: null
		};
		this.templates = {
			players: $('#modal_players'),
			rubrics: $('#modal_rubrics'),
			rubricsFooter: $('#modal_rubrics_footer'),
			settings: $('#modal_settings'),
			rules: $('#modal_rules'),
			'continue': $('#modal_continue'),
			cards: {
				question: $('#modal_card_question'),
				additional: $('#modal_card_additional'),
				rate: $('#modal_card_rate'),
				queueDone: $('#modal_card_queuedone')
			},
			stats: $('#stats'),
			game: $('#game')
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
		key: 'rubricsFooter',
		value: function rubricsFooter() {
			var rubricsFooter = this.render(this.templates.rubricsFooter, App.data);
			return rubricsFooter;
		}
	}, {
		key: 'stats',
		value: function stats() {
			var stats = this.render(this.templates.stats, App.data);
			return stats;
		}
	}, {
		key: 'game',
		value: function game() {
			return this.render(this.templates.game, App.data);
		}

		/*
  	Screens
  */
	}, {
		key: '_screen0',
		value: function _screen0() {
			this.views.modals.innerHTML = this.modalContinue();
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
		this.__events();
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
	}, {
		key: '__events',
		value: function __events() {
			var _this = this;

			document.addEventListener('mousedown', function (event) {
				if (event.target.closest('[' + _this.attr.button + ']')) _this.check();
			}, false);
		}
	}]);

	return Sidebar;
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
				if (type === String) return localStorage.getItem(name);
				return JSON.parse(localStorage.getItem(name));
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var VersionController = (function () {
	function VersionController() {
		_classCallCheck(this, VersionController);
	}

	_createClass(VersionController, [{
		key: 'check',
		value: function check() {
			this.version = App.manager.Storage.get('JV', String);
			if (this.version === false) {
				this.load();
				return;
			}
			if (App.online === true && JV === this.version) {
				// Don't update
				this.storage();
			} else if (App.online === true && JV !== this.version) {
				this.load();
			}
		}
	}, {
		key: 'load',
		value: function load() {
			var _this = this;

			var requestFailed = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			var request = new XMLHttpRequest();
			App.isLoading = true;
			request.open('GET', 'data/response.json', true);
			request.send();
			request.onreadystatechange = function () {
				if (request.readyState !== 4) return;
				if (request.status === 200) {
					App.isUpdated = true;
					App.manager.Storage.set('JV', JV);
					App.manager.Storage.set('content', request.responseText);
					App.manager.Content.set(JSON.parse(request.responseText));
					if (App.manager.Preloader.getState() === App.manager.Preloader.STATES.PRELOADING) {
						App.manager.Preloader.hide();
						App.manager.Modals.hide();
						App.manager.Game.start();
					}
					// App.manager.Preloader.hide(); // Rework this on background loading
				} else if (_this.version !== false && requestFailed === false) {
						_this.storage(true);
					} else if (_this.version === false && requestFailed === false) {
						App.manager.Alert.show('error', Language[App.language].badinternet, true);
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
if (!Object.assign) {
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function value(target, firstSource) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}

			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}

				var keysArray = Object.keys(Object(nextSource));
				for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		}
	});
}

if (![].includes) {
	Array.prototype.includes = function (searchElement /*, fromIndex*/) {
		'use strict';
		var O = Object(this);
		var len = parseInt(O.length) || 0;
		if (len === 0) {
			return false;
		}
		var n = parseInt(arguments[1]) || 0;
		var k;
		if (n >= 0) {
			k = n;
		} else {
			k = len + n;
			if (k < 0) {
				k = 0;
			}
		}
		while (k < len) {
			var currentElement = O[k];
			if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
				return true;
			}
			k++;
		}
		return false;
	};
}

if (!String.prototype.includes) {
	String.prototype.includes = function () {
		'use strict';
		return String.prototype.indexOf.apply(this, arguments) !== -1;
	};
}

var _ = {};

_.isFunc = function (func) {
	return typeof func === 'function';
};

_.required = function (variables) {
	if (!Array.isArray(variables) && typeof variables === 'undefined') throw new Error('Define all required arguments');
	if (Array.isArray(variables)) {
		variables.forEach(function (variable) {
			if (typeof variable === 'undefined') throw new Error('Define all required arguments');
		});
	}
	return true;
};

_.getByKeyValue = function (arrayOfObjects, key, value) {
	if (!Array.isArray(arrayOfObjects)) throw new Error('First argument should be an array of objects');
	var finded = false;
	arrayOfObjects.forEach(function (obj) {
		if (typeof obj !== 'object') throw new Error('Cannot find in non object');
		if (obj[key] && obj[key] === value) finded = obj;
	});
	return finded;
};

_.getRandom = function () {
	return parseInt(Math.random() * 1e+10) + parseInt(Math.random() * 1e+10) + String.fromCharCode(parseInt(Math.random() * (100 - 65) + 65));
};

_.getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
};

_.setProps = function (appendTo, object) {
	Object.keys(object).forEach(function (prop) {
		appendTo[prop] = object[prop];
	});
	return appendTo;
};

_.PromisedTimeOut = function (func, timeout) {
	if (!func || !timeout) throw new Error('Defined func and timeout');
	func();
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve();
		}, timeout);
	});
};

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
HTMLElement.prototype.$ = function (query) {
	return this.querySelector(query);
};
NodeList.prototype.array = function () {
	return [].slice.call(this);
};
/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	} else if (typeof Package !== "undefined") {
		//noinspection JSUnresolvedVariable
		Sortable = factory(); // export for Meteor.js
	} else {
			/* jshint sub:true */
			window["Sortable"] = factory();
		}
})(function sortableFactory() {
	"use strict";

	if (typeof window == "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
	    parentEl,
	    ghostEl,
	    cloneEl,
	    rootEl,
	    nextEl,
	    scrollEl,
	    scrollParentEl,
	    scrollCustomFn,
	    lastEl,
	    lastCSS,
	    lastParentCSS,
	    oldIndex,
	    newIndex,
	    activeGroup,
	    putSortable,
	    autoScroll = {},
	    tapEvt,
	    touchEvt,
	    moved,
	   

	/** @const */
	RSPACE = /\s+/g,
	    expando = 'Sortable' + new Date().getTime(),
	    win = window,
	    document = win.document,
	    parseInt = win.parseInt,
	    $ = win.jQuery || win.Zepto,
	    Polymer = win.Polymer,
	    supportDraggable = !!('draggable' in document.createElement('div')),
	    supportCssPointerEvents = (function (el) {
		// false when IE11
		if (!!navigator.userAgent.match(/Trident.*rv[ :]?11\./)) {
			return false;
		}
		el = document.createElement('x');
		el.style.cssText = 'pointer-events:auto';
		return el.style.pointerEvents === 'auto';
	})(),
	    _silent = false,
	    abs = Math.abs,
	    min = Math.min,
	    slice = [].slice,
	    touchDragOverListeners = [],
	    _autoScroll = _throttle(function ( /**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
		// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
		if (rootEl && options.scroll) {
			var _this = rootEl[expando],
			    el,
			    rect,
			    sens = options.scrollSensitivity,
			    speed = options.scrollSpeed,
			    x = evt.clientX,
			    y = evt.clientY,
			    winWidth = window.innerWidth,
			    winHeight = window.innerHeight,
			    vx,
			    vy,
			    scrollOffsetX,
			    scrollOffsetY;

			// Delect scrollEl
			if (scrollParentEl !== rootEl) {
				scrollEl = options.scroll;
				scrollParentEl = rootEl;
				scrollCustomFn = options.scrollFn;

				if (scrollEl === true) {
					scrollEl = rootEl;

					do {
						if (scrollEl.offsetWidth < scrollEl.scrollWidth || scrollEl.offsetHeight < scrollEl.scrollHeight) {
							break;
						}
						/* jshint boss:true */
					} while (scrollEl = scrollEl.parentNode);
				}
			}

			if (scrollEl) {
				el = scrollEl;
				rect = scrollEl.getBoundingClientRect();
				vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
				vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
			}

			if (!(vx || vy)) {
				vx = (winWidth - x <= sens) - (x <= sens);
				vy = (winHeight - y <= sens) - (y <= sens);

				/* jshint expr:true */
				(vx || vy) && (el = win);
			}

			if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
				autoScroll.el = el;
				autoScroll.vx = vx;
				autoScroll.vy = vy;

				clearInterval(autoScroll.pid);

				if (el) {
					autoScroll.pid = setInterval(function () {
						scrollOffsetY = vy ? vy * speed : 0;
						scrollOffsetX = vx ? vx * speed : 0;

						if ('function' === typeof scrollCustomFn) {
							return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
						}

						if (el === win) {
							win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
						} else {
							el.scrollTop += scrollOffsetY;
							el.scrollLeft += scrollOffsetX;
						}
					}, 24);
				}
			}
		}
	}, 30),
	    _prepareGroup = function _prepareGroup(options) {
		function toFn(value, pull) {
			if (value === void 0 || value === true) {
				value = group.name;
			}

			if (typeof value === 'function') {
				return value;
			} else {
				return function (to, from) {
					var fromGroup = from.options.group.name;

					return pull ? value : value && (value.join ? value.indexOf(fromGroup) > -1 : fromGroup == value);
				};
			}
		}

		var group = {};
		var originalGroup = options.group;

		if (!originalGroup || typeof originalGroup != 'object') {
			originalGroup = { name: originalGroup };
		}

		group.name = originalGroup.name;
		group.checkPull = toFn(originalGroup.pull, true);
		group.checkPut = toFn(originalGroup.put);

		options.group = group;
	};

	/**
  * @class  Sortable
  * @param  {HTMLElement}  el
  * @param  {Object}       [options]
  */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + ({}).toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);

		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			animation: 0,
			setData: function setData(dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: { x: 0, y: 0 }
		};

		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		_on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}

	Sortable.prototype = /** @lends Sortable.prototype */{
		constructor: Sortable,

		_onTapStart: function _onTapStart( /** Event|TouchEvent */evt) {
			var _this = this,
			    el = this.el,
			    options = this.options,
			    type = evt.type,
			    touch = evt.touches && evt.touches[0],
			    target = (touch || evt).target,
			    originalTarget = evt.target.shadowRoot && evt.path[0] || target,
			    filter = options.filter,
			    startIndex;

			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, startIndex);
					evt.preventDefault();
					return; // cancel dnd
				}
			} else if (filter) {
					filter = filter.split(',').some(function (criteria) {
						criteria = _closest(originalTarget, criteria.trim(), el);

						if (criteria) {
							_dispatchEvent(_this, criteria, 'filter', target, el, startIndex);
							return true;
						}
					});

					if (filter) {
						evt.preventDefault();
						return; // cancel dnd
					}
				}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function _prepareDragStart( /** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
			    el = _this.el,
			    options = _this.options,
			    ownerDocument = el.ownerDocument,
			    dragStartFn;

			if (target && !dragEl && target.parentNode === el) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'transform';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					_on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}
			}
		},

		_disableDelayedDrag: function _disableDelayedDrag() {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function _triggerDragStart( /** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);
			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			} else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			} else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					setTimeout(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {}
		},

		_dragStarted: function _dragStarted() {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
			}
		},

		_emulateDragOver: function _emulateDragOver() {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
				    parent = target,
				    i = touchDragOverListeners.length;

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},

		_onTouchMove: function _onTouchMove( /**TouchEvent*/evt) {
			if (tapEvt) {
				var options = this.options,
				    fallbackTolerance = options.fallbackTolerance,
				    fallbackOffset = options.fallbackOffset,
				    touch = evt.touches ? evt.touches[0] : evt,
				    dx = touch.clientX - tapEvt.clientX + fallbackOffset.x,
				    dy = touch.clientY - tapEvt.clientY + fallbackOffset.y,
				    translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance && min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function _appendGhost() {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
				    css = _css(dragEl),
				    options = this.options,
				    ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function _onDragStart( /**Event*/evt, /**boolean*/useFallback) {
			var dataTransfer = evt.dataTransfer,
			    options = this.options;

			this._offUpEvents();

			if (activeGroup.checkPull(this, this, dragEl, evt) == 'clone') {
				cloneEl = _clone(dragEl);
				_css(cloneEl, 'display', 'none');
				rootEl.insertBefore(cloneEl, dragEl);
				_dispatchEvent(this, rootEl, 'clone', dragEl);
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', this._onTouchMove);
					_on(document, 'touchend', this._onDrop);
					_on(document, 'touchcancel', this._onDrop);
					_on(document, 'pointermove', this._onTouchMove);
					_on(document, 'pointerup', this._onDrop);
				} else {
					// Old brwoser
					_on(document, 'mousemove', this._onTouchMove);
					_on(document, 'mouseup', this._onDrop);
				}

				this._loopId = setInterval(this._emulateDragOver, 50);
			} else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(this, dataTransfer, dragEl);
				}

				_on(document, 'drop', this);
				setTimeout(this._dragStarted, 0);
			}
		},

		_onDragOver: function _onDragOver( /**Event*/evt) {
			var el = this.el,
			    target,
			    dragRect,
			    targetRect,
			    revert,
			    options = this.options,
			    group = options.group,
			    activeSortable = Sortable.active,
			    isOwner = activeGroup === group,
			    canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			moved = true;

			if (activeGroup && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
			: putSortable === this || activeGroup.checkPull(this, activeSortable, dragEl, evt) && group.checkPut(this, activeSortable, dragEl, evt)) && (evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
					// Smart auto-scrolling
					_autoScroll(evt, options, this.el);

					if (_silent) {
						return;
					}

					target = _closest(evt.target, options.draggable, el);
					dragRect = dragEl.getBoundingClientRect();
					putSortable = this;

					if (revert) {
						_cloneHide(true);
						parentEl = rootEl; // actualization

						if (cloneEl || nextEl) {
							rootEl.insertBefore(dragEl, cloneEl || nextEl);
						} else if (!canSort) {
							rootEl.appendChild(dragEl);
						}

						return;
					}

					if (el.children.length === 0 || el.children[0] === ghostEl || el === evt.target && (target = _ghostIsLast(el, evt))) {
						if (target) {
							if (target.animated) {
								return;
							}

							targetRect = target.getBoundingClientRect();
						}

						_cloneHide(isOwner);

						if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
							if (!dragEl.contains(el)) {
								el.appendChild(dragEl);
								parentEl = el; // actualization
							}

							this._animate(dragRect, dragEl);
							target && this._animate(targetRect, target);
						}
					} else if (target && !target.animated && target !== dragEl && target.parentNode[expando] !== void 0) {
						if (lastEl !== target) {
							lastEl = target;
							lastCSS = _css(target);
							lastParentCSS = _css(target.parentNode);
						}

						targetRect = target.getBoundingClientRect();

						var width = targetRect.right - targetRect.left,
						    height = targetRect.bottom - targetRect.top,
						    floating = /left|right|inline/.test(lastCSS.cssFloat + lastCSS.display) || lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0,
						    isWide = target.offsetWidth > dragEl.offsetWidth,
						    isLong = target.offsetHeight > dragEl.offsetHeight,
						    halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						    nextSibling = target.nextElementSibling,
						    moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt),
						    after;

						if (moveVector !== false) {
							_silent = true;
							setTimeout(_unsilent, 30);

							_cloneHide(isOwner);

							if (moveVector === 1 || moveVector === -1) {
								after = moveVector === 1;
							} else if (floating) {
								var elTop = dragEl.offsetTop,
								    tgTop = target.offsetTop;

								if (elTop === tgTop) {
									after = target.previousElementSibling === dragEl && !isWide || halfway && isWide;
								} else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
									after = (evt.clientY - targetRect.top) / height > 0.5;
								} else {
									after = tgTop > elTop;
								}
							} else {
								after = nextSibling !== dragEl && !isLong || halfway && isLong;
							}

							if (!dragEl.contains(el)) {
								if (after && !nextSibling) {
									el.appendChild(dragEl);
								} else {
									target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
								}
							}

							parentEl = dragEl.parentNode; // actualization

							this._animate(dragRect, dragEl);
							this._animate(targetRect, target);
						}
					}
				}
		},

		_animate: function _animate(prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d(' + (prevRect.left - currentRect.left) + 'px,' + (prevRect.top - currentRect.top) + 'px,0)');

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function _offUpEvents() {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
		},

		_onDrop: function _onDrop( /**Event*/evt) {
			var el = this.el,
			    options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode.removeChild(ghostEl);

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {

							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
						}
					} else {
						// Remove clone
						cloneEl && cloneEl.parentNode.removeChild(cloneEl);

						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}
			}

			this._nulling();
		},

		_nulling: function _nulling() {
			rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = scrollEl = scrollParentEl = tapEvt = touchEvt = moved = newIndex = lastEl = lastCSS = putSortable = activeGroup = Sortable.active = null;
		},

		handleEvent: function handleEvent( /**Event*/evt) {
			var type = evt.type;

			if (type === 'dragover' || type === 'dragenter') {
				if (dragEl) {
					this._onDragOver(evt);
					_globalDragOver(evt);
				}
			} else if (type === 'drop' || type === 'dragend') {
				this._onDrop(evt);
			}
		},

		/**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
		toArray: function toArray() {
			var order = [],
			    el,
			    children = this.el.children,
			    i = 0,
			    n = children.length,
			    options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},

		/**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
		sort: function sort(order) {
			var items = {},
			    rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},

		/**
   * Save the current sorting
   */
		save: function save() {
			var store = this.options.store;
			store && store.set(this);
		},

		/**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
		closest: function closest(el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},

		/**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
		option: function option(name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},

		/**
   * Destroy
   */
		destroy: function destroy() {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};

	function _cloneHide(state) {
		if (cloneEl && cloneEl.state !== state) {
			_css(cloneEl, 'display', state ? 'none' : '');
			!state && cloneEl.state && rootEl.insertBefore(cloneEl, dragEl);
			cloneEl.state = state;
		}
	}

	function _closest( /**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if (selector === '>*' && el.parentNode === ctx || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}

	function _getParentOrHost(el) {
		var parent = el.host;

		return parent && parent.nodeType ? parent : el.parentNode;
	}

	function _globalDragOver( /**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}

	function _on(el, event, fn) {
		el.addEventListener(event, fn, false);
	}

	function _off(el, event, fn) {
		el.removeEventListener(event, fn, false);
	}

	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			} else {
				var className = (' ' + el.className + ' ').replace(RSPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(RSPACE, ' ');
			}
		}
	}

	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				} else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			} else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}

	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName),
			    i = 0,
			    n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}

	function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
		sortable = sortable || rootEl[expando];

		var evt = document.createEvent('Event'),
		    options = sortable.options,
		    onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}

	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt) {
		var evt,
		    sortable = fromEl[expando],
		    onMoveFn = sortable.options.onMove,
		    retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}

	function _disableDraggable(el) {
		el.draggable = false;
	}

	function _unsilent() {
		_silent = false;
	}

	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
		    rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5 || evt.clientX - (rect.right + rect.width) > 5) && lastEl;
	}

	/**
  * Generate id
  * @param   {HTMLElement} el
  * @returns {String}
  * @private
  */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
		    i = str.length,
		    sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
  * Returns the index of an element within its parent for a selected set of
  * elements
  * @param  {HTMLElement} el
  * @param  {selector} selector
  * @return {number}
  */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if (el.nodeName.toUpperCase() !== 'TEMPLATE' && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches( /**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
			    re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (tag === '' || el.nodeName.toUpperCase() == tag) && (!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		return $ ? $(el).clone(true)[0] : Polymer && Polymer.dom ? Polymer.dom(el).cloneNode(true) : el.cloneNode(true);
	}

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function is(el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index
	};

	/**
  * Create sortable instance
  * @param {HTMLElement}  el
  * @param {Object}      [options]
  */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};

	// Export
	Sortable.version = '1.5.0-rc1';
	return Sortable;
});
var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CardConstructor = (function () {
	function CardConstructor(question) {
		_classCallCheck(this, CardConstructor);

		this.CARD_TYPES = {
			HIDDEN: 'hidden',
			ALL: 'all',
			SPECIAL: 'special'
		};
		this.cardsMap = {
			question: null,
			additional: null,
			rate: null,
			queueDone: []
		};
		this.question = question;
		this.queuedPlayers = App.manager.PlayerController.queue.getQueueDonePlayers();
		this.content = '';
		this.type = [];
		this.parseQuestion();
	}

	_createClass(CardConstructor, [{
		key: 'parseQuestion',
		value: function parseQuestion() {
			// parse here and save text content into this.content
			this.parseType();
			this.parseText();
		}
	}, {
		key: 'parseType',
		value: function parseType() {
			var _this = this;

			if (this.question.type) {
				this.question.type.split(',').forEach(function (type) {
					var _type$split = type.split('=');

					var _type$split2 = _slicedToArray(_type$split, 2);

					var name = _type$split2[0];
					var value = _type$split2[1];

					if (name === App.manager.Content.CONTENT_TYPES.hidden) {
						_this.queue = value;
					} else {}
					_this.type.push([name, value]);
				});
			}
		}
	}, {
		key: 'parseText',
		value: function parseText() {}
	}, {
		key: 'buildCards',
		value: function buildCards() {
			c;
		}
	}, {
		key: 'buildView',
		value: function buildView(cards) {
			// Build using doT
		}
	}, {
		key: 'html',
		value: function html() {
			return this.html;
		}
	}]);

	return CardConstructor;
})();
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContinueModal = (function (_Modal) {
	_inherits(ContinueModal, _Modal);

	function ContinueModal() {
		_classCallCheck(this, ContinueModal);

		_get(Object.getPrototypeOf(ContinueModal.prototype), 'constructor', this).call(this, 'data-continue-modal');
	}

	_createClass(ContinueModal, [{
		key: 'restart',
		value: function restart() {}
	}, {
		key: 'continue',
		value: function _continue() {}
	}]);

	return ContinueModal;
})(Modal);
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LanguageModal = (function (_Modal) {
	_inherits(LanguageModal, _Modal);

	function LanguageModal() {
		_classCallCheck(this, LanguageModal);

		_get(Object.getPrototypeOf(LanguageModal.prototype), 'constructor', this).call(this, 'data-language-modal');
	}

	_createClass(LanguageModal, [{
		key: 'save',
		value: function save() {}
	}]);

	return LanguageModal;
})(Modal);
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerModal = (function (_Modal) {
	_inherits(PlayerModal, _Modal);

	function PlayerModal() {
		_classCallCheck(this, PlayerModal);

		_get(Object.getPrototypeOf(PlayerModal.prototype), 'constructor', this).call(this, 'data-player-modal');
		this.selfAttributes = {
			input: 'data-player-input',
			button: 'data-player-create',
			sortable: 'data-player-sortable',
			sortableHandle: 'data-player-sortable-handle',
			player: 'data-playerlist-player'
		};
		this.sortableNode = null;
		this.attr = Object.assign(this.attr, this.selfAttributes);
		this.players = 'data-playerlist-player';
		this.classes = ['disabled'];
	}

	_createClass(PlayerModal, [{
		key: 'add',
		value: function add(event) {
			event.preventDefault();
			var name = $('[' + this.attr.input + ']').value,
			    gender = this.getGender().value,
			    player = null;
			if (App.manager.PlayerController.exist(name)) {
				App.manager.Alert.show('error', Language[App.language].players.exist);
				return false;
			}
			App.manager.PlayerController.create(name, gender);
			this.render();
			$('[' + this.attr.input + ']').focus();
		}
	}, {
		key: 'setGender',
		value: function setGender(event) {
			event.preventDefault();
			$('[' + this.attr.input + ']').focus();
		}
	}, {
		key: 'remove',
		value: function remove(event) {
			var id = event.target.closest('[' + this.attr.player + ']').getAttribute(this.attr.player);
			App.manager.PlayerController.remove(id);
			this.render();
		}
	}, {
		key: 'render',
		value: function render() {
			$('[' + this.attr.self + ']').outerHTML = App.manager.Render.modalPlayers();
			this.sortable();
		}
	}, {
		key: 'sortable',
		value: function sortable() {
			this.sortableNode = new Sortable($('[' + this.attr.sortable + ']'), {
				animation: 150
			});
		}
	}, {
		key: 'eventCondition',
		// TODO Sort player on sort
		value: function eventCondition(node) {
			return node.hasAttribute('data-player-input') && node.value.length > 0 && this.getGender();
		}
	}, {
		key: 'checkButton',
		value: function checkButton(event) {
			var input = $('[' + this.attr.input + ']');
			if (this.eventCondition(input)) $('[' + this.attr.button + ']').classList.remove(this.classes[0]);else $('[' + this.attr.button + ']').classList.add(this.classes[0]);
		}
	}, {
		key: 'getGender',
		value: function getGender() {
			return $('[name="players_gender"]:checked');
		}
	}, {
		key: '__events',
		value: function __events() {
			var _this = this;

			['keyup', 'mousedown', 'change'].forEach(function (e) {
				document.addEventListener(e, function (event) {
					_this.checkButton();
				});
			});
		}
	}]);

	return PlayerModal;
})(Modal);
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RubricsModal = (function (_Modal) {
	_inherits(RubricsModal, _Modal);

	function RubricsModal() {
		_classCallCheck(this, RubricsModal);

		_get(Object.getPrototypeOf(RubricsModal.prototype), 'constructor', this).call(this, 'data-rubric-modal');
		this.selfAttributes = {
			rubrics: 'name="rubrics"',
			name: 'name'
		};
		this.nameValue = 'rubrics';
		this.attr = Object.assign(this.attr, this.selfAttributes);
	}

	_createClass(RubricsModal, [{
		key: 'save',
		value: function save() {}
	}, {
		key: 'change',
		value: function change() {
			App.data.rubrics = [];
			$$('[' + this.attr.rubrics + ']:checked').array().forEach(function (checked) {
				App.data.rubrics.push(checked.value);
			});
			this.updateView();
		}
	}, {
		key: 'beforeNext',
		value: function beforeNext() {
			this.save();
		}
	}, {
		key: 'render',
		value: function render() {
			this.getView().outerHTML = App.manager.Render.modalRubrics();
		}
	}, {
		key: 'updateView',
		value: function updateView() {
			var view = this.getView();
			view.$('footer').outerHTML = App.manager.Render.rubricsFooter();
			view.setAttribute(this.attr.status, App.data.rubrics.length >= 1);
		}
	}, {
		key: '__events',
		value: function __events() {
			var _this = this;

			document.addEventListener('change', function (e) {
				if (e.target.getAttribute(_this.attr.name) === _this.nameValue) {
					_this.change();
				}
			});
		}
	}]);

	return RubricsModal;
})(Modal);
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RulesModal = (function (_Modal) {
	_inherits(RulesModal, _Modal);

	function RulesModal() {
		_classCallCheck(this, RulesModal);

		_get(Object.getPrototypeOf(RulesModal.prototype), 'constructor', this).call(this, 'data-rules-modal');
	}

	_createClass(RulesModal, [{
		key: 'start',
		value: function start() {
			if (App.isUpdated) {
				App.manager.Modals.hide();
				App.manager.Game.start();
			} else {
				App.manager.Preloader.show();
			}
		}
	}]);

	return RulesModal;
})(Modal);
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SettingsModal = (function (_Modal) {
	_inherits(SettingsModal, _Modal);

	function SettingsModal() {
		_classCallCheck(this, SettingsModal);

		_get(Object.getPrototypeOf(SettingsModal.prototype), 'constructor', this).call(this, 'data-settings-modal');
		this.selfAttributes = {
			binded: 'data-bind',
			type: 'type'
		};
		this.INPUT_TYPES = Object.freeze({
			CHECKBOX: 'checkbox'
		});
		this.attr = Object.assign(this.attr, this.selfAttributes);
		this.__events();
	}

	_createClass(SettingsModal, [{
		key: 'handleBind',
		value: function handleBind(binded) {
			var parsed = this.parse(binded.getAttribute(this.attr.binded)),
			    value = null;
			try {
				value = JSON.parse(binded.value);
			} catch (e) {
				value = binded.value;
			}
			if (Array.isArray(parsed)) {
				App.data.settings[parsed[0]][parsed[1]] = value;
			} else {
				App.data.settings[parsed] = value;
			}
		}
	}, {
		key: 'beforeNext',
		value: function beforeNext() {
			App.manager.Content.filter();
		}
	}, {
		key: 'parse',
		value: function parse(attr) {
			var splited = attr.split('-');
			return splited.length === 1 ? splited[0] : splited;
		}
	}, {
		key: 'setSettings',
		value: function setSettings() {
			var _this = this;

			var binded = $$('\n\t\t\t[' + this.attr.binded + ']:checked,\n\t\t\t[' + this.attr.binded + '][' + this.attr.type + '="' + this.INPUT_TYPES.CHECKBOX + '"]\n\t\t').array();
			binded.forEach(function (bind) {
				_this.handleBind(bind);
			});
		}
	}, {
		key: 'setValue',
		value: function setValue(node) {
			node.value = node.checked;
		}
	}, {
		key: 'render',
		value: function render() {
			this.getView().outerHTML = App.manager.Render.modalSettings();
		}
	}, {
		key: '__events',
		value: function __events() {
			var _this2 = this;

			document.addEventListener('change', function (event) {
				var target = event.target;
				if (target.hasAttribute(_this2.attr.binded)) {
					if (target.getAttribute(_this2.attr.type) === _this2.INPUT_TYPES.CHECKBOX) _this2.setValue(target);
					_this2.setSettings();
				}
			}, false);
		}
	}]);

	return SettingsModal;
})(Modal);
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = (function () {
	function Card() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, Card);

		this["default"] = {
			last: false,
			self: null, /* required */
			template: null /* required */
		};
		this.options = Object.assign(this["default"], this.options);
		this.view = null;
		this.build();
	}

	_createClass(Card, [{
		key: "build",
		value: function build() {
			this.view = doT.template(template)(Object.assign(App.data, { isLast: this.options.last }));
		}
	}, {
		key: "getView",
		value: function getView() {
			return this.view;
		}
	}]);

	return Card;
})();


var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardsQuestion = (function (_Card) {
	_inherits(CardsQuestion, _Card);

	function CardsQuestion(options) {
		_classCallCheck(this, CardsQuestion);

		_get(Object.getPrototypeOf(CardsQuestion.prototype), "constructor", this).call(this, options);
	}

	return CardsQuestion;
})(Card);

//# sourceMappingURL=maps/app.js.map
