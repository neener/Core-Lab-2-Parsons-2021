console.log("airtable demo");

//load airtable library

var Airtable = require('airtable');
console.log(Airtable);

//connect to airtable database using apiKey
var base = new Airtable({apiKey: 'keyVweZacqVN5x34Z'}).base('apptHtGN4wd8Jca34');

//get the "Music" table from the base
base('Music').select({
  // Selecting the first 3 records in Grid view:
  maxRecords: 3,
  view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  records.forEach(function(record) {
      console.log('Retrieved', record.get('album_title'));
  });

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); return; }
});