/**
 * Created by user on 11.3.2016 г..
 */
var app = app || {};

 app.postView = (function(){
    function PostView(selector, data) {
        $.ajax({
            method: 'GET',
            url: 'templates/post.html',
            async: false
        }).success(function(template){
            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
    }

    return {
        load: function (selector, data) {
            return PostView(selector, data);
        }
    }
})();