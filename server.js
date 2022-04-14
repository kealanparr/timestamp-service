var express = require('express');
var cors = require('cors');
var app = express();

function isValidDate(inputDate) {
	return inputDate && d.getTime && !isNaN(d.getTime());
}

// Some legacy browsers choke on HTTP 204
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Lift most specific routing highest
app.get("/api/:date", function (req, res) {
	console.log('ok ok ok :)')
  res.json({ unix: new Date(req.params.date).valueOf(), utc: new Date(req.params.date)	});
});

// Return index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 8080, function () {
  console.log('App is listening on port ' + (process.env.PORT || 8080));
});