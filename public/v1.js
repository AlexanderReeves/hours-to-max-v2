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
//The current username of the website user
var user = "Player";
var totalLevel = 32;

//The xp required for a maximum level in any skill
var ninetyNine = 13034431;

//Start reworking code into re-usable classes.
//Skills class contains an array of skills.
var skills = [];


window.onload = function(){
    //As soon as the page has finished loading, perform each task once.
    //Initialise the Runescape skills that each dropdown is based on
    InitialiseSkills();
    //Override the values if there is anything stored in the db
    PullFromDatabase();
    //Pull the playerdata from the Jagex API if player was in db
    if(user != ""){PullFromJagex();}
    //Update all the dropdowns to match the current selections
    UpdateAllSkillDropdowns();
    //Update the custom fields to display the data that loaded
    UpdateAllSkillCustomisations();
    //Display the remaining hours of training for each skill
    DisplayAllRemainingHours();
    //Display current level and goal level
    DisplayAllLevels();
    //Display the remaining cost of training each skill
    DisplayAllRemainingCost();
}

function InitialiseSkills(){
    //Create each skill and add to the array.

    //Each skills default selection should match the one in the html page
    //Setting dropdown to index 0 in the future should be for custom inputs...
    skills.push( new Skill("attack", [0,-1], [0,0],1 ));
    skills.push( new Skill("strength", [0,-1], [0,0],1 ));
    skills.push( new Skill("defence", [0,-1], [0,0],1 ));
    skills.push( new Skill("ranged", [0,90000, 130000, 140000, 675000, 710000, 850000], [0,0,-0.1,-0.1,-4.1,-5.4,-7.6], 6));
    skills.push( new Skill("prayer", [0,50000, 250000, 437000, 600000, 800000, 1250000], [-0,-10,-10,-11,-12,-19,-50], 6));
    skills.push( new Skill("magic", [0,78000, 150000, 150000, 175000, 380000], [0,1,2,0,0,-3.5], 5));
    skills.push( new Skill("runecraft", [0,35000, 60000, 65000, 70000, 80000, 100000], [0,50,-0.5,1,10,30,0,10],6 ));
    skills.push( new Skill("construction", [0,190000, 400000, 450000, 500000, 580000, 850000, 1000000], [0,-6.5,-8,-10,-10,-11,-16,-16],7 ));
    skills.push( new Skill("hitpoints", [0,-1], [0,0],1 ));
    skills.push( new Skill("agility", [0,45000, 50000, 50000, 55000, 65000, 65000, 90000], [0,1.5,1.5,1.5,1.5,1.5,0,10],7 ));
    skills.push( new Skill("herblore", [0,110000, 170000, 210000, 400000, 500000], [0,8,-22,-9,-10,-25],5 ));
    skills.push( new Skill("thieving", [0,110000, 140000, 150000, 210000, 240000, 260000, 265000], [0,7,10,20,1,1,10,7],6 ));
    skills.push( new Skill("crafting", [0,150000,220000,270000,360000,415000], [0,1,-2,-5,-30,-20], 5));
    skills.push( new Skill("fletching", [0,1900000,2250000,2500000,3000000,4000000], [0,-8,-12,-50,-11,-7],5 ));
    skills.push( new Skill("hunter", [0,80000,115000,125000,150000,160000,175000], [0,0,6,0,10,0,1],6 ));
    skills.push( new Skill("mining", [0,25000,50000,60000,69000,70000,75000,78000,85000], [0,0,0,8,4,8,5,2,2],8 ));
    skills.push( new Skill("smithing", [0,200000,250000,350000], [0,0,0,-3.5],3 ));
    skills.push( new Skill("fishing", [0,40000,50000,75000,80000], [0,0,0,1,-2],4 ));
    skills.push( new Skill("cooking", [0,150000,250000,300000,450000,900000], [0,1,1,1,-2,1],5 ));
    skills.push( new Skill("firemaking", [0,250000,275000,290000,400000,450000], [0,-3,-2,1,-4,-2],5 ));
    skills.push( new Skill("woodcutting", [0,68000, 75000, 90000, 90000, 100000], [0,0,0,0,0,0],5 ));
    //Slayer is different because it does not have a set list of options, only a custom selection
    skills.push( new Skill("slayer", [0], [0],0 ));
    //Farming also works via doing xp per farm run, rather than xp per hour
    skills.push( new Skill("farming", [0], [0],0 ));
}

