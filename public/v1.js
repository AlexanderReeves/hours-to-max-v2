$.ajaxSetup({ //Prevent future code loading before previous code finishes.
    async: false
});

var lights = false;

var currentTab = "max";

//Set variables
//XP Per Hour based on training method
var raXpArray = [90000, 130000, 140000, 675000, 710000, 850000];
//Cost per XP
var raGpArray = [0,0,0,0,0,0];
var prXpArray = [50000, 250000, 437000, 600000, 800000, 1250000];
var prGpArray = [0,0,0,0,0,0]
var maXpArray = [78000, 150000, 150000, 175000, 380000];
var maGpArray = [0,0,0,0,0];
var ruXpArray = [35000, 60000, 65000, 70000, 80000, 100000];
var ruGpArray = [0,0,0,0,0,0];
var coXpArray = [190000, 400000, 450000, 500000, 580000, 850000, 1000000];
var coGpArray = [0,0,0,0,0,0,0]
var agXpArray = [45000, 50000, 50000, 55000, 65000, 65000, 90000];
var agGpArray = [0,0,0,0,0,0,0]
var heXpArray = [110000, 170000, 210000, 400000, 500000];
var heGpArray = [0,0,0,0,0];
var thXpArray = [110000, 140000, 150000, 210000, 240000, 260000, 265000];
var thGpArray = [0,0,0,0,0,0,0];
var crXpArray = [150000,220000,270000,360000,415000];
var crGpArray = [0,0,0,0,0];
var flXpArray = [1900000,2250000,2500000,3000000,4000000];
var flGpArray = [0,0,0,0,0];
var huXpArray = [80000,115000,125000,150000,160000,175000];
var huGpArray = [0,0,0,0,0,0];
var miXpArray = [25000,50000,60000,69000,70000,75000,78000,85000];
var miGpArray = [0,0,0,0,0,0,0,0];
var smXpArray = [200000,250000,350000];
var smGpArray = [0,0,0];
var fiXpArray = [40000,50000,75000,80000];
var fiGpArray = [0,0,0,0];
var ckXpArray = [150000,250000,300000,450000,900000];
var ckGpArray = [0,0,0,0,0];
var fmXpArray = [250000,275000,290000,400000,450000];
var fmGpArray = [0,0,0,0,0];
var wcXpArray = [68000, 75000, 90000, 90000, 100000];
var wcGpArray = [0,0,0,0,0];
var treePatchesArray = [1,2,3,4,5];
var seXpArray = [3043,7070,13768];
var faGpArray = [0,0,0];
var totalCostArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

//Dynamic multi layer array variables... I guess they are objects? 24 data points
var shorthandArray = ["ov","at","de","st","hi","ra","pr","ma","ck","wc"
	,"fl","fi","fm","cr","sm","mi","he","ag","th","sl","fa","ru","hu"
	,"co"];
var questXpGoalArray = [0,0,0,0,0,273742,101333,1210421,737627,814445
    ,273742,333804,1210421,737627,737627,899257,737627,737627,737627,668051,814445,273742,737627
    ,737627];
var achievementXpGoalArray = [0,0,0,0,0,737627,3258594,9684577,3258594,5346332
    ,8771558,9684577,3258594,3258594,5902831,3258594,5346332,5346332,5902831,8771558,5902831,5902831,737627
    ,1629200];
var lvlArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var achLvlArray = [0,0,0,0,0,70,85,96,95,90
    ,95,96,85,85,91,85,90,90,91,95,91,91,70
    ,78];
var questLvlArray = [0,0,0,0,0,60,50,75,70,71
    ,60,62,75,70,70,72,70,70,70,69,70,60,70
    ,70];
var maxLvlArray = [0,99,99,99,99,99,99,99,99,99
    ,99,99,99,99,99,99,99,99,99,99,99,99,99
    ,99];
var zeroToGoalHoursArray = [0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0]; 



var ninetyNine = 13034431;
var user = "Unknown";

var maXp = 0;
var maHoursTotal = 0;
var maXpPerHour = 0;
var maval = "";

var prXp = 0;
var prHoursTotal = 0
var prXpPerHour = 0;
var prval = "";
var prcost = 0;

var wcXp = 0;
var wcHoursTotal = 0;
var wcXpPerHour = 0;
var wcval = "";

var raXp = 0;
var raHoursTotal = 0
var raXpPerHour = 0;
var raval = "";
var racost = 0;

var ruXp = 0;
var ruHoursTotal = 0
var ruXpPerHour = 0;
var ruval = "";


var coXp = 0;
var coHoursTotal = 0
var coXpPerHour = 0;
var coval = "";

var agXp = 0;
var agHoursTotal = 0;
var agXpPerHour = 0;
var agval = "";

var heXp = 0;
var heHoursTotal = 0;
var heXpPerHour = 0;
var heval = "";

var thXp = 0;
var thHoursTotal = 0;
var thXpPerHour = 0;
var thval = "";

var crXp = 0;
var crHoursTotal = 0;
var crXpPerHour = 0;
var crval = "";

var flXp = 0;
var flHoursTotal = 0;
var flXpPerHour = 0;
var flval = "";

var huXp = 0;
var huHoursTotal = 0;
var huXpPerHour = 0;
var huval = "";


var miXp = 0;
var miHoursTotal = 0;
var miXpPerHour = 0;
var mival = "";

var smXp = 0;
var smHoursTotal = 0;
var smXpPerHour = 0;
var smval = "";

var fiXp = 0;
var fiHoursTotal = 0;
var fiXpPerHour = 0;
var fival = "";

var ckXp = 0;
var ckHoursTotal = 0;
var ckXpPerHour = 0;
var ckval = "";

var fmXp = 0;
var fmHoursTotal = 0;
var fmXpPerHour = 0;
var fmval = "";

var faXp = 0;
var faRemainingRuns = 0;
var faXpPerRun = 0;
var treeval = "";
var seedval = "";


//Slayer xp per hour on average
var slXpPerHour = 0;
var slXp = 0;
var slHoursTotal = 0;
var goalHoursTotal = 0;
var goalGpTotal = 0;

