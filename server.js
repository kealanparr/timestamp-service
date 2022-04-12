var express = require('express');
var app = express();
var cors = require('cors');

// some legacy browsers choke on 204
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Lift most specific routing highest
app.get("/api/:date", function (req, res) {
	debugger;
	console.log('ok ok ok :)')
  res.json({ unix: new Date(req.params.date).valueOf() });
});

// Return index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});