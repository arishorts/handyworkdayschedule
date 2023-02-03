//https://stackoverflow.com/questions/61339968/error-message-devtools-failed-to-load-sourcemap-could-not-load-content-for-chr
//https://www.udemy.com/course/jquery-tutorial/learn/lecture/4968932#notes
//https://day.js.org/en/
var parseSchedule = {};
var obj = {
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

function init() {
  getStoredSchedule();
  setStoredSchedule();
  setVisualIndicator();
}

//parse object from localstorage with included verification step
function getStoredSchedule() {
  try {
    var jsonString = localStorage.getItem("storageSchedule");
    if (jsonString) {
      parseSchedule = JSON.parse(jsonString);
      //set obj equal to all key-value pairs in the parsed schedule
      obj = parseSchedule;
    }
  } catch (error) {
    console.error("Error parsing stored schedule:", error);
  }
}

//set the localstorage values for obj to the corresponding textareas at specified times when document has fully loaded
function setStoredSchedule() {
  $(document).ready(function () {
    for (let key in parseSchedule) {
      $("h3").each(function (index) {
        if (key === $(this).text()) {
          newtextarea = $(this).parent().find("textarea");
          if (parseSchedule[key]) {
            newtextarea.val(parseSchedule[key]);
          }
        }
      });
    }
  });
}

function setVisualIndicator() {
  $(function () {
    //chore: add a set of code that when time is after 6Pm then make all divs grey
    //https://day.js.org/docs/en/plugin/advanced-format
    const headerNow = dayjs().format("dddd, MMM Do YYYY");
    $("h2:last").text(headerNow);
    const now = dayjs();
    let nowText = now.format("h A");
    let timeDivs = $(".block__hour");
    let nowEl = timeDivs.filter(function () {
      return $(this).text() === nowText;
    });
    //sets the textbox for the current time of day to red
    nowEl
      .parent()
      .find("textarea")
      .css({ "background-color": "red", "z-index": "0", cursor: "pointer" });
    //all previous textboxes are set to grey
    var $previousCousins = nowEl.parent().prevAll("div").find("textarea");
    $previousCousins.css({
      "background-color": "grey",
      "z-index": "0",
      cursor: "pointer",
    });
    //if the time of day is passed 5 then all boxes will remain grey until the day resets
    if (nowText.split(" ")[0] > 5 && nowText.split(" ")[1] == "PM") {
      $("textarea").css({
        "background-color": "grey",
        "z-index": "0",
        cursor: "pointer",
      });
    }
  });
}

//displays a message at the top of the screen when the user updates the localstorage with the save button
function showLocalStorageUpdate() {
  $(".localStorageUpdate").css({ visibility: "visible" });
  setTimeout(function () {
    $(".localStorageUpdate").stop().css({ visibility: "hidden" });
  }, 1000);
}

$(function () {
  //save events that we want in localstorage (variable set to storageSchedule)
  $("a").on("click", function (event) {
    event.preventDefault();
    showLocalStorageUpdate();
    var hour = $(this).parent().find("h3").text();
    var textarea = $(this).parent().find("textarea").val();
    obj[hour] = textarea;
    var stringifySchedule = JSON.stringify(obj);
    localStorage.setItem("storageSchedule", stringifySchedule);
  });
});

//initialize with getting and setting the schedule
init();
