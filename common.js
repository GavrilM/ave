Scheduled = new Mongo.Collection("scheduled");
Pending = new Mongo.Collection("pending");

Router.route('/', function () {
    this.render('main');
});

Router.route('/checkout/:id', function () {
    this.layout('cartlayout', {
        data: function () {
            return Pending.findOne({_id: this.params._id})
        }
    });

});

/*, {
    data: function () { return Pending.findOne({_id: this.params._id}) }
}*/