///////////////////////////  Variables  ////////////////////////////////////////////

///////////////////////EventListeners////////////////////////////////////////////////
$("#openMenu").click(() => {
  toggleMenu();
});
$("#closeBtn").click(() => {
  toggleMenu();
});
$(".singer").click((e) => {
  let same = false;
  $(e.target).next().css("display") == "none" && (same = true);
  $(".singerDescription").slideUp(400);
  same && $(e.target).next().slideToggle(400);
});

$("textarea").keyup(function (e) {
  let length = $("textarea").val().length;
  let message = null;
  length > 100
    ? (message = `<span class="text-danger""> your available character finished </span>`)
    : (message = `<span class="text-success">${
        100 - length
      }</span> character remaining`);
  $("#messageCount").html(message);
});
//////////////////////////////////////Functions//////////////////////////////////////
function makeTimer() {
  var endTime = new Date("29 April 2024 9:56:00 GMT+01:00");
  endTime = Date.parse(endTime) / 1000;

  var now = new Date();
  now = Date.parse(now) / 1000;

  var timeLeft = endTime - now;

  var days = Math.floor(timeLeft / 86400);
  var hours = Math.floor((timeLeft - days * 86400) / 3600);
  var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
  var seconds = Math.floor(
    timeLeft - days * 86400 - hours * 3600 - minutes * 60
  );

  if (hours < "10") {
    hours = "0" + hours;
  }
  if (minutes < "10") {
    minutes = "0" + minutes;
  }
  if (seconds < "10") {
    seconds = "0" + seconds;
  }

  $("#days").html(days + "<span>D</span>");
  $("#hours").html(hours + "<span>H</span>");
  $("#minutes").html(minutes + "<span>M</span>");
  $("#seconds").html(seconds + "<span>S</span>");
}
function toggleMenu() {
  if ($("#home").width() / $("body").width() < 1) {
    $("#home").width("100%");
    $("#menu").width("0%");
  } else {
    $("#home").width("80%");
    $("#menu").width("20%");
  }
}
setInterval(function () {
  makeTimer();
}, 1000);
