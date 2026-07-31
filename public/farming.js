//Handles farming things

function DisplayFarmingSelections(farmingData) {
    //We've synced the farming choices with normal training method choices...
    //Seed choice is actually taken from the xpPerHour value, and numPatches is taken from the profitPerXp value.
    //Gets the farming selections that were pulled from the database, and populates the web page
    // console.log("Displaying farming selections on the page.");
    // console.log("Current farming selections :", farmingData);
    //Then unhides the farming section on the page
    $('#farmingContainer').removeClass('hidden');

    //Apply the choices to the dropdowns:
    if (farmingData && farmingData.xpPerHour !== undefined) {
        // xpPerHour stores seedChoice (0, 1, or 2), convert to dropdown value (1, 2, or 3)
        $('#seedDropdown').val(String(farmingData.xpPerHour + 1)).change();
    }
    
    if (farmingData && farmingData.profitPerXp !== undefined) {
        // profitPerXp stores numPatches (1-6)
        $('#patchesDropdown').val(String(farmingData.profitPerXp)).change();
    }
    
    // Apply start level
    if (farmingData && farmingData.startLevel !== undefined) {
        $('#farming_1_startLvl').val(farmingData.startLevel);
    }
    
    // Apply goal level
    if (farmingData && farmingData.goalLevel !== undefined) {
        $('#farming_1_CustomGoal').val(farmingData.goalLevel);
    }

    DisplayFarmingResults(farmingData); // Update calculations based on the selections    
}

function GetFarmingProfitPerRun(){
    //Get the current seed choice and number of patches from the dropdowns
    var seedChoice = parseInt($('#seedDropdown').val()) - 1;
    var numPatches = parseInt($('#patchesDropdown').val());

    var totalProfit = 0;

    var costPerSeed = 0;
    switch(seedChoice) {
        case 0:
            //Maple seed, 3357
            costPerSeed = -3357; 
            break;
        case 1:
            //Yew Seed
            costPerSeed = -20000; 
            break;
        case 2:
            //Magic Seed
            costPerSeed = 71000; 
            break;
    }

    var totalProfit = numPatches * costPerSeed; 
    return totalProfit;
}

function GetRemainingFarmingRuns(){
    //Get the current seed choice and number of patches from the dropdowns
    var seedChoice = parseInt($('#seedDropdown').val()) - 1;
    var numPatches = parseInt($('#patchesDropdown').val());
    var totalRemainingRuns = 0;
    
    //Get players live starting xp
    var startXp =  jagexPlayerSkillData["farming"].xp;
    // console.log("Player's current farming xp: " + startXp);

    //If the players start level to xp, is higher than their live current XP, use that instead.
    //The player wants to make calculations based on a chosen start level sometimes, rather than their actual xp.
    if(ConvertLevelToXp($('#farming_1_startLvl').val()) > startXp){
        startXp = ConvertLevelToXp($('#farming_1_startLvl').val());
    }

    var goalXp = ConvertLevelToXp($('#farming_1_CustomGoal').val());

    var xpPerRun = 0;
    var xpPerSeed = 0;
        switch(seedChoice) {
        case 0:
            //Maple seed, 3357
            xpPerSeed = 3403; 
            break;
        case 1:
            //Yew Seed
            xpPerSeed = 7071; 
            break;
        case 2:
            //Magic Seed
            xpPerSeed = 13768; 
            break;
    }

    var remainingXp = goalXp - startXp;
    if (remainingXp <= 0) {
        return 0; // No runs needed if the goal is already reached or exceeded
    }
    xpPerRun = xpPerSeed * numPatches;
    totalRemainingRuns = Math.ceil(remainingXp / xpPerRun);

    return totalRemainingRuns;
}


function DisplayFarmingResults(farmingData){
    //Get the current seed choice and number of patches from the dropdowns
    var seedChoice = parseInt($('#seedDropdown').val()) - 1;
    var numPatches = parseInt($('#patchesDropdown').val());
    // Perform calculations based on the selected values
    // Example calculation (replace with actual farming logic):
    var xpPerRun = seedChoice * numPatches;
    var totalProfit = GetFarmingProfitPerRun();
    totalProfit = totalProfit / 1000000; // Convert to millions for display
    // console.log("Xp Per Run:" + xpPerRun, ". Total Profit:" + totalProfit);
    $('#farmingCostDisplay').text(Math.abs(totalProfit.toFixed(0)) + " Mil Gp");
    var remainingRuns = GetRemainingFarmingRuns();
    $('#farmingRunsDisplay').text(remainingRuns + " runs");
    const farmingXp = jagexPlayerSkillData.farming && jagexPlayerSkillData.farming.xp != null ? jagexPlayerSkillData.farming.xp : 0;
    $('#farmingLevelDisplay').text(ConvertXpToLevel(farmingXp) + "/" + $('#farming_1_CustomGoal').val());
    
}