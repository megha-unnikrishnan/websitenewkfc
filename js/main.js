document.addEventListener("DOMContentLoaded", function () {
  debugger
  const scrollImages = document.querySelector(".scroll-images");

  const scrollLength = scrollImages ? scrollImages.scrollWidth - scrollImages.clientWidth : null;
  const leftButton = document.querySelector(".left");
  const rightButton = document.querySelector(".right");

  function checkScroll() {
    const currentScroll = scrollImages.scrollLeft;
    if (currentScroll === 0) {
      leftButton.setAttribute("disabled", "true");
      rightButton.removeAttribute("disabled");
    } else if (currentScroll === scrollLength) {
      rightButton.setAttribute("disabled", "true");
      leftButton.removeAttribute("disabled");
    } else {
      leftButton.removeAttribute("disabled");
      rightButton.removeAttribute("disabled");
    }
  }
if(scrollImages){
  scrollImages.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScroll);
  checkScroll();
}
  function leftScroll() {
    scrollImages.scrollBy({
      left: -200,
      behavior: "smooth"
    });
  }

  function rightScoll() {
    if(scrollImages){
    scrollImages.scrollBy({
      left: 200,
      behavior: "smooth"
    });
  }
  }
  if(scrollImages){
  leftButton.addEventListener("click", leftScroll);
  rightButton.addEventListener("click", rightScroll);
  }
});

function searchWord() {
  var searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  var searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = ''; // Clear previous search results

  if (searchInput === '') {
    searchResults.textContent = 'Please enter a search term';
    return;
  }

  var textNodes = getTextNodes(document.body);

  var occurrences = 0;
  textNodes.forEach(function(node) {
    var content = node.textContent.toLowerCase();
    var index = content.indexOf(searchInput);
    while (index !== -1) {
      var word = content.substr(index, searchInput.length);
      content = content.substr(index + searchInput.length);
      occurrences++;
      index = content.indexOf(searchInput);
    }
  });

  if (occurrences > 0) {
    searchResults.textContent = 'Found ' + occurrences + ' occurrences of the word "' + searchInput + '"';
  } else {
    searchResults.textContent = 'No occurrences of the word "' + searchInput + '" found';
  }
}

function getTextNodes(node) {
  var textNodes = [];
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node);
  } else {
    var children = node.childNodes;
    for (var i = 0; i < children.length; i++) {
      textNodes.push.apply(textNodes, getTextNodes(children[i]));
    }
  }
  return textNodes;
}