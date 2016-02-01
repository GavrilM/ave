Meteor.methods({
    "addDate" : function(date, name, length){
        Scheduled.insert({
            day : date,
            person: name,
            duration: length
        });
    }
})


