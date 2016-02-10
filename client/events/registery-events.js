Template.registery.events({
    "click .slide-right " :function(e){
        console.log("clicky")
        var ret = $(e.target);
        if(ret.prop('nodeName') != 'DIV'){
            ret = ret.parent()
        }

        var contain = $("#registerform .slider-content");
        var num = contain.data("current");
        console.log(num);
        if(num > 0 && num < 8){
            getform($(contain.children()[contain.data("current")])).submit();

        }

    },
    "click #submitform" : function(e,t){

        e.preventDefault();
        t.obj.name = Session.get("namae");
        t.obj.date = window.dayOn.get().toISOString();
        t.obj.start = Session.get("starttime");
        t.obj.length = Session.get("duration");
        t.obj.paid = false;
        console.log(t.obj);
        Meteor.call("queueDate", t.obj, function(err,res){
            var arr = Users.findOne({_id: Session.get("_id")}).events;
            arr.push({_id: res});
            Users.update({_id : Session.get("_id")}, {$set:{events: arr}});
            Router.go('/checkout/' + res);

        });



    },
    "submit #changeform" :function(e){
        e.preventDefault();
        var form = e.target;
        Session.set("starttime", form.time.value);
        Session.set("duration", form.number.value);
    },
    "submit #emailform": function(e,t){
        e.preventDefault();

            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!filter.test(e.target.email.value)) {
                alert("Please enter valid email address.");
                e.stopPropagatio();
                return;
            }

        t.obj.email = e.target.email.value;
    },
    "submit #amountform": function(e,t){
        e.preventDefault();
        if(e.target.amount.value <= 0 || e.target.amount.value > 600){
            if(e.target.amount.value >600){alert("Sorry! Our max capacity is 600.");
                e.cancelBubble();
                return;
            }

            alert("Please enter valid amount.");
            e.cancelBubble();
            return;
        }

        t.obj.amount = e.target.amount.value;
    },
    "submit #roomform": function(e,t){
        e.preventDefault();
        t.obj.room = e.target.room.value;
    },
    "submit #cockform": function(e,t){
        e.preventDefault();
        t.obj.cocktail = e.target.cocktail.checked;
    },
    "submit #register-dining": function(e,t){
        e.preventDefault();
        t.obj.food = e.target.diningchoice.value;
        console.log(t.obj.food);
    },
    "submit #register-drinking": function(e,t){
        e.preventDefault();
        t.obj.drink = e.target.drinkingchoice.value;
    },
    "click #nexter": function(){
       $("#registerform .slide-right").trigger("click");
    },
    "keydown #registerform input": function(e,t){
        console.log("keyed");
        if(e.which == '9' || e.which=='13'){

            e.preventDefault();

            //$("#registerform .slide-right").trigger("click");
        }
    },
    "keypress #registerform input": function(e,t){

        if( e.which=='13'){

            e.preventDefault();


        }
    },



});

function getform(that){
    return $(that.children()[0]);
}
