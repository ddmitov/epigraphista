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

function syntaxHighlightEpidocText(epidocText) {
  // Escape opening angle bracket - '<':
  epidocText = epidocText.replace(/\</g, "<font color='#000080'>&lt;");

  // Escape closing angle bracket - '>':
  epidocText = epidocText.replace(/\>/g, "&gt;</font>");

  // Highlight tag attributes:
  epidocText =
    epidocText.replace(/([a-z,A-Z]{1,})=(\"[a-z,A-Z,0-9]{1,}\")/g,
      "<font color='#008080'>$1=</font><font color='7F007F'>$2</font>");

  // Escape quotes:
  epidocText = epidocText.replace(/\"/g, "&quot;");

  // Indentation and line breaks:
  epidocText =
    epidocText.replace(/&lt;lb/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;lb");

  return epidocText;
}
