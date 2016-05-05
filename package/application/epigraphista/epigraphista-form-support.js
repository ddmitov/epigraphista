
// UTF-8 encoded file!


function finalCheckAndSubmit() {
	// Check for title:
	var title = document.getElementById("title").value;
	if (title.length < 3) {
		alert("Моля, попълнете заглавие на надписа!");
		return false;
	}

	// Check for epigraphic text:
	var epigraphicText = document.getElementById("original-text").value;
	if (epigraphicText.length < 3) {
		alert("Моля, попълнете оригиналния текст на надписа!");
		return false;
	}

	// Check for any square bracket, that was opened, but was not closed or vice versa:
	epigraphicText = epigraphicText.replace(/\[((.)*)\]/g, "");
	epigraphicText = epigraphicText.replace(/\[((.)*)\n((.)*)\]/g, "\n");
	if (epigraphicText.match(/\[|\]/)) {
		alert ("Намерена е единична квадратна скоба в текста!\n" +
			"Моля, поправете въведения текст!");
		return false;
	}

	// Convert to EpiDoc XML any text enetered at the last moment before form submission:
	convertEpigraphicText('original-text');

	document.forms["epigraphista_form"].submit();
}
