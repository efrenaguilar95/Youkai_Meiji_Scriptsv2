/*:
 * @plugindesc This plugin is for skipping SENSEI!
 *
 * @author SENSEI
 *
 * @param Sensei Title Return?
 * @desc Sensei decides whether the player can go to
 * title through the in-game menu.
 *
 * @default yes
 *
 * @help This helps you SENSEI by skipping the title
 *
 */

var parameters = PluginManager.parameters('PluginOfSkippingTitle');

var senseiReturn = String(parameters['Sensei Title Return?'] || 'yes');

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        // SceneManager.goto(Scene_Title);
        // Window_TitleCommand.initCommandPosition();
        SceneManager.goto(Scene_Map);
    }
    this.updateDocumentTitle();
};

Scene_GameEnd.prototype.commandToTitle = function() {
    this.fadeOutAll();
    if (senseiReturn == 'yes')
    {
        SceneManager.goto(Scene_Title); 
    }
    else
    {
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
    }
};

var aliasPluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    aliasPluginCommand.call(this, command, args);

    if(command == 'something')
    {
        $gameMessage.add('This is a message from SENSEI');
    }

}