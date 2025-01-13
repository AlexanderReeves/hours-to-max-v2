//The Skill Class
class Skill {
  //a # can be used to privatise a variable
  name = "";
  currentXp = 0;
  dropdownSelection = 0;
  xpRates = [];
  gpPerXpRates = []; 
  
  constructor(name, xpRates, gpPerXpRates, defaultSelection) {
    this.name = name;
    this.xpRates = xpRates;
    this.gpPerXpRates = gpPerXpRates;
    this.dropdownSelection = defaultSelection;
  }

  LogName(){
    console.log(this.name)
  }

}