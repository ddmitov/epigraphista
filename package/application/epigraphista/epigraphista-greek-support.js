
// UTF-8 encoded file!


// Polytonic Greek typesetting help:
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


// Additional keyboard buttons:
function toggleAdditionalKeyboard(placeholderId, target) {
	var additionalKeyboardRowContents = "" +
		"<input type='button' value='ϐ' onClick=\"javascript:insertLetter('" + target + "', 'ϐ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ϲ' onClick=\"javascript:insertLetter('" + target + "', 'ϲ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ϛ' onClick=\"javascript:insertLetter('" + target + "', 'Ϛ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ϛ' onClick=\"javascript:insertLetter('" + target + "', 'ϛ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ϟ' onClick=\"javascript:insertLetter('" + target + "', 'Ϟ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ϟ' onClick=\"javascript:insertLetter('" + target + "', 'ϟ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ϡ' onClick=\"javascript:insertLetter('" + target + "', 'Ϡ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ϡ' onClick=\"javascript:insertLetter('" + target + "', 'ϡ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"&nbsp;&nbsp;&nbsp;" +
		"<input type='button' value='Ё' onClick=\"javascript:insertLetter('" + target + "', 'Ё')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ё' onClick=\"javascript:insertLetter('" + target + "', 'ё')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ы' onClick=\"javascript:insertLetter('" + target + "', 'Ы')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ы' onClick=\"javascript:insertLetter('" + target + "', 'ы')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Э' onClick=\"javascript:insertLetter('" + target + "', 'Э')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='э' onClick=\"javascript:insertLetter('" + target + "', 'э')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"<input type='button' value='ѝ' onClick=\"javascript:insertLetter('" + target + "', 'ѝ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		//"&nbsp;&nbsp;&nbsp;" +
		"<input type='button' value='Ä' onClick=\"javascript:insertLetter('" + target + "', 'Ä')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ä' onClick=\"javascript:insertLetter('" + target + "', 'ä')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ö' onClick=\"javascript:insertLetter('" + target + "', 'Ö')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ö' onClick=\"javascript:insertLetter('" + target + "', 'ö')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ü' onClick=\"javascript:insertLetter('" + target + "', 'Ü')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ü' onClick=\"javascript:insertLetter('" + target + "', 'ü')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ß' onClick=\"javascript:insertLetter('" + target + "', 'ß')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<br>" +
		"<input type='button' value='É' onClick=\"javascript:insertLetter('" + target + "', 'É')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='é' onClick=\"javascript:insertLetter('" + target + "', 'é')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='À' onClick=\"javascript:insertLetter('" + target + "', 'À')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='à' onClick=\"javascript:insertLetter('" + target + "', 'à')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='È' onClick=\"javascript:insertLetter('" + target + "', 'È')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='è' onClick=\"javascript:insertLetter('" + target + "', 'è')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ù' onClick=\"javascript:insertLetter('" + target + "', 'Ù')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ù' onClick=\"javascript:insertLetter('" + target + "', 'ù')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Â' onClick=\"javascript:insertLetter('" + target + "', 'Â')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='â' onClick=\"javascript:insertLetter('" + target + "', 'â')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ê' onClick=\"javascript:insertLetter('" + target + "', 'Ê')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ê' onClick=\"javascript:insertLetter('" + target + "', 'ê')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Î' onClick=\"javascript:insertLetter('" + target + "', 'Î')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='î' onClick=\"javascript:insertLetter('" + target + "', 'î')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ô' onClick=\"javascript:insertLetter('" + target + "', 'Ô')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ô' onClick=\"javascript:insertLetter('" + target + "', 'ô')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Û' onClick=\"javascript:insertLetter('" + target + "', 'Û')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='û' onClick=\"javascript:insertLetter('" + target + "', 'û')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ë' onClick=\"javascript:insertLetter('" + target + "', 'Ë')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ë' onClick=\"javascript:insertLetter('" + target + "', 'ë')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ï' onClick=\"javascript:insertLetter('" + target + "', 'Ï')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ï' onClick=\"javascript:insertLetter('" + target + "', 'ï')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ÿ' onClick=\"javascript:insertLetter('" + target + "', 'Ÿ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ÿ' onClick=\"javascript:insertLetter('" + target + "', 'ÿ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='Ç' onClick=\"javascript:insertLetter('" + target + "', 'Ç')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
		"<input type='button' value='ç' onClick=\"javascript:insertLetter('" + target + "', 'ç')\" class='btn btn-success btn-xs btn-letters'>&nbsp;";

	var rowBox = document.createElement("div");
	rowBox.setAttribute("class", "form-group col-xs-12");
	rowBox.innerHTML = additionalKeyboardRowContents;

	var row = document.createElement("div");
	row.setAttribute("class", "row");
	row.appendChild(rowBox);

	var placeholderElement = document.getElementById(placeholderId);

	if (!placeholderElement.hasChildNodes()) {
		placeholderElement.appendChild(row);
	} else {
		while (placeholderElement.hasChildNodes()) {
			placeholderElement.removeChild(placeholderElement.firstChild);
		}
	}
}


// Additional keyboard code:
function insertLetter(targetId, letter) {
	var cursorPosition = $jQuery('#' + targetId).prop('selectionStart');
	var value = $jQuery('#' + targetId).val();
	var textBefore = value.substring(0, cursorPosition);
	var textAfter  = value.substring(cursorPosition, value.length);

	$jQuery('#' + targetId).val(textBefore + letter + textAfter);
	$jQuery('#' + targetId).prop("selectionStart", cursorPosition + 1);
}
