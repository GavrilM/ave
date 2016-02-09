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
    }
});