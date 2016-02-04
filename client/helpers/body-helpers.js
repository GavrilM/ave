Template.registery.onCreated(function(){
    window.dayOn = new ReactiveVar(moment());
    this.calendar = $('#dates').children().first();
    this.eventslist = new ReactiveVar(getDates());
    Session.set("dayset", false);
    this.obj = {};
});

Template.fullcalendar.onCreated = function () {

};



Template.registery.helpers({
    thisday: function(){
       var momen = (window.dayOn).get();

       return momen.format("dddd, MMMM Do") ;
    },
    options: function(){
        var that = Template.instance();
        console.log("options");
        return {
            dayClick: function(date, e, view){
                if(hasevent(date).length){
                    alert("Warning! There is already an event on that day, and your event may be subject to cancellation.")
                }
                if(Session.get("dayset")){

                    var events = $('#dates').children().first().fullCalendar('clientEvents');
                    events[events.length -1].start = date;
                    $('#dates').children().first().fullCalendar('updateEvent', events[events.length -1]);
                    window.dayOn.set(date);
                    return;
                }
                window.dayOn.set(date);
                $('#popin').addClass("viewable");
                $('#body-cover').addClass("covering");

            },
            eventClick: function(event, jsEvent, view ){
                console.log(event.start.toISOString() );
                $('td[data-date = "' + event.start.toISOString() + '" ].fc-day').trigger('click');
            },
            eventSources: [
                {
                    events : Template.instance().eventslist.get()
                }
            ]


        };
    },
    filldates: function() {
        var arr = [];
        Scheduled.find({}).forEach(function (doc) {
            console.log(doc.person);
            arr.push({
                title: doc.person + "'s Event",
                start: doc.day
            });

        });
        Template.instance().eventslist.set(arr);
        console.log(Template.instance().eventslist.get());
        $('#dates').children().first().fullCalendar({
            eventSources: [
                {
                    events: arr
                }
            ]
        });
        $('#dates').children().first().fullCalendar('refetchEvents');
        console.log("refill");


    },
    dateset: function(){
        return Session.get('dayset');
    },
    getname: function(){
        return Session.get('namae');
    },
    getdate: function(){
        return window.dayOn.get();
    },
    gettime: function(){
        return Session.get('starttime');
    },
    getlength: function(){
        return Session.get('duration');
    }


});




function getDates() {
    var arr = [];
    Scheduled.find({}).forEach(function (doc) {
        console.log(doc.person);

        arr.push(
            {
                title: "Taken",
                start: doc.day
            }
        );
        console.log(arr);
    });

    return arr;
}

function hasevent(date){
    var arr =  $('#dates').children().first().fullCalendar('clientEvents', function(that){
        return date.isSame(that.start);
    });
    console.log(arr);
    return arr;
}

