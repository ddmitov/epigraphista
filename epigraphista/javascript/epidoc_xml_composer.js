// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

function startLeidenToEpidocConversion () {
  // Get the Leiden text and convert it to EpiDoc text:
  const leidenText = document.getElementById('inscription').value

  if (leidenText.length === 0) {
    document.getElementById('inscription-xml').value = ''

    clearElementGroup('inscription-html')
  }

  if (leidenText.length > 0) {
    const epidocXml = convertLeidenToEpidoc(leidenText)

    // Place all results in the HTML DOM tree:
    document.getElementById('inscription-xml').value = epidocXml

    // Syntax highlight EpiDoc text:
    const epidocHtml = syntaxHighlightEpidocText(epidocXml)

    // Syntax-highlighted EpiDoc text is displayed only
    // if Leiden text is enetered in the 'inscription' textarrea:
    if (document.getElementById('inscription-html')) {
      document.getElementById('inscription-html').innerHTML = epidocHtml
    } else {
      const inscriptionHtmlContents =
        '<pre id="inscription-html" style="form-control"></pre>'

      const placeholderElement = document.getElementById(
        'inscription-html-group'
      )
      placeholderElement.innerHTML = inscriptionHtmlContents

      document.getElementById('inscription-html').innerHTML = epidocHtml
    }
  }
}

function saveEpiDocXml () {
  // Check for title:
  const title = document.getElementById('title').value

  if (title.length < 3) {
    alert('Please, provide a title for the inscription!')
    return false
  }

  // Check for epigraphic text:
  const epigraphicText = document.getElementById('inscription').value

  if (epigraphicText.length < 3) {
    alert('Please, provide the text of the inscription!')
    return false
  }

  // Convert to EpiDoc XML again
  // if text is enetered at the last moment before file save:
  startLeidenToEpidocConversion()

  // Fill the EpiDoc XML template with user-provided data:
  const containerElement = document.getElementById('container')
  const textFields = containerElement.getElementsByTagName('textarea')

  for (let index = 0; index < textFields.length; index++) {
    window.xmlTemplate = window.xmlTemplate.replace(
      RegExp('\\{' + textFields[index].id + '\\}', 'g'),
      textFields[index].value
    )
  }

  window.xmlTemplate = window.xmlTemplate.replace(
    /[\s|\n]{0,}\{[\w|-]{1,}\}[\s|\n]{0,}/g,
    ''
  )

  // Create a hidden link and click it programattically
  // to initiate EpiDoc XML file save:
  let filename = document.getElementById('title').value
  filename = filename.replace(/([\\s]{1,})/g, '_')

  const link = document.createElement('a')

  link.setAttribute('id', 'hidden-download-link')
  link.style.visibility = 'hidden'

  link.setAttribute(
    'href',
    'data:text/xml;charset=utf-8,' + encodeURIComponent(window.xmlTemplate)
  )

  link.setAttribute('download', filename + '.xml')

  const buttonsElement = document.getElementById('main-button-group')
  buttonsElement.appendChild(link)

  document.getElementById('hidden-download-link').click()
}