
// UTF-8 encoded file!


function addSupportGroup(placeholderId){
	var fieldsetElement = document.createElement("fieldset");
	fieldsetElement.setAttribute("id", "support-fieldset");

	var legendElement = document.createElement("legend");
	legendElement.innerHTML = "" +
		"&nbsp;" +
		"<input type='button' value='Описание на паметника'" +
			"onClick=\"clearElementGroup('support');\" class='btn btn-info btn-xs btn-group-removal'>" +
		"&nbsp;";
	fieldsetElement.appendChild(legendElement);

	var supportButtonsElement = document.createElement("div");
	supportButtonsElement.setAttribute("id", "support-buttons");
	supportButtonsElement.setAttribute("class", "buttons-group");
	supportButtonsElement.innerHTML = "" +
		"<input type='button' id='material-button' value='Материал'" +
			"onClick=\"addTextAreaElement('material', 'Материал', 'large', 'greek', 'additional-keyboard', null);\" class='btn btn-info btn-xs'>" +
		"<input type='button' id='object-type-button' value='Категория'" +
			"onClick=\"addTextAreaElement('object-type', 'Категория', 'large', 'greek', 'additional-keyboard', null);\" class='btn btn-info btn-xs'>";
	fieldsetElement.appendChild(supportButtonsElement);

	var supportBoxesElement = document.createElement("div");
	supportBoxesElement.setAttribute("class", "row");
	supportBoxesElement.setAttribute("id", "support-elements");

	var supportRootPlaceholder = document.createElement("div");
	supportRootPlaceholder.setAttribute("id", "support-root-group");
	supportBoxesElement.appendChild(supportRootPlaceholder);

	var supportMaterialPlaceholder = document.createElement("div");
	supportMaterialPlaceholder.setAttribute("id", "material-group");
	supportBoxesElement.appendChild(supportMaterialPlaceholder);

	var supportObjectTypePlaceholder = document.createElement("div");
	supportObjectTypePlaceholder.setAttribute("id", "object-type-group");
	supportBoxesElement.appendChild(supportObjectTypePlaceholder);

	fieldsetElement.appendChild(supportBoxesElement);

	document.getElementById(placeholderId).appendChild(fieldsetElement);

	var buttonToDisable = document.getElementById("support-button");
	buttonToDisable.setAttribute("class", "btn btn-info btn-xs disabled");
	buttonToDisable.disabled = true;

	addTextAreaElement("support-root", "Описание на паметника", "large", "greek", "additional-keyboard", "mandatory");
}


function addHistoryGroup(placeholderId){
	var fieldsetElement = document.createElement("fieldset");
	fieldsetElement.setAttribute("id", "history-fieldset");

	var legendElement = document.createElement("legend");
	legendElement.innerHTML = "" +
		"&nbsp;" +
		"<input type='button' value='История на паметника'" +
			"onClick=\"clearElementGroup('history');\" class='btn btn-info btn-xs btn-group-removal'>" +
		"&nbsp;";
	fieldsetElement.appendChild(legendElement);

	var historyButtonsElement = document.createElement("div");
	historyButtonsElement.setAttribute("id", "history-buttons");
	historyButtonsElement.setAttribute("class", "buttons-group");
	historyButtonsElement.innerHTML = "" +
		"<input type='button' id='provenance-found-button' value='Контекст'" +
			"onClick=\"addTextAreaElement('provenance-found', 'Контекст', 'large', 'greek', 'additional-keyboard', null);\" class='btn btn-info btn-xs'>" +
		"<input type='button' id='provenance-observed-button' value='Съвременно място'" +
			"onClick=\"addTextAreaElement('provenance-observed', 'Съвременно място', 'large', 'greek', 'additional-keyboard', null);\" class='btn btn-info btn-xs'>";
	fieldsetElement.appendChild(historyButtonsElement);

	var historyBoxesElement = document.createElement("div");
	historyBoxesElement.setAttribute("class", "row");
	historyBoxesElement.setAttribute("id", "history-elements");

	var origPlacePlaceholder = document.createElement("div");
	origPlacePlaceholder.setAttribute("id", "orig-place-group");
	historyBoxesElement.appendChild(origPlacePlaceholder);

	var origDatePlaceholder = document.createElement("div");
	origDatePlaceholder.setAttribute("id", "orig-date-group");
	historyBoxesElement.appendChild(origDatePlaceholder);

	var provenanceFoundPlaceholder = document.createElement("div");
	provenanceFoundPlaceholder.setAttribute("id", "provenance-found-group");
	historyBoxesElement.appendChild(provenanceFoundPlaceholder);

	var provenanceObservedPlaceholder = document.createElement("div");
	provenanceObservedPlaceholder.setAttribute("id", "provenance-observed-group");
	historyBoxesElement.appendChild(provenanceObservedPlaceholder);

	fieldsetElement.appendChild(historyBoxesElement);

	document.getElementById(placeholderId).appendChild(fieldsetElement);

	var buttonToDisable = document.getElementById("history-button");
	buttonToDisable.setAttribute("class", "btn btn-info btn-xs disabled");
	buttonToDisable.disabled = true;

	addTextAreaElement("orig-place", "Място на намиране", "large", "greek", "additional-keyboard", "mandatory");
	addTextAreaElement("orig-date", "Време на намиране", "large", null, "additional-keyboard", "mandatory");
}


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
