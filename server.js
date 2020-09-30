require("express")().listen(3000);

const token = "";//self bot tokeni
const oyunkanalı = "760806498611101699";//oyun kanalı id


//const Discord = require("discord.js-selfbot");
const Discord = require("discord.js")
const client = new Discord.Client();
client.login("NzAwMzU2MTYwMzA1MjM0MDQw.XphvgA.2LYIuBOuSRZ_dyKNdchc6l3oGmk");

var nf = ["!",".","-","ğ"]

const fetch = require("sync-request");
var data = fetch("GET", "https://sozluk.gov.tr/autocomplete.json");
var json = JSON.parse(data.getBody("utf8").toString())
    .map(b => b.madde)
    .filter(x => !nf.some(y => x.includes(y)))

client.on("message", message => {
  if(message.channel.id != oyunkanalı) return;
  if(message.author.bot) return;
  if(nf.some(bhy=> message.content.startsWith(bhy))) return;
  var last = message.content.split('')[message.content.split('').length-1];
  var random = json.filter(x => x.startsWith(last)).random();
  if(!random) return console.log(message.content + "'e yanıt bulamadım!")
  setTimeout(() => {
   message.channel.send(random)
  }, Math.floor(Math.random()*1000))// 0 - 1000 arası bi ms bekleme
})

Array.prototype.random = function() {
  var coll = new Discord.Collection();
  this.forEach(b => coll.set(b,b));
  return coll.random();
}