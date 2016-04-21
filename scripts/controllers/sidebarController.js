var app = app||{};

app.sidebarController = (function(){
    function SidebarController(){
        this.repoModel = app.sidebarRepoModel.load();
    }

    SidebarController.prototype.showSidebarInfo = function (){
       this.repoModel.getSidebarInfo().then(function(sidebarData){
           $.ajax({
               method: 'GET',
               url: 'templates/sidebar.html',
               async: false
           }).success(function(template){
               var output = Mustache.render(template, sidebarData);
               console.log(sidebarData);
               $("#sidebar").html(output);
           });
       });


    };

    return {
        load: function(){
            return new SidebarController();
        }
    }
})();