window.onload = function(){

    //Pull the values from the URL into the global values
    PullURLVariables();
    RefreshPlayer(); //Refresh the players data from the hiscores website
    //Update Hours To 99 for each skill
    UpdateXPAndHours("ma", maval);
    UpdateXPAndHours("wc", wcval);
    UpdateXPAndHours("ra", raval);
    UpdateXPAndHours("pr", prval);
    UpdateXPAndHours("ru", ruval);
    UpdateXPAndHours("co", coval);
    UpdateXPAndHours("ag", agval);
    UpdateXPAndHours("he", heval);
    UpdateXPAndHours("th", thval);
    UpdateXPAndHours("cr", crval);
    UpdateXPAndHours("fl", flval);
    UpdateXPAndHours("sl", slXpPerHour);
    UpdateXPAndHours("hu", huval);
    UpdateXPAndHours("mi", mival);
    UpdateXPAndHours("sm", smval);
    UpdateXPAndHours("fi", fival);
    UpdateXPAndHours("ck", ckval);
    UpdateXPAndHours("fm", fmval);
    UpdateFarmingXpAndHours();
    //Find cost of each method
    FindCost();
    //Update hours to max
    UpdateMax();
}

$("#myform").keypress(function(e) {
  //Enter key
  if (e.which == 13) {
    console.log("Forms submit");
    e.preventDefault();
    return false;
  }
});

$("#fname").keypress(function(e) {
  //Enter key
  if (e.which == 13) {
    e.preventDefault();
    console.log("Forms submit");
    return false;
  }
});

function PullURLVariables() {
    //Get user name and dropdown selections from the URL parameters
    const queryString = window.location.search;
    /*console.log("Url Parameters: " + queryString);*/
    const urlParams = new URLSearchParams(queryString);
    user = urlParams.get('user');
    maval = urlParams.get('maval');
    prval = urlParams.get('prval');
    wcval = urlParams.get('wcval');
    raval = urlParams.get('raval');
    ruval = urlParams.get('ruval');
    coval = urlParams.get('coval');
    agval = urlParams.get('agval');
    heval = urlParams.get('heval');
    thval = urlParams.get('thval');
    crval = urlParams.get('crval');
    flval = urlParams.get('flval');
    huval = urlParams.get('huval');
    mival = urlParams.get('mival');
    smval = urlParams.get('smval');
    fival = urlParams.get('fival');
    ckval = urlParams.get('ckval');
    fmval = urlParams.get('fmval');
    treeval = urlParams.get('trval');
    seedval = urlParams.get('seval');
    lights = urlParams.get('l');
    //We can get slval to determine slayer xp per hour
    slXpPerHour = urlParams.get('slval');
    //Update the dropdowns to the correct values here?
    //if(user==null){console.log(user="Player");}
    //Apply the wcval from url to wcdropdown unless it was null
    if(raval != null){selectElement('radrop', raval);}else{raval = 6}
    if(wcval != null){selectElement('wcdrop', wcval);}else{wcval = 5}
    if(maval != null){selectElement('madrop', maval);}else{maval = 5}
    if(prval != null){selectElement('prdrop', prval);}else{prval = 6}
    if(ruval != null){selectElement('rudrop', ruval);}else{ruval = 6}
    if(coval != null){selectElement('codrop', coval);}else{coval = 7}
    if(agval != null){selectElement('agdrop', agval);}else{agval = 7}
    if(heval != null){selectElement('hedrop', heval);}else{heval = 5}
    if(thval != null){selectElement('thdrop', thval);}else{thval = 7}
    if(crval != null){selectElement('crdrop', crval);}else{crval = 5}
    if(flval != null){selectElement('fldrop', flval);}else{flval = 5}
    if(huval != null){selectElement('hudrop', huval);}else{huval = 6}
    if(mival != null){selectElement('midrop', mival);}else{mival = 8}
    if(smval != null){selectElement('smdrop', smval);}else{smval = 3}
    if(fival != null){selectElement('fidrop', fival);}else{fival = 4}
    if(ckval != null){selectElement('ckdrop', ckval);}else{ckval = 5}
    if(fmval != null){selectElement('fmdrop', fmval);}else{fmval = 5}
    if(treeval != null){selectElement('patchesdrop', treeval);}else{treeval = 5}
    if(seedval != null){selectElement('seeddrop', seedval);}else{seedval = 3}
    if(lights == "true"){lights = true;}else{lights=false}
    console.log(lights);
    //ApplyLightClass();
    console.log(treeval + ":t   s:" +seedval)
    //If there is no slayer XP in URL, set slayer XP to 40 000
    if(slXpPerHour == null){ 	slXpPerHour = 40000; }
    //Set the slayer input to reflect our slayer xp average
	selectElement('slayerAverage', slXpPerHour);
    
}



function selectElement(id, valueToSelect) {
    //Apply saved dropdown values to from URL to page to the actual dropdown on page
    let element = document.getElementById(id);
    if (valueToSelect != null) {
        element.value = valueToSelect;
    }
}

//*****Code for manual changes to dropdowns*****

function MaDropdownUpdate() {
    //Get the value selected
    var maDrop = document.getElementById("madrop");
    //Update the global dropdown value
    maval = maDrop.value;
    //Update the hours to 99 and max, and apply new value to URL
    //UpdateTh();
    //Try to update the XP for wc and Hours to 99 for wc via a shared function
    UpdateXPAndHours("ma", maval);
    FindCost();
    UpdateMax();
    UpdateURL();
}

function WcDropdownUpdate() {
    var wcDrop = document.getElementById("wcdrop");
    wcval = wcDrop.value;
    UpdateXPAndHours("wc", wcval);
    FindCost();
    UpdateMax();
    UpdateURL();
}

function RaDropdownUpdate() {
    var raDrop = document.getElementById("radrop");
    raval = raDrop.value;
    UpdateXPAndHours("ra", raval);
    FindCost();
    UpdateMax();
    UpdateURL();
}

function PrDropdownUpdate() {
    var prDrop = document.getElementById("prdrop");
    prval = prDrop.value;
    UpdateXPAndHours("pr", prval);
    FindCost();
    UpdateMax();
    UpdateURL();
}

function RuDropdownUpdate() {
    var ruDrop = document.getElementById("rudrop");
    ruval = ruDrop.value;
    UpdateXPAndHours("ru", ruval);
    FindCost();
    UpdateMax();
    UpdateURL();
}

