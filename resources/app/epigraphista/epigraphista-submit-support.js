

var epigraphistaPerlScriptRelativePath = "perl/epigraphista-ajax.pl"


function finalCheckAndSubmit() {
	// Check for title:
	var title = document.getElementById("title").value;
	if (title.length < 3) {
		var titleGroup = document.getElementById("title-group");
		titleGroup.setAttribute("class", "form-group has-error col-xs-12");

		// Display warning message:
		alertify.set({labels: {ok : TS.okLabel}});
		alertify.set({buttonFocus: "ok"});
		alertify.alert(TS.noTitleAlertMessage, function () {
			titleGroup.setAttribute("class", "form-group col-xs-12");
		});

		return false;
	}

	// Check XML tags of inscription description:
	if (document.getElementById("support")) {
		var supportText = document.getElementById("support").value;
		supportText = supportText.replace(/\<material\>([^\<|\>]*)\<\/material\>/g, "");
		supportText = supportText.replace(/\<objectType\>([^\<|\>]*)\<\/objectType\>/g, "");
		if (supportText.match(/\<|\>/)) {
			var supportGroup = document.getElementById("support-group");
			supportGroup.setAttribute("class", "form-group stop-shrinking has-error col-xs-12");

			// Display warning message:
			alertify.set({labels: {ok : TS.okLabel}});
			alertify.set({buttonFocus: "ok"});
			alertify.alert(TS.invalidXMLTagAlertMessage, function () {
				supportGroup.setAttribute("class", "form-group stop-shrinking col-xs-12");
			});

			return false;
		}
	}

	// Check for epigraphic text:
	var epigraphicText = document.getElementById("inscription").value;
	if (epigraphicText.length < 3) {
		var inscriptionInputGroup = document.getElementById("inscription-input-group");
		inscriptionInputGroup.setAttribute("class", "form-group has-error col-xs-12");

		// Display warning message:
		alertify.set({labels: {ok : TS.okLabel}});
		alertify.set({buttonFocus: "ok"});
		alertify.alert(TS.noInscriptionAlertMessage, function () {
			inscriptionInputGroup.setAttribute("class", "form-group col-xs-12");
		});

		return false;
	}

	// Check for any square bracket, that was opened, but was not closed or vice versa:
	epigraphicText = epigraphicText.replace(/\[((.)*)\]/g, "");
	epigraphicText = epigraphicText.replace(/\[((.)*)\n((.)*)\]/g, "\n");
	if (epigraphicText.match(/\[|\]/)) {
		var inscriptionInputGroup = document.getElementById("inscription-input-group");
		inscriptionInputGroup.setAttribute("class", "form-group has-error col-xs-12");

		// Display warning message:
		alertify.set({labels: {ok : TS.okLabel}});
		alertify.set({buttonFocus: "ok"});
		alertify.alert(TS.singleSquareBracketAlertMessage, function () {
			inscriptionInputGroup.setAttribute("class", "form-group col-xs-12");
		});

		return false;
	}

	// Convert to EpiDoc XML again if text is enetered at the last moment before file save:
	startLeidenToEpidocConversion('inscription')

	// Start Epigraphista Perl script.
	if (typeof(nw) !== 'undefined' || navigator.userAgent.match(/Electron/)) {
		// Call Epigraphista Perl script from Electron or NW.js.
		// Wait 150 ms. for EpiDoc XML conversion to take place before getting the form data:
		setTimeout(function () {
			// Get form data:
			var formData = $jQuery("#epigraphista-form").serialize();

			// Determine the operating system:
			var osObject = require('os');
			var platform = osObject.platform();

			// Initialize 'path' object:
			var pathObject;
			if (platform !== "win32") {
				pathObject = require('path').posix;
			} else {
				pathObject = require('path').win32;
			}

			// Get the full path of directory where Electron or NW.js binary is located:
			var binaryPath = process.execPath;
			var binaryDir = pathObject.dirname(binaryPath);

			// Get the full path of the application root directory:
			var applicationRootDirectory = pathObject.join(binaryDir, "resources/app");

			// Compose the full path of the Epigraphista Perl script:
			var scriptFullPath = pathObject.join(applicationRootDirectory, epigraphistaPerlScriptRelativePath);

			// Start Epigraphista Perl script from NW.js or Electron:
			camelHarness(scriptFullPath, "epigraphistaStdout", "epigraphistaStderr", "epigraphistaError", "epigraphistaExit", "POST", formData);
		}, 150);
	} else {
		// Call Epigraphista Perl script from Perl Executing Browser or from a web server.
		// Wait 150 ms. for EpiDoc XML conversion to take place before getting the form data:
		setTimeout(function () {
			// Get form data:
			var formData = $jQuery("#epigraphista-form").serialize();

			// Make an AJAX POST request using jQuery:
			$jQuery.ajax({
				url: epigraphistaPerlScriptRelativePath,
				data: formData,
				method: 'POST',
				dataType: 'text',
				success: function(data) {
					if (data == "File saved.") {
						// Display success message:
						alertify.set({labels: {ok : TS.okLabel}});
						alertify.alert(TS.fileSavedMessage, function () {
							// Restore the user interface to its initial outlook:
							$jQuery('#container').html(originalContainerContents);
							initializeGui();
						});
					}
				}
			});
		}, 150);
	}
}
