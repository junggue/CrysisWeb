var express = require('express');
var app = express();

app.use(express.static('./'))

var port = process.env.PORT || 3333
app.listen(port, function() {
	console.log('listening to port, ' + port)
})