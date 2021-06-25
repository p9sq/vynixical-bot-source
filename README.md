## Install
1. Press `Code` and then press `Download ZIP`
2. Extract it where ever you like
3. Open it and run `npm install` or `npm i`

## Setup
1. Create the bot app
2. Convert it to a bot
3. Enable both intents
4. Come back to this repository
5. Rename `example.env` to `.env`
6. Go to `.env` and replace the part where it says `imagine` with the bots token
7. Create `botconfig.json` with this inside:
```js
 {
  "defaultPrefix": "", // Default bot prefix
  "mongoURI": "", // Mongoose Database (MongoDB/MongoURI) connection string
  "googleKeys": [ // Required for some commands
    "", // Google command api key
    "" // YouTube stats command api key
  ],
  "color": "", // Embed color
  "owners": ["", ""], // Make sure to add your own id to this (You can choose to add another user you trust, for example, a friend's discord id. (If you don't want additional owners, then remove the `, ""` ))
  "apiTokens": { // Don't include these if your bot isn't going to be in any bot lists
    "ibl": "",
    "dbots": "",
    "vultrex": "",
    "topgg": "",
    "fates": "",
    "cyclone": "",
    "matrix": ""
  }
}
```
4. Fill in the variables
5. Invite your bot to your server
6. Open the command prompt
7. CD into the bot's folder
8. run `node .`
9. Now go to your server and run a command and it should work 100%
