// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

// Perl Executing Browser settings:
var pebSettings = {};

// Use the first Perl on PATH on Linux or
// a portable Perl on Windows:
if (navigator.userAgent.indexOf('Win') != -1) {
  pebSettings.perlInterpreter = 'perl/perl/bin/wperl.exe';
}

pebSettings.cutLabel = TS.contextMenuCutLabel;
pebSettings.copyLabel = TS.contextMenuCopyLabel;
pebSettings.pasteLabel = TS.contextMenuPasteLabel;
pebSettings.selectAllLabel = TS.contextMenuSelectAllLabel;
pebSettings.yesLabel = TS.yesLabel;
pebSettings.noLabel = TS.noLabel;
pebSettings.okLabel = TS.okLabel;
pebSettings.closeConfirmation = TS.closeConfirmation;

var xml_writer = {};
xml_writer.scriptRelativePath = 'epigraphista/perl/xml_writer.pl';

xml_writer.inputData = function() {
  var textFields = document.getElementsByTagName('textarea');

  var formObject = {};

  for (index = 0; index < textFields.length; index++) {
      if (textFields[index].value.length > 0) {
        formObject[textFields[index].name] = textFields[index].value;
      }
  }

  var formJson = JSON.stringify(formObject);

  return formJson;
}

xml_writer.stdoutFunction = function (data) {
  if (data == 'OK') {
    successMessage();
  }
}
