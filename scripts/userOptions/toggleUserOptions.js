var app = app || {};

$('button').mousedown(function(){
  $(this).css('background', '#2ecc71');
});
$('button').mouseup(function(){
  $(this).css('background', '#1abc9c');
});

$('#user-options-btn').click(function(){
  $('.user-options').fadeToggle('slow');
  $(this).toggleClass('green');
});
$('#user-control-edit-profile').click(function(){
    $('.user-edit').fadeToggle('slow');
    $(location).attr("href","#/user/edit-profile");
});

$(document).mouseup(function (e)
{
    if ((!$(".user-options").is(e.target)&&!$(".user-edit").is(e.target)) // if the target of the click isn't the container...
        && $(".user-options").has(e.target).length === 0 &&$(".user-edit").has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(".user-options").hide();
        $('#user-options-btn').removeClass('green');
    }

    if (!$(".user-edit").is(e.target) // if the target of the click isn't the container...
        && $(".user-edit").has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(".user-edit").hide();
    }
});
(app.reloadUserProfile = function (){
     $("#user-profile-pic").attr("src",localStorage["profilePic"]);
})();

