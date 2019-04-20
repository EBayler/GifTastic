window.onload = function () {

    var topics = [];


    function getYourScienceOn() {

        var x = $(this).data("search");

        console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=mj9YWq3mihNVdIKEr68T2vEAo3B13MrL&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var scienceDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var scienceImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                scienceImage.attr("src", staticSrc);
                scienceImage.addClass("scienceGiphy");
                scienceImage.attr("data-state", "still");
                scienceImage.attr("data-still", staticSrc);
                scienceImage.attr("data-animate", defaultAnimatedSrc);
                scienceDiv.append(p);
                scienceDiv.append(scienceImage);
                $("gifRepository").prepend(scienceDiv);
            }
        });


    }

    $("#addSearchTerm").on("click", function (event) {
        event.preventDefault();
        var userAdditions = $("#userEntry").val().trim();
        topics.push(userAdditions);
        console.log(topics);
        $("#userEntry").val('');
        displayButtons();

    });

    function displayButtons() {

        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var bOn = $('<button class="btn btn primary">');
            bOn.attr("id", "science");
            bOn.attr("data-search", topics[i]);
            bOn.text(topics[i]);
            $("#buttons").append(bOn);
        }
    }

    displayButtons();

    $(document).on("click", "#science", getYourScienceOn);

    $(document).on("click", ".scienceGiphy", pausePlayGifs);

    function pausePlayGifs() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

};