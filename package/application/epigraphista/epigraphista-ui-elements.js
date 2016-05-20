
// UTF-8 encoded file!


function addSupportGroup() {
	var buttonsRowElement = document.createElement("div");
	buttonsRowElement.setAttribute("class", "row buttons-row");

	var buttonsCode = "" +
		"<input type='button' id='material-button' value='Материал' class='btn btn-success btn-xs'>" +
		"<input type='button' id='object-type-button' value='Категория' class='btn btn-success btn-xs'>";
	buttonsRowElement.innerHTML = buttonsCode;

	var placeholderElement = document.getElementById("support-group");
	placeholderElement.appendChild(buttonsRowElement);

	$jQuery('#material-button').click(function() {
		$jQuery('#support')
		.selection('insert', {text: '<material>', mode: 'before'})
		.selection('insert', {text: '</material>', mode: 'after'});
	});

	$jQuery('#object-type-button').click(function() {
		$jQuery('#support')
		.selection('insert', {text: '<objectType>', mode: 'before'})
		.selection('insert', {text: '</objectType>', mode: 'after'});
	});

	addTextAreaElement('support', 'Описание на паметника', 'full', 'greek', 'additional-keyboard');
}
