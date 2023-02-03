/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const renderTweets = function(tweets) {
    $('.tweet-feed').empty();
    // Iterate through array of tweet objects
    for (let tweet of tweets) {
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

    event.preventDefault();
    // Cannot submit form if tweet is empty, "" or null
    if (!$('#tweet-text').val()) {
      alert("Tweet is empty");
    }
    // Cannot submit form if tweet exceeds maximum length"
    else if ($('.counter').text() < 0) {
      alert("Tweet has too many characters");
    }
    else {
      const tweet = $(this).serialize();
      $.post('/tweets', tweet, () => {
        loadTweets();
        $('#tweet-text').val('');
        $('.counter').text(140);
      })
    }
  })
  
  const loadTweets = function() {
    $.get('/tweets', function(tweets) {
      renderTweets(tweets);
    })
  };

  loadTweets();

});