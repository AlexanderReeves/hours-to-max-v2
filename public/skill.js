//The Skill Class
class Skill {
  //a # can be used to privatise a variable
  name = ""; //The name of a skill
  currentXp = 0; //The players current xp in that skill
  currentLevel = 1; //Default for blank user
  goalXp = 13034431; //Goal xp is for lvl 99 in all skills by default
  goalLevel=99;//Default for max
  //The dropdown selection will be the index for the following 2 arrays (Unless the rate is custom):
  dropdownSelection = 0; //The current skill training choice from the dropdown
  //Note, dropdown selection 0 will be reserved for custom XP amounts.
  xpRates = []; //The xp rates that each training method offers
  gpPerXpRates = []; //The cost per xp for each training method
  customXpRate = 100000; //A custom Xp per hour rate, default of 100k
  customGpPerXp = 0;//Cost per xp of the custom rate
  levelsBoosted = 0;
  remainingHours = 0;

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
    var remHours = (this.goalXp - this.currentXp) / currentXpPerHour;
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
    return (this.goalXp / currentXpPerHour);
  }


  GetRemainingCost(){
    //Find the cost in gp to reach the players current goal for this skill
    //If training method is negative xp, assume it's trained passively for free
    if(this.xpRates[this.dropdownSelection] < 0){
      return 0;
    }
    var costPerXp = 0;
    var remainingXp = this.goalXp - this.currentXp;
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
    var remainingXp = this.goalXp - this.currentXp;
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
    $('#' + this.name + 'LevelDisplay').html(this.currentLevel + "/"+this.goalLevel);
    if(this.currentLevel >= this.goalLevel){
      $('#' + this.name + 'LevelDisplay').addClass("completed");
    }else{
      $('#' + this.name + 'LevelDisplay').removeClass("completed");
    }
  }

}