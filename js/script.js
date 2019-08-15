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


/** event listener to handle on submit event functions*/
$('form').on("submit", function (event) {
    if (selectedPaymentMethod !== 'credit_card' && nameListener() === false) {
        event.preventDefault();
    }
    if (selectedPaymentMethod !== 'credit_card' && emailListener() === false) {
        event.preventDefault();
    }
    if (selectedPaymentMethod !== 'credit_card' && activityListener() === false) {
        event.preventDefault();
    }
    /**if credit card is not selected */
    if (selectedPaymentMethod === 'credit_card' && creditCardNumberValue === '') {
        event.preventDefault();
    }
    if (selectedPaymentMethod === 'credit_card' && creditCardZipValue === '') {
        event.preventDefault();
    }
    if (selectedPaymentMethod === 'credit_card' && creditCardCvvValue === '') {
        event.preventDefault();
    }
    creditCardListener();
    creditCardCvvListener();
    creditCardCvvListener();

});







