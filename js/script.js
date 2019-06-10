//temporarily hide the top area during developement
$(".container").find("fieldset").eq(0).hide();
$(".container").find("fieldset").eq(1).hide();

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
    }
})


/*********** COLORS SECTION **********/
// declare color global variables
const colorsDivID = $('#colors-js-puns');
const tempSpanColorDiv = $('<div>Please select a T-shirt theme</div>').appendTo(colorsDivID);
const colorSelectOption = $('select#color');
const cornflowerblue = $(colorSelectOption).find('option[value = "cornflowerblue"]');
const darkslategrey = $(colorSelectOption).find('option[value = "darkslategrey"]');
const gold = $(colorSelectOption).find('option[value = "gold"]');
const tomato = $(colorSelectOption).find('option[value = "tomato"]');
const steelblue = $(colorSelectOption).find('option[value = "steelblue"]');
const dimgrey = $(colorSelectOption).find('option[value = "dimgrey"]');
//when the color 'design' select Box changes execute this block
// study guide suggests to hide the 'SELECT THEME' option but it's better to leave this there so user is clear that this is the dropdown that is used to select the theme
$('select#design').on('change', () => {
    $('select#design > option:first').hide();
    $(tempSpanColorDiv).hide();
    $(colorSelectOption).show();
    const modifyTshirtSelections = $('select#design').val();
    if (modifyTshirtSelections === 'js puns') {
        /* set dropdown to specified index on change https://stackoverflow.com/questions/7445492/how-to-set-the-first-option-on-a-select-box-using-jquery */
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
//inital value of cost of activities
let totalActivityCost = 0;
//element to display total activity cost
const totalDiv = $(`<div></div>`).addClass('totalcost');
$('.activities').append(totalDiv);

//Listen for changes in the activity section
$('.activities').on('change', (event) => {
    event.preventDefault();

    let clickedElement = $(event.target);
    let valueOfParent = clickedElement.parent('label').text();
    console.log(valueOfParent);
    console.log('this is the cliecked element: ' + clickedElement.attr('type'));//result = checkbox

    //The index of the dollar sign ‘$’ in the label text from the variable (that you declared above).
    let dollarSign = '$';
    let indexOfDollarSign = valueOfParent.indexOf(dollarSign);// return index of dollar sign

    //The cost of the activity the was just clicked. Using a method like `.slice()` and the index of the dollar sign, you can target the cost at the end of the label string. https://stackoverflow.com/questions/24200493/jquery-cut-off-div-text-after-4-characters
    let fullDollarAmountOfClickedItem = parseInt(valueOfParent.slice(indexOfDollarSign+1));
    console.log(typeof fullDollarAmountOfClickedItem);
    clickedElement.each(() => {
        if ($(clickedElement).is(':checked')) { // is the clicked element checked?
            console.log('it clicked');
            totalActivityCost += parseInt(fullDollarAmountOfClickedItem);
            console.log(totalActivityCost);
        } else {
            totalActivityCost -= parseInt(fullDollarAmountOfClickedItem);
        }
        
        totalDiv.text(`The total cost is: ` + totalActivityCost);
    });
    
    //get index of the em dash — in the label text
    let emDash = '—';
    let indexOfEmDash = valueOfParent.indexOf(emDash);
    console.log(indexOfEmDash);

    //get index of the comma , in the label text
    let comma = ',';
    let indexOfComma = valueOfParent.indexOf(comma);
    console.log(indexOfComma);

    let dayAndTime = valueOfParent.slice(indexOfEmDash+1, indexOfComma);
    console.log(dayAndTime);

    
    //https://stackoverflow.com/questions/3657630/jquery-disable-duplicate-checkboxes-when-checked
   // When an activity is checked, disable any activity that occurs at the same day and time(i.e. "conflicting activities") without disabling the activity that was just checked.
    for (let i = 0; i < clickedElement.length; i++) {
        const boxThatIsClicked = $(clickedElement[i]);
        console.log($(clickedElement).valueOfParent + 'line 117 now');
        if ($(this).prop("checked")) {
            $(valueOfParent).prop('disabled', !this.checked)
            // if ($(clickedElement).attr('checked')) {
            //     clickedElement.attr('disabled', false);
            //     console.log('line 122')
            // } else {
            //     clickedElement.attr('disabled', true);
            //     console.log('line 125')
            // }
            clickedElement.prop('disabled', true);

        } else {
                clickedElement.prop('disabled', false);
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
 1) Hide the“ Select Payment Method” `option`so it doesn’ t show up in the drop down menu 
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
Get the value of the payment select element, and
if it’ s equal to‘ credit card’, set the credit card payment section in the form to show, and set the other two options to hide.
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



const nameInput = $('input#name');
$('form').on("submit", function (event) {
    event.preventDefault();
    let selectedPaymentMethod = $('select#payment').val();

    // .each((index, element) => {
        
    // })
    
    const nameInputValue = $(nameInput).val();
    if (nameInputValue === '') {
        let nameError = $('<div>*Name must be three characters or more</div> <br/>')
            .css({
                    'color': 'red',
                    'text-transform': 'uppercase',
                    'margin-bottom': '5%'
                })
            .insertAfter(nameInput);
        
    }
   // https://formden.com/blog/validate-contact-form-jquery
    // test email validation
    let input = $(this);
    //let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    //let re = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
    
    let is_email = re.test(input.val());
    console.log(is_email)

    const emailInput = $('input#mail');
    const emailInputValue = $(emailInput).val();
    // possible email regex let emailRegEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
    if (emailInputValue === '' || !is_email) {
        
        let emailError = $('<div>*Email must be a valid email</div><br/>')
            .css({
                    'color': 'red',
                    'text-transform': 'uppercase',
                    'margin-bottom': '5%'
                })
            .insertAfter(emailInput);
       
    }

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
    

});


/*
const submitButton = $('button').attr('type', 'submit');
$(submitButton).submit((event) => {
    // event.preventDefault();
    if (name === '') {
        alert('Text-field is empty.');
        return false;
    }
    
    //validateName();
})
function validateName() {
    const nameInput = $('input#name').val();
    const nameError = $('<div>Name must be three characters or more</div>').appendTo($('input#name'))

    if (nameInput === '') {
        $('<div>Name must be three characters or more</div>').appendTo($('input#name'));
        console.log('name input')
    }
}
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
how to see
if element is checked ? https : //stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
*/
/*
remove attr and add attr https://forum.jquery.com/topic/uncheck-and-disable-multiple-checkboxes-with-one-checkbox
*/