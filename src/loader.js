function CustomLoader(game){
	Phaser.Loader.call(this, game);
}

CustomLoader.prototype = Object.create(Phaser.Loader.prototype);
CustomLoader.prototype.constructor = CustomLoader;

CustomLoader.prototype.webfont = function(key, fontName, overwrite){
	if(typeof overwrite === 'undefined'){
		overwrite = false;
	}

	this.addToFileList('webfont', key, fontName);
	return this;
};

CustomLoader.prototype.loadFile = function(file){
	Phaser.Loader.prototype.loadFile.call(this, file);

	if(file.type === 'webfont'){
		var _this = this;
		var font = new FontFaceObserver(file.url);
		font.load(null, 10000).then(function(){
			_this.asyncComplete(file);
		}, function(){
			_this.asyncComplete(file, 'Error loading font ' + file.url);
		});
	}
};