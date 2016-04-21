/**
 * Created by user on 8.3.2016 г..
 */
var LogInUser = (function(){
    function LogInUser(username, password){
        this.username = username;
        this.password = password;
        this.passwordForPutReqiests = password;
    }
    return LogInUser;
})();