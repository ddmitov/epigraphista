
// These functions are usefull only inside Electron:


function electronContextMenu() {
	const {remote} = require('electron');
	const {Menu, MenuItem} = remote;

	const inputElementContextMenu = new Menu();

	inputElementContextMenu.append(new MenuItem({
		label: TS.contextMenuCutLabel, 
		click() {
			document.execCommand("cut");
		}
	}));

	inputElementContextMenu.append(new MenuItem({
		label: TS.contextMenuCopyLabel,
		click() {
			document.execCommand("copy");
		}
	}));

	inputElementContextMenu.append(new MenuItem({
		label: TS.contextMenuPasteLabel,
		click() {
			document.execCommand("paste");
		}
	}));

	inputElementContextMenu.append(new MenuItem({
		label: TS.contextMenuSelectAllLabel,
		click() {
			document.execCommand("selectAll");
		}
	}));

	const pageContextMenu = new Menu();

	pageContextMenu.append(new MenuItem({
		label: TS.contextMenuPrint,
		click() {
			document.execCommand("print");
		}
	}));

	window.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target.isContentEditable) {
			inputElementContextMenu.popup(remote.getCurrentWindow());
		} else {
			pageContextMenu.popup(remote.getCurrentWindow());
		}
	}, false);
}


function electronCheckUserInputBeforeClose() {
	var textEntered = false;

	var textFields = new Array();
	textFields = document.getElementsByTagName("textarea");

	for (i = 0; i < textFields.length; i++) { 
		if (textFields[i].value.length > 0) {
			textEntered = true;
		}
	}

	var inputBoxes = new Array();
	inputBoxes = document.querySelectorAll("input[type=text]");

	for (i = 0; i < inputBoxes.length; i++) { 
		if (inputBoxes[i].value.length > 0) {
			textEntered = true;
		}
	}

	if (textEntered == true) {
		alertify.set({labels: {ok : TS.yesLabel , cancel : TS.noLabel}});
		alertify.set({buttonFocus: "cancel"});
		alertify.confirm(TS.closeConfirmation, function (confirmation) {
			if (confirmation) {
				const {ipcRenderer} = require('electron');
				ipcRenderer.send('asynchronous-message', 'close');
			}
		});
	}

	if (textEntered == false) {
		const {ipcRenderer} = require('electron');
		ipcRenderer.send('asynchronous-message', 'close');
	}
}
