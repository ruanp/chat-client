if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  debugger;
  var ourUserName = (prompt('What is your name?') || 'anonymous');
  newSearch += 'username=' + ourUserName;
  window.location.search = newSearch;
}

// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

var ourUserData = {
  "username" : ourUserName,
  "text" : "hello World"
};

//GET//
// $.ajax({
//   url: "https://api.parse.com/1/classes/messages",
//   type: "GET",
//   data: 'where={"username": "Andrew and Nima"}',
//   crossDomain: true,
//   contentType: "application/json"
// }).done(function(stuff){
//   console.log(stuff);
// }).fail(function(){
//   alert('fail');
// });

//POST//
// $.ajax({
//   url: "https://api.parse.com/1/classes/messages",
//   type: "POST",
//   data: JSON.stringify(ourUserData),
//   crossDomain: true,
//   contentType: "application/json"
// }).done(function(stuff){
//   console.log(stuff);
// }).fail(function(){
//   alert('you might as well kill yourself');
// });



var getMessages = function(array) {
  var userObj = [];
  for (var i = 0; i<array.length; i++){
    var thisMessage = {};
    thisMessage.msg = array[i].text;
    if (array[i].hasOwnProperty('username')){
      thisMessage.username = array[i].username;
    } else {
      thisMessage.username = 'Anonymous';
    } 
    userObj.push(thisMessage);
  }
  return userObj;
};

var makeMessageDiv = function(obj) {

  $userP = $('<p class="text-right lead"></p>').text(obj.username);
  $messageP = $('<p class="text-left"></p>').text(obj.msg);
  $messageDiv = $('<div class="well"></div>').append($userP).append($messageP);
  return $messageDiv;
};

var appendToMessages = function(div) {
  $('.msgHolder').append(div);
};

$.ajax({
  url: "https://api.parse.com/1/classes/messages",
  type: "GET",
  crossDomain: true,
  contentType: "application/json"
}).done(function(response){
  
  var messageList = getMessages(response.results);
  var $messageDiv;

  for (var i =0; i < messageList.length; i++) {
    $messageDiv = makeMessageDiv(messageList[i]);
    appendToMessages($messageDiv);
  }


}).fail(function(){
  alert('fail');
});





