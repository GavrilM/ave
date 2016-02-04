Meteor.methods({
    "addDate" : function(date, name, length){
        Scheduled.insert({
            day : date,
            person: name,
            duration: length
        });
    },
    "queueDate" : function(obj){
        return Pending.insert({
            day : date,
            person: name,
            duration: length
        },function(err, id){
          return id;
        });
    }
})
