// Epigraphista version 0.2.0
// EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018.

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

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
