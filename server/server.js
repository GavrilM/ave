Meteor.methods({
    "addDate" : function(date, name, length){
        Scheduled.insert({
            day : date,
            person: name,
            duration: length
        });
    },
    "queueDate" : function(obj){
        return Pending.insert(obj);
    },
    changeDate: function(id, obj){
        return Pending.update( {_id:id},
            {$set: obj}
        );
    }
})
