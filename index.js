const express = require('express')
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('currentYear', () => new Date().getFullYear());

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} | ${req.method} | ${req.url}`;

  if (req.url !== '/help_css.css') {
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
      if (err) {
        console.log('Unable to write log')
      }
    })
  }

  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'Welcome to my website'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to handle requests'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
