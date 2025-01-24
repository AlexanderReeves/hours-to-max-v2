function ExpandSection(sectionName){
    //If on mobile the item should appear after it's card
    //Mobile is 980px
    var $window = $(window);
    var windowsize = $window.width();
    if (windowsize > 980) {
        $("#machinelearning").appendTo($("machinelearningdesktop"));
        console.log("Hello big");
    }else{
        $("#machinelearning").appendTo($("machinelearningmobile"));
        console.log("Hello small");
    }
    //If on desktop the item should appear after it's section


    //Hide or unhide the item
    $("#" + sectionName).toggleClass("hidden");

    
}