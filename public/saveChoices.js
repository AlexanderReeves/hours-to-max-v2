window.addEventListener('load', function() {
    //The event listener waits for the page load event to complete
  });
  

function SaveChoicesToDatabase() {
    //Checks for valid auth code, gets that username, saves choices to database
    auth = $.cookie("authorization");
    if(auth){

        //If uset is logged in, save choices to database
        console.log('Saving user selections to the databse.');

        //Json Version NOT YET IN USE
        var jsonPostData = {
            auth: auth,
            username: user,
            currentGoal: currentTab,
            sortChoice: document.getElementById('sortButton') ? document.getElementById('sortButton').dataset.sortState || '0' : '0',
            showCompletedChoice: window.showCompletedSkills !== undefined ? window.showCompletedSkills : true,
            hoursPerDay: (function() {
                const hoursInput = document.getElementById('hoursPerDayInput');
                const value = hoursInput ? parseFloat(hoursInput.value) : '';
                return isNaN(value) || value <= 0 ? '1' : value.toString();
            })()
        };
        //console.log("Initial JSON data to post: ", jsonPostData);

        //Loop through each dropdown
        //get the skill name, get the text value, get the xp, get the gp

        var trainingMethodsToSave = {};
        // 1. Find all training method parents and loop through them
        $('.trainingSelectionParent').each(function() {
            // $(this) refers to the current parent div
            //console.log("Parent ID:", this.id);




            let selectedMethod = "";

            // Inner loop: iterates through immediate child input divs of the current parent
            $(this).find('input').each(function() {
                //console.log($(this).val());
                // $(this) now refers to the current child div
                if(this.classList.contains('trainingMethodSelector')) {                    
                    //console.log("Child Text:", $(this).text() || $(this).val()); // Use .text() for divs and .val() for inputs
                    const selectedMethodName = $(this).val();
                    const skillName = this.id.replace("trainingMethodSelector", "");
                    //Get the skill details based on the dropdown text from the training methods array
                    if(selectedMethodName == null){
                        selectedMethodName = "Custom Method";
                    }
                    selectedMethod = trainingMethods.find(method => method.name === selectedMethodName && method.skill === skillName);
                    //log the details of the selected method (or undefined if no match was found)
                    if(selectedMethod == null || selectedMethod == undefined) {
                        //console.error("Selected training method does not match a known method. A custom method with 100k XP/hr and 0 gp/xp was saved.");
                        selectedMethod = {name: selectedMethodName, xpPerHour: 100000, profitPerXp: 0, skill: skillName};
                    }
                    //console.log("Selected method details: ", selectedMethod);
                }                            
            });
            
            //console.log("Selected method details outside of loop: ", selectedMethod);

            //Get the expanded section
            //console.log($(this).next().attr('id'));;
            $(this).next().find('input').each(function() {
                //console.log("Found input in expanded section: " + this.id + " with value: " + $(this).val());
                var idAsString = $(this).attr("id");
                if(idAsString.includes("Boost")){ 
                  selectedMethod.levelsBoosted = $(this).val();
                }
                if(idAsString.includes("CustomXp")){ 
                  selectedMethod.xpPerHour = $(this).val();
                }
                if(idAsString.includes("CustomGp")){ 
                  selectedMethod.profitPerXp = $(this).val();
                }

            });
            if(selectedMethod.name == null || selectedMethod.name == undefined || selectedMethod.name.trim() === "") {
                selectedMethod.name = "Custom Method";
            }
            //console.log("Selected method details: ", selectedMethod);

            trainingMethodsToSave[selectedMethod.skill + "Data"] = selectedMethod;
            

        });
        jsonPostData["trainingMethods"] = trainingMethodsToSave;
        console.log("Final JSON data to post: ", jsonPostData);



        //END NEW VERSION #########################################################


        console.log("Attemping to post this data string... " + postData);


        //AJAX POST TO BE UPDATED TO POST JSON INSTEAD OF STRINGIFYING IT FIRST
        //clear result message
        $("#result").html('&nbsp;');
        $.ajax({ // make an AJAX request
            type: "POST",
            url: "/save/choices", // it's the URL of your component B
            data: postData,
            // serializes the form's elements
            success: function (data) {
                // show the data you got from B in result div
                console.log('Success');
                $("#result").html('Your choices were saved!');
                $("#result").removeClass("fail");
                $("#result").addClass("success");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('Submit returned errors');
                jsonErrorMessage = XMLHttpRequest.responseJSON.error;
                $("#result").html("An error occurred. One of your inputs may be invalid, or the server may be experiencing a problem. " + errorThrown + ".");
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