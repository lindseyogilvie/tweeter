/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const renderTweets = function(tweets) {
    $('.tweet-feed').empty();
    // Iterate through array of tweet objects
    for (let i = tweets.length - 1; i >= 0; i--) {
      let tweet = tweets[i];
      // Pass each tweet object into the createTweetElement
      const $tweet = createTweetElement(tweet);
      // Append each tweet element to the .tweet-feed container
      $('.tweet-feed').append($tweet);
    }
  };

  const createTweetElement = function(tweet) {
    let $tweet = $(
      `<article class="tweet">
        <header>
          <div>
            <img src=${tweet.user.avatars}>
            <span>${tweet.user.name}</span>
          </div>
          <span>${tweet.user.handle}</span>
        </header>
        <div class="tweet-body">${escape(tweet.content.text)}</div>
        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
      <br>`
    );

    return $tweet;
  };

  $("#target").submit(function(event) {
    $('.validation-error').slideUp();
    event.preventDefault();
    // Cannot submit form if tweet is empty, "" or null
    if (!$('#tweet-text').val()) {
      $('.validation-error').slideDown("fast");
      $('.validation-error').html(`
        <i class="fa-solid fa-triangle-exclamation"></i> 
        Tweets cannot be empty. Share what's on your mind!
        <i class="fa-solid fa-triangle-exclamation"></i> `);
      return false;
    } else if ($('.counter').text() < 0) { // Cannot submit form if tweet exceeds maximum length"
      $('.validation-error').slideDown("fast");
      $('.validation-error').html(`
      <i class="fa-solid fa-triangle-exclamation"></i> 
      Tweet exceeds the 140 character limit. Summarize your thoughts!
      <i class="fa-solid fa-triangle-exclamation"></i> `);
      return false;
    } else {
      const tweet = $(this).serialize();
      $.post('/tweets', tweet, () => {
        loadTweets();
        $('#tweet-text').val('');
        $('.counter').text(140);
      });
    }
  });
  
  const loadTweets = function() {
    $.get('/tweets', function(tweets) {
      renderTweets(tweets);
    });
  };

  loadTweets();
});