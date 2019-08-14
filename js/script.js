//temporarily hide the top area during developement
// $(".container").find("fieldset").eq(0).hide();
// $(".container").find("fieldset").eq(1).hide();
// $(".container").find("fieldset").eq(2).hide();


/* section global variables */
const colorSelectOption = $('select#color');
const otherJobTitleInput = $('#other-title');
// ensure `focus` is on NAME (first) input field on page load
$(document).ready(function () {
    $("#name").focus();
    $(colorSelectOption).hide();
    $(otherJobTitleInput).hide();
    /* insert text telling user to select T-shirt theme */
});
//if the value of 'job role' select box is 'OTHER' reveal the 'other job role' input
$('select#title').on('change', () => {
    const jobRoleOptions = $('select#title').val();
    if (jobRoleOptions === 'other') {
        $(otherJobTitleInput).show();
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
    //check value of input on blur (not on page load)
    // const nameRegEx = /^([a-zA-Z0-9_-]){1,20}$/;
    // const validateUsingRegEx = nameRegEx.test(nameInputValue);
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
    //check value of input on blur (not on page load)
    // Regex source: https://stackoverflow.com/questions/4964691/super-simple-email-validation-with-javascript
    const emailRegEx = /(.+)@(.+){2,}\.(.+){2,}/;
    const validateUsingRegEx = emailRegEx.test(emailInputValue);
    if (emailInputValue !== "" || validateUsingRegEx) {
        $(emailInput).css('border', '10px solid pink');
        $(emailError).hide();
    } else {
        $(emailInput).css('border', '1px solid red');
        $(emailError).show();
    }
}

emailInput.blur(() => {
    const emailInputValue = $(emailInput).val();
    if (emailInputValue == '' /*|| emailInputValue !== ''*/) {
        emailListener();
    } else {
        $(emailInput).css('border', '0px');
        $(emailError).hide();
    }
});



// validate credit card inputs
const creditCardNumber = $('#cc-num');
const creditCardZip = $('#zip');
const creditCardCvv = $('#cvv');
//credit card error messages
const creditCardError = $('<div>* Credit card number must be valid</div> <br/>')
    .css(cssError)
    .hide()
    .insertAfter(creditCardNumber);
const zipError = $('<div>* Zip code must be valid</div> <br/>')
    .css(cssError)
    .hide()
    .insertAfter(creditCardZip);
const cvvError = $('<div>* CVV number must be valid</div> <br/>')
    .css(cssError)
    .hide()
    .insertAfter(creditCardCvv);

const creditCardNumberValue = $(creditCardNumber).val();
const creditCardZipValue = $(creditCardZip).val();
const creditCardCvvValue = $(creditCardCvv).val();
//on blur validate credit card input fields (number, zip, CVV)
function creditCardListener() {
    let selectedPaymentMethod = $('#payment').val();
    const creditCardRegEx = /^[0-9]{13,16}$/;
    const validateUsingRegEx = creditCardRegEx.test(creditCardNumberValue);
    if (validateUsingRegEx) {
        $(creditCardNumber).css('border', '0px');
        $(creditCardError).hide();
    } else {
        $(creditCardNumber).css('border', '1px solid red');
        $(creditCardError).show();
    }

    const creditCardZipRegEx = /^[0-9]{5}$/;
    const validateZipUsingRegEx = creditCardZipRegEx.test(creditCardZipValue);
    if (validateZipUsingRegEx) {
        $(creditCardZip).css('border', '0px');
        $(zipError).hide();
    } else {
        $(creditCardZip).css('border', '1px solid red');
        $(zipError).show();
    }

    const cvvRegEx = /^[0-9]{3}$/;
    const validateCvvUsingRegEx = cvvRegEx.test(creditCardCvvValue);
    if (creditCardCvvValue !== "" || validateCvvUsingRegEx) {
        $(creditCardCvv).css('border', '0px');
        $(cvvError).hide();
    } else {
        $(creditCardCvv).css('border', '1px solid red');
        $(cvvError).show();
    }
}
creditCardNumber.blur(() => {
    //check value of input on blur (not on page load)
    const creditCardNumberValue = $(creditCardNumber).val();
    if (creditCardNumberValue == '') {
        creditCardListener();
    } else {
        $(creditCardNumber).css('border', '0px');
        $(creditCardError).hide();
    }

});
creditCardZip.blur(() => {
    //check value of input on blur (not on page load)
    const creditCardZipValue = $(creditCardZip).val();
    if (creditCardZipValue == '' || creditCardZipValue !== '') {
        creditCardListener();
    } else {
        $(creditCardZip).css('border', '0px');
        $(zipError).hide();
    }
});
creditCardCvv.blur(() => {
    //check value of input on blur (not on page load)
    const creditCardCvvValue = $(creditCardCvv).val();
    if (creditCardCvvValue == '' || creditCardCvvValue !== '') {
        creditCardListener();
    } else {
        $(creditCardCvv).css('border', '0px');
        $(cvvError).hide();
    }
});

// event listener to handle event functions
$('form').on("submit", function (event) {
    if (nameInputValue || emailInputValue === "") {
        event.preventDefault();
    }
    nameListener();
    emailListener();
    activityListener();

    if (selectedPaymentMethod === 'credit card') {
        if (creditCardNumberValue || creditCardZipValue || creditCardCvvValue === "") {
            event.preventDefault();
        }
    }
    creditCardListener();
});







/*NOTES:
 hide the 'select option' option from select box on change
 https://stackoverflow.com/questions/26785655/hide-first-option-in-select
 https://paulund.co.uk/add-and-remove-options-in-select-using-jquery
 https://gist.github.com/paulund/5861214
 $("#design option[value='js puns']").hide();
*/

/*
use .each() to loop through items in index and apply action to each
$('li').each((index, element) => {
    console.log(index, $(element).text());
})
*/

/*
get text of parent element 'label' https://stackoverflow.com/questions/19228839/why-i-cant-get-value-of-label-with-jquery-and-javascript
*/
/*
how to see if element is checked ? https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
*/
/*
remove attr and add attr https://forum.jquery.com/topic/uncheck-and-disable-multiple-checkboxes-with-one-checkbox
*/

/* PSEUDO CODE

for (let i = 0; i < checkboxes.length; i++) {
    const textOfCheckbox = checkboxes[i].parentElement.textContent

    if (textOfCheckbox includes the dayAndTime and clickedInput is not equal to checkboxes[i]) {
        toggle the disabled property on and off
    }

}
*/

/*
helpful RegEx tool to translate each part of Regex:
https://regexr.com/
useful lists of Regex for jquery:
1) http://www.designchemical.com/blog/index.php/jquery/form-validation-using-jquery-and-regular-expressions/
2) http://www.tutorialspark.com/javascript/JavaScript_Regular_Expression_Form_Validation.php
*/