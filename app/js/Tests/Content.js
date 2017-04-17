var Content_Test = {
	set: (data) => {
		App.manager.Content.set(data);
		return App.manager.Content.inGame.truth.length === 6 && App.manager.Content.inGame.action.length === 5;
	}
}
