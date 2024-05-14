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

// Add event listener to the button on click
document.getElementById("trackThird").addEventListener("click", function () {
  if (thirdParty_Open == true) {
    thirdParty_Open = false;
    document.getElementById("ThirdResult").hidden = true;
  } else {
    thirdParty_Open = true;
    document.getElementById("ThirdResult").hidden = false;
  }
});

// Atualizar periodicamente a div com o valor da variável thirdPartyCounter
setInterval(function () {
  if (document.getElementById("ThirdResult") != null) {
    document.getElementById("ThirdResult").textContent =
      "Third Party Requests: " + thirdPartyCounter;
  }
}, 1000);

// ======================================== ARMAZENAMENTO DE DADOS HTML5 ========================================
browser.webRequest.onBeforeRequest.addListener(
  function (requestDetails) {
    if (requestDetails.url.includes("localStorage")) {
      localStorage.setItem("storageAllowed", "true");
      document.getElementById("htmlResult").textContent =
        "Local Storage: Allowed";
    } else {
      document.getElementById("htmlResult").textContent =
        "Local Storage: Not Allowed";
    }
  },
  { urls: ["<all_urls>"] }
);

// Add event listener to the button on click
document.getElementById("trackStorage").addEventListener("click", function () {
  if (thirdParty_Open == true) {
    thirdParty_Open = false;
    document.getElementById("htmlResult").hidden = true;
  } else {
    thirdParty_Open = true;
    document.getElementById("htmlResult").hidden = false;
  }
});
