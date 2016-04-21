/**
 * Created by user on 8.3.2016 г..
 */
var app = app ||{};

app.requester = (function () {
    function Requester(){
        this.appId = "kid_-kKSFuXS-W";
        this.appSecret = "cea72551955b469ab9c3b9b693f1977b";
        this.baseUrl = "https://baas.kinvey.com/";
    }

    Requester.prototype.getRequest = function(url, async){
        var token,
            defer = Q.defer();

        if(!localStorage['loggedInUser']){
            token = 'Basic ' + btoa(this.appId + ":" + this.appSecret);
        }else{
            token = 'Kinvey ' + localStorage['loggedInUser'];
        }

        $.ajax({
            method: 'GET',
            headers: {
                'Authorization': token
            },
            url: url,
            async: async,
            success:function(data){
                defer.resolve(data);
            },
            error:function(error){

                defer.reject(error);
            }
        });

        return defer.promise;
    };

    Requester.prototype.postRequest = function(url, data, async){
        var token,
            defer = Q.defer();

        if(!localStorage['loggedInUser']){
            token = 'Basic ' + btoa(this.appId + ":" + this.appSecret);
        }else{
            token = 'Kinvey ' + localStorage['loggedInUser'];
        }


        $.ajax({
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            url: url,
            async: async,
            data: JSON.stringify(data),
            success:function(data){
                defer.resolve(data);
            },
            error:function(error){
                defer.reject(error);
            }
        });

        return defer.promise;
    };

    Requester.prototype.deleteRequest = function(url, async){
        var token,
            defer = Q.defer();

        if(!localStorage['loggedInUser']){
            token = 'Basic ' + btoa(this.appId + ":" + this.appSecret);
        }else{
            token = 'Kinvey ' + localStorage['loggedInUser'];
        }

        $.ajax({
            method: 'DELETE',
            headers: {
                'Authorization': token
            },
            url: url,
            async: async,
            success:function(data){
                defer.resolve(data);
            },
            error:function(error){
                defer.reject(error);
            }
        });

        return defer.promise;
    };

    Requester.prototype.putRequest = function(url, data, async, username, password){
        var token,
            defer = Q.defer();
            token;
            if(!localStorage['loggedInUser']){
                token = 'Basic ' + btoa(username+":"+password);
            }else{
                token = 'Kinvey ' + localStorage['loggedInUser'];
            }

        $.ajax({
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            url: url,
            async: async,
            data: JSON.stringify(data),
            success:function(data){
                defer.resolve(data);
            },
            error:function(error){
                defer.reject(error);
            }
        });

        return defer.promise;
    };

    Requester.prototype.postCommentRequest = function(url, data, async){
        var token,
            defer = Q.defer();

        if(!localStorage['loggedInUser']){
            token = 'Basic ' + btoa(this.appId + ":" + this.appSecret);
        }else{
            token = 'Kinvey ' + localStorage['loggedInUser'];
        }


        $.ajax({
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            url: url,
            async: async,
            data: JSON.stringify(data),
            success:function(data){
                defer.resolve(data);
            },
            error:function(error){
                defer.reject(error);
            }
        });

        return defer.promise;
    };

    return{
        load: function(){
            return new Requester();
        }
    }
})();
