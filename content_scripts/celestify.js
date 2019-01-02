(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function getCelestusCodeInputs() {
    var frame = parent.frames["Interface"];
    console.log(window[0]);
    var CodeA = frame.document.getElementById("CodeA");
    var CodeB = frame.document.getElementById("CodeB");
    var CodeC = frame.document.getElementById("CodeC");
    var CodeD = frame.document.getElementById("CodeD");
    var CodeE = frame.document.getElementById("CodeE");
    if (CodeA == null || CodeB == null || CodeC == null || CodeD == null || CodeE == null) {
      console.log("could not find any code part");
      alert("Il semble que vous ne soyez pas sur la page porte spatiale")
    } else {
      var inputCodes = [];
      inputCodes.push(CodeA);
      inputCodes.push(CodeB);
      inputCodes.push(CodeC);
      inputCodes.push(CodeD);
      inputCodes.push(CodeE);
      return inputCodes;
    }
  }

  function fillCode(code, inputCodes) {
    for(let i = 0; i < inputDocElements.length; i++) {
      inputCodes[i].value = code[i];
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "fillCode") {
      fillCode(message.code, getCelestusCodeInputs());
    }
  });


})();