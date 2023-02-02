$(document).ready(function() {
  console.log("hello")

  const maxChar = 140;
  $('.counter').text(maxChar);

  let charactersLeft;

  $('#tweet-text').on("input", function() {
    let counter = $('.counter');
    let tweetLength = this.value.length;

    console.log(this);

    console.log(maxChar - tweetLength);
    
    counter.text(maxChar - tweetLength);
  })

})