// ---------- VARIABLES ---------- //
var express    = require('express');
var app        = express();
var bodyParser = require("body-parser");
var port       = process.env.PORT || 3000;
var path       = require('path');

//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));

var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://root:rootroot1@ds141783.mlab.com:41783/tactical-delta-2018-db';
var dbName = 'tactical-delta-2018-db';

/* - Collections - */
var db;
var levelsCollection;


// ------------------------------
// ---------- INITIALIZATION ---------- //
app.listen(port, () => {
  console.log('Server listening at port %d', port);
});


//
mongoClient.connect(url, init);
//
function init (err, client)
{
  db = client.db(dbName);
  levelsCollection = db.collection('T_LEVELS');
  
  console.log("coucoucoucoucoucocuocuoc");
}
//
//
//// ------------------------------
// ---------- REQUESTS ---------- //
app.get('/', function(req, res) {
//  res.send("La page fonctionne  sur le server");
  res.send(levelsCollection.length);
});


// ------------------------------
//// ---------- TESTS ---------- //
//app.post('/getLevelInfos', function(req, res) {
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  
//  levels.find({name:level1});
//  console.log(req.body);
//  /*levelName = req.body.levelName;
//  size = {
//    x : req.body.sizeX,
//    y : req.body.sizeY
//  }*/
//  
//  levels.find().toArray(function (err, document){
//    res.end(JSON.stringify(document));
//  });
//  
//  //res.send('Name : ' + levelName + ' // Size : ' + size.x + ', ' + size.y);
//});


// ------------------------------
// ---------- EXEMPLES ---------- //
/*var levelName;
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
});*/
