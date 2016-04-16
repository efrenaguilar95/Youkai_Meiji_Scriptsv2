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
 * @param Option 1
 * @desc The first option to choose from
 * @default Yes
 *
 *
 * @param Option 2
 * @desc The second option to choose from
 * @default No
 *
 * @help This plugin should be put in just like any other event. 
 * It will return the choice made, which can then be used 
 * by other event triggers.
 *
 */

var parameters = PluginManager.parameters('ChoiceClock');

var countdownTime = parameters["Countdown Timer"]

function displayChoice(choice)
{

    $gameMessage.add('choice chosen'); //tried to output this after a choice was made, but it doesn't work this way for some reason :\
    console.log($gameMessage.choices()[choice]); //BUT I can still get the choice, as seen bu outputting it to the console
                                                // This probably has to do with how RPG maker does its order of operations/events
}


var choiceClockCommand = Game_Interpreter.prototype.pluginCommand;


//This code essentially tells the player to make a choice, and calls a function to do something with that choice
//Still have no idea how to make dialogue appear that depends on this choice after the choice is made(essentially coding a choice event)
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    choiceClockCommand.call(this, command, args);

    if(command == 'startChoiceTimer')
    {
        $gameMessage.setChoiceCallback(displayChoice);
        $gameMessage.setFaceImage("People3",2);
        $gameMessage.add('HALT!');
        $gameMessage.newPage();
        $gameMessage.add('IT IS TIME TO MAKE A CHOICE!');
        $gameMessage.setChoices(['YES', 'NO'], 0, 0);
    }

}