class RubricsModal extends Modal {
	constructor() {
		super('data-rubric-modal');
		this.selfAttributes = {
			rubrics: 'name="rubrics"',
			name: 'name'
		}
		this.nameValue = 'rubrics';
		this.attr = Object.assign(this.attr, this.selfAttributes);
	}
	save() {

	}
	change() {
		App.data.rubrics = [];
		$$(`[${this.attr.rubrics}]:checked`).array().forEach((checked) => {
			App.data.rubrics.push(checked.value);
		});
		this.updateView();
	}
	beforeNext() {
		this.save();
	}
	render() {
		this.getView().outerHTML = App.manager.Render.modalRubrics();
	}
	updateView() {
		this.getView().querySelector('footer').outerHTML = App.manager.Render.rubrics_footer();
	}
	__events() {
		document.addEventListener('change', (e) => {
			if (e.target.getAttribute(this.attr.name) === this.nameValue) {
					this.change();
			}
		});
	}
}
