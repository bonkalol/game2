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
			rate: null,
			queueDone: []
		};
		this.question = question;
		this.queuedPlayers = App.manager.PlayerController.queue.getQueueDonePlayers();
		this.content = '';
		this.type = [];
		this.parseQuestion();
	}
	parseQuestion() {
		// parse here and save text content into this.content
		this.parseType();
		this.parseText();
	}
	parseType() {
		if (this.question.type) {
			this.question.type.split(',').forEach(type => {
				const [name, value] = type.split('=');
				if (name === App.manager.Content.CONTENT_TYPES.hidden) {
					this.queue = value;
				} else {

				}
				this.type.push([name, value]);
			});
		}
	}
	parseText() {

	}
	buildCards() {
		c
	}
	buildView(cards) {
		// Build using doT
	}
	html() {
		return this.html;
	}
}
