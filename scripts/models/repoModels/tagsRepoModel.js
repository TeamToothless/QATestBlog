/**
 * Created by user on 8.3.2016 г..
 */
var app = app ||{};

app.tagsRepoModel = (function(){
    function TagsRepoModel(){
        this.requester = app.requester.load();
        this.url = this.requester.baseUrl + "appdata/" + this.requester.appId + "/Tags/";
        this.tagsRepo = {
            tags:[]
        };
    }
    
    TagsRepoModel.prototype.addTagRequest = function(postId,tagName){
        var existingTag,
            postRelation = {
                "_type": "KinveyRef",
                "_id": postId,
                "_collection": "Tags"
            },
            _this = this;

        this.getTagByName(tagName).then(function(data){
            existingTag = data[0];
            if(existingTag){
                existingTag.posts.push(postRelation);
                _this.updateTagByName(existingTag._id, existingTag).done();
            }
            else{
                var tagModel = new TagBindingModel(tagName,[postRelation]);
                return _this.requester.postRequest(_this.url, tagModel, false).done();
            }
        });


    };


    TagsRepoModel.prototype.getAllTags = function(){
        this.tagsRepo["tags"] = [];
        var defer = Q.defer();
        var _this = this;
        this.requester.getRequest(this.url)
            .then(function(data){
                data.forEach(function(tag){
                    var tagModel = new TagBindingModel(tag.name, tag.posts);
                    _this.tagsRepo["tags"].push(tagModel);
                });
                defer.resolve(_this.tagsRepo.tags);
            },function(error){
                defer.reject(error);
            });

        return defer.promise;
    };



    TagsRepoModel.prototype.updateTagByName = function(id, updatedTag){
        var defer = Q.defer();
        console.log(this.url + id);
        this.requester.putRequest(this.url + id, updatedTag, false)
            .then(function(data) {
                console.log(data);
                    defer.resolve(data);
            },
                function(error){
                    defer.reject(error);
                }
            );

        return defer.promise;
    };

    TagsRepoModel.prototype.getTagByName = function(name){
        var defer = Q.defer();

        this.requester.getRequest(this.url+'?query={"name":"' + name + '"}', false)
            .then(function(data){
                    defer.resolve(data)},
                function(error){
                    defer.reject(error);
                }
            );

        return defer.promise;
    };

    TagsRepoModel.prototype.getTagById = function(id){
        var defer = Q.defer();
        this.requester.getRequest(this.url+'?query={"_id":"'+id+'"}')
            .then(function(data){
                    defer.resolve(data)},
                function(error){
                    defer.reject(error);
                }
            );

        return defer.promise;
    };
    return {
        load:function(){
            return new TagsRepoModel();
        }
    }
})();