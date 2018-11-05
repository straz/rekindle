$(document).ready(init_page);

var GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbysH3kYUknjD9XluiY5GTRRuyRAb7D31UzS8l8XdbEWvCId4mI/exec';

function init_page(){
  $('button#signup_submit').click(function(){return on_submit_signup();});
  $('.frame2 .btn.ok').click(signup_restore);
}

// If you click "OK" in error/success alert boxes, dismiss them.
function signup_restore(){
  $('.frame2').hide(200);
  return false;
}

// If you click "add me", post form value to the cloud (google spreadsheet)
function on_submit_signup(){
    var email = $('form input').val();
    // First, validate the email address
    if (!validateEmail(email)){
	if (email == "" || email == undefined){
	    errMsg = "Missing email address.";
	} else {
	    errMsg = '"' + email + '" doesn\'t seem to be a valid email address.';
	}
	callback({result: errMsg});
	return false;
    } else {
	// Address is good, go POST it
	$('.spinner').show();
	$.ajax({url: GOOGLE_URL,
		data: {'email': email},
		jsonpCallback: 'callback',
		error: on_fail,
		dataType: 'jsonp'
	       });
	return false;    // e.preventDefault
    }
}

function on_fail(jqXHR, textStatus, errorThrown){
    console.log('fail', jqXHR, textStatus, errorThrown);
    show_alert({result:"Could not post data to server."});
}

// Called when AJAX returns success or failure
// result_struct is either
//  { result: "success" } or
//  { result: <error string> }
function callback(result_struct){
    $('.spinner').hide();
    show_alert(result_struct);
    return false;
}

function show_alert(result_struct){
    $('.spinner').hide();
    $('.frame2').show();
    var result = result_struct.result;
    if (result == 'success'){
	$('.frame2 .fail').hide();
	$('.frame2 .success').show();
    } else {
	$('.frame2 .success').hide();
	$('.frame2 .fail').show();
	$('.frame2 .fail .reason').html(result);
    }
    return false;
}

// returns true if email is valid, else returns false.
function validateEmail(email) {
  var re = /(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return re.test(email);
}


