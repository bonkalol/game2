class Render {

	constructor() {
		this.views = {
			modals: document.querySelector('[data-modals-view]')
		};
		this.templates = {
			players: document.querySelector('#modal_players')
		};
	}

	render(template, object) {
		let view = template.innerHTML;
			view = doT.template(view);
			view = view(object);
		return view;
	}

	renderStart() {
		let rendered = '',
			players = this.render(this.templates.players, game.props);

		rendered += players;
		this.views.modals.innerHTML = rendered;
	}

	renderContinue() {

	}

}

window.render = new Render();