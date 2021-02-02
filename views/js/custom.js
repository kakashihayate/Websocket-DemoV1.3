function init() {
    //Declare a websocket
    const ws = new WebSocket('ws://192.168.1.82:9898/');

    //open method a websocket
    ws.onopen = function() {
      console.log('WebSocket Client Connected');
      ws.send('Hi this is web client.');
      $("#isConnected").val(ws.readyState);
      startserver();
    };

    //send Message method a websocket
    ws.onmessage = function(e) {
      console.log("Received: '" + e.data + "'");

      if(e.data == "Hi this is web client.") return false;

      document.getElementById("start").innerHTML ="Hi this is WebSocket server!";

      var obj = JSON.parse(e.data);
      let category = "";
      
        $.each(obj, function(i, dataentry){
          if(dataentry.categoryId == 1){category = "t-shirts", changeAmount(dataentry.amount,category,dataentry.isLess);}
          else if(dataentry.categoryId == 2){category = "jeans", changeAmount(dataentry.amount,category,dataentry.isLess);}
          else{category = "divers", changeAmount(dataentry.amount,category,dataentry.isLess);}
        });
      $("#isConnected").val(ws.readyState);
    };

    //close method a websocket
    ws.onclose = function(ev) {
    document.getElementById("start").innerHTML ="No WebSocket connection :(";
    $('#start').css( 'color', 'red' );
    $(".apiclass").addClass("text-danger");
    $(".dbclass").addClass("text-danger");

      $(".apiclass").removeClass("blink_me");
      $(".apiclass").removeClass("text-warning");
      $(".dbclass").removeClass("blink_me");
      $(".dbclass").removeClass("text-warning");
      $("#isConnected").val(ws.readyState);
      init();
    };

    //If error
    ws.onerror = function(e) {
      console.log("Error: '" + e.message + "'");
    };
}

function startserver(){
  $('#start').css( 'color', '#28a745' );
  $(".apiclass").removeClass("text-danger");
  $(".dbclass").removeClass("text-danger");

    $(".apiclass").addClass("blink_me");
    $(".apiclass").addClass("text-warning");
    $(".dbclass").addClass("blink_me");
    $(".dbclass").addClass("text-warning");

    $('#t-shirts').html == "00" ? $('.loader_tshirt').prop('hidden',true) :  $('.loader_tshirt').prop('hidden',false);
    $('#jeans').html == "00" ? $('.loader_jeans').prop('hidden',true) :  $('.loader_jeans').prop('hidden',false);
    $('#divers').html == "00" ? $('.loader_divers').prop('hidden',true) :  $('.loader_divers').prop('hidden',false);
}
function changeAmount(amount,type,isLess)
{
      $("#"+type+"_").removeClass('badge-danger');
      $("#"+type+"_").removeClass('badge-success');
      $("#"+type+"_").removeClass('badge-warning');

      $("#"+type).html(amount);

      if(isLess == false){$("#"+type+"_").addClass('badge-success');}
      else if(isLess == true){$("#"+type+"_").addClass('badge-danger');}
      else{$("#"+type+"_").addClass('badge-warning');}
}

// Digital Clock
setInterval(() => {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let amPm = "";

  // Checking for AM/PM
  if (hours > 12) {
    hours = hours - 12;
    amPm = "PM";
  } else if (hours == 0) {
    hours = 12;
    amPm = "AM";
  } else {
    amPm = "AM";
  }

  // Prepending 0 if less than 10
  hours = hours > 10 ? hours : "0" + hours;
  minutes = minutes > 10 ? minutes : "0" + minutes;
  seconds = seconds > 10 ? seconds : "0" + seconds;

  // Adding the time in the DOM
  document.getElementById(
    "hrs"
  ).innerHTML = `${hours}`;
  document.getElementById(
    "min"
  ).innerHTML = `${minutes}:${amPm}`;

  if($("#isConnected").val() == "3"){
    init();
  }
}, 1000);

// Date object
var today = new Date();
// Current Date
var date = today.getFullYear()+'-'+(today.getMonth()+1);
document.getElementById("current_date").innerHTML = date;

datedeigit = today.getDate();
document.getElementById("date_digit").innerHTML = datedeigit;

