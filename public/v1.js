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
var jagexId = "";
var totalLevel = 32;

var percentOfGoal = 0;
var finalGoalXP = 0;

//The xp required for a maximum level in any skill
var ninetyNine = 13034431;

//Start reworking code into re-usable classes.
//Skills class contains an array of skills.
var skills = [];

var customLvlArray =[];

//When a dropdown input is selected, it's value is cleared so the dropdown can populate. Store the value to return it in case it's left blank
var storedDropdownText = "";


window.onload = function(){
    console.log("Page has loaded, running scripts...");
    //As soon as the page has finished loading, perform each task once.
    //Populate each training method dropdown with the available choices, which are stored in the trainingMethods array in training_methods.js
    InitialiseTrainingMethods();
    //Initialise the Runescape skills that each dropdown is based on
    //InitialiseSkills();
    //Override the values if there is anything stored in the db
    PullFromDatabase(); //This will also populate rows
    PopulateDropdowns();
    //Pull custom goals from the database
    //PullGoalsFromDatabse();
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
    //Sort according to the users last sort choice, or the default choice
    Sort(false);
    //Show or hide skills based on user choice
    ShowAndHideCompleted(false);
    console.log("FINAL SKILLS RECORD");
    console.log(skills);

    UpdateChart();
}

function InitialiseSkills(){
    //Initialise custom skill goals
    customLvlArray = {"attack": 70,"strength": 70, "defence": 70, "ranged": 70, "prayer": 70, "magic": 70, "runecraft": 70, "construction": 70,
      "hitpoints": 70, "agility": 70, "herblore": 70, "thieving": 70, "crafting": 70, "fletching": 70, "hunter": 70, "mining": 70, "smithing": 70, 
      "fishing": 70, "cooking": 70, "firemaking": 70, "woodcutting": 70, "sailing": 70, "slayer": 70, "farming": 70};
      
    customLvlArray = UpdateCustomLevels([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,70,70,70,70,70], customLvlArray);
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
    UpdateCustomGoalInputs();
}

function UpdateCustomGoalInputs(){
    Object.entries(customLvlArray).forEach(([skillName, goalLevel]) => {
        var input = document.getElementById(skillName + 'CustomGoal');
        if(input){
            input.value = goalLevel;
        }
    });
}

function GetHoursPerDayValue(){
    var input = document.getElementById('hoursPerDayInput');
    if(!input){
        return 1;
    }
    var value = parseFloat(input.value);
    if(isNaN(value) || value <= 0){
        return 1;
    }
    return value;
}

function ValidateHoursPerDay(input){
    if(!input){
        return;
    }
    var value = parseFloat(input.value);
    if(isNaN(value) || value <= 0){
        input.value = '';
    }
    DisplayAllRemainingHours();
}

