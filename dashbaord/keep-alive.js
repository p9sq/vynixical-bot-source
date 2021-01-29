const fetch = require("node-fetch");
const { utc } = require("moment");

setInterval(async() => {
    await fetch("https://vynixical.herokuapp.com/");
    console.log(`[${utc().format("HH:mm:ss")}] Dashboard is online`);
}, 5 * 60 * 1000);