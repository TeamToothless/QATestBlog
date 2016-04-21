var UserViewModel = (function(){
    function UserViewModel(username, email, posts){
        this.username = username;
        this.email = email;
        this.posts = posts || [];
    }

    return UserViewModel;
}());