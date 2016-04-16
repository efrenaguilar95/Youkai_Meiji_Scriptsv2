/*:
 * @plugindesc This plugin is for getting a happy SENSEI
 *
 * @author SENSEI
 *
 * @param Harold profile
 * @desc set harold's profile
 * @default I am Saitama, a hero for fun.
 *
 * 
 *
 * @help This helps you SENSEI by skipping the title
 *
 */

 var happyParamaters = PluginManager.parameters("HappySensei");

 var profile = String(happyParamaters["Harold profile"]);

var myFunction = function()
{
	return "NOTICE ME SENSEI";
}

var SenseiPluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    SenseiPluginCommand.call(this, command, args);

    if(command == 'Happy')
    {

    	$gameMessage.add($dataSkills[3].meta.myNotetag);
    	var myActor = $gameParty.members()[0];
    	if($dataSkills[3].meta.myNotetag2)
    	{
    		$gameMessage.add("SENSEI noticed me!!!");//but he didn't because there is not myNotetag2 :'(

    	}

    	$gameMessage.add(myActor.name());

    	myActor.setName("Bob");

    	myActor.setProfile(profile)

    	var myObject = new My_Class();

    	myObject.theFunction2();
    	if(args.length > 3)
    	{
    		$gameMessage.add("Input over limit");
    	}
    	var numberOne = Number(args[0]);
    	$gameMessage.add(myFunction() + args);
    }

}

function My_Class()
{
	this.initialize.apply(this, arguments);
}

My_Class.prototype.initialize = function()
{
	this._classVariable = 3;
}

My_Class.prototype.theFunction = function()
{
	$gameMessage.add("SENSEI!!");
}

My_Class.prototype.theFunction2 = function()
{
	this.theFunction();
}

My_Class.prototype.theNumber = 4;