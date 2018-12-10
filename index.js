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
var usersCollection;
var levelsCollection;


// ------------------------------
// ---------- INITIALIZATION ---------- //
app.listen(port, () => {
    console.log('Server listening at port %d', port);
});

mongoClient.connect(url, { useNewUrlParser: true }, init);

function init (err, client)
{
    db = client.db(dbName);
    usersCollection = db.collection('T_USERS');
    levelsCollection = db.collection('T_LEVELS');
}

// MIdlleware si répéttition
// FindOne existe ac mongoDB !!!


// ------------------------------
// ---------- REQUESTS ---------- //
app.get('/', function(req, res)
{
    res.send("Server is running");
});


app.post("/connectUser", function(req, res)
{
    console.log("REQUEST::" + req.path);
    
    usersCollection.find({login:req.body.login}).toArray(function (err, document)
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
                "ftueDone": true,      /////////////////////////////// ICI PASSER A FALSE LORSQUE LA FTUE SERA PRETE //////////////////////////////////////////
                "hc": 100,
                "sc": 1000,
                "movementSupply": 0,
                "healthSupply": 0,
                "attackSupply": 0,
                "progress":
                [
                    {
                        "areaId": 0,
                        "unlocked": true,
                        "levels":
                        [
                            {
                                "levelId": 0,
                                "unlocked": true,
                                "score": 0,
                                "stars": 0
                            },
                            {
                                "levelId": 1,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            }
                        ]
                    },
                    {
                        "areaId": 1,
                        "unlocked": false,
                        "levels":
                        [
                            {
                                "levelId": 0,
                                "unlocked": false,
                                "score": 0,
                                "stars": 0
                            },
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
                            }
                        ]
                    }
                ]
            }
            
            usersCollection.insertOne(lNewUser);
            res.end(JSON.stringify(lNewUser));
        }
    });
});

app.post("/updateAllLevels", function(req, res)
{
    console.log("REQUEST::" + req.path);
    
    levelsCollection.find().toArray(function (err, document)
    {
        if(document.length > 0)
        {
            var lNewLevelsArray = [];
            var localLevelVersion;
            
            for (i = 0; i < document.length; i++)
            {
                if(document[i].areaId == 0 && document[i].levelId == 0)
                {
                    localLevelVersion = req.body.i0;
                    console.log("Local 0/0 level's version: " + localLevelVersion);
                    
                    if (localLevelVersion == undefined)
                    {
                        console.log("Level 0/0 doesn't exist in local directory");
                        lNewLevelsArray.push(document[i]);
                    }
                    else if(localLevelVersion < document[i].version)
                    {
                        console.log("New version available on server: " + document[i].version);
                        lNewLevelsArray.push(document[i]);
                    }
                    else console.log("Latest version already acquired, server version: " + document[i].version);
                }
                if(document[i].areaId == 0 && document[i].levelId == 1)
                {
                    localLevelVersion = req.body.i1;
                    console.log("Local 0/1 level's version: " + localLevelVersion);
                    
                    if (localLevelVersion == undefined)
                    {
                        console.log("Level 0/1 doesn't exist in local directory");
                        lNewLevelsArray.push(document[i]);
                    }
                    else if(localLevelVersion < document[i].version)
                    {
                        console.log("New version available on server: " + document[i].version);
                        lNewLevelsArray.push(document[i]);
                    }
                    else console.log("Latest version already acquired, server version: " + document[i].version);
                }
                if(document[i].areaId == 1 && document[i].levelId == 0)
                {
                    localLevelVersion = req.body.i2;
                    console.log("Local 1/0 level's version: " + localLevelVersion);
                    
                    if (localLevelVersion == undefined)
                    {
                        console.log("Level 1/0 doesn't exist in local directory");
                        lNewLevelsArray.push(document[i]);
                    }
                    else if(localLevelVersion < document[i].version)
                    {
                        console.log("New version available on server: " + document[i].version);
                        lNewLevelsArray.push(document[i]);
                    }
                    else console.log("Latest version already acquired, server version: " + document[i].version);
                }
                if(document[i].areaId == 1 && document[i].levelId == 1)
                {
                    localLevelVersion = req.body.i3;
                    console.log("Local 1/1 level's version: " + localLevelVersion);
                    
                    if (localLevelVersion == undefined)
                    {
                        console.log("Level 1/1 doesn't exist in local directory");
                        lNewLevelsArray.push(document[i]);
                    }
                    else if(localLevelVersion < document[i].version)
                    {
                        console.log("New version available on server: " + document[i].version);
                        lNewLevelsArray.push(document[i]);
                    }
                    else console.log("Latest version already acquired, server version: " + document[i].version);
                }
                if(document[i].areaId == 1 && document[i].levelId == 2)
                {
                    localLevelVersion = req.body.i4;
                    console.log("Local 1/2 level's version: " + localLevelVersion);
                    
                    if (localLevelVersion == undefined)
                    {
                        console.log("Level 1/2 doesn't exist in local directory");
                        lNewLevelsArray.push(document[i]);
                    }
                    else if(localLevelVersion < document[i].version)
                    {
                        console.log("New version available on server: " + document[i].version);
                        lNewLevelsArray.push(document[i]);
                    }
                    else console.log("Latest version already acquired, server version: " + document[i].version);
                }
                if(document[i].areaId == 99 && document[i].levelId == 99)
                {
                    localLevelVersion = req.body.i5;
                    console.log("Local 99/99 level's version: " + localLevelVersion);
                    
                    if (localLevelVersion == undefined)
                    {
                        console.log("Level 99/99 doesn't exist in local directory");
                        lNewLevelsArray.push(document[i]);
                    }
                    else if(localLevelVersion < document[i].version)
                    {
                        console.log("New version available on server: " + document[i].version);
                        lNewLevelsArray.push(document[i]);
                    }
                    else console.log("Latest version already acquired, server version: " + document[i].version);
                }
            }
            
            console.log(lNewLevelsArray.length);
            res.end(JSON.stringify(lNewLevelsArray));
        }
        else console.log("No level found on server");
    });
});

