console.log('Mongodb-frontend-practice');

$( document ).ready(function() {
  $('body').click(function(){
    $(this).css('background','pink');
  }); //jquery testing

$('#loginForm').hide();
$('#adminPage').hide();
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











}); // ready function
