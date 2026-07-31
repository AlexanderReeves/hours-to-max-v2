//********Alexander Reeves, Hours To Max V3 Core JavaScript**********
//
// This file contains the core Javascript functions for the Hours To Max V3 website.
// This file loads user data, jagex data, and does calculations accordingly.
//
// V3 rewrite allows for multiple training methods per skill
//
//You can read the github logs to see how this code is being adapted and improved.
//**********************************************************************************

$.ajaxSetup({ //Prevent future code loading before previous code finishes.
    async: false
});

function ensureNotificationContainer() {
    if (document.getElementById('notification-container')) {
        return;
    }
    const container = document.createElement('div');
    container.id = 'notification-container';
    document.body.appendChild(container);
}

function showNotification(message, type = 'warning') {
    if (!document.body) {
        return;
    }

    ensureNotificationContainer();
    const container = document.getElementById('notification-container');
    const toast = document.createElement('div');
    toast.className = `notification-toast notification-${type}`;

    const messageEl = document.createElement('div');
    messageEl.className = 'notification-message';
    messageEl.textContent = String(message);
    toast.appendChild(messageEl);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'notification-close';
    closeButton.textContent = 'x';
    closeButton.onclick = function() {
        toast.remove();
    };
    toast.appendChild(closeButton);

    container.appendChild(toast);

    window.setTimeout(function() {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            window.setTimeout(function() {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 250);
        }
    }, 10000);
}

function hookConsoleWarningsToNotifications() {
    if (window.__warningsHookedToToasts) {
        return;
    }
    window.__warningsHookedToToasts = true;

    const originalWarn = console.warn ? console.warn.bind(console) : function() {};
    console.warn = function() {
        originalWarn.apply(console, arguments);
        try {
            const parts = [];
            for (let i = 0; i < arguments.length; i++) {
                const item = arguments[i];
                if (typeof item === 'string') {
                    parts.push(item);
                } else if (item && item.message) {
                    parts.push(item.message);
                } else {
                    parts.push(JSON.stringify(item));
                }
            }
            showNotification(parts.join(' '), 'warning');
        } catch (e) {
            showNotification('Warning detected.', 'warning');
        }
    };
}

hookConsoleWarningsToNotifications();

var skillNames =["attack","strength", "defence", "ranged", "prayer", "magic", "runecraft", "construction",
      "hitpoints", "agility", "herblore", "thieving", "crafting", "fletching", "hunter", "mining", "smithing", 
      "fishing", "cooking", "firemaking", "woodcutting", "sailing", "slayer", "farming"];

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
var MAX_STANDARD_TRAINING_METHODS = 32;
var capeImages = ["achievement_cape.webp", "Max_cape.webp", "custom_cape.webp", "quest_cape.webp"];
var currentCapeIndex = 1;
var currentCapeFileName = "Max_cape.webp";

var jagexPlayerSkillData = {};
// The array that will hold each saved training choice.
var userTrainingChoices = [];
//track how many of each skill have been loaded onto the screen (Rather than doing a slow) global page search
var skillCounters = {};

//The xp required for a maximum level in any skill
var ninetyNine = 13034431;

//Start reworking code into re-usable classes.
//Skills class contains an array of skills.
var skills = [];

var customLvlArray =[];

window.onload = function(){
    console.log("The page has loaded, running scripts...");
    //As soon as the page has finished loading, perform each task once.
    //Populate each training method dropdown with the available choices, which are stored in the trainingMethods array in training_methods.js
    InitialiseTrainingMethods();
    //Get all userdata from the database (training methods, username, settings, etc)
    PullFromDatabase();
    //Pull the playerdata from the Jagex API if player was in db
    if(user != ""){PullFromJagex();}
    //populate dropdowns
    PopulateRowsWithUserData(dbuser); //variable is true or false based on if db user was found. False will populate with default values.
    //Refresh All Calculations
    CalculateAndDisplayHoursAndCost();
    ShadeRows();
    InitialiseCapeRotation();
    Sort(false);
    UpdateChart();
}

