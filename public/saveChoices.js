window.addEventListener('load', function() {
    //The event listener waits for the page load event to complete
  });
  

function SaveChoicesToDatabase() {
    //Checks for valid auth code, gets that username, saves choices to database
    auth = $.cookie("authorization");
    if(auth){
        console.log('Saving user selections to the databse.');

        //Create data for an ajax post, containing each skill name and corresponding selection
        var postData = '&auth=' + auth
        skills.forEach(element => {
            postData = postData.concat('&' + element.name + '=' + element.dropdownSelection +'Choice');
        });
        console.log("Attempint to post this data string... " + postData);

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
                $("#result").html("An error occurred.");
                $("#result").removeClass("success");
                $("#result").addClass("fail");
                return false;
            }
            

        });
    }else{
        $("#result").html("Please register first before saving your choices! You can register in another tab and then return here so your current choices aren't lost.");
        $("#result").removeClass("success");
        $("#result").addClass("fail");
    }
     // avoid to execute the actual submit of the form
}