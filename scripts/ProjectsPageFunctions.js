LoadAllProjects();
setTimeout(() => {
    AppearCards();
}, 200);
    
async function LoadAllProjects() {
    var pdiv = document.getElementById("Projekty-Div");
    fetch(window.location.protocol + '//' + window.location.host + '/mygithub.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok: ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          data.forEach(project => {
            var newDiv = document.createElement("div");
            newDiv.className = "blog_card card";
            newDiv.style += "flex: 1 1 200px; margin: 10px; padding: 20px;";
            
            var newDiv2 = document.createElement("h5");
            newDiv2.className = "card-title text-start";
            newDiv2.innerHTML = project.name;
            newDiv.appendChild(newDiv2)

            var newDiv3 = document.createElement("p");
            newDiv3.className = "card-text text-start";
            newDiv3.innerHTML = project.description;
            newDiv.appendChild(newDiv3)
            
            var newDiv4 = document.createElement("a");
            newDiv4.className = "btn btn-outline-light btn-lg text-start";
            newDiv4.style="display: block; width: fit-content;"
            newDiv4.type = "button";
            newDiv4.id="see-newest";
            newDiv4.innerHTML = "Zobacz!";
            newDiv4.href = "Projekt/?Title=" + project.name;
            newDiv.appendChild(newDiv4)
            
            var newDiv5 = document.createElement("br");
            newDiv.appendChild(newDiv5)
            
            var newDiv6 = document.createElement("a");
            newDiv6.className = "btn btn-outline-light btn-lg text-start";
            newDiv6.style="display: block; width: fit-content;"
            newDiv6.type = "button";
            newDiv6.id="see-newest";
            newDiv6.innerHTML = "Zobacz na github!";
            newDiv6.href = project.html_url;
            newDiv.appendChild(newDiv6)
            
            pdiv.appendChild(newDiv);
          });
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          pdiv.textContent = "Failed to load projects. Please try again later.";
    });
    
}

function AppearCards() {
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