/*

	State
	0 - не активный игрок
	1 - активный игрок

	PickRate
	Как часто игра выбирала игрока как ассистента текущему игроку

*/

class Player {
	constructor(props) {
		this.name = props.name;
		this.gender = props.gender;
		this.state = props.state;
		this.pickRate = props.pickRate;
		this.score = props.score;
		this.views = props.views;
		this.streak = {
			action: props.streak.action,
			truth: props.streak.truth
		};
	}
	streak(type) {
	}

}