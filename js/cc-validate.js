/** validate credit card inputs */

/** credit card const */
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
/** const values of credit card input */
const creditCardNumberValue = $(creditCardNumber).val();
const creditCardZipValue = $(creditCardZip).val();
const creditCardCvvValue = $(creditCardCvv).val();

//validate on form submit
function creditCardListener() {
    let selectedPaymentMethod = $('#payment').val();
    const creditCardRegEx = /^[0-9]{13,16}$/;
    const validateUsingRegEx = creditCardRegEx.test(creditCardNumberValue);
    if (creditCardNumberValue == "" || validateUsingRegEx) {
        $(creditCardNumber).css('border', '0px');
        $(creditCardError).hide();
        return true;
    } else {
        $(creditCardNumber).css('border', '1px solid red');
        $(creditCardError).show();
        return false;
    }
}

function creditCardZipListener() {
    const creditCardZipRegEx = /^[0-9]{5}$/;
    const validateZipUsingRegEx = creditCardZipRegEx.test(creditCardZipValue);
    if (validateZipUsingRegEx) {
        $(creditCardZip).css('border', '0px');
        $(zipError).hide();
    } else {
        $(creditCardZip).css('border', '1px solid red');
        $(zipError).show();
    }
}

function creditCardCvvListener() {
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

//on blur validate credit card input fields (number, zip, CVV)
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
    if (creditCardZipValue == '') {
        creditCardZipListener();
    } else {
        $(creditCardZip).css('border', '0px');
        $(zipError).hide();
    }
});
creditCardCvv.blur(() => {
    //check value of input on blur (not on page load)
    const creditCardCvvValue = $(creditCardCvv).val();
    if (creditCardCvvValue == '') {
        creditCardCvvListener();
    } else {
        $(creditCardCvv).css('border', '0px');
        $(cvvError).hide();
    }
});