function SetFinalCapeImage(fileName){
    if(!fileName){
        return;
    }
    currentCapeFileName = fileName;
    $('#finalCapeContainer').css('background-image', 'url("./icons/' + fileName + '")');
    if (typeof ApplyCapeTheme === 'function') {
        ApplyCapeTheme(fileName);
    }
}

function RotateFinalCapeImage(){
    currentCapeIndex = (currentCapeIndex + 1) % capeImages.length;
    SetFinalCapeImage(capeImages[currentCapeIndex]);
}

function InitialiseCapeRotation(){
    var container = document.getElementById('finalCapeContainer');
    if(!container){
        return;
    }

    if(capeImages.indexOf(currentCapeFileName) === -1){
        currentCapeFileName = "Max_cape.webp";
    }
    currentCapeIndex = capeImages.indexOf(currentCapeFileName);
    if(currentCapeIndex < 0){
        currentCapeIndex = 1;
    }

    SetFinalCapeImage(capeImages[currentCapeIndex]);
    $('#finalCapeContainer').off('click').on('click', RotateFinalCapeImage);
}

function InitialiseSkills(){
    //Initialise custom skill goals
    customLvlArray = {"attack": 70,"strength": 70, "defence": 70, "ranged": 70, "prayer": 70, "magic": 70, "runecraft": 70, "construction": 70,
      "hitpoints": 70, "agility": 70, "herblore": 70, "thieving": 70, "crafting": 70, "fletching": 70, "hunter": 70, "mining": 70, "smithing": 70, 
      "fishing": 70, "cooking": 70, "firemaking": 70, "woodcutting": 70, "sailing": 70, "slayer": 70, "farming": 70};
    //Default Custom Level Thing
    customLvlArray = UpdateCustomLevels([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,70,70,70,70,70], customLvlArray);
}

