
// These functions are usefull only inside Electron or NW.js:


function epigraphistaStdout(stdout) {
	if (stdout == "File saved.") {
		alertify.set({labels: {ok : TS.okLabel}});
		alertify.alert(TS.fileSavedMessage, function () {
			$jQuery('#container').html(originalContainerContents);
			initializeGui();
		});
	}
}


function epigraphistaStderr(stderr) {
	console.log('Epigraphista Perl script STDERR:\n'+ stderr);
}


function epigraphistaError(error) {
	console.log(error.stack); 
	console.log('Epigraphista Perl script error code: '+ error.code); 
	console.log('Epigraphista Perl script received signal: '+ error.signal);
}


function epigraphistaExit(exitCode) {
	console.log('Epigraphista Perl script exited with exit code ' + exitCode);
}
