
class Overlay {

	constructor() {
		this.self = document.querySelector('[data-overlay]');
		this.states = ['hidden', 'active'];
		this.listener = null;
		this.transition = 500;
	}

	show(callback = null, onCloseCallback = null) {
		let Overlay = this;
		this.self.classList.remove(this.states[0]);
		this.self.classList.add(this.states[1]);
		if (onCloseCallback !== null  && typeof onCloseCallback === 'function') {
			this.self.addEventListener('mousedown', (event) => {
				Overlay.close(null, onCloseCallback);
				Overlay.listener = onCloseCallback;
				Overlay.listener();
			});
		}
		let timeout = setTimeout( () => {
			if (callback && typeof callback === 'function') {
				callback();
			}
		}, this.transition);
	}

	close(callback = null, onCloseCallback = null) {
		this.self.classList.remove(this.states[1]);
		if (this.listener !== null && typeof this.listener === 'function') {
			this.self.removeEventListener('mousedown', onCloseCallback, false);
			this.listener = null;
		}
		let timeout = setTimeout( () => {
			overlay.self.classList.add(overlay.states[0]);
			if (callback && typeof callback === 'function') {
				callback();
			}
		}, this.transition);
	}
}