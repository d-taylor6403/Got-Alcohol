//Intialize Firebase project
var firebaseConfig = {
    apiKey: "AIzaSyCTsKZ6_o_CAG61hj3Bq_I9YeQ0CsSTfnU",
    authDomain: "got-alcohol-42457.firebaseapp.com",
    databaseURL: "https://got-alcohol-42457.firebaseio.com",
    projectId: "got-alcohol-42457",
    storageBucket: "got-alcohol-42457.appspot.com",
    messagingSenderId: "156739318113",
    appId: "1:156739318113:web:10f08020eec9b4d446d520"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Variable created to refernce database
  var auth = firebase.auth();
  var db = firebase.firestore();


  //Authentication Status Listener to determine if a user is signed in or not
  //--------------------------------------
  auth.onAuthStateChanged(user => {
      console.log(user);
    if (user) {
      // User is signed in.
      $("#user-div").show();
      $("#user-para").show();
      $("#favs").show();
      $("#login-div").hide();
      $("#user-signup").hide();

      //Checks for currentUser and displays user email address
      var user = auth.currentUser;

      if(user != null){

        var email_id = user.email;

        $("#user-para").html("Welcome: " + email_id);

      }

    } else {
      // No user is signed in.
      $("#user-div").hide();
      $("#user-para").hide();
      $("#user-signup").hide();
      $("#login-div").hide();
      $("#favs").hide();
    }
  });

  //On Sign Up button click
  $("#sign-up").on("click", function(){
    $("#user-signup").get(0).reset();
    $("#user-signup").toggle();

  });

  //On Login button click
  $("#login").on("click", function(){

    $("#login-div").toggle();
  })
  //On Favorites button click
  $("#favs").on("click", function(){

    $("#usersFavorites").toggle();
  })


  //---------------------------------------
  //On Sign Up submit button click (Sign up Div)
  $("#signup-submit").on("click", function(){
    event.preventDefault();

    var signUpEmail = $("#inputEmail").val().trim();
    var signUpPass = $("#inputPassword").val().trim();

    db.collection("users").add({
        name: signUpEmail,
        password:  signUpPass
    })
    .then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error){
        console.error("Error adding document: ", error);
    });

    //console.log(signUpEmail + signUpPass);

    auth.createUserWithEmailAndPassword(signUpEmail, signUpPass).then(cred => {
      console.log(cred);
      $("#user-signup")[0].reset();

    });

  })



  //----------------------------------------
  //On Login button click (Login Div)
  $("#login-submit").on("click", function(){
    event.preventDefault();

    var userEmail = $("#email-field").val().trim();
    var userPassword = $("#password-field").val().trim();

    auth.signInWithEmailAndPassword(userEmail, userPassword).then(cred =>{
        console.log(cred.user)
        $("#login-div")[0].reset();
    })
  })

  //------------------------------------------------
  //On Logout button click (Logout Div)
  $("#logout-submit").on("click", function(){
    auth.signOut();
    $("#drinkFavs").empty();
  })


  //---------------------------------------------------
  //Drink History

  $("#addFavorite").on("click",(cred => {

    // var userDrink = 'Whiskey Sour';
    var userDrink = localStorage.getItem("drinkNameForFavorites");

    console.log(userDrink);

    $("#drinkFavs").text(userDrink);

    //Get the existing data
    var existing = localStorage.getItem('drinkNameForFavorites');

    //if no existing data, create an array
    //otherwise, convert the localStorage string to an array
    existing = existing ? existing.split(',') : [];

    //Add new data to localStorage Array
    existing.push(userDrink);

    //Save back to localStorage
    localStorage.setItem('drinkNameForFavorites', existing.toString());

    var newLi = $("<li>")
    newLi.append(userDrink)
    $("#userFavorites").append(newLi);


  }))