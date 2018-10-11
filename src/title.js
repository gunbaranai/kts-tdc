var CarFreeDay = CarFreeDay || {};

CarFreeDay.Title = function(){};
CarFreeDay.Title.prototype = {
    // Create title objects (background, buttons, etc)
    create: function(){
        this.stars = 0;
        this.loadBackround();
        this.loadUI();
        this.loadGameOver();
        //this.loadAdPrompt();
        this.loadTutorial();
        this.loadStars();
        this.loadSocial();
        this.loadMuteButton();
        this.loadWalls();

        this.wallsOpened = false;

        // Load audio
        if(!bgmPlaying){
            bgm = this.game.add.audio('bgm');
            bgm.play('',0,0.5,true);
            bgmPlaying = true;
        } else {
            bgm._sound.playbackRate.value = 1;
        }
        this.clickSound = this.game.add.audio('hit');
    },

    // Update
    update: function(){
        // Text blinker
        if(!fromGameover && !this.tutorialStuffs.visible){
            //this.wallsOpened = true;
            this.title.visible = true;
            this.adBack.visible = false;
            //this.adStuffs.visible = false;
            this.closeGameover.visible = false;
            this.replay.visible = false;
            this.share.visible = false;
            this.allStars.visible = false;
            this.centralScoreText.visible = false;
            this.centralScoreNumber.visible = false;
            this.centralScoreSprite.visible = false;
            this.centralScoreRecord.visible = false;

            this.blinkTimer += this.game.time.elapsed;
            if( this.blinkTimer >= 600 ){
                this.blinkTimer = 0;
                this.play.visible = !this.play.visible;
            }

            // Tapping anywhere not button
            if(this.game.input.activePointer.worldY >= 450 && this.game.input.activePointer.worldY <= 1100){
                if(this.game.input.activePointer.justPressed()){
                    this.playButton();
                }
            }
        } else if(fromGameover && !this.tutorialStuffs.visible){
            //this.wallsOpened = false;
            if(!this.wallsOpened){
                this.leftWall.x = this.game.world.centerX-(this.leftWall.width/2);
                this.rightWall.x = this.game.world.centerX+(this.rightWall.width/2);
            }
            this.title.visible = false;
            this.adBack.visible = true;
            //this.adStuffs.visible = true;
            //this.adWatchButton.visible = true;
            
            this.allStars.visible = true;
            this.centralScoreText.visible = true;
            this.centralScoreNumber.visible = true;
            this.centralScoreSprite.visible = true;
            this.centralScoreRecord.visible = true;

            if(!interstitialShown){
                if(interstitialReady){
                    interstitial.show();
                    interstitialReady = false;
                    interstitialFailed = false;
                    interstitialShown = true;
                } else if(interstitialFailed){
                    interstitialReady = false;
                    interstitialFailed = false;
                    interstitialShown = true;
                }
            } //else {
                
            //}

            //rewardedVideoReady = rewardedVideo.isReady();
            if(interstitialShown && !this.wallsOpened){
                this.lwOpen.start();
                this.rwOpen.start();
                this.closeGameover.visible = true;
                this.replay.visible = true;
                this.share.visible = true;
                if(this.lwOpen.onComplete && this.rwOpen.onComplete){
                    this.leftWall.x = 0-(this.leftWall.width/2);
                    this.rightWall.x = this.game.world.width+(this.rightWall.width/2);
                    this.wallsOpened = true;
                    //rewardedVideo.show();
                }
                //interstitialClosed = false;
            }// else if(rewardedVideoShown){
                //this.centralScoreSprite.visible = true;
                //this.closeGameover.visible = true;
                //this.adStuffs.visible = false;
                //rewardedVideoClosed = false;
            //}
        } else {
            this.play.visible = false;
            this.replay.visible = false;
            this.share.visible = false;
            this.allStars.visible = false;
            this.closeGameover.visible = false;
            //this.adWatchButton.visible = false;
        }

        if(this.tutorialCoffee.visible && this.tutorialOpen.visible && this.tutorialHead.visible){
            this.animationTimer += this.game.time.elapsed;
            if(this.animationTimer >= 1000){
                this.tutorialCoffee.loadTexture('coffee_hit');
                this.tutorialOpen.loadTexture('idle');
                this.tutorialHead.loadTexture('head_hit');
                this.animationTimer = 0;
            } else if(this.animationTimer >= 500){
                this.tutorialCoffee.loadTexture('coffee');
                this.tutorialOpen.loadTexture('open');
                this.tutorialHead.loadTexture('head');
            }
        }

        if(this.newRecord){
            this.blinkTimer += this.game.time.elapsed;
            if( this.blinkTimer >= 1000 ){
                this.blinkTimer = 0;
                this.centralScoreRecord.visible = !this.centralScoreRecord.visible;
            }
        }
    },

    loadBackround: function(){
        this.background = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'title_bg');
        this.background.anchor.setTo(0.5);
        this.background.animations.add('loop');
        this.background.animations.play('loop',5,true);
        this.title = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY-370,'title_title');
        this.title.anchor.setTo(0.5);
    },

    loadUI: function(){
        // Top UI (Score, Record, Lives)
        this.top = this.game.add.sprite(this.game.world.centerX,48,'ui_top');
        this.top.anchor.setTo(0.5);
        this.scoreText = this.game.add.bitmapText(10,-5,'papercuts',"Score: ",40);
        this.recordText = this.game.add.bitmapText(10,30,'papercuts',"Record: ",40);
        this.scoreNumber = this.game.add.bitmapText(150,-5,'papercuts',""+lastScore+"",40);
        this.recordNumber = this.game.add.bitmapText(150,30,'papercuts',""+record+"",40);

        var liveStyle = { font: "50px papercuts", fill: "#ffffff", align: "right", strokeThickness: 10 };
        this.liveIcon = this.game.add.sprite(this.game.world.width-320,15,'live');
        this.liveNumber = this.game.add.bitmapText(this.game.world.width-270,15,'papercuts',"x"+lives,50);

        // Stuffs only appear on the real title screen
        var playText = "TAP TO PLAY";
        this.play = this.game.add.bitmapText(this.game.world.centerX,this.game.world.centerY-150,'papercuts',playText,50);
        this.play.anchor.setTo(0.5);
        this.blinkTimer = 0;
    },

    loadGameOver: function(){
        // Stuffs only appear on 'score'/fake title screen
        this.applauseSound = this.game.add.audio('applause');

        this.adBack = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'ui_gameover');
        this.adBack.anchor.setTo(0.5);

        this.centralScoreNumber = this.game.add.bitmapText(
            this.game.world.centerX,this.game.world.centerY-225,'papercuts',""+lastScore+"",75
        );
        this.centralScoreNumber.anchor.setTo(0.5);

        this.centralScoreText = this.game.add.bitmapText(
            this.game.world.centerX,this.game.world.centerY-115,'papercuts',"",90
        );
        this.centralScoreText.anchor.setTo(0.5);

        this.centralScoreRecord = this.game.add.bitmapText(
            this.game.world.centerX,this.game.world.centerY-285,'papercuts',"",35
        );
        this.centralScoreRecord.anchor.setTo(0.5);

        this.centralScoreSprite = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+100,'p_fail');
        this.centralScoreSprite.anchor.setTo(0.5);

        if(lastScore > 4500){
            this.stars = 7;
            this.centralScoreSprite.loadTexture('p_grandioso');
            this.centralScoreText.text = "Grandioso!";
            this.applauseSound.play();
        } else if(lastScore < 400){
            this.stars = 1;
            this.centralScoreText.text = "Fail!";
            if(lastScore == 0){
                this.centralScoreNumber.text = "0";
            }
        } else if(lastScore < 900){
            this.stars = 2;
            this.centralScoreSprite.loadTexture('p_bad');
            this.centralScoreText.text = "Bad!";
        } else if(lastScore < 1500){
            this.stars = 3;
            this.centralScoreSprite.loadTexture('p_good');
            this.centralScoreText.text = "Mediocre!";
        } else if(lastScore <= 2200){
            this.stars = 4;
            this.centralScoreSprite.loadTexture('p_nice');
            this.centralScoreText.text = "Nice!";
        } else if(lastScore <= 3300){
            this.stars = 5;
            this.centralScoreSprite.loadTexture('p_magnifico');
            this.centralScoreText.text = "Magnifico!";
        } else if(lastScore <= 4500){
            this.stars = 6;
            this.centralScoreSprite.loadTexture('p_sfarzoso');
            this.centralScoreText.text = "Sfarzoso!";
        }
        if(lastScore > record){
            record = lastScore;
            localStorage.setItem("record", lastScore);
            this.centralScoreRecord.text = "New Record!";
            this.newRecord = true;
            this.recordNumber.text = record;
            this.applauseSound.play();
        }

        this.replay = this.game.add.button(
            this.game.world.centerX-120,this.game.world.centerY+420,'ui_replay',this.replayButton,this
        );
        this.replay.anchor.setTo(0.5);

        this.share = this.game.add.button(
            this.game.world.centerX+120,this.game.world.centerY+420,'ui_share',this.shareButton,this
        );
        this.share.anchor.setTo(0.5);

        this.closeGameover = this.game.add.button(
            this.game.world.centerX+250,this.game.world.centerY-300,'ui_close',this.closeGameoverButton,this
        );
        this.closeGameover.anchor.setTo(0.5);
    },

    loadAdPrompt: function(){
        this.adTitle = this.game.add.bitmapText(
            this.game.world.centerX,this.game.world.centerY-25,'papercuts',"Belum Magnifico!",45
        );
        this.adTitle.anchor.setTo(0.5);

        this.adLiveSprite = this.game.add.sprite(this.game.world.centerX+155,this.game.world.centerY+35,'live');
        this.adLiveSprite.anchor.setTo(0.5);
        this.adLiveSprite.scale.setTo(0.5);

        this.adText = this.game.add.bitmapText(
            this.game.world.centerX,this.game.world.centerY+90,'papercuts',
            "Kamu bisa mendapatkan  x10\nsaat replay dengan melihat\niklan interaktif di bawah ini.",
            35
        );
        this.adText.anchor.setTo(0.5);
        this.adText.align = 'center';

        this.adWatchButton = this.game.add.button(
            this.game.world.centerX,this.game.world.centerY+242,'ui_ad',function(){
                //rewardedVideo.show();
                //rewardedVideoReady = false;
                //rewardedVideoShown = true;
            }, this
        );
        this.adWatchButton.anchor.setTo(0.5);

        this.adStuffs = this.game.add.group();
        this.adStuffs.add(this.adTitle);
        this.adStuffs.add(this.adLiveSprite);
        this.adStuffs.add(this.adText);
        this.adStuffs.add(this.adWatchButton);
        this.adStuffs.visible = false;
    },

    loadTutorial: function(){
        // Tutorial stuffs
        this.tutorialStuffs = this.game.add.group();

        this.tutorialBack = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'ui_tutorial');
        this.tutorialBack.anchor.setTo(0.5);
        this.closeTutorialButton = this.game.add.button(
            this.game.world.centerX+300,this.game.world.centerY-470,'ui_close',this.closeTutorial,this
        );
        this.closeTutorialButton.anchor.setTo(0.5);

        this.tutorialTitle = this.game.add.bitmapText(
            this.game.world.centerX-120,this.game.world.centerY-420,'papercuts',"Cara Main:",75
        );
        this.tutorialTitle.anchor.setTo(0.5);
        this.tutorialMain = this.game.add.bitmapText(
            this.game.world.centerX,this.game.world.centerY-240,'papercuts',
            "Tumbuk biji kopi dengan\nmengetuk biji kopi yang terlihat.\n"+
            "Mengetuk hal lain selain biji kopi\nbisa memberikan pinalti.",
            45
        );
        this.tutorialMain.anchor.setTo(0.5);
        this.tutorialMain.align = 'center';

        this.tutorialCoffee = this.game.add.sprite(this.game.world.centerX-100,this.game.world.centerY-11,'coffee');
        this.tutorialCoffee.anchor.setTo(0.5);
        this.tutorialSideCoffee = this.game.add.bitmapText(
            this.game.world.centerX+100,this.game.world.centerY-11,'papercuts',"Ketuk",60
        );
        this.tutorialSideCoffee.anchor.setTo(0.5);

        this.tutorialOpen = this.game.add.sprite(this.game.world.centerX-100,this.game.world.centerY+183,'open');
        this.tutorialOpen.anchor.setTo(0.5);
        this.tutorialSideOpen = this.game.add.bitmapText(
            this.game.world.centerX+100,this.game.world.centerY+183,'papercuts',"Jangan",60
        );
        this.tutorialSideOpen.anchor.setTo(0.5);

        this.tutorialHead = this.game.add.sprite(this.game.world.centerX-100,this.game.world.centerY+376,'head');
        this.tutorialHead.anchor.setTo(0.5);
        this.tutorialSideHead = this.game.add.bitmapText(
            this.game.world.centerX+100,this.game.world.centerY+376,'papercuts',"Jangan",60
        );
        this.tutorialSideHead.anchor.setTo(0.5);

        this.animationTimer = 0;

        this.tutorialStuffs.add(this.tutorialBack);
        this.tutorialStuffs.add(this.closeTutorialButton);
        this.tutorialStuffs.add(this.tutorialTitle);
        this.tutorialStuffs.add(this.tutorialMain);
        this.tutorialStuffs.add(this.tutorialSideCoffee);
        this.tutorialStuffs.add(this.tutorialSideOpen);
        this.tutorialStuffs.add(this.tutorialSideHead);
        this.tutorialStuffs.visible = false;
        this.tutorialCoffee.visible = false;
        this.tutorialOpen.visible = false;
        this.tutorialHead.visible = false;
    },

    loadSocial: function(){
        // Bottom buttons (fb, twitter, tutorial/help/credits)
        this.facebook = this.game.add.button(70,this.game.world.height-70,'ui_f',this.facebookButton,this);
        this.facebook.anchor.setTo(0.5);
        this.twitter = this.game.add.button(180,this.game.world.height-70,'ui_t',this.twitterButton,this);
        this.twitter.anchor.setTo(0.5);
        this.help = this.game.add.button(
            this.game.world.width-70,this.game.world.height-70,'ui_help',this.openTutorial,this
        );
        this.help.anchor.setTo(0.5);
    },

    loadMuteButton: function(){
        // Mute button
        if(!this.game.sound.mute){
            sndSpr = 'ui_soundon';
        } else {
            sndSpr = 'ui_soundoff';
        }
        this.soundToggle = this.game.add.sprite(this.game.world.width-70,54,sndSpr);
        this.soundToggle.anchor.setTo(0.5);
        this.soundToggle.inputEnabled = true;
        this.soundToggle.events.onInputDown.add(function(sprite){
            if(!this.game.sound.mute){
                this.soundToggle.loadTexture('ui_soundoff');
                this.game.sound.mute = true;
            } else {
                this.soundToggle.loadTexture('ui_soundon');
                this.game.sound.mute = false;
            }
        },this);
    },

    loadStars: function(){
        var starTemp = this.game.cache.getImage('star');
        var startX = this.game.world.centerX-((this.stars-1)*(starTemp.width/10));
        var star, i, d;
        this.allStars = this.game.add.group();
        for (i = 0; i < this.stars; i++) {
            star = this.allStars.create(startX+i*starTemp.width/5, this.game.world.centerY-350, 'star', 2);
            star.anchor.setTo(0.5);
            star.jump = this.game.add.tween(star)
                .to({y:this.game.world.centerY-350-starTemp.height/2},500,Phaser.Easing.Exponential.Out,false)
                .to({y:this.game.world.centerY-350},500,Phaser.Easing.Exponential.In,false)
                .repeatAll(-1)
                .start();
            if(this.stars >= 5){
                star.animations.add('starLoop');
                star.animations.play('starLoop',5,true);
            }
        }
    },

    loadWalls: function(){
        this.leftWall = this.game.add.sprite(0, this.game.world.centerY, 'wall_l');
        this.leftWall.anchor.setTo(0.5);
        this.leftWall.x = 0 - (this.leftWall.width/2);
        this.lwOpen = this.game.add.tween(this.leftWall)
            .to({x:0-(this.leftWall.width/2)},
            2500,
            Phaser.Easing.Bounce.Out
        );
        this.lwClose = this.game.add.tween(this.leftWall)
            .to({x:this.game.world.centerX-(this.leftWall.width/2)},
            2500,
            Phaser.Easing.Bounce.Out
        );
        this.rightWall = this.game.add.sprite(0, this.game.world.centerY, 'wall_r');
        this.rightWall.anchor.setTo(0.5);
        this.rightWall.x = this.game.world.width + (this.rightWall.width/2);
        this.rwOpen = this.game.add.tween(this.rightWall)
            .to({x:this.game.world.width+(this.rightWall.width/2)},
            2500,
            Phaser.Easing.Bounce.Out
        );
        this.rwClose = this.game.add.tween(this.rightWall)
            .to({x:this.game.world.centerX+(this.rightWall.width/2)},
            2500,
            Phaser.Easing.Bounce.Out
        );
    },

    // Tutorial button and picture
    // Button turns background dark, then show picture
    openTutorial: function(){
        this.animationTimer = 0;
        this.tutorialStuffs.visible = true;
        this.tutorialCoffee.visible = true;
        this.tutorialOpen.visible = true;
        this.tutorialHead.visible = true;
    },

    // When clicked/tapped, background turns dark no more, then erase picture
    closeTutorial: function(){
        this.animationTimer = 0;
        this.tutorialStuffs.visible = false;
        this.tutorialCoffee.visible = false;
        this.tutorialOpen.visible = false;
        this.tutorialHead.visible = false;
    },

    // Opens facebook link
    facebookButton: function(){
        this.clickSound.play();
        window.open("https://www.facebook.com/NgopiBiarMelek/", "_blank");
    },
    // Opens twitter link
    twitterButton: function(){
        this.clickSound.play();
        window.open("https://twitter.com/NgopiBiarMelek", "_blank");
    },
    
    // Game: *exists*
    playButton: function(){
        lastScore = 0;
        if(extraLive){
            lives = 30;
        } else {
            lives = 20;
        }
        this.newRecord = false;
        this.clickSound.play();
        this.game.state.start('Game');
    },

    // Replay
    replayButton: function(){
        lastScore = 0;
        if(extraLive){
            lives = 30;
        } else {
            lives = 20;
        }
        this.newRecord = false;
        this.clickSound.play();
        this.game.state.start('Game');
    },

    // Share
    shareButton: function(){
        this.clickSound.play();
        window.open(
            "https://twitter.com/intent/tweet?text=Numbuk+kopi+dalem+rice+cooker?+Gue+berhasil+numbuk+"
            +lastScore+
            "+biji+kopi.&via=NgopiBiarMelek&hashtags=NgopiDulu",
            "_blank"
        );
    },

    // Close gameover button
    closeGameoverButton: function(){
        fromGameover = false;
    }
};