function CalculateAndDisplayHoursAndCost(){
//Refreshes all time calculations
    let totalProfit = 0;
    let totalHours = 0;
    let totalRemainingLevels = 0;
    let totalRemainingXp = 0;
    let totalRequiredXp = 0;
    let totalCompletedHours = 0;
    let totalRequiredHours = 0;
    console.log("Calculating total hours and cost for all rows, and then totalling.");

    //Track the highest goal per skill for completed-skill counting.
    let trackerMap = {};

    userTrainingChoices.forEach(choice => {
        const xpPerHour = Number(choice.xpPerHour) || 1;
        const startLevel = Number(choice.startLevel) || 1;
        const goalLevel = Number(choice.goalLevel) || 99;

        //Track required vs completed hours for this training method range.
        const trainingMethodStartXp = ConvertLevelToXp(startLevel);
        const trainingMethodEndXp = ConvertLevelToXp(goalLevel);
        const requiredXpForMethod = Math.max(0, trainingMethodEndXp - trainingMethodStartXp);
        const requiredHours = requiredXpForMethod / xpPerHour;
        totalRequiredHours = totalRequiredHours + requiredHours;

        let startXp = Number(choice.startXp) || 0;
        if(startXp > ninetyNine){startXp = ninetyNine;}
        if(startXp > trainingMethodEndXp){startXp = trainingMethodEndXp;}

        let completedXp = 0;
        if(startXp > trainingMethodStartXp){
            completedXp = startXp - trainingMethodStartXp;
        }
        const completedHours = completedXp / xpPerHour;
        totalCompletedHours = totalCompletedHours + completedHours;

        let remainingXp = trainingMethodEndXp - startXp;
        if(remainingXp < 0){remainingXp = 0;}
        totalRemainingXp = totalRemainingXp + remainingXp;
        totalRequiredXp = totalRequiredXp + trainingMethodEndXp;

        const remainingTime = remainingXp / xpPerHour;
        totalHours = totalHours + remainingTime;

        $(`[data-usertrainingchoiceid="${choice.rowId}"]`).find('.displayHours').text(
            completedHours.toFixed(0) + "/" + requiredHours.toFixed(0) + " = " + remainingTime.toFixed(0)
        );

        const profit = remainingXp * (Number(choice.profitPerXp) || 0);
        totalProfit = totalProfit + profit;
        const profitInMillions = profit / 1000000;
        $(`[data-usertrainingchoiceid="${choice.rowId}"]`).find('.displayProfit').text(profitInMillions.toFixed(0) + " Mil GP");

        const currentLevel = ConvertXpToLevel(startXp);
        let remainingLevels = goalLevel - currentLevel;
        if(remainingLevels < 0){ remainingLevels = 0;}
        totalRemainingLevels = totalRemainingLevels + remainingLevels;
        $(`[data-usertrainingchoiceid="${choice.rowId}"]`).find('.levelVsGoal').text(currentLevel + "/" + goalLevel);

        if (!trackerMap[choice.skill] || goalLevel > trackerMap[choice.skill].goalLevel) {
            trackerMap[choice.skill] = {
                skill: choice.skill,
                goalLevel: goalLevel,
                isCompleted: currentLevel >= goalLevel
            };
        }
    });

    const skillsCompletedTracker = Object.values(trackerMap);
    let completedCount = 0;
    $.each(skillsCompletedTracker, function(index, tracker) {
        if (tracker.isCompleted) {
            completedCount++;
        }
    });

    //If farming itself is at/above goal level, count it as completed.
    const farmingXp = jagexPlayerSkillData.farming && jagexPlayerSkillData.farming.xp != null ? jagexPlayerSkillData.farming.xp : 0;
    const farmingGoalInput = Number($(`#farming_1_CustomGoal`).val());
    const farmingGoalXp = ConvertLevelToXp(isNaN(farmingGoalInput) ? 99 : farmingGoalInput);
    if (farmingXp >= farmingGoalXp) {
        completedCount++;
    }

    let xpCompletedPercent = 0;
    xpCompletedPercent = totalRequiredXp > 0 ? (totalRemainingXp / totalRequiredXp) : 0;
    xpCompletedPercent = xpCompletedPercent * 100;
    xpCompletedPercent = (xpCompletedPercent - 100) * -1;
    xpCompletedPercent = xpCompletedPercent.toFixed(2);
    percentOfGoal = parseFloat(xpCompletedPercent);

    //Refresh farming displays and include farming profit in total profit.
    if (typeof DisplayFarmingResults === 'function') {
        DisplayFarmingResults();
    }
    if (typeof GetFarmingProfitPerRun === 'function') {
        totalProfit = totalProfit + GetFarmingProfitPerRun();
    }

    const totalProfitInMillions = totalProfit / 1000000;
    $(`#totalHoursDisplay`).text(totalHours.toFixed(0) + " Hrs");
    $(`#totalRemainingLevels`).text(totalRemainingLevels);
    $(`#totalXpCompleted`).text(xpCompletedPercent + "%");
    $(`#totalProfitDisplay`).text(totalProfitInMillions.toFixed(0) + " Mil GP");
    $(`#totalCompletedSkills`).text(completedCount.toFixed(0));
    $(`#totalCompletedHours`).text(totalCompletedHours.toFixed(0) + "/" + totalRequiredHours.toFixed(0));
    $(`#totalName`).text(user);

    $('#progressPercent').width($("#totalXpCompleted").text());
    $('#progressPercentText').text($("#totalXpCompleted").text());
    const remainingFarmRuns = $('#farmingRunsDisplay').text();
    $('#goalFarmDisplay').text(remainingFarmRuns || '?');

    //Estimate completion date from remaining hours and daily playtime.
    const hoursInput = document.getElementById('hoursPerDayInput');
    const hoursValue = hoursInput ? parseFloat(hoursInput.value) : NaN;
    const safeHoursPerDay = (!isNaN(hoursValue) && hoursValue > 0) ? hoursValue : 1;
    const daysToGoal = totalHours / safeHoursPerDay;
    const currentDate = new Date();
    const completionDate = new Date(currentDate.getTime() + (daysToGoal * 24 * 60 * 60 * 1000));
    $('#totalDateEstimate').html(completionDate.toDateString());

    ShadeRows();
    UpdateChart();

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
    //Assume no database user by default
    dbuser = false;
    //Request the user db data to load into page via jwt
    //Get the auth cookie to send to the server
    var authCode = $.cookie("authorization");
    //Don't run if an auth code is not in the cookie
    if(!authCode){
        console.log("No 'userid' value was found in the browser cookies. The website will not attempt to connect to the database.")
        console.log("Attempting to create rows with the default training methods...");
        //PopulateRowsWithUserData(false);
        return;
    }
    //Request all the user info from the server
    $.ajax({
        type: "POST",
        url: "/find/user",
        data: '&authCode=' + authCode, // serializes the form's elements
        success: function (data) {
            //Save all the downloaded user into the database user variable
            console.log("A valid user was found and their data has been retrieved from the database!");
            //dbuser now contains data about this user from the database, including their email, username, and all their saved choices and settings
            dbuser = data.user[0];
            console.log("Users database data:", data);
            //Save the new username to variable
            user = dbuser.username;
            //Insert the username into the search box on the page
            $('#usernameInput').val(user);
            // setTab(dbuser.currentGoal);

            if (dbuser.chosenCape && capeImages.indexOf(dbuser.chosenCape) !== -1) {
                currentCapeFileName = dbuser.chosenCape;
                currentCapeIndex = capeImages.indexOf(currentCapeFileName);
            }
            
        },
        error: function (XMLHttpRequest) {
            console.log('The database request returned errors. Resorting to default values.');
            jsonErrorMessage = XMLHttpRequest.responseJSON.error;
        }
    });
    //Poulate each row with user data, or defaults values if no db user was found
    if(dbuser){
        console.log("Attempting to create rows for this user with their saved data...");
        
        //Extra user selections to save after the rows are populated.
        // Set the sort choice (hours, gp, level, default)
        //If theres a sort choice found
        if (dbuser.sortChoice !== undefined) {
            //Get the button from the html
            const sortButton = document.getElementById('sortButton');
            //If button found
            if (sortButton) {
                //Map any legacy value into current sort states: default(0), hours(1), profit(2)
                let savedSortState = parseInt(dbuser.sortChoice);
                if (isNaN(savedSortState) || savedSortState < 0) {
                    savedSortState = 0;
                }
                if (savedSortState > 2) {
                    savedSortState = savedSortState === 3 ? 1 : 0;
                }

                //Set the state only; sorting is applied after all rows are populated
                sortButton.dataset.sortState = savedSortState;
            }
        }

        // Set the show completed choice
        if (dbuser.showCompletedChoice !== undefined) {
            window.showCompletedSkills = dbuser.showCompletedChoice;
            // Apply the show/hide without toggling
            ShowAndHideCompleted(false);
        }

        // // Set the custom levels
        // if (dbuser.customLevelsString) {
        //     const customLevels = dbuser.customLevelsString.split(',').map(Number);
        //     customLvlArray = UpdateCustomLevels(customLevels, customLvlArray);
        // }

        // Set the user's hours per day preference
        if (dbuser.hoursPerDay !== undefined && document.getElementById('hoursPerDayInput')) {
            document.getElementById('hoursPerDayInput').value = dbuser.hoursPerDay;
        }
    }
    return; // avoid to execute the actual submit of the form
}

