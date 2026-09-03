function Sort(toggleState = true){
    //This seems to be unhiding completed rows
    //togglestate decides if we should move to the next state before sorting, or just sort with the current value.
    var sortButton = document.getElementById('sortButton');
    if (!sortButton) {
        return;
    }

    var sortStates = [
        {name: 'default', label: 'Sorting by default'},
        {name: 'hours', label: 'Sorting by hours'},
        {name: 'profit', label: 'Sorting by profit'},
        {name: 'percent', label: 'Sorting by % complete'}
    ];

    var currentState = parseInt(sortButton.dataset.sortState || '0');
    if (isNaN(currentState)) {
        currentState = 0;
    }
    //if toggleState, move to the next sort option before sorting (Otherwise re-sort with the old sort option)
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
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Show completed skills: " + window.showCompletedSkills);

    const showHideButton = document.getElementById('showHideButton');
    if (showHideButton) {
        showHideButton.value = showCompleted ? 'Showing completed' : 'Hiding completed';
    }

    // console.log("Show completed skills: " + showCompleted);
    console.log(userTrainingChoices);

    //At this stage, loop through all training methods and hide completed ones
    userTrainingChoices.forEach(choice => {
        console.log("Checking if choice is completed for row: " + choice.rowId);
        
            console.log(choice);
        if(ConvertLevelToXp(choice.goalLevel) <= choice.startXp){
            const rowElement = $('[data-usertrainingchoiceid="' + choice.rowId + '"]');
            if (rowElement.length) {
                console.log("Toggling display for row: " + choice.rowId);
                rowElement.css('display', showCompleted ? '' : 'none');
            }
        }
    });


}

function SortRows(sortOrder){
    var parent = getSkillRowsContainer();
    if (!parent) {
        return;
    }
    //Get each skill container (the thing that will be sorted, as containers are sorted, not individual elements within them)
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

        function getRemainingHoursForSkill(skillName) {
            if (!Array.isArray(userTrainingChoices)) {
                return 0;
            }

            return userTrainingChoices
                .filter(function(choice){ return choice.skill === skillName; })
                .reduce(function(total, choice){
                    var xpPerHour = Number(choice.xpPerHour) || 1;
                    var startLevel = Number(choice.startLevel) || 1;
                    var goalLevel = Number(choice.goalLevel) || 99;

                    var trainingMethodStartXp = ConvertLevelToXp(startLevel);
                    var trainingMethodEndXp = ConvertLevelToXp(goalLevel);

                    var startXp = Number(choice.startXp) || 0;
                    if (startXp > 13034431) {
                        startXp = 13034431;
                    }
                    if (startXp > trainingMethodEndXp) {
                        startXp = trainingMethodEndXp;
                    }

                    var remainingXp = trainingMethodEndXp - startXp;
                    if (remainingXp < 0) {
                        remainingXp = 0;
                    }

                    return total + (remainingXp / xpPerHour);
                }, 0);
        }

        if (sortOrder === 'hours') {
            var aHours = getRemainingHoursForSkill(aSkill);
            var bHours = getRemainingHoursForSkill(bSkill);
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

        function getPercentCompleteForSkill(skillName) {
            if (!Array.isArray(userTrainingChoices)) {
                return 0;
            }

            var skillChoices = userTrainingChoices.filter(function(choice){ return choice.skill === skillName; });
            if (skillChoices.length === 0) {
                return 0;
            }

            var startXpValues = skillChoices.map(function(choice){
                return ConvertLevelToXp(Number(choice.startLevel) || 1);
            });
            var goalXpValues = skillChoices.map(function(choice){
                return ConvertLevelToXp(Number(choice.goalLevel) || 99);
            });

            var lowestStartXp = Math.min.apply(null, startXpValues);
            var highestGoalXp = Math.max.apply(null, goalXpValues);

            var currentXp = jagexPlayerSkillData[skillName] && jagexPlayerSkillData[skillName].xp != null
                ? jagexPlayerSkillData[skillName].xp
                : lowestStartXp;

            var totalXpNeeded = highestGoalXp - lowestStartXp;
            if (totalXpNeeded <= 0) {
                return 100;
            }

            var percent = ((currentXp - lowestStartXp) / totalXpNeeded) * 100;
            return Math.min(100, Math.max(0, percent));
        }

        if(sortOrder === 'percent'){
            var aPercent = getPercentCompleteForSkill(aSkill);
            var bPercent = getPercentCompleteForSkill(bSkill);
            return aPercent - bPercent;
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
    ShowAndHideCompleted(false);
}