app.post("/getLevel", function(req, res)
{
    console.log("REQUEST::" + req.path + " (areaId:" + req.body.areaId + ", levelId:" + req.body.levelId + ")");
    
    var lAreaId = parseInt(req.body.areaId, 10);
    var lLevelId = parseInt(req.body.levelId, 10);
    
    levelsCollection.find({areaId:lAreaId, levelId:lLevelId}).toArray(function (err, document)
    {
        if(document.length > 0)
        {
            res.end(JSON.stringify(document[0]));
        }
        else
        {
            var lFeedbackMessage = "FAIL : There is no level " + lLevelId + " in area " + lAreaId + " saved on server.";
            
            console.log(lFeedbackMessage);
            res.end(lFeedbackMessage);
        }
    });
});

app.post("/sendLevel", function(req, res)
{
    console.log("REQUEST::" + req.path);
    
    var lFeedbackMessage;
    
    var lNewLevel = req.body.levelJson;
    var lNewLevelJson = JSON.parse(lNewLevel);
    
    levelsCollection.find({areaId:lNewLevelJson.areaId, levelId:lNewLevelJson.levelId}).toArray(function (err, document)
    {
        if(document.length > 0)
        {
            if(document[0].version == lNewLevelJson.version)
            {
                lFeedbackMessage = "FAIL : Same level's version already exists on server, level NOT saved on server. Server v: " + document[0].version + "Send v: " + lNewLevelJson.version;
                console.log(lFeedbackMessage);
                res.end(lFeedbackMessage);
            }
            else
            {
                if(lNewLevelJson.version > document[0].version)
                {
                    levelsCollection.deleteOne(document[0]);
                    levelsCollection.insertOne(lNewLevelJson);
                    
                    lFeedbackMessage = "SUCCESS : New level's version saved on server. Server v: " + document[0].version + "Send v: " + lNewLevelJson.version;
                    console.log(lFeedbackMessage);
                    res.end(lFeedbackMessage);
                }
                else
                {
                    lFeedbackMessage = "ERROR : Trying to save a previous version of this level, level NOT saved on server. Server v: " + document[0].version + "Send v: " + lNewLevelJson.version;
                    console.log(lFeedbackMessage);
                    res.end(lFeedbackMessage);
                }
            }
        }
        else
        {
            levelsCollection.insertOne(lNewLevelJson);
            
            lFeedbackMessage = "SUCCESS : New level saved on server.";
            console.log(lFeedbackMessage);
            res.end(lFeedbackMessage);
        }
    });
});

app.post("/buyHc", function(req, res)
{
    console.log("REQUEST::" + req.path);
    
    var hcBought = parseInt(req.body.hcBought, 10);
    
    usersCollection.findOneAndUpdate
    (
        {login:req.body.login},
        {$inc:{"hc":hcBought}},
        {returnOriginal:false},
        function(err,document)
        {
            res.end(JSON.stringify(document.value.hc));
        }
    );
});

app.post("/buyMovementSupply", function(req, res)
{
    console.log("REQUEST::" + req.path);
    
    var hcSpent = parseInt(req.body.hc, 10);
    var supplyBought = parseInt(req.body.movementSupply, 10);
    
    usersCollection.findOneAndUpdate
    (
        {login:req.body.login},
        {$inc:{"hc":-hcSpent, "movementSupply":supplyBought}},
        {returnOriginal:false},
        function(err,document)
        {
            res.end(JSON.stringify({"hc":document.value.hc, "supply":document.value.movementSupply}));
        }
    );
});

app.post("/buyHealthSupply", function(req, res)
{
    console.log("REQUEST::" + req.path);
    
    var hcSpent = parseInt(req.body.hc, 10);
    var supplyBought = parseInt(req.body.healthSupply, 10);
    
    usersCollection.findOneAndUpdate
    (
        {login:req.body.login},
        {$inc:{"hc":-hcSpent, "healthSupply":supplyBought}},
        {returnOriginal:false},
        function(err,document)
        {
            res.end(JSON.stringify({"hc":document.value.hc, "supply":document.value.healthSupply}));
        }
    );
});

app.post("/buyAttackSupply", function(req, res)
{
    console.log("REQUEST::" + req.path);
    
    var hcSpent = parseInt(req.body.hc, 10);
    var supplyBought = parseInt(req.body.attackSupply, 10);
    
    usersCollection.findOneAndUpdate
    (
        {login:req.body.login},
        {$inc:{"hc":-hcSpent, "attackSupply":supplyBought}},
        {returnOriginal:false},
        function(err,document)
        {
            res.end(JSON.stringify({"hc":document.value.hc, "supply":document.value.attackSupply}));
        }
    );
});

// ------------------------------
// ---------- TESTS ---------- //
app.post("/getLevel", function (req,res)
{
  console.log("REQUEST::/getLevel");
  
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
