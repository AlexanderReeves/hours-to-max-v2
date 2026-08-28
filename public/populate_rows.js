

// This function creates the saved training choice rows on the page.
function PopulateRowsWithUserData(userIsLoggedIn, clearExistingRows = false) {
// 1. Define the master list of default training choices so we can reference them in both places.
    const defaultTrainingChoices = [        
        {name: "Wacking Baddies", xpPerHour: 100000, profitPerXp: 0, skill: "attack", startLevel: 1, goalLevel: 98, startXp: 0},   
        {name: "Trained through Slayer", xpPerHour: 13000000, profitPerXp: 0, skill: "strength", startLevel: 1, goalLevel: 99, startXp: 0},        
        {name: "Trained through Slayer", xpPerHour: 13000000, profitPerXp: 0, skill: "defence", startLevel: 1, goalLevel: 99, startXp: 0},        
        {name: "Trained through Slayer", xpPerHour: 13000000, profitPerXp: 0, skill: "hitpoints", startLevel: 1, goalLevel: 99, startXp: 0},
        {name: "80kph Ironwood Trees", xpPerHour: 80000, profitPerXp: 1, skill: "woodcutting", startLevel: 1, goalLevel: 99, startXp: 0},
        {name: "95kph Boat Tele Astrals ", xpPerHour: 95000, profitPerXp: 20, skill: "runecraft", startLevel: 1, goalLevel: 99, startXp: 0},
        {name: "675kph Chinning Monkeys (grey)", xpPerHour: 675000, profitPerXp: 0, skill: "ranged", startLevel: 1, goalLevel: 99, startXp: 0}, 
        {name: "420kph Wyrm Bones Gilded", xpPerHour: 420000, profitPerXp: -5, skill: "prayer", startLevel: 1, goalLevel: 99, startXp: 0},
        {name: "175kph Stun Alching", xpPerHour: 175000, profitPerXp: 0, skill: "magic", startLevel: 1, goalLevel: 99, startXp: 0},   
        {name: "450kph Oak Larders", xpPerHour: 450000, profitPerXp: -8, skill: "construction", startLevel: 1, goalLevel: 99, startXp: 0},
        {name: "60kph Priffdinas", xpPerHour: 60000, profitPerXp: 0, skill: "agility", startLevel: 1, goalLevel: 99, startXp: 0},       
        {name: "380kph Ranging Potions", xpPerHour: 380000, profitPerXp: -8, skill: "herblore", startLevel: 1, goalLevel: 99, startXp: 0},   
        {name: "210kph Ardy Knights", xpPerHour: 210000, profitPerXp: 1, skill: "thieving", startLevel: 1, goalLevel: 99, startXp: 0},    
        {name: "250kph Blue Dhide Bodies", xpPerHour: 250000, profitPerXp: -3, skill: "crafting", startLevel: 1, goalLevel: 99, startXp: 0}, 
        {name: "2500kph Amethyst Darts", xpPerHour: 2500000, profitPerXp: -10, skill: "fletching", startLevel: 1, goalLevel: 99, startXp: 0},   
        {name: "140kph Red Chinchompas", xpPerHour: 140000, profitPerXp: 4, skill: "hunter", startLevel: 1, goalLevel: 99, startXp: 0},   
        {name: "70kph Gem Rocks", xpPerHour: 70000, profitPerXp: 10, skill: "mining", startLevel: 1, goalLevel: 99, startXp: 0},   
        {name: "350kph Blast Furnace Gold", xpPerHour: 350000, profitPerXp: -1, skill: "smithing", startLevel: 1, goalLevel: 99, startXp: 0}, 
        {name: "85kph Tempoross", xpPerHour: 85000, profitPerXp: 1, skill: "fishing", startLevel: 1, goalLevel: 99, startXp: 0},        
        {name: "450kph Summer Pie Spell", xpPerHour: 450000, profitPerXp: -1, skill: "cooking", startLevel: 1, goalLevel: 99, startXp: 0},  
        {name: "290kph Wintertodt", xpPerHour: 290000, profitPerXp: 0, skill: "firemaking", startLevel: 1, goalLevel: 99, startXp: 0},  
        {name: "110kph Priffdinas Port", xpPerHour: 110000, profitPerXp: 0, skill: "sailing", startLevel: 1, goalLevel: 99, startXp: 0},         
        {name: "35kph Medium intensity", xpPerHour: 35000, profitPerXp: 0, skill: "slayer", startLevel: 1, goalLevel: 99, startXp: 0}
    ];

    // List of all skills you want to ensure exist in the user's choices
    const allSkills = [
        "attack", "strength", "defence", "hitpoints", "ranged", "prayer", "magic",
        "woodcutting", "runecraft", "construction", "agility", "herblore", "thieving",
        "crafting", "fletching", "hunter", "mining", "smithing", "fishing", "cooking",
        "firemaking", "sailing", "slayer"
    ];

    // 1. Default to a deep copy of the default choices right off the bat
    userTrainingChoices = defaultTrainingChoices.map(choice => ({ ...choice }));

    // 2. Only override it if they are logged in AND have valid data
    if (userIsLoggedIn) {
        console.log("The user is logged in. Attempting to populate rows with data from the databse.");
        
        if (dbuser && Array.isArray(dbuser.chosenMethods)) {
            userTrainingChoices = dbuser.chosenMethods
                .filter(choice => choice.skill !== "farming")
                .map(choice => ({ ...choice })); 
                // Note: .slice() isn't needed here anymore because .filter() already creates a new array!
        }else {console.log("BIG ERROR: No valid chosenMethods found for the user, using defaults.");}
        //Would be good to have an error message here, though it will happen for all users on first time in new system
    } else {
        console.log("USER IS NOT LOGGED IN, USING DEFAULT VALUES");
    }

    // --- NEW FIX: Ensure every skill has at least one training choice ---
    allSkills.forEach(skillName => {
        // Check if user has ANY choices for this specific skill
        const hasSkillChoice = userTrainingChoices.some(choice => choice.skill === skillName);
        
        if (!hasSkillChoice) {
            console.log(`Missing choices for ${skillName}. Injecting defaults.`);
            // Find all default methods for this missing skill
            const skillDefaults = defaultTrainingChoices.filter(choice => choice.skill === skillName);
            
            // Push clones of the defaults into the user's choices
            skillDefaults.forEach(defaultChoice => {
                userTrainingChoices.push({ ...defaultChoice });
            });
        }
    });
    // ------------------------------------------------------------------

    console.log("FINALIZED USER TRAINING CHOICES:", userTrainingChoices);

    //Assign a random ID to each userTrainingChoice for identification and syncing with the HTML
    userTrainingChoices.forEach(choice => {
        // Insert the guaranteed unique ID
        choice.rowId = generateFreshId();
        if(!choice.goalLevel){
            choice.goalLevel = 99;
        }
        //If start level does not exist, set to 1.
        if(!choice.startLevel){
            choice.startLevel = 1;
        }
        // Keep the user's chosen start level as-is. The current XP will still be used for calculations.
        //console.log(jagexPlayerSkillData[choice.skill]);
        //Also add the current xp to the row, so all relevant information is available in that row
        if (typeof jagexPlayerSkillData !== 'undefined' && jagexPlayerSkillData[choice.skill] && jagexPlayerSkillData[choice.skill].xp != null) {
            choice.startXp = jagexPlayerSkillData[choice.skill].xp;
        }
    });


    //######### BUILD THE WEB PAGE LAYOUT#############
    //Create a template from the original. It contains each skill container. Skill Rows -> SkillContainer - >Trainingmethod
    const $template = $('#SkillContainerTemplate');

    //This is just building the basic web page
    skillNames.forEach(skill => {
        const $clone = $template.clone();
        // 1. Set a unique ID on the main wrapper element
        $clone.attr('id', `${skill}_container`);
        // 2. Find and update specific child elements using their class names
        
        $clone.find('#loadMethodHere').attr('id', `${skill}_loadMethodHere`);
        $clone.find('.training-method').attr('id', `method_${skill}`);
        $clone.find('.skill-title').attr('id', `title_${skill}`);
        $clone.appendTo('#loadSkillsHere');

    });
    // ##################################################

    userTrainingChoices.forEach(choice => {
        AddTrainingRow(choice.name, choice.xpPerHour, choice.profitPerXp, choice.skill, choice.startLevel ,choice.goalLevel, choice.rowId);
    });
    //Send in the first farming selection as a variable, or if not found, send undefined.
    DisplayFarmingSelections(dbuser?.chosenMethods?.find(choice => choice.skill === "farming"));
       
}

