/**
 * Created by user on 8.3.2016 г..
 */
var app = app||{};

app.homeController = (function(){
    function HomeController(){

    }
    HomeController.prototype.getHomePage = function (selector){
        app.homeView.load(selector);

    };
    return {
        load: function(){
            return new HomeController();
        }
    }
})();
