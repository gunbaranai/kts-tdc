var CarFreeDay = CarFreeDay || {};

CarFreeDay.Preload = function(){};
CarFreeDay.Preload.prototype = {
    preload: function(){
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);
        this.splash.scale.setTo(scaleRatio);
        
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+196, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(scaleRatio);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.spritesheet('title_bg','assets/images/title_bg.png',720,1280);
        //this.load.image('title_staticbg','assets/images/title_staticbg.png')
        this.load.image('title_title','assets/images/title_title.png');

        this.load.image('ui_top','assets/images/ui_top.png');
        this.load.image('ui_close','assets/images/ui_close.png');
        this.load.image('ui_gameover','assets/images/ui_gameover.png');
        this.load.image('ui_share','assets/images/ui_share.png');
        this.load.image('ui_replay','assets/images/ui_replay.png');
        this.load.image('ui_f','assets/images/ui_f.png');
        this.load.image('ui_t','assets/images/ui_t.png');
        this.load.image('ui_help','assets/images/ui_help.png');
        this.load.image('ui_tutorial','assets/images/ui_tutorial.png');
        this.load.image('ui_credits','assets/images/ui_credits.png');
        this.load.image('ui_soundon','assets/images/ui_sndon.png');
        this.load.image('ui_soundoff','assets/images/ui_sndoff.png');

        this.load.image('bg','assets/images/bg.png');
        //this.load.image('shadow','assets/images/shadow.png');

        this.load.image('live','assets/images/live.png');

        this.load.image('idle','assets/images/m-idle.png');
        this.load.image('open','assets/images/m-open.png');
        this.load.image('coffee','assets/images/m-coffee.png');
        this.load.image('coffee_hit','assets/images/m-coffee-hit.png');
        this.load.image('head','assets/images/m-head.png');
        this.load.image('head_hit','assets/images/m-head-hit.png');

        this.load.image('p_fail','assets/images/p-fail.png');
        this.load.image('p_bad','assets/images/p-bad.png');
        this.load.image('p_good','assets/images/p-good.png');
        this.load.image('p_nice','assets/images/p-nice.png');
        this.load.image('p_magnifico','assets/images/p-magnifico.png');

        this.load.audio('applause','assets/audio/applause.ogg');
        this.load.audio('correct','assets/audio/correct.ogg');
        this.load.audio('wrong','assets/audio/wrong.ogg');
        this.load.audio('hit','assets/audio/hit.ogg');

        this.load.audio('bgm','assets/audio/bgm.ogg');
    },
    create: function(){
        this.state.start('Title');
    }
};