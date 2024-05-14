// ======================================== CONTAR REQUISIÇÕES THIRD PARTY ========================================
var thirdPartyCounter = 0;
var thirdParty_Open = false;

function logURL(requestDetails) {
  var requestURL = new URL(requestDetails.url).hostname;
  var atualURL = new URL(requestDetails.originUrl).hostname;
  if (requestURL != atualURL) {
    thirdPartyCounter++;
  }
}

browser.webRequest.onBeforeRequest.addListener(logURL, {
  urls: ["<all_urls>"],
});

document.getElementById("trackThird").addEventListener("click", function () {
  if (thirdParty_Open == true) {
    thirdParty_Open = false;
    document.getElementById("ThirdResult").hidden = true;
  } else {
    thirdParty_Open = true;
    document.getElementById("ThirdResult").hidden = false;
  }
});

setInterval(function () {
  if (document.getElementById("ThirdResult") != null) {
    document.getElementById("ThirdResult").textContent =
      "Third Party Requests: " + thirdPartyCounter;
  }
}, 1000);

// ======================================== ARMAZENAMENTO DE DADOS HTML5 ========================================
var dataStorage = false;
var guardaDados = false;

browser.webRequest.onBeforeRequest.addListener(
  function (requestDetails) {
    if (requestDetails.url.includes("localStorage")) {
      localStorage.setItem("storageAllowed", "true");
      document.getElementById("htmlResult").textContent =
        "Local Storage: Allowed";
      guardaDados = true;
    } else {
      document.getElementById("htmlResult").textContent =
        "Local Storage: Not Allowed";
    }
  },
  { urls: ["<all_urls>"] }
);

document.getElementById("trackStorage").addEventListener("click", function () {
  if (dataStorage == true) {
    dataStorage = false;
    document.getElementById("htmlResult").hidden = true;
  } else {
    dataStorage = true;
    document.getElementById("htmlResult").hidden = false;
  }
});

// ======================================== DETECCAO DE HIJACKING E HOOKING ========================================
var funcoesParaVerificar = ["alert", "prompt", "confirm"];
var hijackBool = false;
var tem_hijack = false;

document.getElementById("trackHijack").addEventListener("click", function () {
  if (hijackBool == true) {
    hijackBool = false;
    document.getElementById("hookResult").hidden = true;
  } else {
    hijackBool = true;
    document.getElementById("hookResult").hidden = false;
  }
});

setInterval(function () {
  funcoesParaVerificar.forEach(function (nomeFuncao) {
    if (
      window[nomeFuncao].toString() !==
      Function.prototype[nomeFuncao].toString()
    ) {
      document.getElementById("hookResult").textContent =
        "Suspect activity in " + nomeFuncao + "function";
      tem_hijack = true;
    }
  });
}, 5000);

// ======================================== DETECCAO DE HIJACKING E HOOKING ========================================
setInterval(function () {
  var score = 0;
  if (guardaDados) {
    score++;
  }
  if (tem_hijack) {
    score++;
  }
  if (thirdPartyCounter > 0) {
    score++;
  }

  if (score == 0) {
    document.getElementsByClassName("note").textContent = "10/10";
  } else if (score == 1) {
    document.getElementsByClassName("note").textContent = "7/10";
  } else if (score == 2) {
    document.getElementsByClassName("note").textContent = "3.5/10";
  } else if (score == 3) {
    document.getElementsByClassName("note").textContent = "0/10";
  }
}, 2000);
