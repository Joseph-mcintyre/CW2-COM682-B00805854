//The URIs of the REST endpoint
IUPS = "https://prod-48.northeurope.logic.azure.com:443/workflows/2be52a393c814d8991f6364fd229dcda/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5JJ8vJ-6InAWXHqZkqS7r_7gufoJSN0fySCFMDlPHRc";

TRANSLATE_URL = "https://prod-15.eastus.logic.azure.com/workflows/4dd084e6016546eca76c30e9bb375a22/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vwUq98B2vUizg2ByfGiLNQP1VhUItllTpk_50IqdKfI"

QnA_URL = "https://prod-21.northcentralus.logic.azure.com/workflows/8f9f2ea20ddc4d8db54aabaa20ee9c1e/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ETEmEjzSoFHPfvlEEzxVpOyPsPdsw_O8cATY4aukn8A"

RAI = "https://prod-02.northeurope.logic.azure.com:443/workflows/34d15fc2035543eebb32bfcd2c58eeb9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=h-vyjVlbcSooR9Hp0IZ_y8iGs0yiCIjYpC0q0AyufhU";

PUT1 = "https://prod-74.eastus.logic.azure.com/workflows/12e19f6a20c340f8b7942f766ff8ec89/triggers/manual/paths/invoke/rest/v1/users/"
PUT2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vzJ2GyCNXWaVkK5QZImUa4I2O8ca3b9mVz9bj-ne2i0"

CIAURI_CW2 = "https://prod-94.eastus.logic.azure.com/workflows/b1a3b89189c647bbbc06214e10b583fa/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WxymCwB0X90Tv79ezelgdSwyc6YLYMfthS3A-5mUWWU"

RIA_USERNAME1 = "https://prod-67.eastus.logic.azure.com/workflows/78ce124a9f9940cbaa47999d43c83f00/triggers/manual/paths/invoke/rest/v1/users/"
RIA_USERNAME2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Wk1FcqJVq_DYhB3sd7DyoPz2_UYhCCBJJFMqdmn1MTU"

RAA_ALL_USERS = "https://prod-89.eastus.logic.azure.com/workflows/0f39396142b746fba166a45c40b8787c/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2AJ2IsYApuOH8qm7rVXVcdSgPEZQJzqs0HtqjcrTcG0"

DELETE_USER_1 = "https://prod-64.eastus.logic.azure.com/workflows/521ca4fe7509438890a6e501fd710bf7/triggers/manual/paths/invoke/rest/v1/users/"
DELETE_USER_2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ini0hGJviyr0Rg3RdPpO6jPoPb8plrOJ0d3Gtvn_pGA"

BLOB_ACCOUNT = "https://imgshareb00805854.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

  $("#translateButton").click(function() {
    var userText = $("#textInput").val(); // Get the text from the input field
    var translateLanguage = $("#languageSelect").val();

    $.ajax({
        url: TRANSLATE_URL, 
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ text: userText, language: translateLanguage }), // Send the text to be translated
        success: function(response) {
            $("#translatedText").text(response[0].translations[0].text)
        },
        error: function(xhr, status, error) {
            console.log("Error:", error);
        }
    });
});

  $('#questionForm').submit(function(event) {
    event.preventDefault();
    var userQuestion = $('#questionInput').val();

    $.ajax({
        url: QnA_URL,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ question: userQuestion }),
        success: function(response) {
            // Assuming the response contains an array of answers
            displayAnswers(response.answers); // Call the function to display the answers
        },
        error: function(xhr, status, error) {
            console.log("Error:", error);
            $('#answer').text('Failed to get the answer.');
        }
    });
});



function displayAnswers(answers) {
    $('#answer').empty();
    if (answers && answers.length > 0) {
        answers.forEach(function(item) {
            $('#answer').append('<p>' + item.answer + '</p>');
        });
    } else {
        $('#answer').text('No answers available.');
    }
}




  $('#loginButton').click(function() {

    var username = $('#username').val();
    var password = $('#password').val();
    loggedInUsername = username;

    RIA_USERNAME3 = RIA_USERNAME1 + username + '/' + password + RIA_USERNAME2;
    console.log(RIA_USERNAME3)
    getLogIn();
  });

  $('#guestButton').click(function() {
    window.location.href = 'index.html';
  });

  $('#submitUpdate').click(function(){
    var userID = $('#updateUserID').val();
    console.log("User ID:", userID);
    urlUpdate = PUT1 + userID + PUT2;
    console.log("URL:", urlUpdate);

    var subObj = {
      userName: $('#updateUsername').val(),
      firstName: $('#updateFirstName').val(),
      lastName: $('#updateLastName').val(),
      passWord: $('#updatePassWord').val(),
    }

    
  $.ajax({
    url: urlUpdate,
    method: 'PUT',
    data: JSON.stringify(subObj),
    contentType: 'application/json; charset=utf-8',
    success: function(response) {
        alert("User Successfully Updated!");
        getAllUsers();
        $('#updateFormContainer').hide();
    },
    error: function(xhr, status, error) {
        console.error("Update failed:", error);
    }
}); 


  });

  $('#signUpButton').click(function() {
  // Toggle the display of the sign-up form
  $('#signUpForm').toggle();
  });
 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 


  $("#viewUsers").click(function(){

    //Run the get asset list function
    getAllUsers();

}); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 

  $("#subNewUser").click(function(){

    //Execute the submit new asset function
    submitNewUser();
    
  }); 
});


