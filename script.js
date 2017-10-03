$(document).ready(function(){
  var url = 'http://api.icndb.com/jokes/random?limitTo=[nerdy]';
  var $button = $('#get-joke').click(function() {
        getJoke();
      });
  var $paragraph = $('#joke');
  var tweetLink = "https://twitter.com/intent/tweet?text=";
  var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

  function getQuote() {
    $.ajax({
      dataType: "json",   //not req.
      url: quoteUrl,
      data: null,         //not req.
      success: createTweet
    });
  }

  function getJoke() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function() {
      var response = JSON.parse(xhr.response);
      $paragraph.innerHTML = response.value.joke;
    });
    xhr.send();
  }

  function createTweet(input) {
    var data = input[0],
        quoteText = $(data.content).text().trim(),
        quoteAuthor = data.title,
        tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
        if (!quoteAuthor.length) {
          quoteAuthor = "Unknown author";
        }

        if (tweetText.length > 140) {
          getQuote();
        } else {
          var tweet = tweetLink + encodeURIComponent(tweetText);
          $('.quote').text(quoteText);
          $('.author').text("Author: " + quoteAuthor);
          $('.tweet').attr('href', tweet);
        }
  }
  $(document).ready(function() {
      getQuote();
      $('.trigger').click(function() {
          getQuote();
      })
  });

  getJoke();

});
