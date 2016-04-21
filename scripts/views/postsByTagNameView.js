var app = app || {};

app.postsByTagName = (function() {
    function PostsByTagNameView(selector, data) {
        $.ajax({
            method: 'GET',
            url: 'templates/postsByTagName.html',
            async: false
        }).success(function(template){
            var output = Mustache.render(template, data);

            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            return PostsByTagNameView(selector, data);
        }
    }
}());
