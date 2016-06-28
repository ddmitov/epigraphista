
// UTF-8 encoded file!

// The following functions are only usefull inside Perl Executing Browser.


function pebContextMenu() {
	var contextMenuObject = new Object();

	contextMenuObject.printPreview = "Преглед за печат";
	contextMenuObject.print = "Печат";

	contextMenuObject.cut = "Изрежи";
	contextMenuObject.copy = "Копирай";
	contextMenuObject.paste = "Постави";
	contextMenuObject.selectAll = "Избери всичко";

	return JSON.stringify(contextMenuObject);
}


function pebMessageBoxElements() {
	var messageBoxElementsObject = new Object();

	messageBoxElementsObject.alertTitle = "Внимание";
	messageBoxElementsObject.confirmTitle = "Потвърждение";
	messageBoxElementsObject.promptTitle = "Въвеждане на данни";

	messageBoxElementsObject.okLabel = "Разбрах";
	messageBoxElementsObject.yesLabel = "Да";
	messageBoxElementsObject.noLabel = "Не";

	return  JSON.stringify(messageBoxElementsObject);
}


function pebCloseConfirmationAsync() {
	alertify.set({labels: {ok : "Да", cancel : "Не"}});
	alertify.set({buttonFocus: "cancel"});
	alertify.confirm("Попълненият текст не е записан и ще бъде загубен!<br>" +
					"Сигурни ли сте, че искате да изключите програмата?", function (confirmation) {
		if (confirmation) {
			$jQuery.ajax({
				url: 'http://perl-executing-browser-pseudodomain/close-window.function',
				method: 'GET'
			});
		}
	});
}
