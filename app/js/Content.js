class Content {
	constructor() {
		this.content = null;
		this.inGame = {
			truth: [],
			action: []
		};
		this.filters = {};
		this.truth = [];
		this.action = [];
		this.CONTENT_TYPES = {
			ALCO: 'alco',
			PARTNER: 'partner',
			HIDDEN: 'hidden',
			ALL: 'all',
			SPECIAL: 'special'
		}
	}
	set(data) {
		this.content = data;
	}
	init() {
		Object.keys(this.content).forEach(key => {
			if (App.data.rubrics.includes(key)) {
				App.inGame.action.concat(this.content[key].action);
				App.inGame.truth.concat(this.content[key].truth);
			}
		});
		this.fiters();
	}
	merge() {
		// Test this function in game
		// Should add only new questions from new selected rubrics
		App.data.rubrics.forEach(rubric => {
			Object.keys(this.content[rubric]).forEach(type => {
				this.inGame[type].forEach(question => {
					let questionToAdd = _.getByKeyValue(this.content[rubric][type], 'text', question.text);
					if (!questionToAdd) {
						this.inGame[type].push(questionToAdd);
					}
				});
			});
		});
	}
	filters() {
		this.filters = {
			alco: App.data.settings.alco,
			hidden: App.data.settings.cards[this.CONTENT_TYPES.HIDDEN],
			all: App.data.settings.cards[this.CONTENT_TYPES.ALL],
			special: App.data.settings.cards[this.CONTENT_TYPES.SPECIAL]
		};
		App.inGame.action.forEach(question => {
			if (!question.type) return;
			// Done here.
		});
	}
	get(type) {
		// Get truth or action.
	}
}
