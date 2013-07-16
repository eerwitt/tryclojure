$(document).ready(function() {
  $(".code").each(function(i, element) {
    var resultDiv = $(element.getAttribute("data-result"));

    var codeBlockSelector = "a[data-code-block='#" + element.id + "']";

    var runButton = $(codeBlockSelector);
    var autoRunButton = $(codeBlockSelector + "a[data-autorun='true']");

    var resultCallback = function(originalCode, response) {
      if(!response.error) {
        resultDiv.removeClass("text-error");
        resultDiv.addClass("text-success");
        resultDiv.text(response.result);
      } else {
        resultDiv.removeClass("text-success");
        resultDiv.addClass("text-error");
        resultDiv.text(response.message || response.result);
      }
    };

    var tryClojure = new TryClojure(element, resultCallback);

    if(runButton) {
      runButton.on('click', tryClojure.runButtonClick);
    }

    if(autoRunButton) {
      autoRunButton.on('click', function(evt) {
        var icon = $(this).find("i");
        tryClojure.autoRunClick(function() {
          icon.toggleClass("icon-spin").toggleClass("running");
        }, function() {
          icon.toggleClass("icon-spin").toggleClass("running");
        });
      });
    }
  });
});