function UpdateAllSkillDropdowns(){
    //Different code will apply for Farming related choices as they don't have typical training methods
    //Apply the default selections to each of the dropdowns
    skills.forEach(element => {
        if(element.name!="farming"){
            element.UpdateDropdown();
            element.GetGoalXp();
        }
    });
}

function UpdateAllSkillCustomisations(){
    //Different code will apply for Farming related choices as they don't have typical training methods
    //Apply the default selections to each of the dropdowns
    skills.forEach(element => {
        if(element.name!="farming"){
            element.DisplayCustomisations();
        }
    });
}

function PullFromDatabase(){
    //Request the user db data to load into page via jwt
    //Get the auth cookie to send to the server
    var authCode = $.cookie("authorization");
    //Don't run if an auth code is not in the cookie
    if(!authCode){
        console.log("No 'userid' found in the browser cookies.")
        return;
    }
    //Request all the user info from the server
    $.ajax({
        type: "POST",
        url: "/find/user",
        data: '&authCode=' + authCode, // serializes the form's elements
        success: function (data) {
            //Save all the downloaded user into the database user variable
            dbuser = data.user[0];
            console.log(dbuser);
            console.log(dbuser.username + " player data was pulled from the database");
            
            console.log(dbuser.currentGoal + " goal was pulled");
            //Save the new username to variable, and update it in searchbox
            user = dbuser.username;
            $('#usernameInput').val(user);
            setTab(dbuser.currentGoal);
            
        },
        error: function (XMLHttpRequest) {
            console.log('Submit returned errors');
            jsonErrorMessage = XMLHttpRequest.responseJSON.error;
        }
    });

    if(dbuser){
        //If a user was pulled, put their data into the skills array
        //Loop through each skill in the array (Excluding farming)
        skills.forEach(element => {
            if(element.name != 'farming'){
                //We want to find data where the name matches the current skill
                //e.g rangedChoice
                desiredKey = element.name.concat('Choice');
                //Loop through each pulled data element looking for the match
                for(key in dbuser) {
                    if(key == desiredKey) {
                        //If match found, update the skill in the array
                        var value = dbuser[key];
                        element.dropdownSelection = value;
                    }
                };
                //do the same for player boosts
                desiredKey = element.name.concat('Boost');
                //Loop through each pulled data element looking for the match
                for(key in dbuser) {
                    if(key == desiredKey) {
                        //If match found, update the skill in the array
                        var value = dbuser[key];
                        element.levelsBoosted = value;
                    }
                };
                //do the same for custom xp rates
                desiredKey = element.name.concat('CustomXp');
                //Loop through each pulled data element looking for the match
                for(key in dbuser) {
                    if(key == desiredKey) {
                        //If match found, update the skill in the array
                        var value = dbuser[key];
                        element.customXpRate = value;
                    }
                };
                //do the same for custom xgp per xp rates
                desiredKey = element.name.concat('CustomGp');
                //Loop through each pulled data element looking for the match
                for(key in dbuser) {
                    if(key == desiredKey) {
                        //If match found, update the skill in the array
                        var value = dbuser[key];
                        element.customGpPerXp = value;
                    }
                };

            }
            if(element.name == 'farming'){
                //Load in the downloaded seed choice, and num of patches.
                seedChoice = dbuser.seedChoice;
                numPatches = dbuser.farmingPatches;
            }
        });
    }
    return; // avoid to execute the actual submit of the form
}

function PullFromJagex(){
    //Get whatever name is currently in the username box
    username = document.getElementById('usernameInput').value;
    console.log("Attempting to pull player data for " + username + " from Jagex.");
    //Cancel if no valid username is being searched
    if(!username){
        return false;
    }

    //Attempt to pull player from the Jagex API
    $.getJSON("https://corsproxy.io/?url=https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=" + user, function(result) {
        console.log(result);
        $.each(result, function(pulledkey, field) {
            console.log(field + "TEST");
            console.log(pulledkey);
            console.log(result);
            //At some point, Jagex changed the Json returned, now there are 3 root values instead of 1 mega one.
            //Need to 
            if(pulledkey!= "name" && pulledkey != "activities"){
            //Jagex will return 24 items in an array, including the skills
        	for(let i = 0; i <24; i++) {
                
                //If theres xp, it means we got all the data desired.
        		if (field[i].xp != null) {
                    //Get the specific parts of data that are useful to us
                    var pulledSkillName = field[i].name.toLowerCase();
                    var pulledSkillXp = field[i].xp;
                    var pulledSkillLevel = field[i].level;
                    //Apply the pulled data into the local skills
                    if(pulledSkillName == "overall"){
                        totalLevel = field[i].level;
                    };
                    skills.forEach(element => {
                        if(element.name == pulledSkillName){
                            element.currentXp = pulledSkillXp;
                            element.currentLevel = pulledSkillLevel;
                        }
                    });
        		}
        	}


            }

        });
    });
}

