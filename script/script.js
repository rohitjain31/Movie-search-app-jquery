$(document).ready(function(){
  $('#btnSearch').on('click', function(e){
    if($('#txtInput').val() == '' || $('#txtInput').val() == undefined){
      return alert('Please enter a movie name');
    }
    $('#showMovies').empty();
    var movieName = $('#txtInput').val();

    // Ajax call
    $.ajax({
      url: "http://www.omdbapi.com?s="+movieName,
      type:'GET',
      success: successCallBack,
      error: function(errorResponse){
        console.log(errorResponse);
      }
    });
  });

  function successCallBack(data){
    console.log(data);
    if(data.Response == "False"){
      $('#showMovies').html('<h1 class="errorClass">'+ data.Error + '</h1>');
      return;
    }
    var movies = data.Search;

    // Creating list of movies with info
    movies.forEach(function(elem, i){
      var parentDiv = document.createElement('div');
      var childDiv1 = document.createElement('div');
      var childDiv2 = document.createElement('div');

      $(parentDiv).addClass('movie-container row');
      $(childDiv1).addClass('movie-poster col-md-4');
      $(childDiv2).addClass('movie-content col-md-8')

      var img = $('<img>').attr('src', elem.Poster)
                          .attr('alt',elem.Title);
      $(img).addClass('img-responsive');

      $(childDiv1).append(img);

      var title = document.createElement('H2');
      $(title).text(elem.Title);

      // var actors = document.createElement('H4');
      // $(actors).text('Actors : ' + data.Actors);
      //
      // var award = document.createElement('H4');
      // $(award).text('Awards : ' + data.Awards );
      //
      // var director = document.createElement('H4');
      // $(director).text('Director : ' + data.Director );
      //
      // var genre = document.createElement('H4');
      // $(genre).text('Genre : ' + data.Genre );
      //
      // var language = document.createElement('H4');
      // $(language).text('Languages : ' + data.Language );

      var year = document.createElement('H4');
      $(year).text('Relased year : ' + elem.Year );

      // var imdRating = document.createElement('H4');
      // $(imdRating).text('Imdb Rating : ' + data.imdbRating);

      // var imdVotes = document.createElement('H4');
      // $(imdVotes).text('Imdb Votes : ' + data.imdbVotes);

      var imdbID = document.createElement('H4');
      $(imdbID).text('Imdb Votes : ' + elem.imdbID);

      $(childDiv2).append(title);
      // $(childDiv2).append(actors);
      // $(childDiv2).append(award);
      // $(childDiv2).append(director);
      // $(childDiv2).append(genre);
      // $(childDiv2).append(language);
      $(childDiv2).append(year);
      $(childDiv2).append(imdbID);
      // $(childDiv2).append(imdRating);
      // $(childDiv2).append(imdVotes);

      $(parentDiv).append(childDiv1);
      $(parentDiv).append(childDiv2);

      $('#showMovies').append(parentDiv);
    })
  }

});