function CoDropdownUpdate() {
    var coDrop = document.getElementById("codrop");
    coval = coDrop.value;
    UpdateXPAndHours("co", coval);
    FindCost();
    UpdateMax();
    UpdateURL();
}

function AgDropdownUpdate() {
    var agDrop = document.getElementById("agdrop");
    agval = agDrop.value;
    UpdateXPAndHours("ag", agval);
    FindCost();
    UpdateMax();
    UpdateURL();
}

function HeDropdownUpdate() {
    var heDrop = document.getElementById("hedrop");
    heval = heDrop.value;
    UpdateXPAndHours("he", heval);
    FindCost();
    UpdateMax();
    UpdateURL();
}

function ThDropdownUpdate() {
    var thDrop = document.getElementById("thdrop");
    thval = thDrop.value;
    UpdateXPAndHours("th", thval);
    FindCost();
    UpdateMax();
    UpdateURL();
}
function CrDropdownUpdate() {
    var crDrop = document.getElementById("crdrop");
    crval = crDrop.value;
    UpdateXPAndHours("cr", crval);
    FindCost();
    UpdateMax();
    UpdateURL();
}
function FlDropdownUpdate() {
    var flDrop = document.getElementById("fldrop");
    flval = flDrop.value;
    UpdateXPAndHours("fl", flval);
    FindCost();
    UpdateMax();
    UpdateURL();
}

function HuDropdownUpdate() {
    var huDrop = document.getElementById("hudrop");
    huval = huDrop.value;
    UpdateXPAndHours("hu", huval);
    FindCost();
    UpdateMax();
    UpdateURL();
}
function MiDropdownUpdate() {
	console.log("test");
    var miDrop = document.getElementById("midrop");
    mival = miDrop.value;
    UpdateXPAndHours("mi", mival);
    FindCost();
    UpdateMax();
    UpdateURL();
}
function SmDropdownUpdate() {
    var smDrop = document.getElementById("smdrop");
    smval = smDrop.value;
    UpdateXPAndHours("sm", smval);
    FindCost();
    UpdateMax();
    UpdateURL();
}
function FiDropdownUpdate() {
    var fiDrop = document.getElementById("fidrop");
    fival = fiDrop.value;
    UpdateXPAndHours("fi", fival);
    FindCost();
    UpdateMax();
    UpdateURL();
}
function CkDropdownUpdate() {
    var ckDrop = document.getElementById("ckdrop");
    ckval = ckDrop.value;
    UpdateXPAndHours("ck", ckval);
    FindCost();
    UpdateMax();
    UpdateURL();
}
function FmDropdownUpdate() {
    var fmDrop = document.getElementById("fmdrop");
    fmval = fmDrop.value;
    UpdateXPAndHours("fm", fmval);
    FindCost();
    UpdateMax();
    UpdateURL();
}


function FaDropdownUpdate() {
    UpdateFarmingXpAndHours();
    FindCost();
    UpdateMax();
    UpdateURL();
}


function SlTextUpdate(){
	var slayerInput = document.getElementById("slayerAverage");
	slXpPerHour = slayerInput.value;
	UpdateXPAndHours("sl",slXpPerHour)
	UpdateMax();
	UpdateURL();
}

//******End manual dropdown update code*****

function UpdateFarmingXpAndHours(){
	console.log("Updating Numer Of Farm Runs");
	treeval = document.getElementById("patchesdrop").value;
	seedval = document.getElementById("seeddrop").value;
	console.log("Tree drop: " + treeval + ". " + "Seed drop: " + seedval + ".");
	var patches = treePatchesArray[treeval - 1];
	var seedXp = seXpArray[seedval - 1];
	console.log("Tree patches: " + patches + ". " + "Xp per seed: " + seedXp + ".");
	var xpPerRun = patches * seedXp;
	var remainingFarmingXp = ninetyNine - faXp;
	if(remainingFarmingXp <= 0 ||  isNaN(remainingFarmingXp)){
		remainingFarmingXp = 0;
	}
	faRemainingRuns = remainingFarmingXp/xpPerRun;
	faRemainingRuns = Math.floor(faRemainingRuns);
	console.log("Remaining Farm Runs: " + faRemainingRuns);
	if(faRemainingRuns > 0){
    	document.getElementById('faFinal').innerText = faRemainingRuns + " farm runs remain.";
    }else{
    	document.getElementById('faFinal').innerText = "99 Achieved!";
    }
}

