var obj = { "09 AM": "", "10 AM": "", "11 AM": "", "12 PM": "" };

//parse object from localstorage with included verification step
var jsonString = localStorage.getItem("storageSchedule");
if (typeof jsonString !== "undefined") {
  var parseSchedule = JSON.parse(jsonString);
} else {
  console.log("myVariable is undefined");
}
console.log(parseSchedule);
//set obj equal to all key-value pairs in the parsed schedule
obj = parseSchedule;

//set the localstorage values for obj to the corresponding textareas at specified times
$(function () {
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

$(function () {
  //save events that we want in localstorage (variable set to storageSchedule)
  $("a").on("click", function (event) {
    event.preventDefault();
    var hour = $(this).parent().find("h3").text();
    var textarea = $(this).parent().find("textarea").val();
    obj[hour] = textarea;
    console.log(obj);
    var stringifySchedule = JSON.stringify(obj);
    localStorage.setItem("storageSchedule", stringifySchedule);
  });
});
