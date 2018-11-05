$(function(){

  var WORDS;

  $('button.spin').click(reset);

  function get_words(data){
    WORDS = data;
    reset();
  }

  function reset(){
    $('.main').removeClass('done');
    $('button.spin').prop('disabled', true);
    randomize(20);
  }

  function done(){
    $('.main').addClass('done');
    $('button.spin').prop('disabled', false);
  }

  function randomize(n){
    var wait = 100;
    if (n < 8) { wait = 400; }
    if (n < 3) { wait = 800; }
    if (n < 2) { wait = 1200; }
    if (n > 0) {
      var word = random_word();
      $('.main').text(capitalize(word));
      setTimeout(function(){ randomize(n-1); }, wait);
    } else {
      var word = WORDS[Math.floor(Math.random()*WORDS.length)];
      $('.main').text(capitalize(word));
      done();
    }
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  // generates a random word, 4-6 chars in length
  function random_word(){
    var n = 4 + Math.floor(Math.random() * 6);
    return random_text(n);
  }

  // generates a random word, n chars in length
  function random_text(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for( var i=0; i < n; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  $.getJSON('words.json', get_words)
	.fail(function(jqxhr, text, err) {
	    console.error( "Word list failed to load (", text, ")", err );
	});

});