function UpdateXPAndHours(shortHand) {
	//console.log("Updating Xp and Hours for " + shortHand);
    //Find how much XP is selected per hour from the dropdown
    var newXpPerHour = 0;
    //Current XP of that skill
    var currentXp = 0;
    //Find which dropdown specifically was altered


    switch (shortHand) {
        //If Woodcutting drop was altered, check the xp in the array
        case "wc":
            newXpPerHour = wcXpArray[wcval-1];
            currentXp = wcXp;
            break;
        case "ma":
            newXpPerHour = maXpArray[maval-1];
            currentXp = maXp;
            break;

        case "ra":
            newXpPerHour = raXpArray[raval-1];
            currentXp = raXp;
            break;

        case "pr":
            newXpPerHour = prXpArray[prval-1];
            currentXp = prXp;
            break;

        case "ru":
            newXpPerHour = ruXpArray[ruval-1];
            currentXp = ruXp;
            break;

        case "co":
            newXpPerHour = coXpArray[coval-1];
            currentXp = coXp;
            break;

        case "ag":
            newXpPerHour = agXpArray[agval-1];
            currentXp = agXp;
            break;

        case "he":
            newXpPerHour = heXpArray[heval-1];
            currentXp = heXp;
            break;
        case "th":
            newXpPerHour = thXpArray[thval-1];
            currentXp = thXp;
            break;
        case "cr":
            newXpPerHour = crXpArray[crval-1];
            currentXp = crXp;
            break;
        case "fl":
            newXpPerHour = flXpArray[flval-1];
            currentXp = flXp;
            break;
        case "hu":
            newXpPerHour = huXpArray[huval-1];
            currentXp = huXp;
            break;
        case "mi":
            newXpPerHour = miXpArray[mival-1];
            currentXp = miXp;
            break;
        case "sm":
            newXpPerHour = smXpArray[smval-1];
            currentXp = smXp;
            break;
        case "fi":
            newXpPerHour = fiXpArray[fival-1];
            currentXp = fiXp;
            break;
        case "ck":
            newXpPerHour = ckXpArray[ckval-1];
            currentXp = ckXp;
            break;
        case "fm":
            newXpPerHour = fmXpArray[fmval-1];
            currentXp = fmXp;
            break;
        case "sl":
        	newXpPerHour = slXpPerHour;
        	currentXp = slXp;
        	break;
        default:
            console.log("Error updating XP in switch")
            break;
    }
    //console.log("Current xp for " + shortHand + " is " + currentXp + ". Xp per hour is " + newXpPerHour + "from drop val ");
    
    //Find out the goal xp for that skill
    var xpGoal = 0;

    if(currentTab == "max"){
        xpGoal = ninetyNine;
    }

    if(currentTab == "quest"){
        for(let i = 0; i < shorthandArray.length; i++){
            console.log(shorthandArray[i]);
            if(shorthandArray[i] == shortHand){
                //get the corresponding value from the matching array
                xpGoal = questXpGoalArray[i]
            }
        }
    }

    if(currentTab == "achievement"){
        for(let i = 0; i < shorthandArray.length; i++){
            console.log(shorthandArray[i]);
            if(shorthandArray[i] == shortHand){
                //get the corresponding value from the matching array
                xpGoal = achievementXpGoalArray[i]
            }
        }
    }


    var remXP = xpGoal - currentXp;

    //Here we can do a different calculation for remaning XP, instead of 99 as the end point

    if (remXP < 0) {
        remXP = 0
    };

    var remainingHours = remXP / newXpPerHour;
    remainingHours = Math.round(remainingHours * 10) / 10;
    if (shortHand == "wc") {
        wcHoursTotal = remainingHours;
    }
    if (shortHand == "pr") {
        prHoursTotal = remainingHours;
    }
    if (shortHand == "ma") {
        maHoursTotal = remainingHours;
    }
    if (shortHand == "ag") {
        agHoursTotal = remainingHours;
    }
    if (shortHand == "ra") {
        raHoursTotal = remainingHours;
    }
    if (shortHand == "he") {
        heHoursTotal = remainingHours;
    }
    if (shortHand == "th") {
        thHoursTotal = remainingHours;
    }
    if (shortHand == "ru") {
        ruHoursTotal = remainingHours;
    }
    if (shortHand == "co") {
        coHoursTotal = remainingHours;
    }
    if (shortHand == "cr") {
        crHoursTotal = remainingHours;
    }
    if (shortHand == "fl") {
        flHoursTotal = remainingHours;
    }
    if (shortHand == "hu") {
        huHoursTotal = remainingHours;
    }
    if (shortHand == "mi") {
        miHoursTotal = remainingHours;
    }
    if (shortHand == "sm") {
        smHoursTotal = remainingHours;
    }
    if (shortHand == "fi") {
        fiHoursTotal = remainingHours;
    }
    if (shortHand == "ck") {
        ckHoursTotal = remainingHours;
    }
    if (shortHand == "fm") {
        fmHoursTotal = remainingHours;
    }
    if (shortHand == "sl") {
        slHoursTotal = remainingHours;
    }

    if(!isNaN(remainingHours) && remainingHours != 0){
    	document.getElementById(shortHand + 'Final').innerText = remainingHours + " hours";
    }else{
        if(currentTab == "max"){
    	   document.getElementById(shortHand + 'Final').innerText = "99 Achieved!";
        }
        if(currentTab == "achievement"){
           document.getElementById(shortHand + 'Final').innerText = "Completed!";
        }
        if(currentTab == "quest"){
           document.getElementById(shortHand + 'Final').innerText = "Completed!";
        }
    }

    //lets also apply the hours from to goal from 0 for each skill to our
    // then get the total, and compare what percent of total hours are completed


    for(let i = 0; i < shorthandArray.length; i++){
        //current skill being updated, get location in array
        if(shortHand == shorthandArray[i]){
            //check how many hours
            zeroToGoalHoursArray[i] = xpGoal/newXpPerHour;
            console.log(shorthandArray[i] + "hours = " + zeroToGoalHoursArray[i]);
        }
    }
}

function SubmitUsername() {
    //the submit button was pressed!
    //check the username entered
    var newName = document.getElementById('fname').value;
    if (newName == "") {
        console.log("no username entered");
        //return;
    } else {
        console.log("username submitted:" + newName);
        user = newName;
        UpdateURL();
		RefreshPlayer(); //Refresh the players data from the hiscores website
		//Update Hours To 99 for each skill
		UpdateXPAndHours("ma", maval);
		UpdateXPAndHours("wc", wcval);
		UpdateXPAndHours("ra", raval);
		UpdateXPAndHours("pr", prval);
		UpdateXPAndHours("ru", ruval);
		UpdateXPAndHours("co", coval);
		UpdateXPAndHours("ag", agval);
		UpdateXPAndHours("he", heval);
		UpdateXPAndHours("th", thval);
		UpdateXPAndHours("cr", crval);
		UpdateXPAndHours("fl", flval);
		UpdateXPAndHours("sl", slXpPerHour);
		UpdateXPAndHours("hu", huval);
		UpdateXPAndHours("mi", mival);
		UpdateXPAndHours("sm", smval);
		UpdateXPAndHours("fi", fival);
		UpdateXPAndHours("ck", ckval);
		UpdateXPAndHours("fm", fmval);
		UpdateFarmingXpAndHours();
        //Update cost
        FindCost();
		//Update hours to max
		UpdateMax();
    }
}

