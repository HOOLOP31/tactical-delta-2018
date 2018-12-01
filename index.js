// ---------- VARIABLES ---------- //
var express    = require('express');
var app        = express();
var bodyParser = require("body-parser");
var port       = process.env.PORT || 3000;
var path       = require('path');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://root:rootroot1@ds141783.mlab.com:41783/tactical-delta-2018-db';
var dbName = 'tactical-delta-2018-db';

/* - Collections - */
var db;
var samplesCollection;
var levelsCollection;
var usersCollection;


// ------------------------------
// ---------- INITIALIZATION ---------- //
app.listen(port, () => {
    console.log('Server listening at port %d', port);
});

mongoClient.connect(url, { useNewUrlParser: true }, init);

function init (err, client)
{
    db = client.db(dbName);
    samplesCollection = db.collection('T_SAMPLES');
    usersCollection = db.collection('T_USERS');
    levelsCollection = db.collection('T_LEVELS');
}


// ------------------------------
// ---------- REQUESTS ---------- //
app.get('/', function(req, res)
{
    res.send("Server is running");
});

app.get("/connect", function(req, res)
{
    console.log("REQUEST::/connect");
    
    usersCollection.find({login:req.body.login}).toArray(function (err, document)
    {
        if(document.length > 0)
        {
            console.log("USER : " + req.body.login + " FOUND !");
        }
        else
        {
            console.log("CANNOT FIND USER : " + req.body.login);
        }
    });
});

/*app.get("/hasAnEmail", function(req, res)
{
    console.log("REQUEST :: /hasAnEmail");
    
    users.find({login:req.body.login}).toArray(function (err, document)
    {
        if(document.length > 0)
        {
            res.end(JSON.stringify(document[0]));
        }
        else
        {
            var lNewUser =
            {
                "login": req.body.login,
                "hardcurrencies": 1000,
                "softcurrencies": 10000,
                "progress":
                [
                    {
                        "area": 1,
                        "unlocked": true,
                        "levels":
                        [
                            {
                                "levelId": 1,
                                "unlocked": true,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 2,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 3,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 4,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 5,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            }
                        ]
                    },
                    {
                        "area": 2,
                        "unlocked": false,
                        "levels":
                        [
                            {
                                "levelId": 1,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 2,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 3,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 4,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 5,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            }
                        ]
                    },
                    {
                        "area": 3,
                        "unlocked": false,
                        "levels":
                        [
                            {
                                "levelId": 1,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 2,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 3,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 4,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 5,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            }
                        ]
                    },
                    {
                        "area": 4,
                        "unlocked": false,
                        "levels":
                        [
                            {
                                "levelId": 1,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 2,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 3,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 4,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 5,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            }
                        ]
                    },
                    {
                        "area": 5,
                        "unlocked": false,
                        "levels":
                        [
                            {
                                "levelId": 1,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 2,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 3,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 4,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 5,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            }
                        ]
                    },
                    {
                        "area": 6,
                        "unlocked": false,
                        "levels":
                        [
                            {
                                "levelId": 1,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 2,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 3,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 4,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 5,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            }
                        ]
                    }
                ],
                "items":
                [
                    {
                        "name": "item1",
                        "amount": 0
                    },
                    {
                        "name": "item2",
                        "amount": 0
                    }
                ]
            };
            users.insertOne(lNewUser);
            res.end(JSON.stringify(lNewUser));
        }
    });
});*/


// ------------------------------
// ---------- TESTS ---------- //
app.post("/getSampleData", function(req, res)
{
  console.log("REQUEST :: /getSampleData");
  
  samplesCollection.find({"string":req.body.myString}).toArray(function(err, document)
  {
    res.send(document);
  });
});

app.post("/getTestData", function(req, res)
{
  console.log("REQUEST :: /getTestData");
  
  samplesCollection.find({"thisString":req.body.myString}).toArray(function(err, document)
  {
    //res.send(document);
    //res.send(document[0]);
    //res.send(JSON.stringify(document[0].length));
    res.send(JSON.stringify(document[0]));
  });
});

app.post("/getLevel", function (req,res)
{
  console.log("REQUEST :: /getLevel");
  
  levelsCollection.find({"name":req.body.levelName}).toArray(function(err, document)
  {
    res.send(document);// Stoppe la requete et revoie 1 seule valeur en parametre
    
    /*if(document.length != 0)
    {
      var lCurrentHighestScore = parseFloat(JSON.stringify(document[0].progress[lNumberPlanet-1].levels[lNumberLevel-1].score));
      if(lScore > lCurrentHighestScore)
      {
        lIndex = lNumberLevel - 1;
        updateVal["progress.$.levels." + lIndex + ".score"] = lScore;
        users.findOneAndUpdate({
          "login":req.body.login, 
          "progress.planet":lNumberPlanet, 
          "progress.levels.level":lNumberLevel},
          {$set: updateVal},
          {upsert:true, returnOriginal:false});
        res.end(JSON.stringify(lScore)); 
      }
      else{
          res.end("false");
      }
    }*/
  });
});



/*app.post('/getLevelInfos', function(req, res) {
  
  levels.find({name:level1});
  console.log(req.body);
  //levelName = req.body.levelName;
  //size = {
  //  x : req.body.sizeX,
  //  y : req.body.sizeY
  //}
  
  levels.find().toArray(function (err, document){
    res.end(JSON.stringify(document));
  });
  
  //res.send('Name : ' + levelName + ' // Size : ' + size.x + ', ' + size.y);
});*/


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
