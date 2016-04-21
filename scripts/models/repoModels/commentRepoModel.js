/**
 * Created by user on 8.3.2016 г..
 */
var app = app ||{};

app.commentRepoModel = (function(){
    function CommentRepoModel(){

        this.requester = app.requester.load();
        this.url = this.requester.baseUrl +"appdata/"+this.requester.appId+"/Comments/";
        console.log(this.url);
        this.commentRepo = {
            comments:[]
        }
    }

    CommentRepoModel.prototype.addComment = function(commentModel){
        var _this = this,
            deffer = Q.defer();
        this.requester.postCommentRequest(this.url, commentModel, true).then(function(data){
            deffer.resolve(data);
        },function(error){
            deffer.reject(error);
        });
        return deffer.promise;
    };


    return {
        load:function(){
            return new CommentRepoModel();
        }
    }
})();