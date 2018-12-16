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

function startLeidenToEpidocConversion(elementId) {
  //Get focus:
  document.getElementById(elementId).focus();

  // Get the Leiden text and convert it to EpiDoc text:
  var leidenText = document.getElementById(elementId).value;
  var epidocXml = convertLeidenToEpidoc(leidenText);

  // Get the inner XML of the EpiDoc fragment:
  var epidocXmlFragment = epidocXml;
  // Add opening and closing tags:
  epidocXmlFragment = "<ab>" + epidocXmlFragment + "\n</ab>";
  // Syntax highlight EpiDoc text:
  var epidocHtml = syntaxHighlightEpidocText(epidocXmlFragment);

  // Place all results in the HTML DOM tree:
  document.getElementById(elementId + "-xml").setAttribute("value", epidocXml);
  document.getElementById(elementId + "-html").innerHTML = epidocHtml;
}
