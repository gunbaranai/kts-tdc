var CarFreeDay = CarFreeDay || {};
var lives = 20, lastScore = 0;
var record = localStorage.getItem("record");
if(record == null){
	record = 0;
	localStorage.setItem("record", 0);
}
console.log(record);
var fromGameover, bgmPlaying = false;
var canvasWidth = window.innerWidth * window.devicePixelRatio;
var canvasHeight = window.innerHeight * window.devicePixelRatio;
var aspectRatio = canvasWidth / canvasHeight;
var scaleRatio = 1;
if(aspectRatio > 1){
	scaleRatio = canvasHeight / 1280;
} else {
	scaleRatio = canvasWidth / 720;
}

CarFreeDay.game = new Phaser.Game(720, 1280, Phaser.AUTO, '', null, false, false);

CarFreeDay.game.state.add('Boot', CarFreeDay.Boot);
CarFreeDay.game.state.add('Preload', CarFreeDay.Preload);

CarFreeDay.game.state.add('Title', CarFreeDay.Title);
CarFreeDay.game.state.add('Game', CarFreeDay.Game);
//CarFreeDay.game.state.add('Score', CarFreeDay.Score);

CarFreeDay.game.state.start('Boot');