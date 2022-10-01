const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

//* Init
const app = express(),
  port = 3000;
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//* Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// ...
const { randomSort } = require('./src/utilities');
//* Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers/', (req, res) => {
  const id = req.params.id;
  console.log(id);
  punkAPI
    .getBeers()
    .then(beersFromAPI => {
      //beersFromAPI => console.log('beers from the database: ', beersFromAPI)
      randomSort(beersFromAPI);
      res.render('beers', { beersFromAPI });
    })
    .catch(err => console.log(err));
});

app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(beersFromAPI => {
      console.log(beersFromAPI);
      res.render('randomBeer', { beersFromAPI: beersFromAPI });
    })
    .catch(error => console.log(error));
  //res.send('Request failed!' + id);
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromAPI => {
      // your magic happens here

      console.log(beersFromAPI);
      res.render('randomBeer', { beersFromAPI: beersFromAPI });
    })
    .catch(error => console.log(error));
});
app.listen(port, () => console.log(`🏃‍ on port ${port}`));
