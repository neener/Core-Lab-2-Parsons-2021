//load airtable library
var Airtable = require('airtable');
console.log(Airtable);

//connect to airtable database using apiKey
var base = new Airtable({apiKey: 'keyVweZacqVN5x34Z'}).base('apptHtGN4wd8Jca34');

//get the fruit table from the base, select ALL the records, and specify the functions
// that will receive the data
base("fruits").select({}).eachPage(gotPageOfFruits, gotAllFruits);

// an empty array to hold our fruit data
const fruits = [];

// callback function that receives our data
function gotPageOfFruits(records, fetchNextPage) {
  console.log("gotPageOfFruits()");
  // add the records from this page to our music array
  fruits.push(...records);
  // request more pages
  fetchNextPage();
}

// callback function that is called when all pages are loaded
function gotAllFruits(err) {
  console.log("gotAllFruits()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading fruit");
    console.error(err);
    return;
  }

  // call functions to log and show the fruits
  consoleLogFruits();
  showFruits();
}

// loop through the friuts and console.log each record
function consoleLogFruits() {
  console.log("consoleLogFruits()");
  fruits.forEach((fruit) => {
    console.log("Fruits:", fruit);
  });
}

// loop through the fruits, create a variable to store each field, and add it to the page

function showFruits() {
  console.log("showFruits()");
  fruits.forEach((fruit) => {

    const h1 = document.createElement("h1");
    h1.innerText = fruit.fields.fruit_name;
    document.body.appendChild(h1);

    const img = document.createElement("img");
    img.src = fruit.fields.fruit_image[0].url;
    document.body.appendChild(img);

  });
}



// sort by color 