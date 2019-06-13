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

/*********** COLORS SECTION **********/
//when the color 'design' select Box changes execute this block
/* study guide suggests to initially hide the 'SELECT THEME' option on page load but it's better to leave this there so user is
clear that this is the dropdown that is used to select the theme
*/
/* section global variables */
const colorsDivID = $('#colors-js-puns');
const tempSpanColorDiv = $('<div>Please select a T-shirt theme</div>').appendTo(colorsDivID);
$('select#design').on('change', () => {
    const modifyTshirtSelections = $('select#design').val();
    // declare color  variables
    const cornflowerblue = $(colorSelectOption).find('option[value = "cornflowerblue"]');
    const darkslategrey = $(colorSelectOption).find('option[value = "darkslategrey"]');
    const gold = $(colorSelectOption).find('option[value = "gold"]');
    const tomato = $(colorSelectOption).find('option[value = "tomato"]');
    const steelblue = $(colorSelectOption).find('option[value = "steelblue"]');
    const dimgrey = $(colorSelectOption).find('option[value = "dimgrey"]');

    $('select#design > option:first').hide(); // hide "select theme" on change
    $(tempSpanColorDiv).hide();
    $(colorSelectOption).show();
    
/* set dropdown to specified index on change https://stackoverflow.com/questions/7445492/how-to-set-the-first-option-on-a-select-box-using-jquery */
    if (modifyTshirtSelections === 'js puns') {
        $(colorSelectOption).prop('selectedIndex', 0); 
        $(tomato).hide();
        $(steelblue).hide();
        $(dimgrey).hide();
        $(cornflowerblue).show();
        $(darkslategrey).show();
        $(gold).show();
    }
    if (modifyTshirtSelections === 'heart js') {
        $(colorSelectOption).prop('selectedIndex', 3);
        $(tomato).show();
        $(steelblue).show();
        $(dimgrey).show();
        $(cornflowerblue).hide();
        $(darkslategrey).hide();
        $(gold).hide();
    }
})

/*********** ACTIVITIES SECTION **********/
/* section global variables */
let totalActivityCost = 0;  //inital value of cost of activities
const totalDiv = $(`<div></div>`).addClass('totalcost');  
$('.activities').append(totalDiv); //element to display total activity cost

//Listen for changes in the activity section
$('.activities').on('change', (event) => {
    event.preventDefault();

    let clickedElement = $(event.target);
    let valueOfParent = clickedElement.parent('label').text();
    const checkboxes = $('[type="checkbox"]');
    //The index of the dollar sign ‘$’ in the label text from the variable (that you declared above).
    let dollarSign = '$';
    let indexOfDollarSign = valueOfParent.indexOf(dollarSign);// return index of dollar sign
    //The cost of the activity the was just clicked. https://stackoverflow.com/questions/24200493/jquery-cut-off-div-text-after-4-characters
    let fullDollarAmountOfClickedItem = parseInt(valueOfParent.slice(indexOfDollarSign + 1));
    let emDash = '—';
    let indexOfEmDash = valueOfParent.indexOf(emDash);
    let comma = ',';
    let indexOfComma = valueOfParent.indexOf(comma);
    let dayAndTime = valueOfParent.slice(indexOfEmDash + 1, indexOfComma);
   
    clickedElement.each(() => {
        if ($(clickedElement).is(':checked')) { // is the clicked element checked?
            totalActivityCost += parseInt(fullDollarAmountOfClickedItem);
        } else {
            totalActivityCost -= parseInt(fullDollarAmountOfClickedItem);
        }
        totalDiv.text(`The total cost is: ` + totalActivityCost);
    });

   // When an activity is checked, disable any activity that occurs at the same day and time without disabling the activity that was just checked.
    for (let i = 0; i < checkboxes.length; i++) {
        const boxThatIsClicked = checkboxes[i].parentElement.textContent;
        // if the text of the input.includes() AND the value of parent is not the element that is clicked now
        if (boxThatIsClicked.includes(dayAndTime) && valueOfParent != boxThatIsClicked) { 
            if (clickedElement.prop('checked') === false) {
                checkboxes[i].disabled = false;
            } else {
                checkboxes[i].disabled = true;
       
            }
        }
    }
});

