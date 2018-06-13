$(document).ready(function(){
// defining the array
    var topics = ["burgers", "pizza", "milkshake", "hotdogs", "nachos", "pasta", "tacos", "bread", "cheese", "churros"];
// function to create GIFs
    function displayImg(){

        // $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=xyHRo9RNsd34WzC9605WzoGgmFnOVPSp";   
// calling ajax to rettrieve data
        $.ajax({
            url: queryURL, 
            method: "GET"
        }).then(function(response) {
			var results = response.data;

            for(var j = 0; j < results.length; j++) {    
// where to place images
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
// still and animated images
                var image = $("<img>");
                // image.attr("src", results[j].images.original_still.url);
                // image.attr("data-still", results[j].images.original_still.url);
                // image.attr("data-animate", results[j].images.original.url);
                // image.attr("data-state", "still");
                // image.attr("class", "gif");

                image.attr(
                    {
                        "src": results[j].images.original_still.url,
                        "data-still": results[j].images.original_still.url,
                        "data-animate": results[j].images.original.url,
                        "data-state": "still",
                        "class": "gif"
                    }
                );
                displayDiv.prepend(image);
// display rating
                var rating = results[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").prepend(displayDiv);
            }
        });
    }
// function for creating new buttons
    function renderButtons(){ 

        $("#display-buttons").empty();

        for (var i = 0; i < topics.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", topics[i]); 
            newButton.text(topics[i]); 
            $("#display-buttons").append(newButton); 
        }
    }
// function to pause/play images
    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }
// submit button to add new buttons
    $("#submitPress").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
		topics.push(input);
		
		renderButtons();
		
		// user can hit enter instead of pressing submit    
        return false;
    });

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});