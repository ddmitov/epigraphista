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

function finalCheckAndSubmit() {
  // Check for title:
  var title = document.getElementById('title').value;
  if (title.length < 3) {
    // Display warning message:
    alert(TS.noTitleAlertMessage);
    return false;
  }

  // Check XML tags of inscription description:
  if (document.getElementById('support')) {
    var supportText = document.getElementById('support').value;
    supportText =
      supportText.replace(/\<material\>([^\<|\>]*)\<\/material\>/g, '');
    supportText =
      supportText.replace(/\<objectType\>([^\<|\>]*)\<\/objectType\>/g, '');

    if (supportText.match(/\<|\>/)) {
      // Display warning message:
      alert(TS.invalidXMLTagAlertMessage);
      return false;
    }
  }

  // Check for epigraphic text:
  var epigraphicText = document.getElementById('inscription').value;
  if (epigraphicText.length < 3) {
    // Display warning message:
    alert(TS.noInscriptionAlertMessage);
    return false;
  }

  // Check for any square bracket,
  // that was opened, but was not closed or vice versa:
  epigraphicText = epigraphicText.replace(/\[((.)*)\]/g, '');
  epigraphicText = epigraphicText.replace(/\[((.)*)\n((.)*)\]/g, '\n');

  if (epigraphicText.match(/\[|\]/)) {
    // Display warning message:
    alert(TS.singleSquareBracketAlertMessage);
    return false;
  }

  // Convert to EpiDoc XML again
  // if text is enetered at the last moment before file save:
  startLeidenToEpidocConversion('inscription');

  // Call Epigraphista Perl script:
  $('#epigraphista-form').submit();
}

function successMessage() {
  // Display success message:
  alert(TS.fileSavedMessage);

  // Restore the user interface to its initial outlook:
  $('#container').html(originalContainerContents);
  initializeGui();
}
