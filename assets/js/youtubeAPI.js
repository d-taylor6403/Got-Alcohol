//the click for the search button
function goBtn(e) {
    e.preventDefault();
    //the number of videos to be displayed
    var resultNum = 3;
    //shows the  how many videos button
    $(".buttonContainer").show();
    var searchResult = "how to make " + $(".drinkNameForYoutube").text() + " drink";
    console.log(searchResult);
    showResults();

    //the show results function
    function showResults() {
     
        //the url for the api call
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchResult + "&type=video&maxResults=" + resultNum + "&videoDuration=short&key=AIzaSyBXAu5ym186De_Z68aG2K7Hz76ZeN88nqw"
        console.log(queryURL);

        $.ajax({
            //the queryURL from above
            url: queryURL,
            //method GET
            method: "GET"
            //then
        }).then(function (resp) {
            
            //results = resp.items
            var results = resp.items
            console.log(results);
            console.log(resp);
            clear();
            for (var i = 0; i < results.length; i++) {


                var vidId = results[i].id.videoId;
                console.log(vidId);

                var title = results[i].snippet.title;
                console.log(title);

                var card = $("<div>").attr("class", "card")
                //creates an image tag and stores it
                var obj = $("<object>");
                obj.attr("data", "https://www.youtube.com/embed/" + vidId);
                obj.attr("class", "video")
                //adds the image tag to the card
                card.prepend(obj)
                //adds a card body for the rating
                var cardbody = $("<div>").attr("class", "card-body")
                //adds the rating to the card
                cardbody.prepend(title)
                //puts it all togther for the final card
                card.prepend(cardbody)
                $("#youtubeVids").append(card)

            }

        });
   
    }
   
    function clear() {
        $("#youtubeVids").empty();
    }
    $(document).on("click", ".clear", clear);
};
$(document).on("click", "#submitOptionButton", goBtn);