var express = require('express');
var cors = require('cors');
var app = express();

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months   = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

function isValidDate(inputDate) {
	return inputDate && inputDate.getTime && !isNaN(inputDate.getTime());
}

// Some legacy browsers choke on HTTP 204
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Lift most specific routing highest
app.get("/api/:date", function (req, res) {

	let inputDate = ""
	const numbersOnly = /[0-9]/g.test(req.params.date) // Check if the date is unix timestamp (1451001600000) or yy/mm/dd format
	if (numbersOnly) {
		inputDate = new Date(+req.params.date)
	} else {
		inputDate = new Date(req.params.date)
	} 
	
	if (isValidDate(inputDate)) {
		const weekday = weekdays[inputDate.getDay()]
		const dateOfMo = inputDate.getDate() > 10 ? inputDate.getDate() : `0${inputDate.getDate()}`
		const month = months[inputDate.getMonth()]
		const year = inputDate.getFullYear()
		const time = "00:00:00 GMT"
	
		res.json({ unix: inputDate.valueOf(), utc: `${weekday}, ${dateOfMo} ${month} ${year} ${time}` });
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