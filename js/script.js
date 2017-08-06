
function loadData() {

    var $body = $('body');
    var $showcaseElem = $('#imgb')
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    // YOUR CODE GOES HERE!
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=640x400&location='+ address + '';
    /*$showcaseElem.append('<img class="ars" src="' + streetviewUrl + '">');*/
    $showcaseElem.html('<img class="ars" src="' + streetviewUrl + '">');
    
/*

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ cityStr + '&sort=newest&api-key=d4e26662e5c04c8284ed25162b7a0227'
    $.getJSON( nytimesUrl, function( data ) {

      $nytHeaderElem.text('New York Times Articles About' + cityStr);
      articles = data.response.docs;
      for(var i = 0; i < articles.length; i++) {
        var article = articles[i];
        $nytElem.append('<li class = "article">' + '<a href = "'+article.web_url+'">'
        + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
      };
    }).error(function(e){
      $nytHeaderElem.text('Page could not be loaded');
    });
*/

    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    $.ajax({
      url: wikiUrl,
      dataType: "jsonp",
      success: function(response) {
        var articleList = response[1];
        for(var i = 0; i < articleList.length; i++) {
          var articleStr = articleList[i];
          var url = 'http://en.wikipedia.org/wiki/' + articleStr;
          $wikiElem.append('<li><a href="'+url+'">' + articleStr + '</a></li>');
      };
    }
  });

    return false;
};

$('#form-container').submit(loadData);
