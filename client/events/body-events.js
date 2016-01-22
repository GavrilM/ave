Template.body.events({
    "click #main-nav li" : function(){
        $(".hamburger-icon").trigger("click");
    },
    "click .hamburger-icon" : function(){
        var el = $(".hamburger-layer");
        if (el.hasClass("hamburger-to-cross")) {
          el.removeClass("hamburger-to-cross");
          el.addClass("hamburger-from-cross");
        } else {
          el.removeClass("hamburger-from-cross");
          el.addClass("hamburger-to-cross");
        }
    },
    "click .slide-left" : function(){
        var ret =$(event.target); 
        if(ret.prop('nodeName')  != 'DIV'){
          ret = ret.parent()
        }

        slider(-1, $(ret.next()).next());
    },
    "click .slide-right" : function(){
        var ret =$(event.target); 
        if(ret.prop('nodeName') != 'DIV'){
          ret = ret.parent()
        }

        slider(1, ret.next()); 
    },
    "click #venue .slider-container input" : function(){
        $('#venue .slider-content').removerAttr('style');
    },
    "click a" : function(e){
         $root.animate({
            scrollTop: $(e.target).offset().top},
        'slow');
    }
});

var $root = $('html, body');

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