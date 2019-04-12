$(document).ready( function() {
  for (let i=0; i< 20; i++) {
    setTimeout( function() {
      let $div = $("<div>");
      $div.html("hi" + i);
      $("#message-log").append($div);
    }, 1000*i);
  }
});