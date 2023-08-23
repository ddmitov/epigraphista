// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

function startLeidenToEpidocConversion(elementId) {
  //Get focus:
  document.getElementById(elementId).focus();

  // Get the Leiden text and convert it to EpiDoc text:
  var leidenText = document.getElementById(elementId).value;
  var epidocXml = convertLeidenToEpidoc(leidenText);

  // Syntax highlight EpiDoc text:
  var epidocHtml = syntaxHighlightEpidocText(epidocXml);

  // Place all results in the HTML DOM tree:
  document.getElementById(elementId + "-xml").setAttribute("value", epidocXml);
  document.getElementById(elementId + "-html").innerHTML = epidocHtml;
}

function finalCheckAndSubmit() {
  // Check for title:
  var title = document.getElementById('title').value;

  if (title.length < 3) {
    alert(TS.noTitleAlertMessage);
    return false;
  }

  // Check the epigraphic text:
  var epigraphicText = document.getElementById('inscription').value;

  if (epigraphicText.length < 3) {
    alert(TS.noInscriptionAlertMessage);
    return false;
  }

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