function submitNewUser(){
  
  //Construct JSON Object for new item
  var subObj = {
    userName: $('#userName').val(),
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    passWord: $('#passWord').val(),
  }
    


  //Convert to a JSON String
  subObj = JSON.stringify(subObj);


  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: CIAURI_CW2,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
    }).done(function (response) {
      alert("User Creation successful!");
      window.location.href = 'index.html';
    getLogIn();
    });   
    
  
}

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
  submitData = new FormData();

  //Get form variables and append them to the form data object
 submitData.append('FileName', $('#FileName').val());
 submitData.append('fileType', $('#fileType').val());
 submitData.append('desc', $('#desc').val());
 submitData.append('userName', $('#userName').val());
 submitData.append('restaurant', $('#restaurant').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
  url: IUPS,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){
    alert("Posted!");
    $('#FileName').val('')
    $('#desc').val('')
    $('#userName').val('')
    $('#UpFile').val('')
    getImages();
  }
  });
 
  
 

}


//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');

  $.getJSON(RAI, function(data) {
      var items = [];
  
      $.each(data, function(key, val) {
          items.push("<hr />");
          
          // Choose the correct HTML tag based on fileType
          switch (val["fileType"]) {
              case "vid":
                  items.push("<video width='400' controls><source src='" + BLOB_ACCOUNT + val["filePath"] + "' type='video/mp4'></video><br/>");
                  break;
              case "img":
                  items.push("<img src='" + BLOB_ACCOUNT + val["filePath"] + "' width='400'/> <br/>");
                  break;
              case "aud":
                  items.push("<audio controls><source src='" + BLOB_ACCOUNT + val["filePath"] + "' type='audio/mpeg'></audio><br/>");
                  break;
              default:
                  items.push("<p>Unknown media type</p>");
                  break;
          }

          items.push("Description: " + val["desc"] + "<br/>");
          items.push("Uploaded by: " + val["userName"] + "<br/>");
          items.push("Restaurant: " + val["restaurant"]+ "<br/>");
          items.push("File: " + val["fileName"] + "<br/>");
          items.push("<hr />");
      });

      $('#ImageList').empty().append($("<ul/>", {
          "class": "my-new-list",
          html: items.join("")
      }));
  });
}

function getAllUsers(){
  $('#AllUsersList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAA_ALL_USERS, function(data) {
      var items = [];

          $.each(data, function(key, val) {
              items.push("<div class='user-details'>");
              items.push("<p>Username: " + val["userName"] + "</p>");
              items.push("<p>First Name: " + val["firstName"] + "</p>");
              items.push("<p>Last Name: " + val["lastName"] + "</p>");
              items.push("<p>Password: " + val["passWord"] + "</p>");
              items.push('<button type="button" class="btn btn-danger" onclick="deleteUser(' + val["userID"] + ')">Delete</button>&nbsp;');
              items.push('<button type="button" class="btn btn-info" onclick="updateUser(' + val["userID"] + ')">Update</button>');
              items.push("</div><hr>");  
          });

      $('#AllUsersList').empty();
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
        }).appendTo( "#AllUsersList" );    
  });
}

function updateUser(id) {
  $('#updateUserID').val(id); // Set the ID in the hidden input field
  $('#updateFormContainer').show(); // Show the update form
}


function deleteUser(id){
  $.ajax({
    type: "DELETE",
    //Note the need to concatenate the
    url: DELETE_USER_1 + id + DELETE_USER_2,
    }).done(function( msg ) {
    alert("User Successfully Deleted!");
    getAllUsers();
    });

}



function getLogIn() {
  $('#UsersList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RIA_USERNAME3, function(data) {
      var items = [];

      if (data.ResultSets && data.ResultSets.Table1) {
          // var users = data.ResultSets.Table1;

          // $.each(users, function(index, user) {
          //     items.push("<div class='user-details'>");
          //     items.push("<p>Username: " + user.userName + "</p>");
          //     items.push("<p>First Name: " + user.firstName + "</p>");
          //     items.push("<p>Last Name: " + user.lastName + "</p>");
          //     items.push("<p>Password: " + user.passWord + "</p>");
          //     items.push('<button type="button" class="btn btn-danger" onclick="deleteAsset(' + user.userID + ')">Delete</button>');
          //     items.push("</div><hr>");
          // });
          alert("Login successful, Welcome " + $('#username').val());
          var isLoggedIn = true;          
    window.location.href = 'index.html';

      } else {
        alert("Incorrect Username or Password!");
        $('#username').val('');
        $('#password').val('');

      }

      $('#UsersList').empty().append(items.join(''));
  });
}


