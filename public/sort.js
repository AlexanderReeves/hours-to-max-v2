function Sort(toggleState = true){
    //togglestate decides if we should move to the next state before sorting, or just sort with the current value.
    var sortButton = document.getElementById('sortButton');
    if (!sortButton) {
        return;
    }

    var sortStates = [
        {name: 'default', label: 'Sorting by default'},
        {name: 'hours', label: 'Sorting by hours'},
        {name: 'profit', label: 'Sorting by profit'}
    ];

    var currentState = parseInt(sortButton.dataset.sortState || '0');
    if (isNaN(currentState)) {
        currentState = 0;
    }
    //Change state, or just sort with current value
    if (toggleState) {
        currentState = (currentState + 1) % sortStates.length;
    }

    currentState = currentState % sortStates.length;

    sortButton.dataset.sortState = currentState;
    sortButton.value = sortStates[currentState].label;
    window.sortOrder = sortStates[currentState].name;
    console.log("Sort order updated to: " + window.sortOrder);

    // Now sort the rows based on the new sort order
    SortRows(window.sortOrder);
}



function getSkillRowsContainer(){
    return document.getElementById('loadSkillsHere') || document.getElementById('AllSkills');
}


function IsChoiceCompleted(choice){
    const startXp = Number(choice.startXp) || 0;
    const startLevel = Number(choice.startLevel) || 1;
    const goalLevel = Number(choice.goalLevel) || 99;
    const effectiveStartXp = Math.max(startXp, ConvertLevelToXp(startLevel));
    const remainingXp = ConvertLevelToXp(goalLevel) - effectiveStartXp;
    return remainingXp <= 0;
}

function ShowAndHideCompleted(doToggle = true){
    let showCompleted = window.showCompletedSkills !== undefined ? window.showCompletedSkills : true;
    if(doToggle){
        showCompleted = !showCompleted;
    }
    window.showCompletedSkills = showCompleted;

    const showHideButton = document.getElementById('showHideButton');
    if (showHideButton) {
        showHideButton.value = showCompleted ? 'Showing completed' : 'Hiding completed';
    }

    if (typeof ShadeRows === 'function') {
        ShadeRows();
    }
}

function SortRows(sortOrder){
    var parent = getSkillRowsContainer();
    if (!parent) {
        return;
    }

    var containers = [];
    skillNames.forEach(function(skillName){
        var container = document.getElementById(skillName + '_container');
        if (container) {
            containers.push(container);
        }
    });

    containers.sort(function(a, b){
        var aSkill = a.id.replace('_container', '');
        var bSkill = b.id.replace('_container', '');

        if (sortOrder === 'hours') {
            var aHours = 0;
            var bHours = 0;
            var aHourElements = a.querySelectorAll('[id$="_Hours"]');
            var bHourElements = b.querySelectorAll('[id$="_Hours"]');
            aHourElements.forEach(function(element){
                var value = parseFloat(element.textContent || element.innerText || '0');
                if (!isNaN(value)) {
                    aHours += value;
                }
            });
            bHourElements.forEach(function(element){
                var value = parseFloat(element.textContent || element.innerText || '0');
                if (!isNaN(value)) {
                    bHours += value;
                }
            });
            return bHours - aHours;
        }

        if (sortOrder === 'profit') {
            var aProfit = 0;
            var bProfit = 0;
            var aProfitElements = a.querySelectorAll('[id$="_Cost"]');
            var bProfitElements = b.querySelectorAll('[id$="_Cost"]');
            aProfitElements.forEach(function(element){
                var value = parseFloat((element.textContent || element.innerText || '0').replace(/[^0-9.-]/g, ''));
                if (!isNaN(value)) {
                    aProfit += value;
                }
            });
            bProfitElements.forEach(function(element){
                var value = parseFloat((element.textContent || element.innerText || '0').replace(/[^0-9.-]/g, ''));
                if (!isNaN(value)) {
                    bProfit += value;
                }
            });
            return bProfit - aProfit;
        }

        var aIndex = skillNames.indexOf(aSkill);
        var bIndex = skillNames.indexOf(bSkill);
        if (aIndex === -1) {
            aIndex = 9999;
        }
        if (bIndex === -1) {
            bIndex = 9999;
        }
        return aIndex - bIndex;
    });

    var currentChildren = Array.from(parent.children);
    currentChildren.forEach(function(child){
        if (child.id && child.id.endsWith('_container')) {
            parent.removeChild(child);
        }
    });

    containers.forEach(function(container){
        parent.appendChild(container);
    });

    console.log('Sort rows complete for order: ' + sortOrder);
}