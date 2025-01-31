//********Alexander Reeves, Hours To Mac V1 Prototype code**********

//**********************************************************************************
//This code was initially a pure HTML, CSS, Javascript prototype proof of concept.
//The code was written initially without custom classes
//I am in the process of rewriting this code to be more class based
//This should allow for more scalability, expansions, and easier maintenance

//You can read the github logs to see how this code is being adapted and improved.
//**********************************************************************************

$.ajaxSetup({ //Prevent future code loading before previous code finishes.
    async: false
});

//The Default tab is for players wanting the goal of a "Max" cape
//level Old School Runescape account.
var currentTab = "max";
var hoursToGoal = 0;

//****Default Variables****

//The xp required to reach the goal level for every skill if attempting to obtain a
//quest cape rather than a max cape
var questXpGoalArray = [0,0,0,0,0,273742,101333,1210421,737627,814445
    ,273742,333804,1210421,737627,737627,899257,737627,737627,737627,668051,814445,273742,737627
    ,737627];
//The xp required to reach the goal level for every skill if attempting to obtain an
//achievement cape rather than a max cape
var achievementXpGoalArray = [0,0,0,0,0,737627,3258594,9684577,3258594,5346332
    ,8771558,9684577,3258594,3258594,5902831,3258594,5346332,5346332,5902831,8771558,5902831,5902831,737627
    ,1629200];

//The level requiered for each skill to obtain an achievment cape
var achLvlArray = [0,0,0,0,0,70,85,96,95,90
    ,95,96,85,85,91,85,90,90,91,95,91,91,70
    ,78];
//The level requiered for each skill to obtain a quest cape
var questLvlArray = [0,0,0,0,0,60,50,75,70,71
    ,60,62,75,70,70,72,70,70,70,69,70,60,70
    ,70];

//The xp required for a maximum level in any skill
var ninetyNine = 13034431;
//The current username of the website user
var user = "";

//Start reworking code into re-usable classes.
//Skills class contains an array of skills.
var skills = [];


window.onload = function(){
    //As soon as the page has finished loading, perform each task once.
    //Initialise the Runescape skills that each dropdown is based on
    InitialiseSkills();
}

function InitialiseSkills(){
    //Add each skill to the array of skills
    //Each skills default selection should match the one in the html page
    skills.push( new Skill("ranged", [90000, 130000, 140000, 675000, 710000, 850000], [0,-0.1,-0.2,-3.2,-4.7,-8.4], 6));
    skills.push( new Skill("prayer", [50000, 250000, 437000, 600000, 800000, 1250000], [0,0,0,0,0,0], 6));
    skills.push( new Skill("magic", [78000, 150000, 150000, 175000, 380000], [0,0,0,0,0], 5));
    skills.push( new Skill("runecraft", [35000, 60000, 65000, 70000, 80000, 100000], [0,0,0,0,0,0],6 ));
    skills.push( new Skill("construction", [190000, 400000, 450000, 500000, 580000, 850000, 1000000], [0,0,0,0,0,0,0],7 ));
    skills.push( new Skill("agility", [45000, 50000, 50000, 55000, 65000, 65000, 90000], [0,0,0,0,0,0,0],7 ));
    skills.push( new Skill("herblore", [110000, 170000, 210000, 400000, 500000], [0,0,0,0,0],5 ));
    skills.push( new Skill("thieving", [110000, 140000, 150000, 210000, 240000, 260000, 265000], [0,0,0,0,0,0,0],7 ));
    skills.push( new Skill("crafting", [150000,220000,270000,360000,415000], [0,0,0,0,0], 5));
    skills.push( new Skill("fletching", [1900000,2250000,2500000,3000000,4000000], [0,0,0,0,0],5 ));
    skills.push( new Skill("hunter", [80000,115000,125000,150000,160000,175000], [0,0,0,0,0,0],6 ));
    skills.push( new Skill("mining", [25000,50000,60000,69000,70000,75000,78000,85000], [0,0,0,0,0,0,0,0],8 ));
    skills.push( new Skill("smithing", [200000,250000,350000], [0,0,0],3 ));
    skills.push( new Skill("fishing", [40000,50000,75000,80000], [0,0,0,0],4 ));
    skills.push( new Skill("cooking", [150000,250000,300000,450000,900000], [0,0,0,0,0],5 ));
    skills.push( new Skill("firemaking", [250000,275000,290000,400000,450000], [0,0,0,0,0],5 ));
    skills.push( new Skill("woodcutting", [68000, 75000, 90000, 90000, 100000], [0,0,0,0,0],5 ));
    //Slayer is different because it does not have a set list of options, only a custom selection
    skills.push( new Skill("slayer", [0], [0],0 ));
    //Farming also works via doing xp per farm run, rather than xp per hour
    skills.push( new Skill("farming", [0], [0],0 ));
    
    //Different code will apply for 3 selectors (Slayer, Farming, Seed Value) as they don't have typical training methods
    //Apply the default selections to each of the dropdowns
    skills.forEach(element => {
        if(element.name!="farming" && element.name != "slayer"){
            element.SelectDefaultTrainingMethod();
        }
    });
}

function DropdownUpdate(clickedDropdown){
    skillName = clickedDropdown.name;
    skillDropValue = clickedDropdown.value;
    //Get the name of the skill from the dropdown, and find the corresponding object from the skills array
    skills.forEach(element => {
        if(element.name==skillName){
            //Set the skill object to match the selected dropdown value
            element.UpdateTrainingMethod(skillDropValue);
        }
    });

    //Calculate the new total hours to max based on xp of all skills
    UpdateRemainingHours();
}

function UpdateRemainingHours(){
    //Calculate and add remaining hours for each skill (excluding slayer and farming)
    hoursToGoal = 0;
    skills.forEach(element => {
        if(element.name!="farming" && element.name != "slayer"){
            //calculate and add hours to goal in that skill
            hoursToGoal += (element.goalXp/element.xpRates[element.dropdownSelection])
        }
    });
}


