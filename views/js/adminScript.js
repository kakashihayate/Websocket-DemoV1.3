$(window).on('load', function() {
  var login = localStorage.getItem("login");
  var url = 'http://192.168.1.82:9898/admin';
  if(!login)
  window.location = url;
 });

 $(document).ready(function () {

  
  $("#t-shirts").html() == "000" ? $('.loader').prop('hidden',true) : $('.loader').prop('hidden',false);
  $("#jeans").html() == "000" ? $('.loader').prop('hidden',true) : $('.loader').prop('hidden',false);
  $("#divers").html() == "000" ? $('.loader').prop('hidden',true) : $('.loader').prop('hidden',false);

   function starandget(){  
        $.ajax({url: "http://192.168.1.82:9898/api/firstcall", 
                type: 'GET',
                'dataType': 'json',
                'contentType': 'application/json',
        success: function(result){
          $("#amount").val('');
        console.log(result);
        if(result != null){
        $.each(result, function(i, dataentry){
            console.log('Amount :'+dataentry.amount+' CategoryId :'+ dataentry.categoryId);
          if(dataentry.categoryId == 1){$("#t-shirts").html(dataentry.amount);}
          if(dataentry.categoryId == 2){$("#jeans").html(dataentry.amount);}
          else{$("#divers").html(dataentry.amount);}
        });
      }
      else{
        isArrayNull();
      }
      }});
   }
   starandget();
  });

function isNumber(evt) {
   evt = (evt) ? evt : window.event;
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
       return false;
   }
   return true;
}

$("#logout").on('click', function(){
 localStorage.removeItem("login");
  window.location = 'http://192.168.1.82:9898/admin';
});

function isArrayNull(){
    var category_array = [1,2,3]
    var category_array = [1,2,3];
    category_array.forEach(function (item, index, arr) {
      var amount = 00;
      $.ajax({url: "http://192.168.1.82:9898/api/saveCategory", 
            type: 'POST',
            'dataType': 'json',
            'contentType': 'application/json',
            data:JSON.stringify({amount:amount,categoryId:item,isLess:isLess}),
      success: function(result){
      console.log(result);
      }});
    });
    $("#amount").val('');
}

const myFunction = function(type){
if (amount == "" || amount == "00") return alert('Please Enter Amount')

var amount = $("#amount").val();
let current_amount = $("#"+type).html();
var isLess = null;
amount = parseInt(amount);
current_amount = parseInt(current_amount);

if(amount > current_amount){isLess = false}
else if(amount < current_amount){isLess = true}
else{isLess = null}

$("#"+type).html(amount);
var categoryId = 0;

if(type == 't-shirts'){categoryId = 1}
else if(type == 'jeans'){categoryId = 2}
else{categoryId = 3}

 $.ajax({url: "http://192.168.1.82:9898/api/saveCategory", 
          type: 'POST',
          'dataType': 'json',
          'contentType': 'application/json',
          data:JSON.stringify({amount:amount,categoryId:categoryId,isLess:isLess}),
  success: function(result){
     $("#amount").val('');
  console.log(result);
}});
}
//Auto Set Jeans Amount
function AutoTshirt(){
var tshirtAmount = $('#t-shirts').html();

var isLess = null;
var amount = Math.floor(Math.random()*(999-100+1)+100);
tshirtAmount = parseInt(tshirtAmount);

if(amount > tshirtAmount){isLess = false}
else if(amount < tshirtAmount){isLess = true}
else{isLess = null}

var categoryId = 1;

if(tshirtAmount != ""){

$.ajax({url: "http://192.168.1.82:9898/api/" +categoryId, 
          type: 'DELETE',
          'dataType': 'json',
          'contentType': 'application/json',
  success: function(result){
  console.log(result);
}});

 $.ajax({url: "http://192.168.1.82:9898/api/saveTshirtLog", 
          type: 'POST',
          'dataType': 'json',
          'contentType': 'application/json',
          data:JSON.stringify({amount:amount,categoryId:categoryId}),
  success: function(result){
  console.log(result);
}});

$.ajax({url: "http://192.168.1.82:9898/api/saveCategory", 
type: 'POST',
'dataType': 'json',
'contentType': 'application/json',
data:JSON.stringify({amount:amount,categoryId:categoryId,isLess:isLess}),
success: function(result){
$('#t-shirts').html(amount);
console.log(result);
}});
}
}
//Auto Set Jeans Amount
function AutoJeans(){
var jeansAmount = $('#jeans').html();

var isLess = null;
var amount = Math.floor(Math.random()*(999-100+1)+100);
jeansAmount = parseInt(jeansAmount);

if(amount > jeansAmount){isLess = false}
else if(amount < jeansAmount){isLess = true}
else{isLess = null}

var categoryId = 2;

if(jeansAmount != ""){

$.ajax({url: "http://192.168.1.82:9898/api/" +categoryId, 
          type: 'DELETE',
          'dataType': 'json',
          'contentType': 'application/json',
  success: function(result){
  console.log(result);
}});

 $.ajax({url: "http://192.168.1.82:9898/api/saveCategory", 
          type: 'POST',
          'dataType': 'json',
          'contentType': 'application/json',
          data:JSON.stringify({amount:amount,categoryId:categoryId,isLess:isLess}),
          success: function(result){
     $('#jeans').html(amount);
  console.log(result);
}});

 $.ajax({url: "http://192.168.1.82:9898/api/savejeansLog", 
          type: 'POST',
          'dataType': 'json',
          'contentType': 'application/json',
          data:JSON.stringify({amount:amount,categoryId:categoryId}),
  success: function(result){
  console.log(result);
}});
}
}

//Auto Set Jeans Amount
function AutoDrivers(){
var jeansAmount = $('#divers').html();

var isLess = null;
var amount = Math.floor(Math.random()*(999-100+1)+100);
jeansAmount = parseInt(jeansAmount);

if(amount > jeansAmount){isLess = false}
else if(amount < jeansAmount){isLess = true}
else{isLess = null}

var categoryId = 3;

if(jeansAmount != ""){

$.ajax({url: "http://192.168.1.82:9898/api/" +categoryId, 
          type: 'DELETE',
          'dataType': 'json',
          'contentType': 'application/json',
  success: function(result){
  console.log(result);
}});

 $.ajax({url: "http://192.168.1.82:9898/api/saveCategory", 
          type: 'POST',
          'dataType': 'json',
          'contentType': 'application/json',
          data:JSON.stringify({amount:amount,categoryId:categoryId,isLess:isLess}),
          success: function(result){
     $('#divers').html(amount);
  console.log(result);
}});

 $.ajax({url: "http://192.168.1.82:9898/api/savedriversLog", 
          type: 'POST',
          'dataType': 'json',
          'contentType': 'application/json',
          data:JSON.stringify({amount:amount,categoryId:categoryId}),
  success: function(result){
  console.log(result);
}});
}
}

setInterval(function(){ 
  var tshirtAmount = $('#t-shirts').html();
  tshirtAmount == "000"? $('#t-shirts').html('1') : $('#t-shirts').html()
  
  var tshirtAmount1 = $('#jeans').html();
  tshirtAmount1 == "000"? $('#jeans').html('1') : $('#jeans').html()
  
  var tshirtAmount2 = $('#divers').html();
  tshirtAmount2 == "000"? $('#divers').html('1') : $('#divers').html()

  AutoJeans();
  AutoDrivers();
  AutoTshirt();
}, 3000);
