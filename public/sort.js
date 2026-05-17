function getSkillRowsContainer(){
    const sampleRow = document.querySelector('.row[id$="Row"]');
    return sampleRow ? sampleRow.parentElement : null;
}

function reorderSkillRowsBySkillsOrder(){
    const parent = getSkillRowsContainer();
    if (!parent) {
        console.error('Skill rows container not found');
        return;
    }

    skills.forEach(skill => {
        const row = document.getElementById(`${skill.name}Row`);
        if (row) {
            parent.appendChild(row);
        }

        const expanded = document.getElementById(`${skill.name}Expanded`);
        if (expanded) {
            parent.appendChild(expanded);
        }
    });

    // Move farmingPatchesRow directly below farmingRow
    const farmingRow = document.getElementById('farmingRow');
    const farmingPatchesRow = document.getElementById('farmingPatchesRow');
    if (farmingRow && farmingPatchesRow) {
        farmingRow.insertAdjacentElement('afterend', farmingPatchesRow);
    }
}

function Sort(toggleState = true){
    //If toggle state is true, toggle the current choice, then sort
    //If false, sort by the existing choice without toggling (used when switching tabs to maintain sorting choice)
    console.log('Attempting to sort');
    const sortButton = document.getElementById('sortButton');
    
    if (!sortButton) {
        console.error('sortButton element not found');
        return;
    }
    
    // Get current state (default to 0)
    let currentState = parseInt(sortButton.dataset.sortState || '0');
    
    // Define the sorting options
    const sortOptions = ['Sorting by skill', 'Sorting by level', 'Sorting by cost', 'Sorting by hours'];

       var skillOrder = ["attack", "strength", "defence", "ranged", "prayer", "magic", "runecraft", "construction", "hitpoints", "agility", "herblore", "thieving", "crafting", "fletching", "hunter", "mining", "smithing", "fishing", "cooking", "firemaking", "woodcutting", "sailing", "slayer", "farming"];
    
    // Move to next state (cycle back to 0 if at the end)
    if(toggleState){
        currentState = (currentState + 1) % sortOptions.length;
    }
    
    // Update button text
    sortButton.value = sortOptions[currentState];
    
    // Store the new state
    sortButton.dataset.sortState = currentState;

    const sortOption = sortOptions[currentState];
    console.log(`Sorting skills by option: ${sortOption}`);

    skills.sort((a, b) => {
        if (currentState === 0) {
            const aIndex = skillOrder.indexOf(a.name);
            const bIndex = skillOrder.indexOf(b.name);
            return aIndex - bIndex;
        }

        if (currentState === 1) {
            const aXp = a.xp ?? a.currentXp ?? 0;
            const bXp = b.xp ?? b.currentXp ?? 0;
            return bXp - aXp;
        }

        if (currentState === 2) {
            const aCost = typeof a.GetRemainingCost === 'function' ? a.GetRemainingCost() : 0;
            const bCost = typeof b.GetRemainingCost === 'function' ? b.GetRemainingCost() : 0;
            return bCost - aCost;
        }

        if (currentState === 3) {
            const aHours = typeof a.GetRemainingHours === 'function' ? a.GetRemainingHours() : 0;
            const bHours = typeof b.GetRemainingHours === 'function' ? b.GetRemainingHours() : 0;
            return bHours - aHours;
        }

        return 0;
    });

    reorderSkillRowsBySkillsOrder();

    //console.log('Skills sorted:', skills.map(skill => ({ name: skill.name, xp: skill.xp ?? skill.currentXp })));
}

function ShowAndHideCompleted(doToggle = true){
    console.log('Toggling completed skills visibility');
    
    // Get or initialize the show state
    let showCompleted = window.showCompletedSkills !== undefined ? window.showCompletedSkills : true;
    if(doToggle){
        showCompleted = !showCompleted; // Toggle the state
    }
    window.showCompletedSkills = showCompleted;

    const showHideButton = document.getElementById('showHideButton');
    if (showHideButton) {
        showHideButton.value = showCompleted ? 'Showing completed' : 'Hiding completed';
    }

    const farmingPatchesRow = document.getElementById('farmingPatchesRow');

    // Iterate through all skills and show/hide based on completion status
    skills.forEach(skill => {
        const row = document.getElementById(`${skill.name}Row`);
        const expanded = document.getElementById(`${skill.name}Expanded`);
        
        // Check if skill is completed (remaining hours and cost are both 0)
        const remainingHours = typeof skill.GetRemainingHours === 'function' ? skill.GetRemainingHours() : 0;
        const remainingCost = typeof skill.GetRemainingCost === 'function' ? skill.GetRemainingCost() : 0;
        const isCompleted = remainingHours === 0 && remainingCost === 0;
        
        if (isCompleted) {
            // If completed and showCompleted is false, hide it
            if (!showCompleted) {
                if (row) row.style.display = 'none';
                if (expanded) expanded.style.display = 'none';
            } else {
                if (row) row.style.display = '';
                if (expanded) expanded.style.display = '';
            }
        } else {
            // If not completed, always show it
            if (row) row.style.display = '';
            if (expanded) expanded.style.display = '';
        }

        if (skill.name === 'farming' && farmingPatchesRow) {
            if (row && row.style.display === 'none') {
                farmingPatchesRow.style.display = 'none';
            } else {
                farmingPatchesRow.style.display = '';
            }
        }
    });
    
    console.log(`Completed skills ${showCompleted ? 'shown' : 'hidden'}`);
}
