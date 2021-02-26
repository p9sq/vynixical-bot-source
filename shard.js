const { ShardingManager } = require("discord.js");
const botconfig = require("./botconfig.json");
const { utc } = require("moment");

const shards = new ShardingManager("./index.js", {
  token: botconfig.token,
  totalShards: "auto",
});

shards.on("shardCreate", (shard) => {
  console.log(`[${utc().format("HH:mm:ss")}] Shard #${shard.id} is now online`);
});

shards.spawn(shards.totalShards, 10000);
