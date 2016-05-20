
// UTF-8 encoded file!

// The following functions are only usefull inside Perl Executing Browser.


// Print Preview label for the context menu:
function pebPrintPreviewLabel() {
	return "Преглед за печат";
}


// Print label for the context menu:
function pebPrintLabel() {
	return "Печат";
}


// Cut label for the context menu:
function pebCutLabel() {
	return "Изрежи";
}


// Copy label for the context menu:
function pebCopyLabel() {
	return "Копирай";
}


// Paste label for the context menu:
function pebPasteLabel() {
	return "Постави";
}


// Select All label for the context menu:
function pebSelectAllLabel() {
	return "Избери всичко";
}


// Alert dialog box title:
function pebAlertTitle() {
	return "Внимание";
}


// OK button label:
function pebOkLabel() {
	return "Разбрах";
}


// Confirm dialog box title:
function pebConfirmTitle() {
	return "Потвърждение";
}


// Close confirmation:
function pebCloseConfirmation() {
	var confirmation = confirm("На тази страница е попълнен текст и той ще бъде загубен!\n" +
							"Сигурни ли сте, че искате да изключите програмата?");
	var result;
	if (confirmation == true) {
		result = "yes";
	} else {
		result = "no";
	}
	return result;
}


// Yes button label:
function pebYesLabel() {
	return "Да";
}


// No button label:
function pebNoLabel() {
	return "Не";
}
