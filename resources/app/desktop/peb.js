
// These functions are usefull only inside Perl Executing Browser.


function pebContextMenu() {
	var contextMenuObject = new Object();

	contextMenuObject.printPreview = TS.pebContextMenuPrintPreview;
	contextMenuObject.print = TS.contextMenuPrint;

	contextMenuObject.cut = TS.contextMenuCutLabel;
	contextMenuObject.copy = TS.contextMenuCopyLabel;
	contextMenuObject.paste = TS.contextMenuPasteLabel;
	contextMenuObject.selectAll = TS.contextMenuSelectAllLabel;

	return JSON.stringify(contextMenuObject);
}


function pebCloseConfirmationAsync() {
	alertify.set({labels: {ok : TS.yesLabel, cancel : TS.noLabel}});
	alertify.set({buttonFocus: "cancel"});
	alertify.confirm(TS.closeConfirmation, function (confirmation) {
		if (confirmation) {
			$jQuery.ajax({
				url: 'http://perl-executing-browser-pseudodomain/close-window.function',
				method: 'GET'
			});
		}
	});
}
