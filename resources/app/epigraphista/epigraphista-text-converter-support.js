

function startLeidenToEpidocConversion(elementId) {
	//Get focus:
	document.getElementById(elementId).focus();

	// Get the Leiden text and convert it to EpiDoc text:
	var leidenText = document.getElementById(elementId).value;
	var epidocXml = convertLeidenToEpidoc(leidenText);

	// Get the inner XML of the EpiDoc fragment:
	var epidocXmlFragment = epidocXml;
	// Add opening and closing tags:
	epidocXmlFragment = "<ab>" + epidocXmlFragment + "\n</ab>";
	// Syntax highlight EpiDoc text:
	var epidocHtml = syntaxHighlightEpidocText(epidocXmlFragment);

	// Place all results in the HTML DOM tree:
	document.getElementById(elementId + "-xml").setAttribute("value", epidocXml);
	document.getElementById(elementId + "-html").innerHTML = epidocHtml;
}
