
// UTF-8 encoded file!


// Global variables:
var framedTextAreaElementsCounter = 0;


function addTextAreaElement(label, placeholderText, size, greekSupport, additionalKeyboard, mandatory) {
	var name = label.replace(/-/g, "_");

	var greekSupportCode01 = "" +
		"onkeypress=\"return convertCharToggle(this, document.main_form." + name + "_switch_greek.checked, event);\"" +
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
	}
}


function addFramedTextAreaElement(placeholderId, label, placeholderText, mandatory, unique){
	var id;
	var groupId;
	var name;
	var fullPlaceholderText;
	if (unique == null) {
		framedTextAreaElementsCounter++;
		id = label + "-" + framedTextAreaElementsCounter;
		groupId = id + "-group"
		name = id.replace(/-/g, "_");
		fullPlaceholderText = framedTextAreaElementsCounter + ". " + placeholderText;
	}
	if (unique == "unique") {
		id = label;
		groupId = id + "-group"
		name = id.replace(/-/g, "_");
		fullPlaceholderText = placeholderText;
	}

	var framedTextAreaElementBox = document.createElement("div");
	framedTextAreaElementBox.setAttribute("class", "form-group");
	var framedTextAreaElementContents = "" +
	"<textarea rows='1' id='" + id + "' name='" + name + "' class='form-control greek input-text' spellcheck='false'" +
		"title='" + fullPlaceholderText + "' placeholder='" + fullPlaceholderText + "'" +
		"onkeypress=\"return convertCharToggle(this, document.main_form." + name + "_switch_greek.checked, event);\"" +
		"onkeyup=\"return convertStr(this, event);\"" +
		"onfocus=\"setCurrentTextArea('" + id + "')\">" +
	"</textarea>";
	framedTextAreaElementBox.innerHTML = framedTextAreaElementContents;

	var fieldsetElement = document.createElement("fieldset");
	fieldsetElement.setAttribute("id", groupId);
	fieldsetElement.setAttribute("class", "element-fieldset ");

	var legendElement = document.createElement("legend");
	legendElement.setAttribute("class", "element-legend");

	var legendElementContents = "" +
		"&nbsp;" + fullPlaceholderText + "&nbsp;&nbsp;" +
		"<input type='checkbox' id='" + id + "-switch-greek' name='" + name + "_switch_greek'" +
		"onclick=\"switchGreek('" + id + "');\" title='Въвеждане на политоничен гръцки текст'/>&nbsp;&nbsp;" +
		"<a href=\"javascript:toggleGreekKeyboardHelp('" + id + "');\"" +
				"title='Помощ за въвеждането на политоничен гръцки текст'>Ἐλληνική</a>&nbsp;" +
		"<a href=\"javascript:toggleAdditionalKeyboard('" + id + "-additional-keyboard')\" class='btn btn-info btn-xs'>" +
			"<span class='glyphicon glyphicon-font'></span></a>";
	if (mandatory == null) {
		if (unique == null) {
			var removeButton = "" +
				"<a href=\"javascript:removeElement('" + groupId + "');\" class='btn btn-danger btn-xs'>" +
					"<span class='glyphicon glyphicon-remove'></span></a>";
			legendElementContents = legendElementContents + removeButton;
		}
		if (unique == "unique") {
			var removeButton = "" +
				"<a href=\"javascript:removeUniqueElement('" + label + "');\" class='btn btn-danger btn-xs'>" +
					"<span class='glyphicon glyphicon-remove'></span></a>";
			legendElementContents = legendElementContents + removeButton;
		}
	}

	legendElement.innerHTML = legendElementContents;

	fieldsetElement.appendChild(legendElement);
	fieldsetElement.appendChild(framedTextAreaElementBox);

	var framedTextAreaElementGreekKeyboardHelpPlaceholder = document.createElement("div");
	framedTextAreaElementGreekKeyboardHelpPlaceholder.setAttribute("id", id + "-greek-keyboard-help");
	framedTextAreaElementGreekKeyboardHelpPlaceholder.setAttribute("class", "greek greek-help");
	fieldsetElement.appendChild(framedTextAreaElementGreekKeyboardHelpPlaceholder);

	var framedTextAreaElementAdditionalKeyboardPlaceholder = document.createElement("div");
	framedTextAreaElementAdditionalKeyboardPlaceholder.setAttribute("id", id + "-additional-keyboard");
	fieldsetElement.appendChild(framedTextAreaElementAdditionalKeyboardPlaceholder);

	document.getElementById(placeholderId).appendChild(fieldsetElement);

	$jQuery("#" + id).autoResize();

	if (unique == "unique") {
		var buttonToDisable = document.getElementById(label + "-button");
		buttonToDisable.setAttribute("class", "btn btn-info btn-xs disabled");
	}
}


