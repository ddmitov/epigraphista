

// Necessary to avoid conflicts between jQuery and other JavaScript libraries:
var $jQuery = jQuery.noConflict();

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

	var camelHarnessScript = document.createElement('script');
	camelHarnessScript.type='text/javascript';
	camelHarnessScript.src = 'desktop/camel-harness.js';
	camelHarnessScript.charset = 'utf-8';
	document.getElementsByTagName('head')[0].appendChild(camelHarnessScript);

	var camelHarnessSupportScript = document.createElement('script');
	camelHarnessSupportScript.type='text/javascript';
	camelHarnessSupportScript.src = 'desktop/camel-harness-support.js';
	camelHarnessSupportScript.charset = 'utf-8';
	document.getElementsByTagName('head')[0].appendChild(camelHarnessSupportScript);

}


// NW.js compatible code:
if (typeof(nw) !== 'undefined') {
	var win = nw.Window.get();
	win.maximize();

	$jQuery.getScript("desktop/nw.js");
	$jQuery.getScript("desktop/camel-harness.js");
	$jQuery.getScript("desktop/camel-harness-support.js");
}
