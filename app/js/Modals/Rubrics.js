class RubricsModal extends Modal {
	constructor() {
		super('data-rubric-modal');
	}
	save() {
		
	}
	change() {
		App.data.rubrics = [];
		$$(`[name="rubrics"]:checked`).array().forEach((checked) => {
			App.data.rubrics.push(checked.value);
		});
		this.render();
	}
	beforeNext() {
		this.save();
	}
	render() {
		this.getView().outerHTML = App.manager.Render.modalRubrics();
	}
	__events() {
		document.addEventListener('mouseup', (e) => {
			if (e.target.previousSibling && e.target.previousSibling.closest('[name="rubrics"]')) {
				this.change();
			}
		});
	}
}