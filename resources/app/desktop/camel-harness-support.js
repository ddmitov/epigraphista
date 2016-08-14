
// These functions are usefull only inside Electron or NW.js:


function camelHarnessError(error) {
	console.log(error.stack); 
	console.log('Perl script error code: '+ error.code); 
	console.log('Perl script signal received: '+ error.signal);
}


function camelHarnessStdout(stdout) {
	if (stdout == "File saved.") {
		alertify.set({labels: {ok : TS.okLabel}});
		alertify.alert(TS.fileSavedMessage, function () {
			$jQuery('#container').html(originalContainerContents);
			initializeGui();
		});
	}
}


function camelHarnessStderr(stderr) {
	console.log('Perl script STDERR:\n'+ stderr);
}


function camelHarnessExit(exitCode) {
	console.log('Perl script exited with exit code ' + exitCode);
}
