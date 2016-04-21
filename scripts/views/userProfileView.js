var app = app || {};

app.userProfileView = (function() {

    function UserProfileView(selector, data) {
        $.ajax({
            method: 'GET',
            url:'templates/userProfile.html',
            async: false
        }).success(function(template){
            var output = Mustache.render(template, data);

            $(selector).html(output);
        });
    }

    return {
        load: function (selector, data) {
            return UserProfileView(selector, data);
        }
    }
}());
