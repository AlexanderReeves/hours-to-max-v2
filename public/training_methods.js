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

        
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "runecraft"});
    trainingMethods.push({name: "40kph Blood Runes", xpPerHour: 40000, profitPerXp: 58, skill: "runecraft"});
    trainingMethods.push({name: "60kph Lava Runes", xpPerHour: 60000, profitPerXp: 3, skill: "runecraft"});
    trainingMethods.push({name: "65kph Guardians of the Rift", xpPerHour: 65000, profitPerXp: 5, skill: "runecraft"});
    trainingMethods.push({name: "65kph Ourania Altar", xpPerHour: 65000, profitPerXp: 5, skill: "runecraft"});
    trainingMethods.push({name: "65kph Boat Tele Astrals", xpPerHour: 65000, profitPerXp: 30, skill: "runecraft"});
    trainingMethods.push({name: "65kph Ach Diary Natures", xpPerHour: 65000, profitPerXp: 30, skill: "runecraft"});
    trainingMethods.push({name: "65kph Arceeus Library", xpPerHour: 65000, profitPerXp: 0, skill: "runecraft"});
    trainingMethods.push({name: "85kph Steam Runes", xpPerHour: 85000, profitPerXp: 20, skill: "runecraft"});
    trainingMethods.push({name: "260kph Paid Lava Runners", xpPerHour: 260000, profitPerXp: -172, skill: "runecraft"});

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "construction"});
    trainingMethods.push({name: "200kph Mahogany Homes", xpPerHour: 200000, profitPerXp: -2, skill: "construction"});
    trainingMethods.push({name: "400kph Mythical Capes", xpPerHour: 400000, profitPerXp: -7, skill: "construction"});
    trainingMethods.push({name: "450kph Oak Larders", xpPerHour: 450000, profitPerXp: -8, skill: "construction"});
    trainingMethods.push({name: "500kph Oak Dungeon Doors", xpPerHour: 500000, profitPerXp: -8, skill: "construction"});
    trainingMethods.push({name: "600kph Teak Benches", xpPerHour: 600000, profitPerXp: -10, skill: "construction"});
    trainingMethods.push({name: "450kph Oak Larders", xpPerHour: 450000, profitPerXp: -8, skill: "construction"});
    trainingMethods.push({name: "800kph Mahogany Tables", xpPerHour: 800000, profitPerXp: -15, skill: "construction"});
    trainingMethods.push({name: "950kph Gnome Benches", xpPerHour: 950000, profitPerXp: -15, skill: "construction"});

    trainingMethods.push({name: "Trained Passively Via Combat", xpPerHour: -1, profitPerXp: 0, skill: "hitpoints"});    
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "hitpoints"});

        
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "agility"}); 
    trainingMethods.push({name: "40kph Collosal Wyrm", xpPerHour: 40000, profitPerXp: 0, skill: "agility"});
    trainingMethods.push({name: "45kph Seers Rooftop", xpPerHour: 45000, profitPerXp: 0, skill: "agility"}); 
    trainingMethods.push({name: "50kph Pollivneach Rooftop", xpPerHour: 50000, profitPerXp: 0, skill: "agility"}); 
    trainingMethods.push({name: "55kph Seers Rooftop Diary", xpPerHour: 55000, profitPerXp: 0, skill: "agility"}); 
    trainingMethods.push({name: "60kph Rellekka Rooftop", xpPerHour: 60000, profitPerXp: 0, skill: "agility"});
    trainingMethods.push({name: "60kph Priffdinas", xpPerHour: 60000, profitPerXp: 0, skill: "agility"}); 
    trainingMethods.push({name: "65kph Ardougne Rooftop", xpPerHour: 65000, profitPerXp: 0, skill: "agility"});    
    trainingMethods.push({name: "90kph Hallowed Sepulchre", xpPerHour: 90000, profitPerXp: 1, skill: "agility"}); 

    
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "herblore"});
    trainingMethods.push({name: "25kph Clean Guam Leaf", xpPerHour: 25000, profitPerXp: 20, skill: "herblore"});
    trainingMethods.push({name: "80kph Clean Toadflax", xpPerHour: 80000, profitPerXp: 5, skill: "herblore"});
    trainingMethods.push({name: "100kph Mastering Mixology", xpPerHour: 100000, profitPerXp: 3, skill: "herblore"});//Guessesed price
    trainingMethods.push({name: "200kph Prayer Potions", xpPerHour: 200000, profitPerXp: -2, skill: "herblore"});
    trainingMethods.push({name: "200kph Prayer Potions", xpPerHour: 200000, profitPerXp: -2, skill: "herblore"});       
    trainingMethods.push({name: "380kph Ranging Potions", xpPerHour: 380000, profitPerXp: -8, skill: "herblore"});    
    trainingMethods.push({name: "420kph Saradomin Brew", xpPerHour: 420000, profitPerXp: -13, skill: "herblore"});    
    trainingMethods.push({name: "500kph Armadyl Brew", xpPerHour: 500000, profitPerXp: -15, skill: "herblore"});

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "thieving"});
    trainingMethods.push({name: "20kph Bakery Stalls", xpPerHour: 20000, profitPerXp: 0, skill: "thieving"}); 
    trainingMethods.push({name: "50kph Aldarin Chests", xpPerHour: 50000, profitPerXp: 1, skill: "thieving"});
    trainingMethods.push({name: "90kph Stealing Valuables", xpPerHour: 90000, profitPerXp: 1, skill: "thieving"});  
    trainingMethods.push({name: "100kph Blackjacking", xpPerHour: 100000, profitPerXp: 5, skill: "thieving"});
    trainingMethods.push({name: "190kph Pyramid Plunder", xpPerHour: 190000, profitPerXp: 4, skill: "thieving"}); //citation needed
    trainingMethods.push({name: "200kph Stealing Artefacts", xpPerHour: 200000, profitPerXp: 5, skill: "thieving"});
    trainingMethods.push({name: "210kph Ardy Knights", xpPerHour: 210000, profitPerXp: 1, skill: "thieving"});  
    trainingMethods.push({name: "250kph Rogues Castle", xpPerHour: 250000, profitPerXp: 10, skill: "thieving"});    

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "crafting"});
    trainingMethods.push({name: "110kph Cutting Sapphires", xpPerHour: 110000, profitPerXp: 0, skill: "crafting"}); 
    trainingMethods.push({name: "200 kph cutting Rubies", xpPerHour: 200000, profitPerXp: -5, skill: "crafting"}); 
    trainingMethods.push({name: "250kph Cutting Diamonds", xpPerHour: 250000, profitPerXp: -11, skill: "crafting"}); 
    trainingMethods.push({name: "250kph Blue Dhide Bodies", xpPerHour: 250000, profitPerXp: -3, skill: "crafting"}); 
    trainingMethods.push({name: "350kph Red Dhide Bodies", xpPerHour: 350000, profitPerXp: -6, skill: "crafting"}); 

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "fletching"});
    trainingMethods.push({name: "80kph Vale Totems", xpPerHour: 80000, profitPerXp: 0, skill: "fletching"}); 
    trainingMethods.push({name: "600kph Amethyst Arrows", xpPerHour: 600000, profitPerXp: -2, skill: "fletching"}); 
    trainingMethods.push({name: "1700kph Dragon Bolts", xpPerHour: 1700000, profitPerXp: 0, skill: "fletching"}); 
    trainingMethods.push({name: "1800kph Mithril Darts", xpPerHour: 1800000, profitPerXp: -9, skill: "fletching"});    
    trainingMethods.push({name: "2500kph Amethyst Darts", xpPerHour: 2500000, profitPerXp: -10, skill: "fletching"});    
    trainingMethods.push({name: "3000kph Dragon Darts", xpPerHour: 3000000, profitPerXp: -12, skill: "fletching"}); 

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "hunter"});
    trainingMethods.push({name: "80kph Falconry", xpPerHour: 80000, profitPerXp: 0, skill: "hunter"});
    trainingMethods.push({name: "160kph Herbiboar", xpPerHour: 160000, profitPerXp: 2, skill: "hunter"});  
    trainingMethods.push({name: "140kph Rainbow Crabs", xpPerHour: 140000, profitPerXp: 4, skill: "hunter"});
    trainingMethods.push({name: "140kph Red Chinchompas", xpPerHour: 140000, profitPerXp: 4, skill: "hunter"});      
    trainingMethods.push({name: "200kph Black Chinchompas", xpPerHour: 200000, profitPerXp: 9, skill: "hunter"}); 
    trainingMethods.push({name: "220kph Hunters Rumours", xpPerHour: 220000, profitPerXp: 2, skill: "hunter"});
    


    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "mining"});
    trainingMethods.push({name: "30kph Crashed Stars", xpPerHour: 30000, profitPerXp: 0, skill: "mining"});
    trainingMethods.push({name: "50kph Iron Ore", xpPerHour: 50000, profitPerXp: 0, skill: "mining"});
    trainingMethods.push({name: "70kph Gem Rocks", xpPerHour: 70000, profitPerXp: 10, skill: "mining"});
    trainingMethods.push({name: "80kph Volcanic Mine", xpPerHour: 80000, profitPerXp: 3, skill: "mining"});
    trainingMethods.push({name: "80kph Zalcano", xpPerHour: 80000, profitPerXp: 2, skill: "mining"});
    trainingMethods.push({name: "110kph Granite Tick Manip", xpPerHour: 110000, profitPerXp: 0, skill: "mining"});

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "smithing"});
    trainingMethods.push({name: "200kph Smithing Training", xpPerHour: 200000, profitPerXp: 1, skill: "smithing"});    
    trainingMethods.push({name: "250kph Addy Plate Smithing", xpPerHour: 250000, profitPerXp: -1, skill: "smithing"});    
    trainingMethods.push({name: "350kph Blast Furnace Gold", xpPerHour: 350000, profitPerXp: -1, skill: "smithing"}); 

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "fishing"});
    trainingMethods.push({name: "40kph Dark Crabs", xpPerHour: 40000, profitPerXp: 0, skill: "fishing"});
    trainingMethods.push({name: "80kph Fly Fishing", xpPerHour: 80000, profitPerXp: 0, skill: "fishing"});
    trainingMethods.push({name: "85kph Tempoross", xpPerHour: 85000, profitPerXp: 1, skill: "fishing"});    
    trainingMethods.push({name: "95kph Driftnet Fishing", xpPerHour: 95000, profitPerXp: 0, skill: "fishing"}); 
    trainingMethods.push({name: "120kph 2 Tick Tuna", xpPerHour: 120000, profitPerXp: 0, skill: "fishing"}); 

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "cooking"});
    trainingMethods.push({name: "150kph Lobsters", xpPerHour: 150000, profitPerXp: 0, skill: "cooking"});    
    trainingMethods.push({name: "250kph Karambwan", xpPerHour: 250000, profitPerXp: 0, skill: "cooking"});     
    trainingMethods.push({name: "300kph Anglerfish", xpPerHour: 300000, profitPerXp: 0, skill: "cooking"});    
    trainingMethods.push({name: "450kph Summer Pie Spell", xpPerHour: 450000, profitPerXp: -1, skill: "cooking"});     
    trainingMethods.push({name: "900kph 1 Tick Karamb", xpPerHour: 900000, profitPerXp: 0, skill: "cooking"});  


    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "firemaking"});
    trainingMethods.push({name: "250kph Mahogany", xpPerHour: 250000, profitPerXp: 1, skill: "firemaking"});    
    trainingMethods.push({name: "290kph Wintertodt", xpPerHour: 290000, profitPerXp: 0, skill: "firemaking"});   
    trainingMethods.push({name: "400kph Magic", xpPerHour: 400000, profitPerXp: 0, skill: "firemaking"});  
    trainingMethods.push({name: "290kph Wintertodt", xpPerHour: 290000, profitPerXp: 0, skill: "firemaking"});  
    trainingMethods.push({name: "450kph Redwood", xpPerHour: 450000, profitPerXp: 0, skill: "firemaking"});

    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "woodcutting"});
    trainingMethods.push({name: "70kph Redwood", xpPerHour: 70000, profitPerXp: 1, skill: "woodcutting"});  
    trainingMethods.push({name: "80kph Ironwood Trees", xpPerHour: 80000, profitPerXp: 1, skill: "woodcutting"});    
    trainingMethods.push({name: "95kph Sulliuscep Trees", xpPerHour: 95000, profitPerXp: 0, skill: "woodcutting"}); 

    
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "sailing"});    
    trainingMethods.push({name: "22kph Tempor Tantrum", xpPerHour: 22000, profitPerXp: 0, skill: "sailing"});  
    trainingMethods.push({name: "80kph Salaving", xpPerHour: 80000, profitPerXp: 0, skill: "sailing"}); 
    trainingMethods.push({name: "80kph Jubbly Jive", xpPerHour: 80000, profitPerXp: 0, skill: "sailing"});  
    trainingMethods.push({name: "110kph Priffdinas Port", xpPerHour: 110000, profitPerXp: 0, skill: "sailing"});      
    trainingMethods.push({name: "220kph Gwineth Glide", xpPerHour: 220000, profitPerXp: 0, skill: "sailing"}); 

        
    trainingMethods.push({name: "Custom Method", xpPerHour: 100000, profitPerXp: 0, skill: "slayer"});    
    trainingMethods.push({name: "20kph Low intensity", xpPerHour: 20000, profitPerXp: 0, skill: "slayer"});  
    trainingMethods.push({name: "35kph Medium intensity", xpPerHour: 35000, profitPerXp: 0, skill: "slayer"});    
    trainingMethods.push({name: "50kph High intensity", xpPerHour: 60000, profitPerXp: 0, skill: "slayer"});    
    trainingMethods.push({name: "70kph Woooahhhhhh", xpPerHour: 70000, profitPerXp: 0, skill: "slayer"}); 


}

