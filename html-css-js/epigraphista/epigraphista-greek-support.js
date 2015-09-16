
// UTF-8 encoded file!


// Global variables:
var currentTextAreaForAdditionalKeyboard;
var clientBrowser = navigator.userAgent.toLowerCase();
var isGeckoBrowser = ((clientBrowser.indexOf('gecko')!=-1) && (clientBrowser.indexOf('khtml') == -1));


// TypeGreek code:
function switchGreek(textAreaId) {
	document.getElementById(textAreaId).focus();
}


function toggleGreekKeyboardHelp(partialDivName) {
	var greekKeyboardHelpContents = "" +
		"&nbsp;&nbsp;Q&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Θ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;W&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ω&nbsp;&nbsp;" +
		"&nbsp;&nbsp;E&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ε&nbsp;&nbsp;" +
		"&nbsp;&nbsp;R&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ρ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;T&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Τ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;Y&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ψ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;U&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Υ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;I&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ι&nbsp;&nbsp;" +
		"&nbsp;&nbsp;O&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ο&nbsp;&nbsp;" +
		"&nbsp;&nbsp;P&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Π&nbsp;&nbsp;" +
		"<br>" +
		"&nbsp;&nbsp;A&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Α&nbsp;&nbsp;" +
		"&nbsp;&nbsp;S&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Σ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;D&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Δ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;F&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Φ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;G&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Γ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;H&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Η&nbsp;&nbsp;" +
		"&nbsp;&nbsp;J&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Σ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;K&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Κ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;L&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Λ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;;&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;·&nbsp;&nbsp;" +
		"<br>" +
		"&nbsp;&nbsp;Z&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ζ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;X&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Χ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;C&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ξ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;V&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ϝ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;B&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Β&nbsp;&nbsp;" +
		"&nbsp;&nbsp;N&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Ν&nbsp;&nbsp;" +
		"&nbsp;&nbsp;M&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;Μ&nbsp;&nbsp;" +
		"<br>" +
		"&nbsp;&nbsp;a&nbsp;<span class='glyphicon glyphicon-plus'></span>&nbsp;/&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;ά&nbsp;&nbsp;" +
		"&nbsp;&nbsp;a&nbsp;<span class='glyphicon glyphicon-plus'></span>&nbsp;\\&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;ὰ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;a&nbsp;<span class='glyphicon glyphicon-plus'></span>&nbsp;=&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;ᾶ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;a&nbsp;<span class='glyphicon glyphicon-plus'></span>&nbsp;)&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;ἀ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;a&nbsp;<span class='glyphicon glyphicon-plus'></span>&nbsp;(&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;ἁ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;a&nbsp;<span class='glyphicon glyphicon-plus'></span>&nbsp;|&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;ᾳ&nbsp;&nbsp;" +
		"&nbsp;&nbsp;i&nbsp;<span class='glyphicon glyphicon-plus'></span>&nbsp;+&nbsp;<span class='glyphicon glyphicon-arrow-right'></span>&nbsp;ϊ&nbsp;&nbsp;" +
		"<br>";

	var placeholderElement = document.getElementById(partialDivName + "-greek-keyboard-help");
	var checkboxElement = document.getElementById(partialDivName + "-switch-greek");

	if (placeholderElement.innerHTML.length == 0) {
		placeholderElement.innerHTML = greekKeyboardHelpContents;
		placeholderElement.style.marginBottom = "10px";
		checkboxElement.checked = true;
	} else {
		placeholderElement.innerHTML = "";
		placeholderElement.style.marginBottom = "0px";
	}
}


