Template.registery.events({
    "click .slide-right " :function(e){
        console.log("clicky")
        var ret = $(e.target);
        if(ret.prop('nodeName') != 'DIV'){
            ret = ret.parent()
        }
        var on = ret.next().data('current');
        ret.next().data('current',on++);
        var contain = $("#registerform .slider-content");
        var num = contain.data("current");
        console.log(num);
        if(num > 0 && num < 8){
            getform($(contain.children()[contain.data("current")])).submit();

        }
    },
    "click #submitform" : function(e,t){

        e.preventDefault();
        console.log(t.obj)

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
        if(e.target.amount.value <= 0){
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
        t.obj.cocktail = {
            yes: e.target.cocktail.value,
            app: e.target.cappetizers.value,
            app: e.target.copenbar.value
        };
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

        if(e.which == '9' || e.which=='13'){
            e.preventDefault();

            $("#registerform .slide-right").trigger("click");
        }
    },



});

function getform(that){
    return $(that.children()[0]);
}