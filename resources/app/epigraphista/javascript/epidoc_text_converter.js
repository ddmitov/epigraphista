// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

// Based on code from the
// Chapel Hill Electronic Text Converter Javascript:
// https://wiki.digitalclassicist.org/Chapel_Hill_Electronic_Text_Converter
// https://sourceforge.net/projects/epidoc/files/OldFiles/chetc-js/r2/
// https://cds.library.brown.edu/projects/chet-c/chetc.html

// Some helpful utilities for the development of Regular Expressions:
// https://regexr.com/
// https://regexper.com/
// https://pemistahl.github.io/grex-js/

// Unicode Character Search:
// https://www.fileformat.info/info/unicode/char/search.htm

const unicodeBlocks = (
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
  '\uff00-\uffef'   // Halfwidth and Fullwidth Forms
);


function convertLeidenToEpidoc(text) {
  ///////////////////////////////
  // DOUBLE BRACKET ENCLOSURES //
  ///////////////////////////////

  // <<exemplum>> //
  text = text.replace(
    RegExp('<<((?:[' + unicodeBlocks + ']|\s)+)>>', 'g'),
    '<add place="overstrike">$1</add>'
  );

  // [[exemplum]] //
  text = text.replace(
    RegExp('\\[\\[((?:[' + unicodeBlocks + ']|\s)+)\\]\\]', 'g'),
    '<del rend="erasure">$1</del>'
  );

  // ((exemplum)) //
  text = text.replace(
    RegExp('\\(\\(((?:[' + unicodeBlocks + ']|\s)+)\\)\\)', 'g'),
    '<g type="$1"/>'
  );

  ///////////////////////////////
  // SINGLE BRACKET ENCLOSURES //
  ///////////////////////////////

  // <exemplum> //
  // '<exemplum>' will match, but '<<exemplum>>' will NOT match.
  text = text.replace(
    RegExp('([^<]){0,1}<((?:[' + unicodeBlocks + ']|\s)+)>([^>]|$)', 'g'),
    '$1<supplied reason="omitted">$2</supplied>$3'
  );

  // {exemplum} //
  text = text.replace(
    RegExp('\{((?:[' + unicodeBlocks + ']|\s)+)\}', 'g'),
    '<sic>$1</sic>'
  );

  // [c.2] //
  text = text.replace(
    /\[c\.((?:\d)+)\]/g,
    '<gap reason="lost" extent="$1" unit="character"/>'
  );

  // [-] //
  text = text.replace(
    /\[-\]/g,
    '<name><gap reason="lost" extent="unknown" unit="character"/></name>'
  );

  // [- -] //
  text = text.replace(
    /(^|\n){1}\[\-\s\-\](\s){0,}(\n|$){1}/g,
    '$1<gap reason="lost" extent="1" unit="line"/>$3\n'
  );

  // [- -] ? //
  text = text.replace(
    /(^|\n){1}\[\-\s\-\]\s\?(\n|$){1}/g,
    '$1<gap reason="lost" extent="unknown" unit="line"/>$3'
  );

  // [--] //
  var lostCharactersRegExp = /([^\[]){0,1}\[([\-]+)\]([^\]]){0,1}/;

  while (text.match(lostCharactersRegExp)) {
    text = text.replace(
      lostCharactersRegExp,
      '$1<gap reason="lost" extent="' + RegExp.$2.length + '" unit="character"/>$3'
    );
  }

  // [. .] //
  var lostRegExp = /\[([\.\s]+)\]/;

  while (text.match(lostRegExp)) {
    // Brackets are not counted!
    text = text.replace(
      lostRegExp,
      '<gap reason="lost" extent="' +
        (RegExp.lastMatch.length - 2) +
        '" unit="character"/>'
    );
  }

  // (!) //
  text = text.replace(
    /\(!\)/g,
    '<note>!</note>'
  );

  // (scil. exemplum) //
  text = text.replace(
    RegExp('\\(scil. ((?:[' + unicodeBlocks + ']|\s)+)\\)', 'g'),
    '<supplied reason="subaudible">$1</supplied>'
  );

  // exemplum(- -) //
  text = text.replace(
    /(\S+)\((-\s*)+\)/g,
    '<abbr>$1</abbr>'
  );

  // (- -) //
  text = text.replace(
    /\(((?:(-)|\s)+)\)/g,
    '<gap reason="omitted" extent="unknown" unit="character"/>'
  );

  // (vac.?) //
  // vac.    //
  // vac     //
  // vacat   //
  text = text.replace(
    /(\(){0,1}vac(\.){0,1}(at){0,1}((\?)){0,1}(\){0,1}[^\.\d])/g,
    '<space extent="unknown" unit="character"/>'
  );

  // (vac.2)  //
  // (vac. 2) //
  text = text.replace(
    /\(vac\.(\s){0,}(\d){1,}\)/g,
    '<space extent="$2" unit="character"/>'
  );

  // (ex)em(plum) //
  text = text.replace(
    RegExp(
      '\\(([' + unicodeBlocks + '0-9]+)\\)' +
      '([' + unicodeBlocks + '0-9]+)' +
      '\\(([' + unicodeBlocks + '0-9]+)\\)',
      'g'
    ),
    '<expan><ex>$1</ex><abbr>$2</abbr><ex>$3</ex></expan>'
  );

  // ex(em)plum //
  text = text.replace(
    RegExp(
      '([' + unicodeBlocks + '0-9]+)' +
      '\\(([' + unicodeBlocks + '0-9]+)\\)' +
      '([' + unicodeBlocks + '0-9]+)',
      'g'
    ),
    '<expan><abbr>$1</abbr><ex>$2</ex><abbr>$3</abbr></expan>'
  );

  // (ex)emplum //
  text = text.replace(
    RegExp(
      '\\(([' + unicodeBlocks + '0-9]+)\\)' +
      '([' + unicodeBlocks + '0-9]+)',
      'g'
    ),
    '<expan><ex>$1</ex><abbr>$2</abbr></expan>'
  );

  // ex(emplum) //
  text = text.replace(
    RegExp(
      '([' + unicodeBlocks + '0-9]+)' +
      '\\(([' + unicodeBlocks + '0-9]+)\\)',
      'g'
    ),
    '<expan><abbr>$1</abbr><ex>$2</ex></expan>'
  );

  // (exemplum) //
  text = text.replace(
    RegExp('\\(((?:[' + unicodeBlocks + ']|\s)+)\\)', 'g'),
    '<expan><abbr><am><g type="symbol"/></am></abbr><ex>$1</ex></expan>'
  );

  /////////////////////////////////
  // SINGLE CHARACTER ENCLOSURES //
  /////////////////////////////////

  // 'exemplum' //
  text = text.replace(
    RegExp('\'((?:[' + unicodeBlocks + ']|\s)+)\'', 'g'),
    '<add>$1</add>'
  );

  // TOP LEFT CORNER - Unicode 231C  //
  // TOP RIGHT CORNER - Unicode 231D //
  // ⌜exemplum⌝ //
  text = text.replace(
    RegExp('⌜((?:[' + unicodeBlocks + ']|\s)+)⌝', 'g'),
    '<choice><sic>$1</sic><corr>$1</corr></choice>'
  );

  ///////////////////
  // OTHER MARKUPS //
  ///////////////////

  // ++ //
  var illegibleRegExp = /((\+)+)/;

  while (text.match(illegibleRegExp)) {
    text = text.replace(
      illegibleRegExp,
      '<gap reason="illegible" extent="' +
        RegExp.lastMatch.length + '" unit="character"/>'
    );
  }

  // ... //
  text = text.replace(
    /\.\.\./g,
    '<gap reason="ellipsis"/>'
  );

  // exempl- //
  text = text.replace(
    RegExp('([' + unicodeBlocks + '])(?:-)\n', 'g'),
    '$1<lb type="worddiv"/>'
  );

  //////////////////
  // LINE NUMBERS //
  //////////////////

  var lines = text.split('\n');

  for (var lineNumber = 1; lineNumber < lines.length; lineNumber++) {
    text = text.replace(
      /\n/,
      '<lb n="' + (lineNumber + 1) + '"/>'
    );
  }

  text = '<lb n="1"/>' + text;

  return text;
}

/////////////////////
// TESTING STRINGS //
/////////////////////

// Paste in the 'Inscription Text' textarea:

//  1.  <<exemplum>>
//  2.  [[exemplum]]
//  3.  ((exemplum))
//  4.  <exemplum>
//  5.  {exemplum}
//  6.  [c.2]
//  7.  [-]
//  8.  [- -]
//  9.  [- -] ?
//  10. [--]
//  11. [. .]
//  12. (!)
//  13. (scil. exemplum)
//  14. exemplum(- -)
//  15. (- -)
//  16. (vac.?)
//  17. vac.
//  18. vac
//  19. vacat
//  20. (vac.2)
//  21. (vac. 2)
//  22. (ex)em(plum)
//  23. ex(em)plum
//  24. (ex)emplum
//  25. ex(emplum)
//  26. (exemplum)
//  27. 'exemplum'
//  28. ⌜exemplum⌝
//  29. ++
//  30. ...
//  31. exempl-
