# Epigraphista

Epigraphista is an [EpiDoc](https://sourceforge.net/p/epidoc/wiki/Home/) XML file creator.  

It is a desktop application based on [Bootstrap](http://getbootstrap.com/), JavaScript text conversion and [Perl 5](https://www.perl.org/) file-writing back-end using [Perl Executing Browser](https://github.com/ddmitov/perl-executing-browser) or [Electron](http://electron.atom.io/) as a GUI framework. Bulgarian and English versions are available and other translations can be added easily.

## Requirements

* Linux or Windows Perl 5 distribution
* [Perl Executing Browser](https://github.com/ddmitov/perl-executing-browser) or [Electron](http://electron.atom.io/)

## Electron Quick Start

``git clone git://github.com/ddmitov/epigraphista``  
``cd epigraphista``  
``npm install``  
``npm start``

## Credits

* [Bootstrap](http://getbootstrap.com/)
* [Chapel Hill Electronic Text Converter (CHETC-JS)](http://epidoc.cvs.sourceforge.net/epidoc/chetc-js/)
* [jQuery](https://jquery.com/)
* [jQuery autoResize](http://amaury.carrade.eu/projects/jquery/autoResize.html) by Amaury Carrade
* [jQuery.selection](http://madapaja.github.io/jquery.selection/) by Koji Iwasaki (@madapaja)
* [TypeGreek](http://www.typegreek.com/) by Randy Hoyt

## Translations

Bulgarian version is currently the default one.  
To use the English version open ```resources/app/index.html``` and change:

```html
<script src="epigraphista/translations/bulgarian.js" charset="utf-8"></script>
```

to:

```html
<script src="epigraphista/translations/english.js" charset="utf-8"></script>
```

## License

This program is free software;  
you can redistribute it and/or modify it under the terms of the GNU General Public License,  
as published by the Free Software Foundation; either version 3 of the License,  
or (at your option) any later version.  
This program is distributed in the hope that it will be useful, but WITHOUT A NY WARRANTY;  
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  

## Author

Dimitar D. Mitov, 2015 - 2018
