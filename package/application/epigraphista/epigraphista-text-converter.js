
// UTF-8 encoded file!

// ETC - Epigraphista Text Converter
// Based on regular expressions and code fragments from Chapel Hill Electronic Text Convertor - JavaScript (CHETC-JS):
// http://epidocumentation.pbworks.com/w/page/11681051/ChetCjs
// http://epidoc.cvs.sourceforge.net/epidoc/chetc-js/
// Epigraphista Text Converter (ETC) is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015.

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function convertEpigraphicText(elementId) {
	var epigraphicText = document.getElementById(elementId).value;
	document.getElementById(elementId).focus();

	var unicodeBlocks = "\u0041-\u005a\u0061-\u007a\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u01ba\u01bc-\u01bf " +
		"\u01c4-\u02ad\u0386\u0388-\u0481\u048c-\u0556\u0561-\u0587\u10a0-\u10c5\u1e00-\u1fbc\u1fbe\u1fc2-\u1fcc " +
		"\u1fd0-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ffc\u207f\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126 " +
		"\u2128\u212a-\u212d\u212f-\u2131\u2133\u2134\u2139\ufb00-\ufb17\uff21-\uff3a\uff41-\uff5a";
	var unicodeLetters = "[" + unicodeBlocks + "]";
	var unicodeLettersAndDigits = "[" + unicodeBlocks + "0-9]";

	// SINGLE ANGLE BRACKET ENCLOSURES
	// (placed first before XML tags are inserted)
	// The following three regular expressions will match
	// '<imp>', but '<<imp>>' will NOT match.
	epigraphicText = epigraphicText.replace(RegExp("([^<])<((?:" + unicodeLetters + "|\s)+)>([^>])", "g"), "$1<supplied reason=\"omitted\">$2</supplied>$3");
	epigraphicText = epigraphicText.replace(RegExp("<((?:" + unicodeLetters + "|\s)+)>$", "g"), "<supplied reason=\"omitted\">$1</supplied>");
	epigraphicText = epigraphicText.replace(RegExp("^<((?:" + unicodeLetters + "|\s)+)>", "g"), "<supplied reason=\"omitted\">$1</supplied>");

	// DOUBLE CHARACTER ENCLOSURES
	// Double Bracket:
	epigraphicText = epigraphicText.replace(/\[\[((.)+)\]\]/g, "<del rend=\"erasure\">$1</del>");

	// Double Angle Bracket:
	epigraphicText = epigraphicText.replace(/<<((.)+)>>/g, "<add place=\"overstrike\">$1</add>");

	// Double Parentheses:
	epigraphicText = epigraphicText.replace(RegExp("\\(\\(((?:" + unicodeLetters + "|\s)+)\\)\\)", "g"), "<g type=\"$1\"/>");

	// SINGLE CHARACTER ENCLOSURES
	// Curly Bracket:
	epigraphicText = epigraphicText.replace(RegExp("\{((?:" + unicodeLetters + "|\s)+)\}", "g"), "<sic>$1</sic>");

	// Corner Characters (Unicode Left 231C Right 231D):
	epigraphicText = epigraphicText.replace(RegExp("⌜((?:" + unicodeLetters + "|\s)+)⌝", "g"), "<choice><sic>$1</sic><corr>$1</corr></choice>");

	// Single Quotes:
	epigraphicText = epigraphicText.replace(RegExp("'((?:" + unicodeLetters + "|\s)+)'", "g"), "<add>$1</add>");

	// BRACKETS
	// [ - - ?]
	epigraphicText = epigraphicText.replace(/\s*\[-\s(?:[-\s\]]+)\?\]\s*(\n)*/g, "<gap reason=\"lost\" extent=\"1\" unit=\"line\"/>");

	// [- -] ?
	// followed by space and followed by one or more new line character(s)
	epigraphicText = epigraphicText.replace(/-\s(?:[-\s\]]+)\?\s*(\n)*/g, "<gap reason=\"lost\" extent=\"unknown\" unit=\"line\"/>");

	// [-]
	epigraphicText = epigraphicText.replace(/\[-\]/g, "<name><gap reason=\"lost\" extent=\"unknown\" unit=\"character\"/></name>");

	// space [- -] space newline
	epigraphicText = epigraphicText.replace(/\s*\[-\s(?:[-\s\]]+)\]\s*(\n)*/g, "<gap reason=\"lost\" extent=\"1\" unit=\"line\"/>$1");

	// [--]
	var lostCharactersRegExp = /([^\[]*)\[([-\s\]]+)\]/;
	while (epigraphicText.match(lostCharactersRegExp)) {
		// The length of the second group of characters within the regular expression is measured.
		// ([^\[]*)  -->  first group of characters
		// [^\[]*  --> negative matching: no left square bracket could be placed before the opening left square bracket,
		// so [--] will match, but [[--]], which is used to designate erasure, will NOT match.
		// Any other character repeated any number of times (*) will match.
		// ([-\s\]]+)  -->  second group of characters
		// \[  -->  escaped, or litteral, left square bracket
		// \]  -->  escaped, or litteral, right square bracket
		epigraphicText = epigraphicText.replace(lostCharactersRegExp,
			"$1<gap reason=\"lost\" extent=\"" + RegExp.$2.length + "\" unit=\"character\"/>");
	}

	// [. .]
	var lostRegExp = /\[([\.\s]+)\]/;
	while (epigraphicText.match(lostRegExp)) {
		// Brackets are not counted!
		epigraphicText = epigraphicText.replace(lostRegExp, "<gap reason=\"lost\" extent=\"" + (RegExp.lastMatch.length -2) + "\" unit=\"character\"/>");
	}

	// [c.5]
	epigraphicText = epigraphicText.replace(/\[c\.((?:\d)+)\]/g, "<gap reason=\"lost\" extent=\"$1\" unit=\"character\"/>");

	// [ab]
	epigraphicText = epigraphicText.replace(/\[([^\]]+)\]/g, "<supplied reason=\"lost\">$1</supplied>");

	// [ab newline
	epigraphicText = epigraphicText.replace(/\[([^\n])+\n/g, "<supplied reason=\"lost\">$1</supplied>");

	// PARENTHESES
	// Precedence and sequence of regular expressions within this section of code matters!
	// Do not rearrange the places of the regular expressions without a good reason!
	// (scil. imperator)
	epigraphicText = epigraphicText.replace(RegExp("\\(scil. ((?:" + unicodeLetters + "|\s)+)\\)", "g"), "<supplied reason=\"subaudible\">$1</supplied>");

	// ab(- -)
	epigraphicText = epigraphicText.replace(/(\S+)\((-\s*)+\)/g, "<abbr>$1</abbr>");

	// (- -)
	epigraphicText = epigraphicText.replace(/\(((?:(-)|\s)+)\)/g, "<gap reason=\"omitted\" extent=\"unknown\" unit=\"character\"/>");

	// (vac.?)
	epigraphicText = epigraphicText.replace(/\(vac.(\?+)\)/g, "<space extent=\"unknown\" unit=\"character\"/>");

	// (vac.5)
	epigraphicText = epigraphicText.replace(/\(vac.((?:\d)+)\)/g, "<space extent=\"$1\" unit=\"character\"/>");

	// space vac space
	epigraphicText = epigraphicText.replace(/\svac\s/g, "<space extent=\"unknown\" unit=\"character\"/>");

	// space vacat space
	epigraphicText = epigraphicText.replace(/\svacat\s/g, "<space extent=\"unknown\" unit=\"character\"/>");

	// 'vac' at the beginning of a row foolowed by space
	epigraphicText = epigraphicText.replace(/^vac\s/g, "<space extent=\"unknown\" unit=\"character\"/>");

	// 'vacat' at the beginning of a row foolowed by space
	epigraphicText = epigraphicText.replace(/^vacat\s/g, "<space extent=\"unknown\" unit=\"character\"/>");

	// (!)
	epigraphicText = epigraphicText.replace(/\(!\)/g, "<note>!</note>");

	// (imp)era(tor)
	epigraphicText = epigraphicText.replace(RegExp("\\((" + unicodeLettersAndDigits + "+)\\)(" + unicodeLettersAndDigits + "+)\\((" + unicodeLettersAndDigits + "+)\\)", "g"),
		"<expan><ex>$1</ex><abbr>$2</abbr><ex>$3</ex></expan>");

	// imp(era)tor
	epigraphicText = epigraphicText.replace(RegExp("(" + unicodeLettersAndDigits + "+)\\((" + unicodeLettersAndDigits + "+)\\)(" + unicodeLettersAndDigits + "+)", "g"),
		"<expan><abbr>$1</abbr><ex>$2</ex><abbr>$3</abbr></expan>");

	// (im)perator
	epigraphicText = epigraphicText.replace(RegExp("\\((" + unicodeLettersAndDigits + "+)\\)(" + unicodeLettersAndDigits + "+)", "g"),
		"<expan><ex>$1</ex><abbr>$2</abbr></expan>");

	// imp(erator)
	epigraphicText = epigraphicText.replace(RegExp("(" + unicodeLettersAndDigits + "+)\\((" + unicodeLettersAndDigits + "+)\\)", "g"),
		"<expan><abbr>$1</abbr><ex>$2</ex></expan>");

	// (imp)<expan>
	epigraphicText = epigraphicText.replace(RegExp("\\((" + unicodeLettersAndDigits + "+)\\)<expan>", "g"), "<expan><ex>$1</ex>");

	// </ex></expan>perator
	epigraphicText = epigraphicText.replace(RegExp("<\/ex><\/expan>(" + unicodeLettersAndDigits + "+)", "g"),
		"</ex><abbr>$1</abbr></expan>");

	// </expan>(perator)
	epigraphicText = epigraphicText.replace(RegExp("<\/expan>\\((" + unicodeLettersAndDigits + "+)\\)", "g"),
		"<ex>$1</ex></expan>");

	// (imp)
	epigraphicText = epigraphicText.replace(RegExp("\\(((?:" + unicodeLetters + "|\s)+)\\)", "g"), "<expan><abbr><am><g type=\"symbol\"/></am></abbr><ex>$1</ex></expan>");

	// OTHER MARKUPS
	// Underdots (Unicode 0323):
	epigraphicText = epigraphicText.replace(RegExp("((" + unicodeLetters + "\u0323)+)", "g"), "<unclear>$1</unclear>");

	// Plus signs:
	var illegibleRegExp = /((\+)+)/;
	while (epigraphicText.match(illegibleRegExp)) {
		epigraphicText = epigraphicText.replace(illegibleRegExp, "<gap reason=\"illegible\" extent=\"" + RegExp.lastMatch.length + "\" unit=\"character\"/>");
	}

	// Ellipsis:
	epigraphicText = epigraphicText.replace(/\.\.\./g, "<gap reason=\"ellipsis\"/>");

	// Accented Letters (Unicode 0301):
	epigraphicText = epigraphicText.replace(RegExp("((" + unicodeLetters + "\u0301)+)", "g"), "<hi rend=\"apex\">$1</hi>");

	// Supralinear/Overline Characters (Unicode 0305):
	epigraphicText = epigraphicText.replace(RegExp("((" + unicodeLetters + "́\u0305)+)", "g"), "<hi rend=\"supraline\">$1</hi>");

	// Claudian Letters
	// (Unicode TURNED CAPITAL F 2132 | ROMAN NUMERAL REVERSED ONE HUNDRED 2183 | BOX DRAWINGS HEAVY VERTICAL AND RIGHT[Half H] 2523):
	epigraphicText = epigraphicText.replace(/([Ⅎ+|Ↄ+|┣+])/g, "<g type=\"claudian_y\"/>");

	// Ligatured Letters (Unicode 0361 - on first letter):
	epigraphicText = epigraphicText.replace(RegExp("((" + unicodeLetters + "\u0361" + unicodeLetters + ")+)", "g"), "<hi rend=\"ligature\">$1</hi>");

	// Dash:
	epigraphicText = epigraphicText.replace(/-\s(?:[-\s\]]+)\s*(\n)*/g, "<gap reason=\"lost\" extent=\"unknown\" unit=\"line\"/>$1");
	epigraphicText = epigraphicText.replace(RegExp("(" + unicodeLetters + ")(?:-)\n", "g"), "$1<lb type=\"worddiv\"/>");

	// Text Direction Right to Left (Unicode LEFTWARDS ARROW 2190):
	epigraphicText = epigraphicText.replace(/^((←)+)/g, "<lb rend=\"right-to-left\"/>");
	epigraphicText = epigraphicText.replace(/<lb n=\"\d+\"\/>((←)+)/g, "<lb rend=\"right-to-left\"/>");

	// Post-conversion cleanup - remove any orphaned Unicode COMBINING DOT BELOW 0323:
	epigraphicText = epigraphicText.replace(/\u0323/g, "");

	// LINE NUMBERING
	var linesForNumbering = epigraphicText.split('\n');
	for (var lineNumber = 1; lineNumber < linesForNumbering.length; lineNumber++) {
		epigraphicText = epigraphicText.replace(/\n/, "<lb n=\"" + (lineNumber + 1) + "\"/>");
	}

	// XML TO HTML CONVERSION
	// Adding opening and closing tags:
	epigraphicText = "<ab><lb n=\"1\"/>" + epigraphicText + "</ab>";
	// Conversion of XML code to HTML code:
	var epigraphicTextHtml = epigraphicText;
	epigraphicTextHtml = epigraphicTextHtml.replace(/\</g, "&lt;");
	epigraphicTextHtml = epigraphicTextHtml.replace(/\>/g, "&gt;");
	epigraphicTextHtml = epigraphicTextHtml.replace(/\"/g, "&quot;");
	// Insertion of <br> before every new line:
	epigraphicTextHtml = epigraphicTextHtml.replace(/(&lt;lb[^\/]*\/&gt;)/g, "<br>$1");
	// Insertion of <br> before closing </ab> tag:
	epigraphicTextHtml = epigraphicTextHtml.replace(/&lt;\/ab&gt;/g, "<br>&lt;\/ab&gt;");
	// Indentation for the HTML result:
	epigraphicTextHtml = epigraphicTextHtml.replace(/&lt;lb/g, "&nbsp;&nbsp;&nbsp;&nbsp;&lt;lb");

	// PLACING RESULTS IN THE HTML DOM TREE
	document.getElementById(elementId + "-html").innerHTML = epigraphicTextHtml;
	document.getElementById(elementId + "-xml").setAttribute("value", epigraphicText);

}
// End of Epigraphista Text Converter code.
