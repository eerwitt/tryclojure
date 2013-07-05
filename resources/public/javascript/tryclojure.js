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

function runCode(editorStatus, editor, callback) {
  var codeEvaluator = function() {
    evaluateCode(editorStatus, editor, callback);
  };

  codeEvaluator();

  return codeEvaluator;
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

  return runCode(editorStatus, editor, callback);
}

$(document).ready(function() {
  $(".code").each(function(i, element) {
    var resultDiv = $(element.getAttribute("data-result"));
    var expectedResult = element.getAttribute("data-expected");

    var codeBlockSelector = "a[data-code-block='#" + element.id + "']";

    var runButton = $(codeBlockSelector);
    var autoRunButton = $(codeBlockSelector + "a[data-autorun='true']");

    var responseCallback = function(originalCode, response) {
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

    var codeEvaluator = setupCodeBlock(element, responseCallback);

    if(runButton) {
      runButton.on('click', function(evt) {
        evt.preventDefault();
        codeEvaluator();
      });
    }

    if(autoRunButton) {
      autoRunButton.on('click', function(evt) {
        $(this).find("i").toggleClass("icon-spin").toggleClass("running");
        setInterval(codeEvaluator, 2000);
        codeEvaluator();
      });
    }
  });
});
