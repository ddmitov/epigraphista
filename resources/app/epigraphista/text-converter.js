// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

function convertLeidenToEpidoc(text) {
  var unicodeBlocks =
    '\u0041-\u005a\u0061-\u007a\u00aa\u00b5\u00ba\u00c0-\u00d6 ' +
    '\u00d8-\u00f6\u00f8-\u01ba\u01bc-\u01bf ' +
    '\u01c4-\u02ad\u0386\u0388-\u0481\u048c-\u0556\u0561-\u0587 ' +
    '\u10a0-\u10c5\u1e00-\u1fbc\u1fbe\u1fc2-\u1fcc ' +
    '\u1fd0-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ffc\u207f\u2102\u2107 ' +
    '\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126 ' +
    '\u2128\u212a-\u212d\u212f-\u2131\u2133\u2134\u2139\ufb00-\ufb17 ' +
    '\uff21-\uff3a\uff41-\uff5a';
  var unicodeLetters = '[' + unicodeBlocks + ']';
  var unicodeLettersAndDigits = '[' + unicodeBlocks + '0-9]';

  // SINGLE ANGLE BRACKET ENCLOSURES
  // The following three regular expressions will match
  // '<imp>', but '<<imp>>' will NOT match.
  text = text.replace(
    RegExp('([^<])<((?:' + unicodeLetters + '|\s)+)>([^>])', 'g'),
    '$1<supplied reason="omitted">$2</supplied>$3'
  );

  text = text.replace(
    RegExp('<((?:' + unicodeLetters + '|\s)+)>$', 'g'),
    '<supplied reason="omitted">$1</supplied>'
  );

  text = text.replace(
    RegExp('^<((?:' + unicodeLetters + '|\s)+)>', 'g'),
    '<supplied reason="omitted">$1</supplied>'
  );

  // DOUBLE CHARACTER ENCLOSURES
  // Double Bracket:
  text = text.replace(/\[\[((.)+)\]\]/g, '<del rend="erasure">$1</del>');

  // Double Angle Bracket:
  text = text.replace(/<<((.)+)>>/g, '<add place="overstrike">$1</add>');

  // Double Parentheses:
  text = text.replace(
    RegExp('\\(\\(((?:' + unicodeLetters + '|\s)+)\\)\\)', 'g'),
    '<g type="$1"/>'
  );

  // SINGLE CHARACTER ENCLOSURES
  // Curly Bracket:
  text = text.replace(
    RegExp('\{((?:' + unicodeLetters + '|\s)+)\}', 'g'),
    '<sic>$1</sic>'
  );

  // Corner Characters (Unicode Left 231C Right 231D):
  text = text.replace(
    RegExp('⌜((?:' + unicodeLetters + '|\s)+)⌝', 'g'),
    '<choice><sic>$1</sic><corr>$1</corr></choice>'
  );

  // Single Quotes:
  text = text.replace(
    RegExp('\'((?:' + unicodeLetters + '|\s)+)\'', 'g'),
    '<add>$1</add>'
  );

  // BRACKETS
  // [ - - ?]
  text = text.replace(
    /\s*\[-\s(?:[-\s\]]+)\?\]\s*(\n)*/g,
    '<gap reason="lost" extent="1" unit="line"/>'
  );

  // [- -] ?
  // followed by space and followed by one or more new line character(s)
  text = text.replace(
    /-\s(?:[-\s\]]+)\?\s*(\n)*/g,
    '<gap reason="lost" extent="unknown" unit="line"/>'
  );

  // [-]
  text = text.replace(
    /\[-\]/g,
    '<name><gap reason="lost" extent="unknown" unit="character"/></name>'
  );

  // space [- -] space newline
  text = text.replace(
    /\s*\[-\s(?:[-\s\]]+)\]\s*(\n)*/g,
    '<gap reason="lost" extent="1" unit="line"/>$1'
  );

  // [--]
  var lostCharactersRegExp = /([^\[]*)\[([-\s\]]+)\]/;
  while (text.match(lostCharactersRegExp)) {
    // The length of the second group of characters
    // within the regular expression is measured.
    // ([^\[]*)  -->  first group of characters
    // [^\[]*  --> negative matching:
    // no left square bracket could be placed
    // before the opening left square bracket,
    // so [--] will match, but [[--]], or erasure, will NOT match.
    // Any other character repeated any number of times (*) will match.
    // ([-\s\]]+)  -->  second group of characters
    // \[  -->  escaped, or litteral, left square bracket
    // \]  -->  escaped, or litteral, right square bracket
    text = text.replace(
      lostCharactersRegExp,
      '$1<gap reason="lost" extent="' + RegExp.$2.length + '" unit="character"/>'
    );
  }

  // [. .]
  var lostRegExp = /\[([\.\s]+)\]/;
  while (text.match(lostRegExp)) {
    // Brackets are not counted!
    text = text.replace(
      lostRegExp,
      '<gap reason="lost" extent="' +
        (RegExp.lastMatch.length - 2) + '" unit="character"/>'
    );
  }

  // [c.5]
  text = text.replace(
    /\[c\.((?:\d)+)\]/g,
    '<gap reason="lost" extent="$1" unit="character"/>'
  );

  // [ab]
  text = text.replace(/\[([^\]]+)\]/g, '<supplied reason="lost">$1</supplied>');

  // [ab newline
  text = text.replace(/\[([^\n])+\n/g, '<supplied reason="lost">$1</supplied>');

  // PARENTHESES
  // Precedence and sequence of regular expressions
  // within this section of code matters!
  // Do not rearrange the places of the regular expressions
  // without a good reason!

  // (scil. imperator)
  text = text.replace(
    RegExp('\\(scil. ((?:' + unicodeLetters + '|\s)+)\\)', 'g'),
    '<supplied reason="subaudible">$1</supplied>'
  );

  // ab(- -)
  text = text.replace(/(\S+)\((-\s*)+\)/g, '<abbr>$1</abbr>');

  // (- -)
  text = text.replace(
    /\(((?:(-)|\s)+)\)/g,
    '<gap reason="omitted" extent="unknown" unit="character"/>'
  );

  // (vac.?)
  text = text.replace(
    /\(vac.(\?+)\)/g,
    '<space extent="unknown" unit="character"/>'
  );

  // (vac.5)
  text = text.replace(
    /\(vac.((?:\d)+)\)/g,
    '<space extent="$1" unit="character"/>'
  );

  // space vac space
  text = text.replace(
    /\svac\s/g,
    '<space extent="unknown" unit="character"/>'
  );

  // space vacat space
  text = text.replace(
    /\svacat\s/g,
    '<space extent="unknown" unit="character"/>'
  );

  // 'vac' at the beginning of a row foolowed by space
  text = text.replace(
    /^vac\s/g,
    '<space extent="unknown" unit="character"/>'
  );

  // 'vacat' at the beginning of a row foolowed by space
  text = text.replace(
    /^vacat\s/g,
    '<space extent="unknown" unit="character"/>'
  );

  // (!)
  text = text.replace(/\(!\)/g, '<note>!</note>');

  // (imp)era(tor)
  text = text.replace(
    RegExp('\\((' + unicodeLettersAndDigits + '+)\\)' +
      '(' + unicodeLettersAndDigits + '+)' +
      '\\((' + unicodeLettersAndDigits + '+)\\)', 'g'),
    '<expan><ex>$1</ex><abbr>$2</abbr><ex>$3</ex></expan>'
  );

  // imp(era)tor
  text = text.replace(
    RegExp('(' + unicodeLettersAndDigits + '+)' +
      '\\((' + unicodeLettersAndDigits + '+)\\)' +
      '(' + unicodeLettersAndDigits + '+)', 'g'),
    '<expan><abbr>$1</abbr><ex>$2</ex><abbr>$3</abbr></expan>'
  );

  // (im)perator
  text = text.replace(
    RegExp('\\((' + unicodeLettersAndDigits + '+)\\)' +
      '(' + unicodeLettersAndDigits + '+)', 'g'),
    '<expan><ex>$1</ex><abbr>$2</abbr></expan>'
  );

  // imp(erator)
  text = text.replace(
    RegExp('(' + unicodeLettersAndDigits + '+)' +
      '\\((' + unicodeLettersAndDigits + '+)\\)', 'g'),
    '<expan><abbr>$1</abbr><ex>$2</ex></expan>'
  );

  // (imp)<expan>
  text = text.replace(
    RegExp('\\((' + unicodeLettersAndDigits + '+)\\)<expan>', 'g'),
    '<expan><ex>$1</ex>'
  );

  // </ex></expan>perator
  text = text.replace(
    RegExp('<\/ex><\/expan>(' + unicodeLettersAndDigits + '+)', 'g'),
    '</ex><abbr>$1</abbr></expan>'
  );

  // </expan>(perator)
  text = text.replace(
    RegExp('<\/expan>\\((' + unicodeLettersAndDigits + '+)\\)', 'g'),
    '<ex>$1</ex></expan>'
  );

  // (imp)
  text = text.replace(
    RegExp('\\(((?:' + unicodeLetters + '|\s)+)\\)', 'g'),
    '<expan><abbr><am><g type="symbol"/></am></abbr><ex>$1</ex></expan>'
  );

  // OTHER MARKUPS
  // Underdots (Unicode 0323):
  text = text.replace(
    RegExp('((' + unicodeLetters + '\u0323)+)', 'g'),
    '<unclear>$1</unclear>'
  );

  // Plus signs:
  var illegibleRegExp = /((\+)+)/;
  while (text.match(illegibleRegExp)) {
    text = text.replace(
      illegibleRegExp,
      '<gap reason="illegible" extent="' +
        RegExp.lastMatch.length + '" unit="character"/>'
    );
  }

  // Ellipsis:
  text = text.replace(/\.\.\./g, '<gap reason="ellipsis"/>');

  // Accented Letters (Unicode 0301):
  text = text.replace(
    RegExp('((' + unicodeLetters + '\u0301)+)', 'g'),
    '<hi rend="apex">$1</hi>'
  );

  // Supralinear/Overline Characters (Unicode 0305):
  text = text.replace(
    RegExp('((' + unicodeLetters + '́\u0305)+)', 'g'),
    '<hi rend="supraline">$1</hi>'
  );

  // Claudian Letters:
  // TURNED CAPITAL F 2132
  // ROMAN NUMERAL REVERSED ONE HUNDRED 2183
  // BOX DRAWINGS HEAVY VERTICAL AND RIGHT[Half H] 2523:
  text = text.replace(/([Ⅎ+|Ↄ+|┣+])/g, '<g type="claudian_y"/>');

  // Ligatured Letters (Unicode 0361 - on first letter):
  text = text.replace(
    RegExp('((' + unicodeLetters + '\u0361' + unicodeLetters + ')+)', 'g'),
    '<hi rend="ligature">$1</hi>'
  );

  // Dash:
  text = text.replace(
    /-\s(?:[-\s\]]+)\s*(\n)*/g,
    '<gap reason="lost" extent="unknown" unit="line"/>$1'
  );

  text = text.replace(
    RegExp('(' + unicodeLetters + ')(?:-)\n', 'g'),
    '$1<lb type="worddiv"/>'
  );

  // Text Direction Right to Left (Unicode LEFTWARDS ARROW 2190):
  text = text.replace(/^((←)+)/g, '<lb rend="right-to-left"/>');

  text = text.replace(/<lb n=\"\d+\"\/>((←)+)/g, '<lb rend="right-to-left"/>');

  // Post-conversion cleanup -
  // remove any orphaned Unicode COMBINING DOT BELOW 0323:
  text = text.replace(/\u0323/g, '');

  // LINE NUMBERING
  var lines = text.split('\n');
  for (var lineNumber = 1; lineNumber < lines.length; lineNumber++) {
    text = text.replace(/\n/, '<lb n="' + (lineNumber + 1) + '"/>');
  }
  text = '<lb n="1"/>' + text;

  return text;
}
