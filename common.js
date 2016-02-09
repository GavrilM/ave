Scheduled = new Mongo.Collection("scheduled");
Pending = new Mongo.Collection("pending");

Router.route('/', function () {
    this.render('main');
});

Router.route('/checkout/:_id', function () {
    this.layout('cartlayout', {
        data: function () {
            console.log(this.params._id);
            return Pending.findOne({_id: this.params._id});
        }
    });

});

/*, {
    data: function () { return Pending.findOne({_id: this.params._id}) }
}*/