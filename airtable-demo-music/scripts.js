// console.log("airtable demo");

//load airtable library

var Airtable = require('airtable');
console.log(Airtable);

//connect to airtable database using apiKey
var base = new Airtable({apiKey: 'keyVweZacqVN5x34Z'}).base('apptHtGN4wd8Jca34');

//get the Music table from the base, select ALL the records, and specify the functions
// that will receive the data

base("Music").select({}).eachPage(gotPageOfMusic, gotAllMusic);

// an empty array to hold our book data
const music = [];

// callback function that receives our data

function gotPageOfMusic(records, fetchNextPage) {
  console.log("gotPageOfMusic()");
  // add the records from this page to our music array
  music.push(...records);
  // request more pages
  fetchNextPage();
}

// callback function that is called when all pages are loaded

function gotAllMusic(err) {
  console.log("gotAllMusic()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading music");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogMusic();
  showMusic();
}

// loop through the music and console.log each record
function consoleLogMusic() {
  console.log("consoleLogMusic()");
  music.forEach((music) => {
    console.log("Music:", music);
  });
}

// loop through the music, create a variable to store each field, and add it to the page

function showMusic() {
  console.log("showMusic()");
  music.forEach((music) => {

    const h1 = document.createElement("h1");
    h1.innerText = music.fields.artist;
    document.body.appendChild(h1);

    const h2 = document.createElement("h2");
    h2.innerText = music.fields.album_title;
    document.body.appendChild(h2);

    const img = document.createElement("img");
    img.src = music.fields.album_artwork[0].url;
    document.body.appendChild(img);

  });
}

















//get the "Music" table from the base
// base('Music').select({
//   // Selecting the first 3 records in Grid view:
//   maxRecords: 3,
//   view: "Grid view"
// }).eachPage(function page(records, fetchNextPage) {
//   // This function (`page`) will get called for each page of records.

//   records.forEach(function(record) {
//       console.log('Retrieved', record.get('album_title'));
//       console.log('Retrieved', record.get('album_artwork'));
//       console.log('Retrieved', record.get('artist'));
//   });

//   // To fetch the next page of records, call `fetchNextPage`.
//   // If there are more records, `page` will get called again.
//   // If there are no more records, `done` will get called.
//   fetchNextPage();

// }, function done(err) {
//   if (err) { console.error(err); return; }
// });