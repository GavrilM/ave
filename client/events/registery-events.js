Template.registery.events({
    "click .slide-right " :function(){
        if(Session.get("dayset")){
            alert("Please set a date first.")
        }
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
                        start: Template.instance().dayOn.get()
                    }
                ],
                color: 'orange',
            }

        );

        console.log(Template.instance().eventslist.get());
        $("#body-cover").trigger("click");
        $('#register .slide-right').trigger("click");
        console.log(Template.instance().dayOn.get());
        for( var i = 0; i< elements.length; i++){
            elements[i].value = "";
        }
    }
});