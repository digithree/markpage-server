'use strict';

const
  express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser");

var app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

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