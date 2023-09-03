// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

// Buttons for additional letters:
function toggleAdditionalKeyboard(target) {
  placeholderId = target + "-additional-keyboard";

  var additionalKeyboardRowContents = "" +
    "<div class='row'>" +
      "<input type='button' value='Θ' onClick=\"javascript:insertLetter('" + target + "', 'Θ')\" class='btn btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ω' onClick=\"javascript:insertLetter('" + target + "', 'Ω')\" class='btn btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ε' onClick=\"javascript:insertLetter('" + target + "', 'Ε')\" class='btn btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ρ' onClick=\"javascript:insertLetter('" + target + "', 'Ρ')\" class='btn btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Τ' onClick=\"javascript:insertLetter('" + target + "', 'Τ')\" class='btn btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ψ' onClick=\"javascript:insertLetter('" + target + "', 'Ψ')\" class='btn btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Υ' onClick=\"javascript:insertLetter('" + target + "', 'Υ')\" class='btn btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ι' onClick=\"javascript:insertLetter('" + target + "', 'Ι')\" class='btn btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ο' onClick=\"javascript:insertLetter('" + target + "', 'Ο')\" class='btn btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Π' onClick=\"javascript:insertLetter('" + target + "', 'Π')\" class='btn btn-success btn-xs btn-letters'>" +
    "</div>" +
    "<div class='row'>" +
      "<input type='button' value='θ' onClick=\"javascript:insertLetter('" + target + "', 'θ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ω' onClick=\"javascript:insertLetter('" + target + "', 'ω')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ε' onClick=\"javascript:insertLetter('" + target + "', 'ε')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ρ' onClick=\"javascript:insertLetter('" + target + "', 'ρ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='τ' onClick=\"javascript:insertLetter('" + target + "', 'τ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ψ' onClick=\"javascript:insertLetter('" + target + "', 'ψ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='υ' onClick=\"javascript:insertLetter('" + target + "', 'υ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ι' onClick=\"javascript:insertLetter('" + target + "', 'ι')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ο' onClick=\"javascript:insertLetter('" + target + "', 'ο')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='π' onClick=\"javascript:insertLetter('" + target + "', 'π')\" class='btn-success btn-xs btn-letters'>" +
    "</div>" +
    "<div class='row'>" +
      "<input type='button' value='Α' onClick=\"javascript:insertLetter('" + target + "', 'Α')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Σ' onClick=\"javascript:insertLetter('" + target + "', 'Σ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Δ' onClick=\"javascript:insertLetter('" + target + "', 'Δ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Φ' onClick=\"javascript:insertLetter('" + target + "', 'Φ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Γ' onClick=\"javascript:insertLetter('" + target + "', 'Γ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Η' onClick=\"javascript:insertLetter('" + target + "', 'Η')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Σ' onClick=\"javascript:insertLetter('" + target + "', 'Σ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Κ' onClick=\"javascript:insertLetter('" + target + "', 'Κ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Λ' onClick=\"javascript:insertLetter('" + target + "', 'Λ')\" class='btn-success btn-xs btn-letters'>" +
    "</div>" +
    "<div class='row'>" +
      "<input type='button' value='α' onClick=\"javascript:insertLetter('" + target + "', 'α')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='σ' onClick=\"javascript:insertLetter('" + target + "', 'σ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='δ' onClick=\"javascript:insertLetter('" + target + "', 'δ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='φ' onClick=\"javascript:insertLetter('" + target + "', 'φ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='γ' onClick=\"javascript:insertLetter('" + target + "', 'γ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='η' onClick=\"javascript:insertLetter('" + target + "', 'η')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='σ' onClick=\"javascript:insertLetter('" + target + "', 'σ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='κ' onClick=\"javascript:insertLetter('" + target + "', 'κ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='λ' onClick=\"javascript:insertLetter('" + target + "', 'λ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='·' onClick=\"javascript:insertLetter('" + target + "', '·')\" class='btn-success btn-xs btn-letters'>" +
    "</div>" +
    "<div class='row'>" +
      
      "<input type='button' value='Ζ' onClick=\"javascript:insertLetter('" + target + "', 'Ζ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Χ' onClick=\"javascript:insertLetter('" + target + "', 'Χ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ξ' onClick=\"javascript:insertLetter('" + target + "', 'Ξ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ϝ' onClick=\"javascript:insertLetter('" + target + "', 'Ϝ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Β' onClick=\"javascript:insertLetter('" + target + "', 'Β')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ν' onClick=\"javascript:insertLetter('" + target + "', 'Ν')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Μ' onClick=\"javascript:insertLetter('" + target + "', 'Μ')\" class='btn-success btn-xs btn-letters'>" +
    "</div>" +
    "<div class='row'>" +
      "<input type='button' value='ζ' onClick=\"javascript:insertLetter('" + target + "', 'ζ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='χ' onClick=\"javascript:insertLetter('" + target + "', 'χ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ξ' onClick=\"javascript:insertLetter('" + target + "', 'ξ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ϝ' onClick=\"javascript:insertLetter('" + target + "', 'ϝ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='β' onClick=\"javascript:insertLetter('" + target + "', 'β')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ν' onClick=\"javascript:insertLetter('" + target + "', 'ν')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='μ' onClick=\"javascript:insertLetter('" + target + "', 'μ')\" class='btn-success btn-xs btn-letters'>" +
    "</div>" +
    "<div class='row'>" +
      "<input type='button' value='ϐ' onClick=\"javascript:insertLetter('" + target + "', 'ϐ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ϲ' onClick=\"javascript:insertLetter('" + target + "', 'ϲ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ϛ' onClick=\"javascript:insertLetter('" + target + "', 'Ϛ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ϛ' onClick=\"javascript:insertLetter('" + target + "', 'ϛ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ϟ' onClick=\"javascript:insertLetter('" + target + "', 'Ϟ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ϟ' onClick=\"javascript:insertLetter('" + target + "', 'ϟ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='Ϡ' onClick=\"javascript:insertLetter('" + target + "', 'Ϡ')\" class='btn-success btn-xs btn-letters'>" +
      "<input type='button' value='ϡ' onClick=\"javascript:insertLetter('" + target + "', 'ϡ')\" class='btn-success btn-xs btn-letters'>" +
    "</div>";

  var rowBox = document.createElement("div");
  rowBox.setAttribute("class", "form-group col-xs-12");
  rowBox.innerHTML = additionalKeyboardRowContents;

  var row = document.createElement("div");
  row.setAttribute("class", "row");
  row.appendChild(rowBox);

  var placeholderElement = document.getElementById(placeholderId);

  if (!placeholderElement.hasChildNodes()) {
    placeholderElement.appendChild(row);
  } else {
    while (placeholderElement.hasChildNodes()) {
      placeholderElement.removeChild(placeholderElement.firstChild);
    }
  }
}

// Insert letter in a textarea:
function insertLetter (targetElementId, letter) {
  var targetElement = document.getElementById(targetElementId);
  const [start, end] = [targetElement.selectionStart, targetElement.selectionEnd];

  targetElement.setRangeText(letter, start, end, 'end');

  if (targetElementId == 'inscription') {
    startLeidenToEpidocConversion();
  }
}
