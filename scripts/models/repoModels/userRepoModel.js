/**
 * Created by user on 9.3.2016 г..
 */
var app = app || {};

app.userRepoModel = (function() {
    function UserRepoModel() {
        this.requester = app.requester.load();
        this.url = this.requester.baseUrl + "user/" + this.requester.appId + "/";
    }

    UserRepoModel.prototype.signUp = function (signUpUserModel) {

        var _this = this;

        var deffer = Q.defer();
        this.requester.postRequest(this.url, signUpUserModel, false)
            .then(function (success) {
                $.notify('User registered successfully!', 'success');
                deffer.resolve(success)
            }, function (error) {
                $.notify("Unsuccessful registration!", 'error');
                deffer.reject(error);
            });
        return deffer.promise;
    };
    UserRepoModel.prototype.editProfile = function (userId,editedUserModel) {

        var _this = this;

        var deffer = Q.defer();
        this.requester.putRequest(this.url+userId, editedUserModel, false)
            .then(function (success) {
                $.notify('Profile updated!', 'success');
                localStorage["profilePic"] = success.profilePic;
                app.reloadUserProfile();
                deffer.resolve(success)
            }, function (error) {
                $.notify("Updating failed!", 'error');
                deffer.reject(error);
            });
        return deffer.promise;
    };
    UserRepoModel.prototype.login = function (loginUserModel) {
        var url = this.url + "login";
        var deffer = Q.defer();
        this.requester.postRequest(url, loginUserModel, false)
            .then(function (success) {
                localStorage["loggedInUser"] = success._kmd.authtoken;
                localStorage["userId"] = success._id;
                localStorage["username"] = success.username;
                localStorage["profilePic"] = success.profilePic;
                deffer.resolve(success);
                window.onload();//reloads the header on login
            }, function (error) {
                deffer.reject(error);
                $.notify("Unsuccessful log in!", 'error');

            });
        return deffer.promise;
    };
    UserRepoModel.prototype.logout = function () {
        //TODO MAKE REQUEST FOR LOGOUT!!!
        localStorage.clear();
        $.notify('User logged out successfully!', 'success');
        window.onload();//reloads the header on logout

    };
    UserRepoModel.prototype.getPostsByUserId = function (id) {
        var postsUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId + '/Posts',
            defer = Q.defer();
        this.requester.getRequest(postsUrl, false).then(function (posts) {
            var neededPosts = posts.filter(function(post){
                return post.author._id === id;
            });
            defer.resolve(neededPosts);
        }, function (error) {
            defer.reject(error);
        });

        return defer.promise;
    };
    UserRepoModel.prototype.getUserById = function (id) {
        var defer = Q.defer();
        this.requester.getRequest(this.url + id, false).then(function (user) {
            defer.resolve(user);
        }, function (error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    return {
        load: function () {
            return new UserRepoModel()
        }
    }

})();