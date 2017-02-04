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
		this.pickRate = props.pickRate || 0;
		this.score = props.score || 0;
		if (props.streak) {
			this.streak = {
				action: props.streak.action,
				truth: props.streak.truth
			};
		} else {
			this.streak = {
				action: 0,
				truth: 0
			};
		}
	}
}