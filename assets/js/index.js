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

//find the times of day
$(function () {
  //bugfix : need advanced format plugin to add ordinal
  //https://day.js.org/docs/en/plugin/advanced-format
  const headerNow = dayjs().format("dddd, MMM Do YYYY");
  $("h2:last").text(headerNow);
  // dayjs($("9 AM", "h A").isBefore(dayjs()));

  // console.log(dayjs($("3 PM", "h A"), "h A").isBefore(dayjs()));
  const now = dayjs();
  // let time1 = dayjs("2023-01-17T13:00:00"); // 1 PM
  // let time2 = dayjs("2023-01-17T19 PM"); // 3 PM
  // console.log(now.isBefore(time2));

  // console.log(now.isBefore(dayjs("2023-01-17T12 PM")));
  let nowText = now.format("h A");
  let timeDivs = $(".block__hour");
  let nowEl = timeDivs.filter(function () {
    return $(this).text() === nowText;
  });
  nowEl
    .parent()
    .find("textarea")
    .css({ "background-color": "grey", "z-index": "0", cursor: "pointer" });
  //bugfix: pointer disappears
  //find earlier times of the day
  // let ealierEl = timeDivs.filter(function () {
  //   let divTime = dayjs($(this).text(), "h A");
  //   return divTime.isBefore(now);
  // });
  // ealierEl
  //   .parent()
  //   .find("textarea")
  //   .css({ "background-color": "red", "z-index": "0", cursor: "pointer" });

  var $previousCousins = nowEl.parent().prevAll("div").find("textarea");
  $previousCousins.css({
    "background-color": "red",
    "z-index": "0",
    cursor: "pointer",
  });
  // $(".block__hour:last").each(function () {
  //   const input = "5 PM";
  //   console.log(input);
  //   const output = dayjs(input, "h A").format("YYYY-MM-DD HH:mm");
  //   console.log(output); // '2023-01-17 09:00'
  //   var nowtext = dayjs().format("YYYY-MM-DDTh A");
  //   // console.log(dayjs(nowtext, "YYYY-MM-DDTh A"));
  //   var text = dayjs().format("YYYY-MM-DDT") + $(this).text();
  //   // console.log(text);
  //   var newdate = text.format;
  //   let diff = dayjs(nowtext).diff(dayjs(text));
  //   // console.log(diff);

  //   let time1 = dayjs("2022-01-01T12:00:00");
  //   console.log(time1);
  //   let time2 = dayjs("2022-01-01T18:00:00");
  //   let diffInMinutes = time1.diff(time2, "hours");
  //   console.log(diffInMinutes);

  //   if (diff > 0) {
  //     console.log("time in element is earlier than now");
  //   } else if (diff < 0) {
  //     console.log("time in element is later than now");
  //   } else {
  //     console.log("time in element is equal to now");
  //   }
  // });
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
