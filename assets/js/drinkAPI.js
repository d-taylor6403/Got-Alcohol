var userIngredient = "gin"
var drinkName = "margarita"

var ingredientQuery = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userIngredient
var drinkNameQuery = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName
var randomDrinkQuery = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

function searchByIngredient() {
    userIngredient = $("#ingredientNameInput").val().trim()
    ingredientQuery = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userIngredient
    
    $.ajax({
        url: ingredientQuery,
        method: "GET"
    }).then(function(ingredientResponse){
        for (var i = 0; i < ingredientResponse.drinks.length; i++) {
            var newOption = $("<option value='" + i + "'>")
            newOption.append(ingredientResponse.drinks[i].strDrink)
            $("#drinkSelector").append(newOption)
        }
    
        $("#submitOptionButton").on("click", function(event){
            event.preventDefault()
    
            var indexValue = $("#drinkSelector option:selected").val()
            drinkName = ingredientResponse.drinks[indexValue].strDrink
            drinkNameQuery = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName
    
            $.ajax({
                url: drinkNameQuery,
                method: "GET"
            }).then(function(drinkResponse){
                console.log(drinkResponse.drinks[0]);
    
                $("#drinkOutput").empty()
    
                $("#drinkOutput").append($("<p class='drinkData'>Drink Name: <span class='drinkNameForYoutube'>" + drinkResponse.drinks[0].strDrink + "</span></p>"))
                $("#drinkOutput").append($("<p class='drinkData'>Drink Glass: " + drinkResponse.drinks[0].strGlass + "</p>"))
    
                for (var x = 1; x < 16; x++) {
                    if (drinkResponse.drinks[0]["strIngredient" + x] !== null && drinkResponse.drinks[0]["strMeasure" + x] !== null) {
                        $("#drinkOutput").append($("<p class='drinkData'>Drink Ingredient" + x + " : " + drinkResponse.drinks[0]["strMeasure" + x] + " of " + drinkResponse.drinks[0]["strIngredient" + x] + "</p>"))
                    } else if (drinkResponse.drinks[0]["strIngredient" + x] !== null) {
                        $("#drinkOutput").append($("<p class='drinkData'>Drink Ingredient" + x + " : " + drinkResponse.drinks[0]["strIngredient" + x] + "</p>"))
                    }
                }
    
                $("#drinkOutput").append($("<p class='drinkData'>Instructions: " + drinkResponse.drinks[0].strInstructions + "</p>"))
    
            })
        })
    })
}

function searchByName() {
    drinkName = $("#drinkNameInput").val().trim()
    drinkNameQuery = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName

    $.ajax({
        url: drinkNameQuery,
        method: "GET"
    }).then(function(drinkResponse){

        $("#drinkOutput").empty()

        $("#drinkOutput").append($("<p class='drinkData'>Drink Name: <span class='drinkNameForYoutube'>" + drinkResponse.drinks[0].strDrink + "</span></p>"))
        $("#drinkOutput").append($("<p class='drinkData'>Drink Glass: " + drinkResponse.drinks[0].strGlass + "</p>"))

        for (var x = 1; x < 16; x++) {
            if ((drinkResponse.drinks[0].strIngredient + x) !== null && (drinkResponse.drinks[0].strMeasure + x) !== null) {
                $("#drinkOutput").append($("<p class='drinkData'>Drink Ingredient" + x + " : " + drinkResponse.drinks[0].strMeasure + x) + " of " + (drinkResponse.drinks[0].strIngredient + x) + "</p>")
            } else if ((drinkResponse.drinks[0].strIngredient + x) !== null) {
                $("#drinkOutput").append($("<p class='drinkData'>Drink Ingredient" + x + " : " + (drinkResponse.drinks[0].strIngredient + x) + "</p>"))
            }
        }

        $("#drinkOutput").append($("<p class='drinkData'>Instructions: " + drinkResponse.drinks[0].strInstructions + "</p>"))
    })
}

function randomDrink() {
    randomDrinkQuery = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

    $.ajax({
        url: randomDrinkQuery,
        method: "GET"
    }).then(function(drinkResponse){

        $("#drinkOutput").empty()

        $("#drinkOutput").append($("<p class='drinkData'>Drink Name: <span class='drinkNameForYoutube'>" + drinkResponse.drinks[0].strDrink + "</span></p>"))
        $("#drinkOutput").append($("<p class='drinkData'>Drink Glass: " + drinkResponse.drinks[0].strGlass + "</p>"))

        for (var x = 1; x < 16; x++) {
            if ((drinkResponse.drinks[0].strIngredient + x) !== null && (drinkResponse.drinks[0].strMeasure + x) !== null) {
                $("#drinkOutput").append($("<p class='drinkData'>Drink Ingredient" + x + " : " + drinkResponse.drinks[0].strMeasure + x) + " of " + (drinkResponse.drinks[0].strIngredient + x) + "</p>")
            } else if ((drinkResponse.drinks[0].strIngredient + x) !== null) {
                $("#drinkOutput").append($("<p class='drinkData'>Drink Ingredient" + x + " : " + (drinkResponse.drinks[0].strIngredient + x) + "</p>"))
            }
        }

        $("#drinkOutput").append($("<p class='drinkData'>Instructions: " + drinkResponse.drinks[0].strInstructions + "</p>"))
    })
}

$("#byIngredientSubmit").on("click", function(event){
    event.preventDefault()
    searchByIngredient()
})

$("#byDrinkNameSubmit").on("click", function(event){
    event.preventDefault()
    searchByName()
})

$("#randomDrinkSubmit").on("click", function(event){
    event.preventDefault()
    randomDrink()
})