function PullFromJagex(){
    //Empty variable for data pull
    var pulledJagexData = {};
    //Get whatever name is currently in the username box
    username = document.getElementById('usernameInput').value;
    console.log("Attempting to pull player data for " + username + " from Jagex.");
    //Cancel if no valid username is being searched
    if(!username){
        return false;
    }

    //Attempt to pull player from the Jagex API via server proxy
    $.getJSON("/lookup?player=" + encodeURIComponent(user), function(result) {
        // Clear the current skills data
        jagexPlayerSkillData = {};
        console.log("Data pulled from Jagex API:", result);
        
        $.each(result, function(pulledkey, field) {
            // Get the skills data from Jagex
            if(pulledkey != "name" && pulledkey != "activities"){
                // Store the skill data from jagex
                pulledJagexData = result;
            }
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        // This will execute if the request fails
        console.error("Failed to fetch player data:", textStatus, errorThrown);
        alert("Could not find player data. Please try again.");
    });

    //Loop each of the skills and save the information to jagexPlayerSkillData for later use.
    //Guard against failed/partial responses so we do not throw runtime errors.
    if (!pulledJagexData || !Array.isArray(pulledJagexData.skills)) {
        console.warn("Jagex response did not include a valid skills array. Skipping skill mapping.");
        return false;
    }

    for (let i = 0; i < pulledJagexData.skills.length; i++) {
        const pulledSkill = pulledJagexData.skills[i];
        if (!pulledSkill || pulledSkill.xp == null || !pulledSkill.name) {
            continue;
        }

        console.log("Pulled a skill");
        //Get the specific parts of data that are useful to us
        var pulledSkillName = pulledSkill.name.toLowerCase();
        var pulledSkillXp = pulledSkill.xp;
        var pulledSkillLevel = pulledSkill.level;
        //Apply the pulled data into the local skills
        jagexPlayerSkillData[pulledSkillName] = {
            xp: pulledSkillXp,
            level: pulledSkillLevel
        };
    }

    console.log("Player skill data extracted from Jagex response:", jagexPlayerSkillData);

}

function ToggleExpand(rowId){
    //Expand/collapse the details for the selected dynamic training row
    const targetId = parseInt(rowId);
    if (isNaN(targetId)) {
        return;
    }

    const $parentRow = $(`[data-userTrainingChoiceId="${targetId}"]`);
    if ($parentRow.length === 0) {
        return;
    }

    $parentRow.find('.rowDetails').slideToggle(200, "linear");
    $parentRow.find('.arrow').toggleClass('down');
}


function ExpandSection(clickedSection){
    //Expands the section to show the customisation options
    //Get the name of the desired skill from the clicked element ID (may include suffix number)
    var clickedSectionId = clickedSection;
    //Extract skill name and suffix number from IDs like "attackExpander1" or "attackFinal1"
    var match = clickedSectionId.match(/^([a-z]+)(?:Expander|Final)(\d*)$/);
    
    if (!match) {
        console.warn('Could not parse section ID for expansion:', clickedSectionId);
        return;
    }
    
    var skillName = match[1];
    var suffix = match[2] || '';
    
    //Find the expandable section with the same name and suffix, and add a css class
    $( "#"+skillName+"Expanded"+suffix).toggleClass("expanded");
    $( "#"+skillName+"Expanded"+suffix).toggleClass("hidden");
    $( "#"+skillName +"Arrow"+suffix).toggleClass("down");
}


function SubmitUsername(){
    //When the form is submitted, set the user val to the new username
    user = $('#usernameInput').val();
    //Refresh a bunch of things!
    //Pull the playerdata from the Jagex API if player was in db
    if(user != ""){PullFromJagex();}
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

 function ConvertLevelToXp(level){
    //Xp required to reach each level as array
    var levelToXpArray = [0, 0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973,
      4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406,
      24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
      111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599,
      407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443,
      1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776,
      4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431]
      //console.log("Goal level for " + this.name + ": " + this.GetGoalLevel());
    return levelToXpArray[level];

  }

function ConvertXpToLevel(xp){
    //Xp required to reach each level as array
    var levelToXpArray = [0, 0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973,
      4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406,
      24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
      111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599,
      407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443,
      1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776,
      4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431]

    for (var level = 1; level < levelToXpArray.length; level++) {
        if (xp < levelToXpArray[level]) {
            return level - 1;
        }
    }
    return 99;
  }





