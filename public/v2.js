function SaveChoicesToDatabase() { // intercepts the submit event
    //Instead of getting a public userid, we should get the encrypted JWT and 
    //find the user id contained, so that people dont alter their own cookies to overwite other
    //peoples account data!

    auth = $.cookie("authorization");
    if(auth){
        console.log("I am trying to access raval" + raval)
        console.log('Saving user selections to the databse for user ' +$.cookie("userid"));
        //clear result message
        $("#result").html('&nbsp;');
        $.ajax({ // make an AJAX request
            type: "POST",
            url: "/save/choices", // it's the URL of your component B
            data: '&auth=' + auth + 
            '&rangedChoice=' + raval + 
            '&magicChoice=' + maval + 
            '&prayerChoice=' + prval + 
            '&woodcuttingChoice=' + wcval + 
            '&runecraftChoice=' + ruval + 
            '&constructionChoice=' + coval + 
            '&agilityChoice=' + agval + 
            '&herbloreChoice=' + heval + 
            '&thievingChoice=' + thval + 
            '&craftingChoice=' + crval + 
            '&fletchingChoice=' + flval + 
            '&hunterChoice=' + huval + 
            '&miningChoice=' + mival +
            '&smithingChoice=' + smval + 
            '&fishingChoice=' + fival + 
            '&cookingChoice=' + ckval + 
            '&firemakingChoice=' + fival + 
            '&seedChoice=' + seedval +
            '&patchesChoice=' + treeval +
            '&slayerChoice=' + slXpPerHour,
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
                $("#result").html("An error occurred.");
                $("#result").removeClass("success");
                $("#result").addClass("fail");
                return false;
            }
            

        });
    }else{
        $("#result").html("Please register or sign in in a new tab and then you can return here to save your selections! Note: Due to background changes, choices can no longer be saved into the URL Queries/bookmarks.");
        $("#result").removeClass("success");
        $("#result").addClass("fail");
    }
     // avoid to execute the actual submit of the form
}