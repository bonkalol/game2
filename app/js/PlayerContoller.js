class PlayerController {
	constructor() {
	}
	create(name, gender) {
		if (this.isExist(name)) {
			App.manager.Alert.show('error', Language[App.language].players.exist);
			return false;
		}
		let player = new Player({
			name,
			gender
		})
		App.data.players.push(player);
		return player;
	}
	isExist(name) {
		return _.getByKeyValue(App.data.players, 'name', name);
	}
	getScoreBoard() {
		// return array of Players sorted by scores
	}
	getAssistent() {
		// получить игрока ассисента (основываясь на пикрейт игроков)
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

	}
	getRandom(){
		// Получить рандомного игрока
	}
	getLeader() {
		// Получить лидера по скорборду
	}
	getLast() {
		// Получить последнего по скорборду
	}
	getWinner() {
		
	}
}