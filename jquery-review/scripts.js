console.log("inside");

$("div").click(function(){
  var color = $(this).css("background-color");
  $("#result").html( "That div is <span style='color:" +
  color + ";'>" + color + "</span>." );
});