function parseTrainingMethodSelectorId(id) {
    //Some AI Overkill, it should probably just get the skill name, or the rowID or something.
    // Matches: 1) rawSkillName, 2) optional index, 3) the literal string
    const matcher = id.match(/^(.*?)(?:_(\d+))?_?trainingMethodSelector$/);
    if (!matcher) {
        // Fallback if the string doesn't end with trainingMethodSelector at all
        const rawSkillName = id.replace(/_?trainingMethodSelector$/, '');
        return {
            rawSkillName,
            rowIdPrefix: rawSkillName,
            selectorIndex: ''
        };
    }
    const rawSkillName = matcher[1];
    const selectorIndex = matcher[2] || '';

    // Reconstructs the prefix (e.g., "attack_1" or just "attack")
    const rowIdPrefix = selectorIndex ? `${rawSkillName}_${selectorIndex}` : rawSkillName;
    return {
        rawSkillName,
        rowIdPrefix,
        selectorIndex
    };
}

function getSkillNameFromTrainingMethodInput(input) {
    return parseTrainingMethodSelectorId(input.id).rawSkillName;
}

let activeTrainingMethodInput = null;
const trainingMethodBodyDropdownId = 'bodyTrainingMethodDropdown';

function getTrainingMethodBodyDropdown() {
    let dropdown = document.getElementById(trainingMethodBodyDropdownId);
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = trainingMethodBodyDropdownId;
        dropdown.className = 'dropdown-content body-dropdown-content';
        dropdown.style.display = 'none';
        dropdown.style.position = 'absolute';
        dropdown.style.backgroundColor = '#f6f6f6';
        dropdown.style.border = '1px solid #ddd';
        dropdown.style.boxSizing = 'border-box';
        dropdown.style.overflowY = 'auto';
        dropdown.style.maxHeight = '240px';
        dropdown.style.zIndex = '99999';
        dropdown.style.minWidth = '120px';
        document.body.appendChild(dropdown);
    }
    return dropdown;
}

