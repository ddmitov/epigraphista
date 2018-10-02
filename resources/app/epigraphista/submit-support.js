
function finalCheckAndSubmit() {
  // Check for title:
  var title = document.getElementById('title').value;
  if (title.length < 3) {
    // Display warning message:
    alert(TS.noTitleAlertMessage);
    return false;
  }

  // Check XML tags of inscription description:
  if (document.getElementById('support')) {
    var supportText = document.getElementById('support').value;
    supportText =
      supportText.replace(/\<material\>([^\<|\>]*)\<\/material\>/g, '');
    supportText =
      supportText.replace(/\<objectType\>([^\<|\>]*)\<\/objectType\>/g, '');

    if (supportText.match(/\<|\>/)) {
      // Display warning message:
      alert(TS.invalidXMLTagAlertMessage);
      return false;
    }
  }

  // Check for epigraphic text:
  var epigraphicText = document.getElementById('inscription').value;
  if (epigraphicText.length < 3) {
    // Display warning message:
    alert(TS.noInscriptionAlertMessage);
    return false;
  }

  // Check for any square bracket,
  // that was opened, but was not closed or vice versa:
  epigraphicText = epigraphicText.replace(/\[((.)*)\]/g, '');
  epigraphicText = epigraphicText.replace(/\[((.)*)\n((.)*)\]/g, '\n');
  if (epigraphicText.match(/\[|\]/)) {
    // Display warning message:
    alert(TS.singleSquareBracketAlertMessage);
    return false;
  }

  // Convert to EpiDoc XML again
  // if text is enetered at the last moment before file save:
  startLeidenToEpidocConversion('inscription');

  // Call Epigraphista Perl script from Electron:
  if (typeof require !== 'undefined') {
    // Determine the operating system:
    var osObject = require('os');
    var platform = osObject.platform();

    // Initialize 'path' object:
    var pathObject;
    if (platform !== 'win32') {
      pathObject = require('path').posix;
    } else {
      pathObject = require('path').win32;
    }

    // Get the full path of the Epigraphista Perl script:
    var appDirectory =
      pathObject.join(process.cwd(), 'resources', 'app');

    epigraphista_perl.script =
      pathObject.join(appDirectory, epigraphista_perl.scriptRelativePath);

    epigraphista_perl.inputData = $('#epigraphista-form').serialize();

    // Start Epigraphista Perl script from Electron:
    camelHarness.startScript(epigraphista_perl);
  } else {
    // Call Epigraphista Perl script from Perl Executing browser:
    if (typeof peb !== 'undefined') {
      $('#epigraphista-form').submit();
    }
  }
}

function successMessage() {
  // Display success message:
  alert(TS.fileSavedMessage);

  // Restore the user interface to its initial outlook:
  $('#container').html(originalContainerContents);
  initializeGui();
}
