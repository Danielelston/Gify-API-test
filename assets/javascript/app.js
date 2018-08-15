$(document).ready(function () {
    var giphyApp = {

        btnArry: ["happy", "sad", "surprised", "angry", "laughing", "thats bait", "eye roll", "thumbs up", "yes", "lol"],

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
                    console.log("duplicate input")
                };
            } else {
                console.log("no input")
                // TODO: ADD alert "PLEASE ADD INPUT"

            };
        }),

        renderBtns: function () {
            $("#btnContainer").empty();
            for (var i = 0; i < this.btnArry.length; i++) {
                var btn = $("<li>");
                btn.addClass("btn btn-info searchBtn");
                btn.attr("data-gifSearch", this.btnArry[i]);
                btn.text(this.btnArry[i]);
                $("#btnContainer").append(btn);
            };
            $(".searchBtn").click(giphyApp.displayGifs);

        },

        displayGifs: function () {
            var gif = $(this).attr("data-gifSearch");
            var key = "45oTHuGUHDNDSusO9xApgFlC5Ttl3yOF";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + key + "&limit=10";
            console.log(gif);

            $.ajax({
                url: queryURL,
                method: "get"
            }).then(function (response) {

                console.log(response);

                var gifResults = response.data;
                console.log(gifResults)

                for (var i = 0; i < response.data.length; i++) {
                    var gifDiv = $('<div class="gifDiv">');
                    var gifImg = $("<img>")
                    var ratingP = $("<p>")

                    var gifStill = gifResults[i].images.fixed_height_still.url;
                    var gifMove = gifResults[i].images.fixed_height.url;

                    gifImg.attr("data-state", "still");
                    gifImg.attr("data-still", gifStill);
                    gifImg.attr("data-move", gifMove);
                    gifImg.attr("src", gifStill);
                    gifImg.attr("class", "gif");

                    console.log(gifStill);
                    console.log(gifMove);
                    ratingP.text("Rating: " + gifResults[i].rating);

                    gifDiv.append(ratingP);
                    gifDiv.append(gifImg);

                    $("#gifContainer").prepend(gifDiv);
                }
                $(".gif").click(giphyApp.gifClick);
                $(".gif").button('toggle')
            })
        },

        gifClick: function () {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-move"));
                $(this).attr("data-state", "move");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        }



    };

    giphyApp.renderBtns();


    // TODO: error on pushing to array. search btn click function no longer works after array push.
    })

