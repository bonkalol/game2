class Queue {
	constructor() {
		this.TILL_TYPES = Object.freeze({
			TURN: 'turn'
		});
	}
	update(question) {
		const queuedPlayers = this.getQueuePlayers();
		/*
			Update current players queue
		*/
		queuedPlayers.forEach(player => {
			// if (player.queue.length === 0) return;
			player.queue.forEach((queue, i) => {
				if (queue.count === this.TILL_TYPES.TURN && App.data.currentPlayer === player) {
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
	getQueuePlayers() {
		return App.data.players.filter(player => {
			return player.queue !== null;
		});
	}
	getQueueDonePlayers() {
		return App.data.players.filter(player => {
			return player.queue === 0;
		});
	}
}