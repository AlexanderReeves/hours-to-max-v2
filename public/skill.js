//The Skill Class
class Skill {
  //a # can be used to privatise a variable
  name = ""; //The name of a skill
  currentXp = 0; //The players current xp in that skill
  goalXp = 13034431; //Goal xp is for lvl 99 in all skills by default

  //The dropdown selection will be the index for the following 2 arrays (Unless the rate is custom):
  dropdownSelection = 0; //The current skill training choice from the dropdown
  xpRates = []; //The xp rates that each training method offers
  gpPerXpRates = []; //The cost per xp for each training method
  customXpRate = 0; //A custom Xp per hour rate

  remainingHours = 0;


  
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
    $('#' + this.name +'Dropdown :nth-child('+ this.dropdownSelection +')').prop('selected', true);
  }

  UpdateTrainingMethod(index){
    //Runs when a dropdown value is changed, triggered from v1js
    //takes in the index of the training method and updates the xp rates and gp per cost
    this.dropdownSelection = index;
    this.DisplayRemainingHours();
  }

  GetRemainingHours(){
    //Find the current number of hours remaining to train this skill to the goal
    return (this.goalXp / this.xpRates[this.dropdownSelection -1])
  }
  GetRemainingCost(){
    //Find the cost in gp to reach the players current goal for this skill
    return (this.gpPerXpRates[this.dropdownSelection -1] *  this.GetRemainingHours());
  }


  DisplayRemainingHours(){
    //Displays the remainng number of hours of training for a skill
    var remainingHoursTwoDecimal = this.GetRemainingHours();
    remainingHoursTwoDecimal = remainingHoursTwoDecimal.toFixed(1);
    $('#' + this.name + 'Final').html(remainingHoursTwoDecimal + " hrs");
  }

  DisplayRemainingCost(){
    //Displays the remainng number of hours of training for a skill
    var remainingCostTwoDecimal = this.GetRemainingCost();
    remainingCostTwoDecimal = remainingCostTwoDecimal.toFixed(1);
    $('#' + this.name + 'Cost').html(remainingCostTwoDecimal + " Gp");
  }

}