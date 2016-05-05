
// UTF-8 encoded file!

// The following six functions are only usefull inside Perl Executing Browser.


// Perl Executing Browser custom title for the Alert dialog box:
function pebAlertTitle() {
	var alertTitle = "Внимание";
	return alertTitle;
}


// Perl Executing Browser OK button label:
function pebOkLabel() {
	var okLabel = "Разбрах";
	return okLabel;
}


// Perl Executing Browser custom title for the Confirm dialog box:
function pebConfirmTitle() {
	var confirmTitle = "Потвърждение";
	return confirmTitle;
}


// Perl Executing Browser close confirmation:
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


// Perl Executing Browser Yes button label:
function pebYesLabel() {
	var yesLabel = "Да";
	return yesLabel;
}


// Perl Executing Browser No button label:
function pebNoLabel() {
	var noLabel = "Не";
	return noLabel;
}
