Template.cart.onCreated(function(){

});

Template.dayitem.onCreated(function(){
   console.log(this.data._id);
   this.obj = Pending.findOne({_id: this.data._id});
   console.log(this.obj);
});

Template.cart.helpers({
   days : function(){
      return Users.findOne({_id:Session.get("_id")}).events;
   } ,
   cost : function(){

      var num = $("#cart input[name='payfor']:checked").length;

      if(num == 0){
         return "$500 per date";
   }
      return "$" + num * 500;
   }

});

Template.dayitem.helpers({
   getdate : function(){
      return moment(Template.instance().obj.date).format("dddd, MMMM Do YYYY");
   },
   getroom : function(){

      if(Template.instance().obj.room == 'Any'){
         return "any room";
      }
      return "the " + Template.instance().obj.room;
   },
});