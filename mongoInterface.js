var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb://mongo:LR5R7vsdg6iLoZZFnv7x@containers-us-west-30.railway.app:7773";

const mongo = (dato) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Mendoza");

    dbo.collection("Edficio2").insertOne(dato, function (err, res) {
      if (err) throw err;
      console.log("Escrito correctamente.");
      db.close();
    });
  });
};

module.exports = { mongo };