function UpdateURL() {
    //console.log("Updating URL. user: " + user);
    // Construct URLSearchParams object instance from current URL querystring.
    var queryParams = new URLSearchParams(window.location.search);

    // Set new or modify existing parameter value where a value exists. 
    if (user != null) {
        queryParams.set("user", user);
    }
    if (maval != null) {
        queryParams.set("maval", maval);
    }
    if (wcval != null) {
        queryParams.set("wcval", wcval);
    }
    if (raval != null) {
        queryParams.set("raval", raval);
    }
    if (prval != null) {
        queryParams.set("prval", prval);
    }
    if (ruval != null) {
        queryParams.set("ruval", ruval);
    }
    if (coval != null) {
        queryParams.set("coval", coval);
    }
    if (agval != null) {
        queryParams.set("agval", agval);
    }
    if (heval != null) {
        queryParams.set("heval", heval);
    }
    if (thval != null) {
        queryParams.set("thval", thval);
    }
    if (crval != null) {
        queryParams.set("crval", crval);
    }
    if (flval != null) {
        queryParams.set("flval", flval);
    }
    if (huval != null) {
        queryParams.set("huval", huval);
    }
    if (mival != null) {
        queryParams.set("mival", mival);
    }
    if (smval != null) {
        queryParams.set("smval", smval);
    }
    if (fival != null) {
        queryParams.set("fival", fival);
    }
    if (ckval != null) {
        queryParams.set("ckval", ckval);
    }
    if (fmval != null) {
        queryParams.set("fmval", fmval);
    }
    if (treeval != null) {
        queryParams.set("trval", treeval);
    }
    if (seedval != null) {
        queryParams.set("seval", seedval);
    }


    // Replace current querystring with the new one.
    history.replaceState(null, null, "?" + queryParams.toString());

}

function RefreshPlayer(fromEnter) {
    console.log("***RefreshPlayer from Jagex is starting.***")
    if(fromEnter){
        console.log(document.getElementById('fname').value);
        console.log("Loaded by enter button");
        user = document.getElementById('fname').value
    }

    //set user xp levels to 0 as default
    maXp = 0;
    wcXp = 0;
    raXp = 0;
    ruXp = 0;
    prXp = 0;
    coXp = 0;
    agXp = 0;
    heXp = 0;
    thXp = 0;
    crXp = 0;
    flXp = 0;
    huXp = 0;
    miXp = 0;
    smXp = 0;
    fiXp = 0;
    ckXp = 0;
    fmXp = 0;

    document.getElementById('fname').value= user;
    if (user != null && user != "Player") {
        console.log("Loading user " + user);
        
    } else {
        console.log("no user to load");

        return;
    }
    //This code runs on page load, or submit username button.


    $.getJSON("https://corsproxy.io/?https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=" + user, function(result) {
        $.each(result, function(i, field) {

        	var i = 1;
        	while(i<24){
        		console.log(i);
        		if (field[i].xp != null) {
        			var dlxp = field[i].xp;
        			var dllvl = field[i].level
        			if (dlxp > 0){
        				//console.log("found " + shorthandArray[i] + " xp = " + field[i].xp);
        				lvlArray[i] = dllvl;
                    	//var myEle = document.getElementById(shorthandArray[i] + 'XpDisplay');
                    	//if(myEle){
                    	//	myEle.innerText = "" + lvlArray[i];
                    	//}
                	}
        		}
        		i++;
        	}
            ShowRequirement();
            //json player data is returned one line at a time
            //the key aka outer value is a number
            //key 7 contains all magic values for example
            //get keys of json object
            //	console.log(Object.keys(field));
            //find xp value of field 7, the brackets are needed if a key is a number... its weird
            if (field['7'].xp != null) {
                maXp = field['7'].xp;
                console.log("Mg XP dwnld:" + maXp)
                
            }
            if (field['9'].xp != null) {
                //Woodcutting
                wcXp = field['9'].xp;
                console.log("Wc XP dwnld: " + wcXp);
               
            }
            if (field['5'].xp != null) {
                //Ranges
                raXp = field['5'].xp;
                console.log("Ra XP dwnld: " + raXp);
            }
            if (field['6'].xp != null) {
                //Prayer
                prXp = field['6'].xp;
                console.log("Pr XP dwnld: " + prXp);
            }
            if (field['21'].xp != null) {
                //Runecraft
                ruXp = field['21'].xp;
                console.log("Rr XP dwnld: " + ruXp);
            }

            if (field['23'].xp != null) {
                //Runecraft
                coXp = field['23'].xp;
                console.log("Co XP dwnld: " + coXp);
            }
            if (field['17'].xp != null) {
                //Agility
                agXp = field['17'].xp;
                console.log("Ag XP dwnld: " + agXp);
            }
            if (field['16'].xp != null) {
                //Herblore
                heXp = field['16'].xp;
                console.log("He XP dwnld: " + heXp);
            }
            if (field['18'].xp != null) {
                //Herblore
                thXp = field['18'].xp;
                console.log("Thie XP dwnld: " + thXp);
            }
            if (field['13'].xp != null) {
                //Crafting
                crXp = field['13'].xp;
                console.log("Cra XP dwnld: " + crXp);
            }
            if (field['10'].xp != null) {
                //Crafting
                flXp = field['10'].xp;
                console.log("Fle XP dwnld: " + flXp);
            }

            if (field['19'].xp != null) {
                //Slayer
                slXp = field['19'].xp;
                console.log("Sla XP dwnld: " + slXp);
            }

            if (field['22'].xp != null) {
                //Hunter
                huXp = field['22'].xp;
                console.log("Hunter XP dwnld: " + huXp);
            }

            if (field['15'].xp != null) {
                //Mining
                miXp = field['15'].xp;
                console.log("Mining XP dwnld: " + miXp);
            }

            if (field['14'].xp != null) {
                //Smithing
                smXp = field['14'].xp;
                console.log("Smithing XP dwnld: " + smXp);
            }


            if (field['11'].xp != null) {
                //Fishing
                fiXp = field['14'].xp;
                console.log("Fishing XP dwnld: " + fiXp);
            }

            if (field['8'].xp != null) {
                //Cooking
                ckXp = field['8'].xp;
                console.log("Cooking XP dwnld: " + ckXp);
            }
            if (field['12'].xp != null) {
                //Firemaking
                fmXp = field['12'].xp;
                console.log("Firemaking XP dwnld: " + fmXp);
            }
            if (field['20'].xp != null) {
                //farming
                faXp = field['20'].xp;
                console.log("Farming XP dwnld: " + faXp);
            }


            //if you want to show the full json line
            console.log(field);
        });
    });

    console.log("***RefreshPlayer Is Ending.***")
}
function ShowRequirement(){
    //default value
    var goalLevel = 99;

    for(let i = 0; i < shorthandArray.length; i++){
        var levelDisplay = document.getElementById(shorthandArray[i] + "XpDisplay");
        if(currentTab == "quest"){goalLevel = questLvlArray[i]}
        if(currentTab == "achievement"){goalLevel = achLvlArray[i]}
        //if there is a display for that skill
        if(levelDisplay){
            levelDisplay.innerText = lvlArray[i] + "/" + goalLevel; 
        }
    }
}

