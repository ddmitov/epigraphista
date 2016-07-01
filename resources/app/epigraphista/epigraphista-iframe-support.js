

function loadPageInIframe(url) {
	var textEntered = false;

	var textFields = new Array();
	textFields = document.getElementById("iframe-a").contentWindow.document.getElementsByTagName("textarea");

	for (index = 0; index < textFields.length; index++) {
		if (textFields[index].value.length > 0) {
			textEntered = true;
		}
	}

	var inputBoxes = new Array();
	inputBoxes = document.getElementById("iframe-a").contentWindow.document.querySelectorAll("input[type=text]");

	for (index = 0; index < inputBoxes.length; index++) {
		if (inputBoxes[index].value.length > 0) {
			textEntered = true;
		}
	}

	if (textEntered == true) {
		alertify.set({labels: {ok : yesLabel, cancel : noLabel}});
		alertify.set({buttonFocus: "cancel"});
		alertify.confirm(loadAnotherPageConfirmation, function (confirmation) {
			if (confirmation) {
				window.frames["iframe_a"].location = url;
			}
		});
	} else {
		window.frames["iframe_a"].location = url;
	}
}
