var CarFreeDay = CarFreeDay || {};
var lives = 20, lastScore = 0;
var record = localStorage.getItem("record");
if(record == null){
	record = 0;
	localStorage.setItem("record", 0);
}
console.log(record);
var fromGameover, bgmPlaying = false;

document.addEventListener("deviceready", function(){
	setTimeOut(function(){
		navigator.splashscreen.hide();
	}, 5000, false);
});
(function(){
	CarFreeDay.game = new Phaser.Game(720, 1280, Phaser.AUTO, '', null, false, false);

	CarFreeDay.game.state.add('Boot', CarFreeDay.Boot);
	CarFreeDay.game.state.add('Preload', CarFreeDay.Preload);

	CarFreeDay.game.state.add('Title', CarFreeDay.Title);
	CarFreeDay.game.state.add('Game', CarFreeDay.Game);
	//CarFreeDay.game.state.add('Score', CarFreeDay.Score);

	CarFreeDay.game.state.start('Boot');
})();