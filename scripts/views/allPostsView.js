var app = app || {};

app.allPostsView = (function() {
    function AllPostsView(selector, data) {
        $.ajax({
            method: 'GET',
            url: 'templates/allPosts.html',
            async: false
        }).success(function(template){
            var output = Mustache.render(template, data);
            $(selector).html(output);

        });
}

    return {
        load: function (selector, data) {
            return AllPostsView(selector, data);
        }
    }
}());
