window.addEventListener('load', function() {
    //The event listener waits for the page load event to complete
  });
  



function SaveChoicesToDatabase() {
    //Checks for valid auth code, gets that username, saves choices to database
    auth = $.cookie("authorization");
    if(auth){

        const chosenCapeValue = (typeof currentCapeFileName !== 'undefined' && currentCapeFileName)
            ? currentCapeFileName
            : 'Max_cape.webp';

        //If user is logged in, save choices to database
        console.log('Saving user selections to the database.');

        //Json Version NOT YET IN USE
        var jsonPostData = {
            auth: auth,
            username: user,
            currentGoal: (function(){
                const input = document.getElementById('goalNameInput');
                const goalValue = input ? String(input.value).trim() : '';
                return goalValue.length > 0 ? goalValue : 'max';
            })(),
            chosenCape: chosenCapeValue,
            sortChoice: (function(){
                const btn = document.getElementById('sortButton');
                const raw = btn ? btn.dataset.sortState : '0';
                const n = Number(raw);
                return Number.isInteger(n) ? n : 0;
            })(),
            showCompletedChoice: window.showCompletedSkills !== undefined ? Boolean(window.showCompletedSkills) : true,
            hoursPerDay: (function() {
                const hoursInput = document.getElementById('hoursPerDayInput');
                const value = hoursInput ? parseFloat(hoursInput.value) : NaN;
                return (isNaN(value) || value <= 0) ? 1 : value;
            })()
        };
        //console.log("Initial JSON data to post: ", jsonPostData);

        if (Array.isArray(userTrainingChoices) && userTrainingChoices.length > MAX_STANDARD_TRAINING_METHODS) {
            const errorMessage = `You may save a maximum of ${MAX_STANDARD_TRAINING_METHODS} training methods to keep the database running smoothly!`;
            console.warn(errorMessage);
            if (typeof showNotification === 'function') {
                showNotification(errorMessage, 'warning');
            }
            $("#result").html(errorMessage);
            $("#result").removeClass("success").addClass("fail");
            return;
        }

        // Build trainingMethods from the in-memory `userTrainingChoices` array
        // Only include the fields the server expects: name, xpPerHour, profitPerXp, skill
        const trainingMethodsToSave = Array.isArray(userTrainingChoices) ? userTrainingChoices.map(choice => {
            return {
                name: choice.name || 'Custom Method',
                xpPerHour: Number(choice.xpPerHour) >= 0 ? Number(choice.xpPerHour) : 0,
                profitPerXp: Number(choice.profitPerXp) || 0,
                skill: choice.skill || '',
                startLevel: Number(choice.startLevel) >= 1 && Number(choice.startLevel) <= 99 ? Number(choice.startLevel) : 1,
                goalLevel: Number(choice.goalLevel) >= 1 && Number(choice.goalLevel) <= 99 ? Number(choice.goalLevel) : 99
            };
        }).filter(m => m.skill && m.name && typeof m.xpPerHour === 'number' && m.xpPerHour >= 0 && m.startLevel >=1 && m.goalLevel >=1) : [];

        // Add farming data as a training method
        const farmingStartLevel = (function() {
            const input = document.getElementById('farming_1_startLvl');
            const value = input ? Number(input.value) : NaN;
            return value >= 1 && value <= 99 ? value : 1;
        })();

        const farmingGoalLevel = (function() {
            const input = document.getElementById('farming_1_CustomGoal');
            const value = input ? Number(input.value) : NaN;
            return value >= 1 && value <= 99 ? value : 99;
        })();

        const farmingSeedChoice = (function() {
            const dropdown = document.getElementById('seedDropdown');
            const value = dropdown ? Number(dropdown.value) : NaN;
            // Dropdown values are 1, 2, 3; convert to 0, 1, 2 for seedChoice index
            return value >= 1 && value <= 3 ? value - 1 : 0;
        })();

        const farmingNumPatches = (function() {
            const dropdown = document.getElementById('patchesDropdown');
            const value = dropdown ? Number(dropdown.value) : NaN;
            // Dropdown values are 1-6, which map directly to numPatches
            return value >= 1 && value <= 6 ? value : 5;
        })();

        const farmingMethod = {
            name: 'farming trees',
            skill: 'farming',
            xpPerHour: farmingSeedChoice,  // seedChoice stored in xpPerHour
            profitPerXp: farmingNumPatches,  // numPatches stored in profitPerXp
            startLevel: farmingStartLevel,
            goalLevel: farmingGoalLevel
        };

        trainingMethodsToSave.push(farmingMethod);

        console.log("Attempting to save the following choices (including farming):", trainingMethodsToSave);

        jsonPostData["trainingMethods"] = trainingMethodsToSave;
        console.log("Final JSON data to post: ", jsonPostData);



        //END NEW VERSION #########################################################


        console.log("Attemping to post this data string... " + jsonPostData);


        //AJAX POST TO BE UPDATED TO POST JSON INSTEAD OF STRINGIFYING IT FIRST
        //clear result message
        $.ajax({ 
            type: "POST",
            url: "/save/choices", 
            contentType: "application/json; charset=utf-8", // Tells the server you're sending JSON
            dataType: "json",                               // Tells jQuery you expect JSON back
            data: JSON.stringify(jsonPostData),             // Stringifies the payload object
            success: function (data) {
                console.log('Success');
                $("#result").html('Your choices were saved!');
                $("#result").removeClass("fail");
                $("#result").addClass("success");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('Submit returned errors');
                // Guard against responseJSON being undefined on crash
                var jsonErrorMessage = XMLHttpRequest.responseJSON ? XMLHttpRequest.responseJSON.error : "Unknown error";
                console.error('Save choices server response:', XMLHttpRequest.responseJSON || XMLHttpRequest.responseText || errorThrown);
                $("#result").html("An error occurred. One of your inputs may be invalid, or the server may be experiencing a problem. " + jsonErrorMessage + ".");
                $("#result").removeClass("success");
                $("#result").addClass("fail");
                return false;
            }
        });


    }else{
        //If user is not signed in, suggest they register.
        $("#result").html("Please register first before saving your choices! You can register in another tab and then return here so your current choices aren't lost.");
        $("#result").removeClass("success");
        $("#result").addClass("fail");
    }
}