function InitialiseTrainingMethods() {
    //Populate trainingMethods array with all training Methods to be used in dropdowns.
    trainingMethods = [];
        
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "attack"});
    trainingMethods.push({name: "Trained through Slayer", xpPerHour: -1, profitPerXp: 0, skill: "attack"})        
    trainingMethods.push({name: "75kph Gemstone Crab", xpPerHour: 75000, profitPerXp: 0, skill: "attack"});
         
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "strength"});
    trainingMethods.push({name: "Trained through Slayer", xpPerHour: -1, profitPerXp: 0, skill: "strength"});        
    trainingMethods.push({name: "75kph Gemstone Crab", xpPerHour: 75000, profitPerXp: 0, skill: "strength"});
     
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "defence"});
    trainingMethods.push({name: "Trained through Slayer", xpPerHour: -1, profitPerXp: 0, skill: "defence"});        
    trainingMethods.push({name: "70kph Gemstone Crab", xpPerHour: 70000, profitPerXp: 0, skill: "defence"});

    
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "ranged"});
    trainingMethods.push({name: "Trained through Slayer", xpPerHour: -1, profitPerXp: 0, skill: "ranged"});        
    trainingMethods.push({name: "70kph Gemstone Crab", xpPerHour: 70000, profitPerXp: 0, skill: "ranged"});        
    trainingMethods.push({name: "90kph Cannon Ice Trolls", xpPerHour: 90000, profitPerXp: 0, skill: "ranged"});        
    trainingMethods.push({name: "130kph Pest Control", xpPerHour: 130000, profitPerXp: 0, skill: "ranged"});        
    trainingMethods.push({name: "140kph NMZ Venator Bow", xpPerHour: 140000, profitPerXp: 0, skill: "ranged"});        
    trainingMethods.push({name: "675kph Chinning Monkeys (grey)", xpPerHour: 675000, profitPerXp: 0, skill: "ranged"});        
    trainingMethods.push({name: "710kph Chinning Monkeys (red)", xpPerHour: 710000, profitPerXp: 0, skill: "ranged"});        
    trainingMethods.push({name: "850kph Chinning Monkeys (black)", xpPerHour: 850000, profitPerXp: 0, skill: "ranged"});

         
    trainingMethods.push({name: "40kph Bones at Gilded Altar", xpPerHour: 40000, profitPerXp: -2, skill: "prayer"});     
    trainingMethods.push({name: "30kph Bones at Chaos Altar", xpPerHour: 30000, profitPerXp: -2, skill: "prayer"});     
    trainingMethods.push({name: "105kph Giant Bones Chaos", xpPerHour: 105000, profitPerXp: -3, skill: "prayer"});     
    trainingMethods.push({name: "133kph Giant Bones Gilded", xpPerHour: 133000, profitPerXp: -4, skill: "prayer"});     
    trainingMethods.push({name: "210kph Babydragon Bones Chaos", xpPerHour: 210000, profitPerXp: -4, skill: "prayer"});     
    trainingMethods.push({name: "260kph Babydragon Bones Gilded", xpPerHour: 260000, profitPerXp: -8, skill: "prayer"});     
    trainingMethods.push({name: "350kph Wyrm Bones Chaos", xpPerHour: 350000, profitPerXp: -10, skill: "prayer"});     
    trainingMethods.push({name: "420kph Wyrm Bones Gilded", xpPerHour: 420000, profitPerXp: -5, skill: "prayer"});     
    trainingMethods.push({name: "690kph Lava Dragon Bones Chaos", xpPerHour: 690000, profitPerXp: -17, skill: "prayer"});     
    trainingMethods.push({name: "590kph Babydragon Bones Gilded", xpPerHour: 590000, profitPerXp: -8, skill: "prayer"});

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "magic"});
    trainingMethods.push({name: "75kph High Level Alchemy", xpPerHour: 75000, profitPerXp: 10, skill: "magic"});        
    trainingMethods.push({name: "150kph Cast Plank Make", xpPerHour: 150000, profitPerXp: 4, skill: "magic"});
    trainingMethods.push({name: "150kph String Jewellery", xpPerHour: 150000, profitPerXp: 1, skill: "magic"});
    trainingMethods.push({name: "175kph Stun Alching", xpPerHour: 175000, profitPerXp: 0, skill: "magic"});        
    trainingMethods.push({name: "350kph Ice Barrage Monkeys", xpPerHour: 350000, profitPerXp: 4, skill: "magic"});

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "magic"});
    trainingMethods.push({name: "38kph", xpPerHour: 38000, profitPerXp: 10, skill: "magic"});        
    trainingMethods.push({name: "150kph Cast Plank Make", xpPerHour: 150000, profitPerXp: 4, skill: "magic"});
    trainingMethods.push({name: "150kph String Jewellery", xpPerHour: 150000, profitPerXp: 1, skill: "magic"});
    trainingMethods.push({name: "175kph Stun Alching", xpPerHour: 175000, profitPerXp: 0, skill: "magic"});        
    trainingMethods.push({name: "350kph Ice Barrage Monkeys", xpPerHour: 350000, profitPerXp: 4, skill: "magic"});

    trainingMethods.push({name: "Trained Passively Via Combat", xpPerHour: -1, profitPerXp: 0, skill: "hitpoints"});    
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "hitpoints"});

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