function shorthandToXpGoal(shorthand){
    //By default, assume we are looking at max cape
    var xpForTab = ninetyNine ;
    //Skip all this if we are on the max tab. otherwise find value.
    if(currentTab != "max"){
        console.log("Non max tab selected");
        for(let i = 0; i < shorthandArray.length; i++){
            if(shorthandArray[i] == shorthand){
                //get the corresponding value from the matching array
                if(currentTab == "quest"){xpForTab = questXpGoalArray[i]}
                if(currentTab == "achievement"){xpForTab = achievementXpGoalArray[i];console.log("ach");}
            }
        }
    }
    return xpForTab;
}


function FindCost(){
    console.log("Finding cost of selected methods")

    var xpGoal = 0;

    //raGpArray shows the cost per XP point
    //Cannoning ice trolls is free
    raGpArray[0] = 0;
    //Pest control is 1 gp per XP? where a rune arrow has 20% chance to break, at 75 coins value
    raGpArray[1] = -0.1; 
    //Venator bow 9 coins per attack, attack is maybe 40 xp each? 9/40 
    raGpArray[2] = -0.2; 
    //Gp/Xp according to wiki
    raGpArray[3] = -3.2;
    raGpArray[4] = -4.7;
    raGpArray[5] = -8.4;


    //Calculate the total final cost
    //Find the remaing Ranged XP based on current goal.
    var remaningRangedXp = shorthandToXpGoal("ra") - raXp;
    
    //If less than 0, we set it to 0 so we don't get negative cost
    if (remaningRangedXp < 0){remaningRangedXp = 0;}
    //Cost = Xp * Cost per Xp
    racost = raGpArray[raval-1] * remaningRangedXp;  
    //Round it down  
    racost = Math.floor(racost);
    //Divide by 1 m
    racost = racost/1000000;
    //Show only 2 decimal places
    racost = Math.round(racost * 10) / 10;
    //Display result
    document.getElementById('raCost').innerText = racost + "m GP";


    //Pray xp per gp estimations
    prGpArray[0] = -7; //Big Binea
    prGpArray[1] = -10;
    prGpArray[2] = -11;
    prGpArray[3] = -12;
    prGpArray[4] = -14;
    prGpArray[5] = -22;


    var remainingPrayerXp = shorthandToXpGoal("pr") - prXp;
    if(remainingPrayerXp < 0){remainingPrayerXp = 0}
    prcost = prGpArray[prval-1] * remainingPrayerXp;
    prcost = Math.floor(prcost);
    prcost = prcost/1000000;
    prcost = Math.round(prcost * 10) / 10;
    document.getElementById('prCost').innerText = prcost + "m GP";

    //Mage gp Array
    maGpArray[0] = 7.7;//high level alchemy
    maGpArray[1] = 4.4;//plank make
    maGpArray[2] = -1;//String Jewellery spell
    maGpArray[3] = 7.7-3;//alch spell then stun spell
    maGpArray[4] = -2.5;//ice barrage cost given on wiki


    var remainingMagicXp = shorthandToXpGoal("ma") - maXp;
    if(remainingMagicXp < 0){remainingMagicXp = 0}
    macost = maGpArray[maval-1] * remainingMagicXp;
    macost = Math.floor(macost);
    macost = macost/1000000;
    macost = Math.round(macost * 10) / 10;
    document.getElementById('maCost').innerText = macost + "m GP";

    //Runecraft gp array
    ruGpArray[0] = 11;// blood runes
    ruGpArray[1] = -1;// solo lavas
    ruGpArray[2] = 10;// gotr 
    ruGpArray[3] = 5; //Ourania Altar
    ruGpArray[4] = 0; //arceeus books
    ruGpArray[5] = 5.7; //Steam runes


    var remainingRunecraftXp = shorthandToXpGoal("ru") - ruXp;
    if(remainingRunecraftXp < 0){remainingRunecraftXp = 0}
    rucost = ruGpArray[ruval-1] * remainingRunecraftXp;
    rucost = Math.floor(rucost);
    rucost = rucost/1000000;
    rucost = Math.round(rucost * 10) / 10;
    document.getElementById('ruCost').innerText = rucost + "m GP";

    //Construction Gp Per Xp estimates
    coGpArray[0] = -6.5; //Contracts mahogany homes
    coGpArray[1] = -7.9; //Mythical capes
    coGpArray[2] = -8.5; //Oak Larders
    coGpArray[3] = -8.5; //Oak dungeon doors
    coGpArray[4] = -10.8;//Teak benches
    coGpArray[5] = -16.2; //Mahogany Furniture
    coGpArray[6] = -16.2; //Gnome Benches

    var remainingConstructionXp = shorthandToXpGoal("co") - coXp;
    if(remainingConstructionXp < 0){remainingConstructionXp = 0}
    cocost = coGpArray[coval-1] * remainingConstructionXp;
    cocost = Math.floor(cocost);
    cocost = cocost/1000000;
    cocost = Math.round(cocost * 10) / 10;
    document.getElementById('coCost').innerText = cocost + "m GP";

    //Mark of grace 8500 gp ea, X 15 per hour = 127500/xp per hour
    agGpArray[0] = (8500*15)/agXpArray[0];
    agGpArray[1] = 5;// 5 ish gp per xp from wilderness agility loot?
    agGpArray[2] = (8500*17)/agXpArray[2];
    agGpArray[3] = (8500*14)/agXpArray[3];
    agGpArray[4] = (8500*18)/agXpArray[4];
    agGpArray[5] = 0; //Rewards with crystal shards
    agGpArray[6] = 10; //Approx 100m gp total to 99 doing grand hallowed coffin

    var remainingAgilityXp = shorthandToXpGoal("ag") - agXp;
    if(remainingAgilityXp < 0){remainingAgilityXp = 0}
    agcost = agGpArray[agval-1] * remainingAgilityXp;
    agcost = Math.floor(agcost);
    agcost = agcost/1000000;
    agcost = Math.round(agcost * 10) / 10;
    document.getElementById('agCost').innerText = agcost + "m GP";

    //Mark of grace 8500 gp ea, X 15 per hour = 127500/xp per hour
    heGpArray[0] = 0; //Degrime torstol spell breaks even!
    heGpArray[1] = -26; //This is probably not viable hahaha
    heGpArray[2] = -9; //combat potion
    heGpArray[3] = -9; //Magic potion
    heGpArray[4] = -33; //Ancient brew


    var remainingHerbloreXp = shorthandToXpGoal("he") - heXp;
    if(remainingHerbloreXp < 0){remainingHerbloreXp = 0}
    hecost = heGpArray[heval-1] * remainingHerbloreXp;
    hecost = Math.floor(hecost);
    hecost = hecost/1000000;
    hecost = Math.round(hecost * 10) / 10;
    document.getElementById('heCost').innerText = hecost + "m GP";

    thGpArray[0] = 3;//master farmers
    thGpArray[1] = 16;// elves
    thGpArray[2] = 23; // vyres
    thGpArray[3] = 1.2; //ardy knights
    thGpArray[4] = 0.9; //blackjacking
    thGpArray[5] = 0.8; //rogues castle chests
    thGpArray[6] = 3.5; //pyramid plunder

    var remainingThievingXp = shorthandToXpGoal("th") - thXp;
    if(remainingThievingXp < 0){remainingThievingXp = 0}
    thcost = thGpArray[thval-1] * remainingThievingXp;
    thcost = Math.floor(thcost);
    thcost = thcost/1000000;
    thcost = Math.round(thcost * 10) / 10;
    document.getElementById('thCost').innerText = thcost + "m GP";

    crGpArray[0] = 3.39;//dragonstone bracelets
    crGpArray[1] = -0.5;// cut rubies
    crGpArray[2] = -2.5; // cut diamonds
    crGpArray[3] = -14; //cut dragonstones
    crGpArray[4] = -8.5; //blackjacking

    var remainingCraftingXp = shorthandToXpGoal("cr") - crXp;
    if(remainingCraftingXp < 0){remainingCraftingXp = 0}
    crcost = crGpArray[crval-1] * remainingCraftingXp;
    crcost = Math.floor(crcost);
    crcost = crcost/1000000;
    crcost = Math.round(crcost * 10) / 10;
    document.getElementById('crCost').innerText = crcost + "m GP";


    flGpArray[0] = -6;//mith dart
    flGpArray[1] = -10;//Addy dart
    flGpArray[2] = -28; //Rune darts
    flGpArray[3] = -10; //Amethyst dart
    flGpArray[4] = -13; //dragon dart

    var remainingFletchingXp = shorthandToXpGoal("fl") - flXp;
    if(remainingFletchingXp < 0){remainingFletchingXp = 0}
    flcost = flGpArray[flval-1] * remainingFletchingXp;
    flcost = Math.floor(flcost);
    flcost = flcost/1000000;
    flcost = Math.round(flcost * 10) / 10;
    document.getElementById('flCost').innerText = flcost + "m GP";


    huGpArray[0] = 0;//kebits
    huGpArray[1] = 6.1; //red chins
    huGpArray[2] = 0; // salamamders
    huGpArray[3] = 1.6; //herbi
    huGpArray[4] = 10; // black chins
    huGpArray[5] = 0; //hunter rumors

    var remainingHunterXp = shorthandToXpGoal("hu") - huXp;
    if(remainingHunterXp < 0){remainingHunterXp = 0}
    hucost = huGpArray[huval-1] * remainingHunterXp;
    hucost = Math.floor(hucost);
    hucost = hucost/1000000;
    hucost = Math.round(hucost * 10) / 10;
    document.getElementById('huCost').innerText = hucost + "m GP";



    miGpArray[0] = 1; //stars
    miGpArray[1] = 0; // iron ore
    miGpArray[2] = 9; //Motherloade mine
    miGpArray[3] = 5; //blast mine
    miGpArray[4] = 10; //gem rocks
    miGpArray[5] = 3.5; //crystal tool seed at Zalcano
    miGpArray[6] = 2; //zalcano
    miGpArray[7] = 2; //

    var remainingMiningXp = shorthandToXpGoal("mi") - miXp;
    if(remainingMiningXp < 0){remainingMiningXp = 0}
    micost = miGpArray[mival-1] * remainingMiningXp;
    micost = Math.floor(micost);
    micost = micost/1000000;
    micost = Math.round(micost * 10) / 10;
    document.getElementById('miCost').innerText = micost + "m GP";


    smGpArray[0] = 1; //Giants Foundry
    smGpArray[1] = 1; //Anvil Smithing
    smGpArray[2] = -1.2; //blast furnace

    var remainingSmithingXp = shorthandToXpGoal("sm") - smXp;
    if(remainingSmithingXp < 0){remainingSmithingXp = 0}
    smcost = smGpArray[smval-1] * remainingSmithingXp;
    smcost = Math.floor(smcost);
    smcost = smcost/1000000;
    smcost = Math.round(smcost * 10) / 10;
    document.getElementById('smCost').innerText = smcost + "m GP";


    fiGpArray[0] = 0; //Fly Fishing
    fiGpArray[1] = 0; //Barb fishing
    fiGpArray[2] = 0.8; //Tempoross
    fiGpArray[3] = -4; //Drift net fishing

    var remainingFishingXp = shorthandToXpGoal("fi") - fiXp;
    if(remainingFishingXp < 0){remainingFishingXp = 0}
    ficost = fiGpArray[fival-1] * remainingFishingXp;
    ficost = Math.floor(ficost);
    ficost = ficost/1000000;
    ficost = Math.round(ficost * 10) / 10;
    document.getElementById('fiCost').innerText = ficost + "m GP";

    ckGpArray[0] = 0.5;//lobster
    ckGpArray[1] = 0.4; //karambwan
    ckGpArray[2] = 0;//angler
    ckGpArray[3] = -2; //bake pie
    ckGpArray[4] = 0.2;//1t karam

    var remainingCookingXp = shorthandToXpGoal("ck") - ckXp;
    if(remainingCookingXp < 0){remainingCookingXp = 0}
    ckcost =ckGpArray[ckval-1] * remainingCookingXp;
    clcost = Math.floor(ckcost);
    ckcost = ckcost/1000000;
    ckcost = Math.round(ckcost * 10) / 10;
    document.getElementById('ckCost').innerText = ckcost + "m GP";


    fmGpArray[0] = -3.3; //mahogany
    fmGpArray[1] = -1.5; //yew
    fmGpArray[2] = 1;//wintertodt
    fmGpArray[3] = -3.6; //magic
    fmGpArray[4] = -1.7; //redwood

    var remainingFiremakingXp = shorthandToXpGoal("fm") - fmXp;
    if(remainingFiremakingXp < 0){remainingFiremakingXp = 0}
    fmcost =fmGpArray[fmval-1] * remainingFiremakingXp;
    fmcost = Math.floor(fmcost);
    fmcost = fmcost/1000000;
    fmcost = Math.round(fmcost * 10) / 10;
    document.getElementById('fmCost').innerText = fmcost + "m GP";


    wcGpArray[0] = 0; //redwood
    wcGpArray[1] = 0; //blisterwood
    wcGpArray[2] = 0.3;//Forrestry at yews
    wcGpArray[3] = 0;//teaks
    wcGpArray[4] = -0.05; //scullicieps

    var remainingWoodcuttingXp = shorthandToXpGoal("wc") - wcXp;
    if(remainingWoodcuttingXp < 0){remainingWoodcuttingXp = 0}
    wccost =wcGpArray[wcval-1] * remainingWoodcuttingXp;
    wccost = Math.floor(wccost);
    wccost = wccost/1000000;
    wccost = Math.round(wccost * 10) / 10;
    document.getElementById('wcCost').innerText = wccost + "m GP";


    faGpArray[0] = -1.5; 
    faGpArray[1] = -5.2;
    faGpArray[2] = -9.8;

    var remainingFarmingXp = shorthandToXpGoal("fa") - faXp;
    if(remainingFarmingXp < 0){remainingFarmingXp = 0}
    facost =faGpArray[seedval-1] * remainingFarmingXp;
    facost = Math.floor(facost);
    facost = facost/1000000;
    facost = Math.round(facost * 10) / 10;
    document.getElementById('faCost').innerText = facost + "m GP";


}

