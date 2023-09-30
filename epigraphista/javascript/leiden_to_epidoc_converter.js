// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

// Based on code from the
// Chapel Hill Electronic Text Converter - Javascript:
// https://wiki.digitalclassicist.org/Chapel_Hill_Electronic_Text_Converter
// https://sourceforge.net/projects/epidoc/files/OldFiles/chetc-js/r2/
// https://cds.library.brown.edu/projects/chet-c/chetc.html

// Some helpful utilities for the development of Regular Expressions:
// https://regexr.com/
// https://regexper.com/
// https://pemistahl.github.io/grex-js/

// Unicode Character Search:
// https://www.fileformat.info/info/unicode/char/search.htm

const unicodeBlocks =
  '\u0041-\u007a' + // Basic Latin
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
  // Convert only non-zero length Leiden text:
  if (text.length === 0) {
    return text
  }

  // ////////////////////////// //
  // ANGLED BRACKETS ENCLOSURES //
  // ////////////////////////// //

  // The following regular expression must be executed before all other!

  // <exemplum> //
  // visual explanation:
  // https://regexper.com/#%3C%28%5Ba-z%5D%7B1%2C%7D%29%3E
  text = text.replace(
    RegExp('<([' + unicodeBlocks + ']{1,})>', 'g'),
    '<supplied reason="omitted">$1</supplied>'
  )

  // /////////////////// //
  // BRACKETS ENCLOSURES //
  // /////////////////// //

  // ((exemplum)) //
  // visual explanation:
  // https://regexper.com/#%5C%28%5C%28%28%5Ba-z%5D%7B1%2C%7D%29%5C%29%5C%29
  text = text.replace(
    RegExp('\\(\\(([' + unicodeBlocks + ']{1,})\\)\\)', 'g'),
    '<expan><ex>$1</ex></expan>'
  )

  // ////////////////////////// //
  // SQUARE BRACKETS ENCLOSURES //
  // ////////////////////////// //

  // [[exemplum]] //
  // visual explanation:
  // https://regexper.com/#%5C%5B%5C%5B%28%5Ba-z%5D%7B1%2C%7D%29%5C%5D%5C%5D
  text = text.replace(
    RegExp('\\[\\[([' + unicodeBlocks + ']{1,})\\]\\]', 'g'),
    '<del rend="erasure">$1</del>'
  )

  // [ca.2]  //
  // visual explanation:
  // https://regexper.com/#%5C%5Bca%5C.%28%5B%5Cd%5D%29%7B1%2C%7D%5C%5D
  text = text.replace(
    /\[ca\.([\d]){1,}\]/g,
    '<gap reason="lost" quantity="$1" unit="character" precision="low"/>'
  )

  // //////////////////////// //
  // CURLY BRACKETS ENCLOSURE //
  // //////////////////////// //

  // {exemplum} //
  // visual explanation:
  // https://regexper.com/#%5C%7B%28%5Ba-z%5D%7B1%2C%7D%29%5C%7D
  text = text.replace(
    RegExp('\\{([' + unicodeBlocks + ']{1,})\\}', 'g'),
    '<surplus>$1</surplus>'
  )

  // //////////// //
  // OTHER MARKUP //
  // //////////// //

  // /*!*/ //
  // visual explanation:
  // https://regexper.com/#%5C%2F%5C*!%5C*%5C%2F
  text = text.replace(/\/\*!\*\//g, '<note>!</note>')

  // /*sic*/ //
  // visual explanation:
  // https://regexper.com/#%5C%2F%5C*sic%5C*%5C%2F
  text = text.replace(/\/\*sic\*\//g, '<note>sic</note>')

  // vac.2 //
  // visual explanation:
  // https://regexper.com/#%28%5B%5Cn%5Cs%5D%7B1%7D%29vac%5C.%28%5B%5Cd%5D%7B1%2C%7D%29%28%5B%5Cs%5Cn%5D%7B1%7D%29
  text = text.replace(
    /([\n\s]{1})vac\.([\d]{1,})([\s\n]{1})/g,
    '$1<space quantity="$2" unit="character"/>$3'
  )

  // vac.? //
  // visual explanation:
  // https://regexper.com/#%28%5B%5Cn%5Cs%5D%7B1%7D%29vac%5C.%5C%3F%28%5B%5Cs%5Cn%5D%7B1%7D%29
  text = text.replace(
    /([\n\s]{1})vac\.\?([\s\n]{1})/g,
    '$1<space extent="unknown" unit="character"/>$2'
  )

  // *leaf* //
  text = text.replace(
    /\*leaf\*/g,
    '<g type="leaf"/>'
  )

  // //////////// //
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

// Paste in the 'Inscription Text' textarea:

// 1.  <exemplum>   //
// 2.  ((exemplum)) //
// 3.  [[exemplum]] //
// 4.  [ca.2]       //
// 5.  {exemplum}   //
// 6.  /*!*/        //
// 7.  /*sic*/      //
// 8.  vac.2        //
// 9.  vac.?        //
// 10. *leaf*       //
