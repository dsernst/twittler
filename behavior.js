$(document).ready(function () {
  var $body = $('body');
  $body.html('');

  var $refreshLink = $('<a href="#" id="refreshLink"></a>');
  $refreshLink.text('Check for new messages');
  $body.prepend($refreshLink);

  $body.append('<h1>dsernst\'s Twittler</h1>');

  var $feed = $('<div></div>');
  $body.append($feed);

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

      $user = $('<a></a>');
      $user.data({user: tweet.user});
      $user.attr({'href': '#'});
      $user.text('@' + tweet.user);
      $user.addClass('username');
      $tweet.append($user);

      $tweet.append(': ' + tweet.message);
      $tweet.addClass('tweet');

      $tweetTime = $('<span></span>');
      readableTime = moment(tweet.created_at).fromNow();
      $tweetTime.text(readableTime);
      $tweet.append($tweetTime);
      $tweetTime.addClass('timestamp');

      $tweet.appendTo($feed);
    }
  };

  var $refreshLink2 = $refreshLink.clone();
  $body.append($refreshLink2);

  var printAll = function () {
    printTweets('all');
  };

  printAll();

  $($refreshLink).on('click', printAll);
  $($refreshLink2).on('click', function (e) {
    e.preventDefault();
    printAll();
  });
  $('.username').on('click', function () {
    printTweets($(this).data('user'));
  });

});