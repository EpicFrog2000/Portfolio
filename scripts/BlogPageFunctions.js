window.addEventListener('scroll', () => {
  if (window.scrollY >= window.innerHeight / 10) {
      navbar.style.top = "0";
      navbar.style.opacity = "1";
    } else {
      navbar.style.top = "-100%";
      navbar.style.opacity = "0";
    }
    var elementy = getVisibleElements();
    for (let element of elementy) {
        makeVisible(element);
    }
})


function getVisibleElements() {
  var elementy = new Set();
  var contents = document.getElementsByClassName('Footer');
  helperGetElems(contents).forEach(element => elementy.add(element));
  return elementy;
}

function helperGetElems(contents) {
  var elementy = new Set();
  for (let element of contents) {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;
      if (isVisible) {
          elementy.add(element);
      }
  }
  return elementy;
}

function makeVisible(element){
  element.style.setProperty('opacity', '1', 'important');
}