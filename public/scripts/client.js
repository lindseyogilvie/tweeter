/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


$(document).ready(function() {
  
  const renderTweets = function(tweets) {
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
      <div class="tweet-body">${tweet.content.text}</div>
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
    const tweet = $(this).serialize();
    console.log(tweet)
    $.post('/tweets', tweet, () => {
      console.log("Tweet" + tweet);
    })
  })
  
  const loadTweets = function() {
    $.get('/tweets', function(tweets) {
      renderTweets(tweets);
    })
  };

  loadTweets();

});