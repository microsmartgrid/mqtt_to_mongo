var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb://mongo:NLgGEi9qWIOfQtQ6OYfJ@containers-us-west-85.railway.app:5839";

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