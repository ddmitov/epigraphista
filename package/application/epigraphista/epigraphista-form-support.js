
// UTF-8 encoded file!


function finalCheckAndSubmit() {
	// Check for title:
	var title = document.getElementById("title").value;
	if (title.length < 3) {
		var titleGroup = document.getElementById("title-group");
		titleGroup.setAttribute("class", "form-group has-error col-xs-12");
		alert("Моля, попълнете заглавие на надписа!");
		titleGroup.setAttribute("class", "form-group col-xs-12");
		return false;
	}

	// Check XML tags of inscription description:
	if (document.getElementById("support")) {
		var supportText = document.getElementById("support").value;
		supportText = supportText.replace(/\<material\>([^\<|\>]*)\<\/material\>/g, "");
		supportText = supportText.replace(/\<objectType\>([^\<|\>]*)\<\/objectType\>/g, "");
		if (supportText.match(/\<|\>/)) {
			var supportGroup = document.getElementById("support-group");
			supportGroup.setAttribute("class", "form-group has-error col-xs-12");
			alert ("Намерен е непълен или неправилно поставен XML таг в описанието на паметника!\n" +
				"Моля, поправете въведения текст!");
			supportGroup.setAttribute("class", "form-group col-xs-12");
			return false;
		}
	}

	// Check for epigraphic text:
	var epigraphicText = document.getElementById("inscription").value;
	if (epigraphicText.length < 3) {
		var inscriptionInputGroup = document.getElementById("inscription-input-group");
		inscriptionInputGroup.setAttribute("class", "form-group has-error col-xs-12");
		alert("Моля, попълнете текста на надписа!");
		inscriptionInputGroup.setAttribute("class", "form-group col-xs-12");
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

	// Convert to EpiDoc XML if text is enetered at the last moment before form submission:
	convertEpigraphicText('inscription');

	// Wait 150 ms. for EpiDoc XML conversion to take place before form submission:
	setTimeout(function () {
		document.forms["epigraphista_form"].submit();
	}, 150);
}
