$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var $refreshLink = $('<a href="#" id="refreshLink"></a>');
  $refreshLink.text('Check for new messages');
  $body.prepend($refreshLink);

  var $feed = $('<div></div>');
  $body.append($feed);

  var printTweets = function() {
    $feed.html('');
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');

      var $user = $('<a></a>');
      $user.text('@' + tweet.user);
      $user.addClass('username');
      $tweet.append($user);

      $tweet.append(': ' + tweet.message);
      $tweet.addClass('tweet');

      var $tweetTime = $('<span></span>');
      $tweetTime.text(tweet.created_at);
      $tweet.append($tweetTime);
      $tweetTime.addClass('timestamp');

      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  var $refreshLink2 = $refreshLink.clone();
  $body.append($refreshLink2);

  printTweets();

  $($refreshLink).on("click", printTweets);
  $($refreshLink2).on("click", function(e){
    e.preventDefault();
    printTweets()
  });

});