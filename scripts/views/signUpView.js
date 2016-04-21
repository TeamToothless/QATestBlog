var app = app || {};

app.signUpView = (function() {

    function SignUpView(selector) {
        $.ajax({
            method: 'GET',
            url:'templates/signupHeader.html',
            async: true
        }).success(function(template){
            var output = Mustache.render(template);

            $(selector).html(output);
        });
    }

    return {
        load: function (selector, data) {
            return SignUpView(selector, data);
        }
    }
}());