// Additional keyboard code:
function toggleAdditionalKeyboard(elementId) {
	var additionalKeyboardFirstRowContents = "" +
		"<input type='button' value='ϐ' onClick=\"javascript:insertTags('ϐ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ϲ' onClick=\"javascript:insertTags('ϲ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ϛ' onClick=\"javascript:insertTags('Ϛ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ϛ' onClick=\"javascript:insertTags('ϛ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ϟ' onClick=\"javascript:insertTags('Ϟ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ϟ' onClick=\"javascript:insertTags('ϟ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ϡ' onClick=\"javascript:insertTags('Ϡ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ϡ' onClick=\"javascript:insertTags('ϡ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"&nbsp;&nbsp;&nbsp;" +
		"<input type='button' value='Ё' onClick=\"javascript:insertTags('Ё', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ё' onClick=\"javascript:insertTags('ё', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ы' onClick=\"javascript:insertTags('Ы', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ы' onClick=\"javascript:insertTags('ы', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Э' onClick=\"javascript:insertTags('Э', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='э' onClick=\"javascript:insertTags('э', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ѝ' onClick=\"javascript:insertTags('ѝ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"&nbsp;&nbsp;&nbsp;" +
		"<input type='button' value='Ä' onClick=\"javascript:insertTags('Ä', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ä' onClick=\"javascript:insertTags('ä', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ö' onClick=\"javascript:insertTags('Ö', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ö' onClick=\"javascript:insertTags('ö', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ü' onClick=\"javascript:insertTags('Ü', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ü' onClick=\"javascript:insertTags('ü', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ß' onClick=\"javascript:insertTags('ß', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;";

	var firstRowBox = document.createElement("div");
	firstRowBox.setAttribute("class", "form-group col-xs-12");
	firstRowBox.innerHTML = additionalKeyboardFirstRowContents;

	var firstRow = document.createElement("div");
	firstRow.setAttribute("class", "row");
	firstRow.appendChild(firstRowBox);

	var additionalKeyboardSecondRowContents = "" +
		"<input type='button' value='É' onClick=\"javascript:insertTags('É', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='é' onClick=\"javascript:insertTags('é', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='À' onClick=\"javascript:insertTags('À', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='à' onClick=\"javascript:insertTags('à', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='È' onClick=\"javascript:insertTags('È', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='è' onClick=\"javascript:insertTags('è', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ù' onClick=\"javascript:insertTags('Ù', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ù' onClick=\"javascript:insertTags('ù', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Â' onClick=\"javascript:insertTags('Â', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='â' onClick=\"javascript:insertTags('â', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ê' onClick=\"javascript:insertTags('Ê', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ê' onClick=\"javascript:insertTags('ê', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Î' onClick=\"javascript:insertTags('Î', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='î' onClick=\"javascript:insertTags('î', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ô' onClick=\"javascript:insertTags('Ô', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ô' onClick=\"javascript:insertTags('ô', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Û' onClick=\"javascript:insertTags('Û', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='û' onClick=\"javascript:insertTags('û', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ë' onClick=\"javascript:insertTags('Ë', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ë' onClick=\"javascript:insertTags('ë', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ï' onClick=\"javascript:insertTags('Ï', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ï' onClick=\"javascript:insertTags('ï', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ü' onClick=\"javascript:insertTags('Ü', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ü' onClick=\"javascript:insertTags('ü', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ÿ' onClick=\"javascript:insertTags('Ÿ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ÿ' onClick=\"javascript:insertTags('ÿ', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ç' onClick=\"javascript:insertTags('Ç', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ç' onClick=\"javascript:insertTags('ç', '', '')\" class='btn btn-info btn-xs btn-letters'>&nbsp;";

	var secondRowBox = document.createElement("div");
	secondRowBox.setAttribute("class", "form-group col-xs-12");
	secondRowBox.innerHTML = additionalKeyboardSecondRowContents;

	var secondRow = document.createElement("div");
	secondRow.setAttribute("class", "row");
	secondRow.appendChild(secondRowBox);

	var placeholderElement = document.getElementById(elementId);

	if (!placeholderElement.hasChildNodes()) {
		placeholderElement.appendChild(firstRow);
		placeholderElement.appendChild(secondRow);
	} else {
		while (placeholderElement.hasChildNodes()) {
			placeholderElement.removeChild(placeholderElement.firstChild);
		}
	}
} 


// Additional keyboard code:
// The following code is adapted from Steev's JavaScript keyboard (GPL).
// http://www.bluedust.com/pub/web/sjk.htm
function setCurrentTextArea(textAreaId) {
	currentTextAreaForAdditionalKeyboard = document.getElementById(textAreaId);
}


// Additional keyboard code:
// The following code is adapted from wikibits.js - MediaWiki JavaScript support functions and phpBB (both GPL).
// http://www.mediawiki.org/wiki/MediaWiki
// http://www.phpbb.com/support/license.php
function insertTags(tagOpen, tagClose, sampleText) {
	// IE:
	if (document.selection && !isGeckoBrowser) {
		var theSelection = document.selection.createRange().text;
		if (!theSelection)
			theSelection=sampleText;
		currentTextAreaForAdditionalKeyboard.focus();
		// Exclude ending space char, if any:
		if (theSelection.charAt(theSelection.length - 1) == " ") {
			theSelection = theSelection.substring(0, theSelection.length - 1);
			document.selection.createRange().text = tagOpen + theSelection + tagClose + " ";
		} else {
			document.selection.createRange().text = tagOpen + theSelection + tagClose;
		}
	// Mozilla:
	} else if(currentTextAreaForAdditionalKeyboard.selectionStart || currentTextAreaForAdditionalKeyboard.selectionStart == '0') {
		var replaced = false;
		var startPos = currentTextAreaForAdditionalKeyboard.selectionStart;
		var endPos = currentTextAreaForAdditionalKeyboard.selectionEnd;
		if (endPos-startPos)
			replaced = true;
		var scrollTop = currentTextAreaForAdditionalKeyboard.scrollTop;
		var myText = (currentTextAreaForAdditionalKeyboard.value).substring(startPos, endPos);
		if (!myText)
			myText=sampleText;
		// Exclude ending space char, if any:
		if (myText.charAt(myText.length - 1) == " ") {
			subst = tagOpen + myText.substring(0, (myText.length - 1)) + tagClose + " ";
		} else {
			subst = tagOpen + myText + tagClose;
		}
		currentTextAreaForAdditionalKeyboard.value = currentTextAreaForAdditionalKeyboard.value.substring(0, startPos) + subst +
			currentTextAreaForAdditionalKeyboard.value.substring(endPos, currentTextAreaForAdditionalKeyboard.value.length);
		currentTextAreaForAdditionalKeyboard.focus();
		// Set new selection:
		if (replaced) {
			var cPos = startPos+(tagOpen.length+myText.length+tagClose.length);
			currentTextAreaForAdditionalKeyboard.selectionStart = cPos;
			currentTextAreaForAdditionalKeyboard.selectionEnd = cPos;
		} else {
			currentTextAreaForAdditionalKeyboard.selectionStart = startPos+tagOpen.length;
			currentTextAreaForAdditionalKeyboard.selectionEnd = startPos+tagOpen.length+myText.length;
		}
		currentTextAreaForAdditionalKeyboard.scrollTop = scrollTop;
	}
	// Reposition cursor, if possible:
	if (currentTextAreaForAdditionalKeyboard.createTextRange)
		currentTextAreaForAdditionalKeyboard.caretPos = document.selection.createRange().duplicate();
}
