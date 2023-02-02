$(document).ready(function() {

  const maxChar = 140;
  $('.counter').text(maxChar);

  $('#tweet-text').on("input", function() {
    let counter = $(this).parent().children(".tweet-admin").children(".counter");
    let tweetLength = this.value.length;

    if (tweetLength > maxChar) {
      counter.addClass("over-limit");
    } else {
      counter.removeClass("over-limit");
    }
    
    counter.text(maxChar - tweetLength);
  });
});