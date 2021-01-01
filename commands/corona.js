const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    let countries = args[0];
    if(!countries) return message.channel.send("Please specify a country name!")

    fetch(`https://corona.lmao.ninja/v2/countries/${countries}`)
    .then(res => res.json())
    .then(data => {
        let country = data.country;
        let flag = data.countryInfo.flag;
        let confirmed = data.cases;
        let todayconfirmed = data.todayCases;
        let deaths = data.deaths;
        let todaydeaths = data.todayDeaths;
        let recovered = data.recovered;
        let critical = data.critical;
        let active = data.active;

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp(new Date())
        .setTitle("Coronavirus Statistics")
        .setThumbnail(flag)
        .addField(`Data for: ${country}`, `
        Confirmed: (Total: ${confirmed.toLocaleString()} | Daily: ${todayconfirmed.toLocaleString()})
        Deaths: (Total: ${deaths.toLocaleString()} | Daily: ${todaydeaths.toLocaleString()})
        Recovered: ${recovered.toLocaleString()}
        Critical: ${critical.toLocaleString()}
        Active: ${active.toLocaleString()}`)
        message.channel.send(embed)
    })
}

module.exports.config = {
    name: "corona",
    description: "Shows the COVID-19 Stats from a certain country",
    usage: "corona <country>",
    category: "Info",
    example: "corona china",
    accessableby: "Everyone",
    aliases: ["coronastats", "statscorona"]
}