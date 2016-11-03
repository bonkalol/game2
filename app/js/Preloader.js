class Preloader {
	constructor() {
		this.attr = {
			preloader: 'data-preloader'
		};
		this.nodes = {
			preloader: document.querySelector(`[${this.attr.preloader}]`)
		};
		this.classes = ['opacity', 'hidden'];
		this.transition = 300;
	}
	show() {
		this.nodes.preloader.classList.remove(this.classes[0]);
		this.nodes.preloader.classList.remove(this.classes[1]);
	}
	hide() {
		this.nodes.preloader.classList.add(this.classes[0]);
		setTimeout(() => {
			this.nodes.preloader.classList.add(this.classes[1]);
		}, this.transition);
	}
}