/*********** ACTIVITIES SECTION **********/
/* section global variables */
let totalActivityCost = 0;  //inital value of cost of activities
let activitiesInput = $('.activities');
const totalDiv = $(`<div></div>`).addClass('totalcost');
$(activitiesInput).append(totalDiv); //element to display total activity cost

//Listen for changes in the activity section
$(activitiesInput).on('change', (event) => {
    let clickedElement = $(event.target);
    let valueOfParent = clickedElement.parent('label').text(); // get the text of the parent of clicked element
    const checkboxes = $('[type="checkbox"]');
    //The index of the dollar sign ‘$’ in the label text from the variable (declared above).
    let dollarSign = '$';
    let indexOfDollarSign = valueOfParent.indexOf(dollarSign);// return index of dollar sign
    //The cost of the activity the was just clicked. adapted from https://stackoverflow.com/questions/24200493/jquery-cut-off-div-text-after-4-characters
    let fullDollarAmountOfClickedItem = parseInt(valueOfParent.slice(indexOfDollarSign + 1));
    let emDash = '—';
    let indexOfEmDash = valueOfParent.indexOf(emDash);  // get the index of the em dash
    let comma = ',';
    let indexOfComma = valueOfParent.indexOf(comma);  // get the index of the comma
    let dayAndTime = valueOfParent.slice(indexOfEmDash + 1, indexOfComma); // slice the day and time

    clickedElement.each(() => {
        if ($(clickedElement).is(':checked')) { // is the clicked element checked?
            totalActivityCost += parseInt(fullDollarAmountOfClickedItem); //convert to digit and add to total cost
        } else {
            totalActivityCost -= parseInt(fullDollarAmountOfClickedItem); //convert to digit and subtract
        }
        totalDiv.text(`The total cost is: ` + totalActivityCost);
    });

    // When an activity is checked, disable any activity that occurs at the same day and time without disabling the activity that was just checked.
    for (let i = 0; i < checkboxes.length; i++) {
        const boxThatIsClicked = checkboxes[i].parentElement.textContent;
        // if the text of the input.includes() dayAndTime AND the value of parent is not the element that is clicked now
        if (boxThatIsClicked.includes(dayAndTime) && valueOfParent != boxThatIsClicked) {
            if (clickedElement.prop('checked') === false) {
                checkboxes[i].disabled = false;
            } else {
                checkboxes[i].disabled = true;
            }
        }
    }
});

//activity validation: validate at least 1 checkbox checked
const activitiesError = $('<div>* You must choose at least one activity</div> <br/>')
    .css(cssError)
    .hide()
    .insertAfter(activitiesInput);

function activityListener() {
    if (totalActivityCost === 0 /*$('.activities input:checked').length > 0*/) {
        $(activitiesError).show();
    } else {
        $(activitiesError).hide();
    }
}
$(activitiesInput).on('change', () => {
    if ($('.activities input:checked').length === 0) {
        activityListener();
    } else {
        $(activitiesError).hide();
    }
});