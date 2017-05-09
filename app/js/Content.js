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
		this.CONTENT_ACTIONS = [
			'action',
			'truth'
		];
		this.CONTENT_TYPES = Object.freeze({
			ALCO: 'alco',
			PARTNER: 'partner',
			HIDDEN: 'hidden',
			ALL: 'all',
			SPECIAL: 'special'
		});
	}
	set(data) {
		this.content = data.rubrics;
		Object.keys(this.content).forEach(rubric => {
			this.CONTENT_ACTIONS.forEach(type => {
				this.content[rubric][type].forEach((question, i) => {
					if (typeof question === 'string') {
						this.content[rubric][type][i] = { text: question };
					}
					this.content[rubric][type][i].rubric = rubric;
				});
			});
		});
	}
	init(type = null) {
		Object.keys(this.content).forEach(key => {
			if (!App.data.rubrics.includes(key)) return;
			if (type) {
				this.inGame[type] = this.inGame[type].concat(this.content[key][type]);
				return;
			}
			this.inGame.action = this.inGame.action.concat(this.content[key].action);
			this.inGame.truth = this.inGame.truth.concat(this.content[key].truth);

		});
		this.filter();
	}
	merge() {
		// merge
		this.iterate(App.data.rubrics, (rubric, type) => {
			this.content[rubric][type].forEach((question, i) => {
				let questionToAdd = _.getByKeyValue(this.inGame[type], 'text', question.text);
				if (!questionToAdd) {
					this.inGame[type].push(question);
				}
			});
		});
		// unmerge
		this.iterate(this.content, (rubric, type) => {
			this.inGame[type].forEach((question, i) => {
				if (!App.data.rubrics.includes(question.rubric)) {
					this.inGame[type].splice(i, 1);
				}
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
		this.CONTENT_ACTIONS.forEach(type => {
			this.inGame[type].forEach(question => {
				if (!question.type) {
					question.filtered = false;
					return;
				}
				question.filtered = Object.keys(this.excludes).some(filterName => {
					return question.type.includes(filterName) && !this.excludes[filterName];
				});
			});
		});
	}
	iterate(arr, callback) {
		let target = Array.isArray(arr) ? arr : Object.keys(arr);
		target.forEach(key => {
			this.CONTENT_ACTIONS.forEach(type => {
				callback(key, type);
			});
		});
	}
	parse() {

	}
	get(type) {
		// Get truth or action.
		let questions = this.inGame[type].filter(question => { return !question.disabled; }),
			question = questions[_.getRandomInt(0, questions.length - 1)];
		if (!App.data.settings.repeatContent) {
			question.disabled = true;
			if (questions.length === 1) {
				this.inGame[type].forEach(question => {
					question.disabled = false;
				});
			}
		}
		this.parse(question);
		return question;
	}

}
