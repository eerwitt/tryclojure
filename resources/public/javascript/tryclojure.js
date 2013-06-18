function eval_clojure(code) {
    var data;
    $.ajax({
        url: "eval.json",
        data: { expr : code },
        async: false,
        success: function(res) { data = res; }
    });
    return data;
}

var editor, dirty, lastCode;

function evaluateCode() {
  var currentCode = editor.getValue();
  if(dirty && lastCode != currentCode) {
    var data = eval_clojure(currentCode);

    if(!data.error) {
      $("#result").removeClass("text-error");
      $("#result").text("=> " + data.result);
    } else {
      $("#result").addClass("text-error");
      $("#result").text(data.message);
    }

    lastCode = currentCode;
    dirty = false;
  }
}

$(document).ready(function() {
  editor = CodeMirror.fromTextArea($("#code")[0], {
    "autofocus": true,
    "autoMatchParens": true,
    "autoCloseBrackets": true,
    "matchBrackets": true});

  dirty = true;

  editor.on('change', function() {
    dirty = true;
  });

  setInterval(evaluateCode, 1000);
  evaluateCode();
});
