const port = 8080
var fs = require('fs');
var url = require('url');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express()
const path = require('path');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '')));

app.set('views', path.join(__dirname, 'src', 'views'));

app.get('/', (req, res) => {
    res.render('MainPage', { title: 'Home Page' });
});

app.get('/mygithub.json', (req, res) => {
    fs.readFile("./jsons/mygithub.json", function(err, data) {
        if (err) {
            res.writeHead(err.code || 500, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ error: err.message }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(data);
        }
        return res.end();
    });
})

app.get('/blogposts.json', (req, res) => {
    fs.readFile("./jsons/blogposts.json", function(err, data) {
        if (err) {
            res.writeHead(err.code || 500, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ error: err.message }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(data);
        }
        return res.end();
    });
})

app.get('/BlogLog', (req, res) => {
    res.render("BlogPage.ejs", { title: 'Blog Page' });
})

app.get('/Projekt', (req, res) => {
    res.render("ProjektPage.ejs", { title: 'Project Page' });
})

app.get('/About', (req, res) => {
    res.render("AboutPage.ejs", { title: 'About Page' });
})

app.get('/Projekty', (req, res) => {
    res.render("ProjektyPage.ejs", { title: 'Projekty Page' });
})

app.get('/Blogi', (req, res) => {
    res.render("BlogiPage.ejs", { title: 'Blogi Page' });
})

app.get('/Kontakt', (req, res) => {
    const query = req.query;

    if (query.hasOwnProperty('tresc') && query.hasOwnProperty('temat')) {
        if (query.tresc !== "" && query.temat !== "") {
            const filePath = path.join(__dirname, 'jsons', 'mails.json');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading the file:', err);
                    return res.status(500).render('error', { message: 'Internal Server Error' });
                }

                let mails = [];
                try {
                    mails = JSON.parse(data);
                } catch (parseErr) {
                    console.error('Error parsing JSON:', parseErr);
                    return res.status(500).render('error', { message: 'Internal Server Error' });
                }

                mails.push({ temat: query.temat, tresc: query.tresc });
                fs.writeFile(filePath, JSON.stringify(mails, null, 2), 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing to the file:', writeErr);
                        return res.status(500).render('error', { message: 'Internal Server Error' });
                    }
                });
            });
        } else {
            return res.redirect('/Kontakt');
        }

        return res.redirect('/Kontakt');
    }
    res.render('KontaktPage.ejs', { title: 'Kontakt Page' });
});

app.get('/UpdateGitHubJson', async (req, res) => {
    try {
        const response = await fetch('https://api.github.com/users/EpicFrog2000/repos');
        if (!response.ok) {
            throw new Error(`GitHub API responded with status: ${response.status}`);
        }
        const jsonData = await response.json();
        fs.writeFileSync(path.join(__dirname, 'jsons/mygithub.json'), JSON.stringify(jsonData, null, 2), 'utf8');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while updating the JSON file.');
    }
    res.render("MainPage.ejs", { title: 'Home Page' });
});

app.use((req, res, next) => {
    if (req.url !== '/') {
        res.redirect('/');
    } else {
        es.render("MainPage.ejs", { title: 'Home Page' });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});