function ApplyCapeTheme(capeFileName) {
  var capeThemeMap = {
    "Max_cape.webp": {
      themeClass: "themered",
      introText: "How long does it take to Max in Old School Runescape?",
      displayName: "Max Cape"
    },
    "achievement_cape.webp": {
      themeClass: "themegreen",
      introText: "Find how many hours until you have all the levels for the Achievement Diary Cape.",
      displayName: "Achievement Cape"
    },
    "custom_cape.webp": {
      themeClass: "themepurple",
      introText: "Find how many hours until you have all the levels for a custom goal.",
      displayName: "Custom Cape"
    },
    "quest_cape.webp": {
      themeClass: "themeblue",
      introText: "Find how many hours until you have all the levels for the Quest Cape.",
      displayName: "Quest Cape"
    }
  };

  var selectedCape = capeThemeMap[capeFileName] ? capeFileName : "Max_cape.webp";
  var selectedTheme = capeThemeMap[selectedCape];

  var themedElements = document.getElementsByClassName("theme");
  for (var i = 0; i < themedElements.length; i++) {
    themedElements[i].classList.remove("themered", "themegreen", "themeblue", "themepurple");
    themedElements[i].classList.add(selectedTheme.themeClass);
  }

  var introEl = document.getElementById('intro');
  if (introEl) {
    introEl.innerText = selectedTheme.introText;
  }

  var goalCapeEl = document.getElementById('goalCapeDisplay');
  if (goalCapeEl) {
    goalCapeEl.innerText = selectedTheme.displayName;
  }
}

// Backward compatible wrapper if old code still calls setTab.
function setTab(tabname) {
  var tabToCape = {
    "max": "Max_cape.webp",
    "achievement": "achievement_cape.webp",
    "custom": "custom_cape.webp",
    "quest": "quest_cape.webp"
  };
  ApplyCapeTheme(tabToCape[tabname] || "Max_cape.webp");
}
    