// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

// For visual representation of regular expressions go to the Regexper toool at
// https://regexper.com/

function prepareEpiDocXml () {
  // Get the Leiden text:
  const leidenText = document.getElementById('inscription-leiden').value

  // Display placeholder text if there is no EpiDoc XML fragment:
  if (leidenText.length === 0) {
    document.getElementById('inscription-html').innerHTML =
      'EpiDoc XML Inscription Fragment'
  }

  if (leidenText.length > 0) {
    // Convert the Leiden text to EpiDoc XML fragment:
    const epidocXml = convertLeidenToEpidoc(leidenText)

    // Place the inscription EpiDoc XML fragment in a hidden textarea:
    document.getElementById('inscription-xml').value = epidocXml

    // Syntax highlight the inscription EpiDoc XML fragment:
    const epidocHtml = syntaxHighlightXml(epidocXml)
    document.getElementById('inscription-html').innerHTML = epidocHtml
  }

  return true
}

function saveEpiDocXml () {
  // Check for filename:
  const filename = document.getElementById('filename').value

  if (filename.length < 1) {
    bootstrapAlert('Please, provide a filename for the inscription!')

    return false
  }

  // Check for inscription text:
  const inscriptionText = document.getElementById('inscription-leiden').value

  if (inscriptionText.length < 3) {
    bootstrapAlert('Please, provide the text of the inscription!')

    return false
  }

  // Fill the EpiDoc XML template with user-provided data:
  const containerElement = document.getElementById('container')
  const textFields = containerElement.getElementsByTagName('textarea')

  for (let index = 0; index < textFields.length; index++) {
    window.xmlTemplate = window.xmlTemplate.replace(
      RegExp(
        '[\\s\\n]{0,}\\{"id":[\\s]{0,}"' +
          textFields[index].id +
          '"[^{}]{0,}\\}[\\s\\n]{0,}'
      ),
      textFields[index].value
    )
  }

  window.xmlTemplate = window.xmlTemplate.replace(
    /[\s\n]{0,}\{[^{}]{0,}\}[\s\n]{0,}/g,
    ''
  )

  // Create a hidden link and click it programattically
  // to initiate EpiDoc XML file save:
  const link = document.createElement('a')

  link.setAttribute('id', 'hidden-download-link')
  link.style.visibility = 'hidden'

  link.setAttribute(
    'href',
    'data:text/xml;charset=utf-8,' + encodeURIComponent(window.xmlTemplate)
  )

  link.setAttribute('download', filename)

  const buttonsElement = document.getElementById('main-button-group')
  buttonsElement.appendChild(link)

  document.getElementById('hidden-download-link').click()

  return true
}
