//https://stackoverflow.com/questions/61339968/error-message-devtools-failed-to-load-sourcemap-could-not-load-content-for-chr
//https://www.udemy.com/course/jquery-tutorial/learn/lecture/4968932#notes
//https://day.js.org/en/

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

//parse object from localstorage with included verification step
var jsonString = localStorage.getItem("storageSchedule");
if (jsonString) {
  var parseSchedule = JSON.parse(jsonString);
  //set obj equal to all key-value pairs in the parsed schedule
  obj = parseSchedule;
} else {
  console.log("myVariable is undefined");
}

//set the localstorage values for obj to the corresponding textareas at specified times when document has fully loaded
$(document).ready(function () {
  for (let key in parseSchedule) {
    $("h3").each(function (index) {
      if (key === $(this).text()) {
        // console.log($(this).text());
        newtextarea = $(this).parent().find("textarea");
        // console.log(parseSchedule[key]);
        // console.log(newtextarea.val);
        if (parseSchedule[key]) {
          newtextarea.val(parseSchedule[key]);
        }
      }
    });
  }
});

//find the time of day
$(function () {
  const now = dayjs();
  let specifiedText = now.format("h A");
  let divs = $(".block__hour");
  let matchingDivs = divs.filter(function () {
    return $(this).text() === specifiedText;
  });
  matchingDivs.parent().find("textarea").css({ "background-color": "grey" });
});

$(function () {
  //save events that we want in localstorage (variable set to storageSchedule)
  $("a").on("click", function (event) {
    event.preventDefault();
    $(".lSUpdate").css({ visibility: "visible" });
    setTimeout(function () {
      $(".lSUpdate").stop().css({ visibility: "hidden" });
    }, 1000);
    var hour = $(this).parent().find("h3").text();
    var textarea = $(this).parent().find("textarea").val();
    obj[hour] = textarea;
    console.log(obj);
    var stringifySchedule = JSON.stringify(obj);
    localStorage.setItem("storageSchedule", stringifySchedule);
  });
});

// var targetDay = dayjs("2027-05-04");

// // Use Day.js to format the date and assign to the declared variable.

// // TODO: 1. What is your graduation date in the following format: Jan 1, 1999?
// var gradDate = dayjs("2022-08-01").format("MMM D, YYYY");
// $("#1a").text(gradDate);

// // TODO: 2. What day of the week will 1/1/2027 be? (e.g. Is it "Monday"?)
// var weekDay = dayjs("2027-01-01").format("dddd");
// $("#2a").text(weekDay);

// // TODO: 3. What is the current time in the format: hours:minutes:seconds
// var time = dayjs().format("h:mm:ss");
// $("#3a").text(time);

// // TODO: 4. What is the current Unix timestamp?
// var unix = dayjs().unix();
// $("#4a").text(unix);

// // TODO: 5. Parse the following Unix timestamp, 1318781876, and convert into any time/date format.
// var unixFormat = dayjs.unix(1318781876).format("M/D/YYYY h:mm:ss");
// $("#5a").text(unixFormat);

// // TODO: 6. What is the difference in days between May 4, 2027 and today? Hint:
// // You can display the difference between two dayjs objects by using the dayjs
// // diff method.)

// // dayjs object for May 4, 2027
// var targetDay = dayjs("2027-05-04");

// // dayjs object for today
// var today = dayjs();

// // number of days between targetDay and today
// var days = targetDay.diff(today, "days");
// $("#6a").text(days);
