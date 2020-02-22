const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const util = require('util');

let products = {};
const fileName = './dummy.json';

// Synchronous Data
function getDataSync() {
   try {
      let data = JSON.parse(fs.readFileSync(fileName));
      return data;
   } catch(err) {
      console.log('error', err);
   }
}

app.get("/", (req, res) => {
   let data = getDataSync();
   const result = parseJSONtoTable(data);
   console.log(result);
   res.send(result).end();
});

/*************************************************/
// Asynchronous Data
function getDataAsync() {
   return fs.readFile(fileName, () => {});
}

// const getDataAsync = () => {
//    return JSON.parse(fs.readFile(fileName), (err, res) => {
//       if (err) return callback(err);
//       try {
//          res = JSON.parse(res);
//       } catch (ex) {
//          return callback(ex);
//       }
//       callback(null, res);
//    });
// };

app.get("/async", (req, res) => {
   fs.readFile(fileName, (err, data) => {
      data = JSON.parse(data);
      const result = parseJSONtoTable(data);
      console.log(result);
      res.send(result).end();
   });
})


const model = {
   ID: String,
   Name: String,
   Price: Number,
   Tags: [],
}


// in {key: {obj}, key: {obj}}
// out '<table><tr><td>value</td>... 
function parseJSONtoTable(data) {
   // assemble data
   let headerRow = `<tr scope="row">
                     ${Object.keys(model).map(i => `<th scope="col">${i}</th>`).join('')}
                     </tr>`;

   let dataRows = '';
   for (let key in data) {
      dataRows += `<tr scope="row" data=${key}>`;
      for (let prop in data[key]) {
         dataRows += `<td scope="col">${data[key][prop]}</td>`
      }
      dataRows += `</tr>`;
   }

   // build the template
   let result = `<doctype>
                  <html 5>
                  <head>
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" type="text/css" />
                  </head>
                  <body>
                  <div class="container-fluid">
                  <table class="table table-bordered table-striped">
                     <thead>
                        ${headerRow}
                     </thead>
                     <tbody>
                        ${dataRows}
                     <tbody>
                  </table>
                  </div></body></html>`;
   return result;
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`));