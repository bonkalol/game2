/*

	State
	0 - не активный игрок
	1 - активный игрок

	PickRate
	Как часто игра выбирала игрока как ассистента текущему игроку

*/

class Player {
	constructor(props) {
		this.props = {};
		if (props.id) {
			_.setProps(this, props);
		} else {
			this.initProps(props);
		}
	}
	initProps(props) {
		this.name = props.name;
		this.gender = props.gender;
		this.pickRate = 0;
		this.score = 0;
		this.queue = [];
		this.id = _.getRandom();
		this.streak = {
			action: 0,
			truth: 0
		}
	}
}
