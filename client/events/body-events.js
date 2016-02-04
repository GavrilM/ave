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
    "click .slide-left" : function(event){
        var ret =$(event.target); 
        if(ret.prop('nodeName')  != 'DIV'){
          ret = ret.parent()
        }

        slider(-1, $(ret.next()).next());
    },
    "click .slide-right" : function(event){

        var ret = $(event.target);
        if(ret.attr("id") === 'cal-right'){
            if(!Session.get("dayset")){
                alert("Please select a date to continue.")
                console.log("niqqa");
                return false;
            }


        }
        if(ret.prop('nodeName') != 'DIV'){
          ret = ret.parent()
        }

        slider(1, ret.next());
        console.log("right");
    },

    "click #venue .slider-container input" : function(){
        $('#venue .slider-content').removerAttr('style');
    },
    "click a" : function(e){
        e.preventDefault();
        var ret = $(e.target);
        if(ret.prop('nodeName') == 'LI'){
            ret = ret.parent()
        }
        $('body').animate({
            scrollTop: $(ret.attr('href')).offset().top},
        'slow');
    },
    "click #body-cover" : function(e){
        $('#popin').removeClass("viewable");
        $('#body-cover').removeClass("covering");
    },
    "submit #dayform": function(e){
        var form = e.target;
        var elements = form.elements;
        e.preventDefault();
        Session.set("dayset", true);
        Session.set("eventid", 777);
        Session.set("namae", form.name.value);
        Session.set("starttime", form.start.value);
        Session.set("duration", form.duration.value);

        $('#dates').children().first().fullCalendar('addEventSource',
            {
                events:[
                    {
                        title: "Your Event",
                        start: window.dayOn.get()
                    }
                ],
                color: 'orange',
            }

        );


        $("#body-cover").trigger("click");
        $('#register .slide-right').trigger("click");

        for( var i = 0; i< elements.length; i++){
            elements[i].value = "";
        }
    }

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