function PullFromDatabase(){
    //Request the user db data to load into page via jwt
    //Get the auth cookie to send to the server
    var authCode = $.cookie("authorization");
    //Don't run if an auth code is not in the cookie
    if(!authCode){
        console.log("No 'userid' found in the browser cookies. Will not attempt to reach database ")
        console.log("Attempting to create rows with default data");
        PopulateRowsWithUserData(false);
        return;
    }
    //Request all the user info from the server
    $.ajax({
        type: "POST",
        url: "/find/user",
        data: '&authCode=' + authCode, // serializes the form's elements
        success: function (data) {
            //Save all the downloaded user into the database user variable
            console.log("A valid user was found! There data has been pulled from mongodb.");
            //dbuser now contains data about this user from the database, including their email, username, and all their saved choices and settings
            dbuser = data.user[0];
            console.log("Raw response from server:", data);
            //Save the new username to variable, and update it in searchbox
            user = dbuser.username;
            $('#usernameInput').val(user);
            setTab(dbuser.currentGoal);
            
        },
        error: function (XMLHttpRequest) {
            console.log('Submit returned errors');
            console.log('The auth cookies were invalid, will use default values for rows and settings');
            PopulateRowsWithUserData(false);
            jsonErrorMessage = XMLHttpRequest.responseJSON.error;
        }
    });
    //Poulate each row with user data, or defaults values if no db user was found
    if(dbuser){
        console.log("Attempting to create rows for this user with their saved data...");
        PopulateRowsWithUserData(true);
        //Extra user selections to save after the rows are populated.
        // Set the sort choice (hours, gp, level, default)
        //If theres a sort choice found
        if (dbuser.sortChoice !== undefined) {
            //Get the button from the html
            const sortButton = document.getElementById('sortButton');
            //If button found
            if (sortButton) {
                //Set the data state
                sortButton.dataset.sortState = dbuser.sortChoice;
                const sortOptions = ['Sorting by skill', 'Sorting by level', 'Sorting by cost', 'Sorting by hours'];
                sortButton.value = sortOptions[dbuser.sortChoice] || 'Sorting by skill';
                // Apply the sort without toggling
                Sort(false);
            }
        }

        // Set the show completed choice
        if (dbuser.showCompletedChoice !== undefined) {
            window.showCompletedSkills = dbuser.showCompletedChoice;
            // Apply the show/hide without toggling
            ShowAndHideCompleted(false);
        }

        // Set the custom levels
        if (dbuser.customLevelsString) {
            const customLevels = dbuser.customLevelsString.split(',').map(Number);
            customLvlArray = UpdateCustomLevels(customLevels, customLvlArray);
        }

        // Set the user's hours per day preference
        if (dbuser.hoursPerDay !== undefined && document.getElementById('hoursPerDayInput')) {
            document.getElementById('hoursPerDayInput').value = dbuser.hoursPerDay;
        }
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

    //Attempt to pull player from the Jagex API via server proxy
    $.getJSON("/lookup?player=" + encodeURIComponent(user), function(result) {
        console.log("HISCORE PULL IS");
        console.log(result);
        $.each(result, function(pulledkey, field) {
            //console.log(field + "TEST");
            //console.log(pulledkey);
            //console.log(result);
            //At some point, Jagex changed the Json returned, now there are 3 root values instead of 1 mega one.
            //Need to 
            if(pulledkey!= "name" && pulledkey != "activities"){
            //Jagex will return 24 items in an array, including the skills
        	for(let i = 0; i <25; i++) {
                
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
                            //console.log("IMPORTING SKILL INTO IT's OBJECT " + pulledSkillName);
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



// v3 Dropdown testing area

function filterFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("slayermyInput");
  const a = div.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
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

function SubmitNewCustomGoal(){
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
    //Display remaining hours
    $('#goalHoursDisplay').html(totalRemainingHours.toFixed(2));
    //Display completed hours as fraction
    $('#goalCompletedHours').html(hoursCompleted.toFixed(0) + "/" + totalHoursFromZero.toFixed(0));

    var percentOfGoal = hoursCompleted/totalHoursFromZero * 100;
    //percentCompleted = (Math.round(percentCompleted * 100) / 100).toFixed(2);
    document.getElementById("progressPercent").setAttribute("style","width:" + percentOfGoal + "%");
    $('#progressPercentText').html(percentOfGoal.toFixed(2) + "%");

    //Display an estimated completion date based on hours remaining and a set number of hours played per day
    var hoursPerDay = GetHoursPerDayValue();
    var daysToGoal = totalRemainingHours / hoursPerDay;
    var currentDate = new Date();
    var completionDate = new Date(currentDate.getTime() + (daysToGoal * 24 * 60 * 60 * 1000));
    var halfwayDate = new Date(currentDate.getTime() + (daysToGoal * 0.5 * 24 * 60 * 60 * 1000));
    $('#goalCompletedDateEstimate').html(completionDate.toDateString());
}

function DisplayAllLevels(){
    var completedSkills = 0
    var remainingTotalLevels = 0;
    finalGoalXP = 0;
    var remainingXp= 0;
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
        finalGoalXP += element.GetGoalXp();
        remainingXp += element.GetRemainingXP();
    });
    $('#goalRemainingLevels').html(remainingTotalLevels);
    $('#goalCompletedSkills').html(completedSkills + "/24");
    percentOfGoal = (finalGoalXP - remainingXp)/finalGoalXP * 100;
    $('#goalXpPercentage').html(percentOfGoal.toFixed(2) + "%");
    $('#goalName').html(user);

    //Calculate 
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
    //Show and hide completed skills based on user choice  
    ShowAndHideCompleted(false);
     //Sort the display of skills based on selection
    Sort(false);
}

function ChangeGoal(tabName){
    //This is essentially a refresh-all function, for non-databse related changes
    //This currentTab var is readabale globally, including by the skills object
    currentTab = tabName;
    RefreshAll(tabName);
    
}


function RefreshAll(tabName){
    //This is essentially a refresh-all function, for non-databse related changes
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
    //Show and hide completed skills based on user choice  
    ShowAndHideCompleted(false);
    //Sort the display of skills based on selection
    Sort(false);
    //Update the chart
    UpdateChart();
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

function UpdateCustomLevels(customLevels = null, targetArray = customLvlArray) {
    // If no custom levels provided, return the current array
    if (!customLevels) {
        return targetArray;
    }
    
    // Get the skill names in order from the target 
    const skillNames = Object.keys(targetArray);
    
    // Apply each level from the input array to the corresponding skill
    customLevels.forEach((level, index) => {
        if (index < skillNames.length) {
            targetArray[skillNames[index]] = level;
        }
    });
    
    return targetArray;
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
        if(input < 0 || input > 6){
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

function ValidateCustomGoal(div){
    div.classList.remove("redborder");
    var validInput = true;
    var input = div.value;
    if(isNaN(input)){
        // Input was not a number
        validInput = false;
    }
    if(validInput){
        if((input % 1 != 0)){
            // Input contained decimal places
            validInput = false;
        }
    }
    if(validInput){
        if(input < 1 || input > 99){
            validInput = false;
        }
    }
    if(!validInput){
        div.classList.add("redborder");
    } else {
        var skillName = div.id.replace('CustomGoal', '');
        if(skillName && customLvlArray.hasOwnProperty(skillName)){
            customLvlArray[skillName] = Number(input);
        }
        DisplayAllLevels();
        DisplayAllRemainingHours();
        DisplayAllRemainingCost();
        UpdateChart();
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





