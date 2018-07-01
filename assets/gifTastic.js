$(document).ready(function () {
    var array = ["baseball", "football", "basketball", "music", "LOL", "funny", "sad", "boring", "yes", "no", "up",
        "down", "excited", "bunny", "cat", "dog", "horse", "cow", "school", "work"
    ]
    var host = "https://api.giphy.com";
    var endpoint = "/v1/gifs/search";
    var apiKey = "?api_key=" + "zCnoYChqQJheHUpoWR7idTpChl7ayCAU";
    var searchTerm = "";
    var limit = "&limit=10"
    var fullURL = host + endpoint + apiKey + "&q=" + searchTerm + limit;
    var state;

    function populateGIFs() {
        $.ajax({
            url: fullURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            addData(response);
        })
    }

    function createButtons() {
        for (var i = 0; i < array.length; i++) {
            var newBtn = $("<button>");
            newBtn.text(array[i]);
            newBtn.addClass("btn btn-success m-1 grnButton");
            newBtn.attr("data-search", array[i]);
            $(".container").append(newBtn);
        }
    }

    function addData(response) {
        console.log(response);
        for (i = 0; i < response.data.length; i++) {
            console.log(i);
            var gifRating = response.data[i].rating;
            var imgURL = response.data[i].images.downsized_still.url;
            var image = $("<img style='display:inline !important;'src ='" + imgURL + "'>");
            var rating = $("<p>Image Rating: " + gifRating + "</p>");
            image.attr("data-still", response.data[i].images.downsized_still.url);
            image.attr("data-animate", response.data[i].images.downsized_medium.url);
            image.attr("data-state", "still");
            state = $(this).attr("data-state");
            $("#gif-landing").prepend(image, rating);
        }
    }

    createButtons();

    $(document).on("click", "img", function () {
        state = $(this).attr("data-state");
        if (state === "still") {
            var animateGIF = $(this).attr("data-animate");
            $(this).attr("src", animateGIF);
            $(this).attr("data-state", "moving");
        } else if (state === "moving") {
            var stopGIF = $(this).attr("data-still");
            $(this).attr("src", stopGIF);
            $(this).attr("data-state", "still");
        }
    })

    $("#searchBtn").on("click", function () {
        var search = $("#search-value").val();
        newBtn = $("<button>");
        newBtn.text(search);
        newBtn.addClass("btn btn-success m-1 grnButton");
        newBtn.attr("data-search", search);
        $(".container").append(newBtn);
        $("#search-value").val("");
    })

    $(document).on("click", ".grnButton", function () {
        searchTerm = $(this).attr("data-search");
        fullURL = host + endpoint + apiKey + "&q=" + searchTerm + limit;
        $("#gif-landing").empty();
        populateGIFs();
    })


})