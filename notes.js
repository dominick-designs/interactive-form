/*NOTES:

//temporarily hide the top area during developement
// $(".container").find("fieldset").eq(0).hide();
// $(".container").find("fieldset").eq(1).hide();
// $(".container").find("fieldset").eq(2).hide();


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

// const nameRegEx = /^([a-zA-Z0-9_-]){1,20}$/;
// const validateUsingRegEx = nameRegEx.test(nameInputValue);