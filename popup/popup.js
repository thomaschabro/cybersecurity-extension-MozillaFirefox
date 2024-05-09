var thirdPartyCounter = 0;

function logURL(requestDetails) {
  console.log(`Loading: ${requestDetails.url}`);
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
  // Check if div with id "ThirdResult" exists
  if (document.getElementById("ThirdResult") == null) {
    var div = document.createElement("div");
    div.id = "ThirdResult";
    div.textContent = "Third Party Requests: " + thirdPartyCounter;
    document.getElementsByClassName("popup")[0].appendChild(div);
  } else {
    // Update div with id "ThirdResult"
    document.getElementById("ThirdResult").textContent =
      "Third Party Requests: " + thirdPartyCounter;
  }
});
