
class Overlay {

	constructor() {
		this.enum = 
		this.self = document.querySelector('[data-overlay]');
		this.states = ['hidden', 'active'];
		this.listener = null;
		this.transition = 500;
	}

	show(callback = null, onCloseCallback = null) {
		let Overlay = this;
		this.self.classList.remove(this.states[0]);
		this.self.classList.add(this.states[1]);
		if (isFunc(onCloseCallback)) {
			this.self.addEventListener('mousedown', (event) => {
				Overlay.close(null, onCloseCallback);
				Overlay.listener = onCloseCallback;
				Overlay.listener();
			});
		}
		let timeout = setTimeout( () => {
			if (isFunc(callback)) {
				callback();
			}
		}, this.transition);
	}

	close(callback = null, onCloseCallback = null) {
		this.self.classList.remove(this.states[1]);
		if (isFunc(this.listener)) {
			this.self.removeEventListener('mousedown', onCloseCallback, false);
			this.listener = null;
		}
		let timeout = setTimeout( () => {
			this.self.classList.add(this.states[0]);
			if (isFunc(callback)) {
				callback();
			}
		}, this.transition);
	}
}