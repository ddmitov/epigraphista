// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

let originalContainerContents = null

function initializeLayout () {
  // Set autoresize for all textarrea elements:
  const textArreas = document.getElementsByTagName('textarea')

  for (let index = 0; index < textArreas.length; index++) {
    textArreas[index].setAttribute(
      'style',
      'height:' + textArreas[index].scrollHeight + 'px; overflow-y: hidden;'
    )
    textArreas[index].addEventListener('input', autoResizeTextArrea, false)
  }

  // Copy the original contents of the page.
  // It will be restored without reload after inscription text is successfully saved.
  originalContainerContents =
    document.getElementsByClassName('container-fluid')[0].innerHTML
}

function autoResizeTextArrea () {
  this.style.height = 0
  this.style.height = this.scrollHeight + 'px'
}

function getInitialLayout () {
  // Restore the user interface to its initial outlook:
  document.getElementById('container').innerHTML = originalContainerContents
  initializeLayout()
}
