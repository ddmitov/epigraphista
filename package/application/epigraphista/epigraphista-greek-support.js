
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
		"<fieldset class='letter-box'><p class='letter-box-p'>Q&nbsp;<font color='red'>Θ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>W&nbsp;<font color='red'>Ω</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>E&nbsp;<font color='red'>Ε</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>R&nbsp;<font color='red'>Ρ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>T&nbsp;<font color='red'>Τ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>Y&nbsp;<font color='red'>Ψ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>U&nbsp;<font color='red'>Υ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>I&nbsp;<font color='red'>Ι</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>O&nbsp;<font color='red'>Ο</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>P&nbsp;<font color='red'>Π</font></p></fieldset>" +
		"<br>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>A&nbsp;<font color='red'>Α</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>S&nbsp;<font color='red'>Σ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>D&nbsp;<font color='red'>Δ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>F&nbsp;<font color='red'>Φ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>G&nbsp;<font color='red'>Γ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>H&nbsp;<font color='red'>Η</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>J&nbsp;<font color='red'>Σ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>K&nbsp;<font color='red'>Κ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>L&nbsp;<font color='red'>Λ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>;&nbsp;<font color='red'>·</font></p></fieldset>" +
		"<br>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>Z&nbsp;<font color='red'>Ζ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>X&nbsp;<font color='red'>Χ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>C&nbsp;<font color='red'>Ξ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>V&nbsp;<font color='red'>Ϝ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>B&nbsp;<font color='red'>Β</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>N&nbsp;<font color='red'>Ν</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>M&nbsp;<font color='red'>Μ</font></p></fieldset>" +
		"<br>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>a/&nbsp;<font color='red'>ά</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>a\\&nbsp;<font color='red'>ὰ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>a=&nbsp;<font color='red'>ᾶ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>a)&nbsp;<font color='red'>ἀ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>a(&nbsp;<font color='red'>ἁ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>a|&nbsp;<font color='red'>ᾳ</font></p></fieldset>" +
		"<fieldset class='letter-box'><p class='letter-box-p'>i+&nbsp;<font color='red'>ϊ</font></p></fieldset>" +
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
	var additionalKeyboardRowContents = "" +
		"<input type='button' value='ϐ' onClick=\"javascript:insertTags('ϐ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ϲ' onClick=\"javascript:insertTags('ϲ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ϛ' onClick=\"javascript:insertTags('Ϛ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ϛ' onClick=\"javascript:insertTags('ϛ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ϟ' onClick=\"javascript:insertTags('Ϟ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ϟ' onClick=\"javascript:insertTags('ϟ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ϡ' onClick=\"javascript:insertTags('Ϡ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ϡ' onClick=\"javascript:insertTags('ϡ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"&nbsp;&nbsp;&nbsp;" +
		"<input type='button' value='Ё' onClick=\"javascript:insertTags('Ё', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ё' onClick=\"javascript:insertTags('ё', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ы' onClick=\"javascript:insertTags('Ы', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ы' onClick=\"javascript:insertTags('ы', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Э' onClick=\"javascript:insertTags('Э', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='э' onClick=\"javascript:insertTags('э', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ѝ' onClick=\"javascript:insertTags('ѝ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"&nbsp;&nbsp;&nbsp;" +
		"<input type='button' value='Ä' onClick=\"javascript:insertTags('Ä', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ä' onClick=\"javascript:insertTags('ä', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ö' onClick=\"javascript:insertTags('Ö', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ö' onClick=\"javascript:insertTags('ö', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ü' onClick=\"javascript:insertTags('Ü', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ü' onClick=\"javascript:insertTags('ü', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ß' onClick=\"javascript:insertTags('ß', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +

		"<br>" +

		"<input type='button' value='É' onClick=\"javascript:insertTags('É', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='é' onClick=\"javascript:insertTags('é', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='À' onClick=\"javascript:insertTags('À', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='à' onClick=\"javascript:insertTags('à', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='È' onClick=\"javascript:insertTags('È', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='è' onClick=\"javascript:insertTags('è', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ù' onClick=\"javascript:insertTags('Ù', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ù' onClick=\"javascript:insertTags('ù', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Â' onClick=\"javascript:insertTags('Â', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='â' onClick=\"javascript:insertTags('â', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ê' onClick=\"javascript:insertTags('Ê', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ê' onClick=\"javascript:insertTags('ê', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Î' onClick=\"javascript:insertTags('Î', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='î' onClick=\"javascript:insertTags('î', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ô' onClick=\"javascript:insertTags('Ô', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ô' onClick=\"javascript:insertTags('ô', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Û' onClick=\"javascript:insertTags('Û', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='û' onClick=\"javascript:insertTags('û', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ë' onClick=\"javascript:insertTags('Ë', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ë' onClick=\"javascript:insertTags('ë', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ï' onClick=\"javascript:insertTags('Ï', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ï' onClick=\"javascript:insertTags('ï', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ÿ' onClick=\"javascript:insertTags('Ÿ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ÿ' onClick=\"javascript:insertTags('ÿ', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ç' onClick=\"javascript:insertTags('Ç', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ç' onClick=\"javascript:insertTags('ç', '', '')\" class='btn btn-success btn-xs btn-letters'>&nbsp;";

	var rowBox = document.createElement("div");
	rowBox.setAttribute("class", "form-group col-xs-12");
	rowBox.innerHTML = additionalKeyboardRowContents;

	var row = document.createElement("div");
	row.setAttribute("class", "row");
	row.appendChild(rowBox);

	var placeholderElement = document.getElementById(elementId);

	if (!placeholderElement.hasChildNodes()) {
		placeholderElement.appendChild(row);
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