function UpdateMax() {
    goalHoursTotal = wcHoursTotal + maHoursTotal + raHoursTotal + ruHoursTotal + prHoursTotal +
        coHoursTotal + thHoursTotal + heHoursTotal + agHoursTotal + crHoursTotal + flHoursTotal + huHoursTotal
        + miHoursTotal + smHoursTotal + fiHoursTotal + ckHoursTotal + fmHoursTotal + slHoursTotal;

    console.log("New goal hours total =========" + goalHoursTotal);
    document.getElementById("goalHoursDisplay").innerText = Math.floor(goalHoursTotal) + " h";

    goalGpTotal = racost+prcost+macost+rucost+cocost+agcost+hecost+thcost+crcost+flcost+hucost
    +micost+smcost+ficost+ckcost+fmcost+wccost+facost;

    goalGpTotal = Math.floor(goalGpTotal);
    document.getElementById("goalGpDisplay").innerText = goalGpTotal + " m";
    document.getElementById("goalFarmDisplay").innerText = faRemainingRuns;
    document.getElementById("goalNameDisplay").innerText = user;
    if(user=="" || user==null){
        document.getElementById("goalNameDisplay").innerText = "Player";
    }

    var totalLevelsNeeded = 0;
    var totalSkillsCompleted = 0;

    for(let i = 1; i < lvlArray.length; i++){
        var levelsNeeded = 0;
        if(currentTab == "quest"){
            levelsNeeded = questLvlArray[i] - lvlArray[i];
        }
        if(currentTab == "achievement"){
            levelsNeeded = achLvlArray[i] - lvlArray[i]
        }
        if(currentTab == "max"){
            levelsNeeded = maxLvlArray[i] - lvlArray[i]
        }
        if (levelsNeeded <= 0 ){
            levelsNeeded = 0;
            totalSkillsCompleted ++;
        }
        totalLevelsNeeded += levelsNeeded;
    }

    //hours to goal from scratch
    var hoursFromZero = 0;
    for(let i = 0; i < zeroToGoalHoursArray.length; i++){
        hoursFromZero += zeroToGoalHoursArray[i];
        console.log("Zero to goal hours array i = " + i + " ,hours = " + zeroToGoalHoursArray[i] + " skill:" + shorthandArray[i]);
    }
    console.log("hours to goal from 0: " + hoursFromZero);

    console.log("remaining hours: " + (goalHoursTotal));
    var hoursCompleted = (hoursFromZero - goalHoursTotal);
    console.log("hours completed: " + (hoursCompleted));
    var percentCompleted = (hoursCompleted/hoursFromZero)*100;
    percentCompleted = (Math.round(percentCompleted * 100) / 100).toFixed(2);
    console.log("Percent completed: " + percentCompleted + "%");
    document.getElementById("progressPercent").setAttribute("style","width:" + percentCompleted + "%");


    document.getElementById('goalLvlsNeededDisplay').innerText = totalLevelsNeeded;
    document.getElementById('goalLvlsNeededDisplay').innerText = totalLevelsNeeded;
    document.getElementById('goalCompleteSkillsDisplay').innerText = totalSkillsCompleted + "/23";


}

function SaveAll() {
    alert("!Bookmark this page to save your selections, and automatically update your xp next time you visit!");
}

function Lightswitch(){
	//Turn the lights on or off
	lights = !lights;
	console.log("Turning lights");
	ApplyLightClass();
}

function ApplyLightClass() {
	console.log("Setting ligts " + lights);
	if(lights){
			console.log("Lights on");
			document.getElementById('maincontent').setAttribute('class', 'light-background maxw')
			//document.getElementById('thebody').setAttribute('class', 'whitebg');
			document.getElementById('lightslider').setAttribute('class', 'slider round bluefont');
			$("#lightinput").prop('checked', true);
	}
	if(lights === false){
			document.getElementById('maincontent').setAttribute('class', 'dark-background maxw');
			//document.getElementById('wholescreen').setAttribute('class', 'blackbg');
			document.getElementById('lightslider').setAttribute('class', 'slider round whitefont');
			$("#lightinput").prop('checked', false);
	}
	
	var queryParams = new URLSearchParams(window.location.search);
	queryParams.set("l", lights);
    history.replaceState(null, null, "?" + queryParams.toString());
}