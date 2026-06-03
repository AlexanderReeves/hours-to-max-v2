// This function creates the saved training choice rows on the page.
function PopulateRowsWithUserData(userIsLoggedIn){

    // The array that will hold each saved training choice.
    var userTrainingChoices = [];

    if(!userIsLoggedIn){
        // If the user is not logged in, use default example training choices.
        console.log("USER IS NOT LOGGED IN, POPULATING ROWS WITH DEFAULT VALUES");
        
        userTrainingChoices.push({name: "Trained through Slayer", xpPerHour: 13000000, profitPerXp: 0, skill: "attack"});        
        userTrainingChoices.push({name: "Trained through Slayer", xpPerHour: 13000000, profitPerXp: 0, skill: "strength"});        
        userTrainingChoices.push({name: "Trained through Slayer", xpPerHour: 13000000, profitPerXp: 0, skill: "defence"});        
        userTrainingChoices.push({name: "Trained through Slayer", xpPerHour: 13000000, profitPerXp: 0, skill: "hitpoints"});
        userTrainingChoices.push({name: "80kph Ironwood Trees", xpPerHour: 80000, profitPerXp: 1, skill: "woodcutting"});
        userTrainingChoices.push({name: "95kph Boat Tele Astrals ", xpPerHour: 95000, profitPerXp: 20, skill: "runecraft"});
        console.log("DEFAULT USER TRAINING CHOICES:", userTrainingChoices);

    } else {
        // If the user is logged in, copy their saved chosen methods from dbuser.
        console.log("USER IS LOGGED IN, POPULATING ROWS WITH THEIR TRAINING CHOICES");
        if (dbuser && Array.isArray(dbuser.chosenMethods)) {
            userTrainingChoices = dbuser.chosenMethods.slice();
        } else {
            userTrainingChoices = [];
        }
        console.log("LOGGED IN USER TRAINING CHOICES:", userTrainingChoices);
    }

    // Find the hidden HTML templates and the container where rows will be inserted.
    const rootRow = document.getElementById('Row');
    const rootExpanded = document.getElementById('Expanded');
    const skillRowsContainer = document.getElementById('skillRows');
    const farmingRow = document.getElementById('farmingRow');
    const farmingPatchesRow = document.getElementById('farmingPatchesRow');

    if (!rootRow || !rootExpanded || !skillRowsContainer) {
        // If the expected elements do not exist on the page, stop here.
        console.error('Could not find row templates for PopulateRowsWithUserData.');
        return;
    }

    // Hide farming rows now so they appear later after the saved rows animate in.
    if (farmingRow) farmingRow.classList.add('hidden');
    if (farmingPatchesRow) farmingPatchesRow.classList.add('hidden');

    let insertionPoint = rootExpanded;
    const insertedPairs = [];

    // Loop through each saved training choice and create a matching row.
    userTrainingChoices.forEach(choice => {
        const skillName = sanitizeSkillName(choice.skill || choice.name || 'skill');
        if (!skillName) {
            console.warn('Skipping choice with invalid skill name:', choice);
            return;
        }

        const rowId = `${skillName}Row`;
        const expandedId = `${skillName}Expanded`;

        // Avoid creating duplicate rows for the same skill.
        if (document.getElementById(rowId) || document.getElementById(expandedId)) {
            console.warn('Duplicate skill row is already present, skipping:', skillName);
            return;
        }

        // Clone the hidden row template and expanded panel.
        const clonedRow = cloneTemplateElement(rootRow, skillName, 'Row', true);
        const clonedExpanded = cloneTemplateElement(rootExpanded, skillName, 'Expanded', true);

        // Set the training method selector text if the user saved a name.
        const selectorInput = clonedRow.querySelector(`#${skillName}trainingMethodSelector`);
        if (selectorInput && choice.name) {
            selectorInput.value = choice.name;
        }

        // Insert new cloned rows after the previous one.
        insertionPoint.insertAdjacentElement('afterend', clonedRow);
        clonedRow.insertAdjacentElement('afterend', clonedExpanded);
        insertionPoint = clonedExpanded;

        insertedPairs.push({ row: clonedRow, expanded: clonedExpanded });
    });

    // After a short pause, reveal each row one by one.
    setTimeout(() => {
        revealInsertedRows(insertedPairs, 100);
        revealFarmingRows(farmingRow, farmingPatchesRow, insertedPairs.length, 100);
    }, 200);
    PopulateDropdowns(); // Populate the dropdowns after the rows are created so the user can change their choices.
}

// Convert a skill name into a safe ID string.
function sanitizeSkillName(rawSkillName) {
    if (!rawSkillName) {
        return '';
    }
    return rawSkillName.toString().trim().toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
}

// Clone a template element and give it a new unique ID.
function cloneTemplateElement(templateElement, skillName, suffix, preserveHidden = false) {
    const clone = templateElement.cloneNode(true);
    clone.id = `${skillName}${suffix}`;
    if (!preserveHidden) {
        clone.classList.remove('hidden');
    }
    updateIdsAndAttributes(clone, skillName);
    return clone;
}

// Reveal the inserted rows one by one with a delay.
function revealInsertedRows(pairs, delayMs) {
    pairs.forEach((pair, index) => {
        setTimeout(() => {
            pair.row.classList.remove('hidden');
            // Keep the expanded section hidden until the user opens it.
        }, index * delayMs);
    });
}

// Reveal the farming rows after the saved rows are visible.
function revealFarmingRows(farmingRow, farmingPatchesRow, pairCount, delayMs) {
    const revealDelay = (pairCount + 1) * delayMs;
    setTimeout(() => {
        if (farmingRow) farmingRow.classList.remove('hidden');
        if (farmingPatchesRow) farmingPatchesRow.classList.remove('hidden');
    }, revealDelay);
}

// Update IDs and related attributes inside the cloned elements so they remain unique.
function updateIdsAndAttributes(rootElement, skillName) {
    const elementsWithId = rootElement.querySelectorAll('[id]');
    
    elementsWithId.forEach(element => {
        const originalId = element.id;
        if (!originalId) {
            return;
        }

        const newId = `${skillName}${originalId}`;
        element.id = newId;

        const name = element.getAttribute('name');
        if (name) {
            if (name === 'Dropdown' || name === 'trainingMethodSelector' || name === 'Expander' || name === 'Final' || name === 'Arrow' || name === 'Cost' || name === 'Hours' || name === 'LevelDisplay' || name === 'CustomGoal' || name === 'Boost' || name === 'CustomXp' || name === 'CustomGp' || name === 'Refresh' || name === 'trainingMethods') {
                element.setAttribute('name', `${skillName}${name}`);
            }
            if(name === 'skillIcon'){
            element.setAttribute('src', `icons/${skillName}_icon.webp`);
            }
        }

        if (element.tagName === 'INPUT' && element.getAttribute('list') === 'trainingMethods') {
            element.setAttribute('list', `${skillName}trainingMethods`);
        }
        if (element.tagName === 'DATALIST' && originalId === 'trainingMethods') {
            element.id = `${skillName}trainingMethods`;
        }
    });
}