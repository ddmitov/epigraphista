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
  // ///////////////////////// //
  // DOUBLE BRACKET ENCLOSURES //
  // ///////////////////////// //

  // <<exemplum>> //
  // visual explanation:
  // https://regexper.com/#%3C%3C%28%28%3F%3A%5Ba-z%5D%7Cs%29%2B%29%3E%3E
  text = text.replace(
    RegExp('<<((?:[' + unicodeBlocks + ']|s)+)>>', 'g'),
    '<add place="overstrike">$1</add>'
  )

  // [[exemplum]] //
  // visual explanation:
  // https://regexper.com/#%5C%5B%5C%5B%28%28%3F%3A%5Ba-z%5D%7Cs%29%2B%29%5C%5D%5C%5D
  text = text.replace(
    RegExp('\\[\\[((?:[' + unicodeBlocks + ']|s)+)\\]\\]', 'g'),
    '<del rend="erasure">$1</del>'
  )

  // ((exemplum)) //
  // visual explanation:
  // https://regexper.com/#%5C%28%5C%28%28%28%3F%3A%5Ba-z%5D%7Cs%29%2B%29%5C%29%5C%29
  text = text.replace(
    RegExp('\\(\\(((?:[' + unicodeBlocks + ']|s)+)\\)\\)', 'g'),
    '<g type="$1"/>'
  )

  // ///////////////////////// //
  // SINGLE BRACKET ENCLOSURES //
  // ///////////////////////// //

  // <exemplum> //
  // visual explanation:
  // https://regexper.com/#%28%5B%5E%3C%5D%29%3C%28%28%3F%3A%5Ba-z%5D%7Cs%29%2B%29%3E%28%5B%5E%3E%5D%29
  text = text.replace(
    RegExp('([^<])<((?:[' + unicodeBlocks + ']|s)+)>([^>])', 'g'),
    '$1<supplied reason="omitted">$2</supplied>$3'
  )

  // {exemplum} //
  // visual explanation:
  // https://regexper.com/#%7B%28%28%3F%3A%5Ba-z%5D%7Cs%29%2B%29%7D
  text = text.replace(
    RegExp('{((?:[' + unicodeBlocks + ']|s)+)}', 'g'),
    '<sic>$1</sic>'
  )

  // [c.2] //
  // visual explanation:
  // https://regexper.com/#%5C%5Bc%5C.%28%28%3F%3A%5Cd%29%2B%29%5C%5D
  text = text.replace(
    /\[c\.((?:\d)+)\]/g,
    '<gap reason="lost" extent="$1" unit="character"/>'
  )

  // [-] //
  // visual explanation:
  // https://regexper.com/#%5C%5B-%5C%5D
  text = text.replace(
    /\[-\]/g,
    '<name><gap reason="lost" extent="unknown" unit="character"/></name>'
  )

  // [- -] //
  // visual explanation:
  // https://regexper.com/#%28%5E%7C%5Cn%29%7B1%7D%28%5Cs%29%7B0%2C%7D%5C%5B-%5Cs-%5C%5D%28%5Cs%29%7B0%2C%7D%28%5Cn%7C%24%29%7B1%7D
  text = text.replace(
    /(^|\n){1}(\s){0,}\[-\s-\](\s){0,}(\n|$){1}/g,
    '$1<gap reason="lost" extent="1" unit="line"/>\n'
  )

  // [- -] ? //
  // visual explanation:
  // https://regexper.com/#%28%5E%7C%5Cn%29%7B1%7D%28%5B%5Cs%5D%29%7B0%2C%7D%5C%5B-%5Cs-%5C%5D%5Cs%5C%3F%28%5Cn%7C%24%29%7B1%7D
  text = text.replace(
    /(^|\n){1}([\s]){0,}\[-\s-\]\s\?(\n|$){1}/g,
    '$1<gap reason="lost" extent="unknown" unit="line"/>'
  )

  // [--] //
  // visual explanation:
  // https://regexper.com/#%28%5B%5E%5B%5D%29%5C%5B%28%5B-%5D%2B%29%5C%5D%28%5B%5E%5C%5D%5D%29
  const lostCharactersRegExp = /([^[])\[([-]+)\]([^\]])/

  while (text.match(lostCharactersRegExp)) {
    text = text.replace(
      lostCharactersRegExp,
      '$1<gap reason="lost" extent="' +
        RegExp.$2.length +
        '" unit="character"/>$3'
    )
  }

  // [..] //
  // visual explanation:
  // https://regexper.com/#%5C%5B%28%5B.%5D%2B%29%5C%5D
  const lostRegExp = /\[([.]+)\]/

  while (text.match(lostRegExp)) {
    // Brackets are not counted!
    text = text.replace(
      lostRegExp,
      '<gap reason="lost" extent="' +
        (RegExp.lastMatch.length - 2) +
        '" unit="character"/>'
    )
  }

  // (!) //
  text = text.replace(/\(!\)/g, '<note>!</note>')

  // (scil. exemplum) //
  // visual explanation:
  // https://regexper.com/#%5C%28scil%5C.%5Cs%28%28%3F%3A%5Ba-z%5D%7Cs%29%2B%29%5C%29
  text = text.replace(
    RegExp('\\(scil\\.\\s((?:[' + unicodeBlocks + ']|s)+)\\)', 'g'),
    '<supplied reason="subaudible">$1</supplied>'
  )

  // exemplum(- -) //
  // visual explanation:
  // https://regexper.com/#%28%5CS%2B%29%5C%28%28-%5Cs*%29%2B%5C%29
  text = text.replace(/(\S+)\((-\s*)+\)/g, '<abbr>$1</abbr>')

  // (- -) //
  // TO DO
  text = text.replace(
    /\(((?:(-)|\s)+)\)/g,
    '<gap reason="omitted" extent="unknown" unit="character"/>'
  )

  // (vac.2)  //
  // (vac. 2) //
  // visual explanation:
  // https://regexper.com/#%5C%28vac%5C.%28%5Cs%29%7B0%2C%7D%28%5Cd%29%7B1%2C%7D%5C%29%28%5B%5Cs%5Cn%5D%7C%24%29%7B0%2C1%7D
  text = text.replace(
    /\(vac\.(\s){0,}(\d){1,}\)([\s\n]|$){0,1}/g,
    '<space extent="$2" unit="character"/>$3'
  )

  // (vac.?) //
  // visual explanation:
  // https://regexper.com/#%28%5E%7C%5B%5Cn%5Cs%5D%29%7B1%7D%28%5C%28vac%5C.%5C%3F%5C%29%29%28%5B%5Cs%5Cn%5D%7C%24%29%7B0%2C1%7D
  text = text.replace(
    /(^|[\n\s]){1}(\(vac\.\?\))([\s\n]|$){0,1}/g,
    '<space extent="unknown" unit="character"/>$3'
  )

  // vac.  //
  // vac   //
  // vacat //
  // visual explanation:
  // https://regexper.com/#%28%5E%7C%5B%5Cn%5Cs%5D%29%7B1%7Dvac%28%5C.%29%7B0%2C1%7D%28at%29%7B0%2C1%7D%28%5B%5Cs%5Cn%5D%7C%24%29%7B1%7D
  text = text.replace(
    /(^|[\n\s]){1}vac(\.){0,1}(at){0,1}([\s\n]|$){1}/g,
    '<space extent="unknown" unit="character"/>$4'
  )

  // (ex)em(plum) //
  // visual explanation:
  // https://regexper.com/#%5C%28%28%5Ba-z%5D%2B%29%5C%29%28%5Ba-z%5D%2B%29%5C%28%28%5Ba-z%5D%2B%29%5C%29
  text = text.replace(
    RegExp(
      '\\(([' + unicodeBlocks + ']+)\\)' +
      '([' + unicodeBlocks + ']+)' +
      '\\(([' + unicodeBlocks + ']+)\\)',
      'g'
    ),
    '<expan><ex>$1</ex><abbr>$2</abbr><ex>$3</ex></expan>'
  )

  // ex(em)plum //
  // visual explanation:
  // https://regexper.com/#%28%5Ba-z%5D%2B%29%5C%28%28%5Ba-z%5D%2B%29%5C%29%28%5Ba-z%5D%2B%29
  text = text.replace(
    RegExp(
      '([' + unicodeBlocks + ']+)' +
      '\\(([' + unicodeBlocks + ']+)\\)' +
      '([' + unicodeBlocks + ']+)',
      'g'
    ),
    '<expan><abbr>$1</abbr><ex>$2</ex><abbr>$3</abbr></expan>'
  )

  // (ex)emplum //
  // visual explanation:
  // https://regexper.com/#%5C%28%28%5Ba-z%5D%2B%29%5C%29%28%5Ba-z%5D%2B%29
  text = text.replace(
    RegExp(
      '\\(([' + unicodeBlocks + ']+)\\)' + '([' + unicodeBlocks + ']+)',
      'g'
    ),
    '<expan><ex>$1</ex><abbr>$2</abbr></expan>'
  )

  // ex(emplum) //
  // visual explanation:
  // https://regexper.com/#%28%5Ba-z%5D%2B%29%5C%28%28%5Ba-z%5D%2B%29%5C%29
  text = text.replace(
    RegExp(
      '([' + unicodeBlocks + ']+)' + '\\(([' + unicodeBlocks + ']+)\\)',
      'g'
    ),
    '<expan><abbr>$1</abbr><ex>$2</ex></expan>'
  )

  // (exemplum) //
  // TO DO
  text = text.replace(
    RegExp('\\(((?:[' + unicodeBlocks + ']|s)+)\\)', 'g'),
    '<expan><abbr><am><g type="symbol"/></am></abbr><ex>$1</ex></expan>'
  )

  // /////////////////////////// //
  // SINGLE CHARACTER ENCLOSURES //
  // /////////////////////////// //

  // 'exemplum' //
  // visual explanation:
  // https://regexper.com/#%5C'%28%3F%3A%5Ba-z%5D%7C%5Cs%29%2B%5C'
  text = text.replace(
    RegExp('\'((?:[' + unicodeBlocks + ']|\\s)+)\'', 'g'),
    '<add>$1</add>'
  )

  // ⌜exemplum⌝ //
  // TOP LEFT CORNER - Unicode 231C  //
  // TOP RIGHT CORNER - Unicode 231D //
  // visual explanation:
  // https://regexper.com/#%5C'%28%28%3F%3A%5Ba-z%5D%7C%5Cs%29%2B%29%5C'
  text = text.replace(
    RegExp('⌜(([' + unicodeBlocks + ']|\\s){1,})⌝', 'g'),
    '<choice><sic>$1</sic><corr>$1</corr></choice>'
  )

  // ///////////// //
  // OTHER MARKUPS //
  // ///////////// //

  // ++ //
  const illegibleRegExp = /((\+)+)/

  while (text.match(illegibleRegExp)) {
    text = text.replace(
      illegibleRegExp,
      '<gap reason="illegible" extent="' +
        RegExp.lastMatch.length +
        '" unit="character"/>'
    )
  }

  // ... //
  text = text.replace(/\.\.\./g, '<gap reason="ellipsis"/>')

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

// 1.  <<exemplum>>
// 2.  [[exemplum]]
// 3.  ((exemplum))
// 4.  <exemplum>
// 5.  {exemplum}
// 6.  [c.2]
// 7.  [-]
// 8.  [--]
// 9.  [..]
// 10. (!)
// 11. (scil. exemplum)
// 12. exemplum(- -)
// 13. (- -)
// 14. (vac.2)
// 15. (vac. 2)
// 16. (vac.?)
// 17. vac.
// 18. vac
// 19. vacat
// 20. (ex)em(plum)
// 21. ex(em)plum
// 22. (ex)emplum
// 23. ex(emplum)
// 24. (exemplum)
// 25. 'exemplum'
// 26. ⌜exemplum⌝
// 27. ++
// 28. ...

// Paste in the 'Inscription Text' textarea
// without the comment mark and with nothing else on the line:
// [- -]
// [- -] ?
