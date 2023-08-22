// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

function finalCheckAndSubmit() {
  // Check for title:
  var title = document.getElementById('title').value;

  if (title.length < 3) {
    alert(TS.noTitleAlertMessage);
    return false;
  }

  // Check the XML tags of inscription description:
  // if (document.getElementById('support')) {
  //   var supportText = document.getElementById('support').value;
  
  //   supportText =
  //     supportText.replace(/\<material\>([^\<|\>]*)\<\/material\>/g, '');
  //   supportText =
  //     supportText.replace(/\<objectType\>([^\<|\>]*)\<\/objectType\>/g, '');

  //   if (supportText.match(/\<|\>/)) {
  //     alert(TS.invalidXMLTagAlertMessage);
  //     return false;
  //   }
  // }

  // Check the epigraphic text:
  var epigraphicText = document.getElementById('inscription').value;

  if (epigraphicText.length < 3) {
    alert(TS.noInscriptionAlertMessage);
    return false;
  }

  // Check for any square bracket,
  // that was opened, but was not closed or vice versa:
  // epigraphicText = epigraphicText.replace(/\[((.)*)\]/g, '');
  // epigraphicText = epigraphicText.replace(/\[((.)*)\n((.)*)\]/g, '\n');

  // if (epigraphicText.match(/\[|\]/)) {
  //   alert(TS.singleSquareBracketAlertMessage);
  //   return false;
  // }

  // Convert to EpiDoc XML again
  // if text is enetered at the last moment before file save:
  startLeidenToEpidocConversion('inscription');

  // Call Epigraphista Perl script:
  $('#epigraphista-form').submit();
}

function successMessage() {
  alert(TS.fileSavedMessage);

  // Restore the user interface to its initial outlook:
  $('#container').html(originalContainerContents);
  initializeGui();
}
