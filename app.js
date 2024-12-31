const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const port = 8080;
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname,'src', 'views'));

app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
  res.render('layout', { title: 'Home Page', content: 'MainPage' });
});

app.get('/mygithub.json', (req, res) => {
  const jsonFilePath = path.resolve(__dirname, "jsons/mygithub.json");

  fs.readFile(jsonFilePath, function(err, data) {
      if (err) {
          if (err.code === 'ENOENT') {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify({ error: "File not found" }));
          } else {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify({ error: err.message }));
          }
      } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(data);
      }
      return res.end();
  });
});

app.get('/blogposts.json', (req, res) => {
  const jsonFilePath = path.resolve(__dirname, "jsons/blogposts.json");

  fs.readFile(jsonFilePath, function(err, data) {
      if (err) {
          if (err.code === 'ENOENT') {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify({ error: "File not found" }));
          } else {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify({ error: err.message }));
          }
      } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(data);
      }
      return res.end();
  });
});

app.get('/BlogLog', (req, res) => {
    res.render("layout", { title: 'Blog Page', content: 'BlogPage'});
})

app.get('/Projekt', (req, res) => {
    res.render("layout", { title: 'Project Page', content: 'ProjektPage'});
})

app.get('/About', (req, res) => {
    res.render("layout", { title: 'About Page',  content: 'AboutPage' });
})

app.get('/Projekty', (req, res) => {
    res.render("layout", { title: 'Projekty Page',  content: 'ProjektyPage' });
})

app.get('/Blogi', (req, res) => {
    res.render("layout", { title: 'Blogi Page',  content: 'BlogiPage' });
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
    res.render("layout", { title: 'Kontakt Page',  content: 'KontaktPage' });
});

app.get('/UpdateGitHubJson', async (req, res) => {
    try { 
        const response = await fetch('https://api.github.com/users/EpicFrog2000/repos');
        if (!response.ok) {
            throw new Error(`GitHub API responded with status: ${response.status}`);
        }
        const jsonData = await response.json();
        fs.writeFileSync(path.join(__dirname, 'jsons/mygithub.json'), JSON.stringify(jsonData, null, 2), 'utf8');
        res.render('layout', { title: 'Home Page', content: 'MainPage' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while updating the JSON file.');
    }
});

app.use((req, res, next) => {
    if (req.url !== '/') {
        res.redirect('/');
    } else {
        res.render('layout', { title: 'Home Page', content: 'MainPage' });
    }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
