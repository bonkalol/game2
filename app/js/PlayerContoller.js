class PlayerController {
	constructor() {
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
		// return array of Players sorted by scores
	}
	getAssistent() {
		// получить игрока ассисента (основываясь на пикрейт игроков)
		// return instanceof Player
	}
	getCurrent() {
		// получить текущего игрока
		// return instanceof Player
	}
	getNext() {
		// даст игрока который ходит следующий, основываясь на pickrate если выдача игроков идет
		// случайно
		// return instanceof Player
	}
	getPrevious() {
		// return instanceof Player
	}
	getRandom() {
		const length = App.data.players.length, random = _.getRandomInt(0, length);
		return App.data.players[random];
	}
	getLeader() {
		// Получить лидера по скорборду
		// return instanceof Player
	}
	getLast() {
		// Получить последнего по скорборду
		// return instanceof Player
	}
	getWinner() {
		// return instanceof Player
	}
	setCurrent(setPlayer/* @Player */) {
		_.required(setPlayer);
		App.data.players.forEach(player => {
			player.current = false;
		});
		setPlayer.current = true;
		return setPlayer;
	}
}
