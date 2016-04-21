var app = app || {};

app.addPostView = (function() {
    function AddPostView(selector) {
        $.ajax({
            method: 'GET',
            url: 'templates/addPost.html',
            async: false
        }).success(function(template){
            var output = Mustache.render(template);
            $(selector).html(output);
        });
    }

    return {
        load: function (selector, data) {
            return AddPostView(selector, data);
        }
    }
}());
