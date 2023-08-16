// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

function addTextAreaElement(label, placeholderText, size, greekSupport, additionalKeyboard) {
  var name = label.replace(/-/g, "_");

  var greekSupportCode01 = "" +
    "onkeypress=\"return convertCharToggle(this, document.epigraphista_form." + name + "_switch_greek.checked, event);\"" +
    "onkeyup=\"return convertStr(this, event);\"";
  var greekSupportCode02 = "" +
    "<span class='input-group-addon'>" +
      "<input type='checkbox' id='" + label + "-switch-greek' name='" + name + "_switch_greek'" +
        "title='" + TS.greekPolytonicInputTitle + "'/>&nbsp;" +
      "<a href=\"javascript:toggleGreekKeyboardHelp('" + label + "');\"" +
        "title='" + TS.greekPolytonicInputHelpTitle + "'>" + TS.greekPolytonicInputLabel + "</a>" +
    "</span>";
  var additionalKeyboardSupportCode = "" +
    "<span class='input-group-addon btn btn-info'" +
      "onclick=\"javascript:toggleAdditionalKeyboard('" + label + "-additional-keyboard', '" + label + "')\" title='" + TS.additionalKeyboardTitle + "'>" +
      "<span class='glyphicon glyphicon-font'></span>" +
    "</span>";
  var elementRemovalCode = "" +
    "<span class='input-group-addon btn btn-danger' onclick=\"javascript:clearElementGroup('" + label + "');\" title='" + TS.elementRemovalTitle + "'>" +
      "<span class='glyphicon glyphicon-remove'></span>" +
    "</span>";

  if (greekSupport == null) {
    greekSupportCode01 = "";
    greekSupportCode02 = "";
  }
  if (additionalKeyboard == null) {
    additionalKeyboardSupportCode = "";
  }

  var textElementContents = "" +
    "<textarea rows='1' id='" + label + "' name='" + name + "' class='form-control greek input-text' spellcheck='false'" +
      "title='" + placeholderText + "' placeholder='" + placeholderText + "'" +
      greekSupportCode01 + ">" +
    "</textarea>" +
    greekSupportCode02 +
    additionalKeyboardSupportCode +
    elementRemovalCode;

  var textElementInputGroup = document.createElement("div");
  textElementInputGroup.setAttribute("class", "input-group");
  textElementInputGroup.innerHTML = textElementContents;

  var textElementBox = document.createElement("div");
  if (size == "full") {
    textElementBox.setAttribute("class", "form-group col-xs-12");
  }
  if (size == "large") {
    textElementBox.setAttribute("class", "form-group col-xs-10 col-xs-offset-1");
  }
  if (size == "medium") {
    textElementBox.setAttribute("class", "form-group col-xs-8 col-xs-offset-2");
  }
  if (size == "small") {
    textElementBox.setAttribute("class", "form-group col-xs-6 col-xs-offset-3");
  }
  if (size == "tiny") {
    textElementBox.setAttribute("class", "form-group col-xs-4 col-xs-offset-4");
  }
  textElementBox.appendChild(textElementInputGroup);

  var textElementRow = document.createElement("div");
  textElementRow.setAttribute("class", "row");
  textElementRow.appendChild(textElementBox);

  var placeholderElement = document.getElementById(label + "-group");

  if (greekSupport == "greek") {
    var textElementGreekKeyboardHelpPlaceholder = document.createElement("div");
    textElementGreekKeyboardHelpPlaceholder.setAttribute("id", label + "-greek-keyboard-help");
    textElementGreekKeyboardHelpPlaceholder.setAttribute("class", "greek greek-help");
    placeholderElement.appendChild(textElementGreekKeyboardHelpPlaceholder);
  }

  if (additionalKeyboard == "additional-keyboard") {
    var textElementAdditionalKeyboardPlaceholder = document.createElement("div");
    textElementAdditionalKeyboardPlaceholder.setAttribute("id", label + "-additional-keyboard");
    placeholderElement.appendChild(textElementAdditionalKeyboardPlaceholder);
  }

  placeholderElement.appendChild(textElementRow);

  $("#" + label).autoResize();

  $("#" + label).on('paste', function(e){
    setTimeout(function () {
      jQuery("#" + label).trigger('keyup');
    }, 150);
  });

  var buttonToDisable = document.getElementById(label + "-button");
  buttonToDisable.setAttribute("class", "btn btn-info btn-xs disabled");
  buttonToDisable.disabled = true;
}

function clearElementGroup(partialId){
  var placeholderElement = document.getElementById(partialId + "-group");
  var textEntered = false;
  var textFields = new Array();
  textFields = placeholderElement.getElementsByTagName('textarea');

  for (i = 0; i < textFields.length; i++) {
    if (textFields[i].value.length > 0) {
      textEntered = true;
    }
  }

  if (textEntered == true) {
    alertify.set({labels: {ok : TS.yesLabel, cancel : TS.noLabel}});
    alertify.set({buttonFocus: "cancel"});
    alertify.confirm(TS.elementRemovalConfirmMessage, function (confirmation) {
      if (confirmation) {
        while (placeholderElement.hasChildNodes()) {
          placeholderElement.removeChild(placeholderElement.firstChild);
        }
        var buttonToEnable = document.getElementById(partialId + "-button");
        buttonToEnable.setAttribute("class", "btn btn-info btn-xs");
        buttonToEnable.disabled = false;
      }
    });
  }

  if (textEntered == false) {
    while (placeholderElement.hasChildNodes()) {
      placeholderElement.removeChild(placeholderElement.firstChild);
    }
    var buttonToEnable = document.getElementById(partialId + "-button");
    buttonToEnable.setAttribute("class", "btn btn-info btn-xs");
    buttonToEnable.disabled = false;
  }
}
