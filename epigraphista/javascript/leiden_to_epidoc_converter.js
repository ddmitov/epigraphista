// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

// Based on code from the
// Chapel Hill Electronic Text Converter - Javascript:
// https://wiki.digitalclassicist.org/Chapel_Hill_Electronic_Text_Converter
// https://sourceforge.net/projects/epidoc/files/OldFiles/chetc-js/r2/
// https://cds.library.brown.edu/projects/chet-c/chetc.html

// All names and numbers of text patterns here follow the table
// "Leiden/Leiden+ and EpiDoc Quick Reference (after Krummrey-Panciera)"
// by Gabriel Bodard 2017-03-17 available at
// https://svn.code.sf.net/p/epidoc/code/trunk/guidelines/msword/cheatsheet.pdf

// For development and testing of Regular Expressions go to the RegExr tool at
// https://regexr.com/

// For visual representation of Regular Expressions go to the Regexper toool at
// https://regexper.com/

const unicodeBlocks =
  'a-zA-Z' + // Basic Latin
  '\u0080-\u00ff' + // Latin-1 Supplement
  '\u0180-\u024f' + // Latin Extended-B
  '\u1e00-\u1eff' + // Latin Extended Additional
  '\u0370-\u03ff' + // Greek and Coptic
  '\u1f00-\u1fff' + // Greek Extended
  '\u0400-\u04ff' + // Cyrillic
  '\u0530-\u058f' + // Armenian
  '\u10a0-\u10ff' + // Georgian
  '\u2100-\u214f' + // Letterlike Symbols
  '\u2070-\u209f' + // Superscripts and Subscripts
  '\ufb00-\ufb4f' + // Alphabetic Presentation Forms
  '\uff00-\uffef' // Halfwidth and Fullwidth Forms

function convertLeidenToEpidoc (text) {
  // Convert only non-zero length text:
  if (text.length === 0) {
    return text
  }

  // ///////////////////////////////// //
  // ANGLED BRACKETS ENCLOSURE         //
  //                                   //
  // The following regular expression  //
  // must be executed before all other //
  // to avoid mismatching of XML tags! //
  // ///////////////////////////////// //

  // <ab>
  // IX.2 "Omitted letters added by editor"
  // Use the following Latin-only version
  // for Regexper visualization at https://regexper.com/
  // <([a-z]{1,})>
  text = text.replace(
    RegExp('<([' + unicodeBlocks + ']{1,})>', 'g'),
    '<supplied reason="omitted">$1</supplied>'
  )

  // /////////////////// //
  // BRACKETS ENCLOSURES //
  // /////////////////// //

  // ((ab))
  // X.3 "Expansion of symbol"
  // Use the following Latin-only version
  // for Regexper visualization at https://regexper.com/
  // \(\(([a-z]{1,})\)\)
  text = text.replace(
    RegExp('\\(\\(([' + unicodeBlocks + ']{1,})\\)\\)', 'g'),
    '<expan><ex>$1</ex></expan>'
  )

  // ////////////////////////// //
  // SQUARE BRACKETS ENCLOSURES //
  // ////////////////////////// //

  // [ab]
  // VIII.1 "Characters lost but restored"
  // Use the following Latin-only version
  // for Regexper visualization at https://regexper.com/
  // (^|[^[]{1,1})\[([a-z]{1,})\]([^\]]{1,1}|$)
  text = text.replace(
    RegExp(
      '(^|[^[]{1,1})\\[([' + unicodeBlocks + ']{1,})\\]([^\\]]{1,1}|$)',
      'g'
    ),
    '$1<supplied reason="lost">$2</supplied>$3'
  )

  // [[ab]]
  // V.1 "Erased"
  text = text.replace(
    /\[\[([^[\]]{1,})\]\]/g,
    '<del rend="erasure">$1</del>'
  )

  // [ca.2]
  // VIII.3 "Lacuna, approximate extent"
  text = text.replace(
    /\[ca\.([\d]{1,})\]/g,
    '<gap reason="lost" quantity="$1" unit="character" precision="low"/>'
  )

  // //////////////////////// //
  // CURLY BRACKETS ENCLOSURE //
  // //////////////////////// //

  // {ab}
  // IX.1 "Superfluous letters suppressed by editor"
  // Use the following Latin-only version
  // for Regexper visualization at https://regexper.com/
  // \{([a-z]{1,})\}
  text = text.replace(
    RegExp('\\{([' + unicodeBlocks + ']{1,})\\}', 'g'),
    '<surplus>$1</surplus>'
  )

  // //////////////// //
  // SLASH ENCLOSURES //
  // //////////////// //

  // /*!*/
  // XI.1 "Editor's note"
  text = text.replace(/\/\*!\*\//g, '<note>!</note>')

  // /*sic*/
  // XI.1 "Editor's note"
  text = text.replace(/\/\*sic\*\//g, '<note>sic</note>')

  // //////////// //
  // OTHER MARKUP //
  // //////////// //

  // vac.2
  // XI.2 "Space left on stone"
  text = text.replace(
    /([\n\s]{1})vac\.([\d]{1,})([\s\n]{1})/g,
    '$1<space quantity="$2" unit="character"/>$3'
  )

  // vac.?
  // XI.3 "Space on stone, extent unknown"
  text = text.replace(
    /([\n\s]{1})vac\.\?([\s\n]{1})/g,
    '$1<space extent="unknown" unit="character"/>$2'
  )

  // *leaf*
  // "Symbol"
  text = text.replace(
    /\*leaf\*/g,
    '<g type="leaf"/>'
  )

  // //////////// ///
  // LINE NUMBERS //
  // //////////// //

  const lines = text.split('\n')

  for (let lineNumber = 1; lineNumber < lines.length; lineNumber++) {
    text = text.replace(/\n/, '<lb n="' + (lineNumber + 1) + '"/>')
  }

  text = '<lb n="1"/>' + text

  return text
}

// /////////////// //
// TESTING STRINGS //
// /////////////// //

// Paste in the 'Leiden+ Inscription Text' textarea:

// 1.  <ab>    //
// 2.  ((ab))  //
// 3.  [[ab]]  //
// 4   [ab]    //
// 5.  [ca.2]  //
// 6.  {ab}    //
// 7.  /*!*/   //
// 8.  /*sic*/ //
// 9.  vac.2   //
// 10.  vac.?  //
// 11. *leaf*  //
