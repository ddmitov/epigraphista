
// UTF-8 encoded file!


function putFocus(textAreaId) {
	document.getElementById(textAreaId).focus();
}


function resetForm(){
	if (confirm("Сигурни ли сте, че искате да изтриете попълнения текст във ВСИЧКИ полета?" +
			"Въведената информация не може да бъде възстановена!",
			"Epigraphista")) {

/* 		var originalTextHtml = document.getElementById("original-text-html");
		originalTextHtml.innerHTML = "";

		var originalTextXml = document.getElementById("original-text-xml");
		originalTextHtml.setAttribute("value", "");

		$jQuery("#original-text-formatted").hide();

		var greekKeyboardHelpPlaceholderElement = document.getElementById("original-text-greek-keyboard-help");
		var greekKeyboardCheckboxElement = document.getElementById("original-text-switch-greek");
		if (greekKeyboardHelpPlaceholderElement.innerHTML.length > 0) {
			greekKeyboardHelpPlaceholderElement.innerHTML = "";
			greekKeyboardHelpPlaceholderElement.style.marginBottom = "0px";
			greekKeyboardCheckboxElement.checked = false;
		}

		var additionalKeyboardPlaceholderElement = document.getElementById("original-text-additional-keyboard");
		if (additionalKeyboardPlaceholderElement.hasChildNodes()) {
			while (additionalKeyboardPlaceholderElement.hasChildNodes()) {
				additionalKeyboardPlaceholderElement.removeChild(additionalKeyboardPlaceholderElement.firstChild);
			}
		}

		document.getElementById("original-text").blur();
		document.getElementById("original-text").focus(); */

		location.reload(); 

		return true;
	}
	return false;
} 


function finalCheckAndSubmit() {
	// Check for title:
	var title = document.getElementById("title").value;
	if (title.length < 3) {
		alert("Моля, попълнете заглавие на надписа!",
			"Epigraphista");
		return false;
	}

	// Check for epigraphic text:
	var epigraphicText = document.getElementById("original-text").value;
	if (epigraphicText.length < 3) {
		alert("Моля, попълнете оригиналния текст на надписа!",
			"Epigraphista");
		return false;
	}

	// Check for any square bracket, that was opened, but was not closed or vice versa:
	epigraphicText = epigraphicText.replace(/\[((.)*)\]/g, "");
	epigraphicText = epigraphicText.replace(/\[((.)*)\n((.)*)\]/g, "\n");
	if (epigraphicText.match(/\[|\]/)) {
		alert ("Намерена е единична квадратна скоба в текста!" + " " +
			"Моля, поправете въведения текст!",
			"Epigraphista");
		return false;
	}

	document.forms["main_form"].submit();
}
