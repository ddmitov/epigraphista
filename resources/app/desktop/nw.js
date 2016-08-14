
// These functions are usefull only inside NW.js:


var gui = require("nw.gui");

var inputElementContextMenu = new gui.Menu;

inputElementContextMenu.append(new gui.MenuItem({
	label: TS.contextMenuCutLabel,
	click: function() {
		document.execCommand("cut");
	}
}));

inputElementContextMenu.append(new gui.MenuItem({
	label: TS.contextMenuCopyLabel,
	click: function() {
		document.execCommand("copy");
	}
}));

inputElementContextMenu.append(new gui.MenuItem({
	label: TS.contextMenuPasteLabel,
	click: function() {
		document.execCommand("paste");
	}
}));

inputElementContextMenu.append(new gui.MenuItem({
	label: TS.contextMenuSelectAllLabel,
	click: function() {
		document.execCommand("selectAll");
	}
}));

var pageContextMenu = new gui.Menu;

pageContextMenu.append(new gui.MenuItem({
	label: TS.contextMenuPrint,
	click: function() {
		win.print({});
	}
}));

document.addEventListener("contextmenu", function(e) {
	e.preventDefault();
	if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target.isContentEditable) {
		inputElementContextMenu.popup(e.x, e.y);
	} else {
		pageContextMenu.popup(e.x, e.y);
	}
});


// Listen to the close event and check for user input:
win.on('close', function() {
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
		alertify.set({labels: {ok : TS.yesLabel, cancel : TS.noLabel}});
		alertify.set({buttonFocus: "cancel"});
		alertify.confirm(TS.closeConfirmation, function (confirmation) {
			if (confirmation) {
				win.close(true);
			}
		});
	}

	if (textEntered == false) {
		win.close(true);
	}
});