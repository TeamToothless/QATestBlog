/**
 * Created by user on 8.3.2016 г..
 */
var PostBindingModel = (function(){
    function PostModel(title, description,content,userId, username, userPassword){
        this.setTitle(title);
        this.setDescription(description);
        this.setContent(content);
        this.comments = [];
        this.tags = [];
        this.author = {
            "_type": "KinveyRef",
            "_id": userId,
            "_collection": "Posts",
            "username": username,
            "posterPass":userPassword

        };

        this.postDate = new Date();
        this.views = 0;
    }
    function isBlankNullOrUndefined(str) {
        return (!str || /^\s*$/.test(str));
    }

    PostModel.prototype.getTitle = function(){
      return this.title;
    };
    PostModel.prototype.setTitle = function(value){
        if(isBlankNullOrUndefined(value)){
            throw new Error("Please fill the title");
        }
        this.title = value;
    };
    PostModel.prototype.getDescription = function(){
        return this.description;
    };
    PostModel.prototype.setDescription = function(value){
        if(isBlankNullOrUndefined(value)){
            throw new Error("Please fill the description");
        }
        this.description = value;
    };
    PostModel.prototype.getContent = function(){
        return this.content;
    };
    PostModel.prototype.setContent = function(value){
        if(isBlankNullOrUndefined(value)){
            throw new Error("Please fill the content");
        }
        this.content = value;
    };

    return PostModel;

})();


