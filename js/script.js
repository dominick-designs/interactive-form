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


// event listener to handle event functions
$('form').on("submit", function (event) {
    if (nameInputValue || emailInputValue || creditCardNumberValue || creditCardZipValue || creditCardCvvValue === "") {
        event.preventDefault();
    }

    nameListener();
    emailListener();
    activityListener();
    creditCardListener();
    creditCardZipListener();
    creditCardCvvListener();
});