var mqtt = require("mqtt");
var count = 0;
var client = mqtt.connect("mqtt://20.125.125.87", { clientId: "pc" });

console.log("connected flag  " + client.connected);
var { mongo } = require("./mongointerface.js");
var { parseCSV } = require("./CSV_handler");

//ESTA FUNCIÓN SE ACTIVA CADA VEZ QUE LLEGA UN MENSAJE AL TOPIC SUBSCRIPTO

client.on("message", function (topic_list, message, packet) {
  //convierto el mensaje a string
  var auxiliar = JSON.stringify(message);
  //lo parseo
  auxiliar = parseCSV(message);
  //console.log(auxiliar);
  //lo envío a la base de datos
  mongo(auxiliar);
});

client.on("connect", function () {
  console.log("Conectado!  " + client.connected);
});

//handle errors
client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1);
});

//publish
function publish(topic, msg, options) {
  console.log("publishing", msg);

  if (client.connected == true) {
    client.publish(topic, msg, options);
  }
  count += 1;
  if (count == 2)
    //ens script
    clearTimeout(timer_id); //stop timer
  client.end();
}

//////////////

var options = {
  retain: true,
  qos: 1,
};
//var topic="topic";
//var message="prueba";
var topic_list = ["/edificio1", "msg/edificio2", "msg/edificio3"];
//var topic_o={"topic22":0,"topic33":1,"topic44":1};
console.log("subscribing to topics");
//client.subscribe(topic,{qos:1}); //single topic
client.subscribe(topic_list, { qos: 1 }); //topic list
//client.subscribe(topic_o); //object

//var timer_id=setInterval(function(){publish(topic,"holasaaaaaaaaaaaaaaaaaaaaaaa",options);},5000);
//notice this is printed even before we connect
console.log("end of script");
