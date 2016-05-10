
// UTF-8 encoded file!


function addTextAreaElement(label, placeholderText, size, greekSupport, additionalKeyboard, mandatory) {
	var name = label.replace(/-/g, "_");

	var greekSupportCode01 = "" +
		"onkeypress=\"return convertCharToggle(this, document.epigraphista_form." + name + "_switch_greek.checked, event);\"" +
		"onkeyup=\"return convertStr(this, event);\"";
	var greekSupportCode02 = "" +
		"<span class='input-group-addon'>" +
			"<input type='checkbox' id='" + label + "-switch-greek' name='" + name + "_switch_greek'" +
				"onclick=\"switchGreek('" + label + "');\" title='Въвеждане на политоничен гръцки текст'/>&nbsp;" +
			"<a href=\"javascript:toggleGreekKeyboardHelp('" + label + "');\"" +
				"title='Помощ за въвеждането на политоничен гръцки текст'>Ἐλληνική</a>" +
		"</span>";
	var additionalKeyboardSupportCode01 = "onfocus=\"setCurrentTextArea('" + label + "')\"";
	var additionalKeyboardSupportCode02 = "" +
		"<span class='input-group-addon btn btn-info'" +
			"onclick=\"javascript:toggleAdditionalKeyboard('" + label + "-additional-keyboard')\" title='Допълнителна клавиатура'>" +
			"<span class='glyphicon glyphicon-font'></span>" +
		"</span>";
	var elementRemovalCode = "" +
		"<span class='input-group-addon btn btn-danger' onclick=\"javascript:clearElementGroup('" + label + "');\" title='Премахване на елемента'>" +
			"<span class='glyphicon glyphicon-remove'></span>" +
		"</span>";

	if (greekSupport == null) {
		greekSupportCode01 = "";
		greekSupportCode02 = "";
	}
	if (additionalKeyboard == null) {
		additionalKeyboardSupportCode01 = "";
		additionalKeyboardSupportCode02 = "";
	}
	if (mandatory == "mandatory") {
		elementRemovalCode = "";
	}

	var textElementContents = "" +
		"<textarea rows='1' id='" + label + "' name='" + name + "' class='form-control greek input-text' spellcheck='false'" +
			"title='" + placeholderText + "' placeholder='" + placeholderText + "'" +
			greekSupportCode01 +
			additionalKeyboardSupportCode01 + ">" +
		"</textarea>" +
		greekSupportCode02 +
		additionalKeyboardSupportCode02 +
		elementRemovalCode;

	var textElementInputGroup = document.createElement("div");
	textElementInputGroup.setAttribute("class", "input-group");
	textElementInputGroup.innerHTML = textElementContents;

	var textElementBox = document.createElement("div");
	if (size == "full") {
		textElementBox.setAttribute("class", "form-group col-xs-12");
	}
	if (size == "large") {
		textElementBox.setAttribute("class", "form-group col-xs-10 col-xs-offset-1");
	}
	if (size == "medium") {
		textElementBox.setAttribute("class", "form-group col-xs-8 col-xs-offset-2");
	}
	if (size == "small") {
		textElementBox.setAttribute("class", "form-group col-xs-6 col-xs-offset-3");
	}
	if (size == "tiny") {
		textElementBox.setAttribute("class", "form-group col-xs-4 col-xs-offset-4");
	}
	textElementBox.appendChild(textElementInputGroup);

	var textElementRow = document.createElement("div");
	textElementRow.setAttribute("class", "row");
	textElementRow.appendChild(textElementBox);

	var placeholderElement = document.getElementById(label + "-group");
	placeholderElement.appendChild(textElementRow);

	if (greekSupport == "greek") {
		var textElementGreekKeyboardHelpPlaceholder = document.createElement("div");
		textElementGreekKeyboardHelpPlaceholder.setAttribute("id", label + "-greek-keyboard-help");
		textElementGreekKeyboardHelpPlaceholder.setAttribute("class", "greek greek-help");
		placeholderElement.appendChild(textElementGreekKeyboardHelpPlaceholder);
	}

	if (additionalKeyboard == "additional-keyboard") {
		var textElementAdditionalKeyboardPlaceholder = document.createElement("div");
		textElementAdditionalKeyboardPlaceholder.setAttribute("id", label + "-additional-keyboard");
		placeholderElement.appendChild(textElementAdditionalKeyboardPlaceholder);
	}

	$jQuery("#" + label).autoResize();

	if (mandatory == null) {
		var buttonToDisable = document.getElementById(label + "-button");
		buttonToDisable.setAttribute("class", "btn btn-info btn-xs disabled");
		buttonToDisable.disabled = true;
	}
}