function positionTrainingMethodBodyDropdown(input, dropdown) {
    const rect = input.getBoundingClientRect();
    dropdown.style.width = `${rect.width}px`;
    dropdown.style.left = `${rect.left + window.pageXOffset}px`;
    dropdown.style.top = `${rect.bottom + window.pageYOffset + 4}px`;
}

function getTrainingMethodDropdownForInput(input) {
    return getTrainingMethodBodyDropdown();
}

function updateTrainingMethodList(input) {
    const dropdown = getTrainingMethodBodyDropdown();
    if (!dropdown) {
        return;
    }

    activeTrainingMethodInput = input;
    positionTrainingMethodBodyDropdown(input, dropdown);

    const skillName = getSkillNameFromTrainingMethodInput(input);
    console.log("Updating selection for " + skillName);
    const search = input.value.trim().toLowerCase();
    const methods = trainingMethods.filter(method => method.skill === skillName && (search === '' || method.name.toLowerCase().includes(search)));

    dropdown.innerHTML = '';
    if (methods.length === 0) {
        const emptyItem = document.createElement('div');
        emptyItem.textContent = 'No matching training methods.';
        emptyItem.style.padding = '12px 16px';
        emptyItem.style.color = '#666';
        dropdown.appendChild(emptyItem);
    } else {
        methods.forEach(method => {
            // console.log(method.name);
            const option = document.createElement('a');
            option.href = '#';
            option.textContent = method.name;
            option.addEventListener('mousedown', function(event) {
                event.preventDefault();
                selectTrainingMethod(method.name, input);
            });
            dropdown.appendChild(option);
        });
    }

    dropdown.style.display = 'block';
}

