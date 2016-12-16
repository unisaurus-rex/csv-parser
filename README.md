# CSV-Parser

A node script for converting the csv file of insights data into a JSON object. 

## Input

```
node index.js <csv-file>
```

## Output 
Creates a new file in the project root called ```data.js```

## JSON object structure

```data.js``` contains a single variable named ```dataJSON``` with the following structure:

```
{
  txn_type: {
    fi: [ {mcc: val, trans: val, ...}, ...}],
    fi: [],
    ...
  },
  txn_type: {},
  ...
}
```

