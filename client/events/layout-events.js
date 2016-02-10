Template.cartlayout.events({
   "click #edit1" : function(e,t){
       e.preventDefault();
       if(Session.get("edit1")){
           Session.set("edit1", false);
           $("#editfirst").submit();
       }
       else{
           Session.set("edit1", true);
       }
   },
    "click #edit2" : function(e,t){
        e.preventDefault();
        if(Session.get("edit2")){
            Session.set("edit2", false);
            $("#editcost").submit();
        }
        else{
            Session.set("edit2", true);
        }
    },
    "submit #editfirst": function(e,t){
        e.preventDefault();
        var form = e.target;
        var elements = form.elements;
        console.log(elements);
        var obj = {
            email: elements[6].value,
            date: elements[3].value,
            name: elements[0].value,
            amount: elements[1].value,
            room: elements[2].value,
            start: elements[4].value,
            length: elements[5].value,
        }
        Meteor.call("changeDate",this._id, obj);
        for( var i = 0; i< elements.length; i++){
            elements[i].value = "";
        }
    },
    "submit #editcost": function(e,t){
        e.preventDefault();
        var form = e.target;
        var elements = form.elements;

        var obj = {
            length: elements[0].value,
            food: elements[1].value,
            drink:  elements[2].value,
            cocktail: {yes: elements[3].checked}
        }
        Meteor.call("changeDate",this._id, obj);
        for( var i = 0; i< elements.length; i++){
            elements[i].value = "";
        }
    },
    "click #backtocart" : function(){
        Router.go('/cart/' + Session.get("_id"));
    },


});










Template.cart.events({
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
    "submit paynow" : function(e,t){
        e.preventDefault();
        var form = e.target;
        var elements = form.elements;
        if(!mod10_check(elements[0])){
            alert('Invalid Credit Card');
        }
        for( var i = 0; i< elements.length; i++){
            elements[i].value = "";
        }
        alert("Transaction Successful!")
    },
    "click #backhome" : function(){
        Router.go('/');
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


function mod10_check(val){
    var nondigits = new RegExp(/[^0-9]+/g);
    var number = val.replace(nondigits,'');
    var pos, digit, i, sub_total, sum = 0;
    var strlen = number.length;
    if(strlen < 13){ return false; }
    for(i=0;i<strlen;i++){
        pos = strlen - i;
        digit = parseInt(number.substring(pos - 1, pos));
        if(i % 2 == 1){
            sub_total = digit * 2;
            if(sub_total > 9){
                sub_total = 1 + (sub_total - 10);
            }
        } else {
            sub_total = digit;
        }
        sum += sub_total;
    }
    if(sum > 0 && sum % 10 == 0){
        return true;
    }
    return false;
}

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


Template.dayitem.events({
    "click .lnr-question-circle" : function(){
        Router.go('/checkout/' + Template.instance().obj._id);
    },
    "click .lnr-cross" : function(){
        var truth = confirm("Are you sure you want to delete?");
        if(truth){
            var user = Users.findOne({_id: Session.get("_id")});
            var arr = user.events;
            arr.splice(arr.indexOf(Template.instance().data._id),1);
            Users.update({_id: Session.get("_id")}, {$set : {events:arr}});
        }
    }
})