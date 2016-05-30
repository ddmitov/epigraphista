
// UTF-8 encoded file!

// The following functions are only usefull inside Perl Executing Browser.


function pebContextMenu() {
	var contextMenu = '{' +
						' "printPreview" : "Преглед за печат", ' +
						' "print" : "Печат", ' +
						' "cut" : "Изрежи", ' +
						' "copy" : "Копирай", ' +
						' "paste" : "Постави", ' +
						' "selectAll" : "Избери всичко" ' +
					'}';
	return contextMenu;
}


function pebMessageBoxElements() {
	var messageBoxElements = '{' +
						' "alertTitle" : "Внимание", ' +
						' "okLabel" : "Разбрах", ' +
						' "confirmTitle" : "Потвърждение", ' +
						' "yesLabel" : "Да", ' +
						' "noLabel" : "Не", ' +
						' "promptTitle" : "" ' +
					'}';
	return messageBoxElements;
}


function pebCloseConfirmation() {
	var confirmation = confirm("На тази страница е попълнен текст и той ще бъде загубен!\n" +
							"Сигурни ли сте, че искате да изключите програмата?");
	return confirmation;
}