function addSupportGroup(placeholderId){
	var fieldsetElement = document.createElement("fieldset");
	fieldsetElement.setAttribute("id", "support-fieldset");

	var legendElement = document.createElement("legend");
	var supportButtonsElement = document.createElement("div");
	supportButtonsElement.setAttribute("id", "support-buttons");
	supportButtonsElement.innerHTML = "" +
		"&nbsp;" +
		"Описание на паметника" +
		"&nbsp;" +
		"<input type='button' id='material-button' value='Материал'" +
			"onClick=\"addFramedTextAreaElement('support-elements', 'material', 'Материал', null, 'unique');\" class='btn btn-info btn-xs'>" +
		"<input type='button' id='object-type-button' value='Категория'" +
			"onClick=\"addFramedTextAreaElement('support-elements', 'object-type', 'Категория', null, 'unique');\" class='btn btn-info btn-xs'>" +
		"<a href=\"javascript:clearElementGroup('support');\" class='btn btn-danger btn-xs'>" +
			"<span class='glyphicon glyphicon-remove'></span></a>";

	legendElement.appendChild(supportButtonsElement);

	var supportBoxesElement = document.createElement("div");
	supportBoxesElement.setAttribute("class", "row");
	supportBoxesElement.setAttribute("id", "support-elements");

	var supportRootPlaceholder = document.createElement("div");
	supportRootPlaceholder.setAttribute("id", "support-root-group");
	supportBoxesElement.appendChild(supportRootPlaceholder);

	fieldsetElement.appendChild(legendElement);
	fieldsetElement.appendChild(supportBoxesElement);

	document.getElementById(placeholderId).appendChild(fieldsetElement);

	var buttonToDisable = document.getElementById("support-button");
	buttonToDisable.setAttribute("class", "btn btn-info btn-xs disabled");

	addTextAreaElement("support-root", "Описание на паметника", "large", "greek", "additional-keyboard", "mandatory");
}


function addHistoryGroup(placeholderId){
	var fieldsetElement = document.createElement("fieldset");
	fieldsetElement.setAttribute("id", "history-fieldset");

	var legendElement = document.createElement("legend");
	var historyButtonsElement = document.createElement("div");
	historyButtonsElement.setAttribute("id", "history-buttons");
	historyButtonsElement.innerHTML = "" +
		"&nbsp;" +
		"История на паметника" +
		"&nbsp;" +
		"<input type='button' id='provenance-found-button' value='Контекст'" +
			"onClick=\"addTextAreaElement('provenance-found', 'Контекст', 'large', 'greek', 'additional-keyboard', null);\" class='btn btn-info btn-xs'>" +
		"<input type='button' id='provenance-observed-button' value='Съвременно място'" +
			"onClick=\"addFramedTextAreaElement('history-elements', 'provenance-observed', 'Съвременно място', null, 'unique');\" class='btn btn-info btn-xs'>" +
		"<a href=\"javascript:clearElementGroup('history');\" class='btn btn-danger btn-xs'>" +
			"<span class='glyphicon glyphicon-remove'></span></a>";

	legendElement.appendChild(historyButtonsElement);

	var historyBoxesElement = document.createElement("div");
	historyBoxesElement.setAttribute("class", "row");
	historyBoxesElement.setAttribute("id", "history-elements");

	var origPlacePlaceholder = document.createElement("div");
	origPlacePlaceholder.setAttribute("id", "orig-place-group");
	historyBoxesElement.appendChild(origPlacePlaceholder);

	var origDatePlaceholder = document.createElement("div");
	origDatePlaceholder.setAttribute("id", "orig-date-group");
	historyBoxesElement.appendChild(origDatePlaceholder);

	var contextPlaceholder = document.createElement("div");
	contextPlaceholder.setAttribute("id", "provenance-found-group");
	historyBoxesElement.appendChild(contextPlaceholder);

	fieldsetElement.appendChild(legendElement);
	fieldsetElement.appendChild(historyBoxesElement);

	document.getElementById(placeholderId).appendChild(fieldsetElement);

	var buttonToDisable = document.getElementById("history-button");
	buttonToDisable.setAttribute("class", "btn btn-info btn-xs disabled");

	addTextAreaElement("orig-place", "Място на намиране", "large", "greek", "additional-keyboard", "mandatory");
	addTextAreaElement("orig-date", "Време на намиране", "large", null, "additional-keyboard", "mandatory");
}


function clearElementGroup(partialId){
	if (confirm("Ако в този елемент е попълнен текст, той ще бъде загубен!\n" +
		"Въведената информация не може да бъде възстановена!\n" +
		"Сигурни ли сте, че искате да премахнете избрания елемент?")) {
		var placeholderElement = document.getElementById(partialId + "-group");
		while (placeholderElement.hasChildNodes()) {
			placeholderElement.removeChild(placeholderElement.firstChild);
		}
		var buttonToEnable = document.getElementById(partialId + "-button");
		buttonToEnable.setAttribute("class", "btn btn-info btn-xs");
	}
	return false;
}


function removeElement(elementId){
	if (confirm("Ако в този елемент е попълнен текст, той ще бъде загубен!\n" +
		"Въведената информация не може да бъде възстановена!\n" +
		"Сигурни ли сте, че искате да премахнете избрания елемент?")) {
		var elementToRemove = document.getElementById(elementId);
		elementToRemove.parentNode.removeChild(elementToRemove);
	}
	return false;
}


function removeUniqueElement(partialId){
	if (confirm("Ако в този елемент е попълнен текст, той ще бъде загубен!\n" +
		"Въведената информация не може да бъде възстановена!\n" +
		"Сигурни ли сте, че искате да премахнете избрания елемент?")) {
		var elementToRemove = document.getElementById(partialId + "-group");
		elementToRemove.parentNode.removeChild(elementToRemove);

		var buttonToEnable = document.getElementById(partialId + "-button");
		buttonToEnable.setAttribute("class", "btn btn-info btn-xs");
	}
	return false;
}
