/* section global variables */
const colorSelectOption = $('select#color');
const otherJobTitleInput = $('#other-title');

// ensure `focus` is on NAME (first) input field on page load
$(document).ready(function () {
    $("#name").focus();
    $(colorSelectOption).hide();
    $(otherJobTitleInput).hide();
});

//if the value of 'job role' select box is 'OTHER' reveal the 'other job role' input
$('select#title').on('change', () => {
    const jobRoleOptions = $('select#title').val();
    if (jobRoleOptions === 'other') {
        $(otherJobTitleInput).show();
    } else {
        $(otherJobTitleInput).hide();
    }
})


/*****FORM VALIDATION*****/
const cssError = { 'backgroundColor': 'red', 'color': 'white', 'text-transform': 'uppercase', 'font-size': '1.1em', 'border': '5px, solid, gray', 'padding': '10px 0px 10px 30px' };

const nameInput = $('#name');
const nameError = $(`<div> * Name must be 1 and 20 characters</div> <br/>`)
    .css(cssError)
    .hide()
    .insertAfter(nameInput);

// validate name input on blur
const nameInputValue = $(nameInput).val();
function nameListener() {
    //check value of input on form submit
    if (nameInputValue !== '') {
        $(nameInput).css('border', '0px');
        $(nameError).hide();
        return true;
    } else {
        $(nameInput).css('border', '1px solid red');
        $(nameError).show();
        return false;
    }
}

//check value of input on blur (not on page load)
nameInput.blur(() => {
    const nameInputValue = $(nameInput).val();
    if (nameInputValue == '') {
        nameListener();
    } else {
        $(nameInput).css('border', '0px');
        $(nameError).hide();
    }
});

// email validation
const emailInput = $('#mail');
const emailError = $('<div>* Email must be valid</div> <br/>')
    .css(cssError)
    .hide()
    .insertAfter(emailInput);
const emailInputValue = $(emailInput).val();
function emailListener() {
    console.log('email = listerner here');

    //check value of input on form submit
    // Regex source: https://stackoverflow.com/questions/4964691/super-simple-email-validation-with-javascript

    const emailRegEx = /(.+)@(.+){2,}\.(.+){2,}/;
    const validateUsingRegEx = emailRegEx.test(emailInputValue);
    if (emailInputValue !== '') {
        $(emailInput).css('border', '0px');
        $(emailError).hide();
        return true;
    } else {
        $(emailInput).css('border', '1px solid red');
        $(emailError).show();
        return false;
    }

}

//check value of input on blur (not on page load)
emailInput.blur(() => {
    const emailInputValue = $(emailInput).val();
    if (emailInputValue == '') {
        emailListener();
    } else {
        $(emailInput).css('border', '0px');
        $(emailError).hide();
    }
});


// event listener to handle event functions
$('form').on("submit", function (event) {

    if (emailInputValue === '') {
        event.preventDefault();
    }
    if (nameInputValue == "") {
        event.preventDefault();
    }
    if (creditCardNumberValue || creditCardZipValue || creditCardCvvValue == "") {
        event.preventDefault();
    }

    emailListener();
    nameListener();
    activityListener();
    creditCardListener();
    creditCardZipListener();
    creditCardCvvListener();
});