function filterTrainingMethodList(input) {
    //console.log("Filtering training methods for " + input);
    storedDropdownText = input.value; // Store the current text in case we need to revert
     // Clear the input to trigger the dropdown to show all options
    updateTrainingMethodList(input);
}

function storeAndClearTrainingMethodInput(input) {
    storedDropdownText = input.value;
    input.value = '';
}

let trainingMethodListHideTimer = null;

function scheduleCloseTrainingMethodList(input) {
    if(input.value==""){
        input.value = storedDropdownText; // Revert to the stored text if input is empty
    }
    if (trainingMethodListHideTimer) {
        clearTimeout(trainingMethodListHideTimer);
    }
    trainingMethodListHideTimer = setTimeout(() => {
        const dropdown = getTrainingMethodBodyDropdown();
        if (dropdown && activeTrainingMethodInput === input) {
            dropdown.style.display = 'none';
            activeTrainingMethodInput = null;
        }
    }, 150);
    
}

function selectTrainingMethod(methodName, input) {
    if (!input) {
        return;
    }
    input.value = methodName;
    const dropdown = getTrainingMethodDropdownForInput(input);
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    input.focus();
    //Need to send the containerRowId through here too....
    UpdateTrainingMethod(input);
}





function UpdateTrainingMethodSpecifics(rowId, whatsChanging, newValue){
    //Update a row when a property is changed

    //What is the new number?
    newValue = parseInt(newValue);
    //Recalculate all values based on changes to a training method
    //Validate the input, the process it, then refresh all
    console.log("Updating training method for rowId: " + rowId + ", changing: " + whatsChanging + ", new value: " + newValue);
        //Once the row is identified, update the userTrainingChoices
    const targetRow = userTrainingChoices.find(row => row.rowId === rowId);

    
    //Find the row in the userTrainingChoices array that matches the provided rowId
    if (targetRow) {
            //Update the specific property of the targetRow based on whatsChanging
            switch(whatsChanging) {
                case "xpPerHour":
                    targetRow.xpPerHour = newValue;
                    break; // <-- Stops execution from falling through
                case "profitPerXp":
                    targetRow.profitPerXp = newValue;
                    break;
                case "goalLevel":
                    targetRow.goalLevel = newValue;
                    break;
                case "startLevel":
                    targetRow.startLevel = newValue;
                    break;
                default:
                    const warnMessage = "Unknown property changing: " + whatsChanging;
                    console.warn(warnMessage);
                    if (typeof showNotification === 'function') {
                        showNotification(warnMessage, 'warning');
                    }
            }
        }
        console.log(targetRow);
        console.log(userTrainingChoices);
    //refresh calculations and display
    CalculateAndDisplayHoursAndCost(false);
}


