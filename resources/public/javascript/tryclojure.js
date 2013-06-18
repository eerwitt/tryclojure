function eval_clojure(code, callback) {
    $.ajax({
        url: "eval.json",
        data: { expr : code },
        success: function(data) {
          callback(code, data);
        }
    });
}

function evaluateCode(editorStatus, editor, resultDiv) {
  var currentCode = editor.getValue();
  if(editorStatus.dirty && editorStatus.lastCode != currentCode) {
    eval_clojure(currentCode, function(originalCode, response) {
      if(!response.error) {
        resultDiv.removeClass("text-error");
        resultDiv.text("=> " + response.result);
      } else {
        resultDiv.addClass("text-error");
        resultDiv.text(response.message);
      }
    });

    editorStatus.lastCode = currentCode;
    editorStatus.dirty = false;
  }
}

function setupCodeBlock(codeTextArea, resultDiv) {
  var editor = CodeMirror.fromTextArea(codeTextArea, {
    "autofocus": true,
    "autoMatchParens": true,
    "autoCloseBrackets": true,
    "matchBrackets": true});

  var editorStatus = {
    "dirty": true,
    "lastCode": null
  };

  editor.on('change', function() {
    editorStatus.dirty = true;
  });

  var codeEvaluator = function() {
    evaluateCode(editorStatus, editor, resultDiv);
  };

  setInterval(codeEvaluator, 500);
  codeEvaluator();
}

$(document).ready(function() {
  setupCodeBlock($("#code")[0], $("#result"));
});
