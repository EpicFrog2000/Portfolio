LoadAllBlogs();
AppearCards();

async function LoadAllBlogs() {
    var pdiv = document.getElementById("Blogi-Div");
    fetch(window.location.protocol + '//' + window.location.host + '/blogposts.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok: ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          data.forEach(wpis => {
            var newDiv = document.createElement("div");
            newDiv.className = "blog_card card";
            newDiv.style += "flex: 1 1 200px; margin: 10px; padding: 20px;";
            
            var newDiv2 = document.createElement("h5");
            newDiv2.className = "card-title text-start";
            newDiv2.innerHTML = wpis.Title;
            newDiv.appendChild(newDiv2)

            var newDiv3 = document.createElement("p");
            newDiv3.className = "card-text text-start";
            newDiv3.innerHTML = wpis.Opis;
            newDiv.appendChild(newDiv3)

            var newDiv4 = document.createElement("a");
            newDiv4.className = "btn btn-outline-light btn-lg text-start";
            newDiv4.innerHTML = "Czytaj";
            newDiv4.style +="display: block; width: fit-content;";
            newDiv4.href="/BlogLog/?Title="+wpis.Title;
            newDiv.appendChild(newDiv4)

            pdiv.appendChild(newDiv);
          });
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          pdiv.textContent = "Failed to load projects. Please try again later.";
    });
}

async function AppearCards() {
    var divs = document.querySelectorAll(".blog_card.card");
    Array.from(divs).forEach((d, index) => {
        d.style.setProperty('opacity', '0', 'important');
        setTimeout(() => {
            d.style.setProperty('opacity', '1', 'important');
            d.style.transition = 'opacity 0.5s';
        }, index * 200);
    });
}

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