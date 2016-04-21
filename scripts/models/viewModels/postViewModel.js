/**
 * Created by user on 13.3.2016 г..
 */
var PostViewModel = (function(){
    function PostViewModel(postId, title, description, content, comments, tags, author, postedOn, views){
        this.title = title;
        this.description = description;
        this.content = content;
        this.comments = comments;
        this.tags = tags;
        this.author = author;
        this.postId = postId;
        this.postDate = postedOn;
        this.views = views;
    }
    return PostViewModel;
})();