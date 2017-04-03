Epigraphista
--------------------------------------------------------------------------------

Epigraphista is an [EpiDoc](https://sourceforge.net/p/epidoc/wiki/Home/) XML file creator. It is implemented as a hybrid desktop or server application using [Perl Executing Browser](https://github.com/ddmitov/perl-executing-browser), [Electron](http://electron.atom.io/) or [NW.js](http://nwjs.io/) as a desktop GUI framework, [Bootstrap](http://getbootstrap.com/) for a themable HTML 5 user interface, JavaScript for on-screen text conversion and [Perl 5](https://www.perl.org/) for a file-writing backend. Bulgarian and English versions are available and other translations can be added easily.

## Desktop Runtime Requirements

* Linux, Mac or Windows Perl 5 distribution,
* [Perl Executing Browser](https://github.com/ddmitov/perl-executing-browser) or [Electron] (http://electron.atom.io/) or [NW.js](http://nwjs.io/).

## Server Runtime Requirements

* CGI-enabled HTTP server,
* Perl 5 distribution,
* Graphical JavaScript-enabled browser on the client side.

## Frameworks, Libraries & Code Fragments Used
* [jQuery](https://jquery.com/)
* [jQuery autoResize](http://amaury.carrade.eu/projects/jquery/autoResize.html) by Amaury Carrade
* [jQuery.selection](http://madapaja.github.io/jquery.selection/) by Koji Iwasaki (@madapaja)
* [Bootstrap](http://getbootstrap.com/)
* [Alertify.js](https://alertifyjs.org/) by Fabien Doiron
* [TypeGreek](http://www.typegreek.com/) by Randy Hoyt
* regular expressions and code fragments from [Chapel Hill Electronic Text Converter (CHETC-JS)](http://epidoc.cvs.sourceforge.net/epidoc/chetc-js/)

## Translations

Bulgarian version is currently the default one.  
To use the English version open ```resources/app/index.html``` and  
change ```<script type="text/javascript" src="epigraphista/translations/bulgarian.js" charset="utf-8"></script>```  
to ```<script type="text/javascript" src="epigraphista/translations/english.js" charset="utf-8"></script>```.

## License

This program is free software;  
you can redistribute it and/or modify it under the terms of the GNU General Public License,  
as published by the Free Software Foundation; either version 3 of the License,  
or (at your option) any later version.  
This program is distributed in the hope that it will be useful, but WITHOUT A NY WARRANTY;  
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  

## Author

Dimitar D. Mitov, 2015 - 2016.
