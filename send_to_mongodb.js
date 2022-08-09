
var mqtt    = require('mqtt');
var count =0;
var client  = mqtt.connect("mqtt://10.0.0.101",{clientId:"pc"});
var datos;
console.log("connected flag  " + client.connected);
var { mongo } = require('./auxx.js');

//ESTA FUNCIÓN SE ACTIVA CADA VEZ QUE LLEGA UN MENSAJE AL TOPIC SUBSCRIPTO
client.on('message',function(topic, message, packet){
    mongo(message); 
	console.log("message is "+ message);
	//console.log("topic is "+ topic);
});

client.on("connect",function(){	
console.log("tumamá  "+ client.connected);

})
//handle errors
client.on("error",function(error){
console.log("Can't connect" + error);
process.exit(1)});

//publish
function publish(topic,msg,options){
console.log("publishing",msg);

if (client.connected == true){
	
client.publish(topic,msg,options);

}
count+=1;
if (count==2) //ens script
	clearTimeout(timer_id); //stop timer
	client.end();	
}

//////////////

var options={
retain:true,
qos:1};
var topic="topic";
var message="prueba";
var topic_list=["topic2","topic3","topic4"];
var topic_o={"topic22":0,"topic33":1,"topic44":1};
console.log("subscribing to topics");
client.subscribe(topic,{qos:1}); //single topic

//client.subscribe(topic_list,{qos:1}); //topic list
client.subscribe(topic_o); //object

//var timer_id=setInterval(function(){publish(topic,"holasaaaaaaaaaaaaaaaaaaaaaaa",options);},5000);
//notice this is printed even before we connect
console.log("end of script");