function DropdownWasChanged(dropdownName){
    console.log(dropdownName);
    skillDropValue = $('#' + dropdownName).val();
    skillName = dropdownName.replace('Dropdown','');
    console.log(skillDropValue)
    //Get the name of the skill from the dropdown, and find the corresponding object from the skills array
    skills.forEach(element => {
        if(element.name==skillName && skillName != 'farming'){
            //Set the skill object to match the selected dropdown value
            element.UpdateTrainingMethod(skillDropValue);
        }
        //Occurs when changes happen to the farming or seed dropdown
        if((element.name == "farming") && (skillName == "seed" || skillName == "patches")){
            if(skillName == "seed"){
                element.seedChoice = skillDropValue -1;
            };
            if(skillName == "patches"){
                element.numPatches = skillDropValue;
            };
            //Update remaining tree runs based on xp per run
            element.DisplayRemainingFarmRuns();
        }
        //If the section was set to custom, expand it if it is not already expanded
        if(skillDropValue == 0){
            $( "#"+skillName+"Expanded").addClass("expanded");
            $( "#"+skillName +"Arrow").addClass("down");
        }
    });

    //Calculate the new total hours to max based on xp of all skills
    // FindTotalHoursToGoal();
    //Re-Run calculations for reaching the players goals
    //Display the remaining hours of training for each skill
    DisplayAllRemainingHours();
    //Display the remaining cost of training each skill
    DisplayAllRemainingCost();
}

function RefreshCustom(clickedRefresh){
    skillName = clickedRefresh.replace("Refresh", "");

    //Force change the dropdown to custom selection
    skills.forEach(element => {
        if(element.name==skillName && skillName != 'farming'){
            //Set the skill object to match the selected dropdown value
            DropdownWasChanged(skillName + 'Dropdown');
        }
    });

    //Get all the custom values
    //CustomXP
    var customXp = $('#' + skillName + 'CustomXp').val();
    //CustomGpPerXp
    var customGpPerXp = $('#' + skillName + 'CustomGp').val();
    //LevelsBoosted
    var levelsBoosted = $('#' + skillName + 'Boost').val();
    skills.forEach(element => {
        if(element.name==skillName && skillName != 'farming'){
            //Set the skill object to match the selected dropdown value
            element.UpdateCustomisations(customXp, customGpPerXp, levelsBoosted);
        }
    });

    //Calculate the new total hours to max based on xp of all skills
    // FindTotalHoursToGoal();
    //Re-Run calculations for reaching the players goals
    DisplayAllLevels();
    //Display the remaining hours of training for each skill
    DisplayAllRemainingHours();
    //Display the remaining cost of training each skill
    DisplayAllRemainingCost();
}




function DisplayAllRemainingHours(){
    //Display the remaining hours for each skill
    //Also get a total for the final display
    var totalRemainingHours = 0;
    var totalHoursFromZero = 0;
    skills.forEach(element => {
        if(element.name!="farming"){
            totalRemainingHours += element.GetRemainingHours();
            totalHoursFromZero += element.GetHoursFromZero();
            element.DisplayRemainingHours();
        }else{
            element.DisplayRemainingFarmRuns();
        }
    });
    console.log("remaining total hours = " + totalRemainingHours);
    console.log
    //Display the final result
    var hoursCompleted = totalHoursFromZero - totalRemainingHours;

    $('#goalHoursDisplay').html(totalRemainingHours.toFixed(2));
    var percentOfGoal = hoursCompleted/totalHoursFromZero * 100;
    //percentCompleted = (Math.round(percentCompleted * 100) / 100).toFixed(2);
    document.getElementById("progressPercent").setAttribute("style","width:" + percentOfGoal + "%");
}

