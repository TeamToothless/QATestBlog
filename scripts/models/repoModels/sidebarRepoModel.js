var app = app ||{};

app.sidebarRepoModel = (function(){
    function SidebarRepoModel(){
        this.requester = app.requester.load();
        this.url = this.requester.baseUrl +"appdata/"+this.requester.appId;
        this.sidebarRepo = {
            lastPosts:[],
            allTags:[],
            archive:[]
        }
    }

    SidebarRepoModel.prototype.getSidebarInfo = function(){
        this.sidebarRepo["lastPosts"].length = 0;
        var deffer = Q.defer(),
        _this = this,
        allPosts = [],
        sortedAllPosts = [];

        this.requester.getRequest(this.url+'/Posts')
            .then(function(data){
                    data.forEach(function(post){
                        allPosts.push(post);
                    });
                    sortedAllPosts = allPosts;
                    sortedAllPosts.sort(function (a, b) {
                        if (b.postDate > a.postDate) {
                            return 1;
                        }
                        if (b.postDate < a.postDate) {
                            return -1;
                        }

                        return 0;
                    });
                    _this.sidebarRepo["lastPosts"] = (allPosts).slice(0,5);

                    _this.requester.getRequest(_this.url+'/Tags')
                        .then(function(data){
                                var arrTags = [];

                                data.forEach(function(tag){
                                    arrTags.push(tag);
                                });

                                var modifiedTags = arrTags.map(function(tag){
                                    var obj = {name:tag.name,tagId:tag._id,posts:tag.posts.length};

                                    return obj;
                                });

                                modifiedTags.sort(function (a, b) {
                                    if (b.posts > a.posts) {
                                        return 1;
                                    }
                                    if (b.posts < a.posts) {
                                        return -1;
                                    }

                                    return 0;
                                });

                                _this.sidebarRepo['allTags'] = modifiedTags.slice(0, 30);

                                allPosts.sort(function(a,b){
                                    return b.postDate-a.postDate;
                                });
                                var archiveArr = [];
                                allPosts.forEach(function(post){
                                    var date = $.datepicker.formatDate( "MM, yy", new Date(post.postDate));

                                    archiveArr.push(date)
                                });

                                var archiveObj = [];

                                var current = null;
                                var cnt = 0;
                                for (var i = 0; i < archiveArr.length; i++) {
                                    if (archiveArr[i] != current) {
                                        if (cnt > 0) {
                                            archiveObj.push({name:current,times:cnt});
                                        }
                                        current = archiveArr[i];
                                        cnt = 1;
                                    } else {
                                        cnt++;
                                    }
                                }
                                if (cnt > 0) {
                                    archiveObj.push({name:current,times:cnt});
                                }

                                _this.sidebarRepo['archive'] = archiveObj;

                                deffer.resolve(_this.sidebarRepo)
                            },
                            function(error){
                                deffer.reject(error);
                            }
                        );
            },
                function(error){
                    deffer.reject(error);
                }
            );

        console.log(this.sidebarRepo);
        return deffer.promise;
    };

    return {
        load:function(){
            return new SidebarRepoModel();
        }
    }
})();