function generateFreshId(){
    let unusedRandomId;
    let isDuplicate = true;
    // Keep generating a new number until an unused one is found
    while (isDuplicate) {
        unusedRandomId = Math.floor(10000 + Math.random() * 90000);    
        isDuplicate = userTrainingChoices.some(item => item.rowId === unusedRandomId);
    }
    return unusedRandomId;
}

function AddTrainingRow(methodName, xpPerHour, profitPerXp, skillName, startLevel, goalLevel, randomId, animate){

    //COUNT EXISTING NUMBER OF ROWS WITH THAT SKILL
    if (!skillCounters[skillName]) {
        skillCounters[skillName] = 0;
    }
    skillCounters[skillName]++; 
    var occurrence = skillCounters[skillName]; // Store the current count

    //CLONE AND UPDATE TEMPLATE
    const $trainingTemplate = $('#TrainingMethodRow');
    //Copy the template
    var $trainingClone = $trainingTemplate.clone();
    $trainingClone.removeClass('hidden');

    //INSERT THE DATA INTO EACH RELEVANT SECTION
    $trainingClone.find('#trainingMethodSelector').val(methodName);
    $trainingClone.find('#CustomXp').val(xpPerHour);
    $trainingClone.find('#CustomXp').attr(`onChange`, `UpdateTrainingMethodSpecifics(${randomId}, "xpPerHour", this.value)`);
    $trainingClone.find('#CustomGp').val(profitPerXp);    
    $trainingClone.find('#CustomGp').attr(`onChange`, `UpdateTrainingMethodSpecifics(${randomId}, "profitPerXp", this.value)`);
    $trainingClone.find('#CustomGoal').val(goalLevel);      
    $trainingClone.find('#CustomGoal').attr(`onChange`, `UpdateTrainingMethodSpecifics(${randomId}, "goalLevel", this.value)`);
    $trainingClone.find('#startLvl').val(startLevel);
    $trainingClone.find('#startLvl').attr(`onChange`, `UpdateTrainingMethodSpecifics(${randomId}, "startLevel", this.value)`);
    
    $trainingClone.find('#LevelDisplay').val(`1/` + goalLevel);
    $trainingClone.find('.duplicateButton').attr(`onClick`, `DuplicateRow(${randomId})`);
    $trainingClone.find('.expandOnClick').attr(`onClick`, `ToggleExpand(${randomId})`);


    //Allow it to read input changes
    //The blur shouldn't cause updates... The update should occur when the method in the custom dropdown is clicked
    //$trainingClone.find('.trainingMethodSelector').attr(`onBlur`, `scheduleCloseTrainingMethodList(this); UpdateTrainingMethod(this, ${randomId})`);
    $trainingClone.find('.trainingMethodSelector').attr(`data-rowId`, `${randomId}`);

    $trainingClone.find('*').each(function(index, element) {
        // 1. Get and log the current ID (logs empty string if no ID exists)
        var currentId = this.id;
        // 2. Update the element (Example: assigning a unique sequential ID)
        if(currentId == "skillIcon"){
            $(this).attr("src", `icons/${skillName}_icon.webp`);
        }
        if(currentId == "CustomXp" || currentId == "LevelDisplay" || currentId == "trainingMethodSelector"
             ||currentId == "Hours"   ||currentId == "Cost" || currentId == "CustomGp" ||currentId == "CustomGoal" || currentId == "skillIcon"
             || currentId == "startLvl" || currentId == "skillFillDisplay" ){                
            var newId = skillName + "_" + occurrence + "_" + currentId;
            $(this).attr("id", newId);
        }
    });
    //UPDATE THE ID AND INSERT INTO WEB PAGE
    $trainingClone.attr('id', skillName+`_selection_`+ occurrence);
    //Apply the new
    $trainingClone.attr('data-userTrainingChoiceId', randomId);

    if(animate){
    // 1. Initially hide the clone so it starts with 0 height
    $trainingClone.hide();
    // 2. Prepend it to the start of the container
    $trainingClone.prependTo(`#${skillName}_loadMethodHere`);
    // 3. Smoothly reveal it to its natural height (400ms animation)
    $trainingClone.slideDown(400);
    }else{
    $trainingClone.prependTo(`#${skillName}_loadMethodHere`);
    }
}