function DisplayAllLevels(){
    var completedSkills = 0
    var remainingTotalLevels = 0;
    console.log("Displaying current and remaining levels for each skill");
    skills.forEach(element => {
        element.DisplayLevels();
        var remainingLevels = element.GetGoalLevel() - element.currentLevel;
        if(remainingLevels < 0){
            remainingLevels = 0;
        }
        remainingTotalLevels += remainingLevels;

        if(remainingLevels <= 0 ){
            completedSkills +=1;
        }
        
    });
    $('#goalRemainingLevels').html(remainingTotalLevels);
    $('#goalCompletedSkills').html(completedSkills);
    $('#goalName').html(user);
}

function DisplayAllRemainingCost(){
    //Display the remaining cost for each skill
    //Also get a total for the final display
    var totalRemainingCost = 0;
    skills.forEach(element => {
        if(element.name!="farming"){
            totalRemainingCost += element.GetRemainingCost();
            element.DisplayRemainingCost();
        }
    });
    //TO millions of gp
    totalRemainingCost = totalRemainingCost/1000000;
    //Display the final result, in millions of gp
    $('#goalGpDisplay').html(totalRemainingCost.toFixed(2));
}

function ExpandSection(clickedSection){
    //Expands the section to show the customisation options
    //Get the name of the desired skill
    var clickedSectionId = clickedSection;
    //Remove the words, Final and Expander from the div ID
    var expandSectionName = clickedSectionId.replace("Expander", "");
    expandSectionName = expandSectionName.replace("Final", "");
    //Find the expandable section with the same name, and add a css class
    $( "#"+expandSectionName+"Expanded").toggleClass("expanded");
    $( "#"+expandSectionName +"Arrow").toggleClass("down");
}

function SubmitUsername(){
    //When the form is submitted, set the user val to the new username
    user = $('#usernameInput').val();
    //Refresh a bunch of things!
    //Pull the playerdata from the Jagex API if player was in db
    if(user != ""){PullFromJagex();}
    //Update all the dropdowns to match the current selections
    UpdateAllSkillDropdowns();
    //Update the custom fields to display the data that loaded
    UpdateAllSkillCustomisations();
    //Display the remaining hours of training for each skill
    DisplayAllRemainingHours();
    //Display current level and goal level
    DisplayAllLevels();
    //Display the remaining cost of training each skill
    DisplayAllRemainingCost();
}

function ChangeGoal(tabName){
    //This currentTab var is readabale globally, including by the skills object
    currentTab = tabName;
    UpdateAllSkillDropdowns();
    //Update the custom fields to display the data that loaded
    UpdateAllSkillCustomisations();
    //Display the remaining hours of training for each skill
    DisplayAllRemainingHours();
    //Display current level and goal level
    DisplayAllLevels();
    //Display the remaining cost of training each skill
    DisplayAllRemainingCost();
    
}

function ToggleBoosting(){
    var disableBoosting = true;
    //Can boosting be enabled on this tab?
    if(currentTab == "achievement" || currentTab == "quest"){
        //Yes to boosting
        disableBoosting = false;
    }
    skills.forEach(element => {
        $( "#"+element.name+"Boost").prop('disabled', disableBoosting);
    });

    

}

function ValidateBoost(div){
    div.classList.remove("redborder");
    var validInput = true;
    var input = div.value;
    console.log(input);
    if(isNaN(input)){
        //Input was not a number
        validInput = false;
    }
    if(validInput){
        if((input % 1 != 0)){
        //Input contained decimal places
        validInput = false;
        }
    }
    if(validInput){
        if(input < 0 || input > 5){
            validInput = false;
        }
    }
    if(!validInput){
        div.classList.add("redborder");
    }
}

function ValidateCustom(div){
    div.classList.remove("redborder");
    var validInput = true;
    var input = div.value;
    console.log(input);
    if(isNaN(input)){
        //Input was not a number
        validInput = false;
    }
    if(validInput){
        if((input % 1 != 0)){
        //Input contained decimal places
        validInput = false;
        }
    }
    if(validInput){
        if(input < 0 || input > 13000000){
            validInput = false;
        }
    }
    if(!validInput){
        div.classList.add("redborder");
    }
}

function ValidateCustomGp(div){
    div.classList.remove("redborder");
    var validInput = true;
    var input = div.value;
    console.log(input);
    if(isNaN(input)){
        //Input was not a number
        validInput = false;
    }
    if(validInput){
        if((input % 1 != 0)){
        //Input contained decimal places
        validInput = false;
        }
    }
    if(validInput){
        if(input < -1000 || input > 1000){
            validInput = false;
        }
    }
    if(!validInput){
        div.classList.add("redborder");
    }
}


