// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

// Polytonic Greek typesetting help:
function toggleGreekKeyboardHelp(partialDivName) {
  var greekKeyboardHelpContents = "" +
    "<fieldset class='letter-box'><p class='letter-box-p'>Q&nbsp;<font color='red'>Θ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>W&nbsp;<font color='red'>Ω</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>E&nbsp;<font color='red'>Ε</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>R&nbsp;<font color='red'>Ρ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>T&nbsp;<font color='red'>Τ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>Y&nbsp;<font color='red'>Ψ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>U&nbsp;<font color='red'>Υ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>I&nbsp;<font color='red'>Ι</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>O&nbsp;<font color='red'>Ο</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>P&nbsp;<font color='red'>Π</font></p></fieldset>" +
    "<br>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>A&nbsp;<font color='red'>Α</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>S&nbsp;<font color='red'>Σ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>D&nbsp;<font color='red'>Δ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>F&nbsp;<font color='red'>Φ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>G&nbsp;<font color='red'>Γ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>H&nbsp;<font color='red'>Η</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>J&nbsp;<font color='red'>Σ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>K&nbsp;<font color='red'>Κ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>L&nbsp;<font color='red'>Λ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>;&nbsp;<font color='red'>·</font></p></fieldset>" +
    "<br>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>Z&nbsp;<font color='red'>Ζ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>X&nbsp;<font color='red'>Χ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>C&nbsp;<font color='red'>Ξ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>V&nbsp;<font color='red'>Ϝ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>B&nbsp;<font color='red'>Β</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>N&nbsp;<font color='red'>Ν</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>M&nbsp;<font color='red'>Μ</font></p></fieldset>" +
    "<br>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>a/&nbsp;<font color='red'>ά</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>a\\&nbsp;<font color='red'>ὰ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>a=&nbsp;<font color='red'>ᾶ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>a)&nbsp;<font color='red'>ἀ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>a(&nbsp;<font color='red'>ἁ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>a|&nbsp;<font color='red'>ᾳ</font></p></fieldset>" +
    "<fieldset class='letter-box'><p class='letter-box-p'>i+&nbsp;<font color='red'>ϊ</font></p></fieldset>" +
    "<br>";

  var placeholderElement = document.getElementById(partialDivName + "-greek-keyboard-help");
  var checkboxElement = document.getElementById(partialDivName + "-switch-greek");

  if (placeholderElement.innerHTML.length == 0) {
    placeholderElement.innerHTML = greekKeyboardHelpContents;
    placeholderElement.style.marginBottom = "10px";
    checkboxElement.checked = true;
  } else {
    placeholderElement.innerHTML = "";
    placeholderElement.style.marginBottom = "0px";
  }
}

// Additional keyboard buttons:
function toggleAdditionalKeyboard(placeholderId, target) {
  var additionalKeyboardRowContents = "" +
    "<input type='button' value='ϐ' onClick=\"javascript:insertLetter('" + target + "', 'ϐ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
    "<input type='button' value='ϲ' onClick=\"javascript:insertLetter('" + target + "', 'ϲ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
    "<input type='button' value='Ϛ' onClick=\"javascript:insertLetter('" + target + "', 'Ϛ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
    "<input type='button' value='ϛ' onClick=\"javascript:insertLetter('" + target + "', 'ϛ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
    "<input type='button' value='Ϟ' onClick=\"javascript:insertLetter('" + target + "', 'Ϟ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
    "<input type='button' value='ϟ' onClick=\"javascript:insertLetter('" + target + "', 'ϟ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
    "<input type='button' value='Ϡ' onClick=\"javascript:insertLetter('" + target + "', 'Ϡ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;" +
    "<input type='button' value='ϡ' onClick=\"javascript:insertLetter('" + target + "', 'ϡ')\" class='btn btn-success btn-xs btn-letters'>&nbsp;";
    // "&nbsp;&nbsp;&nbsp;" +
    // "<br>" +

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

// Additional keyboard code:
function insertLetter(targetId, letter) {
  var cursorPosition = $('#' + targetId).prop('selectionStart');
  var value = $('#' + targetId).val();
  var textBefore = value.substring(0, cursorPosition);
  var textAfter  = value.substring(cursorPosition, value.length);

  $('#' + targetId).val(textBefore + letter + textAfter);
  $('#' + targetId).prop("selectionStart", cursorPosition + 1);
}
