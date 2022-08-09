var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:FVl7XtjRIBxrXPapFboL@containers-us-west-90.railway.app:6048";

const mongo = (dato) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Mendoza");
        var myobj = { Vrms: +dato, Irms: +dato+1 };
        dbo.collection("Edficio2").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("Escrito correctamente");
          db.close();
        });
      });
}

module.exports = { mongo }
