

// Determine the operating system and
// set operating-system-specific variables:
var path;
var perlInterpreterFileName;

var os = require('os');
var platform = os.platform();

if (platform != "win32") {
	perlInterpreterFileName = "perl";
	path = require("path").posix;
} else {
	perlInterpreterFileName = "perl.exe";
	path = require("path").win32;
}


// Determine where is the Perl interpreter:
var perlInterpreterFullPath;
if (typeof(nw) !== 'undefined' || navigator.userAgent.match(/Electron/)) {
	// Get the full path of directory where Electron or NW.js binary is located:
	var binaryRoot = require('./electron-nwjs/dirname').dirname.replace(/(\/|\\)resources(\/|\\)app/, "");

	// Compose the full path to the portable Perl interpreter (if any):
	var portablePerlInterpreterFullPath = path.join(binaryRoot, "perl/bin", perlInterpreterFileName);

	var fs = require('fs');
	fs.access(portablePerlInterpreterFullPath, function(error) {
		// If portable Perl interpreter is not found,
		// determine the full path of the first Perl interpreter on PATH:
		if (error && error.code === 'ENOENT') {
			var perlFullPathTester = "perl -e 'print $^X;'";
			var exec = require('child_process').exec;

			exec(perlFullPathTester, function (error, stdout, stderr) {
				if (error == null && stdout.length > 0) {
					perlInterpreterFullPath = stdout;
				}
			});
		} else {
			perlInterpreterFullPath = portablePerlInterpreterFullPath;
		}
	});
}


function finalCheckAndSubmit() {
	// Check for title:
	var title = document.getElementById("title").value;
	if (title.length < 3) {
		var titleGroup = document.getElementById("title-group");
		titleGroup.setAttribute("class", "form-group has-error col-xs-12");

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

		alertify.set({labels: {ok : TS.okLabel}});
		alertify.set({buttonFocus: "ok"});
		alertify.alert(TS.singleSquareBracketAlertMessage, function () {
			inscriptionInputGroup.setAttribute("class", "form-group col-xs-12");
		});

		return false;
	}

	// Convert to EpiDoc XML if text is enetered at the last moment before file save:
	convertEpigraphicText('inscription');

	if (typeof(nw) !== 'undefined' || navigator.userAgent.match(/Electron/)) {
		// Wait 150 ms. for EpiDoc XML conversion to take place before file save:
		setTimeout(function () {
			// Get the form data:
			var formData = $jQuery("#epigraphista-form").serialize();
			var formDataLength = formData.length;

			// Get the application directory full path:
			var dirname = require('./electron-nwjs/dirname').dirname;

			// Compose the command line that has to be executed:
			var scriptFullPath = path.join(dirname, "perl/epigraphista-ajax.pl");
			var safetyArguments = " -M-ops=:dangerous -M-ops=fork ";
			var commandLine = perlInterpreterFullPath + safetyArguments + scriptFullPath;

			// Assign environment variables in a clean environment:
			var env = cleanEnvironment = {};
			cleanEnvironment['REQUEST_METHOD'] = 'POST';
			cleanEnvironment['CONTENT_LENGTH'] = formDataLength;

			// Run the Perl script:
			var exec = require ('child_process').exec, child;
			child = exec(commandLine, {env: cleanEnvironment}, function (error, stdout, stderr) {
				if (error) {
					console.log(error.stack); 
					console.log('Perl script error code: '+ error.code); 
					console.log('Perl script signal received: '+ error.signal);
				}

				if (stderr) {
					console.log('Perl script stderr:\n'+ stderr);
				}

				if (stdout == "File saved.") {
					alertify.set({labels: {ok : TS.okLabel}});
					alertify.alert(TS.fileSavedMessage, function () {
						$jQuery('#container').html(originalContainerContents);
						guiInitialization();
					});
				}
			});

			// Send POST data to the Perl script:
			child.stdin.write(formData);

			child.on('exit', function (code) { 
				console.log('Perl script exited with exit code '+ code);
			});
		}, 150);
	} else {
		// Wait 150 ms. for EpiDoc XML conversion to take place before file save:
		setTimeout(function () {
			var formData = $jQuery("#epigraphista-form").serialize();

			$jQuery.ajax({
				url: 'http://perl-executing-browser-pseudodomain/perl/epigraphista-ajax.pl',
				data: formData,
				method: 'POST',
				dataType: 'text',
				success: function(data) {
					if (data == "File saved.") {
						alertify.set({labels: {ok : TS.okLabel}});
						alertify.alert(TS.fileSavedMessage, function () {
							$jQuery('#container').html(originalContainerContents);
							guiInitialization();
						});
					}
				}
			});
		}, 150);
	}
}
