var express    = require('express');
var app        = express();
var bodyParser = require("body-parser");
var port       = process.env.PORT || 3000;
var path       = require('path');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// ------------------------------
// ---------- REQUESTS ---------- //
var levelName;
var size;
app.post('/setLevel', function(req, res) {
    console.log(req.body);
    levelName = req.body.levelName;
    size = {
        x : req.body.sizeX,
        y : req.body.sizeY
    }
  	res.send('Name : ' + levelName + ' // Size : ' + size.x + ', ' + size.y);
});

app.get('/getLevel', function(req, res) {
  	res.send('Name : ' + levelName + ' // Size : ' + size.x + ', ' + size.y);
});

//1e tests