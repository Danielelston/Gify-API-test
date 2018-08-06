$(document).ready(function () {
    var giphyApp = {

        btnArry: ["skunk", "rabbit", "cat", "dog", "hamster", "goldfish", "bird", "ferret", "hedgehog", "frog"],

        giphySearchBtn: $("#giphySearchBtn").on("click", function (event) {

            event.preventDefault();

            var searchItem = $("#giphySearchTerm").val().trim();
            var searchItemLower = searchItem.toLowerCase();

            // TODO: bonus, check giphy to see if search topic even exists.

            if (searchItemLower !== "") {

                if (giphyApp.btnArry.indexOf(searchItemLower) === -1) {
                    var userSearch = searchItemLower;
                    giphyApp.btnArry.push(userSearch);
                    giphyApp.renderBtns();

                    var form = document.getElementById("searchBox");
                    form.reset();
                } else {
                    // TODO: add alert "duplicate search"
                };
            } else {
                // TODO: ADD alert "PLEASE ADD INPUT"

            };
        }),

        renderBtns: function () {
            $("#btnContainer").empty();
            for (var i = 0; i < this.btnArry.length; i++) {
                var btn = $("<button>");
                btn.addClass("btn btn-info searchBtn");
                btn.attr("data-gifSearch", this.btnArry[i]);
                btn.text(this.btnArry[i]);
                $("#btnContainer").append(btn);
            };
        },

        displayGifs: function () {
            var gif = $(this).attr("data-gifSearch");
            var key = "45oTHuGUHDNDSusO9xApgFlC5Ttl3yOF";
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + key + "&limit=10";
            console.log(gif);

            $.ajax({
                url: queryURL,
                method: "get"
            }).then(function (response) {

                console.log(response);

                var gifResults = response.data;

                for (var i = 0; i < gifResults; i++) {

                    var gifDiv = $('<div class="gif">');
                    var gifImg = $("<img>")
                    var ratingP = $("<p>")

                    var gifStill = gifResults[i].images.fixed_height_still.url;
                    var gifMove = gifResults[i].images.fixed_height.url;

                    gifImg.attr("data-still", gifStill);
                    gifImg.attr("data-move", gifMove);
                    gifImg.attr("src", gifStill);
                    gifImg.addClass("gif");

                    console.log(gifStill);
                    console.log(gifMove);
                    ratingP.text("Rating: " + results[i].rating);

                    gifDiv.append(ratingP);
                    gifDiv.append(gifImg);

                    $("#gifContainer").prepend(gifDiv);
                }

            })
        },

        gifClick: function () {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        }



    };

    giphyApp.renderBtns();

    $(".searchBtn").click(giphyApp.displayGifs());

    // $(".gif").on("click",

})