function UpdateTrainingMethod(dropdown) {


    //THIS IS UPDATING THE VALUES IN THE ROW, BUT IT"S NOT UPDATING THE VALUES IN THE USERTRAININGMETHODS OBJECT
    //SO THE CALCULATIONS IT RUNS ARE STILL USING THE OLD VALUES. NEED TO UPDATE THE USERTRAININGMETHODS OBJECT TOO.
    
    //Get the text selection
    var selectedMethodName = dropdown.value;
    console.log("Selected method name: ", selectedMethodName);

    if(selectedMethodName == null || selectedMethodName == undefined || selectedMethodName.trim() === "") {
        dropdown.value = "Custom Method";
        selectedMethodName = "Custom Method";
    }

    //Get some details about the dropdown to identify which row it belongs to and which skill it is for
    const parsed = parseTrainingMethodSelectorId(dropdown.id);
    console.log("Parsed training method selector ID: ", parsed);
    const skillName = parsed.rawSkillName;
    const rowIdPrefix = parsed.rowIdPrefix;
    //Find the matching training method from the array based on the text of the selected option and the skill it belongs to
    const selectedMethod = trainingMethods.find(method => method.name === selectedMethodName && method.skill === skillName);
    //log the details of the selected method (or undefined if no match was found)
    console.log("Selected method details: ", selectedMethod);

    
    //If no match is found... open the custom training section
    if(selectedMethod == null || selectedMethod == undefined) {
        //console.error("Selected training method does not match a known method. Custom skill editor was opened.");
            // $( "#"+rowIdPrefix+"Expanded").addClass("expanded");
            // $( "#"+rowIdPrefix +"Arrow").addClass("down");
    }

    //Get the row id from the current dropdown element so we update the right row
    const containerRowId = parseInt(dropdown.dataset.rowid || dropdown.getAttribute('data-rowid'), 10);
    console.log(containerRowId + " is the row to update");
    if (!containerRowId) {
        console.error(`Unable to determine row id for training method selector: ${dropdown.id}`);
        return;
    }

    const container = document.querySelector(`[data-userTrainingChoiceId="${containerRowId}"]`);

    //We have the containerRowId and the selectedMethod details....
    //If the selectedMethod is undefined, update just the name for that matching record in the userTrainingChoices array (Found via rowId).
    //If the method is defined, update all values for that row (Keep the rowId the same).
    
    if (!container) {
        console.error(`Container for rowId ${containerRowId} not found.`);
        return;
    }

    //Once the row is identified, update the userTrainingChoices
    const targetRow = userTrainingChoices.find(row => row.rowId === containerRowId);

    if (targetRow) {
        if (!selectedMethod) {
            // Case 1: Method is undefined -> Only update the name
            targetRow.name = selectedMethodName;
        } else {
            // Case 2: Method is defined -> Update all values (except rowId)
            // Object.assign overwrites targetRow's properties with selectedMethod's properties
            Object.assign(targetRow, selectedMethod);
        }
    }

    // 3. Update the XP Per Hour input  //THIS SHOULD ONLY RUN IF THERE WAS A MATCH
    const xpInput = container.querySelector('input[name="CustomXp"]');
    if (xpInput && selectedMethod) {
        xpInput.value = selectedMethod.xpPerHour;
    }

    // 4. Update the Cost per 1xp input IF THERE WAS A MATCH
    const gpInput = container.querySelector('input[name="CustomGp"]');
    if (gpInput && selectedMethod) {
        gpInput.value = selectedMethod.profitPerXp;
    }


    CalculateAndDisplayHoursAndCost();
}