/*********** PAYMENT SECTION **********/
//payment options globals
let creditCardOption = $('#credit-card');
let paypalSibling = $(creditCardOption).next();
let bitCoinSibling = $(paypalSibling).next();
let selectedPaymentMethod = $('select#payment').val();
/*
ON PAGE LOAD:
 1) Hide the“ Select Payment Method” `option`so it does not show up in the drop down menu 
 2) hide bitcoin and paypal divs.
 3) set first selection to credit card and show credit card form
*/
$(document).ready(() => {
    $('select#payment > option:first').hide();
    $('select#payment').prop('selectedIndex', 1);
    $(paypalSibling).hide();
    $(bitCoinSibling).hide();
})
// listen for changes on the payment select dropdown
$('select#payment').on('change', () => {
    $('select#payment > option:first').hide();
    let selectedPaymentMethod = $('select#payment').val();
    /*Get the value of the payment select element, if it is equal to ‘credit card’, set the credit card payment section in the form to show, and set the other two options to hide.*/
    switch (selectedPaymentMethod) {
        case 'credit_card':
            $(creditCardOption).show();
            $(paypalSibling).hide();
            $(bitCoinSibling).hide();
            break;
        case 'paypal':
            $(paypalSibling).show();
            $(creditCardOption).hide();
            $(bitCoinSibling).hide();
            break;
        case 'bitcoin':
            $(bitCoinSibling).show();
            $(paypalSibling).hide();
            $(creditCardOption).hide();
            break;
    }
});