function clearElementGroup(partialId){
	var placeholderElement = document.getElementById(partialId + "-group");
	var textEntered = false;
	var textFields = new Array();
	textFields = placeholderElement.getElementsByTagName('textarea');

	for (i = 0; i < textFields.length; i++) { 
		if (textFields[i].value.length > 0) {
			textEntered = true;
		}
	}

	if (textEntered == true) {
		if (confirm("В този елемент е попълнен текст и той ще бъде загубен!\n" +
			"Сигурни ли сте, че искате да премахнете избрания елемент?",
			"Epigraphista")) {
			while (placeholderElement.hasChildNodes()) {
				placeholderElement.removeChild(placeholderElement.firstChild);
			}
			var buttonToEnable = document.getElementById(partialId + "-button");
			buttonToEnable.setAttribute("class", "btn btn-info btn-xs");
		}
	}

	if (textEntered == false) {
		while (placeholderElement.hasChildNodes()) {
			placeholderElement.removeChild(placeholderElement.firstChild);
		}
		var buttonToEnable = document.getElementById(partialId + "-button");
		buttonToEnable.setAttribute("class", "btn btn-info btn-xs");
		buttonToEnable.disabled = false;
	}
}


function addSupportGroup(placeholderId){
	var fieldsetElement = document.createElement("fieldset");
	fieldsetElement.setAttribute("id", "support-fieldset");

	var legendElement = document.createElement("legend");
	legendElement.innerHTML = "" +
		"&nbsp;" +
		"Описание на паметника" +
		"&nbsp;";
	fieldsetElement.appendChild(legendElement);

	var supportButtonsElement = document.createElement("div");
	supportButtonsElement.setAttribute("id", "support-buttons");
	supportButtonsElement.setAttribute("class", "buttons-group");
	supportButtonsElement.innerHTML = "" +
		"<a href=\"javascript:clearElementGroup('support');\" class='btn btn-danger-outline btn-xs'>" +
			"<span class='glyphicon glyphicon-remove'></span></a>" +
		"<input type='button' id='material-button' value='Материал'" +
			"onClick=\"addTextAreaElement('material', 'Материал', 'large', 'greek', 'additional-keyboard', null);\" class='btn btn-info btn-xs'>" +
		"<input type='button' id='object-type-button' value='Категория'" +
			"onClick=\"addTextAreaElement('object-type', 'Категория', 'large', 'greek', 'additional-keyboard', null);\" class='btn btn-info btn-xs'>" +
		"<a href=\"javascript:clearElementGroup('support');\" class='btn btn-danger-outline btn-xs'>" +
			"<span class='glyphicon glyphicon-remove'></span></a>";
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
		"История на паметника" +
		"&nbsp;";
	fieldsetElement.appendChild(legendElement);

	var historyButtonsElement = document.createElement("div");
	historyButtonsElement.setAttribute("id", "history-buttons");
	historyButtonsElement.setAttribute("class", "buttons-group");
	historyButtonsElement.innerHTML = "" +
		"<a href=\"javascript:clearElementGroup('history');\" class='btn btn-danger-outline btn-xs'>" +
			"<span class='glyphicon glyphicon-remove'></span></a>" +
		"<input type='button' id='provenance-found-button' value='Контекст'" +
			"onClick=\"addTextAreaElement('provenance-found', 'Контекст', 'large', 'greek', 'additional-keyboard', null);\" class='btn btn-info btn-xs'>" +
		"<input type='button' id='provenance-observed-button' value='Съвременно място'" +
			"onClick=\"addTextAreaElement('provenance-observed', 'Съвременно място', 'large', 'greek', 'additional-keyboard', null);\" class='btn btn-info btn-xs'>" +
		"<a href=\"javascript:clearElementGroup('history');\" class='btn btn-danger-outline btn-xs'>" +
			"<span class='glyphicon glyphicon-remove'></span></a>";
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
		"<a href=\"javascript:displayKeyboardShortcutsButton();\" class='btn btn-primary btn-xs'>" +
			"<span class='glyphicon glyphicon-remove'></span></a>" +
		"&nbsp;&nbsp;" +
		"<b>" +
			"Ctrl+A = Select All &nbsp;&nbsp;" +
			"Ctrl+X = Cut &nbsp;&nbsp;" +
			"Ctrl+C = Copy &nbsp;&nbsp;" +
			"Ctrl+V = Paste" +
		"</b>" +
		"&nbsp;&nbsp;" +
		"<a href=\"javascript:displayKeyboardShortcutsButton();\" class='btn btn-primary btn-xs'>" +
			"<span class='glyphicon glyphicon-remove'></span></a>";

	keyboardShortcutsHelpPlaceholder.innerHTML = keyboardShortcutsHelp;
}


function displayKeyboardShortcutsButton() {
	var keyboardShortcutsHelpPlaceholder = document.getElementById("keyboard-shortcuts-help");

	var keyboardShortcutsButton = "" +
		"<input type='button' value='Копиране на текст'" +
			"onClick=\"javascript:displayKeyboardShortcutsHelp();\" class='btn btn-primary'>";

	keyboardShortcutsHelpPlaceholder.innerHTML = keyboardShortcutsButton;
}
