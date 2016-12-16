var csv = require('csv');
var fs = require('fs');

var filename = __dirname + "/" + process.argv[2]; // csv file to parse should be argument when running program
var parser = csv.parse({columns: true}); // use first row as headers

var output = {};

parser.on('readable', function() {
  var record;
  while(record = parser.read()) {
    addToOutput(record);
  }
});

parser.on('finish', function() {
  var data = "export const dataJSON = \'" + JSON.stringify(output) + "\';";
  fs.writeFile("data.js", data);
});

fs.createReadStream(filename).pipe(parser);

// parse a record into the correct place in output
// a record will be an object with keys
function addToOutput(obj) {
  var txn = obj.txn_type;
  var fi = obj.fi;

  var rest = obj;
  delete rest.txn_type;
  delete rest.fi;

  // check if output already has a key matching txn
  if(output.hasOwnProperty(txn) ) {
    // checkout if output[txn] already has a key matching fi
    if(output[txn].hasOwnProperty(fi) ) {
      output[txn][fi].push(rest);
    } else {
      // fi key doesn't exist, add it and set it's value to rest
      output[txn][fi] = [rest];
    }
  } else {
    // txn key doesn't exist
    output[txn] = {};
    output[txn][fi] = [rest];
  }
} 
