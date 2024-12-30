document.getElementById("btn-scroll-proj").addEventListener("click", function() {
    document.getElementById("Kilka").scrollIntoView({behavior: "smooth"});
});

SetBlogCardsOnMain();
AddProjectPanelStuff();

function AddProjectPanelStuff(){

    for (let div of document.getElementsByClassName('Project-Container')) {
        div.addEventListener('click', function handleClick() {
            let background = document.createElement('div');
            background.style.position = "fixed";
            background.style.top = "0";
            background.style.left = "0";
            background.style.width = "100%";
            background.style.height = "100%";
            background.style.background = "rgba(0, 0, 0, 0.5)";
            background.style.backdropFilter = "blur(10px)";
            background.style.zIndex = "999";
            background.style.opacity = "0";
            document.body.appendChild(background);
            setTimeout(() => {
                background.style.transition = "opacity 0.5s";
                background.style.opacity = "1";
            }, 10);
            
            var div_copy = div.cloneNode(true);
            div_copy.className = 'Project-Container-Copy';
            div_copy.style.opacity = "0";
            div_copy.style.position = "fixed";
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            div_copy.style.width = `${screenWidth / 2 - screenWidth * 0.05}px`;
            div_copy.style.left = '0';
            div_copy.style.top = `${(screenHeight - div_copy.offsetHeight) / 2}px`;
            div_copy.style.height = 'auto';
            div_copy.style.zIndex = "1000";
            div_copy.style.transition = "opacity 0.5s";
            document.body.appendChild(div_copy);
            setTimeout(() => {
                const divHeight = div_copy.offsetHeight;
                div_copy.style.top = `${(screenHeight - divHeight) / 2}px`;
                div_copy.style.opacity = "1";
            }, 50);
    
            let right_panel = document.createElement('div');
            right_panel.style.transition = "opacity 0.5s";
            right_panel.style.opacity = "0";
            right_panel.id = "right_panel";
            right_panel.style.minWidth = `${screenWidth / 2 - screenWidth * 0.05}px`;
            right_panel.style.minHeight = `${screenHeight / 2 - screenHeight * 0.05}px`;
            right_panel.style.maxWidth = `${screenWidth / 2 - screenWidth * 0.05}px`;
            right_panel.style.maxHeight = `${screenHeight / 2 - screenHeight * 0.05}px`;
            document.body.appendChild(right_panel);
            right_panel.style.top = `${(screenHeight - right_panel.offsetHeight) / 2}px`;
            right_panel.innerHTML = `
            <div>
            <h2>${div.id}</h2>
            <p>To tak trochę z backendu:</p>
            <p>Opis projektu nwm może z githuba. Weź to kurwa zrób co? Plan jest taki: Wejdź sobie na mojego githuba i do repo pododawaj jakieś README.md i z tych README weź tekst do tego opisu idk xd</p>
            <P>A no i weź lepiej zrób pozycje tych dwóch paneli na które patrzysz żeby były równo położone a nie jakby jakiś pijany student debil po technikum to robił</p> 
            <p>To tak trochę z frontendu</p>
            <p>Dodaj jakieś animacje/przejścia huje luje dzikie węże w momenkie kiedy zmienia się stronę</p>
            <p>Zrób bardziej płynne pokazywanie i chowanie sie navbar bo jakoś tak źle chodzi</p>
            <p></p>
            </div>`
            setTimeout(() => {
                right_panel.style.opacity = "1";
            }, 50);
    
            background.addEventListener('click', function() {
                right_panel.style.transition = "opacity 0.5s ease";
                div_copy.style.transition = "opacity 0.5s ease";
                background.style.transition = "opacity 0.5s ease";
                setTimeout(() => {
                    right_panel.style.opacity = "0";
                    div_copy.style.opacity = "0";
                    background.style.opacity = "0";
                    setTimeout(() => {
                        background.remove();
                        div_copy.remove();
                        right_panel.remove();
                    }, 500);
                }, 50);
                div.style.opacity = "1";
            });
        });
    }
}


function SetBlogCardsOnMain() {
    fetch('http://localhost:8080/blogposts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var container = document.getElementById('Blog_container');
        data.forEach(post => {
            var card = document.createElement('div');
            card.innerHTML = `
            <a href="/BlogLog/?Title=${post.Title}" style="text-decoration: none; color: inherit;">
            <div class="container-sm blogitem">
                <span class="title">${post.Title}</span>
                <span class="description" style="margin-left: 10px; color: rgb(168, 168, 168);">${post.Opis}</span>
                <div style="flex-grow: 1; border-bottom: 1px solid rgb(33, 37, 41); margin: 0 10px;"></div>
                <span class="date" style="margin-left: 10px; text-align: right;">2023</span>
            </div>
            </a>`;
            container.appendChild(card);
        });
        DoTheThingOnHomeCards();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function DoTheThingOnHomeCards(){
    var elementy = getVisibleElements();
    for (let element of elementy) {
        makeVisible(element);
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
    });
}

function getVisibleElements() {
    var elementy = new Set();
    var contents = document.getElementsByClassName('Project-Container');
    var contents2 = document.querySelectorAll('.container-sm.blogitem'); 
    var contents3 = document.getElementsByClassName('Footer');
    helperGetElems(contents).forEach(element => elementy.add(element));
    helperGetElems(contents2).forEach(element => elementy.add(element));
    helperGetElems(contents3).forEach(element => elementy.add(element));
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