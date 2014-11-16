$(document).ready(function () {
  var $body = $('body');

  var $refreshLink = $('<a href="#" class="refreshLink"></a>');
  $refreshLink.text('Check for new messages');
  $refreshLink.prependTo($body);

  var $input = $('<input type="text" placeholder="Write a new message... then press Enter"></input>');
  $input.appendTo($body);

  var $feed = $('<div></div>');
  $feed.appendTo($body);

  var printTweets = function (context) {
    var tweet;
    var $tweet;
    var $user;
    var $tweetTime;
    var source;
    var index;
    var readableTime;

    $feed.html('');

    if (context === 'all') {
      source = streams.home; // {streams} comes from data_generator.js
    } else if (context) {
      source = streams.users[context];
    }

    for (index = source.length - 1; index >= 0; index -= 1) {
      tweet = source[index];
      $tweet = $('<div></div>');
      $tweet.addClass('tweet');

      $user = $('<a></a>');
      $user.attr({'href': '#', 'data-user': tweet.user, 'class': 'username'});
      $user.text('@' + tweet.user);
      $user.appendTo($tweet);

      $tweet.append(': ' + tweet.message);

      $tweetTime = $('<span></span>');
      $tweetTime.addClass('timestamp');
      readableTime = moment(tweet.created_at).fromNow();
      $tweetTime.text(readableTime);
      $tweetTime.appendTo($tweet);

      $tweet.appendTo($feed);
    }

    $('.username').on('click', function (e) {
      e.preventDefault();
      printTweets($(this).data('user'));
    });
  };

  $refreshLink.clone().appendTo($body);

  printTweets('all');

  $('.refreshLink').on('click', function (e) {
    e.preventDefault();
    printTweets('all');
  });

  $('input').keypress(function (e) {
    if (e.which === 13) {
      window.visitor = 'guest';
      if (!streams.users[window.visitor]) {
        streams.users[window.visitor] = [];
      }
      writeTweet($(this).val());
      $(this).val('');
      printTweets('all');
    }
  });
});