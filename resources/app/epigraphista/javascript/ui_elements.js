// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

function addSupportGroup() {
  var buttonsRowElement = document.createElement("div");
  buttonsRowElement.setAttribute("class", "row buttons-row");

  var buttonsCode = "" +
    "<input type='button' id='material-button' value='" +
      TS.supportGroupMaterialButtonLabel + "' class='btn btn-success btn-xs'>" +
    "<input type='button' id='object-type-button' value='" +
      TS.supportGroupCategoryButtonLabel + "' class='btn btn-success btn-xs'>";
  buttonsRowElement.innerHTML = buttonsCode;

  var placeholderElement = document.getElementById("support-group");
  placeholderElement.appendChild(buttonsRowElement);

  $('#material-button').click(function() {
    $('#support')
    .selection('insert', {text: '<material>', mode: 'before'})
    .selection('insert', {text: '</material>', mode: 'after'});
  });

  $('#object-type-button').click(function() {
    $('#support')
    .selection('insert', {text: '<objectType>', mode: 'before'})
    .selection('insert', {text: '</objectType>', mode: 'after'});
  });

  addTextAreaElement('support', TS.supportGroupSupportPlaceholder,
    'full', 'greek', 'additional-keyboard', 'optional');
}
