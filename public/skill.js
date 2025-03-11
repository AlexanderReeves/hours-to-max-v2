//The Skill Class
class Skill {
  //a # can be used to privatise a variable
  name = ""; //The name of a skill
  currentXp = 0; //The players current xp in that skill
  currentLevel = 1; //Default for blank user
  //The dropdown selection will be the index for the following 2 arrays (Unless the rate is custom):
  dropdownSelection = 0; //The current skill training choice from the dropdown
  //Note, dropdown selection 0 will be reserved for custom XP amounts.
  xpRates = []; //The xp rates that each training method offers
  gpPerXpRates = []; //The cost per xp for each training method
  customXpRate = 100000; //A custom Xp per hour rate, default of 100k
  customGpPerXp = 0;//Cost per xp of the custom rate
  levelsBoosted = 0;

  //Farming exclusive variables
  seedChoice = 0;
  seedValues = [3403, 7071, 13768];
  numPatches = 5;


  constructor(name, xpRates, gpPerXpRates, defaultSelection, dropdownName) {
    //Add the skill name
    this.name = name;
    //Fill the array with available xp rates for the training methods in the dropdown
    this.xpRates = xpRates;
    //Fill the array with the cost per xp for each of the training methods in dropdown
    this.gpPerXpRates = gpPerXpRates;
    //Set the default training method for each skill
    this.dropdownSelection = defaultSelection;
    //Identify the name of the corresponding html dropdown
    this.dropdownName = dropdownName;

  }

  LogName(){
    console.log(this.name)
  }

  UpdateDropdown(){
    //sets the corresponding dropdown to the currently active training method
    //Each skill has a corresponding dropdown with name being skillnamedropdown
    $('#' + this.name +'Dropdown :nth-child('+ (this.dropdownSelection+1) +')').prop('selected', true);
  }

  DisplayCustomisations(){
    //Display the exsiting custom values on the webpage
    $('#'+this.name + 'CustomXp').val(this.customXpRate);
    $('#'+this.name + 'CustomGp').val(this.customGpPerXp);
    $('#'+this.name + 'Boost').val(this.levelsBoosted);
  }

  UpdateCustomisations(customXp, customGpPerXp, levelsBoosted){
    //Update this objects custom values to match the ones entered on the webpage
    this.customXpRate = customXp;
    this.customGpPerXp = customGpPerXp;
    this.levelsBoosted = levelsBoosted;
  }

  UpdateTrainingMethod(index){
    //Runs when a dropdown value is changed, triggered from v1js
    //takes in the index of the training method and updates the xp rates and gp per cost
    this.dropdownSelection = index;
    this.DisplayRemainingHours();
  }

  GetGoalXp(){
    //Xp required to reach each level as array
    var levelToXpArray = [0, 0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973,
      4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406,
      24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
      111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599,
      407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443,
      1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776,
      4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431]
      
    return levelToXpArray[this.GetGoalLevel()];

  }

  GetGoalLevel(){
    var goalLevel = 0;
    //The level requiered for each skill to obtain an achievment cape
    var achLvlArray = {"attack": 50,"strength": 76, "defence": 70, "hitpoints": 70, "ranged" : 70, "prayer": 85, "magic" : 96, "runecraft": 91, "construction": 78,
      "agility" : 90, "herblore": 90, "thieving": 91, "crafting": 85, "fletching" :95, "slayer": 95, "hunter": 70, "mining": 85, "smithing": 91, 
      "fishing": 96, "cooking":95, "firemaking": 85, "woodcutting":90, "farming" : 91};

    //The level requiered for each skill to obtain a quest cape
    var questLvlArray = {"attack": 50,"strength": 60, "defence": 65, "hitpoints": 50, "ranged" : 62, "prayer": 50, "magic" : 75, "runecraft": 60, "construction": 70,
      "agility" : 70, "herblore": 70, "thieving": 72, "crafting": 70, "fletching" :60, "slayer": 69, "hunter": 70, "mining": 72, "smithing": 70, 
      "fishing": 62, "cooking":65, "firemaking": 75, "woodcutting":70, "farming" : 70};

    if(currentTab == "achievement"){
      goalLevel = achLvlArray[this.name]
    }
    if(currentTab == "quest"){
      goalLevel = questLvlArray[this.name]
    }

    goalLevel = goalLevel - this.levelsBoosted;

    if(currentTab == "max"){
      //If the goal is to max, boosts are useless and the end result is always 99
      goalLevel = 99;
    }
    return goalLevel;
  }



