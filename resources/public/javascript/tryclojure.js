function eval_clojure(code, callback) {
    $.ajax({
        url: "eval.json",
        data: { expr : code },
        success: function(data) {
          callback(code, data);
        }
    });
}

var dirty, lastCode;

function evaluateCode(editor) {
  var currentCode = editor.getValue();
  if(dirty && lastCode != currentCode) {
    eval_clojure(currentCode, function(originalCode, response) {
      if(!response.error) {
        $("#result").removeClass("text-error");
        $("#result").text("=> " + response.result);
      } else {
        $("#result").addClass("text-error");
        $("#result").text(response.message);
      }
    });

    lastCode = currentCode;
    dirty = false;
  }
}

$(document).ready(function() {
  var editor = CodeMirror.fromTextArea($("#code")[0], {
    "autofocus": true,
    "autoMatchParens": true,
    "autoCloseBrackets": true,
    "matchBrackets": true});

  dirty = true;

  editor.on('change', function() {
    dirty = true;
  });

  setInterval(function() {evaluateCode(editor); }, 1000);
  evaluateCode(editor);
});
