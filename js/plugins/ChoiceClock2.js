/*:
 * @plugindesc This plugin displays a dialogue choice along with a timer that counts down how much time is left to make a choice.
 *
 * @author NARUSKE
 *
 * @param Countdown Timer
 * @desc The amount of time allotted to make a choice
 * @default 15
 *
 *
 * @help No help for you :P
 */

 var Imported = Imported || {};
 Imported.ChoiceClock2 = true;

 var Naruske = Naruske || {};
 Naruske.clock = Naruske.clock || {};


(function() {
	 
	 Naruske.clock.countdownTime = Number(PluginManager.parameters("ChoiceClock2")["Countdown Timer"]);

	 //load images into cache
	 Naruske.clock.Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
	 Scene_Boot.prototype.loadSystemImages = function(){
	 	ImageManager.loadSystem("timerclock");
		Naruske.clock.Scene_Boot_loadSystemImages.call(this);
	 };

	 //initialize choice system
	 Naruske.clock.Game_System_initialize = Game_System.prototype.initialize;
	 Game_System.prototype.initialize = function(){
	 	Naruske.clock.Game_System_initialize.call(this);
	 	this.clockChoices = true;
	 };


	 //Overwriting built in functions
	 Window_ChoiceList.prototype.textHeight = Window_ChoiceList.prototype.lineHeight;
	 Naruske.clock.Window_ChoiceList_lineHeight = Window_ChoiceList.prototype.lineHeight;
	 //Window_ChoiceList.prototype.lineHeight = function() {return $gameSystem.clockChoices ? 250 : Naruske.clock.Window_ChoiceList_lineHeight.call(this);};


	 Window_ChoiceList.prototype.drawButton = function(index, y, cursor){
	 	var bitmap = ImageManager.loadSystem("timerclock");	//The image to be used for the choices boxes
	 	var pw = 362;
	 	var ph = 362;

	 	var sx = 0;
	 	var sy = 0;
	 	this.contents.blt(bitmap, sx, sy, pw, ph, 0+(index*362), 0);
	 };


	 Naruske.clock.Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem;
	 Window_ChoiceList.prototype.drawItem = function(index)
	 {
	 	if($gameSystem.clockChoices)
	 	{
	 	 	var rect = this.itemRectForText(index);
	 	// 	this.drawButton(index, rect.y);
	 	// 	if(index == this._index) this.drawButton(index, rect.y, true);	//places the highlight over the highlighted text
	 	 	var offset = (this.lineHeight() - this.textHeight()) * 0.5;
			this.drawTextEx(this.commandName(index), rect.x, rect.y + offset);
	 	}
	 	else
	 	{
	 		Naruske.clock.Window_ChoiceList_drawItem.call(this, index);
	 	};
	 };

	Window_ChoiceList.prototype.maxCols = function() {
 	if($gameSystem.clockChoices)
 	{
 		return 2;
 	}
 	else
 	{
 		return 1;
 	}
};

	 Naruske.clock.Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
	 Window_ChoiceList.prototype.updatePlacement = function()
	 {
	 	if($gameSystem.clockChoices)
	 	{
	 		this.width = Graphics.boxWidth;
    		this.height = Graphics.boxHeight;
    		this.y = (Graphics.boxHeight/2) - this.textHeight();
    		var messageY = this._messageWindow.y;
    		// if (messageY >= Graphics.boxHeight / 2) 
    		// {
     	// 	   this.y = 0;
    		// } 
    		// else 
    		// {
      //   		this.y = 0;
    		// };
	 	}
	 	else
	 	{
	 		Naruske.clock.Window_ChoiceList_updatePlacement.call(this);
	 	};

	 };

	 Naruske.clock.Window_ChoiceList_start = Window_ChoiceList.prototype.start;
	 Window_ChoiceList.prototype.start = function() 
	 {
		 this.setupVNChoices();
		 Naruske.clock.Window_ChoiceList_start.call(this);
     };

     Window_ChoiceList.prototype.setupVNChoices = function() 
     {
		 this.ChoiceSprites = [];
		 this.choice_background = [];
		 this._vnIndex = this._index;
    	 if ($gameSystem.vnChoices) 
    	 {
      		 this.opacity = 0;
		 } 
		 else 
		 {
      	 	 this.opacity = 255;
      	 };
	};


	 Naruske.clock.Window_ChoiceList_update = Window_ChoiceList.prototype.update;
	 Window_ChoiceList.prototype.update = function() 
	 {
	 	 Naruske.clock.Window_ChoiceList_update.call(this);
	 	 if (this._vnIndex != this._index) 
	 	 {
			 this.refresh();
		 	 this._vnIndex = this._index;
	 	 }
	 };

	 Naruske.clock.Window_ChoiceList_updateBackground = Window_ChoiceList.prototype.updateBackground;
	 Window_ChoiceList.prototype.updateBackground = function()
	 {
	 	if($gameSystem.clockChoices)
	 	{
	 		this._background = 2;
	 		this.setBackgroundType(this._background);
	 	}
	 	else
	 	{
	 		Naruske.clock.Window_ChoiceList_updateBackground.call(this);
	 	};
	 };

	// Naruske.clock.Window_ChoiceList_select = Window_ChoiceList.prototype.select;
	// Window_ChoiceList.prototype.select = function(index)
	// {
	// 	if($gameSystem.clockChoices && this.active ==true)
	// 	{
	// 		 this._index = index;
	// 	     this._stayCount = 0;
	// 	     this.ensureCursorVisible();
	// 	     this.updateCursor();
	// 	     this.callUpdateHelp();
	// 		 this.playOkSound();
 //        	 this.updateInputData();
 //       		 this.deactivate();
 //        	 this.callOkHandler();
	// 	}
	// 	else
	// 	{
	// 		Naruske.clock.Window_ChoiceList_select.call(this, index);
	// 	}
	// }

	Naruske.clock.Window_ChoiceList_processCursorMove = Window_ChoiceList.prototype.processCursorMove;
	Window_ChoiceList.prototype.processCursorMove = function()
	{
		if($gameSystem.clockChoices && this.active ==true)
		{
			if (this.isCursorMovable()) 
			{
		        var lastIndex = this.index();
		        if (Input.isPressed('left'))
		        {
		            this._index = 0;
		            this.processOk();
		        }
		        if (Input.isPressed('right'))
		        {
		            this._index = 1;
		            this.processOk();
		        }
		        // this.playOkSound();
		        // this.updateInputData();
		        // this.deactivate();
		        // this.callOkHandler();
		   }
		}
		else
		{
			Naruske.clock.Window_ChoiceList_processCursorMove.call(this);
		}
	}

	Naruske.clock.Window_ChoiceList_refreshCursor = Window_ChoiceList.prototype._refreshCursor;
	Window_ChoiceList.prototype._refreshCursor = function() {
	if ($gameSystem.clockChoices) {
		this._windowCursorSprite.opacity = 0;
	} else {
		Galv.VNC.Window_ChoiceList_refreshCursor.call(this);
	};
};

})();