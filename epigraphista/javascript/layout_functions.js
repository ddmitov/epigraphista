// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

function addTextAreaGroup (id, description) {
  const textElementContents = '' +
    '<div class="input-group flex-nowrap">' +
    '<textarea rows="1"' +
    ' id="' + id + '"' +
    ' title="' + description + '"' +
    ' placeholder="' + description + '"' +
    ' class="form-control"' +
    ' spellcheck="false"></textarea>' +
    '<input type="button"' +
    ' value="X"' +
    ' title="Remove"' +
    ' class="btn btn-info btn-input-group"' +
    ' onclick="javascript:clearTextAreaGroup(\'' + id + '\')">' +
    '</div>'

  const textElementInputGroup = document.createElement('div')
  textElementInputGroup.setAttribute('class', 'input-group')
  textElementInputGroup.setAttribute('id', id + '-group')
  textElementInputGroup.innerHTML = textElementContents

  const placeholderElement = document.getElementById('textarrea-elements')
  placeholderElement.appendChild(textElementInputGroup)

  const textElement = document.getElementById(id)
  textElement.setAttribute(
    'style',
    'height:' + textElement.scrollHeight + 'px; overflow-y: hidden;'
  )
  textElement.addEventListener('input', autoResizeTextArrea, false)

  const buttonToDisable = document.getElementById(id + '-button')
  buttonToDisable.setAttribute('class', 'btn btn-info btn-xs disabled')
  buttonToDisable.disabled = true

  return true
}

function clearTextAreaGroup (id) {
  const placeholderElement = document.getElementById(id + '-group')
  const textFields = placeholderElement.getElementsByTagName('textarea')

  if (textFields[0].value.length === 0) {
    removeElement(id)
  }

  if (textFields[0].value.length > 0) {
    const confirmText = 'Are you sure you want to delete this non-empty element?'
    bootstrapConfirm(confirmText, 'removeElement', id)
  }

  return true
}

function removeElement (id) {
  const placeholderElement = document.getElementById(id + '-group')
  placeholderElement.parentElement.removeChild(placeholderElement)

  const buttonToEnable = document.getElementById(id + '-button')
  buttonToEnable.setAttribute('class', 'btn btn-info btn-xs')
  buttonToEnable.disabled = false
}

function bootstrapAlert (alertText) {
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById('modal-alert')
  )

  document.getElementById('modal-alert-text').innerText = alertText

  modal.show()
}

function bootstrapConfirm (confirmText, confirmFunction, confirmFunctionParam) {
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById('modal-confirm')
  )

  document.getElementById('modal-confirm-text').innerText = confirmText

  const confirmButton = document.getElementById('modal-confirm-button')

  confirmButton.addEventListener('click', function () {
    window[confirmFunction](confirmFunctionParam)
  })

  modal.show()
}

function syntaxHighlightXml (xml) {
  // Escape angle brackets:
  xml = xml.replace(/</g, '&lt;')
  xml = xml.replace(/>/g, '&gt;')

  // Escape quotes:
  xml = xml.replace(/'/g, '&quot;')
  xml = xml.replace(/"/g, '&quot;')

  // Highlight XML tags:
  xml = xml.replace(/&lt;/g, '<font color="blue">&lt;')
  xml = xml.replace(/&gt;/g, '&gt;</font>')

  // Insert line breaks, but not on the first line:
  xml = xml.replace(/&lt;lb/g, '<br>&lt;lb')
  xml = xml.replace(/<br>/, '')

  return xml
}
