class Preloader {
	constructor() {
		this.attr = {
			preloader: 'data-preloader'
		};
		this.nodes = {
			preloader: document.querySelector(`[${this.attr.preloader}]`)
		};
		this.classes = ['opacity', 'hidden'];
		this.STATES = Object.freeze({
			LOADED: 'LOADED',
			PRELOADING: 'PRELOADING'
		});
		this.state = this.STATES.LOADED;
		this.transition = 300;
	}
	show() {
		this.nodes.preloader.classList.remove(this.classes[0]);
		this.nodes.preloader.classList.remove(this.classes[1]);
		this.state = this.STATES.PRELOADING;
	}
	hide() {
		this.nodes.preloader.classList.add(this.classes[0]);
		setTimeout(() => {
			this.nodes.preloader.classList.add(this.classes[1]);
		}, this.transition);
		this.state = this.STATES.LOADED;
	}
	getState() {
		return this.state;
	}
}
