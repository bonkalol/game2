class CardConstructor {
	constructor(question) {
		this.CARD_TYPES = {
			HIDDEN: 'hidden',
			ALL: 'all',
			SPECIAL: 'special'
		}
		this.cardsMap = {
			question: null,
			additional: null,
			rating: null,
			queue: []
		};
		this.question = question;
		this.queuedPlayers = App.manager.PlayerController.queue.getQueueDonePlayers();
		this.parseQuestion();
	}
	parseQuestion() {

	}
	buildCard() {

	}
	buildView(cards) {

	}
	html() {
		return this.html;
	}
}
