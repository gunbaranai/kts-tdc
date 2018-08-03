var CarFreeDay = CarFreeDay || {};
var lives = 20;
var lastScore = 0;
var extraLive = false;
var record = localStorage.getItem("record");
if(record == null){
	record = 0;
	localStorage.setItem("record", 0);
}
console.log(record);
var fromGameover, bgmPlaying = false;
var interstitial, rewardedVideo;
var interstitialReady, interstitialClosed, interstitialShown,
	rewardedVideoReady, rewardedVideoClosed, rewardedVideoShown  = false;
	
function main(){
	if(!window.Cocoon || !Cocoon.Ad || !Cocoon.Ad.AdMob){
		alert('Cocoon AdMob plugin not installed');
		return;
	}

	Cocoon.Ad.AdMob.configure({
	    android: {
	        appId: "ca-app-pub-3537042140912764~9994705449",
	        //banner: "ca-app-pub-3537042140912764/3161402464",
	        interstitial: "ca-app-pub-3537042140912764/6604079175"
	        //interstitial: "ca-app-pub-3940256099942544/1033173712"
	        //rewardedVideo: "ca-app-pub-3940256099942544/5224354917"
	        //rewardedVideo: "ca-app-pub-3537042140912764/3000570617"
	    }
	});

	interstitial = Cocoon.Ad.AdMob.createInterstitial();
	interstitial.on("load", function(){
		interstitialReady = true;
	});
	interstitial.on("dismiss", function(){
		interstitialClosed = true;
	});

	//rewardedVideo = Cocoon.Ad.AdMob.createRewardedVideo();
	//rewardedVideo.on("load", function(){
	//	rewardedVideoReady = true;
	//});
	//rewardedVideo.on("dismiss", function(){
	//	rewardedVideoClosed = true;
	//});
	//rewardedVideo.on("reward", function(reward, error){
        //if (reward && reward.amount > 0){
            //extraLive = true;
        //}
    //});

	CarFreeDay.game = new Phaser.Game(720, 1280, Phaser.AUTO, '', null, false, false);

	CarFreeDay.game.state.add('Boot', CarFreeDay.Boot);
	CarFreeDay.game.state.add('Preload', CarFreeDay.Preload);

	CarFreeDay.game.state.add('Title', CarFreeDay.Title);
	CarFreeDay.game.state.add('Game', CarFreeDay.Game);

	CarFreeDay.game.state.start('Boot');
}

document.addEventListener("deviceready", main, false);
