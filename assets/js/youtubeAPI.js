//the click for the search button
function goBtn(e) {
    e.preventDefault();
    $("#youtubeVids").empty()
    var drinkName = $(".drinkNameForYoutube")
    localStorage.setItem("drinkNameForFavorites", drinkName)
    var searchResult = "how to make " + drinkName.text() + " drink";
    showResults();

    //the show results function
    function showResults() {
     
        //the url for the api call
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchResult + "&type=video&maxResults=4&videoDuration=short&key=AIzaSyAbn6xhyx5K-gAjMIqXng_g7S1pSx8XOnQ"

        $.ajax({
            //the queryURL from above
            url: queryURL,
            //method GET
            method: "GET"
            //then
        }).then(function (resp) {
            
            //results = resp.items
            var results = resp.items

            for (var i = 0; i < results.length; i++) {

                var vidId = results[i].id.videoId;

                var title = results[i].snippet.title;

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

        })
   
    }

}
$(document).on("click", ".goBtn", goBtn);