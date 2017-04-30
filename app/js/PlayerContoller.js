class PlayerController {
	constructor() {
		this.classes = {
			score: {
				eq: 'eq',
				more: 'more',
				less: 'less'
			}
		}
		this.queue = new Queue();
	}
	create(name, gender) {
		return App.data.players.push(new Player({
			name,
			gender
		}));
	}
	remove(id) {
		let index = App.data.players.indexOf(_.getByKeyValue(App.data.players, 'id', id));
		if (App.data.players[index].current)
		return App.data.players.splice(index, 1);
	}
	exist(name) {
		return _.getByKeyValue(App.data.players, 'name', name);
	}
	get(id) {
		return App.data.players[id];
	}
	getScoreBoard() {
		return App.data.players.sort((x, y) => {
			return x.score < y.score;
		});
	}
	getScoreClass(score) {
		let className = this.classes.score.eq;
		if (score > 0) className = this.classes.score.more;
		else if (score < 0) className = this.classes.score.less;
		return className;
	}
	getNext() {
		// даст игрока который ходит следующий, если выдача игроков идет случайно то
		// основываясь на pickrate
		// return instanceof Player
		App.data.currentPlayer.pickRate++;
		App.data.previousPlayer = App.data.currentPlayer;
		const settings = App.data.settings;
		if (settings.randomPlayers) {
			App.data.currentPlayer = this.getPickRate();
		} else {
			App.data.currentPlayer = this.getNextPlayer();
		}
		return App.data.currentPlayer;
	}
	getRandom() {
		const max = App.data.players.length - 1, random = _.getRandomInt(0, max);
		return App.data.players[random];
	}
	getPickRate() {
		// случайная выдача игроков
		// основываясь на pickrate
		// выдает игрока с наименьшим пикрейтом
		// return instanceof Player
		return App.data.players.sort((x, y) => {
			return x.pickRate > y.pickRate;
		})[0];
	}
	getNextPlayer() {
		const indexOfPlayer = App.data.players.indexOf(App.data.currentPlayer);
		if (App.data.players[indexOfPlayer + 1]) {
			return App.data.players[indexOfPlayer + 1];
		} else {
			return App.data.players[0];
		}
	}
	getLeader() {
		// Получить лидера по скорборду
		// return array instanceof Player
		return App.data.players.sort((x, y) => {
			return x.score < y.score;
		})[0];
	}
	getLoser() {
		// Получить последнего по скорборду
		// return instanceof Player
		return App.data.players.sort((x, y) => {
			return x.score > y.score;
		})[0];
	}
}

class Queue {
	constructor() {
	}
	check() {
		if (App.data.queue.length === 0) return false;
		
	}
	add(player, till) {

	}
	remove() {

	}
	get() {
		return App.data.queue;
	}
}