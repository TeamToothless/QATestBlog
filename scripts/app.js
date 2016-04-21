var app = app ||{};

window.onload = function() {
    if (localStorage["loggedInUser"]) {
        app.allreadyLoggedView.load('nav');
        var sidebarController = app.sidebarController.load();
        sidebarController.showSidebarInfo();
    }
    else {
        app.signUpView.load('nav');
    }
    // TODO : load footer on window load
    app.homeView.load();
};

(function(){
    app.router = Sammy(function () {

            var selector = '#wrapper',
                userOptions = "#userOptions",
                userRepoModel = app.userRepoModel.load(),
                postRepoModel = app.postRepoModel.load(),
                homeController = app.homeController.load(),
                userController = app.userController.load(userRepoModel),
                tagsRepoModel = app.tagsRepoModel.load(),
                commentRepoModel = app.commentRepoModel.load(),
                postController = app.postController.load(postRepoModel, tagsRepoModel, commentRepoModel);


            //this.before({except:{path:'#\/(user/(login|signUp))?'}}, function(){
            //    var loggedInUser = localStorage['loggedInUser'];
            //    if(!loggedInUser){
            //        this.redirect("#/user/login");
            //        window.onload();
            //
            //    }
            //});

            this.get('#/', function () {
                homeController.getHomePage(selector);
            });
            this.get('#/user/options', function(){
                userController.loadLogoutPage(userOptions);
                this.redirect("#/");
            });
            this.get('#/user/edit-profile', function(){
                userController.loadProfileEditPage();
            });
            this.get('#/user/login', function(){
                userController.getLoginPage(userOptions);
            });
            this.get('#/user/signUp', function(){
                userController.loadSignUpPage(userOptions);
            });
            this.get('#/user/:userId', function(){
                userController.loadUserViewPage(selector, this.params['userId']);
            });
            this.get('#/posts/add', function(){
                try{
                    postController.addPost(selector);
                }
                catch (e){
                    $.notify(e.message,"error");
                }
            });

            this.get('#/posts/all',function(){
                postController.loadAllPosts(selector);
            });
            this.get('#/postsByTagName/:tagName', function(){
                postController.loadPostsByTagName(selector, this.params['tagName']);
            });

            this.get('#/posts/:postId', function(){
                postController.loadPostById(selector, this.params['postId']);
            });
            this.get("#/posts/page/:page", function(){
                postController.postsPerPage(selector, this.params["page"]);

            })



    });

    app.router.run('#/');
})();
