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

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
  console.log('/ ' + 'verb GET');
});

app.get('/beers', (req, res) => {
  // const getBeers = () => {
  punkAPI
    .getBeers()
    .then(beersFromAPI =>
      //console.log('beers from the database: ', beersFromAPI)
      res.render('beers', { beersFromAPI })
    )
    .catch(err => console.log(err));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // your magic happens here

      console.log(responseFromAPI);
      res.render('random-beer', { responseFromAPI }); // ## put this later in the .then
    })
    .catch(error => console.log(error));
});
app.listen(port, () => console.log(`🏃‍ on port ${port}`));
