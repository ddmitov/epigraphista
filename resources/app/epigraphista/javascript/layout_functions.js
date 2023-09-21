// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.


function addTextAreaElement(id, placeholderText) {
  var name = id.replace(/-/g, "_");

  var textElementContents = "" +
    "<div class='input-group flex-nowrap'>" +
      "<textarea rows='1'" +
      " id='" + id + "'" +
      " name='" + name + "'" +
      " class='form-control'" +
      " spellcheck='false'" +
      " placeholder='" + placeholderText + "'></textarea>" +
      "<input type='button'" +
      " value='X'" +
      " title='Remove'" +
      " class='btn btn-info btn-input-group'" +
      " onclick=\"javascript:clearElementGroup('" + id + "')\">" +
    "</div>";

  var textElementInputGroup = document.createElement("div");
  textElementInputGroup.setAttribute("class", "input-group");
  textElementInputGroup.setAttribute("id", id + "-group");
  textElementInputGroup.innerHTML = textElementContents;

  var placeholderElement = document.getElementById("textarrea-elements");
  placeholderElement.appendChild(textElementInputGroup);

  textElement = document.getElementById(id);
  textElement.setAttribute(
    "style", "height:" + (textElement.scrollHeight) + "px; overflow-y: hidden;"
  );
  textElement.addEventListener("input", autoResizeTextArrea, false);

  var buttonToDisable = document.getElementById(id + "-button");
  buttonToDisable.setAttribute("class", "btn btn-info btn-xs disabled");
  buttonToDisable.disabled = true;
}


function clearElementGroup(id){
  var placeholderElement = document.getElementById(id + "-group");
  var textEntered = false;
  var textFields = new Array();

  textFields = placeholderElement.getElementsByTagName('textarea');

  for (index = 0; index < textFields.length; index++) {
    if (textFields[index].value.length > 0) {
      textEntered = true;
    }
  }

  var clearElement = false;

  if (textEntered == false) {
    clearElement = true;
  }

  if (textEntered == true) {
    clearElementConfirmation = confirm(
      'This element contains text and it will be lost!<br>' +
      'Are you sure you want to delete the selected element?'
    );

    if (clearElementConfirmation == true) {
      clearElement = true;
    }
  }

  if (clearElement == true) {
    placeholderElement.parentElement.removeChild(placeholderElement);

    var buttonToEnable = document.getElementById(id + "-button");
    buttonToEnable.setAttribute("class", "btn btn-info btn-xs");
    buttonToEnable.disabled = false;
  }
}


function startLeidenToEpidocConversion() {
  // Get the Leiden text and convert it to EpiDoc text:
  var leidenText = document.getElementById("inscription").value;

  if (leidenText.length == 0) {
    document.getElementById("inscription-xml").value = "";

    clearElementGroup("inscription-html");
  }

  if (leidenText.length > 0) {
    var epidocXml = convertLeidenToEpidoc(leidenText);

    // Place all results in the HTML DOM tree:
    document.getElementById("inscription-xml").value = epidocXml;

    // Syntax highlight EpiDoc text:
    var epidocHtml = syntaxHighlightEpidocText(epidocXml);

    // Syntax-highlighted EpiDoc text is displayed only
    // if Leiden text is enetered in the 'inscription' textarrea:
    if (document.getElementById("inscription-html")) {
      document.getElementById("inscription-html").innerHTML = epidocHtml;
    } else {
      var inscriptionHtmlContents = "<pre id='inscription-html' style='form-control'></pre>";

      placeholderElement = document.getElementById("inscription-html-group")
      placeholderElement.innerHTML = inscriptionHtmlContents;

      document.getElementById("inscription-html").innerHTML = epidocHtml;
    }
  }
}


function finalCheckAndSubmit() {
  // Check for title:
  var title = document.getElementById('title').value;

  if (title.length < 3) {
    alert('Please, enter the title of the inscription!');
    return false;
  }

  // Check the epigraphic text:
  var epigraphicText = document.getElementById('inscription').value;

  if (epigraphicText.length < 3) {
    alert('Please, enter the text of the inscription!');
    return false;
  }

  // Convert to EpiDoc XML again
  // if text is enetered at the last moment before file save:
  startLeidenToEpidocConversion();

  // Call Epigraphista Perl script:
  document.getElementById('epigraphista-form').submit();
}


function successMessage() {
  alert('A new EpiDoc XML file is successfully saved.');

  // Restore the user interface to its initial outlook:
  document.getElementById('container').innerHTML = originalContainerContents;
  initializeLayout();
}
