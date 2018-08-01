var CarFreeDay = CarFreeDay || {};

CarFreeDay.Boot = function(){};
CarFreeDay.Boot.prototype = {
    preload: function(){
        //this.game.load.webfont('papercuts', 'papercuts');
        this.game.load.image('logo','assets/images/preload_bg.png');
        this.game.load.image('preloadbar','assets/images/preload_bar.png');
    },
    create: function(){
        this.game.stage.backgroundColor = '#000000';

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //this.game.add.text(0, 0, "papercutsFontLoader", {font:"1px papercuts", fill:"#FFFFFF"});

        this.state.start('Preload');
    }
};