console.log('Mongodb-frontend-practice');

$( document ).ready(function() {

if(sessionStorage['userName']) {
  console.log('You are logged In');
} else {
    console.log('Please log In');
}

  $('body').click(function(){
    //$(this).css('background','pink');
  }); //jquery testing

$('#loginForm').hide();
$('#logoutBtn').hide();
$('#adminPage').hide();
$('#registerForm').hide();

$('#adminBtn').click(function(){
  $('#adminPage').show();
  $('#homePage').hide();
});

$('#homeBtn').click(function(){
  $('#adminPage').hide();
  $('#homePage').show();
});

$('#loginBtn').click(function(){
  $('#loginForm').show();
});

$('#registerBtn').click(function(){
  $('#registerForm').show();
});

//get url and port from config.json
$.ajax({
    url : 'config.json',
    type : 'GET',
    dataType : 'json',
    success : function(configData) {
      console.log(configData);
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);
    }, //success
    error:function() {
      console.log('error cannot call api');
    } // error
}); //Ajax

$('#viewUserBtn').click(function(){
  $.ajax({
      url : `${url}/allUsers`,
      type : 'GET',
      dataType : 'json',
      success : function(usersFromMongo){
        console.log(usersFromMongo);
      }, //success
      error : function(){
          console.log('error: cannot call api');
      } //error
  }); //ajax
}); //viewUserBtn

$('#viewProductsBtn').click(function(){
      $.ajax({
        url :`${url}/showProducts`,
        type :'GET',
        dataType :'json',
        success : function(productsFromMongo){
          console.log(productsFromMongo);
          document.getElementById('productCards').innerHTML = "";

      for(let i=0; i < productsFromMongo.length; i++){
        document.getElementById('productCards').innerHTML +=
        `<div class="col">
        <h3 class=""> ${productsFromMongo[i].name}</h3>
        <h4 class=""> ${productsFromMongo[i].price}</h4>
        </div>`;
      }

    },//success
        error:function(){
          console.log('error: cannot call api');
        }//error

      }); //Ajax
      });//View Products Button


  $('#loginForm').submit(function(){
    event.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    console.log(username, password);

    $.ajax({
        url : `${url}/loginUser`,
        type: 'POST',
        data: {
          username : username,
          password : password
        },
        success : function(loginData){
          console.log(loginData);
          if(loginData === 'User not found, Please register') {
            alert('Register please');
          } else {
            sessionStorage.setItem('userId', loginData['_id']);
            sessionStorage.setItem('userName', loginData['username']);
            sessionStorage.setItem('userEmail', loginData['email']);
            console.log(sessionStorage);
            console.log('You are logged In');
          }

        }, //Success
        error: function() {
          console.log('error: can not call api');
        } //Error

    }); //Ajax

  }); //Submit function for login form.









}); // ready function