function DuplicateRow(Original){
    if (userTrainingChoices.length >= MAX_STANDARD_TRAINING_METHODS) {
        const warningMessage = `Cannot add more than ${MAX_STANDARD_TRAINING_METHODS} training methods (limits keep the database size reasonable).`;
        console.warn(warningMessage);
        if (typeof showNotification === 'function') {
            showNotification(warningMessage, 'warning');
        }
        $("#result").html(`You have reached the maximum of ${MAX_STANDARD_TRAINING_METHODS} training methods.`);
        $("#result").removeClass("success").addClass("fail");
        return;
    }

    console.log(userTrainingChoices);
    //Find the values being copied from the array
    let originalRow = FindTrainingMethodById(Original);
    if (!originalRow) {
        console.error(`Unable to duplicate row ${Original}: source row not found.`);
        return;
    }
    console.log(Original);
    //Add a replica of that row into the array
    let newRowId = generateFreshId();
    userTrainingChoices.push({name: originalRow.name, xpPerHour: originalRow.xpPerHour, profitPerXp: originalRow.profitPerXp, skill: originalRow.skill, startLevel: originalRow.startLevel, goalLevel: originalRow.goalLevel,rowId:newRowId, startXp: originalRow.startXp}); 
    AddTrainingRow(originalRow.name, originalRow.xpPerHour, originalRow.profitPerXp, originalRow.skill, originalRow.startLevel, originalRow.goalLevel, newRowId, true);
    ShadeRows();
    CalculateAndDisplayHoursAndCost();
}

