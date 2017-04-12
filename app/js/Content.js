class Content {
	constructor() {
		this.content = null;
		this.inGame = {
			truth: [],
			action: []
		};
		this.excludes = {};
		this.truth = [];
		this.action = [];
		this.CONTENT_TYPES = {
			ALCO: 'alcohol',
			PARTNER: 'partner',
			HIDDEN: 'gray',
			ALL: 'yellow',
			SPECIAL: 'special'
		}
	}
	set(data) {
		this.content = data.rubrics;
		Object.keys(this.content).forEach(rubric => {
			Object.keys(this.content[rubric]).forEach(type => {
				this.content[rubric][type].forEach((question, i) => {
					if (typeof question === 'string') {
						this.content[rubric][type][i] = { text: question };
					}
				});
			});
		});
	}
	init() {
		Object.keys(this.content).forEach(key => {
			if (App.data.rubrics.includes(key)) {
				this.inGame.action = this.inGame.action.concat(this.content[key].action);
				this.inGame.truth = this.inGame.truth.concat(this.content[key].truth);
			}
		});
		this.filter();
	}
	merge() {
		// Test this function in game
		// Should add only new questions from new selected rubrics
		App.data.rubrics.forEach(rubric => {
			Object.keys(this.content[rubric]).forEach(type => {
				this.inGame[type].forEach(question => {
					let questionToAdd = _.getByKeyValue(this.content[rubric][type], 'text', question.text); // Fix this issue
					if (!questionToAdd) {
						this.inGame[type].push(question);
					}
				});
			});
		});
		this.filter();
	}
	filter() {
		this.excludes = {
			alco: App.data.settings[this.CONTENT_TYPES.ALCO],
			hidden: App.data.settings.cards[this.CONTENT_TYPES.HIDDEN],
			all: App.data.settings.cards[this.CONTENT_TYPES.ALL],
			special: App.data.settings.cards[this.CONTENT_TYPES.SPECIAL]
		};
		Object.keys(this.inGame).forEach(type => {
			this.inGame[type].forEach(question => {
				if (!question.type) {
					question.filtered = false;
					return;
				}
				question.filtered = Object.keys(this.excludes).some(filterName => {
					return question.type.includes(filterName) && !filterName;
				});
			});
		});
	}
	get(type) {
		// Get truth or action.
	}
}
