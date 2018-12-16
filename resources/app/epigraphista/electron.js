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

// This code is usefull only in Electron:
const {remote} = require('electron');
const {Menu, MenuItem} = remote;
const electronInputElementContextMenu = new Menu();

electronInputElementContextMenu.append(new MenuItem({
  label: TS.contextMenuCutLabel,
    click() {
      document.execCommand('cut');
    }
}));

electronInputElementContextMenu.append(new MenuItem({
  label: TS.contextMenuCopyLabel,
    click() {
      document.execCommand('copy');
    }
}));

electronInputElementContextMenu.append(new MenuItem({
  label: TS.contextMenuPasteLabel,
    click() {
      document.execCommand('paste');
    }
}));

electronInputElementContextMenu.append(new MenuItem({
  label: TS.contextMenuSelectAllLabel,
    click() {
      document.execCommand('selectAll');
    }
}));

const pageContextMenu = new Menu();

pageContextMenu.append(new MenuItem({
  label: TS.contextMenuPrint,
    click() {
      document.execCommand('print');
    }
}));

window.addEventListener('contextmenu', (contextMenu) => {
  contextMenu.preventDefault();
  if (contextMenu.target instanceof HTMLInputElement ||
      contextMenu.target instanceof HTMLTextAreaElement ||
      contextMenu.target.isContentEditable) {
    electronInputElementContextMenu.popup(remote.getCurrentWindow());
  } else {
    pageContextMenu.popup(remote.getCurrentWindow());
  }
}, false);

require('electron').ipcRenderer.on('checkUserInputBeforeClose', function() {
  var textEntered = false;

  var textFields = [];
  textFields = document.getElementsByTagName('textarea');

  for (i = 0; i < textFields.length; i++) {
    if (textFields[i].value.length > 0) {
      textEntered = true;
    }
  }

  var inputBoxes = [];
  inputBoxes = document.querySelectorAll('input[type=text]');

  for (i = 0; i < inputBoxes.length; i++) {
    if (inputBoxes[i].value.length > 0) {
      textEntered = true;
    }
  }

  if (textEntered == true) {
    var confirmation = closeConfirmation();
      if (confirmation == true) {
        const {ipcRenderer} = require('electron');
        ipcRenderer.send('asynchronous-message', 'close');
      }
  }

  if (textEntered == false) {
    const {ipcRenderer} = require('electron');
    ipcRenderer.send('asynchronous-message', 'close');
  }
});
