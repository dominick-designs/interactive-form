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

    /* set dropdown to specified index on change; adapted from https://stackoverflow.com/questions/7445492/how-to-set-the-first-option-on-a-select-box-using-jquery */
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