$(document).ready(function() {
  $(".code").each(function(i, element) {
    var resultDiv = $(element.getAttribute("data-result"));
    var expectedResult = element.getAttribute("data-expected");

    var codeBlockSelector = "a[data-code-block='#" + element.id + "']";

    var resultCallback = function(originalCode, response) {
      if(!response.error && !expectedResult) {
        resultDiv.removeClass("text-error");
        resultDiv.addClass("text-success");
        resultDiv.text(response.result);
      } else if(!response.error && expectedResult && response.result == expectedResult) {
        resultDiv.removeClass("text-error");
        resultDiv.addClass("text-success");
        resultDiv.text(response.result);
      } else {
        resultDiv.removeClass("text-success");
        resultDiv.addClass("text-error");
        resultDiv.text(response.message || response.result);
      }
    };

    var tryClojure = new TryClojure(element, resultCallback, {"autoRun": true, "lineNumbers": false});
  });
});
