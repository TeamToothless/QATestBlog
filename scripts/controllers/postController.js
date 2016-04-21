/**
 * Created by user on 10.3.2016 г..
 */
var app = app || {};

app.postController = (function(){
    function PostController(repoModel, tagsRepoModel, commentRepoModel){
        this.repoModel = repoModel;
        this.tagsRepoModel = tagsRepoModel;
        this.commentRepoModel = commentRepoModel;
    }
    PostController.prototype.addPost = function(selector){
        app.addPostView.load(selector);
        var _this = this;
        console.log(_this);
        console.log(this.commentRepoModel);
        $("#addPost").click(function(){
            var title = $("#title").val();
            var description = $("#description").val();
            var tags = $("#tags").val();
            var content = $("#content").val();
            var userId = localStorage["userId"];
            var username = localStorage["username"];
            var requester = app.requester.load();
            console.log(requester.baseUrl+"user/"+requester.appId+"/"+userId);
            requester.getRequest(requester.baseUrl+"user/"+requester.appId+"/"+userId)
                .then(function(data){

                    var tagsArray = $("#tags").val().trim().split(/\s+/);
                    var postModel = new PostBindingModel(title,description, content, userId, username, data.passwordForPutRequests);

                    tagsArray.forEach(function(tag){
                        if(!tag || /^\s*$/.test(tag)){
                            throw new Error("Tags cannot be empty.");
                        }
                        postModel.tags.push(tag);
                        _this.repoModel.addPostRequest(postModel)
                            .then(function(data){
                                $.notify("Post added successfully", "success");
                               var postId = data._id,
                                    tags = data.tags;
                                tags.forEach(function(tagName) {
                                    if (tagName) {
                                        _this.tagsRepoModel.addTagRequest(postId, tagName);
                                    }
                                });
                                $(location).attr("href","#/posts/all");
                            },function(error){
                                $.notify("Post isn't added", "error");
                            });
                    });
                });
        })
    };
    PostController.prototype.loadAllPosts = function(selector){
        var _this = this;
        this.repoModel.getAllPosts().then(function(posts){
           var pageCount = Math.ceil(posts.length/4);

            for(var i=1;i<=pageCount;i++){
                var $a = $("<a>").text(i).attr("href","#/posts/page/"+i);

                $("#paging").append($a);
            }
            $(location).attr("href","#/posts/page/1");
        }
            , function(error){
            if(error.status === 401){
                $.notify('You must log in first.', 'error');
            }
        });

    };
    PostController.prototype.postsPerPage = function(selector, page){
        var _this = this;
        this.repoModel.getPostsPerPage(4, (page-1)*4).then(
            function(posts){
                _this.tagsRepoModel.getAllTags()
                    .then(function(tags){
                        var data = {
                            "posts":posts,
                            "tags":tags
                        };
                        app.allPostsView.load(selector,data);
                        $('#search-button').click(function(){
                            var selectedTagName = $('#search-select').val();
                            _this.loadPostsByTagName(selector, selectedTagName);
                        })
                    })
            }
        )
    };

    PostController.prototype.loadPostsByTagName = function(selector, selectedTagName){
        var neededPosts = [];
            this.repoModel.getAllPosts().then(function(posts){
                    neededPosts = posts.filter(function(post){
                    return post.tags.contains(selectedTagName);
                });

                var obj = {
                    "posts": neededPosts
                };
                app.postsByTagName.load(selector, obj);
            });
    };
    PostController.prototype.loadPostById = function(selector, id){
        var _this=this;
        console.log(_this);
        console.log(this.commentRepoModel);
        this.repoModel.getPostById(id).then(function(data){
           app.postView.load(selector,data);
            $("#addComment").click(function(){
                var userName =  $("#commenterName").text();
                var userEmail = $("#commenterEmail").val();
                var comment = $("#comment").val();
                var commentModel = new CommentBindingModel(userName, userEmail, comment, id);
                _this.commentRepoModel.addComment(commentModel).then(function(data){
                    $(location).attr("href","posts/"+id);
                    console.log(data);
                })
            })
        });

    };

    return {
        load:function(repoModel, tagsRepoModel, commentRepoModel){
            return new PostController(repoModel, tagsRepoModel, commentRepoModel);
        }
    }

})();
