$(document).ready(init_page);

var GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbysH3kYUknjD9XluiY5GTRRuyRAb7D31UzS8l8XdbEWvCId4mI/exec';

function init_page(){
  $('button#signup_submit').click(function(){return on_submit_signup();});
  $('.frame2 .btn.ok').click(signup_frame1);
}

function on_submit_signup(){
    var email = $('form input').val();
    console.log('email', email);
    if (!validateEmail(email)){
	if (email == "" || email == undefined){
	    errMsg = "Missing email address.";
	} else {
	    errMsg = '"' + email + '" doesn\'t seem to be a valid email address.';
	}
	callback({result: errMsg});
    return false;
    } else {
	console.log('calling ajax', email);
	$('.spinner').show();
	$.ajax({url: GOOGLE_URL,
		data: {'email': email},
		jsonpCallback: 'callback_signup',
		dataType: 'jsonp'
	       }); //.done(callback_signup)
            //.fail(function(jqXHR, textStatus, errorThrown){signup_frame2({result:"Could not post data to server."});});
	return false;    // e.preventDefault
    }
}

function callback(result){
    console.log('callback successful result', result);
    $('.spinner').hide();
    signup_frame2(result);
    return false;
}



//----------------------------

function signup_frame1(){
  $('.frame1').show(200);
  $('.frame2').hide(200);
  return false;
}


function signup_frame2(result_struct){
    $('.spinner').hide();
    var result = result_struct.result;
    $('.frame2').show();
    if (result == 'success'){
	$('.frame2 .success').show();
	$('.frame2 .fail').hide();
    } else {
	$('.frame2 .fail').show();
	$('.frame2 .fail .reason').html(result);
	$('.frame2 .success').hide();
    }
    return false;
}

function validateEmail(email) {
  var re = /(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return re.test(email);
}


