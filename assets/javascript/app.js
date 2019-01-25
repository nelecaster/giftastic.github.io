// code for 
$(document).ready(function () {

    // animal array, will be made into buttons
    var animalArray = ["squirrel", "raccoon", "dog", "cat", "bear", "elephant", "deer", "otter", "rabbit", "monkey"];

    function displayAnimalGif() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=yFjjcSPv6RMinQ3fwmfQtIoWYxrjqx95&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;


            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var animalImage = $("<img>");
                animalImage.addClass('button')
                animalImage.attr("src", results[i].images.fixed_height_small_still.url);
                animalImage.attr("giphStill", results[i].images.fixed_height_small_still.url);
                animalImage.attr("giphPlay", results[i].images.fixed_height_small.url);
                animalImage.attr("giphState", "still")
                animalDiv.append(p);
                animalDiv.append(animalImage);

                $(".gifs-appear-here").prepend(animalDiv);

                $('.button').on("click", function () {
                    var state = $(animalImage).attr("giphState");
                    console.log(state);
                    if (state === "still") {
                        $(animalImage).attr("src", $( animalImage ).attr("giphPlay"));
                        $(animalImage).attr("giphState", "play");
                    }
                    else if (state === "play") {
                        $(animalImage).attr("src", $( animalImage ).attr("giphStill"));
                        $(animalImage).attr("giphState", "still");
                    }
                });
            
                
            }
        });
    }

    
    

    // function that loops through array and makes buttons for each string in array


    function renderButtons() {


        $("#animal-buttons").empty();


        for (var i = 0; i < animalArray.length; i++) {
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-name", animalArray[i]);
            a.text(animalArray[i]);
            $("#animal-buttons").append(a);
        }
    }

    // takes value from input box, pushes to array and makes new button
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var newAnimal = $("#animal-input").val().trim();
        animalArray.push(newAnimal);
        renderButtons();
    });

    $(document).on("click", ".animal", displayAnimalGif);

    renderButtons();

})