function FindTrainingMethodById(targetId) {
    //Finds a training method that matches the one in a row, returns the details of that method
    // Look through the array for an item with a matching rowId
    const foundMethod = userTrainingChoices.find(choice => choice.rowId === parseInt(targetId));
    if (foundMethod) {
        return foundMethod;
    } else {
        console.log(`Training method with ID ${targetId} not found.`);
        return null;
    }
}

function ShadeRows() {
    const showCompleted = window.showCompletedSkills !== undefined ? window.showCompletedSkills : true;

    $('[id*="_selection_"]').find('.row').css('background-color', '');
    $('[data-userTrainingChoiceId]').each(function(){
        $(this).show();
        $(this).find('.rowDetails').show();
    });

    const choicesCopy = [...userTrainingChoices];
    const highestLevelRowIds = [];
    const uniqueSkills = [...new Set(choicesCopy.map(item => item.skill))];
    uniqueSkills.forEach(skillName => {
        const skillRows = choicesCopy.filter(item => item.skill === skillName);
        if (skillRows.length > 0) {
            const maxLevel = Math.max(...skillRows.map(item => item.goalLevel));
            const highestRow = skillRows.find(item => item.goalLevel === maxLevel);
            if (highestRow && highestRow.rowId) {
                highestLevelRowIds.push(highestRow.rowId);
            }
        }
    });

    choicesCopy.forEach(choice => {
        const $rowWrapper = $(`[data-userTrainingChoiceId="${choice.rowId}"]`);
        if ($rowWrapper.length === 0) {
            return;
        }

        const isCompleted = typeof IsChoiceCompleted === 'function' ? IsChoiceCompleted(choice) : false;
        const shouldHide = isCompleted && !showCompleted;

        if (shouldHide) {
            $rowWrapper.hide();
            $rowWrapper.find('.rowDetails').hide();
            return;
        }

        $rowWrapper.show();
        $rowWrapper.find('.rowDetails').hide();

        if (!highestLevelRowIds.includes(choice.rowId)) {
            $rowWrapper.find('.row').addClass('child-row');       
            $rowWrapper.find('.duplicateButton').val(`-`);         
            $rowWrapper.find('.duplicateButton').attr(`onClick`, `DeleteRow(${choice.rowId})`); 
        }

        if(choice.goalLevel <= choice.startLevel && jagexPlayerSkillData[choice.skill] && jagexPlayerSkillData[choice.skill].level >= choice.startLevel){
            // $rowWrapper.find('.row').css('background-color', '#d9eedd'); 
        }
        if(jagexPlayerSkillData[choice.skill] && jagexPlayerSkillData[choice.skill].xp >= ConvertLevelToXp(choice.goalLevel)){
            // $rowWrapper.find('.row').css('background-color', '#d9eedd'); 
        }

        //Fill the coloured bar behind the training method selector to show % of this goal completed
        const fillStartXp = ConvertLevelToXp(Number(choice.startLevel) || 1);
        const fillGoalXp = ConvertLevelToXp(Number(choice.goalLevel) || 99);
        const fillCurrentXp = Number(choice.startXp) || 0;
        const fillRequiredXp = fillGoalXp - fillStartXp;
        let fillPercent = fillRequiredXp > 0 ? ((fillCurrentXp - fillStartXp) / fillRequiredXp) * 100 : 100;
        fillPercent = Math.min(100, Math.max(0, fillPercent));
        $rowWrapper.find('.skillFillDisplay').css('width', `${fillPercent}%`);
    });

    //Also show hide farming
    //If farming current > farming goal
    const farmingXp = jagexPlayerSkillData.farming && jagexPlayerSkillData.farming.xp != null ? jagexPlayerSkillData.farming.xp : 0;
    //Goal completed
    if( (farmingXp >= ConvertLevelToXp($('#farming_1_CustomGoal').val()))){

        if(!showCompleted){
            console.log("Farming goal achieved and hidden");
            $('#farmingRow').hide();
        }else{
            console.log("Farming goal achieved and hidden");
            $('#farmingRow').show();
            // $('#farmingRow').css('background-color', '#d9eedd');
        }

    }else{
            $('#farmingRow').show();            
            $('#farmingRow').css('background-color', '#ffffff');
            console.log("Farming goal not achieved");
    }
}



function DeleteRow(rowId) {
    // 1. Convert rowId to a number just in case it was passed as a string
    const targetId = parseInt(rowId);
    // 2. FIX: Updated selector to look for 'data-userTrainingChoiceId' to match your setup loop
    const $rowToDelete = $(`[data-userTrainingChoiceId="${targetId}"]`);
    if ($rowToDelete.length > 0) {
        // Smoothly shrink the row's height to 0 before dropping it from the DOM completely
        $rowToDelete.slideUp(400, function() {
            $(this).remove();
            
            // Re-run your shade calculations right after deletion so the remaining rows re-color correctly
            ShadeRows();
        });
    } else {
        console.log(`Could not find HTML element with data-userTrainingChoiceId="${targetId}"`);
    }
    // 3. Remove the data object from your main JavaScript tracking array
    userTrainingChoices = userTrainingChoices.filter(item => item.rowId !== targetId);
    CalculateAndDisplayHoursAndCost();
}

