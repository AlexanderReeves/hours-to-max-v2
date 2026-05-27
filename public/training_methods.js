function InitialiseTrainingMethods() {

    trainingMethods = [];
    trainingMethods.push({name: "80kph Ironwood Trees", xpPerHour: 80000, profitPerXp: 1, skill: "woodcutting"});    
    trainingMethods.push({name: "95kph Sulliuscep Trees", xpPerHour: 95000, profitPerXp: 0, skill: "woodcutting"});    
    trainingMethods.push({name: "95kph Boat Tele Astrals ", xpPerHour: 95000, profitPerXp: 20, skill: "runecraft"});

}

function PopulateDropdowns() {
    console.log("Populating dropdowns with training methods...");
        // 1. Find all datalists and loop through them
        $("datalist").each(function(index, item) {
            //Get list name
            var currentDataListToPopulate= this.id.replace("trainingMethods", "");
            const $thisList = $(this);
            // Optional: Clear existing options
            $thisList.empty(); 
            
            // 2. Append new options dynamically
            $.each(trainingMethods, function(index, item) {                    
                if (item.skill == currentDataListToPopulate) {
                    $thisList.append($("<option value='" + item.name + "'>"));
                }
            });
        });

}

function UpdateTrainingMethod(dropdown) {

    //Get the text selection
    var selectedMethodName = dropdown.value;
    console.log("Selected method name: ", selectedMethodName);
    //If it is empty or null, return the previous stored value. If the previous value is also empty, set it to "Custom Method"
    if(selectedMethodName == null || selectedMethodName == undefined || selectedMethodName.trim() === "") {
        dropdown.value = storedDropdownText;
        selectedMethodName = storedDropdownText;
        if(dropdown.value == null || dropdown.value == undefined || dropdown.value.trim() === "") {
            dropdown.value = "Custom Method";
        }
    }

    //Get the name of the skill, then get details of training method
    const skillName = dropdown.id.replace("trainingMethodSelector", "");
    //Find the matching training method from the array based on the text of the selected option and the skill it belongs to
    const selectedMethod = trainingMethods.find(method => method.name === selectedMethodName && method.skill === skillName);
    //log the details of the selected method (or undefined if no match was found)
    console.log("Selected method details: ", selectedMethod);

    //If no match is found... open the custom training section
    if(selectedMethod == null || selectedMethod == undefined) {
        console.error("Selected training method does not match a known method. Custom skill editor was opened.");
            $( "#"+skillName+"Expanded").addClass("expanded");
            $( "#"+skillName +"Arrow").addClass("down");
    }



}