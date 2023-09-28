// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

let originalContainerContents = null

function initializeLayout () {
  // Create the user interface elements from the EpiDoc XML template:
  const buttonTemplate = document.getElementById('button-template')
  const buttonContainer = document.getElementById('button-elements')

  // visual explanation:
  // https://regexper.com/#%5C%7B%5B%5E%7B%7D%5D%7B0%2C%7D%5C%7D
  const jsonSnippetRegExp = /\{[^{}]{0,}\}/g
  const jsonSnippets = window.xmlTemplate.match(jsonSnippetRegExp)

  for (let index = 0; index < jsonSnippets.length; index++) {
    const inputObject = JSON.parse(jsonSnippets[index])

    if (inputObject.description != null) {
      const buttonElement = buttonTemplate.content.cloneNode(true)

      buttonElement.querySelector('input').setAttribute(
        'id', inputObject.id + '-button'
      )
      buttonElement.querySelector('input').setAttribute(
        'value', inputObject.description
      )

      buttonElement.querySelector('input').setAttribute(
        'onClick',
        'javascript:addTextAreaElement(\'' +
          inputObject.id +
          '\', \'' +
          inputObject.description +
        '\')'
      )

      buttonContainer.appendChild(buttonElement)
    }
  }

  // Set autoresize for all textarrea elements:
  setAutoResizeForTextArreas()

  // Copy the original contents of the page.
  // It will be restored without reload after inscription text is successfully saved.
  originalContainerContents =
    document.getElementsByClassName('container-fluid')[0].innerHTML
}

function setAutoResizeForTextArreas () {
  // Set autoresize for all textarrea elements:
  const textArreas = document.getElementsByTagName('textarea')

  for (let index = 0; index < textArreas.length; index++) {
    textArreas[index].setAttribute(
      'style',
      'height:' + textArreas[index].scrollHeight + 'px; overflow-y: hidden;'
    )
    textArreas[index].addEventListener('input', autoResizeTextArrea, false)
  }
}

function autoResizeTextArrea () {
  this.style.height = 0
  this.style.height = this.scrollHeight + 'px'
}

function getInitialLayout () {
  // Restore the user interface to its initial outlook:
  document.getElementById('container').innerHTML = originalContainerContents

  // Set autoresize for all textarrea elements:
  setAutoResizeForTextArreas()
}
