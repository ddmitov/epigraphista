

function syntaxHighlightEpidocText(epidocText) {
	// Escape opening angle bracket - '<':
	epidocText = epidocText.replace(/\</g, "<font color='#000080'>&lt;");

	// Escape closing angle bracket - '>':
	epidocText = epidocText.replace(/\>/g, "&gt;</font>");

	// Highlight tag attributes:
	epidocText = epidocText.replace(/([a-z,A-Z]{1,})=(\"[a-z,A-Z,0-9]{1,}\")/g, "<font color='#008080'>$1=</font><font color='7F007F'>$2</font>");

	// Escape quotes:
	epidocText = epidocText.replace(/\"/g, "&quot;");

	// Indentation and line breaks:
	epidocText = epidocText.replace(/&lt;lb/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;lb");

	return epidocText;
}
