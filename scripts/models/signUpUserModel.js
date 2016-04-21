/**
 * Created by user on 8.3.2016 г..
 */
var SignUpUserModel = (function(){
    function SignUpUserModel(username, email, password,profilePic){
        this.setUsername(username);
        this.setPassword(password);
        this.setEmail(email);
        this.profilePic = profilePic;
        this.passwordForPutRequests = password;


    }
    function isBlankNullOrUndefined(str) {
        return (!str || /^\s*$/.test(str));
    }

    SignUpUserModel.prototype.getUsername = function(){
        return this.username;
    };
    SignUpUserModel.prototype.setUsername = function(value){
        if(isBlankNullOrUndefined(value)){
            throw new Error("Username cannot be empty.");
        }
        this.username = value;
    };
    SignUpUserModel.prototype.getPassword = function(){
        return this.password;
    };
    SignUpUserModel.prototype.setPassword = function(value){
        if(isBlankNullOrUndefined(value)){
            throw new Error("Password cannot be empty.");
        }
        this.password = value;
    };
    SignUpUserModel.prototype.setEmail = function(value){
        if(!value.match(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/)){
            throw new Error("Incorrect email");
        }
        this.email = value;
    };
    SignUpUserModel.prototype.getEmail = function(){
        return this.email;
    };

    return SignUpUserModel;
})();
