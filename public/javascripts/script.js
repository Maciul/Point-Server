$( document ).ready(function() {

$('#demo').click(function(){
  $('#loading').show().delay(5300).fadeOut();
  setTimeout(function(){
    $('#upload').show().delay(5000).fadeOut();
  }, 6200);
});
});
