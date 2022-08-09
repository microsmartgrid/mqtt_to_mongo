var mqtt=require('mqtt')  
var mongodb=require('mongodb');  


var mqtt=require('mqtt')  
var mongodb=require('mongodb');  
var mongodbClient=mongodb.MongoClient;  
var mongodbURI= 'mongodb://mongo:QTU4a6oEMtsy3bFjRguE@containers-us-west-78.railway.app:6347'  
var deviceRoot="demo/device/"  
var collection,client;  


mongodbClient.connect(mongodbURI,setupCollection);

function setupCollection(err,client) {  
  if(err) throw err;
  collection= client.db("nashey");
  client=mqtt.createClient(1883,'10.0.0.101')
  client.subscribe(deviceRoot+"+")
  client.on('message', insertEvent);
}


function insertEvent(topic,payload) {  
    var key=topic.replace(deviceRoot,'nashey');
collection.update(  
  { _id:key },
  { $push: { events: { event: { value:payload, when:new Date() } } } },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}