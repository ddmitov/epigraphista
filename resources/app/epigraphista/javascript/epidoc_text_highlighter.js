// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

function syntaxHighlightEpidocText(epidocText) {
  // Escape opening angle bracket '<':
  epidocText = epidocText.replace(/\</g, "<font color='#000080'>&lt;");

  // Escape closing angle bracket '>':
  epidocText = epidocText.replace(/\>/g, "&gt;</font>");

  // Highlight tag attributes:
  epidocText =
    epidocText.replace(/([a-z,A-Z]{1,})=(\"[a-z,A-Z,0-9]{1,}\")/g,
      "<font color='#008080'>$1=</font><font color='7F007F'>$2</font>");

  // Escape quotes:
  epidocText = epidocText.replace(/\"/g, "&quot;");

  // Line breaks, but not on the first line:
  epidocText = epidocText.replace(/&lt;lb/g, "<br>&lt;lb");
  epidocText = epidocText.replace(/<br>/, "");

  return epidocText;
}
