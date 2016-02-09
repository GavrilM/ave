Template.cartlayout.helpers({
    getroom : function(){

        if(this.room == 'Any'){
            return "any room";
        }
        return "the " + this.room;
    },
    getdate : function(){
       return moment(this.date).format("dddd, MMMM Do YYYY");
    },
    getfood: function(){
        switch(this.food){
            case "1/" : return "Buffet";
                break;
            case "2/" : return "3-course meal";
                break;
            case "3/" : return "Family Style";
                break;
        }
    },
    getdrink: function(){
       switch(this.drink){
           case "1/" : return "Open Bar";
           break;
           case "2/" : return "Limited Bar";
           break;
           case "3/" : return "Table Service";
           break;
       }
    },
    getfoodper : function(){return food(this.food)},
    getdrinkper : function(){return drink(this.drink)},
    cocktailhr: function(){
        return this.cocktail.yes =="on";
    },
    editing: function(){
        return Session.get('edit1');
    },
    editing2: function(){
        return Session.get('edit2');
    },
    getrentcost: function(){
        return 550*this.length;
    },
    getfoodcost: function(){
        return food(this.food)* this.amount;
    },
    getdrinkcost: function(){
        return drink(this.drink)* this.amount;
    },
    getcockcost: function(){
        return 7* this.amount;
    },
    getcost: function(){
        return 500*this.length + this.amount*(food(this.food) + drink(this.drink) + 7);
    }

});

function food(val){
    switch(val){
        case "1/" : return 65;
            break;
        case "2/" : return 70;
            break;
        case "3/" : return 68;
            break;
    }
}
function drink(val){
    switch(val){
        case "1/" : return 43;
            break;
        case "2/" : return 33;
            break;
        case "3/" : return 39;
            break;
    }
}