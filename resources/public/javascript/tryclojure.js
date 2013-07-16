// Pass in a JQuery HTML Element where the code editor should be, a callback for results and options
function TryClojure(codeArea, resultCallback, params) {
  params = params || {};
  $.extend(true, params || {}, {
    // Code block related
    "autoFocus": true,
    "autoMatchParens": true,
    "autoCloseBrackets": true,
    "lineNumbers": true,
    "matchBrackets": true,
    // Run related
    "autoRun": false
  });

  // Private Variables
  var _editorStatus = {
    "dirty": true,
    "autoRun": params.autoRun,
    "lastCode": null,
    "editor": null,
    "timer": null
  };

  // Private Methods
  function _init() {
    _editorStatus.editor = _setupCodeBlock(codeArea, params, function() {
      _editorStatus.dirty = true;
    });

    _runCode();
  }

  function _eval(code, callback) {
    $.ajax({
      url: "eval.json",
      data: { expr : code },
      success: function(data) {
        callback(code, data);
      }
    });
  }

  function _setupCodeBlock(codeTextArea, params, onChangeCallback) {
    var editor = CodeMirror.fromTextArea(codeTextArea, {
      "autofocus": params.autoFocus,
      "autoMatchParens": params.autoMatchParens,
      "autoCloseBrackets": params.autoCloseBrackets,
      "lineNumbers": params.lineNumbers,
      "matchBrackets": params.matchBrackets});

    editor.on('change', onChangeCallback);

    return editor;
  }

  function _evaluateCode(editorStatus, currentCode, callback) {
    if(editorStatus.dirty && editorStatus.lastCode != currentCode) {
      callback();

      editorStatus.lastCode = currentCode;
      editorStatus.dirty = false;
    }
  }

  function _runCode() {
    var currentCode = _editorStatus.editor.getValue();
    _evaluateCode(_editorStatus, currentCode, function() {
      _eval(currentCode, function(code, data) {
        resultCallback(code, data);
      });
    });
  }

  // Call Initialization Methods
  _init();

  // Public Methods
  return {
    "runButtonClick": function(evt) {
        evt.preventDefault();
        _runCode();
    },
    "autoRunClick": function(turnOn, turnOff) {
      if(_editorStatus.autoRun) {
        turnOff();
        clearInterval(_editorStatus.timer);
      } else {
        turnOn();
        _editorStatus.timer = setInterval(_runCode, 2000);
        _runCode();
      }
      _editorStatus.autoRun = !_editorStatus.autoRun;
    },
  };
}


$(document).ready(function() {
  $(".code").each(function(i, element) {
    var resultDiv = $(element.getAttribute("data-result"));
    var expectedResult = element.getAttribute("data-expected");

    var codeBlockSelector = "a[data-code-block='#" + element.id + "']";

    var runButton = $(codeBlockSelector);
    var autoRunButton = $(codeBlockSelector + "a[data-autorun='true']");

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
