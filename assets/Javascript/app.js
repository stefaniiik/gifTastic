// create an array 
var topics = ["burgers", "pizza", "milkshake", "hotdogs", "nachos", "pasta", "tacos", "bread", "cheese", "churros"];

// creates buttons for each of these
function makeButtons(){ 
	// deletes the food prior to adding new food so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the topics array
	for (var i = 0; i < topics.length; i++){
		// dynamically makes buttons for every food in the array
		var a = $('<button>') 
		a.addClass('food'); // add a class
		a.attr('data-name', topics[i]); // add a data-attribute
		a.text(topics[i]); // make button text
		$('#buttonsView').append(a); // append the button to buttonsView div
	}
};

// handles addFood button event
$("#addFood").on("click", function(){

	// grabs the user food input
	var userFood = $("#foodInput").val().trim();
	// that input is now added to the array
	topics.push(userFood);
	// the makeButtons function is called so added buttons show as well
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
});

// function to display gifs
function displayGifs(){
	var food = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xyHRo9RNsd34WzC9605WzoGgmFnOVPSp&q=" + food + "&limit=10&offset=0&rating=PG-13&lang=en";

		// creates ajax call
		$.ajax({
			url: queryURL, 
			method: "GET"
		}).then(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a div to hold the results
				var gifDiv = $('<div class=gifs>');
				var foodGif = $('<img>');
					foodGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the rating on hover
					foodGif.attr('title', "Rating: " + results[i].rating);
					foodGif.attr('data-still', results[i].images.fixed_height_still.url);
					foodGif.attr('data-state', 'still');
					foodGif.addClass('gif');
					foodGif.attr('data-animate', results[i].images.fixed_height.url);
				var rating = results[i].rating;
				var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(displayGifs)
				gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying food gifs
$(document).on("click", ".food", displayGifs);

// initially calls the makeButtons function
makeButtons();