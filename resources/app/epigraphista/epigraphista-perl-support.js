

var perlInterpreterFullPath;
if (typeof(nw) !== 'undefined' || navigator.userAgent.match(/Electron/)) {
	var dirname = require('./electron-nwjs/dirname').dirname;
	var portablePerlInterpreterFullPath = dirname + "/perl/bin/perl";

	var fs = require('fs');
	fs.access(portablePerlInterpreterFullPath, function(error) {
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
			var formData = $jQuery("#epigraphista-form").serialize();
			var formDataLength = formData.length;

			var dirname = require('./electron-nwjs/dirname').dirname;
			var exec = require ('child_process').exec, child;

			var interval = " ";
			var censorScript = dirname + "/perl/censor.pl";
			var script = dirname + "/perl/epigraphista-ajax.pl";
			var commandLine = perlInterpreterFullPath + interval + censorScript + interval + script;

			var env = cleanEnvironment = {};

			// Assign environment variables:
			cleanEnvironment['REQUEST_METHOD'] = 'POST';
			cleanEnvironment['CONTENT_LENGTH'] = formDataLength;

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
