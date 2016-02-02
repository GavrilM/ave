Template.registery.events({
    "click .slide-right " :function(e){

    },
    "submit #registerform" : function(e){
        var form = $(event.target);
        e.preventDefault();
        var obj = {};
        obj.name = Session.get("namae");
        obj.date = window.dayOn.get().toISOString();
        obj.time = Session.get('starttime');
        obj.length = Session.get('duration');
        obj.email = form.email;
        obj.amount = form.amount;
        obj.loc = form.room;
        obj.dine = form.diningchoice;
        obj.drink = form.drinkingchoice;
        
    }

});