  GetRemainingHours(){
    var currentXpPerHour = this.xpRates[this.dropdownSelection];
    //If training method is less than 0 xp per hour, it's considered passively trained
    if(currentXpPerHour < 0){
      return 0;
    }
    //If a custom value is being used, use that value instead.
    if(this.dropdownSelection == 0){
      currentXpPerHour = this.customXpRate;
    }
    //Find the current number of hours remaining to train this skill to the goal
    var remHours = (this.GetGoalXp() - this.currentXp) / currentXpPerHour;
    //Failsafe, if the goal has already been surpassed.
    if(remHours < 0 ){
      remHours = 0;
    }
    return remHours;
  }

  GetHoursFromZero(){
    var currentXpPerHour = this.xpRates[this.dropdownSelection];
    if(this.dropdownSelection == 0){
      currentXpPerHour = this.customXpRate;
    };
    if(currentXpPerHour < 0){
      return 0;
    }
    //Find the current number of hours remaining to train this skill to the goal
    return (this.GetGoalXp() / currentXpPerHour);
  }


  GetRemainingCost(){
    //Find the cost in gp to reach the players current goal for this skill
    //If training method is negative xp, assume it's trained passively for free
    if(this.xpRates[this.dropdownSelection] < 0){
      return 0;
    }
    var costPerXp = 0;
    var remainingXp = this.GetGoalXp() - this.currentXp;
    remainingXp <= 0 ? remainingXp = 0: remainingXp = remainingXp;
    //If the training method is custom, the gp rate will be custom
    if(this.dropdownSelection == 0){
      costPerXp = this.customGpPerXp;
    }else{
      //Otherwise, cost will come from array
      costPerXp = this.gpPerXpRates[this.dropdownSelection];
    }
    //Cost is remaining XP x cost per xp
    return (costPerXp * remainingXp);
  }


  DisplayRemainingHours(){
    //Displays the remainng number of hours of training for a skill
    var remainingHoursTwoDecimal = this.GetRemainingHours();
    remainingHoursTwoDecimal = remainingHoursTwoDecimal.toFixed(1);
    if(this.dropdownSelection == -1){
      remainingHoursTwoDecimal = "0";
    }
    $('#' + this.name + 'Hours').html(remainingHoursTwoDecimal + " hrs");
    //Display green for gained money, and red for lost money
    if(remainingHoursTwoDecimal <= 0){
      $('#' + this.name + 'Hours').addClass("completed");
      //$('#' + this.name + 'Dropdown').attr("disabled", true);
    }else{
      $('#' + this.name + 'Hours').removeClass("completed");
      //$('#' + this.name + 'Dropdown').attr("disabled", false);
    }
  }

  DisplayRemainingFarmRuns(){
    var xpPerFarmRun = this.seedValues[this.seedChoice] * this.numPatches;
    var remainingXp = this.GetGoalXp() - this.currentXp;
    if(remainingXp <= 0){
      remainingXp = 0;
    }
    var remainingRuns = remainingXp / xpPerFarmRun;
    //Add one to wipe out any remainder
    if(remainingXp % xpPerFarmRun > 0){
      remainingRuns += 1;
    }
    $('#farmRunsDisplay').html(remainingRuns.toFixed(0) + " runs");
    $('#goalFarmDisplay').html(remainingRuns.toFixed(0));
  }

  DisplayRemainingCost(){
    //Displays the remainng number of hours of training for a skill
    var remainingCostTwoDecimal = this.GetRemainingCost();
    //Also divide by million
    remainingCostTwoDecimal = remainingCostTwoDecimal/1000000;
    remainingCostTwoDecimal = (remainingCostTwoDecimal.toFixed(1));
    if(this.dropdownSelection == -1){
      remainingCostTwoDecimal = 0.0;
    }
    $('#' + this.name + 'Cost').html(remainingCostTwoDecimal + " mgp");
    //Display green for gained money, and red for lost money
    if(remainingCostTwoDecimal >= 0){
      $('#' + this.name + 'Cost').removeClass("expense");
      $('#' + this.name + 'Cost').addClass("profit");
    }else{
      $('#' + this.name + 'Cost').removeClass("profit");
      $('#' + this.name + 'Cost').addClass("expense");
    }
  }

  DisplayLevels(){
    console.log("Displaying old boost string thing for " + this.name);
    var strikeLevel = document.getElementById(this.name + "StrikeLevel");
    var message = document.getElementById(this.name + 'LevelDisplay');
    if(this.levelsBoosted > 0 && currentTab != "max"){
      strikeLevel.innerHTML = "<p>99</p>";
      console.log("Displaying old boost string thing");
      message.innerHTML= this.currentLevel + "/" ;
    }else{
      strikeLevel.innerText = "";
      message.innerHTML= '<p>' + this.currentLevel + '/' + '' + this.GetGoalLevel() + '<p>';
    }
    
    if(this.currentLevel >= this.GetGoalLevel()){
      $('#' + this.name + 'LevelDisplay').addClass("completed");
    }else{
      $('#' + this.name + 'LevelDisplay').removeClass("completed");
    }
  }

}