'use strict';

const
  express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  extractor = require('unfluff'),
  atob = require('atob'),
  btoa = require('btoa'),
  fetch = require('node-fetch');

var app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*
 *
 */
app.get("/extract-content", function(req, res) {
  if (!req.query.from) {
    handleError(res, "/extract-content No from query", "Extract content: missing from query parameter");
  }
  var from = atob(req.query.from);
  console.log("/extract-content, got from: " + from);
  fetch(from)
    .then(function(fetchres) {
      return fetchres.text();
    })
    .then(function(body) {
      var data = extractor(body);
      console.log("Got data from webpage with title: "+data.title);
      var format = "full";
      if (req.query.format) {
        format = req.query.format;
      }
      if (format.localeCompare("content-only") == 0) {
        var dataB64 = btoa(JSON.stringify(data.text));
        res.status(200).json(
            {
              "result": "success",
              "message": "GET /extract-content processed, format content-only",
              "data": dataB64
            }
          );
      } else {
        var dataB64 = btoa(JSON.stringify(data));
        res.status(200).json(
            {
              "result": "success",
              "message": "GET /extract-content processed, format full",
              "data": dataB64
            }
          );
      }
    })
    .catch(function(err) {
      handleError(res, err, "/extract-content node-fetch and context extraction failed");
    })
});

/*  "/test"
 *    GET: tests this server is operational
 */

app.get("/test", function(req, res) {
  //handleError(res, err.message, "Failed to get generic item.");
  res.status(200).json(
      {
        "result": "success",
        "message": "GET /test endpoint is working"
      }
    );
});


// Start server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;