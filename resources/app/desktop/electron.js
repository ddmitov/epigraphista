// This code is usefull only in Electron:
const {remote} = require('electron');
const {Menu, MenuItem} = remote;
const inputElementContextMenu = new Menu();

inputElementContextMenu.append(new MenuItem({
  label: TS.contextMenuCutLabel,
    click() {
      document.execCommand('cut');
    }
}));

inputElementContextMenu.append(new MenuItem({
  label: TS.contextMenuCopyLabel,
    click() {
      document.execCommand('copy');
    }
}));

inputElementContextMenu.append(new MenuItem({
  label: TS.contextMenuPasteLabel,
    click() {
      document.execCommand('paste');
    }
}));

inputElementContextMenu.append(new MenuItem({
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
    inputElementContextMenu.popup(remote.getCurrentWindow());
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
