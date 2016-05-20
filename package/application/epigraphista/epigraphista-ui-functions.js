
// UTF-8 encoded file!


function addTextAreaElement(label, placeholderText, size, greekSupport, additionalKeyboard) {
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

	placeholderElement.appendChild(textElementRow);

	$jQuery("#" + label).autoResize();

	$jQuery("#" + label).on('paste', function(e){
		setTimeout(function () {
			jQuery("#" + label).trigger('keyup');
		}, 150);
	});

	var buttonToDisable = document.getElementById(label + "-button");
	buttonToDisable.setAttribute("class", "btn btn-info btn-xs disabled");
	buttonToDisable.disabled = true;
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
			buttonToEnable.disabled = false;
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
