var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


// CONTACTS API ROUTES BELOW

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