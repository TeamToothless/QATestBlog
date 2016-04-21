$('button').mousedown(function(){
  $(this).css('background', '#2ecc71');
});
$('button').mouseup(function(){
  $(this).css('background', '#1abc9c');
});

$('#loginform').click(function(){
  $('.login').fadeToggle('slow');
  $(this).toggleClass('green');
});
$('#registerform').click(function(){
  $('.signup').fadeToggle('slow');
  $(this).toggleClass('green');
});



$(document).mouseup(function (e)
{
    if (!$(".login").is(e.target) // if the target of the click isn't the container...
        && $(".login").has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(".login").hide();
        $('#loginform').removeClass('green');
    }

    if (!$(".signup").is(e.target) // if the target of the click isn't the container...
        && $(".signup").has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(".signup").hide();
        $('#registerform').removeClass('green');
    }

});