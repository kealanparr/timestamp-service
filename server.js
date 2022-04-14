var express = require('express');
var cors = require('cors');
var app = express();

function isValidDate(inputDate) {
	return inputDate && inputDate.getTime && !isNaN(inputDate.getTime());
}

// Some legacy browsers choke on HTTP 204
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/api/", function (req, res) {
	
	let today = new Date()
	
	res.json({ unix: today.valueOf(), utc: today.toGMTString() });
});

// Lift most specific routing highest
app.get("/api/:date", function (req, res) {

	let inputDate = ""
	const hasDash = req.params.date.includes("-") // Check if the date is unix timestamp (1451001600000) or yy-mm-dd format
	const hasSpace = req.params.date.includes(" ") // Or if they've passed in directly, the timestamp like: 05 October 2011, GMT url-encoded 05%20October%202011,%20GMT
	if (hasDash || hasSpace) {
		inputDate = new Date(decodeURI(req.params.date))
	} else {
		inputDate = new Date(+req.params.date)
	} 
	
	if (isValidDate(inputDate)) {
		res.json({ unix: inputDate.valueOf(), utc: inputDate.toGMTString() });
	} else {
		res.json({ error : "Invalid Date" })
	}
});

// Return index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 8080, function () {
  console.log('App is listening on port ' + (process.env.PORT || 8080));
});