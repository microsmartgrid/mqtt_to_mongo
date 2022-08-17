var mqtt = require("mqtt");
var topic_list = ["/edificio1", "msg/edificio2", "msg/edificio3"];
var client = mqtt.connect("mqtt://20.125.125.87", { clientId: "pc" });

var { mongo } = require("./mongointerface.js");
var { parseCSV } = require("./CSV_handler");

//ESTA FUNCIÓN SE ACTIVA CADA VEZ QUE LLEGA UN MENSAJE AL TOPIC SUBSCRIPTO
client.on("message", function (topic_list, message, packet) {
  //convierto el mensaje a string
  var auxiliar = JSON.stringify(message);
  //lo parseo
  auxiliar = parseCSV(message);
  console.log(auxiliar);
  //lo envío a la base de datos
  mongo(auxiliar[0]);
});

client.on("connect", function () {
  console.log("status: " + client.connected);
});

//handle errors
client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1);
});

console.log("subscribing to topics");
client.subscribe(topic_list, { qos: 1 });
console.log("connected flag  " + client.connected);