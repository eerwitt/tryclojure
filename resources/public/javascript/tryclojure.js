// Pass in a JQuery HTML Element where the code editor should be, a callback for results and options
function TryClojure(codeArea, resultCallback, params) {
  params = $.extend(true, {
    // Code block related
    "autoFocus": true,
    "autoMatchParens": true,
    "autoCloseBrackets": true,
    "lineNumbers": true,
    "matchBrackets": true,
    // Run related
    "autoRunTimeout": 2000,
    "autoRun": false
  }, params);

  // Private Variables
  var _editorStatus = {
    "dirty": true,
    "autoRun": params.autoRun,
    "lastCode": null,
    "editor": null,
    "timer": null
  };

  // Private Methods
  function _init(params) {
    _editorStatus.editor = _setupCodeBlock(codeArea, params, function() {
      _editorStatus.dirty = true;
    });

    _runCode();
    if(params.autoRun) {
      _startAutoRun(params.autoRunTimeout);
    }
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

  function _startAutoRun(timeout) {
    return setInterval(_runCode, timeout || 2000);
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
  _init(params);

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
        _editorStatus.timer = _startAutoRun(2000);
        _runCode();
      }
      _editorStatus.autoRun = !_editorStatus.autoRun;
    }
  };
}