/*********** PAYMENT SECTION **********/
//payment options globals
let creditCardOption = $('#credit-card');
let paypalSibling = $(creditCardOption).next();
let bitCoinSibling = $(paypalSibling).next();
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
    /*
Get the value of the payment select element, if it is equal to ‘credit card’, set the credit card payment section in the form to show, and set the other two options to hide.
*/    
    if (selectedPaymentMethod === 'credit card') {
        $(creditCardOption).show();
        $(paypalSibling).hide();
        $(bitCoinSibling).hide();       
    }
    /*
Repeat the above step with the PayPal and BitCoin options so that the selected payment is shown and the others are hidden.
*/
    if (selectedPaymentMethod === 'paypal') {
        $(paypalSibling).show();
        $(creditCardOption).hide();
        $(bitCoinSibling).hide();      
    }
    if (selectedPaymentMethod === 'bitcoin') {
        $(bitCoinSibling).show();
        $(paypalSibling).hide();
        $(creditCardOption).hide();       
    }
    
})


/*****FORM VALIDATION*****/

const cssError = { backgroundColor: 'red', color: 'white', 'text-transform': 'uppercase' };

const nameInput = $('input#name');
const nameInputValue = $(nameInput).val();
const nameError = $('<div>*Name must be more than one character</div> <br/>')
    .css(cssError)
    .hide()
    .insertAfter(nameInput);
const nameRegEx = /^[a-zA-Z]+$/;
const is_name = nameRegEx.test($(nameInputValue));
// validate name input on blur
nameInput.focusout(()=> {
    if (is_name == false) {
        $(nameError).show();
        return false;
    } else {
        $(nameError).hide();
        return true;
    }
    
 })

/*
// email validation
 const emailInput = $('#mail');
 const emailInputValue = $(emailInput).val();
 const emailError = $('<div>* Email must be valid</div> <br/>')
     .css(cssError)
     .hide()
     .insertAfter(emailInput);
function validateEmailInput() {
    // https://formden.com/blog/validate-contact-form-jquery
    let emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let is_email = emailRegEx.test(emailInputValue);
    if (is_email) {
        $(emailError).hide()
    } else {
        $(emailError).show();
    }
}
emailInput.focusout(() => {
    if (emailInputValue !== '') {
        validateEmailInput();
    } else {
        $(emailError).hide()
    }
    
})
*/


/*
function validateCreditCardInputs() {
    event.preventDefault();
    let input = $(event.target);

    let selectedPaymentMethod = $('select#payment').val();
    const creditCardNumber = $('#cc-num');
    let creditCardNumberValue = $(creditCardNumber).val();
    const creditCardZip = $('#zip');
    let creditCardZipValue = $(creditCardZip).val();
    const creditCardCvv = $('#cvv');
    let creditCardCvvValue = $(creditCardCvv).val();
    if (selectedPaymentMethod === 'credit card') {
        if (isNaN(creditCardNumberValue) || creditCardNumberValue === '' || creditCardNumberValue.length < 13 || creditCardNumberValue.length > 16) {
            $('<div>*Credit Card Number must be valid</div><br/><div></div>')
                .css({
                    'color': 'red',
                    'text-transform': 'uppercase',
                    'margin-bottom': '5%'
                })
                .insertAfter(creditCardNumber);
        }
        if (creditCardZipValue === '') {
            $('<div>*Zip code must be valid</div><br/><div></div>')
                .css({
                    'color': 'red',
                    'text-transform': 'uppercase',
                    'margin-bottom': '5%'
                })
                .insertAfter(creditCardZip);
        }
        if (creditCardCvvValue === '') {
            $('<div>*CVV must be valid</div><br/><div></div>')
                .css({
                    'color': 'red',
                    'text-transform': 'uppercase',
                    'margin-bottom': '5%'
                })
                .insertAfter(creditCardCvv);
        }
    }
}


// event listener to handle event functions
$('form').on("submit", function (event) {
    validateNameInput();    
});
*/


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