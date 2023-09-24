// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

function syntaxHighlightEpidocText (epidocText) {
  // Escape opening angle bracket '<':
  epidocText = epidocText.replace(/</g, '<font color="red">&lt;')

  // Escape closing angle bracket '>':
  epidocText = epidocText.replace(/>/g, '&gt;</font>')

  // Escape quotes:
  epidocText = epidocText.replace(/'/g, '&quot;')
  epidocText = epidocText.replace(/"/g, '&quot;')

  // Line breaks, but not on the first line:
  epidocText = epidocText.replace(/&lt;lb/g, '<br>&lt;lb')
  epidocText = epidocText.replace(/<br>/, '')

  return epidocText
}
