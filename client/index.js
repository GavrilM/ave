$(window).load(function() {
  var myLatLng = {
    lat: 32.689810,
    lng: -117.202159
  };
  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 12,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Here we are!'
  });
});


$("#main-nav li").on("click", function(){
  
  $(".hamburger-icon").trigger("click");
  
});


$(".hamburger-icon").on("click", function() {
  var el = $(".hamburger-layer");
  if (el.hasClass("hamburger-to-cross")) {
    el.removeClass("hamburger-to-cross");
    el.addClass("hamburger-from-cross");
  } else {
    el.removeClass("hamburger-from-cross");
    el.addClass("hamburger-to-cross");
  }
});


$(".slide-left").on("click", function(event) {
  var ret =$(event.target); 
  if(ret.prop('nodeName')  != 'DIV'){
    ret = ret.parent()
  }
 
  slider(-1, $(ret.next()).next());

});

$(".slide-right").on("click", function(event) {
  var ret =$(event.target); 
  if(ret.prop('nodeName') != 'DIV'){
    ret = ret.parent()
  }
   
  slider(1, ret.next()); 
  
});

function slider(dir, container) {
  var contain = $(container);
  
  var current = parseInt(contain.data("current"));
    
  var max = parseInt(contain.data("max")) - 1;
   
  if ((dir < 0 && current <= 0)  || (dir > 0 && current >= max)) {

    return;
  }
  if (dir > 0) {
    current++;
    contain.data("current", current);
  }
  if (dir < 0) {
    current--;
    contain.data("current", current);
  }
  contain.css("margin-left", "-" + current + "00vw");
  
   if(current == max) {
    contain.prev().removeClass("slide-active");
  } 
  else if(current == 0){
    contain.prev().prev().removeClass("slide-active");
  }
  else{
    contain.prev().addClass("slide-active");
    contain.prev().prev().addClass("slide-active");

  }
  
}

$('#venue .slider-container input').on('click', function(){
  $('#venue .slider-content').removerAttr('style');
});

var $root = $('html, body');
$('a').click(function() {
    $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});