function eval_clojure(code, callback) {
  $.ajax({
      url: "eval.json",
      data: { expr : code },
      success: function(data) {
        callback(code, data);
      }
  });
}

function evaluateCode(editorStatus, editor, callback) {
  var currentCode = editor.getValue();
  if(editorStatus.dirty && editorStatus.lastCode != currentCode) {
    eval_clojure(currentCode, callback);

    editorStatus.lastCode = currentCode;
    editorStatus.dirty = false;
  }
}

function setupCodeBlock(codeTextArea, callback) {
  var editor = CodeMirror.fromTextArea(codeTextArea, {
    "autofocus": true,
    "autoMatchParens": true,
    "autoCloseBrackets": true,
    "lineNumbers": true,
    "matchBrackets": true});

  var editorStatus = {
    "dirty": true,
    "lastCode": null
  };

  editor.on('change', function() {
    editorStatus.dirty = true;
  });

  var codeEvaluator = function() {
    evaluateCode(editorStatus, editor, callback);
  };

  setInterval(codeEvaluator, 500);
  codeEvaluator();
}

$(document).ready(function() {
  $(".code").each(function(i, element) {
    var resultDiv = $(element.getAttribute("data-result"));
    var expectedResult = element.getAttribute("data-expected");

    setupCodeBlock(element, function (originalCode, response) {
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
    });
  });
});
