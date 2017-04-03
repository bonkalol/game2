class Content {
	constructor() {
		this.content = null;
		this.inGame = {};
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
		this.assign();
		this.merge();
	}
	assign() {
		// Assign object
		Object.keys(this.content).forEach(key => {
			if (App.data.rubrics.includes(key)) {
				this.inGame[key] = this.content[key];
			}
		});
		this.merge();
		this.filters();
	}
	merge() {

	}
	filters() {
		let filters = {
			alco: App.data.settings.alco,
			hidden: App.data.settings.cards[this.CONTENT_TYPES.HIDDEN],
			all: App.data.settings.cards[this.CONTENT_TYPES.ALL],
			special: App.data.settings.cards[this.CONTENT_TYPES.SPECIAL]
		}
		Object.keys(this.inGame).forEach(key => {
			this.inGame[key].forEach((question, i) => {
				Object.keys(this.filters).forEach(filterType => {
					question.disabled = false;
					if (question.type && question.type.includes(filterType) && !filterType) {
						question.disabled = true;
					}
				});
			});
		});
	}
	get(type) {
		// Get truth or action.
	}
}
