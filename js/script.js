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
const activitiesInput = $('.activities');
const totalDiv = $(`<div></div>`).addClass('totalcost');  
$(activitiesInput).append(totalDiv); //element to display total activity cost

//Listen for changes in the activity section
$(activitiesInput).on('change', (event) => {
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

const cssError = { 'backgroundColor': 'red', 'color': 'white', 'text-transform': 'uppercase', 'font-size': '1.1em', 'border': '5px, solid, gray', 'padding': '10px 0px 10px 30px' };

const nameInput = $('#name');
const nameError = $(`<div> * Name must be 2 and 20 characters</div> <br/>`)
    .css(cssError)
    .hide()
    .insertAfter(nameInput);
// validate name input on blur

  


function nameListener() {
    //check value of input on blur (not on page load)
    const nameInputValue = $(nameInput).val();
    const nameRegEx = /^([a-zA-Z0-9_-]){2,20}$/;
    const validateUsingRegEx = nameRegEx.test(nameInputValue);
    if (validateUsingRegEx) {
        $(nameInput).css('border', '0px');
        $(nameError).hide();
    } else {
        $(nameInput).css('border', '1px solid red');
        $(nameError).show();
    }
}

nameInput.focusout(() => {
    const nameInputValue = $(nameInput).val();
    if (nameInputValue == '' || nameInputValue !== '') {
        nameListener();
    } else {
        $(nameError).hide();
    }
});

// email validation
const emailInput = $('#mail');
const emailError = $('<div>* Email must be valid</div> <br/>')
    .css(cssError)
    .hide()
    .insertAfter(emailInput);
function emailListener() {
    //check value of input on blur (not on page load)
    const emailInputValue = $(emailInput).val();
    // Regex source: https://stackoverflow.com/questions/4964691/super-simple-email-validation-with-javascript
    const emailRegEx = /(.+)@(.+){2,}\.(.+){2,}/;
    const validateUsingRegEx = emailRegEx.test(emailInputValue);
    if (validateUsingRegEx) {
        $(emailInput).css('border', '0px');
        $(emailError).hide();
    } else {
        $(emailInput).css('border', '1px solid red');
        $(emailError).show();
    }
}
 
emailInput.focusout(() => {
    const emailInputValue = $(emailInput).val();
 if (emailInputValue == '' || emailInputValue !== '') {
     emailListener();
 } else {
     $(emailError).hide();
 }
});



//activity validation: validate at least 1 checkbox checked
const activitiesError = $('<div>* You must choose at least one activity</div> <br/>')
    .css(cssError)
    .hide()
    .insertAfter(activitiesInput);
function activityListener() {
    if ($('.activities input:checked').length > 0) {
        $(activitiesError).hide();
    } else {
        $(activitiesError).show();
    }
}
$(activitiesInput).on('change', () => {
    if ($('.activities input:checked').length === 0) { 
        activityListener();
    } else {
        $(activitiesError).hide();
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

//on blur validate credit card input fields (number, zip, CVV)
function creditCardListener() {
    let selectedPaymentMethod = $('#payment').val();
    if (selectedPaymentMethod === 'credit card') {
        const creditCardNumberValue = $(creditCardNumber).val();
        const creditCardRegEx = /^[0-9]{13,16}$/;
        const validateUsingRegEx = creditCardRegEx.test(creditCardNumberValue);
        if (validateUsingRegEx) {
            $(creditCardNumber).css('border', '0px');
            $(creditCardError).hide();
        } else {
            $(creditCardNumber).css('border', '1px solid red');
            $(creditCardError).show();
        }

        const creditCardZipValue = $(creditCardZip).val();
        const creditCardZipRegEx = /^[0-9]{5}$/;
        const validateZipUsingRegEx = creditCardZipRegEx.test(creditCardZipValue);
        if (validateZipUsingRegEx) {
            $(creditCardZip).css('border', '0px');
            $(zipError).hide();
        } else {
            $(creditCardZip).css('border', '1px solid red');
            $(zipError).show();
        }

        const creditCardCvvValue = $(creditCardCvv).val();
        const cvvRegEx = /^[0-9]{3}$/;
        const validateCvvUsingRegEx = cvvRegEx.test(creditCardCvvValue);
        if (validateCvvUsingRegEx) {
            $(creditCardCvv).css('border', '0px');
            $(cvvError).hide();
        } else {
            $(creditCardCvv).css('border', '1px solid red');
            $(cvvError).show();
        }
       
    };
}
creditCardNumber.focusout(() => {
    //check value of input on blur (not on page load)
    const creditCardNumberValue = $(creditCardNumber).val();
    if (creditCardNumberValue == '' || creditCardNumberValue !== '') {
        creditCardListener();
    } else {
        $(creditCardNumber).css('border', '0px');
        $(creditCardError).hide();
    }
    
});
creditCardZip.focusout(() => {
    //check value of input on blur (not on page load)
    const creditCardZipValue = $(creditCardZip).val();
    if (creditCardZipValue == '' || creditCardZipValue !== '') {
        creditCardListener();
    } else {
        $(creditCardZip).css('border', '0px');
        $(zipError).hide();
    }
});
creditCardCvv.focusout(() => {
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
    event.preventDefault();
    nameListener(); 
    emailListener();
    activityListener();
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