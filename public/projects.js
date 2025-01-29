function ExpandSection(sectionName){
    //If on mobile the item should appear after it's card
    //Mobile is 980px
    var $window = $(window);
    var windowsize = $window.width();
    if (windowsize > 980) {
        $("#" + sectionName + "desktop").toggleClass("hidden");
    }else{
        $("#" + sectionName + "mobile").toggleClass("hidden");
    }
    //If on desktop the item should appear after it's section


    //Hide or unhide the item
    $("#" + sectionName).toggleClass("hidden");
    console.log(sectionName);

    
}