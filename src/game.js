var CarFreeDay = CarFreeDay || {};

CarFreeDay.Game = function(){};
CarFreeDay.Game.prototype = {
    preload: function(){
        this.game.time.advancedTiming = true;
    },
    // Create
    create: function(){
        extraLive = false;
        interstitialShown = false;
        //rewardedVideoShown = false;
        this.activationDelay = 0;
        this.lives = lives;
        this.score = 0;
        this.spawnInterval = 1500;
        this.spawnDuration = 1000;
        //this.spawnIntervalStep = 725;
        //this.spawnDurationStep = 320;

        this.boardExtension = 100;
        this.boardLength = this.game.world.width+(2*this.boardExtension);
        this.boardGap = this.boardLength/4;
        this.boardOX = -this.boardExtension;
        this.boardOY = (this.game.world.height-this.boardLength)/2;

        this.background = this.game.add.tileSprite(0,0,720,1280,'bg');
        this.background.scale.setTo(6);
        //this.shadow = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'shadow');
        //this.shadow.anchor.setTo(0.5,0.5);
        //this.shadow.scale.setTo(5.5);
        this.top = this.game.add.sprite(this.game.world.centerX,48,'ui_top');
        this.top.anchor.setTo(0.5);

        //var scoreStyle = { font: "40px papercuts", fill: "#ffffff", align: "left", strokeThickness: 5 };
        //var numberStyle = { font: "40px papercuts", fill: "#ffffff", align: "left", strokeThickness: 5 };
        this.scoreText = this.game.add.bitmapText(10,-5,'papercuts',"Score: ",40);
        this.recordText = this.game.add.bitmapText(10,30,'papercuts',"Record: ",40);
        this.scoreNumber = this.game.add.bitmapText(150,-5,'papercuts',lastScore,40);
        this.recordNumber = this.game.add.bitmapText(150,30,'papercuts',""+record+"",40);

        //var liveStyle = { font: "50px papercuts", fill: "#ffffff", align: "right", strokeThickness: 10 };
        this.liveIcon = this.game.add.sprite(this.game.world.width-320,15,'live');
        this.liveNumber = this.game.add.bitmapText(this.game.world.width-270,15,'papercuts',"x"+this.lives,50);

        this.clickSound = this.game.add.audio('hit');
        this.correctSound = this.game.add.audio('correct');
        this.wrongSound = this.game.add.audio('wrong');
        this.emptySound = this.game.add.audio('empty');

        // Creates rice cookersz
        this.moles = this.game.add.group();
        this.moles.enableBody = true;
        var i, mole;
        for (i = 0; i < 9; i++) {
            posX = i%3;
            posY = Math.floor(i/3);
            mole = this.moles.create(this.boardOX+this.boardGap*(posX+1),this.boardOY+this.boardGap*(posY+1),'idle');
            mole.body.immovable = true;
            //mole.scale.setTo(0);
            mole.anchor.setTo(0.5,0.5);
            mole.active = false;
            mole.hit = false;
            mole.activeDuration = 0;
            mole.inputEnabled = true;
            mole.type = '';
            mole.events.onInputDown.add(function(sprite){
                this.clickSound.play();
                if(sprite.type != '' && !sprite.hit){
                    //console.log('hit!');
                    sprite.hit = true;
                    switch(sprite.type){
                        case 'coffee':
                            this.score += 50;
                            sprite.loadTexture('coffee_hit');
                            this.correctSound.play();
                            break;
                        case 'head':
                            this.lives -= 3;
                            sprite.loadTexture('head_hit');
                            this.wrongSound.play();
                            break;
                        default:
                            this.lives -= 1;
                            this.emptySound.play();
                            break;
                    }
                    sprite.activeDuration = 2*this.spawnDuration/3;
                }
            },this);
        }

        // Create mute button
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

        this.loadWalls();
    },

    // Update
    update: function(){
        this.liveNumber.text = "x"+this.lives;
        this.scoreNumber.text = this.score;
        var pbr;
        pbr = this.score/40;
        bgm._sound.playbackRate.value = (pbr+100)/100;

        if(this.score >= 4300){
            this.spawnInterval = 100;
            this.spawnDuration = 600;
        } else if(this.score >= 2300){
            this.spawnInterval = (4750-this.score)/5;
            this.spawnDuration = 600;
        } else if(this.score >= 1550){
            this.spawnInterval = (5250-this.score)/6;
            this.spawnDuration = (6750-this.score)/7;
        } else if(this.score >= 1000){
            this.spawnInterval = (4000-this.score)/4;
            this.spawnDuration = (4300-this.score)/4;
        } else if(this.score >= 950){
            this.spawnInterval = 775;
            this.spawnDuration = 850;
        } else if(this.score >= 650){
            this.spawnInterval = (2500-this.score)/2;
            this.spawnDuration = (2600-this.score)/2;
        } else if(this.score >= 550){
            this.spawnInterval = (2500-this.score)/2;
            this.spawnDuration = 1000;
        } else if(this.score >= 300){
            this.spawnInterval = (1000-this.score)*2;
            this.spawnDuration = 1000;
        }

        this.activationDelay += this.game.time.elapsed;
        if(this.activationDelay >= this.spawnInterval){
            var searching = true, mole, seed;
            while(searching){
                mole = this.moles.getRandom();
                if(!mole.active){
                    mole.active = true;
                    seed = this.game.rnd.integerInRange(1,100);
                    //console.log(seed);
                    
                    if(this.score > 4250){
                        if(seed < 30){
                            mole.type = 'coffee';
                            mole.loadTexture('coffee');
                        } else if(seed > 65){
                            mole.type = 'empty';
                            mole.loadTexture('open');
                        } else {
                            mole.type = 'head';
                            mole.loadTexture('head');
                        }
                    } else if(this.score > 2250){
                        var coffeeSum = (7250-this.score)/100;
                        if(seed < coffeeSum){
                            mole.type = 'coffee';
                            mole.loadTexture('coffee');
                        } else if(seed > 100-(coffeeSum/2)){
                            mole.type = 'empty';
                            mole.loadTexture('open');
                        } else {
                            mole.type = 'head';
                            mole.loadTexture('head');
                        }
                    // Third phase, 60 | 30 | 10
                    } else if(this.score > 100){
                        if(seed > 50){
                            mole.type = 'coffee';
                            mole.loadTexture('coffee');
                        } else if(seed > 25){
                            mole.type = 'empty';
                            mole.loadTexture('open');
                        } else {
                            mole.type = 'head';
                            mole.loadTexture('head');
                        }
                    // Second phase, 80 | 20 | 0
                    } else if(this.score >= 0){
                        if(seed > 25){
                            mole.type = 'coffee';
                            mole.loadTexture('coffee');
                        } else {
                            mole.type = 'empty';
                            mole.loadTexture('open');
                        }
                    // First phase, 100 | 0 | 0
                    } else {
                        mole.type = 'coffee';
                        mole.loadTexture('coffee');
                    }
                    searching = false;
                }
            }
            this.activationDelay = 0;
        }
        
        this.moles.forEach(function(mole){
            if(mole.active){
                //console.log('durray: ',mole.x,mole.y);
                mole.activeDuration += this.game.time.elapsed;
                if(mole.activeDuration >= this.spawnDuration){
                    if(!mole.hit && mole.type == 'coffee'){
                        this.lives -= 2;
                    }
                    mole.active = false;
                    mole.hit = false;
                    mole.type = '';
                    mole.loadTexture('idle');
                    mole.activeDuration = 0;
                }
            }
        }, this);

        if(this.lives < 1){
            // Gameover
            this.lwClose.start();
            this.rwClose.start();
            fromGameover = true;
            lastScore = this.score;
            this.lives = 0;
        }
    },

    loadWalls: function(){
        this.leftWall = this.game.add.sprite(0, this.game.world.centerY, 'wall_l');
        this.leftWall.anchor.setTo(0.5);
        //this.leftWall.x = this.game.world.centerX-(this.leftWall.width/2);
        this.leftWall.x = 0 - (this.leftWall.width/2);
        this.lwOpen = this.game.add.tween(this.leftWall).to({x:0-(this.leftWall.width/2)},2500,Phaser.Easing.Bounce.Out);
        this.lwClose = this.game.add.tween(this.leftWall).to({x:this.game.world.centerX-(this.leftWall.width/2)},2500,Phaser.Easing.Bounce.Out);
        this.rightWall = this.game.add.sprite(0, this.game.world.centerY, 'wall_r');
        this.rightWall.anchor.setTo(0.5);
        //this.rightWall.x = this.game.world.centerX+(this.rightWall.width/2);
        this.rightWall.x = this.game.world.width + (this.rightWall.width/2);
        this.rwOpen = this.game.add.tween(this.rightWall).to({x:this.game.world.width+(this.rightWall.width/2)},2500,Phaser.Easing.Bounce.Out);
        this.rwClose = this.game.add.tween(this.rightWall).to({x:this.game.world.centerX+(this.rightWall.width/2)},2500,Phaser.Easing.Bounce.Out);

        //this.lwClose.onComplete.addOnce(function(){
            this.rwClose.onComplete.addOnce(function(){
                interstitial.load();
                //rewardedVideo.load();
                //rewardedVideoReady = rewardedVideo.isReady();
                this.game.state.start('Title');
            }, this);
        //}, this);
    },

    // FPS Counter
    render: function(){
        //this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
        //this.game.debug.pointer(this.game.input.activePointer);
    }
};