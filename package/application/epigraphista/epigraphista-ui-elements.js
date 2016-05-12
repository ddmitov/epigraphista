
// UTF-8 encoded file!


function displayKeyboardShortcutsHelp() {
	var keyboardShortcutsHelpPlaceholder = document.getElementById("keyboard-shortcuts-help");

	var keyboardShortcutsHelp = "" +
		"<input type='button' value='Ctrl+A = Select All'" +
			"onClick=\"displayKeyboardShortcutsButton();\" class='btn btn-info'>" +
		"<input type='button' value='Ctrl+X = Cut'" +
			"onClick=\"displayKeyboardShortcutsButton();\" class='btn btn-info'>" +
		"<input type='button' value='Ctrl+C = Copy'" +
			"onClick=\"displayKeyboardShortcutsButton();\" class='btn btn-info'>" +
		"<input type='button' value='Ctrl+V = Paste'" +
			"onClick=\"displayKeyboardShortcutsButton();\" class='btn btn-info'>";

	keyboardShortcutsHelpPlaceholder.innerHTML = keyboardShortcutsHelp;
}


function displayKeyboardShortcutsButton() {
	var keyboardShortcutsHelpPlaceholder = document.getElementById("keyboard-shortcuts-help");

	var keyboardShortcutsButton = "" +
		"<input type='button' value='Копиране на текст'" +
			"onClick=\"javascript:displayKeyboardShortcutsHelp();\" class='btn btn-info'>";

	keyboardShortcutsHelpPlaceholder.innerHTML = keyboardShortcutsButton;
}
