Scheduled = new Mongo.Collection("scheduled");
Pending = new Mongo.Collection("pending");
Users = new Mongo.Collection("users");

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

Router.route('/cart/:_id', function () {
    this.layout('cart', {
        data: function () {
            Session.set("_id",this.params._id);
            return Users.findOne({_id: this.params._id});
        }
    });

});

/*, {
    data: function () { return Pending.findOne({_id: this.params._id}) }
}*/