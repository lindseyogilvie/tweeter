/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Hercules",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@HeroHerc" },
      "content": {
        "text": "Being a demi-god is hard work"
      },
      "created_at": 1461113959078
    }
  ]

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
        <span>${tweet.created_at}</span>
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

  renderTweets(data);


  $("#target").submit(function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    console.log(tweet)
    $.post('/tweets', tweet, () => {
      console.log("Tweet" + tweet);
    })
  })

  const loadTweets = function() {
    $.get('/tweets', () => {

    })
  }

  loadTweets();

});