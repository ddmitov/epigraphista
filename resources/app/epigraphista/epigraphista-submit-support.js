
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
    supportText = supportText.replace(/\<material\>([^\<|\>]*)\<\/material\>/g, '');
    supportText = supportText.replace(/\<objectType\>([^\<|\>]*)\<\/objectType\>/g, '');
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

  // Check for any square bracket, that was opened, but was not closed or vice versa:
  epigraphicText = epigraphicText.replace(/\[((.)*)\]/g, '');
  epigraphicText = epigraphicText.replace(/\[((.)*)\n((.)*)\]/g, '\n');
  if (epigraphicText.match(/\[|\]/)) {
    // Display warning message:
    alert(TS.singleSquareBracketAlertMessage);
    return false;
  }

  // Convert to EpiDoc XML again if text is enetered at the last moment before file save:
  startLeidenToEpidocConversion('inscription');

  // Get the form data:
  var formData = $('#epigraphista-form').serialize();

  // Call Epigraphista Perl script from Electron or NW.js:
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

    // Get the full path of directory where Electron or NW.js binary is located:
    var binaryPath = process.execPath;
    var binaryDir = pathObject.dirname(binaryPath);

    // Get the full path of the application root directory:
    var applicationRootDirectory =
        pathObject.join(binaryDir, 'resources', 'app');

    // Epigraphista Perl script reltive path:
    var epigraphistaPerlScriptRelativePath =
        pathObject.join('perl', 'epigraphista.pl');

    // Compose the full path of the Epigraphista Perl script:
    var epigraphistaPerlScriptFullPath =
        pathObject.join(applicationRootDirectory,
          epigraphistaPerlScriptRelativePath);

    // Epigraphista Perl script object:
    var epigraphistaPerlScript = {};
    epigraphistaPerlScript.interpreter = 'perl';
    epigraphistaPerlScript.scriptFullPath = epigraphistaPerlScriptFullPath;

    epigraphistaPerlScript.stdoutFunction = function(stdout) {
      scriptEnded(stdout);
    };

    epigraphistaPerlScript.stderrFunction = function(stderr) {
      console.log('Epigraphista Perl script STDERR:\n' + stderr);
    };

    epigraphistaPerlScript.exitFunction = function(exitCode) {
      console.log('Epigraphista Perl script exited with exit code ' + exitCode);
    }

    epigraphistaPerlScript.requestMethod = 'POST';
    epigraphistaPerlScript.inputData = formData;

    // Start Epigraphista Perl script from NW.js or Electron:
    camelHarness.startScript(epigraphistaPerlScript);
  } else {
    // Call Epigraphista Perl script from Perl Executing browser:
    if (typeof peb !== null) {
      $('#epigraphista-form').submit();
    } else {
      // Call Epigraphista Perl script from a web browser:
      $.ajax({
        url: "perl/epigraphista.pl",
        data: formData,
        method: 'POST',
        dataType: 'text',
        success: function(data) {
          if (data == 'OK') {
            successMessage();
          }
        }
      });
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
