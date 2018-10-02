
var originalContainerContents;

function detectTouchScreen() {
  if (navigator.userAgent.match(/WebKit/i)) {
    var mobilis;
    window.addEventListener('touchstart', function setHasTouch () {
      mobilis = true;
      // Remove event listener once fired,
      // otherwise it'll kill scrolling performance
      window.removeEventListener('touchstart', setHasTouch);
    }, false);
    if (mobilis == true) {
      document.getElementsByClassName("container-fluid")[0].innerHTML =
        "<h2>Epigraphista does not support<br>touchscreen devices!</h2>";
    }
  } else {
    var mobilis = isMobile();
    if (mobilis == true) {
      document.getElementsByClassName("container-fluid")[0].innerHTML =
        "<h2>Epigraphista does not support<br>touchscreen devices!</h2>";
    }
    function isMobile() {
      try {
        document.createEvent("TouchEvent");
        return true;
      }
      catch(exception) {
        return false;
      }
    }
  }
}

function initializeGui() {
  // Set autoresizing for the mandatory textarea elements:
  $("#title").autoResize();
  $("#inscription").autoResize();

  // Trigger 'keyup' event on every 'paste' event
  // to start on-screen text conversion:
  $("#title").on('paste', function(e){
    setTimeout(function () {
      jQuery("#title").trigger('keyup');
    }, 150);
  });

  $("#inscription").on('paste', function(e){
    setTimeout(function () {
      jQuery("#inscription").trigger('keyup');
    }, 150);
  });

  // Translate the initial user interface:
  document.getElementById("description-section-title").innerHTML = TS.descriptionSectionTitle;

  document.getElementById("repository-button").setAttribute("value", TS.repository);
  document.getElementById("idno-button").setAttribute("value", TS.idno);
  document.getElementById("support-button").setAttribute("value", TS.support);
  document.getElementById("layout-button").setAttribute("value", TS.layout);
  document.getElementById("hand-note-button").setAttribute("value", TS.handNote);
  document.getElementById("orig-place-button").setAttribute("value", TS.origPlace);
  document.getElementById("orig-date-button").setAttribute("value", TS.origDate);
  document.getElementById("provenance-found-button").setAttribute("value", TS.provenanceFound);
  document.getElementById("provenance-observed-button").setAttribute("value", TS.provenanceObserved);

  document.getElementById("title").setAttribute("placeholder", TS.title);
  document.getElementById("title").setAttribute("title", TS.title);

  document.getElementById("text-section-title").innerHTML = TS.textSectionTitle;

  document.getElementById("apparatus-criticus-button").setAttribute("value", TS.apparatusCriticus);
  document.getElementById("translation-button").setAttribute("value", TS.translation);
  document.getElementById("commentary-button").setAttribute("value", TS.commentary);
  document.getElementById("bibliography-button").setAttribute("value", TS.bibliography);

  document.getElementById("inscription").setAttribute("placeholder", TS.inscription);
  document.getElementById("inscription").setAttribute("title", TS.inscription);
  document.getElementById("inscription-switch-greek").setAttribute("title", TS.inscriptionSwitchGreek);
  document.getElementById("inscription-greek-keyboard-help-link").setAttribute("title", TS.inscriptionGreekKeyboardHelpLink);
  document.getElementById("inscription-additional-keyboard-button").setAttribute("title", TS.inscriptionAdditionalKeyboardButton);
  document.getElementById("inscription-html").setAttribute("title", TS.inscriptionHtml);

  document.getElementById("submit-button").setAttribute("value", TS.submitButton);

  // Copy the original contents of the page.
  // It will be restored without reload after inscription text is successfully saved.
  originalContainerContents = document.getElementsByClassName("container-fluid")[0].innerHTML;
}
