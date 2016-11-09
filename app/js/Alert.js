function Alert(type, message, time = null, constant = false) {

	if (!type || !message) throw new Error('Define type and message');

	var nodes = {
			self: null,
			message: null
		},
		timeout;


	function close() {

	}

	function show() {

	}

	nodes.listener('mousein' , () => {

	});
}


// class Message {
// 	constructor() {
// 		this.canShowTimeout = 1000;
// 		this.showTimeout = 2000;
// 		this.canShow = true;
// 		this.transition = 300;
// 		this.nodes = {
// 			self: document.querySelector('[data-message]'),
// 			message: document.querySelector('[data-message-content]')
// 		};
// 		this.visible = 'visible';
// 		this.closeTimeout = null;
// 		this.mousein = false;
// 		this._events();
// 	}
// 	_events() {
// 		this.nodes.self.addEventListener('mouseenter', (e) => {
// 			clearTimeout(this.closeTimeout);
// 			this.mousein = true;
// 			this.closeTimeout = null;
// 		}, true);
// 		this.nodes.self.addEventListener('mouseleave', (e) => {
// 			this.mousein = false;
// 			this.closeTimeout = setTimeout(() => {
// 				this.mousein !== true ?
// 					this.close(this.type) :
// 					void(0);
// 			}, this.showTimeout);
// 		}, true);
// 		this.nodes.self.addEventListener('click', (e) => {
// 			this.close(this.type, true);
// 		});
// 	}
// 	show(type = null, message = null, timeout = null, additionalTime = 0) {
// 		if (this.canShow !== true) return;
// 		if (type === null || message === null) throw new Error('type or message is not defined');
// 		this.canShow = false;
// 		this.nodes.self.classList.add(type);
// 		this.nodes.self.classList.add(this.visible);
// 		this.nodes.message.innerHTML = message;
// 		let parsed = App.parser.parseFromString(message, 'text/html').querySelector('body').textContent;
// 		this.showTimeout = (parsed.length * .06) * 1000;
// 		this.type = type;
// 		this.timeout = timeout;
// 		this.additionalTime = additionalTime;
// 		// prevent blinking
// 		setTimeout(() => {
// 			this.canShow = true;
// 		}, timeout !== null ? timeout + this.showTimeout + this.additionalTime : this.canShowTimeout + this.showTimeout + this.additionalTime);
// 		// close warning
// 		this.closeTimeout = setTimeout(() => {
// 			this.close(this.type);
// 		}, this.showTimeout + additionalTime);
// 	}
// 	close(type, force = false) {
// 		if (this.timeout === false && force !== true) return;
// 		this.nodes.self.classList.remove(this.visible);
// 		this.showTimeout = null;
// 		this.additionalTime = 0;
// 		setTimeout(() => {
// 			this.nodes.self.classList.remove(this.type);
// 		}, this.transition)
// 	}
// }