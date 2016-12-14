var csv = require('csv');
var fs = require('fs');

var filename = __dirname + "/" + process.argv[2];
var parser = csv.parse({columns: true}); // use first row as headers

var output = {};

parser.on('readable', function() {
  var record;
  while(record = parser.read()) {
    addToOutput(record);
  }
});

parser.on('finish', function() {
  var data = "export var data = " + JSON.stringify(output) + ";";
  fs.writeFile("result.js", data);
});

fs.createReadStream(filename).pipe(parser);

function addToOutput(obj) {
  var txn = obj.txn_type;
  var fi = obj.fi;

  var rest = obj;
  delete rest.txn_type;
  delete rest.fi;

  if(output.hasOwnProperty(txn) ) {
    if(output[txn].hasOwnProperty(fi) ) {
      output[txn][fi].push(rest);
    } else {
      output[txn][fi] = [rest];
    }
  } else {
    output[txn] = {};
    output[txn][fi] = [rest];
  }
} 
