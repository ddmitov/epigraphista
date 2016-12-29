
// PEB compatible code:
if (navigator.userAgent.match(/Perl Executing Browser/)) {
	$jQuery.getScript("desktop/peb.js");
}

// Electron compatible code:
if (navigator.userAgent.match(/Electron/)) {
	var electronScript = document.createElement('script');
	electronScript.type='text/javascript';
	electronScript.src = 'desktop/electron.js';
	electronScript.charset = 'utf-8';
	document.getElementsByTagName('head')[0].appendChild(electronScript);

	electronScript.onload= function () {
		electronContextMenu();

		// Wait for close event message from the main process and react accordingly:
		require('electron').ipcRenderer.on('checkUserInputBeforeClose', function() {
			electronCheckUserInputBeforeClose();
		});
	}
}

// NW.js compatible code:
if (typeof(nw) !== 'undefined') {
	var win = nw.Window.get();
	win.maximize();

	$jQuery.getScript("desktop/nw.js");
}
