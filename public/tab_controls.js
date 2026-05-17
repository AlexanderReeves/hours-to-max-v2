function setTab(tabname) {

    console.log(tabname);
    currentTab = tabname;
    ChangeGoal(tabname);
            
      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("typebutton");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
      }
    
    var element = document.getElementById(tabname);
      element.classList.add("active");
    
      var themedElements = document.getElementsByClassName("theme");
      for (i = 0; i < themedElements.length; i++) {
        themedElements[i].className = themedElements[i].className.replace("themered", "newtheme");
        themedElements[i].className = themedElements[i].className.replace("themegreen", "newtheme");
        themedElements[i].className = themedElements[i].className.replace("themeblue", "newtheme");        
        themedElements[i].className = themedElements[i].className.replace("themepurple", "newtheme");
      }
      for (i = 0; i < themedElements.length; i++) {
        if(tabname == "max"){
           themedElements[i].className = themedElements[i].className.replace("newtheme", "themered");
          document.getElementById('intro').innerText =
           "How long does it take to Max in Old School Runescape?";
           document.getElementById('goalCapeDisplay').innerText = "Max Cape";
           document.getElementById("finalCape").classList.remove('finalQuest');       
           document.getElementById("finalCape").classList.remove('finalAchievement');       
           document.getElementById("finalCape").classList.add('finalMax');
        }
    
        if(tabname == "quest"){
           themedElements[i].className = themedElements[i].className.replace("newtheme", "themeblue");
          document.getElementById('intro').innerText =
           "Find how many hours until you have all the levels for the Quest Cape.";
           document.getElementById('goalCapeDisplay').innerText = "Quest Cape";
           document.getElementById("finalCape").classList.remove('finalMax');       
           document.getElementById("finalCape").classList.remove('finalAchievement');       
           document.getElementById("finalCape").classList.add('finalQuest');
        }

        if(tabname == "custom"){
           themedElements[i].className = themedElements[i].className.replace("newtheme", "themepurple");
          document.getElementById('intro').innerText =
           "Find how many hours until you have all the levels for a custom goal.";
           document.getElementById('goalCapeDisplay').innerText = "Custom Cape";
           document.getElementById("finalCape").classList.remove('finalMax');       
           document.getElementById("finalCape").classList.remove('finalAchievement');       
           document.getElementById("finalCape").classList.add('finalCustom');

           //Get the level display based on the class name, add or remove the extra class to make room for the goal input and make it visible
            $('.levelDisplayText').addClass('levelDisplayTextCustom');
            $('.levelDisplayInput').addClass('levelDisplayInputCustom');
            //Then remove these extra classes and hide the text box when not on custom tab
        }else{
            $('.levelDisplayText').removeClass('levelDisplayTextCustom');
            $('.levelDisplayInput').removeClass('levelDisplayInputCustom');
        }
    
        if(tabname == "achievement"){
           themedElements[i].className = themedElements[i].className.replace("newtheme", "themegreen");
           //bodyDiv.classList.add("greenbody");
          document.getElementById('intro').innerText =
           "Find how many hours until you have all the levels for the Achievement Diary Cape.";
          //document.getElementById('tabtext').innerText =
          // "Achievement Cape";
           document.getElementById('goalCapeDisplay').innerText = "Achievement Cape";
    
           document.getElementById("finalCape").classList.remove('finalQuest');       
           document.getElementById("finalCape").classList.remove('finalMax');       
           document.getElementById("finalCape").classList.add('finalAchievement');
    
        }
      }
      ShowAndHideCompleted(false);
      Sort(false);
      ToggleBoosting();
}
    