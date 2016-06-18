

function detectTouchScreen() {
	if (navigator.userAgent.match(/WebKit/i)) {
		var mobilis;
		window.addEventListener('touchstart', function setHasTouch () {
			mobilis = true;
			// Remove event listener once fired, otherwise it'll kill scrolling performance
			window.removeEventListener('touchstart', setHasTouch);
		}, false);
		if (mobilis == true) {
			document.getElementsByClassName("container-fluid")[0].innerHTML =
				"<h2>Epigraphista does not support<br>touchscreen devices!</h2>";
		}
	} else {
		var mobilis = isMobile();
		if (mobilis == true) {
			document.getElementsByClassName("container-fluid")[0].innerHTML =
				"<h2>Epigraphista does not support<br>touchscreen devices!</h2>";
		}
		function isMobile() {
			try {
				document.createEvent("TouchEvent");
				return true;
			}
			catch(exception) {
				return false;
			}
		}
	}
}


function guiInitialization() {
	$jQuery("#title").autoResize();

	$jQuery("#title").on('paste', function(e){
		setTimeout(function () {
			jQuery("#title").trigger('keyup');
		}, 150);
	});

	$jQuery("#inscription").autoResize();

	$jQuery("#inscription").on('paste', function(e){
		setTimeout(function () {
			jQuery("#inscription").trigger('keyup');
		}, 150);
	});
}
