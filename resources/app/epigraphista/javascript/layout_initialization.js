// -*- coding: utf-8 -*-

// Epigraphista - EpiDoc XML file creator
// Epigraphista is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2015 - 2018, 2023.

var originalContainerContents;


function initializeLayout() {
  // Translate the user interface:
  document.getElementById("repository-button").setAttribute("value", TS.repository);
  document.getElementById("idno-button").setAttribute("value", TS.idno);
  document.getElementById("support-button").setAttribute("value", TS.support);
  document.getElementById("material-button").setAttribute("value", TS.material);
  document.getElementById("type-button").setAttribute("value", TS.type);
  document.getElementById("layout-button").setAttribute("value", TS.layout);
  document.getElementById("hand-note-button").setAttribute("value", TS.handNote);
  document.getElementById("orig-place-button").setAttribute("value", TS.origPlace);
  document.getElementById("orig-date-button").setAttribute("value", TS.origDate);
  document.getElementById("provenance-found-button").setAttribute("value", TS.provenanceFound);
  document.getElementById("provenance-observed-button").setAttribute("value", TS.provenanceObserved);

  document.getElementById("apparatus-criticus-button").setAttribute("value", TS.apparatusCriticus);
  document.getElementById("translation-button").setAttribute("value", TS.translation);
  document.getElementById("commentary-button").setAttribute("value", TS.commentary);
  document.getElementById("bibliography-button").setAttribute("value", TS.bibliography);

  document.getElementById("title").setAttribute("placeholder", TS.title);

  document.getElementById("inscription").setAttribute("placeholder", TS.inscription);
  document.getElementById("inscription-additional-keyboard-button").setAttribute("title", TS.additionalKeyboardLabel);

  document.getElementById("submit-button").setAttribute("value", TS.submitButtonLabel);

  // Set autoresize for all textarrea elements:
  const textArreas = document.getElementsByTagName("textarea");

  for (var index = 0; index < textArreas.length; index++) {
    textArreas[index].setAttribute(
      "style", "height:" + (textArreas[index].scrollHeight) + "px; overflow-y: hidden;"
    );
    textArreas[index].addEventListener("input", autoResizeTextArrea, false);
  }

  // Copy the original contents of the page.
  // It will be restored without reload after inscription text is successfully saved.
  originalContainerContents = document.getElementsByClassName("container-fluid")[0].innerHTML;
}


function autoResizeTextArrea() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}
